/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
    TextDocument, Position, CompletionItem, Range, CodeActionContext, Command, TextDocumentIdentifier, WorkspaceEdit, Location, DocumentHighlight, SymbolInformation, SignatureHelp, TextEdit, DocumentLink, Hover, FormattingOptions, Diagnostic, MarkupKind
} from 'vscode-languageserver-types';
import { ValidatorSettings } from 'dockerfile-utils';
import { LanguageService } from './languageService';

/**
 * An interface for logging errors encountered in the language service.
 */
export interface ILogger {

    log(message: string): void;
}

export enum CommandIds {
    LOWERCASE = "docker.command.convertToLowercase",
    UPPERCASE = "docker.command.convertToUppercase",
    EXTRA_ARGUMENT = "docker.command.removeExtraArgument",
    DIRECTIVE_TO_BACKTICK = "docker.command.directiveToBacktick",
    DIRECTIVE_TO_BACKSLASH = "docker.command.directiveToBackslash",
    FLAG_TO_CHOWN = "docker.command.flagToChown",
    FLAG_TO_COPY_FROM = "docker.command.flagToCopyFrom",
    FLAG_TO_HEALTHCHECK_INTERVAL = "docker.command.flagToHealthcheckInterval",
    FLAG_TO_HEALTHCHECK_RETRIES = "docker.command.flagToHealthcheckRetries",
    FLAG_TO_HEALTHCHECK_START_PERIOD = "docker.command.flagToHealthcheckStartPeriod",
    FLAG_TO_HEALTHCHECK_TIMEOUT = "docker.command.flagToHealthcheckTimeout",
    REMOVE_EMPTY_CONTINUATION_LINE = "docker.command.removeEmptyContinuationLine",
    CONVERT_TO_AS = "docker.command.convertToAS"
}

export namespace DockerfileLanguageServiceFactory {
    export function createLanguageService(): DockerfileLanguageService {
        return new LanguageService();
    }
}

export interface Capabilities {
    /**
     * Capabilities related to completion requests.
     */
    completion?: {
        /**
         * Capabilities related to completion items.
         */
        completionItem?: {
            /**
             * Describes the supported content types that can be used
             * for a CompletionItem's documentation field.
             */
            documentationFormat?: MarkupKind[];
            /**
             * Indicates whether the snippet syntax should be used in
             * returned completion items.
             */
            snippetSupport?: boolean;
        }
    };
    /**
     * Capabilities related to hover requests.
     */
    hover?: {
        /**
         * Describes the content type that should be returned for hovers.
         */
        contentFormat?: MarkupKind[];
    }
}

export interface DockerfileLanguageService {

    setCapabilities(capabilities: Capabilities);

    computeCodeActions(textDocument: TextDocumentIdentifier, range: Range, context: CodeActionContext): Command[];

    computeCommandEdits(content: string, command: string, args: any[]): TextEdit[];

    computeCompletionItems(content: string, position: Position): CompletionItem[] | PromiseLike<CompletionItem[]>;

    resolveCompletionItem(item: CompletionItem): CompletionItem;

    computeDefinition(textDocument: TextDocumentIdentifier, content: string, position: Position): Location;

    computeHighlightRanges(content: string, position: Position): DocumentHighlight[];

    computeHover(content: string, position: Position): Hover | null;

    computeSymbols(textDocument: TextDocumentIdentifier, content: string): SymbolInformation[];

    computeSignatureHelp(content: string, position: Position): SignatureHelp;

    computeRename(textDocument: TextDocumentIdentifier, content: string, position: Position, newName: string): TextEdit[];

    computeLinks(content: string): DocumentLink[];

    validate(content: string, settings?: ValidatorSettings): Diagnostic[];

    format(content: string, options: FormattingOptions): TextEdit[];

    formatRange(content: string, range: Range, options: FormattingOptions): TextEdit[];

    formatOnType(content: string, position: Position, ch: string, options: FormattingOptions): TextEdit[];

    setLogger(logger: ILogger): void;
}
