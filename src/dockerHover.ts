/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import { TextDocument, Hover, Position } from 'vscode-languageserver-types';
import { DockerfileParser, Arg, Env, Instruction, ModifiableInstruction, Onbuild, Directive } from 'dockerfile-ast';
import { Util } from './docker';
import { MarkdownDocumentation } from './dockerMarkdown';
import { DockerDefinition } from './dockerDefinition';

export class DockerHover {

    private markdown: MarkdownDocumentation;

    constructor(markdown: MarkdownDocumentation) {
        this.markdown = markdown;
    }

    onHover(content: string, position: Position): Hover | null {
        let dockerfile = DockerfileParser.parse(content);
        let directive = dockerfile.getDirective();
        let image = dockerfile.getContainingImage(position);

        if (position.line === 0 && directive !== null && directive.getDirective() === Directive.escape) {
            let range = directive.getNameRange();
            if (Util.isInsideRange(position, range)) {
                return this.markdown.getMarkdown(Directive.escape);
            }
        }

        for (let instruction of image.getInstructions()) {
            for (let variable of instruction.getVariables()) {
                // are we hovering over a variable
                if (Util.isInsideRange(position, variable.getNameRange())) {
                    let resolved = image.resolveVariable(variable.getName(), variable.getNameRange().start.line);
                    if (resolved || resolved === "") {
                        return { contents: resolved };
                    } else if (resolved === null) {
                        return null;
                    }
                }
            }
        }

        for (let instruction of image.getInstructions()) {
            let instructionRange = instruction.getInstructionRange();
            if (Util.isInsideRange(position, instructionRange)) {
                return this.markdown.getMarkdown(instruction.getKeyword());
            }

            if (instruction instanceof Onbuild) {
                // hovering over a trigger instruction of an ONBUILD
                let range = instruction.getTriggerRange();
                if (Util.isInsideRange(position, range)) {
                    return this.markdown.getMarkdown(instruction.getTrigger());
                }
            }

            if (instruction instanceof Arg) {
                // hovering over an argument defined by ARG
                let property = instruction.getProperty();
                if (property && Util.isInsideRange(position, property.getNameRange()) && property.getValue() !== null) {
                    return {
                        contents: property.getValue()
                    };
                }
            }

            if (instruction instanceof Env) {
                // hovering over an argument defined by ENV
                for (let property of instruction.getProperties()) {
                    if (Util.isInsideRange(position, property.getNameRange()) && property.getValue() !== null) {
                        return {
                            contents: property.getValue()
                        };
                    }
                }
            }

            let hover = this.getFlagsHover(position, instruction);
            if (hover !== undefined) {
                return hover;
            }
        }

        let property = DockerDefinition.findDefinition(dockerfile, position);
        if (property && property.getValue() !== null) {
            return { contents: property.getValue() };
        }

        return null;
    }

    private getFlagsHover(position: Position, instruction: Instruction): Hover {
        switch (instruction.getKeyword()) {
            case "ADD":
                let addFlags = (instruction as ModifiableInstruction).getFlags();
                for (let flag of addFlags) {
                    if (Util.isInsideRange(position, flag.getNameRange())) {
                        switch (flag.getName()) {
                            case "chown":
                                return this.markdown.getMarkdown("ADD_FlagChown");
                        }
                    }
                }
                break;
            case "COPY":
                let copyFlags = (instruction as ModifiableInstruction).getFlags();
                for (let flag of copyFlags) {
                    if (Util.isInsideRange(position, flag.getNameRange())) {
                        switch (flag.getName()) {
                            case "chown":
                                return this.markdown.getMarkdown("COPY_FlagChown");
                            case "from":
                                return this.markdown.getMarkdown("COPY_FlagFrom");
                        }
                    }
                }
                break;
            case "HEALTHCHECK":
                let flags = (instruction as ModifiableInstruction).getFlags();
                for (let flag of flags) {
                    if (Util.isInsideRange(position, flag.getNameRange())) {
                        switch (flag.getName()) {
                            case "interval":
                                return this.markdown.getMarkdown("HEALTHCHECK_FlagInterval");
                            case "retries":
                                return this.markdown.getMarkdown("HEALTHCHECK_FlagRetries");
                            case "start-period":
                                return this.markdown.getMarkdown("HEALTHCHECK_FlagStartPeriod");
                            case "timeout":
                                return this.markdown.getMarkdown("HEALTHCHECK_FlagTimeout");
                        }
                        return null;
                    }
                }
                break;
            case "ONBUILD":
                let trigger = (instruction as Onbuild).getTriggerInstruction();
                if (trigger !== null) {
                    return this.getFlagsHover(position, trigger);
                }
                break;
        }
        return undefined;
    }
}
