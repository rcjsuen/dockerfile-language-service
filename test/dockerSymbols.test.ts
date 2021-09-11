/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as assert from "assert";

import { TextDocument, SymbolInformation, SymbolKind, TextDocumentIdentifier } from 'vscode-languageserver-types';
import { DockerfileLanguageServiceFactory } from '../src/main';

const uri = "uri://host/Dockerfile.sample";
const service = DockerfileLanguageServiceFactory.createLanguageService();

function computeSymbols(content: string): SymbolInformation[] {
    return service.computeSymbols(TextDocumentIdentifier.create(uri), content);
}

describe("Dockerfile document symbols", function () {
    describe("no directives", function () {
        it("empty file", function () {
            let symbols = computeSymbols("");
            assert.strictEqual(symbols.length, 0);
        });

        it("comment", function () {
            let symbols = computeSymbols("#");
            assert.strictEqual(symbols.length, 0);

            symbols = computeSymbols("# comment");
            assert.strictEqual(symbols.length, 0);
        });
    });

    describe("directives", function () {
        describe("escape", function () {
            it("no space", function () {
                let symbols = computeSymbols("#escape=`");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "escape");
                assert.strictEqual(symbols[0].kind, SymbolKind.Property);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 1);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 7);
            });

            it("space", function () {
                let symbols = computeSymbols("# escape=`");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "escape");
                assert.strictEqual(symbols[0].kind, SymbolKind.Property);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 2);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 8);

                symbols = computeSymbols("#\tescape=`");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "escape");
                assert.strictEqual(symbols[0].kind, SymbolKind.Property);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 2);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 8);

                symbols = computeSymbols("# escape= `");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "escape");
                assert.strictEqual(symbols[0].kind, SymbolKind.Property);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 2);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 8);

                symbols = computeSymbols("# escape=\t`");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "escape");
                assert.strictEqual(symbols[0].kind, SymbolKind.Property);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 2);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 8);

                symbols = computeSymbols("# escape=` ");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "escape");
                assert.strictEqual(symbols[0].kind, SymbolKind.Property);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 2);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 8);
            });

            it("leading whitespace", function () {
                let symbols = computeSymbols(" #escape=`");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "escape");
                assert.strictEqual(symbols[0].kind, SymbolKind.Property);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 2);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 8);

                symbols = computeSymbols("\t#escape=`");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "escape");
                assert.strictEqual(symbols[0].kind, SymbolKind.Property);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 2);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 8);

                symbols = computeSymbols("# escape\t=\t` ");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "escape");
                assert.strictEqual(symbols[0].kind, SymbolKind.Property);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 2);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 8);
            });

            it("directive becomes a comment if not at the top", function () {
                let symbols = computeSymbols("\r#escape=`");
                assert.strictEqual(symbols.length, 0);

                symbols = computeSymbols("\n#escape=`");
                assert.strictEqual(symbols.length, 0);

                symbols = computeSymbols("\r\n#escape=`");
                assert.strictEqual(symbols.length, 0);
            });

            it("invalid directive definition with leading comment", function () {
                let symbols = computeSymbols("#\n#escape=`");
                assert.strictEqual(symbols.length, 0);

                symbols = computeSymbols("#\r\n#escape=`");
                assert.strictEqual(symbols.length, 0);

                symbols = computeSymbols("#comment\n#escape=`");
                assert.strictEqual(symbols.length, 0);
            });

            it("invalid directive definition with nothing", function () {
                let symbols = computeSymbols("#escape=");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "escape");
                assert.strictEqual(symbols[0].kind, SymbolKind.Property);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 1);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 7);

                symbols = computeSymbols("#escape=\r");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "escape");
                assert.strictEqual(symbols[0].kind, SymbolKind.Property);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 1);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 7);

                symbols = computeSymbols("#escape=\n");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "escape");
                assert.strictEqual(symbols[0].kind, SymbolKind.Property);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 1);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 7);
            });

            it("invalid directive name", function () {
                let symbols = computeSymbols("#eskape=`");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "eskape");
                assert.strictEqual(symbols[0].kind, SymbolKind.Property);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 1);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 7);
            });
        });

        describe("syntax", function () {
            it("no space", function () {
                let symbols = computeSymbols("#syntax=docker/dockerfile:experimental");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "syntax");
                assert.strictEqual(symbols[0].kind, SymbolKind.Property);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 1);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 7);
            });
        });

        describe("multiple directives", function () {
            it("escape and syntax", function () {
                let symbols = computeSymbols("#escape=`\n#syntax=docker/dockerfile:experimental");
                assert.strictEqual(symbols.length, 2);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "escape");
                assert.strictEqual(symbols[0].kind, SymbolKind.Property);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 1);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 7);
                assert.strictEqual(symbols[1].containerName, undefined);
                assert.strictEqual(symbols[1].deprecated, undefined);
                assert.strictEqual(symbols[1].name, "syntax");
                assert.strictEqual(symbols[1].kind, SymbolKind.Property);
                assert.strictEqual(symbols[1].location.uri, uri);
                assert.strictEqual(symbols[1].location.range.start.line, 1);
                assert.strictEqual(symbols[1].location.range.start.character, 1);
                assert.strictEqual(symbols[1].location.range.end.line, 1);
                assert.strictEqual(symbols[1].location.range.end.character, 7);
            });
        });
    });

    describe("instructions", function () {
        describe("single", function () {
            it("keyword only", function () {
                let symbols = computeSymbols("FROM");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "FROM");
                assert.strictEqual(symbols[0].kind, SymbolKind.Function);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 0);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 4);

                symbols = computeSymbols("FROM\r");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "FROM");
                assert.strictEqual(symbols[0].kind, SymbolKind.Function);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 0);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 4);

                symbols = computeSymbols("FROM\n");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "FROM");
                assert.strictEqual(symbols[0].kind, SymbolKind.Function);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 0);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 4);
            });

            it("valid", function () {
                let symbols = computeSymbols("FROM node");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "FROM");
                assert.strictEqual(symbols[0].kind, SymbolKind.Function);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 0);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 4);
            });

            it("MAINTAINER", function () {
                let symbols = computeSymbols("MAINTAINER abc");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, true);
                assert.strictEqual(symbols[0].name, "MAINTAINER");
                assert.strictEqual(symbols[0].kind, SymbolKind.Function);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 0);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 10);
            });

            it("escaped", function () {
                let symbols = computeSymbols("RUN npm install && \\\n\tnpm test");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "RUN");
                assert.strictEqual(symbols[0].kind, SymbolKind.Function);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 0);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 3);

                symbols = computeSymbols("RUN npm install && \\\r\tnpm test");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "RUN");
                assert.strictEqual(symbols[0].kind, SymbolKind.Function);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 0);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 3);

                symbols = computeSymbols("RUN npm install && \\\r\n\tnpm test");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "RUN");
                assert.strictEqual(symbols[0].kind, SymbolKind.Function);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 0);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 3);
            });

            it("keyword with escape character", function () {
                let symbols = computeSymbols("HEALTHCHECK\\\nNONE");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "HEALTHCHECKNONE");
                assert.strictEqual(symbols[0].kind, SymbolKind.Function);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 0);
                assert.strictEqual(symbols[0].location.range.end.line, 1);
                assert.strictEqual(symbols[0].location.range.end.character, 4);

                symbols = computeSymbols("HEALTHCHECK\\\r\nNONE");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "HEALTHCHECKNONE");
                assert.strictEqual(symbols[0].kind, SymbolKind.Function);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 0);
                assert.strictEqual(symbols[0].location.range.end.line, 1);
                assert.strictEqual(symbols[0].location.range.end.character, 4);

                symbols = computeSymbols("HEALTHCHECK\\\nNONE ");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "HEALTHCHECKNONE");
                assert.strictEqual(symbols[0].kind, SymbolKind.Function);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 0);
                assert.strictEqual(symbols[0].location.range.end.line, 1);
                assert.strictEqual(symbols[0].location.range.end.character, 4);

                symbols = computeSymbols("HEALTHCHECK\\\nNONE\r");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "HEALTHCHECKNONE");
                assert.strictEqual(symbols[0].kind, SymbolKind.Function);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 0);
                assert.strictEqual(symbols[0].location.range.end.line, 1);
                assert.strictEqual(symbols[0].location.range.end.character, 4);

                symbols = computeSymbols("HEALTHCHECK\\\nNONE\n");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "HEALTHCHECKNONE");
                assert.strictEqual(symbols[0].kind, SymbolKind.Function);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 0);
                assert.strictEqual(symbols[0].location.range.end.line, 1);
                assert.strictEqual(symbols[0].location.range.end.character, 4);
            });

            it("escape in string", function () {
                let symbols = computeSymbols("RUN echo \"\\\\n\"");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "RUN");
                assert.strictEqual(symbols[0].kind, SymbolKind.Function);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 0);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 3);
            });

            it("escape not with a newline", function () {
                let symbols = computeSymbols("FR\\om node");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "FR\\om");
                assert.strictEqual(symbols[0].kind, SymbolKind.Function);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 0);
                assert.strictEqual(symbols[0].location.range.start.character, 0);
                assert.strictEqual(symbols[0].location.range.end.line, 0);
                assert.strictEqual(symbols[0].location.range.end.character, 5);
            });

            it("whitespace", function () {
                let symbols = computeSymbols("\rFROM node");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "FROM");
                assert.strictEqual(symbols[0].kind, SymbolKind.Function);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 1);
                assert.strictEqual(symbols[0].location.range.start.character, 0);
                assert.strictEqual(symbols[0].location.range.end.line, 1);
                assert.strictEqual(symbols[0].location.range.end.character, 4);

                symbols = computeSymbols("\nFROM node");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "FROM");
                assert.strictEqual(symbols[0].kind, SymbolKind.Function);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 1);
                assert.strictEqual(symbols[0].location.range.start.character, 0);
                assert.strictEqual(symbols[0].location.range.end.line, 1);
                assert.strictEqual(symbols[0].location.range.end.character, 4);

                symbols = computeSymbols("\r\nFROM node");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "FROM");
                assert.strictEqual(symbols[0].kind, SymbolKind.Function);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 1);
                assert.strictEqual(symbols[0].location.range.start.character, 0);
                assert.strictEqual(symbols[0].location.range.end.line, 1);
                assert.strictEqual(symbols[0].location.range.end.character, 4);

                symbols = computeSymbols("\rFROM node\r");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "FROM");
                assert.strictEqual(symbols[0].kind, SymbolKind.Function);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 1);
                assert.strictEqual(symbols[0].location.range.start.character, 0);
                assert.strictEqual(symbols[0].location.range.end.line, 1);
                assert.strictEqual(symbols[0].location.range.end.character, 4);

                symbols = computeSymbols("\nFROM node\n");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "FROM");
                assert.strictEqual(symbols[0].kind, SymbolKind.Function);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 1);
                assert.strictEqual(symbols[0].location.range.start.character, 0);
                assert.strictEqual(symbols[0].location.range.end.line, 1);
                assert.strictEqual(symbols[0].location.range.end.character, 4);

                symbols = computeSymbols("\r\nFROM node\r\n");
                assert.strictEqual(symbols.length, 1);
                assert.strictEqual(symbols[0].containerName, undefined);
                assert.strictEqual(symbols[0].deprecated, undefined);
                assert.strictEqual(symbols[0].name, "FROM");
                assert.strictEqual(symbols[0].kind, SymbolKind.Function);
                assert.strictEqual(symbols[0].location.uri, uri);
                assert.strictEqual(symbols[0].location.range.start.line, 1);
                assert.strictEqual(symbols[0].location.range.start.character, 0);
                assert.strictEqual(symbols[0].location.range.end.line, 1);
                assert.strictEqual(symbols[0].location.range.end.character, 4);
            });
        });
    });
});
