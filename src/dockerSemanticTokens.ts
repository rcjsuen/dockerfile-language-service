/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import { SemanticTokens, SemanticTokenTypes, SemanticTokenModifiers } from 'vscode-languageserver-protocol/lib/protocol.sematicTokens.proposed';
import { DockerfileParser, Keyword, Comment, Instruction, Line, Healthcheck, ModifiableInstruction, From, Onbuild, PropertyInstruction, Argument } from 'dockerfile-ast';
import { Range, TextDocument, Position } from 'vscode-languageserver-types';
import { Dockerfile } from 'dockerfile-ast';
import { Util } from './docker';

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
        this.tokenTypes[SemanticTokenTypes.macro] = 6;
        this.tokenTypes[SemanticTokenTypes.string] = 7;
        this.tokenTypes[SemanticTokenTypes.variable] = 8;
        this.tokenTypes[SemanticTokenTypes.operator] = 9;

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

    private quote: string = null;
    private escapedQuote: string = null;
    private readonly escapeCharacter: string;

    constructor(content: string) {
        this.content = content;
        this.document = TextDocument.create("", "", 0, content);
        this.dockerfile = DockerfileParser.parse(content);
        this.escapeCharacter = this.dockerfile.getEscapeCharacter();
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
            const range = directive.getRange();
            const nameRange = directive.getNameRange();
            const prefixRange = { start: range.start, end: nameRange.start };
            this.createToken(null, prefixRange, SemanticTokenTypes.comment, [], false);
            this.createToken(null, nameRange, SemanticTokenTypes.property, [], false);

            const valueRange = directive.getValueRange();
            const operatorRange = {
                start: { character: valueRange.start.character - 1, line: valueRange.start.line },
                end: { character: valueRange.start.character, line: valueRange.start.line },
            }
            this.createToken(null, operatorRange, SemanticTokenTypes.operator, [], false);
            if (valueRange.start.character !== valueRange.end.character) {
                this.createToken(null, valueRange, SemanticTokenTypes.parameter, [], false);
            }
        }

        for (let i = 0; i < lines.length; i++) {
            if (lines[i] instanceof Comment) {
                const range = lines[i].getRange();
                this.createToken(null, range, SemanticTokenTypes.comment, [], false);
            } else {
                // trailing open quotes should not cause subsequent argument parameters to be flagged as strings
                this.quote = null;
                this.escapedQuote = null;
                this.createTokensForInstruction(lines[i] as Instruction);
            }
        }
        return {
            data: this.tokens
        }
    }

    private createTokensForInstruction(instruction: Instruction): number[] {
        const instructionRange = instruction.getInstructionRange();
        let modifiers = [];
        if (instruction.getKeyword() === Keyword.MAINTAINER) {
            modifiers = [SemanticTokenModifiers.deprecated];
        }
        this.createToken(instruction, instructionRange, SemanticTokenTypes.keyword, modifiers);

        if (instruction instanceof ModifiableInstruction) {
            for (const flag of instruction.getFlags()) {
                const flagRange = flag.getRange();
                let nameRange = flag.getNameRange();
                const mergedRange = {
                    start: flagRange.start,
                    end: nameRange.end
                };
                this.createToken(instruction, mergedRange, SemanticTokenTypes.parameter);
                const flagValue = flag.getValue();
                if (flagValue !== null) {
                    if (flag.hasOptions()) {
                        const operatorRange = {
                            start: mergedRange.end,
                            end: {
                                line: mergedRange.end.line,
                                character: mergedRange.end.character + 1
                            }
                        }
                        this.createToken(instruction, operatorRange, SemanticTokenTypes.operator, [], false, false);
                        for (const option of flag.getOptions()) {
                            nameRange = option.getNameRange();
                            this.createToken(instruction, nameRange, SemanticTokenTypes.parameter);
                            const valueRange = option.getValueRange();
                            const operatorRange = {
                                start: nameRange.end,
                                end: valueRange.start
                            }
                            this.createToken(instruction, operatorRange, SemanticTokenTypes.operator, [], false, false);
                            if (option.getValue() !== "") {
                                this.createToken(instruction, valueRange, SemanticTokenTypes.property);
                            }
                        }
                    } else {
                        const valueRange = flag.getValueRange();
                        const operatorRange = {
                            start: mergedRange.end,
                            end: valueRange.start
                        }
                        this.createToken(instruction, operatorRange, SemanticTokenTypes.operator, [], false, false);
                        if (flagValue !== "") {
                            this.createToken(instruction, valueRange, SemanticTokenTypes.property);
                        }
                    }
                }
            }
        }

        switch (instruction.getKeyword()) {
            case Keyword.ARG:
            case Keyword.ENV:
                const propertyInstruction = instruction as PropertyInstruction;
                for (const property of propertyInstruction.getProperties()) {
                    const nameRange = property.getNameRange();
                    this.createToken(instruction, nameRange, SemanticTokenTypes.variable, [SemanticTokenModifiers.declaration], false);
                    const valueRange = property.getValueRange();
                    if (valueRange !== null) {
                        const operatorRange = {
                            start: nameRange.end,
                            end: valueRange.start
                        }
                        this.createToken(instruction, operatorRange, SemanticTokenTypes.operator, [], false, false);
                        this.createToken(instruction, valueRange, SemanticTokenTypes.parameter, []);
                    }
                }
                return;
            case Keyword.FROM:
                const from = instruction as From;
                const nameRange = from.getImageNameRange();
                if (nameRange !== null) {
                    this.createToken(instruction, nameRange, SemanticTokenTypes.class);
                }
                const tagRange = from.getImageTagRange();
                if (tagRange !== null) {
                    this.createToken(instruction, tagRange, SemanticTokenTypes.label);
                }
                const digestRange = from.getImageDigestRange();
                if (digestRange !== null) {
                    this.createToken(instruction, digestRange, SemanticTokenTypes.label);
                }
                const fromArgs = instruction.getArguments();
                if (fromArgs.length > 1) {
                    if (fromArgs[1].getValue().toUpperCase() === "AS") {
                        let range = fromArgs[1].getRange();
                        this.createToken(instruction, range, SemanticTokenTypes.keyword);
                        if (fromArgs.length > 2) {
                            this.createToken(instruction, fromArgs[2].getRange(), SemanticTokenTypes.label);
                            if (fromArgs.length > 3) {
                                this.createArgumentTokens(instruction, fromArgs.slice(3));
                            }
                        }
                    } else {
                        this.createArgumentTokens(instruction, fromArgs.slice(1));
                    }
                }
                return;
            case Keyword.HEALTHCHECK:
                const healthcheck = instruction as Healthcheck;
                const subcommand = healthcheck.getSubcommand();
                if (subcommand !== null) {
                    const range = subcommand.getRange();
                    this.createToken(instruction, range, SemanticTokenTypes.keyword);

                    const args = instruction.getArguments();
                    if (args.length > 1) {
                        this.createArgumentTokens(instruction, args.slice(1));
                    }
                }
                return;
            case Keyword.ONBUILD:
                const onbuild = instruction as Onbuild;
                const range = onbuild.getTriggerRange()
                if (range !== null) {
                    this.createTokensForInstruction(onbuild.getTriggerInstruction());
                }
                return;
        }

        this.createArgumentTokens(instruction, instruction.getArguments());
    }

    private createArgumentTokens(instruction: Instruction, args: Argument[]): void {
        for (let i = 0; i < args.length; i++) {
            this.createToken(instruction, args[i].getRange(), SemanticTokenTypes.parameter, [], true, true);
        }
    }

    private handleLineChange(instruction: Instruction, next: Position, previous: Position): void {
        let comment = -1;
        for (let i = this.document.offsetAt(previous); i < this.document.offsetAt(next); i++) {
            switch (this.content.charAt(i)) {
                case this.escapeCharacter:
                    // mark the escape character if it's not in a comment 
                    if (comment === -1) {
                        this.createEscapeToken(instruction, i);
                    }
                    break;
                case '\r':
                case '\n':
                    if (comment !== -1) {
                        const commentRange = {
                            start: this.document.positionAt(comment),
                            end: this.document.positionAt(i)
                        };
                        this.createToken(null, commentRange, SemanticTokenTypes.comment, [], false);
                        comment = -1;
                    }
                    break;
                case '#':
                    if (comment === -1) {
                        comment = i;
                    }
                    break;
            }
        }
    }

    private createEscapeToken(instruction: Instruction, offset: number): void {
        const escapeRange = {
            start: this.document.positionAt(offset),
            end: this.document.positionAt(offset + 1),
        }
        this.createToken(instruction, escapeRange, SemanticTokenTypes.macro, [], false, false, false);
    }

    private createToken(instruction: Instruction, range: Range, tokenType: string, tokenModifiers: string[] = [], checkVariables: boolean = true, checkStrings: boolean = false, checkNewline: boolean = true): void {
        if (checkNewline && this.currentRange !== null && this.currentRange.end.line !== range.start.line) {
            // this implies that there's been a line change between one arg and the next
            this.handleLineChange(instruction, range.start, this.currentRange.end);
        }

        if (checkStrings) {
            let startOffset = this.document.offsetAt(range.start);
            let quoteStart = startOffset;
            let newOffset = -1;
            const endOffset = this.document.offsetAt(range.end);
            for (let i = startOffset; i < endOffset; i++) {
                let ch = this.content.charAt(i);
                switch (ch) {
                    case '\\':
                        const next = this.content.charAt(i + 1);
                        if (next === '\'' || next === '"') {
                            if (this.quote === null) {
                                if (this.escapedQuote === null) {
                                    quoteStart = i;
                                    this.escapedQuote = next;
                                } else {
                                    const quoteRange = {
                                        start: this.document.positionAt(quoteStart),
                                        end: this.document.positionAt(i + 2),
                                    };
                                    this.createToken(instruction, quoteRange, SemanticTokenTypes.string, [], false, false);
                                    newOffset = i + 2;
                                    this.escapedQuote = null;
                                }
                            }
                            i++;
                        }
                        break;
                    case '\'':
                    case '"':
                        if (this.quote === null) {
                            if (this.escapedQuote === null) {
                                this.quote = ch;
                                quoteStart = i;
                                if (startOffset !== quoteStart) {
                                    const intermediateRange = {
                                        start: this.document.positionAt(startOffset),
                                        end: this.document.positionAt(quoteStart),
                                    }
                                    this.createToken(instruction, intermediateRange, tokenType, tokenModifiers);
                                }
                            }
                        } else if (this.quote === ch) {
                            const quoteRange = {
                                start: this.document.positionAt(quoteStart),
                                end: this.document.positionAt(i + 1),
                            };
                            this.createToken(instruction, quoteRange, SemanticTokenTypes.string, [], false, false);
                            newOffset = i + 1;
                            this.quote = null;
                        }
                        break;
                }
            }

            if (this.quote !== null) {
                const quoteRange = {
                    start: this.document.positionAt(quoteStart),
                    end: this.document.positionAt(endOffset),
                };
                this.createToken(instruction, quoteRange, SemanticTokenTypes.string, [], false, false);
                return;
            } else if (newOffset !== -1) {
                if (newOffset !== endOffset) {
                    const intermediateRange = {
                        start: this.document.positionAt(newOffset),
                        end: this.document.positionAt(endOffset),
                    }
                    this.createToken(instruction, intermediateRange, tokenType, tokenModifiers);
                }
                return;
            } else if (this.quote !== null || this.escapedQuote !== null) {
                tokenType = SemanticTokenTypes.string;
            }
        }
        if (range.start.line !== range.end.line) {
            let startOffset = this.document.offsetAt(range.start);
            const endOffset = this.document.offsetAt(range.end);
            let intermediateAdded = false;
            let escaping = false;
            for (let i = startOffset; i < endOffset; i++) {
                let ch = this.content.charAt(i);
                switch (ch) {
                    case '#':
                        if (escaping) {
                            commentCheck: for (let j = i + 1; j < endOffset; j++) {
                                switch (this.content.charAt(j)) {
                                    case ' ':
                                    case '\t':
                                    case '\r':
                                        break;
                                    case '\n':
                                        const escapeRange = {
                                            start: this.document.positionAt(i),
                                            end: this.document.positionAt(j)
                                        }
                                        this.createToken(null, escapeRange, SemanticTokenTypes.comment, [], false);
                                        i = j;
                                        startOffset = -1;
                                        break commentCheck;
                                }
                            }
                        }
                        break;
                    case this.escapeCharacter:
                        // note whether the intermediate token has been added or not
                        let added = false;
                        escapeCheck: for (let j = i + 1; j < endOffset; j++) {
                            switch (this.content.charAt(j)) {
                                case ' ':
                                case '\t':
                                case '\r':
                                    break;
                                case '\n':
                                    if (!added) {
                                        if (!intermediateAdded) {
                                            const intermediateRange = {
                                                start: this.document.positionAt(startOffset),
                                                end: this.document.positionAt(i),
                                            }
                                            this.createToken(instruction, intermediateRange, tokenType, tokenModifiers);
                                            intermediateAdded = true;
                                        }
                                        this.createEscapeToken(instruction, i);
                                    }
                                    escaping = true;
                                    added = true;
                                    i = j;
                                    startOffset = -1;
                                    break;
                                default:
                                    break escapeCheck;
                            }
                        }
                        break;
                    default:
                        if (startOffset === -1) {
                            intermediateAdded = false;
                            escaping = false;
                            startOffset = i;
                        }
                        break;
                }
            }
            const intermediateRange = {
                start: this.document.positionAt(startOffset),
                end: this.document.positionAt(endOffset),
            }
            this.createToken(instruction, intermediateRange, tokenType, tokenModifiers);
            return;
        }

        if (checkVariables) {
            let startPosition = range.start;
            let lastVariableRange = null;
            for (const variable of instruction.getVariables()) {
                const variableRange = variable.getRange();
                if (Util.isInsideRange(variableRange.start, range)) {
                    if (Util.positionBefore(startPosition, variableRange.start)) {
                        // create a parameter token for the characters
                        // before the variable
                        this.createToken(
                            instruction,
                            {
                                start: startPosition,
                                end: variableRange.start
                            },
                            tokenType, tokenModifiers, false
                        );
                    }

                    this.createToken(
                        instruction, variableRange, SemanticTokenTypes.variable, [SemanticTokenModifiers.reference], false
                    );
                    lastVariableRange = variableRange;
                    if (Util.positionEquals(range.end, variableRange.end)) {
                        return;
                    }
                    startPosition = variableRange.end;
                }
            }

            if (lastVariableRange !== null) {
                // alter the range so it is the characters that comes
                // after the last matched variable
                range = { start: lastVariableRange.end, end: range.end };
            }
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
