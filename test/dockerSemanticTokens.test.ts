/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as assert from "assert";

import { DockerfileLanguageServiceFactory } from '../src/main';
import { SemanticTokenTypes, SemanticTokens, SemanticTokenModifiers } from "vscode-languageserver-protocol/lib/protocol.sematicTokens.proposed";
import { TokensLegend } from "../src/dockerSemanticTokens";

const service = DockerfileLanguageServiceFactory.createLanguageService();

function computeSemanticTokens(content: string): SemanticTokens {
    return service.computeSemanticTokens(content);
}

function assertEdit(data: number[], tokenType: string, index: number, line: number, startCharacter: number, length: number, tokenModifiers: string[] = []) {
    assert.equal(line, data[index]);
    assert.equal(startCharacter, data[index + 1]);
    assert.equal(length, data[index + 2]);
    assert.notEqual(TokensLegend.getTokenType(tokenType), undefined);
    assert.notEqual(TokensLegend.getTokenType(tokenType), null);
    assert.equal(TokensLegend.getTokenType(tokenType), data[index + 3]);
    assert.equal(TokensLegend.getTokenModifiers(tokenModifiers), data[index + 4]);
}

describe("Dockerfile Semantic Token tests", () => {
    describe("keywords", () => {
        describe("FROM", () => {
            it("FROM", () => {
                let tokens = computeSemanticTokens("FROM");
                assert.equal(5, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 4);

                tokens = computeSemanticTokens(" FROM");
                assert.equal(5, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 1, 4);
            });

            it("FROM node", () => {
                const tokens = computeSemanticTokens("FROM node");
                assert.equal(10, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.class, 5, 0, 5, 4);
            });

            it("FROM node:latest", () => {
                const tokens = computeSemanticTokens("FROM node:latest");
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.class, 5, 0, 5, 4);
                assertEdit(tokens.data, SemanticTokenTypes.label, 10, 0, 5, 6);
            });

            it("FROM node@sha256:ab00606a42621fb68f2ed6ad3c88be54397f981a7b70a79db3d1172b11c4367d", () => {
                const tokens = computeSemanticTokens("FROM node@sha256:ab00606a42621fb68f2ed6ad3c88be54397f981a7b70a79db3d1172b11c4367d");
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.class, 5, 0, 5, 4);
                assertEdit(tokens.data, SemanticTokenTypes.label, 10, 0, 5, 71);
            });

            it("FROM node AS", () => {
                const tokens = computeSemanticTokens("FROM node AS");
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.class, 5, 0, 5, 4);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 0, 5, 2);
            });

            it("FROM node AS build", () => {
                const tokens = computeSemanticTokens("FROM node AS build");
                assert.equal(20, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.class, 5, 0, 5, 4);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 0, 5, 2);
                assertEdit(tokens.data, SemanticTokenTypes.label, 15, 0, 3, 5);
            });
        });

        describe("HEALTHCHECK", () => {
            it("HEALTHCHECK", () => {
                const tokens = computeSemanticTokens("HEALTHCHECK");
                assert.equal(5, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 11);
            });

            it("HEALTHCHECK CMD", () => {
                const tokens = computeSemanticTokens("HEALTHCHECK CMD ls");
                assert.equal(10, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 11);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 5, 0, 12, 3);
            });

            it("--interval flag", () => {
                const tokens = computeSemanticTokens("HEALTHCHECK --interval=30s CMD ls");
                assert.equal(20, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 11);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 12, 10);
                assertEdit(tokens.data, SemanticTokenTypes.property, 10, 0, 11, 3);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 15, 0, 4, 3);
            });

            it("flag with empty string value", () => {
                const tokens = computeSemanticTokens("HEALTHCHECK --interval= CMD ls");
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 11);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 12, 10);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 0, 12, 3);
            });

            it("incomplete flag", () => {
                const tokens = computeSemanticTokens("HEALTHCHECK --interval CMD ls");
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 11);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 12, 10);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 0, 11, 3);
            });

            it("HEALTHCHECK NONE", () => {
                const tokens = computeSemanticTokens("HEALTHCHECK NONE");
                assert.equal(10, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 11);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 5, 0, 12, 4);
            });
        });

        describe("ONBUILD", () => {
            it("no trigger instruction", () => {
                const tokens = computeSemanticTokens("ONBUILD");
                assert.equal(5, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 7);
            });

            it("ONBUILD ADD", () => {
                const tokens = computeSemanticTokens("ONBUILD ADD . /app/src");
                assert.equal(10, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 7);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 5, 0, 8, 3);
            });

            it("ONBUILD HEALTHCHECK CMD", () => {
                const tokens = computeSemanticTokens("ONBUILD HEALTHCHECK CMD ls");
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 7);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 5, 0, 8, 11);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 0, 12, 3);
            });
        });

        describe("RUN", () => {
            const tokens = computeSemanticTokens("RUN echo abc # def\\\n ghi");
            assert.equal(5, tokens.data.length);
            assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
        });
    });

    describe("comments", () => {
        it("single line", () => {
            let tokens = computeSemanticTokens("# comment");
            assert.equal(5, tokens.data.length);
            assertEdit(tokens.data, SemanticTokenTypes.comment, 0, 0, 0, 9);

            tokens = computeSemanticTokens(" # comment");
            assert.equal(5, tokens.data.length);
            assertEdit(tokens.data, SemanticTokenTypes.comment, 0, 0, 1, 9);
        });

        it("multiple lines", () => {
            let tokens = computeSemanticTokens("# comment\n# comment 2");
            assert.equal(10, tokens.data.length);
            assertEdit(tokens.data, SemanticTokenTypes.comment, 0, 0, 0, 9);
            assertEdit(tokens.data, SemanticTokenTypes.comment, 5, 1, 0, 11);

            tokens = computeSemanticTokens("# comment\n# comment 2\n#comment 3");
            assert.equal(15, tokens.data.length);
            assertEdit(tokens.data, SemanticTokenTypes.comment, 0, 0, 0, 9);
            assertEdit(tokens.data, SemanticTokenTypes.comment, 5, 1, 0, 11);
            assertEdit(tokens.data, SemanticTokenTypes.comment, 5, 1, 0, 11);
        });

        it("multiple lines with gap", () => {
            const tokens = computeSemanticTokens("# comment\n\n# comment 2\n\n#comment 3");
            assert.equal(15, tokens.data.length);
            assertEdit(tokens.data, SemanticTokenTypes.comment, 0, 0, 0, 9);
            assertEdit(tokens.data, SemanticTokenTypes.comment, 5, 2, 0, 11);
            assertEdit(tokens.data, SemanticTokenTypes.comment, 5, 2, 0, 11);
        });
    });

    describe("directives", () => {
        it("single", () => {
            const tokens = computeSemanticTokens("# escape=`");
            assert.equal(5, tokens.data.length);
            assertEdit(tokens.data, SemanticTokenTypes.marco, 0, 0, 0, 10);
        });

        it("multiple", () => {
            const tokens = computeSemanticTokens("# a=\n# a=\n# b\nFROM node")
            assert.equal(25, tokens.data.length);
            assertEdit(tokens.data, SemanticTokenTypes.marco, 0, 0, 0, 4);
            assertEdit(tokens.data, SemanticTokenTypes.marco, 5, 1, 0, 4);
            assertEdit(tokens.data, SemanticTokenTypes.comment, 10, 1, 0, 3);
            assertEdit(tokens.data, SemanticTokenTypes.keyword, 15, 1, 0, 4);
            assertEdit(tokens.data, SemanticTokenTypes.class, 20, 0, 5, 4);
        });
    });

    describe("file", () => {
        describe("instructions", () => {
            it("three instructions", () => {
                const tokens = computeSemanticTokens("FROM\nWORKDIR\nRUN");
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 5, 1, 0, 7);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 1, 0, 3);
            });
        });

        describe("instruction with comments", () => {
            it("comment before instruction", () => {
                const tokens = computeSemanticTokens("# comment\nFROM node");
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 0, 0, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 5, 1, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.class, 10, 0, 5, 4);
            });

            it("comment after instruction", () => {
                const tokens = computeSemanticTokens("FROM node\n# comment");
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.class, 5, 0, 5, 4);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 10, 1, 0, 9);
            });

            it("mixed", () => {
                const tokens = computeSemanticTokens("FROM node\n# comment\nWORKDIR /opt/project\n# comment\nRUN echo");
                assert.equal(30, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.class, 5, 0, 5, 4);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 10, 1, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 15, 1, 0, 7);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 20, 1, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 25, 1, 0, 3);
            });
        });
    });

    describe("variables", () => {
        describe("$var", () => {
            it("RUN $var", () => {
                const tokens = computeSemanticTokens("RUN $var");
                assert.equal(10, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.variable, 5, 0, 4, 4, [SemanticTokenModifiers.reference]);
            });

            it("RUN $var $var", () => {
                const tokens = computeSemanticTokens("RUN $var $var");
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.variable, 5, 0, 4, 4, [SemanticTokenModifiers.reference]);
                assertEdit(tokens.data, SemanticTokenTypes.variable, 10, 0, 5, 4, [SemanticTokenModifiers.reference]);
            });
        });

        describe("${var}", () => {
            it("RUN ${var}", () => {
                const tokens = computeSemanticTokens("RUN ${var}");
                assert.equal(10, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.variable, 5, 0, 4, 6, [SemanticTokenModifiers.reference]);
            });

            it("RUN ${var} ${var}", () => {
                const tokens = computeSemanticTokens("RUN ${var} ${var}");
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.variable, 5, 0, 4, 6, [SemanticTokenModifiers.reference]);
                assertEdit(tokens.data, SemanticTokenTypes.variable, 10, 0, 7, 6, [SemanticTokenModifiers.reference]);
            });
        });
    });

    describe("strings", () => {
        describe("enclosed", () => {
            describe("single quotes", () => {
                it("RUN echo 'hello'", () => {
                    const tokens = computeSemanticTokens("RUN echo 'hello'");
                    assert.equal(10, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 5, 0, 9, 7);
                });

                it("RUN echo 'hello' 'world'", () => {
                    const tokens = computeSemanticTokens("RUN echo 'hello' 'world'");
                    assert.equal(15, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 5, 0, 9, 7);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 8, 7);
                });
            });

            describe("double quotes", () => {
                it("RUN echo \"hello\"", () => {
                    const tokens = computeSemanticTokens("RUN echo \"hello\"");
                    assert.equal(10, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 5, 0, 9, 7);
                });

                it("RUN echo \"hello\" \"world\"", () => {
                    const tokens = computeSemanticTokens("RUN echo \"hello\" \"world'");
                    assert.equal(15, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 5, 0, 9, 7);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 8, 7);
                });
            });
        });

        describe("open", () => {
            describe("single quotes", () => {
                it("RUN echo 'hello", () => {
                    const tokens = computeSemanticTokens("RUN echo 'hello");
                    assert.equal(10, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 5, 0, 9, 6);
                });

                it("RUN echo 'hello world", () => {
                    const tokens = computeSemanticTokens("RUN echo 'hello world");
                    assert.equal(10, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 5, 0, 9, 12);
                });
            });

            describe("double quotes", () => {
                it("RUN echo \"hello", () => {
                    const tokens = computeSemanticTokens("RUN echo \"hello");
                    assert.equal(10, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 5, 0, 9, 6);
                });

                it("RUN echo \"hello world", () => {
                    const tokens = computeSemanticTokens("RUN echo \"hello world");
                    assert.equal(10, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 5, 0, 9, 12);
                });
            });

            describe("mixed quotes", () => {
                it("RUN echo \"hello'", () => {
                    const tokens = computeSemanticTokens("RUN echo \"hello'");
                    assert.equal(10, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 5, 0, 9, 7);
                });

                it("RUN echo \"hello' world", () => {
                    const tokens = computeSemanticTokens("RUN echo \"hello' world");
                    assert.equal(10, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 5, 0, 9, 13);
                });

                it("RUN echo 'hello\" world", () => {
                    const tokens = computeSemanticTokens("RUN echo 'hello\" world");
                    assert.equal(10, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 5, 0, 9, 13);
                });
            });
        });

        describe("escaped", () => {
            describe("single quotes", () => {
                it("RUN echo \\'", () => {
                    const tokens = computeSemanticTokens("RUN echo \\'");
                    assert.equal(10, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 5, 0, 9, 2);
                });

                it("RUN echo 'hello\\''", () => {
                    const tokens = computeSemanticTokens("RUN echo 'hello\\''");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 5, 0, 9, 6);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 6, 2);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 15, 0, 2, 1);
                });
            });

            describe("double quotes", () => {
                it("RUN echo \\\"", () => {
                    const tokens = computeSemanticTokens("RUN echo \\\"");
                    assert.equal(10, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 5, 0, 9, 2);
                });

                it("RUN echo \\\"\\\" abc", () => {
                    const tokens = computeSemanticTokens("RUN echo \\\"\\\" abc");
                    assert.equal(15, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 5, 0, 9, 2);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 2, 2);
                });
            });
        });
    });

    describe("multiline", () => {
        // it("FR\\\nOM", () => {
            // let tokens = computeSemanticTokens("FR\\\nOM");
            // assert.equal(10, tokens.data.length);
            // assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 2);
            // assertEdit(tokens.data, SemanticTokenTypes.keyword, 5, 1, 0, 2);

            // tokens = computeSemanticTokens(" FROM");
            // assert.equal(10, tokens.data.length);
            // assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 1, 2);
            // assertEdit(tokens.data, SemanticTokenTypes.keyword, 5, 1, 0, 2);
        // });
        /**
         * RUN echo && \
         * 
         * WORKDIR /home
         * RUN echo
         */
        describe("escaped newline with whitespace", () => {
            it("\\n", () => {
                let tokens = computeSemanticTokens("RUN echo && \\\n\nWORKDIR /home\nRUN echo");
                assert.equal(10, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 5, 3, 0, 3);
            });
        });

        describe("inlined comments", () => {
            it("multiple \\n", () => {
                let content =
                    "FROM alpine\n" +
                    "RUN ls && \\\n" +
                    "ls && \\\n" +
                    "# Install\n" +
                    "ls && \\\n" +
                    "# Something '\n" +
                    "ls";
                let tokens = computeSemanticTokens(content);
                assert.equal(25, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.class, 5, 0, 5, 6);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 1, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 15, 2, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 20, 2, 0, 13);

                content =
                    "FROM alpine\n" +
                    "RUN ls && \\\n" +
                    "ls && \\\n" +
                    "# Install\n" +
                    "ls && \\\n" +
                    "# Something \"\n" +
                    "ls";
                tokens = computeSemanticTokens(content);
                assert.equal(25, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.class, 5, 0, 5, 6);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 1, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 15, 2, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 20, 2, 0, 13);
            });

            it("multiple \\r\\n", () => {
                let content =
                    "FROM alpine\r\n" +
                    "RUN ls && \\\r\n" +
                    "ls && \\\r\n" +
                    "# Install\r\n" +
                    "ls && \\\r\n" +
                    "# Something '\r\n" +
                    "ls";
                let tokens = computeSemanticTokens(content);
                assert.equal(25, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.class, 5, 0, 5, 6);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 1, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 15, 2, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 20, 2, 0, 13);

                content =
                    "FROM alpine\r\n" +
                    "RUN ls && \\\r\n" +
                    "ls && \\\r\n" +
                    "# Install\r\n" +
                    "ls && \\\r\n" +
                    "# Something \"\r\n" +
                    "ls";
                tokens = computeSemanticTokens(content);
                assert.equal(25, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.class, 5, 0, 5, 6);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 1, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 15, 2, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 20, 2, 0, 13);
            });

            it("instruction has # in it", () => {
                let content =
                    "RUN ls && \\\n" +
                    "# Install\n" +
                    "ls && #abc \\\n" +
                    "ls";
                let tokens = computeSemanticTokens(content);
                assert.equal(10, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 5, 1, 0, 9);

                content =
                    "RUN ls && \\\n" +
                    "# Install\n" +
                    "# Install\n" +
                    "ls && #abc \\\n" +
                    "ls";
                tokens = computeSemanticTokens(content);
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 5, 1, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 10, 1, 0, 9);
            });

            it("inlined comment with space in between", () => {
                let content =
                    "RUN ls \\\n" +
                    "# comment\n" +
                    "\n" +
                    "# comment\n" +
                    "pwd";
                let tokens = computeSemanticTokens(content);
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 5, 1, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 10, 2, 0, 9);

                content =
                    "RUN ls \\\r\n" +
                    "# comment\r\n" +
                    "\r\n" +
                    "# comment\r\n" +
                    "pwd";
                tokens = computeSemanticTokens(content);
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 5, 1, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 10, 2, 0, 9);
            });

            it("apostrophe in inlined comment", () => {
                let content =
                    "RUN ls \\\n" +
                    "    # It's\n" +
                    "    echo && echo";
                let tokens = computeSemanticTokens(content);
                assert.equal(10, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 5, 1, 4, 6);

                content =
                    "RUN ls \\\n" +
                    "\t# It's\n" +
                    "\techo && echo";
                tokens = computeSemanticTokens(content);
                assert.equal(10, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 5, 1, 1, 6);
            });

            it("quotation mark in inlined comment", () => {
                let content =
                    "RUN ls \\\n" +
                    "    # It\"s\n" +
                    "    echo && echo";
                let tokens = computeSemanticTokens(content);
                assert.equal(10, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 5, 1, 4, 6);

                content =
                    "RUN ls \\\n" +
                    "\t# It\"s\n" +
                    "\techo && echo";
                tokens = computeSemanticTokens(content);
                assert.equal(10, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 5, 1, 1, 6);
            });
        });
    });
});
