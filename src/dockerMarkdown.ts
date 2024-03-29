/* --------------------------------------------------------------------------------------------
* Copyright (c) Remy Suen. All rights reserved.
* Licensed under the MIT License. See License.txt in the project root for license information.
* ------------------------------------------------------------------------------------------ */
'use strict';

import { Hover } from 'vscode-languageserver-types';

export class MarkdownDocumentation {

    private dockerMessages = {
        "hoverAdd": "Copy files, folders, or remote URLs from `source` to the `dest` path in the image's filesystem.\n\n",
        "hoverArg": "Define a variable with an optional default value that users can override at build-time when using `docker build`.\n\nSince Docker 1.9\n\n",
        "hoverCmd": "Provide defaults for an executing container. If an executable is not specified, then `ENTRYPOINT` must be specified as well. There can only be one `CMD` instruction in a `Dockerfile`.\n\n",
        "hoverCopy": "Copy files or folders from `source` to the `dest` path in the image's filesystem.\n\n",
        "hoverEntrypoint": "Configures the container to be run as an executable.\n\n",
        "hoverEnv": "Set the environment variable `key` to the value `value`.\n\n",
        "hoverExpose": "Define the network `port`s that this container will listen on at runtime.\n\n",
        "hoverFrom": "Set the `baseImage` to use for subsequent instructions. `FROM` must be the first instruction in a `Dockerfile`.\n\n",
        "hoverHealthcheck": "Define how Docker should test the container to check that it is still working. Alternatively, disable the base image's `HEALTHCHECK` instruction. There can only be one `HEALTHCHECK` instruction in a `Dockerfile`.\n\nSince Docker 1.12\n\n",
        "hoverLabel": "Adds metadata to an image.\n\nSince Docker 1.6\n\n",
        "hoverMaintainer": "Set the _Author_ field of the generated images. This instruction has been deprecated in favor of `LABEL`.\n\n",
        "hoverOnbuild": "Add a _trigger_ instruction to the image that will be executed when the image is used as a base image for another build.\n\n",
        "hoverRun": "Execute any commands on top of the current image as a new layer and commit the results.\n\n",
        "hoverShell": "Override the default shell used for the _shell_ form of commands.\n\nSince Docker 1.12\n\n",
        "hoverStopsignal": "Set the system call signal to use to send to the container to exit. Signals can be valid unsigned numbers or a signal name in the `SIGNAME` format such as `SIGKILL`.\n\nSince Docker 1.9\n\n",
        "hoverUser": "Set the user name or UID to use when running the image in addition to any subsequent `CMD`, `ENTRYPOINT`, or `RUN` instructions that follow it in the `Dockerfile`.\n\n",
        "hoverVolume": "Create a mount point with the specified name and mark it as holding externally mounted volumes from the native host or from other containers.\n\n",
        "hoverWorkdir": "Set the working directory for any subsequent `ADD`, `COPY`, `CMD`, `ENTRYPOINT`, or `RUN` instructions that follow it in the `Dockerfile`.\n\n",

        "hoverEscape": "Sets the character to use to escape characters and newlines in this Dockerfile. If unspecified, the default escape character is `\\`.\n\n",
        "hoverSyntax": "Set the location of the Dockerfile builder to use for building the current Dockerfile.\n\n",

        "hoverOnlineDocumentationFooter": "\n\n[Online documentation](${0})",

        "hoverAddFlagChown": "The username, groupname, or UID/GID combination to own the added content.",
        "hoverCopyFlagChown": "The username, groupname, or UID/GID combination to own the copied content.",
        "hoverCopyFlagFrom": "The previous build stage to use as the source location instead of the build's context.\n\nSince Docker 17.05.0-ce.",
        "hoverFromFlagPlatform": "The platform of the image if referencing a multi-platform image.\n\nSince Docker CE 18.04.",
        "hoverHealthcheckFlagInterval": "The seconds to wait for the health check to run after the container has started, and then again the number of seconds to wait before running again after the previous check has completed.",
        "hoverHealthcheckFlagRetries": "The number of consecutive failures of this health check before the container is considered to be `unhealthy`.",
        "hoverHealthcheckFlagStartInterval": "The number of seconds to wait between health checks during the start period.",
        "hoverHealthcheckFlagStartPeriod": "The number of seconds to wait for the container to startup. Failures during this grace period will not count towards the maximum number of retries. However, should a health check succeed during this period then any subsequent failures will count towards the maximum number of retries.\n\nSince Docker 17.05.0-ce.",
        "hoverHealthcheckFlagTimeout": "The number of seconds to wait for the check to complete before considering it to have failed.",

        "proposalArgNameOnly": "Define a variable that users can set at build-time when using `docker build`.\n\n",
        "proposalArgDefaultValue": "Define a variable with the given default value that users can override at build-time when using `docker build`.\n\n",
        "proposalHealthcheckExec": "Define how Docker should test the container to check that it is still working. There can only be one `HEALTHCHECK` instruction in a `Dockerfile`.\n\nSince Docker 1.12\n\n",
        "proposalHealthcheckNone": "Disable the `HEALTHCHECK` instruction inherited from the base image if one exists. There can only be one `HEALTHCHECK` instruction in a `Dockerfile`.\n\nSince Docker 1.12"
    };

    private markdowns: any;

    constructor() {
        this.markdowns = {
            ADD: {
                contents: this.dockerMessages["hoverAdd"] +
                    "```\n" +
                    "ADD hello.txt /absolute/path\n" +
                    "ADD hello.txt relative/to/workdir\n" +
                    "```" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#add")
            },

            ADD_FlagChown: {
                contents: this.dockerMessages["hoverAddFlagChown"]
            },

            ARG: {
                contents: this.dockerMessages["hoverArg"] +
                    "```\n" +
                    "ARG userName\n" +
                    "ARG testOutputDir=test\n" +
                    "```" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#arg")
            },

            ARG_NameOnly: {
                contents: this.dockerMessages["proposalArgNameOnly"] +
                    "```\n" +
                    "ARG userName\n" +
                    "```" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#arg")
            },

            ARG_DefaultValue: {
                contents: this.dockerMessages["proposalArgDefaultValue"] +
                    "```\n" +
                    "ARG testOutputDir=test\n" +
                    "```" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#arg")
            },

            CMD: {
                contents: this.dockerMessages["hoverCmd"] +
                    "```\n" +
                    "CMD [ \"/bin/ls\", \"-l\" ]\n" +
                    "```\n" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#cmd")
            },

            COPY: {
                contents: this.dockerMessages["hoverCopy"] +
                    "```\n" +
                    "COPY hello.txt /absolute/path\n" +
                    "COPY hello.txt relative/to/workdir\n" +
                    "```" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#copy")
            },

            COPY_FlagChown: {
                contents: this.dockerMessages["hoverCopyFlagChown"]
            },

            COPY_FlagFrom: {
                contents: this.dockerMessages["hoverCopyFlagFrom"]
            },

            ENTRYPOINT: {
                contents: this.dockerMessages["hoverEntrypoint"] +
                    "```\n" +
                    "ENTRYPOINT [ \"/opt/app/run.sh\", \"--port\", \"8080\" ]\n" +
                    "```" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#entrypoint")
            },

            ENV: {
                contents: this.dockerMessages["hoverEnv"] +
                    "```\n" +
                    "ENV buildTag=1.0\n" +
                    "```\n" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#env")
            },

            EXPOSE: {
                contents: this.dockerMessages["hoverExpose"] +
                    "```\n" +
                    "EXPOSE 8080\n" +
                    "EXPOSE 80 443 22\n" +
                    "EXPOSE 7000-8000\n" +
                    "```" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#expose")
            },

            FROM: {
                contents: this.dockerMessages["hoverFrom"] +
                    "```\n" +
                    "FROM baseImage\n" +
                    "FROM baseImage:tag\n" +
                    "FROM baseImage@digest\n" +
                    "```" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#from")
            },

            FROM_FlagPlatform: {
                contents: this.dockerMessages["hoverFromFlagPlatform"]
            },

            HEALTHCHECK: {
                contents: this.dockerMessages["hoverHealthcheck"] +
                    "```\n" +
                    "HEALTHCHECK --interval=10m --timeout=5s \\\n" +
                    "    CMD curl -f http://localhost/ || exit 1\n" +
                    "HEALTHCHECK NONE\n" +
                    "```" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#healthcheck")
            },

            HEALTHCHECK_CMD: {
                contents: this.dockerMessages["proposalHealthcheckExec"] +
                    "```\n" +
                    "HEALTHCHECK --interval=10m --timeout=5s \\\n" +
                    "    CMD curl -f http://localhost/ || exit 1\n" +
                    "```" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#healthcheck")
            },

            HEALTHCHECK_FlagInterval: {
                contents: this.dockerMessages["hoverHealthcheckFlagInterval"]
            },

            HEALTHCHECK_FlagRetries: {
                contents: this.dockerMessages["hoverHealthcheckFlagRetries"]
            },

            HEALTHCHECK_FlagStartInterval: {
                contents: this.dockerMessages["hoverHealthcheckFlagStartInterval"]
            },

            HEALTHCHECK_FlagStartPeriod: {
                contents: this.dockerMessages["hoverHealthcheckFlagStartPeriod"]
            },

            HEALTHCHECK_FlagTimeout: {
                contents: this.dockerMessages["hoverHealthcheckFlagTimeout"]
            },

            HEALTHCHECK_NONE: {
                contents: this.dockerMessages["proposalHealthcheckNone"] +
                    "```\n" +
                    "HEALTHCHECK NONE\n" +
                    "```" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#healthcheck")
            },

            LABEL: {
                contents: this.dockerMessages["hoverLabel"] +
                    "```\n" +
                    "LABEL version=\"1.0\"\n" +
                    "```\n" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#label")
            },

            MAINTAINER: {
                contents: this.dockerMessages["hoverMaintainer"] +
                    "```\n" +
                    "MAINTAINER name\n" +
                    "```\n" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#maintainer")
            },

            ONBUILD: {
                contents: this.dockerMessages["hoverOnbuild"] +
                    "```\n" +
                    "ONBUILD ADD . /opt/app/src/extensions\n" +
                    "ONBUILD RUN /usr/local/bin/build.sh /opt/app" +
                    "```" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#cmd")
            },

            RUN: {
                contents: this.dockerMessages["hoverRun"] +
                    "```\n" +
                    "RUN apt-get update && apt-get install -y curl\n" +
                    "```\n" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#run")
            },

            SHELL: {
                contents: this.dockerMessages["hoverShell"] +
                    "```\n" +
                    "SHELL [ \"powershell\", \"-command\" ]\n" +
                    "```\n" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#shell")
            },

            STOPSIGNAL: {
                contents: this.dockerMessages["hoverStopsignal"] +
                    "```\n" +
                    "STOPSIGNAL 9\n" +
                    "```\n" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#stopsignal")
            },

            USER: {
                contents: this.dockerMessages["hoverUser"] +
                    "```\n" +
                    "USER daemon\n" +
                    "```\n" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#user")
            },

            VOLUME: {
                contents: this.dockerMessages["hoverVolume"] +
                    "```\n" +
                    "VOLUME [ \"/var/db\" ]\n" +
                    "```\n" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#volume")
            },

            WORKDIR: {
                contents: this.dockerMessages["hoverWorkdir"] +
                    "```\n" +
                    "WORKDIR /path/to/workdir\n" +
                    "WORKDIR relative/path\n" +
                    "```" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#workdir")
            },

            escape: {
                contents: this.dockerMessages["hoverEscape"] +
                    "```\n" +
                    "# escape=`\n" +
                    "```" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#escape")
            },

            syntax: {
                contents: this.dockerMessages["hoverSyntax"] +
                    "```\n" +
                    "# syntax=docker/dockerfile:1.0\n" +
                    "# syntax=docker/dockerfile:1.0.0-experimental\n" +
                    "```" +
                    this.formatMessage(this.dockerMessages["hoverOnlineDocumentationFooter"], "https://docs.docker.com/engine/reference/builder/#syntax")
            }
        };
    }

    private formatMessage(text: string, variable: string): string {
        return text.replace("${0}", variable);
    }

    /**
     * Retrieves the Markdown documentation for the given word.
     * 
     * @param word the Dockerfile keyword or directive, must not be null
     */
    public getMarkdown(word: string): Hover {
        return this.markdowns[word];
    }
}
