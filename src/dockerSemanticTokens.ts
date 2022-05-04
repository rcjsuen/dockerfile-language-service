/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import { Range, TextDocument, Position, SemanticTokens, SemanticTokenTypes, SemanticTokenModifiers } from 'vscode-languageserver-types';
import { DockerfileParser, Keyword, Comment, Instruction, Line, Healthcheck, ModifiableInstruction, From, Onbuild, PropertyInstruction, Argument, Variable } from 'dockerfile-ast';
import { Dockerfile } from 'dockerfile-ast';
import { Util } from './docker';

export class TokensLegend {

    private static tokenTypes = {};

    private static tokenModifiers = {};
    
    public static init() {
        let counter = 0;
        this.tokenTypes[SemanticTokenTypes.keyword] = counter++; // 0
        this.tokenTypes[SemanticTokenTypes.comment] = counter++; // 1
        this.tokenTypes[SemanticTokenTypes.parameter] = counter++; // 2
        this.tokenTypes[SemanticTokenTypes.property] = counter++; // 3
        this.tokenTypes[SemanticTokenTypes.namespace] = counter++; // 4
        this.tokenTypes[SemanticTokenTypes.class] = counter++; // 5
        this.tokenTypes[SemanticTokenTypes.macro] = counter++; // 6
        this.tokenTypes[SemanticTokenTypes.string] = counter++; // 7
        this.tokenTypes[SemanticTokenTypes.variable] = counter++; // 8
        this.tokenTypes[SemanticTokenTypes.operator] = counter++; // 9
        this.tokenTypes[SemanticTokenTypes.modifier] = counter++; // 10

        this.tokenModifiers[SemanticTokenModifiers.declaration] = 1;
        this.tokenModifiers[SemanticTokenModifiers.definition] = 2;
        this.tokenModifiers[SemanticTokenModifiers.deprecated] = 4;
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
                            if (valueRange !== null) {
                                const operatorRange = {
                                    start: nameRange.end,
                                    end: valueRange.start
                                };
                                this.createToken(instruction, operatorRange, SemanticTokenTypes.operator, [], false, false);
                                if (option.getValue() !== "") {
                                    this.createToken(instruction, valueRange, SemanticTokenTypes.property);
                                }
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

        const args = instruction.getArguments();
        if (args.length === 0) {
            const range = instruction.getRange();
            if (range.start.line !== range.end.line) {
                // multiline instruction with no arguments,
                // only escaped newlines and possibly comments
                this.handleLineChange(instruction, instructionRange.end, range.end);
            }
            return;
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
                        let operatorRange = {
                            start: nameRange.end,
                            end: valueRange.start
                        }
                        if (this.document.getText(operatorRange).startsWith("=")) {
                            const nameRangeEnd = this.document.offsetAt(nameRange.end);
                            operatorRange = { start: nameRange.end, end: this.document.positionAt(nameRangeEnd + 1) };
                            this.createToken(instruction, operatorRange, SemanticTokenTypes.operator, [], false, false);
                        }
                        this.createToken(instruction, valueRange, SemanticTokenTypes.parameter, [], true, true);
                    }
                }
                return;
            case Keyword.FROM:
                const from = instruction as From;
                this.createToken(instruction, from.getImageNameRange(), SemanticTokenTypes.class);
                const tagRange = from.getImageTagRange();
                if (tagRange !== null) {
                    this.createToken(instruction, tagRange, SemanticTokenTypes.property);
                }
                const digestRange = from.getImageDigestRange();
                if (digestRange !== null) {
                    this.createToken(instruction, digestRange, SemanticTokenTypes.property);
                }
                const fromArgs = instruction.getArguments();
                if (fromArgs.length > 1) {
                    if (fromArgs[1].getValue().toUpperCase() === "AS") {
                        let range = fromArgs[1].getRange();
                        this.createToken(instruction, range, SemanticTokenTypes.keyword);
                        if (fromArgs.length > 2) {
                            this.createToken(instruction, fromArgs[2].getRange(), SemanticTokenTypes.namespace);
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
                const range = healthcheck.getSubcommand().getRange();
                this.createToken(instruction, range, SemanticTokenTypes.keyword);

                if (args.length > 1) {
                    this.createArgumentTokens(instruction, args.slice(1));
                }
                return;
            case Keyword.ONBUILD:
                const onbuild = instruction as Onbuild;
                this.createTokensForInstruction(onbuild.getTriggerInstruction());
                return;
        }

        this.createArgumentTokens(instruction, args);
    }

    private createArgumentTokens(instruction: Instruction, args: Argument[]): void {
        let lastRange: Range = null;
        for (let i = 0; i < args.length; i++) {
            lastRange = args[i].getRange();
            this.createToken(instruction, args[i].getRange(), SemanticTokenTypes.parameter, [], true, true);
        }

        const instructionRange = instruction.getRange();
        if (lastRange.end.line !== instructionRange.end.line || lastRange.end.character !== instructionRange.end.character) {
            this.handleLineChange(instruction, lastRange.end, instructionRange.end);
        }
    }

    private handleLineChange(instruction: Instruction, checkStart: Position, checkEnd: Position): void {
        let comment = -1;
        for (let i = this.document.offsetAt(checkStart); i < this.document.offsetAt(checkEnd); i++) {
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

    private createVariableToken(instruction: Instruction, variable: Variable, range: Range): void {
        const modifierRange = variable.getModifierRange();
        if (modifierRange === null) {
            this.createToken(instruction, range, SemanticTokenTypes.variable, [], false);
        } else {
            const operatorRange = Range.create(Position.create(modifierRange.start.line, modifierRange.start.character - 1), modifierRange.start);
            if (range.start.character < operatorRange.start.character) {
                // the operator is in the range, handle the content before the operator and the operator
                this.createToken(instruction, Range.create(range.start, operatorRange.start), SemanticTokenTypes.variable, [], false);
                this.createToken(instruction, operatorRange, SemanticTokenTypes.operator, [], false, false, false);
            }
            // check if there is more content after the operator to process
            if (range.end.character > operatorRange.end.character) {
                if (modifierRange.end.character >= range.start.character) {
                    // only render the modifier if there is one, the variable may be ${var:} which we then want to skip
                    if (modifierRange.start.character !== modifierRange.end.character) {
                        this.createToken(instruction, modifierRange, SemanticTokenTypes.modifier, [], false, false, false);
                    }
                    // process the content between the modifier and the end of the range if applicable
                    if (modifierRange.end.character !== range.end.character) {
                        this.createToken(instruction, Range.create(modifierRange.end, range.end), SemanticTokenTypes.variable, [], false);
                    }
                } else {
                    this.createToken(instruction, range, SemanticTokenTypes.variable, [], false);
                }
            }
        }
    }

    private createToken(instruction: Instruction, range: Range, tokenType: string, tokenModifiers: string[] = [], checkVariables: boolean = true, checkStrings: boolean = false, checkNewline: boolean = true): void {
        if (checkNewline && this.currentRange !== null && this.currentRange.end.line !== range.start.line) {
            // this implies that there's been a line change between one arg and the next
            this.handleLineChange(instruction, this.currentRange.end, range.start);
        }

        if (checkStrings) {
            let startOffset = this.document.offsetAt(range.start);
            let quoteStart = startOffset;
            let newOffset = -1;
            const endOffset = this.document.offsetAt(range.end);
            for (let i = startOffset; i < endOffset; i++) {
                let ch = this.content.charAt(i);
                switch (ch) {
                    case '\'':
                    case '"':
                        if (this.quote === null) {
                            if (this.escapedQuote === null) {
                                this.quote = ch;
                                quoteStart = i;
                                if (startOffset !== -1 && startOffset !== quoteStart) {
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
                            this.createToken(instruction, quoteRange, SemanticTokenTypes.string, [], true, false);
                            newOffset = i + 1;
                            startOffset = -1;
                            this.quote = null;
                        }
                        break;
                    default:
                        if (startOffset === -1) {
                            startOffset = i;
                        }
                        break;
                }
            }

            if (this.quote !== null) {
                const quoteRange = {
                    start: this.document.positionAt(quoteStart),
                    end: this.document.positionAt(endOffset),
                };
                this.createToken(instruction, quoteRange, SemanticTokenTypes.string, [], true, false);
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
                // there is now an open string, change the token to a string
                tokenType = SemanticTokenTypes.string;
                // reset the range to the start of the string
                range = {
                    start: this.document.positionAt(quoteStart),
                    end: range.end
                };
            }
        }
        if (range.start.line !== range.end.line) {
            let startOffset = this.document.offsetAt(range.start);
            const endOffset = this.document.offsetAt(range.end);
            let intermediateAdded = false;
            let handleNewlines = true;
            let escaping = false;
            for (let i = startOffset; i < endOffset; i++) {
                let ch = this.content.charAt(i);
                switch (ch) {
                    case '#':
                        if (escaping) {
                            let commenting = true;
                            commentCheck: for (let j = i + 1; j < endOffset; j++) {
                                switch (this.content.charAt(j)) {
                                    case ' ':
                                    case '\t':
                                        break;
                                    case '\r':
                                        const crComment = {
                                            start: this.document.positionAt(i),
                                            end: this.document.positionAt(j)
                                        }
                                        this.createToken(null, crComment, SemanticTokenTypes.comment, [], false);
                                        i = j + 1;
                                        startOffset = -1;
                                        commenting = false;
                                        j++;
                                        break;
                                    case '\n':
                                        const lfComment = {
                                            start: this.document.positionAt(i),
                                            end: this.document.positionAt(j)
                                        }
                                        this.createToken(null, lfComment, SemanticTokenTypes.comment, [], false);
                                        i = j;
                                        startOffset = -1;
                                        commenting = false;
                                        break;
                                    case '#':
                                        if (!commenting) {
                                            i = j;
                                        }
                                        commenting = true;
                                        break;
                                    default:
                                        if (commenting) {
                                            break;
                                        }
                                        i = j - 1;
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
                                        if (!intermediateAdded && startOffset !== -1) {
                                            const intermediateRange = {
                                                start: this.document.positionAt(startOffset),
                                                end: this.document.positionAt(i),
                                            }
                                            this.createToken(instruction, intermediateRange, tokenType, tokenModifiers);
                                            intermediateAdded = true;
                                        }
                                        this.createEscapeToken(instruction, i);
                                    }
                                    // escaped newlines have are being handled here already
                                    handleNewlines = false;
                                    escaping = true;
                                    added = true;
                                    i = j;
                                    startOffset = -1;
                                    break;
                                case '#':
                                    if (escaping) {
                                        i = j - 1;
                                        break escapeCheck;
                                    }
                                case '\\':
                                    if (!escaping) {
                                        intermediateAdded = false;
                                        escaping = false;
                                        i = j;
                                        break escapeCheck;
                                    }
                                    i = j;
                                    added = false;
                                    startOffset = j;
                                    break;
                                default:
                                    if (startOffset === -1) {
                                        intermediateAdded = false;
                                        escaping = false;
                                        startOffset = j;
                                        i = j;
                                    }
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

            if (startOffset === -1) {
                // we've processed the intermediate token but there is nothing of interest after it
                return;
            }
            const intermediateRange = {
                start: this.document.positionAt(startOffset),
                end: this.document.positionAt(endOffset),
            }
            this.createToken(instruction, intermediateRange, tokenType, tokenModifiers, checkVariables, checkStrings, handleNewlines);
            return;
        }

        if (checkVariables) {
            let startPosition = range.start;
            let lastVariableRange = null;
            for (const variable of instruction.getVariables()) {
                const variableRange = variable.getRange();
                if (Util.isInsideRange(range.start, variableRange) && Util.isInsideRange(range.end, variableRange)) {
                    if (tokenType === SemanticTokenTypes.string) {
                        break;
                    }
                    // the token is completely inside the variable's range, render it as a variable
                    this.createVariableToken(instruction, variable, range);
                    return;
                } else if (Util.isInsideRange(variableRange.start, range)) {
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

                    const variableProcessingRange = variableRange;
                    if (variableRange.end.character > range.end.character) {
                        variableProcessingRange.end = range.end;
                    }
                    this.createVariableToken(instruction, variable, variableProcessingRange);
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
