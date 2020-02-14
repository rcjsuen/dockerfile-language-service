/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import { SemanticTokens, SemanticTokenTypes, SemanticTokenModifiers } from 'vscode-languageserver-protocol/lib/protocol.sematicTokens.proposed';
import { DockerfileParser, Keyword, Comment, Instruction, Line, Healthcheck, ModifiableInstruction, From, Onbuild } from 'dockerfile-ast';
import { Range, TextDocument } from 'vscode-languageserver-types';

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

    public computeSemanticTokens(content: string): SemanticTokens {
        const document = TextDocument.create("", "", 0, content);
        const dockerfile = DockerfileParser.parse(content);
        let tokens: number[] = [];
        let lines: Line[] = dockerfile.getComments();
        let instructions = dockerfile.getInstructions();
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
        lines = lines.concat(dockerfile.getInstructions());
        lines.sort((a: Line, b: Line): number => {
            return a.getRange().start.line - b.getRange().start.line;
        });

        for (const directive of dockerfile.getDirectives()) {
            const directiveRange = directive.getRange();
            tokens = tokens.concat(this.createToken(directiveRange, SemanticTokenTypes.marco));
            this.currentRange = directiveRange;
        }

        const escapeCharacter = dockerfile.getEscapeCharacter();
        for (let i = 0; i < lines.length; i++) {
            if (lines[i] instanceof Comment) {
                const range = lines[i].getRange();
                tokens = tokens.concat(this.createToken(range, SemanticTokenTypes.comment));
                this.currentRange = range;
            } else {
                tokens = this.createTokensForInstruction(document, escapeCharacter, lines[i] as Instruction, tokens);
            }
        }
        return {
            data: tokens
        }
    }

    private createTokensForInstruction(document: TextDocument, escapeCharacter: string, instruction: Instruction, tokens: number[]): number[] {
        const instructionRange = instruction.getInstructionRange();
        tokens = tokens.concat(this.createToken(instructionRange, SemanticTokenTypes.keyword));
        this.currentRange = instructionRange;

        if (instruction instanceof ModifiableInstruction) {
            for (const flag of instruction.getFlags()) {
                const flagRange = flag.getRange();
                const nameRange = flag.getNameRange();
                const mergedRange = {
                    start: { line: flagRange.start.line, character: flagRange.start.character },
                    end: { line: nameRange.end.line, character: nameRange.end.character }
                };
                tokens = tokens.concat(this.createToken(mergedRange, SemanticTokenTypes.parameter));
                this.currentRange = flagRange;
                const flagValue = flag.getValue();
                if (flagValue !== null && flagValue !== "") {
                    const valueRange = flag.getValueRange();
                    tokens = tokens.concat(this.createToken(valueRange, SemanticTokenTypes.property));
                    this.currentRange = valueRange;
                }
            }
        }

        switch (instruction.getKeyword()) {
            case Keyword.FROM:
                const from = instruction as From;
                const nameRange = from.getImageNameRange();
                if (nameRange !== null) {
                    tokens = tokens.concat(this.createToken(nameRange, SemanticTokenTypes.class));
                    this.currentRange = nameRange;
                }
                const tagRange = from.getImageTagRange();
                if (tagRange !== null) {
                    tokens = tokens.concat(this.createToken(tagRange, SemanticTokenTypes.label));
                    this.currentRange = tagRange;
                }
                const digestRange = from.getImageDigestRange();
                if (digestRange !== null) {
                    tokens = tokens.concat(this.createToken(digestRange, SemanticTokenTypes.label));
                    this.currentRange = digestRange;
                }
                const fromArgs = instruction.getArguments();
                if (fromArgs.length > 1 && fromArgs[1].getValue().toUpperCase() === "AS") {
                    let range = fromArgs[1].getRange();
                    tokens = tokens.concat(this.createToken(range, SemanticTokenTypes.keyword));
                    this.currentRange = range;
                    range = from.getBuildStageRange();
                    if (range !== null) {
                        tokens = tokens.concat(this.createToken(range, SemanticTokenTypes.label));
                    }
                }
                break;
            case Keyword.HEALTHCHECK:
                const healthcheck = instruction as Healthcheck;
                const subcommand = healthcheck.getSubcommand();
                if (subcommand !== null) {
                    const range = subcommand.getRange();
                    tokens = tokens.concat(this.createToken(range, SemanticTokenTypes.keyword));
                }
                break;
            case Keyword.ONBUILD:
                const onbuild = instruction as Onbuild;
                const range = onbuild.getTriggerRange()
                if (range !== null) {
                    tokens = this.createTokensForInstruction(document, escapeCharacter, onbuild.getTriggerInstruction(), tokens);
                }
                break;
        }

        const args = instruction.getArguments();
        if (args.length === 0) {
            return tokens;
        }

        const start = args[0].getRange().start;
        const startOffset = document.offsetAt(start);
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
                    break;
                case '#':
                    if (escapedNewline) {
                        for (let j = i + 1; j < argsContent.length; j++) {
                            if (argsContent.charAt(j) === '\n' || argsContent.charAt(j) === '\r') {
                                let range = {
                                    start: document.positionAt(startOffset + i),
                                    end: document.positionAt(startOffset + j)
                                };
                                tokens = tokens.concat(this.createToken(range, SemanticTokenTypes.comment));
                                this.currentRange = range;
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
                                        start: document.positionAt(startOffset + i),
                                        end: document.positionAt(startOffset + j + 1)
                                    };
                                    tokens = tokens.concat(this.createToken(range, SemanticTokenTypes.string));
                                    this.currentRange = range;
                                    i = j;
                                    continue argsLoop;
                                } else {
                                    let range = {
                                        start: document.positionAt(startOffset + offset),
                                        end: document.positionAt(startOffset + i)
                                    };
                                    tokens = tokens.concat(this.createToken(range, SemanticTokenTypes.string));
                                    this.currentRange = range;
                                    range = {
                                        start: document.positionAt(startOffset + i),
                                        end: document.positionAt(startOffset + j + 1)
                                    };
                                    tokens = tokens.concat(this.createToken(range, SemanticTokenTypes.string));
                                    this.currentRange = range;
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
                        if (startOffset + i === document.offsetAt(range.start)) {
                            tokens = tokens.concat(
                                this.createToken(
                                    range, SemanticTokenTypes.variable, [SemanticTokenModifiers.reference]
                                )
                            );
                            this.currentRange = range;
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
                            start: document.positionAt(startOffset + offset),
                            end: document.positionAt(startOffset + i + 1)
                        };
                        tokens = tokens.concat(this.createToken(range, SemanticTokenTypes.string));
                        this.currentRange = range;
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
                start: document.positionAt(startOffset + offset),
                end: document.positionAt(startOffset + argsContent.length)
            };
            tokens = tokens.concat(this.createToken(range, SemanticTokenTypes.string));
            this.currentRange = range;
        }

        return tokens;
    }

    private createToken(range: Range, tokenType: string, tokenModifiers: string[] = []): number[] {
        if (this.currentRange === null) {
            return [
                range.start.line,
                range.start.character,
                range.end.character - range.start.character,
                TokensLegend.getTokenType(tokenType),
                TokensLegend.getTokenModifiers(tokenModifiers)
            ];
        } else if (this.currentRange.end.line !== range.start.line) {
            return [
                range.start.line - this.currentRange.end.line,
                range.start.character,
                range.end.character - range.start.character,
                TokensLegend.getTokenType(tokenType),
                TokensLegend.getTokenModifiers(tokenModifiers)
            ];
        }
        return [
            range.start.line - this.currentRange.start.line,
            range.start.character - this.currentRange.start.character,
            range.end.character - range.start.character,
            TokensLegend.getTokenType(tokenType),
            TokensLegend.getTokenModifiers(tokenModifiers)
        ];
    }

}
