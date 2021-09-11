/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as assert from "assert";

import {
    TextDocument, Position, Range, Diagnostic, DiagnosticSeverity, TextDocumentIdentifier, CodeActionContext
} from 'vscode-languageserver-types';
import { ValidationCode } from 'dockerfile-utils';
import { DockerfileLanguageServiceFactory, CommandIds } from '../src/main';

let uri = "uri://host/Dockerfile.sample";
let service = DockerfileLanguageServiceFactory.createLanguageService();

function getCommands(diagnostics: Diagnostic[], uri: string) {
    return service.computeCodeActions(TextDocumentIdentifier.create(uri), null, CodeActionContext.create(diagnostics));
}

function createExtraArgument(): Diagnostic {
    return Diagnostic.create(Range.create(Position.create(0, 0), Position.create(0, 0)), "", DiagnosticSeverity.Warning, ValidationCode.ARGUMENT_EXTRA);
}

function createInvalidEscapeDirective(): Diagnostic {
    return Diagnostic.create(Range.create(Position.create(0, 0), Position.create(0, 0)), "", DiagnosticSeverity.Warning, ValidationCode.INVALID_ESCAPE_DIRECTIVE);
}

function createUnknownAddFlag(): Diagnostic {
    return Diagnostic.create(Range.create(Position.create(0, 0), Position.create(0, 0)), "", DiagnosticSeverity.Error, ValidationCode.UNKNOWN_ADD_FLAG);
}

function createUnknownCopyFlag(): Diagnostic {
    return Diagnostic.create(Range.create(Position.create(0, 0), Position.create(0, 0)), "", DiagnosticSeverity.Error, ValidationCode.UNKNOWN_COPY_FLAG);
}

function createUnknownHealthcheckFlag(): Diagnostic {
    return Diagnostic.create(Range.create(Position.create(0, 0), Position.create(0, 0)), "", DiagnosticSeverity.Error, ValidationCode.UNKNOWN_HEALTHCHECK_FLAG);
}

function createDirectiveUppercase(): Diagnostic {
    return Diagnostic.create(Range.create(Position.create(0, 0), Position.create(0, 0)), "", DiagnosticSeverity.Warning, ValidationCode.CASING_DIRECTIVE);
}

function createLowercase(): Diagnostic {
    return Diagnostic.create(Range.create(Position.create(0, 0), Position.create(0, 0)), "", DiagnosticSeverity.Warning, ValidationCode.CASING_INSTRUCTION);
}

function createAS(): Diagnostic {
    return Diagnostic.create(Range.create(Position.create(0, 0), Position.create(0, 0)), "", DiagnosticSeverity.Error, ValidationCode.INVALID_AS);
}

function createEmptyContinuationLine(multiline: boolean): Diagnostic {
    return Diagnostic.create(Range.create(Position.create(0, 0), Position.create(multiline ? 2 : 1, 0)), "", DiagnosticSeverity.Error, ValidationCode.EMPTY_CONTINUATION_LINE);
}

function assertRange(actual: Range, expected: Range) {
    assert.strictEqual(actual.start.line, expected.start.line);
    assert.strictEqual(actual.start.character, expected.start.character);
    assert.strictEqual(actual.end.line, expected.end.line);
    assert.strictEqual(actual.end.character, expected.start.character);
}

describe("Dockerfile code actions", function () {
    it("no diagnostics", function () {
        let commands = getCommands([], uri);
        assert.strictEqual(commands.length, 0);
    });

    it("extra argument", function () {
        let diagnostic = createExtraArgument();
        let commands = getCommands([diagnostic], uri);
        assert.strictEqual(commands.length, 1);
        assert.strictEqual(commands[0].command, CommandIds.EXTRA_ARGUMENT);
        assert.strictEqual(commands[0].arguments.length, 2);
        assert.strictEqual(commands[0].arguments[0], uri);
        assertRange(commands[0].arguments[1], diagnostic.range);
    });

    it("invalid escape directive", function () {
        let diagnostic = createInvalidEscapeDirective();
        let commands = getCommands([diagnostic], uri);
        assert.strictEqual(commands.length, 2);
        assert.strictEqual(commands[0].command, CommandIds.DIRECTIVE_TO_BACKSLASH);
        assert.strictEqual(commands[0].arguments.length, 2);
        assert.strictEqual(commands[0].arguments[0], uri);
        assertRange(commands[0].arguments[1], diagnostic.range);
        assert.strictEqual(commands[1].command, CommandIds.DIRECTIVE_TO_BACKTICK);
        assert.strictEqual(commands[1].arguments.length, 2);
        assert.strictEqual(commands[1].arguments[0], uri);
        assertRange(commands[1].arguments[1], diagnostic.range);
    });

    it("convert to uppercase", function () {
        let diagnostic = createLowercase();
        let commands = getCommands([diagnostic], uri);
        assert.strictEqual(commands.length, 1);
        assert.strictEqual(commands[0].command, CommandIds.UPPERCASE);
        assert.strictEqual(commands[0].arguments.length, 2);
        assert.strictEqual(commands[0].arguments[0], uri);
        assertRange(commands[0].arguments[1], diagnostic.range);
    });

    it("convert to lowercase", function () {
        let diagnostic = createDirectiveUppercase();
        let commands = getCommands([diagnostic], uri);
        assert.strictEqual(commands.length, 1);
        assert.strictEqual(commands[0].command, CommandIds.LOWERCASE);
        assert.strictEqual(commands[0].arguments.length, 2);
        assert.strictEqual(commands[0].arguments[0], uri);
        assertRange(commands[0].arguments[1], diagnostic.range);
    });

    it("convert to AS", function () {
        let diagnostic = createAS();
        let commands = getCommands([diagnostic], uri);
        assert.strictEqual(commands.length, 1);
        assert.strictEqual(commands[0].command, CommandIds.CONVERT_TO_AS);
        assert.strictEqual(commands[0].arguments.length, 2);
        assert.strictEqual(commands[0].arguments[0], uri);
        assertRange(commands[0].arguments[1], diagnostic.range);
    });

    it("multiple diagnostics", function () {
        let escape = createInvalidEscapeDirective();
        let lowercase = createLowercase();
        let commands = getCommands([escape, lowercase], uri);
        assert.strictEqual(commands.length, 3);
        assert.strictEqual(commands[0].command, CommandIds.DIRECTIVE_TO_BACKSLASH);
        assert.strictEqual(commands[0].arguments.length, 2);
        assert.strictEqual(commands[0].arguments[0], uri);
        assertRange(commands[0].arguments[1], escape.range);
        assert.strictEqual(commands[1].command, CommandIds.DIRECTIVE_TO_BACKTICK);
        assert.strictEqual(commands[1].arguments.length, 2);
        assert.strictEqual(commands[1].arguments[0], uri);
        assertRange(commands[1].arguments[1], escape.range);
        assert.strictEqual(commands[2].command, CommandIds.UPPERCASE);
        assert.strictEqual(commands[2].arguments.length, 2);
        assert.strictEqual(commands[2].arguments[0], uri);
        assertRange(commands[2].arguments[1], lowercase.range);
    });

    it("diagnostic code as string", function () {
        let diagnostic = createLowercase();
        diagnostic.code = diagnostic.code.toString();
        let commands = getCommands([diagnostic], uri);
        assert.strictEqual(commands.length, 1);
        assert.strictEqual(commands[0].command, CommandIds.UPPERCASE);
        assert.strictEqual(commands[0].arguments.length, 2);
        assert.strictEqual(commands[0].arguments[0], uri);
        assertRange(commands[0].arguments[1], diagnostic.range);
    });

    it("unknown HEALTHCHECK flags", function () {
        let diagnostic = createUnknownHealthcheckFlag();
        let commands = getCommands([diagnostic], uri);
        assert.strictEqual(commands.length, 4);
        assert.strictEqual(commands[0].command, CommandIds.FLAG_TO_HEALTHCHECK_INTERVAL);
        assert.strictEqual(commands[0].arguments.length, 2);
        assert.strictEqual(commands[0].arguments[0], uri);
        assertRange(commands[0].arguments[1], diagnostic.range);
        assert.strictEqual(commands[1].command, CommandIds.FLAG_TO_HEALTHCHECK_RETRIES);
        assert.strictEqual(commands[1].arguments.length, 2);
        assert.strictEqual(commands[1].arguments[0], uri);
        assertRange(commands[1].arguments[1], diagnostic.range);
        assert.strictEqual(commands[2].command, CommandIds.FLAG_TO_HEALTHCHECK_START_PERIOD);
        assert.strictEqual(commands[2].arguments.length, 2);
        assert.strictEqual(commands[2].arguments[0], uri);
        assertRange(commands[2].arguments[1], diagnostic.range);
        assert.strictEqual(commands[3].command, CommandIds.FLAG_TO_HEALTHCHECK_TIMEOUT);
        assert.strictEqual(commands[3].arguments.length, 2);
        assert.strictEqual(commands[3].arguments[0], uri);
        assertRange(commands[3].arguments[1], diagnostic.range);
    });

    it("unknown ADD flags", function () {
        let diagnostic = createUnknownAddFlag();
        let commands = getCommands([diagnostic], uri);
        assert.strictEqual(commands.length, 1);
        assert.strictEqual(commands[0].command, CommandIds.FLAG_TO_CHOWN);
        assert.strictEqual(commands[0].arguments.length, 2);
        assert.strictEqual(commands[0].arguments[0], uri);
        assertRange(commands[0].arguments[1], diagnostic.range);
    });

    it("unknown COPY flags", function () {
        let diagnostic = createUnknownCopyFlag();
        let commands = getCommands([diagnostic], uri);
        assert.strictEqual(commands.length, 2);
        assert.strictEqual(commands[0].command, CommandIds.FLAG_TO_CHOWN);
        assert.strictEqual(commands[0].arguments.length, 2);
        assert.strictEqual(commands[0].arguments[0], uri);
        assertRange(commands[0].arguments[1], diagnostic.range);
        assert.strictEqual(commands[1].command, CommandIds.FLAG_TO_COPY_FROM);
        assert.strictEqual(commands[1].arguments.length, 2);
        assert.strictEqual(commands[1].arguments[0], uri);
        assertRange(commands[1].arguments[1], diagnostic.range);
    });

    it("empty continuation line", function () {
        let diagnostic = createEmptyContinuationLine(false);
        let commands = getCommands([diagnostic], uri);
        assert.strictEqual(commands.length, 1);
        assert.strictEqual(commands[0].command, CommandIds.REMOVE_EMPTY_CONTINUATION_LINE);
        assert.strictEqual(commands[0].title, "Remove empty continuation line");
        assert.strictEqual(commands[0].arguments.length, 2);
        assert.strictEqual(commands[0].arguments[0], uri);
        assertRange(commands[0].arguments[1], diagnostic.range);
    });

    it("empty continuation lines", function () {
        let diagnostic = createEmptyContinuationLine(true);
        let commands = getCommands([diagnostic], uri);
        assert.strictEqual(commands.length, 1);
        assert.strictEqual(commands[0].command, CommandIds.REMOVE_EMPTY_CONTINUATION_LINE);
        assert.strictEqual(commands[0].title, "Remove empty continuation lines");
        assert.strictEqual(commands[0].arguments.length, 2);
        assert.strictEqual(commands[0].arguments[0], uri);
        assertRange(commands[0].arguments[1], diagnostic.range);
    });
});

describe("Dockerfile execute commands", function () {
    it("unknown command", function () {
        let edits = service.computeCommandEdits("FROM node", "unknown", []);
        assert.strictEqual(edits, null);
    });

    function directiveTo(commandId: string, suggestion: string) {
        let range = Range.create(Position.create(0, 8), Position.create(0, 9));
        let edits = service.computeCommandEdits("#escape=a", commandId, [uri, range]);
        assert.strictEqual(edits.length, 1);
        assert.strictEqual(edits[0].newText, suggestion);
        assert.strictEqual(edits[0].range, range);
    }

    it("directive to backslash", function () {
        directiveTo(CommandIds.DIRECTIVE_TO_BACKSLASH, '\\');
    });

    it("directive to backtick", function () {
        directiveTo(CommandIds.DIRECTIVE_TO_BACKTICK, '`');
    });

    it("extra argument", function () {
        let range = Range.create(Position.create(0, 10), Position.create(0, 14));
        let edits = service.computeCommandEdits(
            "FROM node node", CommandIds.EXTRA_ARGUMENT, [uri, range]
        );
        assert.strictEqual(edits.length, 1);
        assert.strictEqual(edits[0].newText, "");
        assert.strictEqual(edits[0].range, range);
    });

    it("convert to uppercase", function () {
        let range = Range.create(Position.create(0, 0), Position.create(0, 4));
        let edits = service.computeCommandEdits(
            "from node", CommandIds.UPPERCASE, [uri, range]
        );
        assert.strictEqual(edits.length, 1);
        assert.strictEqual(edits[0].newText, "FROM");
        assert.strictEqual(edits[0].range, range);
    });

    it("convert to lowercase", function () {
        let range = Range.create(Position.create(0, 1), Position.create(0, 7));
        let edits = service.computeCommandEdits(
            "#ESCAPE=`", CommandIds.LOWERCASE, [uri, range]
        );
        assert.strictEqual(edits.length, 1);
        assert.strictEqual(edits[0].newText, "escape");
        assert.strictEqual(edits[0].range, range);
    });

    it("convert to AS", function () {
        let range = Range.create(Position.create(0, 0), Position.create(0, 4));
        let edits = service.computeCommandEdits(
            "FROM node as setup", CommandIds.CONVERT_TO_AS, [uri, range]
        );
        assert.strictEqual(edits.length, 1);
        assert.strictEqual(edits[0].newText, "AS");
        assert.strictEqual(edits[0].range, range);
    });

    it("HEALTHCHECK flag to --interval", function () {
        let range = Range.create(Position.create(0, 0), Position.create(0, 4));
        let edits = service.computeCommandEdits(
            "", CommandIds.FLAG_TO_HEALTHCHECK_INTERVAL, [uri, range]
        );
        assert.strictEqual(edits.length, 1);
        assert.strictEqual(edits[0].newText, "--interval");
        assert.strictEqual(edits[0].range, range);
    });

    it("HEALTHCHECK flag to --retries", function () {
        let range = Range.create(Position.create(0, 0), Position.create(0, 4));
        let edits = service.computeCommandEdits(
            "", CommandIds.FLAG_TO_HEALTHCHECK_RETRIES, [uri, range]
        );
        assert.strictEqual(edits.length, 1);
        assert.strictEqual(edits[0].newText, "--retries");
        assert.strictEqual(edits[0].range, range);
    });

    it("HEALTHCHECK flag to --start-period", function () {
        let range = Range.create(Position.create(0, 0), Position.create(0, 4));
        let edits = service.computeCommandEdits(
            "", CommandIds.FLAG_TO_HEALTHCHECK_START_PERIOD, [uri, range]
        );
        assert.strictEqual(edits.length, 1);
        assert.strictEqual(edits[0].newText, "--start-period");
        assert.strictEqual(edits[0].range, range);
    });

    it("HEALTHCHECK flag to --timeout", function () {
        let range = Range.create(Position.create(0, 0), Position.create(0, 4));
        let edits = service.computeCommandEdits(
            "", CommandIds.FLAG_TO_HEALTHCHECK_TIMEOUT, [uri, range]
        );
        assert.strictEqual(edits.length, 1);
        assert.strictEqual(edits[0].newText, "--timeout");
        assert.strictEqual(edits[0].range, range);
    });

    it("COPY flag to --from", function () {
        let range = Range.create(Position.create(0, 0), Position.create(0, 4));
        let edits = service.computeCommandEdits(
            "", CommandIds.FLAG_TO_COPY_FROM, [uri, range]
        );
        assert.strictEqual(edits.length, 1);
        assert.strictEqual(edits[0].newText, "--from");
        assert.strictEqual(edits[0].range, range);
    });

    it("flag to --chown", function () {
        let range = Range.create(Position.create(0, 0), Position.create(0, 4));
        let edits = service.computeCommandEdits(
            "", CommandIds.FLAG_TO_CHOWN, [uri, range]
        );
        assert.strictEqual(edits.length, 1);
        assert.strictEqual(edits[0].newText, "--chown");
        assert.strictEqual(edits[0].range, range);
    });

    it("remove empty continuation line", function () {
        let range = Range.create(Position.create(0, 0), Position.create(3, 0));
        let edits = service.computeCommandEdits(
            "", CommandIds.REMOVE_EMPTY_CONTINUATION_LINE, [uri, range]
        );
        assert.strictEqual(edits.length, 1);
        assert.strictEqual(edits[0].newText, "");
        assert.strictEqual(edits[0].range, range);
    });
});
