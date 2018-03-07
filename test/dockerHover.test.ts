/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as assert from "assert";

import { TextDocument, Hover, Position, MarkupKind, MarkupContent } from 'vscode-languageserver-types';
import { MarkdownDocumentation } from '../src/dockerMarkdown';
import { DockerfileLanguageServiceFactory } from '../src/main';
import { PlainTextDocumentation } from "../src/dockerPlainText";

const markdownDocumentation = new MarkdownDocumentation();
const plainTextDocumentation = new PlainTextDocumentation();
const service = DockerfileLanguageServiceFactory.createLanguageService();

function onHover(content: string, line: number, character: number, contentFormat?: MarkupKind[]): Hover | null {
    service.setCapabilities({
        hover: {
            contentFormat: contentFormat
        }
    });
    return service.computeHover(content, Position.create(line, character));
}

function assertHover(content: string, line: number, character: number, key: string) {
    let hover = onHover(content, line, character);
    assert.equal(hover.contents, markdownDocumentation.getMarkdown(key).contents);
    assert.equal(hover.range, undefined);

    hover = onHover(content, line, character, []);
    assert.equal(hover.contents, markdownDocumentation.getMarkdown(key).contents);
    assert.equal(hover.range, undefined);

    hover = onHover(content, line, character, [MarkupKind.Markdown]);
    let markupContent = hover.contents as MarkupContent;
    assert.equal(markupContent.kind, MarkupKind.Markdown);
    assert.equal(markupContent.value, markdownDocumentation.getMarkdown(key).contents);
    assert.equal(hover.range, undefined);

    hover = onHover(content, line, character, [MarkupKind.Markdown, MarkupKind.PlainText]);
    markupContent = hover.contents as MarkupContent;
    assert.equal(markupContent.kind, MarkupKind.Markdown);
    assert.equal(markupContent.value, markdownDocumentation.getMarkdown(key).contents);
    assert.equal(hover.range, undefined);

    hover = onHover(content, line, character, [MarkupKind.PlainText]);
    markupContent = hover.contents as MarkupContent;
    assert.equal(markupContent.kind, MarkupKind.PlainText);
    assert.equal(markupContent.value, plainTextDocumentation.getDocumentation(key));
    assert.equal(hover.range, undefined);

    hover = onHover(content, line, character, [MarkupKind.PlainText, MarkupKind.Markdown]);
    markupContent = hover.contents as MarkupContent;
    assert.equal(markupContent.kind, MarkupKind.PlainText);
    assert.equal(markupContent.value, plainTextDocumentation.getDocumentation(key));
    assert.equal(hover.range, undefined);
}

function assertRawHover(content: string, line: number, character: number, value: string) {
    let hover = onHover(content, line, character);
    assert.equal(hover.contents, value);
    assert.equal(hover.range, undefined);

    hover = onHover(content, line, character, []);
    assert.equal(hover.contents, value);
    assert.equal(hover.range, undefined);

    hover = onHover(content, line, character, [MarkupKind.Markdown]);
    assert.equal(hover.contents, value);
    assert.equal(hover.range, undefined);

    hover = onHover(content, line, character, [MarkupKind.Markdown, MarkupKind.PlainText]);
    assert.equal(hover.contents, value);
    assert.equal(hover.range, undefined);

    hover = onHover(content, line, character, [MarkupKind.PlainText]);
    assert.equal(hover.contents, value);
    assert.equal(hover.range, undefined);

    hover = onHover(content, line, character, [MarkupKind.PlainText, MarkupKind.Markdown]);
    assert.equal(hover.contents, value);
    assert.equal(hover.range, undefined);
}

function assertNullHover(content: string, line: number, character: number) {
    assert.equal(onHover(content, line, character), null);
    assert.equal(onHover(content, line, character, []), null);
    assert.equal(onHover(content, line, character, [MarkupKind.Markdown]), null);
    assert.equal(onHover(content, line, character, [MarkupKind.Markdown, MarkupKind.PlainText]), null);
    assert.equal(onHover(content, line, character, [MarkupKind.PlainText]), null);
    assert.equal(onHover(content, line, character, [MarkupKind.PlainText, MarkupKind.Markdown]), null);
}

describe("Dockerfile hover", function () {
    describe("whitespace", function () {
        it("empty file", function () {
            let content = "";
            assertNullHover(content, 0, 0);
        });

        it("spaces", function () {
            let content = "    ";
            assertNullHover(content, 0, 2);
        });

        it("tabs", function () {
            let content = "\t\t\t\t";
            assertNullHover(content, 0, 2);
        });

        it("invalid range", function() {
            let content = "    ";
            assertNullHover(content, 1, 2);
        });
    });

    describe("comments", function () {
        it("# FROM node", function () {
            let content = "# FROM node";
            assertNullHover(content, 0, 0);
            assertNullHover(content, 0, 2);
            assertNullHover(content, 0, 4);
            assertNullHover(content, 0, 6);
        });
    });

    describe("directives", function () {
        it("escape", function () {
            let content = "#escape=`";
            assertHover(content, 0, 4, "escape");

            content = "# escape=`";
            assertNullHover(content, 0, 1);
        });

        it("invalid directive definition", function () {
            let content = "#eskape=`";
            assertNullHover(content, 0, 4);

            content = "#escape ";
            assertNullHover(content, 0, 4);

            content = "#escape=";
            assertHover(content, 0, 4, "escape");

            content = "#escape=ab";
            assertHover(content, 0, 4, "escape");

            content = "#escape\t";
            assertNullHover(content, 0, 4);

            content = "#escape\r\n";
            assertNullHover(content, 0, 4);

            content = "#escape\n";
            assertNullHover(content, 0, 4);

            content = "\n#escape";
            assertNullHover(content, 1, 4);

            content = "\r\n#escape";
            assertNullHover(content, 1, 4);
        });
    });

    describe("keywords", function () {
        it("FROM", function () {
            let content = "FROM node";
            assertHover(content, 0, 2, "FROM");
        });

        it("froM", function () {
            let content = "froM node";
            assertHover(content, 0, 2, "FROM");
        });

        it("fr\\\\noM", function () {
            let content = "fr\\\noM node";
            assertHover(content, 0, 0, "FROM");
            assertHover(content, 0, 1, "FROM");
            assertHover(content, 1, 0, "FROM");
            assertHover(content, 1, 1, "FROM");
        });

        it("fr\\\\r\\noM", function () {
            let content = "fr\\\r\noM node";
            assertHover(content, 0, 0, "FROM");
            assertHover(content, 0, 1, "FROM");
            assertHover(content, 1, 0, "FROM");
            assertHover(content, 1, 1, "FROM");
        });

        it("HEALTHCHECK NONE", function () {
            let content = "HEALTHCHECK NONE";
            assertNullHover(content, 0, 14);
        });

        it("newlines", function () {
            let content = "FROM node\nEXPOSE 8081";
            assertHover(content, 1, 4, "EXPOSE");

            content = "FROM node\r\nEXPOSE 8081";
            assertHover(content, 1, 4, "EXPOSE");
        });

        it("invalid escape", function () {
            let content = "FR\\OM node";
            assertNullHover(content, 0, 1);
            assertNullHover(content, 0, 3);
        });

        it("unknown", function () {
            let content = "3";
            assertNullHover(content, 0, 0);
            assertNullHover(content, 0, 1);

            content = "UNKNOWN arg";
            assertNullHover(content, 0, 0);
            assertNullHover(content, 0, 4);
            assertNullHover(content, 0, 7);
        });

        function createAddTest(trigger: boolean) {
            let onbuild = trigger ? "ONBUILD " : "";
            let triggerOffset = onbuild.length;

            describe("ADD", function () {
                it("--chown", function () {
                    let content = onbuild + "ADD --chown";
                    assertHover(content, 0, triggerOffset + 9, "ADD_FlagChown");
                });

                it("--chown=\\$user", function () {
                    let content = onbuild + "ADD --chown=\\$user";
                    assertHover(content, 0, triggerOffset + 9, "ADD_FlagChown");
                });

                it("--chown=\\root", function () {
                    let content = onbuild + "ADD --chown=\\root";
                    assertHover(content, 0, triggerOffset + 9, "ADD_FlagChown");
                });

                it("--CHOWN", function () {
                    let content = onbuild + "ADD --FROM";
                    assertNullHover(content, 0, triggerOffset + 9);
                });

                it("whitespace", function () {
                    let content = onbuild + "ADD  --from";
                    assertNullHover(content, 0, triggerOffset + 5);
                });

                it("flag after", function () {
                    let content = onbuild + "ADD app --chown=root app";
                    assertNullHover(content, 0, triggerOffset + 13);

                    content = onbuild + "ADD app app --chown=root";
                    assertNullHover(content, 0, triggerOffset + 17);
                });
            });
        }

        createAddTest(false);

        function createVariablesTest(testSuiteName: string, instruction: string, delimiter: string) {
            const space = delimiter === " ";

            describe(testSuiteName, function () {
                it("variable name", function () {
                    let content = instruction + " z" + delimiter + "y";
                    let hover = onHover(content, 0, 5);
                    assertRawHover(content, 0, 5, "y");

                    content = instruction + " z" + delimiter + "#";
                    assertRawHover(content, 0, 5, "#");

                    content = instruction + " e" + delimiter + "'f g=h'";
                    assertRawHover(content, 0, 5, "f g=h");

                    content = instruction + " x" + delimiter + "\"v v=w\"";
                    assertRawHover(content, 0, 5, "v v=w");
                });

                it("variable value", function () {
                    let content = instruction + " z" + delimiter + "y";
                    assertNullHover(content, 0, 6);
                });

                it("no variable value", function () {
                    let content = instruction + " z";
                    assertNullHover(content, 0, 5);
                });

                it("empty variable value", function () {
                    let content = instruction + " z" + delimiter + "";
                    if (delimiter === " ") {
                        assertNullHover(content, 0, 5);
                    } else {
                        assertRawHover(content, 0, 5, "");
                    }
                });

                it("whitespace variable value", function () {
                    let content = instruction + " z" + delimiter + "   \t\t   ";
                    if (delimiter === " ") {
                        assertNullHover(content, 0, 5);
                    } else {
                        assertRawHover(content, 0, 5, "");
                    }
                });

                it("escaped", function () {
                    let content = instruction + " \\ \t\nz" + delimiter + "y";
                    assertRawHover(content, 1, 0, "y");

                    content = instruction + " \\ \t\r\nz" + delimiter + "y";
                    assertRawHover(content, 1, 0, "y");

                    content = instruction + " z" + delimiter + "y \\ \t\n \t";
                    assertRawHover(content, 0, 5, "y");

                    content = instruction + " z" + delimiter + "y \\ \t\r \t";
                    assertRawHover(content, 0, 5, "y");

                    content = instruction + " z" + delimiter + "y \\ \t\r\n \t";
                    assertRawHover(content, 0, 5, "y");

                    content = instruction + " z" + delimiter + "\\\ny";
                    assertRawHover(content, 0, 5, "y");

                    content = instruction + " z" + delimiter + "\\\n'y'";
                    assertRawHover(content, 0, 5, "y");

                    content = instruction + " z" + delimiter + "\\\n\"y\"";
                    assertRawHover(content, 0, 5, "y");

                    content = instruction + " a" + delimiter + "\\";
                    if (delimiter === " ") {
                        // just the escape character at EOF, so considered to be the empty string
                        assertNullHover(content, 0, 5);
                    } else {
                        assertRawHover(content, 0, 5, "");
                    }

                    content = instruction + " a" + delimiter + "a\\ x";
                    assertRawHover(content, 0, 5, "a x");

                    content = instruction + " a" + delimiter + "a\\\nx";
                    assertRawHover(content, 0, 5, "ax");

                    content = instruction + " a" + delimiter + "a\\\r\nx";
                    assertRawHover(content, 0, 5, "ax");

                    content = instruction + " a" + delimiter + "a\\  \nx";
                    assertRawHover(content, 0, 5, "ax");

                    content = instruction + " a" + delimiter + "a\\  \t\t\r\nx";
                    assertRawHover(content, 0, 5, "ax");

                    content = instruction + " a" + delimiter + "\\b";
                    assertRawHover(content, 0, 5, "b");

                    content = instruction + " a" + delimiter + "\\\\b";
                    assertRawHover(content, 0, 5, "\\b");

                    content = instruction + " a" + delimiter + "\\\\\\\\\\b";
                    assertRawHover(content, 0, 5, "\\\\b");

                    content = instruction + " var" + delimiter + "a\\\n# comment\nbc";
                    assertRawHover(content, 0, 6, "abc");

                    content = instruction + " var" + delimiter + "a\\\r\n# comment\r\nbc";
                    assertRawHover(content, 0, 6, "abc");

                    content = instruction + " var" + delimiter + "\\\n# comment\nabc";
                    assertRawHover(content, 0, 6, "abc");

                    content = instruction + " var" + delimiter + "\\\r\n# comment\r\nabc";
                    assertRawHover(content, 0, 6, "abc");
                });

                it("escape in literals", function () {
                    let content = instruction + " a" + delimiter + "\"a\\ x\"";
                    assertRawHover(content, 0, 5, "a\\ x");

                    content = instruction + " a" + delimiter + "'a\\ x'";
                    assertRawHover(content, 0, 5, "a\\ x");

                    content = instruction + " a" + delimiter + "\"a \\x\"";
                    assertRawHover(content, 0, 5, "a \\x");

                    content = instruction + " a" + delimiter + "\"a \\\\x\"";
                    assertRawHover(content, 0, 5, "a \\x");

                    content = instruction + " a" + delimiter + "\"a \\\\ x\"";
                    assertRawHover(content, 0, 5, "a \\ x");

                    content = instruction + " a" + delimiter + "\"a \\\\\\x\"";
                    assertRawHover(content, 0, 5, "a \\\\x");

                    content = instruction + " a" + delimiter + "\"a \\\\\\ x\"";
                    assertRawHover(content, 0, 5, "a \\\\ x");

                    content = instruction + " a" + delimiter + "\"a \\\nx\"";
                    assertRawHover(content, 0, 5, "a x");

                    content = instruction + " a" + delimiter + "\"\\\\\\\\x\"";
                    assertRawHover(content, 0, 5, "\\\\x");

                    content = instruction + " a" + delimiter + "\"\\\\\\\\\\x\"";
                    assertRawHover(content, 0, 5, "\\\\\\x");

                    content = instruction + " a" + delimiter + "\"\\\\\\\\\\\\x\"";
                    assertRawHover(content, 0, 5, "\\\\\\x");

                    content = instruction + " a" + delimiter + "'a \\\nx'";
                    assertRawHover(content, 0, 5, "a x");

                    content = instruction + " var" + delimiter + "\"abc\\ #def\"";
                    assertRawHover(content, 0, 6, "abc\\ #def");

                    content = instruction + " var" + delimiter + "\"value \\\n# comment\nvalue2\"";
                    assertRawHover(content, 0, 6, "value value2");

                    content = instruction + " var" + delimiter + "\"value \\ \t\n# comment\nvalue2\"";
                    assertRawHover(content, 0, 6, "value value2");

                    content = instruction + " var" + delimiter + "\"abc\\\n #comment\n #comment\ndef\"";
                    assertRawHover(content, 0, 6, "abcdef");

                    content = instruction + " var" + delimiter + "\"abc\\\r\n #comment\r\n #comment\r\ndef\"";
                    assertRawHover(content, 0, 6, "abcdef");

                    content = instruction + " var" + delimiter + "'abc\\\n #comment\n #comment\ndef'";
                    assertRawHover(content, 0, 6, "abcdef");

                    content = instruction + " var" + delimiter + "'abc\\\r\n #comment\r\n #comment\r\ndef'";
                    assertRawHover(content, 0, 6, "abcdef");
                });

                it("no variable", function () {
                    let content = instruction + "    ";
                    assertNullHover(content, 0, 5);
                });

                it("referenced variable ${var}", function () {
                    let content = instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}";
                    assertRawHover(content, 1, 13, "value");
                    assertRawHover(content, 2, 7, "value");
                    assertRawHover(content, 3, 11, "value");

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}\n" +
                        "FROM alpine\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}"
                        ;
                    assertRawHover(content, 2, 13, "value");
                    assertRawHover(content, 3, 7, "value");
                    assertRawHover(content, 4, 11, "value");
                    assertNullHover(content, 6, 13);
                    assertNullHover(content, 7, 7);
                    assertNullHover(content, 8, 11);

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}\n" +
                        "FROM alpine\n" + instruction + " var" + delimiter + "value2\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}"
                        ;
                    assertRawHover(content, 2, 13, "value");
                    assertRawHover(content, 3, 7, "value");
                    assertRawHover(content, 4, 11, "value");
                    assertRawHover(content, 7, 13, "value2");
                    assertRawHover(content, 8, 7, "value2");
                    assertRawHover(content, 9, 11, "value2");

                    content = instruction + " var" + delimiter + "value\nARG var2=value2\nSTOPSIGNAL ${var}${var2}\nUSER ${var}${var2}\nWORKDIR ${var}${var2}";
                    assertRawHover(content, 2, 13, "value");
                    assertRawHover(content, 2, 20, "value2");
                    assertRawHover(content, 3, 7, "value");
                    assertRawHover(content, 3, 14, "value2");
                    assertRawHover(content, 4, 11, "value");
                    assertRawHover(content, 4, 18, "value2");

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nARG var2=value2\nSTOPSIGNAL ${var}${var2}\nUSER ${var}${var2}\nWORKDIR ${var}${var2}\n" +
                        "FROM alpine\nSTOPSIGNAL ${var}${var2}\nUSER ${var}${var2}\nWORKDIR ${var}${var2}"
                        ;
                    assertRawHover(content, 3, 13, "value");
                    assertRawHover(content, 3, 20, "value2");
                    assertRawHover(content, 4, 7, "value");
                    assertRawHover(content, 4, 14, "value2");
                    assertRawHover(content, 5, 11, "value");
                    assertRawHover(content, 5, 18, "value2");
                    assertNullHover(content, 7, 13);
                    assertNullHover(content, 7, 20);
                    assertNullHover(content, 8, 7);
                    assertNullHover(content, 8, 14);
                    assertNullHover(content, 9, 11);
                    assertNullHover(content, 9, 18);

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nARG var2=value2\nSTOPSIGNAL ${var}${var2}\nUSER ${var}${var2}\nWORKDIR ${var}${var2}\n" +
                        "FROM alpine\n" + instruction + " var" + delimiter + "value3\nARG var2=value4\nSTOPSIGNAL ${var}${var2}\nUSER ${var}${var2}\nWORKDIR ${var}${var2}"
                        ;
                    assertRawHover(content, 3, 13, "value");
                    assertRawHover(content, 3, 20, "value2");
                    assertRawHover(content, 4, 7, "value");
                    assertRawHover(content, 4, 14, "value2");
                    assertRawHover(content, 5, 11, "value");
                    assertRawHover(content, 5, 18, "value2");
                    assertRawHover(content, 9, 13, "value3");
                    assertRawHover(content, 9, 20, "value4");
                    assertRawHover(content, 10, 7, "value3");
                    assertRawHover(content, 10, 14, "value4");
                    assertRawHover(content, 11, 11, "value3");
                    assertRawHover(content, 11, 18, "value4");
                });

                it("referenced variable ${var} no value", function () {
                    let content = instruction + " var\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}";
                    assertNullHover(content, 1, 13);
                    assertNullHover(content, 2, 7);
                    assertNullHover(content, 3, 11);
                });

                it("referenced variable ${var} empty value", function () {
                    let content = instruction + " var" + delimiter + "\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}";
                    if (space) {
                        assertNullHover(content, 1, 13);
                        assertNullHover(content, 2, 7);
                        assertNullHover(content, 3, 11);
                    } else {
                        assertRawHover(content, 1, 13, "");
                        assertRawHover(content, 2, 7, "");
                        assertRawHover(content, 3, 11, "");
                    }

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}\n" +
                        "FROM alpine\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}"
                        ;
                    if (space) {
                        assertNullHover(content, 2, 13);
                        assertNullHover(content, 3, 7);
                        assertNullHover(content, 4, 11);
                    } else {
                        assertRawHover(content, 2, 13, "");
                        assertRawHover(content, 3, 7, "");
                        assertRawHover(content, 4, 11, "");
                    }
                    assertNullHover(content, 6, 13);
                    assertNullHover(content, 7, 7);
                    assertNullHover(content, 8, 11);
                });

                it("referenced variable ${var} whitespace", function () {
                    let content = instruction + " var" + delimiter + "   \t\t   \nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}";
                    if (space) {
                        assertNullHover(content, 1, 13);
                        assertNullHover(content, 2, 7);
                        assertNullHover(content, 3, 11);
                    } else {
                        assertRawHover(content, 1, 13, "");
                        assertRawHover(content, 2, 7, "");
                        assertRawHover(content, 3, 11, "");
                    }

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "   \t\t   \nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}\n" +
                        "FROM alpine\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}"
                        ;
                    if (space) {
                        assertNullHover(content, 2, 13);
                        assertNullHover(content, 3, 7);
                        assertNullHover(content, 4, 11);
                    } else {
                        assertRawHover(content, 2, 13, "");
                        assertRawHover(content, 3, 7, "");
                        assertRawHover(content, 4, 11, "");
                    }
                    assertNullHover(content, 6, 13);
                    assertNullHover(content, 7, 7);
                    assertNullHover(content, 8, 11);
                });

                it("referenced variable ${var", function () {
                    let content = instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var\nUSER ${var\nWORKDIR ${var";
                    assertNullHover(content, 1, 14);
                    assertNullHover(content, 2, 8);
                    assertNullHover(content, 3, 11);

                    content = "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var\nUSER ${var\nWORKDIR ${var";
                    assertNullHover(content, 2, 14);
                    assertNullHover(content, 3, 8);
                    assertNullHover(content, 4, 11);
                });

                it("referenced variable $var", function () {
                    let content = instruction + " var" + delimiter + "value\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                    assertRawHover(content, 1, 13, "value");
                    assertRawHover(content, 2, 7, "value");
                    assertRawHover(content, 3, 11, "value");

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var\n" +
                        "FROM alpine\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var"
                        ;
                    assertRawHover(content, 2, 13, "value");
                    assertRawHover(content, 3, 7, "value");
                    assertRawHover(content, 4, 11, "value");
                    assertNullHover(content, 6, 13);
                    assertNullHover(content, 7, 7);
                    assertNullHover(content, 8, 11);

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var\n" +
                        "FROM alpine\n" + instruction + " var" + delimiter + "value2\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var"
                        ;
                    assertRawHover(content, 2, 13, "value");
                    assertRawHover(content, 3, 7, "value");
                    assertRawHover(content, 4, 11, "value");
                    assertRawHover(content, 7, 13, "value2");
                    assertRawHover(content, 8, 7, "value2");
                    assertRawHover(content, 9, 11, "value2");

                    content = instruction + " var" + delimiter + "value\nARG var2=value2\nSTOPSIGNAL $var$var2\nUSER $var$var2\nWORKDIR $var$var2";
                    assertRawHover(content, 2, 13, "value");
                    assertRawHover(content, 2, 17, "value2");
                    assertRawHover(content, 3, 7, "value");
                    assertRawHover(content, 3, 12, "value2");
                    assertRawHover(content, 4, 11, "value");
                    assertRawHover(content, 4, 15, "value2");

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nARG var2=value2\nSTOPSIGNAL $var$var2\nUSER $var$var2\nWORKDIR $var$var2\n" +
                        "FROM alpine\nSTOPSIGNAL $var$var2\nUSER $var$var2\nWORKDIR $var$var2"
                        ;
                    assertRawHover(content, 3, 13, "value");
                    assertRawHover(content, 3, 17, "value2");
                    assertRawHover(content, 4, 7, "value");
                    assertRawHover(content, 4, 12, "value2");
                    assertRawHover(content, 5, 11, "value");
                    assertRawHover(content, 5, 15, "value2");
                    assertNullHover(content, 7, 13);
                    assertNullHover(content, 7, 17);
                    assertNullHover(content, 8, 7);
                    assertNullHover(content, 8, 12);
                    assertNullHover(content, 9, 11);
                    assertNullHover(content, 9, 15);

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nARG var2=value2\nSTOPSIGNAL $var$var2\nUSER $var$var2\nWORKDIR $var$var2\n" +
                        "FROM alpine\n" + instruction + " var" + delimiter + "value3\nARG var2=value4\nSTOPSIGNAL $var$var2\nUSER $var$var2\nWORKDIR $var$var2"
                        ;
                    assertRawHover(content, 3, 13, "value");
                    assertRawHover(content, 3, 17, "value2");
                    assertRawHover(content, 4, 7, "value");
                    assertRawHover(content, 4, 12, "value2");
                    assertRawHover(content, 5, 11, "value");
                    assertRawHover(content, 5, 15, "value2");
                    assertRawHover(content, 9, 13, "value3");
                    assertRawHover(content, 9, 17, "value4");
                    assertRawHover(content, 10, 7, "value3");
                    assertRawHover(content, 10, 12, "value4");
                    assertRawHover(content, 11, 11, "value3");
                    assertRawHover(content, 11, 15, "value4");
                });

                it("referenced variable $var no value", function () {
                    let content = instruction + " var\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                    assertNullHover(content, 1, 13);
                    assertNullHover(content, 2, 7);
                    assertNullHover(content, 3, 11);

                    content = "FROM alpine\n" + instruction + " var\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                    assertNullHover(content, 2, 13);
                    assertNullHover(content, 3, 7);
                    assertNullHover(content, 4, 11);
                });

                it("referenced variable $var empty value", function () {
                    let content = instruction + " var" + delimiter + "\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                    if (space) {
                        assertNullHover(content, 1, 13);
                        assertNullHover(content, 2, 7);
                        assertNullHover(content, 3, 11);
                    } else {
                        assertRawHover(content, 1, 13, "");
                        assertRawHover(content, 2, 7, "");
                        assertRawHover(content, 3, 11, "");
                    }

                    content = "FROM alpine\n" + instruction + " var" + delimiter + "\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                    if (space) {
                        assertNullHover(content, 2, 13);
                        assertNullHover(content, 3, 7);
                        assertNullHover(content, 4, 11);
                    } else {
                        assertRawHover(content, 2, 13, "");
                        assertRawHover(content, 3, 7, "");
                        assertRawHover(content, 4, 11, "");
                    }
                });

                it("referenced variable $var whitespace", function () {
                    let content = instruction + " var" + delimiter + "   \t\t   \nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                    if (space) {
                        assertNullHover(content, 1, 13);
                        assertNullHover(content, 2, 7);
                        assertNullHover(content, 3, 11);
                    } else {
                        assertRawHover(content, 1, 13, "");
                        assertRawHover(content, 2, 7, "");
                        assertRawHover(content, 3, 11, "");
                    }

                    content = "FROM alpine\n" + instruction + " var" + delimiter + "   \t\t   \nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                    if (space) {
                        assertNullHover(content, 2, 13);
                        assertNullHover(content, 3, 7);
                        assertNullHover(content, 4, 11);
                    } else {
                        assertRawHover(content, 2, 13, "");
                        assertRawHover(content, 3, 7, "");
                        assertRawHover(content, 4, 11, "");
                    }
                });

                it("referenced variable '$var'", function () {
                    let content = instruction + " var" + delimiter + "value\nRUN echo '$var'";
                    assertRawHover(content, 1, 12, "value");

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nRUN echo '$var'\n" +
                        "FROM alpine\nRUN echo '$var'"
                        ;
                    assertRawHover(content, 2, 12, "value");
                    assertNullHover(content, 4, 12);

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nRUN echo '$var'\n" +
                        "FROM alpine\n" + instruction + " var" + delimiter + "value2\nRUN echo '$var'"
                        ;
                    assertRawHover(content, 2, 12, "value");
                    assertRawHover(content, 5, 12, "value2");
                });

                it("referenced variable \"$var\"", function () {
                    let content = instruction + " var" + delimiter + "value\nRUN echo \"$var\"";
                    assertRawHover(content, 1, 12, "value");

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nRUN echo \"$var\"\n" +
                        "FROM alpine\nRUN echo \"$var\""
                        ;
                    assertRawHover(content, 2, 12, "value");
                    assertNullHover(content, 4, 12);

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nRUN echo \"$var\"\n" +
                        "FROM alpine\n" + instruction + " var" + delimiter + "value2\nRUN echo \"$var\""
                        ;
                    assertRawHover(content, 2, 12, "value");
                    assertRawHover(content, 5, 12, "value2");
                });

                it("referenced variable \\${var}", function () {
                    let content = instruction + " var" + delimiter + "value\nSTOPSIGNAL \\${var}\nUSER \\${var}\nWORKDIR \\${var}";
                    assertNullHover(content, 1, 15);
                    assertNullHover(content, 2, 10);
                    assertNullHover(content, 3, 12);

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL \\${var}\nUSER \\${var}\nWORKDIR \\${var}"
                        ;
                    assertNullHover(content, 2, 15);
                    assertNullHover(content, 3, 10);
                    assertNullHover(content, 4, 12);
                });

                it("referenced variable \\$var", function () {
                    let content = instruction + " var" + delimiter + "value\nSTOPSIGNAL \\$var\nUSER \\$var\nWORKDIR \\$var";
                    assertNullHover(content, 1, 14);
                    assertNullHover(content, 2, 9);
                    assertNullHover(content, 3, 11);

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL \\$var\nUSER \\$var\nWORKDIR \\$var"
                        ;
                    assertNullHover(content, 2, 14);
                    assertNullHover(content, 3, 9);
                    assertNullHover(content, 4, 11);
                });

                it("$var in LABEL value with single quotes", function () {
                    let content = instruction + " var" + delimiter + "value\nLABEL label='$var'";
                    assertNullHover(content, 1, 15);
                });

                it("$var in LABEL value with double quotes", function () {
                    let content = instruction + " var" + delimiter + "value\nLABEL label=\"$var\"";
                    assertRawHover(content, 1, 15, "value");
                });

                it("${var} in LABEL value with single quotes", function () {
                    let content = instruction + " var" + delimiter + "value\nLABEL label='${var}'";
                    assertNullHover(content, 1, 17);
                });

                it("${var} in LABEL value with double quotes", function () {
                    let content = instruction + " var" + delimiter + "value\nLABEL label=\"${var}\"";
                    assertRawHover(content, 1, 17, "value");
                });

                it("multiline reference \\n", function () {
                    let content = instruction + " port=8080\nEXPOSE ${po\\\nrt}";
                    assertRawHover(content, 2, 0, "8080");
                    assertRawHover(content, 2, 1, "8080");
                    assertRawHover(content, 2, 2, "8080");

                    content = "#escape=`\n" + instruction + " port=8080\nEXPOSE ${po`\nrt}";
                    assertRawHover(content, 3, 0, "8080");
                    assertRawHover(content, 3, 1, "8080");
                    assertRawHover(content, 3, 2, "8080");

                    content = instruction + " port=8080\nEXPOSE $po\\\nrt";
                    assertRawHover(content, 2, 0, "8080");
                    assertRawHover(content, 2, 1, "8080");
                    assertRawHover(content, 2, 2, "8080");

                    content = "#escape=`\n" + instruction + " port=8080\nEXPOSE $po`\nrt";
                    assertRawHover(content, 3, 0, "8080");
                    assertRawHover(content, 3, 1, "8080");
                    assertRawHover(content, 3, 2, "8080");

                    content = instruction + " port=8080\nLABEL key=\"$po\\\nrt\"";
                    assertRawHover(content, 2, 0, "8080");
                    assertRawHover(content, 2, 1, "8080");
                    assertRawHover(content, 2, 2, "8080");
                });

                it("multiline reference \\r\\n", function () {
                    let content = instruction + " port=8080\rnEXPOSE ${po\\\r\nrt}";
                    assertRawHover(content, 2, 0, "8080");
                    assertRawHover(content, 2, 1, "8080");
                    assertRawHover(content, 2, 2, "8080");

                    content = "#escape=`\n" + instruction + " port=8080\r\nEXPOSE ${po`\r\nrt}";
                    assertRawHover(content, 3, 0, "8080");
                    assertRawHover(content, 3, 1, "8080");
                    assertRawHover(content, 3, 2, "8080");

                    content = instruction + " port=8080\r\nEXPOSE $po\\\r\nrt";
                    assertRawHover(content, 2, 0, "8080");
                    assertRawHover(content, 2, 1, "8080");
                    assertRawHover(content, 2, 2, "8080");

                    content = "#escape=`\n" + instruction + " port=8080\r\nEXPOSE $po`\r\nrt";
                    assertRawHover(content, 3, 0, "8080");
                    assertRawHover(content, 3, 1, "8080");
                    assertRawHover(content, 3, 2, "8080");

                    content = instruction + " port=8080\r\nLABEL key=\"$po\\\r\nrt\"";
                    assertRawHover(content, 2, 0, "8080");
                    assertRawHover(content, 2, 1, "8080");
                    assertRawHover(content, 2, 2, "8080");
                });

                it("multiline reference \\n spaced", function () {
                    let content = instruction + " port=8080\nEXPOSE ${po\\ \t\nrt}";
                    assertRawHover(content, 2, 0, "8080");
                    assertRawHover(content, 2, 1, "8080");
                    assertRawHover(content, 2, 2, "8080");

                    content = "#escape=`\n" + instruction + " port=8080\nEXPOSE ${po` \t\nrt}";
                    assertRawHover(content, 3, 0, "8080");
                    assertRawHover(content, 3, 1, "8080");
                    assertRawHover(content, 3, 2, "8080");

                    content = instruction + " port=8080\nEXPOSE $po\\ \t\nrt";
                    assertRawHover(content, 2, 0, "8080");
                    assertRawHover(content, 2, 1, "8080");
                    assertRawHover(content, 2, 2, "8080");

                    content = "#escape=`\n" + instruction + " port=8080\nEXPOSE $po` \t\nrt";
                    assertRawHover(content, 3, 0, "8080");
                    assertRawHover(content, 3, 1, "8080");
                    assertRawHover(content, 3, 2, "8080");

                    content = instruction + " port=8080\nLABEL key=\"$po\\ \t\nrt\"";
                    assertRawHover(content, 2, 0, "8080");
                    assertRawHover(content, 2, 1, "8080");
                    assertRawHover(content, 2, 2, "8080");
                });

                it("multiline reference \\r\\n spaced", function () {
                    let content = instruction + " port=8080\r\nEXPOSE ${po\\ \t\r\nrt}";
                    assertRawHover(content, 2, 0, "8080");
                    assertRawHover(content, 2, 1, "8080");
                    assertRawHover(content, 2, 2, "8080");

                    content = "#escape=`\n" + instruction + " port=8080\r\nEXPOSE ${po` \t\r\nrt}";
                    assertRawHover(content, 3, 0, "8080");
                    assertRawHover(content, 3, 1, "8080");
                    assertRawHover(content, 3, 2, "8080");

                    content = instruction + " port=8080\nEXPOSE $po\\ \t\r\nrt";
                    assertRawHover(content, 2, 0, "8080");
                    assertRawHover(content, 2, 1, "8080");
                    assertRawHover(content, 2, 2, "8080");

                    content = "#escape=`\n" + instruction + " port=8080\nEXPOSE $po` \t\r\nrt";
                    assertRawHover(content, 3, 0, "8080");
                    assertRawHover(content, 3, 1, "8080");
                    assertRawHover(content, 3, 2, "8080");

                    content = instruction + " port=8080\nLABEL key=\"$po\\ \t\r\nrt\"";
                    assertRawHover(content, 2, 0, "8080");
                    assertRawHover(content, 2, 1, "8080");
                    assertRawHover(content, 2, 2, "8080");
                });

                it("$var followed by space", function () {
                    let content = instruction + " var" + delimiter + "value\nLABEL key=\"$var \"";
                    assertRawHover(content, 1, 14, "value");
                });

                it("$var followed by tab", function () {
                    let content = instruction + " var" + delimiter + "value\nLABEL key=\"$var\t\"";
                    assertRawHover(content, 1, 14, "value");
                });
            });
        }

        createVariablesTest("ARG", "ARG", "=");

        function createCopyTest(trigger: boolean) {
            let onbuild = trigger ? "ONBUILD " : "";
            let triggerOffset = onbuild.length;

            describe("COPY", function () {
                describe("--from flag", function () {
                    it("--from", function () {
                        let content = onbuild + "COPY --from";
                        assertHover(content, 0, triggerOffset + 9, "COPY_FlagFrom");
                    });

                    it("--from=\\$x", function () {
                        let content = onbuild + "COPY --from=\\$x";
                        assertHover(content, 0, triggerOffset + 9, "COPY_FlagFrom");
                    });

                    it("--from=\\a", function () {
                        let content = onbuild + "COPY --from=\\a";
                        assertHover(content, 0, triggerOffset + 9, "COPY_FlagFrom");
                    });

                    it("--FROM", function () {
                        let content = onbuild + "COPY --FROM";
                        assertNullHover(content, 0, triggerOffset + 9);
                    });

                    it("flag after", function () {
                        let content = onbuild + "COPY app --from=alpine app";
                        assertNullHover(content, 0, triggerOffset + 13);

                        content = onbuild + "COPY app app --from=alpine";
                        assertNullHover(content, 0, triggerOffset + 18);
                    });

                    it("whitespace", function () {
                        let content = onbuild + "COPY  --from";
                        assertNullHover(content, 0, triggerOffset + 5);
                    });
                });

                describe("--chown flag", function () {
                    it("--chown", function () {
                        let content = onbuild + "COPY --chown";
                        assertHover(content, 0, triggerOffset + 9, "COPY_FlagChown");
                    });

                    it("--chown=\\$user", function () {
                        let content = onbuild + "COPY --chown=\\$x";
                        assertHover(content, 0, triggerOffset + 9, "COPY_FlagChown");
                    });

                    it("--chown=\\root", function () {
                        let content = onbuild + "COPY --chown=\\a";
                        assertHover(content, 0, triggerOffset + 9, "COPY_FlagChown");
                    });

                    it("--CHOWN", function () {
                        let content = onbuild + "COPY --CHOWN";
                        assertNullHover(content, 0, triggerOffset + 9);
                    });

                    it("flag after", function () {
                        let content = onbuild + "COPY app --chown=alpine app";
                        assertNullHover(content, 0, triggerOffset + 13);

                        content = onbuild + "COPY app app --chown=alpine";
                        assertNullHover(content, 0, triggerOffset + 18);
                    });

                    it("whitespace", function () {
                        let content = onbuild + "COPY  --chown";
                        assertNullHover(content, 0, triggerOffset + 5);
                    });
                });
            });
        }

        createCopyTest(false);

        describe("ENV", function () {
            createVariablesTest("equals delimiter", "ENV", "=");
            createVariablesTest("space delimiter", "ENV", " ");

            describe("single variable delimited by space", function () {
                it("${var}", function () {
                    let content = "ENV aa bb cc dd\nRUN echo ${aa} ${cc}";
                    assertRawHover(content, 0, 5, "bb cc dd");
                    assertRawHover(content, 1, 12, "bb cc dd");
                    assertNullHover(content, 0, 11);
                    assertNullHover(content, 1, 18);

                    content =
                        "FROM alpine\nENV aa bb cc dd\nRUN echo ${aa} ${cc}\n" +
                        "FROM alpine\nRUN echo ${aa} ${cc}"
                        ;
                    assertRawHover(content, 1, 5, "bb cc dd");
                    assertRawHover(content, 2, 12, "bb cc dd");
                    assertNullHover(content, 1, 11);
                    assertNullHover(content, 2, 18);
                    assertNullHover(content, 4, 12);
                    assertNullHover(content, 4, 18);

                    content =
                        "FROM alpine\nENV aa bb cc dd\nRUN echo ${aa} ${cc}\n" +
                        "FROM alpine\nENV aa bb cc ee\nRUN echo ${aa} ${cc}"
                        ;
                    assertRawHover(content, 1, 5, "bb cc dd");
                    assertRawHover(content, 2, 12, "bb cc dd");
                    assertNullHover(content, 1, 11);
                    assertNullHover(content, 2, 18);
                    assertRawHover(content, 4, 5, "bb cc ee");
                    assertRawHover(content, 5, 12, "bb cc ee");
                    assertNullHover(content, 4, 11);
                    assertNullHover(content, 5, 18);

                    content = "ENV aa a  b\nRUN echo ${aa}";
                    assertRawHover(content, 0, 5, "a  b");
                    assertRawHover(content, 1, 12, "a  b");

                    content =
                        "FROM alpine\nENV aa a  b\nRUN echo ${aa}\n" +
                        "FROM alpine\nRUN echo ${aa}"
                        ;
                    assertRawHover(content, 1, 5, "a  b");
                    assertRawHover(content, 2, 12, "a  b");
                    assertNullHover(content, 4, 12);

                    content =
                        "FROM alpine\nENV aa a  b\nRUN echo ${aa}\n" +
                        "FROM alpine\nENV aa a  c\nRUN echo ${aa}"
                        ;
                    assertRawHover(content, 1, 5, "a  b");
                    assertRawHover(content, 2, 12, "a  b");
                    assertRawHover(content, 4, 5, "a  c");
                    assertRawHover(content, 5, 12, "a  c");
                });

                it("$var", function () {
                    let content = "ENV aa bb cc dd\nRUN echo $aa $cc";
                    assertRawHover(content, 0, 5, "bb cc dd");
                    assertRawHover(content, 1, 11, "bb cc dd");
                    assertNullHover(content, 0, 11);
                    assertNullHover(content, 1, 15);

                    content =
                        "FROM alpine\nENV aa bb cc dd\nRUN echo $aa $cc\n" +
                        "FROM alpine\nRUN echo $aa $cc"
                        ;
                    assertRawHover(content, 1, 5, "bb cc dd");
                    assertRawHover(content, 2, 11, "bb cc dd");
                    assertNullHover(content, 1, 11);
                    assertNullHover(content, 2, 15);
                    assertNullHover(content, 4, 11);
                    assertNullHover(content, 4, 15);

                    content =
                        "FROM alpine\nENV aa bb cc dd\nRUN echo $aa $cc\n" +
                        "FROM alpine\nENV aa bb cc ee\nRUN echo $aa $cc"
                        ;
                    assertRawHover(content, 1, 5, "bb cc dd");
                    assertRawHover(content, 2, 11, "bb cc dd");
                    assertNullHover(content, 1, 11);
                    assertNullHover(content, 2, 15);
                    assertRawHover(content, 4, 5, "bb cc ee");
                    assertRawHover(content, 5, 11, "bb cc ee");
                    assertNullHover(content, 4, 11);
                    assertNullHover(content, 5, 15);

                    content = "ENV aa a  b\nRUN echo $aa";
                    assertRawHover(content, 0, 5, "a  b");
                    assertRawHover(content, 1, 11, "a  b");

                    content =
                        "FROM alpine\nENV aa a  b\nRUN echo $aa\n" +
                        "FROM alpine\nRUN echo $aa"
                        ;
                    assertRawHover(content, 1, 5, "a  b");
                    assertRawHover(content, 2, 11, "a  b");
                    assertNullHover(content, 4, 11);

                    content =
                        "FROM alpine\nENV aa a  b\nRUN echo $aa\n" +
                        "FROM alpine\nENV aa a  c\nRUN echo $aa"
                        ;
                    assertRawHover(content, 1, 5, "a  b");
                    assertRawHover(content, 2, 11, "a  b");
                    assertRawHover(content, 4, 5, "a  c");
                    assertRawHover(content, 5, 11, "a  c");
                });
            });

            describe("single variable delimited by escaped space", function () {
                it("${var}", function () {
                    let content = "ENV xx a\\ b\nRUN echo ${xx}";
                    assertRawHover(content, 0, 5, "a b");
                    assertRawHover(content, 1, 12, "a b");

                    content =
                        "FROM alpine\nENV xx a\\ b\nRUN echo ${xx}\n" +
                        "FROM alpine\nRUN echo ${xx}"
                        ;
                    assertRawHover(content, 1, 5, "a b");
                    assertRawHover(content, 2, 12, "a b");
                    assertNullHover(content, 4, 12);

                    content =
                        "FROM alpine\nENV xx a\\ b\nRUN echo ${xx}\n" +
                        "FROM alpine\nENV xx a\\ c\nRUN echo ${xx}"
                        ;
                    assertRawHover(content, 1, 5, "a b");
                    assertRawHover(content, 2, 12, "a b");
                    assertRawHover(content, 4, 5, "a c");
                    assertRawHover(content, 5, 12, "a c");

                    content = "ENV xx a\\ \\ b\nRUN echo ${xx}";
                    assertRawHover(content, 0, 5, "a  b");
                    assertRawHover(content, 1, 12, "a  b");

                    content =
                        "FROM alpine\nENV xx a\\ \\ b\nRUN echo ${xx}\n" +
                        "FROM alpine\nRUN echo ${xx}"
                        ;
                    assertRawHover(content, 1, 5, "a  b");
                    assertRawHover(content, 2, 12, "a  b");
                    assertNullHover(content, 4, 12);

                    content =
                        "FROM alpine\nENV xx a\\ \\ b\nRUN echo ${xx}\n" +
                        "FROM alpine\nENV xx a\\ \\ c\nRUN echo ${xx}"
                        ;
                    assertRawHover(content, 1, 5, "a  b");
                    assertRawHover(content, 2, 12, "a  b");
                    assertRawHover(content, 4, 5, "a  c");
                    assertRawHover(content, 5, 12, "a  c");
                });

                it("$var", function () {
                    let content = "ENV xx a\\ b\nRUN echo $xx";
                    assertRawHover(content, 0, 5, "a b");
                    assertRawHover(content, 1, 11, "a b");

                    content =
                        "FROM alpine\nENV xx a\\ b\nRUN echo $xx\n" +
                        "FROM alpine\nRUN echo $xx"
                        ;
                    assertRawHover(content, 1, 5, "a b");
                    assertRawHover(content, 2, 11, "a b");
                    assertNullHover(content, 4, 11);

                    content =
                        "FROM alpine\nENV xx a\\ b\nRUN echo $xx\n" +
                        "FROM alpine\nENV xx a\\ c\nRUN echo $xx"
                        ;
                    assertRawHover(content, 1, 5, "a b");
                    assertRawHover(content, 2, 11, "a b");
                    assertRawHover(content, 4, 5, "a c");
                    assertRawHover(content, 5, 11, "a c");

                    content = "ENV xx a\\ \\ b\nRUN echo $xx";
                    assertRawHover(content, 0, 5, "a  b");
                    assertRawHover(content, 1, 11, "a  b");

                    content =
                        "FROM alpine\nENV xx a\\ \\ b\nRUN echo $xx\n" +
                        "FROM alpine\nRUN echo $xx"
                        ;
                    assertRawHover(content, 1, 5, "a  b");
                    assertRawHover(content, 2, 11, "a  b");
                    assertNullHover(content, 4, 11);

                    content =
                        "FROM alpine\nENV xx a\\ \\ b\nRUN echo $xx\n" +
                        "FROM alpine\nENV xx a\\ \\ c\nRUN echo $xx"
                        ;
                    assertRawHover(content, 1, 5, "a  b");
                    assertRawHover(content, 2, 11, "a  b");
                    assertRawHover(content, 4, 5, "a  c");
                    assertRawHover(content, 5, 11, "a  c");
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
                    assertRawHover(content, 0, 5, "x");
                    assertRawHover(content, 1, 5, "y");
                    assertRawHover(content, 1, 15, "x");
                    assertRawHover(content, 2, 10, "y");

                    content =
                        "FROM alpine\nENV aa=x\nENV aa=y bb=${aa}\nENV cc=${aa}\n" +
                        "FROM alpine\nENV cc=${aa}"
                        ;
                    assertRawHover(content, 1, 5, "x");
                    assertRawHover(content, 2, 5, "y");
                    assertRawHover(content, 2, 15, "x");
                    assertRawHover(content, 3, 10, "y");
                    assertNullHover(content, 5, 10);

                    content =
                        "FROM alpine\nENV aa=x\nENV aa=y bb=${aa}\nENV cc=${aa}\n" +
                        "FROM alpine\nENV aa=a\nENV aa=b bb=${aa}\nENV cc=${aa}"
                        ;
                    assertRawHover(content, 1, 5, "x");
                    assertRawHover(content, 2, 5, "y");
                    assertRawHover(content, 2, 15, "x");
                    assertRawHover(content, 3, 10, "y");
                    assertRawHover(content, 5, 5, "a");
                    assertRawHover(content, 6, 5, "b");
                    assertRawHover(content, 6, 15, "a");
                    assertRawHover(content, 7, 10, "b");
                });

				/**
				 * ENV aa=x
				 * ENV aa=y bb=$aa
				 * ENV cc=$aa
				 */
                it("$var", function () {
                    let content = "ENV aa=x\nENV aa=y bb=$aa\nENV cc=$aa";
                    assertRawHover(content, 0, 5, "x");
                    assertRawHover(content, 1, 5, "y");
                    assertRawHover(content, 1, 14, "x");
                    assertRawHover(content, 2, 9, "y");

                    content =
                        "FROM alpine\nENV aa=x\nENV aa=y bb=$aa\nENV cc=$aa\n" +
                        "FROM alpine\nENV cc=$aa"
                        ;
                    assertRawHover(content, 1, 5, "x");
                    assertRawHover(content, 2, 5, "y");
                    assertRawHover(content, 2, 14, "x");
                    assertRawHover(content, 3, 9, "y");
                    assertNullHover(content, 5, 9);

                    content =
                        "FROM alpine\nENV aa=x\nENV aa=y bb=$aa\nENV cc=$aa\n" +
                        "FROM alpine\nENV aa=a\nENV aa=b bb=$aa\nENV cc=$aa"
                        ;
                    assertRawHover(content, 1, 5, "x");
                    assertRawHover(content, 2, 5, "y");
                    assertRawHover(content, 2, 14, "x");
                    assertRawHover(content, 3, 10, "y");
                    assertRawHover(content, 5, 5, "a");
                    assertRawHover(content, 6, 5, "b");
                    assertRawHover(content, 6, 14, "a");
                    assertRawHover(content, 7, 10, "b");
                });
            });

            describe("multiple variables", function () {
                it("${var}", function () {
                    let content = "ENV var=value var2=value2\nRUN echo ${var} ${var2}";
                    assertRawHover(content, 0, 6, "value");
                    assertRawHover(content, 1, 12, "value");
                    assertRawHover(content, 0, 16, "value2");
                    assertRawHover(content, 1, 20, "value2");

                    content = "ENV var=value \\\nvar2=value2 \\\nvar3=value3\nRUN echo ${var} ${var2} ${var3}";
                    assertRawHover(content, 0, 6, "value");
                    assertRawHover(content, 3, 12, "value");
                    assertRawHover(content, 1, 2, "value2");
                    assertRawHover(content, 3, 20, "value2");
                    assertRawHover(content, 2, 2, "value3");
                    assertRawHover(content, 3, 28, "value3");
                });

                it("$var", function () {
                    let content = "ENV var=value var2=value2\nRUN echo $var $var2";
                    assertRawHover(content, 0, 6, "value");
                    assertRawHover(content, 1, 11, "value");
                    assertRawHover(content, 0, 16, "value2");
                    assertRawHover(content, 1, 17, "value2");

                    content = "ENV var=value \\\nvar2=value2 \\\nvar3=value3\nRUN echo $var $var2 $var3";
                    assertRawHover(content, 0, 6, "value");
                    assertRawHover(content, 3, 11, "value");
                    assertRawHover(content, 1, 2, "value2");
                    assertRawHover(content, 3, 16, "value2");
                    assertRawHover(content, 2, 2, "value3");
                    assertRawHover(content, 3, 22, "value3");
                });
            });

            describe("escaped whitespace value", function () {
                it("ENV var=\\", function () {
                    let content = "ENV var=\\";
                    assertRawHover(content, 0, 6, "");

                    content = "ENV var=\\ ";
                    assertRawHover(content, 0, 6, "");

                    content = "ENV var=\\  ";
                    assertRawHover(content, 0, 6, "");
                });

                it("ENV var=\\  var2=\\", function () {
                    let content = "ENV var=\\  var2=\\";
                    assertRawHover(content, 0, 6, " ");
                    assertRawHover(content, 0, 13, "");

                    content = "ENV var=\\  var2=\\ ";
                    assertRawHover(content, 0, 6, " ");
                    assertRawHover(content, 0, 13, "");

                    content = "ENV var=\\  var2=\\  ";
                    assertRawHover(content, 0, 6, " ");
                    assertRawHover(content, 0, 13, "");
                });

                it("ENV var=\\   var2=\\", function () {
                    let content = "ENV var=\\   var2=\\";
                    assertRawHover(content, 0, 6, " ");
                    assertRawHover(content, 0, 14, "");

                    content = "ENV var=\\   var2=\\ ";
                    assertRawHover(content, 0, 6, " ");
                    assertRawHover(content, 0, 14, "");

                    content = "ENV var=\\   var2=\\  ";
                    assertRawHover(content, 0, 6, " ");
                    assertRawHover(content, 0, 14, "");
                });

                it("ENV var=\\ \\  var2=\\", function () {
                    let content = "ENV var=\\ \\  var2=\\";
                    assertRawHover(content, 0, 6, "  ");
                    assertRawHover(content, 0, 13, "");
                });

                it("ENV var=y\\  ", function () {
                    let content = "ENV var=y\\  ";
                    assertRawHover(content, 0, 6, "y");
                });
            });

            describe("escaped single quote", function () {
                it("ENV var='\\'", function () {
                    let content = "ENV var='\\'";
                    assertRawHover(content, 0, 6, "\\");
                });

                it("ENV var='\\\\'", function () {
                    let content = "ENV var='\\\\'";
                    assertRawHover(content, 0, 6, "\\\\");
                });

                it("ENV var='a\\\\nb'", function () {
                    let content = "ENV var='a\\\nb'";
                    assertRawHover(content, 0, 6, "ab");
                });

                it("ENV var='a\\ \\nb'", function () {
                    let content = "ENV var='a\\ \nb'";
                    assertRawHover(content, 0, 6, "ab");
                });

                it("ENV var='a\\  \\r\\nb'", function () {
                    let content = "ENV var='a\\  \r\nb'";
                    assertRawHover(content, 0, 6, "ab");
                });
            });

            describe("escaped double quotes", function () {
                it("ENV var=\"\\\"x\\\"\"", function () {
                    let content = "ENV var=\"\\\"x\\\"\"";
                    assertRawHover(content, 0, 6, "\"x\"");
                });

                it("ENV var='\"\\\"'", function () {
                    let content = "ENV var='\"\\\"'";
                    assertRawHover(content, 0, 6, "\"\\\"");
                });

                it("ENV var=\"a\\\\nb\"", function () {
                    let content = "ENV var=\"a\\\nb\"";
                    assertRawHover(content, 0, 6, "ab");
                });

                it("ENV var=\"a\\ \\nb\"", function () {
                    let content = "ENV var=\"a\\ \nb\"";
                    assertRawHover(content, 0, 6, "ab");
                });

                it("ENV var=\"a\\  \\r\\nb\"", function () {
                    let content = "ENV var=\"a\\  \r\nb\"";
                    assertRawHover(content, 0, 6, "ab");
                });
            });

            describe("comments", function () {
                it("embedded in escaped line", function () {
                    let content = "ENV var=value \\\n# comment\nvar2=value2";
                    assertRawHover(content, 0, 6, "value");
                    assertRawHover(content, 2, 2, "value2");

                    content = "ENV var=value \\\nvar2=\"#\" var3=value3\n";
                    assertRawHover(content, 0, 6, "value");
                    assertRawHover(content, 1, 2, "#");
                    assertRawHover(content, 1, 11, "value3");

                    content = "ENV var=value \\\nvar2=# var3=value3 \\\nvar4=value4";
                    assertRawHover(content, 0, 6, "value");
                    assertRawHover(content, 1, 2, "#");
                    assertRawHover(content, 1, 10, "value3");
                    assertRawHover(content, 2, 2, "value4");

                    content = "FROM node\nENV var=value \\\n# comment\n# comment\nvar2=value2";
                    assertRawHover(content, 1, 6, "value");
                    assertRawHover(content, 4, 2, "value2");

                    content = "FROM node\nENV var=value \\\n# var2=value2";
                    assertRawHover(content, 1, 6, "value");
                    assertNullHover(content, 2, 4);
                });
            });
        });

        function createHealthcheckTest(trigger: boolean) {
            let onbuild = trigger ? "ONBUILD " : "";
            let triggerOffset = onbuild.length;

            describe("HEALTHCHECK", function () {
                it("--interval", function () {
                    let content = onbuild + "HEALTHCHECK --interval";
                    assertHover(content, 0, triggerOffset + 17, "HEALTHCHECK_FlagInterval");
                });

                it("--interval=\\$x", function () {
                    let content = onbuild + "HEALTHCHECK --interval=\\$x";
                    assertHover(content, 0, triggerOffset + 17, "HEALTHCHECK_FlagInterval");
                });

                it("--interval=\\a", function () {
                    let content = onbuild + "HEALTHCHECK --interval=\\a";
                    assertHover(content, 0, triggerOffset + 17, "HEALTHCHECK_FlagInterval");
                });

                it("--retries", function () {
                    let content = onbuild + "HEALTHCHECK --retries";
                    assertHover(content, 0, triggerOffset + 17, "HEALTHCHECK_FlagRetries");
                });

                it("--start-period", function () {
                    let content = onbuild + "HEALTHCHECK --start-period";
                    assertHover(content, 0, triggerOffset + 17, "HEALTHCHECK_FlagStartPeriod");
                });

                it("--timeout", function () {
                    let content = onbuild + "HEALTHCHECK --timeout";
                    assertHover(content, 0, triggerOffset + 17, "HEALTHCHECK_FlagTimeout");
                });

                it("--TIMEOUT", function () {
                    let content = onbuild + "HEALTHCHECK --TIMEOUT";
                    assertNullHover(content, 0, triggerOffset + 17);
                });

                it("whitespace", function () {
                    let content = onbuild + "HEALTHCHECK  --timeout";
                    assertNullHover(content, 0, triggerOffset + 12);
                });

                function createFlagsAfterTest(subcommand: string) {
                    it("flags after " + subcommand, function () {
                        let content = onbuild + "HEALTHCHECK " + subcommand + " \\\n--interval=30s\\\n--retries=3\\\n--start-period=30s\\\n--timeout=30s";
                        assertNullHover(content, 1, 4);
                        assertNullHover(content, 2, 4);
                        assertNullHover(content, 3, 4);
                        assertNullHover(content, 4, 4);
                    });
                }

                createFlagsAfterTest("CMD");
                createFlagsAfterTest("NONE");
            });
        }

        createHealthcheckTest(false);

        describe("ONBUILD", function () {
            createAddTest(true);
            createCopyTest(true);
            createHealthcheckTest(true);
        });
    });

    describe("ARG and ENV", function () {
        describe("same variable name", function () {

			/**
			 * ARG aa=b
			 * ENV aa=c
			 * ARG aa=d
			 * RUN echo ${aa}
			 */
            it("${var}", function () {
                let content = "ARG aa=b\nENV aa=c\nARG aa=d\nRUN echo ${aa}";
                assertRawHover(content, 3, 11, "c");

                content =
                    "FROM alpine\nARG aa=b\nENV aa=c\nARG aa=d\nRUN echo ${aa}\n" +
                    "FROM alpine\nRUN echo ${aa}"
                    ;
                assertRawHover(content, 4, 11, "c");
                assertNullHover(content, 6, 11);

                content =
                    "FROM alpine\nARG aa=b\nENV aa=c\nARG aa=d\nRUN echo ${aa}\n" +
                    "FROM alpine\nARG aa=e\nENV aa=f\nARG aa=g\nRUN echo ${aa}"
                    ;
                assertRawHover(content, 4, 11, "c");
                assertRawHover(content, 9, 11, "f");
            });

			/**
			 * ARG aa=b
			 * ENV aa=c
			 * ARG aa=d
			 * RUN echo $aa
			 */
            it("${var}", function () {
                let content = "ARG aa=b\nENV aa=c\nARG aa=d\nRUN echo $aa";
                assertRawHover(content, 3, 10, "c");

                content =
                    "FROM alpine\nARG aa=b\nENV aa=c\nARG aa=d\nRUN echo $aa\n" +
                    "FROM alpine\nRUN echo ${aa}"
                    ;
                assertRawHover(content, 4, 10, "c");
                assertNullHover(content, 6, 10);

                content =
                    "FROM alpine\nARG aa=b\nENV aa=c\nARG aa=d\nRUN echo $aa\n" +
                    "FROM alpine\nARG aa=e\nENV aa=f\nARG aa=g\nRUN echo $aa"
                    ;
                assertRawHover(content, 4, 10, "c");
                assertRawHover(content, 9, 10, "f");
            });
        });
    });

    describe("before FROM", function () {
        describe("ARG", function () {
            it("FROM lookup", function () {
                let content = "ARG image=alpine\nFROM $image";
                assertRawHover(content, 0, 6, "alpine");
                assertRawHover(content, 1, 8, "alpine");

                content = "ARG image=alpine\nFROM $image\nFROM $image";
                assertRawHover(content, 0, 6, "alpine");
                assertRawHover(content, 1, 8, "alpine");
                assertRawHover(content, 2, 6, "alpine");
            });

            it("reused variable name", function () {
                let content = "ARG image=alpine\nFROM $image\nARG image=alpine2";
                assertRawHover(content, 0, 6, "alpine");
                assertRawHover(content, 1, 8, "alpine");
                assertRawHover(content, 2, 6, "alpine2");

                content = "ARG image=alpine\nFROM $image\nARG image=alpine2\nFROM $image";
                assertRawHover(content, 0, 6, "alpine");
                assertRawHover(content, 1, 8, "alpine");
                assertRawHover(content, 2, 6, "alpine2");
                assertRawHover(content, 3, 8, "alpine");

                content = "ARG image=alpine\nFROM $image\nFROM $image\nARG image=alpine2";
                assertRawHover(content, 0, 6, "alpine");
                assertRawHover(content, 1, 8, "alpine");
                assertRawHover(content, 2, 6, "alpine");
                assertRawHover(content, 3, 8, "alpine2");
            });

            it("scoped", function () {
                let content = "ARG image=alpine\nFROM alpine\nRUN echo $image";
                assertNullHover(content, 2, 12);
            });

            it("non-existent variable", function () {
                let content = "FROM $image\nARG image";
                assertNullHover(content, 0, 8);

                content = "ARG\nFROM $image";
                assertNullHover(content, 1, 8);

                content = "ARG image=alpine\nFROM $image2\nARG image2=alpine2";
                assertRawHover(content, 0, 6, "alpine");
                assertNullHover(content, 1, 8);
                assertRawHover(content, 2, 6, "alpine2");
            });
        });

        describe("ENV", function () {
            it("FROM lookup", function () {
                let content = "ENV image=alpine\nFROM $image";
                assertRawHover(content, 0, 6, "alpine");
                assertNullHover(content, 1, 8);

                content = "ENV image=alpine\nFROM $image\nFROM $image";
                assertRawHover(content, 0, 6, "alpine");
                assertNullHover(content, 1, 8);
                assertNullHover(content, 2, 8);
            });

            it("reused variable name", function () {
                let content = "ENV image=alpine\nFROM $image\nENV image=alpine2";
                assertRawHover(content, 0, 6, "alpine");
                assertNullHover(content, 1, 8);
                assertRawHover(content, 2, 6, "alpine2");

                content = "ENV image=alpine\nFROM $image\nENV image=alpine2\nFROM $image";
                assertRawHover(content, 0, 6, "alpine");
                assertNullHover(content, 1, 8);
                assertRawHover(content, 2, 6, "alpine2");
                assertNullHover(content, 3, 8);

                content = "ENV image=alpine\nFROM $image\nFROM $image\nENV image=alpine2";
                assertRawHover(content, 0, 6, "alpine");
                assertNullHover(content, 1, 8);
                assertNullHover(content, 2, 8);
                assertRawHover(content, 3, 6, "alpine2");
            });

            it("scoped", function () {
                let content = "ENV image=alpine\nFROM alpine\nRUN echo $image";
                assertNullHover(content, 2, 12);
            });

            it("non-existent variable", function () {
                let content = "FROM $image\nENV image";
                assertNullHover(content, 0, 8);

                content = "ENV\nFROM $image";
                assertNullHover(content, 1, 8);

                content = "ENV image=alpine\nFROM $image2\nENV image2=alpine2";
                assertRawHover(content, 0, 6, "alpine");
                assertNullHover(content, 1, 8);
                assertRawHover(content, 2, 6, "alpine2");
            });
        });
    });

    describe("keyword nesting", function () {
        it("ONBUILD EXPOSE", function () {
            let content = "ONBUILD EXPOSE 8080";
            assertHover(content, 0, 11, "EXPOSE");

            content = "ONBUILD expose 8080";
            assertHover(content, 0, 11, "EXPOSE");

            content = "ONBUILD ExposE 8080";
            assertHover(content, 0, 11, "EXPOSE");
        });

        it("ONBUILD EXPOSE escaped on newline", function () {
            let content = "ONBUILD \\\nEXPOSE 8080";
            assertHover(content, 1, 3, "EXPOSE");

            content = "ONBUILD \\\r\nEXPOSE 8080";
            assertHover(content, 1, 3, "EXPOSE");

            content = "#escape=`\nONBUILD \\\nEXPOSE 8080";
            assertHover(content, 2, 3, "EXPOSE");
        });

        it("ONBUILD EXPOSE escaped on newline with space", function () {
            let content = "ONBUILD \\\n EXPOSE 8080";
            assertHover(content, 1, 4, "EXPOSE");
        });

        it("ONBUILD EXPOSE incomplete", function () {
            let content = "ONBUILD EXPOSE";
            assertHover(content, 0, 9, "EXPOSE");

            content = "ONBUILD EXPOSE\n";
            assertHover(content, 0, 9, "EXPOSE");

            content = "ONBUILD EXPOSE\r";
            assertHover(content, 0, 9, "EXPOSE");

            content = "ONBUILD EXPOSE\r\n";
            assertHover(content, 0, 9, "EXPOSE");
        });

        it("ONBUILD EXP\\OSE", function () {
            let content = "ONBUILD EXPOS\\E";
            assertNullHover(content, 0, 9);
        });

        it("ONBUILD with no trigger", function () {
            let content = "ONBUILD   \r\n";
            assertNullHover(content, 0, 9);
        });

        it("invalid nesting", function () {
            let content = "RUN EXPOSE 8080";
            assertNullHover(content, 0, 7);

            content = " RUN EXPOSE 8080";
            assertNullHover(content, 0, 8);

            content = "\tRUN EXPOSE 8080";
            assertNullHover(content, 0, 8);

            content = "\r\nRUN EXPOSE 8080";
            assertNullHover(content, 1, 7);

            content = "\rRUN EXPOSE 8080";
            assertNullHover(content, 1, 7);

            content = "\nRUN EXPOSE 8080";
            assertNullHover(content, 1, 7);
        });
    });
});
