/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import { Position, Range, Location, TextDocumentIdentifier } from 'vscode-languageserver-types';
import { Util } from './docker';
import {
    DockerfileParser, Dockerfile, ImageTemplate,
    Arg, Env, Heredoc, Property, Copy, Run
} from 'dockerfile-ast';

export class DockerDefinition {

    private computeBuildStageDefinition(dockerfile: Dockerfile, position: Position): Range | null {
        let source = undefined;
        for (let instruction of dockerfile.getCOPYs()) {
            let flag = instruction.getFromFlag();
            if (flag) {
                let range = flag.getValueRange();
                if (range && range.start.line === position.line && range.start.character <= position.character && position.character <= range.end.character) {
                    source = flag.getValue();
                    break;
                }
            }
        }

        for (let instruction of dockerfile.getFROMs()) {
            let range = instruction.getBuildStageRange();
            if (range) {
                if (range.start.line === position.line && range.start.character <= position.character && position.character <= range.end.character) {
                    // cursor in FROM's build stage itself
                    return range;
                } else if (source !== undefined && instruction.getBuildStage().toLowerCase() === source.toLowerCase()) {
                    // FROM's build stage matches what's in COPY
                    return range;
                }
            }

            range = instruction.getImageNameRange();
            if (Util.isInsideRange(position, range)) {
                const stageName = instruction.getImageName();
                for (const from of dockerfile.getFROMs()) {
                    if (stageName === from.getBuildStage() && from.getRange().start.line < range.start.line) {
                        return from.getBuildStageRange();
                    }
                }
                return null;
            }
        }
        return null;
    }

    private static computeVariableDefinition(image: ImageTemplate, position: Position): Property {
        let variableName = null;
        for (let arg of image.getARGs()) {
            let property = arg.getProperty();
            // might be an ARG with no arguments
            if (property) {
                // is the caret inside the definition itself
                if (Util.isInsideRange(position, property.getNameRange())) {
                    variableName = property.getName();
                    break;
                }
            }
        }

        if (variableName === null) {
            variableCheck: for (let env of image.getENVs()) {
                let properties = env.getProperties();
                for (let property of properties) {
                    // is the caret inside the definition itself
                    if (Util.isInsideRange(position, property.getNameRange())) {
                        variableName = property.getName();
                        break variableCheck;
                    }
                }
            }
        }

        if (variableName === null) {
            variableCheck: for (let instruction of image.getInstructions()) {
                for (let variable of instruction.getVariables()) {
                    if (Util.isInsideRange(position, variable.getNameRange())) {
                        variableName = variable.getName();
                        break variableCheck;
                    }
                }
            }
        }

        for (let instruction of image.getInstructions()) {
            if (instruction instanceof Arg) {
                let property = instruction.getProperty();
                // might be an ARG with no arguments
                if (property && property.getName() === variableName) {
                    return property;
                }
            } else if (instruction instanceof Env) {
                let properties = instruction.getProperties();
                for (let property of properties) {
                    if (property.getName() === variableName) {
                        return property;
                    }
                }
            }
        }
        return null;
    }

    public static findDefinition(dockerfile: Dockerfile, position: Position): Property {
        for (const from of dockerfile.getFROMs()) {
            for (const variable of from.getVariables()) {
                if (Util.isInsideRange(position, variable.getNameRange())) {
                    for (const arg of dockerfile.getInitialARGs()) {
                        const property = arg.getProperty();
                        if (property && property.getName() === variable.getName()) {
                            return property;
                        }
                    }
                    return null;
                }
            }
        }
        let image = dockerfile.getContainingImage(position);
        return DockerDefinition.computeVariableDefinition(image, position);
    }

    private static checkHeredocs(heredocs: Heredoc[], position: Position): Range | null {
        for (const heredoc of heredocs) {
            const nameRange = heredoc.getNameRange();
            if (Util.isInsideRange(position, nameRange)) {
                return Util.isEmpty(nameRange) ? null : nameRange;
            }
            const delimiterRange = heredoc.getDelimiterRange();
            if (delimiterRange !== null && Util.isInsideRange(position, delimiterRange)) {
                return nameRange;
            }
        }
        return null;
    }

    private static computeHeredocDefinition(dockerfile: Dockerfile, position: Position): Range | null {
        for (const instruction of dockerfile.getInstructions()) {
            if (instruction instanceof Copy) {
                const range = DockerDefinition.checkHeredocs(instruction.getHeredocs(), position);
                if (range !== null) {
                    return range;
                }
            } else if (instruction instanceof Run) {
                const range = DockerDefinition.checkHeredocs(instruction.getHeredocs(), position);
                if (range !== null) {
                    return range;
                }
            }
        }
        return null;
    }

    private computeVariableDefinition(dockerfile: Dockerfile, position: Position): Range | null {
        const property = DockerDefinition.findDefinition(dockerfile, position);
        return property ? property.getNameRange() : null;
    }

    public computeDefinitionRange(content: string, position: Position): Range | null {
        let dockerfile = DockerfileParser.parse(content);
        let range = this.computeBuildStageDefinition(dockerfile, position);
        if (range === null) {
            range = this.computeVariableDefinition(dockerfile, position);
            if (range === null) {
                return DockerDefinition.computeHeredocDefinition(dockerfile, position);
            }
        }
        return range;
    }

    public computeDefinition(textDocument: TextDocumentIdentifier, content: string, position: Position): Location | null {
        const range = this.computeDefinitionRange(content, position);
        if (range !== null) {
            return Location.create(textDocument.uri, range);
        }
        return null;
    }
}
