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
    assert.equal(data[index], line);
    assert.equal(data[index + 1], startCharacter);
    assert.equal(data[index + 2], length);
    assert.notEqual(undefined, TokensLegend.getTokenType(tokenType));
    assert.notEqual(null, TokensLegend.getTokenType(tokenType));
    assert.equal(data[index + 3], TokensLegend.getTokenType(tokenType));
    assert.equal(data[index + 4], TokensLegend.getTokenModifiers(tokenModifiers));
}

describe("Dockerfile Semantic Token tests", () => {
    describe("keywords", () => {
        describe("FROM", () => {
            function createVariableDeclarationTests(keyword: string) {
                describe(keyword, () => {
                    it(keyword, () => {
                        const tokens = computeSemanticTokens(keyword);
                        assert.equal(5, tokens.data.length);
                        assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, keyword.length);
                    });

                    it(keyword + " var", () => {
                        const tokens = computeSemanticTokens(keyword + " var");
                        assert.equal(10, tokens.data.length);
                        assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, keyword.length);
                        assertEdit(tokens.data, SemanticTokenTypes.variable, 5, 0, keyword.length + 1, 3, [SemanticTokenModifiers.declaration]);
                    });

                    it(keyword + " var=value", () => {
                        const tokens = computeSemanticTokens(keyword + " var=value");
                        assert.equal(20, tokens.data.length);
                        assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, keyword.length);
                        assertEdit(tokens.data, SemanticTokenTypes.variable, 5, 0, keyword.length + 1, 3, [SemanticTokenModifiers.declaration]);
                        assertEdit(tokens.data, SemanticTokenTypes.operator, 10, 0, 3, 1);
                        assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 0, 1, 5);
                    });

                    it(keyword + " var=$var", () => {
                        const tokens = computeSemanticTokens(keyword + " var=$var");
                        assert.equal(20, tokens.data.length);
                        assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, keyword.length);
                        assertEdit(tokens.data, SemanticTokenTypes.variable, 5, 0, keyword.length + 1, 3, [SemanticTokenModifiers.declaration]);
                        assertEdit(tokens.data, SemanticTokenTypes.operator, 10, 0, 3, 1);
                        assertEdit(tokens.data, SemanticTokenTypes.variable, 15, 0, 1, 4, [SemanticTokenModifiers.reference]);
                    });

                    it(keyword + " PATH=$GOPATH/bin:/usr/local/go/bin:$PATH", () => {
                        const tokens = computeSemanticTokens(keyword + " PATH=$GOPATH/bin:/usr/local/go/bin:$PATH");
                        assert.equal(30, tokens.data.length);
                        assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, keyword.length);
                        assertEdit(tokens.data, SemanticTokenTypes.variable, 5, 0, keyword.length + 1, 4, [SemanticTokenModifiers.declaration]);
                        assertEdit(tokens.data, SemanticTokenTypes.operator, 10, 0, 4, 1);
                        assertEdit(tokens.data, SemanticTokenTypes.variable, 15, 0, 1, 7, [SemanticTokenModifiers.reference]);
                        assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 0, 7, 23);
                        assertEdit(tokens.data, SemanticTokenTypes.variable, 25, 0, 23, 5, [SemanticTokenModifiers.reference]);
                    });
                });
            }
            createVariableDeclarationTests("ARG");
            createVariableDeclarationTests("ENV");

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

            it("FROM node abc", () => {
                const tokens = computeSemanticTokens("FROM node abc");
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.class, 5, 0, 5, 4);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 10, 0, 5, 3);
            });

            it("FROM node AS build abc", () => {
                const tokens = computeSemanticTokens("FROM node AS build abc");
                assert.equal(25, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.class, 5, 0, 5, 4);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 0, 5, 2);
                assertEdit(tokens.data, SemanticTokenTypes.label, 15, 0, 3, 5);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 0, 6, 3);
            });
        });

        describe("HEALTHCHECK", () => {
            it("HEALTHCHECK", () => {
                const tokens = computeSemanticTokens("HEALTHCHECK");
                assert.equal(5, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 11);
            });

            it("HEALTHCHECK CMD ls", () => {
                const tokens = computeSemanticTokens("HEALTHCHECK CMD ls");
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 11);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 5, 0, 12, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 10, 0, 4, 2);
            });

            it("HEALTHCHECK CMD ls ''", () => {
                const tokens = computeSemanticTokens("HEALTHCHECK CMD ls ''");
                assert.equal(20, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 11);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 5, 0, 12, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 10, 0, 4, 2);
                assertEdit(tokens.data, SemanticTokenTypes.string, 15, 0, 3, 2);
            });

            it("--interval flag", () => {
                const tokens = computeSemanticTokens("HEALTHCHECK --interval=30s CMD ls");
                assert.equal(30, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 11);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 12, 10);
                assertEdit(tokens.data, SemanticTokenTypes.operator, 10, 0, 10, 1);
                assertEdit(tokens.data, SemanticTokenTypes.property, 15, 0, 1, 3);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 20, 0, 4, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 25, 0, 4, 2);
            });

            it("flag with empty string value", () => {
                const tokens = computeSemanticTokens("HEALTHCHECK --interval= CMD ls");
                assert.equal(25, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 11);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 12, 10);
                assertEdit(tokens.data, SemanticTokenTypes.operator, 10, 0, 10, 1);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 15, 0, 2, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 0, 4, 2);
            });

            it("incomplete flag", () => {
                const tokens = computeSemanticTokens("HEALTHCHECK --interval CMD ls");
                assert.equal(20, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 11);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 12, 10);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 0, 11, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 0, 4, 2);
            });

            it("HEALTHCHECK NONE", () => {
                const tokens = computeSemanticTokens("HEALTHCHECK NONE");
                assert.equal(10, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 11);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 5, 0, 12, 4);
            });
        });

        describe("MAINTAINER", () => {
            it("MAINTAINER name", () => {
                const tokens = computeSemanticTokens("MAINTAINER name");
                assert.equal(10, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 10, [SemanticTokenModifiers.deprecated]);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 11, 4);
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
                assert.equal(20, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 7);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 5, 0, 8, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 10, 0, 4, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 0, 2, 8);
            });

            it("ONBUILD HEALTHCHECK CMD", () => {
                const tokens = computeSemanticTokens("ONBUILD HEALTHCHECK CMD ls");
                assert.equal(20, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 7);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 5, 0, 8, 11);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 0, 12, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 0, 4, 2);
            });
        });

        describe("RUN", () => {
            it("RUN echo abc # def", () => {
                const tokens = computeSemanticTokens("RUN echo abc # def");
                assert.equal(25, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 10, 0, 5, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 0, 4, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 0, 2, 3);
            });

            it("RUN ab\\cd", () => {
                const tokens = computeSemanticTokens("RUN ab\\cd");
                assert.equal(10, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 5);
            });

            it("RUN ab\\cd\\\\nef", () => {
                const tokens = computeSemanticTokens("RUN ab\\cd\\\nef");
                assert.equal(20, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 5);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 5, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 1, 0, 2);
            });

            it("RUN ab\\cd\\\\n\\\\nef", () => {
                const tokens = computeSemanticTokens("RUN ab\\cd\\\n\\\nef");
                assert.equal(25, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 5);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 5, 1);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 15, 1, 0, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 1, 0, 2);
            });

            it("RUN ab\\cd \\t\\nef", () => {
                const tokens = computeSemanticTokens("RUN ab\\cd \t\\\nef");
                assert.equal(20, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 5);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 7, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 1, 0, 2);
            });

            it("RUN ab\\cd\\\\nef", () => {
                const tokens = computeSemanticTokens("RUN ab\\cd\\\nef");
                assert.equal(20, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 5);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 5, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 1, 0, 2);
            });

            it("RUN ab\\cd\\ \\nef", () => {
                const tokens = computeSemanticTokens("RUN ab\\cd\\ \nef");
                assert.equal(20, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 5);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 5, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 1, 0, 2);
            });

            it("RUN ab\\cd\\\\t\\nef", () => {
                const tokens = computeSemanticTokens("RUN ab\\cd\\\t\nef");
                assert.equal(20, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 5);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 5, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 1, 0, 2);
            });

            it("RUN a \\\\n#\\\\nb", () => {
                const tokens = computeSemanticTokens("RUN a \\\n#\\\nb");
                assert.equal(25, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 1);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 2, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 15, 1, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 1, 0, 1);
            });

            it("RUN a \\\\n#\\ a\\nb", () => {
                const tokens = computeSemanticTokens("RUN a \\\n#\\ a\nb");
                assert.equal(25, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 1);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 2, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 15, 1, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 1, 0, 1);
            });

            it("RUN --mount=type= go build", () => {
                const tokens = computeSemanticTokens("RUN --mount=type= go build");
                assert.equal(35, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 7);
                assertEdit(tokens.data, SemanticTokenTypes.operator, 10, 0, 7, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 0, 1, 4);
                assertEdit(tokens.data, SemanticTokenTypes.operator, 20, 0, 4, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 25, 0, 2, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 30, 0, 3, 5);
            });

            it("RUN --mount=type=cache go build", () => {
                const tokens = computeSemanticTokens("RUN --mount=type=cache go build");
                assert.equal(40, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 7);
                assertEdit(tokens.data, SemanticTokenTypes.operator, 10, 0, 7, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 0, 1, 4);
                assertEdit(tokens.data, SemanticTokenTypes.operator, 20, 0, 4, 1);
                assertEdit(tokens.data, SemanticTokenTypes.property, 25, 0, 1, 5);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 30, 0, 6, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 35, 0, 3, 5);
            });

            it("RUN --mount=type=cache,target=/root/cache go build", () => {
                const tokens = computeSemanticTokens("RUN --mount=type=cache,target=/root/cache go build");
                assert.equal(55, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 7);
                assertEdit(tokens.data, SemanticTokenTypes.operator, 10, 0, 7, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 0, 1, 4);
                assertEdit(tokens.data, SemanticTokenTypes.operator, 20, 0, 4, 1);
                assertEdit(tokens.data, SemanticTokenTypes.property, 25, 0, 1, 5);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 30, 0, 6, 6);
                assertEdit(tokens.data, SemanticTokenTypes.operator, 35, 0, 6, 1);
                assertEdit(tokens.data, SemanticTokenTypes.property, 40, 0, 1, 11);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 45, 0, 12, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 50, 0, 3, 5);
            });

            it("argument spans multiple lines", () => {
                const tokens = computeSemanticTokens("RUN echo abc # def\\\nghi");
                assert.equal(35, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 10, 0, 5, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 0, 4, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 0, 2, 3);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 25, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 30, 1, 0, 3);
            });

            it("multiline", () => {
                const tokens = computeSemanticTokens("RUN echo abc # def\\\n ghi");
                assert.equal(35, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 10, 0, 5, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 0, 4, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 0, 2, 3);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 25, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 30, 1, 1, 3);
            });
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
            assert.equal(20, tokens.data.length);
            assertEdit(tokens.data, SemanticTokenTypes.comment, 0, 0, 0, 2);
            assertEdit(tokens.data, SemanticTokenTypes.property, 5, 0, 2, 6);
            assertEdit(tokens.data, SemanticTokenTypes.operator, 10, 0, 6, 1);
            assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 0, 1, 1);
        });

        it("multiple", () => {
            const tokens = computeSemanticTokens("# a=\n# a=\n# b\nFROM node")
            assert.equal(45, tokens.data.length);
            assertEdit(tokens.data, SemanticTokenTypes.comment, 0, 0, 0, 2);
            assertEdit(tokens.data, SemanticTokenTypes.property, 5, 0, 2, 1);
            assertEdit(tokens.data, SemanticTokenTypes.operator, 10, 0, 1, 1);
            assertEdit(tokens.data, SemanticTokenTypes.comment, 15, 1, 0, 2);
            assertEdit(tokens.data, SemanticTokenTypes.property, 20, 0, 2, 1);
            assertEdit(tokens.data, SemanticTokenTypes.operator, 25, 0, 1, 1);
            assertEdit(tokens.data, SemanticTokenTypes.comment, 30, 1, 0, 3);
            assertEdit(tokens.data, SemanticTokenTypes.keyword, 35, 1, 0, 4);
            assertEdit(tokens.data, SemanticTokenTypes.class, 40, 0, 5, 4);
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

            it("multiline instruction with comment", () => {
                const tokens = computeSemanticTokens("RUN echo &&\\\necho\n# comment");
                assert.equal(30, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 10, 0, 5, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 15, 0, 2, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 1, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 25, 1, 0, 9);
            });

            it("mixed", () => {
                const tokens = computeSemanticTokens("FROM node\n# comment\nWORKDIR /opt/project\n# comment\nRUN echo");
                assert.equal(40, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.class, 5, 0, 5, 4);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 10, 1, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 15, 1, 0, 7);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 0, 8, 12);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 25, 1, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 30, 1, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 35, 0, 4, 4);
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

            it("RUN a$var", () => {
                const tokens = computeSemanticTokens("RUN a$var");
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 1);
                assertEdit(tokens.data, SemanticTokenTypes.variable, 10, 0, 1, 4, [SemanticTokenModifiers.reference]);
            });

            it("RUN $var $var", () => {
                const tokens = computeSemanticTokens("RUN $var $var");
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.variable, 5, 0, 4, 4, [SemanticTokenModifiers.reference]);
                assertEdit(tokens.data, SemanticTokenTypes.variable, 10, 0, 5, 4, [SemanticTokenModifiers.reference]);
            });

            it("FROM golang:$GO_VERSION AS", () => {
                const tokens = computeSemanticTokens("FROM golang:$GO_VERSION AS");
                assert.equal(20, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.class, 5, 0, 5, 6);
                assertEdit(tokens.data, SemanticTokenTypes.variable, 10, 0, 7, 11, [SemanticTokenModifiers.reference]);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 15, 0, 12, 2);
            });

            it("HEALTHCHECK --timeout=$a CMD ls", () => {
                const tokens = computeSemanticTokens("HEALTHCHECK --timeout=$a CMD ls");
                assert.equal(30, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 11);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 12, 9);
                assertEdit(tokens.data, SemanticTokenTypes.operator, 10, 0, 9, 1);
                assertEdit(tokens.data, SemanticTokenTypes.variable, 15, 0, 1, 2, [SemanticTokenModifiers.reference]);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 20, 0, 3, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 25, 0, 4, 2);
            });
        });

        describe("${var}", () => {
            it("RUN ${var}", () => {
                const tokens = computeSemanticTokens("RUN ${var}");
                assert.equal(10, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.variable, 5, 0, 4, 6, [SemanticTokenModifiers.reference]);
            });

            it("RUN a${var}b", () => {
                const tokens = computeSemanticTokens("RUN a${var}b");
                assert.equal(20, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 1);
                assertEdit(tokens.data, SemanticTokenTypes.variable, 10, 0, 1, 6, [SemanticTokenModifiers.reference]);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 0, 6, 1);
            });

            it("RUN ${var}b", () => {
                const tokens = computeSemanticTokens("RUN ${var}b");
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.variable, 5, 0, 4, 6, [SemanticTokenModifiers.reference]);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 10, 0, 6, 1);
            });

            it("RUN ${var} ${var}", () => {
                const tokens = computeSemanticTokens("RUN ${var} ${var}");
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.variable, 5, 0, 4, 6, [SemanticTokenModifiers.reference]);
                assertEdit(tokens.data, SemanticTokenTypes.variable, 10, 0, 7, 6, [SemanticTokenModifiers.reference]);
            });

            it("HEALTHCHECK --timeout=${a} CMD ls", () => {
                const tokens = computeSemanticTokens("HEALTHCHECK --timeout=${a} CMD ls");
                assert.equal(30, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 11);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 12, 9);
                assertEdit(tokens.data, SemanticTokenTypes.operator, 10, 0, 9, 1);
                assertEdit(tokens.data, SemanticTokenTypes.variable, 15, 0, 1, 4, [SemanticTokenModifiers.reference]);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 20, 0, 5, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 25, 0, 4, 2);
            });
        });
    });

    describe("strings", () => {
        describe("enclosed", () => {
            describe("single quotes", () => {
                it("RUN echo 'hello'", () => {
                    const tokens = computeSemanticTokens("RUN echo 'hello'");
                    assert.equal(15, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 7);
                });

                it("RUN echo 'hello'a", () => {
                    const tokens = computeSemanticTokens("RUN echo 'hello'a");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 7);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 0, 7, 1);
                });

                it("RUN echo a'hello'", () => {
                    const tokens = computeSemanticTokens("RUN echo a'hello'");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 10, 0, 5, 1);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 15, 0, 1, 7);
                });

                it("RUN echo 'hello' 'world'", () => {
                    const tokens = computeSemanticTokens("RUN echo 'hello' 'world'");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 7);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 15, 0, 8, 7);
                });

                it("RUN echo '$var'", () => {
                    const tokens = computeSemanticTokens("RUN echo '$var'");
                    assert.equal(25, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 1);
                    assertEdit(tokens.data, SemanticTokenTypes.variable, 15, 0, 1, 4, [SemanticTokenModifiers.reference]);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 20, 0, 4, 1);
                });
            });

            describe("double quotes", () => {
                it("RUN echo \"hello\"", () => {
                    const tokens = computeSemanticTokens("RUN echo \"hello\"");
                    assert.equal(15, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 7);
                });

                it("RUN echo a\"hello\"", () => {
                    const tokens = computeSemanticTokens("RUN echo a\"hello\"");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 10, 0, 5, 1);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 15, 0, 1, 7);
                });

                it("RUN echo \"hello\"a", () => {
                    const tokens = computeSemanticTokens("RUN echo \"hello\"a");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 7);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 0, 7, 1);
                });

                it("RUN echo \"hello\" \"world\"", () => {
                    const tokens = computeSemanticTokens("RUN echo \"hello\" \"world\"");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 7);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 15, 0, 8, 7);
                });

                it("RUN echo \"$var\"", () => {
                    const tokens = computeSemanticTokens("RUN echo \"$var\"");
                    assert.equal(25, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 1);
                    assertEdit(tokens.data, SemanticTokenTypes.variable, 15, 0, 1, 4, [SemanticTokenModifiers.reference]);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 20, 0, 4, 1);
                });
            });
        });

        describe("open", () => {
            describe("single quotes", () => {
                it("RUN echo 'hello", () => {
                    const tokens = computeSemanticTokens("RUN echo 'hello");
                    assert.equal(15, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 6);
                });

                it("RUN echo a'hello", () => {
                    const tokens = computeSemanticTokens("RUN echo a'hello");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 10, 0, 5, 1);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 15, 0, 1, 6);
                });

                it("RUN echo 'hello world", () => {
                    const tokens = computeSemanticTokens("RUN echo 'hello world");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 6);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 15, 0, 7, 5);
                });

                it("RUN '\\\\ng", () => {
                    const tokens = computeSemanticTokens("RUN '\\\ng");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 5, 0, 4, 1);
                    assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 1, 1);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 15, 1, 0, 1);
                });

                it("RUN echo '$var", () => {
                    const tokens = computeSemanticTokens("RUN echo '$var");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 1);
                    assertEdit(tokens.data, SemanticTokenTypes.variable, 15, 0, 1, 4, [SemanticTokenModifiers.reference]);
                });
            });

            describe("double quotes", () => {
                it("RUN echo \"hello", () => {
                    const tokens = computeSemanticTokens("RUN echo \"hello");
                    assert.equal(15, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 6);
                });

                it("RUN echo a\"hello", () => {
                    const tokens = computeSemanticTokens("RUN echo a\"hello");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 10, 0, 5, 1);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 15, 0, 1, 6);
                });

                it("RUN echo \"hello world", () => {
                    const tokens = computeSemanticTokens("RUN echo \"hello world");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 6);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 15, 0, 7, 5);
                });

                it("RUN \"\\\\ng", () => {
                    const tokens = computeSemanticTokens("RUN \"\\\ng");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 5, 0, 4, 1);
                    assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 1, 1);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 15, 1, 0, 1);
                });

                it("RUN echo \"$var", () => {
                    const tokens = computeSemanticTokens("RUN echo \"$var");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 1);
                    assertEdit(tokens.data, SemanticTokenTypes.variable, 15, 0, 1, 4, [SemanticTokenModifiers.reference]);
                });
            });

            describe("mixed quotes", () => {
                it("RUN echo \"hello'", () => {
                    const tokens = computeSemanticTokens("RUN echo \"hello'");
                    assert.equal(15, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 7);
                });

                it("RUN echo \"hello' world", () => {
                    const tokens = computeSemanticTokens("RUN echo \"hello' world");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 7);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 15, 0, 8, 5);
                });

                it("RUN echo 'hello\" world", () => {
                    const tokens = computeSemanticTokens("RUN echo 'hello\" world");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 7);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 15, 0, 8, 5);
                });
            });
        });

        describe("escaped", () => {
            describe("single quotes", () => {
                it("RUN echo \\'", () => {
                    const tokens = computeSemanticTokens("RUN echo \\'");
                    assert.equal(15, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 2);
                });

                it("RUN echo \\'$var", () => {
                    const tokens = computeSemanticTokens("RUN echo \\'$var");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 2);
                    assertEdit(tokens.data, SemanticTokenTypes.variable, 15, 0, 2, 4, [SemanticTokenModifiers.reference]);
                });

                it("RUN echo $var\\'", () => {
                    const tokens = computeSemanticTokens("RUN echo $var\\'");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.variable, 10, 0, 5, 4, [SemanticTokenModifiers.reference]);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 15, 0, 4, 2);
                });

                it("RUN echo \\'$var\\'", () => {
                    const tokens = computeSemanticTokens("RUN echo \\'$var\\'");
                    assert.equal(25, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 2);
                    assertEdit(tokens.data, SemanticTokenTypes.variable, 15, 0, 2, 4, [SemanticTokenModifiers.reference]);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 20, 0, 4, 2);
                });

                it("RUN echo 'hello\\''", () => {
                    const tokens = computeSemanticTokens("RUN echo 'hello\\''");
                    assert.equal(15, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 9);
                });

                it("RUN echo \\'\\' abc", () => {
                    const tokens = computeSemanticTokens("RUN echo \\'\\' abc");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 0, 5, 3);
                });

                it("RUN echo \\''\\'", () => {
                    const tokens = computeSemanticTokens("RUN echo \\''\\'");
                    assert.equal(15, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 5);
                });

                it("RUN a\\'", () => {
                    const tokens = computeSemanticTokens("RUN a\\'");
                    assert.equal(15, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 1);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 1, 2);
                });

                it("RUN a\\'\\'", () => {
                    const tokens = computeSemanticTokens("RUN a\\'\\'");
                    assert.equal(15, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 1);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 1, 4);
                });

                it("RUN a\\'b\\'", () => {
                    const tokens = computeSemanticTokens("RUN a\\'b\\'");
                    assert.equal(15, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 1);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 1, 5);
                });

                it("RUN a\\'b\\'c", () => {
                    const tokens = computeSemanticTokens("RUN a\\'b\\'c");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 1);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 1, 5);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 0, 5, 1);
                });
            });

            describe("double quotes", () => {
                it("RUN echo \\\"", () => {
                    const tokens = computeSemanticTokens("RUN echo \\\"");
                    assert.equal(15, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 2);
                });

                it("RUN echo \\\"$var", () => {
                    const tokens = computeSemanticTokens("RUN echo \\\"$var");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 2);
                    assertEdit(tokens.data, SemanticTokenTypes.variable, 15, 0, 2, 4, [SemanticTokenModifiers.reference]);
                });

                it("RUN echo $var\\\"", () => {
                    const tokens = computeSemanticTokens("RUN echo $var\\\"");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.variable, 10, 0, 5, 4, [SemanticTokenModifiers.reference]);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 15, 0, 4, 2);
                });

                it("RUN echo \\\"$var\\\"", () => {
                    const tokens = computeSemanticTokens("RUN echo \\\"$var\\\"");
                    assert.equal(25, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 2);
                    assertEdit(tokens.data, SemanticTokenTypes.variable, 15, 0, 2, 4, [SemanticTokenModifiers.reference]);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 20, 0, 4, 2);
                });

                it("RUN echo \"hello\\\"\"", () => {
                    const tokens = computeSemanticTokens("RUN echo \"hello\\\"\"");
                    assert.equal(15, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 9);
                });

                it("RUN echo \\\"\\\" abc", () => {
                    const tokens = computeSemanticTokens("RUN echo \\\"\\\" abc");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 0, 5, 3);
                });

                it("RUN echo \\\"\"\\\"", () => {
                    const tokens = computeSemanticTokens("RUN echo \\\"\"\\\"");
                    assert.equal(15, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 5, 5);
                });

                it("RUN a\\\"", () => {
                    const tokens = computeSemanticTokens("RUN a\\\"");
                    assert.equal(15, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 1);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 1, 2);
                });

                it("RUN a\\\"\\\"", () => {
                    const tokens = computeSemanticTokens("RUN a\\\"\\\"");
                    assert.equal(15, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 1);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 1, 4);
                });

                it("RUN a\\\"b\\\"", () => {
                    const tokens = computeSemanticTokens("RUN a\\\"b\\\"");
                    assert.equal(15, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 1);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 1, 5);
                });

                it("RUN a\\\"b\\\"c", () => {
                    const tokens = computeSemanticTokens("RUN a\\\"b\\\"c");
                    assert.equal(20, tokens.data.length);
                    assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 1);
                    assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 1, 5);
                    assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 0, 5, 1);
                });
            });

            it("RUN echo \\", () => {
                const tokens = computeSemanticTokens("RUN echo \\");
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                // no newline so can't determine whether this should be treated different or not
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 10, 0, 5, 1);
            });
        });
    });

    describe("multiline", () => {
        describe("open whitespace", () => {
            it("single quote", () => {
                const tokens = computeSemanticTokens("RUN It's\nRUN echo");
                assert.equal(25, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 2);
                assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 2, 2);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 15, 1, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 0, 4, 4);
            });

            it("double quote", () => {
                const tokens = computeSemanticTokens("RUN It\"s\nRUN echo");
                assert.equal(25, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 2);
                assertEdit(tokens.data, SemanticTokenTypes.string, 10, 0, 2, 2);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 15, 1, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 0, 4, 4);
            });
        });

        describe("split keyword", () => {
            it("keyword split by \\\\n", () => {
                let tokens = computeSemanticTokens("FR\\\nOM");
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 5, 0, 2, 1);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 1, 0, 2);

                tokens = computeSemanticTokens("FR\\\n\nOM");
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 5, 0, 2, 1);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 2, 0, 2);
            });

            it("embedded comment", () => {
                const tokens = computeSemanticTokens("FR\\\n#\nOM");
                assert.equal(20, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 5, 0, 2, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 10, 1, 0, 1);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 15, 1, 0, 2);
            });

            it("keyword split by \\\\r\\n", () => {
                let tokens = computeSemanticTokens("FR\\\r\nOM");
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 5, 0, 2, 1);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 1, 0, 2);

                tokens = computeSemanticTokens("FR\\\r\n\r\nOM");
                assert.equal(15, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 5, 0, 2, 1);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 2, 0, 2);
            });

            it("FR\\\\nOM alpine", () => {
                const tokens = computeSemanticTokens("FR\\\nOM alpine");
                assert.equal(20, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 5, 0, 2, 1);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 1, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.class, 15, 0, 3, 6);
            });

            it("FR\\\\r\\nOM alpine", () => {
                const tokens = computeSemanticTokens("FR\\\r\nOM alpine");
                assert.equal(20, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 5, 0, 2, 1);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 1, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.class, 15, 0, 3, 6);
            });
        });

        describe("split arguments", () => {
            it("embedded comment", () => {
                const tokens = computeSemanticTokens("RUN a\\\n#\nb");
                assert.equal(25, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 1);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 1, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 15, 1, 0, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 1, 0, 1);
            });

            it("embedded comment with # in argument", () => {
                const tokens = computeSemanticTokens("RUN a\\\n##\nb#c");
                assert.equal(25, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 1);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 1, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 15, 1, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 1, 0, 3);
            });

            it("empty line", () => {
                const tokens = computeSemanticTokens("RUN a\\\n\nb");
                assert.equal(20, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 1);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 1, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 2, 0, 1);
            });
        });

        describe("multiple splits", () => {
            it("keyword", () => {
                const tokens = computeSemanticTokens("HE\\\n#\nAL\\\n#\nTHCHECK");
                assert.equal(35, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 5, 0, 2, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 10, 1, 0, 1);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 15, 1, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 20, 0, 2, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 25, 1, 0, 1);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 30, 1, 0, 7);
            });

            it("argument", () => {
                const tokens = computeSemanticTokens("RUN e\\\n#\nch\\\n#\no");
                assert.equal(40, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 1);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 1, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 15, 1, 0, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 1, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 25, 0, 2, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 30, 1, 0, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 35, 1, 0, 1);
            });

            it("argument with # and \\", () => {
                const tokens = computeSemanticTokens("RUN 1\\\n# \t\r\n2\\\n#\n3#\\4\\\n5");
                assert.equal(50, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 1);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 1, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 15, 1, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 1, 0, 1);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 25, 0, 1, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 30, 1, 0, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 35, 1, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 40, 0, 4, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 45, 1, 0, 1);
            });
        });

        /**
         * RUN echo && \
         * 
         * WORKDIR /home
         * RUN echo
         */
        describe("escaped newline with whitespace", () => {
            it("\\n", () => {
                let tokens = computeSemanticTokens("RUN echo && \\\n\nWORKDIR /home\nRUN echo");
                assert.equal(40, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 4);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 10, 0, 5, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 15, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 2, 0, 7);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 25, 0, 8, 5);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 30, 1, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 35, 0, 4, 4);
            });
        });

        describe("multi word strings", () => {
            it("FROM node\nRUN 'and now'", () => {
                let tokens = computeSemanticTokens("FROM node\nRUN 'and now'");
                assert.equal(25, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.class, 5, 0, 5, 4);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 1, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.string, 15, 0, 4, 4);
                assertEdit(tokens.data, SemanticTokenTypes.string, 20, 0, 5, 4);
            });
        });

        describe("flags", () => {
            it("flags on separate lines", () => {
                const tokens = computeSemanticTokens("HEALTHCHECK --interval=30s \\\n--timeout=30s CMD ls");
                assert.equal(50, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 11);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 12, 10);
                assertEdit(tokens.data, SemanticTokenTypes.operator, 10, 0, 10, 1);
                assertEdit(tokens.data, SemanticTokenTypes.property, 15, 0, 1, 3);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 20, 0, 4, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 25, 1, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.operator, 30, 0, 9, 1);
                assertEdit(tokens.data, SemanticTokenTypes.property, 35, 0, 1, 3);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 40, 0, 4, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 45, 0, 4, 2);
            });

            it("flags on separate lines with embedded comment", () => {
                const tokens = computeSemanticTokens("HEALTHCHECK --interval=30s \\\n # comment\n--timeout=30s CMD ls");
                assert.equal(55, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 11);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 12, 10);
                assertEdit(tokens.data, SemanticTokenTypes.operator, 10, 0, 10, 1);
                assertEdit(tokens.data, SemanticTokenTypes.property, 15, 0, 1, 3);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 20, 0, 4, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 25, 1, 1, 9);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 30, 1, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.operator, 35, 0, 9, 1);
                assertEdit(tokens.data, SemanticTokenTypes.property, 40, 0, 1, 3);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 45, 0, 4, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 50, 0, 4, 2);
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
                assert.equal(75, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.class, 5, 0, 5, 6);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 1, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 0, 4, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 0, 3, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 25, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 30, 1, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 35, 0, 3, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 40, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 45, 1, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 50, 1, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 55, 0, 3, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 60, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 65, 1, 0, 13);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 70, 1, 0, 2);

                content =
                    "FROM alpine\n" +
                    "RUN ls && \\\n" +
                    "ls && \\\n" +
                    "# Install\n" +
                    "ls && \\\n" +
                    "# Something \"\n" +
                    "ls";
                tokens = computeSemanticTokens(content);
                assert.equal(75, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.class, 5, 0, 5, 6);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 1, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 0, 4, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 0, 3, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 25, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 30, 1, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 35, 0, 3, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 40, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 45, 1, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 50, 1, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 55, 0, 3, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 60, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 65, 1, 0, 13);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 70, 1, 0, 2);
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
                assert.equal(75, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.class, 5, 0, 5, 6);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 1, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 0, 4, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 0, 3, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 25, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 30, 1, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 35, 0, 3, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 40, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 45, 1, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 50, 1, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 55, 0, 3, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 60, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 65, 1, 0, 13);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 70, 1, 0, 2);

                content =
                    "FROM alpine\r\n" +
                    "RUN ls && \\\r\n" +
                    "ls && \\\r\n" +
                    "# Install\r\n" +
                    "ls && \\\r\n" +
                    "# Something \"\r\n" +
                    "ls";
                tokens = computeSemanticTokens(content);
                assert.equal(75, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 4);
                assertEdit(tokens.data, SemanticTokenTypes.class, 5, 0, 5, 6);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 10, 1, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 15, 0, 4, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 0, 3, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 25, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 30, 1, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 35, 0, 3, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 40, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 45, 1, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 50, 1, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 55, 0, 3, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 60, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 65, 1, 0, 13);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 70, 1, 0, 2);
            });

            it("instruction has # in it", () => {
                let content =
                    "RUN ls && \\\n" +
                    "# Install\n" +
                    "ls && #abc \\\n" +
                    "ls";
                let tokens = computeSemanticTokens(content);
                assert.equal(50, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 10, 0, 3, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 15, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 20, 1, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 25, 1, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 30, 0, 3, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 35, 0, 3, 4);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 40, 0, 5, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 45, 1, 0, 2);

                content =
                    "RUN ls && \\\n" +
                    "# Install\n" +
                    "# Install\n" +
                    "ls && #abc \\\n" +
                    "ls";
                tokens = computeSemanticTokens(content);
                assert.equal(55, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 10, 0, 3, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 15, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 20, 1, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 25, 1, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 30, 1, 0, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 35, 0, 3, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 40, 0, 3, 4);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 45, 0, 5, 1);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 50, 1, 0, 2);
            });

            it("inlined comment with space in between", () => {
                let content =
                    "RUN ls \\\n" +
                    "# comment\n" +
                    "\n" +
                    "# comment\n" +
                    "pwd";
                let tokens = computeSemanticTokens(content);
                assert.equal(30, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 15, 1, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 20, 2, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 25, 1, 0, 3);

                content =
                    "RUN ls \\\r\n" +
                    "# comment\r\n" +
                    "\r\n" +
                    "# comment\r\n" +
                    "pwd";
                tokens = computeSemanticTokens(content);
                assert.equal(30, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 15, 1, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 20, 2, 0, 9);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 25, 1, 0, 3);
            });

            it("apostrophe in inlined comment", () => {
                let content =
                    "RUN ls \\\n" +
                    "    # It's\n" +
                    "    echo && echo";
                let tokens = computeSemanticTokens(content);
                assert.equal(35, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 15, 1, 4, 6);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 1, 4, 4);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 25, 0, 5, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 30, 0, 3, 4);

                content =
                    "RUN ls \\\n" +
                    "\t# It's\n" +
                    "\techo && echo";
                tokens = computeSemanticTokens(content);
                assert.equal(35, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 15, 1, 1, 6);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 1, 1, 4);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 25, 0, 5, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 30, 0, 3, 4);

                content =
                    "RUN ls \\\n" +
                    "    # It's\r\n" +
                    "    echo && echo";
                tokens = computeSemanticTokens(content);
                assert.equal(35, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 15, 1, 4, 6);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 1, 4, 4);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 25, 0, 5, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 30, 0, 3, 4);
            });

            it("quotation mark in inlined comment", () => {
                let content =
                    "RUN ls \\\n" +
                    "    # It\"s\n" +
                    "    echo && echo";
                let tokens = computeSemanticTokens(content);
                assert.equal(35, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 15, 1, 4, 6);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 1, 4, 4);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 25, 0, 5, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 30, 0, 3, 4);

                content =
                    "RUN ls \\\n" +
                    "\t# It\"s\n" +
                    "\techo && echo";
                tokens = computeSemanticTokens(content);
                assert.equal(35, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 15, 1, 1, 6);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 1, 1, 4);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 25, 0, 5, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 30, 0, 3, 4);
            });

            it("comment in comment", () => {
                let content =
                    "RUN ls \\\n" +
                    "    # It#s\n" +
                    "    echo && echo";
                let tokens = computeSemanticTokens(content);
                assert.equal(35, tokens.data.length);
                assertEdit(tokens.data, SemanticTokenTypes.keyword, 0, 0, 0, 3);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 5, 0, 4, 2);
                assertEdit(tokens.data, SemanticTokenTypes.macro, 10, 0, 3, 1);
                assertEdit(tokens.data, SemanticTokenTypes.comment, 15, 1, 4, 6);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 20, 1, 4, 4);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 25, 0, 5, 2);
                assertEdit(tokens.data, SemanticTokenTypes.parameter, 30, 0, 3, 4);
            });
        });
    });
});
