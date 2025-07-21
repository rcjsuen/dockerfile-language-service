/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as assert from "assert";

import { Location, Position, TextDocumentIdentifier } from 'vscode-languageserver-types';
import { DockerfileLanguageServiceFactory } from '../src/main';

const URI = "uri://host/Dockerfile.sample";
const service = DockerfileLanguageServiceFactory.createLanguageService();

function createIdentifier(): TextDocumentIdentifier {
    return TextDocumentIdentifier.create(URI);
}

function computeDefinition(content: string, position: Position): Location {
    return service.computeDefinition(createIdentifier(), content, position);
}

function findDefinition(content: string, line: number, character: number): Location {
    return service.computeDefinition(createIdentifier(), content, Position.create(line, character));
}

function assertLocation(location: Location, startLine: number, startCharacter: number, endLine: number, endCharacter: number) {
    assert.notStrictEqual(location, null);
    assert.strictEqual(location.uri, URI);
    assert.strictEqual(location.range.start.line, startLine);
    assert.strictEqual(location.range.start.character, startCharacter);
    assert.strictEqual(location.range.end.line, endLine);
    assert.strictEqual(location.range.end.character, endCharacter);
}

describe("Dockerfile Document Definition tests", function () {
    describe("FROM", function () {
        describe("AS name", function () {
            it("no COPY", function () {
                let document = "FROM node AS bootstrap";
                let location = computeDefinition(document, Position.create(0, 17));
                assertLocation(location, 0, 13, 0, 22);
            });

            it("COPY", function () {
                let document = "FROM node AS bootstrap\nFROM node\nCOPY --from=bootstrap /git/bin/app .";
                // cursor in the FROM
                let location = computeDefinition(document, Position.create(0, 17));
                assertLocation(location, 0, 13, 0, 22);

                // cursor in the COPY
                location = computeDefinition(document, Position.create(2, 16));
                assertLocation(location, 0, 13, 0, 22);

                document = "FROM node AS bootstrap\nFROM node\nCOPY --from=BOOTSTRAP /git/bin/app .";
                // cursor in the COPY
                location = computeDefinition(document, Position.create(2, 16));
                assertLocation(location, 0, 13, 0, 22);

                document = "FROM node AS BOOTSTRAP\nFROM node\nCOPY --from=bootstrap /git/bin/app .";
                // cursor in the COPY
                location = computeDefinition(document, Position.create(2, 16));
                assertLocation(location, 0, 13, 0, 22);
            });

            it("COPY incomplete", function () {
                let document = "FROM node AS bootstrap\nFROM node\nCOPY --from=bootstrap";
                // cursor in the FROM
                let location = computeDefinition(document, Position.create(0, 17));
                assertLocation(location, 0, 13, 0, 22);

                // cursor in the COPY
                location = computeDefinition(document, Position.create(2, 16));
                assertLocation(location, 0, 13, 0, 22);

                document = "FROM node AS bootstrap\nFROM node\nCOPY --from=BOOTSTRAP";
                // cursor in the COPY
                location = computeDefinition(document, Position.create(2, 16));
                assertLocation(location, 0, 13, 0, 22);

                document = "FROM node AS BOOTSTRAP\nFROM node\nCOPY --from=bootstrap";
                // cursor in the COPY
                location = computeDefinition(document, Position.create(2, 16));
                assertLocation(location, 0, 13, 0, 22);
            });

            it("source mismatch", function () {
                let document = "FROM node AS bootstrap\nFROM node\nCOPY --from=bootstrap2 /git/bin/app .";
                // cursor in the FROM
                let location = computeDefinition(document, Position.create(0, 17));
                assertLocation(location, 0, 13, 0, 22);

                // cursor in the COPY
                location = computeDefinition(document, Position.create(2, 16));
                assert.strictEqual(location, null);
            });

            it("FROM reference", function () {
                let document = "FROM node AS base\nFROM base";
                let location = computeDefinition(document, Position.create(0, 15));
                assertLocation(location, 0, 13, 0, 17);

                location = computeDefinition(document, Position.create(1, 7));
                assertLocation(location, 0, 13, 0, 17);
            });
        });

        describe("invalid", function () {
            it("position", function () {
                let document = "FROM node AS bootstrap   \nFROM node\nCOPY --from=bootstrap /git/bin/app .";
                // cursor after the AS source image
                let location = computeDefinition(document, Position.create(0, 24));
                assert.strictEqual(location, null);
                // cursor after the COPY --from
                location = computeDefinition(document, Position.create(2, 22));
                assert.strictEqual(location, null);
            });

            it("COPY bootstrap", function () {
                let document = "FROM node AS bootstrap\nCOPY bootstrap /git/build/";
                // cursor after the AS source image
                let location = computeDefinition(document, Position.create(1, 10));
                assert.strictEqual(location, null);
            });

            it("outside document range", function () {
                const content = "FROM scratch";
                const location = computeDefinition(content, Position.create(1, 0));
                assert.strictEqual(location, null);
            });

            describe("stage name shadowing an image", () => {
                it("referencing a later stage", () => {
                    const document = "FROM alpine\nFROM scratch AS alpine";
                    let location = computeDefinition(document, Position.create(0, 8));
                    assert.strictEqual(location, null);

                    location = computeDefinition(document, Position.create(1, 19));
                    assertLocation(location, 1, 16, 1, 22);
                });

                it("referencing itself", () => {
                    const document = "FROM alpine AS alpine";
                    let location = computeDefinition(document, Position.create(0, 8));
                    assert.strictEqual(location, null);

                    location = computeDefinition(document, Position.create(0, 18));
                    assertLocation(location, 0, 15, 0, 21);
                });
            });
        });
    });

    function createVariablesTest(testSuiteName: string, instruction: string, delimiter: string) {
        describe(testSuiteName, function () {
            describe("no FROM", function () {
                describe("${var}", function () {
                    it("value", function () {
                        let document = instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}";
                        let location = computeDefinition(document, Position.create(1, 13));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(2, 7));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(3, 11));
                        assertLocation(location, 0, 4, 0, 7);

                        document = instruction + " var_var" + delimiter + "value\nSTOPSIGNAL ${var_var}\nUSER ${var_var}\nWORKDIR ${var_var}";
                        location = computeDefinition(document, Position.create(1, 13));
                        assertLocation(location, 0, 4, 0, 11);
                        location = computeDefinition(document, Position.create(2, 7));
                        assertLocation(location, 0, 4, 0, 11);
                        location = computeDefinition(document, Position.create(3, 11));
                        assertLocation(location, 0, 4, 0, 11);
                    });

                    it("no value", function () {
                        let document = instruction + " var\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}";
                        let location = computeDefinition(document, Position.create(1, 13));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(2, 7));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(3, 11));
                        assertLocation(location, 0, 4, 0, 7);
                    });

                    it("nested no value", function () {
                        let document = instruction + " var\nSTOPSIGNAL prefix${var}\nUSER prefix${var}\nWORKDIR prefix${var}";
                        let location = computeDefinition(document, Position.create(1, 19));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(2, 13));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(3, 17));
                        assertLocation(location, 0, 4, 0, 7);
                    });

                    it("nested escaped", function () {
                        let document = instruction + " var\nSTOPSIGNAL prefix\\${var}\nUSER prefix\\${var}\nWORKDIR prefix\\${var}";
                        let location = computeDefinition(document, Position.create(1, 20));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(2, 14));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(3, 18));
                        assert.strictEqual(location, null);
                    });

                    it("no definition", function () {
                        let document = instruction + "\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}";
                        let location = computeDefinition(document, Position.create(1, 13));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(2, 7));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(3, 11));
                        assert.strictEqual(location, null);
                    });

                    it("repeated declaration", function () {
                        let document = instruction + " var=value\n" + instruction + " var=value\nRUN echo ${var}\nRUN echo${var}";
                        let location = computeDefinition(document, Position.create(0, 5));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(1, 5));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(2, 12));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(3, 12));
                        assertLocation(location, 0, 4, 0, 7);
                    });

                    it("repeated declaration no value", function () {
                        let document = instruction + " var\n" + instruction + " var\nRUN echo ${var}\nRUN echo${var}";
                        let location = computeDefinition(document, Position.create(0, 5));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(1, 5));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(2, 12));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(3, 12));
                        assertLocation(location, 0, 4, 0, 7);
                    });

                    it("redeclared variable after reference", function () {
                        let document = instruction + " var\nRUN echo ${var}\n" + instruction + " var";
                        let location = computeDefinition(document, Position.create(0, 5));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(1, 12));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(2, 5));
                        assertLocation(location, 0, 4, 0, 7);
                    });

                    it("label value with single quotes", function () {
                        let document = instruction + " var\nLABEL label='${var}'";
                        let location = computeDefinition(document, Position.create(1, 17));
                        assert.strictEqual(location, null);
                    });

                    it("label value with double quotes", function () {
                        let document = instruction + " var\nLABEL label=\"${var}\"";
                        let location = computeDefinition(document, Position.create(1, 17));
                        assertLocation(location, 0, 4, 0, 7);
                    });

                    it("multiline reference \\n", function () {
                        let document = instruction + " port=8080\nEXPOSE ${po\\\nrt}";
                        let location = computeDefinition(document, Position.create(2, 0));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 1));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 2));
                        assertLocation(location, 0, 4, 0, 8);

                        document = "#escape=`\n" + instruction + " port=8080\nEXPOSE ${po`\nrt}";
                        location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);

                        document = instruction + " port=8080\nLABEL key=\"${po\\\nrt}\"";
                        location = computeDefinition(document, Position.create(2, 0));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 1));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 2));
                        assertLocation(location, 0, 4, 0, 8);
                    });

                    it("multiline reference \\r\\n", function () {
                        let document = instruction + " port=8080\nEXPOSE ${po\\\r\nrt}";
                        let location = computeDefinition(document, Position.create(2, 0));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 1));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 2));
                        assertLocation(location, 0, 4, 0, 8);

                        document = "#escape=`\n" + instruction + " port=8080\nEXPOSE ${po`\r\nrt}";
                        location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);

                        document = instruction + " port=8080\r\nLABEL key=\"${po\\\r\nrt}\"";
                        location = computeDefinition(document, Position.create(2, 0));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 1));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 2));
                        assertLocation(location, 0, 4, 0, 8);
                    });

                    it("multiline reference \\n spaced", function () {
                        let document = instruction + " port=8080\nEXPOSE ${po\\ \t\nrt}";
                        let location = computeDefinition(document, Position.create(2, 0));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 1));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 2));
                        assertLocation(location, 0, 4, 0, 8);

                        document = "#escape=`\n" + instruction + " port=8080\nEXPOSE ${po` \t\nrt}";
                        location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);

                        document = instruction + " port=8080\nLABEL key=\"${po\\ \t\nrt}\"";
                        location = computeDefinition(document, Position.create(2, 0));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 1));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 2));
                        assertLocation(location, 0, 4, 0, 8);
                    });

                    it("multiline reference \\r\\n spaced", function () {
                        let document = instruction + " port=8080\nEXPOSE ${po\\ \t\r\nrt}";
                        let location = computeDefinition(document, Position.create(2, 0));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 1));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 2));
                        assertLocation(location, 0, 4, 0, 8);

                        document = "#escape=`\n" + instruction + " port=8080\nEXPOSE ${po` \t\r\nrt}";
                        location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);

                        document = instruction + " port=8080\r\nLABEL key=\"${po\\ \t\r\nrt}\"";
                        location = computeDefinition(document, Position.create(2, 0));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 1));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 2));
                        assertLocation(location, 0, 4, 0, 8);
                    });
                });

                describe("$var", function () {
                    it("value", function () {
                        let document = instruction + " var" + delimiter + "value\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                        let location = computeDefinition(document, Position.create(1, 13));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(2, 7));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(3, 11));
                        assertLocation(location, 0, 4, 0, 7);

                        document = instruction + " var" + delimiter + "value\nRUN echo \"$var\"";
                        location = computeDefinition(document, Position.create(1, 12));
                        assertLocation(location, 0, 4, 0, 7);

                        document = instruction + " var_var" + delimiter + "value\nSTOPSIGNAL $var_var\nUSER $var_var\nWORKDIR $var_var";
                        location = computeDefinition(document, Position.create(1, 13));
                        assertLocation(location, 0, 4, 0, 11);
                        location = computeDefinition(document, Position.create(2, 7));
                        assertLocation(location, 0, 4, 0, 11);
                        location = computeDefinition(document, Position.create(3, 11));
                        assertLocation(location, 0, 4, 0, 11);

                        document = instruction + " var" + delimiter + "value\nRUN echo '$var'";
                        location = computeDefinition(document, Position.create(1, 12));
                        assertLocation(location, 0, 4, 0, 7);
                    });

                    it("no value", function () {
                        let document = instruction + " var\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                        let location = computeDefinition(document, Position.create(1, 13));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(2, 7));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(3, 11));
                        assertLocation(location, 0, 4, 0, 7);

                        document = instruction + " var\nRUN echo \"$var\"";
                        location = computeDefinition(document, Position.create(1, 12));
                        assertLocation(location, 0, 4, 0, 7);

                        document = instruction + " var\nRUN echo '$var'";
                        location = computeDefinition(document, Position.create(1, 12));
                        assertLocation(location, 0, 4, 0, 7);
                    });

                    it("nested no value", function () {
                        let document = instruction + " var\nSTOPSIGNAL prefix$var\nUSER prefix$var\nWORKDIR prefix$var";
                        let location = computeDefinition(document, Position.create(1, 19));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(2, 13));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(3, 17));
                        assertLocation(location, 0, 4, 0, 7);
                    });

                    it("nested escaped", function () {
                        let document = instruction + " var\nSTOPSIGNAL prefix\\$var\nUSER prefix\\$var\nWORKDIR prefix\\$var";
                        let location = computeDefinition(document, Position.create(1, 20));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(2, 14));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(3, 18));
                        assert.strictEqual(location, null);
                    });

                    it("no definition", function () {
                        let document = instruction + "\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                        let location = computeDefinition(document, Position.create(1, 13));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(2, 7));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(3, 11));
                        assert.strictEqual(location, null);

                        document = instruction + "\nRUN echo \"$var\"";
                        location = computeDefinition(document, Position.create(1, 12));
                        assert.strictEqual(location, null);

                        document = instruction + "\nRUN echo '$var'";
                        location = computeDefinition(document, Position.create(1, 12));
                        assert.strictEqual(location, null);
                    });

                    it("repeated declaration", function () {
                        let document = instruction + " var=value\n" + instruction + " var=value\nRUN echo $var\nRUN echo $var";
                        let location = computeDefinition(document, Position.create(0, 5));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(1, 5));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(2, 12));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(3, 12));
                        assertLocation(location, 0, 4, 0, 7);
                    });

                    it("repeated declaration no value", function () {
                        let document = instruction + " var\n" + instruction + " var\nRUN echo ${var}\nRUN echo${var}";
                        let location = computeDefinition(document, Position.create(0, 5));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(1, 5));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(2, 12));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(3, 12));
                        assertLocation(location, 0, 4, 0, 7);
                    });

                    it("redeclared variable after reference", function () {
                        let document = instruction + " var\nRUN echo $var\n" + instruction + " var";
                        let location = computeDefinition(document, Position.create(0, 5));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(1, 11));
                        assertLocation(location, 0, 4, 0, 7);
                        location = computeDefinition(document, Position.create(2, 5));
                        assertLocation(location, 0, 4, 0, 7);
                    });

                    it("label value with single quotes", function () {
                        let document = instruction + " var\nLABEL label='$var'";
                        let location = computeDefinition(document, Position.create(1, 15));
                        assert.strictEqual(location, null);
                    });

                    it("label value with double quotes", function () {
                        let document = instruction + " var\nLABEL label=\"$var\"";
                        let location = computeDefinition(document, Position.create(1, 15));
                        assertLocation(location, 0, 4, 0, 7);
                    });

                    it("multiline reference \\n", function () {
                        let document = instruction + " port=8080\nEXPOSE $po\\\nrt";
                        let location = computeDefinition(document, Position.create(2, 0));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 1));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 2));
                        assertLocation(location, 0, 4, 0, 8);

                        document = "#escape=`\n" + instruction + " port=8080\nEXPOSE $po`\nrt";
                        location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);

                        document = instruction + " port=8080\nLABEL key=\"$po\\\nrt\"";
                        location = computeDefinition(document, Position.create(2, 0));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 1));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 2));
                        assertLocation(location, 0, 4, 0, 8);
                    });

                    it("multiline reference \\r\\n", function () {
                        let document = instruction + " port=8080\nEXPOSE $po\\\r\nrt";
                        let location = computeDefinition(document, Position.create(2, 0));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 1));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 2));
                        assertLocation(location, 0, 4, 0, 8);

                        document = "#escape=`\n" + instruction + " port=8080\nEXPOSE $po`\r\nrt";
                        location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);

                        document = instruction + " port=8080\r\nLABEL key=\"$po\\\r\nrt\"";
                        location = computeDefinition(document, Position.create(2, 0));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 1));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 2));
                        assertLocation(location, 0, 4, 0, 8);
                    });

                    it("multiline reference \\n spaced", function () {
                        let document = instruction + " port=8080\nEXPOSE $po\\ \t\nrt";
                        let location = computeDefinition(document, Position.create(2, 0));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 1));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 2));
                        assertLocation(location, 0, 4, 0, 8);

                        document = "#escape=`\n" + instruction + " port=8080\nEXPOSE $po` \t\nrt";
                        location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);

                        document = instruction + " port=8080\nLABEL key=\"$po\\ \t\nrt\"";
                        location = computeDefinition(document, Position.create(2, 0));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 1));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 2));
                        assertLocation(location, 0, 4, 0, 8);
                    });

                    it("multiline reference \\r\\n spaced", function () {
                        let document = instruction + " port=8080\nEXPOSE $po\\ \t\r\nrt";
                        let location = computeDefinition(document, Position.create(2, 0));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 1));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 2));
                        assertLocation(location, 0, 4, 0, 8);

                        document = "#escape=`\n" + instruction + " port=8080\nEXPOSE $po` \t\r\nrt";
                        location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);

                        document = instruction + " port=8080\nLABEL key=\"$po\\ \t\r\nrt\"";
                        location = computeDefinition(document, Position.create(2, 0));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 1));
                        assertLocation(location, 0, 4, 0, 8);
                        location = computeDefinition(document, Position.create(2, 2));
                        assertLocation(location, 0, 4, 0, 8);
                    });

                    it("$var followed by space", function () {
                        let document = instruction + " var" + delimiter + "value\nLABEL key=\"$var \"";
                        let location = computeDefinition(document, Position.create(1, 14));
                        assertLocation(location, 0, 4, 0, 7);
                    });

                    it("$var followed by tab", function () {
                        let document = instruction + " var" + delimiter + "value\nLABEL key=\"$var\t\"";
                        let location = computeDefinition(document, Position.create(1, 14));
                        assertLocation(location, 0, 4, 0, 7);
                    });

                    it("$var is alphanumeric", function() {
                        let document = instruction + " var" + delimiter + "value\nRUN echo $var:test";
                        let location = computeDefinition(document, Position.create(1, 11));
                        assertLocation(location, 0, 4, 0, 7);
                    })

                    it("$var has underscore", function() {
                        let document = instruction + " var_" + delimiter + "value\nRUN echo $var_:test";
                        let location = computeDefinition(document, Position.create(1, 11));
                        assertLocation(location, 0, 4, 0, 8);
                    })
                });
            });

            describe("build stage", function () {
                describe("${var}", function () {
                    it("value", function () {
                        let document =
                            "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}\n" +
                            "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}"
                            ;
                        let location = computeDefinition(document, Position.create(2, 13));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(3, 7));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(4, 11));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(7, 13));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(8, 7));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(9, 11));
                        assertLocation(location, 6, 4, 6, 7);

                        document =
                            "FROM alpine\n" + instruction + " var_var" + delimiter + "value\nSTOPSIGNAL ${var_var}\nUSER ${var_var}\nWORKDIR ${var_var}\n" +
                            "FROM alpine\n" + instruction + " var_var" + delimiter + "value\nSTOPSIGNAL ${var_var}\nUSER ${var_var}\nWORKDIR ${var_var}"
                            ;
                        location = computeDefinition(document, Position.create(2, 13));
                        assertLocation(location, 1, 4, 1, 11);
                        location = computeDefinition(document, Position.create(3, 7));
                        assertLocation(location, 1, 4, 1, 11);
                        location = computeDefinition(document, Position.create(4, 11));
                        assertLocation(location, 1, 4, 1, 11);
                        location = computeDefinition(document, Position.create(7, 13));
                        assertLocation(location, 6, 4, 6, 11);
                        location = computeDefinition(document, Position.create(8, 7));
                        assertLocation(location, 6, 4, 6, 11);
                        location = computeDefinition(document, Position.create(9, 11));
                        assertLocation(location, 6, 4, 6, 11);
                    });

                    it("no value", function () {
                        let document =
                            "FROM alpine\n" + instruction + " var\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}\n" +
                            "FROM alpine\n" + instruction + " var\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}"
                            ;
                        let location = computeDefinition(document, Position.create(2, 13));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(3, 7));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(4, 11));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(7, 13));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(8, 7));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(9, 11));
                        assertLocation(location, 6, 4, 6, 7);
                    });

                    it("nested no value", function () {
                        let document =
                            "FROM alpine\n" + instruction + " var\nSTOPSIGNAL prefix${var}\nUSER prefix${var}\nWORKDIR prefix${var}\n" +
                            "FROM alpine\n" + instruction + " var\nSTOPSIGNAL prefix${var}\nUSER prefix${var}\nWORKDIR prefix${var}"
                            ;
                        let location = computeDefinition(document, Position.create(2, 19));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(3, 13));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(4, 17));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(7, 19));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(8, 13));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(9, 17));
                        assertLocation(location, 6, 4, 6, 7);
                    });

                    it("nested escaped", function () {
                        let document =
                            "FROM alpine\n" + instruction + " var\nSTOPSIGNAL prefix\\${var}\nUSER prefix\\${var}\nWORKDIR prefix\\${var}\n" +
                            "FROM alpine\n" + instruction + " var\nSTOPSIGNAL prefix\\${var}\nUSER prefix\\${var}\nWORKDIR prefix\\${var}"
                            ;
                        let location = computeDefinition(document, Position.create(2, 20));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(3, 14));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(4, 18));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(7, 20));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(8, 14));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(9, 18));
                        assert.strictEqual(location, null);
                    });

                    it("no definition", function () {
                        let document =
                            "FROM alpine\n" + instruction + "\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}\n" +
                            "FROM alpine\n" + instruction + "\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}"
                            ;
                        let location = computeDefinition(document, Position.create(2, 13));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(3, 7));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(4, 11));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(7, 13));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(8, 7));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(9, 11));
                        assert.strictEqual(location, null);
                    });

                    it("repeated declaration", function () {
                        let document =
                            "FROM alpine\n" + instruction + " var=value\n" + instruction + " var=value\nRUN echo ${var}\nRUN echo${var}\n" +
                            "FROM alpine\n" + instruction + " var=value\n" + instruction + " var=value\nRUN echo ${var}\nRUN echo${var}"
                            ;
                        let location = computeDefinition(document, Position.create(1, 5));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(2, 5));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(3, 12));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(4, 12));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(6, 5));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(7, 5));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(8, 12));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(9, 12));
                        assertLocation(location, 6, 4, 6, 7);
                    });

                    it("repeated declaration no value", function () {
                        let document =
                            "FROM alpine\n" + instruction + " var\n" + instruction + " var\nRUN echo ${var}\nRUN echo${var}\n" +
                            "FROM alpine\n" + instruction + " var\n" + instruction + " var\nRUN echo ${var}\nRUN echo${var}"
                            ;
                        let location = computeDefinition(document, Position.create(1, 5));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(2, 5));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(3, 12));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(4, 12));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(6, 5));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(7, 5));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(8, 12));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(9, 12));
                        assertLocation(location, 6, 4, 6, 7);
                    });

                    it("redeclared variable after reference", function () {
                        let document =
                            "FROM alpine\n" + instruction + " var\nRUN echo ${var}\n" + instruction + " var\n" +
                            "FROM alpine\n" + instruction + " var\nRUN echo ${var}\n" + instruction + " var"
                            ;
                        let location = computeDefinition(document, Position.create(1, 5));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(2, 12));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(3, 5));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(5, 5));
                        assertLocation(location, 5, 4, 5, 7);
                        location = computeDefinition(document, Position.create(6, 12));
                        assertLocation(location, 5, 4, 5, 7);
                        location = computeDefinition(document, Position.create(7, 5));
                        assertLocation(location, 5, 4, 5, 7);
                    });

                    it("label value with single quotes", function () {
                        let document = "FROM alpine\n" + instruction + " var\nLABEL label='$var'";
                        let location = computeDefinition(document, Position.create(2, 15));
                        assert.strictEqual(location, null);
                    });

                    it("label value with double quotes", function () {
                        let document = "FROM alpine\n" + instruction + " var\nLABEL label=\"$var\"";
                        let location = computeDefinition(document, Position.create(2, 15));
                        assertLocation(location, 1, 4, 1, 7);
                    });

                    it("multiline reference \\n", function () {
                        let document = "FROM alpine\n" + instruction + " port=8080\nEXPOSE ${po\\\nrt}";
                        let location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);

                        document = "#escape=`\nFROM alpine\n" + instruction + " port=8080\nEXPOSE ${po`\nrt}";
                        location = computeDefinition(document, Position.create(4, 0));
                        assertLocation(location, 2, 4, 2, 8);
                        location = computeDefinition(document, Position.create(4, 1));
                        assertLocation(location, 2, 4, 2, 8);
                        location = computeDefinition(document, Position.create(4, 2));
                        assertLocation(location, 2, 4, 2, 8);

                        document = "FROM alpine\n" + instruction + " port=8080\nLABEL key=\"${po\\\nrt}\"";
                        location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);
                    });

                    it("multiline reference \\r\\n", function () {
                        let document = "FROM alpine\n" + instruction + " port=8080\nEXPOSE ${po\\\r\nrt}";
                        let location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);

                        document = "#escape=`\nFROM alpine\n" + instruction + " port=8080\nEXPOSE ${po`\r\nrt}";
                        location = computeDefinition(document, Position.create(4, 0));
                        assertLocation(location, 2, 4, 2, 8);
                        location = computeDefinition(document, Position.create(4, 1));
                        assertLocation(location, 2, 4, 2, 8);
                        location = computeDefinition(document, Position.create(4, 2));
                        assertLocation(location, 2, 4, 2, 8);

                        document = "FROM alpine\n" + instruction + " port=8080\r\nLABEL key=\"${po\\\r\nrt}\"";
                        location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);
                    });

                    it("multiline reference \\n spaced", function () {
                        let document = "FROM alpine\n" + instruction + " port=8080\nEXPOSE ${po\\ \t\nrt}";
                        let location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);

                        document = "#escape=`\nFROM alpine\n" + instruction + " port=8080\nEXPOSE ${po` \t\nrt}";
                        location = computeDefinition(document, Position.create(4, 0));
                        assertLocation(location, 2, 4, 2, 8);
                        location = computeDefinition(document, Position.create(4, 1));
                        assertLocation(location, 2, 4, 2, 8);
                        location = computeDefinition(document, Position.create(4, 2));
                        assertLocation(location, 2, 4, 2, 8);

                        document = "FROM alpine\n" + instruction + " port=8080\r\nLABEL key=\"${po\\ \t\nrt}\"";
                        location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);
                    });

                    it("multiline reference \\r\\n spaced", function () {
                        let document = "FROM alpine\n" + instruction + " port=8080\nEXPOSE ${po\\ \t\r\nrt}";
                        let location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);

                        document = "#escape=`\nFROM alpine\n" + instruction + " port=8080\nEXPOSE ${po` \t\r\nrt}";
                        location = computeDefinition(document, Position.create(4, 0));
                        assertLocation(location, 2, 4, 2, 8);
                        location = computeDefinition(document, Position.create(4, 1));
                        assertLocation(location, 2, 4, 2, 8);
                        location = computeDefinition(document, Position.create(4, 2));
                        assertLocation(location, 2, 4, 2, 8);

                        document = "FROM alpine\n" + instruction + " port=8080\r\nLABEL key=\"${po\\ \t\r\nrt}\"";
                        location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);
                    });
                });

                describe("$var", function () {
                    it("value", function () {
                        let document =
                            "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var\n" +
                            "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var"
                            ;
                        let location = computeDefinition(document, Position.create(2, 13));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(3, 7));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(4, 11));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(7, 13));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(8, 7));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(9, 11));
                        assertLocation(location, 6, 4, 6, 7);

                        document =
                            "FROM alpine\n" + instruction + " var" + delimiter + "value\nRUN echo \"$var\"\n" +
                            "FROM alpine\n" + instruction + " var" + delimiter + "value\nRUN echo \"$var\""
                            ;
                        location = computeDefinition(document, Position.create(2, 12));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(5, 12));
                        assertLocation(location, 4, 4, 4, 7);

                        document =
                            "FROM alpine\n" + instruction + " var_var" + delimiter + "value\nSTOPSIGNAL $var_var\nUSER $var_var\nWORKDIR $var_var\n" +
                            "FROM alpine\n" + instruction + " var_var" + delimiter + "value\nSTOPSIGNAL $var_var\nUSER $var_var\nWORKDIR $var_var"
                            ;
                        location = computeDefinition(document, Position.create(2, 13));
                        assertLocation(location, 1, 4, 1, 11);
                        location = computeDefinition(document, Position.create(3, 7));
                        assertLocation(location, 1, 4, 1, 11);
                        location = computeDefinition(document, Position.create(4, 11));
                        assertLocation(location, 1, 4, 1, 11);
                        location = computeDefinition(document, Position.create(7, 13));
                        assertLocation(location, 6, 4, 6, 11);
                        location = computeDefinition(document, Position.create(8, 7));
                        assertLocation(location, 6, 4, 6, 11);
                        location = computeDefinition(document, Position.create(9, 11));
                        assertLocation(location, 6, 4, 6, 11);

                        document =
                            "FROM alpine\n" + instruction + " var" + delimiter + "value\nRUN echo '$var'\n" +
                            "FROM alpine\n" + instruction + " var" + delimiter + "value\nRUN echo '$var'"
                            ;
                        location = computeDefinition(document, Position.create(2, 12));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(5, 12));
                        assertLocation(location, 4, 4, 4, 7);
                    });

                    it("no value", function () {
                        let document =
                            "FROM alpine\n" + instruction + " var\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var\n" +
                            "FROM alpine\n" + instruction + " var\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var"
                            ;
                        let location = computeDefinition(document, Position.create(2, 13));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(3, 7));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(4, 11));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(7, 13));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(8, 7));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(9, 11));
                        assertLocation(location, 6, 4, 6, 7);

                        document =
                            "FROM alpine\n" + instruction + " var\nRUN echo \"$var\"\n" +
                            "FROM alpine\n" + instruction + " var\nRUN echo \"$var\""
                            ;
                        location = computeDefinition(document, Position.create(2, 12));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(5, 12));
                        assertLocation(location, 4, 4, 4, 7);

                        document =
                            "FROM alpine\n" + instruction + " var\nRUN echo '$var'\n" +
                            "FROM alpine\n" + instruction + " var\nRUN echo '$var'"
                            ;
                        location = computeDefinition(document, Position.create(2, 12));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(5, 12));
                        assertLocation(location, 4, 4, 4, 7);
                    });

                    it("nested no value", function () {
                        let document =
                            "FROM alpine\n" + instruction + " var\nSTOPSIGNAL prefix$var\nUSER prefix$var\nWORKDIR prefix$var\n" +
                            "FROM alpine\n" + instruction + " var\nSTOPSIGNAL prefix$var\nUSER prefix$var\nWORKDIR prefix$var"
                            ;
                        let location = computeDefinition(document, Position.create(2, 19));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(3, 13));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(4, 17));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(7, 19));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(8, 13));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(9, 17));
                        assertLocation(location, 6, 4, 6, 7);
                    });

                    it("nested escaped", function () {
                        let document =
                            "FROM alpine\n" + instruction + " var\nSTOPSIGNAL prefix\\$var\nUSER prefix\\$var\nWORKDIR prefix\\$var\n" +
                            "FROM alpine\n" + instruction + " var\nSTOPSIGNAL prefix\\$var\nUSER prefix\\$var\nWORKDIR prefix\\$var"
                            ;
                        let location = computeDefinition(document, Position.create(2, 20));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(3, 14));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(4, 18));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(7, 20));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(8, 14));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(9, 18));
                        assert.strictEqual(location, null);
                    });

                    it("no definition", function () {
                        let document =
                            "FROM alpine\n" + instruction + "\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var\n" +
                            "FROM alpine\n" + instruction + "\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var"
                            ;
                        let location = computeDefinition(document, Position.create(2, 13));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(3, 7));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(4, 11));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(7, 13));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(8, 7));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(9, 11));
                        assert.strictEqual(location, null);

                        document =
                            "FROM alpine\n" + instruction + "\nRUN echo \"$var\"\n" +
                            "FROM alpine\n" + instruction + "\nRUN echo \"$var\""
                            ;
                        location = computeDefinition(document, Position.create(2, 12));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(5, 12));
                        assert.strictEqual(location, null);

                        document =
                            "FROM alpine\n" + instruction + "\nRUN echo '$var'\n" +
                            "FROM alpine\n" + instruction + "\nRUN echo '$var'"
                            ;
                        location = computeDefinition(document, Position.create(2, 12));
                        assert.strictEqual(location, null);
                        location = computeDefinition(document, Position.create(5, 12));
                        assert.strictEqual(location, null);
                    });

                    it("repeated declaration", function () {
                        let document =
                            "FROM alpine\n" + instruction + " var=value\n" + instruction + " var=value\nRUN echo $var\nRUN echo $var\n" +
                            "FROM alpine\n" + instruction + " var=value\n" + instruction + " var=value\nRUN echo $var\nRUN echo $var"
                            ;
                        let location = computeDefinition(document, Position.create(1, 5));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(2, 5));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(3, 12));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(4, 12));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(6, 5));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(7, 5));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(8, 12));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(9, 12));
                        assertLocation(location, 6, 4, 6, 7);
                    });

                    it("repeated declaration no value", function () {
                        let document =
                            "FROM alpine\n" + instruction + " var\n" + instruction + " var\nRUN echo ${var}\nRUN echo${var}\n" +
                            "FROM alpine\n" + instruction + " var\n" + instruction + " var\nRUN echo ${var}\nRUN echo${var}"
                            ;
                        let location = computeDefinition(document, Position.create(1, 5));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(2, 5));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(3, 12));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(4, 12));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(6, 5));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(7, 5));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(8, 12));
                        assertLocation(location, 6, 4, 6, 7);
                        location = computeDefinition(document, Position.create(9, 12));
                        assertLocation(location, 6, 4, 6, 7);
                    });

                    it("redeclared variable after reference", function () {
                        let document =
                            "FROM alpine\n" + instruction + " var\nRUN echo $var\n" + instruction + " var\n" +
                            "FROM alpine\n" + instruction + " var\nRUN echo $var\n" + instruction + " var"
                            ;
                        let location = computeDefinition(document, Position.create(1, 5));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(2, 11));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(3, 5));
                        assertLocation(location, 1, 4, 1, 7);
                        location = computeDefinition(document, Position.create(5, 5));
                        assertLocation(location, 5, 4, 5, 7);
                        location = computeDefinition(document, Position.create(6, 11));
                        assertLocation(location, 5, 4, 5, 7);
                        location = computeDefinition(document, Position.create(7, 5));
                        assertLocation(location, 5, 4, 5, 7);
                    });

                    it("label value with single quotes", function () {
                        let document = "FROM alpine\n" + instruction + " var\nLABEL label='${var}'";
                        let location = computeDefinition(document, Position.create(2, 17));
                        assert.strictEqual(location, null);
                    });

                    it("label value with double quotes", function () {
                        let document = "FROM alpine\n" + instruction + " var\nLABEL label=\"${var}\"";
                        let location = computeDefinition(document, Position.create(2, 17));
                        assertLocation(location, 1, 4, 1, 7);
                    });

                    it("multiline reference \\n", function () {
                        let document = "FROM alpine\n" + instruction + " port=8080\nEXPOSE $po\\\nrt";
                        let location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);

                        document = "#escape=`\nFROM alpine\n" + instruction + " port=8080\nEXPOSE $po`\nrt";
                        location = computeDefinition(document, Position.create(4, 0));
                        assertLocation(location, 2, 4, 2, 8);
                        location = computeDefinition(document, Position.create(4, 1));
                        assertLocation(location, 2, 4, 2, 8);
                        location = computeDefinition(document, Position.create(4, 2));
                        assertLocation(location, 2, 4, 2, 8);

                        document = "FROM alpine\n" + instruction + " port=8080\nLABEL key=\"$po\\\nrt\"";
                        location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);
                    });

                    it("multiline reference \\r\\n", function () {
                        let document = "FROM alpine\n" + instruction + " port=8080\nEXPOSE $po\\\r\nrt";
                        let location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);

                        document = "#escape=`\nFROM alpine\n" + instruction + " port=8080\nEXPOSE $po`\r\nrt";
                        location = computeDefinition(document, Position.create(4, 0));
                        assertLocation(location, 2, 4, 2, 8);
                        location = computeDefinition(document, Position.create(4, 1));
                        assertLocation(location, 2, 4, 2, 8);
                        location = computeDefinition(document, Position.create(4, 2));
                        assertLocation(location, 2, 4, 2, 8);

                        document = "FROM alpine\r\n" + instruction + " port=8080\r\nLABEL key=\"$po\\\r\nrt\"";
                        location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);
                    });

                    it("multiline reference \\n spaced", function () {
                        let document = "FROM alpine\n" + instruction + " port=8080\nEXPOSE $po\\ \t\nrt";
                        let location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);

                        document = "#escape=`\nFROM alpine\n" + instruction + " port=8080\nEXPOSE $po` \t\nrt";
                        location = computeDefinition(document, Position.create(4, 0));
                        assertLocation(location, 2, 4, 2, 8);
                        location = computeDefinition(document, Position.create(4, 1));
                        assertLocation(location, 2, 4, 2, 8);
                        location = computeDefinition(document, Position.create(4, 2));
                        assertLocation(location, 2, 4, 2, 8);

                        document = "FROM alpine\n" + instruction + " port=8080\nLABEL key=\"$po\\ \t\nrt\"";
                        location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);
                    });

                    it("multiline reference \\r\\n spaced", function () {
                        let document = "FROM alpine\n" + instruction + " port=8080\nEXPOSE $po\\ \t\r\nrt";
                        let location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);

                        document = "#escape=`\nFROM alpine\n" + instruction + " port=8080\nEXPOSE $po` \t\r\nrt";
                        location = computeDefinition(document, Position.create(4, 0));
                        assertLocation(location, 2, 4, 2, 8);
                        location = computeDefinition(document, Position.create(4, 1));
                        assertLocation(location, 2, 4, 2, 8);
                        location = computeDefinition(document, Position.create(4, 2));
                        assertLocation(location, 2, 4, 2, 8);

                        document = "FROM alpine\r\n" + instruction + " port=8080\r\nLABEL key=\"$po\\ \t\r\nrt\"";
                        location = computeDefinition(document, Position.create(3, 0));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 1));
                        assertLocation(location, 1, 4, 1, 8);
                        location = computeDefinition(document, Position.create(3, 2));
                        assertLocation(location, 1, 4, 1, 8);
                    });

                    it("$var followed by space", function () {
                        let document = "FROM alpine\n" + instruction + " var" + delimiter + "value\nLABEL key=\"$var \"";
                        let location = computeDefinition(document, Position.create(2, 14));
                        assertLocation(location, 1, 4, 1, 7);
                    });

                    it("$var followed by tab", function () {
                        let document = "FROM alpine\n" + instruction + " var" + delimiter + "value\nLABEL key=\"$var\t\"";
                        let location = computeDefinition(document, Position.create(2, 14));
                        assertLocation(location, 1, 4, 1, 7);
                    });

                    it("$var is alphanumeric/underscore", function() {
                        let document = "FROM alpine\n" + instruction + " var" + delimiter + "value\nRUN echo $var:test";
                        let location = computeDefinition(document, Position.create(2, 11));
                        assertLocation(location, 1, 4, 1, 7);
                    })

                    it("$var has underscore", function() {
                        let document = "FROM alpine\n" + instruction + " var_" + delimiter + "value\nRUN echo $var_:test";
                        let location = computeDefinition(document, Position.create(2, 11));
                        assertLocation(location, 1, 4, 1, 8);
                    })
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
                    let document = "ENV aa bb cc dd\nRUN echo ${aa} ${cc}";
                    let location = computeDefinition(document, Position.create(0, 5));
                    assertLocation(location, 0, 4, 0, 6);
                    location = computeDefinition(document, Position.create(1, 12));
                    assertLocation(location, 0, 4, 0, 6);
                    location = computeDefinition(document, Position.create(0, 11));
                    assert.strictEqual(location, null);
                    location = computeDefinition(document, Position.create(1, 18));
                    assert.strictEqual(location, null);
                });

                it("$var", function () {
                    let document = "ENV aa bb cc dd\nRUN echo $aa $cc";
                    let location = computeDefinition(document, Position.create(0, 5));
                    assertLocation(location, 0, 4, 0, 6);
                    location = computeDefinition(document, Position.create(1, 11));
                    assertLocation(location, 0, 4, 0, 6);
                    location = computeDefinition(document, Position.create(0, 11));
                    assert.strictEqual(location, null);
                    location = computeDefinition(document, Position.create(1, 15));
                    assert.strictEqual(location, null);
                });
            });

            describe("multiple variables", function () {
                it("${var}", function () {
                    let document = "ENV var=value var2=value2\nRUN echo ${var} ${var2}";
                    let location = computeDefinition(document, Position.create(0, 6));
                    assertLocation(location, 0, 4, 0, 7);
                    location = computeDefinition(document, Position.create(1, 12));
                    assertLocation(location, 0, 4, 0, 7);
                    location = computeDefinition(document, Position.create(0, 16));
                    assertLocation(location, 0, 14, 0, 18);
                    location = computeDefinition(document, Position.create(1, 20));
                    assertLocation(location, 0, 14, 0, 18);

                    document = "ENV var=value \\\nvar2=value2 \\\nvar3=value3\nRUN echo ${var} ${var2} ${var3}";
                    location = computeDefinition(document, Position.create(0, 6));
                    assertLocation(location, 0, 4, 0, 7);
                    location = computeDefinition(document, Position.create(3, 12));
                    assertLocation(location, 0, 4, 0, 7);
                    location = computeDefinition(document, Position.create(1, 2));
                    assertLocation(location, 1, 0, 1, 4);
                    location = computeDefinition(document, Position.create(3, 20));
                    assertLocation(location, 1, 0, 1, 4);
                    location = computeDefinition(document, Position.create(2, 2));
                    assertLocation(location, 2, 0, 2, 4);
                    location = computeDefinition(document, Position.create(3, 28));
                    assertLocation(location, 2, 0, 2, 4, );
                });

                it("$var", function () {
                    let document = "ENV var=value var2=value2\nRUN echo $var $var2";
                    let location = computeDefinition(document, Position.create(0, 6));
                    assertLocation(location, 0, 4, 0, 7);
                    location = computeDefinition(document, Position.create(1, 11));
                    assertLocation(location, 0, 4, 0, 7);
                    location = computeDefinition(document, Position.create(0, 16));
                    assertLocation(location, 0, 14, 0, 18);
                    location = computeDefinition(document, Position.create(1, 17));
                    assertLocation(location, 0, 14, 0, 18);

                    document = "ENV var=value \\\nvar2=value2 \\\nvar3=value3\nRUN echo $var $var2 $var3";
                    location = computeDefinition(document, Position.create(0, 6));
                    assertLocation(location, 0, 4, 0, 7);
                    location = computeDefinition(document, Position.create(3, 11));
                    assertLocation(location, 0, 4, 0, 7);
                    location = computeDefinition(document, Position.create(1, 2));
                    assertLocation(location, 1, 0, 1, 4);
                    location = computeDefinition(document, Position.create(3, 16));
                    assertLocation(location, 1, 0, 1, 4);
                    location = computeDefinition(document, Position.create(2, 2));
                    assertLocation(location, 2, 0, 2, 4);
                    location = computeDefinition(document, Position.create(3, 22));
                    assertLocation(location, 2, 0, 2, 4);
                });
            });

            describe("reuse variable name", function () {

				/**
				 * ENV aa=x
				 * ENV aa=y bb=${aa}
				 * ENV cc=${aa}
				 */
                it("${var}", function () {
                    let document = "ENV aa=x\nENV aa=y bb=${aa}\nENV cc=${aa}";
                    let location = computeDefinition(document, Position.create(0, 5));
                    assertLocation(location, 0, 4, 0, 6);
                    location = computeDefinition(document, Position.create(1, 5));
                    assertLocation(location, 0, 4, 0, 6);
                    location = computeDefinition(document, Position.create(1, 15));
                    assertLocation(location, 0, 4, 0, 6);
                    location = computeDefinition(document, Position.create(2, 10));
                    assertLocation(location, 0, 4, 0, 6);
                });

				/**
				 * ENV aa=x
				 * ENV aa=y bb=$aa
				 * ENV cc=$aa
				 */
                it("$var", function () {
                    let document = "ENV aa=x\nENV aa=y bb=$aa\nENV cc=$aa";
                    let location = computeDefinition(document, Position.create(0, 5));
                    assertLocation(location, 0, 4, 0, 6);
                    location = computeDefinition(document, Position.create(1, 5));
                    assertLocation(location, 0, 4, 0, 6);
                    location = computeDefinition(document, Position.create(1, 14));
                    assertLocation(location, 0, 4, 0, 6);
                    location = computeDefinition(document, Position.create(2, 9));
                    assertLocation(location, 0, 4, 0, 6);
                });
            });
        });

        describe("build stage", function () {
            describe("single variable delimited by space", function () {
                it("${var}", function () {
                    let document =
                        "FROM alpine\nENV aa bb cc dd\nRUN echo ${aa} ${cc}\n" +
                        "FROM alpine\nENV aa bb cc dd\nRUN echo ${aa} ${cc}"
                        ;
                    let location = computeDefinition(document, Position.create(1, 5));
                    assertLocation(location, 1, 4, 1, 6);
                    location = computeDefinition(document, Position.create(2, 12));
                    assertLocation(location, 1, 4, 1, 6);
                    location = computeDefinition(document, Position.create(1, 11));
                    assert.strictEqual(location, null);
                    location = computeDefinition(document, Position.create(2, 18));
                    assert.strictEqual(location, null);
                    location = computeDefinition(document, Position.create(4, 5));
                    assertLocation(location, 4, 4, 4, 6);
                    location = computeDefinition(document, Position.create(5, 12));
                    assertLocation(location, 4, 4, 4, 6);
                    location = computeDefinition(document, Position.create(4, 11));
                    assert.strictEqual(location, null);
                    location = computeDefinition(document, Position.create(5, 18));
                    assert.strictEqual(location, null);
                });

                it("$var", function () {
                    let document =
                        "FROM alpine\nENV aa bb cc dd\nRUN echo $aa $cc\n" +
                        "FROM alpine\nENV aa bb cc dd\nRUN echo $aa $cc"
                        ;
                    let location = computeDefinition(document, Position.create(1, 5));
                    assertLocation(location, 1, 4, 1, 6);
                    location = computeDefinition(document, Position.create(2, 11));
                    assertLocation(location, 1, 4, 1, 6);
                    location = computeDefinition(document, Position.create(1, 11));
                    assert.strictEqual(location, null);
                    location = computeDefinition(document, Position.create(2, 15));
                    assert.strictEqual(location, null);
                    location = computeDefinition(document, Position.create(4, 5));
                    assertLocation(location, 4, 4, 4, 6);
                    location = computeDefinition(document, Position.create(5, 11));
                    assertLocation(location, 4, 4, 4, 6);
                    location = computeDefinition(document, Position.create(4, 11));
                    assert.strictEqual(location, null);
                    location = computeDefinition(document, Position.create(5, 15));
                    assert.strictEqual(location, null);
                });
            });

            describe("multiple variables", function () {
                it("${var}", function () {
                    let document =
                        "FROM alpine\nENV var=value var2=value2\nRUN echo ${var} ${var2}\n" +
                        "FROM alpine\nENV var=value var2=value2\nRUN echo ${var} ${var2}"
                        ;
                    let location = computeDefinition(document, Position.create(1, 6));
                    assertLocation(location, 1, 4, 1, 7);
                    location = computeDefinition(document, Position.create(2, 12));
                    assertLocation(location, 1, 4, 1, 7);
                    location = computeDefinition(document, Position.create(1, 16));
                    assertLocation(location, 1, 14, 1, 18);
                    location = computeDefinition(document, Position.create(2, 20));
                    assertLocation(location, 1, 14, 1, 18);
                    location = computeDefinition(document, Position.create(4, 6));
                    assertLocation(location, 4, 4, 4, 7);
                    location = computeDefinition(document, Position.create(5, 12));
                    assertLocation(location, 4, 4, 4, 7);
                    location = computeDefinition(document, Position.create(4, 16));
                    assertLocation(location, 4, 14, 4, 18);
                    location = computeDefinition(document, Position.create(5, 20));
                    assertLocation(location, 4, 14, 4, 18);

                    document =
                        "FROM alpine\nENV var=value \\\nvar2=value2 \\\nvar3=value3\nRUN echo ${var} ${var2} ${var3}\n" +
                        "FROM alpine\nENV var=value \\\nvar2=value2 \\\nvar3=value3\nRUN echo ${var} ${var2} ${var3}"
                        ;
                    location = computeDefinition(document, Position.create(1, 6));
                    assertLocation(location, 1, 4, 1, 7);
                    location = computeDefinition(document, Position.create(4, 12));
                    assertLocation(location, 1, 4, 1, 7);
                    location = computeDefinition(document, Position.create(2, 2));
                    assertLocation(location, 2, 0, 2, 4);
                    location = computeDefinition(document, Position.create(4, 20));
                    assertLocation(location, 2, 0, 2, 4);
                    location = computeDefinition(document, Position.create(3, 2));
                    assertLocation(location, 3, 0, 3, 4);
                    location = computeDefinition(document, Position.create(4, 28));
                    assertLocation(location, 3, 0, 3, 4, );
                    location = computeDefinition(document, Position.create(6, 6));
                    assertLocation(location, 6, 4, 6, 7);
                    location = computeDefinition(document, Position.create(9, 12));
                    assertLocation(location, 6, 4, 6, 7);
                    location = computeDefinition(document, Position.create(7, 2));
                    assertLocation(location, 7, 0, 7, 4);
                    location = computeDefinition(document, Position.create(9, 20));
                    assertLocation(location, 7, 0, 7, 4);
                    location = computeDefinition(document, Position.create(8, 2));
                    assertLocation(location, 8, 0, 8, 4);
                    location = computeDefinition(document, Position.create(9, 28));
                    assertLocation(location, 8, 0, 8, 4, );
                });

                it("$var", function () {
                    let document =
                        "FROM alpine\nENV var=value var2=value2\nRUN echo $var $var2\n" +
                        "FROM alpine\nENV var=value var2=value2\nRUN echo $var $var2"
                        ;
                    let location = computeDefinition(document, Position.create(1, 6));
                    assertLocation(location, 1, 4, 1, 7);
                    location = computeDefinition(document, Position.create(2, 11));
                    assertLocation(location, 1, 4, 1, 7);
                    location = computeDefinition(document, Position.create(1, 16));
                    assertLocation(location, 1, 14, 1, 18);
                    location = computeDefinition(document, Position.create(2, 17));
                    assertLocation(location, 1, 14, 1, 18);
                    location = computeDefinition(document, Position.create(4, 6));
                    assertLocation(location, 4, 4, 4, 7);
                    location = computeDefinition(document, Position.create(5, 11));
                    assertLocation(location, 4, 4, 4, 7);
                    location = computeDefinition(document, Position.create(4, 16));
                    assertLocation(location, 4, 14, 4, 18);
                    location = computeDefinition(document, Position.create(5, 17));
                    assertLocation(location, 4, 14, 4, 18);

                    document =
                        "FROM alpine\nENV var=value \\\nvar2=value2 \\\nvar3=value3\nRUN echo $var $var2 $var3\n" +
                        "FROM alpine\nENV var=value \\\nvar2=value2 \\\nvar3=value3\nRUN echo $var $var2 $var3"
                        ;
                    location = computeDefinition(document, Position.create(1, 6));
                    assertLocation(location, 1, 4, 1, 7);
                    location = computeDefinition(document, Position.create(4, 11));
                    assertLocation(location, 1, 4, 1, 7);
                    location = computeDefinition(document, Position.create(2, 2));
                    assertLocation(location, 2, 0, 2, 4);
                    location = computeDefinition(document, Position.create(4, 16));
                    assertLocation(location, 2, 0, 2, 4);
                    location = computeDefinition(document, Position.create(3, 2));
                    assertLocation(location, 3, 0, 3, 4);
                    location = computeDefinition(document, Position.create(4, 22));
                    assertLocation(location, 3, 0, 3, 4);
                    location = computeDefinition(document, Position.create(6, 6));
                    assertLocation(location, 6, 4, 6, 7);
                    location = computeDefinition(document, Position.create(9, 11));
                    assertLocation(location, 6, 4, 6, 7);
                    location = computeDefinition(document, Position.create(7, 2));
                    assertLocation(location, 7, 0, 7, 4);
                    location = computeDefinition(document, Position.create(9, 16));
                    assertLocation(location, 7, 0, 7, 4);
                    location = computeDefinition(document, Position.create(8, 2));
                    assertLocation(location, 8, 0, 8, 4);
                    location = computeDefinition(document, Position.create(9, 22));
                    assertLocation(location, 8, 0, 8, 4);
                });
            });

            describe("reuse variable name", function () {

				/**
				 * ENV aa=x
				 * ENV aa=y bb=${aa}
				 * ENV cc=${aa}
				 */
                it("${var}", function () {
                    let document =
                        "FROM alpine\nENV aa=x\nENV aa=y bb=${aa}\nENV cc=${aa}\n" +
                        "FROM alpine\nENV aa=x\nENV aa=y bb=${aa}\nENV cc=${aa}"
                        ;
                    let location = computeDefinition(document, Position.create(1, 5));
                    assertLocation(location, 1, 4, 1, 6);
                    location = computeDefinition(document, Position.create(2, 5));
                    assertLocation(location, 1, 4, 1, 6);
                    location = computeDefinition(document, Position.create(2, 15));
                    assertLocation(location, 1, 4, 1, 6);
                    location = computeDefinition(document, Position.create(3, 10));
                    assertLocation(location, 1, 4, 1, 6);
                    location = computeDefinition(document, Position.create(5, 5));
                    assertLocation(location, 5, 4, 5, 6);
                    location = computeDefinition(document, Position.create(6, 5));
                    assertLocation(location, 5, 4, 5, 6);
                    location = computeDefinition(document, Position.create(6, 15));
                    assertLocation(location, 5, 4, 5, 6);
                    location = computeDefinition(document, Position.create(7, 10));
                    assertLocation(location, 5, 4, 5, 6);
                });

				/**
				 * ENV aa=x
				 * ENV aa=y bb=$aa
				 * ENV cc=$aa
				 */
                it("$var", function () {
                    let document =
                        "FROM alpine\nENV aa=x\nENV aa=y bb=$aa\nENV cc=$aa\n" +
                        "FROM alpine\nENV aa=x\nENV aa=y bb=$aa\nENV cc=$aa"
                        ;
                    let location = computeDefinition(document, Position.create(1, 5));
                    assertLocation(location, 1, 4, 1, 6);
                    location = computeDefinition(document, Position.create(2, 5));
                    assertLocation(location, 1, 4, 1, 6);
                    location = computeDefinition(document, Position.create(2, 14));
                    assertLocation(location, 1, 4, 1, 6);
                    location = computeDefinition(document, Position.create(3, 9));
                    assertLocation(location, 1, 4, 1, 6);
                    location = computeDefinition(document, Position.create(5, 5));
                    assertLocation(location, 5, 4, 5, 6);
                    location = computeDefinition(document, Position.create(6, 5));
                    assertLocation(location, 5, 4, 5, 6);
                    location = computeDefinition(document, Position.create(6, 14));
                    assertLocation(location, 5, 4, 5, 6);
                    location = computeDefinition(document, Position.create(7, 9));
                    assertLocation(location, 5, 4, 5, 6);
                });
            });
        });
    });

    describe("ARG and ENV", function () {
        describe("no FROM", function () {
            it("repeated declaration ARG first", function () {
                let document = "ARG var\nENV var\nRUN echo $var";
                let location = computeDefinition(document, Position.create(0, 5));
                assertLocation(location, 0, 4, 0, 7);
                location = computeDefinition(document, Position.create(1, 5));
                assertLocation(location, 0, 4, 0, 7);
                location = computeDefinition(document, Position.create(2, 11));
                assertLocation(location, 0, 4, 0, 7);
            });

            it("repeated declaration ENV first", function () {
                let document = "ENV var\nARG var\nRUN echo $var";
                let location = computeDefinition(document, Position.create(0, 5));
                assertLocation(location, 0, 4, 0, 7);
                location = computeDefinition(document, Position.create(1, 5));
                assertLocation(location, 0, 4, 0, 7);
                location = computeDefinition(document, Position.create(2, 11));
                assertLocation(location, 0, 4, 0, 7);
            });
        });

        describe("build stage", function () {
            it("repeated declaration ARG first", function () {
                let document =
                    "FROM alpine\nARG var\nENV var\nRUN echo $var\n" +
                    "FROM alpine\nARG var\nENV var\nRUN echo $var"
                    ;
                let location = computeDefinition(document, Position.create(1, 5));
                assertLocation(location, 1, 4, 1, 7);
                location = computeDefinition(document, Position.create(2, 5));
                assertLocation(location, 1, 4, 1, 7);
                location = computeDefinition(document, Position.create(3, 11));
                assertLocation(location, 1, 4, 1, 7);
                location = computeDefinition(document, Position.create(5, 5));
                assertLocation(location, 5, 4, 5, 7);
                location = computeDefinition(document, Position.create(6, 5));
                assertLocation(location, 5, 4, 5, 7);
                location = computeDefinition(document, Position.create(7, 11));
                assertLocation(location, 5, 4, 5, 7);
            });

            it("repeated declaration ENV first", function () {
                let document =
                    "FROM alpine\nENV var\nARG var\nRUN echo $var\n" +
                    "FROM alpine\nENV var\nARG var\nRUN echo $var"
                    ;
                let location = computeDefinition(document, Position.create(1, 5));
                assertLocation(location, 1, 4, 1, 7);
                location = computeDefinition(document, Position.create(2, 5));
                assertLocation(location, 1, 4, 1, 7);
                location = computeDefinition(document, Position.create(3, 11));
                assertLocation(location, 1, 4, 1, 7);
                location = computeDefinition(document, Position.create(5, 5));
                assertLocation(location, 5, 4, 5, 7);
                location = computeDefinition(document, Position.create(6, 5));
                assertLocation(location, 5, 4, 5, 7);
                location = computeDefinition(document, Position.create(7, 11));
                assertLocation(location, 5, 4, 5, 7);
            });
        });
    });

    describe("before FROM", function () {
        describe("ARG", function () {
            it("FROM lookup", function () {
                let document = "ARG image=alpine\nFROM $image";
                let location = findDefinition(document, 0, 6);
                assertLocation(location, 0, 4, 0, 9);
                location = findDefinition(document, 1, 8);
                assertLocation(location, 0, 4, 0, 9);

                document = "ARG image=alpine\nFROM $image\nFROM $image";
                location = findDefinition(document, 0, 6);
                assertLocation(location, 0, 4, 0, 9);
                location = findDefinition(document, 1, 8);
                assertLocation(location, 0, 4, 0, 9);
                location = findDefinition(document, 2, 8);
                assertLocation(location, 0, 4, 0, 9);
            });

            it("reused variable name", function () {
                let document = "ARG image=alpine\nFROM $image\nARG image=alpine2";
                let location = findDefinition(document, 0, 6);
                assertLocation(location, 0, 4, 0, 9);
                location = findDefinition(document, 1, 8);
                assertLocation(location, 0, 4, 0, 9);
                location = findDefinition(document, 2, 6);
                assertLocation(location, 2, 4, 2, 9);

                document = "ARG image=alpine\nFROM $image\nARG image=alpine2\nFROM $image";
                location = findDefinition(document, 0, 6);
                assertLocation(location, 0, 4, 0, 9);
                location = findDefinition(document, 1, 8);
                assertLocation(location, 0, 4, 0, 9);
                location = findDefinition(document, 2, 6);
                assertLocation(location, 2, 4, 2, 9);
                location = findDefinition(document, 3, 8);
                assertLocation(location, 0, 4, 0, 9);

                document = "ARG image=alpine\nFROM $image\nFROM $image\nARG image=alpine2";
                location = findDefinition(document, 0, 6);
                assertLocation(location, 0, 4, 0, 9);
                location = findDefinition(document, 1, 8);
                assertLocation(location, 0, 4, 0, 9);
                location = findDefinition(document, 2, 8);
                assertLocation(location, 0, 4, 0, 9);
                location = findDefinition(document, 3, 6);
                assertLocation(location, 3, 4, 3, 9);
            });

            it("scoped", function () {
                let document = "ARG image=alpine\nFROM alpine\nRUN echo $image";
                let location = findDefinition(document, 2, 12);
                assert.strictEqual(location, null);
            });

            it("non-existent variable", function () {
                let document = "FROM $image\nARG image";
                let location = findDefinition(document, 0, 8);
                assert.strictEqual(location, null);

                document = "ARG\nFROM $image";
                location = findDefinition(document, 1, 8);
                assert.strictEqual(location, null);

                document = "ARG image=alpine\nFROM $image2\nARG image2=alpine2";
                location = findDefinition(document, 0, 6);
                assertLocation(location, 0, 4, 0, 9);
                location = findDefinition(document, 1, 8);
                assert.strictEqual(location, null);
                location = findDefinition(document, 2, 6);
                assertLocation(location, 2, 4, 2, 10);
            });
        });

        describe("ENV", function () {
            it("FROM lookup", function () {
                let document = "ENV image=alpine\nFROM $image";
                let location = findDefinition(document, 0, 6);
                assertLocation(location, 0, 4, 0, 9);
                location = findDefinition(document, 1, 8);
                assert.strictEqual(location, null);

                document = "ENV image=alpine\nFROM $image\nFROM $image";
                location = findDefinition(document, 0, 6);
                assertLocation(location, 0, 4, 0, 9);
                location = findDefinition(document, 1, 8);
                assert.strictEqual(location, null);
                location = findDefinition(document, 2, 8);
                assert.strictEqual(location, null);
            });

            it("reused variable name", function () {
                let document = "ENV image=alpine\nFROM $image\nENV image=alpine2";
                let location = findDefinition(document, 0, 6);
                assertLocation(location, 0, 4, 0, 9);
                location = findDefinition(document, 1, 8);
                assert.strictEqual(location, null);
                location = findDefinition(document, 2, 6);
                assertLocation(location, 2, 4, 2, 9);

                document = "ENV image=alpine\nFROM $image\nENV image=alpine2\nFROM $image";
                location = findDefinition(document, 0, 6);
                assertLocation(location, 0, 4, 0, 9);
                location = findDefinition(document, 1, 8);
                assert.strictEqual(location, null);
                location = findDefinition(document, 2, 6);
                assertLocation(location, 2, 4, 2, 9);
                location = findDefinition(document, 3, 8);
                assert.strictEqual(location, null);

                document = "ENV image=alpine\nFROM $image\nFROM $image\nENV image=alpine2";
                location = findDefinition(document, 0, 6);
                assertLocation(location, 0, 4, 0, 9);
                location = findDefinition(document, 1, 8);
                assert.strictEqual(location, null);
                location = findDefinition(document, 2, 8);
                assert.strictEqual(location, null);
                location = findDefinition(document, 3, 6);
                assertLocation(location, 3, 4, 3, 9);
            });

            it("scoped", function () {
                let document = "ENV image=alpine\nFROM alpine\nRUN echo $image";
                let location = findDefinition(document, 2, 12);
                assert.strictEqual(location, null);
            });

            it("non-existent variable", function () {
                let document = "FROM $image\nENV image";
                let location = findDefinition(document, 0, 8);
                assert.strictEqual(location, null);

                document = "ENV\nFROM $image";
                location = findDefinition(document, 1, 8);
                assert.strictEqual(location, null);

                document = "ENV image=alpine\nFROM $image2\nENV image2=alpine2";
                location = findDefinition(document, 0, 6);
                assertLocation(location, 0, 4, 0, 9);
                location = findDefinition(document, 1, 8);
                assert.strictEqual(location, null);
                location = findDefinition(document, 2, 6);
                assertLocation(location, 2, 4, 2, 10);
            });
        });
    });

    function createRegularHeredocTests(instruction: string, offset: number) {
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

        describe("regular", () => {
            tests.forEach((test) => {
                describe(test.testName, () => {
                    it("definition", () => {
                        const location = findDefinition(test.content, 1, offset + 11);
                        assertLocation(location, 1, offset + test.offset, 1, offset + test.offset + 4);
                    });
    
                    it("delimiter", () => {
                        const location = findDefinition(test.content, 3, 2);
                        assertLocation(location, 1, offset + test.offset, 1, offset + test.offset + 4);
                    });
                });
            });
        });
    }

    function createEmptyHeredocTests(instruction: string, offset: number) {
        const tests = [
            {
                testName: `<<`,
                content: `FROM alpine\n${instruction} echo <<`,
                offset: 8
            },
            {
                testName: `<<-`,
                content: `FROM alpine\n${instruction} echo <<-`,
                offset: 9
            },
            {
                testName: `<<''`,
                content: `FROM alpine\n${instruction} echo <<''`,
                offset: 9
            },
            {
                testName: `<<''`,
                content: `FROM alpine\n${instruction} echo <<-''`,
                offset: 10
            },
            {
                testName: `<<""`,
                content: `FROM alpine\n${instruction} echo <<""`,
                offset: 9
            },
            {
                testName: `<<-""`,
                content: `FROM alpine\n${instruction} echo <<-""`,
                offset: 10
            }
        ];

        describe("empty", () => {
            tests.forEach((test) => {
                it(test.testName, () => {
                    const location = findDefinition(test.content, 1, offset + test.offset);
                    assert.strictEqual(location, null);
                });
            });
        });
    }

    function createHeredocTests(instruction: string) {
        describe(instruction, () => {
            const offset = instruction.length;
            createRegularHeredocTests(instruction, offset);
            createEmptyHeredocTests(instruction, offset);

            it("<<<CRASH", function() {
                const content = "RUN <<<CRASH\nCRASH\n";
                const location = findDefinition(content, 0, 10);
                assert.strictEqual(location, null);
            });

            it("tabbed and untabbed delimiter, on tabbed delimiter", function() {
                const content = `${instruction} cat <<-EOT > 1.txt\n\thello\n\tEOT\n${instruction} cat <<EOT > 2.txt\nhello2\nEOT`;
                const location = findDefinition(content, 2, 3);
                assertLocation(location, 0, instruction.length + 8, 0, instruction.length + 11);
            });

            it("tabbed and untabbed delimiter, on untabbed delimiter", function() {
                const content = `${instruction} cat <<-EOT > 1.txt\n\thello\n\tEOT\n${instruction} cat <<EOT > 2.txt\nhello2\nEOT`;
                const location = findDefinition(content, 5, 2);
                assertLocation(location, 3, instruction.length + 7, 3, instruction.length + 10);
            });
        });
    }

    describe("Heredoc", () => {
        createHeredocTests("COPY");
        createHeredocTests("RUN");
    });
});
