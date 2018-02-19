/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { DockerfileLanguageServiceFactory } from 'dockerfile-language-service';
import { MonacoToProtocolConverter, ProtocolToMonacoConverter } from 'monaco-languageclient';

const LANGUAGE_ID = 'dockerfile';
const MODEL_URI = 'inmemory://model.json'
const MONACO_URI = monaco.Uri.parse(MODEL_URI);
const LSP_URI = { uri: MODEL_URI };

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
    model: monaco.editor.createModel(content, LANGUAGE_ID, MONACO_URI),
    glyphMargin: true,
    formatOnType: true,
    theme: "vs-dark"
});

const monacoModel = monaco.editor.getModel(MONACO_URI);
const service = DockerfileLanguageServiceFactory.createLanguageService();
const m2p = new MonacoToProtocolConverter();
const p2m = new ProtocolToMonacoConverter();

monacoModel.onDidChangeContent((event) => {
    const diagnostics = service.validate(monacoModel.getValue());
    const markers = diagnostics.map(diagnostic => p2m.asMarker(diagnostic));
    monaco.editor.setModelMarkers(monacoModel, LANGUAGE_ID, markers);
});

monaco.languages.registerCodeActionProvider(LANGUAGE_ID, {
    provideCodeActions(model, range, context, token): monaco.languages.Command[] {
        const commands = service.computeCodeActions(LSP_URI, m2p.asRange(range), m2p.asCodeActionContext(context));
        for (let command of commands) {
            (editor as any)._commandService.addCommand(command.command, {
                handler: () => {
                    const args = command.arguments as any[];
                    const edits = service.computeCommandEdits(monacoModel.getValue(), command.command, args);
                    if (edits) {
                        const workspaceEdit = { changes: { [ MODEL_URI ] : edits }};
                        const mEdits: monaco.languages.WorkspaceEdit = p2m.asWorkspaceEdit(workspaceEdit);
                        const rEdits = mEdits.edits.map((edit) => {
                            return {
                                identifier: { major: 1, minor: 0 },
                                range: monaco.Range.lift(edit.range),
                                text: edit.newText,
                                forceMoveMarkers: true,
                            }
                        });
                        monacoModel.pushEditOperations([], rEdits, () => []);
                    }
                }
            });
        }
        return p2m.asCommands(commands);
    }
});

monaco.languages.registerCompletionItemProvider(LANGUAGE_ID, {
    triggerCharacters: ['=', ' ', '$', '-'],

    provideCompletionItems(model, position, token): monaco.languages.CompletionItem[] | Thenable<monaco.languages.CompletionItem[]> | monaco.languages.CompletionList | Thenable<monaco.languages.CompletionList> {
        const lspPosition = m2p.asPosition(position.lineNumber, position.column);
        const items = service.computeCompletionItems(model.getValue(), lspPosition, true);
        if ((items as any).then) {
            return (items as any).then((result: any) => {
                return p2m.asCompletionResult(result);
            });
        }
        const completionItems = items as any;
        return p2m.asCompletionResult(completionItems) as monaco.languages.CompletionItem[];
    },

    resolveCompletionItem(completionItem, token): monaco.languages.CompletionItem {
        return p2m.asCompletionItem(service.resolveCompletionItem(m2p.asCompletionItem(completionItem)));
    }
});

monaco.languages.registerDefinitionProvider(LANGUAGE_ID, {
    provideDefinition(model, position, token): monaco.languages.Definition {
        const definition = service.computeDefinition(LSP_URI, model.getValue(), m2p.asPosition(position.lineNumber, position.column));
        return p2m.asDefinitionResult(definition);
    }
});

monaco.languages.registerDocumentHighlightProvider(LANGUAGE_ID, {
    provideDocumentHighlights(model, position, token): monaco.languages.DocumentHighlight[] {
        const highlightRanges = service.computeHighlightRanges(LSP_URI, model.getValue(), m2p.asPosition(position.lineNumber, position.column));
        return p2m.asDocumentHighlights(highlightRanges);
    }
});

monaco.languages.registerHoverProvider(LANGUAGE_ID, {
    provideHover(model, position, token): monaco.languages.Hover {
        const hover = service.computeHover(model.getValue(), m2p.asPosition(position.lineNumber, position.column));
        return p2m.asHover(hover) as monaco.languages.Hover;
    }
});

monaco.languages.registerDocumentSymbolProvider(LANGUAGE_ID, {
    provideDocumentSymbols(model, token): monaco.languages.SymbolInformation[] {
        const symbols = service.computeSymbols(LSP_URI, model.getValue());
        return p2m.asSymbolInformations(symbols);
    }
});

monaco.languages.registerSignatureHelpProvider(LANGUAGE_ID, {
    signatureHelpTriggerCharacters: [' ', '-', '=', '[', ','],

    provideSignatureHelp(model, position, token): monaco.languages.SignatureHelp {
        const symbols = service.computeSignatureHelp(model.getValue(), m2p.asPosition(position.lineNumber, position.column));
        return p2m.asSignatureHelp(symbols);
    }
});

monaco.languages.registerRenameProvider(LANGUAGE_ID, {
    provideRenameEdits(model, position, newName): monaco.languages.WorkspaceEdit {
        const edits = service.computeRename(LSP_URI, model.getValue(), m2p.asPosition(position.lineNumber, position.column), newName);
        return p2m.asWorkspaceEdit({
            changes: {
                [MODEL_URI]: edits
            }
        });
    }
});

monaco.languages.registerLinkProvider(LANGUAGE_ID, {
    provideLinks(model, token): monaco.languages.ILink[] {
        const links = service.computeLinks(model.getValue());
        return p2m.asILinks(links);
    }
});

monaco.languages.registerDocumentFormattingEditProvider(LANGUAGE_ID, {
    provideDocumentFormattingEdits(model, options, token): monaco.languages.TextEdit[] {
        const edits = service.format(model.getValue(), m2p.asFormattingOptions(options));
        return p2m.asTextEdits(edits);
    }
});

monaco.languages.registerDocumentRangeFormattingEditProvider(LANGUAGE_ID, {
    provideDocumentRangeFormattingEdits(model, range, options, token): monaco.languages.TextEdit[] {
        const edits = service.formatRange(model.getValue(), m2p.asRange(range), m2p.asFormattingOptions(options));
        return p2m.asTextEdits(edits);
    }
});

monaco.languages.registerOnTypeFormattingEditProvider(LANGUAGE_ID, {
    autoFormatTriggerCharacters: ['`', '\\'],

    provideOnTypeFormattingEdits(model, position, ch, options, token): monaco.languages.TextEdit[] {
        const edits = service.formatOnType(model.getValue(), m2p.asPosition(position.lineNumber, position.column), ch, m2p.asFormattingOptions(options));
        return p2m.asTextEdits(edits);
    }
});
