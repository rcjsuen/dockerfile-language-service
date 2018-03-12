/* --------------------------------------------------------------------------------------------
* Copyright (c) Remy Suen. All rights reserved.
* Licensed under the MIT License. See License.txt in the project root for license information.
* ------------------------------------------------------------------------------------------ */
'use strict';

import { CompletionItem, MarkupKind } from 'vscode-languageserver-types';
import { MarkdownDocumentation } from './dockerMarkdown';
import { PlainTextDocumentation } from './dockerPlainText';

export class DockerCompletion {

    private dockerMarkdown = new MarkdownDocumentation();
    private dockerPlainText = new PlainTextDocumentation();

    public resolveCompletionItem(item: CompletionItem, documentationFormat?: MarkupKind[]): CompletionItem {
        if (!item.documentation && item.data) {
            if (documentationFormat === undefined || documentationFormat === null) {
                item.documentation = this.dockerPlainText.getDocumentation(item.data);
            } else {
                for (let format of documentationFormat) {
                    if (format === MarkupKind.PlainText) {
                        item.documentation = {
                            kind: MarkupKind.PlainText,
                            value: this.dockerPlainText.getDocumentation(item.data)
                        };
                        return item;
                    } else if (format === MarkupKind.Markdown) {
                        item.documentation = {
                            kind: MarkupKind.Markdown,
                            value: this.dockerMarkdown.getMarkdown(item.data).contents as string
                        };
                        return item;
                    }
                }
                // no known format detected, just use plain text then
                item.documentation = this.dockerPlainText.getDocumentation(item.data);
            }
        }
        return item;
    }
}
