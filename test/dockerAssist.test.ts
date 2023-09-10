/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as assert from "assert";

import { TextDocument } from 'vscode-languageserver-textdocument'; 
import {
    Position, CompletionItem, CompletionItemKind, InsertTextFormat, MarkupContent, MarkupKind, CompletionItemTag, TextEdit
} from 'vscode-languageserver-types';
import { KEYWORDS } from '../src/docker';
import { MarkdownDocumentation } from '../src/dockerMarkdown';
import { PlainTextDocumentation } from '../src/dockerPlainText';
import { CompletionItemCapabilities, DockerfileLanguageServiceFactory } from '../src/main';

const service = DockerfileLanguageServiceFactory.createLanguageService();
const markdownDocumentation = new MarkdownDocumentation();
const plainTextDocumentation = new PlainTextDocumentation();

function createDocument(content: string): any {
    return TextDocument.create("uri://host/Dockerfile.sample", "dockerfile", 1, content);
}

function compute(content: string, offset: number, capabilities?: CompletionItemCapabilities): CompletionItem[] {
    if (capabilities === undefined || capabilities === null) {
        capabilities = {
            deprecatedSupport: false,
            snippetSupport: true
        }
    }
    let document = createDocument(content);
    service.setCapabilities({ completion: { completionItem: capabilities } });
    let items = service.computeCompletionItems(content, document.positionAt(offset));
    return items as CompletionItem[];
}

function computePosition(content: string, line: number, character: number, snippetSupport?: boolean): CompletionItem[] {
    if (snippetSupport === undefined) {
        snippetSupport = true;
    }
    service.setCapabilities({ completion: { completionItem: { snippetSupport: snippetSupport } }});
    let items = service.computeCompletionItems(content, Position.create(line, character));
    return items as CompletionItem[];
}

function assertOnlyFROM(proposals: CompletionItem[], line: number, number: number, prefixLength: number) {
    assert.strictEqual(proposals.length, 1);
    assertFROM(proposals[0], line, number, line, number + prefixLength);
}

function assertRawDocumentation(item: CompletionItem, expected: string) {
    service.setCapabilities({ });
    service.resolveCompletionItem(item);
    assert.strictEqual(item.documentation, expected);

    service.setCapabilities({ completion: { completionItem: { documentationFormat: [] } }});
    service.resolveCompletionItem(item);
    assert.strictEqual(item.documentation, expected);

    service.setCapabilities({ completion: { completionItem: { documentationFormat: [ undefined ] } }});
    service.resolveCompletionItem(item);
    assert.strictEqual(item.documentation, expected);

    service.setCapabilities({ completion: { completionItem: { documentationFormat: [ null ] } }});
    service.resolveCompletionItem(item);
    assert.strictEqual(item.documentation, expected);

    service.setCapabilities({ completion: { completionItem: { documentationFormat: [ MarkupKind.Markdown ] } }});
    service.resolveCompletionItem(item);
    assert.strictEqual(item.documentation, expected);

    service.setCapabilities({ completion: { completionItem: { documentationFormat: [ MarkupKind.PlainText ] } }});
    service.resolveCompletionItem(item);
    assert.strictEqual(item.documentation, expected);

    service.setCapabilities({ completion: { completionItem: { documentationFormat: [ MarkupKind.Markdown, MarkupKind.PlainText ] } }});
    service.resolveCompletionItem(item);
    assert.strictEqual(item.documentation, expected);

    service.setCapabilities({ completion: { completionItem: { documentationFormat: [ MarkupKind.PlainText, MarkupKind.Markdown ] } }});
    service.resolveCompletionItem(item);
    assert.strictEqual(item.documentation, expected);
}

function assertResolvedDocumentation(item: CompletionItem) {
    item.documentation = undefined;
    let service = DockerfileLanguageServiceFactory.createLanguageService();
    service.resolveCompletionItem(item);
    assert.strictEqual(typeof item.documentation, "string");
    assert.strictEqual(item.documentation, plainTextDocumentation.getDocumentation(item.data));

    item.documentation = undefined;
    service.setCapabilities({ completion: { completionItem: { documentationFormat: [] } }});
    service.resolveCompletionItem(item);
    assert.strictEqual(typeof item.documentation, "string");
    assert.strictEqual(item.documentation, plainTextDocumentation.getDocumentation(item.data));

    item.documentation = undefined;
    service.setCapabilities({ completion: { completionItem: { documentationFormat: [ undefined ] } }});
    service.resolveCompletionItem(item);
    assert.strictEqual(typeof item.documentation, "string");
    assert.strictEqual(item.documentation, plainTextDocumentation.getDocumentation(item.data));

    item.documentation = undefined;
    service.setCapabilities({ completion: { completionItem: { documentationFormat: [ null ] } }});
    service.resolveCompletionItem(item);
    assert.strictEqual(typeof item.documentation, "string");
    assert.strictEqual(item.documentation, plainTextDocumentation.getDocumentation(item.data));

    item.documentation = undefined;
    service.setCapabilities({ completion: { completionItem: { documentationFormat: [ MarkupKind.Markdown ] } }});
    service.resolveCompletionItem(item);
    let markupContent = item.documentation as MarkupContent;
    assert.strictEqual(markupContent.kind, MarkupKind.Markdown);
    assert.notStrictEqual(markupContent.value, undefined);
    assert.notStrictEqual(markupContent.value, null);
    assert.notStrictEqual(markupContent.value, "");
    assert.strictEqual(markupContent.value, markdownDocumentation.getMarkdown(item.data).contents);

    item.documentation = undefined;
    service.setCapabilities({ completion: { completionItem: { documentationFormat: [ MarkupKind.PlainText ] } }});
    service.resolveCompletionItem(item);
    markupContent = item.documentation as MarkupContent;
    assert.strictEqual(markupContent.kind, MarkupKind.PlainText);
    assert.notStrictEqual(markupContent.value, undefined);
    assert.notStrictEqual(markupContent.value, null);
    assert.notStrictEqual(markupContent.value, "");
    assert.strictEqual(markupContent.value, plainTextDocumentation.getDocumentation(item.data));

    item.documentation = undefined;
    service.setCapabilities({ completion: { completionItem: { documentationFormat: [ MarkupKind.Markdown, MarkupKind.PlainText ] } }});
    service.resolveCompletionItem(item);
    markupContent = item.documentation as MarkupContent;
    assert.strictEqual(markupContent.kind, MarkupKind.Markdown);
    assert.notStrictEqual(markupContent.value, undefined);
    assert.notStrictEqual(markupContent.value, null);
    assert.notStrictEqual(markupContent.value, "");
    assert.strictEqual(markupContent.value, markdownDocumentation.getMarkdown(item.data).contents);

    item.documentation = undefined;
    service.setCapabilities({ completion: { completionItem: { documentationFormat: [ MarkupKind.PlainText, MarkupKind.Markdown ] } }});
    service.resolveCompletionItem(item);
    markupContent = item.documentation as MarkupContent;
    assert.strictEqual(markupContent.kind, MarkupKind.PlainText);
    assert.notStrictEqual(markupContent.value, undefined);
    assert.notStrictEqual(markupContent.value, null);
    assert.notStrictEqual(markupContent.value, "");
    assert.strictEqual(markupContent.value, plainTextDocumentation.getDocumentation(item.data));
}

function assertADD(item: CompletionItem, line: number, character: number, prefixLength: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "ADD source dest");
    } else {
        assert.strictEqual(item.label, "ADD");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "ADD ${1:source} ${2:dest}");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "ADD");
    }
    assert.strictEqual(item.data, "ADD");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertResolvedDocumentation(item);
}

function assertARG(item: CompletionItem, line: number, character: number, prefixLength: number) {
    assert.strictEqual(item.label, "ARG");
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
    assert.strictEqual(item.textEdit.newText, "ARG");
    assert.strictEqual(item.data, "ARG");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertResolvedDocumentation(item);
}

function assertARG_NameOnly(item: CompletionItem, line: number, character: number, prefixLength: number, snippetSupport?: boolean) {
    assert.strictEqual(item.label, "ARG name");
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "ARG ${1:name}");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "ARG");
    }
    assert.strictEqual(item.data, "ARG_NameOnly");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertResolvedDocumentation(item);
}

function assertARG_DefaultValue(item: CompletionItem, line: number, character: number, prefixLength: number) {
    assert.strictEqual(item.label, "ARG name=defaultValue");
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
    assert.strictEqual(item.textEdit.newText, "ARG ${1:name}=${2:defaultValue}");
    assert.strictEqual(item.data, "ARG_DefaultValue");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertResolvedDocumentation(item);
}

function assertCMD(item: CompletionItem, line: number, character: number, prefixLength: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "CMD [ \"executable\" ]");
    } else {
        assert.strictEqual(item.label, "CMD");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "CMD [ \"${1:executable}\" ]");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "CMD");
    }
    assert.strictEqual(item.data, "CMD");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertResolvedDocumentation(item);
}

function assertCOPY(item: CompletionItem, line: number, character: number, prefixLength: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "COPY source dest");
    } else {
        assert.strictEqual(item.label, "COPY");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "COPY ${1:source} ${2:dest}");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "COPY");
    }
    assert.strictEqual(item.data, "COPY");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertResolvedDocumentation(item);
}

function assertENTRYPOINT(item: CompletionItem, line: number, character: number, prefixLength: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "ENTRYPOINT [ \"executable\" ]");
    } else {
        assert.strictEqual(item.label, "ENTRYPOINT");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "ENTRYPOINT [ \"${1:executable}\" ]");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "ENTRYPOINT");
    }
    assert.strictEqual(item.data, "ENTRYPOINT");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertResolvedDocumentation(item);
}

function assertENV(item: CompletionItem, line: number, character: number, prefixLength: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "ENV key=value");
    } else {
        assert.strictEqual(item.label, "ENV");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "ENV ${1:key}=${2:value}");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "ENV");
    }
    assert.strictEqual(item.data, "ENV");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertResolvedDocumentation(item);
}

function assertEXPOSE(item: CompletionItem, line: number, character: number, prefixLength: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "EXPOSE port");
    } else {
        assert.strictEqual(item.label, "EXPOSE");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "EXPOSE ${1:port}");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "EXPOSE");
    }
    assert.strictEqual(item.data, "EXPOSE");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertResolvedDocumentation(item);
}

function assertCompletionItem(item: CompletionItem, label: string, snippetLabel: string, newText: string, snippetNewText: string, data: any, startLine: number, startCharacter: number, endLine: number, endCharacter: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, snippetLabel);
    } else {
        assert.strictEqual(item.label, label);
    }
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, snippetNewText);
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, newText);
    }
    assert.strictEqual(item.data, data);
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, startLine);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, startCharacter);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, endLine);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, endCharacter);
    assertResolvedDocumentation(item);
}

function assertFROM(item: CompletionItem, line: number, character: number, endLine: number, endCharacter: number, snippetSupport?: boolean) {
    assertCompletionItem(item, "FROM", "FROM baseImage", "FROM", "FROM ${1:baseImage}", "FROM", line, character, endLine, endCharacter, snippetSupport);
}

function assertHEALTHCHECK_CMD(item: CompletionItem, line: number, character: number, prefixLength: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ \"executable\" ]");
    } else {
        assert.strictEqual(item.label, "HEALTHCHECK CMD");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "HEALTHCHECK --interval=${1:30s} --timeout=${2:30s} --start-period=${3:5s} --retries=${4:3} CMD [ \"${5:executable}\" ]");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "HEALTHCHECK CMD");
    }
    assert.strictEqual(item.data, "HEALTHCHECK_CMD");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertResolvedDocumentation(item);
}

function assertHEALTHCHECK_CMD_Subcommand(item: CompletionItem, line: number, character: number, endLine: number, endCharacter: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "CMD [ \"executable\" ]");
    } else {
        assert.strictEqual(item.label, "CMD");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "CMD [ \"${1:executable}\" ]");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "CMD");
    }
    assert.strictEqual(item.data, "HEALTHCHECK_CMD");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, endLine);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, endCharacter);
    assertResolvedDocumentation(item);
}

function assertADD_FlagChown(item: CompletionItem, startLine: number, startCharacter: number, endLine: number, endCharacter: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "--chown=user:group");
    } else {
        assert.strictEqual(item.label, "--chown=");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Field);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "--chown=${1:user\:group}");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "--chown=");
    }
    assert.strictEqual(item.data, "ADD_FlagChown");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, startLine);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, startCharacter);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, endLine);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, endCharacter);
    assertResolvedDocumentation(item);
}

function assertCOPY_FlagChown(item: CompletionItem, startLine: number, startCharacter: number, endLine: number, endCharacter: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "--chown=user:group");
    } else {
        assert.strictEqual(item.label, "--chown=");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Field);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "--chown=${1:user\:group}");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "--chown=");
    }
    assert.strictEqual(item.data, "COPY_FlagChown");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, startLine);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, startCharacter);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, endLine);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, endCharacter);
    assertResolvedDocumentation(item);
}

function assertCOPY_FlagFrom(item: CompletionItem, startLine: number, startCharacter: number, endLine: number, endCharacter: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "--from=stage");
    } else {
        assert.strictEqual(item.label, "--from=");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Field);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "--from=${1:stage}");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "--from=");
    }
    assert.strictEqual(item.data, "COPY_FlagFrom");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, startLine);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, startCharacter);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, endLine);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, endCharacter);
    assertResolvedDocumentation(item);
}

function assertFROM_FlagPlatform(item: CompletionItem, startLine: number, startCharacter: number, endLine: number, endCharacter: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "--platform=arm64");
    } else {
        assert.strictEqual(item.label, "--platform=");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Field);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "--platform=${1:arm64}");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "--platform=");
    }
    assert.strictEqual(item.data, "FROM_FlagPlatform");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, startLine);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, startCharacter);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, endLine);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, endCharacter);
    assertResolvedDocumentation(item);
}

function assertHEALTHCHECK_FlagInterval(item: CompletionItem, startLine: number, startCharacter: number, endLine: number, endCharacter: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "--interval=30s");
    } else {
        assert.strictEqual(item.label, "--interval=");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Field);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "--interval=${1:30s}");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "--interval=");
    }
    assert.strictEqual(item.data, "HEALTHCHECK_FlagInterval");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, startLine);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, startCharacter);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, endLine);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, endCharacter);
    assertResolvedDocumentation(item);
}

function assertHEALTHCHECK_FlagStartInterval(item: CompletionItem, startLine: number, startCharacter: number, endLine: number, endCharacter: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "--start-interval=5s");
    } else {
        assert.strictEqual(item.label, "--start-interval=");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Field);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "--start-interval=${1:5s}");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "--start-interval=");
    }
    assert.strictEqual(item.data, "HEALTHCHECK_FlagStartInterval");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, startLine);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, startCharacter);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, endLine);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, endCharacter);
    assertResolvedDocumentation(item);
}

function assertHEALTHCHECK_FlagTimeout(item: CompletionItem, startLine: number, startCharacter: number, endLine: number, endCharacter: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "--timeout=30s");
    } else {
        assert.strictEqual(item.label, "--timeout=");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Field);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "--timeout=${1:30s}");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "--timeout=");
    }
    assert.strictEqual(item.data, "HEALTHCHECK_FlagTimeout");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, startLine);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, startCharacter);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, endLine);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, endCharacter);
    assertResolvedDocumentation(item);
}

function assertHEALTHCHECK_FlagStartPeriod(item: CompletionItem, startLine: number, startCharacter: number, endLine: number, endCharacter: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "--start-period=5s");
    } else {
        assert.strictEqual(item.label, "--start-period=");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Field);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "--start-period=${1:5s}");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "--start-period=");
    }
    assert.strictEqual(item.data, "HEALTHCHECK_FlagStartPeriod");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, startLine);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, startCharacter);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, endLine);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, endCharacter);
    assertResolvedDocumentation(item);
}

function assertHEALTHCHECK_FlagRetries(item: CompletionItem, startLine: number, startCharacter: number, endLine: number, endCharacter: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "--retries=3");
    } else {
        assert.strictEqual(item.label, "--retries=");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Field);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "--retries=${1:3}");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "--retries=");
    }
    assert.strictEqual(item.data, "HEALTHCHECK_FlagRetries");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, startLine);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, startCharacter);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, endLine);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, endCharacter);
    assertResolvedDocumentation(item);
}

function assertHEALTHCHECK_NONE(item: CompletionItem, line: number, character: number, prefixLength: number) {
    assert.strictEqual(item.label, "HEALTHCHECK NONE");
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
    assert.strictEqual(item.data, "HEALTHCHECK_NONE");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual(item.textEdit.newText, "HEALTHCHECK NONE");
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertResolvedDocumentation(item);
}

function assertHEALTHCHECK_NONE_Subcommand(item: CompletionItem, line: number, character: number, endLine: number, endCharacter: number) {
    assert.strictEqual(item.label, "NONE");
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
    assert.strictEqual(item.textEdit.newText, "NONE");
    assert.strictEqual(item.data, "HEALTHCHECK_NONE");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, endLine);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, endCharacter);
    assertResolvedDocumentation(item);
}

function assertLABEL(item: CompletionItem, line: number, character: number, prefixLength: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "LABEL key=\"value\"");
    } else {
        assert.strictEqual(item.label, "LABEL");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "LABEL ${1:key}=\"${2:value}\"");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "LABEL");
    }
    assert.strictEqual(item.data, "LABEL");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertResolvedDocumentation(item);
}

function assertMAINTAINER(item: CompletionItem, line: number, character: number, prefixLength: number, snippetSupport?: boolean, deprecatedSupport?: boolean, supportedTags?: CompletionItemTag[]) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "MAINTAINER name");
    } else {
        assert.strictEqual(item.label, "MAINTAINER");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "MAINTAINER ${1:name}");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "MAINTAINER");
    }
    assert.strictEqual(item.data, "MAINTAINER");
    if (deprecatedSupport) {
        assert.strictEqual(item.deprecated, true);
    } else {
        assert.strictEqual(item.deprecated, undefined);
    }
    if (supportedTags !== undefined && supportedTags.length > 0) {
        assert.strictEqual(item.tags.length, 1);
        assert.strictEqual(item.tags[0], CompletionItemTag.Deprecated);
    } else {
        assert.strictEqual(item.tags, undefined);
    }
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertResolvedDocumentation(item);
}

function assertONBUILD(item: CompletionItem, line: number, character: number, prefixLength: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "ONBUILD INSTRUCTION");
    } else {
        assert.strictEqual(item.label, "ONBUILD");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "ONBUILD ${1:INSTRUCTION}");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "ONBUILD");
    }
    assert.strictEqual(item.data, "ONBUILD");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertResolvedDocumentation(item);
}

function assertRUN(item: CompletionItem, line: number, character: number, prefixLength: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "RUN command");
    } else {
        assert.strictEqual(item.label, "RUN");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "RUN ${1:command}");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "RUN");
    }
    assert.strictEqual(item.data, "RUN");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertResolvedDocumentation(item);
}

function assertSHELL(item: CompletionItem, line: number, character: number, prefixLength: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "SHELL [ \"executable\" ]");
    } else {
        assert.strictEqual(item.label, "SHELL");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "SHELL [ \"${1:executable}\" ]");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "SHELL");
    }
    assert.strictEqual(item.data, "SHELL");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertResolvedDocumentation(item);
}

function assertSTOPSIGNAL(item: CompletionItem, line: number, character: number, prefixLength: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "STOPSIGNAL signal");
    } else {
        assert.strictEqual(item.label, "STOPSIGNAL");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "STOPSIGNAL ${1:signal}");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "STOPSIGNAL");
    }
    assert.strictEqual(item.data, "STOPSIGNAL");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertResolvedDocumentation(item);
}

function assertUSER(item: CompletionItem, line: number, character: number, prefixLength: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "USER daemon");
    } else {
        assert.strictEqual(item.label, "USER");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "USER ${1:daemon}");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "USER");
    }
    assert.strictEqual(item.data, "USER");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertResolvedDocumentation(item);
}

function assertVOLUME(item: CompletionItem, line: number, character: number, prefixLength: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "VOLUME [ \"/data\" ]");
    } else {
        assert.strictEqual(item.label, "VOLUME");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "VOLUME [ \"${1:/data}\" ]");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "VOLUME");
    }
    assert.strictEqual(item.data, "VOLUME");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertResolvedDocumentation(item);
}

function assertWORKDIR(item: CompletionItem, line: number, character: number, prefixLength: number, snippetSupport?: boolean) {
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.label, "WORKDIR /the/workdir/path");
    } else {
        assert.strictEqual(item.label, "WORKDIR");
    }
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    if (snippetSupport === undefined || snippetSupport) {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
        assert.strictEqual(item.textEdit.newText, "WORKDIR ${1:/the/workdir/path}");
    } else {
        assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
        assert.strictEqual(item.textEdit.newText, "WORKDIR");
    }
    assert.strictEqual(item.data, "WORKDIR");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertResolvedDocumentation(item);
}

function assertSourceImage(item: CompletionItem, sourceImage: string, buildIndex: number, documentation: string, startLine: number, startCharacter: number, endLine: number, endCharacter: number) {
    assert.strictEqual(item.label, sourceImage);
    assert.strictEqual(item.kind, CompletionItemKind.Reference);
    assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
    assert.strictEqual(item.sortText, buildIndex.toString());
    assert.strictEqual(item.data, undefined);
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, documentation);
    assert.strictEqual(item.textEdit.newText, sourceImage);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, startLine);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, startCharacter);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, endLine);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, endCharacter);
    assertRawDocumentation(item, documentation);
}

function assertDirectiveItems(items: CompletionItem[], line: number, character: number, prefixLength: number) {
    assert.strictEqual(items.length, 2);
    assertDirectiveEscape(items[0], line, character, prefixLength);
    assertDirectiveSyntax(items[1], line, character, prefixLength);
}

function assertDirectiveEscape(item: CompletionItem, line: number, character: number, prefixLength: number) {
    assert.strictEqual(item.label, "escape=`");
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
    assert.strictEqual(item.textEdit.newText, "escape=${1:`}");
    assert.strictEqual(item.data, "escape");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertResolvedDocumentation(item);
}

function assertDirectiveSyntax(item: CompletionItem, line: number, character: number, prefixLength: number) {
    assert.strictEqual(item.label, "syntax=docker/dockerfile:experimental");
    assert.strictEqual(item.kind, CompletionItemKind.Keyword);
    assert.strictEqual(item.insertTextFormat, InsertTextFormat.Snippet);
    assert.strictEqual(item.textEdit.newText, "syntax=${1:docker/dockerfile:experimental}");
    assert.strictEqual(item.data, "syntax");
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertResolvedDocumentation(item);
}

function assertVariable(variable: string, item: CompletionItem, line: number, character: number, prefixLength: number, brace: boolean, documentation?: string) {
    if (brace) {
        assert.strictEqual(item.label, "${" + variable + '}');
    } else {
        assert.strictEqual(item.label, '$' + variable);
    }
    assert.strictEqual(item.kind, CompletionItemKind.Variable);
    assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
    if (brace) {
        assert.strictEqual(item.textEdit.newText, "${" + variable + '}');
    } else {
        assert.strictEqual(item.textEdit.newText, '$' + variable);
    }
    assert.strictEqual(item.data, undefined);
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, documentation);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assertRawDocumentation(item, documentation);
}

function assertDockerVariables(items: CompletionItem[], line: number, character: number, prefixLength: number, brace: boolean) {
    assert.strictEqual(items.length, 8);
    assertVariable("FTP_PROXY", items[0], line, character, prefixLength, brace);
    assertVariable("ftp_proxy", items[1], line, character, prefixLength, brace);
    assertVariable("HTTP_PROXY", items[2], line, character, prefixLength, brace);
    assertVariable("http_proxy", items[3], line, character, prefixLength, brace);
    assertVariable("HTTPS_PROXY", items[4], line, character, prefixLength, brace);
    assertVariable("https_proxy", items[5], line, character, prefixLength, brace);
    assertVariable("NO_PROXY", items[6], line, character, prefixLength, brace);
    assertVariable("no_proxy", items[7], line, character, prefixLength, brace);
}

function assertPath(item: CompletionItem, path: string, line: number, character: number, prefixLength: number): void { //variable: string, item: CompletionItem, line: number, character: number, prefixLength: number, brace: boolean, documentation?: string) {
    assert.strictEqual(item.label, path);
    assert.strictEqual(item.kind, CompletionItemKind.Folder);
    assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
    assert.strictEqual(item.textEdit.newText, path);
    assert.strictEqual(item.data, undefined);
    assert.strictEqual(item.deprecated, undefined);
    assert.strictEqual(item.documentation, undefined);
    assert.strictEqual(item.tags, undefined);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character - prefixLength);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character);
}

function assertProposals(proposals: CompletionItem[], offset: number, prefix: number, prefixLength: number, snippetSupport?: boolean, deprecatedSupport?: boolean, supportedTags?: CompletionItemTag[]) {
    for (var i = 0; i < proposals.length; i++) {
        switch (proposals[i].data) {
            case "ADD":
                assertADD(proposals[i], offset, prefix, prefixLength, snippetSupport);
                break;
            case "ARG":
                assertARG(proposals[i], offset, prefix, prefixLength);
                break;
            case "ARG_DefaultValue":
                assertARG_DefaultValue(proposals[i], offset, prefix, prefixLength);
                break;
            case "ARG_NameOnly":
                assertARG_NameOnly(proposals[i++], offset, prefix, prefixLength, snippetSupport);
                break;
            case "CMD":
                assertCMD(proposals[i], offset, prefix, prefixLength, snippetSupport);
                break;
            case "COPY":
                assertCOPY(proposals[i], offset, prefix, prefixLength, snippetSupport);
                break;
            case "ENTRYPOINT":
                assertENTRYPOINT(proposals[i], offset, prefix, prefixLength, snippetSupport);
                break;
            case "ENV":
                assertENV(proposals[i], offset, prefix, prefixLength, snippetSupport);
                break;
            case "EXPOSE":
                assertEXPOSE(proposals[i], offset, prefix, prefixLength, snippetSupport);
                break;
            case "FROM":
                assertFROM(proposals[i], offset, prefix, offset, prefix + prefixLength, snippetSupport);
                break;
            case "HEALTHCHECK_CMD":
                assertHEALTHCHECK_CMD(proposals[i++], offset, prefix, prefixLength, snippetSupport);
                break;
            case "HEALTHCHECK_NONE":
                assertHEALTHCHECK_NONE(proposals[i], offset, prefix, prefixLength);
                break;
            case "LABEL":
                assertLABEL(proposals[i], offset, prefix, prefixLength, snippetSupport);
                break;
            case "MAINTAINER":
                assertMAINTAINER(proposals[i], offset, prefix, prefixLength, snippetSupport, deprecatedSupport, supportedTags);
                break;
            case "ONBUILD":
                assertONBUILD(proposals[i], offset, prefix, prefixLength, snippetSupport);
                break;
            case "RUN":
                assertRUN(proposals[i], offset, prefix, prefixLength, snippetSupport);
                break;
            case "SHELL":
                assertSHELL(proposals[i], offset, prefix, prefixLength, snippetSupport);
                break;
            case "STOPSIGNAL":
                assertSTOPSIGNAL(proposals[i], offset, prefix, prefixLength, snippetSupport);
                break;
            case "USER":
                assertUSER(proposals[i], offset, prefix, prefixLength, snippetSupport);
                break;
            case "VOLUME":
                assertVOLUME(proposals[i], offset, prefix, prefixLength, snippetSupport);
                break;
            case "WORKDIR":
                assertWORKDIR(proposals[i], offset, prefix, prefixLength, snippetSupport);
                break;
            default:
                throw new Error("Unknown proposal name: " + proposals[i].data);
        }
    }
}

function assertAddFlags(items: CompletionItem[], startLine: number, startCharacter: number, endLine: number, endCharacter: number, snippetSupport?: boolean) {
    assert.strictEqual(items.length, 1);
    assertADD_FlagChown(items[0], startLine, startCharacter, endLine, endCharacter, snippetSupport);
}

function assertCopyFlags(items: CompletionItem[], startLine: number, startCharacter: number, endLine: number, endCharacter: number, snippetSupport?: boolean) {
    assert.strictEqual(items.length, 2);
    assertCOPY_FlagChown(items[0], startLine, startCharacter, endLine, endCharacter, snippetSupport);
    assertCOPY_FlagFrom(items[1], startLine, startCharacter, endLine, endCharacter, snippetSupport);
}

function assertFromFlags(items: CompletionItem[], startLine: number, startCharacter: number, endLine: number, endCharacter: number, snippetSupport?: boolean) {
    assert.strictEqual(items.length, 1);
    assertFROM_FlagPlatform(items[0], startLine, startCharacter, endLine, endCharacter, snippetSupport);
}

function assertHealthcheckItems(items: CompletionItem[], startLine: number, startCharacter: number, endLine: number, endCharacter: number, snippetSupport?: boolean) {
    assert.strictEqual(items.length, 7);
    // CMD and NONE first
    assertHEALTHCHECK_CMD_Subcommand(items[0], startLine, startCharacter, endLine, endCharacter, snippetSupport);
    assertHEALTHCHECK_NONE_Subcommand(items[1], startLine, startCharacter, endLine, endCharacter);
    // flags in alphabetical order next
    assertHEALTHCHECK_FlagInterval(items[2], startLine, startCharacter, endLine, endCharacter, snippetSupport);
    assertHEALTHCHECK_FlagRetries(items[3], startLine, startCharacter, endLine, endCharacter, snippetSupport);
    assertHEALTHCHECK_FlagStartInterval(items[4], startLine, startCharacter, endLine, endCharacter, snippetSupport);
    assertHEALTHCHECK_FlagStartPeriod(items[5], startLine, startCharacter, endLine, endCharacter, snippetSupport);
    assertHEALTHCHECK_FlagTimeout(items[6], startLine, startCharacter, endLine, endCharacter, snippetSupport);

    assert.strictEqual(items[0].sortText, "0");
    assert.strictEqual(items[1].sortText, "1");
    assert.strictEqual(items[2].sortText, "2");
    assert.strictEqual(items[3].sortText, "3");
    assert.strictEqual(items[4].sortText, "4");
    assert.strictEqual(items[5].sortText, "5");
    assert.strictEqual(items[6].sortText, "6");
}

function assertHealthcheckFlags(items: CompletionItem[], startLine: number, startCharacter: number, endLine: number, endCharacter: number, snippetSupport?: boolean) {
    assert.strictEqual(items.length, 5);
    // alphabetical order
    assertHEALTHCHECK_FlagInterval(items[0], startLine, startCharacter, endLine, endCharacter, snippetSupport);
    assertHEALTHCHECK_FlagRetries(items[1], startLine, startCharacter, endLine, endCharacter, snippetSupport);
    assertHEALTHCHECK_FlagStartInterval(items[2], startLine, startCharacter, endLine, endCharacter, snippetSupport);
    assertHEALTHCHECK_FlagStartPeriod(items[3], startLine, startCharacter, endLine, endCharacter, snippetSupport);
    assertHEALTHCHECK_FlagTimeout(items[4], startLine, startCharacter, endLine, endCharacter, snippetSupport);

    assert.strictEqual(items[0].sortText, "0");
    assert.strictEqual(items[1].sortText, "1");
    assert.strictEqual(items[2].sortText, "2");
    assert.strictEqual(items[3].sortText, "3");
    assert.strictEqual(items[4].sortText, "4");
}

function assertONBUILDProposals(proposals: CompletionItem[], offset: number, prefix: number, prefixLength: number) {
    // +1 for two ARG proposals
    // +1 for two HEALTHCHECK proposals
    // -3 for ONBUILD, FROM, MAINTAINER
    assert.strictEqual(proposals.length, KEYWORDS.length - 1);
    assertProposals(proposals, offset, prefix, prefixLength);
}

function assertAllProposals(proposals: CompletionItem[], offset: number, prefix: number, prefixLength: number, snippetSupport?: boolean, deprecatedSupport?: boolean, supportedTags?: CompletionItemTag[]) {
    if (snippetSupport === undefined || snippetSupport) {
        // +1 for two ARG proposals
        // +1 for two HEALTHCHECK proposals
        assert.strictEqual(proposals.length, KEYWORDS.length + 2);
    } else {
        // +1 for two HEALTHCHECK proposals
        assert.strictEqual(proposals.length, KEYWORDS.length + 1);
    }
    assertProposals(proposals, offset, prefix, prefixLength, snippetSupport, deprecatedSupport, supportedTags);
}

function testFlagPrefix(trigger: boolean, instruction: string, beforeContent: string, incompleteFlag: string, afterContent: string, validateCompletionItem: Function, snippetSupport: boolean) {
    const onbuild = trigger ? "ONBUILD " : "";
    const triggerOffset = onbuild.length;
    const instructionLength = instruction.length;
    const offset = instructionLength + 3 + beforeContent.length;
    for (let i = 1; i < incompleteFlag.length; i++) {
        const line = `${onbuild}${instruction} ${beforeContent}--${incompleteFlag.substring(0, i)}${afterContent}`;
        const content = `FROM busybox\n${line}`;
        it(line, () => {
            const items = computePosition(content, 1, triggerOffset + offset + i, snippetSupport);
            assert.strictEqual(items.length, 1);
            validateCompletionItem(items[0], 1, triggerOffset + instructionLength + beforeContent.length + 1, 1, triggerOffset + offset + i, snippetSupport);
        });
    }
}

describe('Docker Content Assist Tests', function () {
    describe('no content', function () {
        it('empty file', function () {
            var proposals = compute("", 0);
            assertOnlyFROM(proposals, 0, 0, 0);
        });

        it("UTF-8 BOM header", () => {
            var proposals = compute("\ufeff", 1);
            assertOnlyFROM(proposals, 0, 1, 0);
        });

        it('whitespace', function () {
            var proposals = compute(" ", 0);
            assertOnlyFROM(proposals, 0, 0, 0);

            proposals = compute("\n", 0);
            assertOnlyFROM(proposals, 0, 0, 0);

            proposals = compute("\n", 1);
            assertOnlyFROM(proposals, 1, 0, 0);

            proposals = compute("\r\n", 2);
            assertOnlyFROM(proposals, 1, 0, 0);
        });
    });

    describe('comments only', function () {
        it('in comment', function () {
            var proposals = compute("# abc\n", 6);
            assertOnlyFROM(proposals, 1, 0, 0);

            proposals = compute("# abc", 5);
            assert.strictEqual(proposals.length, 0);

            proposals = compute("#FROM", 5);
            assert.strictEqual(proposals.length, 0);

            proposals = compute("#\n#", 3);
            assert.strictEqual(proposals.length, 0);

            proposals = compute("#\n# ", 4);
            assert.strictEqual(proposals.length, 0);

            proposals = compute("#\n#\n", 3);
            assert.strictEqual(proposals.length, 0);

            proposals = compute("#\n# \n", 4);
            assert.strictEqual(proposals.length, 0);
        });

        it('outside comment', function () {
            var proposals = compute("# abc", 0);
            assertOnlyFROM(proposals, 0, 0, 0);

            proposals = compute(" # abc", 0);
            assertOnlyFROM(proposals, 0, 0, 0);

            proposals = compute("\n#FROM", 0);
            assertOnlyFROM(proposals, 0, 0, 0);

            proposals = compute("\n#FROM", 1);
            assertOnlyFROM(proposals, 1, 0, 0);
        });
    });

    describe('keywords', function () {
        it('none', function () {
            var proposals = compute("F ", 2);
            assert.strictEqual(proposals.length, 0);
        });

        it("nesting", function () {
            let proposals = compute("FROM F", 6);
            assert.strictEqual(proposals.length, 0);

            proposals = compute("FROM node F", 11);
            assert.strictEqual(proposals.length, 0);

            proposals = compute("FROM \\\n F", 9);
            assert.strictEqual(proposals.length, 0);
        });

        it('all', function () {
            var proposals = compute("FROM node\n", 10);
            assertAllProposals(proposals, 1, 0, 0);

            proposals = compute("FROM node\n", 10, { snippetSupport: false, deprecatedSupport: false });
            assertAllProposals(proposals, 1, 0, 0, false, false);

            proposals = compute("FROM node\n", 10, { snippetSupport: false, deprecatedSupport: true });
            assertAllProposals(proposals, 1, 0, 0, false, true);

            proposals = compute("FROM node\n", 10, { snippetSupport: true, deprecatedSupport: false });
            assertAllProposals(proposals, 1, 0, 0, true, false);

            proposals = compute("FROM node\n", 10, { snippetSupport: true, deprecatedSupport: true });
            assertAllProposals(proposals, 1, 0, 0, true, true);

            proposals = compute("FROM node\n", 10, { snippetSupport: true, deprecatedSupport: true, tagSupport: { valueSet: [] } });
            assertAllProposals(proposals, 1, 0, 0, true, true, []);

            proposals = compute("FROM node\n", 10, { snippetSupport: true, deprecatedSupport: true, tagSupport: { valueSet: [CompletionItemTag.Deprecated] } });
            assertAllProposals(proposals, 1, 0, 0, true, true, [CompletionItemTag.Deprecated]);

            proposals = compute("FROM node\n", 0);
            assertAllProposals(proposals, 0, 0, 0);

            proposals = compute("FROM node\n\t", 11);
            assertAllProposals(proposals, 1, 1, 0);

            proposals = compute("FROM node\n  ", 12);
            assertAllProposals(proposals, 1, 2, 0);
        });

        it('prefix', function () {
            var proposals = compute("#F", 2);
            assert.strictEqual(proposals.length, 0);

            proposals = compute("# F", 3);
            assert.strictEqual(proposals.length, 0);

            proposals = compute("F", 1);
            assertOnlyFROM(proposals, 0, 0, 1);

            proposals = compute("F ", 1);
            assertOnlyFROM(proposals, 0, 0, 1);

            proposals = compute(" F", 2);
            assertOnlyFROM(proposals, 0, 1, 1);

            proposals = compute("F\n", 1);
            assertOnlyFROM(proposals, 0, 0, 1);

            proposals = computePosition("FR\\\n\n", 2, 0, true);
            assert.strictEqual(proposals.length, 1);
            assertFROM(proposals[0], 0, 0, 2, 0);

            proposals = computePosition("FR\\\n \n", 2, 0, true);
            assert.strictEqual(proposals.length, 1);
            assertFROM(proposals[0], 0, 0, 2, 0);

            proposals = computePosition("FR\\\n\t\n", 2, 0, true);
            assert.strictEqual(proposals.length, 1);
            assertFROM(proposals[0], 0, 0, 2, 0);

            proposals = computePosition("FR\\\n\\\n", 2, 0, true);
            assert.strictEqual(proposals.length, 1);
            assertFROM(proposals[0], 0, 0, 2, 0);

            proposals = computePosition("FR\\\n\\ \n", 2, 0, true);
            assert.strictEqual(proposals.length, 1);
            assertFROM(proposals[0], 0, 0, 2, 0);

            proposals = computePosition("FR\\\n \nO", 2, 1, true);
            assert.strictEqual(proposals.length, 1);
            assertFROM(proposals[0], 0, 0, 2, 1);

            proposals = computePosition("FR\\\n\nO", 2, 1, true);
            assert.strictEqual(proposals.length, 1);
            assertFROM(proposals[0], 0, 0, 2, 1);

            proposals = compute("FROM", 4);
            assert.strictEqual(0, proposals.length);

            proposals = compute("from", 4);
            assert.strictEqual(0, proposals.length);

            proposals = compute("FROM node\nA", 11);
            assert.strictEqual(proposals.length, 3);
            assertADD(proposals[0], 1, 0, 1);
            assertARG_NameOnly(proposals[1], 1, 0, 1);
            assertARG_DefaultValue(proposals[2], 1, 0, 1);

            proposals = compute("FROM node\na", 11);
            assert.strictEqual(proposals.length, 3);
            assertADD(proposals[0], 1, 0, 1);
            assertARG_NameOnly(proposals[1], 1, 0, 1);
            assertARG_DefaultValue(proposals[2], 1, 0, 1);

            proposals = compute("FROM node\nH", 11);
            assert.strictEqual(proposals.length, 2);
            assertHEALTHCHECK_CMD(proposals[0], 1, 0, 1);
            assertHEALTHCHECK_NONE(proposals[1], 1, 0, 1);

            proposals = compute("FROM node\nh", 11);
            assert.strictEqual(proposals.length, 2);
            assertHEALTHCHECK_CMD(proposals[0], 1, 0, 1);
            assertHEALTHCHECK_NONE(proposals[1], 1, 0, 1);

            proposals = compute("FROM node\nM", 14);
            assert.strictEqual(proposals.length, 1);
            assertMAINTAINER(proposals[0], 1, 0, 1);

            proposals = compute("FROM node\nMAIN", 14);
            assert.strictEqual(proposals.length, 1);
            assertMAINTAINER(proposals[0], 1, 0, 4);

            proposals = compute("FROM node\nONBUILD RU", 21);
            assert.strictEqual(proposals.length, 1);
            assertRUN(proposals[0], 1, 8 , 2);

            proposals = compute("FROM node O", 10);
            assert.strictEqual(proposals.length, 0);
        });
    });

    describe("escape", function () {
        it("no instruction", function () {
            var content = "FROM node\n\\";
            var proposals = compute(content, content.length);
            assert.strictEqual(proposals.length, 0);

            content = "FROM node\n\\\n";
            proposals = compute(content, content.length);
            assertAllProposals(proposals, 2, 0, 0);

            content = "FROM node\r\n\\";
            proposals = compute(content, content.length);
            assert.strictEqual(proposals.length, 0);

            content = "FROM node\n\\\r\n";
            proposals = compute(content, content.length);
            assertAllProposals(proposals, 2, 0, 0);

            content = "\\";
            proposals = compute(content, content.length);
            assert.strictEqual(proposals.length, 0);

            proposals = computePosition("FROM busybox\nEXPOSE 8080 \\ \n", 1, 14, true);
            assert.strictEqual(proposals.length, 0);

            proposals = computePosition("FROM busybox\nEXPOSE 8080 \\ \n 8081", 1, 14, true);
            assert.strictEqual(proposals.length, 0);

            proposals = computePosition("FROM busybox\nEXPOSE 8080 \\ \n\\ \n 8081", 2, 1, true);
            assert.strictEqual(proposals.length, 0);
        });

        function testEscape(header: string, instruction: string, escapeChar: string) {
            var content = header + "FROM node\n" + instruction + escapeChar + "\n";
            var proposals = compute(content, content.length);
            assert.strictEqual(proposals.length, 0);

            content = header + "FROM node\n" + instruction + escapeChar + "\r\n";
            proposals = compute(content, content.length);
            assert.strictEqual(proposals.length, 0);

            content = header + "FROM node\n" + instruction + " " + escapeChar + "\n";
            proposals = compute(content, content.length);
            let split = content.split("\n");
            let lastLine = split.length - 1;
            switch (instruction) {
                case "ADD":
                    assertAddFlags(proposals, lastLine, 0, lastLine, 0);
                    break;
                case "COPY":
                    assertCopyFlags(proposals, lastLine, 0, lastLine, 0);
                    break;
                case "FROM":
                    assertFromFlags(proposals, lastLine, 0, lastLine, 0);
                    break;
                case "HEALTHCHECK":
                    assertHealthcheckItems(proposals, lastLine, 0, lastLine, 0);
                    break;
                case "ONBUILD":
                    assertONBUILDProposals(proposals, lastLine, 0, 0);
                    break;
                default:
                    assert.strictEqual(proposals.length, 0);
            }

            content = header + "FROM node\n" + instruction + " " + escapeChar + "\r\n";
            proposals = compute(content, content.length);
            switch (instruction) {
                case "ADD":
                    assertAddFlags(proposals, lastLine, 0, lastLine, 0);
                    break;
                case "COPY":
                    assertCopyFlags(proposals, lastLine, 0, lastLine, 0);
                    break;
                case "FROM":
                    assertFromFlags(proposals, lastLine, 0, lastLine, 0);
                    break;
                case "HEALTHCHECK":
                    assertHealthcheckItems(proposals, lastLine, 0, lastLine, 0);
                    break;
                case "ONBUILD":
                    assertONBUILDProposals(proposals, lastLine, 0, 0);
                    break;
                default:
                    assert.strictEqual(proposals.length, 0);
            }

            content = header + "FROM node\n" + instruction + " " + escapeChar + " \n";
            proposals = compute(content, content.length);
            switch (instruction) {
                case "ADD":
                    assertAddFlags(proposals, lastLine, 0, lastLine, 0);
                    break;
                case "COPY":
                    assertCopyFlags(proposals, lastLine, 0, lastLine, 0);
                    break;
                case "FROM":
                    assertFromFlags(proposals, lastLine, 0, lastLine, 0);
                    break;
                case "HEALTHCHECK":
                    assertHealthcheckItems(proposals, lastLine, 0, lastLine, 0);
                    break;
                case "ONBUILD":
                    assertONBUILDProposals(proposals, lastLine, 0, 0);
                    break;
                default:
                    assert.strictEqual(proposals.length, 0);
            }

            content = header + "FROM node\n" + instruction + " " + escapeChar + " \r\n";
            proposals = compute(content, content.length);
            switch (instruction) {
                case "ADD":
                    assertAddFlags(proposals, lastLine, 0, lastLine, 0);
                    break;
                case "COPY":
                    assertCopyFlags(proposals, lastLine, 0, lastLine, 0);
                    break;
                case "FROM":
                    assertFromFlags(proposals, lastLine, 0, lastLine, 0);
                    break;
                case "HEALTHCHECK":
                    assertHealthcheckItems(proposals, lastLine, 0, lastLine, 0);
                    break;
                case "ONBUILD":
                    assertONBUILDProposals(proposals, lastLine, 0, 0);
                    break;
                default:
                    assert.strictEqual(proposals.length, 0);
            }

            content = header + "FROM node\n" + instruction + escapeChar + "\n ";
            proposals = compute(content, content.length);
            switch (instruction) {
                case "ADD":
                    assertAddFlags(proposals, lastLine, 1, lastLine, 1);
                    break;
                case "COPY":
                    assertCopyFlags(proposals, lastLine, 1, lastLine, 1);
                    break;
                case "FROM":
                    assertFromFlags(proposals, lastLine, 1, lastLine, 1);
                    break;
                case "HEALTHCHECK":
                    assertHealthcheckItems(proposals, lastLine, 1, lastLine, 1);
                    break;
                case "ONBUILD":
                    assertONBUILDProposals(proposals, lastLine, 1, 0);
                    break;
                default:
                    assert.strictEqual(proposals.length, 0);
            }

            content = header + "FROM node\n" + instruction + escapeChar + "\r\n ";
            proposals = compute(content, content.length);
            switch (instruction) {
                case "ADD":
                    assertAddFlags(proposals, lastLine, 1, lastLine, 1);
                    break;
                case "COPY":
                    assertCopyFlags(proposals, lastLine, 1, lastLine, 1);
                    break;
                case "FROM":
                    assertFromFlags(proposals, lastLine, 1, lastLine, 1);
                    break;
                case "HEALTHCHECK":
                    assertHealthcheckItems(proposals, lastLine, 1, lastLine, 1);
                    break;
                case "ONBUILD":
                    assertONBUILDProposals(proposals, lastLine, 1, 0);
                    break;
                default:
                    assert.strictEqual(proposals.length, 0);
            }

            content = header + "FROM node\n" + instruction + " " + escapeChar + "\n ";
            proposals = compute(content, content.length);
            switch (instruction) {
                case "ADD":
                    assertAddFlags(proposals, lastLine, 1, lastLine, 1);
                    break;
                case "COPY":
                    assertCopyFlags(proposals, lastLine, 1, lastLine, 1);
                    break;
                case "FROM":
                    assertFromFlags(proposals, lastLine, 1, lastLine, 1);
                    break;
                case "HEALTHCHECK":
                    assertHealthcheckItems(proposals, lastLine, 1, lastLine, 1);
                    break;
                case "ONBUILD":
                    assertONBUILDProposals(proposals, lastLine, 1, 0);
                    break;
                default:
                    assert.strictEqual(proposals.length, 0);
            }

            content = header + "FROM node\n" + instruction + " " + escapeChar + "\r\n ";
            proposals = compute(content, content.length);
            switch (instruction) {
                case "ADD":
                    assertAddFlags(proposals, lastLine, 1, lastLine, 1);
                    break;
                case "COPY":
                    assertCopyFlags(proposals, lastLine, 1, lastLine, 1);
                    break;
                case "FROM":
                    assertFromFlags(proposals, lastLine, 1, lastLine, 1);
                    break;
                case "HEALTHCHECK":
                    assertHealthcheckItems(proposals, lastLine, 1, lastLine, 1);
                    break;
                case "ONBUILD":
                    assertONBUILDProposals(proposals, lastLine, 1, 0);
                    break;
                default:
                    assert.strictEqual(proposals.length, 0);
            }
        }

        it("no header", function () {
            testEscape("", "ADD", "\\");
            testEscape("", "ARG", "\\");
            testEscape("", "CMD", "\\");
            testEscape("", "COPY", "\\");
            testEscape("", "ENTRYPOINT", "\\");
            testEscape("", "ENV", "\\");
            testEscape("", "EXPOSE", "\\");
            testEscape("", "FROM", "\\");
            testEscape("", "HEALTHCHECK", "\\");
            testEscape("", "LABEL", "\\");
            testEscape("", "MAINTAINER", "\\");
            testEscape("", "ONBUILD", "\\");
            testEscape("", "RUN", "\\");
            testEscape("", "SHELL", "\\");
            testEscape("", "STOPSIGNAL", "\\");
            testEscape("", "USER", "\\");
            testEscape("", "VOLUME", "\\");
            testEscape("", "WORKDIR", "\\");
        });

        it("#escape=\\n", function () {
            testEscape("#escape=\n", "ADD", "\\");
            testEscape("#escape=\n", "ARG", "\\");
            testEscape("#escape=\n", "CMD", "\\");
            testEscape("#escape=\n", "COPY", "\\");
            testEscape("#escape=\n", "ENTRYPOINT", "\\");
            testEscape("#escape=\n", "ENV", "\\");
            testEscape("#escape=\n", "EXPOSE", "\\");
            testEscape("#escape=\n", "FROM", "\\");
            testEscape("#escape=\n", "HEALTHCHECK", "\\");
            testEscape("#escape=\n", "LABEL", "\\");
            testEscape("#escape=\n", "MAINTAINER", "\\");
            testEscape("#escape=\n", "ONBUILD", "\\");
            testEscape("#escape=\n", "RUN", "\\");
            testEscape("#escape=\n", "SHELL", "\\");
            testEscape("#escape=\n", "STOPSIGNAL", "\\");
            testEscape("#escape=\n", "USER", "\\");
            testEscape("#escape=\n", "VOLUME", "\\");
            testEscape("#escape=\n", "WORKDIR", "\\");
        });

        it("#escape=`\\n", function () {
            testEscape("#escape=`\n", "ADD", "`");
            testEscape("#escape=`\n", "ARG", "`");
            testEscape("#escape=`\n", "CMD", "`");
            testEscape("#escape=`\n", "COPY", "`");
            testEscape("#escape=`\n", "ENTRYPOINT", "`");
            testEscape("#escape=`\n", "ENV", "`");
            testEscape("#escape=`\n", "EXPOSE", "`");
            testEscape("#escape=`\n", "FROM", "`");
            testEscape("#escape=`\n", "HEALTHCHECK", "`");
            testEscape("#escape=`\n", "LABEL", "`");
            testEscape("#escape=`\n", "MAINTAINER", "`");
            testEscape("#escape=`\n", "ONBUILD", "`");
            testEscape("#escape=`\n", "RUN", "`");
            testEscape("#escape=`\n", "SHELL", "`");
            testEscape("#escape=`\n", "STOPSIGNAL", "`");
            testEscape("#escape=`\n", "USER", "`");
            testEscape("#escape=`\n", "VOLUME", "`");
            testEscape("#escape=`\n", "WORKDIR", "`");
        });

        it("#EsCaPe=`\\n", function () {
            testEscape("#EsCaPe=`\n", "ADD", "`");
            testEscape("#EsCaPe=`\n", "ARG", "`");
            testEscape("#EsCaPe=`\n", "CMD", "`");
            testEscape("#EsCaPe=`\n", "COPY", "`");
            testEscape("#EsCaPe=`\n", "ENTRYPOINT", "`");
            testEscape("#EsCaPe=`\n", "ENV", "`");
            testEscape("#EsCaPe=`\n", "EXPOSE", "`");
            testEscape("#EsCaPe=`\n", "FROM", "`");
            testEscape("#EsCaPe=`\n", "HEALTHCHECK", "`");
            testEscape("#EsCaPe=`\n", "LABEL", "`");
            testEscape("#EsCaPe=`\n", "MAINTAINER", "`");
            testEscape("#EsCaPe=`\n", "ONBUILD", "`");
            testEscape("#EsCaPe=`\n", "RUN", "`");
            testEscape("#EsCaPe=`\n", "SHELL", "`");
            testEscape("#EsCaPe=`\n", "STOPSIGNAL", "`");
            testEscape("#EsCaPe=`\n", "USER", "`");
            testEscape("#EsCaPe=`\n", "VOLUME", "`");
            testEscape("#EsCaPe=`\n", "WORKDIR", "`");
        });

        it("#escape =`\\n", function () {
            testEscape("#escape =`\n", "ADD", "`");
            testEscape("#escape =`\n", "ARG", "`");
            testEscape("#escape =`\n", "CMD", "`");
            testEscape("#escape =`\n", "COPY", "`");
            testEscape("#escape =`\n", "ENTRYPOINT", "`");
            testEscape("#escape =`\n", "ENV", "`");
            testEscape("#escape =`\n", "EXPOSE", "`");
            testEscape("#escape =`\n", "FROM", "`");
            testEscape("#escape =`\n", "HEALTHCHECK", "`");
            testEscape("#escape =`\n", "LABEL", "`");
            testEscape("#escape =`\n", "MAINTAINER", "`");
            testEscape("#escape =`\n", "ONBUILD", "`");
            testEscape("#escape =`\n", "RUN", "`");
            testEscape("#escape =`\n", "SHELL", "`");
            testEscape("#escape =`\n", "STOPSIGNAL", "`");
            testEscape("#escape =`\n", "USER", "`");
            testEscape("#escape =`\n", "VOLUME", "`");
            testEscape("#escape =`\n", "WORKDIR", "`");
        });

        it("#escape= `\\n", function () {
            testEscape("#escape= `\n", "ADD", "`");
            testEscape("#escape= `\n", "ARG", "`");
            testEscape("#escape= `\n", "CMD", "`");
            testEscape("#escape= `\n", "COPY", "`");
            testEscape("#escape= `\n", "ENTRYPOINT", "`");
            testEscape("#escape= `\n", "ENV", "`");
            testEscape("#escape= `\n", "EXPOSE", "`");
            testEscape("#escape= `\n", "FROM", "`");
            testEscape("#escape= `\n", "HEALTHCHECK", "`");
            testEscape("#escape= `\n", "LABEL", "`");
            testEscape("#escape= `\n", "MAINTAINER", "`");
            testEscape("#escape= `\n", "ONBUILD", "`");
            testEscape("#escape= `\n", "RUN", "`");
            testEscape("#escape= `\n", "SHELL", "`");
            testEscape("#escape= `\n", "STOPSIGNAL", "`");
            testEscape("#escape= `\n", "USER", "`");
            testEscape("#escape= `\n", "VOLUME", "`");
            testEscape("#escape= `\n", "WORKDIR", "`");
        });

        it("#escape= ` \\n", function () {
            testEscape("#escape= ` \n", "ADD", "`");
            testEscape("#escape= ` \n", "ARG", "`");
            testEscape("#escape= ` \n", "CMD", "`");
            testEscape("#escape= ` \n", "COPY", "`");
            testEscape("#escape= ` \n", "ENTRYPOINT", "`");
            testEscape("#escape= ` \n", "ENV", "`");
            testEscape("#escape= ` \n", "EXPOSE", "`");
            testEscape("#escape= ` \n", "FROM", "`");
            testEscape("#escape= ` \n", "HEALTHCHECK", "`");
            testEscape("#escape= ` \n", "LABEL", "`");
            testEscape("#escape= ` \n", "MAINTAINER", "`");
            testEscape("#escape= ` \n", "ONBUILD", "`");
            testEscape("#escape= ` \n", "RUN", "`");
            testEscape("#escape= ` \n", "SHELL", "`");
            testEscape("#escape= ` \n", "STOPSIGNAL", "`");
            testEscape("#escape= ` \n", "USER", "`");
            testEscape("#escape= ` \n", "VOLUME", "`");
            testEscape("#escape= ` \n", "WORKDIR", "`");
        });

        it("#esc ape=`\\n", function () {
            testEscape("#esc ape=`\n", "ADD", "\\");
            testEscape("#esc ape=`\n", "ARG", "\\");
            testEscape("#esc ape=`\n", "CMD", "\\");
            testEscape("#esc ape=`\n", "COPY", "\\");
            testEscape("#esc ape=`\n", "ENTRYPOINT", "\\");
            testEscape("#esc ape=`\n", "ENV", "\\");
            testEscape("#esc ape=`\n", "EXPOSE", "\\");
            testEscape("#esc ape=`\n", "FROM", "\\");
            testEscape("#esc ape=`\n", "HEALTHCHECK", "\\");
            testEscape("#esc ape=`\n", "LABEL", "\\");
            testEscape("#esc ape=`\n", "MAINTAINER", "\\");
            testEscape("#esc ape=`\n", "ONBUILD", "\\");
            testEscape("#esc ape=`\n", "RUN", "\\");
            testEscape("#esc ape=`\n", "SHELL", "\\");
            testEscape("#esc ape=`\n", "STOPSIGNAL", "\\");
            testEscape("#esc ape=`\n", "USER", "\\");
            testEscape("#esc ape=`\n", "VOLUME", "\\");
            testEscape("#esc ape=`\n", "WORKDIR", "\\");
        });

        it("#escape=``\\n", function () {
            testEscape("#escape=``\n", "ADD", "\\");
            testEscape("#escape=``\n", "ARG", "\\");
            testEscape("#escape=``\n", "CMD", "\\");
            testEscape("#escape=``\n", "COPY", "\\");
            testEscape("#escape=``\n", "ENTRYPOINT", "\\");
            testEscape("#escape=``\n", "ENV", "\\");
            testEscape("#escape=``\n", "EXPOSE", "\\");
            testEscape("#escape=``\n", "FROM", "\\");
            testEscape("#escape=``\n", "HEALTHCHECK", "\\");
            testEscape("#escape=``\n", "LABEL", "\\");
            testEscape("#escape=``\n", "MAINTAINER", "\\");
            testEscape("#escape=``\n", "ONBUILD", "\\");
            testEscape("#escape=``\n", "RUN", "\\");
            testEscape("#escape=``\n", "SHELL", "\\");
            testEscape("#escape=``\n", "STOPSIGNAL", "\\");
            testEscape("#escape=``\n", "USER", "\\");
            testEscape("#escape=``\n", "VOLUME", "\\");
            testEscape("#escape=``\n", "WORKDIR", "\\");
        });

        it("# This is a comment\\n#escape=`\\n", function () {
            testEscape("# This is a comment\n#escape=`\n", "ADD", "\\");
            testEscape("# This is a comment\n#escape=`\n", "ARG", "\\");
            testEscape("# This is a comment\n#escape=`\n", "CMD", "\\");
            testEscape("# This is a comment\n#escape=`\n", "COPY", "\\");
            testEscape("# This is a comment\n#escape=`\n", "ENTRYPOINT", "\\");
            testEscape("# This is a comment\n#escape=`\n", "ENV", "\\");
            testEscape("# This is a comment\n#escape=`\n", "EXPOSE", "\\");
            testEscape("# This is a comment\n#escape=`\n", "FROM", "\\");
            testEscape("# This is a comment\n#escape=`\n", "HEALTHCHECK", "\\");
            testEscape("# This is a comment\n#escape=`\n", "LABEL", "\\");
            testEscape("# This is a comment\n#escape=`\n", "MAINTAINER", "\\");
            testEscape("# This is a comment\n#escape=`\n", "ONBUILD", "\\");
            testEscape("# This is a comment\n#escape=`\n", "RUN", "\\");
            testEscape("# This is a comment\n#escape=`\n", "SHELL", "\\");
            testEscape("# This is a comment\n#escape=`\n", "STOPSIGNAL", "\\");
            testEscape("# This is a comment\n#escape=`\n", "USER", "\\");
            testEscape("# This is a comment\n#escape=`\n", "VOLUME", "\\");
            testEscape("# This is a comment\n#escape=`\n", "WORKDIR", "\\");
        });

        it("#escape=`\\r\\n", function () {
            testEscape("#escape=`\r\n", "ADD", "`");
            testEscape("#escape=`\r\n", "ARG", "`");
            testEscape("#escape=`\r\n", "CMD", "`");
            testEscape("#escape=`\r\n", "COPY", "`");
            testEscape("#escape=`\r\n", "ENTRYPOINT", "`");
            testEscape("#escape=`\r\n", "ENV", "`");
            testEscape("#escape=`\r\n", "EXPOSE", "`");
            testEscape("#escape=`\r\n", "FROM", "`");
            testEscape("#escape=`\r\n", "HEALTHCHECK", "`");
            testEscape("#escape=`\r\n", "LABEL", "`");
            testEscape("#escape=`\r\n", "MAINTAINER", "`");
            testEscape("#escape=`\r\n", "ONBUILD", "`");
            testEscape("#escape=`\r\n", "RUN", "`");
            testEscape("#escape=`\r\n", "SHELL", "`");
            testEscape("#escape=`\r\n", "STOPSIGNAL", "`");
            testEscape("#escape=`\r\n", "USER", "`");
            testEscape("#escape=`\r\n", "VOLUME", "`");
            testEscape("#escape=`\r\n", "WORKDIR", "`");
        });

        it("#escape =`\\r\\n", function () {
            testEscape("#escape =`\r\n", "ADD", "`");
            testEscape("#escape =`\r\n", "ARG", "`");
            testEscape("#escape =`\r\n", "CMD", "`");
            testEscape("#escape =`\r\n", "COPY", "`");
            testEscape("#escape =`\r\n", "ENTRYPOINT", "`");
            testEscape("#escape =`\r\n", "ENV", "`");
            testEscape("#escape =`\r\n", "EXPOSE", "`");
            testEscape("#escape =`\r\n", "FROM", "`");
            testEscape("#escape =`\r\n", "HEALTHCHECK", "`");
            testEscape("#escape =`\r\n", "LABEL", "`");
            testEscape("#escape =`\r\n", "MAINTAINER", "`");
            testEscape("#escape =`\r\n", "ONBUILD", "`");
            testEscape("#escape =`\r\n", "RUN", "`");
            testEscape("#escape =`\r\n", "SHELL", "`");
            testEscape("#escape =`\r\n", "STOPSIGNAL", "`");
            testEscape("#escape =`\r\n", "USER", "`");
            testEscape("#escape =`\r\n", "VOLUME", "`");
            testEscape("#escape =`\r\n", "WORKDIR", "`");
        });

        it("#escape= `\\r\\n", function () {
            testEscape("#escape= `\r\n", "ADD", "`");
            testEscape("#escape= `\r\n", "ARG", "`");
            testEscape("#escape= `\r\n", "CMD", "`");
            testEscape("#escape= `\r\n", "COPY", "`");
            testEscape("#escape= `\r\n", "ENTRYPOINT", "`");
            testEscape("#escape= `\r\n", "ENV", "`");
            testEscape("#escape= `\r\n", "EXPOSE", "`");
            testEscape("#escape= `\r\n", "FROM", "`");
            testEscape("#escape= `\r\n", "HEALTHCHECK", "`");
            testEscape("#escape= `\r\n", "LABEL", "`");
            testEscape("#escape= `\r\n", "MAINTAINER", "`");
            testEscape("#escape= `\r\n", "ONBUILD", "`");
            testEscape("#escape= `\r\n", "RUN", "`");
            testEscape("#escape= `\r\n", "SHELL", "`");
            testEscape("#escape= `\r\n", "STOPSIGNAL", "`");
            testEscape("#escape= `\r\n", "USER", "`");
            testEscape("#escape= `\r\n", "VOLUME", "`");
            testEscape("#escape= `\r\n", "WORKDIR", "`");
        });

        it("#escape= ` \\r\\n", function () {
            testEscape("#escape= ` \r\n", "ADD", "`");
            testEscape("#escape= ` \r\n", "ARG", "`");
            testEscape("#escape= ` \r\n", "CMD", "`");
            testEscape("#escape= ` \r\n", "COPY", "`");
            testEscape("#escape= ` \r\n", "ENTRYPOINT", "`");
            testEscape("#escape= ` \r\n", "ENV", "`");
            testEscape("#escape= ` \r\n", "EXPOSE", "`");
            testEscape("#escape= ` \r\n", "FROM", "`");
            testEscape("#escape= ` \r\n", "HEALTHCHECK", "`");
            testEscape("#escape= ` \r\n", "LABEL", "`");
            testEscape("#escape= ` \r\n", "MAINTAINER", "`");
            testEscape("#escape= ` \r\n", "ONBUILD", "`");
            testEscape("#escape= ` \r\n", "RUN", "`");
            testEscape("#escape= ` \r\n", "SHELL", "`");
            testEscape("#escape= ` \r\n", "STOPSIGNAL", "`");
            testEscape("#escape= ` \r\n", "USER", "`");
            testEscape("#escape= ` \r\n", "VOLUME", "`");
            testEscape("#escape= ` \r\n", "WORKDIR", "`");
        });

        it("#esc ape=`\\r\\n", function () {
            testEscape("#esc ape=`\r\n", "ADD", "\\");
            testEscape("#esc ape=`\r\n", "ARG", "\\");
            testEscape("#esc ape=`\r\n", "CMD", "\\");
            testEscape("#esc ape=`\r\n", "COPY", "\\");
            testEscape("#esc ape=`\r\n", "ENTRYPOINT", "\\");
            testEscape("#esc ape=`\r\n", "ENV", "\\");
            testEscape("#esc ape=`\r\n", "EXPOSE", "\\");
            testEscape("#esc ape=`\r\n", "FROM", "\\");
            testEscape("#esc ape=`\r\n", "HEALTHCHECK", "\\");
            testEscape("#esc ape=`\r\n", "LABEL", "\\");
            testEscape("#esc ape=`\r\n", "MAINTAINER", "\\");
            testEscape("#esc ape=`\r\n", "ONBUILD", "\\");
            testEscape("#esc ape=`\r\n", "RUN", "\\");
            testEscape("#esc ape=`\r\n", "SHELL", "\\");
            testEscape("#esc ape=`\r\n", "STOPSIGNAL", "\\");
            testEscape("#esc ape=`\r\n", "USER", "\\");
            testEscape("#esc ape=`\r\n", "VOLUME", "\\");
            testEscape("#esc ape=`\r\n", "WORKDIR", "\\");
        });

        it("#escape=``\\r\\n", function () {
            testEscape("#escape=``\r\n", "ADD", "\\");
            testEscape("#escape=``\r\n", "ARG", "\\");
            testEscape("#escape=``\r\n", "CMD", "\\");
            testEscape("#escape=``\r\n", "COPY", "\\");
            testEscape("#escape=``\r\n", "ENTRYPOINT", "\\");
            testEscape("#escape=``\r\n", "ENV", "\\");
            testEscape("#escape=``\r\n", "EXPOSE", "\\");
            testEscape("#escape=``\r\n", "FROM", "\\");
            testEscape("#escape=``\r\n", "HEALTHCHECK", "\\");
            testEscape("#escape=``\r\n", "LABEL", "\\");
            testEscape("#escape=``\r\n", "MAINTAINER", "\\");
            testEscape("#escape=``\r\n", "ONBUILD", "\\");
            testEscape("#escape=``\r\n", "RUN", "\\");
            testEscape("#escape=``\r\n", "SHELL", "\\");
            testEscape("#escape=``\r\n", "STOPSIGNAL", "\\");
            testEscape("#escape=``\r\n", "USER", "\\");
            testEscape("#escape=``\r\n", "VOLUME", "\\");
            testEscape("#escape=``\r\n", "WORKDIR", "\\");
        });

        it("# This is a comment\\r\\n#escape=`\\r\\n", function () {
            testEscape("# This is a comment\r\n#escape=`\r\n", "ADD", "\\");
            testEscape("# This is a comment\r\n#escape=`\r\n", "ARG", "\\");
            testEscape("# This is a comment\r\n#escape=`\r\n", "CMD", "\\");
            testEscape("# This is a comment\r\n#escape=`\r\n", "COPY", "\\");
            testEscape("# This is a comment\r\n#escape=`\r\n", "ENTRYPOINT", "\\");
            testEscape("# This is a comment\r\n#escape=`\r\n", "ENV", "\\");
            testEscape("# This is a comment\r\n#escape=`\r\n", "EXPOSE", "\\");
            testEscape("# This is a comment\r\n#escape=`\r\n", "FROM", "\\");
            testEscape("# This is a comment\r\n#escape=`\r\n", "HEALTHCHECK", "\\");
            testEscape("# This is a comment\r\n#escape=`\r\n", "LABEL", "\\");
            testEscape("# This is a comment\r\n#escape=`\r\n", "MAINTAINER", "\\");
            testEscape("# This is a comment\r\n#escape=`\r\n", "ONBUILD", "\\");
            testEscape("# This is a comment\r\n#escape=`\r\n", "RUN", "\\");
            testEscape("# This is a comment\r\n#escape=`\r\n", "SHELL", "\\");
            testEscape("# This is a comment\r\n#escape=`\r\n", "STOPSIGNAL", "\\");
            testEscape("# This is a comment\r\n#escape=`\r\n", "USER", "\\");
            testEscape("# This is a comment\r\n#escape=`\r\n", "VOLUME", "\\");
            testEscape("# This is a comment\r\n#escape=`\r\n", "WORKDIR", "\\");
        });

        it("#\\n", function () {
            testEscape("#\n", "ADD", "\\");
            testEscape("#\n", "ARG", "\\");
            testEscape("#\n", "CMD", "\\");
            testEscape("#\n", "COPY", "\\");
            testEscape("#\n", "ENTRYPOINT", "\\");
            testEscape("#\n", "ENV", "\\");
            testEscape("#\n", "EXPOSE", "\\");
            testEscape("#\n", "FROM", "\\");
            testEscape("#\n", "HEALTHCHECK", "\\");
            testEscape("#\n", "LABEL", "\\");
            testEscape("#\n", "MAINTAINER", "\\");
            testEscape("#\n", "ONBUILD", "\\");
            testEscape("#\n", "RUN", "\\");
            testEscape("#\n", "SHELL", "\\");
            testEscape("#\n", "STOPSIGNAL", "\\");
            testEscape("#\n", "USER", "\\");
            testEscape("#\n", "VOLUME", "\\");
            testEscape("#\n", "WORKDIR", "\\");
        });

        it("#\\r\\n", function () {
            testEscape("#\r\n", "ADD", "\\");
            testEscape("#\r\n", "ARG", "\\");
            testEscape("#\r\n", "CMD", "\\");
            testEscape("#\r\n", "COPY", "\\");
            testEscape("#\r\n", "ENTRYPOINT", "\\");
            testEscape("#\r\n", "ENV", "\\");
            testEscape("#\r\n", "EXPOSE", "\\");
            testEscape("#\r\n", "FROM", "\\");
            testEscape("#\r\n", "HEALTHCHECK", "\\");
            testEscape("#\r\n", "LABEL", "\\");
            testEscape("#\r\n", "MAINTAINER", "\\");
            testEscape("#\r\n", "ONBUILD", "\\");
            testEscape("#\r\n", "RUN", "\\");
            testEscape("#\r\n", "SHELL", "\\");
            testEscape("#\r\n", "STOPSIGNAL", "\\");
            testEscape("#\r\n", "USER", "\\");
            testEscape("#\r\n", "VOLUME", "\\");
            testEscape("#\r\n", "WORKDIR", "\\");
        });

        it("#\\nescape=`", function () {
            testEscape("#\nescape=`", "ADD", "\\");
            testEscape("#\nescape=`", "ARG", "\\");
            testEscape("#\nescape=`", "CMD", "\\");
            testEscape("#\nescape=`", "COPY", "\\");
            testEscape("#\nescape=`", "ENTRYPOINT", "\\");
            testEscape("#\nescape=`", "ENV", "\\");
            testEscape("#\nescape=`", "EXPOSE", "\\");
            testEscape("#\nescape=`", "FROM", "\\");
            testEscape("#\nescape=`", "HEALTHCHECK", "\\");
            testEscape("#\nescape=`", "LABEL", "\\");
            testEscape("#\nescape=`", "MAINTAINER", "\\");
            testEscape("#\nescape=`", "ONBUILD", "\\");
            testEscape("#\nescape=`", "RUN", "\\");
            testEscape("#\nescape=`", "SHELL", "\\");
            testEscape("#\nescape=`", "STOPSIGNAL", "\\");
            testEscape("#\nescape=`", "USER", "\\");
            testEscape("#\nescape=`", "VOLUME", "\\");
            testEscape("#\nescape=`", "WORKDIR", "\\");
        });

        it("#\\r\\nescape=`", function () {
            testEscape("#\r\nescape=`", "ADD", "\\");
            testEscape("#\r\nescape=`", "ARG", "\\");
            testEscape("#\r\nescape=`", "CMD", "\\");
            testEscape("#\r\nescape=`", "COPY", "\\");
            testEscape("#\r\nescape=`", "ENTRYPOINT", "\\");
            testEscape("#\r\nescape=`", "ENV", "\\");
            testEscape("#\r\nescape=`", "EXPOSE", "\\");
            testEscape("#\r\nescape=`", "FROM", "\\");
            testEscape("#\r\nescape=`", "HEALTHCHECK", "\\");
            testEscape("#\r\nescape=`", "LABEL", "\\");
            testEscape("#\r\nescape=`", "MAINTAINER", "\\");
            testEscape("#\r\nescape=`", "ONBUILD", "\\");
            testEscape("#\r\nescape=`", "RUN", "\\");
            testEscape("#\r\nescape=`", "SHELL", "\\");
            testEscape("#\r\nescape=`", "STOPSIGNAL", "\\");
            testEscape("#\r\nescape=`", "USER", "\\");
            testEscape("#\r\nescape=`", "VOLUME", "\\");
            testEscape("#\r\nescape=`", "WORKDIR", "\\");
        });

        it("#escape=x", function () {
            var content = "#escape=x\nFROM x\n";
            var proposals = compute(content, content.length);
            assertAllProposals(proposals, 2, 0, 0);
        });
    });

    describe("directives", function () {
        describe("all directives", function() {
            it("#", function () {
                const proposals = compute("#", 1);
                assertDirectiveItems(proposals, 0, 1, 0);
            });

            it("# ", function () {
                const proposals = compute("# ", 2);
                assertDirectiveItems(proposals, 0, 2, 0);
            });

            it("##", function () {
                const proposals = compute("##", 1);
                assertDirectiveItems(proposals, 0, 1, 0);
            });

            it("# #", function () {
                const proposals = compute("# #", 1);
                assertDirectiveItems(proposals, 0, 1, 0);
            });

            it("# #", function () {
                const proposals = compute("# #", 2);
                assertDirectiveItems(proposals, 0, 2, 0);
            });

            it("#\\n", function () {
                const items = compute("#\n#", 1);
                assertDirectiveItems(items, 0, 1, 0);
            });

            it("# escape=", function () {
                const items = compute("# escape=", 2);
                assertDirectiveItems(items, 0, 2, 0);
            });

            it("# escape=\\n#", function () {
                const items = computePosition("# escape=\n#", 1, 1); 
                assertDirectiveItems(items, 1, 1, 0);
            });

            it("# syntax=docker/dockerfile\\n#", function () {
                const items = computePosition("# syntax=docker/dockerfile\n#", 1, 1); 
                assertDirectiveItems(items, 1, 1, 0);
            });

            it("# escape=\\n# syntax=docker/dockerfile\\n#", function () {
                const items = computePosition("# escape=\n# syntax=docker/dockerfile\n#", 2, 1); 
                assertDirectiveItems(items, 2, 1, 0);
            });

            it("# syntax=docker/dockerfile\\n# escape=\\n#", function () {
                const items = computePosition("# syntax=docker/dockerfile\n# escape=\n#", 2, 1); 
                assertDirectiveItems(items, 2, 1, 0);
            });
        });

        describe("escape", function () {
            describe("ok", function() {
                it("#e", function () {
                    const proposals = compute("#e", 2);
                    assert.strictEqual(1, proposals.length);
                    assertDirectiveEscape(proposals[0], 0, 1, 1);
                });
    
                it("# e", function () {
                    const proposals = compute("# e", 3);
                    assert.strictEqual(1, proposals.length);
                    assertDirectiveEscape(proposals[0], 0, 2, 1);
                });
    
                it("#E", function () {
                    const proposals = compute("#E", 2);
                    assert.strictEqual(1, proposals.length);
                    assertDirectiveEscape(proposals[0], 0, 1, 1);
                });
    
                it("#eS", function () {
                    const proposals = compute("#eS", 3);
                    assert.strictEqual(1, proposals.length);
                    assertDirectiveEscape(proposals[0], 0, 1, 2);
                });
    
                it("# escape=`", function () {
                    const items = compute("# escape=`", 4);
                    assert.strictEqual(1, items.length);
                    assertDirectiveEscape(items[0], 0, 2, 2);
                });
            });

            describe("invalid", function() {
                it("# escape=` ", function () {
                    const items = compute("# escape=` ", 11);
                    assert.strictEqual(items.length, 0);
                });

                it("#e ", function () {
                    const proposals = compute("#e ", 3);
                    assert.strictEqual(proposals.length, 0);
                });
            });
        });

        describe("syntax", function () {
            it("#s", function () {
                const proposals = compute("#s", 2);
                assert.strictEqual(1, proposals.length);
                assertDirectiveSyntax(proposals[0], 0, 1, 1);
            });

            it("#synta", function () {
                const proposals = compute("#synta", 6);
                assert.strictEqual(1, proposals.length);
                assertDirectiveSyntax(proposals[0], 0, 1, 5);
            });

            it("#syntax=docker/dockerfile", function () {
                const proposals = compute("#syntax=docker/dockerfile", 6);
                assert.strictEqual(1, proposals.length);
                assertDirectiveSyntax(proposals[0], 0, 1, 5);
            });

            it("# syntax=docker/dockerfile\\n#", function () {
                const items = computePosition("# syntax=docker/dockerfile\n#", 1, 1); 
                assertDirectiveItems(items, 1, 1, 0);
            });
        });

        describe("invalid", function() {
            it("#\\n#", function () {
                const proposals = compute("#\n#", 3);
                assert.strictEqual(proposals.length, 0);
            });

            it("#\\n#e", function () {
                const proposals = compute("#\n#e", 4);
                assert.strictEqual(proposals.length, 0);
            });

            it("# escape=\\n# syntax=docker/dockerfile\\n#\\n#", function () {
                const items = computePosition("# escape=\n# syntax=docker/dockerfile\n#\n#", 3, 1); 
                assert.strictEqual(items.length, 0);
            });

            it("# a", function () {
                const items = computePosition("# a=b", 0, 3);
                assert.strictEqual(items.length, 0);
            });
        });
    })

    describe("heredoc", () => {
        it("no instructions suggested", () => {
            let items = computePosition("RUN <<eot\n", 1, 0);
            assert.strictEqual(items.length, 0);

            items = computePosition("ADD a.txt <<file b.txt <<file2 /destination/\nabc\nfile\n", 3, 0);
            assert.strictEqual(items.length, 0);

            items = computePosition("COPY a.txt <<file b.txt <<file2 /destination/\nabc\nfile\n", 3, 0);
            assert.strictEqual(items.length, 0);
        });
    });

    function testAdd(trigger: boolean) {
        describe("ADD", function () {
            let onbuild = trigger ? "ONBUILD " : "";
            let triggerOffset = onbuild.length;

            describe("arguments", function () {
                function testADD_FlagFrom(snippetSupport: boolean) {
                    it("full", function () {
                        let items = computePosition("FROM busybox\n" + onbuild + "ADD ", 1, triggerOffset + 4, snippetSupport);
                        assertAddFlags(items, 1, triggerOffset + 4, 1, triggerOffset + 4, snippetSupport);

                        items = computePosition("FROM busybox\n" + onbuild + "ADD  ", 1, triggerOffset + 4, snippetSupport);
                        assertAddFlags(items, 1, triggerOffset + 4, 1, triggerOffset + 4, snippetSupport);
                    });

                    it("prefix", function () {
                        let items = computePosition("FROM busybox\n" + onbuild + "ADD -", 1, triggerOffset + 5, snippetSupport);
                        assertAddFlags(items, 1, triggerOffset + 4, 1, triggerOffset + 5, snippetSupport);

                        items = computePosition("FROM busybox\n" + onbuild + "ADD --", 1, triggerOffset + 6, snippetSupport);
                        assertAddFlags(items, 1, triggerOffset + 4, 1, triggerOffset + 6, snippetSupport);
                    });

                    describe("prefix --chown", () => {
                        testFlagPrefix(trigger, "ADD", "", "chown=", "", assertADD_FlagChown, snippetSupport);
                    });

                    it("chown invalid", () => {
                        const items = computePosition("FROM busybox\n" + onbuild + "ADD --chown2=user:group ", 1, triggerOffset + 24, snippetSupport);
                        assert.strictEqual(items.length, 1);
                        assertADD_FlagChown(items[0], 1, triggerOffset + 24, 1, triggerOffset + 24, snippetSupport);
                    });
                }

                describe("snippets", function () {
                    testADD_FlagFrom(true);
                });

                describe("plain text", function () {
                    testADD_FlagFrom(false);
                });

                describe("workdir suggestions", () => {
                    it("inside first argument", () => {
                        const items = computePosition("FROM busybox\nWORKDIR /tmp\n" + onbuild + "ADD tmp.txt ", 2, triggerOffset + 8);
                        assert.strictEqual(items.length, 0);
                    });
    
                    it("after one argument", () => {
                        const items = computePosition("FROM busybox\nWORKDIR /tmp\n" + onbuild + "ADD tmp.txt ", 2, triggerOffset + 12);
                        assert.strictEqual(items.length, 1);
                        assertPath(items[0], "/tmp/", 2, triggerOffset + 12, 0);
                    });
    
                    it("after two arguments", () => {
                        const items = computePosition("FROM busybox\nWORKDIR /tmp\n" + onbuild + "ADD tmp.txt tmp2.txt ", 2, triggerOffset + 21);
                        assert.strictEqual(items.length, 1);
                        assertPath(items[0], "/tmp/", 2, triggerOffset + 21, 0);
                    });
    
                    it("honours prefix", () => {
                        const items = computePosition("FROM busybox\nWORKDIR /tmp\nWORKDIR /build\n" + onbuild + "ADD tmp.txt /b", 3, triggerOffset + 14);
                        assert.strictEqual(items.length, 1);
                        assertPath(items[0], "/build/", 3, triggerOffset + 14, 2);
                    });
    
                    it("inside second of three arguments", () => {
                        const items = computePosition("FROM busybox\nWORKDIR /tmp\n" + onbuild + "ADD tmp.txt tmp2.txt tmp3.txt", 2, triggerOffset + 15);
                        assert.strictEqual(items.length, 0);
                    });
                });

                it("none", function () {
                    let items = computePosition("FROM busybox\n" + onbuild + "ADD --from=", 1, triggerOffset + 12);
                    assert.strictEqual(items.length, 0);

                    items = computePosition("FROM busybox\n" + onbuild + "ADD app app", 1, triggerOffset + 6);
                    assert.strictEqual(items.length, 0);

                    items = computePosition("FROM busybox\n" + onbuild + "ADD app app", 1, triggerOffset + 10);
                    assert.strictEqual(items.length, 0);

                    items = computePosition("FROM busybox\n" + onbuild + "ADD app  app", 1, triggerOffset + 9);
                    assert.strictEqual(items.length, 0);

                    items = computePosition("FROM busybox\n" + onbuild + "ADD app --fr app", 1, triggerOffset + 13);
                    assert.strictEqual(items.length, 0);

                    items = computePosition("FROM busybox as busybox\n" + onbuild + "ADD . . ", 1, triggerOffset + 8);
                    assert.strictEqual(items.length, 0);
                });
            });
        });
    }

    testAdd(false);

    function testCopy(trigger: boolean) {
        describe("COPY", function () {
            let onbuild = trigger ? "ONBUILD " : "";
            let triggerOffset = onbuild.length;

            describe("build stages", function () {
                it("no sources", function () {
                    var proposals = computePosition("FROM busybox\n" + onbuild + "COPY --from=", 1, triggerOffset + 12);
                    assert.strictEqual(proposals.length, 0);
                });

                it("source image", function () {
                    var proposals = computePosition("FROM busybox AS source\n" + onbuild + "COPY --from=", 1, triggerOffset + 12);
                    assert.strictEqual(proposals.length, 1);
                    assertSourceImage(proposals[0], "source", 0, "busybox", 1, triggerOffset + 12, 1, triggerOffset + 12);
                });

                it("source images alphabetical", function () {
                    var proposals = computePosition("FROM ubuntu:trusty AS setup\nFROM redhat:rawhide AS dev\n" + onbuild + "COPY --from=", 2, triggerOffset + 12);
                    assert.strictEqual(proposals.length, 2);
                    assertSourceImage(proposals[0], "setup", 0, "ubuntu:trusty", 2, triggerOffset + 12, 2, triggerOffset + 12);
                    assertSourceImage(proposals[1], "dev", 1, "redhat:rawhide", 2, triggerOffset + 12, 2, triggerOffset + 12);
                });

                it("source image prefix", function () {
                    var proposals = computePosition("FROM busybox AS setup\nFROM busybox AS dev\n" + onbuild + "COPY --from=s", 2, triggerOffset + 13);
                    assert.strictEqual(proposals.length, 1);
                    assertSourceImage(proposals[0], "setup", 0, "busybox", 2, triggerOffset + 12, 2, triggerOffset + 13);

                    // casing should be ignored
                    proposals = computePosition("FROM busybox AS setup\nFROM busybox AS dev\n" + onbuild + "COPY --from=S", 2, triggerOffset + 13);
                    assert.strictEqual(proposals.length, 1);
                    assertSourceImage(proposals[0], "setup", 0, "busybox", 2, triggerOffset + 12, 2, triggerOffset + 13);
                });

                it("no duplicate source images", function () {
                    let proposals = computePosition("FROM busybox AS source\nFROM busybox AS source\n" + onbuild + "COPY --from=", 2, triggerOffset + 12);
                    assert.strictEqual(proposals.length, 1);
                    assertSourceImage(proposals[0], "source", 0, "busybox", 2, triggerOffset + 12, 2, triggerOffset + 12);
                });

                it("no duplicate source images ignoring case", function () {
                    let proposals = computePosition("FROM busybox AS source\nFROM busybox AS soURCe\n" + onbuild + "COPY --from=", 2, triggerOffset + 12);
                    assert.strictEqual(proposals.length, 1);
                    assertSourceImage(proposals[0], "source", 0, "busybox", 2, triggerOffset + 12, 2, triggerOffset + 12);
                });

                it("only suggest previously declared source images", function () {
                    let proposals = computePosition("FROM node AS dev\n" + onbuild + "COPY --from=\nFROM node AS test", 1, triggerOffset + 12);
                    assert.strictEqual(proposals.length, 1);
                    assertSourceImage(proposals[0], "dev", 0, "node", 1, triggerOffset + 12, 1, triggerOffset + 12);
                });

                it("source image indices", function () {
                    let proposals = computePosition("FROM alpine\nFROM node\n" + onbuild + "COPY --from=\nFROM busybox", 2, triggerOffset + 12);
                    assert.strictEqual(proposals.length, 1);
                    assertSourceImage(proposals[0], "0", 0, "alpine", 2, triggerOffset + 12, 2, triggerOffset + 12);

                    proposals = computePosition("FROM alpine AS linux\nFROM node\nFROM busybox\n" + onbuild + "COPY --from=", 3, triggerOffset + 12);
                    assert.strictEqual(proposals.length, 2);
                    assertSourceImage(proposals[0], "linux", 0, "alpine", 3, triggerOffset + 12, 3, triggerOffset + 12);
                    assertSourceImage(proposals[1], "1", 1, "node", 3, triggerOffset + 12, 3, triggerOffset + 12);

                    proposals = computePosition("FROM alpine AS 1\nFROM node\nFROM busybox\n" + onbuild + "COPY --from=", 3, triggerOffset + 12);
                    assert.strictEqual(proposals.length, 1);
                    assertSourceImage(proposals[0], "1", 0, "alpine", 3, triggerOffset + 12, 3, triggerOffset + 12);
                });
            });

            describe("arguments", function () {
                function testCOPY_Flags(snippetSupport: boolean) {
                    it("full", function () {
                        let items = computePosition("FROM busybox\n" + onbuild + "COPY ", 1, triggerOffset + 5, snippetSupport);
                        assertCopyFlags(items, 1, triggerOffset + 5, 1, triggerOffset + 5, snippetSupport);

                        items = computePosition("FROM busybox\n" + onbuild + "COPY  ", 1, triggerOffset + 5, snippetSupport);
                        assertCopyFlags(items, 1, triggerOffset + 5, 1, triggerOffset + 5, snippetSupport);

                        // the first hyphen causes the flags after it to be perceived as arguments, hence we prompt everything
                        items = computePosition("FROM busybox\n" + onbuild + "COPY - --chown=user:group --from=test", 1, triggerOffset + 5, snippetSupport);
                        assertCopyFlags(items, 1, triggerOffset + 5, 1, triggerOffset + 5, snippetSupport);
                    });

                    it("prefix", function () {
                        let items = computePosition("FROM busybox\n" + onbuild + "COPY -", 1, triggerOffset + 6, snippetSupport);
                        assertCopyFlags(items, 1, triggerOffset + 5, 1, triggerOffset + 6, snippetSupport);

                        items = computePosition("FROM busybox\n" + onbuild + "COPY --", 1, triggerOffset + 7, snippetSupport);
                        assertCopyFlags(items, 1, triggerOffset + 5, 1, triggerOffset + 7, snippetSupport);
                    });

                    describe("prefix --from", () => {
                        testFlagPrefix(trigger, "COPY", "", "from=", "", assertCOPY_FlagFrom, snippetSupport);
                    });

                    describe("prefix --chown", () => {
                        testFlagPrefix(trigger, "COPY", "", "chown=", "", assertCOPY_FlagChown, snippetSupport);
                    });

                    describe("--from present", () => {
                        it("no prefix", () => {
                            const items = computePosition("FROM busybox\n" + onbuild + "COPY --from=something ", 1, triggerOffset + 22, snippetSupport);
                            assert.strictEqual(items.length, 1);
                            assertCOPY_FlagChown(items[0], 1, triggerOffset + 22, 1, triggerOffset + 22, snippetSupport);
                        });

                        it("- prefix", () => {
                            const items = computePosition("FROM busybox\n" + onbuild + "COPY --from=something -", 1, triggerOffset + 23, snippetSupport);
                            assert.strictEqual(items.length, 1);
                            assertCOPY_FlagChown(items[0], 1, triggerOffset + 22, 1, triggerOffset + 23, snippetSupport);
                        });

                        describe("no args", () => {
                            testFlagPrefix(trigger, "COPY", "--from=something ", "chown=", "", assertCOPY_FlagChown, snippetSupport);
                        });

                        describe("has args", () => {
                            testFlagPrefix(trigger, "COPY", "--from=something ", "chown=", " .", assertCOPY_FlagChown, snippetSupport);
                        });
                    });

                    describe("--chown present", () => {
                        it("no prefix", () => {
                            let items = computePosition("FROM busybox\n" + onbuild + "COPY --chown=user:group ", 1, triggerOffset + 24, snippetSupport);
                            assert.strictEqual(items.length, 1);
                            assertCOPY_FlagFrom(items[0], 1, triggerOffset + 24, 1, triggerOffset + 24, snippetSupport);
                        });

                        it("- prefix", () => {
                            const items = computePosition("FROM busybox\n" + onbuild + "COPY --chown=user:group -", 1, triggerOffset + 25, snippetSupport);
                            assert.strictEqual(items.length, 1);
                            assertCOPY_FlagFrom(items[0], 1, triggerOffset + 24, 1, triggerOffset + 25, snippetSupport);
                        });

                        describe("no args", () => {
                            testFlagPrefix(trigger, "COPY", "--chown=user:group ", "from=", "", assertCOPY_FlagFrom, snippetSupport);
                        });

                        describe("has args", () => {
                            testFlagPrefix(trigger, "COPY", "--chown=user:group ", "from=", " .", assertCOPY_FlagFrom, snippetSupport);
                        });
                    });

                    describe("invalid flags", () => {
                        it("all invalid", () => {
                            let items = computePosition("FROM busybox\n" + onbuild + "COPY --from2=abc ", 1, triggerOffset + 17, snippetSupport);
                            assertCopyFlags(items, 1, triggerOffset + 17, 1, triggerOffset + 17, snippetSupport);

                            items = computePosition("FROM busybox\n" + onbuild + "COPY --chown2=test --from2=abc ", 1, triggerOffset + 31, snippetSupport);
                            assertCopyFlags(items, 1, triggerOffset + 31, 1, triggerOffset + 31, snippetSupport);
                        });

                        it("chown valid", () => {
                            const items = computePosition("FROM busybox\n" + onbuild + "COPY --chown=user:group --from2=abc ", 1, triggerOffset + 36, snippetSupport);
                            assert.strictEqual(items.length, 1);
                            assertCOPY_FlagFrom(items[0], 1, triggerOffset + 36, 1, triggerOffset + 36, snippetSupport);
                        });

                        it("from valid", () => {
                            const items = computePosition("FROM busybox\n" + onbuild + "COPY --chown2=user:group --from=abc ", 1, triggerOffset + 36, snippetSupport);
                            assert.strictEqual(items.length, 1);
                            assertCOPY_FlagChown(items[0], 1, triggerOffset + 36, 1, triggerOffset + 36, snippetSupport);
                        });
                    });
                }

                describe("snippets", function () {
                    testCOPY_Flags(true);
                });

                describe("plain text", function () {
                    testCOPY_Flags(false);
                });

                describe("workdir suggestions", () => {
                    it("inside first argument", () => {
                        const items = computePosition("FROM busybox\nWORKDIR /tmp\n" + onbuild + "COPY tmp.txt ", 2, triggerOffset + 8);
                        assert.strictEqual(items.length, 0);
                    });

                    it("after one argument", () => {
                        const items = computePosition("FROM busybox\nWORKDIR /tmp\n" + onbuild + "COPY tmp.txt ", 2, triggerOffset + 13);
                        assert.strictEqual(items.length, 1);
                        assertPath(items[0], "/tmp/", 2, triggerOffset + 13, 0);
                    });

                    it("after two arguments", () => {
                        const items = computePosition("FROM busybox\nWORKDIR /tmp\n" + onbuild + "COPY tmp.txt tmp2.txt ", 2, triggerOffset + 22);
                        assert.strictEqual(items.length, 1);
                        assertPath(items[0], "/tmp/", 2, triggerOffset + 22, 0);
                    });

                    it("honours prefix", () => {
                        const items = computePosition("FROM busybox\nWORKDIR /tmp\nWORKDIR /build\n" + onbuild + "COPY tmp.txt /b", 3, triggerOffset + 15);
                        assert.strictEqual(items.length, 1);
                        assertPath(items[0], "/build/", 3, triggerOffset + 15, 2);
                    });

                    it("inside second of three arguments", () => {
                        const items = computePosition("FROM busybox\nWORKDIR /tmp\n" + onbuild + "COPY tmp.txt tmp2.txt tmp3.txt", 2, triggerOffset + 15);
                        assert.strictEqual(items.length, 0);
                    });
                });

                it("none", function () {
                    let items = computePosition("FROM busybox\n" + onbuild + "COPY --from=", 1, triggerOffset + 12);
                    assert.strictEqual(items.length, 0);

                    items = computePosition("FROM busybox\n" + onbuild + "COPY app app", 1, triggerOffset + 6);
                    assert.strictEqual(items.length, 0);

                    items = computePosition("FROM busybox\n" + onbuild + "COPY app app", 1, triggerOffset + 10);
                    assert.strictEqual(items.length, 0);

                    items = computePosition("FROM busybox\n" + onbuild + "COPY app  app", 1, triggerOffset + 9);
                    assert.strictEqual(items.length, 0);

                    items = computePosition("FROM busybox\n" + onbuild + "COPY app --fr app", 1, triggerOffset + 13);
                    assert.strictEqual(items.length, 0);

                    items = computePosition("FROM busybox\n" + onbuild + "COPY  --chown=user:group --from=test", 1, triggerOffset + 5);
                    assert.strictEqual(items.length, 0);

                    items = computePosition("FROM busybox\n" + onbuild + "COPY -- --chown=user:group --from=test", 1, triggerOffset + 7);
                    assert.strictEqual(items.length, 0);

                    items = computePosition("FROM busybox\n" + onbuild + "COPY --chown=user:group --from=test ", 1, triggerOffset + 36);
                    assert.strictEqual(items.length, 0);

                    items = computePosition("FROM busybox\n" + onbuild + "COPY --chown=user:group --from=test -", 1, triggerOffset + 37);
                    assert.strictEqual(items.length, 0);

                    items = computePosition("FROM busybox\n" + onbuild + "COPY --chown=user:group --from=test --", 1, triggerOffset + 38);
                    assert.strictEqual(items.length, 0);

                    items = computePosition("FROM busybox as busybox\n" + onbuild + "COPY . . ", 1, triggerOffset + 9);
                    assert.strictEqual(items.length, 0);
                });
            });
        });
    }

    testCopy(false);

    describe("FROM", function () {
        // currently not supported so the expectation is that no suggestions should be provided
        it("image names", function () {
            let items = compute("FROM node", 7);
            assert.strictEqual(items.length, 0);
        });

        function testFlags(snippetSupport: boolean): void {
            it("full", function() {
                let items = computePosition("FROM ", 0, 5, snippetSupport);
                assertFromFlags(items, 0, 5, 0, 5, snippetSupport);

                items = computePosition("FROM  node", 0, 5, snippetSupport);
                assertFromFlags(items, 0, 5, 0, 5, snippetSupport);

                items = computePosition("FROM node", 0, 5, snippetSupport);
                assertFromFlags(items, 0, 5, 0, 5, snippetSupport);

                items = computePosition("FROM node:latest", 0, 5, snippetSupport);
                assertFromFlags(items, 0, 5, 0, 5, snippetSupport);
            });

            it("prefix", function() {
                let items = computePosition("FROM -", 0, 6, snippetSupport);
                assertFromFlags(items, 0, 5, 0, 6, snippetSupport);

                items = computePosition("FROM --", 0, 7, snippetSupport);
                assertFromFlags(items, 0, 5, 0, 7, snippetSupport);

                items = computePosition("FROM --plat", 0, 11, snippetSupport);
                assertFromFlags(items, 0, 5, 0, 11, snippetSupport);
            });

            it("after image", function() {
                let items = computePosition("FROM node ", 0, 10, snippetSupport);
                assert.strictEqual(0, items.length);

                items = computePosition("FROM node:latest ", 0, 17, snippetSupport);
                assert.strictEqual(0, items.length);

                items = computePosition("FROM node AS stage", 0, 10, snippetSupport);
                assert.strictEqual(0, items.length);

                items = computePosition("FROM node AS stage", 0, 13, snippetSupport);
                assert.strictEqual(0, items.length);

                items = computePosition("FROM node AS stage", 0, 18, snippetSupport);
                assert.strictEqual(0, items.length);

                items = computePosition("FROM node  AS  stage ", 0, 10, snippetSupport);
                assert.strictEqual(0, items.length);

                items = computePosition("FROM node  AS  stage ", 0, 14, snippetSupport);
                assert.strictEqual(0, items.length);

                items = computePosition("FROM node  AS  stage ", 0, 21, snippetSupport);
                assert.strictEqual(0, items.length);
            });
        }

        describe("snippet", function() {
            testFlags(true);
        });

        describe("plain text", function() {
            testFlags(false);
        });
    });

    function testHealthcheck(trigger: boolean) {
        describe("HEALTHCHECK", function () {
            let onbuild = trigger ? "ONBUILD " : "";
            let triggerOffset = onbuild.length;
            function testFlags(snippetSupport: boolean) {
                describe("arguments", function () {
                    it("full", function () {
                        var items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK ", 1, triggerOffset + 12, snippetSupport);
                        assertHealthcheckItems(items, 1, triggerOffset + 12, 1, triggerOffset + 12, snippetSupport);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK --timeout=30s ", 1, triggerOffset + 26, snippetSupport);
                        assertHealthcheckItems(items, 1, triggerOffset + 26, 1, triggerOffset + 26, snippetSupport);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK  --timeout=30s NONE ", 1, triggerOffset + 12, snippetSupport);
                        assertHealthcheckItems(items, 1, triggerOffset + 12, 1, triggerOffset + 12, snippetSupport);
                    });

                    it("prefix", function () {
                        var items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK -", 1, triggerOffset + 13, snippetSupport);
                        assertHealthcheckFlags(items, 1, triggerOffset + 12, 1, triggerOffset + 13, snippetSupport);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK --", 1, triggerOffset + 14, snippetSupport);
                        assertHealthcheckFlags(items, 1, triggerOffset + 12, 1, triggerOffset + 14, snippetSupport);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK c", 1, triggerOffset + 13, snippetSupport);
                        assert.strictEqual(items.length, 1);
                        assertHEALTHCHECK_CMD_Subcommand(items[0], 1, triggerOffset + 12, 1, triggerOffset + 13, snippetSupport);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK CM", 1, triggerOffset + 14, snippetSupport);
                        assert.strictEqual(items.length, 1);
                        assertHEALTHCHECK_CMD_Subcommand(items[0], 1, triggerOffset + 12, 1, triggerOffset + 14, snippetSupport);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK n", 1, triggerOffset + 13, snippetSupport);
                        assert.strictEqual(items.length, 1);
                        assertHEALTHCHECK_NONE_Subcommand(items[0], 1, triggerOffset + 12, 1, triggerOffset + 13);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK NO", 1, triggerOffset + 14, snippetSupport);
                        assert.strictEqual(items.length, 1);
                        assertHEALTHCHECK_NONE_Subcommand(items[0], 1, triggerOffset + 12, 1, triggerOffset + 14);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK --inter", 1, triggerOffset + 19, snippetSupport);
                        assert.strictEqual(items.length, 1);
                        assertHEALTHCHECK_FlagInterval(items[0], 1, triggerOffset + 12, 1, triggerOffset + 19, snippetSupport);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK --ret", 1, triggerOffset + 17, snippetSupport);
                        assert.strictEqual(items.length, 1);
                        assertHEALTHCHECK_FlagRetries(items[0], 1, triggerOffset + 12, 1, triggerOffset + 17, snippetSupport);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK --start-i", 1, triggerOffset + 21, snippetSupport);
                        assert.strictEqual(items.length, 1);
                        assertHEALTHCHECK_FlagStartInterval(items[0], 1, triggerOffset + 12, 1, triggerOffset + 21, snippetSupport);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK --start-p", 1, triggerOffset + 21, snippetSupport);
                        assert.strictEqual(items.length, 1);
                        assertHEALTHCHECK_FlagStartPeriod(items[0], 1, triggerOffset + 12, 1, triggerOffset + 21, snippetSupport);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK --time", 1, triggerOffset + 18, snippetSupport);
                        assert.strictEqual(items.length, 1);
                        assertHEALTHCHECK_FlagTimeout(items[0], 1, triggerOffset + 12, 1, triggerOffset + 18, snippetSupport);
                    });

                    it("before command", function () {
                        let items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK  \\\nCMD", 1, triggerOffset + 12, snippetSupport);
                        assertHealthcheckItems(items, 1, triggerOffset + 12, 1, triggerOffset + 12, snippetSupport);
                    });

                    it("after command", function () {
                        var items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK CMD", 1, triggerOffset + 15, snippetSupport);
                        assert.strictEqual(items.length, 0);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK cmd", 1, triggerOffset + 15, snippetSupport);
                        assert.strictEqual(items.length, 0);

                        var items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK CMD ", 1, triggerOffset + 16, snippetSupport);
                        assert.strictEqual(items.length, 0);

                        var items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK --timeout=30s CMD ", 1, triggerOffset + 30, snippetSupport);
                        assert.strictEqual(items.length, 0);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK cmd ", 1, triggerOffset + 16, snippetSupport);
                        assert.strictEqual(items.length, 0);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK CMD\\\n", 2, 0, snippetSupport);
                        assert.strictEqual(items.length, 0);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK cmd\\\n", 2, 0, snippetSupport);
                        assert.strictEqual(items.length, 0);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK CMD \\\n", 2, 0, snippetSupport);
                        assert.strictEqual(items.length, 0);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK cmd \\\n", 2, 0, snippetSupport);
                        assert.strictEqual(items.length, 0);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK NONE", 1, triggerOffset + 16, snippetSupport);
                        assert.strictEqual(items.length, 0);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK none", 1, triggerOffset + 16, snippetSupport);
                        assert.strictEqual(items.length, 0);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK NONE ", 1, triggerOffset + 17, snippetSupport);
                        assert.strictEqual(items.length, 0);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK none ", 1, triggerOffset + 17, snippetSupport);
                        assert.strictEqual(items.length, 0);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK NONE \\\n", 2, 0, snippetSupport);
                        assert.strictEqual(items.length, 0);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK none \\\n", 2, 0, snippetSupport);
                        assert.strictEqual(items.length, 0);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK NONE\\\n", 2, 0, snippetSupport);
                        assert.strictEqual(items.length, 0);

                        items = computePosition("FROM busybox\n" + onbuild + "HEALTHCHECK none\\\n", 2, 0, snippetSupport);
                        assert.strictEqual(items.length, 0);
                    });
                });
            }

            describe("snippets", function () {
                testFlags(true);
            });


            describe("plain text", function () {
                testFlags(false);
            });
        });
    }
    testHealthcheck(false);

    describe('ONBUILD nesting', function () {
        it('all', function () {
            var proposals = compute("FROM node\nONBUILD ", 18);
            assertONBUILDProposals(proposals, 1, 8, 0);
        });

        describe('prefix', function () {

			/**
			 * Test that an ONBUILD can be followed by a WORKDIR.
			 */
            it('ONBUILD W', function () {
                var proposals = compute("FROM node\nONBUILD W", 19);
                assert.strictEqual(proposals.length, 1);
                assertWORKDIR(proposals[0], 1, 8, 1, true);

                proposals = compute("FROM node\nONBUILD w", 19);
                assert.strictEqual(proposals.length, 1);
                assertWORKDIR(proposals[0], 1, 8, 1, true);

                proposals = compute("FROM node\nonbuild W", 19);
                assert.strictEqual(proposals.length, 1);
                assertWORKDIR(proposals[0], 1, 8, 1, true);

                proposals = compute("FROM node\nonbuild w", 19);
                assert.strictEqual(proposals.length, 1);
                assertWORKDIR(proposals[0], 1, 8, 1, true);
            });

			/**
			 * Test that an ONBUILD cannot be followed by a FROM.
			 */
            it('ONBUILD F', function () {
                var proposals = compute("FROM node\nONBUILD F", 19);
                assert.strictEqual(proposals.length, 0);

                proposals = compute("FROM node\nONBUILD f", 19);
                assert.strictEqual(proposals.length, 0);

                proposals = compute("FROM node\nonbuild F", 19);
                assert.strictEqual(proposals.length, 0);

                proposals = compute("FROM node\nonbuild f", 19);
                assert.strictEqual(proposals.length, 0);
            });

			/**
			 * Test that an ONBUILD cannot be followed by a MAINTAINER.
			 */
            it('ONBUILD M', function () {
                var proposals = compute("FROM node\nONBUILD M", 19);
                assert.strictEqual(proposals.length, 0);

                proposals = compute("FROM node\nONBUILD m", 19);
                assert.strictEqual(proposals.length, 0);

                proposals = compute("FROM node\nonbuild M", 19);
                assert.strictEqual(proposals.length, 0);

                proposals = compute("FROM node\nonbuild m", 19);
                assert.strictEqual(proposals.length, 0);
            });

			/**
			 * Test that an ONBUILD cannot be followed by an ONBUILD.
			 */
            it('ONBUILD O', function () {
                var proposals = compute("FROM node\nONBUILD O", 19);
                assert.strictEqual(proposals.length, 0);

                proposals = compute("FROM node\nONBUILD o", 19);
                assert.strictEqual(proposals.length, 0);

                proposals = compute("FROM node\nonbuild O", 19);
                assert.strictEqual(proposals.length, 0);

                proposals = compute("FROM node\nonbuild o", 19);
                assert.strictEqual(proposals.length, 0);
            });

			/**
			 * Test that an ONBUILD within an ONBUILD doesn't confuse the parser.
			 */
            it('ONBUILD ONBUILD W', function () {
                var proposals = compute("FROM node\nONBUILD ONBUILD W", 27);
                assert.strictEqual(proposals.length, 0);

                proposals = compute("FROM node\nONBUILD ONBUILD w", 27);
                assert.strictEqual(proposals.length, 0);

                proposals = compute("FROM node\nONBUILD onbuild W", 27);
                assert.strictEqual(proposals.length, 0);

                proposals = compute("FROM node\nONBUILD onbuild w", 27);
                assert.strictEqual(proposals.length, 0);
            });

            it('false ONBUILD instruction', function () {
                var proposals = compute("FROM node\nRUN echo \"ONBUILD W", 29);
                assert.strictEqual(proposals.length, 0);

                proposals = compute("FROM node\nRUN echo \" ONBUILD W", 30);
                assert.strictEqual(proposals.length, 0);

                proposals = compute("FROM node\n\"ONBUILD ", 19);
                assert.strictEqual(proposals.length, 0);

                proposals = compute("FROM node\n\" ONBUILD ", 20);
                assert.strictEqual(proposals.length, 0);

                proposals = compute("FROM node\n\O NBUILD ", 19);
                assert.strictEqual(proposals.length, 0);

                proposals = compute("FROM node\n\\ O NBUILD ", 20);
                assert.strictEqual(proposals.length, 0);

                proposals = compute("FROM node\n\"O NBUILD ", 20);
                assert.strictEqual(proposals.length, 0);

                proposals = compute("FROM node\n\" O NBUILD ", 21);
                assert.strictEqual(proposals.length, 0);
            });
        });

        testAdd(true);
        testCopy(true);
        testHealthcheck(true);
    });

    describe("variables", function () {
        describe("$", function () {
            it("defaults only", function () {
                let items = computePosition("FROM busybox\nRUN echo $", 1, 10);
                assertDockerVariables(items, 1, 9, 1, true);
            });

            it("prefix", function () {
                let items = computePosition("FROM busybox\nRUN echo $f", 1, 11);
                assert.strictEqual(items.length, 2);
                assertVariable("FTP_PROXY", items[0], 1, 9, 2, false);
                assertVariable("ftp_proxy", items[1], 1, 9, 2, false);

                items = computePosition("FROM busybox\nRUN echo $F", 1, 11);
                assert.strictEqual(items.length, 2);
                assertVariable("FTP_PROXY", items[0], 1, 9, 2, false);
                assertVariable("ftp_proxy", items[1], 1, 9, 2, false);
            });

            it("ARG variable", function () {
                let items = computePosition("FROM busybox\nARG foo=bar\nARG FOO=BAR\nRUN echo $", 3, 10);
                assert.strictEqual(items.length, 10);
                assertVariable("FOO", items[0], 3, 9, 1, true, "BAR");
                assertVariable("foo", items[1], 3, 9, 1, true, "bar");
                assertVariable("FTP_PROXY", items[2], 3, 9, 1, true);
                assertVariable("ftp_proxy", items[3], 3, 9, 1, true);
                assertVariable("HTTP_PROXY", items[4], 3, 9, 1, true);
                assertVariable("http_proxy", items[5], 3, 9, 1, true);
                assertVariable("HTTPS_PROXY", items[6], 3, 9, 1, true);
                assertVariable("https_proxy", items[7], 3, 9, 1, true);
                assertVariable("NO_PROXY", items[8], 3, 9, 1, true);
                assertVariable("no_proxy", items[9], 3, 9, 1, true);

                items = computePosition("FROM busybox\nARG foo=bar\nARG FOO=BAR\nRUN echo $F", 3, 11);
                assert.strictEqual(items.length, 4);
                assertVariable("FOO", items[0], 3, 9, 2, false, "BAR");
                assertVariable("foo", items[1], 3, 9, 2, false, "bar");
                assertVariable("FTP_PROXY", items[2], 3, 9, 2, false);
                assertVariable("ftp_proxy", items[3], 3, 9, 2, false);

                items = computePosition("FROM busybox\nARG foo=bar\nARG FOO=BAR\nRUN echo $f", 3, 11);
                assert.strictEqual(items.length, 4);
                assertVariable("FOO", items[0], 3, 9, 2, false, "BAR");
                assertVariable("foo", items[1], 3, 9, 2, false, "bar");
                assertVariable("FTP_PROXY", items[2], 3, 9, 2, false);
                assertVariable("ftp_proxy", items[3], 3, 9, 2, false);

                items = computePosition("FROM busybox\nARG foo=bar\nARG foo=bar2\nRUN echo $f", 3, 11);
                assert.strictEqual(items.length, 3);
                assertVariable("foo", items[0], 3, 9, 2, false, "bar2");
                assertVariable("FTP_PROXY", items[1], 3, 9, 2, false);
                assertVariable("ftp_proxy", items[2], 3, 9, 2, false);

                items = computePosition("FROM busybox\nRUN echo $f\nARG foo=bar\nARG FOO=BAR", 1, 11);
                assert.strictEqual(items.length, 2);
                assertVariable("FTP_PROXY", items[0], 1, 9, 2, false);
                assertVariable("ftp_proxy", items[1], 1, 9, 2, false);

                items = computePosition("FROM busybox\nARG\nRUN echo $f", 2, 11);
                assert.strictEqual(items.length, 2);
                assertVariable("FTP_PROXY", items[0], 2, 9, 2, false);
                assertVariable("ftp_proxy", items[1], 2, 9, 2, false);

                items = computePosition("FROM busybox\nRUN echo $f\nARG", 1, 11);
                assert.strictEqual(items.length, 2);
                assertVariable("FTP_PROXY", items[0], 1, 9, 2, false);
                assertVariable("ftp_proxy", items[1], 1, 9, 2, false);

                items = computePosition("FROM busybox\nARG foo=env\nRUN echo $o", 2, 11);
                assert.strictEqual(items.length, 0);
            });

            it("ARG variable overlaps with default", function () {
                let items = computePosition("FROM busybox\nARG FTP_PROXY\nRUN echo $f", 2, 11);
                assert.strictEqual(items.length, 2);
                assertVariable("FTP_PROXY", items[0], 2, 9, 2, false);
                assertVariable("ftp_proxy", items[1], 2, 9, 2, false);
            });

            it("ENV variable", function () {
                let items = computePosition("FROM busybox\nENV foo=bar\nENV FOO=BAR\nRUN echo $", 3, 10);
                assert.strictEqual(items.length, 10);
                assertVariable("FOO", items[0], 3, 9, 1, true, "BAR");
                assertVariable("foo", items[1], 3, 9, 1, true, "bar");
                assertVariable("FTP_PROXY", items[2], 3, 9, 1, true);
                assertVariable("ftp_proxy", items[3], 3, 9, 1, true);
                assertVariable("HTTP_PROXY", items[4], 3, 9, 1, true);
                assertVariable("http_proxy", items[5], 3, 9, 1, true);
                assertVariable("HTTPS_PROXY", items[6], 3, 9, 1, true);
                assertVariable("https_proxy", items[7], 3, 9, 1, true);
                assertVariable("NO_PROXY", items[8], 3, 9, 1, true);
                assertVariable("no_proxy", items[9], 3, 9, 1, true);

                items = computePosition("FROM busybox\nENV foo=bar\nENV FOO=BAR\nRUN echo $F", 3, 11);
                assert.strictEqual(items.length, 4);
                assertVariable("FOO", items[0], 3, 9, 2, false, "BAR");
                assertVariable("foo", items[1], 3, 9, 2, false, "bar");
                assertVariable("FTP_PROXY", items[2], 3, 9, 2, false);
                assertVariable("ftp_proxy", items[3], 3, 9, 2, false);

                items = computePosition("FROM busybox\nENV foo=bar\nENV FOO=BAR\nRUN echo $f", 3, 11);
                assert.strictEqual(items.length, 4);
                assertVariable("FOO", items[0], 3, 9, 2, false, "BAR");
                assertVariable("foo", items[1], 3, 9, 2, false, "bar");
                assertVariable("FTP_PROXY", items[2], 3, 9, 2, false);
                assertVariable("ftp_proxy", items[3], 3, 9, 2, false);

                items = computePosition("FROM busybox\nENV foo=bar\nENV foo=bar2\nRUN echo $f", 3, 11);
                assert.strictEqual(items.length, 3);
                assertVariable("foo", items[0], 3, 9, 2, false, "bar2");
                assertVariable("FTP_PROXY", items[1], 3, 9, 2, false);
                assertVariable("ftp_proxy", items[2], 3, 9, 2, false);

                items = computePosition("FROM busybox\nRUN echo $f\nENV foo=bar\nENV FOO=BAR", 1, 11);
                assert.strictEqual(items.length, 2);
                assertVariable("FTP_PROXY", items[0], 1, 9, 2, false);
                assertVariable("ftp_proxy", items[1], 1, 9, 2, false);

                items = computePosition("FROM busybox\nENV\nRUN echo $f", 2, 11);
                assert.strictEqual(items.length, 2);
                assertVariable("FTP_PROXY", items[0], 2, 9, 2, false);
                assertVariable("ftp_proxy", items[1], 2, 9, 2, false);

                items = computePosition("FROM busybox\nRUN echo $f\nENV", 1, 11);
                assert.strictEqual(items.length, 2);
                assertVariable("FTP_PROXY", items[0], 1, 9, 2, false);
                assertVariable("ftp_proxy", items[1], 1, 9, 2, false);

                items = computePosition("FROM busybox\nENV foo=env\nRUN echo $o", 2, 11);
                assert.strictEqual(items.length, 0);
            });

            it("ENV variable overlaps with default", function () {
                let items = computePosition("FROM busybox\nENV FTP_PROXY=8001\nRUN echo $f", 2, 11);
                assert.strictEqual(items.length, 2);
                assertVariable("FTP_PROXY", items[0], 2, 9, 2, false, "8001");
                assertVariable("ftp_proxy", items[1], 2, 9, 2, false);
            });

            it("ARG and ENV variable", function () {
                let items = computePosition("FROM busybox\nARG foo=arg\nARG FOO=ARG\nENV foo=env FOO=ENV\nRUN echo $", 4, 10);
                assert.strictEqual(items.length, 10);
                assertVariable("FOO", items[0], 4, 9, 1, true, "ENV");
                assertVariable("foo", items[1], 4, 9, 1, true, "env");
                assertVariable("FTP_PROXY", items[2], 4, 9, 1, true);
                assertVariable("ftp_proxy", items[3], 4, 9, 1, true);
                assertVariable("HTTP_PROXY", items[4], 4, 9, 1, true);
                assertVariable("http_proxy", items[5], 4, 9, 1, true);
                assertVariable("HTTPS_PROXY", items[6], 4, 9, 1, true);
                assertVariable("https_proxy", items[7], 4, 9, 1, true);
                assertVariable("NO_PROXY", items[8], 4, 9, 1, true);
                assertVariable("no_proxy", items[9], 4, 9, 1, true);

                items = computePosition("FROM busybox\nARG foo=arg\nARG FOO=ARG\nENV foo=env FOO=ENV\nRUN echo $F", 4, 11);
                assert.strictEqual(items.length, 4);
                assertVariable("FOO", items[0], 4, 9, 2, false, "ENV");
                assertVariable("foo", items[1], 4, 9, 2, false, "env");
                assertVariable("FTP_PROXY", items[2], 4, 9, 2, false);
                assertVariable("ftp_proxy", items[3], 4, 9, 2, false);

                items = computePosition("FROM busybox\nARG foo=arg\nARG FOO=ARG\nENV foo=env FOO=ENV\nRUN echo $f", 4, 11);
                assert.strictEqual(items.length, 4);
                assertVariable("FOO", items[0], 4, 9, 2, false, "ENV");
                assertVariable("foo", items[1], 4, 9, 2, false, "env");
                assertVariable("FTP_PROXY", items[2], 4, 9, 2, false);
                assertVariable("ftp_proxy", items[3], 4, 9, 2, false);

                items = computePosition("FROM busybox\nRUN echo $f\nARG foo=arg\nARG FOO=ARG\nENV foo=env FOO=ENV", 1, 11);
                assert.strictEqual(items.length, 2);
                assertVariable("FTP_PROXY", items[0], 1, 9, 2, false);
                assertVariable("ftp_proxy", items[1], 1, 9, 2, false);

                items = computePosition("FROM busybox\nARG foo=arg\nENV foo=env\nRUN echo $o", 3, 11);
                assert.strictEqual(items.length, 0);
            });

            it("ARG and ENV variables overlap with default", function () {
                let items = computePosition("FROM busybox\nARG ftp_proxy\nENV FTP_PROXY=8001\nRUN echo $f", 3, 11);
                assert.strictEqual(items.length, 2);
                assertVariable("FTP_PROXY", items[0], 3, 9, 2, false, "8001");
                assertVariable("ftp_proxy", items[1], 3, 9, 2, false);
            });

            it("variable from other build stage ignored", function () {
                let items = computePosition("FROM scratch\nENV xyz=y\nFROM alpine\nRUN echo $x", 3, 11);
                assert.strictEqual(items.length, 0);
            });

            it("escaped", function () {
                let items = computePosition("FROM busybox\nRUN echo \\$", 1, 11);
                assert.strictEqual(items.length, 0);
            });

            it("non-existent", function () {
                let items = computePosition("FROM busybox\nRUN echo $x", 1, 11);
                assert.strictEqual(items.length, 0);
            });
        });

        describe("${", function () {
            it("defaults only", function () {
                let items = computePosition("FROM busybox\nRUN echo ${", 1, 11);
                assertDockerVariables(items, 1, 9, 2, true);
            });

            it("prefix", function () {
                let items = computePosition("FROM busybox\nRUN echo ${f", 1, 12);
                assert.strictEqual(items.length, 2);
                assertVariable("FTP_PROXY", items[0], 1, 9, 3, true);
                assertVariable("ftp_proxy", items[1], 1, 9, 3, true);

                items = computePosition("FROM busybox\nRUN echo ${F", 1, 12);
                assert.strictEqual(items.length, 2);
                assertVariable("FTP_PROXY", items[0], 1, 9, 3, true);
                assertVariable("ftp_proxy", items[1], 1, 9, 3, true);
            });

            it("ARG variable", function () {
                let items = computePosition("FROM busybox\nARG foo=bar\nARG FOO=BAR\nRUN echo ${F", 3, 12);
                assert.strictEqual(items.length, 4);
                assertVariable("FOO", items[0], 3, 9, 3, true, "BAR");
                assertVariable("foo", items[1], 3, 9, 3, true, "bar");
                assertVariable("FTP_PROXY", items[2], 3, 9, 3, true);
                assertVariable("ftp_proxy", items[3], 3, 9, 3, true);

                items = computePosition("FROM busybox\nARG foo=bar\nARG FOO=BAR\nRUN echo ${f", 3, 12);
                assert.strictEqual(items.length, 4);
                assertVariable("FOO", items[0], 3, 9, 3, true, "BAR");
                assertVariable("foo", items[1], 3, 9, 3, true, "bar");
                assertVariable("FTP_PROXY", items[2], 3, 9, 3, true);
                assertVariable("ftp_proxy", items[3], 3, 9, 3, true);

                items = computePosition("FROM busybox\nARG foo=bar\nARG foo=bar2\nRUN echo ${f", 3, 12);
                assert.strictEqual(items.length, 3);
                assertVariable("foo", items[0], 3, 9, 3, true, "bar2");
                assertVariable("FTP_PROXY", items[1], 3, 9, 3, true);
                assertVariable("ftp_proxy", items[2], 3, 9, 3, true);

                items = computePosition("FROM busybox\nRUN echo ${f\nARG foo=bar\nARG FOO=BAR", 1, 12);
                assert.strictEqual(items.length, 2);
                assertVariable("FTP_PROXY", items[0], 1, 9, 3, true);
                assertVariable("ftp_proxy", items[1], 1, 9, 3, true);

                items = computePosition("FROM busybox\nARG foo=env\nRUN echo ${o", 2, 12);
                assert.strictEqual(items.length, 0);
            });

            it("ARG variable overlaps with default", function () {
                let items = computePosition("FROM busybox\nARG FTP_PROXY\nRUN echo ${f", 2, 12);
                assert.strictEqual(items.length, 2);
                assertVariable("FTP_PROXY", items[0], 2, 9, 3, true);
                assertVariable("ftp_proxy", items[1], 2, 9, 3, true);
            });

            it("ENV variable", function () {
                let items = computePosition("FROM busybox\nENV foo=bar FOO=BAR\nRUN echo ${F", 2, 12);
                assert.strictEqual(items.length, 4);
                assertVariable("FOO", items[0], 2, 9, 3, true, "BAR");
                assertVariable("foo", items[1], 2, 9, 3, true, "bar");
                assertVariable("FTP_PROXY", items[2], 2, 9, 3, true);
                assertVariable("ftp_proxy", items[3], 2, 9, 3, true);

                items = computePosition("FROM busybox\nENV foo=bar FOO=BAR\nRUN echo ${f", 2, 12);
                assert.strictEqual(items.length, 4);
                assertVariable("FOO", items[0], 2, 9, 3, true, "BAR");
                assertVariable("foo", items[1], 2, 9, 3, true, "bar");
                assertVariable("FTP_PROXY", items[2], 2, 9, 3, true);
                assertVariable("ftp_proxy", items[3], 2, 9, 3, true);

                items = computePosition("FROM busybox\nENV foo=bar\nENV foo=bar2\nRUN echo ${f", 3, 12);
                assert.strictEqual(items.length, 3);
                assertVariable("foo", items[0], 3, 9, 3, true, "bar2");
                assertVariable("FTP_PROXY", items[1], 3, 9, 3, true);
                assertVariable("ftp_proxy", items[2], 3, 9, 3, true);

                items = computePosition("FROM busybox\nRUN echo ${f\nENV foo=bar\nENV FOO=BAR", 1, 12);
                assert.strictEqual(items.length, 2);
                assertVariable("FTP_PROXY", items[0], 1, 9, 3, true);
                assertVariable("ftp_proxy", items[1], 1, 9, 3, true);

                items = computePosition("FROM busybox\nENV foo=env\nRUN echo ${o", 2, 12);
                assert.strictEqual(items.length, 0);
            });

            it("ENV variable overlaps with default", function () {
                let items = computePosition("FROM busybox\nENV FTP_PROXY=8001\nRUN echo ${f", 2, 12);
                assert.strictEqual(items.length, 2);
                assertVariable("FTP_PROXY", items[0], 2, 9, 3, true, "8001");
                assertVariable("ftp_proxy", items[1], 2, 9, 3, true);
            });

            it("ARG and ENV variable", function () {
                let items = computePosition("FROM busybox\nARG foo=arg\nARG FOO=ARG\nENV foo=env FOO=ENV\nRUN echo ${F", 4, 12);
                assert.strictEqual(items.length, 4);
                assertVariable("FOO", items[0], 4, 9, 3, true, "ENV");
                assertVariable("foo", items[1], 4, 9, 3, true, "env");
                assertVariable("FTP_PROXY", items[2], 4, 9, 3, true);
                assertVariable("ftp_proxy", items[3], 4, 9, 3, true);

                items = computePosition("FROM busybox\nARG foo=arg\nARG FOO=ARG\nENV foo=env FOO=ENV\nRUN echo ${f", 4, 12);
                assert.strictEqual(items.length, 4);
                assertVariable("FOO", items[0], 4, 9, 3, true, "ENV");
                assertVariable("foo", items[1], 4, 9, 3, true, "env");
                assertVariable("FTP_PROXY", items[2], 4, 9, 3, true);
                assertVariable("ftp_proxy", items[3], 4, 9, 3, true);

                items = computePosition("FROM busybox\nRUN echo ${f\nARG foo=arg\nARG FOO=ARG\nENV foo=env FOO=ENV", 1, 12);
                assert.strictEqual(items.length, 2);
                assertVariable("FTP_PROXY", items[0], 1, 9, 3, true);
                assertVariable("ftp_proxy", items[1], 1, 9, 3, true);

                items = computePosition("FROM busybox\nARG foo=arg\nENV foo=env\nRUN echo ${o", 3, 12);
                assert.strictEqual(items.length, 0);
            });

            it("ARG and ENV variable overlaps with default", function () {
                let items = computePosition("FROM busybox\nARG ftp_proxy\nENV FTP_PROXY=8001\nRUN echo ${f", 3, 12);
                assert.strictEqual(items.length, 2);
                assertVariable("FTP_PROXY", items[0], 3, 9, 3, true, "8001");
                assertVariable("ftp_proxy", items[1], 3, 9, 3, true);
            });

            it("variable from other build stage ignored", function () {
                let items = computePosition("FROM scratch\nENV xyz=y\nFROM alpine\nRUN echo ${x", 3, 12);
                assert.strictEqual(items.length, 0);
            });

            it("escaped", function () {
                let items = computePosition("FROM busybox\nRUN echo \\${", 1, 12);
                assert.strictEqual(items.length, 0);
            });

            it("non-existent", function () {
                let items = computePosition("FROM busybox\nRUN echo ${x", 1, 12);
                assert.strictEqual(items.length, 0);
            });
        });
    });
});
