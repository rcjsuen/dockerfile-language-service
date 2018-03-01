/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import {
    TextDocument, Position, DocumentHighlight, DocumentHighlightKind, TextDocumentIdentifier
} from 'vscode-languageserver-types';
import { DockerfileParser, From } from 'dockerfile-ast';
import { DockerDefinition } from './dockerDefinition';
import { Util } from './docker';

export class DockerHighlight {

    public computeHighlightRanges(content: string, position: Position): DocumentHighlight[] {
        let dockerfile = DockerfileParser.parse(content);
        let provider = new DockerDefinition();
        const definitionRange = provider.computeDefinitionRange(content, position);
        let image = definitionRange === null ? dockerfile.getContainingImage(position) : dockerfile.getContainingImage(definitionRange.start);
        const highlights: DocumentHighlight[] = [];
        if (definitionRange === null) {
            for (let instruction of dockerfile.getCOPYs()) {
                let flag = instruction.getFromFlag();
                if (flag) {
                    let range = flag.getValueRange();
                    if (range && range.start.line === position.line && range.start.character <= position.character && position.character <= range.end.character) {
                        let stage = flag.getValue();

                        for (let other of dockerfile.getCOPYs()) {
                            let otherFlag = other.getFromFlag();
                            if (otherFlag && otherFlag.getValue() === stage) {
                                highlights.push(DocumentHighlight.create(otherFlag.getValueRange(), DocumentHighlightKind.Read));
                            }
                        }
                        return highlights;
                    }
                }
            }

            for (const from of dockerfile.getFROMs()) {
                for (const variable of from.getVariables()) {
                    if (Util.isInsideRange(position, variable.getNameRange())) {
                        const name = variable.getName();
                        for (const loopFrom of dockerfile.getFROMs()) {
                            for (const fromVariable of loopFrom.getVariables()) {
                                if (fromVariable.getName() === name) {
                                    highlights.push(DocumentHighlight.create(fromVariable.getNameRange(), DocumentHighlightKind.Read));
                                }
                            }
                        }
                        return highlights;
                    }
                }
            }

            for (let instruction of image.getInstructions()) {
                for (let variable of instruction.getVariables()) {
                    if (Util.isInsideRange(position, variable.getNameRange())) {
                        let name = variable.getName();

                        for (let instruction of image.getInstructions()) {
                            if (!(instruction instanceof From)) {
                                for (let variable of instruction.getVariables()) {
                                    if (variable.getName() === name) {
                                        highlights.push(DocumentHighlight.create(variable.getNameRange(), DocumentHighlightKind.Read));
                                    }
                                }
                            }
                        }
                        return highlights;
                    }
                }
            }
        } else {
            let document = TextDocument.create("", "", 0, content);
            let definition = document.getText().substring(document.offsetAt(definitionRange.start), document.offsetAt(definitionRange.end));
            for (let from of dockerfile.getFROMs()) {
                let range = from.getBuildStageRange();
                if (range && range.start.line === definitionRange.start.line) {
                    highlights.push(DocumentHighlight.create(definitionRange, DocumentHighlightKind.Write));
                    for (let instruction of dockerfile.getCOPYs()) {
                        let flag = instruction.getFromFlag();
                        if (flag) {
                            if (flag.getValue() === definition) {
                                highlights.push(DocumentHighlight.create(flag.getValueRange(), DocumentHighlightKind.Read));
                            }
                        }
                    }
                    return highlights;
                }
            }

            for (let arg of image.getARGs()) {
                let property = arg.getProperty();
                // property may be null if it's an ARG with no arguments
                if (property && property.getName() === definition) {
                    highlights.push(DocumentHighlight.create(property.getNameRange(), DocumentHighlightKind.Write));
                }
            }

            for (let env of image.getENVs()) {
                for (let property of env.getProperties()) {
                    if (property.getName() === definition) {
                        highlights.push(DocumentHighlight.create(property.getNameRange(), DocumentHighlightKind.Write));
                    }
                }
            }

            for (let instruction of image.getInstructions()) {
                // only highlight variables in non-FROM instructions
                if (!(instruction instanceof From)) {
                    for (const variable of instruction.getVariables()) {
                        if (variable.getName() === definition) {
                            highlights.push(DocumentHighlight.create(variable.getNameRange(), DocumentHighlightKind.Read));
                        }
                    }
                }
            }

            for (const arg of dockerfile.getInitialARGs()) {
                const property = arg.getProperty();
                if (property && Util.rangeEquals(property.getNameRange(), definitionRange)) {
                    for (const from of dockerfile.getFROMs()) {
                        for (const variable of from.getVariables()) {
                            if (variable.getName() === definition) {
                                highlights.push(DocumentHighlight.create(variable.getNameRange(), DocumentHighlightKind.Read));
                            }
                        }
                    }
                }
            }
        }

        return highlights;
    }
}
