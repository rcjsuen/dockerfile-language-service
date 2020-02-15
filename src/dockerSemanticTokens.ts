/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import { SemanticTokens, SemanticTokenTypes, SemanticTokenModifiers } from 'vscode-languageserver-protocol/lib/protocol.sematicTokens.proposed';
import { DockerfileParser, Keyword, Comment, Instruction, Line, Healthcheck, ModifiableInstruction, From, Onbuild, PropertyInstruction } from 'dockerfile-ast';
import { Range, TextDocument } from 'vscode-languageserver-types';
import { Dockerfile } from 'dockerfile-ast';

export class TokensLegend {

    private static tokenTypes = {};

    private static tokenModifiers = {};
    
    public static init() {
        this.tokenTypes[SemanticTokenTypes.keyword] = 0;
        this.tokenTypes[SemanticTokenTypes.comment] = 1;
        this.tokenTypes[SemanticTokenTypes.parameter] = 2;
        this.tokenTypes[SemanticTokenTypes.property] = 3;
        this.tokenTypes[SemanticTokenTypes.label] = 4;
        this.tokenTypes[SemanticTokenTypes.class] = 5;
        this.tokenTypes[SemanticTokenTypes.marco] = 6;
        this.tokenTypes[SemanticTokenTypes.string] = 7;
        this.tokenTypes[SemanticTokenTypes.variable] = 8;

        this.tokenModifiers[SemanticTokenModifiers.declaration] = 1;
        this.tokenModifiers[SemanticTokenModifiers.definition] = 2;
        this.tokenModifiers[SemanticTokenModifiers.deprecated] = 4;
        this.tokenModifiers[SemanticTokenModifiers.reference] = 8;
    }

    public static getTokenType(type: string): number {
        const tokenType = this.tokenTypes[type];
        return tokenType;
    }

    public static getTokenModifiers(modifiers: string[]): number {
        let bit = 0;
        for (const modifier of modifiers) {
            bit |= this.tokenModifiers[modifier];
        }
        return bit;
    }
}

TokensLegend.init();

export class DockerSemanticTokens {

    private currentRange: Range | null = null;

    private content: string;
    private document: TextDocument;
    private dockerfile: Dockerfile;
    private tokens = [];

    constructor(content: string) {
        this.content = content;
        this.document = TextDocument.create("", "", 0, content);
        this.dockerfile = DockerfileParser.parse(content);
    }

    public computeSemanticTokens(): SemanticTokens {
        let lines: Line[] = this.dockerfile.getComments();
        let instructions = this.dockerfile.getInstructions();
        for (let instruction of instructions) {
            let range = instruction.getRange();
            if (range.start.line !== range.end.line) {
                for (let i = 0; i < lines.length; i++) {
                    let commentRange = lines[i].getRange();
                    if (range.start.line < commentRange.start.line && commentRange.start.line < range.end.line) {
                        // this is an embedded comment, remove it
                        lines.splice(i, 1);
                        i--;
                    }
                }
            }
        }
        lines = lines.concat(this.dockerfile.getInstructions());
        lines.sort((a: Line, b: Line): number => {
            return a.getRange().start.line - b.getRange().start.line;
        });

        for (const directive of this.dockerfile.getDirectives()) {
            const directiveRange = directive.getRange();
            this.createToken(directiveRange, SemanticTokenTypes.marco);
        }

        const escapeCharacter = this.dockerfile.getEscapeCharacter();
        for (let i = 0; i < lines.length; i++) {
            if (lines[i] instanceof Comment) {
                const range = lines[i].getRange();
                this.createToken(range, SemanticTokenTypes.comment);
            } else {
                this.createTokensForInstruction(escapeCharacter, lines[i] as Instruction);
            }
        }
        return {
            data: this.tokens
        }
    }

    private createTokensForInstruction(escapeCharacter: string, instruction: Instruction): number[] {
        const instructionRange = instruction.getInstructionRange();
        this.createToken(instructionRange, SemanticTokenTypes.keyword);

        if (instruction instanceof ModifiableInstruction) {
            for (const flag of instruction.getFlags()) {
                const flagRange = flag.getRange();
                const nameRange = flag.getNameRange();
                const mergedRange = {
                    start: { line: flagRange.start.line, character: flagRange.start.character },
                    end: { line: nameRange.end.line, character: nameRange.end.character }
                };
                this.createToken(mergedRange, SemanticTokenTypes.parameter);
                const flagValue = flag.getValue();
                if (flagValue !== null && flagValue !== "") {
                    const valueRange = flag.getValueRange();
                    this.createToken(valueRange, SemanticTokenTypes.property);
                }
            }
        }

        switch (instruction.getKeyword()) {
            case Keyword.ARG:
            case Keyword.ENV:
                const propertyInstruction = instruction as PropertyInstruction;
                for (const property of propertyInstruction.getProperties()) {
                    const nameRange = property.getNameRange();
                    this.createToken(nameRange, SemanticTokenTypes.variable, [SemanticTokenModifiers.declaration]);
                }
                break;
            case Keyword.FROM:
                const from = instruction as From;
                const nameRange = from.getImageNameRange();
                if (nameRange !== null) {
                    this.createToken(nameRange, SemanticTokenTypes.class);
                }
                const tagRange = from.getImageTagRange();
                if (tagRange !== null) {
                    this.createToken(tagRange, SemanticTokenTypes.label);
                }
                const digestRange = from.getImageDigestRange();
                if (digestRange !== null) {
                    this.createToken(digestRange, SemanticTokenTypes.label);
                }
                const fromArgs = instruction.getArguments();
                if (fromArgs.length > 1 && fromArgs[1].getValue().toUpperCase() === "AS") {
                    let range = fromArgs[1].getRange();
                    this.createToken(range, SemanticTokenTypes.keyword);
                    range = from.getBuildStageRange();
                    if (range !== null) {
                        this.createToken(range, SemanticTokenTypes.label);
                    }
                }
                break;
            case Keyword.HEALTHCHECK:
                const healthcheck = instruction as Healthcheck;
                const subcommand = healthcheck.getSubcommand();
                if (subcommand !== null) {
                    const range = subcommand.getRange();
                    this.createToken(range, SemanticTokenTypes.keyword);
                }
                break;
            case Keyword.ONBUILD:
                const onbuild = instruction as Onbuild;
                const range = onbuild.getTriggerRange()
                if (range !== null) {
                    this.createTokensForInstruction(escapeCharacter, onbuild.getTriggerInstruction());
                }
                break;
        }

        const args = instruction.getArguments();
        if (args.length === 0) {
            return this.tokens;
        }

        const start = args[0].getRange().start;
        const startOffset = this.document.offsetAt(start);
        const argsContent = instruction.getRawArgumentsContent();
        let variables = instruction.getVariables();
        let quote = null;
        let offset = -1;
        let escapedNewline = false;
        argsLoop: for (let i = 0; i < argsContent.length; i++) {
            const ch = argsContent.charAt(i);
            switch (ch) {
                case ' ':
                case '\t':
                case '\n':
                case '\r':
                    break;
                case '#':
                    if (escapedNewline) {
                        for (let j = i + 1; j < argsContent.length; j++) {
                            if (argsContent.charAt(j) === '\n' || argsContent.charAt(j) === '\r') {
                                let range = {
                                    start: this.document.positionAt(startOffset + i),
                                    end: this.document.positionAt(startOffset + j)
                                };
                                this.createToken(range, SemanticTokenTypes.comment);
                                i = j;
                                continue argsLoop;
                            }
                        }
                    }
                case escapeCharacter:
                    for (let j = i + 1; j < argsContent.length; j++) {
                        const escapedChar = argsContent.charAt(j);
                        switch (escapedChar) {
                            case '\r':
                                escapedNewline = true;
                                i = j + 1;
                                continue argsLoop;
                            case '\n':
                                escapedNewline = true;
                                i = j;
                                continue argsLoop;
                            case '\"':
                            case '\'':
                                if (quote === null) {
                                    let range = {
                                        start: this.document.positionAt(startOffset + i),
                                        end: this.document.positionAt(startOffset + j + 1)
                                    };
                                    this.createToken(range, SemanticTokenTypes.string);
                                    i = j;
                                    continue argsLoop;
                                } else {
                                    let range = {
                                        start: this.document.positionAt(startOffset + offset),
                                        end: this.document.positionAt(startOffset + i)
                                    };
                                    this.createToken(range, SemanticTokenTypes.string);
                                    range = {
                                        start: this.document.positionAt(startOffset + i),
                                        end: this.document.positionAt(startOffset + j + 1)
                                    };
                                    this.createToken(range, SemanticTokenTypes.string);
                                    // reset as the string has been cut off part ways
                                    quote = null;
                                    offset = -1;
                                }
                            default:
                                i = j;
                                continue argsLoop;
                        }
                    }
                    break;
                case '$':
                    escapedNewline = false;
                    for (let variable of variables) {
                        const range = variable.getRange();
                        if (startOffset + i === this.document.offsetAt(range.start)) {
                            this.createToken(
                                range, SemanticTokenTypes.variable, [SemanticTokenModifiers.reference]
                            );
                            variables.slice(1);
                            break;
                        }
                    }
                    break;
                case '\"':
                case '\'':
                    escapedNewline = false;
                    if (quote === null) {
                        quote = ch;
                        offset = i;
                    } else if (quote === ch) {
                        // ensure that quotes match
                        const range = {
                            start: this.document.positionAt(startOffset + offset),
                            end: this.document.positionAt(startOffset + i + 1)
                        };
                        this.createToken(range, SemanticTokenTypes.string);
                        quote = null;
                        offset = -1;
                    }
                    break;
                default:
                    escapedNewline = false;
                    break;
            }
        }

        if (quote !== null) {
            // trailing string token
            const range = {
                start: this.document.positionAt(startOffset + offset),
                end: this.document.positionAt(startOffset + argsContent.length)
            };
            this.createToken(range, SemanticTokenTypes.string);
        }
    }

    private createToken(range: Range, tokenType: string, tokenModifiers: string[] = []): void {
        if (range.start.line !== range.end.line) {
            let offset = -1;
            let startOffset = this.document.offsetAt(range.start);
            const endOffset = this.document.offsetAt(range.end);
            const escapeCharacter = this.dockerfile.getEscapeCharacter();
            rangeLoop: for (let i = startOffset; i < endOffset; i++) {
                let ch = this.content.charAt(i);
                switch (ch) {
                    case escapeCharacter:
                        const intermediateRange = {
                            start: this.document.positionAt(startOffset),
                            end: this.document.positionAt(i),
                        }
                        this.createToken(intermediateRange, tokenType, tokenModifiers);
                        for (let j = i + 1; j < endOffset; j++) {
                            switch (this.content.charAt(j)) {
                                case '\n':
                                    i = j;
                                    offset = j + 1;
                                    continue rangeLoop;
                            }
                        }
                }
            }
            const intermediateRange = {
                start: this.document.positionAt(offset),
                end: this.document.positionAt(endOffset),
            }
            this.createToken(intermediateRange, tokenType, tokenModifiers);
            return;
        }

        if (this.currentRange === null) {
            this.tokens = this.tokens.concat([
                range.start.line,
                range.start.character,
                range.end.character - range.start.character,
                TokensLegend.getTokenType(tokenType),
                TokensLegend.getTokenModifiers(tokenModifiers)
            ]);
        } else if (this.currentRange.end.line !== range.start.line) {
            this.tokens = this.tokens.concat([
                range.start.line - this.currentRange.end.line,
                range.start.character,
                range.end.character - range.start.character,
                TokensLegend.getTokenType(tokenType),
                TokensLegend.getTokenModifiers(tokenModifiers)
            ]);
        } else {
            this.tokens = this.tokens.concat([
                range.start.line - this.currentRange.start.line,
                range.start.character - this.currentRange.start.character,
                range.end.character - range.start.character,
                TokensLegend.getTokenType(tokenType),
                TokensLegend.getTokenModifiers(tokenModifiers)
            ]);
        }
        this.currentRange = range;
    }

}
