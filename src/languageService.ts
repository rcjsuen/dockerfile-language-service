/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { DockerfileLanguageService, ILogger, Capabilities, CompletionItemCapabilities, FormatterSettings } from "./main";
import { TextDocument } from 'vscode-languageserver-textdocument'; 
import {
    Position, CompletionItem, Range, CodeActionContext, Command, TextDocumentIdentifier, SemanticTokens, Location, DocumentHighlight, SymbolInformation, SignatureHelp, DocumentLink, TextEdit, Hover, FormattingOptions, Diagnostic, MarkupKind, FoldingRange, CompletionItemTag
} from "vscode-languageserver-types";
import * as DockerfileUtils from 'dockerfile-utils';
import { DockerAssist } from "./dockerAssist";
import { DockerRegistryClient } from "./dockerRegistryClient";
import { DockerCommands } from "./dockerCommands";
import { DockerFolding } from "./dockerFolding";
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
import { DockerCompletion } from "./dockerCompletion";
import { DockerSemanticTokens } from "./dockerSemanticTokens";

export class LanguageService implements DockerfileLanguageService {

    private markdownDocumentation = new MarkdownDocumentation();
    private plainTextDocumentation = new PlainTextDocumentation();
    private logger: ILogger;

    private hoverContentFormat: MarkupKind[];
    private completionItemCapabilities: CompletionItemCapabilities;

    private foldingRangeLineFoldingOnly: boolean = false;
    private foldingRangeLimit: number = Number.MAX_VALUE;

    public setLogger(logger: ILogger): void {
        this.logger = logger;
    }

    public setCapabilities(capabilities: Capabilities): void {
        this.completionItemCapabilities = capabilities && capabilities.completion && capabilities.completion.completionItem;
        this.hoverContentFormat = capabilities && capabilities.hover && capabilities.hover.contentFormat;
        this.foldingRangeLineFoldingOnly = capabilities && capabilities.foldingRange && capabilities.foldingRange.lineFoldingOnly;
        this.foldingRangeLimit = capabilities && capabilities.foldingRange && capabilities.foldingRange.rangeLimit;
    }

    public computeCodeActions(textDocument: TextDocumentIdentifier, range: Range, context: CodeActionContext): Command[] {
        let dockerCommands = new DockerCommands();
        return dockerCommands.analyzeDiagnostics(context.diagnostics, textDocument.uri);
    }

    public computeLinks(content: string): DocumentLink[] {
        let dockerLinks = new DockerLinks();
        return dockerLinks.getLinks(content);
    }

    public resolveLink(link: DocumentLink): DocumentLink {
        let dockerLinks = new DockerLinks();
        return dockerLinks.resolveLink(link);
    }

    public computeCommandEdits(content: string, command: string, args: any[]): TextEdit[] {
        let dockerCommands = new DockerCommands();
        return dockerCommands.computeCommandEdits(content, command, args);
    }

    public computeCompletionItems(content: string, position: Position): CompletionItem[] | PromiseLike<CompletionItem[]> {
        const document = TextDocument.create("", "", 0, content);
        const dockerAssist = new DockerAssist(document, new DockerRegistryClient(this.logger), this.completionItemCapabilities);
        return dockerAssist.computeProposals(position);
    }

    public resolveCompletionItem(item: CompletionItem): CompletionItem {
        if (!item.documentation) {
            let dockerCompletion = new DockerCompletion();
            return dockerCompletion.resolveCompletionItem(item, this.completionItemCapabilities && this.completionItemCapabilities.documentationFormat);
        }
        return item;
    }

    public computeDefinition(textDocument: TextDocumentIdentifier, content: string, position: Position): Location {
        let dockerDefinition = new DockerDefinition();
        return dockerDefinition.computeDefinition(textDocument, content, position);
    }

    public computeFoldingRanges(content: string): FoldingRange[] {
        let dockerFolding = new DockerFolding();
        return dockerFolding.computeFoldingRanges(content, this.foldingRangeLineFoldingOnly, this.foldingRangeLimit);
    }

    public computeHighlightRanges(content: string, position: Position): DocumentHighlight[] {
        let dockerHighlight = new DockerHighlight();
        return dockerHighlight.computeHighlightRanges(content, position);
    }

    public computeHover(content: string, position: Position): Hover | null {
        let dockerHover = new DockerHover(this.markdownDocumentation, this.plainTextDocumentation);
        return dockerHover.onHover(content, position, this.hoverContentFormat);
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

    public prepareRename(content: string, position: Position): Range | null {
        let dockerRename = new DockerRename();
        return dockerRename.prepareRename(content, position);
    }

    public computeSemanticTokens(content: string): SemanticTokens {
        let dockerSemanticTokens = new DockerSemanticTokens(content);
        return dockerSemanticTokens.computeSemanticTokens();
    }

    public validate(content: string, settings?: DockerfileUtils.ValidatorSettings): Diagnostic[] {
        return DockerfileUtils.validate(content, settings);
    }

    public format(content: string, settings: FormatterSettings): TextEdit[] {
        return DockerfileUtils.format(content, settings);
    }

    public formatRange(content: string, range: Range, settings: FormatterSettings): TextEdit[] {
        return DockerfileUtils.formatRange(content, range, settings);
    }

    public formatOnType(content: string, position: Position, ch: string, settings: FormatterSettings): TextEdit[] {
        return DockerfileUtils.formatOnType(content, position, ch, settings);
    }
}
