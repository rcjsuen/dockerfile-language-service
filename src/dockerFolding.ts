/* --------------------------------------------------------------------------------------------
* Copyright (c) Remy Suen. All rights reserved.
* Licensed under the MIT License. See License.txt in the project root for license information.
* ------------------------------------------------------------------------------------------ */
'use strict';

import { TextDocument } from 'vscode-languageserver-textdocument'; 
import { Position, Range, FoldingRange, FoldingRangeKind, uinteger } from 'vscode-languageserver-types';
import { DockerfileParser } from 'dockerfile-ast';

export class DockerFolding {

    private createFoldingRange(foldingRangeLineFoldingOnly: boolean, startLine: number, endLine: number, startCharacter: number, endCharacter: number, kind?: FoldingRangeKind): FoldingRange {
        if (foldingRangeLineFoldingOnly) {
            return {
                startLine,
                endLine,
                kind
            }
        }
        return FoldingRange.create(startLine, endLine, startCharacter, endCharacter, kind);
    }

    private getLineLength(document: TextDocument, line: number): number {
        let text = document.getText(Range.create(line, 0, line, uinteger.MAX_VALUE));
        let length = text.length;
        let char = text.charAt(length - 1);
        while (char === '\r' || char === '\n') {
            length--;
            char = text.charAt(length - 1);
        }
        return length;
    }

    public computeFoldingRanges(content: string, lineFoldingOnly: boolean, limit: number): FoldingRange[] {
        if (limit < 1) {
            return [];
        }

        const ranges = [];
        const dockerfile = DockerfileParser.parse(content);
        const document = TextDocument.create("", "", 0, content);
        for (const instruction of dockerfile.getInstructions()) {
            const range = instruction.getRange();
            if (range.start.line !== range.end.line) {
                const startLineLength = this.getLineLength(document, range.start.line);
                const endLineLength = this.getLineLength(document, range.end.line);
                ranges.push(this.createFoldingRange(lineFoldingOnly, range.start.line, range.end.line, startLineLength, endLineLength));
                if (ranges.length === limit) {
                    // return if we've reached the client's desired limit
                    return ranges;
                }
            }
        }
        const comments = dockerfile.getComments();
        if (comments.length < 2) {
            // no folding if zero or one comment
            return ranges;
        }

        let found = false;
        let startRange = comments[0].getRange();
        let end = Position.create(startRange.start.line + 1, startRange.start.character);
        for (let i = 1; i < comments.length; i++) {
            const range = comments[i].getRange();
            if (range.start.line === end.line) {
                // lines match, increment the folding range
                end = Position.create(range.end.line + 1, range.end.character);
                found = true
            } else {
                if (found) {
                    // fold the previously found lines
                    ranges.push(this.createFoldingRange(lineFoldingOnly, startRange.start.line, end.line - 1, startRange.end.character, end.character, FoldingRangeKind.Comment));
                    if (ranges.length === limit) {
                        // return if we've reached the client's desired limit
                        return ranges;
                    }
                }
                // reset
                startRange = range;
                end = Position.create(startRange.start.line + 1, startRange.start.character);
                found = false;
            }
        }

        // loop ended, consider fold any found lines if necessary
        if (found) {
            ranges.push(this.createFoldingRange(lineFoldingOnly, startRange.start.line, end.line - 1, startRange.end.character, end.character, FoldingRangeKind.Comment));
        }

        return ranges;
    }

}
