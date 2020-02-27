/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import { Hover, Position, MarkupKind } from 'vscode-languageserver-types';
import { DockerfileParser, Dockerfile, Arg, Env, Instruction, ModifiableInstruction, Onbuild, Directive } from 'dockerfile-ast';
import { Util } from './docker';
import { MarkdownDocumentation } from './dockerMarkdown';
import { DockerDefinition } from './dockerDefinition';
import { PlainTextDocumentation } from './dockerPlainText';

export class DockerHover {

    private markdown: MarkdownDocumentation;
    private plainText: PlainTextDocumentation;

    constructor(markdown: MarkdownDocumentation, plainText: PlainTextDocumentation) {
        this.markdown = markdown;
        this.plainText = plainText;
    }

    public onHover(content: string, position: Position, markupKind: MarkupKind[]): Hover | null {
        let dockerfile = DockerfileParser.parse(content);
        let image = dockerfile.getContainingImage(position);
        if (!image) {
            // position is invalid, not inside the Dockerfile
            return null;
        }

        let key = this.computeHoverKey(dockerfile, position);
        if (key) {
            // if it's not a raw value, apply markup if necessary
            if (markupKind && markupKind.length > 0) {
                switch (markupKind[0]) {
                    case MarkupKind.Markdown:
                        let markdownDocumentation = this.markdown.getMarkdown(key);
                        if (markdownDocumentation) {
                            return {
                                contents: {
                                    kind: MarkupKind.Markdown,
                                    value: markdownDocumentation.contents as string
                                }
                            };
                        }
                        return null;
                    case MarkupKind.PlainText:
                        let plainTextDocumentation = this.plainText.getDocumentation(key);
                        if (plainTextDocumentation) {
                            return {
                                contents: {
                                    kind: MarkupKind.PlainText,
                                    value: plainTextDocumentation
                                }
                            };
                        }
                }
                return null;
            }
            return this.markdown.getMarkdown(key);
        }

        for (let instruction of image.getInstructions()) {
            if (instruction instanceof Arg) {
                // hovering over an argument defined by ARG
                let property = instruction.getProperty();
                if (property && Util.isInsideRange(position, property.getNameRange()) && property.getValue() !== null) {
                    return { contents: property.getValue() };
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
        }

        for (let instruction of image.getInstructions()) {
            for (let variable of instruction.getVariables()) {
                // are we hovering over a variable
                if (Util.isInsideRange(position, variable.getNameRange())) {
                    let resolved = dockerfile.resolveVariable(variable.getName(), variable.getNameRange().start.line);
                    if (resolved || resolved === "") {
                        return { contents: resolved };
                    } else if (resolved === null) {
                        return null;
                    }
                }
            }
        }

        return null;
    }

    /**
     * Analyzes the Dockerfile at the given position to determine if the user
     * is hovering over a keyword, a flag, or a directive.
     * 
     * @param dockerfile the Dockerfile to check
     * @param position the place that the user is hovering over
     * @return the string key value for the keyword, flag, or directive that's
     *         being hovered over, or null if the user isn't hovering over
     *         such a word
     */
    private computeHoverKey(dockerfile: Dockerfile, position: Position): string | null {
        for (const directive of dockerfile.getDirectives()) {
            const range = directive.getNameRange();
            switch (directive.getDirective()) {
                case Directive.escape:
                    if (Util.isInsideRange(position, range)) {
                        return Directive.escape;
                    }
                    break;
                case Directive.syntax:
                    if (Util.isInsideRange(position, range)) {
                        return Directive.syntax;
                    }
                    break;
            }
        }

        const image = dockerfile.getContainingImage(position);
        for (let instruction of image.getInstructions()) {
            let instructionRange = instruction.getInstructionRange();
            if (Util.isInsideRange(position, instructionRange)) {
                return instruction.getKeyword();
            }

            if (instruction instanceof Onbuild) {
                // hovering over a trigger instruction of an ONBUILD
                let range = instruction.getTriggerRange();
                if (Util.isInsideRange(position, range)) {
                    return instruction.getTrigger();
                }
            }

            let hover = this.getFlagsHover(position, instruction);
            if (hover !== null) {
                return hover;
            }
        }

        return null;
    }

    private getFlagsHover(position: Position, instruction: Instruction): string | null {
        switch (instruction.getKeyword()) {
            case "ADD":
                let addFlags = (instruction as ModifiableInstruction).getFlags();
                for (let flag of addFlags) {
                    if (Util.isInsideRange(position, flag.getNameRange())) {
                        switch (flag.getName()) {
                            case "chown":
                                return "ADD_FlagChown";
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
                                return "COPY_FlagChown";
                            case "from":
                                return "COPY_FlagFrom";
                        }
                    }
                }
                break;
            case "FROM":
                const fromFlags = (instruction as ModifiableInstruction).getFlags();
                for (const flag of fromFlags) {
                    if (Util.isInsideRange(position, flag.getNameRange())) {
                        if (flag.getName() === "platform") {
                            return "FROM_FlagPlatform";
                        }
                        return null;
                    }
                }
                break;
            case "HEALTHCHECK":
                let flags = (instruction as ModifiableInstruction).getFlags();
                for (let flag of flags) {
                    if (Util.isInsideRange(position, flag.getNameRange())) {
                        switch (flag.getName()) {
                            case "interval":
                                return "HEALTHCHECK_FlagInterval";
                            case "retries":
                                return "HEALTHCHECK_FlagRetries";
                            case "start-period":
                                return "HEALTHCHECK_FlagStartPeriod";
                            case "timeout":
                                return "HEALTHCHECK_FlagTimeout";
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
        return null;
    }
}
