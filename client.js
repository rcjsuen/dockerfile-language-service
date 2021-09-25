"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
var dockerfile_language_service_1 = require("dockerfile-language-service");
var vscode_languageserver_types_1 = require("vscode-languageserver-types");
var LANGUAGE_ID = 'dockerfile';
// content to initialize the editor with
var content = "FROM node:alpine\nCOPY lib /docker-langserver/lib\nCOPY bin /docker-langserver/bin\nCOPY package.json /docker-langserver/package.json\nWORKDIR /docker-langserver/\nRUN npm install --production && \\\n    chmod +x /docker-langserver/bin/docker-langserver\nENTRYPOINT [ \"/docker-langserver/bin/docker-langserver\" ]";
// create the Monaco editor
var editor = monaco.editor.create(document.getElementById("container"), {
    language: LANGUAGE_ID,
    value: content,
    lightbulb: {
        enabled: true
    },
    'semanticHighlighting.enabled': true,
    formatOnType: true,
    theme: "vs"
});
var monacoModel = editor.getModel();
var MONACO_URI = monacoModel.uri;
var MODEL_URI = MONACO_URI.toString();
var LSP_URI = { uri: MODEL_URI };
var darkThemeMap = {
    "keyword": 12,
    "comment": 7,
    "parameter": 6,
    "property": 14,
    "operator": 1,
    "label": 16,
    "class": 3,
    "macro": 11,
    "string": 5,
    "variable": {
        "declaration": 8,
        "definition": 8,
        "deprecated": 8,
        "reference": 4,
    }
};
function getStyleMetadataDark(type, modifiers) {
    var color = darkThemeMap[type];
    if (type === "variable") {
        color = darkThemeMap[type][modifiers[0]];
    }
    var style = {
        foreground: color,
        bold: false,
        underline: false,
        italic: false
    };
    if (true) {
        return style;
    }
}
;
var lightThemeMap = {
    "keyword": 0,
    "comment": 7,
    "parameter": 5,
    "property": 4,
    "operator": 1,
    "label": 11,
    "class": 5,
    "macro": 3,
    "string": 11,
    "variable": {
        "declaration": 12,
        "definition": 12,
        "deprecated": 12,
        "reference": 13,
    }
};
function getStyleMetadataLight(type, modifiers) {
    var color = lightThemeMap[type];
    if (type === "variable") {
        color = lightThemeMap[type][modifiers[0]];
    }
    var style = {
        foreground: color,
        bold: false,
        underline: false,
        italic: false
    };
    if (true) {
        return style;
    }
}
;
monaco.editor.setTheme('vs');
editor._themeService._theme.getTokenStyleMetadata = getStyleMetadataLight;
monaco.editor.setTheme('vs-dark');
editor._themeService._theme.getTokenStyleMetadata = getStyleMetadataDark;
var service = dockerfile_language_service_1.DockerfileLanguageServiceFactory.createLanguageService();
service.setCapabilities({ completion: { completionItem: { snippetSupport: true } } });
function convertFormattingOptions(options) {
    return {
        tabSize: options.tabSize,
        insertSpaces: options.insertSpaces
    };
}
function convertHover(hover) {
    return {
        contents: [
            {
                value: hover.contents
            }
        ],
        range: hover.range === undefined ? undefined : convertProtocolRange(hover.range)
    };
}
function convertMonacoRange(range) {
    return {
        start: {
            line: range.startLineNumber - 1,
            character: range.startColumn - 1
        },
        end: {
            line: range.endLineNumber - 1,
            character: range.endColumn - 1
        }
    };
}
function convertPosition(line, character) {
    return {
        line: line - 1,
        character: character - 1
    };
}
function convertProtocolRange(range) {
    return {
        startLineNumber: range.start.line + 1,
        startColumn: range.start.character + 1,
        endLineNumber: range.end.line + 1,
        endColumn: range.end.character + 1,
    };
}
function convertLink(link) {
    return {
        range: convertProtocolRange(link.range),
        url: link.target,
    };
}
function convertTextEdit(edit) {
    return {
        range: convertProtocolRange(edit.range),
        text: edit.newText
    };
}
function convertTextEdits(edits) {
    return edits.map(convertTextEdit);
}
function convertParameter(parameter) {
    return {
        label: parameter.label,
        documentation: {
            value: parameter.documentation
        }
    };
}
function convertSignature(signature) {
    return {
        documentation: {
            value: signature.documentation
        },
        label: signature.label,
        parameters: signature.parameters ? signature.parameters.map(convertParameter) : []
    };
}
function convertToWorkspaceEdit(monacoEdits) {
    var workspaceEdits = monacoEdits.map(function (edit) {
        return {
            edit: edit,
            resource: MONACO_URI
        };
    });
    return {
        edits: workspaceEdits
    };
}
function convertCompletionItem(item) {
    item = service.resolveCompletionItem(item);
    return {
        label: item.label,
        documentation: {
            value: item.documentation
        },
        range: item.textEdit ? convertProtocolRange(item.textEdit.range) : undefined,
        kind: item.kind + 1,
        insertText: item.textEdit ? item.textEdit.newText : item.insertText,
        insertTextRules: item.insertTextFormat === vscode_languageserver_types_1.InsertTextFormat.Snippet ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet : undefined,
    };
}
function convertMonacoCodeActionContext(context) {
    return {
        diagnostics: context.markers.map(function (marker) {
            var range = convertMonacoRange(marker);
            return {
                code: Number(marker.code),
                range: range
            };
        })
    };
}
monacoModel.onDidChangeContent(function () {
    var diagnostics = service.validate(monacoModel.getValue());
    var markers = diagnostics.map(function (diagnostic) {
        var range = convertProtocolRange(diagnostic.range);
        return {
            code: diagnostic.code !== undefined ? diagnostic.code.toString() : undefined,
            severity: diagnostic.severity === 1 ? monaco.MarkerSeverity.Error : monaco.MarkerSeverity.Warning,
            startLineNumber: range.startLineNumber,
            startColumn: range.startColumn,
            endLineNumber: range.endLineNumber,
            endColumn: range.endColumn,
            message: diagnostic.message,
            source: diagnostic.source,
            tags: diagnostic.tags,
        };
    });
    monaco.editor.setModelMarkers(monacoModel, LANGUAGE_ID, markers);
});
monaco.languages.registerDocumentSemanticTokensProvider(LANGUAGE_ID, {
    getLegend: function () {
        var tokenTypes = [];
        var tokenModifiers = [];
        tokenTypes.push(vscode_languageserver_types_1.SemanticTokenTypes.keyword);
        tokenTypes.push(vscode_languageserver_types_1.SemanticTokenTypes.comment);
        tokenTypes.push(vscode_languageserver_types_1.SemanticTokenTypes.parameter);
        tokenTypes.push(vscode_languageserver_types_1.SemanticTokenTypes.property);
        tokenTypes.push(vscode_languageserver_types_1.SemanticTokenTypes.namespace);
        tokenTypes.push(vscode_languageserver_types_1.SemanticTokenTypes.class);
        tokenTypes.push(vscode_languageserver_types_1.SemanticTokenTypes.macro);
        tokenTypes.push(vscode_languageserver_types_1.SemanticTokenTypes.string);
        tokenTypes.push(vscode_languageserver_types_1.SemanticTokenTypes.variable);
        tokenTypes.push(vscode_languageserver_types_1.SemanticTokenTypes.operator);
        tokenModifiers.push(vscode_languageserver_types_1.SemanticTokenModifiers.declaration);
        tokenModifiers.push(vscode_languageserver_types_1.SemanticTokenModifiers.definition);
        tokenModifiers.push(vscode_languageserver_types_1.SemanticTokenModifiers.deprecated);
        return {
            tokenModifiers: tokenModifiers,
            tokenTypes: tokenTypes
        };
    },
    provideDocumentSemanticTokens: function (model) {
        return service.computeSemanticTokens(model.getValue());
    },
    releaseDocumentSemanticTokens: function () {
        // nothing to do
    }
});
monaco.languages.registerCodeActionProvider(LANGUAGE_ID, {
    provideCodeActions: function (_model, range, context) {
        var commands = service.computeCodeActions(LSP_URI, convertMonacoRange(range), convertMonacoCodeActionContext(context));
        var codeActions = [];
        for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
            var command = commands_1[_i];
            var args = command.arguments ? command.arguments : [];
            var edits = service.computeCommandEdits(monacoModel.getValue(), command.command, args);
            codeActions.push({
                title: command.title,
                edit: convertToWorkspaceEdit(convertTextEdits(edits))
            });
        }
        return {
            actions: codeActions,
            dispose: function () { }
        };
    }
});
monaco.languages.registerCompletionItemProvider(LANGUAGE_ID, {
    triggerCharacters: ['=', ' ', '$', '-'],
    provideCompletionItems: function (model, position) {
        var lspPosition = convertPosition(position.lineNumber, position.column);
        var items = service.computeCompletionItems(model.getValue(), lspPosition);
        if (items.then) {
            return items.then(function (result) {
                return {
                    incomplete: false,
                    suggestions: result.map(convertCompletionItem)
                };
            });
        }
        return {
            incomplete: false,
            suggestions: items.map(convertCompletionItem)
        };
    },
});
monaco.languages.registerDefinitionProvider(LANGUAGE_ID, {
    provideDefinition: function (model, position) {
        var definition = service.computeDefinition(LSP_URI, model.getValue(), convertPosition(position.lineNumber, position.column));
        if (definition) {
            return {
                range: convertProtocolRange(definition.range),
                uri: MONACO_URI
            };
        }
        return null;
    }
});
monaco.languages.registerDocumentHighlightProvider(LANGUAGE_ID, {
    provideDocumentHighlights: function (model, position) {
        var highlightRanges = service.computeHighlightRanges(model.getValue(), convertPosition(position.lineNumber, position.column));
        return highlightRanges.map(function (highlightRange) {
            return {
                kind: highlightRange.kind ? highlightRange.kind - 1 : undefined,
                range: convertProtocolRange(highlightRange.range)
            };
        });
    }
});
monaco.languages.registerHoverProvider(LANGUAGE_ID, {
    provideHover: function (model, position) {
        var hover = service.computeHover(model.getValue(), convertPosition(position.lineNumber, position.column));
        return hover === null ? null : convertHover(hover);
    }
});
monaco.languages.registerDocumentSymbolProvider(LANGUAGE_ID, {
    provideDocumentSymbols: function (model) {
        var symbols = service.computeSymbols(LSP_URI, model.getValue());
        return symbols.map(function (symbol) {
            return {
                name: symbol.name,
                range: convertProtocolRange(symbol.location.range),
                kind: symbol.kind - 1
            };
        });
    }
});
monaco.languages.registerSignatureHelpProvider(LANGUAGE_ID, {
    signatureHelpTriggerCharacters: [' ', '-', '=', '[', ','],
    provideSignatureHelp: function (model, position) {
        var signatureHelp = service.computeSignatureHelp(model.getValue(), convertPosition(position.lineNumber, position.column));
        return {
            value: {
                activeParameter: signatureHelp.activeParameter !== undefined ? signatureHelp.activeParameter : undefined,
                activeSignature: signatureHelp.activeSignature !== undefined ? signatureHelp.activeSignature : undefined,
                signatures: signatureHelp.signatures.map(convertSignature)
            }
        };
    }
});
monaco.languages.registerRenameProvider(LANGUAGE_ID, {
    provideRenameEdits: function (model, position, newName) {
        var edits = service.computeRename(LSP_URI, model.getValue(), convertPosition(position.lineNumber, position.column), newName);
        var monacoEdits = convertTextEdits(edits);
        return convertToWorkspaceEdit(monacoEdits);
    }
});
monaco.languages.registerLinkProvider(LANGUAGE_ID, {
    provideLinks: function (model) {
        var links = service.computeLinks(model.getValue());
        return {
            links: links.map(function (link) {
                return convertLink(service.resolveLink(link));
            })
        };
    }
});
monaco.languages.registerDocumentFormattingEditProvider(LANGUAGE_ID, {
    provideDocumentFormattingEdits: function (model, options) {
        var edits = service.format(model.getValue(), convertFormattingOptions(options));
        return convertTextEdits(edits);
    }
});
monaco.languages.registerDocumentRangeFormattingEditProvider(LANGUAGE_ID, {
    provideDocumentRangeFormattingEdits: function (model, range, options) {
        var edits = service.formatRange(model.getValue(), convertMonacoRange(range), convertFormattingOptions(options));
        return convertTextEdits(edits);
    }
});
monaco.languages.registerOnTypeFormattingEditProvider(LANGUAGE_ID, {
    autoFormatTriggerCharacters: ['`', '\\'],
    provideOnTypeFormattingEdits: function (model, position, ch, options) {
        var edits = service.formatOnType(model.getValue(), convertPosition(position.lineNumber, position.column), ch, convertFormattingOptions(options));
        return convertTextEdits(edits);
    }
});
//# sourceMappingURL=client.js.map