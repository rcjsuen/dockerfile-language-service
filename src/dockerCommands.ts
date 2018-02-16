/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import { TextDocument, Command, Diagnostic, Range, WorkspaceEdit, TextEdit } from 'vscode-languageserver-types';
import { ValidationCode } from 'dockerfile-utils';
import { CommandIds } from './main';

export class DockerCommands {

    public analyzeDiagnostics(diagnostics: Diagnostic[], textDocumentURI: string): Command[] {
        let commands: Command[] = [];
        for (let i = 0; i < diagnostics.length; i++) {
            // Diagnostic's code is (number | string), convert it if necessary
            if (typeof diagnostics[i].code === "string") {
                diagnostics[i].code = parseInt(diagnostics[i].code as string);
            }
            switch (diagnostics[i].code) {
                case ValidationCode.CASING_DIRECTIVE:
                    commands.push({
                        title: "Convert directive to lowercase",
                        command: CommandIds.LOWERCASE,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    break;
                case ValidationCode.CASING_INSTRUCTION:
                    commands.push({
                        title: "Convert instruction to uppercase",
                        command: CommandIds.UPPERCASE,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    break;
                case ValidationCode.ARGUMENT_EXTRA:
                    commands.push({
                        title: "Remove extra argument",
                        command: CommandIds.EXTRA_ARGUMENT,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    break;
                case ValidationCode.INVALID_ESCAPE_DIRECTIVE:
                    commands.push({
                        title: "Convert to backslash",
                        command: CommandIds.DIRECTIVE_TO_BACKSLASH,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    commands.push({
                        title: "Convert to backtick",
                        command: CommandIds.DIRECTIVE_TO_BACKTICK,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    break;
                case ValidationCode.INVALID_AS:
                    commands.push({
                        title: "Convert to AS",
                        command: CommandIds.CONVERT_TO_AS,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    break;
                case ValidationCode.UNKNOWN_HEALTHCHECK_FLAG:
                    commands.push({
                        title: "Convert to --interval",
                        command: CommandIds.FLAG_TO_HEALTHCHECK_INTERVAL,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    commands.push({
                        title: "Convert to --retries",
                        command: CommandIds.FLAG_TO_HEALTHCHECK_RETRIES,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    commands.push({
                        title: "Convert to --start-period",
                        command: CommandIds.FLAG_TO_HEALTHCHECK_START_PERIOD,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    commands.push({
                        title: "Convert to --timeout",
                        command: CommandIds.FLAG_TO_HEALTHCHECK_TIMEOUT,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    break;
                case ValidationCode.UNKNOWN_ADD_FLAG:
                    commands.push({
                        title: "Convert to --chown",
                        command: CommandIds.FLAG_TO_CHOWN,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    break;
                case ValidationCode.UNKNOWN_COPY_FLAG:
                    commands.push({
                        title: "Convert to --chown",
                        command: CommandIds.FLAG_TO_CHOWN,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    commands.push({
                        title: "Convert to --from",
                        command: CommandIds.FLAG_TO_COPY_FROM,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    break;
                case ValidationCode.EMPTY_CONTINUATION_LINE:
                    if (diagnostics[i].range.start.line + 1 === diagnostics[i].range.end.line) {
                        commands.push({
                            title: "Remove empty continuation line",
                            command: CommandIds.REMOVE_EMPTY_CONTINUATION_LINE,
                            arguments: [textDocumentURI, diagnostics[i].range]
                        });
                    } else {
                        commands.push({
                            title: "Remove empty continuation lines",
                            command: CommandIds.REMOVE_EMPTY_CONTINUATION_LINE,
                            arguments: [textDocumentURI, diagnostics[i].range]
                        });
                    }
                    break;
            }
        }
        return commands;
    }

    public createWorkspaceEdit(content: string, command: string, args: any[]): WorkspaceEdit | null {
        let document = TextDocument.create("", "", 0, content);
        let uri: string = args[0];
        let range: Range = args[1];
        switch (command) {
            case CommandIds.LOWERCASE:
                const directive = document.getText().substring(document.offsetAt(range.start), document.offsetAt(range.end));
                return {
                    changes: {
                        [
                            uri
                        ]:
                            [
                                TextEdit.replace(range, directive.toLowerCase())
                            ]
                    }
                };
            case CommandIds.UPPERCASE:
                let instruction = document.getText().substring(document.offsetAt(range.start), document.offsetAt(range.end));
                return {
                    changes: {
                        [
                            uri
                        ]:
                            [
                                TextEdit.replace(range, instruction.toUpperCase())
                            ]
                    }
                };
            case CommandIds.EXTRA_ARGUMENT:
                return {
                    changes: {
                        [
                            uri
                        ]:
                            [
                                TextEdit.del(range)
                            ]
                    }
                };
            case CommandIds.DIRECTIVE_TO_BACKSLASH:
                return {
                    changes: {
                        [
                            uri
                        ]:
                            [
                                TextEdit.replace(range, '\\')
                            ]
                    }
                };
            case CommandIds.DIRECTIVE_TO_BACKTICK:
                return {
                    changes: {
                        [
                            uri
                        ]:
                            [
                                TextEdit.replace(range, '`')
                            ]
                    }
                };
            case CommandIds.CONVERT_TO_AS:
                return {
                    changes: {
                        [
                            uri
                        ]:
                            [
                                TextEdit.replace(range, "AS")
                            ]
                    }
                };
            case CommandIds.FLAG_TO_CHOWN:
                return {
                    changes: {
                        [
                            uri
                        ]:
                            [
                                TextEdit.replace(range, "--chown")
                            ]
                    }
                };
            case CommandIds.FLAG_TO_HEALTHCHECK_INTERVAL:
                return {
                    changes: {
                        [
                            uri
                        ]:
                            [
                                TextEdit.replace(range, "--interval")
                            ]
                    }
                };
            case CommandIds.FLAG_TO_HEALTHCHECK_RETRIES:
                return {
                    changes: {
                        [
                            uri
                        ]:
                            [
                                TextEdit.replace(range, "--retries")
                            ]
                    }
                };
            case CommandIds.FLAG_TO_HEALTHCHECK_START_PERIOD:
                return {
                    changes: {
                        [
                            uri
                        ]:
                            [
                                TextEdit.replace(range, "--start-period")
                            ]
                    }
                };
            case CommandIds.FLAG_TO_HEALTHCHECK_TIMEOUT:
                return {
                    changes: {
                        [
                            uri
                        ]:
                            [
                                TextEdit.replace(range, "--timeout")
                            ]
                    }
                };
            case CommandIds.FLAG_TO_COPY_FROM:
                return {
                    changes: {
                        [
                            uri
                        ]:
                            [
                                TextEdit.replace(range, "--from")
                            ]
                    }
                };
            case CommandIds.REMOVE_EMPTY_CONTINUATION_LINE:
                return {
                    changes: {
                        [
                            uri
                        ]:
                            [
                                TextEdit.del(range)
                            ]
                    }
                };
        }
        return null;
    }

}
