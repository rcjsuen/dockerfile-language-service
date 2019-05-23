/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as assert from "assert";

import { Range, Position, DocumentHighlight, DocumentHighlightKind, TextDocumentIdentifier } from 'vscode-languageserver-types';
import { DockerfileLanguageServiceFactory } from '../src/main';

let service = DockerfileLanguageServiceFactory.createLanguageService();

function computeHighlightRanges(content: string, line: number, character: number): DocumentHighlight[] {
    return service.computeHighlightRanges(content, Position.create(line, character));
}

function assertHighlight(highlight: DocumentHighlight, kind: DocumentHighlightKind, startLine: number, startCharacter: number, endLine: number, endCharacter: number) {
    assert.equal(highlight.kind, kind);
    assert.equal(highlight.range.start.line, startLine);
    assert.equal(highlight.range.start.character, startCharacter);
    assert.equal(highlight.range.end.line, endLine);
    assert.equal(highlight.range.end.character, endCharacter);
}

function assertHighlightRanges(actual: DocumentHighlight[], expected: DocumentHighlight[]) {
    assert.equal(actual.length, expected.length);
    for (let i = 0; i < actual.length; i++) {
        assertHighlightRange(actual[i], expected[i]);
    }
}

function assertHighlightRange(actual: DocumentHighlight, expected: DocumentHighlight) {
    assert.equal(actual.kind, expected.kind);
    assert.equal(actual.range.start.line, expected.range.start.line);
    assert.equal(actual.range.start.character, expected.range.start.character);
    assert.equal(actual.range.end.line, expected.range.end.line);
    assert.equal(actual.range.end.character, expected.range.end.character);
}

describe("Dockerfile Document Highlight tests", function () {
    describe("FROM", function () {
        describe("AS name", function () {
            it("no COPY", function () {
                let content = "FROM node AS bootstrap";
                let ranges = computeHighlightRanges(content, 0, 17);
                assert.equal(ranges.length, 1);
                assertHighlight(ranges[0], DocumentHighlightKind.Write, 0, 13, 0, 22);
            });

            it("repeated FROM", function () {
                // same casing
                let content = "FROM node AS bootstrap\nFROM node AS bootstrap";
                let ranges = computeHighlightRanges(content, 0, 17);
                assert.equal(ranges.length, 2);
                assertHighlight(ranges[0], DocumentHighlightKind.Write, 0, 13, 0, 22);
                assertHighlight(ranges[1], DocumentHighlightKind.Write, 1, 13, 1, 22);

                ranges = computeHighlightRanges(content, 1, 17);
                assert.equal(ranges.length, 2);
                assertHighlight(ranges[0], DocumentHighlightKind.Write, 0, 13, 0, 22);
                assertHighlight(ranges[1], DocumentHighlightKind.Write, 1, 13, 1, 22);

                // differnt casing
                content = "FROM node AS bootstrap\nFROM node AS BOOTSTRAP";
                ranges = computeHighlightRanges(content, 0, 17);
                assert.equal(ranges.length, 2);
                assertHighlight(ranges[0], DocumentHighlightKind.Write, 0, 13, 0, 22);
                assertHighlight(ranges[1], DocumentHighlightKind.Write, 1, 13, 1, 22);

                ranges = computeHighlightRanges(content, 1, 17);
                assert.equal(ranges.length, 2);
                assertHighlight(ranges[0], DocumentHighlightKind.Write, 0, 13, 0, 22);
                assertHighlight(ranges[1], DocumentHighlightKind.Write, 1, 13, 1, 22);
            });

            it("COPY", function () {
                let content = "FROM node AS bootstrap\nFROM node\nCOPY --from=bootstrap /git/bin/app .";
                // cursor in the FROM
                let ranges = computeHighlightRanges(content, 0, 17);
                assert.equal(ranges.length, 2);
                assertHighlight(ranges[0], DocumentHighlightKind.Write, 0, 13, 0, 22);
                assertHighlight(ranges[1], DocumentHighlightKind.Read, 2, 12, 2, 21);

                // cursor in the COPY
                ranges = computeHighlightRanges(content, 2, 16);
                assert.equal(ranges.length, 2);
                assertHighlight(ranges[0], DocumentHighlightKind.Write, 0, 13, 0, 22);
                assertHighlight(ranges[1], DocumentHighlightKind.Read, 2, 12, 2, 21);

                content = "FROM node AS bootstrap\nFROM node\nCOPY --from=BOOTSTRAP /git/bin/app .";
                // cursor in the FROM
                ranges = computeHighlightRanges(content, 0, 17);
                assert.equal(ranges.length, 2);
                assertHighlight(ranges[0], DocumentHighlightKind.Write, 0, 13, 0, 22);
                assertHighlight(ranges[1], DocumentHighlightKind.Read, 2, 12, 2, 21);

                // cursor in the COPY
                ranges = computeHighlightRanges(content, 2, 16);
                assert.equal(ranges.length, 2);
                assertHighlight(ranges[0], DocumentHighlightKind.Write, 0, 13, 0, 22);
                assertHighlight(ranges[1], DocumentHighlightKind.Read, 2, 12, 2, 21);

                content = "FROM node AS bootstrap\nFROM node AS bootstrap2\nCOPY --from=bootstrap2 /git/bin/app .";
                // cursor in the FROM
                ranges = computeHighlightRanges(content, 1, 17);
                assert.equal(ranges.length, 2);
                assertHighlight(ranges[0], DocumentHighlightKind.Write, 1, 13, 1, 23);
                assertHighlight(ranges[1], DocumentHighlightKind.Read, 2, 12, 2, 22);

                // cursor in the COPY
                ranges = computeHighlightRanges(content, 2, 16);
                assert.equal(ranges.length, 2);
                assertHighlight(ranges[0], DocumentHighlightKind.Write, 1, 13, 1, 23);
                assertHighlight(ranges[1], DocumentHighlightKind.Read, 2, 12, 2, 22);

                content = "FROM node AS bootstrap\nFROM node AS bootstrap2\nCOPY --from=BOOTSTRAP2 /git/bin/app .";
                // cursor in the FROM
                ranges = computeHighlightRanges(content, 1, 17);
                assert.equal(ranges.length, 2);
                assertHighlight(ranges[0], DocumentHighlightKind.Write, 1, 13, 1, 23);
                assertHighlight(ranges[1], DocumentHighlightKind.Read, 2, 12, 2, 22);

                // cursor in the COPY
                ranges = computeHighlightRanges(content, 2, 16);
                assert.equal(ranges.length, 2);
                assertHighlight(ranges[0], DocumentHighlightKind.Write, 1, 13, 1, 23);
                assertHighlight(ranges[1], DocumentHighlightKind.Read, 2, 12, 2, 22);
            });

            it("COPY incomplete", function () {
                let content = "FROM node AS bootstrap\nFROM node\nCOPY --from=bootstrap";
                // cursor in the FROM
                let ranges = computeHighlightRanges(content, 0, 17);
                assert.equal(ranges.length, 2);
                assertHighlight(ranges[0], DocumentHighlightKind.Write, 0, 13, 0, 22);
                assertHighlight(ranges[1], DocumentHighlightKind.Read, 2, 12, 2, 21);

                // cursor in the COPY
                ranges = computeHighlightRanges(content, 2, 16);
                assert.equal(ranges.length, 2);
                assertHighlight(ranges[0], DocumentHighlightKind.Write, 0, 13, 0, 22);
                assertHighlight(ranges[1], DocumentHighlightKind.Read, 2, 12, 2, 21);

                content = "FROM node AS bootstrap\nFROM node\nCOPY --from=BOOTSTRAP";
                // cursor in the FROM
                ranges = computeHighlightRanges(content, 0, 17);
                assert.equal(ranges.length, 2);
                assertHighlight(ranges[0], DocumentHighlightKind.Write, 0, 13, 0, 22);
                assertHighlight(ranges[1], DocumentHighlightKind.Read, 2, 12, 2, 21);

                // cursor in the COPY
                ranges = computeHighlightRanges(content, 2, 16);
                assert.equal(ranges.length, 2);
                assertHighlight(ranges[0], DocumentHighlightKind.Write, 0, 13, 0, 22);
                assertHighlight(ranges[1], DocumentHighlightKind.Read, 2, 12, 2, 21);
            });

            it("source mismatch", function () {
                let content = "FROM node AS bootstrap\nFROM node\nCOPY --from=other\nCOPY --from=bootstrap2 /git/bin/app .";
                // cursor in the FROM
                let ranges = computeHighlightRanges(content, 0, 17);
                assert.equal(ranges.length, 1);
                assertHighlight(ranges[0], DocumentHighlightKind.Write, 0, 13, 0, 22);

                // cursor in the COPY
                ranges = computeHighlightRanges(content, 3, 16);
                assert.equal(ranges.length, 1);
                assertHighlight(ranges[0], DocumentHighlightKind.Read, 3, 12, 3, 22);
            });

            it("no FROM but identical COPYs", function () {
                let content = "FROM node\nCOPY --from=dev\nCOPY --from=dev /git/bin/app .";
                // cursor in the first COPY
                let ranges = computeHighlightRanges(content, 1, 13);
                assert.equal(ranges.length, 2);
                assertHighlight(ranges[0], DocumentHighlightKind.Read, 1, 12, 1, 15);
                assertHighlight(ranges[1], DocumentHighlightKind.Read, 2, 12, 2, 15);

                // cursor in the second COPY
                ranges = computeHighlightRanges(content, 2, 13);
                assert.equal(ranges.length, 2);
                assertHighlight(ranges[0], DocumentHighlightKind.Read, 1, 12, 1, 15);
                assertHighlight(ranges[1], DocumentHighlightKind.Read, 2, 12, 2, 15);
            });
        });

        describe("invalid", function () {
            it("position", function () {
                let content = "FROM node AS bootstrap   \nFROM node\nCOPY --from=bootstrap /git/bin/app .";
                // cursor after the AS source image
                let ranges = computeHighlightRanges(content, 0, 24);
                assert.equal(ranges.length, 0);
                // cursor after the COPY --from
                ranges = computeHighlightRanges(content, 2, 22);
                assert.equal(ranges.length, 0);
            });

            it("COPY bootstrap", function () {
                let content = "FROM node AS bootstrap\nCOPY bootstrap /git/build/";
                // cursor after the AS source image
                let ranges = computeHighlightRanges(content, 0, 17);
                assert.equal(ranges.length, 1);
                assertHighlight(ranges[0], DocumentHighlightKind.Write, 0, 13, 0, 22);
                // cursor on COPY bootstrap
                ranges = computeHighlightRanges(content, 1, 10);
                assert.equal(ranges.length, 0);
            });
        });
    });

    function createVariablesTest(testSuiteName: string, instruction: string, delimiter: string) {
        describe(testSuiteName, function () {
            describe("no FROM", function () {

                it("referenced variable ${var}", function () {
                    let arg = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 7)), DocumentHighlightKind.Write);
                    let stopsignal = DocumentHighlight.create(Range.create(Position.create(1, 13), Position.create(1, 16)), DocumentHighlightKind.Read);
                    let user = DocumentHighlight.create(Range.create(Position.create(2, 7), Position.create(2, 10)), DocumentHighlightKind.Read);
                    let workdir = DocumentHighlight.create(Range.create(Position.create(3, 10), Position.create(3, 13)), DocumentHighlightKind.Read);
                    let expected = [arg, stopsignal, user, workdir];
                    let content = instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}";
                    let ranges = computeHighlightRanges(content, 0, 5);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 1, 13);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 2, 7);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 3, 11);
                    assertHighlightRanges(ranges, expected);

                    content = instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var}\nUSER ${var2}\nWORKDIR ${var2}";
                    ranges = computeHighlightRanges(content, 1, 13);
                    assertHighlightRanges(ranges, [arg, stopsignal]);
                });

                it("referenced variable ${var} no value", function () {
                    let arg = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 7)), DocumentHighlightKind.Write);
                    let stopsignal = DocumentHighlight.create(Range.create(Position.create(1, 13), Position.create(1, 16)), DocumentHighlightKind.Read);
                    let user = DocumentHighlight.create(Range.create(Position.create(2, 7), Position.create(2, 10)), DocumentHighlightKind.Read);
                    let workdir = DocumentHighlight.create(Range.create(Position.create(3, 10), Position.create(3, 13)), DocumentHighlightKind.Read);
                    let expected = [arg, stopsignal, user, workdir];
                    let content = instruction + " var\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}";
                    let ranges = computeHighlightRanges(content, 0, 5);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 1, 13);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 2, 7);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 3, 11);
                    assertHighlightRanges(ranges, expected);
                });

                it("referenced variable ${var:modifier}", function () {
                    let arg = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 7)), DocumentHighlightKind.Write);
                    let stopsignal = DocumentHighlight.create(Range.create(Position.create(1, 13), Position.create(1, 16)), DocumentHighlightKind.Read);
                    let user = DocumentHighlight.create(Range.create(Position.create(2, 7), Position.create(2, 10)), DocumentHighlightKind.Read);
                    let workdir = DocumentHighlight.create(Range.create(Position.create(3, 10), Position.create(3, 13)), DocumentHighlightKind.Read);
                    let expected = [arg, stopsignal, user, workdir];
                    let content = instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var:+var}\nUSER ${var:+var}\nWORKDIR ${var:+var}";
                    let ranges = computeHighlightRanges(content, 0, 5);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 1, 13);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 2, 7);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 3, 11);
                    assertHighlightRanges(ranges, expected);

                    content = instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var:-var}\nUSER ${var:-var}\nWORKDIR ${var:-var}";
                    ranges = computeHighlightRanges(content, 0, 5);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 1, 13);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 2, 7);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 3, 11);
                    assertHighlightRanges(ranges, expected);
                });

                it("referenced variable $var", function () {
                    let arg = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 7)), DocumentHighlightKind.Write);
                    let stopsignal = DocumentHighlight.create(Range.create(Position.create(1, 12), Position.create(1, 15)), DocumentHighlightKind.Read);
                    let user = DocumentHighlight.create(Range.create(Position.create(2, 6), Position.create(2, 9)), DocumentHighlightKind.Read);
                    let workdir = DocumentHighlight.create(Range.create(Position.create(3, 9), Position.create(3, 12)), DocumentHighlightKind.Read);
                    let expected = [arg, stopsignal, user, workdir];
                    let content = instruction + " var" + delimiter + "value\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                    let ranges = computeHighlightRanges(content, 0, 5);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 1, 13);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 2, 7);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 3, 11);
                    assertHighlightRanges(ranges, expected);

                    let run = DocumentHighlight.create(Range.create(Position.create(1, 11), Position.create(1, 14)), DocumentHighlightKind.Read);
                    content = instruction + " var" + delimiter + "value\nRUN echo \"$var\"";
                    ranges = computeHighlightRanges(content, 1, 13);
                    assertHighlightRanges(ranges, [arg, run]);

                    content = instruction + " var" + delimiter + "value\nRUN echo '$var'";
                    ranges = computeHighlightRanges(content, 1, 13);
                    assertHighlightRanges(ranges, [arg, run]);
                });

                it("referenced variable $var no value", function () {
                    let arg = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 7)), DocumentHighlightKind.Write);
                    let stopsignal = DocumentHighlight.create(Range.create(Position.create(1, 12), Position.create(1, 15)), DocumentHighlightKind.Read);
                    let user = DocumentHighlight.create(Range.create(Position.create(2, 6), Position.create(2, 9)), DocumentHighlightKind.Read);
                    let workdir = DocumentHighlight.create(Range.create(Position.create(3, 9), Position.create(3, 12)), DocumentHighlightKind.Read);
                    let expected = [arg, stopsignal, user, workdir];
                    let content = instruction + " var\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                    let ranges = computeHighlightRanges(content, 0, 5);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 1, 13);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 2, 7);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 3, 11);
                    assertHighlightRanges(ranges, expected);

                    let run = DocumentHighlight.create(Range.create(Position.create(1, 11), Position.create(1, 14)), DocumentHighlightKind.Read);
                    content = instruction + " var\nRUN echo \"$var\"";
                    ranges = computeHighlightRanges(content, 1, 13);
                    assertHighlightRanges(ranges, [arg, run]);

                    content = instruction + " var\nRUN echo '$var'";
                    ranges = computeHighlightRanges(content, 1, 13);
                    assertHighlightRanges(ranges, [arg, run]);
                });

                it("repeated declaration $var", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 7)), DocumentHighlightKind.Write);
                    let declaration2 = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 7)), DocumentHighlightKind.Write);
                    let run = DocumentHighlight.create(Range.create(Position.create(2, 10), Position.create(2, 13)), DocumentHighlightKind.Read);
                    let run2 = DocumentHighlight.create(Range.create(Position.create(3, 10), Position.create(3, 13)), DocumentHighlightKind.Read);
                    let expected = [declaration, declaration2, run, run2];
                    let content = instruction + " var=value\n" + instruction + " var=value\nRUN echo $var\nRUN echo $var";
                    let ranges = computeHighlightRanges(content, 0, 5);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 1, 5);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 2, 11);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 3, 11);
                    assertHighlightRanges(ranges, expected);
                });

                it("repeated declaration $var no value", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 7)), DocumentHighlightKind.Write);
                    let declaration2 = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 7)), DocumentHighlightKind.Write);
                    let run = DocumentHighlight.create(Range.create(Position.create(2, 10), Position.create(2, 13)), DocumentHighlightKind.Read);
                    let run2 = DocumentHighlight.create(Range.create(Position.create(3, 10), Position.create(3, 13)), DocumentHighlightKind.Read);
                    let expected = [declaration, declaration2, run, run2];
                    let content = instruction + " var\n" + instruction + " var\nRUN echo $var\nRUN echo $var";
                    let ranges = computeHighlightRanges(content, 0, 5);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 1, 5);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 2, 11);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 3, 11);
                    assertHighlightRanges(ranges, expected);
                });

                it("repeated declaration ${var}", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 7)), DocumentHighlightKind.Write);
                    let declaration2 = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 7)), DocumentHighlightKind.Write);
                    let run = DocumentHighlight.create(Range.create(Position.create(2, 11), Position.create(2, 14)), DocumentHighlightKind.Read);
                    let run2 = DocumentHighlight.create(Range.create(Position.create(3, 11), Position.create(3, 14)), DocumentHighlightKind.Read);
                    let expected = [declaration, declaration2, run, run2];
                    let content = instruction + " var=value\n" + instruction + " var=value\nRUN echo ${var}\nRUN echo ${var}";
                    let ranges = computeHighlightRanges(content, 0, 5);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 1, 5);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 2, 11);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 3, 11);
                    assertHighlightRanges(ranges, expected);
                });

                it("repeated declaration $var no value", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 7)), DocumentHighlightKind.Write);
                    let declaration2 = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 7)), DocumentHighlightKind.Write);
                    let run = DocumentHighlight.create(Range.create(Position.create(2, 11), Position.create(2, 14)), DocumentHighlightKind.Read);
                    let run2 = DocumentHighlight.create(Range.create(Position.create(3, 11), Position.create(3, 14)), DocumentHighlightKind.Read);
                    let expected = [declaration, declaration2, run, run2];
                    let content = instruction + " var\n" + instruction + " var\nRUN echo ${var}\nRUN echo ${var}";
                    let ranges = computeHighlightRanges(content, 0, 5);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 1, 5);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 2, 12);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 3, 12);
                    assertHighlightRanges(ranges, expected);
                });

                it("$var in LABEL value with single quotes", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 7)), DocumentHighlightKind.Write);
                    let content = instruction + " var" + delimiter + "value\nLABEL label='$var'";
                    let ranges = computeHighlightRanges(content, 0, 5);
                    assertHighlightRanges(ranges, [declaration]);

                    ranges = computeHighlightRanges(content, 1, 15);
                    assert.equal(ranges.length, 0);
                });

                it("$var in LABEL value with double quotes", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 7)), DocumentHighlightKind.Write);
                    let labelValue = DocumentHighlight.create(Range.create(Position.create(1, 14), Position.create(1, 17)), DocumentHighlightKind.Read);
                    let expected = [declaration, labelValue];
                    let content = instruction + " var" + delimiter + "value\nLABEL label=\"$var\"";
                    let ranges = computeHighlightRanges(content, 0, 5);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 1, 15);
                    assertHighlightRanges(ranges, expected);
                });

                it("${var} in LABEL value with single quotes", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 7)), DocumentHighlightKind.Write);
                    let content = instruction + " var" + delimiter + "value\nLABEL label='${var}'";
                    let ranges = computeHighlightRanges(content, 0, 5);
                    assertHighlightRanges(ranges, [declaration]);

                    ranges = computeHighlightRanges(content, 1, 17);
                    assert.equal(ranges.length, 0);
                });

                it("${var} in LABEL value with double quotes", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 7)), DocumentHighlightKind.Write);
                    let labelValue = DocumentHighlight.create(Range.create(Position.create(1, 15), Position.create(1, 18)), DocumentHighlightKind.Read);
                    let expected = [declaration, labelValue];
                    let content = instruction + " var" + delimiter + "value\nLABEL label=\"${var}\"";
                    let ranges = computeHighlightRanges(content, 0, 5);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(content, 1, 17);
                    assertHighlightRanges(ranges, expected);
                });

                it("multiline reference \\n", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 8)), DocumentHighlightKind.Write);
                    let reference = DocumentHighlight.create(Range.create(Position.create(1, 8), Position.create(2, 2)), DocumentHighlightKind.Read);
                    let expected = [declaration, reference];
                    let content = instruction + " port=8080\nEXPOSE $po\\\nrt";
                    let ranges = computeHighlightRanges(content, 2, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(content, 2, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(content, 2, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 8)), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(Position.create(2, 8), Position.create(3, 2)), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    content = "#escape=`\n" + instruction + " port=8080\nEXPOSE $po`\nrt";
                    ranges = computeHighlightRanges(content, 3, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(content, 3, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(content, 3, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 8)), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(Position.create(1, 9), Position.create(2, 2)), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    content = instruction + " port=8080\nEXPOSE ${po\\\nrt}";
                    ranges = computeHighlightRanges(content, 2, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(content, 2, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(content, 2, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 8)), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(Position.create(2, 9), Position.create(3, 2)), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    content = "#escape=`\n" + instruction + " port=8080\nEXPOSE ${po`\nrt}";
                    ranges = computeHighlightRanges(content, 3, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(content, 3, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(content, 3, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(0, 4, 0, 8), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(1, 12, 2, 2), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    content = instruction + " port=8080\nLABEL key=\"$po\\\nrt\"";
                    ranges = computeHighlightRanges(content, 2, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(content, 2, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(content, 2, 2);
                    assertHighlightRanges(ranges, expected);
                });

                it("multiline reference \\r\\n", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 8)), DocumentHighlightKind.Write);
                    let reference = DocumentHighlight.create(Range.create(Position.create(1, 8), Position.create(2, 2)), DocumentHighlightKind.Read);
                    let expected = [declaration, reference];
                    let document = instruction + " port=8080\nEXPOSE $po\\\r\nrt";
                    let ranges = computeHighlightRanges(document, 2, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 8)), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(Position.create(2, 8), Position.create(3, 2)), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = "#escape=`\n" + instruction + " port=8080\nEXPOSE $po`\r\nrt";
                    ranges = computeHighlightRanges(document, 3, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 8)), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(Position.create(1, 9), Position.create(2, 2)), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = instruction + " port=8080\nEXPOSE ${po\\\r\nrt}";
                    ranges = computeHighlightRanges(document, 2, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 8)), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(Position.create(2, 9), Position.create(3, 2)), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = "#escape=`\n" + instruction + " port=8080\nEXPOSE ${po`\r\nrt}";
                    ranges = computeHighlightRanges(document, 3, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(0, 4, 0, 8), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(1, 12, 2, 2), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = instruction + " port=8080\nLABEL key=\"$po\\\r\nrt\"";
                    ranges = computeHighlightRanges(document, 2, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 2);
                    assertHighlightRanges(ranges, expected);
                });

                it("multiline reference \\n spaced", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 8)), DocumentHighlightKind.Write);
                    let reference = DocumentHighlight.create(Range.create(Position.create(1, 8), Position.create(2, 2)), DocumentHighlightKind.Read);
                    let expected = [declaration, reference];
                    let document = instruction + " port=8080\nEXPOSE $po\\ \t\nrt";
                    let ranges = computeHighlightRanges(document, 2, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 8)), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(Position.create(2, 8), Position.create(3, 2)), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = "#escape=`\n" + instruction + " port=8080\nEXPOSE $po` \t\nrt";
                    ranges = computeHighlightRanges(document, 3, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 8)), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(Position.create(1, 9), Position.create(2, 2)), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = instruction + " port=8080\nEXPOSE ${po\\ \t\nrt}";
                    ranges = computeHighlightRanges(document, 2, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 8)), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(Position.create(2, 9), Position.create(3, 2)), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = "#escape=`\n" + instruction + " port=8080\nEXPOSE ${po` \t\nrt}";
                    ranges = computeHighlightRanges(document, 3, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(0, 4, 0, 8), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(1, 12, 2, 2), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = instruction + " port=8080\nLABEL key=\"$po\\ \t\nrt\"";
                    ranges = computeHighlightRanges(document, 2, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 2);
                    assertHighlightRanges(ranges, expected);
                });

                it("multiline reference \\r\\n spaced", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 8)), DocumentHighlightKind.Write);
                    let reference = DocumentHighlight.create(Range.create(Position.create(1, 8), Position.create(2, 2)), DocumentHighlightKind.Read);
                    let expected = [declaration, reference];
                    let document = instruction + " port=8080\nEXPOSE $po\\ \t\r\nrt";
                    let ranges = computeHighlightRanges(document, 2, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 8)), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(Position.create(2, 8), Position.create(3, 2)), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = "#escape=`\n" + instruction + " port=8080\nEXPOSE $po` \t\r\nrt";
                    ranges = computeHighlightRanges(document, 3, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 8)), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(Position.create(1, 9), Position.create(2, 2)), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = instruction + " port=8080\nEXPOSE ${po\\ \t\r\nrt}";
                    ranges = computeHighlightRanges(document, 2, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 8)), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(Position.create(2, 9), Position.create(3, 2)), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = "#escape=`\n" + instruction + " port=8080\nEXPOSE ${po` \t\r\nrt}";
                    ranges = computeHighlightRanges(document, 3, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(0, 4, 0, 8), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(1, 12, 2, 2), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = instruction + " port=8080\nLABEL key=\"$po\\ \t\r\nrt\"";
                    ranges = computeHighlightRanges(document, 2, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 2);
                    assertHighlightRanges(ranges, expected);
                });

                it("$var followed by space", function () {
                    let declaration = DocumentHighlight.create(Range.create(0, 4, 0, 7), DocumentHighlightKind.Write);
                    let reference = DocumentHighlight.create(Range.create(1, 12, 1, 15), DocumentHighlightKind.Read);
                    let expected = [declaration, reference];
                    let document = instruction + " var" + delimiter + "value\nLABEL key=\"$var \"";
                    let ranges = computeHighlightRanges(document, 0, 5);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 1, 14);
                    assertHighlightRanges(ranges, expected);
                });

                it("$var followed by tab", function () {
                    let declaration = DocumentHighlight.create(Range.create(0, 4, 0, 7), DocumentHighlightKind.Write);
                    let reference = DocumentHighlight.create(Range.create(1, 12, 1, 15), DocumentHighlightKind.Read);
                    let expected = [declaration, reference];
                    let document = instruction + " var" + delimiter + "value\nLABEL key=\"$var\t\"";
                    let ranges = computeHighlightRanges(document, 0, 5);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 1, 14);
                    assertHighlightRanges(ranges, expected);
                });

                it("$var is alphanumeric", function() {
                    let declaration = DocumentHighlight.create(Range.create(0, 4, 0, 7), DocumentHighlightKind.Write);
                    let reference = DocumentHighlight.create(Range.create(1, 10, 1, 13), DocumentHighlightKind.Read);
                    let document = instruction + " var" + delimiter + "value\nRUN echo $var:test";
                    let ranges = computeHighlightRanges(document, 0, 5);
                    assertHighlightRanges(ranges, [declaration, reference]);
                    ranges = computeHighlightRanges(document, 1, 11);
                    assertHighlightRanges(ranges, [declaration, reference]);
                });

                it("$var has underscore", function() {
                    let declaration = DocumentHighlight.create(Range.create(0, 4, 0, 8), DocumentHighlightKind.Write);
                    let reference = DocumentHighlight.create(Range.create(1, 10, 1, 14), DocumentHighlightKind.Read);
                    let document = instruction + " var_" + delimiter + "value\nRUN echo $var_:test";
                    let ranges = computeHighlightRanges(document, 0, 5);
                    assertHighlightRanges(ranges, [declaration, reference]);
                    ranges = computeHighlightRanges(document, 1, 11);
                    assertHighlightRanges(ranges, [declaration, reference]);
                })
            });

            describe("build stage", function () {
                it("referenced variable ${var}", function () {
                    let arg = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 7)), DocumentHighlightKind.Write);
                    let stopsignal = DocumentHighlight.create(Range.create(Position.create(2, 13), Position.create(2, 16)), DocumentHighlightKind.Read);
                    let user = DocumentHighlight.create(Range.create(Position.create(3, 7), Position.create(3, 10)), DocumentHighlightKind.Read);
                    let workdir = DocumentHighlight.create(Range.create(Position.create(4, 10), Position.create(4, 13)), DocumentHighlightKind.Read);
                    let expected = [arg, stopsignal, user, workdir];
                    let argB = DocumentHighlight.create(Range.create(Position.create(6, 4), Position.create(6, 7)), DocumentHighlightKind.Write);
                    let stopsignalB = DocumentHighlight.create(Range.create(Position.create(7, 13), Position.create(7, 16)), DocumentHighlightKind.Read);
                    let userB = DocumentHighlight.create(Range.create(Position.create(8, 7), Position.create(8, 10)), DocumentHighlightKind.Read);
                    let workdirB = DocumentHighlight.create(Range.create(Position.create(9, 10), Position.create(9, 13)), DocumentHighlightKind.Read);
                    let expectedB = [argB, stopsignalB, userB, workdirB];
                    let content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}\n" +
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}"
                        ;
                    let ranges = computeHighlightRanges(content, 1, 5);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(content, 2, 13);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(content, 3, 7);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(content, 4, 11);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(content, 6, 5);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(content, 7, 13);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(content, 8, 7);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(content, 9, 11);
                    assertHighlightRanges(ranges, expectedB);

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var}\nUSER ${var2}\nWORKDIR ${var2}\n" +
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var}\nUSER ${var2}\nWORKDIR ${var2}"
                        ;
                    ranges = computeHighlightRanges(content, 2, 13);
                    assertHighlightRanges(ranges, [arg, stopsignal]);
                    ranges = computeHighlightRanges(content, 7, 13);
                    assertHighlightRanges(ranges, [argB, stopsignalB]);
                });

                it("referenced variable ${var} no value", function () {
                    let arg = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 7)), DocumentHighlightKind.Write);
                    let stopsignal = DocumentHighlight.create(Range.create(Position.create(2, 13), Position.create(2, 16)), DocumentHighlightKind.Read);
                    let user = DocumentHighlight.create(Range.create(Position.create(3, 7), Position.create(3, 10)), DocumentHighlightKind.Read);
                    let workdir = DocumentHighlight.create(Range.create(Position.create(4, 10), Position.create(4, 13)), DocumentHighlightKind.Read);
                    let expected = [arg, stopsignal, user, workdir];
                    let argB = DocumentHighlight.create(Range.create(Position.create(6, 4), Position.create(6, 7)), DocumentHighlightKind.Write);
                    let stopsignalB = DocumentHighlight.create(Range.create(Position.create(7, 13), Position.create(7, 16)), DocumentHighlightKind.Read);
                    let userB = DocumentHighlight.create(Range.create(Position.create(8, 7), Position.create(8, 10)), DocumentHighlightKind.Read);
                    let workdirB = DocumentHighlight.create(Range.create(Position.create(9, 10), Position.create(9, 13)), DocumentHighlightKind.Read);
                    let expectedB = [argB, stopsignalB, userB, workdirB];
                    let document =
                        "FROM alpine\n" + instruction + " var\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}\n" +
                        "FROM alpine\n" + instruction + " var\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}";
                    let ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 13);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 7);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 11);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 6, 5);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 7, 13);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 8, 7);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 9, 11);
                    assertHighlightRanges(ranges, expectedB);
                });

                it("referenced variable ${var:modifier}", function () {
                    let arg = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 7)), DocumentHighlightKind.Write);
                    let stopsignal = DocumentHighlight.create(Range.create(Position.create(2, 13), Position.create(2, 16)), DocumentHighlightKind.Read);
                    let user = DocumentHighlight.create(Range.create(Position.create(3, 7), Position.create(3, 10)), DocumentHighlightKind.Read);
                    let workdir = DocumentHighlight.create(Range.create(Position.create(4, 10), Position.create(4, 13)), DocumentHighlightKind.Read);
                    let expected = [arg, stopsignal, user, workdir];
                    let argB = DocumentHighlight.create(Range.create(Position.create(6, 4), Position.create(6, 7)), DocumentHighlightKind.Write);
                    let stopsignalB = DocumentHighlight.create(Range.create(Position.create(7, 13), Position.create(7, 16)), DocumentHighlightKind.Read);
                    let userB = DocumentHighlight.create(Range.create(Position.create(8, 7), Position.create(8, 10)), DocumentHighlightKind.Read);
                    let workdirB = DocumentHighlight.create(Range.create(Position.create(9, 10), Position.create(9, 13)), DocumentHighlightKind.Read);
                    let expectedB = [argB, stopsignalB, userB, workdirB];
                    let document =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var:+var}\nUSER ${var:+var}\nWORKDIR ${var:+var}\n" +
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var:+var}\nUSER ${var:+var}\nWORKDIR ${var:+var}";
                    let ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 13);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 7);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 11);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 6, 5);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 7, 13);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 8, 7);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 9, 11);
                    assertHighlightRanges(ranges, expectedB);

                    document =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var:-var}\nUSER ${var:-var}\nWORKDIR ${var:-var}\n" +
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var:-var}\nUSER ${var:-var}\nWORKDIR ${var:-var}";
                    ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 13);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 7);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 11);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 6, 5);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 7, 13);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 8, 7);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 9, 11);
                    assertHighlightRanges(ranges, expectedB);
                });

                it("referenced variable $var", function () {
                    let arg = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 7)), DocumentHighlightKind.Write);
                    let stopsignal = DocumentHighlight.create(Range.create(Position.create(2, 12), Position.create(2, 15)), DocumentHighlightKind.Read);
                    let user = DocumentHighlight.create(Range.create(Position.create(3, 6), Position.create(3, 9)), DocumentHighlightKind.Read);
                    let workdir = DocumentHighlight.create(Range.create(Position.create(4, 9), Position.create(4, 12)), DocumentHighlightKind.Read);
                    let expected = [arg, stopsignal, user, workdir];
                    let argB = DocumentHighlight.create(Range.create(Position.create(6, 4), Position.create(6, 7)), DocumentHighlightKind.Write);
                    let stopsignalB = DocumentHighlight.create(Range.create(Position.create(7, 12), Position.create(7, 15)), DocumentHighlightKind.Read);
                    let userB = DocumentHighlight.create(Range.create(Position.create(8, 6), Position.create(8, 9)), DocumentHighlightKind.Read);
                    let workdirB = DocumentHighlight.create(Range.create(Position.create(9, 9), Position.create(9, 12)), DocumentHighlightKind.Read);
                    let expectedB = [argB, stopsignalB, userB, workdirB];
                    let document =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var\n" +
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                    let ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 13);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 7);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 11);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 6, 5);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 7, 13);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 8, 7);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 9, 11);
                    assertHighlightRanges(ranges, expectedB);

                    let run = DocumentHighlight.create(Range.create(Position.create(2, 11), Position.create(2, 14)), DocumentHighlightKind.Read);
                    argB = DocumentHighlight.create(Range.create(Position.create(4, 4), Position.create(4, 7)), DocumentHighlightKind.Write);
                    let runB = DocumentHighlight.create(Range.create(Position.create(5, 11), Position.create(5, 14)), DocumentHighlightKind.Read);
                    document =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nRUN echo \"$var\"\n" +
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nRUN echo \"$var\"";
                    ranges = computeHighlightRanges(document, 2, 13);
                    assertHighlightRanges(ranges, [arg, run]);
                    ranges = computeHighlightRanges(document, 5, 13);
                    assertHighlightRanges(ranges, [argB, runB]);

                    document =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nRUN echo '$var'\n" +
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nRUN echo '$var'";
                    ranges = computeHighlightRanges(document, 2, 13);
                    assertHighlightRanges(ranges, [arg, run]);
                    ranges = computeHighlightRanges(document, 5, 13);
                    assertHighlightRanges(ranges, [argB, runB]);
                });

                it("referenced variable $var no value", function () {
                    let arg = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 7)), DocumentHighlightKind.Write);
                    let stopsignal = DocumentHighlight.create(Range.create(Position.create(2, 12), Position.create(2, 15)), DocumentHighlightKind.Read);
                    let user = DocumentHighlight.create(Range.create(Position.create(3, 6), Position.create(3, 9)), DocumentHighlightKind.Read);
                    let workdir = DocumentHighlight.create(Range.create(Position.create(4, 9), Position.create(4, 12)), DocumentHighlightKind.Read);
                    let expected = [arg, stopsignal, user, workdir];
                    let argB = DocumentHighlight.create(Range.create(Position.create(6, 4), Position.create(6, 7)), DocumentHighlightKind.Write);
                    let stopsignalB = DocumentHighlight.create(Range.create(Position.create(7, 12), Position.create(7, 15)), DocumentHighlightKind.Read);
                    let userB = DocumentHighlight.create(Range.create(Position.create(8, 6), Position.create(8, 9)), DocumentHighlightKind.Read);
                    let workdirB = DocumentHighlight.create(Range.create(Position.create(9, 9), Position.create(9, 12)), DocumentHighlightKind.Read);
                    let expectedB = [argB, stopsignalB, userB, workdirB];
                    let document =
                        "FROM alpine\n" + instruction + " var\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var\n" +
                        "FROM alpine\n" + instruction + " var\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                    let ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 13);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 7);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 11);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 6, 5);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 7, 13);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 8, 7);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 9, 11);
                    assertHighlightRanges(ranges, expectedB);

                    let run = DocumentHighlight.create(Range.create(Position.create(2, 11), Position.create(2, 14)), DocumentHighlightKind.Read);
                    argB = DocumentHighlight.create(Range.create(Position.create(4, 4), Position.create(4, 7)), DocumentHighlightKind.Write);
                    let runB = DocumentHighlight.create(Range.create(Position.create(5, 11), Position.create(5, 14)), DocumentHighlightKind.Read);
                    document =
                        "FROM alpine\n" + instruction + " var\nRUN echo \"$var\"\n" +
                        "FROM alpine\n" + instruction + " var\nRUN echo \"$var\"";
                    ranges = computeHighlightRanges(document, 2, 13);
                    assertHighlightRanges(ranges, [arg, run]);
                    ranges = computeHighlightRanges(document, 5, 13);
                    assertHighlightRanges(ranges, [argB, runB]);

                    document =
                        "FROM alpine\n" + instruction + " var\nRUN echo '$var'\n" +
                        "FROM alpine\n" + instruction + " var\nRUN echo '$var'";
                    ranges = computeHighlightRanges(document, 2, 13);
                    assertHighlightRanges(ranges, [arg, run]);
                    ranges = computeHighlightRanges(document, 5, 13);
                    assertHighlightRanges(ranges, [argB, runB]);
                });

                it("repeated declaration $var", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 7)), DocumentHighlightKind.Write);
                    let declaration2 = DocumentHighlight.create(Range.create(Position.create(2, 4), Position.create(2, 7)), DocumentHighlightKind.Write);
                    let run = DocumentHighlight.create(Range.create(Position.create(3, 10), Position.create(3, 13)), DocumentHighlightKind.Read);
                    let run2 = DocumentHighlight.create(Range.create(Position.create(4, 10), Position.create(4, 13)), DocumentHighlightKind.Read);
                    let expected = [declaration, declaration2, run, run2];
                    let declarationB = DocumentHighlight.create(Range.create(Position.create(6, 4), Position.create(6, 7)), DocumentHighlightKind.Write);
                    let declaration2B = DocumentHighlight.create(Range.create(Position.create(7, 4), Position.create(7, 7)), DocumentHighlightKind.Write);
                    let runB = DocumentHighlight.create(Range.create(Position.create(8, 10), Position.create(8, 13)), DocumentHighlightKind.Read);
                    let run2B = DocumentHighlight.create(Range.create(Position.create(9, 10), Position.create(9, 13)), DocumentHighlightKind.Read);
                    let expectedB = [declarationB, declaration2B, runB, run2B];
                    let document =
                        "FROM alpine\n" + instruction + " var=value\n" + instruction + " var=value\nRUN echo $var\nRUN echo $var\n" +
                        "FROM alpine\n" + instruction + " var=value\n" + instruction + " var=value\nRUN echo $var\nRUN echo $var";
                    let ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 5);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 11);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 11);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 6, 5);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 7, 5);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 8, 11);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 9, 11);
                    assertHighlightRanges(ranges, expectedB);
                });

                it("repeated declaration $var no value", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 7)), DocumentHighlightKind.Write);
                    let declaration2 = DocumentHighlight.create(Range.create(Position.create(2, 4), Position.create(2, 7)), DocumentHighlightKind.Write);
                    let run = DocumentHighlight.create(Range.create(Position.create(3, 10), Position.create(3, 13)), DocumentHighlightKind.Read);
                    let run2 = DocumentHighlight.create(Range.create(Position.create(4, 10), Position.create(4, 13)), DocumentHighlightKind.Read);
                    let expected = [declaration, declaration2, run, run2];
                    let declarationB = DocumentHighlight.create(Range.create(Position.create(6, 4), Position.create(6, 7)), DocumentHighlightKind.Write);
                    let declaration2B = DocumentHighlight.create(Range.create(Position.create(7, 4), Position.create(7, 7)), DocumentHighlightKind.Write);
                    let runB = DocumentHighlight.create(Range.create(Position.create(8, 10), Position.create(8, 13)), DocumentHighlightKind.Read);
                    let run2B = DocumentHighlight.create(Range.create(Position.create(9, 10), Position.create(9, 13)), DocumentHighlightKind.Read);
                    let expectedB = [declarationB, declaration2B, runB, run2B];
                    let document =
                        "FROM alpine\n" + instruction + " var\n" + instruction + " var\nRUN echo $var\nRUN echo $var\n" +
                        "FROM alpine\n" + instruction + " var\n" + instruction + " var\nRUN echo $var\nRUN echo $var";
                    let ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 5);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 11);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 11);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 6, 5);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 7, 5);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 8, 11);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 9, 11);
                    assertHighlightRanges(ranges, expectedB);
                });

                it("repeated declaration ${var}", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 7)), DocumentHighlightKind.Write);
                    let declaration2 = DocumentHighlight.create(Range.create(Position.create(2, 4), Position.create(2, 7)), DocumentHighlightKind.Write);
                    let run = DocumentHighlight.create(Range.create(Position.create(3, 11), Position.create(3, 14)), DocumentHighlightKind.Read);
                    let run2 = DocumentHighlight.create(Range.create(Position.create(4, 11), Position.create(4, 14)), DocumentHighlightKind.Read);
                    let expected = [declaration, declaration2, run, run2];
                    let declarationB = DocumentHighlight.create(Range.create(Position.create(6, 4), Position.create(6, 7)), DocumentHighlightKind.Write);
                    let declaration2B = DocumentHighlight.create(Range.create(Position.create(7, 4), Position.create(7, 7)), DocumentHighlightKind.Write);
                    let runB = DocumentHighlight.create(Range.create(Position.create(8, 11), Position.create(8, 14)), DocumentHighlightKind.Read);
                    let run2B = DocumentHighlight.create(Range.create(Position.create(9, 11), Position.create(9, 14)), DocumentHighlightKind.Read);
                    let expectedB = [declarationB, declaration2B, runB, run2B];
                    let document =
                        "FROM alpine\n" + instruction + " var=value\n" + instruction + " var=value\nRUN echo ${var}\nRUN echo ${var}\n" +
                        "FROM alpine\n" + instruction + " var=value\n" + instruction + " var=value\nRUN echo ${var}\nRUN echo ${var}";
                    let ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 5);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 11);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 11);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 6, 5);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 7, 5);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 8, 11);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 9, 11);
                    assertHighlightRanges(ranges, expectedB);
                });

                it("repeated declaration $var no value", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 7)), DocumentHighlightKind.Write);
                    let declaration2 = DocumentHighlight.create(Range.create(Position.create(2, 4), Position.create(2, 7)), DocumentHighlightKind.Write);
                    let run = DocumentHighlight.create(Range.create(Position.create(3, 11), Position.create(3, 14)), DocumentHighlightKind.Read);
                    let run2 = DocumentHighlight.create(Range.create(Position.create(4, 11), Position.create(4, 14)), DocumentHighlightKind.Read);
                    let expected = [declaration, declaration2, run, run2];
                    let declarationB = DocumentHighlight.create(Range.create(Position.create(6, 4), Position.create(6, 7)), DocumentHighlightKind.Write);
                    let declaration2B = DocumentHighlight.create(Range.create(Position.create(7, 4), Position.create(7, 7)), DocumentHighlightKind.Write);
                    let runB = DocumentHighlight.create(Range.create(Position.create(8, 11), Position.create(8, 14)), DocumentHighlightKind.Read);
                    let run2B = DocumentHighlight.create(Range.create(Position.create(9, 11), Position.create(9, 14)), DocumentHighlightKind.Read);
                    let expectedB = [declarationB, declaration2B, runB, run2B];
                    let document =
                        "FROM alpine\n" + instruction + " var\n" + instruction + " var\nRUN echo ${var}\nRUN echo ${var}\n" +
                        "FROM alpine\n" + instruction + " var\n" + instruction + " var\nRUN echo ${var}\nRUN echo ${var}";
                    let ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 5);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 11);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 11);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 6, 5);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 7, 5);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 8, 11);
                    assertHighlightRanges(ranges, expectedB);
                    ranges = computeHighlightRanges(document, 9, 11);
                    assertHighlightRanges(ranges, expectedB);
                });

                it("$var in LABEL value with single quotes", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 7)), DocumentHighlightKind.Write);
                    let document = "FROM alpine\n" + instruction + " var" + delimiter + "value\nLABEL label='$var'";
                    let ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, [declaration]);

                    ranges = computeHighlightRanges(document, 2, 15);
                    assert.equal(ranges.length, 0);
                });

                it("$var in LABEL value with double quotes", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 7)), DocumentHighlightKind.Write);
                    let labelValue = DocumentHighlight.create(Range.create(Position.create(2, 14), Position.create(2, 17)), DocumentHighlightKind.Read);
                    let expected = [declaration, labelValue];
                    let document = "FROM alpine\n" + instruction + " var" + delimiter + "value\nLABEL label=\"$var\"";
                    let ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(document, 2, 15);
                    assertHighlightRanges(ranges, expected);
                });

                it("${var} in LABEL value with single quotes", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 7)), DocumentHighlightKind.Write);
                    let document = "FROM alpine\n" + instruction + " var" + delimiter + "value\nLABEL label='${var}'";
                    let ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, [declaration]);

                    ranges = computeHighlightRanges(document, 2, 17);
                    assert.equal(ranges.length, 0);
                });

                it("${var} in LABEL value with double quotes", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 7)), DocumentHighlightKind.Write);
                    let labelValue = DocumentHighlight.create(Range.create(Position.create(2, 15), Position.create(2, 18)), DocumentHighlightKind.Read);
                    let expected = [declaration, labelValue];
                    let document = "FROM alpine\n" + instruction + " var" + delimiter + "value\nLABEL label=\"${var}\"";
                    let ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, expected);

                    ranges = computeHighlightRanges(document, 2, 17);
                    assertHighlightRanges(ranges, expected);
                });

                it("multiline reference \\n", function () {
                    let declaration = DocumentHighlight.create(Range.create(1, 4, 1, 8), DocumentHighlightKind.Write);
                    let reference = DocumentHighlight.create(Range.create(2, 8, 3, 2), DocumentHighlightKind.Read);
                    let expected = [declaration, reference];
                    let document = "FROM alpine\n" + instruction + " port=8080\nEXPOSE $po\\\nrt";
                    let ranges = computeHighlightRanges(document, 3, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(2, 4, 2, 8), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(3, 8, 4, 2), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = "#escape=`\nFROM alpine\n" + instruction + " port=8080\nEXPOSE $po`\nrt";
                    ranges = computeHighlightRanges(document, 4, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(1, 4, 1, 8), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(2, 9, 3, 2), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = "FROM alpine\n" + instruction + " port=8080\nEXPOSE ${po\\\nrt}";
                    ranges = computeHighlightRanges(document, 3, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(2, 4, 2, 8), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(3, 9, 4, 2), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = "#escape=`\nFROM alpine\n" + instruction + " port=8080\nEXPOSE ${po`\nrt}";
                    ranges = computeHighlightRanges(document, 4, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(1, 4, 1, 8), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(2, 12, 3, 2), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = "FROM alpine\n" + instruction + " port=8080\nLABEL key=\"$po\\\nrt\"";
                    ranges = computeHighlightRanges(document, 3, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 2);
                    assertHighlightRanges(ranges, expected);
                });

                it("multiline reference \\r\\n", function () {
                    let declaration = DocumentHighlight.create(Range.create(1, 4, 1, 8), DocumentHighlightKind.Write);
                    let reference = DocumentHighlight.create(Range.create(2, 8, 3, 2), DocumentHighlightKind.Read);
                    let expected = [declaration, reference];
                    let document = "FROM alpine\n" + instruction + " port=8080\nEXPOSE $po\\\r\nrt";
                    let ranges = computeHighlightRanges(document, 3, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(2, 4, 2, 8), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(3, 8, 4, 2), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = "#escape=`\nFROM alpine\n" + instruction + " port=8080\nEXPOSE $po`\r\nrt";
                    ranges = computeHighlightRanges(document, 4, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(1, 4, 1, 8), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(2, 9, 3, 2), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = "FROM alpine\n" + instruction + " port=8080\nEXPOSE ${po\\\r\nrt}";
                    ranges = computeHighlightRanges(document, 3, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(2, 4, 2, 8), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(3, 9, 4, 2), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = "#escape=`\nFROM alpine\n" + instruction + " port=8080\nEXPOSE ${po`\r\nrt}";
                    ranges = computeHighlightRanges(document, 4, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(1, 4, 1, 8), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(2, 12, 3, 2), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = "FROM alpine\r\n" + instruction + " port=8080\r\nLABEL key=\"$po\\\r\nrt\"";
                    ranges = computeHighlightRanges(document, 3, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 2);
                    assertHighlightRanges(ranges, expected);
                });

                it("multiline reference \\n spaced", function () {
                    let declaration = DocumentHighlight.create(Range.create(1, 4, 1, 8), DocumentHighlightKind.Write);
                    let reference = DocumentHighlight.create(Range.create(2, 8, 3, 2), DocumentHighlightKind.Read);
                    let expected = [declaration, reference];
                    let document = "FROM alpine\n" + instruction + " port=8080\nEXPOSE $po\\ \t\nrt";
                    let ranges = computeHighlightRanges(document, 3, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(2, 4, 2, 8), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(3, 8, 4, 2), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = "#escape=`\nFROM alpine\n" + instruction + " port=8080\nEXPOSE $po` \t\nrt";
                    ranges = computeHighlightRanges(document, 4, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(1, 4, 1, 8), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(2, 9, 3, 2), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = "FROM alpine\n" + instruction + " port=8080\nEXPOSE ${po\\ \t\nrt}";
                    ranges = computeHighlightRanges(document, 3, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(2, 4, 2, 8), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(3, 9, 4, 2), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = "#escape=`\nFROM alpine\n" + instruction + " port=8080\nEXPOSE ${po` \t\nrt}";
                    ranges = computeHighlightRanges(document, 4, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(1, 4, 1, 8), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(2, 12, 3, 2), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = "FROM alpine\n" + instruction + " port=8080\nLABEL key=\"$po\\ \t\nrt\"";
                    ranges = computeHighlightRanges(document, 3, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 2);
                    assertHighlightRanges(ranges, expected);
                });

                it("multiline reference \\r\\n spaced", function () {
                    let declaration = DocumentHighlight.create(Range.create(1, 4, 1, 8), DocumentHighlightKind.Write);
                    let reference = DocumentHighlight.create(Range.create(2, 8, 3, 2), DocumentHighlightKind.Read);
                    let expected = [declaration, reference];
                    let document = "FROM alpine\n" + instruction + " port=8080\nEXPOSE $po\\ \t\r\nrt";
                    let ranges = computeHighlightRanges(document, 3, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(2, 4, 2, 8), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(3, 8, 4, 2), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = "#escape=`\nFROM alpine\n" + instruction + " port=8080\nEXPOSE $po` \t\r\nrt";
                    ranges = computeHighlightRanges(document, 4, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(1, 4, 1, 8), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(2, 9, 3, 2), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = "FROM alpine\n" + instruction + " port=8080\nEXPOSE ${po\\ \t\r\nrt}";
                    ranges = computeHighlightRanges(document, 3, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(2, 4, 2, 8), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(3, 9, 4, 2), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = "#escape=`\nFROM alpine\n" + instruction + " port=8080\nEXPOSE ${po` \t\r\nrt}";
                    ranges = computeHighlightRanges(document, 4, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 4, 2);
                    assertHighlightRanges(ranges, expected);

                    declaration = DocumentHighlight.create(Range.create(1, 4, 1, 8), DocumentHighlightKind.Write);
                    reference = DocumentHighlight.create(Range.create(2, 12, 3, 2), DocumentHighlightKind.Read);
                    expected = [declaration, reference];
                    document = "FROM alpine\r\n" + instruction + " port=8080\r\nLABEL key=\"$po\\ \t\r\nrt\"";
                    ranges = computeHighlightRanges(document, 3, 0);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 1);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 3, 2);
                    assertHighlightRanges(ranges, expected);
                });

                it("$var followed by space", function () {
                    let declaration = DocumentHighlight.create(Range.create(1, 4, 1, 7), DocumentHighlightKind.Write);
                    let reference = DocumentHighlight.create(Range.create(2, 12, 2, 15), DocumentHighlightKind.Read);
                    let expected = [declaration, reference];
                    let document = "FROM alpine\n" + instruction + " var" + delimiter + "value\nLABEL key=\"$var \"";
                    let ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 14);
                    assertHighlightRanges(ranges, expected);
                });

                it("$var followed by tab", function () {
                    let declaration = DocumentHighlight.create(Range.create(1, 4, 1, 7), DocumentHighlightKind.Write);
                    let reference = DocumentHighlight.create(Range.create(2, 12, 2, 15), DocumentHighlightKind.Read);
                    let expected = [declaration, reference];
                    let document = "FROM alpine\n" + instruction + " var" + delimiter + "value\nLABEL key=\"$var\t\"";
                    let ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 14);
                    assertHighlightRanges(ranges, expected);
                });

                it("$var is alphanumeric", function() {
                    let declaration = DocumentHighlight.create(Range.create(1, 4, 1, 7), DocumentHighlightKind.Write);
                    let reference = DocumentHighlight.create(Range.create(2, 10, 2, 13), DocumentHighlightKind.Read);
                    let expected = [declaration, reference];
                    let document = "FROM alpine\n" + instruction + " var" + delimiter + "value\nRUN echo $var:test";
                    let ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 11);
                    assertHighlightRanges(ranges, expected);
                });

                it("$var has underscore", function() {
                    let declaration = DocumentHighlight.create(Range.create(1, 4, 1, 8), DocumentHighlightKind.Write);
                    let reference = DocumentHighlight.create(Range.create(2, 10, 2, 14), DocumentHighlightKind.Read);
                    let expected = [declaration, reference];
                    let document = "FROM alpine\n" + instruction + " var_" + delimiter + "value\nRUN echo $var_:test";
                    let ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, expected);
                    ranges = computeHighlightRanges(document, 2, 11);
                    assertHighlightRanges(ranges, expected);
                })
            });
        });
    }

    createVariablesTest("ARG", "ARG", "=");

    describe("ENV", function () {
        createVariablesTest("equals delimiter", "ENV", "=");
        createVariablesTest("space delimiter", "ENV", " ");

        describe("no FROM", function () {
            describe("single variable delimited by space", function () {
                it("${var}", function () {
                    let varDeclaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 6)), DocumentHighlightKind.Write);
                    let varReference = DocumentHighlight.create(Range.create(Position.create(1, 11), Position.create(1, 13)), DocumentHighlightKind.Read);
                    let document = "ENV aa bb cc dd\nRUN echo ${aa} ${cc}";
                    let ranges = computeHighlightRanges(document, 0, 5);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 1, 12);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 0, 11);
                    assert.equal(ranges.length, 0);
                    ranges = computeHighlightRanges(document, 1, 18);
                    assert.equal(ranges.length, 1);
                    assertHighlight(ranges[0], DocumentHighlightKind.Read, 1, 17, 1, 19);
                });

                it("$var", function () {
                    let varDeclaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 6)), DocumentHighlightKind.Write);
                    let varReference = DocumentHighlight.create(Range.create(Position.create(1, 10), Position.create(1, 12)), DocumentHighlightKind.Read);
                    let document = "ENV aa bb cc dd\nRUN echo $aa $cc";
                    let ranges = computeHighlightRanges(document, 0, 5);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 1, 11);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 0, 11);
                    assert.equal(ranges.length, 0);
                    ranges = computeHighlightRanges(document, 1, 15);
                    assert.equal(ranges.length, 1);
                    assertHighlight(ranges[0], DocumentHighlightKind.Read, 1, 14, 1, 16);
                });
            });

            describe("multiple variables", function () {
                it("${var}", function () {
                    let varDeclaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 7)), DocumentHighlightKind.Write);
                    let varDeclaration2 = DocumentHighlight.create(Range.create(Position.create(0, 14), Position.create(0, 18)), DocumentHighlightKind.Write);
                    let varReference = DocumentHighlight.create(Range.create(Position.create(1, 11), Position.create(1, 14)), DocumentHighlightKind.Read);
                    let varReference2 = DocumentHighlight.create(Range.create(Position.create(1, 18), Position.create(1, 22)), DocumentHighlightKind.Read);
                    let document = "ENV var=value var2=value2\nRUN echo ${var} ${var2}";
                    let ranges = computeHighlightRanges(document, 0, 6);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 1, 12);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 0, 16);
                    assertHighlightRanges(ranges, [varDeclaration2, varReference2]);
                    ranges = computeHighlightRanges(document, 1, 20);
                    assertHighlightRanges(ranges, [varDeclaration2, varReference2]);

                    varDeclaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 7)), DocumentHighlightKind.Write);
                    varDeclaration2 = DocumentHighlight.create(Range.create(Position.create(1, 0), Position.create(1, 4)), DocumentHighlightKind.Write);
                    let varDeclaration3 = DocumentHighlight.create(Range.create(Position.create(2, 0), Position.create(2, 4)), DocumentHighlightKind.Write);
                    varReference = DocumentHighlight.create(Range.create(Position.create(3, 11), Position.create(3, 14)), DocumentHighlightKind.Read);
                    varReference2 = DocumentHighlight.create(Range.create(Position.create(3, 18), Position.create(3, 22)), DocumentHighlightKind.Read);
                    let varReference3 = DocumentHighlight.create(Range.create(Position.create(3, 26), Position.create(3, 30)), DocumentHighlightKind.Read);
                    document = "ENV var=value \\\nvar2=value2 \\\nvar3=value3\nRUN echo ${var} ${var2} ${var3}";
                    ranges = computeHighlightRanges(document, 0, 6);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 3, 12);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 1, 2);
                    assertHighlightRanges(ranges, [varDeclaration2, varReference2]);
                    ranges = computeHighlightRanges(document, 3, 20);
                    assertHighlightRanges(ranges, [varDeclaration2, varReference2]);
                    ranges = computeHighlightRanges(document, 2, 2);
                    assertHighlightRanges(ranges, [varDeclaration3, varReference3]);
                    ranges = computeHighlightRanges(document, 3, 29);
                    assertHighlightRanges(ranges, [varDeclaration3, varReference3]);
                });

                it("$var", function () {
                    let varDeclaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 7)), DocumentHighlightKind.Write);
                    let varDeclaration2 = DocumentHighlight.create(Range.create(Position.create(0, 14), Position.create(0, 18)), DocumentHighlightKind.Write);
                    let varReference = DocumentHighlight.create(Range.create(Position.create(1, 10), Position.create(1, 13)), DocumentHighlightKind.Read);
                    let varReference2 = DocumentHighlight.create(Range.create(Position.create(1, 15), Position.create(1, 19)), DocumentHighlightKind.Read);
                    let document = "ENV var=value var2=value2\nRUN echo $var $var2";
                    let ranges = computeHighlightRanges(document, 0, 6);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 1, 12);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 0, 16);
                    assertHighlightRanges(ranges, [varDeclaration2, varReference2]);
                    ranges = computeHighlightRanges(document, 1, 18);
                    assertHighlightRanges(ranges, [varDeclaration2, varReference2]);

                    varDeclaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 7)), DocumentHighlightKind.Write);
                    varDeclaration2 = DocumentHighlight.create(Range.create(Position.create(1, 0), Position.create(1, 4)), DocumentHighlightKind.Write);
                    let varDeclaration3 = DocumentHighlight.create(Range.create(Position.create(2, 0), Position.create(2, 4)), DocumentHighlightKind.Write);
                    varReference = DocumentHighlight.create(Range.create(Position.create(3, 10), Position.create(3, 13)), DocumentHighlightKind.Read);
                    varReference2 = DocumentHighlight.create(Range.create(Position.create(3, 15), Position.create(3, 19)), DocumentHighlightKind.Read);
                    let varReference3 = DocumentHighlight.create(Range.create(Position.create(3, 21), Position.create(3, 25)), DocumentHighlightKind.Read);
                    document = "ENV var=value \\\nvar2=value2 \\\nvar3=value3\nRUN echo $var $var2 $var3";
                    ranges = computeHighlightRanges(document, 0, 6);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 3, 12);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 1, 2);
                    assertHighlightRanges(ranges, [varDeclaration2, varReference2]);
                    ranges = computeHighlightRanges(document, 3, 18);
                    assertHighlightRanges(ranges, [varDeclaration2, varReference2]);
                    ranges = computeHighlightRanges(document, 2, 2);
                    assertHighlightRanges(ranges, [varDeclaration3, varReference3]);
                    ranges = computeHighlightRanges(document, 3, 24);
                    assertHighlightRanges(ranges, [varDeclaration3, varReference3]);
                });
            });

            describe("reuse variable name", function () {

				/**
				 * ENV aa=x
				 * ENV aa=y bb=${aa}
				 * ENV cc=${aa}
				 */
                it("${var}", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 6)), DocumentHighlightKind.Write);
                    let write = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 6)), DocumentHighlightKind.Write);
                    let read = DocumentHighlight.create(Range.create(Position.create(1, 14), Position.create(1, 16)), DocumentHighlightKind.Read);
                    let read2 = DocumentHighlight.create(Range.create(Position.create(2, 9), Position.create(2, 11)), DocumentHighlightKind.Read);
                    let document = "ENV aa=x\nENV aa=y bb=${aa}\nENV cc=${aa}";
                    let ranges = computeHighlightRanges(document, 0, 5);
                    assertHighlightRanges(ranges, [declaration, write, read, read2]);
                    ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, [declaration, write, read, read2]);
                    ranges = computeHighlightRanges(document, 1, 15);
                    assertHighlightRanges(ranges, [declaration, write, read, read2]);
                    ranges = computeHighlightRanges(document, 2, 10);
                    assertHighlightRanges(ranges, [declaration, write, read, read2]);
                });

				/**
				 * ENV aa=x
				 * ENV aa=y bb=$aa
				 * ENV cc=$aa
				 */
                it("$var", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 6)), DocumentHighlightKind.Write);
                    let write = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 6)), DocumentHighlightKind.Write);
                    let read = DocumentHighlight.create(Range.create(Position.create(1, 13), Position.create(1, 15)), DocumentHighlightKind.Read);
                    let read2 = DocumentHighlight.create(Range.create(Position.create(2, 8), Position.create(2, 10)), DocumentHighlightKind.Read);
                    let document = "ENV aa=x\nENV aa=y bb=$aa\nENV cc=$aa";
                    let ranges = computeHighlightRanges(document, 0, 5);
                    assertHighlightRanges(ranges, [declaration, write, read, read2]);
                    ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, [declaration, write, read, read2]);
                    ranges = computeHighlightRanges(document, 1, 14);
                    assertHighlightRanges(ranges, [declaration, write, read, read2]);
                    ranges = computeHighlightRanges(document, 2, 9);
                    assertHighlightRanges(ranges, [declaration, write, read, read2]);
                });
            });

            it("empty ARG", function () {
                let declaration = DocumentHighlight.create(Range.create(Position.create(0, 4), Position.create(0, 7)), DocumentHighlightKind.Write);
                let document = "ENV var=value\nARG";
                let ranges = computeHighlightRanges(document, 0, 5);
                assertHighlightRanges(ranges, [declaration]);
            });
        });

        describe("build stage", function () {
            describe("single variable delimited by space", function () {
                it("${var}", function () {
                    let varDeclaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 6)), DocumentHighlightKind.Write);
                    let varReference = DocumentHighlight.create(Range.create(Position.create(2, 11), Position.create(2, 13)), DocumentHighlightKind.Read);
                    let varDeclarationB = DocumentHighlight.create(Range.create(Position.create(4, 4), Position.create(4, 6)), DocumentHighlightKind.Write);
                    let varReferenceB = DocumentHighlight.create(Range.create(Position.create(5, 11), Position.create(5, 13)), DocumentHighlightKind.Read);
                    let document =
                        "FROM alpine\nENV aa bb cc dd\nRUN echo ${aa} ${cc}\n" +
                        "FROM alpine\nENV aa bb cc dd\nRUN echo ${aa} ${cc}"
                        ;
                    let ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 2, 12);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 1, 11);
                    assert.equal(ranges.length, 0);
                    ranges = computeHighlightRanges(document, 2, 18);
                    assert.equal(ranges.length, 1);
                    assertHighlight(ranges[0], DocumentHighlightKind.Read, 2, 17, 2, 19);
                    ranges = computeHighlightRanges(document, 4, 5);
                    assertHighlightRanges(ranges, [varDeclarationB, varReferenceB]);
                    ranges = computeHighlightRanges(document, 5, 12);
                    assertHighlightRanges(ranges, [varDeclarationB, varReferenceB]);
                    ranges = computeHighlightRanges(document, 4, 11);
                    assert.equal(ranges.length, 0);
                    ranges = computeHighlightRanges(document, 5, 18);
                    assert.equal(ranges.length, 1);
                    assertHighlight(ranges[0], DocumentHighlightKind.Read, 5, 17, 5, 19);
                });

                it("$var", function () {
                    let varDeclaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 6)), DocumentHighlightKind.Write);
                    let varReference = DocumentHighlight.create(Range.create(Position.create(2, 10), Position.create(2, 12)), DocumentHighlightKind.Read);
                    let varDeclarationB = DocumentHighlight.create(Range.create(Position.create(4, 4), Position.create(4, 6)), DocumentHighlightKind.Write);
                    let varReferenceB = DocumentHighlight.create(Range.create(Position.create(5, 10), Position.create(5, 12)), DocumentHighlightKind.Read);
                    let document =
                        "FROM alpine\nENV aa bb cc dd\nRUN echo $aa $cc\n" +
                        "FROM alpine\nENV aa bb cc dd\nRUN echo $aa $cc"
                        ;
                    let ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 2, 11);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 1, 11);
                    assert.equal(ranges.length, 0);
                    ranges = computeHighlightRanges(document, 2, 15);
                    assert.equal(ranges.length, 1);
                    assertHighlight(ranges[0], DocumentHighlightKind.Read, 2, 14, 2, 16);
                    ranges = computeHighlightRanges(document, 4, 5);
                    assertHighlightRanges(ranges, [varDeclarationB, varReferenceB]);
                    ranges = computeHighlightRanges(document, 5, 11);
                    assertHighlightRanges(ranges, [varDeclarationB, varReferenceB]);
                    ranges = computeHighlightRanges(document, 4, 11);
                    assert.equal(ranges.length, 0);
                    ranges = computeHighlightRanges(document, 5, 15);
                    assert.equal(ranges.length, 1);
                    assertHighlight(ranges[0], DocumentHighlightKind.Read, 5, 14, 5, 16);
                });
            });

            describe("multiple variables", function () {
                it("${var}", function () {
                    let varDeclaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 7)), DocumentHighlightKind.Write);
                    let varDeclaration2 = DocumentHighlight.create(Range.create(Position.create(1, 14), Position.create(1, 18)), DocumentHighlightKind.Write);
                    let varReference = DocumentHighlight.create(Range.create(Position.create(2, 11), Position.create(2, 14)), DocumentHighlightKind.Read);
                    let varReference2 = DocumentHighlight.create(Range.create(Position.create(2, 18), Position.create(2, 22)), DocumentHighlightKind.Read);
                    let varDeclarationB = DocumentHighlight.create(Range.create(Position.create(4, 4), Position.create(4, 7)), DocumentHighlightKind.Write);
                    let varDeclaration2B = DocumentHighlight.create(Range.create(Position.create(4, 14), Position.create(4, 18)), DocumentHighlightKind.Write);
                    let varReferenceB = DocumentHighlight.create(Range.create(Position.create(5, 11), Position.create(5, 14)), DocumentHighlightKind.Read);
                    let varReference2B = DocumentHighlight.create(Range.create(Position.create(5, 18), Position.create(5, 22)), DocumentHighlightKind.Read);
                    let document =
                        "FROM alpine\nENV var=value var2=value2\nRUN echo ${var} ${var2}\n" +
                        "FROM alpine\nENV var=value var2=value2\nRUN echo ${var} ${var2}"
                        ;
                    let ranges = computeHighlightRanges(document, 1, 6);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 2, 12);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 1, 16);
                    assertHighlightRanges(ranges, [varDeclaration2, varReference2]);
                    ranges = computeHighlightRanges(document, 2, 20);
                    assertHighlightRanges(ranges, [varDeclaration2, varReference2]);
                    ranges = computeHighlightRanges(document, 4, 6);
                    assertHighlightRanges(ranges, [varDeclarationB, varReferenceB]);
                    ranges = computeHighlightRanges(document, 5, 12);
                    assertHighlightRanges(ranges, [varDeclarationB, varReferenceB]);
                    ranges = computeHighlightRanges(document, 4, 16);
                    assertHighlightRanges(ranges, [varDeclaration2B, varReference2B]);
                    ranges = computeHighlightRanges(document, 5, 20);
                    assertHighlightRanges(ranges, [varDeclaration2B, varReference2B]);

                    varDeclaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 7)), DocumentHighlightKind.Write);
                    varDeclaration2 = DocumentHighlight.create(Range.create(Position.create(2, 0), Position.create(2, 4)), DocumentHighlightKind.Write);
                    let varDeclaration3 = DocumentHighlight.create(Range.create(Position.create(3, 0), Position.create(3, 4)), DocumentHighlightKind.Write);
                    varReference = DocumentHighlight.create(Range.create(Position.create(4, 11), Position.create(4, 14)), DocumentHighlightKind.Read);
                    varReference2 = DocumentHighlight.create(Range.create(Position.create(4, 18), Position.create(4, 22)), DocumentHighlightKind.Read);
                    let varReference3 = DocumentHighlight.create(Range.create(Position.create(4, 26), Position.create(4, 30)), DocumentHighlightKind.Read);
                    varDeclarationB = DocumentHighlight.create(Range.create(Position.create(6, 4), Position.create(6, 7)), DocumentHighlightKind.Write);
                    varDeclaration2B = DocumentHighlight.create(Range.create(Position.create(7, 0), Position.create(7, 4)), DocumentHighlightKind.Write);
                    let varDeclaration3B = DocumentHighlight.create(Range.create(Position.create(8, 0), Position.create(8, 4)), DocumentHighlightKind.Write);
                    varReferenceB = DocumentHighlight.create(Range.create(Position.create(9, 11), Position.create(9, 14)), DocumentHighlightKind.Read);
                    varReference2B = DocumentHighlight.create(Range.create(Position.create(9, 18), Position.create(9, 22)), DocumentHighlightKind.Read);
                    let varReference3B = DocumentHighlight.create(Range.create(Position.create(9, 26), Position.create(9, 30)), DocumentHighlightKind.Read);
                    document =
                        "FROM alpine\nENV var=value \\\nvar2=value2 \\\nvar3=value3\nRUN echo ${var} ${var2} ${var3}\n" +
                        "FROM alpine\nENV var=value \\\nvar2=value2 \\\nvar3=value3\nRUN echo ${var} ${var2} ${var3}"
                        ;
                    ranges = computeHighlightRanges(document, 1, 6);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 4, 12);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 2, 2);
                    assertHighlightRanges(ranges, [varDeclaration2, varReference2]);
                    ranges = computeHighlightRanges(document, 4, 20);
                    assertHighlightRanges(ranges, [varDeclaration2, varReference2]);
                    ranges = computeHighlightRanges(document, 3, 2);
                    assertHighlightRanges(ranges, [varDeclaration3, varReference3]);
                    ranges = computeHighlightRanges(document, 4, 29);
                    assertHighlightRanges(ranges, [varDeclaration3, varReference3]);
                    ranges = computeHighlightRanges(document, 6, 6);
                    assertHighlightRanges(ranges, [varDeclarationB, varReferenceB]);
                    ranges = computeHighlightRanges(document, 9, 12);
                    assertHighlightRanges(ranges, [varDeclarationB, varReferenceB]);
                    ranges = computeHighlightRanges(document, 7, 2);
                    assertHighlightRanges(ranges, [varDeclaration2B, varReference2B]);
                    ranges = computeHighlightRanges(document, 9, 20);
                    assertHighlightRanges(ranges, [varDeclaration2B, varReference2B]);
                    ranges = computeHighlightRanges(document, 8, 2);
                    assertHighlightRanges(ranges, [varDeclaration3B, varReference3B]);
                    ranges = computeHighlightRanges(document, 9, 29);
                    assertHighlightRanges(ranges, [varDeclaration3B, varReference3B]);
                });

                it("$var", function () {
                    let varDeclaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 7)), DocumentHighlightKind.Write);
                    let varDeclaration2 = DocumentHighlight.create(Range.create(Position.create(1, 14), Position.create(1, 18)), DocumentHighlightKind.Write);
                    let varReference = DocumentHighlight.create(Range.create(Position.create(2, 10), Position.create(2, 13)), DocumentHighlightKind.Read);
                    let varReference2 = DocumentHighlight.create(Range.create(Position.create(2, 15), Position.create(2, 19)), DocumentHighlightKind.Read);
                    let varDeclarationB = DocumentHighlight.create(Range.create(Position.create(4, 4), Position.create(4, 7)), DocumentHighlightKind.Write);
                    let varDeclaration2B = DocumentHighlight.create(Range.create(Position.create(4, 14), Position.create(4, 18)), DocumentHighlightKind.Write);
                    let varReferenceB = DocumentHighlight.create(Range.create(Position.create(5, 10), Position.create(5, 13)), DocumentHighlightKind.Read);
                    let varReference2B = DocumentHighlight.create(Range.create(Position.create(5, 15), Position.create(5, 19)), DocumentHighlightKind.Read);
                    let document =
                        "FROM alpine\nENV var=value var2=value2\nRUN echo $var $var2\n" +
                        "FROM alpine\nENV var=value var2=value2\nRUN echo $var $var2"
                        ;
                    let ranges = computeHighlightRanges(document, 1, 6);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 2, 12);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 1, 16);
                    assertHighlightRanges(ranges, [varDeclaration2, varReference2]);
                    ranges = computeHighlightRanges(document, 2, 18);
                    assertHighlightRanges(ranges, [varDeclaration2, varReference2]);
                    ranges = computeHighlightRanges(document, 4, 6);
                    assertHighlightRanges(ranges, [varDeclarationB, varReferenceB]);
                    ranges = computeHighlightRanges(document, 5, 12);
                    assertHighlightRanges(ranges, [varDeclarationB, varReferenceB]);
                    ranges = computeHighlightRanges(document, 4, 16);
                    assertHighlightRanges(ranges, [varDeclaration2B, varReference2B]);
                    ranges = computeHighlightRanges(document, 5, 18);
                    assertHighlightRanges(ranges, [varDeclaration2B, varReference2B]);

                    varDeclaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 7)), DocumentHighlightKind.Write);
                    varDeclaration2 = DocumentHighlight.create(Range.create(Position.create(2, 0), Position.create(2, 4)), DocumentHighlightKind.Write);
                    let varDeclaration3 = DocumentHighlight.create(Range.create(Position.create(3, 0), Position.create(3, 4)), DocumentHighlightKind.Write);
                    varReference = DocumentHighlight.create(Range.create(Position.create(4, 10), Position.create(4, 13)), DocumentHighlightKind.Read);
                    varReference2 = DocumentHighlight.create(Range.create(Position.create(4, 15), Position.create(4, 19)), DocumentHighlightKind.Read);
                    let varReference3 = DocumentHighlight.create(Range.create(Position.create(4, 21), Position.create(4, 25)), DocumentHighlightKind.Read);
                    varDeclarationB = DocumentHighlight.create(Range.create(Position.create(6, 4), Position.create(6, 7)), DocumentHighlightKind.Write);
                    varDeclaration2B = DocumentHighlight.create(Range.create(Position.create(7, 0), Position.create(7, 4)), DocumentHighlightKind.Write);
                    let varDeclaration3B = DocumentHighlight.create(Range.create(Position.create(8, 0), Position.create(8, 4)), DocumentHighlightKind.Write);
                    varReferenceB = DocumentHighlight.create(Range.create(Position.create(9, 10), Position.create(9, 13)), DocumentHighlightKind.Read);
                    varReference2B = DocumentHighlight.create(Range.create(Position.create(9, 15), Position.create(9, 19)), DocumentHighlightKind.Read);
                    let varReference3B = DocumentHighlight.create(Range.create(Position.create(9, 21), Position.create(9, 25)), DocumentHighlightKind.Read);
                    document =
                        "FROM alpine\nENV var=value \\\nvar2=value2 \\\nvar3=value3\nRUN echo $var $var2 $var3\n" +
                        "FROM alpine\nENV var=value \\\nvar2=value2 \\\nvar3=value3\nRUN echo $var $var2 $var3"
                        ;
                    ranges = computeHighlightRanges(document, 1, 6);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 4, 12);
                    assertHighlightRanges(ranges, [varDeclaration, varReference]);
                    ranges = computeHighlightRanges(document, 2, 2);
                    assertHighlightRanges(ranges, [varDeclaration2, varReference2]);
                    ranges = computeHighlightRanges(document, 4, 18);
                    assertHighlightRanges(ranges, [varDeclaration2, varReference2]);
                    ranges = computeHighlightRanges(document, 3, 2);
                    assertHighlightRanges(ranges, [varDeclaration3, varReference3]);
                    ranges = computeHighlightRanges(document, 4, 24);
                    assertHighlightRanges(ranges, [varDeclaration3, varReference3]);
                    ranges = computeHighlightRanges(document, 6, 6);
                    assertHighlightRanges(ranges, [varDeclarationB, varReferenceB]);
                    ranges = computeHighlightRanges(document, 9, 12);
                    assertHighlightRanges(ranges, [varDeclarationB, varReferenceB]);
                    ranges = computeHighlightRanges(document, 7, 2);
                    assertHighlightRanges(ranges, [varDeclaration2B, varReference2B]);
                    ranges = computeHighlightRanges(document, 9, 18);
                    assertHighlightRanges(ranges, [varDeclaration2B, varReference2B]);
                    ranges = computeHighlightRanges(document, 8, 2);
                    assertHighlightRanges(ranges, [varDeclaration3B, varReference3B]);
                    ranges = computeHighlightRanges(document, 9, 24);
                    assertHighlightRanges(ranges, [varDeclaration3B, varReference3B]);
                });
            });

            describe("reuse variable name", function () {

				/**
				 * ENV aa=x
				 * ENV aa=y bb=${aa}
				 * ENV cc=${aa}
				 */
                it("${var}", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 6)), DocumentHighlightKind.Write);
                    let write = DocumentHighlight.create(Range.create(Position.create(2, 4), Position.create(2, 6)), DocumentHighlightKind.Write);
                    let read = DocumentHighlight.create(Range.create(Position.create(2, 14), Position.create(2, 16)), DocumentHighlightKind.Read);
                    let read2 = DocumentHighlight.create(Range.create(Position.create(3, 9), Position.create(3, 11)), DocumentHighlightKind.Read);
                    let declarationB = DocumentHighlight.create(Range.create(Position.create(5, 4), Position.create(5, 6)), DocumentHighlightKind.Write);
                    let writeB = DocumentHighlight.create(Range.create(Position.create(6, 4), Position.create(6, 6)), DocumentHighlightKind.Write);
                    let readB = DocumentHighlight.create(Range.create(Position.create(6, 14), Position.create(6, 16)), DocumentHighlightKind.Read);
                    let read2B = DocumentHighlight.create(Range.create(Position.create(7, 9), Position.create(7, 11)), DocumentHighlightKind.Read);
                    let document =
                        "FROM alpine\nENV aa=x\nENV aa=y bb=${aa}\nENV cc=${aa}\n" +
                        "FROM alpine\nENV aa=x\nENV aa=y bb=${aa}\nENV cc=${aa}"
                        ;
                    let ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, [declaration, write, read, read2]);
                    ranges = computeHighlightRanges(document, 2, 5);
                    assertHighlightRanges(ranges, [declaration, write, read, read2]);
                    ranges = computeHighlightRanges(document, 2, 15);
                    assertHighlightRanges(ranges, [declaration, write, read, read2]);
                    ranges = computeHighlightRanges(document, 3, 10);
                    assertHighlightRanges(ranges, [declaration, write, read, read2]);
                    ranges = computeHighlightRanges(document, 5, 5);
                    assertHighlightRanges(ranges, [declarationB, writeB, readB, read2B]);
                    ranges = computeHighlightRanges(document, 6, 5);
                    assertHighlightRanges(ranges, [declarationB, writeB, readB, read2B]);
                    ranges = computeHighlightRanges(document, 6, 15);
                    assertHighlightRanges(ranges, [declarationB, writeB, readB, read2B]);
                    ranges = computeHighlightRanges(document, 7, 10);
                    assertHighlightRanges(ranges, [declarationB, writeB, readB, read2B]);
                });

				/**
				 * ENV aa=x
				 * ENV aa=y bb=$aa
				 * ENV cc=$aa
				 */
                it("$var", function () {
                    let declaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 6)), DocumentHighlightKind.Write);
                    let write = DocumentHighlight.create(Range.create(Position.create(2, 4), Position.create(2, 6)), DocumentHighlightKind.Write);
                    let read = DocumentHighlight.create(Range.create(Position.create(2, 13), Position.create(2, 15)), DocumentHighlightKind.Read);
                    let read2 = DocumentHighlight.create(Range.create(Position.create(3, 8), Position.create(3, 10)), DocumentHighlightKind.Read);
                    let declarationB = DocumentHighlight.create(Range.create(Position.create(5, 4), Position.create(5, 6)), DocumentHighlightKind.Write);
                    let writeB = DocumentHighlight.create(Range.create(Position.create(6, 4), Position.create(6, 6)), DocumentHighlightKind.Write);
                    let readB = DocumentHighlight.create(Range.create(Position.create(6, 13), Position.create(6, 15)), DocumentHighlightKind.Read);
                    let read2B = DocumentHighlight.create(Range.create(Position.create(7, 8), Position.create(7, 10)), DocumentHighlightKind.Read);
                    let document =
                        "FROM alpine\nENV aa=x\nENV aa=y bb=$aa\nENV cc=$aa\n" +
                        "FROM alpine\nENV aa=x\nENV aa=y bb=$aa\nENV cc=$aa"
                        ;
                    let ranges = computeHighlightRanges(document, 1, 5);
                    assertHighlightRanges(ranges, [declaration, write, read, read2]);
                    ranges = computeHighlightRanges(document, 2, 5);
                    assertHighlightRanges(ranges, [declaration, write, read, read2]);
                    ranges = computeHighlightRanges(document, 2, 14);
                    assertHighlightRanges(ranges, [declaration, write, read, read2]);
                    ranges = computeHighlightRanges(document, 3, 9);
                    assertHighlightRanges(ranges, [declaration, write, read, read2]);
                    ranges = computeHighlightRanges(document, 5, 5);
                    assertHighlightRanges(ranges, [declarationB, writeB, readB, read2B]);
                    ranges = computeHighlightRanges(document, 6, 5);
                    assertHighlightRanges(ranges, [declarationB, writeB, readB, read2B]);
                    ranges = computeHighlightRanges(document, 6, 14);
                    assertHighlightRanges(ranges, [declarationB, writeB, readB, read2B]);
                    ranges = computeHighlightRanges(document, 7, 9);
                    assertHighlightRanges(ranges, [declarationB, writeB, readB, read2B]);
                });
            });

            it("empty ARG", function () {
                let declaration = DocumentHighlight.create(Range.create(Position.create(1, 4), Position.create(1, 7)), DocumentHighlightKind.Write);
                let declarationB = DocumentHighlight.create(Range.create(Position.create(4, 4), Position.create(4, 7)), DocumentHighlightKind.Write);
                let document =
                    "FROM alpine\nENV var=value\nARG\n" +
                    "FROM alpine\nENV var=value\nARG"
                    ;
                let ranges = computeHighlightRanges(document, 1, 5);
                assertHighlightRanges(ranges, [declaration]);
                ranges = computeHighlightRanges(document, 4, 5);
                assertHighlightRanges(ranges, [declarationB]);
            });
        });
    });

    describe("before FROM", function () {
        describe("ARG", function () {
            it("FROM lookup", function () {
                let arg = DocumentHighlight.create(Range.create(0, 4, 0, 9), DocumentHighlightKind.Write);
                let from = DocumentHighlight.create(Range.create(1, 6, 1, 11), DocumentHighlightKind.Read);
                let expected = [arg, from];
                let document = "ARG image=alpine\nFROM $image";
                let ranges = computeHighlightRanges(document, 0, 6);
                assertHighlightRanges(ranges, expected);
                ranges = computeHighlightRanges(document, 1, 8);
                assertHighlightRanges(ranges, expected);

                let from2 = DocumentHighlight.create(Range.create(2, 6, 2, 11), DocumentHighlightKind.Read);
                expected = [arg, from, from2];
                document = "ARG image=alpine\nFROM $image\nFROM $image";
                ranges = computeHighlightRanges(document, 0, 6);
                assertHighlightRanges(ranges, expected);
                ranges = computeHighlightRanges(document, 1, 8);
                assertHighlightRanges(ranges, expected);
                ranges = computeHighlightRanges(document, 2, 8);
                assertHighlightRanges(ranges, expected);

                arg = DocumentHighlight.create(Range.create(0, 4, 0, 9), DocumentHighlightKind.Write);
                let arg2 = DocumentHighlight.create(Range.create(1, 4, 1, 9), DocumentHighlightKind.Write);
                from = DocumentHighlight.create(Range.create(2, 6, 2, 11), DocumentHighlightKind.Read);
                expected = [arg, arg2, from];
                document = "ARG image=alpine\nARG image=alpine\nFROM $image";
                ranges = computeHighlightRanges(document, 0, 6);
                assertHighlightRanges(ranges, expected);
                ranges = computeHighlightRanges(document, 1, 6);
                assertHighlightRanges(ranges, expected);
                ranges = computeHighlightRanges(document, 2, 8);
                assertHighlightRanges(ranges, expected);
            });

            it("reused variable name", function () {
                let arg = DocumentHighlight.create(Range.create(0, 4, 0, 9), DocumentHighlightKind.Write);
                let from = DocumentHighlight.create(Range.create(1, 6, 1, 11), DocumentHighlightKind.Read);
                let arg2 = DocumentHighlight.create(Range.create(2, 4, 2, 9), DocumentHighlightKind.Write);
                let document = "ARG image=alpine\nFROM $image\nARG image=alpine2";
                let ranges = computeHighlightRanges(document, 0, 6);
                assertHighlightRanges(ranges, [arg, from]);
                ranges = computeHighlightRanges(document, 1, 8);
                assertHighlightRanges(ranges, [arg, from]);
                ranges = computeHighlightRanges(document, 2, 6);
                assertHighlightRanges(ranges, [arg2]);

                let from2 = DocumentHighlight.create(Range.create(3, 6, 3, 11), DocumentHighlightKind.Read);
                document = "ARG image=alpine\nFROM $image\nARG image=alpine2\nFROM $image";
                ranges = computeHighlightRanges(document, 0, 6);
                assertHighlightRanges(ranges, [arg, from, from2]);
                ranges = computeHighlightRanges(document, 1, 8);
                assertHighlightRanges(ranges, [arg, from, from2]);
                ranges = computeHighlightRanges(document, 2, 6);
                assertHighlightRanges(ranges, [arg2]);
                ranges = computeHighlightRanges(document, 3, 8);
                assertHighlightRanges(ranges, [arg, from, from2]);

                from2 = DocumentHighlight.create(Range.create(2, 6, 2, 11), DocumentHighlightKind.Read);
                arg2 = DocumentHighlight.create(Range.create(3, 4, 3, 9), DocumentHighlightKind.Write);
                document = "ARG image=alpine\nFROM $image\nFROM $image\nARG image=alpine2";
                ranges = computeHighlightRanges(document, 0, 6);
                assertHighlightRanges(ranges, [arg, from, from2]);
                ranges = computeHighlightRanges(document, 1, 8);
                assertHighlightRanges(ranges, [arg, from, from2]);
                ranges = computeHighlightRanges(document, 2, 6);
                assertHighlightRanges(ranges, [arg, from, from2]);
                ranges = computeHighlightRanges(document, 3, 8);
                assertHighlightRanges(ranges, [arg2]);
            });

            it("scoped", function () {
                let arg = DocumentHighlight.create(Range.create(0, 4, 0, 9), DocumentHighlightKind.Write);
                let run = DocumentHighlight.create(Range.create(2, 10, 2, 15), DocumentHighlightKind.Read);
                let document = "ARG image=alpine\nFROM alpine\nRUN echo $image";
                let ranges = computeHighlightRanges(document, 0, 6);
                assertHighlightRanges(ranges, [arg]);
                ranges = computeHighlightRanges(document, 2, 12);
                assertHighlightRanges(ranges, [run]);

                let from = DocumentHighlight.create(Range.create(1, 6, 1, 11), DocumentHighlightKind.Read);
                document = "ARG image=alpine\nFROM $image\nRUN echo $image";
                ranges = computeHighlightRanges(document, 0, 6);
                assertHighlightRanges(ranges, [arg, from]);
                ranges = computeHighlightRanges(document, 1, 8);
                assertHighlightRanges(ranges, [arg, from]);
                ranges = computeHighlightRanges(document, 2, 12);
                assertHighlightRanges(ranges, [run]);
            });

            it("non-existent variable", function () {
                let from = DocumentHighlight.create(Range.create(0, 6, 0, 11), DocumentHighlightKind.Read);
                let arg = DocumentHighlight.create(Range.create(1, 4, 1, 9), DocumentHighlightKind.Write);
                let document = "FROM $image\nARG image";
                let ranges = computeHighlightRanges(document, 0, 8);
                assertHighlightRanges(ranges, [from]);
                ranges = computeHighlightRanges(document, 1, 7);
                assertHighlightRanges(ranges, [arg]);

                from = DocumentHighlight.create(Range.create(1, 6, 1, 11), DocumentHighlightKind.Read);
                document = "ARG\nFROM $image";
                ranges = computeHighlightRanges(document, 1, 8);
                assertHighlightRanges(ranges, [from]);

                from = DocumentHighlight.create(Range.create(1, 6, 1, 11), DocumentHighlightKind.Read);
                let from2 = DocumentHighlight.create(Range.create(2, 6, 2, 11), DocumentHighlightKind.Read);
                document = "ARG\nFROM $image\nFROM $image";
                ranges = computeHighlightRanges(document, 1, 8);
                assertHighlightRanges(ranges, [from, from2]);
                ranges = computeHighlightRanges(document, 2, 8);
                assertHighlightRanges(ranges, [from, from2]);

                from = DocumentHighlight.create(Range.create(1, 6, 1, 11), DocumentHighlightKind.Read);
                from2 = DocumentHighlight.create(Range.create(2, 6, 2, 12), DocumentHighlightKind.Read);
                document = "ARG\nFROM $image\nFROM $image2";
                ranges = computeHighlightRanges(document, 1, 8);
                assertHighlightRanges(ranges, [from]);
                ranges = computeHighlightRanges(document, 2, 8);
                assertHighlightRanges(ranges, [from2]);

                arg = DocumentHighlight.create(Range.create(0, 4, 0, 9), DocumentHighlightKind.Write);
                from = DocumentHighlight.create(Range.create(1, 6, 1, 12), DocumentHighlightKind.Read);
                let arg2 = DocumentHighlight.create(Range.create(2, 4, 2, 10), DocumentHighlightKind.Write);
                document = "ARG image=alpine\nFROM $image2\nARG image2=alpine2";
                ranges = computeHighlightRanges(document, 0, 8);
                assertHighlightRanges(ranges, [arg]);
                ranges = computeHighlightRanges(document, 1, 10);
                assertHighlightRanges(ranges, [from]);
                ranges = computeHighlightRanges(document, 2, 8);
                assertHighlightRanges(ranges, [arg2]);
            });
        });

        describe("ENV", function () {
            it("FROM lookup", function () {
                let env = DocumentHighlight.create(Range.create(0, 4, 0, 9), DocumentHighlightKind.Write);
                let from = DocumentHighlight.create(Range.create(1, 6, 1, 11), DocumentHighlightKind.Read);
                let document = "ENV image=alpine\nFROM $image";
                let ranges = computeHighlightRanges(document, 0, 6);
                assertHighlightRanges(ranges, [env]);
                ranges = computeHighlightRanges(document, 1, 8);
                assertHighlightRanges(ranges, [from]);

                let from2 = DocumentHighlight.create(Range.create(2, 6, 2, 11), DocumentHighlightKind.Read);
                document = "ENV image=alpine\nFROM $image\nFROM $image";
                ranges = computeHighlightRanges(document, 0, 6);
                assertHighlightRanges(ranges, [env]);
                ranges = computeHighlightRanges(document, 1, 8);
                assertHighlightRanges(ranges, [from, from2]);
                ranges = computeHighlightRanges(document, 2, 8);
                assertHighlightRanges(ranges, [from, from2]);

                env = DocumentHighlight.create(Range.create(0, 4, 0, 9), DocumentHighlightKind.Write);
                let env2 = DocumentHighlight.create(Range.create(1, 4, 1, 9), DocumentHighlightKind.Write);
                from = DocumentHighlight.create(Range.create(2, 6, 2, 11), DocumentHighlightKind.Read);
                document = "ENV image=alpine\nENV image=alpine\nFROM $image";
                ranges = computeHighlightRanges(document, 0, 6);
                assertHighlightRanges(ranges, [env, env2]);
                ranges = computeHighlightRanges(document, 1, 6);
                assertHighlightRanges(ranges, [env, env2]);
                ranges = computeHighlightRanges(document, 2, 8);
                assertHighlightRanges(ranges, [from]);
            });

            it("reused variable name", function () {
                let env = DocumentHighlight.create(Range.create(0, 4, 0, 9), DocumentHighlightKind.Write);
                let from = DocumentHighlight.create(Range.create(1, 6, 1, 11), DocumentHighlightKind.Read);
                let env2 = DocumentHighlight.create(Range.create(2, 4, 2, 9), DocumentHighlightKind.Write);
                let document = "ENV image=alpine\nFROM $image\nENV image=alpine2";
                let ranges = computeHighlightRanges(document, 0, 6);
                assertHighlightRanges(ranges, [env]);
                ranges = computeHighlightRanges(document, 1, 8);
                assertHighlightRanges(ranges, [from]);
                ranges = computeHighlightRanges(document, 2, 6);
                assertHighlightRanges(ranges, [env2]);

                let from2 = DocumentHighlight.create(Range.create(3, 6, 3, 11), DocumentHighlightKind.Read);
                document = "ENV image=alpine\nFROM $image\nENV image=alpine2\nFROM $image";
                ranges = computeHighlightRanges(document, 0, 6);
                assertHighlightRanges(ranges, [env]);
                ranges = computeHighlightRanges(document, 1, 8);
                assertHighlightRanges(ranges, [from, from2]);
                ranges = computeHighlightRanges(document, 2, 6);
                assertHighlightRanges(ranges, [env2]);
                ranges = computeHighlightRanges(document, 3, 8);
                assertHighlightRanges(ranges, [from, from2]);

                from2 = DocumentHighlight.create(Range.create(2, 6, 2, 11), DocumentHighlightKind.Read);
                env2 = DocumentHighlight.create(Range.create(3, 4, 3, 9), DocumentHighlightKind.Write);
                document = "ENV image=alpine\nFROM $image\nFROM $image\nENV image=alpine2";
                ranges = computeHighlightRanges(document, 0, 6);
                assertHighlightRanges(ranges, [env]);
                ranges = computeHighlightRanges(document, 1, 8);
                assertHighlightRanges(ranges, [from, from2]);
                ranges = computeHighlightRanges(document, 2, 6);
                assertHighlightRanges(ranges, [from, from2]);
                ranges = computeHighlightRanges(document, 3, 8);
                assertHighlightRanges(ranges, [env2]);
            });

            it("scoped", function () {
                let env = DocumentHighlight.create(Range.create(0, 4, 0, 9), DocumentHighlightKind.Write);
                let run = DocumentHighlight.create(Range.create(2, 10, 2, 15), DocumentHighlightKind.Read);
                let document = "ENV image=alpine\nFROM alpine\nRUN echo $image";
                let ranges = computeHighlightRanges(document, 0, 6);
                assertHighlightRanges(ranges, [env]);
                ranges = computeHighlightRanges(document, 2, 12);
                assertHighlightRanges(ranges, [run]);

                let from = DocumentHighlight.create(Range.create(1, 6, 1, 11), DocumentHighlightKind.Read);
                document = "ENV image=alpine\nFROM $image\nRUN echo $image";
                ranges = computeHighlightRanges(document, 0, 6);
                assertHighlightRanges(ranges, [env]);
                ranges = computeHighlightRanges(document, 1, 8);
                assertHighlightRanges(ranges, [from]);
                ranges = computeHighlightRanges(document, 2, 12);
                assertHighlightRanges(ranges, [run]);
            });

            it("non-existent variable", function () {
                let from = DocumentHighlight.create(Range.create(0, 6, 0, 11), DocumentHighlightKind.Read);
                let env = DocumentHighlight.create(Range.create(1, 4, 1, 9), DocumentHighlightKind.Write);
                let document = "FROM $image\nENV image";
                let ranges = computeHighlightRanges(document, 0, 8);
                assertHighlightRanges(ranges, [from]);
                ranges = computeHighlightRanges(document, 1, 7);
                assertHighlightRanges(ranges, [env]);

                from = DocumentHighlight.create(Range.create(1, 6, 1, 11), DocumentHighlightKind.Read);
                document = "ENV\nFROM $image";
                ranges = computeHighlightRanges(document, 1, 8);
                assertHighlightRanges(ranges, [from]);

                from = DocumentHighlight.create(Range.create(1, 6, 1, 11), DocumentHighlightKind.Read);
                let from2 = DocumentHighlight.create(Range.create(2, 6, 2, 11), DocumentHighlightKind.Read);
                document = "ENV\nFROM $image\nFROM $image";
                ranges = computeHighlightRanges(document, 1, 8);
                assertHighlightRanges(ranges, [from, from2]);
                ranges = computeHighlightRanges(document, 2, 8);
                assertHighlightRanges(ranges, [from, from2]);

                env = DocumentHighlight.create(Range.create(0, 4, 0, 9), DocumentHighlightKind.Write);
                from = DocumentHighlight.create(Range.create(1, 6, 1, 12), DocumentHighlightKind.Read);
                let env2 = DocumentHighlight.create(Range.create(2, 4, 2, 10), DocumentHighlightKind.Write);
                document = "ENV image=alpine\nFROM $image2\nENV image2=alpine2";
                ranges = computeHighlightRanges(document, 0, 8);
                assertHighlightRanges(ranges, [env]);
                ranges = computeHighlightRanges(document, 1, 10);
                assertHighlightRanges(ranges, [from]);
                ranges = computeHighlightRanges(document, 2, 8);
                assertHighlightRanges(ranges, [env2]);
            });
        });
    });

    describe("non-existent variable", function () {
        describe("no FROM", function () {
            it("${var}", function () {
                let stopsignal = DocumentHighlight.create(Range.create(Position.create(1, 13), Position.create(1, 16)), DocumentHighlightKind.Read);
                let user = DocumentHighlight.create(Range.create(Position.create(2, 7), Position.create(2, 10)), DocumentHighlightKind.Read);
                let workdir = DocumentHighlight.create(Range.create(Position.create(3, 10), Position.create(3, 13)), DocumentHighlightKind.Read);
                let expected = [stopsignal, user, workdir];
                let document = "FROM busybox\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}";
                let ranges = computeHighlightRanges(document, 1, 13);
                assertHighlightRanges(ranges, expected);

                ranges = computeHighlightRanges(document, 2, 7);
                assertHighlightRanges(ranges, expected);

                ranges = computeHighlightRanges(document, 3, 11);
                assertHighlightRanges(ranges, expected);
            });

            it("$var", function () {
                let stopsignal = DocumentHighlight.create(Range.create(Position.create(1, 12), Position.create(1, 15)), DocumentHighlightKind.Read);
                let user = DocumentHighlight.create(Range.create(Position.create(2, 6), Position.create(2, 9)), DocumentHighlightKind.Read);
                let workdir = DocumentHighlight.create(Range.create(Position.create(3, 9), Position.create(3, 12)), DocumentHighlightKind.Read);
                let expected = [stopsignal, user, workdir];
                let document = "FROM busybox\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                let ranges = computeHighlightRanges(document, 1, 13);
                assertHighlightRanges(ranges, expected);

                ranges = computeHighlightRanges(document, 2, 7);
                assertHighlightRanges(ranges, expected);

                ranges = computeHighlightRanges(document, 3, 11);
                assertHighlightRanges(ranges, expected);

                stopsignal = DocumentHighlight.create(Range.create(Position.create(1, 12), Position.create(1, 16)), DocumentHighlightKind.Read);
                document = "FROM busybox\nSTOPSIGNAL $var2\nUSER $var\nWORKDIR $var";
                ranges = computeHighlightRanges(document, 1, 13);
                assertHighlightRanges(ranges, [stopsignal]);

                let run = DocumentHighlight.create(Range.create(Position.create(0, 11), Position.create(0, 14)), DocumentHighlightKind.Read);
                document = "RUN echo \"$var\"";
                ranges = computeHighlightRanges(document, 0, 12);
                assertHighlightRanges(ranges, [run]);

                document = "RUN echo '$var'";
                ranges = computeHighlightRanges(document, 0, 12);
                assertHighlightRanges(ranges, [run]);
            });
        });

        describe("build stage", function () {
            it("${var}", function () {
                let stopsignal = DocumentHighlight.create(Range.create(Position.create(1, 13), Position.create(1, 16)), DocumentHighlightKind.Read);
                let user = DocumentHighlight.create(Range.create(Position.create(2, 7), Position.create(2, 10)), DocumentHighlightKind.Read);
                let workdir = DocumentHighlight.create(Range.create(Position.create(3, 10), Position.create(3, 13)), DocumentHighlightKind.Read);
                let expected = [stopsignal, user, workdir];
                let stopsignalB = DocumentHighlight.create(Range.create(Position.create(5, 13), Position.create(5, 16)), DocumentHighlightKind.Read);
                let userB = DocumentHighlight.create(Range.create(Position.create(6, 7), Position.create(6, 10)), DocumentHighlightKind.Read);
                let workdirB = DocumentHighlight.create(Range.create(Position.create(7, 10), Position.create(7, 13)), DocumentHighlightKind.Read);
                let expectedB = [stopsignalB, userB, workdirB];
                let document =
                    "FROM busybox\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}\n" +
                    "FROM busybox\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}"
                    ;
                let ranges = computeHighlightRanges(document, 1, 13);
                assertHighlightRanges(ranges, expected);
                ranges = computeHighlightRanges(document, 2, 7);
                assertHighlightRanges(ranges, expected);
                ranges = computeHighlightRanges(document, 3, 11);
                assertHighlightRanges(ranges, expected);
                ranges = computeHighlightRanges(document, 5, 13);
                assertHighlightRanges(ranges, expectedB);
                ranges = computeHighlightRanges(document, 6, 7);
                assertHighlightRanges(ranges, expectedB);
                ranges = computeHighlightRanges(document, 7, 11);
                assertHighlightRanges(ranges, expectedB);
            });

            it("$var", function () {
                let stopsignal = DocumentHighlight.create(Range.create(Position.create(1, 12), Position.create(1, 15)), DocumentHighlightKind.Read);
                let user = DocumentHighlight.create(Range.create(Position.create(2, 6), Position.create(2, 9)), DocumentHighlightKind.Read);
                let workdir = DocumentHighlight.create(Range.create(Position.create(3, 9), Position.create(3, 12)), DocumentHighlightKind.Read);
                let expected = [stopsignal, user, workdir];
                let stopsignalB = DocumentHighlight.create(Range.create(Position.create(5, 12), Position.create(5, 15)), DocumentHighlightKind.Read);
                let userB = DocumentHighlight.create(Range.create(Position.create(6, 6), Position.create(6, 9)), DocumentHighlightKind.Read);
                let workdirB = DocumentHighlight.create(Range.create(Position.create(7, 9), Position.create(7, 12)), DocumentHighlightKind.Read);
                let expectedB = [stopsignalB, userB, workdirB];
                let content =
                    "FROM busybox\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var\n" +
                    "FROM busybox\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var"
                    ;
                let ranges = computeHighlightRanges(content, 1, 13);
                assertHighlightRanges(ranges, expected);
                ranges = computeHighlightRanges(content, 2, 7);
                assertHighlightRanges(ranges, expected);
                ranges = computeHighlightRanges(content, 3, 11);
                assertHighlightRanges(ranges, expected);
                ranges = computeHighlightRanges(content, 5, 13);
                assertHighlightRanges(ranges, expectedB);
                ranges = computeHighlightRanges(content, 6, 7);
                assertHighlightRanges(ranges, expectedB);
                ranges = computeHighlightRanges(content, 7, 11);
                assertHighlightRanges(ranges, expectedB);

                stopsignal = DocumentHighlight.create(Range.create(Position.create(1, 12), Position.create(1, 16)), DocumentHighlightKind.Read);
                stopsignalB = DocumentHighlight.create(Range.create(Position.create(5, 12), Position.create(5, 16)), DocumentHighlightKind.Read);
                content =
                    "FROM busybox\nSTOPSIGNAL $var2\nUSER $var\nWORKDIR $var\n" +
                    "FROM busybox\nSTOPSIGNAL $var2\nUSER $var\nWORKDIR $var"
                    ;
                ranges = computeHighlightRanges(content, 1, 13);
                assertHighlightRanges(ranges, [stopsignal]);
                ranges = computeHighlightRanges(content, 5, 13);
                assertHighlightRanges(ranges, [stopsignalB]);

                let run = DocumentHighlight.create(Range.create(Position.create(1, 11), Position.create(1, 14)), DocumentHighlightKind.Read);
                let runB = DocumentHighlight.create(Range.create(Position.create(3, 11), Position.create(3, 14)), DocumentHighlightKind.Read);
                content =
                    "FROM busybox\nRUN echo \"$var\"\n" +
                    "FROM busybox\nRUN echo \"$var\""
                    ;
                ranges = computeHighlightRanges(content, 1, 12);
                assertHighlightRanges(ranges, [run]);
                ranges = computeHighlightRanges(content, 3, 12);
                assertHighlightRanges(ranges, [runB]);

                content =
                    "FROM busybox\nRUN echo '$var'\n" +
                    "FROM busybox\nRUN echo '$var'"
                    ;
                ranges = computeHighlightRanges(content, 1, 12);
                assertHighlightRanges(ranges, [run]);
                ranges = computeHighlightRanges(content, 3, 12);
                assertHighlightRanges(ranges, [runB]);
            });
        });
    });
});
