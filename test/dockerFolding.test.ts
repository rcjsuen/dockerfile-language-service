/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as assert from "assert";

import { FoldingRange, FoldingRangeKind } from 'vscode-languageserver-types';
import { DockerfileLanguageServiceFactory } from '../src/main';

const service = DockerfileLanguageServiceFactory.createLanguageService();

function assertFoldingRange(lineFoldingOnly: boolean, range: FoldingRange, startLine: number, startCharacter: number, endLine: number, endCharacter: number, kind: FoldingRangeKind) {
    assert.strictEqual(range.kind, kind);
    assert.strictEqual(range.startLine, startLine);
    assert.strictEqual(range.startCharacter, lineFoldingOnly ? undefined : startCharacter);
    assert.strictEqual(range.endLine, endLine);
    assert.strictEqual(range.endCharacter, lineFoldingOnly ? undefined : endCharacter);
}

function computeFoldingRanges(content: string, lineFoldingOnly: boolean, rangeLimit: number): FoldingRange[] {
    service.setCapabilities({
        foldingRange: {
            lineFoldingOnly,
            rangeLimit
        }
    })
    return service.computeFoldingRanges(content);
}

describe("Dockerfile folding", () => {
    describe("coments", () => {
        function createCommentsTests(lineFoldingOnly: boolean, rangeLimit: number) {
            it("single line", () => {
                let content = "# comment\nFROM node";
                let ranges = computeFoldingRanges(content, lineFoldingOnly, rangeLimit);
                assert.strictEqual(ranges.length, 0);
            });

            it("single line ignores escaped newlines", () => {
                let content = "FROM node\nENV a=b \\\n# comment\n\\\n# comment2\n c=d";
                let ranges = computeFoldingRanges(content, lineFoldingOnly, rangeLimit);
                assert.strictEqual(ranges.length, 0);
            });

            it("multiline 2 lines", () => {
                let content = "# comment\n# comment2\nFROM node";
                let ranges = computeFoldingRanges(content, lineFoldingOnly, rangeLimit);
                if (rangeLimit < 1) {
                    assert.strictEqual(ranges.length, 0);
                } else {
                    assert.strictEqual(ranges.length, 1);
                    assertFoldingRange(lineFoldingOnly, ranges[0], 0, 9, 1, 10, FoldingRangeKind.Comment);
                }
            });

            it("multiline 3 lines", () => {
                let content = "# comment\n# comment2\n# comment3\nFROM node";
                let ranges = computeFoldingRanges(content, lineFoldingOnly, rangeLimit);
                if (rangeLimit < 1) {
                    assert.strictEqual(ranges.length, 0);
                } else {
                    assert.strictEqual(ranges.length, 1);
                    assertFoldingRange(lineFoldingOnly, ranges[0], 0, 9, 2, 10, FoldingRangeKind.Comment);
                }
            });

            it("multiline space between", () => {
                let content = "# comment\n# comment2\n\n# comment3\n# comment4\nFROM node";
                let ranges = computeFoldingRanges(content, lineFoldingOnly, rangeLimit);
                if (rangeLimit < 1) {
                    assert.strictEqual(ranges.length, 0);
                } else if (rangeLimit == 1) {
                    assert.strictEqual(ranges.length, 1);
                    assertFoldingRange(lineFoldingOnly, ranges[0], 0, 9, 1, 10, FoldingRangeKind.Comment);
                } else {
                    assert.strictEqual(ranges.length, 2);
                    assertFoldingRange(lineFoldingOnly, ranges[0], 0, 9, 1, 10, FoldingRangeKind.Comment);
                    assertFoldingRange(lineFoldingOnly, ranges[1], 3, 10, 4, 10, FoldingRangeKind.Comment);
                }
            });

            it("multiline ignores directive", () => {
                let content = "#escape=`\n# comment\n# comment2\nFROM node";
                let ranges = computeFoldingRanges(content, lineFoldingOnly, rangeLimit);
                if (rangeLimit < 1) {
                    assert.strictEqual(ranges.length, 0);
                } else {
                    assert.strictEqual(ranges.length, 1);
                    assertFoldingRange(lineFoldingOnly, ranges[0], 1, 9, 2, 10, FoldingRangeKind.Comment);
                }
            });

            it("multiline false directive", () => {
                let content = "\n#escape=`\n# comment\n# comment2\nFROM node";
                let ranges = computeFoldingRanges(content, lineFoldingOnly, rangeLimit);
                if (rangeLimit < 1) {
                    assert.strictEqual(ranges.length, 0);
                } else {
                    assert.strictEqual(ranges.length, 1);
                    assertFoldingRange(lineFoldingOnly, ranges[0], 1, 9, 3, 10, FoldingRangeKind.Comment);
                }
            });
        }

        describe("unlimited", () => {
            describe("standard", () => {
                createCommentsTests(false, Number.MAX_VALUE);
            });

            describe("line folding only", () => {
                createCommentsTests(true, Number.MAX_VALUE);
            });
        });

        describe("zero folding ranges", () => {
            describe("standard", () => {
                createCommentsTests(false, 0);
            });

            describe("line folding only", () => {
                createCommentsTests(true, 0);
            });
        });

        describe("one folding range", () => {
            describe("standard", () => {
                createCommentsTests(false, 1);
            });

            describe("line folding only", () => {
                createCommentsTests(true, 1);
            });
        });

        describe("two folding ranges", () => {
            describe("standard", () => {
                createCommentsTests(false, 2);
            });

            describe("line folding only", () => {
                createCommentsTests(true, 2);
            });
        });
    });
});
