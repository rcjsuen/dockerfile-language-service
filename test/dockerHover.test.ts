/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as assert from "assert";

import { TextDocument, Hover, Position } from 'vscode-languageserver-types';
import { MarkdownDocumentation } from '../src/dockerMarkdown';
import { DockerfileLanguageServiceFactory } from '../src/main';

const markdownDocumentation = new MarkdownDocumentation();
const service = DockerfileLanguageServiceFactory.createLanguageService();

function onHover(content: string, line: number, character: number): Hover | null {
    return service.computeHover(content, Position.create(line, character));
}

describe("Dockerfile hover", function () {
    describe("whitespace", function () {
        it("empty file", function () {
            let content = "";
            let hover = onHover(content, 0, 0);
            assert.equal(hover, null);
        });

        it("spaces", function () {
            let content = "    ";
            let hover = onHover(content, 0, 2);
            assert.equal(hover, null);
        });

        it("tabs", function () {
            let content = "\t\t\t\t";
            let hover = onHover(content, 0, 2);
            assert.equal(hover, null);
        });
    });

    describe("comments", function () {
        it("# FROM node", function () {
            let content = "# FROM node";
            let hover = onHover(content, 0, 0);
            assert.equal(hover, null);
            hover = onHover(content, 0, 2);
            assert.equal(hover, null);
            hover = onHover(content, 0, 4);
            assert.equal(hover, null);
            hover = onHover(content, 0, 6);
            assert.equal(hover, null);
        });
    });

    describe("directives", function () {
        it("escape", function () {
            let content = "#escape=`";
            let hover = onHover(content, 0, 4);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("escape").contents);
            assert.equal(hover.range, undefined);

            content = "# escape=`";
            hover = onHover(content, 0, 1);
            assert.equal(hover, null);
        });

        it("invalid directive definition", function () {
            let content = "#eskape=`";
            let hover = onHover(content, 0, 4);
            assert.equal(hover, null);

            content = "#escape ";
            hover = onHover(content, 0, 4);
            assert.equal(hover, null);

            content = "#escape=";
            hover = onHover(content, 0, 4);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("escape").contents);
            assert.equal(hover.range, undefined);

            content = "#escape=ab";
            hover = onHover(content, 0, 4);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("escape").contents);
            assert.equal(hover.range, undefined);

            content = "#escape\t";
            hover = onHover(content, 0, 4);
            assert.equal(hover, null);

            content = "#escape\r\n";
            hover = onHover(content, 0, 4);
            assert.equal(hover, null);

            content = "#escape\n";
            hover = onHover(content, 0, 4);
            assert.equal(hover, null);

            content = "\n#escape";
            hover = onHover(content, 1, 4);
            assert.equal(hover, null);

            content = "\r\n#escape";
            hover = onHover(content, 1, 4);
            assert.equal(hover, null);
        });
    });

    describe("keywords", function () {
        it("FROM", function () {
            let content = "FROM node";
            let hover = onHover(content, 0, 2);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("FROM").contents);
            assert.equal(hover.range, undefined);
        });

        it("froM", function () {
            let content = "froM node";
            let hover = onHover(content, 0, 2);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("FROM").contents);
            assert.equal(hover.range, undefined);
        });

        it("fr\\\\noM", function () {
            let content = "fr\\\noM node";
            let hover = onHover(content, 0, 0);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("FROM").contents);
            assert.equal(hover.range, undefined);

            hover = onHover(content, 0, 1);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("FROM").contents);
            assert.equal(hover.range, undefined);

            hover = onHover(content, 1, 1);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("FROM").contents);
            assert.equal(hover.range, undefined);

            hover = onHover(content, 1, 1);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("FROM").contents);
            assert.equal(hover.range, undefined);
        });

        it("fr\\\\r\\noM", function () {
            let content = "fr\\\r\noM node";
            let hover = onHover(content, 0, 0);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("FROM").contents);
            assert.equal(hover.range, undefined);

            hover = onHover(content, 0, 1);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("FROM").contents);
            assert.equal(hover.range, undefined);

            hover = onHover(content, 1, 0);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("FROM").contents);
            assert.equal(hover.range, undefined);

            hover = onHover(content, 1, 1);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("FROM").contents);
            assert.equal(hover.range, undefined);
        });

        it("HEALTHCHECK NONE", function () {
            let content = "HEALTHCHECK NONE";
            let hover = onHover(content, 0, 14);
            assert.equal(hover, null);
        });

        it("newlines", function () {
            let content = "FROM node\nEXPOSE 8081";
            let hover = onHover(content, 1, 4);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("EXPOSE").contents);
            assert.equal(hover.range, undefined);

            content = "FROM node\r\nEXPOSE 8081";
            hover = onHover(content, 1, 4);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("EXPOSE").contents);
            assert.equal(hover.range, undefined);
        });

        it("invalid escape", function () {
            let content = "FR\\OM node";
            let hover = onHover(content, 0, 1);
            assert.equal(hover, null);

            hover = onHover(content, 0, 3);
            assert.equal(hover, null);
        });

        it("unknown", function () {
            let content = "3";
            let hover = onHover(content, 0, 0);
            assert.equal(hover, null);
            hover = onHover(content, 0, 1);
            assert.equal(hover, null);

            content = "UNKNOWN arg";
            hover = onHover(content, 0, 0);
            assert.equal(hover, null);
            hover = onHover(content, 0, 4);
            assert.equal(hover, null);
            hover = onHover(content, 0, 7);
            assert.equal(hover, null);
        });

        function createAddTest(trigger: boolean) {
            let onbuild = trigger ? "ONBUILD " : "";
            let triggerOffset = onbuild.length;

            describe("ADD", function () {
                it("--chown", function () {
                    let content = onbuild + "ADD --chown";
                    let hover = onHover(content, 0, triggerOffset + 9);
                    assert.notEqual(hover, null);
                    assert.equal(hover.contents, markdownDocumentation.getMarkdown("ADD_FlagChown").contents);
                    assert.equal(hover.range, undefined);
                });

                it("--chown=\\$user", function () {
                    let content = onbuild + "ADD --chown=\\$user";
                    let hover = onHover(content, 0, triggerOffset + 9);
                    assert.notEqual(hover, null);
                    assert.equal(hover.contents, markdownDocumentation.getMarkdown("ADD_FlagChown").contents);
                    assert.equal(hover.range, undefined);
                });

                it("--chown=\\root", function () {
                    let content = onbuild + "ADD --chown=\\root";
                    let hover = onHover(content, 0, triggerOffset + 9);
                    assert.notEqual(hover, null);
                    assert.equal(hover.contents, markdownDocumentation.getMarkdown("ADD_FlagChown").contents);
                    assert.equal(hover.range, undefined);
                });

                it("--CHOWN", function () {
                    let content = onbuild + "ADD --FROM";
                    let hover = onHover(content, 0, triggerOffset + 9);
                    assert.equal(hover, null);
                });

                it("whitespace", function () {
                    let content = onbuild + "ADD  --from";
                    let hover = onHover(content, 0, triggerOffset + 5);
                    assert.equal(hover, null);
                });

                it("flag after", function () {
                    let content = onbuild + "ADD app --chown=root app";
                    let hover = onHover(content, 0, triggerOffset + 13);
                    assert.equal(hover, null);

                    content = onbuild + "ADD app app --chown=root";
                    hover = onHover(content, 0, triggerOffset + 17);
                    assert.equal(hover, null);
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
                    assert.equal(hover.contents, "y");

                    content = instruction + " z" + delimiter + "#";
                    hover = onHover(content, 0, 5);
                    assert.equal(hover.contents, "#");

                    content = instruction + " e" + delimiter + "'f g=h'";
                    hover = onHover(content, 0, 5);
                    assert.equal(hover.contents, "f g=h");

                    content = instruction + " x" + delimiter + "\"v v=w\"";
                    hover = onHover(content, 0, 5);
                    assert.equal(hover.contents, "v v=w");
                });

                it("variable value", function () {
                    let content = instruction + " z" + delimiter + "y";
                    let hover = onHover(content, 0, 6);
                    assert.equal(hover, null);
                });

                it("no variable value", function () {
                    let content = instruction + " z";
                    let hover = onHover(content, 0, 5);
                    assert.equal(hover, null);
                });

                it("empty variable value", function () {
                    let content = instruction + " z" + delimiter + "";
                    let hover = onHover(content, 0, 5);
                    if (delimiter === " ") {
                        assert.equal(hover, null);
                    } else {
                        assert.equal(hover.contents, "");
                    }
                });

                it("whitespace variable value", function () {
                    let content = instruction + " z" + delimiter + "   \t\t   ";
                    let hover = onHover(content, 0, 5);
                    if (delimiter === " ") {
                        assert.equal(hover, null);
                    } else {
                        assert.equal(hover.contents, "");
                    }
                });

                it("escaped", function () {
                    let content = instruction + " \\ \t\nz" + delimiter + "y";
                    let hover = onHover(content, 1, 0);
                    assert.equal(hover.contents, "y");

                    content = instruction + " \\ \t\r\nz" + delimiter + "y";
                    hover = onHover(content, 1, 0);
                    assert.equal(hover.contents, "y");

                    content = instruction + " z" + delimiter + "y \\ \t\n \t";
                    hover = onHover(content, 0, 5);
                    assert.equal(hover.contents, "y");

                    content = instruction + " z" + delimiter + "y \\ \t\r \t";
                    hover = onHover(content, 0, 5);
                    assert.equal(hover.contents, "y");

                    content = instruction + " z" + delimiter + "y \\ \t\r\n \t";
                    hover = onHover(content, 0, 5);
                    assert.equal(hover.contents, "y");

                    content = instruction + " z" + delimiter + "\\\ny";
                    hover = onHover(content, 0, 5);
                    assert.equal(hover.contents, "y");

                    content = instruction + " z" + delimiter + "\\\n'y'";
                    hover = onHover(content, 0, 5);
                    assert.equal(hover.contents, "y");

                    content = instruction + " z" + delimiter + "\\\n\"y\"";
                    hover = onHover(content, 0, 5);
                    assert.equal(hover.contents, "y");

                    hover = onHover(instruction + " a" + delimiter + "\\", 0, 5);
                    if (delimiter === " ") {
                        // just the escape character at EOF, so considered to be the empty string
                        assert.equal(hover, null);
                    } else {
                        assert.equal(hover.contents, "");
                    }

                    hover = onHover(instruction + " a" + delimiter + "a\\ x", 0, 5);
                    assert.equal(hover.contents, "a x");

                    hover = onHover(instruction + " a" + delimiter + "a\\\nx", 0, 5);
                    assert.equal(hover.contents, "ax");

                    hover = onHover(instruction + " a" + delimiter + "a\\\r\nx", 0, 5);
                    assert.equal(hover.contents, "ax");

                    hover = onHover(instruction + " a" + delimiter + "a\\  \nx", 0, 5);
                    assert.equal(hover.contents, "ax");

                    hover = onHover(instruction + " a" + delimiter + "a\\  \t\t\r\nx", 0, 5);
                    assert.equal(hover.contents, "ax");

                    hover = onHover(instruction + " a" + delimiter + "\\b", 0, 5);
                    assert.equal(hover.contents, "b");

                    hover = onHover(instruction + " a" + delimiter + "\\\\b", 0, 5);
                    assert.equal(hover.contents, "\\b");

                    hover = onHover(instruction + " a" + delimiter + "\\\\\\\\\\b", 0, 5);
                    assert.equal(hover.contents, "\\\\b");

                    hover = onHover(instruction + " var" + delimiter + "a\\\n# comment\nbc", 0, 6);
                    assert.equal(hover.contents, "abc");

                    hover = onHover(instruction + " var" + delimiter + "a\\\r\n# comment\r\nbc", 0, 6);
                    assert.equal(hover.contents, "abc");

                    hover = onHover(instruction + " var" + delimiter + "\\\n# comment\nabc", 0, 6);
                    assert.equal(hover.contents, "abc");

                    hover = onHover(instruction + " var" + delimiter + "\\\r\n# comment\r\nabc", 0, 6);
                    assert.equal(hover.contents, "abc");
                });

                it("escape in literals", function () {
                    let hover = onHover(instruction + " a" + delimiter + "\"a\\ x\"", 0, 5);
                    assert.equal(hover.contents, "a\\ x");

                    hover = onHover(instruction + " a" + delimiter + "'a\\ x'", 0, 5);
                    assert.equal(hover.contents, "a\\ x");

                    hover = onHover(instruction + " a" + delimiter + "\"a \\x\"", 0, 5);
                    assert.equal(hover.contents, "a \\x");

                    hover = onHover(instruction + " a" + delimiter + "\"a \\\\x\"", 0, 5);
                    assert.equal(hover.contents, "a \\x");

                    hover = onHover(instruction + " a" + delimiter + "\"a \\\\ x\"", 0, 5);
                    assert.equal(hover.contents, "a \\ x");

                    hover = onHover(instruction + " a" + delimiter + "\"a \\\\\\x\"", 0, 5);
                    assert.equal(hover.contents, "a \\\\x");

                    hover = onHover(instruction + " a" + delimiter + "\"a \\\\\\ x\"", 0, 5);
                    assert.equal(hover.contents, "a \\\\ x");

                    hover = onHover(instruction + " a" + delimiter + "\"a \\\nx\"", 0, 5);
                    assert.equal(hover.contents, "a x");

                    hover = onHover(instruction + " a" + delimiter + "\"\\\\\\\\x\"", 0, 5);
                    assert.equal(hover.contents, "\\\\x");

                    hover = onHover(instruction + " a" + delimiter + "\"\\\\\\\\\\x\"", 0, 5);
                    assert.equal(hover.contents, "\\\\\\x");

                    hover = onHover(instruction + " a" + delimiter + "\"\\\\\\\\\\\\x\"", 0, 5);
                    assert.equal(hover.contents, "\\\\\\x");

                    hover = onHover(instruction + " a" + delimiter + "'a \\\nx'", 0, 5);
                    assert.equal(hover.contents, "a x");

                    hover = onHover(instruction + " var" + delimiter + "\"abc\\ #def\"", 0, 6);
                    assert.equal(hover.contents, "abc\\ #def");

                    hover = onHover(instruction + " var" + delimiter + "\"value \\\n# comment\nvalue2\"", 0, 6);
                    assert.equal(hover.contents, "value value2");

                    hover = onHover(instruction + " var" + delimiter + "\"value \\ \t\n# comment\nvalue2\"", 0, 6);
                    assert.equal(hover.contents, "value value2");

                    hover = onHover(instruction + " var" + delimiter + "\"abc\\\n #comment\n #comment\ndef\"", 0, 6);
                    assert.equal(hover.contents, "abcdef");

                    hover = onHover(instruction + " var" + delimiter + "\"abc\\\r\n #comment\r\n #comment\r\ndef\"", 0, 6);
                    assert.equal(hover.contents, "abcdef");

                    hover = onHover(instruction + " var" + delimiter + "'abc\\\n #comment\n #comment\ndef'", 0, 6);
                    assert.equal(hover.contents, "abcdef");

                    hover = onHover(instruction + " var" + delimiter + "'abc\\\r\n #comment\r\n #comment\r\ndef'", 0, 6);
                    assert.equal(hover.contents, "abcdef");
                });

                it("no variable", function () {
                    let content = instruction + "    ";
                    let hover = onHover(content, 0, 5);
                    assert.equal(hover, null);
                });

                it("referenced variable ${var}", function () {
                    let content = instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}";
                    let hover = onHover(content, 1, 13);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 2, 7);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 3, 11);
                    assert.equal(hover.contents, "value");

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}\n" +
                        "FROM alpine\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}"
                        ;
                    hover = onHover(content, 2, 13);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 3, 7);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 4, 11);
                    assert.equal(hover.contents, "value");
                    assert.equal(onHover(content, 6, 13), null);
                    assert.equal(onHover(content, 7, 7), null);
                    assert.equal(onHover(content, 8, 11), null);

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}\n" +
                        "FROM alpine\n" + instruction + " var" + delimiter + "value2\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}"
                        ;
                    hover = onHover(content, 2, 13);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 3, 7);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 4, 11);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 7, 13);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 8, 7);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 9, 11);
                    assert.equal(hover.contents, "value2");

                    content = instruction + " var" + delimiter + "value\nARG var2=value2\nSTOPSIGNAL ${var}${var2}\nUSER ${var}${var2}\nWORKDIR ${var}${var2}";
                    hover = onHover(content, 2, 13);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 2, 20);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 3, 7);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 3, 14);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 4, 11);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 4, 18);
                    assert.equal(hover.contents, "value2");

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nARG var2=value2\nSTOPSIGNAL ${var}${var2}\nUSER ${var}${var2}\nWORKDIR ${var}${var2}\n" +
                        "FROM alpine\nSTOPSIGNAL ${var}${var2}\nUSER ${var}${var2}\nWORKDIR ${var}${var2}"
                        ;
                    hover = onHover(content, 3, 13);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 3, 20);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 4, 7);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 4, 14);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 5, 11);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 5, 18);
                    assert.equal(hover.contents, "value2");
                    assert.equal(onHover(content, 7, 13), null);
                    assert.equal(onHover(content, 7, 20), null);
                    assert.equal(onHover(content, 8, 7), null);
                    assert.equal(onHover(content, 8, 14), null);
                    assert.equal(onHover(content, 9, 11), null);
                    assert.equal(onHover(content, 9, 18), null);

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nARG var2=value2\nSTOPSIGNAL ${var}${var2}\nUSER ${var}${var2}\nWORKDIR ${var}${var2}\n" +
                        "FROM alpine\n" + instruction + " var" + delimiter + "value3\nARG var2=value4\nSTOPSIGNAL ${var}${var2}\nUSER ${var}${var2}\nWORKDIR ${var}${var2}"
                        ;
                    hover = onHover(content, 3, 13);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 3, 20);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 4, 7);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 4, 14);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 5, 11);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 5, 18);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 9, 13);
                    assert.equal(hover.contents, "value3");
                    hover = onHover(content, 9, 20);
                    assert.equal(hover.contents, "value4");
                    hover = onHover(content, 10, 7);
                    assert.equal(hover.contents, "value3");
                    hover = onHover(content, 10, 14);
                    assert.equal(hover.contents, "value4");
                    hover = onHover(content, 11, 11);
                    assert.equal(hover.contents, "value3");
                    hover = onHover(content, 11, 18);
                    assert.equal(hover.contents, "value4");
                });

                it("referenced variable ${var} no value", function () {
                    let content = instruction + " var\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}";
                    let hover = onHover(content, 1, 13);
                    assert.equal(hover, null);
                    hover = onHover(content, 2, 7);
                    assert.equal(hover, null);
                    hover = onHover(content, 3, 11);
                    assert.equal(hover, null);
                });

                it("referenced variable ${var} empty value", function () {
                    let content = instruction + " var" + delimiter + "\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}";
                    let hover = onHover(content, 1, 13);
                    assert.equal(space ? hover : hover.contents, space ? null : "");
                    hover = onHover(content, 2, 7);
                    assert.equal(space ? hover : hover.contents, space ? null : "");
                    hover = onHover(content, 3, 11);
                    assert.equal(space ? hover : hover.contents, space ? null : "");

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}\n" +
                        "FROM alpine\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}"
                        ;
                    hover = onHover(content, 2, 13);
                    assert.equal(space ? hover : hover.contents, space ? null : "");
                    hover = onHover(content, 3, 7);
                    assert.equal(space ? hover : hover.contents, space ? null : "");
                    hover = onHover(content, 4, 11);
                    assert.equal(space ? hover : hover.contents, space ? null : "");
                    assert.equal(onHover(content, 6, 13), null);
                    assert.equal(onHover(content, 7, 7), null);
                    assert.equal(onHover(content, 8, 11), null);
                });

                it("referenced variable ${var} whitespace", function () {
                    let content = instruction + " var" + delimiter + "   \t\t   \nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}";
                    let hover = onHover(content, 1, 13);
                    assert.equal(space ? hover : hover.contents, space ? null : "");
                    hover = onHover(content, 2, 7);
                    assert.equal(space ? hover : hover.contents, space ? null : "");
                    hover = onHover(content, 3, 11);
                    assert.equal(space ? hover : hover.contents, space ? null : "");

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "   \t\t   \nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}\n" +
                        "FROM alpine\nSTOPSIGNAL ${var}\nUSER ${var}\nWORKDIR ${var}"
                        ;
                    hover = onHover(content, 2, 13);
                    assert.equal(space ? hover : hover.contents, space ? null : "");
                    hover = onHover(content, 3, 7);
                    assert.equal(space ? hover : hover.contents, space ? null : "");
                    hover = onHover(content, 4, 11);
                    assert.equal(space ? hover : hover.contents, space ? null : "");
                    assert.equal(onHover(content, 6, 13), null);
                    assert.equal(onHover(content, 7, 7), null);
                    assert.equal(onHover(content, 8, 11), null);
                });

                it("referenced variable ${var", function () {
                    let content = instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var\nUSER ${var\nWORKDIR ${var";
                    assert.equal(onHover(content, 1, 14), null);
                    assert.equal(onHover(content, 2, 8), null);
                    assert.equal(onHover(content, 3, 11), null);

                    content = "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL ${var\nUSER ${var\nWORKDIR ${var";
                    assert.equal(onHover(content, 2, 14), null);
                    assert.equal(onHover(content, 3, 8), null);
                    assert.equal(onHover(content, 4, 11), null);
                });

                it("referenced variable $var", function () {
                    let content = instruction + " var" + delimiter + "value\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                    let hover = onHover(content, 1, 13);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 2, 7);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 3, 11);
                    assert.equal(hover.contents, "value");

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var\n" +
                        "FROM alpine\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var"
                        ;
                    hover = onHover(content, 2, 13);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 3, 7);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 4, 11);
                    assert.equal(hover.contents, "value");
                    assert.equal(onHover(content, 6, 13), null);
                    assert.equal(onHover(content, 7, 7), null);
                    assert.equal(onHover(content, 8, 11), null);

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var\n" +
                        "FROM alpine\n" + instruction + " var" + delimiter + "value2\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var"
                        ;
                    hover = onHover(content, 2, 13);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 3, 7);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 4, 11);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 7, 13);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 8, 7);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 9, 11);
                    assert.equal(hover.contents, "value2");

                    content = instruction + " var" + delimiter + "value\nARG var2=value2\nSTOPSIGNAL $var$var2\nUSER $var$var2\nWORKDIR $var$var2";
                    hover = onHover(content, 2, 13);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 2, 17);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 3, 7);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 3, 12);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 4, 11);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 4, 15);
                    assert.equal(hover.contents, "value2");

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nARG var2=value2\nSTOPSIGNAL $var$var2\nUSER $var$var2\nWORKDIR $var$var2\n" +
                        "FROM alpine\nSTOPSIGNAL $var$var2\nUSER $var$var2\nWORKDIR $var$var2"
                        ;
                    hover = onHover(content, 3, 13);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 3, 17);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 4, 7);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 4, 12);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 5, 11);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 5, 15);
                    assert.equal(hover.contents, "value2");
                    assert.equal(onHover(content, 7, 13), null);
                    assert.equal(onHover(content, 7, 17), null);
                    assert.equal(onHover(content, 8, 7), null);
                    assert.equal(onHover(content, 8, 12), null);
                    assert.equal(onHover(content, 9, 11), null);
                    assert.equal(onHover(content, 9, 15), null);

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nARG var2=value2\nSTOPSIGNAL $var$var2\nUSER $var$var2\nWORKDIR $var$var2\n" +
                        "FROM alpine\n" + instruction + " var" + delimiter + "value3\nARG var2=value4\nSTOPSIGNAL $var$var2\nUSER $var$var2\nWORKDIR $var$var2"
                        ;
                    hover = onHover(content, 3, 13);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 3, 17);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 4, 7);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 4, 12);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 5, 11);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 5, 15);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 9, 13);
                    assert.equal(hover.contents, "value3");
                    hover = onHover(content, 9, 17);
                    assert.equal(hover.contents, "value4");
                    hover = onHover(content, 10, 7);
                    assert.equal(hover.contents, "value3");
                    hover = onHover(content, 10, 12);
                    assert.equal(hover.contents, "value4");
                    hover = onHover(content, 11, 11);
                    assert.equal(hover.contents, "value3");
                    hover = onHover(content, 11, 15);
                    assert.equal(hover.contents, "value4");
                });

                it("referenced variable $var no value", function () {
                    let content = instruction + " var\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                    assert.equal(onHover(content, 1, 13), null);
                    assert.equal(onHover(content, 2, 7), null);
                    assert.equal(onHover(content, 3, 11), null);

                    content = "FROM alpine\n" + instruction + " var\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                    assert.equal(onHover(content, 2, 13), null);
                    assert.equal(onHover(content, 3, 7), null);
                    assert.equal(onHover(content, 4, 11), null);
                });

                it("referenced variable $var empty value", function () {
                    let content = instruction + " var" + delimiter + "\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                    let hover = onHover(content, 1, 13);
                    assert.equal(space ? hover : hover.contents, space ? null : "");
                    hover = onHover(content, 2, 7);
                    assert.equal(space ? hover : hover.contents, space ? null : "");
                    hover = onHover(content, 3, 11);
                    assert.equal(space ? hover : hover.contents, space ? null : "");

                    content = "FROM alpine\n" + instruction + " var" + delimiter + "\nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                    hover = onHover(content, 2, 13);
                    assert.equal(space ? hover : hover.contents, space ? null : "");
                    hover = onHover(content, 3, 7);
                    assert.equal(space ? hover : hover.contents, space ? null : "");
                    hover = onHover(content, 4, 11);
                    assert.equal(space ? hover : hover.contents, space ? null : "");
                });

                it("referenced variable $var whitespace", function () {
                    let content = instruction + " var" + delimiter + "   \t\t   \nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                    let hover = onHover(content, 1, 13);
                    assert.equal(space ? hover : hover.contents, space ? null : "");
                    hover = onHover(content, 2, 7);
                    assert.equal(space ? hover : hover.contents, space ? null : "");
                    hover = onHover(content, 3, 11);
                    assert.equal(space ? hover : hover.contents, space ? null : "");

                    content = "FROM alpine\n" + instruction + " var" + delimiter + "   \t\t   \nSTOPSIGNAL $var\nUSER $var\nWORKDIR $var";
                    hover = onHover(content, 2, 13);
                    assert.equal(space ? hover : hover.contents, space ? null : "");
                    hover = onHover(content, 3, 7);
                    assert.equal(space ? hover : hover.contents, space ? null : "");
                    hover = onHover(content, 4, 11);
                    assert.equal(space ? hover : hover.contents, space ? null : "");
                });

                it("referenced variable '$var'", function () {
                    let content = instruction + " var" + delimiter + "value\nRUN echo '$var'";
                    let hover = onHover(content, 1, 12);
                    assert.equal(hover.contents, "value");

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nRUN echo '$var'\n" +
                        "FROM alpine\nRUN echo '$var'"
                        ;
                    hover = onHover(content, 2, 12);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 4, 12);
                    assert.equal(hover, null);

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nRUN echo '$var'\n" +
                        "FROM alpine\n" + instruction + " var" + delimiter + "value2\nRUN echo '$var'"
                        ;
                    hover = onHover(content, 2, 12);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 5, 12);
                    assert.equal(hover.contents, "value2");
                });

                it("referenced variable \"$var\"", function () {
                    let content = instruction + " var" + delimiter + "value\nRUN echo \"$var\"";
                    let hover = onHover(content, 1, 12);
                    assert.equal(hover.contents, "value");

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nRUN echo \"$var\"\n" +
                        "FROM alpine\nRUN echo \"$var\""
                        ;
                    hover = onHover(content, 2, 12);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 4, 12);
                    assert.equal(hover, null);

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nRUN echo \"$var\"\n" +
                        "FROM alpine\n" + instruction + " var" + delimiter + "value2\nRUN echo \"$var\""
                        ;
                    hover = onHover(content, 2, 12);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 5, 12);
                    assert.equal(hover.contents, "value2");
                });

                it("referenced variable \\${var}", function () {
                    let content = instruction + " var" + delimiter + "value\nSTOPSIGNAL \\${var}\nUSER \\${var}\nWORKDIR \\${var}";
                    assert.equal(onHover(content, 1, 15), null);
                    assert.equal(onHover(content, 2, 10), null);
                    assert.equal(onHover(content, 3, 12), null);

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL \\${var}\nUSER \\${var}\nWORKDIR \\${var}"
                        ;
                    assert.equal(onHover(content, 2, 15), null);
                    assert.equal(onHover(content, 3, 10), null);
                    assert.equal(onHover(content, 4, 12), null);
                });

                it("referenced variable \\$var", function () {
                    let content = instruction + " var" + delimiter + "value\nSTOPSIGNAL \\$var\nUSER \\$var\nWORKDIR \\$var";
                    assert.equal(onHover(content, 1, 14), null);
                    assert.equal(onHover(content, 2, 9), null);
                    assert.equal(onHover(content, 3, 11), null);

                    content =
                        "FROM alpine\n" + instruction + " var" + delimiter + "value\nSTOPSIGNAL \\$var\nUSER \\$var\nWORKDIR \\$var"
                        ;
                    assert.equal(onHover(content, 2, 14), null);
                    assert.equal(onHover(content, 3, 9), null);
                    assert.equal(onHover(content, 4, 11), null);
                });

                it("$var in LABEL value with single quotes", function () {
                    let content = instruction + " var" + delimiter + "value\nLABEL label='$var'";
                    assert.equal(onHover(content, 1, 15), null);
                });

                it("$var in LABEL value with double quotes", function () {
                    let content = instruction + " var" + delimiter + "value\nLABEL label=\"$var\"";
                    let hover = onHover(content, 1, 15);
                    assert.equal(hover.contents, "value");
                });

                it("${var} in LABEL value with single quotes", function () {
                    let content = instruction + " var" + delimiter + "value\nLABEL label='${var}'";
                    assert.equal(onHover(content, 1, 17), null);
                });

                it("${var} in LABEL value with double quotes", function () {
                    let content = instruction + " var" + delimiter + "value\nLABEL label=\"${var}\"";
                    let hover = onHover(content, 1, 17);
                    assert.equal(hover.contents, "value");
                });

                it("multiline reference \\n", function () {
                    let content = instruction + " port=8080\nEXPOSE ${po\\\nrt}";
                    let hover = onHover(content, 2, 0);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 1);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 2);
                    assert.equal(hover.contents, "8080");

                    content = "#escape=`\n" + instruction + " port=8080\nEXPOSE ${po`\nrt}";
                    hover = onHover(content, 3, 0);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 3, 1);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 3, 2);
                    assert.equal(hover.contents, "8080");

                    content = instruction + " port=8080\nEXPOSE $po\\\nrt";
                    hover = onHover(content, 2, 0);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 1);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 2);
                    assert.equal(hover.contents, "8080");

                    content = "#escape=`\n" + instruction + " port=8080\nEXPOSE $po`\nrt";
                    hover = onHover(content, 3, 0);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 3, 1);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 3, 2);
                    assert.equal(hover.contents, "8080");

                    content = instruction + " port=8080\nLABEL key=\"$po\\\nrt\"";
                    hover = onHover(content, 2, 0);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 1);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 2);
                    assert.equal(hover.contents, "8080");
                });

                it("multiline reference \\r\\n", function () {
                    let content = instruction + " port=8080\rnEXPOSE ${po\\\r\nrt}";
                    let hover = onHover(content, 2, 0);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 1);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 2);
                    assert.equal(hover.contents, "8080");

                    content = "#escape=`\n" + instruction + " port=8080\r\nEXPOSE ${po`\r\nrt}";
                    hover = onHover(content, 3, 0);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 3, 1);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 3, 2);
                    assert.equal(hover.contents, "8080");

                    content = instruction + " port=8080\r\nEXPOSE $po\\\r\nrt";
                    hover = onHover(content, 2, 0);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 1);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 2);
                    assert.equal(hover.contents, "8080");

                    content = "#escape=`\n" + instruction + " port=8080\r\nEXPOSE $po`\r\nrt";
                    hover = onHover(content, 3, 0);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 3, 1);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 3, 2);
                    assert.equal(hover.contents, "8080");

                    content = instruction + " port=8080\r\nLABEL key=\"$po\\\r\nrt\"";
                    hover = onHover(content, 2, 0);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 1);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 2);
                    assert.equal(hover.contents, "8080");
                });

                it("multiline reference \\n spaced", function () {
                    let content = instruction + " port=8080\nEXPOSE ${po\\ \t\nrt}";
                    let hover = onHover(content, 2, 0);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 1);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 2);
                    assert.equal(hover.contents, "8080");

                    content = "#escape=`\n" + instruction + " port=8080\nEXPOSE ${po` \t\nrt}";
                    hover = onHover(content, 3, 0);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 3, 1);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 3, 2);
                    assert.equal(hover.contents, "8080");

                    content = instruction + " port=8080\nEXPOSE $po\\ \t\nrt";
                    hover = onHover(content, 2, 0);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 1);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 2);
                    assert.equal(hover.contents, "8080");

                    content = "#escape=`\n" + instruction + " port=8080\nEXPOSE $po` \t\nrt";
                    hover = onHover(content, 3, 0);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 3, 1);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 3, 2);
                    assert.equal(hover.contents, "8080");

                    content = instruction + " port=8080\nLABEL key=\"$po\\ \t\nrt\"";
                    hover = onHover(content, 2, 0);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 1);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 2);
                    assert.equal(hover.contents, "8080");
                });

                it("multiline reference \\r\\n spaced", function () {
                    let content = instruction + " port=8080\r\nEXPOSE ${po\\ \t\r\nrt}";
                    let hover = onHover(content, 2, 0);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 1);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 2);
                    assert.equal(hover.contents, "8080");

                    content = "#escape=`\n" + instruction + " port=8080\r\nEXPOSE ${po` \t\r\nrt}";
                    hover = onHover(content, 3, 0);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 3, 1);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 3, 2);
                    assert.equal(hover.contents, "8080");

                    content = instruction + " port=8080\nEXPOSE $po\\ \t\r\nrt";
                    hover = onHover(content, 2, 0);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 1);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 2);
                    assert.equal(hover.contents, "8080");

                    content = "#escape=`\n" + instruction + " port=8080\nEXPOSE $po` \t\r\nrt";
                    hover = onHover(content, 3, 0);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 3, 1);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 3, 2);
                    assert.equal(hover.contents, "8080");

                    content = instruction + " port=8080\nLABEL key=\"$po\\ \t\r\nrt\"";
                    hover = onHover(content, 2, 0);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 1);
                    assert.equal(hover.contents, "8080");
                    hover = onHover(content, 2, 2);
                    assert.equal(hover.contents, "8080");
                });

                it("$var followed by space", function () {
                    let content = instruction + " var" + delimiter + "value\nLABEL key=\"$var \"";
                    let hover = onHover(content, 1, 14);
                    assert.equal(hover.contents, "value");
                });

                it("$var followed by tab", function () {
                    let content = instruction + " var" + delimiter + "value\nLABEL key=\"$var\t\"";
                    let hover = onHover(content, 1, 14);
                    assert.equal(hover.contents, "value");
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
                        let hover = onHover(content, 0, triggerOffset + 9);
                        assert.notEqual(hover, null);
                        assert.equal(hover.contents, markdownDocumentation.getMarkdown("COPY_FlagFrom").contents);
                        assert.equal(hover.range, undefined);
                    });

                    it("--from=\\$x", function () {
                        let content = onbuild + "COPY --from=\\$x";
                        let hover = onHover(content, 0, triggerOffset + 9);
                        assert.notEqual(hover, null);
                        assert.equal(hover.contents, markdownDocumentation.getMarkdown("COPY_FlagFrom").contents);
                        assert.equal(hover.range, undefined);
                    });

                    it("--from=\\a", function () {
                        let content = onbuild + "COPY --from=\\a";
                        let hover = onHover(content, 0, triggerOffset + 9);
                        assert.notEqual(hover, null);
                        assert.equal(hover.contents, markdownDocumentation.getMarkdown("COPY_FlagFrom").contents);
                        assert.equal(hover.range, undefined);
                    });

                    it("--FROM", function () {
                        let content = onbuild + "COPY --FROM";
                        let hover = onHover(content, 0, triggerOffset + 9);
                        assert.equal(hover, null);
                    });

                    it("flag after", function () {
                        let content = onbuild + "COPY app --from=alpine app";
                        let hover = onHover(content, 0, triggerOffset + 13);
                        assert.equal(hover, null);

                        content = onbuild + "COPY app app --from=alpine";
                        hover = onHover(content, 0, triggerOffset + 18);
                        assert.equal(hover, null);
                    });

                    it("whitespace", function () {
                        let content = onbuild + "COPY  --from";
                        let hover = onHover(content, 0, triggerOffset + 5);
                        assert.equal(hover, null);
                    });
                });

                describe("--chown flag", function () {
                    it("--chown", function () {
                        let content = onbuild + "COPY --chown";
                        let hover = onHover(content, 0, triggerOffset + 9);
                        assert.notEqual(hover, null);
                        assert.equal(hover.contents, markdownDocumentation.getMarkdown("COPY_FlagChown").contents);
                        assert.equal(hover.range, undefined);
                    });

                    it("--chown=\\$user", function () {
                        let content = onbuild + "COPY --chown=\\$x";
                        let hover = onHover(content, 0, triggerOffset + 9);
                        assert.notEqual(hover, null);
                        assert.equal(hover.contents, markdownDocumentation.getMarkdown("COPY_FlagChown").contents);
                        assert.equal(hover.range, undefined);
                    });

                    it("--chown=\\root", function () {
                        let content = onbuild + "COPY --chown=\\a";
                        let hover = onHover(content, 0, triggerOffset + 9);
                        assert.notEqual(hover, null);
                        assert.equal(hover.contents, markdownDocumentation.getMarkdown("COPY_FlagChown").contents);
                        assert.equal(hover.range, undefined);
                    });

                    it("--CHOWN", function () {
                        let content = onbuild + "COPY --CHOWN";
                        let hover = onHover(content, 0, triggerOffset + 9);
                        assert.equal(hover, null);
                    });

                    it("flag after", function () {
                        let content = onbuild + "COPY app --chown=alpine app";
                        let hover = onHover(content, 0, triggerOffset + 13);
                        assert.equal(hover, null);

                        content = onbuild + "COPY app app --chown=alpine";
                        hover = onHover(content, 0, triggerOffset + 18);
                        assert.equal(hover, null);
                    });

                    it("whitespace", function () {
                        let content = onbuild + "COPY  --chown";
                        let hover = onHover(content, 0, triggerOffset + 5);
                        assert.equal(hover, null);
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
                    let hover = onHover(content, 0, 5);
                    assert.equal(hover.contents, "bb cc dd");
                    hover = onHover(content, 1, 12);
                    assert.equal(hover.contents, "bb cc dd");
                    assert.equal(onHover(content, 0, 11), null);
                    assert.equal(onHover(content, 1, 18), null);

                    content =
                        "FROM alpine\nENV aa bb cc dd\nRUN echo ${aa} ${cc}\n" +
                        "FROM alpine\nRUN echo ${aa} ${cc}"
                        ;
                    hover = onHover(content, 1, 5);
                    assert.equal(hover.contents, "bb cc dd");
                    hover = onHover(content, 2, 12);
                    assert.equal(hover.contents, "bb cc dd");
                    assert.equal(onHover(content, 1, 11), null);
                    assert.equal(onHover(content, 2, 18), null);
                    assert.equal(onHover(content, 4, 12), null);
                    assert.equal(onHover(content, 4, 18), null);

                    content =
                        "FROM alpine\nENV aa bb cc dd\nRUN echo ${aa} ${cc}\n" +
                        "FROM alpine\nENV aa bb cc ee\nRUN echo ${aa} ${cc}"
                        ;
                    hover = onHover(content, 1, 5);
                    assert.equal(hover.contents, "bb cc dd");
                    hover = onHover(content, 2, 12);
                    assert.equal(hover.contents, "bb cc dd");
                    assert.equal(onHover(content, 1, 11), null);
                    assert.equal(onHover(content, 2, 18), null);
                    hover = onHover(content, 4, 5);
                    assert.equal(hover.contents, "bb cc ee");
                    hover = onHover(content, 5, 12);
                    assert.equal(hover.contents, "bb cc ee");
                    assert.equal(onHover(content, 4, 11), null);
                    assert.equal(onHover(content, 5, 18), null);

                    content = "ENV aa a  b\nRUN echo ${aa}";
                    hover = onHover(content, 0, 5);
                    assert.equal(hover.contents, "a  b");
                    hover = onHover(content, 1, 12);
                    assert.equal(hover.contents, "a  b");

                    content =
                        "FROM alpine\nENV aa a  b\nRUN echo ${aa}\n" +
                        "FROM alpine\nRUN echo ${aa}"
                        ;
                    hover = onHover(content, 1, 5);
                    assert.equal(hover.contents, "a  b");
                    hover = onHover(content, 2, 12);
                    assert.equal(hover.contents, "a  b");
                    assert.equal(onHover(content, 4, 12), null);

                    content =
                        "FROM alpine\nENV aa a  b\nRUN echo ${aa}\n" +
                        "FROM alpine\nENV aa a  c\nRUN echo ${aa}"
                        ;
                    hover = onHover(content, 1, 5);
                    assert.equal(hover.contents, "a  b");
                    hover = onHover(content, 2, 12);
                    assert.equal(hover.contents, "a  b");
                    hover = onHover(content, 4, 5);
                    assert.equal(hover.contents, "a  c");
                    hover = onHover(content, 5, 12);
                    assert.equal(hover.contents, "a  c");
                });

                it("$var", function () {
                    let content = "ENV aa bb cc dd\nRUN echo $aa $cc";
                    let hover = onHover(content, 0, 5);
                    assert.equal(hover.contents, "bb cc dd");
                    hover = onHover(content, 1, 11);
                    assert.equal(hover.contents, "bb cc dd");
                    assert.equal(onHover(content, 0, 11), null);
                    assert.equal(onHover(content, 1, 15), null);

                    content =
                        "FROM alpine\nENV aa bb cc dd\nRUN echo $aa $cc\n" +
                        "FROM alpine\nRUN echo $aa $cc"
                        ;
                    hover = onHover(content, 1, 5);
                    assert.equal(hover.contents, "bb cc dd");
                    hover = onHover(content, 2, 11);
                    assert.equal(hover.contents, "bb cc dd");
                    assert.equal(onHover(content, 1, 11), null);
                    assert.equal(onHover(content, 2, 15), null);
                    assert.equal(onHover(content, 4, 11), null);
                    assert.equal(onHover(content, 4, 15), null);

                    content =
                        "FROM alpine\nENV aa bb cc dd\nRUN echo $aa $cc\n" +
                        "FROM alpine\nENV aa bb cc ee\nRUN echo $aa $cc"
                        ;
                    hover = onHover(content, 1, 5);
                    assert.equal(hover.contents, "bb cc dd");
                    hover = onHover(content, 2, 11);
                    assert.equal(hover.contents, "bb cc dd");
                    assert.equal(onHover(content, 1, 11), null);
                    assert.equal(onHover(content, 2, 15), null);
                    hover = onHover(content, 4, 5);
                    assert.equal(hover.contents, "bb cc ee");
                    hover = onHover(content, 5, 11);
                    assert.equal(hover.contents, "bb cc ee");
                    assert.equal(onHover(content, 4, 11), null);
                    assert.equal(onHover(content, 5, 15), null);

                    content = "ENV aa a  b\nRUN echo $aa";
                    hover = onHover(content, 0, 5);
                    assert.equal(hover.contents, "a  b");
                    hover = onHover(content, 1, 11);
                    assert.equal(hover.contents, "a  b");

                    content =
                        "FROM alpine\nENV aa a  b\nRUN echo $aa\n" +
                        "FROM alpine\nRUN echo $aa"
                        ;
                    hover = onHover(content, 1, 5);
                    assert.equal(hover.contents, "a  b");
                    hover = onHover(content, 2, 11);
                    assert.equal(hover.contents, "a  b");
                    assert.equal(onHover(content, 4, 11), null);

                    content =
                        "FROM alpine\nENV aa a  b\nRUN echo $aa\n" +
                        "FROM alpine\nENV aa a  c\nRUN echo $aa"
                        ;
                    hover = onHover(content, 1, 5);
                    assert.equal(hover.contents, "a  b");
                    hover = onHover(content, 2, 11);
                    assert.equal(hover.contents, "a  b");
                    hover = onHover(content, 4, 5);
                    assert.equal(hover.contents, "a  c");
                    hover = onHover(content, 5, 11);
                    assert.equal(hover.contents, "a  c");
                });
            });

            describe("single variable delimited by escaped space", function () {
                it("${var}", function () {
                    let content = "ENV xx a\\ b\nRUN echo ${xx}";
                    let hover = onHover(content, 0, 5);
                    assert.equal(hover.contents, "a b");
                    hover = onHover(content, 1, 12);
                    assert.equal(hover.contents, "a b");

                    content =
                        "FROM alpine\nENV xx a\\ b\nRUN echo ${xx}\n" +
                        "FROM alpine\nRUN echo ${xx}"
                        ;
                    hover = onHover(content, 1, 5);
                    assert.equal(hover.contents, "a b");
                    hover = onHover(content, 2, 12);
                    assert.equal(hover.contents, "a b");
                    assert.equal(onHover(content, 4, 12), null);

                    content =
                        "FROM alpine\nENV xx a\\ b\nRUN echo ${xx}\n" +
                        "FROM alpine\nENV xx a\\ c\nRUN echo ${xx}"
                        ;
                    hover = onHover(content, 1, 5);
                    assert.equal(hover.contents, "a b");
                    hover = onHover(content, 2, 12);
                    assert.equal(hover.contents, "a b");
                    hover = onHover(content, 4, 5);
                    assert.equal(hover.contents, "a c");
                    hover = onHover(content, 5, 12);
                    assert.equal(hover.contents, "a c");

                    content = "ENV xx a\\ \\ b\nRUN echo ${xx}";
                    hover = onHover(content, 0, 5);
                    assert.equal(hover.contents, "a  b");
                    hover = onHover(content, 1, 12);
                    assert.equal(hover.contents, "a  b");

                    content =
                        "FROM alpine\nENV xx a\\ \\ b\nRUN echo ${xx}\n" +
                        "FROM alpine\nRUN echo ${xx}"
                        ;
                    hover = onHover(content, 1, 5);
                    assert.equal(hover.contents, "a  b");
                    hover = onHover(content, 2, 12);
                    assert.equal(hover.contents, "a  b");
                    assert.equal(onHover(content, 4, 12), null);

                    content =
                        "FROM alpine\nENV xx a\\ \\ b\nRUN echo ${xx}\n" +
                        "FROM alpine\nENV xx a\\ \\ c\nRUN echo ${xx}"
                        ;
                    hover = onHover(content, 1, 5);
                    assert.equal(hover.contents, "a  b");
                    hover = onHover(content, 2, 12);
                    assert.equal(hover.contents, "a  b");
                    hover = onHover(content, 4, 5);
                    assert.equal(hover.contents, "a  c");
                    hover = onHover(content, 5, 12);
                    assert.equal(hover.contents, "a  c");
                });

                it("$var", function () {
                    let content = "ENV xx a\\ b\nRUN echo $xx";
                    let hover = onHover(content, 0, 5);
                    assert.equal(hover.contents, "a b");
                    hover = onHover(content, 1, 11);
                    assert.equal(hover.contents, "a b");

                    content =
                        "FROM alpine\nENV xx a\\ b\nRUN echo $xx\n" +
                        "FROM alpine\nRUN echo $xx"
                        ;
                    hover = onHover(content, 1, 5);
                    assert.equal(hover.contents, "a b");
                    hover = onHover(content, 2, 11);
                    assert.equal(hover.contents, "a b");
                    assert.equal(onHover(content, 4, 11), null);

                    content =
                        "FROM alpine\nENV xx a\\ b\nRUN echo $xx\n" +
                        "FROM alpine\nENV xx a\\ c\nRUN echo $xx"
                        ;
                    hover = onHover(content, 1, 5);
                    assert.equal(hover.contents, "a b");
                    hover = onHover(content, 2, 11);
                    assert.equal(hover.contents, "a b");
                    hover = onHover(content, 4, 5);
                    assert.equal(hover.contents, "a c");
                    hover = onHover(content, 5, 11);
                    assert.equal(hover.contents, "a c");

                    content = "ENV xx a\\ \\ b\nRUN echo $xx";
                    hover = onHover(content, 0, 5);
                    assert.equal(hover.contents, "a  b");
                    hover = onHover(content, 1, 11);
                    assert.equal(hover.contents, "a  b");

                    content =
                        "FROM alpine\nENV xx a\\ \\ b\nRUN echo $xx\n" +
                        "FROM alpine\nRUN echo $xx"
                        ;
                    hover = onHover(content, 1, 5);
                    assert.equal(hover.contents, "a  b");
                    hover = onHover(content, 2, 11);
                    assert.equal(hover.contents, "a  b");
                    assert.equal(onHover(content, 4, 11), null);

                    content =
                        "FROM alpine\nENV xx a\\ \\ b\nRUN echo $xx\n" +
                        "FROM alpine\nENV xx a\\ \\ c\nRUN echo $xx"
                        ;
                    hover = onHover(content, 1, 5);
                    assert.equal(hover.contents, "a  b");
                    hover = onHover(content, 2, 11);
                    assert.equal(hover.contents, "a  b");
                    hover = onHover(content, 4, 5);
                    assert.equal(hover.contents, "a  c");
                    hover = onHover(content, 5, 11);
                    assert.equal(hover.contents, "a  c");
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
                    let hover = onHover(content, 0, 5);
                    assert.equal(hover.contents, "x");
                    hover = onHover(content, 1, 5);
                    assert.equal(hover.contents, "y");
                    hover = onHover(content, 1, 15);
                    assert.equal(hover.contents, "x");
                    hover = onHover(content, 2, 10);
                    assert.equal(hover.contents, "y");

                    content =
                        "FROM alpine\nENV aa=x\nENV aa=y bb=${aa}\nENV cc=${aa}\n" +
                        "FROM alpine\nENV cc=${aa}"
                        ;
                    hover = onHover(content, 1, 5);
                    assert.equal(hover.contents, "x");
                    hover = onHover(content, 2, 5);
                    assert.equal(hover.contents, "y");
                    hover = onHover(content, 2, 15);
                    assert.equal(hover.contents, "x");
                    hover = onHover(content, 3, 10);
                    assert.equal(hover.contents, "y");
                    assert.equal(onHover(content, 5, 10), null);

                    content =
                        "FROM alpine\nENV aa=x\nENV aa=y bb=${aa}\nENV cc=${aa}\n" +
                        "FROM alpine\nENV aa=a\nENV aa=b bb=${aa}\nENV cc=${aa}"
                        ;
                    hover = onHover(content, 1, 5);
                    assert.equal(hover.contents, "x");
                    hover = onHover(content, 2, 5);
                    assert.equal(hover.contents, "y");
                    hover = onHover(content, 2, 15);
                    assert.equal(hover.contents, "x");
                    hover = onHover(content, 3, 10);
                    assert.equal(hover.contents, "y");
                    hover = onHover(content, 5, 5);
                    assert.equal(hover.contents, "a");
                    hover = onHover(content, 6, 5);
                    assert.equal(hover.contents, "b");
                    hover = onHover(content, 6, 15);
                    assert.equal(hover.contents, "a");
                    hover = onHover(content, 7, 10);
                    assert.equal(hover.contents, "b");
                });

				/**
				 * ENV aa=x
				 * ENV aa=y bb=$aa
				 * ENV cc=$aa
				 */
                it("$var", function () {
                    let content = "ENV aa=x\nENV aa=y bb=$aa\nENV cc=$aa";
                    let hover = onHover(content, 0, 5);
                    assert.equal(hover.contents, "x");
                    hover = onHover(content, 1, 5);
                    assert.equal(hover.contents, "y");
                    hover = onHover(content, 1, 14);
                    assert.equal(hover.contents, "x");
                    hover = onHover(content, 2, 9);
                    assert.equal(hover.contents, "y");

                    content =
                        "FROM alpine\nENV aa=x\nENV aa=y bb=$aa\nENV cc=$aa\n" +
                        "FROM alpine\nENV cc=$aa"
                        ;
                    hover = onHover(content, 1, 5);
                    assert.equal(hover.contents, "x");
                    hover = onHover(content, 2, 5);
                    assert.equal(hover.contents, "y");
                    hover = onHover(content, 2, 14);
                    assert.equal(hover.contents, "x");
                    hover = onHover(content, 3, 9);
                    assert.equal(hover.contents, "y");
                    assert.equal(onHover(content, 5, 9), null);

                    content =
                        "FROM alpine\nENV aa=x\nENV aa=y bb=$aa\nENV cc=$aa\n" +
                        "FROM alpine\nENV aa=a\nENV aa=b bb=$aa\nENV cc=$aa"
                        ;
                    hover = onHover(content, 1, 5);
                    assert.equal(hover.contents, "x");
                    hover = onHover(content, 2, 5);
                    assert.equal(hover.contents, "y");
                    hover = onHover(content, 2, 14);
                    assert.equal(hover.contents, "x");
                    hover = onHover(content, 3, 10);
                    assert.equal(hover.contents, "y");
                    hover = onHover(content, 5, 5);
                    assert.equal(hover.contents, "a");
                    hover = onHover(content, 6, 5);
                    assert.equal(hover.contents, "b");
                    hover = onHover(content, 6, 14);
                    assert.equal(hover.contents, "a");
                    hover = onHover(content, 7, 10);
                    assert.equal(hover.contents, "b");
                });
            });

            describe("multiple variables", function () {
                it("${var}", function () {
                    let content = "ENV var=value var2=value2\nRUN echo ${var} ${var2}";
                    let hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 1, 12);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 0, 16);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 1, 20);

                    content = "ENV var=value \\\nvar2=value2 \\\nvar3=value3\nRUN echo ${var} ${var2} ${var3}";
                    hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 3, 12);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 1, 2);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 3, 20);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 2, 2);
                    assert.equal(hover.contents, "value3");
                    hover = onHover(content, 3, 28);
                    assert.equal(hover.contents, "value3");
                });

                it("$var", function () {
                    let content = "ENV var=value var2=value2\nRUN echo ${var} ${var2}";
                    let hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 1, 11);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 0, 16);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 1, 17);

                    content = "ENV var=value \\\nvar2=value2 \\\nvar3=value3\nRUN echo $var $var2 $var3";
                    hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 3, 11);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 1, 2);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 3, 16);
                    assert.equal(hover.contents, "value2");
                    hover = onHover(content, 2, 2);
                    assert.equal(hover.contents, "value3");
                    hover = onHover(content, 3, 22);
                    assert.equal(hover.contents, "value3");
                });
            });

            describe("escaped whitespace value", function () {
                it("ENV var=\\", function () {
                    let content = "ENV var=\\";
                    let hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, "");

                    content = "ENV var=\\ ";
                    hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, "");

                    content = "ENV var=\\  ";
                    hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, "");
                });

                it("ENV var=\\  var2=\\", function () {
                    let content = "ENV var=\\  var2=\\";
                    let hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, " ");
                    hover = onHover(content, 0, 13);
                    assert.equal(hover.contents, "");

                    content = "ENV var=\\  var2=\\ ";
                    hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, " ");
                    hover = onHover(content, 0, 13);
                    assert.equal(hover.contents, "");

                    content = "ENV var=\\  var2=\\  ";
                    hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, " ");
                    hover = onHover(content, 0, 13);
                    assert.equal(hover.contents, "");
                });

                it("ENV var=\\   var2=\\", function () {
                    let content = "ENV var=\\   var2=\\";
                    let hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, " ");
                    hover = onHover(content, 0, 14);
                    assert.equal(hover.contents, "");

                    content = "ENV var=\\   var2=\\ ";
                    hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, " ");
                    hover = onHover(content, 0, 14);
                    assert.equal(hover.contents, "");

                    content = "ENV var=\\   var2=\\  ";
                    hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, " ");
                    hover = onHover(content, 0, 14);
                    assert.equal(hover.contents, "");
                });

                it("ENV var=\\ \\  var2=\\", function () {
                    let content = "ENV var=\\ \\  var2=\\";
                    let hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, "  ");
                    hover = onHover(content, 0, 13);
                    assert.equal(hover.contents, "");
                });

                it("ENV var=y\\  ", function () {
                    let content = "ENV var=y\\  ";
                    let hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, "y");
                });
            });

            describe("escaped single quote", function () {
                it("ENV var='\\'", function () {
                    let content = "ENV var='\\'";
                    let hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, "\\");
                });

                it("ENV var='\\\\'", function () {
                    let content = "ENV var='\\\\'";
                    let hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, "\\\\");
                });

                it("ENV var='a\\\\nb'", function () {
                    let content = "ENV var='a\\\nb'";
                    let hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, "ab");
                });

                it("ENV var='a\\ \\nb'", function () {
                    let content = "ENV var='a\\ \nb'";
                    let hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, "ab");
                });

                it("ENV var='a\\  \\r\\nb'", function () {
                    let content = "ENV var='a\\  \r\nb'";
                    let hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, "ab");
                });
            });

            describe("escaped double quotes", function () {
                it("ENV var=\"\\\"x\\\"\"", function () {
                    let content = "ENV var=\"\\\"x\\\"\"";
                    let hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, "\"x\"");
                });

                it("ENV var='\"\\\"'", function () {
                    let content = "ENV var='\"\\\"'";
                    let hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, "\"\\\"");
                });

                it("ENV var=\"a\\\\nb\"", function () {
                    let content = "ENV var=\"a\\\nb\"";
                    let hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, "ab");
                });

                it("ENV var=\"a\\ \\nb\"", function () {
                    let content = "ENV var=\"a\\ \nb\"";
                    let hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, "ab");
                });

                it("ENV var=\"a\\  \\r\\nb\"", function () {
                    let content = "ENV var=\"a\\  \r\nb\"";
                    let hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, "ab");
                });
            });

            describe("comments", function () {
                it("embedded in escaped line", function () {
                    let content = "ENV var=value \\\n# comment\nvar2=value2";
                    let hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 2, 2);
                    assert.equal(hover.contents, "value2");

                    content = "ENV var=value \\\nvar2=\"#\" var3=value3\n";
                    hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 1, 2);
                    assert.equal(hover.contents, "#");
                    hover = onHover(content, 1, 11);
                    assert.equal(hover.contents, "value3");

                    content = "ENV var=value \\\nvar2=# var3=value3 \\\nvar4=value4";
                    hover = onHover(content, 0, 6);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 1, 2);
                    assert.equal(hover.contents, "#");
                    hover = onHover(content, 1, 10);
                    assert.equal(hover.contents, "value3");
                    hover = onHover(content, 2, 2);
                    assert.equal(hover.contents, "value4");

                    content = "FROM node\nENV var=value \\\n# comment\n# comment\nvar2=value2";
                    hover = onHover(content, 1, 6);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 4, 2);
                    assert.equal(hover.contents, "value2");

                    content = "FROM node\nENV var=value \\\n# var2=value2";
                    hover = onHover(content, 1, 6);
                    assert.equal(hover.contents, "value");
                    hover = onHover(content, 2, 4);
                    assert.equal(hover, null);
                });
            });
        });

        function createHealthcheckTest(trigger: boolean) {
            let onbuild = trigger ? "ONBUILD " : "";
            let triggerOffset = onbuild.length;

            describe("HEALTHCHECK", function () {
                it("--interval", function () {
                    let content = onbuild + "HEALTHCHECK --interval";
                    let hover = onHover(content, 0, triggerOffset + 17);
                    assert.equal(hover.contents, markdownDocumentation.getMarkdown("HEALTHCHECK_FlagInterval").contents);
                    assert.equal(hover.range, undefined);
                });

                it("--interval=\\$x", function () {
                    let content = onbuild + "HEALTHCHECK --interval=\\$x";
                    let hover = onHover(content, 0, triggerOffset + 17);
                    assert.equal(hover.contents, markdownDocumentation.getMarkdown("HEALTHCHECK_FlagInterval").contents);
                    assert.equal(hover.range, undefined);
                });

                it("--interval=\\a", function () {
                    let content = onbuild + "HEALTHCHECK --interval=\\a";
                    let hover = onHover(content, 0, triggerOffset + 17);
                    assert.equal(hover.contents, markdownDocumentation.getMarkdown("HEALTHCHECK_FlagInterval").contents);
                    assert.equal(hover.range, undefined);
                });

                it("--retries", function () {
                    let content = onbuild + "HEALTHCHECK --retries";
                    let hover = onHover(content, 0, triggerOffset + 17);
                    assert.equal(hover.contents, markdownDocumentation.getMarkdown("HEALTHCHECK_FlagRetries").contents);
                    assert.equal(hover.range, undefined);
                });

                it("--start-period", function () {
                    let content = onbuild + "HEALTHCHECK --start-period";
                    let hover = onHover(content, 0, triggerOffset + 17);
                    assert.equal(hover.contents, markdownDocumentation.getMarkdown("HEALTHCHECK_FlagStartPeriod").contents);
                    assert.equal(hover.range, undefined);
                });

                it("--timeout", function () {
                    let content = onbuild + "HEALTHCHECK --timeout";
                    let hover = onHover(content, 0, triggerOffset + 17);
                    assert.equal(hover.contents, markdownDocumentation.getMarkdown("HEALTHCHECK_FlagTimeout").contents);
                    assert.equal(hover.range, undefined);
                });

                it("--TIMEOUT", function () {
                    let content = onbuild + "HEALTHCHECK --TIMEOUT";
                    let hover = onHover(content, 0, triggerOffset + 17);
                    assert.equal(hover, null);
                });

                it("whitespace", function () {
                    let content = onbuild + "HEALTHCHECK  --timeout";
                    let hover = onHover(content, 0, triggerOffset + 12);
                    assert.equal(hover, null);
                });

                function createFlagsAfterTest(subcommand: string) {
                    it("flags after " + subcommand, function () {
                        let content = onbuild + "HEALTHCHECK " + subcommand + " \\\n--interval=30s\\\n--retries=3\\\n--start-period=30s\\\n--timeout=30s";
                        let hover = onHover(content, 1, 4);
                        assert.equal(hover, null);
                        hover = onHover(content, 2, 4);
                        assert.equal(hover, null);
                        hover = onHover(content, 3, 4);
                        assert.equal(hover, null);
                        hover = onHover(content, 4, 4);
                        assert.equal(hover, null);
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
                let hover = onHover(content, 3, 11);
                assert.equal(hover.contents, "c");

                content =
                    "FROM alpine\nARG aa=b\nENV aa=c\nARG aa=d\nRUN echo ${aa}\n" +
                    "FROM alpine\nRUN echo ${aa}"
                    ;
                hover = onHover(content, 4, 11);
                assert.equal(hover.contents, "c");
                assert.equal(onHover(content, 6, 11), null);

                content =
                    "FROM alpine\nARG aa=b\nENV aa=c\nARG aa=d\nRUN echo ${aa}\n" +
                    "FROM alpine\nARG aa=e\nENV aa=f\nARG aa=g\nRUN echo ${aa}"
                    ;
                hover = onHover(content, 4, 11);
                assert.equal(hover.contents, "c");
                hover = onHover(content, 9, 11);
                assert.equal(hover.contents, "f");
            });

			/**
			 * ARG aa=b
			 * ENV aa=c
			 * ARG aa=d
			 * RUN echo $aa
			 */
            it("${var}", function () {
                let content = "ARG aa=b\nENV aa=c\nARG aa=d\nRUN echo $aa";
                let hover = onHover(content, 3, 10);
                assert.equal(hover.contents, "c");

                content =
                    "FROM alpine\nARG aa=b\nENV aa=c\nARG aa=d\nRUN echo $aa\n" +
                    "FROM alpine\nRUN echo ${aa}"
                    ;
                hover = onHover(content, 4, 10);
                assert.equal(hover.contents, "c");
                assert.equal(onHover(content, 6, 10), null);

                content =
                    "FROM alpine\nARG aa=b\nENV aa=c\nARG aa=d\nRUN echo $aa\n" +
                    "FROM alpine\nARG aa=e\nENV aa=f\nARG aa=g\nRUN echo $aa"
                    ;
                hover = onHover(content, 4, 10);
                assert.equal(hover.contents, "c");
                hover = onHover(content, 9, 10);
                assert.equal(hover.contents, "f");
            });
        });
    });

    describe("before FROM", function () {
        describe("ARG", function () {
            it("FROM lookup", function () {
                let content = "ARG image=alpine\nFROM $image";
                let hover = onHover(content, 0, 6);
                assert.equal(hover.contents, "alpine");
                hover = onHover(content, 1, 8);
                assert.equal(hover.contents, "alpine");

                content = "ARG image=alpine\nFROM $image\nFROM $image";
                hover = onHover(content, 0, 6);
                assert.equal(hover.contents, "alpine");
                hover = onHover(content, 1, 8);
                assert.equal(hover.contents, "alpine");
                hover = onHover(content, 2, 8);
                assert.equal(hover.contents, "alpine");
            });

            it("reused variable name", function () {
                let content = "ARG image=alpine\nFROM $image\nARG image=alpine2";
                let hover = onHover(content, 0, 6);
                assert.equal(hover.contents, "alpine");
                hover = onHover(content, 1, 8);
                assert.equal(hover.contents, "alpine");
                hover = onHover(content, 2, 6);
                assert.equal(hover.contents, "alpine2");

                content = "ARG image=alpine\nFROM $image\nARG image=alpine2\nFROM $image";
                hover = onHover(content, 0, 6);
                assert.equal(hover.contents, "alpine");
                hover = onHover(content, 1, 8);
                assert.equal(hover.contents, "alpine");
                hover = onHover(content, 2, 6);
                assert.equal(hover.contents, "alpine2");
                hover = onHover(content, 3, 8);
                assert.equal(hover.contents, "alpine");

                content = "ARG image=alpine\nFROM $image\nFROM $image\nARG image=alpine2";
                hover = onHover(content, 0, 6);
                assert.equal(hover.contents, "alpine");
                hover = onHover(content, 1, 8);
                assert.equal(hover.contents, "alpine");
                hover = onHover(content, 2, 6);
                assert.equal(hover.contents, "alpine");
                hover = onHover(content, 3, 8);
                assert.equal(hover.contents, "alpine2");
            });

            it("scoped", function () {
                let content = "ARG image=alpine\nFROM alpine\nRUN echo $image";
                assert.equal(onHover(content, 2, 12), null);
            });

            it("non-existent variable", function () {
                let content = "FROM $image\nARG image";
                assert.equal(onHover(content, 0, 8), null);

                content = "ARG\nFROM $image";
                assert.equal(onHover(content, 1, 8), null);

                content = "ARG image=alpine\nFROM $image2\nARG image2=alpine2";
                let hover = onHover(content, 0, 6);
                assert.equal(hover.contents, "alpine");
                assert.equal(onHover(content, 1, 8), null);
                hover = onHover(content, 2, 6);
                assert.equal(hover.contents, "alpine2");
            });
        });

        describe("ENV", function () {
            it("FROM lookup", function () {
                let content = "ENV image=alpine\nFROM $image";
                let hover = onHover(content, 0, 6);
                assert.equal(hover.contents, "alpine");
                assert.equal(onHover(content, 1, 8), null);

                content = "ENV image=alpine\nFROM $image\nFROM $image";
                hover = onHover(content, 0, 6);
                assert.equal(hover.contents, "alpine");
                assert.equal(onHover(content, 1, 8), null);
                assert.equal(onHover(content, 2, 8), null);
            });

            it("reused variable name", function () {
                let content = "ENV image=alpine\nFROM $image\nENV image=alpine2";
                let hover = onHover(content, 0, 6);
                assert.equal(hover.contents, "alpine");
                assert.equal(onHover(content, 1, 8), null);
                hover = onHover(content, 2, 6);
                assert.equal(hover.contents, "alpine2");

                content = "ENV image=alpine\nFROM $image\nENV image=alpine2\nFROM $image";
                hover = onHover(content, 0, 6);
                assert.equal(hover.contents, "alpine");
                assert.equal(onHover(content, 1, 8), null);
                hover = onHover(content, 2, 6);
                assert.equal(hover.contents, "alpine2");
                assert.equal(onHover(content, 3, 8), null);

                content = "ENV image=alpine\nFROM $image\nFROM $image\nENV image=alpine2";
                hover = onHover(content, 0, 6);
                assert.equal(hover.contents, "alpine");
                assert.equal(onHover(content, 1, 8), null);
                assert.equal(onHover(content, 2, 8), null);
                hover = onHover(content, 3, 6);
                assert.equal(hover.contents, "alpine2");
            });

            it("scoped", function () {
                let content = "ENV image=alpine\nFROM alpine\nRUN echo $image";
                assert.equal(onHover(content, 2, 12), null);
            });

            it("non-existent variable", function () {
                let content = "FROM $image\nENV image";
                assert.equal(onHover(content, 0, 8), null);

                content = "ENV\nFROM $image";
                assert.equal(onHover(content, 1, 8), null);

                content = "ENV image=alpine\nFROM $image2\nENV image2=alpine2";
                let hover = onHover(content, 0, 6);
                assert.equal(hover.contents, "alpine");
                assert.equal(onHover(content, 1, 8), null);
                hover = onHover(content, 2, 6);
                assert.equal(hover.contents, "alpine2");
            });
        });
    });

    describe("keyword nesting", function () {
        it("ONBUILD EXPOSE", function () {
            let content = "ONBUILD EXPOSE 8080";
            let hover = onHover(content, 0, 11);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("EXPOSE").contents);
            assert.equal(hover.range, undefined);

            content = "ONBUILD expose 8080";
            hover = onHover(content, 0, 11);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("EXPOSE").contents);
            assert.equal(hover.range, undefined);

            content = "ONBUILD ExposE 8080";
            hover = onHover(content, 0, 11);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("EXPOSE").contents);
            assert.equal(hover.range, undefined);
        });

        it("ONBUILD EXPOSE escaped on newline", function () {
            let content = "ONBUILD \\\nEXPOSE 8080";
            let hover = onHover(content, 1, 3);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("EXPOSE").contents);
            assert.equal(hover.range, undefined);

            content = "ONBUILD \\\r\nEXPOSE 8080";
            hover = onHover(content, 1, 3);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("EXPOSE").contents);
            assert.equal(hover.range, undefined);

            content = "#escape=`\nONBUILD \\\nEXPOSE 8080";
            hover = onHover(content, 2, 3);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("EXPOSE").contents);
            assert.equal(hover.range, undefined);
        });

        it("ONBUILD EXPOSE escaped on newline with space", function () {
            let content = "ONBUILD \\\n EXPOSE 8080";
            let hover = onHover(content, 1, 4);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("EXPOSE").contents);
            assert.equal(hover.range, undefined);
        });

        it("ONBUILD EXPOSE incomplete", function () {
            let content = "ONBUILD EXPOSE";
            let hover = onHover(content, 0, 9);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("EXPOSE").contents);
            assert.equal(hover.range, undefined);

            content = "ONBUILD EXPOSE\n";
            hover = onHover(content, 0, 9);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("EXPOSE").contents);
            assert.equal(hover.range, undefined);

            content = "ONBUILD EXPOSE\r";
            hover = onHover(content, 0, 9);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("EXPOSE").contents);
            assert.equal(hover.range, undefined);

            content = "ONBUILD EXPOSE\r\n";
            hover = onHover(content, 0, 9);
            assert.equal(hover.contents, markdownDocumentation.getMarkdown("EXPOSE").contents);
            assert.equal(hover.range, undefined);
        });

        it("ONBUILD EXP\\OSE", function () {
            let content = "ONBUILD EXPOS\\E";
            let hover = onHover(content, 0, 9);
            assert.equal(hover, null);
        });

        it("ONBUILD with no trigger", function () {
            let content = "ONBUILD   \r\n";
            let hover = onHover(content, 0, 9);
            assert.equal(hover, null);
        });

        it("invalid nesting", function () {
            let content = "RUN EXPOSE 8080";
            let hover = onHover(content, 0, 7);
            assert.equal(hover, null);

            content = " RUN EXPOSE 8080";
            hover = onHover(content, 0, 8);
            assert.equal(hover, null);

            content = "\tRUN EXPOSE 8080";
            hover = onHover(content, 0, 8);
            assert.equal(hover, null);

            content = "\r\nRUN EXPOSE 8080";
            hover = onHover(content, 1, 7);
            assert.equal(hover, null);

            content = "\rRUN EXPOSE 8080";
            hover = onHover(content, 1, 7);
            assert.equal(hover, null);

            content = "\nRUN EXPOSE 8080";
            hover = onHover(content, 1, 7);
            assert.equal(hover, null);
        });
    });
});
