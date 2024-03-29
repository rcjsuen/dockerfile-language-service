/* --------------------------------------------------------------------------------------------
* Copyright (c) Remy Suen. All rights reserved.
* Licensed under the MIT License. See License.txt in the project root for license information.
* ------------------------------------------------------------------------------------------ */
'use strict';

import { TextDocument } from 'vscode-languageserver-textdocument'; 
import {
    TextEdit, Range, Position,
    CompletionItem, CompletionItemKind, CompletionItemTag, InsertTextFormat
} from 'vscode-languageserver-types';
import { Util, KEYWORDS } from './docker';
import { DockerRegistryClient } from './dockerRegistryClient';
import {
    DockerfileParser, Dockerfile,
    Copy, From, Healthcheck, Onbuild,
    ModifiableInstruction, Directive, DefaultVariables, Argument, Flag
} from 'dockerfile-ast';
import { CompletionItemCapabilities } from './main';

interface Prefix {

    content: string;
    offset: number;
}

export class DockerAssist {

    private snippetSupport: boolean;
    private deprecatedSupport: boolean;
    private supportedTags: CompletionItemTag[];
    private document: TextDocument;

    /**
     * The client for communicating with a Docker registry.
     */
    private dockerRegistryClient: DockerRegistryClient;

    /**
     * Creates a content assist processor for suggesting completion items related to a Dockerfile.
     * 
     * @param document the text document to provide suggestions for
     * @param dockerRegistryClient the client for communicating with a Docker registry
     * @param completionItemCapabilities the capabilities that should be set for the returned items
     */
    constructor(document: TextDocument, dockerRegistryClient: DockerRegistryClient, completionItemCapabilities: CompletionItemCapabilities) {
        this.document = document;
        this.dockerRegistryClient = dockerRegistryClient;
        this.deprecatedSupport = completionItemCapabilities && completionItemCapabilities.deprecatedSupport;
        this.snippetSupport = completionItemCapabilities && completionItemCapabilities.snippetSupport;
        this.supportedTags = completionItemCapabilities && completionItemCapabilities.tagSupport && completionItemCapabilities.tagSupport.valueSet;
    }

    public computeProposals(position: Position): CompletionItem[] | PromiseLike<CompletionItem[]> {
        let buffer = this.document.getText();
        let offset = this.document.offsetAt(position);
        let dockerfile = DockerfileParser.parse(buffer);
        let escapeCharacter = dockerfile.getEscapeCharacter();

        let lastDirectiveLine = -1;
        for (const directive of dockerfile.getDirectives()) {
            const range = directive.getNameRange();
            lastDirectiveLine = range.start.line;
            if (position.line === lastDirectiveLine) {
                if (position.character <= range.start.character) {
                    // in whitespace before the directive's name
                    return [
                        this.createEscape(0, offset, Directive.escape),
                        this.createSyntax(0, offset, Directive.syntax)
                    ];
                } else if (position.character <= range.end.character) {
                    // in the name
                    let prefix = directive.getName().substring(0, position.character - range.start.character);
                    prefix = prefix.toLowerCase();
                    if (Directive.escape.indexOf(prefix) === 0) {
                        return [this.createEscape(prefix.length, offset, Directive.escape)];
                    } else if (Directive.syntax.indexOf(prefix) === 0) {
                        return [this.createSyntax(prefix.length, offset, Directive.syntax)];
                    }
                }
                return [];
            }
        }

        // directive only possible on the first line
        let comments = dockerfile.getComments();
        if (comments.length !== 0) {
            if (position.line === lastDirectiveLine + 1) {
                let commentRange = comments[0].getRange();
                // check if the first comment is on the first line
                if (commentRange.start.line === position.line) {
                    // is the user inside the comment
                    if (commentRange.start.character < position.character) {
                        let range = comments[0].getContentRange();
                        if (range === null || position.character <= range.start.character) {
                            // in whitespace
                            return [
                                this.createEscape(0, offset, Directive.escape),
                                this.createSyntax(0, offset, Directive.syntax),
                            ];
                        }
                        let comment = comments[0].getContent();
                        if (position.character <= range.end.character) {
                            // within the content
                            let prefix = comment.substring(0, position.character - range.start.character);
                            // substring check
                            if (Directive.escape.indexOf(prefix.toLowerCase()) === 0) {
                                return [this.createEscape(prefix.length, offset, Directive.escape)];
                            } else if (Directive.syntax.indexOf(prefix.toLowerCase()) === 0) {
                                return [this.createSyntax(prefix.length, offset, Directive.syntax)];
                            }
                        }
                        return [];
                    }
                }
            } else {
                for (let comment of comments) {
                    let range = comment.getRange();
                    if (range.start.line === position.line) {
                        if (range.start.character < position.character && position.character <= range.end.character) {
                            // inside a comment
                            return [];
                        }
                    }
                }
            }
        }

        let prefix = this.calculateTruePrefix(dockerfile, buffer, offset, escapeCharacter);
        if (prefix.content !== "") {
            let index = prefix.content.lastIndexOf('$');
            // $ exists so we're at a variable
            if (index !== -1) {
                // check that the variable $ wasn't escaped
                if (prefix.content.charAt(index - 1) !== '\\') {
                    // get the variable's prefix thus far
                    var variablePrefix = prefix.content.substring(index + 1).toLowerCase();
                    let prefixLength = variablePrefix.length + 1;
                    const items: CompletionItem[] = [];
                    if (variablePrefix === "") {
                        // empty prefix, return all variables
                        for (let variable of dockerfile.getAvailableVariables(position.line)) {
                            let doc = dockerfile.resolveVariable(variable, position.line);
                            items.push(this.createVariableCompletionItem(variable, prefixLength, offset, true, doc));
                        }

                        for (let variable of DefaultVariables) {
                            let doc = dockerfile.resolveVariable(variable, position.line);
                            items.push(this.createVariableCompletionItem(variable, prefixLength, offset, true, doc));
                        }
                    } else {
                        let brace = false;
                        if (variablePrefix.charAt(0) === '{') {
                            brace = true;
                            variablePrefix = variablePrefix.substring(1);
                        }

                        // merge list of available variables with the defaults
                        let variables = dockerfile.getAvailableVariables(position.line);
                        for (let variable of DefaultVariables) {
                            if (variables.indexOf(variable) === -1) {
                                variables.push(variable);
                            }
                        }

                        for (let variable of variables) {
                            if (variable.toLowerCase().indexOf(variablePrefix) === 0) {
                                let doc = dockerfile.resolveVariable(variable, position.line);
                                items.push(this.createVariableCompletionItem(variable, prefixLength, offset, brace, doc));
                            }
                        }
                    }

                    items.sort((a: CompletionItem, b: CompletionItem) => {
                        if (a.label.toLowerCase() === b.label.toLowerCase()) {
                            // put uppercase variables first
                            return a.label.localeCompare(b.label) * -1;
                        }
                        return a.label.localeCompare(b.label);
                    });
                    return items;
                }
            }
        }
        let previousWord = "";

        instructionsCheck: for (let instruction of dockerfile.getInstructions()) {
            if (Util.isInsideRange(position, instruction.getInstructionRange()) || prefix.content === instruction.getKeyword()) {
                break;
            } else if (Util.isInsideRange(position, instruction.getRange())) {
                switch (instruction.getKeyword()) {
                    case "ADD":
                        return this.createAddProposals(dockerfile, instruction as ModifiableInstruction, position, offset, prefix.content);
                    case "COPY":
                        return this.createCopyProposals(dockerfile, instruction as Copy, position, offset, prefix.content);
                    case "FROM":
                        return this.createFromProposals(instruction as From, position, offset, prefix.content);
                    case "HEALTHCHECK":
                        let subcommand = (instruction as Healthcheck).getSubcommand();
                        if (subcommand && subcommand.isBefore(position)) {
                            return [];
                        }
                        return this.createHealthcheckProposals(offset, prefix.content);
                    case "ONBUILD":
                        let onbuildArgs = instruction.getArguments();
                        if (onbuildArgs.length === 0 || Util.isInsideRange(position, onbuildArgs[0].getRange())) {
                            // no trigger instructions or the cursor is in the trigger instruction
                            previousWord = "ONBUILD";
                            break instructionsCheck;
                        } else {
                            let trigger = (instruction as Onbuild).getTriggerInstruction();
                            switch (trigger.getKeyword()) {
                                case "ADD":
                                    return this.createAddProposals(dockerfile, trigger as ModifiableInstruction, position, offset, prefix.content);
                                case "COPY":
                                    return this.createCopyProposals(dockerfile, trigger as Copy, position, offset, prefix.content);
                                case "HEALTHCHECK":
                                    let subcommand = (trigger as Healthcheck).getSubcommand();
                                    if (subcommand && subcommand.isBefore(position)) {
                                        return [];
                                    }
                                    return this.createHealthcheckProposals(offset, prefix.content);
                            }
                        }
                        return [];
                    default:
                        return [];
                }
            }
        }

        if (prefix.content === "") {
            if (dockerfile.getInstructions().length === 0) {
                // if we don't have any instructions, only suggest FROM
                return [this.createFROM(0, offset, "FROM")];
            }
            // no prefix, return all the proposals
            return this.createProposals(KEYWORDS, previousWord, 0, offset);
        }

        const suggestions: string[] = [];
        var uppercasePrefix = prefix.content.toUpperCase();
        for (let i = 0; i < KEYWORDS.length; i++) {
            if (KEYWORDS[i] === uppercasePrefix) {
                // prefix is a keyword already, nothing to suggest
                return [];
            } else if (KEYWORDS[i].indexOf(uppercasePrefix) === 0) {
                suggestions.push(KEYWORDS[i]);
            }
        }

        if (suggestions.length === 0) {
            // prefix doesn't match any keywords, nothing to suggest
            return [];
        }

        return this.createProposals(suggestions, previousWord, offset - prefix.offset, offset);
    }

    createProposals(keywords: string[], previousWord: string, prefixLength: number, offset: number): CompletionItem[] {
        let proposals: CompletionItem[] = [];
        for (var i = 0; i < keywords.length; i++) {
            switch (keywords[i]) {
                case "ARG":
                    if (this.snippetSupport) {
                        proposals.push(this.createARG_NameOnly(prefixLength, offset));
                        proposals.push(this.createARG_DefaultValue(prefixLength, offset));
                    } else {
                        proposals.push(this.createARG(prefixLength, offset));
                    }
                    break;
                case "HEALTHCHECK":
                    proposals.push(this.createHEALTHCHECK_CMD(prefixLength, offset));
                    proposals.push(this.createHEALTHCHECK_NONE(prefixLength, offset));
                    break;
                case "FROM":
                case "MAINTAINER":
                case "ONBUILD":
                    // can't have FROM, MAINTAINER, or ONBUILD follow an ONBUILD
                    if (previousWord) {
                        break;
                    }
                default:
                    proposals.push(this.createSingleProposals(keywords[i], prefixLength, offset));
                    break;
            }
        }
        return proposals;
    }

    private createAddProposals(dockerfile: Dockerfile, add: ModifiableInstruction, position: Position, offset: number, prefix: string) {
        const fnMap = new Map<string, Function>();
        fnMap.set("chown", this.createADD_FlagChown.bind(this));
        const args = add.getArguments();
        const flagProposals = this.createFlagProposals(add.getFlags(), args, position, offset, prefix, fnMap);
        if (flagProposals !== null) {
            return flagProposals;
        }

        return this.createTargetFolderProposals(dockerfile, args, position, offset, prefix);
    }

    private createOtherFlagProposals(flagProposalsMap: Map<string, Function>, allProposals: CompletionItem[], skipList: string[], prefixLength: number, offset: number): CompletionItem[] {
        if (skipList.length === 0) {
            // have nothing, return everything
            return allProposals;
        }
        if (skipList.length === flagProposalsMap.size) {
            // have everything, return nothing
            return [];
        }
        const flagProposals = [];
        flagProposalsMap.forEach((_, key) => {
            if (skipList.indexOf(key) === -1) {
                flagProposals.push(key);
            }
        });
        return flagProposals.map(flag => {
            const func = flagProposalsMap.get(flag);
            return func(prefixLength, offset);
        });
    }

    private createFlagProposals(
        flags: Flag[],
        args: Argument[],
        position: Position,
        offset: number,
        prefix: string,
        flagProposalsMap: Map<string, Function>
    ): CompletionItem[] | null {
        const allProposals = [];
        flagProposalsMap.forEach((createFlagProposalItem) => {
            allProposals.push(createFlagProposalItem(prefix.length, offset));
        });
        let promptFlags = true;
        if (args.length > 0 && Util.positionBefore(args[0].getRange().start, this.document.positionAt(offset))) {
            // current position is not before the first argument, don't prompt flags
            promptFlags = false;
        }
        const skipList = [];
        let insideFlag = false;
        for (const flag of flags) {
            const name = flag.getName();
            if (flagProposalsMap.has(name)) {
                skipList.push(name);
            }
            if (Util.isInsideRange(position, flag.getRange())) {
                insideFlag = true;
            }
        }
        if (insideFlag) {
            if (prefix === "--") {
                return this.createOtherFlagProposals(flagProposalsMap, allProposals, skipList, prefix.length, offset);
            }
            let item = null;
            flagProposalsMap.forEach((fn, flagName) => {
                if (`--${flagName}=`.indexOf(prefix) === 0) {
                    item = fn(prefix.length, offset);
                }
            });
            if (item !== null) {
                return [item];
            }
        }
        if (promptFlags || (args.length > 0 && Util.isInsideRange(position, args[0].getRange()) && prefix === "-")) {
            return this.createOtherFlagProposals(flagProposalsMap, allProposals, skipList, prefix.length, offset);
        }
        return null;
    }

    private createCopyProposals(dockerfile: Dockerfile, copy: Copy, position: Position, offset: number, prefix: string) {
        let flag = copy.getFromFlag();
        // is the user in the --from= area
        if (flag && Util.isInsideRange(position, flag.getValueRange())) {
            const names: { [key: string]: boolean; } = {};
            const items: CompletionItem[] = [];
            let stageIndex = 0;
            // determines if the last build stage was named or not
            let lastNumber = false;
            // get the prefix
            let stagePrefix = this.document.getText().substring(this.document.offsetAt(flag.getValueRange().start), offset).toLowerCase();
            for (let from of dockerfile.getFROMs()) {
                if (copy.isAfter(from)) {
                    const image = from.getImage();
                    let stage = from.getBuildStage();
                    if (stage) {
                        const lowercase = stage.toLowerCase();
                        if (lowercase.indexOf(stagePrefix) === 0 && !names[lowercase]) {
                            names[lowercase] = true;
                            items.push(this.createSourceImageCompletionItem(stage, image, stageIndex, stagePrefix.length, offset));
                        }
                        lastNumber = false;
                    } else if (!names[stageIndex]) {
                        names[stageIndex] = true;
                        items.push(this.createSourceImageCompletionItem(stageIndex.toString(), image, stageIndex, stagePrefix.length, offset));
                        lastNumber = true;
                    }
                    stageIndex++;
                } else {
                    break;
                }
            }

            // last build stage was not named, don't suggest it as it is recursive
            if (lastNumber && items.length > 0) {
                items.pop();
            }
            return items;
        }

        const fnMap = new Map<string, Function>();
        fnMap.set("chown", this.createCOPY_FlagChown.bind(this));
        fnMap.set("from", this.createCOPY_FlagFrom.bind(this));
        const args = copy.getArguments();
        const flagProposals = this.createFlagProposals(copy.getFlags(), args, position, offset, prefix, fnMap);
        if (flagProposals !== null) {
            return flagProposals;
        }

        return this.createTargetFolderProposals(dockerfile, args, position, offset, prefix);
    }

    private createTargetFolderProposals(dockerfile: Dockerfile, args: Argument[], position: Position, offset: number, prefix: string): CompletionItem[] {
        if (args.length === 1) {
            // after the one and only argument, suggest folder names
            if (Util.positionBefore(args[0].getRange().end, position)) {
                return this.createWorkdirPathProposals(dockerfile, position, offset, prefix);
            }
            return [];
        }

        const lastRange = args[args.length - 1].getRange();
        if (Util.isInsideRange(position, lastRange) || Util.positionBefore(lastRange.end, position)) {
            // in the last argument or after the last argument
            return this.createWorkdirPathProposals(dockerfile, position, offset, prefix);
        }
        return [];
    }

    private createWorkdirPathProposals(dockerfile: Dockerfile, position: Position, offset: number, prefix: string): CompletionItem[]{
        const items: CompletionItem[] = [];
        for (const directory of dockerfile.getAvailableWorkingDirectories(position.line)) {
            if (directory.startsWith(prefix)) {
                items.push(this.createPlainTextCompletionItem(directory, prefix.length, offset, directory, CompletionItemKind.Folder));
            }
        }
        return items;
    }

    private createFromProposals(from: From, position: Position, offset: number, prefix: string): CompletionItem[] | PromiseLike<CompletionItem[]> {
        // checks if the cursor is in the image's tag area
        if (Util.isInsideRange(position, from.getImageTagRange())) {
            const index = prefix.indexOf(':');
            const lastIndex = prefix.indexOf(':');
            if (index === lastIndex) {
                prefix = prefix.substring(index + 1);
            } else {
                prefix = prefix.substring(index + 1, lastIndex);
            }
            const client = this.dockerRegistryClient;
            return new Promise<CompletionItem[]>(async (resolve) => {
                const items: CompletionItem[] = [];
                const tags = await client.getTags(from.getImageName());
                for (const tag of tags) {
                    if (tag.indexOf(prefix) === 0) {
                        items.push({
                            textEdit: this.createTextEdit(prefix.length, this.document.offsetAt(position), tag),
                            label: tag,
                            kind: CompletionItemKind.Property,
                            insertTextFormat: InsertTextFormat.PlainText,
                        });
                    }
                }
                resolve(items);
            });
        }
        const args = from.getArguments();
        if (args.length > 0 && args[0].isBefore(position)) {
            return [];
        }
        if ("--platform".indexOf(prefix) === 0) {
            return [this.createFROM_FlagPlatform(prefix.length, offset)];
        }
        return [];
    }

    private createHealthcheckProposals(offset: number, prefix: string) {
        let items: CompletionItem[] = [];
        if (prefix.length < 3 && "CMD".indexOf(prefix.toUpperCase()) === 0) {
            items.push(this.createHEALTHCHECK_CMD_Subcommand(prefix.length, offset));
        }
        if (prefix.length < 4 && "NONE".indexOf(prefix.toUpperCase()) === 0) {
            items.push(this.createHEALTHCHECK_NONE_Subcommand(prefix.length, offset));
        }
        if ("--interval".indexOf(prefix) === 0) {
            items.push(this.createHEALTHCHECK_FlagInterval(prefix.length, offset));
        }
        if ("--retries".indexOf(prefix) === 0) {
            items.push(this.createHEALTHCHECK_FlagRetries(prefix.length, offset));
        }
        if ("--start-interval".indexOf(prefix) === 0) {
            items.push(this.createHEALTHCHECK_FlagStartInterval(prefix.length, offset));
        }
        if ("--start-period".indexOf(prefix) === 0) {
            items.push(this.createHEALTHCHECK_FlagStartPeriod(prefix.length, offset));
        }
        if ("--timeout".indexOf(prefix) === 0) {
            items.push(this.createHEALTHCHECK_FlagTimeout(prefix.length, offset));
        }

        for (let i = 0; i < items.length; i++) {
            items[i].sortText = i.toString();
        }

        return items;
    }

    /**
    * Walks back in the text buffer to calculate the true prefix of the
    * current text caret offset. This function will handle the
    * Dockerfile escape characters to skip escaped newline characters
    * where applicable.
    * 
    * @param buffer the content of the opened file
    * @param offset the current text caret's offset
    * @param escapeCharacter the escape character defined in this Dockerfile
    */
    private calculateTruePrefix(dockerfile: Dockerfile, buffer: string, offset: number, escapeCharacter: string): Prefix {
        var char = buffer.charAt(offset - 1);
        let checkEscape = true;
        switch (char) {
            case '\n':
                var escapedPrefix = "";
                escapeCheck: for (var i = offset - 2; i >= 0; i--) {
                    switch (buffer.charAt(i)) {
                        case ' ':
                        case '\t':
                            if (!checkEscape) {
                                break escapeCheck;
                            }
                            break;
                        case '\r':
                        case '\n':
                            checkEscape = true;
                            break
                        case escapeCharacter:
                            if (checkEscape) {
                                checkEscape = false;
                                continue;
                            }
                            break;
                        default:
                            if (checkEscape) {
                                break escapeCheck;
                            }
                            offset = i;
                            escapedPrefix = buffer.charAt(i).toUpperCase() + escapedPrefix;
                            break;
                    }
                }

                if (escapedPrefix !== "") {
                    return { content: escapedPrefix, offset };
                }
                break;
            case '\r':
            case ' ':
            case '\t':
                break;
            default:
                checkEscape = false;
                var truePrefix = char;
                for (let i = offset - 2; i >= 0; i--) {
                    char = buffer.charAt(i);
                    if (Util.isNewline(char)) {
                        checkEscape = true;
                    } else if (Util.isWhitespace(char)) {
                        if (checkEscape) {
                            continue;
                        }
                        break;
                    } else {
                        if (char === escapeCharacter) {
                            if (checkEscape) {
                                checkEscape = false;
                                continue;
                            }
                        } else if (checkEscape) {
                            break;
                        }
                        truePrefix = char + truePrefix;
                    }
                }
                for (const instruction of dockerfile.getInstructions()) {
                    const instructionRange = instruction.getInstructionRange();
                    const startOffset = this.document.offsetAt(instructionRange.start);
                    if (startOffset <= offset && offset <= this.document.offsetAt(instructionRange.end)) {
                        return { content: truePrefix, offset: startOffset };
                    }
                    for (const arg of instruction.getArguments()) {
                        const argRange = arg.getRange();
                        const startOffset = this.document.offsetAt(argRange.start);
                        if (startOffset <= offset && offset <= this.document.offsetAt(argRange.end)) {
                            return { content: truePrefix, offset: startOffset };
                        }
                    }
                    if (instruction instanceof ModifiableInstruction) {
                        for (const flag of instruction.getFlags()) {
                            const flagRange = flag.getRange();
                            const startOffset = this.document.offsetAt(flagRange.start);
                            if (startOffset <= offset && offset <= this.document.offsetAt(flagRange.end)) {
                                return { content: truePrefix, offset: startOffset };
                            }
                        }
                    }
                }
        }
        return { content: "", offset }
    }

    createSingleProposals(keyword: string, prefixLength: number, offset: number): CompletionItem {
        switch (keyword) {
            case "ADD":
                return this.createADD(prefixLength, offset, keyword);
            case "CMD":
                return this.createCMD(prefixLength, offset, keyword);
            case "COPY":
                return this.createCOPY(prefixLength, offset, keyword);
            case "ENTRYPOINT":
                return this.createENTRYPOINT(prefixLength, offset, keyword);
            case "ENV":
                return this.createENV(prefixLength, offset, keyword);
            case "EXPOSE":
                return this.createEXPOSE(prefixLength, offset, keyword);
            case "FROM":
                return this.createFROM(prefixLength, offset, keyword);
            case "LABEL":
                return this.createLABEL(prefixLength, offset, keyword);
            case "MAINTAINER":
                return this.createMAINTAINER(prefixLength, offset, keyword);
            case "ONBUILD":
                return this.createONBUILD(prefixLength, offset, keyword);
            case "RUN":
                return this.createRUN(prefixLength, offset, keyword);
            case "SHELL":
                return this.createSHELL(prefixLength, offset, keyword);
            case "STOPSIGNAL":
                return this.createSTOPSIGNAL(prefixLength, offset, keyword);
            case "WORKDIR":
                return this.createWORKDIR(prefixLength, offset, keyword);
            case "VOLUME":
                return this.createVOLUME(prefixLength, offset, keyword);
            case "USER":
                return this.createUSER(prefixLength, offset, keyword);
        }
        throw new Error("Unknown keyword found: " + keyword);
    }

    createADD(prefixLength: number, offset: number, markdown: string): CompletionItem {
        return this.createKeywordCompletionItem("ADD", "ADD source dest", prefixLength, offset, "ADD ${1:source} ${2:dest}", markdown);
    }

    private createARG(prefixLength: number, offset: number): CompletionItem {
        return this.createKeywordCompletionItem("ARG", "ARG", prefixLength, offset, "ARG", "ARG");
    }

    createARG_NameOnly(prefixLength: number, offset: number): CompletionItem {
        return this.createKeywordCompletionItem("ARG", "ARG name", prefixLength, offset, "ARG ${1:name}", "ARG_NameOnly");
    }

    createARG_DefaultValue(prefixLength: number, offset: number): CompletionItem {
        return this.createKeywordCompletionItem("ARG", "ARG name=defaultValue", prefixLength, offset, "ARG ${1:name}=${2:defaultValue}", "ARG_DefaultValue");
    }

    createCMD(prefixLength: number, offset: number, markdown: string): CompletionItem {
        return this.createKeywordCompletionItem("CMD", "CMD [ \"executable\" ]", prefixLength, offset, "CMD [ \"${1:executable}\" ]", markdown);
    }

    createCOPY(prefixLength: number, offset: number, markdown: string): CompletionItem {
        return this.createKeywordCompletionItem("COPY", "COPY source dest", prefixLength, offset, "COPY ${1:source} ${2:dest}", markdown);
    }

    createENTRYPOINT(prefixLength: number, offset: number, markdown: string): CompletionItem {
        return this.createKeywordCompletionItem("ENTRYPOINT", "ENTRYPOINT [ \"executable\" ]", prefixLength, offset, "ENTRYPOINT [ \"${1:executable}\" ]", markdown);
    }

    createENV(prefixLength: number, offset: number, markdown: string): CompletionItem {
        return this.createKeywordCompletionItem("ENV", "ENV key=value", prefixLength, offset, "ENV ${1:key}=${2:value}", markdown);
    }

    createEXPOSE(prefixLength: number, offset: number, markdown: string): CompletionItem {
        return this.createKeywordCompletionItem("EXPOSE", "EXPOSE port", prefixLength, offset, "EXPOSE ${1:port}", markdown);
    }

    createFROM(prefixLength: number, offset: number, markdown: string): CompletionItem {
        return this.createKeywordCompletionItem("FROM", "FROM baseImage", prefixLength, offset, "FROM ${1:baseImage}", markdown);
    }

    createHEALTHCHECK_CMD(prefixLength: number, offset: number): CompletionItem {
        if (this.snippetSupport) {
            return this.createKeywordCompletionItem("HEALTHCHECK",
                "HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ \"executable\" ]",
                prefixLength,
                offset,
                "HEALTHCHECK --interval=${1:30s} --timeout=${2:30s} --start-period=${3:5s} --retries=${4:3} CMD [ \"${5:executable}\" ]",
                "HEALTHCHECK_CMD");
        }

        let textEdit = this.createTextEdit(prefixLength, offset, "HEALTHCHECK CMD");
        return {
            data: "HEALTHCHECK_CMD",
            textEdit: textEdit,
            label: "HEALTHCHECK CMD",
            kind: CompletionItemKind.Keyword,
            insertTextFormat: InsertTextFormat.PlainText,
        };
    }

    private createHEALTHCHECK_CMD_Subcommand(prefixLength: number, offset: number): CompletionItem {
        if (this.snippetSupport) {
            return this.createKeywordCompletionItem("CMD",
                "CMD [ \"executable\" ]",
                prefixLength,
                offset,
                "CMD [ \"${1:executable}\" ]",
                "HEALTHCHECK_CMD");
        }

        const textEdit = this.createTextEdit(prefixLength, offset, "CMD");
        return {
            data: "HEALTHCHECK_CMD",
            textEdit: textEdit,
            label: "CMD",
            kind: CompletionItemKind.Keyword,
            insertTextFormat: InsertTextFormat.PlainText,
        };
    }

    private createADD_FlagChown(prefixLength: number, offset: number): CompletionItem {
        if (this.snippetSupport) {
            return this.createFlagCompletionItem("--chown=user:group", prefixLength, offset, "--chown=${1:user\:group}", "ADD_FlagChown");
        }
        return this.createFlagCompletionItem("--chown=", prefixLength, offset, "--chown=", "ADD_FlagChown");
    }

    private createCOPY_FlagChown(prefixLength: number, offset: number): CompletionItem {
        if (this.snippetSupport) {
            return this.createFlagCompletionItem("--chown=user:group", prefixLength, offset, "--chown=${1:user\:group}", "COPY_FlagChown");
        }
        return this.createFlagCompletionItem("--chown=", prefixLength, offset, "--chown=", "COPY_FlagChown");
    }

    private createCOPY_FlagFrom(prefixLength: number, offset: number): CompletionItem {
        if (this.snippetSupport) {
            return this.createFlagCompletionItem("--from=stage", prefixLength, offset, "--from=${1:stage}", "COPY_FlagFrom");
        }
        return this.createFlagCompletionItem("--from=", prefixLength, offset, "--from=", "COPY_FlagFrom");
    }

    private createFROM_FlagPlatform(prefixLength: number, offset: number): CompletionItem {
        if (this.snippetSupport) {
            return this.createFlagCompletionItem("--platform=arm64", prefixLength, offset, "--platform=${1:arm64}", "FROM_FlagPlatform");
        }
        return this.createFlagCompletionItem("--platform=", prefixLength, offset, "--platform=", "FROM_FlagPlatform");
    }

    private createHEALTHCHECK_FlagInterval(prefixLength: number, offset: number): CompletionItem {
        if (this.snippetSupport) {
            return this.createFlagCompletionItem("--interval=30s", prefixLength, offset, "--interval=${1:30s}", "HEALTHCHECK_FlagInterval");
        }
        return this.createFlagCompletionItem("--interval=", prefixLength, offset, "--interval=", "HEALTHCHECK_FlagInterval");
    }

    private createHEALTHCHECK_FlagRetries(prefixLength: number, offset: number): CompletionItem {
        if (this.snippetSupport) {
            return this.createFlagCompletionItem("--retries=3", prefixLength, offset, "--retries=${1:3}", "HEALTHCHECK_FlagRetries");
        }
        return this.createFlagCompletionItem("--retries=", prefixLength, offset, "--retries=", "HEALTHCHECK_FlagRetries");
    }

    private createHEALTHCHECK_FlagStartInterval(prefixLength: number, offset: number): CompletionItem {
        if (this.snippetSupport) {
            return this.createFlagCompletionItem("--start-interval=5s", prefixLength, offset, "--start-interval=${1:5s}", "HEALTHCHECK_FlagStartInterval");
        }
        return this.createFlagCompletionItem("--start-interval=", prefixLength, offset, "--start-interval=", "HEALTHCHECK_FlagStartInterval");
    }

    private createHEALTHCHECK_FlagStartPeriod(prefixLength: number, offset: number): CompletionItem {
        if (this.snippetSupport) {
            return this.createFlagCompletionItem("--start-period=5s", prefixLength, offset, "--start-period=${1:5s}", "HEALTHCHECK_FlagStartPeriod");
        }
        return this.createFlagCompletionItem("--start-period=", prefixLength, offset, "--start-period=", "HEALTHCHECK_FlagStartPeriod");
    }

    private createHEALTHCHECK_FlagTimeout(prefixLength: number, offset: number): CompletionItem {
        if (this.snippetSupport) {
            return this.createFlagCompletionItem("--timeout=30s", prefixLength, offset, "--timeout=${1:30s}", "HEALTHCHECK_FlagTimeout");
        }
        return this.createFlagCompletionItem("--timeout=", prefixLength, offset, "--timeout=", "HEALTHCHECK_FlagTimeout");
    }

    createHEALTHCHECK_NONE(prefixLength: number, offset: number): CompletionItem {
        return this.createPlainTextCompletionItem("HEALTHCHECK NONE", prefixLength, offset, "HEALTHCHECK NONE", CompletionItemKind.Keyword, "HEALTHCHECK_NONE");
    }

    private createHEALTHCHECK_NONE_Subcommand(prefixLength: number, offset: number): CompletionItem {
        return this.createPlainTextCompletionItem("NONE", prefixLength, offset, "NONE", CompletionItemKind.Keyword, "HEALTHCHECK_NONE");
    }

    createLABEL(prefixLength: number, offset: number, markdown: string): CompletionItem {
        return this.createKeywordCompletionItem("LABEL", "LABEL key=\"value\"", prefixLength, offset, "LABEL ${1:key}=\"${2:value}\"", markdown);
    }

    createMAINTAINER(prefixLength: number, offset: number, markdown: string): CompletionItem {
        let item = this.createKeywordCompletionItem("MAINTAINER", "MAINTAINER name", prefixLength, offset, "MAINTAINER ${1:name}", markdown);
        if (this.supportedTags !== undefined && this.supportedTags.length > 0 && this.supportedTags.indexOf(CompletionItemTag.Deprecated) >= 0) {
            item.tags = [CompletionItemTag.Deprecated];
        }
        if (this.deprecatedSupport) {
            item.deprecated = true;
        }
        return item;
    }

    createONBUILD(prefixLength: number, offset: number, markdown: string): CompletionItem {
        return this.createKeywordCompletionItem("ONBUILD", "ONBUILD INSTRUCTION", prefixLength, offset, "ONBUILD ${1:INSTRUCTION}", markdown);
    }

    createRUN(prefixLength: number, offset: number, markdown: string): CompletionItem {
        return this.createKeywordCompletionItem("RUN", "RUN command", prefixLength, offset, "RUN ${1:command}", markdown);
    }

    createSHELL(prefixLength: number, offset: number, markdown: string): CompletionItem {
        return this.createKeywordCompletionItem("SHELL", "SHELL [ \"executable\" ]", prefixLength, offset, "SHELL [ \"${1:executable}\" ]", markdown);
    }

    createSTOPSIGNAL(prefixLength: number, offset: number, markdown: string): CompletionItem {
        return this.createKeywordCompletionItem("STOPSIGNAL", "STOPSIGNAL signal", prefixLength, offset, "STOPSIGNAL ${1:signal}", markdown);
    }

    createUSER(prefixLength: number, offset: number, markdown: string): CompletionItem {
        return this.createKeywordCompletionItem("USER", "USER daemon", prefixLength, offset, "USER ${1:daemon}", markdown);
    }

    createVOLUME(prefixLength: number, offset: number, markdown: string): CompletionItem {
        return this.createKeywordCompletionItem("VOLUME", "VOLUME [ \"/data\" ]", prefixLength, offset, "VOLUME [ \"${1:/data}\" ]", markdown);
    }

    createWORKDIR(prefixLength: number, offset: number, markdown: string): CompletionItem {
        return this.createKeywordCompletionItem("WORKDIR", "WORKDIR /the/workdir/path", prefixLength, offset, "WORKDIR ${1:/the/workdir/path}", markdown);
    }

    createEscape(prefixLength: number, offset: number, markdown: string): CompletionItem {
        return this.createKeywordCompletionItem(Directive.escape, "escape=`", prefixLength, offset, "escape=${1:`}", markdown);
    }

    private createSyntax(prefixLength: number, offset: number, markdown: string): CompletionItem {
        return this.createKeywordCompletionItem(Directive.syntax, "syntax=docker/dockerfile:experimental", prefixLength, offset, "syntax=${1:docker/dockerfile:experimental}", markdown);
    }

    createKeywordCompletionItem(keyword: string, label: string, prefixLength: number, offset: number, insertText: string, markdown: string): CompletionItem {
        if (!this.snippetSupport) {
            // only inserting the keyword so set the label to the keyword
            label = keyword;
            // just insert the keyword if snippets are not supported by the client
            insertText = keyword;
        }

        let textEdit = this.createTextEdit(prefixLength, offset, insertText);
        return {
            data: markdown,
            textEdit: textEdit,
            label: label,
            kind: CompletionItemKind.Keyword,
            insertTextFormat: this.snippetSupport ? InsertTextFormat.Snippet : InsertTextFormat.PlainText,
        };
    }

    private createPlainTextCompletionItem(label: string, prefixLength: number, offset: number, insertText: string, kind: CompletionItemKind, markdown?: string): CompletionItem {
        let textEdit = this.createTextEdit(prefixLength, offset, insertText);
        return {
            data: markdown,
            textEdit: textEdit,
            label: label,
            kind: kind,
            insertTextFormat: InsertTextFormat.PlainText,
        };
    }

    private createFlagCompletionItem(label: string, prefixLength: number, offset: number, insertText: string, markdown: string): CompletionItem {
        let textEdit = this.createTextEdit(prefixLength, offset, insertText);
        return {
            data: markdown,
            textEdit: textEdit,
            label: label,
            kind: CompletionItemKind.Field,
            insertTextFormat: this.snippetSupport ? InsertTextFormat.Snippet : InsertTextFormat.PlainText,
        };
    }

    private createSourceImageCompletionItem(label: string, documentation: string, buildIndex: number, prefixLength: number, offset: number): CompletionItem {
        return {
            textEdit: this.createTextEdit(prefixLength, offset, label),
            label: label,
            documentation: documentation,
            kind: CompletionItemKind.Reference,
            insertTextFormat: InsertTextFormat.PlainText,
            sortText: buildIndex.toString()
        };
    }

    private createVariableCompletionItem(text: string, prefixLength: number, offset: number, brace: boolean, documentation: string): CompletionItem {
        text = brace ? "${" + text + '}' : '$' + text
        return {
            textEdit: this.createTextEdit(prefixLength, offset, text),
            label: text,
            kind: CompletionItemKind.Variable,
            insertTextFormat: InsertTextFormat.PlainText,
            documentation: documentation
        };
    }

    private createTextEdit(prefixLength: number, offset: number, content: string): TextEdit {
        if (prefixLength === 0) {
            return TextEdit.insert(this.document.positionAt(offset), content);
        }
        return TextEdit.replace(Range.create(this.document.positionAt(offset - prefixLength), this.document.positionAt(offset)), content);
    }
}
