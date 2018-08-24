/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import { Position, TextEdit, TextDocumentIdentifier } from 'vscode-languageserver-types';
import { DockerHighlight } from './dockerHighlight';

export class DockerRename {

    public rename(textDocument: TextDocumentIdentifier, content: string, position: Position, newName: string): TextEdit[] {
        const edits: TextEdit[] = [];
        const highlighter = new DockerHighlight();
        const highlightRanges = highlighter.computeHighlightRanges(content, position);
        for (const highlightRange of highlightRanges) {
            edits.push(TextEdit.replace(highlightRange.range, newName));
        }
        return edits;
    }
}
