"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
var dockerfile_language_service_1 = require("dockerfile-language-service");
var monaco_languageclient_1 = require("monaco-languageclient");
var LANGUAGE_ID = 'dockerfile';
var MODEL_URI = 'inmemory://model.json';
var MONACO_URI = monaco.Uri.parse(MODEL_URI);
var LSP_URI = { uri: MODEL_URI };
// content to initialize the editor with
var content = "FROM node:alpine\nCOPY lib /docker-langserver/lib\nCOPY bin /docker-langserver/bin\nCOPY package.json /docker-langserver/package.json\nWORKDIR /docker-langserver/\nRUN npm install --production && \\\n    chmod +x /docker-langserver/bin/docker-langserver\nENTRYPOINT [ \"/docker-langserver/bin/docker-langserver\" ]";
// create the Monaco editor
var editor = monaco.editor.create(document.getElementById("container"), {
    language: LANGUAGE_ID,
    model: monaco.editor.createModel(content, LANGUAGE_ID, MONACO_URI),
    lightbulb: {
        enabled: true
    },
    formatOnType: true,
    theme: "vs-dark"
});
var monacoModel = monaco.editor.getModel(MONACO_URI);
var service = dockerfile_language_service_1.DockerfileLanguageServiceFactory.createLanguageService();
service.setCapabilities({ completion: { completionItem: { snippetSupport: true } } });
var m2p = new monaco_languageclient_1.MonacoToProtocolConverter();
var p2m = new monaco_languageclient_1.ProtocolToMonacoConverter();
monacoModel.onDidChangeContent(function (event) {
    var diagnostics = service.validate(monacoModel.getValue());
    var markers = diagnostics.map(function (diagnostic) { return p2m.asMarker(diagnostic); });
    monaco.editor.setModelMarkers(monacoModel, LANGUAGE_ID, markers);
});
monaco.languages.registerCodeActionProvider(LANGUAGE_ID, {
    provideCodeActions: function (model, range, context, token) {
        var commands = service.computeCodeActions(LSP_URI, m2p.asRange(range), m2p.asCodeActionContext(context));
        var _loop_1 = function (command) {
            editor._commandService.addCommand({
                id: command.command,
                handler: function () {
                    var args = command.arguments;
                    var edits = service.computeCommandEdits(monacoModel.getValue(), command.command, args);
                    if (edits) {
                        var ops = edits.map(function (edit) {
                            return {
                                range: p2m.asRange(edit.range),
                                text: edit.newText
                            };
                        });
                        monacoModel.pushEditOperations([], ops, function () { return []; });
                    }
                }
            });
        };
        for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
            var command = commands_1[_i];
            _loop_1(command);
        }
        return p2m.asCodeActions(commands);
    }
});
monaco.languages.registerCompletionItemProvider(LANGUAGE_ID, {
    triggerCharacters: ['=', ' ', '$', '-'],
    provideCompletionItems: function (model, position, token) {
        var lspPosition = m2p.asPosition(position.lineNumber, position.column);
        var items = service.computeCompletionItems(model.getValue(), lspPosition);
        if (items.then) {
            return items.then(function (result) {
                return p2m.asCompletionResult(result);
            });
        }
        var completionItems = items;
        return p2m.asCompletionResult(completionItems);
    },
    resolveCompletionItem: function (completionItem, token) {
        return p2m.asCompletionItem(service.resolveCompletionItem(m2p.asCompletionItem(completionItem)));
    }
});
monaco.languages.registerDefinitionProvider(LANGUAGE_ID, {
    provideDefinition: function (model, position, token) {
        var definition = service.computeDefinition(LSP_URI, model.getValue(), m2p.asPosition(position.lineNumber, position.column));
        return p2m.asDefinitionResult(definition);
    }
});
monaco.languages.registerDocumentHighlightProvider(LANGUAGE_ID, {
    provideDocumentHighlights: function (model, position, token) {
        var highlightRanges = service.computeHighlightRanges(model.getValue(), m2p.asPosition(position.lineNumber, position.column));
        return p2m.asDocumentHighlights(highlightRanges);
    }
});
monaco.languages.registerHoverProvider(LANGUAGE_ID, {
    provideHover: function (model, position, token) {
        var hover = service.computeHover(model.getValue(), m2p.asPosition(position.lineNumber, position.column));
        return p2m.asHover(hover);
    }
});
monaco.languages.registerDocumentSymbolProvider(LANGUAGE_ID, {
    provideDocumentSymbols: function (model, token) {
        var symbols = service.computeSymbols(LSP_URI, model.getValue());
        return p2m.asSymbolInformations(symbols);
    }
});
monaco.languages.registerSignatureHelpProvider(LANGUAGE_ID, {
    signatureHelpTriggerCharacters: [' ', '-', '=', '[', ','],
    provideSignatureHelp: function (model, position, token) {
        var symbols = service.computeSignatureHelp(model.getValue(), m2p.asPosition(position.lineNumber, position.column));
        return p2m.asSignatureHelp(symbols);
    }
});
monaco.languages.registerRenameProvider(LANGUAGE_ID, {
    provideRenameEdits: function (model, position, newName) {
        var edits = service.computeRename(LSP_URI, model.getValue(), m2p.asPosition(position.lineNumber, position.column), newName);
        return p2m.asWorkspaceEdit({
            changes: (_a = {},
                _a[MODEL_URI] = edits,
                _a)
        });
        var _a;
    }
});
monaco.languages.registerLinkProvider(LANGUAGE_ID, {
    provideLinks: function (model, token) {
        var links = service.computeLinks(model.getValue());
        return p2m.asILinks(links);
    }
});
monaco.languages.registerDocumentFormattingEditProvider(LANGUAGE_ID, {
    provideDocumentFormattingEdits: function (model, options, token) {
        var edits = service.format(model.getValue(), m2p.asFormattingOptions(options));
        return p2m.asTextEdits(edits);
    }
});
monaco.languages.registerDocumentRangeFormattingEditProvider(LANGUAGE_ID, {
    provideDocumentRangeFormattingEdits: function (model, range, options, token) {
        var edits = service.formatRange(model.getValue(), m2p.asRange(range), m2p.asFormattingOptions(options));
        return p2m.asTextEdits(edits);
    }
});
monaco.languages.registerOnTypeFormattingEditProvider(LANGUAGE_ID, {
    autoFormatTriggerCharacters: ['`', '\\'],
    provideOnTypeFormattingEdits: function (model, position, ch, options, token) {
        var edits = service.formatOnType(model.getValue(), m2p.asPosition(position.lineNumber, position.column), ch, m2p.asFormattingOptions(options));
        return p2m.asTextEdits(edits);
    }
});
//# sourceMappingURL=client.js.map