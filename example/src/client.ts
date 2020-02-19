/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { DockerfileLanguageServiceFactory } from 'dockerfile-language-service';
import { Range, FormattingOptions, TextEdit, DocumentLink, Hover, CompletionItem, SignatureInformation, ParameterInformation } from 'vscode-languageserver-types';
import { SemanticTokenTypes, SemanticTokenModifiers } from 'vscode-languageserver-protocol/lib/protocol.sematicTokens.proposed';

declare var monaco: any
const LANGUAGE_ID = 'dockerfile';

// content to initialize the editor with
const content = 
`FROM node:alpine
COPY lib /docker-langserver/lib
COPY bin /docker-langserver/bin
COPY package.json /docker-langserver/package.json
WORKDIR /docker-langserver/
RUN npm install --production && \\
    chmod +x /docker-langserver/bin/docker-langserver
ENTRYPOINT [ "/docker-langserver/bin/docker-langserver" ]`;

// create the Monaco editor
const editor = monaco.editor.create(document.getElementById("container")!, {
    language: LANGUAGE_ID,
    value: content,
    lightbulb: {
        enabled: true
    },
    'semanticHighlighting.enabled': true,
    formatOnType: true,
    theme: "vs"
});
const monacoModel = editor.getModel();
const MONACO_URI = monacoModel.uri;
const MODEL_URI = MONACO_URI.toString();
const LSP_URI = { uri: MODEL_URI };

const darkThemeMap = {
    "keyword": 0,
    "comment": 7,
    "parameter": 10,
    "property": 3,
    "label": 11,
    "class": 5,
    "marco": 6,
    "string": 5,
    "variable": {
        "declaration": 8,
        "definition": 8,
        "deprecated": 8,
        "reference": 4,
    }
}
function getStyleMetadataDark(type: string, modifiers: string[]) {
    let color = (darkThemeMap as any)[type];
    if (type === "variable") {
        color = (darkThemeMap[type] as any)[modifiers[0]];
    }
    const style = {
        foreground: color,
        bold: false,
        underline: false,
        italic: false
    };
    if (true) {
        return style;
    }
};

const lightThemeMap = {
    "keyword": 0,
    "comment": 7,
    "parameter": 5,
    "property": 4,
    "label": 11,
    "class": 5,
    "marco": 3,
    "string": 11,
    "variable": {
        "declaration": 12,
        "definition": 12,
        "deprecated": 12,
        "reference": 13,
    }
}
function getStyleMetadataLight(type: string, modifiers: string[]) {
    let color = (lightThemeMap as any)[type];
    if (type === "variable") {
        color = (lightThemeMap[type] as any)[modifiers[0]];
    }
    const style = {
        foreground: color,
        bold: false,
        underline: false,
        italic: false
    };
    if (true) {
        return style;
    }
};

monaco.editor.setTheme('vs');
editor._themeService._theme.getTokenStyleMetadata = getStyleMetadataLight;

monaco.editor.setTheme('vs-dark');
editor._themeService._theme.getTokenStyleMetadata = getStyleMetadataDark

const service = DockerfileLanguageServiceFactory.createLanguageService();
service.setCapabilities({ completion: { completionItem: { snippetSupport: true }}});

function convertFormattingOptions(options: any): FormattingOptions {
    return {
        tabSize: options.tabSize,
        insertSpaces: options.insertSpaces
    }
}

function convertHover(hover: Hover) {
    return {
        contents: [
            {
                value: hover.contents
            }
        ],
        range: hover.range === undefined ? undefined : convertProtocolRange(hover.range as Range)
    }
}

function convertMonacoRange(range: any): Range {
    return {
        start: {
            line: range.startLineNumber - 1,
            character: range.startColumn - 1
        },
        end: {
            line: range.endLineNumber - 1,
            character: range.endColumn - 1
        }
    }
}

function convertPosition(line: number, character: number) {
    return {
        line: line - 1,
        character: character - 1
    }
}

function convertProtocolRange(range: Range) {
    return {
        startLineNumber: range.start.line + 1,
        startColumn: range.start.character + 1,
        endLineNumber: range.end.line + 1,
        endColumn: range.end.character + 1,
    }
}

function convertLink(link: DocumentLink) {
    return {
        range: convertProtocolRange(link.range),
        url: link.target,
    }
}

function convertTextEdit(edit: TextEdit) {
    return {
        range: convertProtocolRange(edit.range),
        text: edit.newText
    }
}

function convertTextEdits(edits: TextEdit[]) {
    return edits.map(convertTextEdit);
}

function convertParameter(parameter: ParameterInformation) {
    return {
        label: parameter.label,
        documentation: {
            value: parameter.documentation
        }
    }
}

function convertSignature(signature: SignatureInformation) {
    return {
        documentation: {
            value: signature.documentation
        },
        label: signature.label,
        parameters: signature.parameters ? signature.parameters.map(convertParameter) : []
    }
}

function convertToWorkspaceEdit(monacoEdits: any) {
    const workspaceEdits = monacoEdits.map((edit: any) => {
        return {
            edit: edit,
            resource: MONACO_URI
        }
    });
    return {
        edits: workspaceEdits
    };
}

function convertCompletionItem(item: CompletionItem) {
    item = service.resolveCompletionItem(item);
    return {
        label: item.label,
        documentation: {
            value: item.documentation
        },
        range: item.textEdit ? convertProtocolRange(item.textEdit.range) : undefined,
        kind: item.kind as number + 1,
        insertText: item.textEdit ? item.textEdit.newText : item.insertText,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,

    }
}

function convertMonacoCodeActionContext(context: any) {
    return {
        diagnostics: context.markers.map((marker: any) => {
            const range = convertMonacoRange(marker);
            return {
                code: Number(marker.code),
                range: range
            }
        })
    }
}

monacoModel.onDidChangeContent(() => {
    const diagnostics = service.validate(monacoModel.getValue());
    const markers = diagnostics.map((diagnostic) => {
        const range = convertProtocolRange(diagnostic.range);
        return {
            code: diagnostic.code !== undefined ? diagnostic.code.toString() : undefined,
            severity: diagnostic.severity === 1 ? monaco.MarkerSeverity.Error : monaco.MarkerSeverity.Warning,
            startLineNumber: range.startLineNumber,
            startColumn: range.startColumn,
            endLineNumber: range.endLineNumber,
            endColumn: range.endColumn,
            message: diagnostic.message,
            source: diagnostic.source,
        }
    });
    monaco.editor.setModelMarkers(monacoModel, LANGUAGE_ID, markers);
});

monaco.languages.registerDocumentSemanticTokensProvider(LANGUAGE_ID, {
    getLegend() {
        let tokenTypes = [];
        let tokenModifiers = [];
        tokenTypes.push(SemanticTokenTypes.keyword);
        tokenTypes.push(SemanticTokenTypes.comment);
        tokenTypes.push(SemanticTokenTypes.parameter);
        tokenTypes.push(SemanticTokenTypes.property);
        tokenTypes.push(SemanticTokenTypes.label);
        tokenTypes.push(SemanticTokenTypes.class);
        tokenTypes.push(SemanticTokenTypes.marco);
        tokenTypes.push(SemanticTokenTypes.string);
        tokenTypes.push(SemanticTokenTypes.variable);

        tokenModifiers.push(SemanticTokenModifiers.declaration);
        tokenModifiers.push(SemanticTokenModifiers.definition);
        tokenModifiers.push(SemanticTokenModifiers.deprecated);
        tokenModifiers.push(SemanticTokenModifiers.reference);
        return {
            tokenModifiers,
            tokenTypes
        };
    },

    provideDocumentSemanticTokens(model: any) {
        return service.computeSemanticTokens(model.getValue());
    },

    releaseDocumentSemanticTokens() {
        // nothing to do
    }
});

monaco.languages.registerCodeActionProvider(LANGUAGE_ID, {
    provideCodeActions(_model: any, range: any, context: any) {
        const commands = service.computeCodeActions(LSP_URI, convertMonacoRange(range), convertMonacoCodeActionContext(context));
        const codeActions = [];
        for (let command of commands) {
            let args = command.arguments ? command.arguments : []
            let edits = service.computeCommandEdits(monacoModel.getValue(), command.command, args);
            codeActions.push(
                {
                    title: command.title,
                    edit: convertToWorkspaceEdit(convertTextEdits(edits))
                }
            );
        }
        return {
            actions: codeActions,
            dispose: () => {}
        } as any;
    }
});

monaco.languages.registerCompletionItemProvider(LANGUAGE_ID, {
    triggerCharacters: ['=', ' ', '$', '-'],

    provideCompletionItems(model: any, position: any) {
        const lspPosition = convertPosition(position.lineNumber, position.column);
        const items = service.computeCompletionItems(model.getValue(), lspPosition);
        if ((items as any).then) {
            return (items as any).then((result: any) => {
                return {
                    incomplete: false,
                    suggestions: result.map(convertCompletionItem)
                }
            });
        }
        return {
            incomplete: false,
            suggestions: (items as any).map(convertCompletionItem)
        }
    },
});

monaco.languages.registerDefinitionProvider(LANGUAGE_ID, {
    provideDefinition(model: any, position: any) {
        const definition = service.computeDefinition(LSP_URI, model.getValue(), convertPosition(position.lineNumber, position.column));
        if (definition) {
            return {
                range: convertProtocolRange(definition.range),
                uri: MONACO_URI
            }
        }
        return null;
    }
});

monaco.languages.registerDocumentHighlightProvider(LANGUAGE_ID, {
    provideDocumentHighlights(model: any, position: any) {
        const highlightRanges = service.computeHighlightRanges(model.getValue(), convertPosition(position.lineNumber, position.column));
        return highlightRanges.map((highlightRange) => {
            return {
                kind: highlightRange.kind ? highlightRange.kind - 1 : undefined,
                range: convertProtocolRange(highlightRange.range)
            }
        });
    }
});

monaco.languages.registerHoverProvider(LANGUAGE_ID, {
    provideHover(model: any, position: any) {
        const hover = service.computeHover(model.getValue(), convertPosition(position.lineNumber, position.column));
        return hover === null ? null : convertHover(hover);
    }
});

monaco.languages.registerDocumentSymbolProvider(LANGUAGE_ID, {
    provideDocumentSymbols(model: any) {
        const symbols = service.computeSymbols(LSP_URI, model.getValue());
        return symbols.map((symbol) => {
            return {
                name: symbol.name,
                range: convertProtocolRange(symbol.location.range),
                kind: symbol.kind - 1
            }
        });
    }
});

monaco.languages.registerSignatureHelpProvider(LANGUAGE_ID, {
    signatureHelpTriggerCharacters: [' ', '-', '=', '[', ','],

    provideSignatureHelp(model: any, position: any) {
        const signatureHelp = service.computeSignatureHelp(model.getValue(), convertPosition(position.lineNumber, position.column));
        return {
            value: {
                activeParameter: signatureHelp.activeParameter !== undefined ? signatureHelp.activeParameter : undefined,
                activeSignature: signatureHelp.activeSignature !== undefined ? signatureHelp.activeSignature : undefined,
                signatures: signatureHelp.signatures.map(convertSignature)
            }
        }
    }
});

monaco.languages.registerRenameProvider(LANGUAGE_ID, {
    provideRenameEdits(model: any, position: any, newName: string) {
        const edits = service.computeRename(LSP_URI, model.getValue(), convertPosition(position.lineNumber, position.column), newName);
        const monacoEdits = convertTextEdits(edits);
        return convertToWorkspaceEdit(monacoEdits);
    }
});

monaco.languages.registerLinkProvider(LANGUAGE_ID, {
    provideLinks(model: any) {
        const links = service.computeLinks(model.getValue());
        return {
            links: links.map((link) => {
                return convertLink(service.resolveLink(link));
            })
        };
    }
});

monaco.languages.registerDocumentFormattingEditProvider(LANGUAGE_ID, {
    provideDocumentFormattingEdits(model: any, options: any) {
        const edits = service.format(model.getValue(), convertFormattingOptions(options));
        return convertTextEdits(edits);
    }
});

monaco.languages.registerDocumentRangeFormattingEditProvider(LANGUAGE_ID, {
    provideDocumentRangeFormattingEdits(model: any, range: any, options: any) {
        const edits = service.formatRange(model.getValue(), convertMonacoRange(range), convertFormattingOptions(options));
        return convertTextEdits(edits);
    }
});

monaco.languages.registerOnTypeFormattingEditProvider(LANGUAGE_ID, {
    autoFormatTriggerCharacters: ['`', '\\'],

    provideOnTypeFormattingEdits(model: any, position: any, ch: any, options: any) {
        const edits = service.formatOnType(model.getValue(), convertPosition(position.lineNumber, position.column), ch, convertFormattingOptions(options));
        return convertTextEdits(edits);
    }
});
