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
            assert.equal(symbols.length, 0);
        });

        it("comment", function () {
            let symbols = computeSymbols("#");
            assert.equal(symbols.length, 0);

            symbols = computeSymbols("# comment");
            assert.equal(symbols.length, 0);
        });
    });

    describe("directives", function () {
        it("escape directive", function () {
            let symbols = computeSymbols("#escape=`");
            assert.equal(symbols.length, 1);
            assert.equal(symbols[0].containerName, undefined);
            assert.equal(symbols[0].deprecated, undefined);
            assert.equal(symbols[0].name, "escape");
            assert.equal(symbols[0].kind, SymbolKind.Property);
            assert.equal(symbols[0].location.uri, uri);
            assert.equal(symbols[0].location.range.start.line, 0);
            assert.equal(symbols[0].location.range.start.character, 1);
            assert.equal(symbols[0].location.range.end.line, 0);
            assert.equal(symbols[0].location.range.end.character, 7);
        });

        it("space", function () {
            let symbols = computeSymbols("# escape=`");
            assert.equal(symbols.length, 1);
            assert.equal(symbols[0].containerName, undefined);
            assert.equal(symbols[0].deprecated, undefined);
            assert.equal(symbols[0].name, "escape");
            assert.equal(symbols[0].kind, SymbolKind.Property);
            assert.equal(symbols[0].location.uri, uri);
            assert.equal(symbols[0].location.range.start.line, 0);
            assert.equal(symbols[0].location.range.start.character, 2);
            assert.equal(symbols[0].location.range.end.line, 0);
            assert.equal(symbols[0].location.range.end.character, 8);

            symbols = computeSymbols("#\tescape=`");
            assert.equal(symbols.length, 1);
            assert.equal(symbols[0].containerName, undefined);
            assert.equal(symbols[0].deprecated, undefined);
            assert.equal(symbols[0].name, "escape");
            assert.equal(symbols[0].kind, SymbolKind.Property);
            assert.equal(symbols[0].location.uri, uri);
            assert.equal(symbols[0].location.range.start.line, 0);
            assert.equal(symbols[0].location.range.start.character, 2);
            assert.equal(symbols[0].location.range.end.line, 0);
            assert.equal(symbols[0].location.range.end.character, 8);

            symbols = computeSymbols("# escape= `");
            assert.equal(symbols.length, 1);
            assert.equal(symbols[0].containerName, undefined);
            assert.equal(symbols[0].deprecated, undefined);
            assert.equal(symbols[0].name, "escape");
            assert.equal(symbols[0].kind, SymbolKind.Property);
            assert.equal(symbols[0].location.uri, uri);
            assert.equal(symbols[0].location.range.start.line, 0);
            assert.equal(symbols[0].location.range.start.character, 2);
            assert.equal(symbols[0].location.range.end.line, 0);
            assert.equal(symbols[0].location.range.end.character, 8);

            symbols = computeSymbols("# escape=\t`");
            assert.equal(symbols.length, 1);
            assert.equal(symbols[0].containerName, undefined);
            assert.equal(symbols[0].deprecated, undefined);
            assert.equal(symbols[0].name, "escape");
            assert.equal(symbols[0].kind, SymbolKind.Property);
            assert.equal(symbols[0].location.uri, uri);
            assert.equal(symbols[0].location.range.start.line, 0);
            assert.equal(symbols[0].location.range.start.character, 2);
            assert.equal(symbols[0].location.range.end.line, 0);
            assert.equal(symbols[0].location.range.end.character, 8);

            symbols = computeSymbols("# escape=` ");
            assert.equal(symbols.length, 1);
            assert.equal(symbols[0].containerName, undefined);
            assert.equal(symbols[0].deprecated, undefined);
            assert.equal(symbols[0].name, "escape");
            assert.equal(symbols[0].kind, SymbolKind.Property);
            assert.equal(symbols[0].location.uri, uri);
            assert.equal(symbols[0].location.range.start.line, 0);
            assert.equal(symbols[0].location.range.start.character, 2);
            assert.equal(symbols[0].location.range.end.line, 0);
            assert.equal(symbols[0].location.range.end.character, 8);
        });

        it("leading whitespace", function () {
            let symbols = computeSymbols(" #escape=`");
            assert.equal(symbols.length, 1);
            assert.equal(symbols[0].containerName, undefined);
            assert.equal(symbols[0].deprecated, undefined);
            assert.equal(symbols[0].name, "escape");
            assert.equal(symbols[0].kind, SymbolKind.Property);
            assert.equal(symbols[0].location.uri, uri);
            assert.equal(symbols[0].location.range.start.line, 0);
            assert.equal(symbols[0].location.range.start.character, 2);
            assert.equal(symbols[0].location.range.end.line, 0);
            assert.equal(symbols[0].location.range.end.character, 8);

            symbols = computeSymbols("\t#escape=`");
            assert.equal(symbols.length, 1);
            assert.equal(symbols[0].containerName, undefined);
            assert.equal(symbols[0].deprecated, undefined);
            assert.equal(symbols[0].name, "escape");
            assert.equal(symbols[0].kind, SymbolKind.Property);
            assert.equal(symbols[0].location.uri, uri);
            assert.equal(symbols[0].location.range.start.line, 0);
            assert.equal(symbols[0].location.range.start.character, 2);
            assert.equal(symbols[0].location.range.end.line, 0);
            assert.equal(symbols[0].location.range.end.character, 8);

            symbols = computeSymbols("# escape\t=\t` ");
            assert.equal(symbols.length, 1);
            assert.equal(symbols[0].containerName, undefined);
            assert.equal(symbols[0].deprecated, undefined);
            assert.equal(symbols[0].name, "escape");
            assert.equal(symbols[0].kind, SymbolKind.Property);
            assert.equal(symbols[0].location.uri, uri);
            assert.equal(symbols[0].location.range.start.line, 0);
            assert.equal(symbols[0].location.range.start.character, 2);
            assert.equal(symbols[0].location.range.end.line, 0);
            assert.equal(symbols[0].location.range.end.character, 8);
        });

        it("directive becomes a comment if not at the top", function () {
            let symbols = computeSymbols("\r#escape=`");
            assert.equal(symbols.length, 0);

            symbols = computeSymbols("\n#escape=`");
            assert.equal(symbols.length, 0);

            symbols = computeSymbols("\r\n#escape=`");
            assert.equal(symbols.length, 0);
        });

        it("invalid directive definition with leading comment", function () {
            let symbols = computeSymbols("#\n#escape=`");
            assert.equal(symbols.length, 0);

            symbols = computeSymbols("#\r\n#escape=`");
            assert.equal(symbols.length, 0);

            symbols = computeSymbols("#comment\n#escape=`");
            assert.equal(symbols.length, 0);
        });

        it("invalid directive definition with nothing", function () {
            let symbols = computeSymbols("#escape=");
            assert.equal(symbols.length, 1);
            assert.equal(symbols[0].containerName, undefined);
            assert.equal(symbols[0].deprecated, undefined);
            assert.equal(symbols[0].name, "escape");
            assert.equal(symbols[0].kind, SymbolKind.Property);
            assert.equal(symbols[0].location.uri, uri);
            assert.equal(symbols[0].location.range.start.line, 0);
            assert.equal(symbols[0].location.range.start.character, 1);
            assert.equal(symbols[0].location.range.end.line, 0);
            assert.equal(symbols[0].location.range.end.character, 7);

            symbols = computeSymbols("#escape=\r");
            assert.equal(symbols.length, 1);
            assert.equal(symbols[0].containerName, undefined);
            assert.equal(symbols[0].deprecated, undefined);
            assert.equal(symbols[0].name, "escape");
            assert.equal(symbols[0].kind, SymbolKind.Property);
            assert.equal(symbols[0].location.uri, uri);
            assert.equal(symbols[0].location.range.start.line, 0);
            assert.equal(symbols[0].location.range.start.character, 1);
            assert.equal(symbols[0].location.range.end.line, 0);
            assert.equal(symbols[0].location.range.end.character, 7);

            symbols = computeSymbols("#escape=\n");
            assert.equal(symbols.length, 1);
            assert.equal(symbols[0].containerName, undefined);
            assert.equal(symbols[0].deprecated, undefined);
            assert.equal(symbols[0].name, "escape");
            assert.equal(symbols[0].kind, SymbolKind.Property);
            assert.equal(symbols[0].location.uri, uri);
            assert.equal(symbols[0].location.range.start.line, 0);
            assert.equal(symbols[0].location.range.start.character, 1);
            assert.equal(symbols[0].location.range.end.line, 0);
            assert.equal(symbols[0].location.range.end.character, 7);
        });

        it("invalid directive name", function () {
            let symbols = computeSymbols("#eskape=`");
            assert.equal(symbols.length, 1);
            assert.equal(symbols[0].containerName, undefined);
            assert.equal(symbols[0].deprecated, undefined);
            assert.equal(symbols[0].name, "eskape");
            assert.equal(symbols[0].kind, SymbolKind.Property);
            assert.equal(symbols[0].location.uri, uri);
            assert.equal(symbols[0].location.range.start.line, 0);
            assert.equal(symbols[0].location.range.start.character, 1);
            assert.equal(symbols[0].location.range.end.line, 0);
            assert.equal(symbols[0].location.range.end.character, 7);
        });
    });

    describe("instructions", function () {
        describe("single", function () {
            it("keyword only", function () {
                let symbols = computeSymbols("FROM");
                assert.equal(symbols.length, 1);
                assert.equal(symbols[0].containerName, undefined);
                assert.equal(symbols[0].deprecated, undefined);
                assert.equal(symbols[0].name, "FROM");
                assert.equal(symbols[0].kind, SymbolKind.Function);
                assert.equal(symbols[0].location.uri, uri);
                assert.equal(symbols[0].location.range.start.line, 0);
                assert.equal(symbols[0].location.range.start.character, 0);
                assert.equal(symbols[0].location.range.end.line, 0);
                assert.equal(symbols[0].location.range.end.character, 4);

                symbols = computeSymbols("FROM\r");
                assert.equal(symbols.length, 1);
                assert.equal(symbols[0].containerName, undefined);
                assert.equal(symbols[0].deprecated, undefined);
                assert.equal(symbols[0].name, "FROM");
                assert.equal(symbols[0].kind, SymbolKind.Function);
                assert.equal(symbols[0].location.uri, uri);
                assert.equal(symbols[0].location.range.start.line, 0);
                assert.equal(symbols[0].location.range.start.character, 0);
                assert.equal(symbols[0].location.range.end.line, 0);
                assert.equal(symbols[0].location.range.end.character, 4);

                symbols = computeSymbols("FROM\n");
                assert.equal(symbols.length, 1);
                assert.equal(symbols[0].containerName, undefined);
                assert.equal(symbols[0].deprecated, undefined);
                assert.equal(symbols[0].name, "FROM");
                assert.equal(symbols[0].kind, SymbolKind.Function);
                assert.equal(symbols[0].location.uri, uri);
                assert.equal(symbols[0].location.range.start.line, 0);
                assert.equal(symbols[0].location.range.start.character, 0);
                assert.equal(symbols[0].location.range.end.line, 0);
                assert.equal(symbols[0].location.range.end.character, 4);
            });

            it("valid", function () {
                let symbols = computeSymbols("FROM node");
                assert.equal(symbols.length, 1);
                assert.equal(symbols[0].containerName, undefined);
                assert.equal(symbols[0].deprecated, undefined);
                assert.equal(symbols[0].name, "FROM");
                assert.equal(symbols[0].kind, SymbolKind.Function);
                assert.equal(symbols[0].location.uri, uri);
                assert.equal(symbols[0].location.range.start.line, 0);
                assert.equal(symbols[0].location.range.start.character, 0);
                assert.equal(symbols[0].location.range.end.line, 0);
                assert.equal(symbols[0].location.range.end.character, 4);
            });

            it("MAINTAINER", function () {
                let symbols = computeSymbols("MAINTAINER abc");
                assert.equal(symbols.length, 1);
                assert.equal(symbols[0].containerName, undefined);
                assert.equal(symbols[0].deprecated, true);
                assert.equal(symbols[0].name, "MAINTAINER");
                assert.equal(symbols[0].kind, SymbolKind.Function);
                assert.equal(symbols[0].location.uri, uri);
                assert.equal(symbols[0].location.range.start.line, 0);
                assert.equal(symbols[0].location.range.start.character, 0);
                assert.equal(symbols[0].location.range.end.line, 0);
                assert.equal(symbols[0].location.range.end.character, 10);
            });

            it("escaped", function () {
                let symbols = computeSymbols("RUN npm install && \\\n\tnpm test");
                assert.equal(symbols.length, 1);
                assert.equal(symbols[0].containerName, undefined);
                assert.equal(symbols[0].deprecated, undefined);
                assert.equal(symbols[0].name, "RUN");
                assert.equal(symbols[0].kind, SymbolKind.Function);
                assert.equal(symbols[0].location.uri, uri);
                assert.equal(symbols[0].location.range.start.line, 0);
                assert.equal(symbols[0].location.range.start.character, 0);
                assert.equal(symbols[0].location.range.end.line, 0);
                assert.equal(symbols[0].location.range.end.character, 3);

                symbols = computeSymbols("RUN npm install && \\\r\tnpm test");
                assert.equal(symbols.length, 1);
                assert.equal(symbols[0].containerName, undefined);
                assert.equal(symbols[0].deprecated, undefined);
                assert.equal(symbols[0].name, "RUN");
                assert.equal(symbols[0].kind, SymbolKind.Function);
                assert.equal(symbols[0].location.uri, uri);
                assert.equal(symbols[0].location.range.start.line, 0);
                assert.equal(symbols[0].location.range.start.character, 0);
                assert.equal(symbols[0].location.range.end.line, 0);
                assert.equal(symbols[0].location.range.end.character, 3);

                symbols = computeSymbols("RUN npm install && \\\r\n\tnpm test");
                assert.equal(symbols.length, 1);
                assert.equal(symbols[0].containerName, undefined);
                assert.equal(symbols[0].deprecated, undefined);
                assert.equal(symbols[0].name, "RUN");
                assert.equal(symbols[0].kind, SymbolKind.Function);
                assert.equal(symbols[0].location.uri, uri);
                assert.equal(symbols[0].location.range.start.line, 0);
                assert.equal(symbols[0].location.range.start.character, 0);
                assert.equal(symbols[0].location.range.end.line, 0);
                assert.equal(symbols[0].location.range.end.character, 3);
            });

            it("keyword with escape character", function () {
                let symbols = computeSymbols("HEALTHCHECK\\\nNONE");
                assert.equal(symbols.length, 1);
                assert.equal(symbols[0].containerName, undefined);
                assert.equal(symbols[0].deprecated, undefined);
                assert.equal(symbols[0].name, "HEALTHCHECKNONE");
                assert.equal(symbols[0].kind, SymbolKind.Function);
                assert.equal(symbols[0].location.uri, uri);
                assert.equal(symbols[0].location.range.start.line, 0);
                assert.equal(symbols[0].location.range.start.character, 0);
                assert.equal(symbols[0].location.range.end.line, 1);
                assert.equal(symbols[0].location.range.end.character, 4);

                symbols = computeSymbols("HEALTHCHECK\\\r\nNONE");
                assert.equal(symbols.length, 1);
                assert.equal(symbols[0].containerName, undefined);
                assert.equal(symbols[0].deprecated, undefined);
                assert.equal(symbols[0].name, "HEALTHCHECKNONE");
                assert.equal(symbols[0].kind, SymbolKind.Function);
                assert.equal(symbols[0].location.uri, uri);
                assert.equal(symbols[0].location.range.start.line, 0);
                assert.equal(symbols[0].location.range.start.character, 0);
                assert.equal(symbols[0].location.range.end.line, 1);
                assert.equal(symbols[0].location.range.end.character, 4);

                symbols = computeSymbols("HEALTHCHECK\\\nNONE ");
                assert.equal(symbols.length, 1);
                assert.equal(symbols[0].containerName, undefined);
                assert.equal(symbols[0].deprecated, undefined);
                assert.equal(symbols[0].name, "HEALTHCHECKNONE");
                assert.equal(symbols[0].kind, SymbolKind.Function);
                assert.equal(symbols[0].location.uri, uri);
                assert.equal(symbols[0].location.range.start.line, 0);
                assert.equal(symbols[0].location.range.start.character, 0);
                assert.equal(symbols[0].location.range.end.line, 1);
                assert.equal(symbols[0].location.range.end.character, 4);

                symbols = computeSymbols("HEALTHCHECK\\\nNONE\r");
                assert.equal(symbols.length, 1);
                assert.equal(symbols[0].containerName, undefined);
                assert.equal(symbols[0].deprecated, undefined);
                assert.equal(symbols[0].name, "HEALTHCHECKNONE");
                assert.equal(symbols[0].kind, SymbolKind.Function);
                assert.equal(symbols[0].location.uri, uri);
                assert.equal(symbols[0].location.range.start.line, 0);
                assert.equal(symbols[0].location.range.start.character, 0);
                assert.equal(symbols[0].location.range.end.line, 1);
                assert.equal(symbols[0].location.range.end.character, 4);

                symbols = computeSymbols("HEALTHCHECK\\\nNONE\n");
                assert.equal(symbols.length, 1);
                assert.equal(symbols[0].containerName, undefined);
                assert.equal(symbols[0].deprecated, undefined);
                assert.equal(symbols[0].name, "HEALTHCHECKNONE");
                assert.equal(symbols[0].kind, SymbolKind.Function);
                assert.equal(symbols[0].location.uri, uri);
                assert.equal(symbols[0].location.range.start.line, 0);
                assert.equal(symbols[0].location.range.start.character, 0);
                assert.equal(symbols[0].location.range.end.line, 1);
                assert.equal(symbols[0].location.range.end.character, 4);
            });

            it("escape in string", function () {
                let symbols = computeSymbols("RUN echo \"\\\\n\"");
                assert.equal(symbols.length, 1);
                assert.equal(symbols[0].containerName, undefined);
                assert.equal(symbols[0].deprecated, undefined);
                assert.equal(symbols[0].name, "RUN");
                assert.equal(symbols[0].kind, SymbolKind.Function);
                assert.equal(symbols[0].location.uri, uri);
                assert.equal(symbols[0].location.range.start.line, 0);
                assert.equal(symbols[0].location.range.start.character, 0);
                assert.equal(symbols[0].location.range.end.line, 0);
                assert.equal(symbols[0].location.range.end.character, 3);
            });

            it("escape not with a newline", function () {
                let symbols = computeSymbols("FR\\om node");
                assert.equal(symbols.length, 1);
                assert.equal(symbols[0].containerName, undefined);
                assert.equal(symbols[0].deprecated, undefined);
                assert.equal(symbols[0].name, "FR\\om");
                assert.equal(symbols[0].kind, SymbolKind.Function);
                assert.equal(symbols[0].location.uri, uri);
                assert.equal(symbols[0].location.range.start.line, 0);
                assert.equal(symbols[0].location.range.start.character, 0);
                assert.equal(symbols[0].location.range.end.line, 0);
                assert.equal(symbols[0].location.range.end.character, 5);
            });

            it("whitespace", function () {
                let symbols = computeSymbols("\rFROM node");
                assert.equal(symbols.length, 1);
                assert.equal(symbols[0].containerName, undefined);
                assert.equal(symbols[0].deprecated, undefined);
                assert.equal(symbols[0].name, "FROM");
                assert.equal(symbols[0].kind, SymbolKind.Function);
                assert.equal(symbols[0].location.uri, uri);
                assert.equal(symbols[0].location.range.start.line, 1);
                assert.equal(symbols[0].location.range.start.character, 0);
                assert.equal(symbols[0].location.range.end.line, 1);
                assert.equal(symbols[0].location.range.end.character, 4);

                symbols = computeSymbols("\nFROM node");
                assert.equal(symbols.length, 1);
                assert.equal(symbols[0].containerName, undefined);
                assert.equal(symbols[0].deprecated, undefined);
                assert.equal(symbols[0].name, "FROM");
                assert.equal(symbols[0].kind, SymbolKind.Function);
                assert.equal(symbols[0].location.uri, uri);
                assert.equal(symbols[0].location.range.start.line, 1);
                assert.equal(symbols[0].location.range.start.character, 0);
                assert.equal(symbols[0].location.range.end.line, 1);
                assert.equal(symbols[0].location.range.end.character, 4);

                symbols = computeSymbols("\r\nFROM node");
                assert.equal(symbols.length, 1);
                assert.equal(symbols[0].containerName, undefined);
                assert.equal(symbols[0].deprecated, undefined);
                assert.equal(symbols[0].name, "FROM");
                assert.equal(symbols[0].kind, SymbolKind.Function);
                assert.equal(symbols[0].location.uri, uri);
                assert.equal(symbols[0].location.range.start.line, 1);
                assert.equal(symbols[0].location.range.start.character, 0);
                assert.equal(symbols[0].location.range.end.line, 1);
                assert.equal(symbols[0].location.range.end.character, 4);

                symbols = computeSymbols("\rFROM node\r");
                assert.equal(symbols.length, 1);
                assert.equal(symbols[0].containerName, undefined);
                assert.equal(symbols[0].deprecated, undefined);
                assert.equal(symbols[0].name, "FROM");
                assert.equal(symbols[0].kind, SymbolKind.Function);
                assert.equal(symbols[0].location.uri, uri);
                assert.equal(symbols[0].location.range.start.line, 1);
                assert.equal(symbols[0].location.range.start.character, 0);
                assert.equal(symbols[0].location.range.end.line, 1);
                assert.equal(symbols[0].location.range.end.character, 4);

                symbols = computeSymbols("\nFROM node\n");
                assert.equal(symbols.length, 1);
                assert.equal(symbols[0].containerName, undefined);
                assert.equal(symbols[0].deprecated, undefined);
                assert.equal(symbols[0].name, "FROM");
                assert.equal(symbols[0].kind, SymbolKind.Function);
                assert.equal(symbols[0].location.uri, uri);
                assert.equal(symbols[0].location.range.start.line, 1);
                assert.equal(symbols[0].location.range.start.character, 0);
                assert.equal(symbols[0].location.range.end.line, 1);
                assert.equal(symbols[0].location.range.end.character, 4);

                symbols = computeSymbols("\r\nFROM node\r\n");
                assert.equal(symbols.length, 1);
                assert.equal(symbols[0].containerName, undefined);
                assert.equal(symbols[0].deprecated, undefined);
                assert.equal(symbols[0].name, "FROM");
                assert.equal(symbols[0].kind, SymbolKind.Function);
                assert.equal(symbols[0].location.uri, uri);
                assert.equal(symbols[0].location.range.start.line, 1);
                assert.equal(symbols[0].location.range.start.character, 0);
                assert.equal(symbols[0].location.range.end.line, 1);
                assert.equal(symbols[0].location.range.end.character, 4);
            });
        });
    });
});
