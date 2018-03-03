/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { DockerfileLanguageService, ILogger } from "./main";
import {
    TextDocument, Position, CompletionItem, Range, CodeActionContext, Command, TextDocumentIdentifier, WorkspaceEdit, Location, DocumentHighlight, SymbolInformation, SignatureHelp, DocumentLink, TextEdit, Hover, FormattingOptions, Diagnostic
} from "vscode-languageserver-types";
import * as DockerfileUtils from 'dockerfile-utils';
import { DockerAssist } from "./dockerAssist";
import { DockerRegistryClient } from "./dockerRegistryClient";
import { DockerCommands } from "./dockerCommands";
import { DockerDefinition } from "./dockerDefinition";
import { DockerHighlight } from "./dockerHighlight";
import { DockerSymbols } from "./dockerSymbols";
import { DockerSignatures } from "./dockerSignatures";
import { DockerLinks } from "./dockerLinks";
import { PlainTextDocumentation } from "./dockerPlainText";
import { DockerRename } from "./dockerRename";
import { DockerHover } from "./dockerHover";
import { MarkdownDocumentation } from "./dockerMarkdown";
import { DockerFormatter } from "./dockerFormatter";

export class LanguageService implements DockerfileLanguageService {

    private markdownDocumentation = new MarkdownDocumentation();
    private logger: ILogger;

    public setLogger(logger: ILogger): void {
        this.logger = logger;
    }

    public computeCodeActions(textDocument: TextDocumentIdentifier, range: Range, context: CodeActionContext): Command[] {
        let dockerCommands = new DockerCommands();
        return dockerCommands.analyzeDiagnostics(context.diagnostics, textDocument.uri);
    }

    public computeLinks(content: string): DocumentLink[] {
        let dockerLinks = new DockerLinks();
        return dockerLinks.getLinks(content);
    }

    public computeCommandEdits(content: string, command: string, args: any[]): TextEdit[] {
        let dockerCommands = new DockerCommands();
        return dockerCommands.computeCommandEdits(content, command, args);
    }

    public computeCompletionItems(content: string, position: Position, snippetSupport: boolean): CompletionItem[] | PromiseLike<CompletionItem[]> {
        const document = TextDocument.create("", "", 0, content);
        const dockerAssist = new DockerAssist(document, snippetSupport, new DockerRegistryClient(this.logger));
        return dockerAssist.computeProposals(position);
    }

    public resolveCompletionItem(item: CompletionItem): CompletionItem {
        if (!item.documentation) {
            let dockerPlainText = new PlainTextDocumentation();
            item.documentation = dockerPlainText.getDocumentation(item.data);
        }
        return item;
    }

    public computeDefinition(textDocument: TextDocumentIdentifier, content: string, position: Position): Location {
        let dockerDefinition = new DockerDefinition();
        return dockerDefinition.computeDefinition(textDocument, content, position);
    }

    public computeHighlightRanges(content: string, position: Position): DocumentHighlight[] {
        let dockerHighlight = new DockerHighlight();
        return dockerHighlight.computeHighlightRanges(content, position);
    }

    public computeHover(content: string, position: Position): Hover | null {
        let dockerHover = new DockerHover(this.markdownDocumentation);
        return dockerHover.onHover(content, position);
    }

    public computeSymbols(textDocument: TextDocumentIdentifier, content: string): SymbolInformation[] {
        let dockerSymbols = new DockerSymbols();
        return dockerSymbols.parseSymbolInformation(textDocument, content);
    }

    public computeSignatureHelp(content: string, position: Position): SignatureHelp {
        let dockerSignature = new DockerSignatures();
        return dockerSignature.computeSignatures(content, position);
    }

    public computeRename(textDocument: TextDocumentIdentifier, content: string, position: Position, newName: string): TextEdit[] {
        let dockerRename = new DockerRename();
        return dockerRename.rename(textDocument, content, position, newName);
    }

    public validate(content: string, settings?: DockerfileUtils.ValidatorSettings): Diagnostic[] {
        return DockerfileUtils.validate(content, settings);
    }

    public format(content: string, options: FormattingOptions): TextEdit[] {
        return DockerfileUtils.format(content, options);
    }

    public formatRange(content: string, range: Range, options: FormattingOptions): TextEdit[] {
        let dockerFormat = new DockerFormatter();
        return dockerFormat.formatRange(content, range, options);
    }

    public formatOnType(content: string, position: Position, ch: string, options: FormattingOptions): TextEdit[] {
        let dockerFormat = new DockerFormatter();
        return dockerFormat.formatOnType(content, position, ch, options);
    }
}
