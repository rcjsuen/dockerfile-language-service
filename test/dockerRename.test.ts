/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as assert from "assert";

import { Range, Position, TextEdit, TextDocumentIdentifier } from 'vscode-languageserver-types';
import { DockerfileLanguageServiceFactory } from '../src/main';

const service = DockerfileLanguageServiceFactory.createLanguageService();

function prepareRename(content: string, line: number, character: number): Range | null {
    return service.prepareRename(content, Position.create(line, character));
}

function rename(content: string, line: number, character: number, newName: string): TextEdit[] {
    return service.computeRename(TextDocumentIdentifier.create(""), content, Position.create(line, character), newName);
}

function assertRange(actual: Range, startLine: number, startCharacter: number, endLine: number, endCharacter: number) {
    assert.strictEqual(actual.start.line, startLine);
    assert.strictEqual(actual.start.character, startCharacter);
    assert.strictEqual(actual.end.line, endLine);
    assert.strictEqual(actual.end.character, endCharacter);
}

function assertEdit(edit: TextEdit, newName: string, startLine: number, startCharacter: number, endLine: number, endCharacter: number) {
    assert.strictEqual(edit.newText, newName);
    assert.strictEqual(edit.range.start.line, startLine);
    assert.strictEqual(edit.range.start.character, startCharacter);
    assert.strictEqual(edit.range.end.line, endLine);
    assert.strictEqual(edit.range.end.character, endCharacter);
}

function assertEdits(actualEdits: TextEdit[], expectedEdits: TextEdit[]) {
    assert.strictEqual(actualEdits.length, expectedEdits.length);
    for (let i = 0; i < actualEdits.length; i++) {
        assertEdit(
            actualEdits[i],
            expectedEdits[i].newText,
            expectedEdits[i].range.start.line,
            expectedEdits[i].range.start.character,
            expectedEdits[i].range.end.line,
            expectedEdits[i].range.end.character
        );
    }
}

describe("Dockerfile Document Rename tests", function () {
    describe("FROM", function () {
        describe("AS name", function () {
            it("no COPY", function () {
                let content = "FROM node AS bootstrap";
                let range  = prepareRename(content, 0, 17);
                assertRange(range, 0, 13, 0, 22);
                let edits = rename(content, 0, 17, "renamed");
                assert.strictEqual(edits.length, 1);
                assertEdit(edits[0], "renamed", 0, 13, 0, 22);
            });

            it("repeated FROM", function () {
                // same casing
                let content = "FROM node AS bootstrap\nFROM node AS bootstrap";
                let range  = prepareRename(content, 0, 17);
                assertRange(range, 0, 13, 0, 22);
                let edits = rename(content, 0, 17, "renamed");
                assert.strictEqual(edits.length, 2);
                assertEdit(edits[0], "renamed", 0, 13, 0, 22);
                assertEdit(edits[1], "renamed", 1, 13, 1, 22);

                range  = prepareRename(content, 1, 17);
                assertRange(range, 1, 13, 1, 22);
                edits = rename(content, 1, 17, "renamed");
                assert.strictEqual(edits.length, 2);
                assertEdit(edits[0], "renamed", 0, 13, 0, 22);
                assertEdit(edits[1], "renamed", 1, 13, 1, 22);

                // differnt casing
                content = "FROM node AS bootstrap\nFROM node AS BOOTSTRAP";
                range  = prepareRename(content, 0, 17);
                assertRange(range, 0, 13, 0, 22);
                edits = rename(content, 0, 17, "renamed");
                assert.strictEqual(edits.length, 2);
                assertEdit(edits[0], "renamed", 0, 13, 0, 22);
                assertEdit(edits[1], "renamed", 1, 13, 1, 22);

                range  = prepareRename(content, 1, 17);
                assertRange(range, 1, 13, 1, 22);
                edits = rename(content, 1, 17, "renamed");
                assert.strictEqual(edits.length, 2);
                assertEdit(edits[0], "renamed", 0, 13, 0, 22);
                assertEdit(edits[1], "renamed", 1, 13, 1, 22);
            });

            describe("repeated FROM", () => {
                it("simple", () => {
                    const content = "FROM alpine AS base\nFROM base";
                    let range  = prepareRename(content, 0, 17);
                    assertRange(range, 0, 15, 0, 19);
                    let edits = rename(content, 0, 17, "base2");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "base2", 0, 15, 0, 19);
                    assertEdit(edits[1], "base2", 1, 5, 1, 9);

                    range  = prepareRename(content, 1, 7);
                    assertRange(range, 1, 5, 1, 9);
                    edits = rename(content, 1, 7, "base2");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "base2", 0, 15, 0, 19);
                    assertEdit(edits[1], "base2", 1, 5, 1, 9);
                });

                it("stage name shadows actual image name before", () => {
                    const content = "FROM alpine\nFROM scratch AS alpine\nFROM alpine";
                    let range  = prepareRename(content, 0, 17);
                    assert.strictEqual(range, null);
                    let edits = rename(content, 0, 8, "base");
                    assert.strictEqual(edits.length, 0);

                    range  = prepareRename(content, 1, 20);
                    assertRange(range, 1, 16, 1, 22);
                    edits = rename(content, 1, 20, "base");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "base", 1, 16, 1, 22);
                    assertEdit(edits[1], "base", 2, 5, 2, 11);

                    range  = prepareRename(content, 2, 8);
                    assertRange(range, 2, 5, 2, 11);
                    edits = rename(content, 2, 8, "base");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "base", 1, 16, 1, 22);
                    assertEdit(edits[1], "base", 2, 5, 2, 11);
                });

                it("stage name shadows actual image name on the same line", () => {
                    const content = "FROM alpine AS alpine";
                    let range  = prepareRename(content, 0, 8);
                    assert.strictEqual(range, null);
                    let edits = rename(content, 0, 8, "base");
                    assert.strictEqual(edits.length, 0);

                    range  = prepareRename(content, 0, 19);
                    assertRange(range, 0, 15, 0, 21);
                    edits = rename(content, 0, 19, "base");
                    assert.strictEqual(edits.length, 1);
                    assertEdit(edits[0], "base", 0, 15, 0, 21);
                });
            });

            it("COPY", function () {
                let content = "FROM node AS bootstrap\nFROM node\nCOPY --from=bootstrap /git/bin/app .";
                // cursor in the FROM
                let range  = prepareRename(content, 0, 17);
                assertRange(range, 0, 13, 0, 22);
                let edits = rename(content, 0, 17, "renamed");
                assert.strictEqual(edits.length, 2);
                assertEdit(edits[0], "renamed", 0, 13, 0, 22);
                assertEdit(edits[1], "renamed", 2, 12, 2, 21);

                // cursor in the COPY
                range  = prepareRename(content, 2, 16);
                assertRange(range, 2, 12, 2, 21);
                edits = rename(content, 2, 16, "renamed");
                assert.strictEqual(edits.length, 2);
                assertEdit(edits[0], "renamed", 0, 13, 0, 22);
                assertEdit(edits[1], "renamed", 2, 12, 2, 21);

                content = "FROM node AS bootstrap\nCOPY --from=BOOTSTRAP /git/bin/app .";
                // cursor in the FROM
                range  = prepareRename(content, 0, 17);
                assertRange(range, 0, 13, 0, 22);
                edits = rename(content, 0, 17, "renamed");
                assert.strictEqual(edits.length, 2);
                assertEdit(edits[0], "renamed", 0, 13, 0, 22);
                assertEdit(edits[1], "renamed", 1, 12, 1, 21);

                // cursor in the COPY
                range  = prepareRename(content, 1, 16);
                assertRange(range, 1, 12, 1, 21);
                edits = rename(content, 1, 16, "renamed");
                assert.strictEqual(edits.length, 2);
                assertEdit(edits[0], "renamed", 0, 13, 0, 22);
                assertEdit(edits[1], "renamed", 1, 12, 1, 21);
            });

            it("COPY incomplete", function () {
                let content = "FROM node AS bootstrap\nFROM node\nCOPY --from=bootstrap";
                // cursor in the FROM
                let range  = prepareRename(content, 0, 17);
                assertRange(range, 0, 13, 0, 22);
                let edits = rename(content, 0, 17, "renamed");
                assert.strictEqual(edits.length, 2);
                assertEdit(edits[0], "renamed", 0, 13, 0, 22);
                assertEdit(edits[1], "renamed", 2, 12, 2, 21);

                // cursor in the COPY
                range  = prepareRename(content, 2, 16);
                assertRange(range, 2, 12, 2, 21);
                edits = rename(content, 2, 16, "renamed");
                assert.strictEqual(edits.length, 2);
                assertEdit(edits[0], "renamed", 0, 13, 0, 22);
                assertEdit(edits[1], "renamed", 2, 12, 2, 21);

                content = "FROM node AS bootstrap\nFROM node\nCOPY --from=BOOTSTRAP";
                // cursor in the FROM
                range  = prepareRename(content, 0, 17);
                assertRange(range, 0, 13, 0, 22);
                edits = rename(content, 0, 17, "renamed");
                assert.strictEqual(edits.length, 2);
                assertEdit(edits[0], "renamed", 0, 13, 0, 22);
                assertEdit(edits[1], "renamed", 2, 12, 2, 21);

                // cursor in the COPY
                range  = prepareRename(content, 2, 16);
                assertRange(range, 2, 12, 2, 21);
                edits = rename(content, 2, 16, "renamed");
                assert.strictEqual(edits.length, 2);
                assertEdit(edits[0], "renamed", 0, 13, 0, 22);
                assertEdit(edits[1], "renamed", 2, 12, 2, 21);
            });

            it("source mismatch", function () {
                let content = "FROM node AS bootstrap\nFROM node\nCOPY --from=bootstrap2 /git/bin/app .";
                // cursor in the FROM
                let range  = prepareRename(content, 0, 17);
                assertRange(range, 0, 13, 0, 22);
                let edits = rename(content, 0, 17, "renamed");
                assert.strictEqual(edits.length, 1);
                assertEdit(edits[0], "renamed", 0, 13, 0, 22);

                // cursor in the COPY
                range  = prepareRename(content, 2, 16);
                assertRange(range, 2, 12, 2, 22);
                edits = rename(content, 2, 16, "renamed");
                assert.strictEqual(edits.length, 1);
                assertEdit(edits[0], "renamed", 2, 12, 2, 22);

                content = "FROM node AS bootstrap\nCOPY bootstrap /git/build/";
                // cursor in the FROM
                range  = prepareRename(content, 0, 17);
                assertRange(range, 0, 13, 0, 22);
                edits = rename(content, 0, 17, "renamed");
                assert.strictEqual(edits.length, 1);
                assertEdit(edits[0], "renamed", 0, 13, 0, 22);
            });

            it("no FROM but identical COPYs", function () {
                let content = "FROM node\nCOPY --from=dev\nCOPY --from=dev /git/bin/app .";
                // cursor in the first COPY
                let range  = prepareRename(content, 1, 13);
                assertRange(range, 1, 12, 1, 15);
                let edits = rename(content, 1, 13, "renamed");
                assert.strictEqual(edits.length, 2);
                assertEdit(edits[0], "renamed", 1, 12, 1, 15);
                assertEdit(edits[1], "renamed", 2, 12, 2, 15);

                // cursor in the second COPY
                range  = prepareRename(content, 2, 13);
                assertRange(range, 2, 12, 2, 15);
                edits = rename(content, 1, 13, "renamed");
                assert.strictEqual(edits.length, 2);
                assertEdit(edits[0], "renamed", 1, 12, 1, 15);
                assertEdit(edits[1], "renamed", 2, 12, 2, 15);
            });
        });

        describe("invalid", function () {
            it("position", function () {
                let content = "FROM node AS bootstrap   \nFROM node\nCOPY --from=bootstrap /git/bin/app .";
                let range  = prepareRename(content, 0, 24);
                assert.strictEqual(range, null);
                // cursor after the AS source image
                let edits = rename(content, 0, 24, "renamed");
                assert.strictEqual(edits.length, 0);
                // cursor after the COPY --from
                range  = prepareRename(content, 2, 22);
                assert.strictEqual(range, null);
                edits = rename(content, 2, 22, "renamed");
                assert.strictEqual(edits.length, 0);
            });

            it("COPY bootstrap", function () {
                let content = "FROM node AS bootstrap\nCOPY bootstrap /git/build/";
                // cursor on COPY bootstrap
                let range  = prepareRename(content, 1, 10);
                assert.strictEqual(range, null);
                let edits = rename(content, 1, 10, "renamed");
                assert.strictEqual(edits.length, 0);
            });
        });
    });

    function createVariablesTest(testSuiteName: string, instruction: string, delimiter: string) {
        describe(testSuiteName, function () {
            describe("no FROM", function () {
                it("referenced variable ${var}", function () {
                    let content = instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}";
                    let range = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 7);
                    let edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 4);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 13, 1, 16);
                    assertEdit(edits[2], "renamed", 2, 7, 2, 10);
                    assertEdit(edits[3], "renamed", 3, 10, 3, 13);

                    range = prepareRename(content, 1, 13);
                    assertRange(range, 1, 13, 1, 16);
                    edits = rename(content, 1, 13, "renamed");
                    assert.strictEqual(edits.length, 4);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 13, 1, 16);
                    assertEdit(edits[2], "renamed", 2, 7, 2, 10);
                    assertEdit(edits[3], "renamed", 3, 10, 3, 13);

                    range = prepareRename(content, 2, 7);
                    assertRange(range, 2, 7, 2, 10);
                    edits = rename(content, 2, 7, "renamed");
                    assert.strictEqual(edits.length, 4);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 13, 1, 16);
                    assertEdit(edits[2], "renamed", 2, 7, 2, 10);
                    assertEdit(edits[3], "renamed", 3, 10, 3, 13);

                    range = prepareRename(content, 3, 11);
                    assertRange(range, 3, 10, 3, 13);
                    edits = rename(content, 3, 11, "renamed");
                    assert.strictEqual(edits.length, 4);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 13, 1, 16);
                    assertEdit(edits[2], "renamed", 2, 7, 2, 10);
                    assertEdit(edits[3], "renamed", 3, 10, 3, 13);
                });

                it("referenced variable ${var} no value", function () {
                    let content = instruction + " var\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}";
                    let range = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 7);
                    let edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 4);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 13, 1, 16);
                    assertEdit(edits[2], "renamed", 2, 7, 2, 10);
                    assertEdit(edits[3], "renamed", 3, 10, 3, 13);

                    range = prepareRename(content, 1, 13);
                    assertRange(range, 1, 13, 1, 16);
                    edits = rename(content, 1, 13, "renamed");
                    assert.strictEqual(edits.length, 4);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 13, 1, 16);
                    assertEdit(edits[2], "renamed", 2, 7, 2, 10);
                    assertEdit(edits[3], "renamed", 3, 10, 3, 13);

                    range = prepareRename(content, 2, 7);
                    assertRange(range, 2, 7, 2, 10);
                    edits = rename(content, 2, 7, "renamed");
                    assert.strictEqual(edits.length, 4);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 13, 1, 16);
                    assertEdit(edits[2], "renamed", 2, 7, 2, 10);
                    assertEdit(edits[3], "renamed", 3, 10, 3, 13);

                    range = prepareRename(content, 3, 11);
                    assertRange(range, 3, 10, 3, 13);
                    edits = rename(content, 3, 11, "renamed");
                    assert.strictEqual(edits.length, 4);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 13, 1, 16);
                    assertEdit(edits[2], "renamed", 2, 7, 2, 10);
                    assertEdit(edits[3], "renamed", 3, 10, 3, 13);
                });

                it("referenced variable $var", function () {
                    let content = instruction + " var" + delimiter + "value\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var\nRUN echo \"$var\"\nRUN echo '$var'";
                    let range = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 7);
                    let edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 6);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 12, 1, 15);
                    assertEdit(edits[2], "renamed", 2, 6, 2, 9);
                    assertEdit(edits[3], "renamed", 3, 9, 3, 12);
                    assertEdit(edits[4], "renamed", 4, 11, 4, 14);
                    assertEdit(edits[5], "renamed", 5, 11, 5, 14);

                    range = prepareRename(content, 1, 13);
                    assertRange(range, 1, 12, 1, 15);
                    edits = rename(content, 1, 13, "renamed");
                    assert.strictEqual(edits.length, 6);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 12, 1, 15);
                    assertEdit(edits[2], "renamed", 2, 6, 2, 9);
                    assertEdit(edits[3], "renamed", 3, 9, 3, 12);
                    assertEdit(edits[4], "renamed", 4, 11, 4, 14);
                    assertEdit(edits[5], "renamed", 5, 11, 5, 14);

                    range = prepareRename(content, 2, 7);
                    assertRange(range, 2, 6, 2, 9);
                    edits = rename(content, 2, 7, "renamed");
                    assert.strictEqual(edits.length, 6);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 12, 1, 15);
                    assertEdit(edits[2], "renamed", 2, 6, 2, 9);
                    assertEdit(edits[3], "renamed", 3, 9, 3, 12);
                    assertEdit(edits[4], "renamed", 4, 11, 4, 14);
                    assertEdit(edits[5], "renamed", 5, 11, 5, 14);

                    range = prepareRename(content, 3, 11);
                    assertRange(range, 3, 9, 3, 12);
                    edits = rename(content, 3, 11, "renamed");
                    assert.strictEqual(edits.length, 6);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 12, 1, 15);
                    assertEdit(edits[2], "renamed", 2, 6, 2, 9);
                    assertEdit(edits[3], "renamed", 3, 9, 3, 12);
                    assertEdit(edits[4], "renamed", 4, 11, 4, 14);
                    assertEdit(edits[5], "renamed", 5, 11, 5, 14);

                    range = prepareRename(content, 4, 12);
                    assertRange(range, 4, 11, 4, 14);
                    edits = rename(content, 4, 12, "renamed");
                    assert.strictEqual(edits.length, 6);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 12, 1, 15);
                    assertEdit(edits[2], "renamed", 2, 6, 2, 9);
                    assertEdit(edits[3], "renamed", 3, 9, 3, 12);
                    assertEdit(edits[4], "renamed", 4, 11, 4, 14);
                    assertEdit(edits[5], "renamed", 5, 11, 5, 14);

                    range = prepareRename(content, 5, 13);
                    assertRange(range, 5, 11, 5, 14);
                    edits = rename(content, 5, 13, "renamed");
                    assert.strictEqual(edits.length, 6);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 12, 1, 15);
                    assertEdit(edits[2], "renamed", 2, 6, 2, 9);
                    assertEdit(edits[3], "renamed", 3, 9, 3, 12);
                    assertEdit(edits[4], "renamed", 4, 11, 4, 14);
                    assertEdit(edits[5], "renamed", 5, 11, 5, 14);
                });

                it("referenced variable $var no value", function () {
                    let content = instruction + " var\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var\nRUN echo \"$var\"\nRUN echo '$var'";
                    let range = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 7);
                    let edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 6);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 12, 1, 15);
                    assertEdit(edits[2], "renamed", 2, 6, 2, 9);
                    assertEdit(edits[3], "renamed", 3, 9, 3, 12);
                    assertEdit(edits[4], "renamed", 4, 11, 4, 14);
                    assertEdit(edits[5], "renamed", 5, 11, 5, 14);

                    range = prepareRename(content, 1, 13);
                    assertRange(range, 1, 12, 1, 15);
                    edits = rename(content, 1, 13, "renamed");
                    assert.strictEqual(edits.length, 6);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 12, 1, 15);
                    assertEdit(edits[2], "renamed", 2, 6, 2, 9);
                    assertEdit(edits[3], "renamed", 3, 9, 3, 12);
                    assertEdit(edits[4], "renamed", 4, 11, 4, 14);
                    assertEdit(edits[5], "renamed", 5, 11, 5, 14);

                    range = prepareRename(content, 2, 7);
                    assertRange(range, 2, 6, 2, 9);
                    edits = rename(content, 2, 7, "renamed");
                    assert.strictEqual(edits.length, 6);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 12, 1, 15);
                    assertEdit(edits[2], "renamed", 2, 6, 2, 9);
                    assertEdit(edits[3], "renamed", 3, 9, 3, 12);
                    assertEdit(edits[4], "renamed", 4, 11, 4, 14);
                    assertEdit(edits[5], "renamed", 5, 11, 5, 14);

                    range = prepareRename(content, 3, 11);
                    assertRange(range, 3, 9, 3, 12);
                    edits = rename(content, 3, 11, "renamed");
                    assert.strictEqual(edits.length, 6);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 12, 1, 15);
                    assertEdit(edits[2], "renamed", 2, 6, 2, 9);
                    assertEdit(edits[3], "renamed", 3, 9, 3, 12);
                    assertEdit(edits[4], "renamed", 4, 11, 4, 14);
                    assertEdit(edits[5], "renamed", 5, 11, 5, 14);

                    range = prepareRename(content, 4, 12);
                    assertRange(range, 4, 11, 4, 14);
                    edits = rename(content, 4, 12, "renamed");
                    assert.strictEqual(edits.length, 6);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 12, 1, 15);
                    assertEdit(edits[2], "renamed", 2, 6, 2, 9);
                    assertEdit(edits[3], "renamed", 3, 9, 3, 12);
                    assertEdit(edits[4], "renamed", 4, 11, 4, 14);
                    assertEdit(edits[5], "renamed", 5, 11, 5, 14);

                    range = prepareRename(content, 5, 13);
                    assertRange(range, 5, 11, 5, 14);
                    edits = rename(content, 5, 13, "renamed");
                    assert.strictEqual(edits.length, 6);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 12, 1, 15);
                    assertEdit(edits[2], "renamed", 2, 6, 2, 9);
                    assertEdit(edits[3], "renamed", 3, 9, 3, 12);
                    assertEdit(edits[4], "renamed", 4, 11, 4, 14);
                    assertEdit(edits[5], "renamed", 5, 11, 5, 14);
                });

                it("$var in LABEL value with single quotes", function () {
                    let content = instruction + " var" + delimiter + "value\nLABEL label='$var'";
                    let range = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 7);
                    let edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 1);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);

                    range = prepareRename(content, 1, 15);
                    assert.strictEqual(range, null);
                    edits = rename(content, 1, 15, "renamed");
                    assert.strictEqual(edits.length, 0);
                });

                it("$var in LABEL value with double quotes", function () {
                    let content = instruction + " var" + delimiter + "value\nLABEL label=\"$var\"";
                    let range = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 7);
                    let edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 14, 1, 17);

                    range = prepareRename(content, 1, 15);
                    assertRange(range, 1, 14, 1, 17);
                    edits = rename(content, 1, 15, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 14, 1, 17);
                });

                it("${var} in LABEL value with single quotes", function () {
                    let content = instruction + " var" + delimiter + "value\nLABEL label='${var}'";
                    let range = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 7);
                    let edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 1);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);

                    range = prepareRename(content, 1, 17);
                    assert.strictEqual(range, null);
                    edits = rename(content, 1, 17, "renamed");
                    assert.strictEqual(edits.length, 0);
                });

                it("${var} in LABEL value with double quotes", function () {
                    let content = instruction + " var" + delimiter + "value\nLABEL label=\"${var}\"";
                    let range = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 7);
                    let edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 15, 1, 18);

                    range = prepareRename(content, 1, 17);
                    assertRange(range, 1, 15, 1, 18);
                    edits = rename(content, 1, 17, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 15, 1, 18);
                });

                it("multiline reference \\n", function () {
                    let content = instruction + " port=8080\nEXPOSE ${po\\\nrt}";
                    let range = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 8);
                    let edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 9, 2, 2);

                    range = prepareRename(content, 1, 10);
                    assertRange(range, 1, 9, 2, 2);
                    edits = rename(content, 1, 10, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 9, 2, 2);

                    range = prepareRename(content, 2, 1);
                    assertRange(range, 1, 9, 2, 2);
                    edits = rename(content, 2, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 9, 2, 2);

                    content = "#escape=`\n" + instruction + " port=8080\nEXPOSE ${po`\nrt}";
                    range = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 8);
                    edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    edits = rename(content, 2, 10, "renamed");
                    range = prepareRename(content, 2, 10);
                    assertRange(range, 2, 9, 3, 2);
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    range = prepareRename(content, 3, 1);
                    assertRange(range, 2, 9, 3, 2);
                    edits = rename(content, 3, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    content = instruction + " port=8080\nEXPOSE $po\\\nrt";
                    range = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 8);
                    edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 8, 2, 2);

                    range = prepareRename(content, 1, 9);
                    assertRange(range, 1, 8, 2, 2);
                    edits = rename(content, 1, 9, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 8, 2, 2);

                    range = prepareRename(content, 2, 1);
                    assertRange(range, 1, 8, 2, 2);
                    edits = rename(content, 2, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 8, 2, 2);

                    content = "#escape=`\n" + instruction + " port=8080\nEXPOSE $po`\nrt";
                    range = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 8);
                    edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    edits = rename(content, 2, 9, "renamed");
                    range = prepareRename(content, 2, 9);
                    assertRange(range, 2, 8, 3, 2);
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    range = prepareRename(content, 3, 1);
                    assertRange(range, 2, 8, 3, 2);
                    edits = rename(content, 3, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    content = instruction + " port=8080\nLABEL key=\"$po\\\nrt\"";
                    range = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 8);
                    edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 12, 2, 2);

                    range = prepareRename(content, 1, 13);
                    assertRange(range, 1, 12, 2, 2);
                    edits = rename(content, 1, 13, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 12, 2, 2);

                    range = prepareRename(content, 2, 1);
                    assertRange(range, 1, 12, 2, 2);
                    edits = rename(content, 2, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 12, 2, 2);
                });

                it("multiline reference \\r\\n", function () {
                    let content = instruction + " port=8080\r\nEXPOSE ${po\\\r\nrt}";
                    let range = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 8);
                    let edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 9, 2, 2);

                    edits = rename(content, 1, 10, "renamed");
                    range = prepareRename(content, 1, 10);
                    assertRange(range, 1, 9, 2, 2);
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 9, 2, 2);

                    edits = rename(content, 2, 1, "renamed");
                    range = prepareRename(content, 2, 1);
                    assertRange(range, 1, 9, 2, 2);
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 9, 2, 2);

                    content = "#escape=`\r\n" + instruction + " port=8080\r\nEXPOSE ${po`\r\nrt}";
                    range = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 8);
                    edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    range = prepareRename(content, 2, 10);
                    assertRange(range, 2, 9, 3, 2);
                    edits = rename(content, 2, 10, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    range = prepareRename(content, 3, 1);
                    assertRange(range, 2, 9, 3, 2);
                    edits = rename(content, 3, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    content = instruction + " port=8080\r\nEXPOSE $po\\\r\nrt";
                    range = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 8);
                    edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 8, 2, 2);

                    edits = rename(content, 1, 9, "renamed");
                    range = prepareRename(content, 1, 9);
                    assertRange(range, 1, 8, 2, 2);
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 8, 2, 2);

                    edits = rename(content, 2, 1, "renamed");
                    range = prepareRename(content, 2, 1);
                    assertRange(range, 1, 8, 2, 2);
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 8, 2, 2);

                    content = "#escape=`\r\n" + instruction + " port=8080\r\nEXPOSE $po`\r\nrt";
                    range = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 8);
                    edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    edits = rename(content, 2, 9, "renamed");
                    range = prepareRename(content, 2, 9);
                    assertRange(range, 2, 8, 3, 2);
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    edits = rename(content, 3, 1, "renamed");
                    range = prepareRename(content, 3, 1);
                    assertRange(range, 2, 8, 3, 2);
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    content = instruction + " port=8080\r\nLABEL key=\"$po\\\r\nrt\"";
                    range = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 8);
                    edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 12, 2, 2);

                    range = prepareRename(content, 1, 13);
                    assertRange(range, 1, 12, 2, 2);
                    edits = rename(content, 1, 13, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 12, 2, 2);

                    range = prepareRename(content, 2, 1);
                    assertRange(range, 1, 12, 2, 2,);
                    edits = rename(content, 2, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 12, 2, 2);
                });

                it("multiline reference \\n spaced", function () {
                    let content = instruction + " port=8080\nEXPOSE ${po\\ \t\nrt}";
                    let range = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 8);
                    let edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 9, 2, 2);

                    range = prepareRename(content, 1, 10);
                    assertRange(range, 1, 9, 2, 2);
                    edits = rename(content, 1, 10, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 9, 2, 2);

                    range = prepareRename(content, 2, 1);
                    assertRange(range, 1, 9, 2, 2);
                    edits = rename(content, 2, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 9, 2, 2);

                    content = "#escape=`\n" + instruction + " port=8080\nEXPOSE ${po` \t\nrt}";
                    range = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 8);
                    edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    range = prepareRename(content, 2, 10);
                    assertRange(range, 2, 9, 3, 2);
                    edits = rename(content, 2, 10, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    range = prepareRename(content, 3, 1);
                    assertRange(range, 2, 9, 3, 2);
                    edits = rename(content, 3, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    content = instruction + " port=8080\nEXPOSE $po\\ \t\nrt";
                    range = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 8);
                    edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 8, 2, 2);

                    range = prepareRename(content, 1, 9);
                    assertRange(range, 1, 8, 2, 2);
                    edits = rename(content, 1, 9, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 8, 2, 2);

                    range = prepareRename(content, 2, 1);
                    assertRange(range, 1, 8, 2, 2);
                    edits = rename(content, 2, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 8, 2, 2);

                    content = "#escape=`\n" + instruction + " port=8080\nEXPOSE $po` \t\nrt";
                    range = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 8);
                    edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    range = prepareRename(content, 2, 9);
                    assertRange(range, 2, 8, 3, 2);
                    edits = rename(content, 2, 9, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    range = prepareRename(content, 3, 1);
                    assertRange(range, 2, 8, 3, 2);
                    edits = rename(content, 3, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    content = instruction + " port=8080\nLABEL key=\"$po\\ \t\nrt\"";
                    range = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 8);
                    edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 12, 2, 2);

                    range = prepareRename(content, 1, 13);
                    assertRange(range, 1, 12, 2, 2);
                    edits = rename(content, 1, 13, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 12, 2, 2);

                    range = prepareRename(content, 2, 1);
                    assertRange(range, 1, 12, 2, 2);
                    edits = rename(content, 2, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 12, 2, 2);
                });

                it("multiline reference \\r\\n spaced", function () {
                    let content = instruction + " port=8080\r\nEXPOSE ${po\\ \t\r\nrt}";
                    let range = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 8);
                    let edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 9, 2, 2);

                    range = prepareRename(content, 1, 10);
                    assertRange(range, 1, 9, 2, 2);
                    edits = rename(content, 1, 10, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 9, 2, 2);

                    range = prepareRename(content, 2, 1);
                    assertRange(range, 1, 9, 2, 2);
                    edits = rename(content, 2, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 9, 2, 2);

                    content = "#escape=`\r\n" + instruction + " port=8080\r\nEXPOSE ${po` \t\r\nrt}";
                    range = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 8);
                    edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    range = prepareRename(content, 2, 10);
                    assertRange(range, 2, 9, 3, 2);
                    edits = rename(content, 2, 10, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    range = prepareRename(content, 3, 1);
                    assertRange(range, 2, 9, 3, 2);
                    edits = rename(content, 3, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    content = instruction + " port=8080\r\nEXPOSE $po\\ \t\r\nrt";
                    range = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 8);
                    edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 8, 2, 2);

                    range = prepareRename(content, 1, 9);
                    assertRange(range, 1, 8, 2, 2);
                    edits = rename(content, 1, 9, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 8, 2, 2);

                    range = prepareRename(content, 2, 1);
                    assertRange(range, 1, 8, 2, 2);
                    edits = rename(content, 2, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 8, 2, 2);

                    content = "#escape=`\r\n" + instruction + " port=8080\r\nEXPOSE $po` \t\r\nrt";
                    range = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 8);
                    edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    range = prepareRename(content, 2, 9);
                    assertRange(range, 2, 8, 3, 2);
                    edits = rename(content, 2, 9, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    range = prepareRename(content, 3, 1);
                    assertRange(range, 2, 8, 3, 2);
                    edits = rename(content, 3, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    content = instruction + " port=8080\r\nLABEL key=\"$po\\ \t\r\nrt\"";
                    range = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 8);
                    edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 12, 2, 2);

                    range = prepareRename(content, 1, 13);
                    assertRange(range, 1, 12, 2, 2);
                    edits = rename(content, 1, 13, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 12, 2, 2);

                    range = prepareRename(content, 2, 1);
                    assertRange(range, 1, 12, 2, 2);
                    edits = rename(content, 2, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 12, 2, 2);
                });

                it("$var followed by space", function () {
                    let content = instruction + " var" + delimiter + "value\nLABEL key=\"$var \"";
                    let range  = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 7);
                    let edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 12, 1, 15);

                    range  = prepareRename(content, 1, 13);
                    assertRange(range, 1, 12, 1, 15);
                    edits = rename(content, 1, 13, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 12, 1, 15);
                });

                it("$var followed by tab", function () {
                    let content = instruction + " var" + delimiter + "value\nLABEL key=\"$var\t\"";
                    let range  = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 7);
                    let edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 12, 1, 15);

                    range  = prepareRename(content, 1, 13);
                    assertRange(range, 1, 12, 1, 15);
                    edits = rename(content, 1, 13, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 12, 1, 15);
                });

                it("$var is alphanumeric", function() {
                    let content = instruction + " var" + delimiter + "value\nRUN echo $var:test";
                    let range  = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 7);
                    let edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 10, 1, 13);

                    range  = prepareRename(content, 1, 12);
                    assertRange(range, 1, 10, 1, 13);
                    edits = rename(content, 1, 12, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 10, 1, 13);
                });

                it("$var has underscore", function() {
                    let content = instruction + " var_" + delimiter + "value\nRUN echo $var_:test";
                    let range  = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 8);
                    let edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 10, 1, 14);

                    range  = prepareRename(content, 1, 12);
                    assertRange(range, 1, 10, 1, 14);
                    edits = rename(content, 1, 12, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 8);
                    assertEdit(edits[1], "renamed", 1, 10, 1, 14);
                });
            });

            describe("build stage", function () {
                it("referenced variable ${var}", function () {
                    let expectedEdits = [
                        TextEdit.replace(Range.create(1, 4, 1, 7), "renamed"),
                        TextEdit.replace(Range.create(2, 13, 2, 16), "renamed"),
                        TextEdit.replace(Range.create(3, 7, 3, 10), "renamed"),
                        TextEdit.replace(Range.create(4, 10, 4, 13), "renamed")
                    ];
                    let expectedEdits2 = [
                        TextEdit.replace(Range.create(6, 4, 6, 7), "renamed"),
                        TextEdit.replace(Range.create(7, 13, 7, 16), "renamed"),
                        TextEdit.replace(Range.create(8, 7, 8, 10), "renamed"),
                        TextEdit.replace(Range.create(9, 10, 9, 13), "renamed")
                    ];
                    let content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}\n" +
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}"
                        ;
                    assertRange(prepareRename(content, 1, 5), 1, 4, 1, 7);
                    assertRange(prepareRename(content, 2, 13), 2, 13, 2, 16);
                    assertRange(prepareRename(content, 3, 7), 3, 7, 3, 10);
                    assertRange(prepareRename(content, 4, 11), 4, 10, 4, 13);
                    assertRange(prepareRename(content, 6, 5), 6, 4, 6, 7);
                    assertRange(prepareRename(content, 7, 13), 7, 13, 7, 16);
                    assertRange(prepareRename(content, 8, 7), 8, 7, 8, 10);
                    assertRange(prepareRename(content, 9, 11), 9, 10, 9, 13);
                    assertEdits(rename(content, 1, 5, "renamed"), expectedEdits);
                    assertEdits(rename(content, 2, 13, "renamed"), expectedEdits);
                    assertEdits(rename(content, 3, 7, "renamed"), expectedEdits);
                    assertEdits(rename(content, 4, 11, "renamed"), expectedEdits);
                    assertEdits(rename(content, 6, 5, "renamed"), expectedEdits2);
                    assertEdits(rename(content, 7, 13, "renamed"), expectedEdits2);
                    assertEdits(rename(content, 8, 7, "renamed"), expectedEdits2);
                    assertEdits(rename(content, 9, 11, "renamed"), expectedEdits2);
                });

                it("referenced variable ${var} no value", function () {
                    let expectedEdits = [
                        TextEdit.replace(Range.create(1, 4, 1, 7), "renamed"),
                        TextEdit.replace(Range.create(2, 13, 2, 16), "renamed"),
                        TextEdit.replace(Range.create(3, 7, 3, 10), "renamed"),
                        TextEdit.replace(Range.create(4, 10, 4, 13), "renamed")
                    ];
                    let expectedEdits2 = [
                        TextEdit.replace(Range.create(6, 4, 6, 7), "renamed"),
                        TextEdit.replace(Range.create(7, 13, 7, 16), "renamed"),
                        TextEdit.replace(Range.create(8, 7, 8, 10), "renamed"),
                        TextEdit.replace(Range.create(9, 10, 9, 13), "renamed")
                    ];
                    let content =
                        "FROM alpine\n" + instruction + " var\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}\n" +
                        "FROM alpine\n" + instruction + " var\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}"
                        ;
                    assertRange(prepareRename(content, 1, 5), 1, 4, 1, 7);
                    assertRange(prepareRename(content, 2, 13), 2, 13, 2, 16);
                    assertRange(prepareRename(content, 3, 7), 3, 7, 3, 10);
                    assertRange(prepareRename(content, 4, 11), 4, 10, 4, 13);
                    assertRange(prepareRename(content, 6, 5), 6, 4, 6, 7);
                    assertRange(prepareRename(content, 7, 13), 7, 13, 7, 16);
                    assertRange(prepareRename(content, 8, 7), 8, 7, 8, 10);
                    assertRange(prepareRename(content, 9, 11), 9, 10, 9, 13);
                    assertEdits(rename(content, 1, 5, "renamed"), expectedEdits);
                    assertEdits(rename(content, 2, 13, "renamed"), expectedEdits);
                    assertEdits(rename(content, 3, 7, "renamed"), expectedEdits);
                    assertEdits(rename(content, 4, 11, "renamed"), expectedEdits);
                    assertEdits(rename(content, 6, 5, "renamed"), expectedEdits2);
                    assertEdits(rename(content, 7, 13, "renamed"), expectedEdits2);
                    assertEdits(rename(content, 8, 7, "renamed"), expectedEdits2);
                    assertEdits(rename(content, 9, 11, "renamed"), expectedEdits2);
                });

                it("referenced variable $var", function () {
                    let expectedEdits = [
                        TextEdit.replace(Range.create(1, 4, 1, 7), "renamed"),
                        TextEdit.replace(Range.create(2, 12, 2, 15), "renamed"),
                        TextEdit.replace(Range.create(3, 6, 3, 9), "renamed"),
                        TextEdit.replace(Range.create(4, 9, 4, 12), "renamed"),
                        TextEdit.replace(Range.create(5, 11, 5, 14), "renamed"),
                        TextEdit.replace(Range.create(6, 11, 6, 14), "renamed")
                    ];
                    let expectedEdits2 = [
                        TextEdit.replace(Range.create(8, 4, 8, 7), "renamed"),
                        TextEdit.replace(Range.create(9, 12, 9, 15), "renamed"),
                        TextEdit.replace(Range.create(10, 6, 10, 9), "renamed"),
                        TextEdit.replace(Range.create(11, 9, 11, 12), "renamed"),
                        TextEdit.replace(Range.create(12, 11, 12, 14), "renamed"),
                        TextEdit.replace(Range.create(13, 11, 13, 14), "renamed")
                    ];
                    let content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var\nRUN echo \"$var\"\nRUN echo '$var'\n" +
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var\nRUN echo \"$var\"\nRUN echo '$var'"
                        ;
                    assertRange(prepareRename(content, 1, 5), 1, 4, 1, 7);
                    assertRange(prepareRename(content, 2, 13), 2, 12, 2, 15);
                    assertRange(prepareRename(content, 3, 7), 3, 6, 3, 9);
                    assertRange(prepareRename(content, 4, 11), 4, 9, 4, 12);
                    assertRange(prepareRename(content, 5, 12), 5, 11, 5, 14);
                    assertRange(prepareRename(content, 6, 13), 6, 11, 6, 14);
                    assertRange(prepareRename(content, 8, 5), 8, 4, 8, 7);
                    assertRange(prepareRename(content, 9, 13), 9, 12, 9, 15);
                    assertRange(prepareRename(content, 10, 7), 10, 6, 10, 9);
                    assertRange(prepareRename(content, 11, 11), 11, 9, 11, 12);
                    assertRange(prepareRename(content, 12, 12), 12, 11, 12, 14);
                    assertRange(prepareRename(content, 13, 13), 13, 11, 13, 14);
                    assertEdits(rename(content, 1, 5, "renamed"), expectedEdits);
                    assertEdits(rename(content, 2, 13, "renamed"), expectedEdits);
                    assertEdits(rename(content, 3, 7, "renamed"), expectedEdits);
                    assertEdits(rename(content, 4, 11, "renamed"), expectedEdits);
                    assertEdits(rename(content, 5, 12, "renamed"), expectedEdits);
                    assertEdits(rename(content, 6, 13, "renamed"), expectedEdits);
                    assertEdits(rename(content, 8, 5, "renamed"), expectedEdits2);
                    assertEdits(rename(content, 9, 13, "renamed"), expectedEdits2);
                    assertEdits(rename(content, 10, 7, "renamed"), expectedEdits2);
                    assertEdits(rename(content, 11, 11, "renamed"), expectedEdits2);
                    assertEdits(rename(content, 12, 12, "renamed"), expectedEdits2);
                    assertEdits(rename(content, 13, 13, "renamed"), expectedEdits2);
                });

                it("referenced variable $var no value", function () {
                    let expectedEdits = [
                        TextEdit.replace(Range.create(1, 4, 1, 7), "renamed"),
                        TextEdit.replace(Range.create(2, 12, 2, 15), "renamed"),
                        TextEdit.replace(Range.create(3, 6, 3, 9), "renamed"),
                        TextEdit.replace(Range.create(4, 9, 4, 12), "renamed"),
                        TextEdit.replace(Range.create(5, 11, 5, 14), "renamed"),
                        TextEdit.replace(Range.create(6, 11, 6, 14), "renamed")
                    ];
                    let expectedEdits2 = [
                        TextEdit.replace(Range.create(8, 4, 8, 7), "renamed"),
                        TextEdit.replace(Range.create(9, 12, 9, 15), "renamed"),
                        TextEdit.replace(Range.create(10, 6, 10, 9), "renamed"),
                        TextEdit.replace(Range.create(11, 9, 11, 12), "renamed"),
                        TextEdit.replace(Range.create(12, 11, 12, 14), "renamed"),
                        TextEdit.replace(Range.create(13, 11, 13, 14), "renamed")
                    ];
                    let content =
                        "FROM alpine\n" + instruction + " var\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var\nRUN echo \"$var\"\nRUN echo '$var'\n" +
                        "FROM alpine\n" + instruction + " var\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var\nRUN echo \"$var\"\nRUN echo '$var'"
                        ;
                    assertRange(prepareRename(content, 1, 5), 1, 4, 1, 7);
                    assertRange(prepareRename(content, 2, 13), 2, 12, 2, 15);
                    assertRange(prepareRename(content, 3, 7), 3, 6, 3, 9);
                    assertRange(prepareRename(content, 4, 11), 4, 9, 4, 12);
                    assertRange(prepareRename(content, 5, 12), 5, 11, 5, 14);
                    assertRange(prepareRename(content, 6, 13), 6, 11, 6, 14);
                    assertRange(prepareRename(content, 8, 5), 8, 4, 8, 7);
                    assertRange(prepareRename(content, 9, 13), 9, 12, 9, 15);
                    assertRange(prepareRename(content, 10, 7), 10, 6, 10, 9);
                    assertRange(prepareRename(content, 11, 11), 11, 9, 11, 12);
                    assertRange(prepareRename(content, 12, 12), 12, 11, 12, 14);
                    assertRange(prepareRename(content, 13, 13), 13, 11, 13, 14);
                    assertEdits(rename(content, 1, 5, "renamed"), expectedEdits);
                    assertEdits(rename(content, 2, 13, "renamed"), expectedEdits);
                    assertEdits(rename(content, 3, 7, "renamed"), expectedEdits);
                    assertEdits(rename(content, 4, 11, "renamed"), expectedEdits);
                    assertEdits(rename(content, 5, 12, "renamed"), expectedEdits);
                    assertEdits(rename(content, 6, 13, "renamed"), expectedEdits);
                    assertEdits(rename(content, 8, 5, "renamed"), expectedEdits2);
                    assertEdits(rename(content, 9, 13, "renamed"), expectedEdits2);
                    assertEdits(rename(content, 10, 7, "renamed"), expectedEdits2);
                    assertEdits(rename(content, 11, 11, "renamed"), expectedEdits2);
                    assertEdits(rename(content, 12, 12, "renamed"), expectedEdits2);
                    assertEdits(rename(content, 13, 13, "renamed"), expectedEdits2);
                });

                it("$var in LABEL value with single quotes", function () {
                    let content = "FROM alpine\n" + instruction + " var" + delimiter + "value\nLABEL label='$var'";
                    let range  = prepareRename(content, 1, 5,);
                    assertRange(range, 1, 4, 1, 7);
                    let edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 1);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 7);

                    range  = prepareRename(content, 2, 15);
                    assert.strictEqual(null, range);
                    edits = rename(content, 2, 15, "renamed");
                    assert.strictEqual(edits.length, 0);
                });

                it("$var in LABEL value with double quotes", function () {
                    let content = "FROM alpine\n" + instruction + " var" + delimiter + "value\nLABEL label=\"$var\"";
                    let range  = prepareRename(content, 1, 5,);
                    assertRange(range, 1, 4, 1, 7);
                    let edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 7);
                    assertEdit(edits[1], "renamed", 2, 14, 2, 17);

                    range  = prepareRename(content, 2, 15);
                    assertRange(range, 2, 14, 2, 17);
                    edits = rename(content, 2, 15, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 7);
                    assertEdit(edits[1], "renamed", 2, 14, 2, 17);
                });

                it("${var} in LABEL value with single quotes", function () {
                    let content = "FROM alpine\n" + instruction + " var" + delimiter + "value\nLABEL label='${var}'";
                    let range  = prepareRename(content, 1, 5,);
                    assertRange(range, 1, 4, 1, 7);
                    let edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 1);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 7);

                    range  = prepareRename(content, 2, 17);
                    assert.strictEqual(null, range);
                    edits = rename(content, 2, 17, "renamed");
                    assert.strictEqual(edits.length, 0);
                });

                it("${var} in LABEL value with double quotes", function () {
                    let content = "FROM alpine\n" + instruction + " var" + delimiter + "value\nLABEL label=\"${var}\"";
                    let range  = prepareRename(content, 1, 5,);
                    assertRange(range, 1, 4, 1, 7);
                    let edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 7);
                    assertEdit(edits[1], "renamed", 2, 15, 2, 18);

                    range  = prepareRename(content, 2, 17);
                    assertRange(range, 2, 15, 2, 18);
                    edits = rename(content, 2, 17, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 7);
                    assertEdit(edits[1], "renamed", 2, 15, 2, 18);
                });

                it("multiline reference \\n", function () {
                    let content = "FROM alpine\n" + instruction + " port=8080\nEXPOSE ${po\\\nrt}";
                    let range  = prepareRename(content, 1, 5,);
                    assertRange(range, 1, 4, 1, 8);
                    let edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    range  = prepareRename(content, 2, 10);
                    assertRange(range, 2, 9, 3, 2);
                    edits = rename(content, 2, 10, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    range  = prepareRename(content, 3, 1);
                    assertRange(range, 2, 9, 3, 2);
                    edits = rename(content, 3, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    content = "#escape=`\nFROM alpine\n" + instruction + " port=8080\nEXPOSE ${po`\nrt}";
                    range  = prepareRename(content, 2, 5);
                    assertRange(range, 2, 4, 2, 8);
                    edits = rename(content, 2, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 9, 4, 2);

                    range  = prepareRename(content, 3, 10);
                    assertRange(range, 3, 9, 4, 2);
                    edits = rename(content, 3, 10, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 9, 4, 2);

                    range  = prepareRename(content, 4, 1);
                    assertRange(range, 3, 9, 4, 2);
                    edits = rename(content, 4, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 9, 4, 2);

                    content = "FROM alpine\n" + instruction + " port=8080\nEXPOSE $po\\\nrt";
                    range  = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 8);
                    edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    range  = prepareRename(content, 2, 9);
                    assertRange(range, 2, 8, 3, 2);
                    edits = rename(content, 2, 9, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    range  = prepareRename(content, 3, 1);
                    assertRange(range, 2, 8, 3, 2);
                    edits = rename(content, 3, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    content = "#escape=`\nFROM alpine\n" + instruction + " port=8080\nEXPOSE $po`\nrt";
                    range  = prepareRename(content, 2, 5);
                    assertRange(range, 2, 4, 2, 8);
                    edits = rename(content, 2, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 8, 4, 2);

                    range  = prepareRename(content, 3, 9);
                    assertRange(range, 3, 8, 4, 2);
                    edits = rename(content, 3, 9, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 8, 4, 2);

                    range  = prepareRename(content, 4, 1);
                    assertRange(range, 3, 8, 4, 2);
                    edits = rename(content, 4, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 8, 4, 2);

                    content = "FROM alpine\n" + instruction + " port=8080\nLABEL key=\"$po\\\nrt\"";
                    range  = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 8);
                    edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 12, 3, 2);

                    range  = prepareRename(content, 2, 13);
                    assertRange(range, 2, 12, 3, 2);
                    edits = rename(content, 2, 13, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 12, 3, 2);

                    range  = prepareRename(content, 3, 1);
                    assertRange(range, 2, 12, 3, 2);
                    edits = rename(content, 3, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 12, 3, 2);
                });

                it("multiline reference \\r\\n", function () {
                    let content = "FROM alpine\r\n" + instruction + " port=8080\r\nEXPOSE ${po\\\r\nrt}";
                    let range  = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 8);
                    let edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    range  = prepareRename(content, 2, 10);
                    assertRange(range, 2, 9, 3, 2);
                    edits = rename(content, 2, 10, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    range  = prepareRename(content, 3, 1);
                    assertRange(range, 2, 9, 3, 2);
                    edits = rename(content, 3, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    content = "#escape=`\r\nFROM alpine\r\n" + instruction + " port=8080\r\nEXPOSE ${po`\r\nrt}";
                    range  = prepareRename(content, 2, 5);
                    assertRange(range, 2, 4, 2, 8);
                    edits = rename(content, 2, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 9, 4, 2);

                    range  = prepareRename(content, 3, 10);
                    assertRange(range, 3, 9, 4, 2);
                    edits = rename(content, 3, 10, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 9, 4, 2);

                    range  = prepareRename(content, 4, 1);
                    assertRange(range, 3, 9, 4, 2);
                    edits = rename(content, 4, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 9, 4, 2);

                    content = "FROM alpine\r\n" + instruction + " port=8080\r\nEXPOSE $po\\\r\nrt";
                    range  = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 8);
                    edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    range  = prepareRename(content, 2, 9);
                    assertRange(range, 2, 8, 3, 2);
                    edits = rename(content, 2, 9, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    range  = prepareRename(content, 3, 1);
                    assertRange(range, 2, 8, 3, 2);
                    edits = rename(content, 3, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    content = "#escape=`\r\nFROM alpine\r\n" + instruction + " port=8080\r\nEXPOSE $po`\r\nrt";
                    range  = prepareRename(content, 2, 5);
                    assertRange(range, 2, 4, 2, 8);
                    edits = rename(content, 2, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 8, 4, 2);

                    range  = prepareRename(content, 3, 9);
                    assertRange(range, 3, 8, 4, 2);
                    edits = rename(content, 3, 9, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 8, 4, 2);

                    range  = prepareRename(content, 4, 1);
                    assertRange(range, 3, 8, 4, 2);
                    edits = rename(content, 4, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 8, 4, 2);

                    content = "FROM alpine\r\n" + instruction + " port=8080\r\nLABEL key=\"$po\\\r\nrt\"";
                    range  = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 8);
                    edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 12, 3, 2);

                    range  = prepareRename(content, 2, 13);
                    assertRange(range, 2, 12, 3, 2);
                    edits = rename(content, 2, 13, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 12, 3, 2);

                    range  = prepareRename(content, 3, 1);
                    assertRange(range, 2, 12, 3, 2);
                    edits = rename(content, 3, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 12, 3, 2);
                });

                it("multiline reference \\n spaced", function () {
                    let content = "FROM alpine\n" + instruction + " port=8080\nEXPOSE ${po\\ \t\nrt}";
                    let range  = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 8);
                    let edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    range  = prepareRename(content, 2, 10);
                    assertRange(range, 2, 9, 3, 2);
                    edits = rename(content, 2, 10, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    range  = prepareRename(content, 3, 1);
                    assertRange(range, 2, 9, 3, 2);
                    edits = rename(content, 3, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    content = "#escape=`\nFROM alpine\n" + instruction + " port=8080\nEXPOSE ${po` \t\nrt}";
                    range  = prepareRename(content, 2, 5);
                    assertRange(range, 2, 4, 2, 8);
                    edits = rename(content, 2, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 9, 4, 2);

                    range  = prepareRename(content, 3, 10);
                    assertRange(range, 3, 9, 4, 2);
                    edits = rename(content, 3, 10, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 9, 4, 2);

                    range  = prepareRename(content, 4, 1);
                    assertRange(range, 3, 9, 4, 2);
                    edits = rename(content, 4, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 9, 4, 2);

                    content = "FROM alpine\n" + instruction + " port=8080\nEXPOSE $po\\ \t\nrt";
                    range  = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 8);
                    edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    range  = prepareRename(content, 2, 9);
                    assertRange(range, 2, 8, 3, 2);
                    edits = rename(content, 2, 9, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    range  = prepareRename(content, 3, 1);
                    assertRange(range, 2, 8, 3, 2);
                    edits = rename(content, 3, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    content = "#escape=`\nFROM alpine\n" + instruction + " port=8080\nEXPOSE $po` \t\nrt";
                    range  = prepareRename(content, 2, 5);
                    assertRange(range, 2, 4, 2, 8);
                    edits = rename(content, 2, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 8, 4, 2);

                    range  = prepareRename(content, 3, 9);
                    assertRange(range, 3, 8, 4, 2);
                    edits = rename(content, 3, 9, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 8, 4, 2);

                    range  = prepareRename(content, 4, 1);
                    assertRange(range, 3, 8, 4, 2);
                    edits = rename(content, 4, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 8, 4, 2);

                    content = "FROM alpine\n" + instruction + " port=8080\nLABEL key=\"$po\\ \t\nrt\"";
                    range  = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 8);
                    edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 12, 3, 2);

                    range  = prepareRename(content, 2, 13);
                    assertRange(range, 2, 12, 3, 2);
                    edits = rename(content, 2, 13, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 12, 3, 2);

                    range  = prepareRename(content, 3, 1);
                    assertRange(range, 2, 12, 3, 2);
                    edits = rename(content, 3, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 12, 3, 2);
                });

                it("multiline reference \\r\\n spaced", function () {
                    let content = "FROM alpine\r\n" + instruction + " port=8080\r\nEXPOSE ${po\\ \t\r\nrt}";
                    let range  = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 8);
                    let edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    range  = prepareRename(content, 2, 10);
                    assertRange(range, 2, 9, 3, 2);
                    edits = rename(content, 2, 10, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    range  = prepareRename(content, 3, 1);
                    assertRange(range, 2, 9, 3, 2);
                    edits = rename(content, 3, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 9, 3, 2);

                    content = "#escape=`\r\nFROM alpine\r\n" + instruction + " port=8080\r\nEXPOSE ${po` \t\r\nrt}";
                    range  = prepareRename(content, 2, 5);
                    assertRange(range, 2, 4, 2, 8);
                    edits = rename(content, 2, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 9, 4, 2);

                    range  = prepareRename(content, 3, 10);
                    assertRange(range, 3, 9, 4, 2);
                    edits = rename(content, 3, 10, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 9, 4, 2);

                    range  = prepareRename(content, 4, 1);
                    assertRange(range, 3, 9, 4, 2);
                    edits = rename(content, 4, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 9, 4, 2);

                    content = "FROM alpine\r\n" + instruction + " port=8080\r\nEXPOSE $po\\ \t\r\nrt";
                    range  = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 8);
                    edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    range  = prepareRename(content, 2, 9);
                    assertRange(range, 2, 8, 3, 2);
                    edits = rename(content, 2, 9, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    range  = prepareRename(content, 3, 1);
                    assertRange(range, 2, 8, 3, 2);
                    edits = rename(content, 3, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 8, 3, 2);

                    content = "#escape=`\r\nFROM alpine\r\n" + instruction + " port=8080\r\nEXPOSE $po` \t\r\nrt";
                    range  = prepareRename(content, 2, 5);
                    assertRange(range, 2, 4, 2, 8);
                    edits = rename(content, 2, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 8, 4, 2);

                    range  = prepareRename(content, 3, 9);
                    assertRange(range, 3, 8, 4, 2);
                    edits = rename(content, 3, 9, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 8, 4, 2);

                    range  = prepareRename(content, 4, 1);
                    assertRange(range, 3, 8, 4, 2);
                    edits = rename(content, 4, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 8);
                    assertEdit(edits[1], "renamed", 3, 8, 4, 2);

                    content = "FROM alpine\r\n" + instruction + " port=8080\nLABEL key=\"$po\\ \t\r\nrt\"";
                    range  = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 8);
                    edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 12, 3, 2);

                    range  = prepareRename(content, 2, 13);
                    assertRange(range, 2, 12, 3, 2);
                    edits = rename(content, 2, 13, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 12, 3, 2);

                    range  = prepareRename(content, 3, 1);
                    assertRange(range, 2, 12, 3, 2);
                    edits = rename(content, 3, 1, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 12, 3, 2);
                });

                it("$var followed by space", function () {
                    let content = "FROM alpine\n" + instruction + " var" + delimiter + "value\nLABEL key=\"$var \"";
                    let range  = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 7);
                    let edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 7);
                    assertEdit(edits[1], "renamed", 2, 12, 2, 15);

                    range  = prepareRename(content, 2, 13);
                    assertRange(range, 2, 12, 2, 15);
                    edits = rename(content, 2, 13, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 7);
                    assertEdit(edits[1], "renamed", 2, 12, 2, 15);
                });

                it("$var followed by tab", function () {
                    let content = "FROM alpine\n" + instruction + " var" + delimiter + "value\nLABEL key=\"$var\t\"";
                    let range  = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 7);
                    let edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 7);
                    assertEdit(edits[1], "renamed", 2, 12, 2, 15);

                    range  = prepareRename(content, 2, 13);
                    assertRange(range, 2, 12, 2, 15);
                    edits = rename(content, 2, 13, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 7);
                    assertEdit(edits[1], "renamed", 2, 12, 2, 15);
                });

                it("$var is alphanumeric/underscore", function() {
                    let content = "FROM alpine\n" + instruction + " var" + delimiter + "value\nRUN echo $var:test";
                    let range  = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 7);
                    let edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 7);
                    assertEdit(edits[1], "renamed", 2, 10, 2, 13);

                    range  = prepareRename(content, 2, 12);
                    assertRange(range, 2, 10, 2, 13);
                    edits = rename(content, 2, 12, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 7);
                    assertEdit(edits[1], "renamed", 2, 10, 2, 13);
                });

                it("$var has underscore", function() {
                    let content = "FROM alpine\n" + instruction + " var_" + delimiter + "value\nRUN echo $var_:test";
                    let range  = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 8);
                    let edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 10, 2, 14);

                    range  = prepareRename(content, 2, 12);
                    assertRange(range, 2, 10, 2, 14);
                    edits = rename(content, 2, 12, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 4, 1, 8);
                    assertEdit(edits[1], "renamed", 2, 10, 2, 14);
                });

                it("empty instruction", function () {
                    let content = "FROM alpine\n" + instruction + "\n" + instruction + " var";
                    let range  = prepareRename(content, 2, 5);
                    assertRange(range, 2, 4, 2, 7);
                    let edits = rename(content, 2, 5, "renamed");
                    assert.strictEqual(edits.length, 1);
                    assertEdit(edits[0], "renamed", 2, 4, 2, 7);
                });
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
                    let content = "ENV aa bb cc dd\nRUN echo ${aa} ${cc}";
                    let range  = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 6);
                    let edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 6);
                    assertEdit(edits[1], "renamed", 1, 11, 1, 13);

                    range  = prepareRename(content, 1, 12);
                    assertRange(range, 1, 11, 1, 13);
                    edits = rename(content, 1, 12, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 6);
                    assertEdit(edits[1], "renamed", 1, 11, 1, 13);

                    range  = prepareRename(content, 0, 11);
                    assert.strictEqual(null, range);
                    edits = rename(content, 0, 11, "renamed");
                    assert.strictEqual(edits.length, 0);

                    range  = prepareRename(content, 1, 18);
                    assertRange(range, 1, 17, 1, 19);
                    edits = rename(content, 1, 18, "renamed");
                    assert.strictEqual(edits.length, 1);
                    assertEdit(edits[0], "renamed", 1, 17, 1, 19);
                });

                it("$var", function () {
                    let content = "ENV aa bb cc dd\nRUN echo $aa $cc";
                    let range  = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 6);
                    let edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 6);
                    assertEdit(edits[1], "renamed", 1, 10, 1, 12);

                    range  = prepareRename(content, 1, 11);
                    assertRange(range, 1, 10, 1, 12);
                    edits = rename(content, 1, 11, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 6);
                    assertEdit(edits[1], "renamed", 1, 10, 1, 12);

                    range  = prepareRename(content, 0, 11);
                    assert.strictEqual(null, range);
                    edits = rename(content, 0, 11, "renamed");
                    assert.strictEqual(edits.length, 0);

                    range  = prepareRename(content, 1, 15);
                    assertRange(range, 1, 14, 1, 16);
                    edits = rename(content, 1, 15, "renamed");
                    assert.strictEqual(edits.length, 1);
                    assertEdit(edits[0], "renamed", 1, 14, 1, 16);
                });
            });

            describe("reuse variable name", function () {

				/**
				 * ENV aa=x
				 * ENV aa=y bb=${aa}
				 * ENV cc=${aa}
				 */
                it("${var}", function () {
                    let content = "ENV aa=x\nENV aa=y bb=${aa}\nENV cc=${aa}";
                    let range  = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 6);
                    let edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 4);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 6);
                    assertEdit(edits[1], "renamed", 1, 4, 1, 6);
                    assertEdit(edits[2], "renamed", 1, 14, 1, 16);
                    assertEdit(edits[3], "renamed", 2, 9, 2, 11);

                    range  = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 6);
                    edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 4);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 6);
                    assertEdit(edits[1], "renamed", 1, 4, 1, 6);
                    assertEdit(edits[2], "renamed", 1, 14, 1, 16);
                    assertEdit(edits[3], "renamed", 2, 9, 2, 11);

                    range  = prepareRename(content, 1, 15);
                    assertRange(range, 1, 14, 1, 16);
                    edits = rename(content, 1, 15, "renamed");
                    assert.strictEqual(edits.length, 4);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 6);
                    assertEdit(edits[1], "renamed", 1, 4, 1, 6);
                    assertEdit(edits[2], "renamed", 1, 14, 1, 16);
                    assertEdit(edits[3], "renamed", 2, 9, 2, 11);

                    range  = prepareRename(content, 2, 10);
                    assertRange(range, 2, 9, 2, 11);
                    edits = rename(content, 2, 10, "renamed");
                    assert.strictEqual(edits.length, 4);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 6);
                    assertEdit(edits[1], "renamed", 1, 4, 1, 6);
                    assertEdit(edits[2], "renamed", 1, 14, 1, 16);
                    assertEdit(edits[3], "renamed", 2, 9, 2, 11);
                });

				/**
				 * ENV aa=x
				 * ENV aa=y bb=$aa
				 * ENV cc=$aa
				 */
                it("$var", function () {
                    let content = "ENV aa=x\nENV aa=y bb=$aa\nENV cc=$aa";
                    let range  = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 6);
                    let edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 4);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 6);
                    assertEdit(edits[1], "renamed", 1, 4, 1, 6);
                    assertEdit(edits[2], "renamed", 1, 13, 1, 15);
                    assertEdit(edits[3], "renamed", 2, 8, 2, 10);

                    range  = prepareRename(content, 1, 5);
                    assertRange(range, 1, 4, 1, 6);
                    edits = rename(content, 1, 5, "renamed");
                    assert.strictEqual(edits.length, 4);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 6);
                    assertEdit(edits[1], "renamed", 1, 4, 1, 6);
                    assertEdit(edits[2], "renamed", 1, 13, 1, 15);
                    assertEdit(edits[3], "renamed", 2, 8, 2, 10);

                    range  = prepareRename(content, 1, 14);
                    assertRange(range, 1, 13, 1, 15);
                    edits = rename(content, 1, 14, "renamed");
                    assert.strictEqual(edits.length, 4);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 6);
                    assertEdit(edits[1], "renamed", 1, 4, 1, 6);
                    assertEdit(edits[2], "renamed", 1, 13, 1, 15);
                    assertEdit(edits[3], "renamed", 2, 8, 2, 10);

                    range  = prepareRename(content, 2, 9);
                    assertRange(range, 2, 8, 2, 10);
                    edits = rename(content, 2, 9, "renamed");
                    assert.strictEqual(edits.length, 4);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 6);
                    assertEdit(edits[1], "renamed", 1, 4, 1, 6);
                    assertEdit(edits[2], "renamed", 1, 13, 1, 15);
                    assertEdit(edits[3], "renamed", 2, 8, 2, 10);
                });
            });

            describe("multiple variables", function () {
                it("${var}", function () {
                    let content = "ENV var=value var2=value2\nRUN echo ${var} ${var2}";
                    let range  = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 7);
                    let edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 11, 1, 14);

                    range  = prepareRename(content, 1, 12);
                    assertRange(range, 1, 11, 1, 14);
                    edits = rename(content, 1, 12, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 11, 1, 14);

                    range  = prepareRename(content, 0, 16);
                    assertRange(range, 0, 14, 0, 18);
                    edits = rename(content, 0, 16, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 14, 0, 18);
                    assertEdit(edits[1], "renamed", 1, 18, 1, 22);

                    range  = prepareRename(content, 1, 20);
                    assertRange(range, 1, 18, 1, 22);
                    edits = rename(content, 1, 20, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 14, 0, 18);
                    assertEdit(edits[1], "renamed", 1, 18, 1, 22);

                    content = "ENV var=value \\\nvar2=value2 \\\nvar3=value3\nRUN echo ${var} ${var2} ${var3}";
                    range  = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 7);
                    edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 3, 11, 3, 14);

                    range  = prepareRename(content, 3, 12);
                    assertRange(range, 3, 11, 3, 14);
                    edits = rename(content, 3, 12, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 3, 11, 3, 14);

                    range  = prepareRename(content, 1, 2);
                    assertRange(range, 1, 0, 1, 4);
                    edits = rename(content, 1, 2, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 0, 1, 4);
                    assertEdit(edits[1], "renamed", 3, 18, 3, 22);

                    range  = prepareRename(content, 3, 20);
                    assertRange(range, 3, 18, 3, 22);
                    edits = rename(content, 3, 20, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 0, 1, 4);
                    assertEdit(edits[1], "renamed", 3, 18, 3, 22);

                    range  = prepareRename(content, 2, 2);
                    assertRange(range, 2, 0, 2, 4);
                    edits = rename(content, 2, 2, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 0, 2, 4);
                    assertEdit(edits[1], "renamed", 3, 26, 3, 30);

                    range  = prepareRename(content, 3, 28);
                    assertRange(range, 3, 26, 3, 30);
                    edits = rename(content, 3, 28, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 0, 2, 4);
                    assertEdit(edits[1], "renamed", 3, 26, 3, 30);
                });

                it("$var", function () {
                    let content = "ENV var=value var2=value2\nRUN echo $var $var2";
                    let range  = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 7);
                    let edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 10, 1, 13);

                    range  = prepareRename(content, 1, 12);
                    assertRange(range, 1, 10, 1, 13);
                    edits = rename(content, 1, 12, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 1, 10, 1, 13);

                    range  = prepareRename(content, 0, 16);
                    assertRange(range, 0, 14, 0, 18);
                    edits = rename(content, 0, 16, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 14, 0, 18);
                    assertEdit(edits[1], "renamed", 1, 15, 1, 19);

                    range  = prepareRename(content, 1, 16);
                    assertRange(range, 1, 15, 1, 19);
                    edits = rename(content, 1, 16, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 14, 0, 18);
                    assertEdit(edits[1], "renamed", 1, 15, 1, 19);

                    content = "ENV var=value \\\nvar2=value2 \\\nvar3=value3\nRUN echo $var $var2 $var3";
                    range  = prepareRename(content, 0, 5);
                    assertRange(range, 0, 4, 0, 7);
                    edits = rename(content, 0, 5, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 3, 10, 3, 13);

                    range  = prepareRename(content, 3, 12);
                    assertRange(range, 3, 10, 3, 13);
                    edits = rename(content, 3, 12, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 0, 4, 0, 7);
                    assertEdit(edits[1], "renamed", 3, 10, 3, 13);

                    range  = prepareRename(content, 1, 2);
                    assertRange(range, 1, 0, 1, 4);
                    edits = rename(content, 1, 2, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 0, 1, 4);
                    assertEdit(edits[1], "renamed", 3, 15, 3, 19);

                    range  = prepareRename(content, 3, 16);
                    assertRange(range, 3, 15, 3, 19);
                    edits = rename(content, 3, 16, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 1, 0, 1, 4);
                    assertEdit(edits[1], "renamed", 3, 15, 3, 19);

                    range  = prepareRename(content, 2, 2);
                    assertRange(range, 2, 0, 2, 4);
                    edits = rename(content, 2, 2, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 0, 2, 4);
                    assertEdit(edits[1], "renamed", 3, 21, 3, 25);

                    range  = prepareRename(content, 3, 22);
                    assertRange(range, 3, 21, 3, 25);
                    edits = rename(content, 3, 22, "renamed");
                    assert.strictEqual(edits.length, 2);
                    assertEdit(edits[0], "renamed", 2, 0, 2, 4);
                    assertEdit(edits[1], "renamed", 3, 21, 3, 25);
                });
            });
        });

        describe("build stage", function () {
            describe("single variable delimited by space", function () {
                it("${var}", function () {
                    let expectedEdits = [
                        TextEdit.replace(Range.create(1, 4, 1, 6), "renamed"),
                        TextEdit.replace(Range.create(2, 11, 2, 13), "renamed")
                    ];
                    let expectedEdits2 = [
                        TextEdit.replace(Range.create(4, 4, 4, 6), "renamed"),
                        TextEdit.replace(Range.create(5, 11, 5, 13), "renamed")
                    ];
                    let content =
                        "FROM alpine\nENV aa bb cc dd\nRUN echo ${aa} ${cc}\n" +
                        "FROM alpine\nENV aa bb cc dd\nRUN echo ${aa} ${cc}"
                        ;
                    assertRange(prepareRename(content, 1, 5), 1, 4, 1, 6);
                    assertRange(prepareRename(content, 4, 5), 4, 4, 4, 6);
                    assertEdits(rename(content, 1, 5, "renamed"), expectedEdits);
                    assertEdits(rename(content, 4, 5, "renamed"), expectedEdits2);

                    assertRange(prepareRename(content, 2, 12), 2, 11, 2, 13);
                    assertRange(prepareRename(content, 5, 12), 5, 11, 5, 13);
                    assertEdits(rename(content, 2, 12, "renamed"), expectedEdits);
                    assertEdits(rename(content, 5, 12, "renamed"), expectedEdits2);

                    assert.strictEqual(null, prepareRename(content, 1, 11));
                    assert.strictEqual(null, prepareRename(content, 4, 11));
                    assert.strictEqual(rename(content, 1, 11, "renamed").length, 0);
                    assert.strictEqual(rename(content, 4, 11, "renamed").length, 0);

                    let edits = rename(content, 2, 18, "renamed");
                    assert.strictEqual(edits.length, 1);
                    assertEdit(edits[0], "renamed", 2, 17, 2, 19);
                    edits = rename(content, 5, 18, "renamed");
                    assert.strictEqual(edits.length, 1);
                    assertEdit(edits[0], "renamed", 5, 17, 5, 19);
                });

                it("$var", function () {
                    let expectedEdits = [
                        TextEdit.replace(Range.create(1, 4, 1, 6), "renamed"),
                        TextEdit.replace(Range.create(2, 10, 2, 12), "renamed")
                    ];
                    let expectedEdits2 = [
                        TextEdit.replace(Range.create(4, 4, 4, 6), "renamed"),
                        TextEdit.replace(Range.create(5, 10, 5, 12), "renamed")
                    ];
                    let content =
                        "FROM alpine\nENV aa bb cc dd\nRUN echo $aa $cc\n" +
                        "FROM alpine\nENV aa bb cc dd\nRUN echo $aa $cc"
                        ;
                    assertRange(prepareRename(content, 1, 5), 1, 4, 1, 6);
                    assertRange(prepareRename(content, 4, 5), 4, 4, 4, 6);
                    assertEdits(rename(content, 1, 5, "renamed"), expectedEdits);
                    assertEdits(rename(content, 4, 5, "renamed"), expectedEdits2);

                    assertRange(prepareRename(content, 2, 11), 2, 10, 2, 12);
                    assertRange(prepareRename(content, 5, 11), 5, 10, 5, 12);
                    assertEdits(rename(content, 2, 11, "renamed"), expectedEdits);
                    assertEdits(rename(content, 5, 11, "renamed"), expectedEdits2);

                    assert.strictEqual(null, prepareRename(content, 1, 11));
                    assert.strictEqual(null, prepareRename(content, 4, 11));
                    assert.strictEqual(rename(content, 1, 11, "renamed").length, 0);
                    assert.strictEqual(rename(content, 4, 11, "renamed").length, 0);

                    let range  = prepareRename(content, 2, 15);
                    assertRange(range, 2, 14, 2, 16);
                    let edits = rename(content, 2, 15, "renamed");
                    assert.strictEqual(edits.length, 1);
                    assertEdit(edits[0], "renamed", 2, 14, 2, 16);

                    range  = prepareRename(content, 5, 15);
                    assertRange(range, 5, 14, 5, 16);
                    edits = rename(content, 5, 15, "renamed");
                    assert.strictEqual(edits.length, 1);
                    assertEdit(edits[0], "renamed", 5, 14, 5, 16);
                });
            });

            describe("reuse variable name build stage", function () {

				/**
				 * ENV aa=x
				 * ENV aa=y bb=${aa}
				 * ENV cc=${aa}
				 */
                it("${var}", function () {
                    let expectedEdits = [
                        TextEdit.replace(Range.create(1, 4, 1, 6), "renamed"),
                        TextEdit.replace(Range.create(2, 4, 2, 6), "renamed"),
                        TextEdit.replace(Range.create(2, 14, 2, 16), "renamed"),
                        TextEdit.replace(Range.create(3, 9, 3, 11), "renamed")
                    ];
                    let expectedEdits2 = [
                        TextEdit.replace(Range.create(5, 4, 5, 6), "renamed"),
                        TextEdit.replace(Range.create(6, 4, 6, 6), "renamed"),
                        TextEdit.replace(Range.create(6, 14, 6, 16), "renamed"),
                        TextEdit.replace(Range.create(7, 9, 7, 11), "renamed")
                    ];
                    let content =
                        "FROM alpine\nENV aa=x\nENV aa=y bb=${aa}\nENV cc=${aa}\n" +
                        "FROM alpine\nENV aa=x\nENV aa=y bb=${aa}\nENV cc=${aa}"
                        ;
                    assertRange(prepareRename(content, 1, 5), 1, 4, 1, 6);
                    assertRange(prepareRename(content, 5, 5), 5, 4, 5, 6);
                    assertRange(prepareRename(content, 2, 5), 2, 4, 2, 6);
                    assertRange(prepareRename(content, 6, 5), 6, 4, 6, 6);
                    assertRange(prepareRename(content, 2, 15), 2, 14, 2, 16);
                    assertRange(prepareRename(content, 6, 15), 6, 14, 6, 16);
                    assertRange(prepareRename(content, 3, 10), 3, 9, 3, 11);
                    assertRange(prepareRename(content, 7, 10), 7, 9, 7, 11);
                    assertEdits(rename(content, 1, 5, "renamed"), expectedEdits);
                    assertEdits(rename(content, 5, 5, "renamed"), expectedEdits2);
                    assertEdits(rename(content, 2, 5, "renamed"), expectedEdits);
                    assertEdits(rename(content, 6, 5, "renamed"), expectedEdits2);
                    assertEdits(rename(content, 2, 15, "renamed"), expectedEdits);
                    assertEdits(rename(content, 6, 15, "renamed"), expectedEdits2);
                    assertEdits(rename(content, 3, 10, "renamed"), expectedEdits);
                    assertEdits(rename(content, 7, 10, "renamed"), expectedEdits2);
                });

				/**
				 * ENV aa=x
				 * ENV aa=y bb=$aa
				 * ENV cc=$aa
				 */
                it("$var", function () {
                    let expectedEdits = [
                        TextEdit.replace(Range.create(1, 4, 1, 6), "renamed"),
                        TextEdit.replace(Range.create(2, 4, 2, 6), "renamed"),
                        TextEdit.replace(Range.create(2, 13, 2, 15), "renamed"),
                        TextEdit.replace(Range.create(3, 8, 3, 10), "renamed")
                    ];
                    let expectedEdits2 = [
                        TextEdit.replace(Range.create(5, 4, 5, 6), "renamed"),
                        TextEdit.replace(Range.create(6, 4, 6, 6), "renamed"),
                        TextEdit.replace(Range.create(6, 13, 6, 15), "renamed"),
                        TextEdit.replace(Range.create(7, 8, 7, 10), "renamed")
                    ];
                    let content =
                        "FROM alpine\nENV aa=x\nENV aa=y bb=$aa\nENV cc=$aa\n" +
                        "FROM alpine\nENV aa=x\nENV aa=y bb=$aa\nENV cc=$aa"
                        ;
                    assertRange(prepareRename(content, 1, 5), 1, 4, 1, 6);
                    assertRange(prepareRename(content, 5, 5), 5, 4, 5, 6);
                    assertRange(prepareRename(content, 2, 5), 2, 4, 2, 6);
                    assertRange(prepareRename(content, 6, 5), 6, 4, 6, 6);
                    assertRange(prepareRename(content, 2, 14), 2, 13, 2, 15);
                    assertRange(prepareRename(content, 6, 14), 6, 13, 6, 15);
                    assertRange(prepareRename(content, 3, 9), 3, 8, 3, 10);
                    assertRange(prepareRename(content, 7, 9), 7, 8, 7, 10);
                    assertEdits(rename(content, 1, 5, "renamed"), expectedEdits);
                    assertEdits(rename(content, 5, 5, "renamed"), expectedEdits2);
                    assertEdits(rename(content, 2, 5, "renamed"), expectedEdits);
                    assertEdits(rename(content, 6, 5, "renamed"), expectedEdits2);
                    assertEdits(rename(content, 2, 14, "renamed"), expectedEdits);
                    assertEdits(rename(content, 6, 14, "renamed"), expectedEdits2);
                    assertEdits(rename(content, 3, 9, "renamed"), expectedEdits);
                    assertEdits(rename(content, 7, 9, "renamed"), expectedEdits2);
                });
            });

            describe("multiple variables", function () {
                it("${var}", function () {
                    let expectedEditsA = [
                        TextEdit.replace(Range.create(1, 4, 1, 7), "renamed"),
                        TextEdit.replace(Range.create(2, 11, 2, 14), "renamed")
                    ];
                    let expectedEditsA2 = [
                        TextEdit.replace(Range.create(1, 14, 1, 18), "renamed"),
                        TextEdit.replace(Range.create(2, 18, 2, 22), "renamed")
                    ];
                    let expectedEditsB = [
                        TextEdit.replace(Range.create(4, 4, 4, 7), "renamed"),
                        TextEdit.replace(Range.create(5, 11, 5, 14), "renamed")
                    ];
                    let expectedEditsB2 = [
                        TextEdit.replace(Range.create(4, 14, 4, 18), "renamed"),
                        TextEdit.replace(Range.create(5, 18, 5, 22), "renamed")
                    ];
                    let content =
                        "FROM alpine\nENV var=value var2=value2\nRUN echo ${var} ${var2}\n" +
                        "FROM alpine\nENV var=value var2=value2\nRUN echo ${var} ${var2}"
                        ;
                    assertRange(prepareRename(content, 1, 5), 1, 4, 1, 7);
                    assertRange(prepareRename(content, 2, 12), 2, 11, 2, 14);
                    assertRange(prepareRename(content, 1, 16), 1, 14, 1, 18);
                    assertRange(prepareRename(content, 2, 20), 2, 18, 2, 22);
                    assertRange(prepareRename(content, 4, 5), 4, 4, 4, 7);
                    assertRange(prepareRename(content, 5, 12), 5, 11, 5, 14);
                    assertRange(prepareRename(content, 4, 16), 4, 14, 4, 18);
                    assertRange(prepareRename(content, 5, 20), 5, 18, 5, 22);
                    assertEdits(rename(content, 1, 5, "renamed"), expectedEditsA);
                    assertEdits(rename(content, 2, 12, "renamed"), expectedEditsA);
                    assertEdits(rename(content, 1, 16, "renamed"), expectedEditsA2);
                    assertEdits(rename(content, 2, 20, "renamed"), expectedEditsA2);
                    assertEdits(rename(content, 4, 5, "renamed"), expectedEditsB);
                    assertEdits(rename(content, 5, 12, "renamed"), expectedEditsB);
                    assertEdits(rename(content, 4, 16, "renamed"), expectedEditsB2);
                    assertEdits(rename(content, 5, 20, "renamed"), expectedEditsB2);

                    expectedEditsA = [
                        TextEdit.replace(Range.create(1, 4, 1, 7), "renamed"),
                        TextEdit.replace(Range.create(4, 11, 4, 14), "renamed"),
                    ];
                    expectedEditsA2 = [
                        TextEdit.replace(Range.create(2, 0, 2, 4), "renamed"),
                        TextEdit.replace(Range.create(4, 18, 4, 22), "renamed")
                    ];
                    let expectedEditsA3 = [
                        TextEdit.replace(Range.create(3, 0, 3, 4), "renamed"),
                        TextEdit.replace(Range.create(4, 26, 4, 30), "renamed")
                    ];
                    expectedEditsB = [
                        TextEdit.replace(Range.create(6, 4, 6, 7), "renamed"),
                        TextEdit.replace(Range.create(9, 11, 9, 14), "renamed"),
                    ];
                    expectedEditsB2 = [
                        TextEdit.replace(Range.create(7, 0, 7, 4), "renamed"),
                        TextEdit.replace(Range.create(9, 18, 9, 22), "renamed")
                    ];
                    let expectedEditsB3 = [
                        TextEdit.replace(Range.create(8, 0, 8, 4), "renamed"),
                        TextEdit.replace(Range.create(9, 26, 9, 30), "renamed")
                    ];
                    content =
                        "FROM alpine\nENV var=value \\\nvar2=value2 \\\nvar3=value3\nRUN echo ${var} ${var2} ${var3}\n" +
                        "FROM alpine\nENV var=value \\\nvar2=value2 \\\nvar3=value3\nRUN echo ${var} ${var2} ${var3}"
                        ;
                    assertRange(prepareRename(content, 1, 5), 1, 4, 1, 7);
                    assertRange(prepareRename(content, 4, 12), 4, 11, 4, 14);
                    assertRange(prepareRename(content, 2, 2), 2, 0, 2, 4);
                    assertRange(prepareRename(content, 4, 20), 4, 18, 4, 22);
                    assertRange(prepareRename(content, 3, 2), 3, 0, 3, 4);
                    assertRange(prepareRename(content, 4, 28), 4, 26, 4, 30);
                    assertRange(prepareRename(content, 6, 5), 6, 4, 6, 7);
                    assertRange(prepareRename(content, 9, 12), 9, 11, 9, 14);
                    assertRange(prepareRename(content, 7, 2), 7, 0, 7, 4);
                    assertRange(prepareRename(content, 9, 20), 9, 18, 9, 22);
                    assertRange(prepareRename(content, 8, 2), 8, 0, 8, 4);
                    assertRange(prepareRename(content, 9, 28), 9, 26, 9, 30);
                    assertEdits(rename(content, 1, 5, "renamed"), expectedEditsA);
                    assertEdits(rename(content, 4, 12, "renamed"), expectedEditsA);
                    assertEdits(rename(content, 2, 2, "renamed"), expectedEditsA2);
                    assertEdits(rename(content, 4, 20, "renamed"), expectedEditsA2);
                    assertEdits(rename(content, 3, 2, "renamed"), expectedEditsA3);
                    assertEdits(rename(content, 4, 28, "renamed"), expectedEditsA3);
                    assertEdits(rename(content, 6, 5, "renamed"), expectedEditsB);
                    assertEdits(rename(content, 9, 12, "renamed"), expectedEditsB);
                    assertEdits(rename(content, 7, 2, "renamed"), expectedEditsB2);
                    assertEdits(rename(content, 9, 20, "renamed"), expectedEditsB2);
                    assertEdits(rename(content, 8, 2, "renamed"), expectedEditsB3);
                    assertEdits(rename(content, 9, 28, "renamed"), expectedEditsB3);
                });

                it("$var", function () {
                    let expectedEditsA = [
                        TextEdit.replace(Range.create(1, 4, 1, 7), "renamed"),
                        TextEdit.replace(Range.create(2, 10, 2, 13), "renamed"),
                    ];
                    let expectedEditsA2 = [
                        TextEdit.replace(Range.create(1, 14, 1, 18), "renamed"),
                        TextEdit.replace(Range.create(2, 15, 2, 19), "renamed")
                    ];
                    let expectedEditsB = [
                        TextEdit.replace(Range.create(4, 4, 4, 7), "renamed"),
                        TextEdit.replace(Range.create(5, 10, 5, 13), "renamed"),
                    ];
                    let expectedEditsB2 = [
                        TextEdit.replace(Range.create(4, 14, 4, 18), "renamed"),
                        TextEdit.replace(Range.create(5, 15, 5, 19), "renamed")
                    ];
                    let content =
                        "FROM alpine\nENV var=value var2=value2\nRUN echo $var $var2\n" +
                        "FROM alpine\nENV var=value var2=value2\nRUN echo $var $var2"
                        ;
                    assertRange(prepareRename(content, 1, 5), 1, 4, 1, 7);
                    assertRange(prepareRename(content, 2, 12), 2, 10, 2, 13);
                    assertRange(prepareRename(content, 1, 16), 1, 14, 1, 18);
                    assertRange(prepareRename(content, 2, 16), 2, 15, 2, 19);
                    assertRange(prepareRename(content, 4, 5), 4, 4, 4, 7);
                    assertRange(prepareRename(content, 5, 12), 5, 10, 5, 13);
                    assertRange(prepareRename(content, 4, 16), 4, 14, 4, 18);
                    assertRange(prepareRename(content, 5, 16), 5, 15, 5, 19);
                    assertEdits(rename(content, 1, 5, "renamed"), expectedEditsA);
                    assertEdits(rename(content, 2, 12, "renamed"), expectedEditsA);
                    assertEdits(rename(content, 1, 16, "renamed"), expectedEditsA2);
                    assertEdits(rename(content, 2, 16, "renamed"), expectedEditsA2);
                    assertEdits(rename(content, 4, 5, "renamed"), expectedEditsB);
                    assertEdits(rename(content, 5, 12, "renamed"), expectedEditsB);
                    assertEdits(rename(content, 4, 16, "renamed"), expectedEditsB2);
                    assertEdits(rename(content, 5, 16, "renamed"), expectedEditsB2);

                    expectedEditsA = [
                        TextEdit.replace(Range.create(1, 4, 1, 7), "renamed"),
                        TextEdit.replace(Range.create(4, 10, 4, 13), "renamed"),
                    ];
                    expectedEditsA2 = [
                        TextEdit.replace(Range.create(2, 0, 2, 4), "renamed"),
                        TextEdit.replace(Range.create(4, 15, 4, 19), "renamed")
                    ];
                    let expectedEditsA3 = [
                        TextEdit.replace(Range.create(3, 0, 3, 4), "renamed"),
                        TextEdit.replace(Range.create(4, 21, 4, 25), "renamed")
                    ];
                    expectedEditsB = [
                        TextEdit.replace(Range.create(6, 4, 6, 7), "renamed"),
                        TextEdit.replace(Range.create(9, 10, 9, 13), "renamed"),
                    ];
                    expectedEditsB2 = [
                        TextEdit.replace(Range.create(7, 0, 7, 4), "renamed"),
                        TextEdit.replace(Range.create(9, 15, 9, 19), "renamed")
                    ];
                    let expectedEditsB3 = [
                        TextEdit.replace(Range.create(8, 0, 8, 4), "renamed"),
                        TextEdit.replace(Range.create(9, 21, 9, 25), "renamed")
                    ];
                    content =
                        "FROM alpine\nENV var=value \\\nvar2=value2 \\\nvar3=value3\nRUN echo $var $var2 $var3\n" +
                        "FROM alpine\nENV var=value \\\nvar2=value2 \\\nvar3=value3\nRUN echo $var $var2 $var3"
                        ;
                    assertRange(prepareRename(content, 1, 5), 1, 4, 1, 7);
                    assertRange(prepareRename(content, 4, 12), 4, 10, 4, 13);
                    assertRange(prepareRename(content, 2, 2), 2, 0, 2, 4);
                    assertRange(prepareRename(content, 4, 16), 4, 15, 4, 19);
                    assertRange(prepareRename(content, 3, 2), 3, 0, 3, 4);
                    assertRange(prepareRename(content, 4, 22), 4, 21, 4, 25);
                    assertRange(prepareRename(content, 6, 5), 6, 4, 6, 7);
                    assertRange(prepareRename(content, 9, 12), 9, 10, 9, 13);
                    assertRange(prepareRename(content, 7, 2), 7, 0, 7, 4);
                    assertRange(prepareRename(content, 9, 16), 9, 15, 9, 19);
                    assertRange(prepareRename(content, 8, 2), 8, 0, 8, 4);
                    assertRange(prepareRename(content, 9, 22), 9, 21, 9, 25);
                    assertEdits(rename(content, 1, 5, "renamed"), expectedEditsA);
                    assertEdits(rename(content, 4, 12, "renamed"), expectedEditsA);
                    assertEdits(rename(content, 2, 2, "renamed"), expectedEditsA2);
                    assertEdits(rename(content, 4, 16, "renamed"), expectedEditsA2);
                    assertEdits(rename(content, 3, 2, "renamed"), expectedEditsA3);
                    assertEdits(rename(content, 4, 22, "renamed"), expectedEditsA3);
                    assertEdits(rename(content, 6, 5, "renamed"), expectedEditsB);
                    assertEdits(rename(content, 9, 12, "renamed"), expectedEditsB);
                    assertEdits(rename(content, 7, 2, "renamed"), expectedEditsB2);
                    assertEdits(rename(content, 9, 16, "renamed"), expectedEditsB2);
                    assertEdits(rename(content, 8, 2, "renamed"), expectedEditsB3);
                    assertEdits(rename(content, 9, 22, "renamed"), expectedEditsB3);
                });
            });
        });
    });



    describe("before FROM", function () {
        describe("ARG", function () {
            it("FROM lookup", function () {
                let expectedEdits = [
                    TextEdit.replace(Range.create(0, 4, 0, 9), "renamed"),
                    TextEdit.replace(Range.create(1, 6, 1, 11), "renamed")
                ];
                let content = "ARG image=alpine\nFROM $image";
                assertRange(prepareRename(content, 0, 6), 0, 4, 0, 9);
                assertRange(prepareRename(content, 1, 8), 1, 6, 1, 11);
                assertEdits(rename(content, 0, 6, "renamed"), expectedEdits);
                assertEdits(rename(content, 1, 8, "renamed"), expectedEdits);

                expectedEdits = [
                    TextEdit.replace(Range.create(0, 4, 0, 9), "renamed"),
                    TextEdit.replace(Range.create(1, 6, 1, 11), "renamed"),
                    TextEdit.replace(Range.create(2, 6, 2, 11), "renamed")
                ];
                content = "ARG image=alpine\nFROM $image\nFROM $image";
                assertRange(prepareRename(content, 0, 6), 0, 4, 0, 9);
                assertRange(prepareRename(content, 1, 8), 1, 6, 1, 11);
                assertRange(prepareRename(content, 2, 8), 2, 6, 2, 11);
                assertEdits(rename(content, 0, 6, "renamed"), expectedEdits);
                assertEdits(rename(content, 1, 8, "renamed"), expectedEdits);
                assertEdits(rename(content, 2, 8, "renamed"), expectedEdits);

                expectedEdits = [
                    TextEdit.replace(Range.create(0, 4, 0, 9), "renamed"),
                    TextEdit.replace(Range.create(1, 4, 1, 9), "renamed"),
                    TextEdit.replace(Range.create(2, 6, 2, 11), "renamed")
                ];
                content = "ARG image=alpine\nARG image=alpine\nFROM $image";
                assertRange(prepareRename(content, 0, 6), 0, 4, 0, 9);
                assertRange(prepareRename(content, 1, 6), 1, 4, 1, 9);
                assertRange(prepareRename(content, 2, 8), 2, 6, 2, 11);
                assertEdits(rename(content, 0, 6, "renamed"), expectedEdits);
                assertEdits(rename(content, 1, 6, "renamed"), expectedEdits);
                assertEdits(rename(content, 2, 8, "renamed"), expectedEdits);
            });

            it("reused variable name", function () {
                let expectedEdits = [
                    TextEdit.replace(Range.create(0, 4, 0, 9), "renamed"),
                    TextEdit.replace(Range.create(1, 6, 1, 11), "renamed"),
                ];
                let content = "ARG image=alpine\nFROM $image\nARG image=alpine2";
                assertRange(prepareRename(content, 0, 6), 0, 4, 0, 9);
                assertRange(prepareRename(content, 1, 8), 1, 6, 1, 11);
                assertRange(prepareRename(content, 2, 6), 2, 4, 2, 9);
                assertEdits(rename(content, 0, 6, "renamed"), expectedEdits);
                assertEdits(rename(content, 1, 8, "renamed"), expectedEdits);
                assertEdits(rename(content, 2, 6, "renamed"), [TextEdit.replace(Range.create(2, 4, 2, 9), "renamed")]);

                expectedEdits = [
                    TextEdit.replace(Range.create(0, 4, 0, 9), "renamed"),
                    TextEdit.replace(Range.create(1, 6, 1, 11), "renamed"),
                    TextEdit.replace(Range.create(3, 6, 3, 11), "renamed")
                ];
                content = "ARG image=alpine\nFROM $image\nARG image=alpine2\nFROM $image";
                assertRange(prepareRename(content, 0, 6), 0, 4, 0, 9);
                assertRange(prepareRename(content, 1, 8), 1, 6, 1, 11);
                assertRange(prepareRename(content, 2, 6), 2, 4, 2, 9);
                assertEdits(rename(content, 0, 6, "renamed"), expectedEdits);
                assertEdits(rename(content, 1, 8, "renamed"), expectedEdits);
                assertEdits(rename(content, 2, 6, "renamed"), [TextEdit.replace(Range.create(2, 4, 2, 9), "renamed")]);

                expectedEdits = [
                    TextEdit.replace(Range.create(0, 4, 0, 9), "renamed"),
                    TextEdit.replace(Range.create(1, 6, 1, 11), "renamed"),
                    TextEdit.replace(Range.create(2, 6, 2, 11), "renamed")
                ];
                content = "ARG image=alpine\nFROM $image\nFROM $image\nARG image=alpine2";
                assertRange(prepareRename(content, 0, 6), 0, 4, 0, 9);
                assertRange(prepareRename(content, 1, 8), 1, 6, 1, 11);
                assertRange(prepareRename(content, 2, 6), 2, 6, 2, 11);
                assertRange(prepareRename(content, 3, 6), 3, 4, 3, 9);
                assertEdits(rename(content, 0, 6, "renamed"), expectedEdits);
                assertEdits(rename(content, 1, 8, "renamed"), expectedEdits);
                assertEdits(rename(content, 2, 8, "renamed"), expectedEdits);
                assertEdits(rename(content, 3, 6, "renamed"), [TextEdit.replace(Range.create(3, 4, 3, 9), "renamed")]);
            });

            it("scoped", function () {
                let content = "ARG image=alpine\nFROM alpine\nRUN echo $image";
                assertRange(prepareRename(content, 0, 6), 0, 4, 0, 9);
                assertRange(prepareRename(content, 2, 12), 2, 10, 2, 15);
                assertEdits(rename(content, 0, 6, "renamed"), [TextEdit.replace(Range.create(0, 4, 0, 9), "renamed")]);
                assertEdits(rename(content, 2, 12, "renamed"), [TextEdit.replace(Range.create(2, 10, 2, 15), "renamed")]);

                let expectedEdits = [
                    TextEdit.replace(Range.create(0, 4, 0, 9), "renamed"),
                    TextEdit.replace(Range.create(1, 6, 1, 11), "renamed")
                ];
                content = "ARG image=alpine\nFROM $image\nRUN echo $image";
                assertRange(prepareRename(content, 0, 6), 0, 4, 0, 9);
                assertRange(prepareRename(content, 1, 8), 1, 6, 1, 11);
                assertRange(prepareRename(content, 2, 12), 2, 10, 2, 15);
                assertEdits(rename(content, 0, 6, "renamed"), expectedEdits);
                assertEdits(rename(content, 1, 8, "renamed"), expectedEdits);
                assertEdits(rename(content, 2, 12, "renamed"), [TextEdit.replace(Range.create(2, 10, 2, 15), "renamed")]);
            });

            it("non-existent variable", function () {
                let content = "FROM $image\nARG image";
                assertRange(prepareRename(content, 0, 8), 0, 6, 0, 11);
                assertRange(prepareRename(content, 1, 7), 1, 4, 1, 9);
                assertEdits(rename(content, 0, 8, "renamed"), [TextEdit.replace(Range.create(0, 6, 0, 11), "renamed")]);
                assertEdits(rename(content, 1, 7, "renamed"), [TextEdit.replace(Range.create(1, 4, 1, 9), "renamed")]);

                content = "ARG\nFROM $image";
                assertEdits(rename(content, 1, 8, "renamed"), [TextEdit.replace(Range.create(1, 6, 1, 11), "renamed")]);

                let expectedEdits = [
                    TextEdit.replace(Range.create(1, 6, 1, 11), "renamed"),
                    TextEdit.replace(Range.create(2, 6, 2, 11), "renamed")
                ];
                content = "ARG\nFROM $image\nFROM $image";
                assertRange(prepareRename(content, 1, 8), 1, 6, 1, 11);
                assertRange(prepareRename(content, 2, 8), 2, 6, 2, 11);
                assertEdits(rename(content, 1, 8, "renamed"), expectedEdits);
                assertEdits(rename(content, 2, 8, "renamed"), expectedEdits);

                content = "ARG image=alpine\nFROM $image2\nARG image2=alpine2";
                assertRange(prepareRename(content, 0, 8), 0, 4, 0, 9);
                assertRange(prepareRename(content, 1, 10), 1, 6, 1, 12);
                assertRange(prepareRename(content, 2, 8), 2, 4, 2, 10);
                assertEdits(rename(content, 0, 8, "renamed"), [TextEdit.replace(Range.create(0, 4, 0, 9), "renamed")]);
                assertEdits(rename(content, 1, 10, "renamed"), [TextEdit.replace(Range.create(1, 6, 1, 12), "renamed")]);
                assertEdits(rename(content, 2, 8, "renamed"), [TextEdit.replace(Range.create(2, 4, 2, 10), "renamed")]);
            });
        });

        describe("ENV", function () {
            it("FROM lookup", function () {
                let content = "ENV image=alpine\nFROM $image";
                assertRange(prepareRename(content, 0, 6), 0, 4, 0, 9);
                assertRange(prepareRename(content, 1, 8), 1, 6, 1, 11);
                assertEdits(rename(content, 0, 6, "renamed"), [TextEdit.replace(Range.create(0, 4, 0, 9), "renamed")]);
                assertEdits(rename(content, 1, 8, "renamed"), [TextEdit.replace(Range.create(1, 6, 1, 11), "renamed")]);

                let expectedEdits = [
                    TextEdit.replace(Range.create(1, 6, 1, 11), "renamed"),
                    TextEdit.replace(Range.create(2, 6, 2, 11), "renamed")
                ];
                content = "ENV image=alpine\nFROM $image\nFROM $image";
                assertRange(prepareRename(content, 0, 6), 0, 4, 0, 9);
                assertRange(prepareRename(content, 1, 8), 1, 6, 1, 11);
                assertRange(prepareRename(content, 2, 8), 2, 6, 2, 11);
                assertEdits(rename(content, 0, 6, "renamed"), [TextEdit.replace(Range.create(0, 4, 0, 9), "renamed")]);
                assertEdits(rename(content, 1, 8, "renamed"), expectedEdits);
                assertEdits(rename(content, 2, 8, "renamed"), expectedEdits);

                expectedEdits = [
                    TextEdit.replace(Range.create(0, 4, 0, 9), "renamed"),
                    TextEdit.replace(Range.create(1, 4, 1, 9), "renamed"),
                ];
                content = "ENV image=alpine\nENV image=alpine\nFROM $image";
                assertRange(prepareRename(content, 0, 6), 0, 4, 0, 9);
                assertRange(prepareRename(content, 1, 6), 1, 4, 1, 9);
                assertRange(prepareRename(content, 2, 8), 2, 6, 2, 11);
                assertEdits(rename(content, 0, 6, "renamed"), expectedEdits);
                assertEdits(rename(content, 1, 6, "renamed"), expectedEdits);
                assertEdits(rename(content, 2, 8, "renamed"), [TextEdit.replace(Range.create(2, 6, 2, 11), "renamed")]);
            });

            it("reused variable name", function () {
                let content = "ENV image=alpine\nFROM $image\nENV image=alpine2";
                assertRange(prepareRename(content, 0, 6), 0, 4, 0, 9);
                assertRange(prepareRename(content, 1, 8), 1, 6, 1, 11);
                assertRange(prepareRename(content, 2, 6), 2, 4, 2, 9);
                assertEdits(rename(content, 0, 6, "renamed"), [TextEdit.replace(Range.create(0, 4, 0, 9), "renamed")]);
                assertEdits(rename(content, 1, 8, "renamed"), [TextEdit.replace(Range.create(1, 6, 1, 11), "renamed")]);
                assertEdits(rename(content, 2, 6, "renamed"), [TextEdit.replace(Range.create(2, 4, 2, 9), "renamed")]);

                let expectedEdits = [
                    TextEdit.replace(Range.create(1, 6, 1, 11), "renamed"),
                    TextEdit.replace(Range.create(3, 6, 3, 11), "renamed")
                ];
                content = "ENV image=alpine\nFROM $image\nENV image=alpine2\nFROM $image";
                assertRange(prepareRename(content, 0, 6), 0, 4, 0, 9);
                assertRange(prepareRename(content, 1, 8), 1, 6, 1, 11);
                assertRange(prepareRename(content, 2, 6), 2, 4, 2, 9);
                assertRange(prepareRename(content, 3, 6), 3, 6, 3, 11);
                assertEdits(rename(content, 0, 6, "renamed"), [TextEdit.replace(Range.create(0, 4, 0, 9), "renamed")]);
                assertEdits(rename(content, 1, 8, "renamed"), expectedEdits);
                assertEdits(rename(content, 2, 6, "renamed"), [TextEdit.replace(Range.create(2, 4, 2, 9), "renamed")]);
                assertEdits(rename(content, 3, 6, "renamed"), expectedEdits);

                expectedEdits = [
                    TextEdit.replace(Range.create(1, 6, 1, 11), "renamed"),
                    TextEdit.replace(Range.create(2, 6, 2, 11), "renamed")
                ];
                content = "ENV image=alpine\nFROM $image\nFROM $image\nENV image=alpine2";
                assertRange(prepareRename(content, 0, 6), 0, 4, 0, 9);
                assertRange(prepareRename(content, 1, 8), 1, 6, 1, 11);
                assertRange(prepareRename(content, 2, 8), 2, 6, 2, 11);
                assertRange(prepareRename(content, 3, 6), 3, 4, 3, 9);
                assertEdits(rename(content, 0, 6, "renamed"), [TextEdit.replace(Range.create(0, 4, 0, 9), "renamed")]);
                assertEdits(rename(content, 1, 8, "renamed"), expectedEdits);
                assertEdits(rename(content, 2, 8, "renamed"), expectedEdits);
                assertEdits(rename(content, 3, 6, "renamed"), [TextEdit.replace(Range.create(3, 4, 3, 9), "renamed")]);
            });

            it("scoped", function () {
                let content = "ENV image=alpine\nFROM alpine\nRUN echo $image";
                assertRange(prepareRename(content, 0, 6), 0, 4, 0, 9);
                assertRange(prepareRename(content, 2, 12), 2, 10, 2, 15);
                assertEdits(rename(content, 0, 6, "renamed"), [TextEdit.replace(Range.create(0, 4, 0, 9), "renamed")]);
                assertEdits(rename(content, 2, 12, "renamed"), [TextEdit.replace(Range.create(2, 10, 2, 15), "renamed")]);

                content = "ENV image=alpine\nFROM $image\nRUN echo $image";
                assertRange(prepareRename(content, 0, 6), 0, 4, 0, 9);
                assertRange(prepareRename(content, 1, 8), 1, 6, 1, 11);
                assertRange(prepareRename(content, 2, 12), 2, 10, 2, 15);
                assertEdits(rename(content, 0, 6, "renamed"), [TextEdit.replace(Range.create(0, 4, 0, 9), "renamed")]);
                assertEdits(rename(content, 1, 8, "renamed"), [TextEdit.replace(Range.create(1, 6, 1, 11), "renamed")]);
                assertEdits(rename(content, 2, 12, "renamed"), [TextEdit.replace(Range.create(2, 10, 2, 15), "renamed")]);
            });

            it("non-existent variable", function () {
                let content = "FROM $image\nENV image";
                assertRange(prepareRename(content, 0, 8), 0, 6, 0, 11);
                assertRange(prepareRename(content, 1, 7), 1, 4, 1, 9);
                assertEdits(rename(content, 0, 8, "renamed"), [TextEdit.replace(Range.create(0, 6, 0, 11), "renamed")]);
                assertEdits(rename(content, 1, 7, "renamed"), [TextEdit.replace(Range.create(1, 4, 1, 9), "renamed")]);

                content = "ENV\nFROM $image";
                assertEdits(rename(content, 1, 8, "renamed"), [TextEdit.replace(Range.create(1, 6, 1, 11), "renamed")]);

                let expectedEdits = [
                    TextEdit.replace(Range.create(1, 6, 1, 11), "renamed"),
                    TextEdit.replace(Range.create(2, 6, 2, 11), "renamed")
                ];
                content = "ENV\nFROM $image\nFROM $image";
                assertRange(prepareRename(content, 1, 8), 1, 6, 1, 11);
                assertRange(prepareRename(content, 2, 8), 2, 6, 2, 11);
                assertEdits(rename(content, 1, 8, "renamed"), expectedEdits);
                assertEdits(rename(content, 2, 8, "renamed"), expectedEdits);

                content = "ENV image=alpine\nFROM $image2\nENV image2=alpine2";
                assertRange(prepareRename(content, 0, 8), 0, 4, 0, 9);
                assertRange(prepareRename(content, 1, 10), 1, 6, 1, 12);
                assertRange(prepareRename(content, 2, 8), 2, 4, 2, 10);
                assertEdits(rename(content, 0, 8, "renamed"), [TextEdit.replace(Range.create(0, 4, 0, 9), "renamed")]);
                assertEdits(rename(content, 1, 10, "renamed"), [TextEdit.replace(Range.create(1, 6, 1, 12), "renamed")]);
                assertEdits(rename(content, 2, 8, "renamed"), [TextEdit.replace(Range.create(2, 4, 2, 10), "renamed")]);
            });
        });
    });

    describe("non-existent variable", function () {
        describe("no FROM", function () {
            it("${var}", function () {
                let expectedEdits = [
                    TextEdit.replace(Range.create(0, 13, 0, 16), "renamed"),
                    TextEdit.replace(Range.create(1, 7, 1, 10), "renamed"),
                    TextEdit.replace(Range.create(2, 10, 2, 13), "renamed")
                ];
                let content = "STOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}";
                let range  = prepareRename(content, 0, 14);
                assertRange(range, 0, 13, 0, 16);
                let edits = rename(content, 0, 14, "renamed");
                assertEdits(edits, expectedEdits);
                range  = prepareRename(content, 1, 7);
                assertRange(range, 1, 7, 1, 10);
                edits = rename(content, 1, 7, "renamed");
                assertEdits(edits, expectedEdits);
                range  = prepareRename(content, 2, 11);
                assertRange(range, 2, 10, 2, 13);
                edits = rename(content, 2, 11, "renamed");
                assertEdits(edits, expectedEdits);
            });

            it("referenced variable $var no value", function () {
                let expectedEdits = [
                    TextEdit.replace(Range.create(0, 12, 0, 15), "renamed"),
                    TextEdit.replace(Range.create(1, 6, 1, 9), "renamed"),
                    TextEdit.replace(Range.create(2, 9, 2, 12), "renamed")
                ];
                let content = "STOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                let range  = prepareRename(content, 0, 14);
                assertRange(range, 0, 12, 0, 15);
                let edits = rename(content, 0, 14, "renamed");
                assertEdits(edits, expectedEdits);
                range  = prepareRename(content, 1, 7);
                assertRange(range, 1, 6, 1, 9);
                edits = rename(content, 1, 7, "renamed");
                assertEdits(edits, expectedEdits);
                range  = prepareRename(content, 2, 11);
                assertRange(range, 2, 9, 2, 12);
                edits = rename(content, 2, 11, "renamed");
                assertEdits(edits, expectedEdits);
            });
        });

        describe("build stage", function () {
            it("${var}", function () {
                let expectedEditsA = [
                    TextEdit.replace(Range.create(1, 13, 1, 16), "renamed"),
                    TextEdit.replace(Range.create(2, 7, 2, 10), "renamed"),
                    TextEdit.replace(Range.create(3, 10, 3, 13), "renamed")
                ];
                let expectedEditsB = [
                    TextEdit.replace(Range.create(5, 13, 5, 16), "renamed"),
                    TextEdit.replace(Range.create(6, 7, 6, 10), "renamed"),
                    TextEdit.replace(Range.create(7, 10, 7, 13), "renamed")
                ];
                let content =
                    "FROM busybox\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}\n" +
                    "FROM busybox\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}"
                    ;
                assertRange(prepareRename(content, 1, 14), 1, 13, 1, 16);
                assertRange(prepareRename(content, 2, 7), 2, 7, 2, 10);
                assertRange(prepareRename(content, 3, 11), 3, 10, 3, 13);
                assertRange(prepareRename(content, 5, 14), 5, 13, 5, 16);
                assertRange(prepareRename(content, 6, 7), 6, 7, 6, 10);
                assertRange(prepareRename(content, 7, 11), 7, 10, 7, 13);
                assertEdits(rename(content, 1, 14, "renamed"), expectedEditsA);
                assertEdits(rename(content, 2, 7, "renamed"), expectedEditsA);
                assertEdits(rename(content, 3, 11, "renamed"), expectedEditsA);
                assertEdits(rename(content, 5, 14, "renamed"), expectedEditsB);
                assertEdits(rename(content, 6, 7, "renamed"), expectedEditsB);
                assertEdits(rename(content, 7, 11, "renamed"), expectedEditsB);
            });

            it("referenced variable $var no value", function () {
                let expectedEditsA = [
                    TextEdit.replace(Range.create(1, 12, 1, 15), "renamed"),
                    TextEdit.replace(Range.create(2, 6, 2, 9), "renamed"),
                    TextEdit.replace(Range.create(3, 9, 3, 12), "renamed")
                ];
                let expectedEditsB = [
                    TextEdit.replace(Range.create(5, 12, 5, 15), "renamed"),
                    TextEdit.replace(Range.create(6, 6, 6, 9), "renamed"),
                    TextEdit.replace(Range.create(7, 9, 7, 12), "renamed")
                ];
                let content =
                    "FROM busybox\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var\n" +
                    "FROM busybox\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var"
                    ;
                assertRange(prepareRename(content, 1, 14), 1, 12, 1, 15);
                assertRange(prepareRename(content, 2, 7), 2, 6, 2, 9);
                assertRange(prepareRename(content, 3, 11), 3, 9, 3, 12);
                assertRange(prepareRename(content, 5, 14), 5, 12, 5, 15);
                assertRange(prepareRename(content, 6, 7), 6, 6, 6, 9);
                assertRange(prepareRename(content, 7, 11), 7, 9, 7, 12);
                assertEdits(rename(content, 1, 14, "renamed"), expectedEditsA);
                assertEdits(rename(content, 2, 7, "renamed"), expectedEditsA);
                assertEdits(rename(content, 3, 11, "renamed"), expectedEditsA);
                assertEdits(rename(content, 5, 14, "renamed"), expectedEditsB);
                assertEdits(rename(content, 6, 7, "renamed"), expectedEditsB);
                assertEdits(rename(content, 7, 11, "renamed"), expectedEditsB);
            });
        });
    });

    function createHeredocTests(instruction: string, offset: number) {
        const tests = [
            {
                testName: `<<file`,
                content: `FROM alpine\n${instruction} echo <<file\nabc\nfile`,
                offset: 8
            },
            {
                testName: `<<-file`,
                content: `FROM alpine\n${instruction} echo <<-file\nabc\nfile`,
                offset: 9
            },
            {
                testName: `<<'file'`,
                content: `FROM alpine\n${instruction} echo <<'file'\nabc\nfile`,
                offset: 9
            },
            {
                testName: `<<-'file'`,
                content: `FROM alpine\n${instruction} echo <<-'file'\nabc\nfile`,
                offset: 10
            },
            {
                testName: `<<"file"`,
                content: `FROM alpine\n${instruction} echo <<"file"\nabc\nfile`,
                offset: 9
            },
            {
                testName: `<<-"file"`,
                content: `FROM alpine\n${instruction} echo <<-"file"\nabc\nfile`,
                offset: 10
            }
        ];

        describe(instruction, () => {
            describe("definition", () => {
                describe("prepareRename", () => {
                    tests.forEach((test) => {
                        it(test.testName, () => {
                            const range = prepareRename(test.content, 1, offset + 11);
                            assertRange(range, 1, offset + test.offset, 1, offset + test.offset + 4);
                        });
                    });

                    it("outside name range", () => {
                        const content = `FROM alpine\n${instruction} echo <<file\nfile`;
                        const range = prepareRename(content, 1, offset + 7);
                        assert.strictEqual(range, null);
                    });
                });

                describe("computeRename", () => {
                    tests.forEach((test) => {
                        it(test.testName, () => {
                            const edits = rename(test.content, 1, offset + 11, "file2");
                            assertEdit(edits[0], "file2", 1, offset + test.offset, 1, offset + test.offset + 4);
                            assertEdit(edits[1], "file2", 3, 0, 3, 4);
                        });
                    });

                    it("outside name range", () => {
                        const content = `FROM alpine\n${instruction} echo <<file\nfile`;
                        const range = rename(content, 1, offset + 7, "file2");
                        assert.strictEqual(0, range.length);
                    });
                });
            });

            describe("delimiter", () => {
                describe("prepareRename", () => {
                    tests.forEach((test) => {
                        it(test.testName, () => {
                            const range = prepareRename(test.content, 3, 2);
                            assertRange(range, 3, 0, 3, 4);
                        });
                    });
                });

                describe("computeRename", () => {
                    tests.forEach((test) => {
                        it(test.testName, () => {
                            const edits = rename(test.content, 3, 2, "file2");
                            assertEdit(edits[0], "file2", 1, offset + test.offset, 1, offset + test.offset + 4);
                            assertEdit(edits[1], "file2", 3, 0, 3, 4);
                        });
                    });
                });
            });
        });
    }

    describe("Heredoc", () => {
        createHeredocTests("COPY", 4);
        createHeredocTests("RUN", 3);
    });
});
