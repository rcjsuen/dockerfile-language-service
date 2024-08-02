/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import { Range, Position, TextEdit, TextDocumentIdentifier } from 'vscode-languageserver-types';
import { DockerfileParser, Copy, Run } from 'dockerfile-ast';
import { DockerHighlight } from './dockerHighlight';
import { Util } from './docker';

export class DockerRename {

    public prepareRename(content: string, position: Position): Range | null {
        let dockerfile = DockerfileParser.parse(content);
        let image = dockerfile.getContainingImage(position);
        for (let instruction of dockerfile.getCOPYs()) {
            let flag = instruction.getFromFlag();
            if (flag) {
                let range = flag.getValueRange();
                if (Util.isInsideRange(position, range)) {
                    return range;
                }
            }
        }

        for (let from of image.getFROMs()) {
            if (Util.isInsideRange(position, from.getBuildStageRange())) {
                return from.getBuildStageRange();
            }
        }

        for (let env of image.getENVs()) {
            for (let property of env.getProperties()) {
                if (Util.isInsideRange(position, property.getNameRange())) {
                    return property.getNameRange();
                }
            }
        }

        for (let arg of image.getARGs()) {
            let property = arg.getProperty();
            if (property !== null && Util.isInsideRange(position, property.getNameRange())) {
                return property.getNameRange();
            }
        }

        for (let instruction of image.getInstructions()) {
            for (let variable of instruction.getVariables()) {
                if (Util.isInsideRange(position, variable.getNameRange())) {
                    return variable.getNameRange();
                }
            }

            if (instruction instanceof Copy || instruction instanceof Run) {
                for (const heredoc of instruction.getHeredocs()) {
                    let range = heredoc.getNameRange();
                    if (Util.isInsideRange(position, range)) {
                        return range;
                    }

                    range = heredoc.getDelimiterRange();
                    if (Util.isInsideRange(position, range)) {
                        return range;
                    }
                }
            }
        }
        return null;
    }

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
