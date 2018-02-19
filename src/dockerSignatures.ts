/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
    TextDocument, Position, SignatureHelp, SignatureInformation
} from 'vscode-languageserver-types';
import { PlainTextDocumentation } from './dockerPlainText';
import {
    DockerfileParser, Argument, Instruction, Property, JSONInstruction, Directive,
    Copy, Env, From, Healthcheck, Label
} from 'dockerfile-ast';
import { Util } from './docker';

export class DockerSignatures {

    private documentation = new PlainTextDocumentation();

    public computeSignatures(content: string, position: Position): SignatureHelp {
        let document = TextDocument.create("", "", 0, content);
        let dockerfile = DockerfileParser.parse(document.getText());
        if (position.line === 0) {
            let directive = dockerfile.getDirective();
            if (directive !== null && directive.getDirective() === Directive.escape) {
                return {
                    signatures: [
                        {
                            label: "escape=`\\`",
                            documentation: this.documentation.getDocumentation("signatureEscape"),
                            parameters: [
                                {
                                    label: "\\",
                                    documentation: this.documentation.getDocumentation("signatureEscape_Param")
                                }
                            ]
                        }
                    ],
                    activeSignature: 0,
                    activeParameter: 0
                }
            }
        }

        for (const comment of dockerfile.getComments()) {
            if (Util.isInsideRange(position, comment.getRange())) {
                return {
                    signatures: [],
                    activeSignature: null,
                    activeParameter: null
                };
            }
        }

        let signatureHelp = this.getInstructionSignatures(document, dockerfile.getOnbuildTriggers(), position);
        if (!signatureHelp) {
            signatureHelp = this.getInstructionSignatures(document, dockerfile.getInstructions(), position);
            if (!signatureHelp) {
                signatureHelp = {
                    signatures: [],
                    activeSignature: null,
                    activeParameter: null
                };
            }
        }

        return signatureHelp;
    }

    private getInstructionSignatures(document: TextDocument, instructions: Instruction[], position: Position): SignatureHelp | null {
        for (let instruction of instructions) {
            if (!Util.isInsideRange(position, instruction.getRange())) {
                continue;
            } else if (Util.isInsideRange(position, instruction.getInstructionRange())) {
                return null;
            }

            switch (instruction.getKeyword()) {
                case "ADD":
                    const add = instruction as JSONInstruction;
                    const addShellSignature = {
                        label: "ADD [flags] source ... dest",
                        documentation: this.documentation.getDocumentation("signatureAdd_Signature0"),
                        parameters: [
                            {
                                label: "[flags]",
                                documentation: this.documentation.getDocumentation("signatureAdd_Signature0_Param0")
                            },
                            {
                                label: "source",
                                documentation: this.documentation.getDocumentation("signatureAdd_Signature0_Param1")
                            },
                            {
                                label: "...",
                                documentation: this.documentation.getDocumentation("signatureAdd_Signature0_Param2")
                            },
                            {
                                label: "dest",
                                documentation: this.documentation.getDocumentation("signatureAdd_Signature0_Param3")
                            }
                        ]
                    };
                    const addJsonSignature = {
                        label: "ADD [flags] [ \"source\", ..., \"dest\" ]",
                        documentation: this.documentation.getDocumentation("signatureAdd_Signature1"),
                        parameters: [
                            {
                                label: "[flags]",
                                documentation: this.documentation.getDocumentation("signatureAdd_Signature1_Param0")
                            },
                            {
                                label: "["
                            },
                            {
                                label: "\"source\"",
                                documentation: this.documentation.getDocumentation("signatureAdd_Signature1_Param2")
                            },
                            {
                                label: "...",
                                documentation: this.documentation.getDocumentation("signatureAdd_Signature1_Param3")
                            },
                            {
                                label: "\"dest\"",
                                documentation: this.documentation.getDocumentation("signatureAdd_Signature1_Param4")
                            },
                            {
                                label: "]"
                            }
                        ]
                    };
                    return this.getJSONInstructionSignatureHelp(document, add, position, [addJsonSignature], addShellSignature, true, false, false, false);
                case "ARG":
                    let argSignatureHelp: SignatureHelp = {
                        signatures: [
                            {
                                label: "ARG name",
                                documentation: this.documentation.getDocumentation("signatureArg_Signature0"),
                                parameters: [
                                    {
                                        label: "name",
                                        documentation: this.documentation.getDocumentation("signatureArg_Signature0_Param")
                                    }
                                ]
                            },
                            {
                                label: "ARG name=defaultValue",
                                documentation: this.documentation.getDocumentation("signatureArg_Signature1"),
                                parameters: [
                                    {
                                        label: "name",
                                        documentation: this.documentation.getDocumentation("signatureArg_Signature1_Param0")
                                    },
                                    {
                                        label: "defaultValue",
                                        documentation: this.documentation.getDocumentation("signatureArg_Signature1_Param1")
                                    }
                                ]
                            }
                        ],
                        activeSignature: 0,
                        activeParameter: 0
                    };

                    let content = instruction.getTextContent();
                    let index = content.indexOf('=');
                    if (index !== -1) {
                        argSignatureHelp = {
                            signatures: [
                                {
                                    label: "ARG name=defaultValue",
                                    documentation: this.documentation.getDocumentation("signatureArg_Signature1"),
                                    parameters: [
                                        {
                                            label: "name",
                                            documentation: this.documentation.getDocumentation("signatureArg_Signature1_Param0")
                                        },
                                        {
                                            label: "defaultValue",
                                            documentation: this.documentation.getDocumentation("signatureArg_Signature1_Param1")
                                        }
                                    ]
                                }
                            ],
                            activeSignature: 0,
                            activeParameter: 0
                        };

                        if (document.offsetAt(position) > document.offsetAt(instruction.getRange().start) + index) {
                            argSignatureHelp.activeParameter = 1;
                        }
                    }
                    return argSignatureHelp;
                case "CMD":
                    const cmd = instruction as JSONInstruction;
                    const cmdJsonExecutableSignature = {
                        label: "CMD [ \"executable\", \"parameter\", ... ]",
                        documentation: this.documentation.getDocumentation("signatureCmd_Signature0"),
                        parameters: [
                            {
                                label: "["
                            },
                            {
                                label: "\"executable\"",
                                documentation: this.documentation.getDocumentation("signatureCmd_Signature0_Param1")
                            },
                            {
                                label: "\"parameter\"",
                                documentation: this.documentation.getDocumentation("signatureCmd_Signature0_Param2")
                            },
                            {
                                label: "...",
                                documentation: this.documentation.getDocumentation("signatureCmd_Signature0_Param3")
                            },
                            {
                                label: "]"
                            }
                        ]
                    };
                    const cmdJsonParameterSignature = {
                        label: "CMD [ \"parameter\", \"parameter2\", ... ]",
                        documentation: this.documentation.getDocumentation("signatureCmd_Signature1"),
                        parameters: [
                            {
                                label: "["
                            },
                            {
                                label: "\"parameter\"",
                                documentation: this.documentation.getDocumentation("signatureCmd_Signature1_Param1")
                            },
                            {
                                label: "\"parameter2\"",
                                documentation: this.documentation.getDocumentation("signatureCmd_Signature1_Param2")
                            },
                            {
                                label: "...",
                                documentation: this.documentation.getDocumentation("signatureCmd_Signature1_Param3")
                            },
                            {
                                label: "]"
                            }
                        ]
                    };
                    const cmdShellSignature = {
                        label: "CMD executable parameter ...",
                        documentation: this.documentation.getDocumentation("signatureCmd_Signature2"),
                        parameters: [
                            {
                                label: "executable",
                                documentation: this.documentation.getDocumentation("signatureCmd_Signature2_Param0")
                            },
                            {
                                label: "parameter",
                                documentation: this.documentation.getDocumentation("signatureCmd_Signature2_Param1")
                            },
                            {
                                label: "...",
                                documentation: this.documentation.getDocumentation("signatureCmd_Signature2_Param2")
                            }
                        ]
                    };
                    return this.getJSONInstructionSignatureHelp(document, cmd, position, [cmdJsonExecutableSignature, cmdJsonParameterSignature], cmdShellSignature, false, true, false, true);
                case "COPY":
                    const copy = instruction as Copy;
                    const flag = copy.getFromFlag();
                    if (flag !== null) {
                        let range = flag.getValueRange();
                        if (range !== null && Util.isInsideRange(position, range)) {
                            return {
                                signatures: [
                                    {
                                        label: "--from=stage",
                                        documentation: this.documentation.getDocumentation("signatureCopyFlagFrom"),
                                        parameters: [
                                            {
                                                label: "stage",
                                                documentation: this.documentation.getDocumentation("signatureCopyFlagFrom_Param")
                                            }
                                        ]
                                    }
                                ],
                                activeSignature: 0,
                                activeParameter: 0
                            }
                        }
                    }
                    const copyShellSignature = {
                        label: "COPY [flags] source ... dest",
                        documentation: this.documentation.getDocumentation("signatureCopy_Signature0"),
                        parameters: [
                            {
                                label: "[flags]",
                                documentation: this.documentation.getDocumentation("signatureCopy_Signature0_Param0")
                            },
                            {
                                label: "source",
                                documentation: this.documentation.getDocumentation("signatureCopy_Signature0_Param1")
                            },
                            {
                                label: "...",
                                documentation: this.documentation.getDocumentation("signatureCopy_Signature0_Param2")
                            },
                            {
                                label: "dest",
                                documentation: this.documentation.getDocumentation("signatureCopy_Signature0_Param3")
                            }
                        ]
                    };
                    const copyJsonSignature = {
                        label: "COPY [flags] [ \"source\", ..., \"dest\" ]",
                        documentation: this.documentation.getDocumentation("signatureCopy_Signature1"),
                        parameters: [
                            {
                                label: "[flags]",
                                documentation: this.documentation.getDocumentation("signatureCopy_Signature1_Param0")
                            },
                            {
                                label: "["
                            },
                            {
                                label: "\"source\"",
                                documentation: this.documentation.getDocumentation("signatureCopy_Signature1_Param2")
                            },
                            {
                                label: "...",
                                documentation: this.documentation.getDocumentation("signatureCopy_Signature1_Param3")
                            },
                            {
                                label: "\"dest\"",
                                documentation: this.documentation.getDocumentation("signatureCopy_Signature1_Param4")
                            },
                            {
                                label: "]"
                            }
                        ]
                    };
                    return this.getJSONInstructionSignatureHelp(document, copy, position, [copyJsonSignature], copyShellSignature, true, false, false, false);
                case "ENTRYPOINT":
                    const entrypoint = instruction as JSONInstruction;
                    const entrypointJsonSignature = {
                        label: "ENTRYPOINT [ \"executable\", \"parameter\", ... ]",
                        documentation: this.documentation.getDocumentation("signatureEntrypoint_Signature0"),
                        parameters: [
                            {
                                label: "["
                            },
                            {
                                label: "\"executable\"",
                                documentation: this.documentation.getDocumentation("signatureEntrypoint_Signature0_Param1")
                            },
                            {
                                label: "\"parameter\"",
                                documentation: this.documentation.getDocumentation("signatureEntrypoint_Signature0_Param2")
                            },
                            {
                                label: "...",
                                documentation: this.documentation.getDocumentation("signatureEntrypoint_Signature0_Param3")
                            },
                            {
                                label: "]"
                            }
                        ]
                    };
                    const entrypointShellSignature = {
                        label: "ENTRYPOINT executable parameter ...",
                        documentation: this.documentation.getDocumentation("signatureEntrypoint_Signature1"),
                        parameters: [
                            {
                                label: "executable",
                                documentation: this.documentation.getDocumentation("signatureEntrypoint_Signature1_Param0")
                            },
                            {
                                label: "parameter",
                                documentation: this.documentation.getDocumentation("signatureEntrypoint_Signature1_Param1")
                            },
                            {
                                label: "...",
                                documentation: this.documentation.getDocumentation("signatureEntrypoint_Signature1_Param2")
                            }
                        ]
                    };
                    return this.getJSONInstructionSignatureHelp(document, entrypoint, position, [entrypointJsonSignature], entrypointShellSignature, false, true, false, true);
                case "ENV":
                    const envSignatures = [
                        {
                            label: "ENV key value",
                            documentation: this.documentation.getDocumentation("signatureEnv_Signature0"),
                            parameters: [
                                {
                                    label: "key",
                                    documentation: this.documentation.getDocumentation("signatureEnv_Signature0_Param0")
                                },
                                {
                                    label: "value",
                                    documentation: this.documentation.getDocumentation("signatureEnv_Signature0_Param1")
                                }
                            ]
                        },
                        {
                            label: "ENV key=value",
                            documentation: this.documentation.getDocumentation("signatureEnv_Signature1"),
                            parameters: [
                                {
                                    label: "key",
                                    documentation: this.documentation.getDocumentation("signatureEnv_Signature1_Param0")
                                },
                                {
                                    label: "value",
                                    documentation: this.documentation.getDocumentation("signatureEnv_Signature1_Param1")
                                }
                            ]
                        },
                        {
                            label: "ENV key=value key2=value2",
                            documentation: this.documentation.getDocumentation("signatureEnv_Signature2"),
                            parameters: [
                                {
                                    label: "key",
                                    documentation: this.documentation.getDocumentation("signatureEnv_Signature2_Param0")
                                },
                                {
                                    label: "value",
                                    documentation: this.documentation.getDocumentation("signatureEnv_Signature2_Param1")
                                },
                                {
                                    label: "key2",
                                    documentation: this.documentation.getDocumentation("signatureEnv_Signature2_Param2")
                                },
                                {
                                    label: "value2",
                                    documentation: this.documentation.getDocumentation("signatureEnv_Signature2_Param3")
                                }
                            ]
                        }
                    ];
                    return this.getPropertySignatureHelp(document, position, envSignatures, (instruction as Env).getProperties());
                case "EXPOSE":
                    let exposeSignatureHelp = {
                        signatures: [
                            {
                                label: "EXPOSE port ...",
                                documentation: this.documentation.getDocumentation("signatureExpose"),
                                parameters: [
                                    {
                                        label: "port",
                                        documentation: this.documentation.getDocumentation("signatureExpose_Param0")
                                    },
                                    {
                                        label: "...",
                                        documentation: this.documentation.getDocumentation("signatureExpose_Param1")
                                    }
                                ]
                            }
                        ],
                        activeSignature: 0,
                        activeParameter: 0
                    };
                    let exposeArgs = instruction.getArguments();
                    if (exposeArgs.length > 0 && document.offsetAt(position) > document.offsetAt(exposeArgs[0].getRange().end)) {
                        exposeSignatureHelp.activeParameter = 1;
                    }
                    return exposeSignatureHelp;
                case "FROM":
                    return this.getFromSignatureHelp(position, instruction as From);
                case "HEALTHCHECK":
                    const healthcheckCmdEmptySignature = {
                        label: "HEALTHCHECK [flags] CMD ...",
                        documentation: this.documentation.getDocumentation("signatureHealthcheck_Signature0"),
                        parameters: [
                            {
                                label: "CMD"
                            }
                        ]
                    };
                    const healthcheckCmdNormalSignature = {
                        label: "HEALTHCHECK [flags] CMD ...",
                        documentation: this.documentation.getDocumentation("signatureHealthcheck_Signature1"),
                        parameters: [
                            {
                                label: "[flags]",
                                documentation: this.documentation.getDocumentation("signatureHealthcheck_Signature1_Param0")
                            },
                            {
                                label: "CMD"
                            },
                            {
                                label: "...",
                                documentation: this.documentation.getDocumentation("signatureHealthcheck_Signature1_Param2")
                            }
                        ]
                    };
                    const healthcheckNoneSignature = {
                        label: "HEALTHCHECK NONE",
                        documentation: this.documentation.getDocumentation("signatureHealthcheck_Signature2"),
                        parameters: [
                            {
                                label: "NONE"
                            }
                        ]
                    };
                    const healthcheck = (instruction as Healthcheck)
                    const flags = healthcheck.getFlags();
                    for (let flag of flags) {
                        let range = flag.getValueRange();
                        if (range !== null && Util.isInsideRange(position, range)) {
                            switch (flag.getName()) {
                                case "interval":
                                    return {
                                        signatures: [
                                            {
                                                label: "HEALTHCHECK --interval=30s ...",
                                                documentation: this.documentation.getDocumentation("signatureHealthcheck"),
                                                parameters: [
                                                    {
                                                        label: "30s",
                                                        documentation: this.documentation.getDocumentation("signatureHealthcheckFlagInterval_Param")
                                                    }
                                                ]
                                            }
                                        ],
                                        activeSignature: 0,
                                        activeParameter: 0
                                    }
                                case "retries":
                                    return {
                                        signatures: [
                                            {
                                                label: "HEALTHCHECK --retries=3 ...",
                                                documentation: this.documentation.getDocumentation("signatureHealthcheck"),
                                                parameters: [
                                                    {
                                                        label: "3",
                                                        documentation: this.documentation.getDocumentation("signatureHealthcheckFlagRetries_Param")
                                                    }
                                                ]
                                            }
                                        ],
                                        activeSignature: 0,
                                        activeParameter: 0
                                    }
                                case "start-period":
                                    return {
                                        signatures: [
                                            {
                                                label: "HEALTHCHECK --start-period=5s ...",
                                                documentation: this.documentation.getDocumentation("signatureHealthcheck"),
                                                parameters: [
                                                    {
                                                        label: "5s",
                                                        documentation: this.documentation.getDocumentation("signatureHealthcheckFlagStartPeriod_Param")
                                                    }
                                                ]
                                            }
                                        ],
                                        activeSignature: 0,
                                        activeParameter: 0
                                    }
                                case "timeout":
                                    return {
                                        signatures: [
                                            {
                                                label: "HEALTHCHECK --timeout=30s ...",
                                                documentation: this.documentation.getDocumentation("signatureHealthcheck"),
                                                parameters: [
                                                    {
                                                        label: "30s",
                                                        documentation: this.documentation.getDocumentation("signatureHealthcheckFlagTimeout_Param")
                                                    }
                                                ]
                                            }
                                        ],
                                        activeSignature: 0,
                                        activeParameter: 0
                                    }
                            }
                            break;
                        }
                    }
                    const healthcheckArgs = healthcheck.getArguments();
                    if (flags.length == 0 && healthcheckArgs.length === 0) {
                        // no flags or args, suggest both CMD and NONE
                        return {
                            signatures: [
                                healthcheckCmdEmptySignature,
                                healthcheckNoneSignature
                            ],
                            activeSignature: 0,
                            activeParameter: 0
                        }
                    }
                    const subcommand = healthcheck.getSubcommand();
                    if (subcommand === null) {
                        return {
                            signatures: [
                                healthcheckCmdNormalSignature
                            ],
                            activeSignature: 0,
                            activeParameter: 0
                        }
                    }
                    const beforeSubcommand = subcommand.isBefore(position);
                    const afterSubcommand = subcommand.isAfter(position);
                    const subcommandValue = subcommand.getValue();
                    if ("NONE".indexOf(subcommandValue.toUpperCase()) === 0) {
                        if (beforeSubcommand) {
                            // after a NONE, nothing to show
                            return null;
                        }
                        return {
                            signatures: [
                                healthcheckNoneSignature
                            ],
                            activeSignature: 0,
                            activeParameter: 0
                        }
                    }
                    const activeHealthcheckParameter = beforeSubcommand ? 2 : afterSubcommand ? 0 : 1;
                    return {
                        signatures: [
                            healthcheckCmdNormalSignature
                        ],
                        activeSignature: 0,
                        activeParameter: activeHealthcheckParameter
                    }
                case "LABEL":
                    const labelSignatures = [
                        {
                            label: "LABEL key value",
                            documentation: this.documentation.getDocumentation("signatureLabel_Signature0"),
                            parameters: [
                                {
                                    label: "key",
                                    documentation: this.documentation.getDocumentation("signatureLabel_Signature0_Param0")
                                },
                                {
                                    label: "value",
                                    documentation: this.documentation.getDocumentation("signatureLabel_Signature0_Param1")
                                }
                            ]
                        },
                        {
                            label: "LABEL key=value",
                            documentation: this.documentation.getDocumentation("signatureLabel_Signature1"),
                            parameters: [
                                {
                                    label: "key",
                                    documentation: this.documentation.getDocumentation("signatureLabel_Signature1_Param0")
                                },
                                {
                                    label: "value",
                                    documentation: this.documentation.getDocumentation("signatureLabel_Signature1_Param1")
                                }
                            ]
                        },
                        {
                            label: "LABEL key=value key2=value2",
                            documentation: this.documentation.getDocumentation("signatureLabel_Signature2"),
                            parameters: [
                                {
                                    label: "key",
                                    documentation: this.documentation.getDocumentation("signatureLabel_Signature2_Param0")
                                },
                                {
                                    label: "value",
                                    documentation: this.documentation.getDocumentation("signatureLabel_Signature2_Param1")
                                },
                                {
                                    label: "key2",
                                    documentation: this.documentation.getDocumentation("signatureLabel_Signature2_Param2")
                                },
                                {
                                    label: "value2",
                                    documentation: this.documentation.getDocumentation("signatureLabel_Signature2_Param3")
                                }
                            ]
                        }
                    ];
                    return this.getPropertySignatureHelp(document, position, labelSignatures, (instruction as Label).getProperties());
                case "MAINTAINER":
                    return {
                        signatures: [
                            {
                                label: "MAINTAINER name",
                                documentation: this.documentation.getDocumentation("signatureMaintainer"),
                                parameters: [
                                    {
                                        label: "name",
                                        documentation: this.documentation.getDocumentation("signatureMaintainer_Param")
                                    }
                                ]
                            }
                        ],
                        activeSignature: 0,
                        activeParameter: 0
                    };
                case "ONBUILD":
                    const onbuildArgs = instruction.getArguments();
                    if (onbuildArgs.length > 0 && onbuildArgs[0].isBefore(position)) {
                        return null;
                    }
                    return {
                        signatures: [
                            {
                                label: "ONBUILD INSTRUCTION",
                                documentation: this.documentation.getDocumentation("signatureOnbuild"),
                                parameters: [
                                    {
                                        label: "INSTRUCTION",
                                        documentation: this.documentation.getDocumentation("signatureOnbuild_Param")
                                    }
                                ]
                            }
                        ],
                        activeSignature: 0,
                        activeParameter: 0
                    };
                case "RUN":
                    const run = instruction as JSONInstruction;
                    const runShellSignature = {
                        label: "RUN command parameter ...",
                        documentation: this.documentation.getDocumentation("signatureRun_Signature0"),
                        parameters: [
                            {
                                label: "command",
                                documentation: this.documentation.getDocumentation("signatureRun_Signature0_Param0")
                            },
                            {
                                label: "parameter",
                                documentation: this.documentation.getDocumentation("signatureRun_Signature0_Param1")
                            },
                            {
                                label: "...",
                                documentation: this.documentation.getDocumentation("signatureRun_Signature0_Param2")
                            }
                        ]
                    };
                    const runJsonSignature = {
                        label: "RUN [ \"command\", \"parameter\", ... ]",
                        documentation: this.documentation.getDocumentation("signatureRun_Signature1"),
                        parameters: [
                            {
                                label: "["
                            },
                            {
                                label: "\"command\"",
                                documentation: this.documentation.getDocumentation("signatureRun_Signature1_Param1")
                            },
                            {
                                label: "\"parameter\"",
                                documentation: this.documentation.getDocumentation("signatureRun_Signature1_Param2")
                            },
                            {
                                label: "...",
                                documentation: this.documentation.getDocumentation("signatureRun_Signature1_Param3")
                            },
                            {
                                label: "]"
                            }
                        ]
                    };
                    return this.getJSONInstructionSignatureHelp(document, run, position, [runJsonSignature], runShellSignature, false, false, false, true);
                case "SHELL":
                    let shell = instruction as JSONInstruction;
                    let shellSignatureHelp: SignatureHelp = {
                        signatures: [
                            {
                                label: "SHELL [ \"executable\", \"parameter\", ... ]",
                                documentation: this.documentation.getDocumentation("signatureShell"),
                                parameters: [
                                    {
                                        label: "["
                                    },
                                    {
                                        label: "\"executable\"",
                                        documentation: this.documentation.getDocumentation("signatureShell_Param1")
                                    },
                                    {
                                        label: "\"parameter\"",
                                        documentation: this.documentation.getDocumentation("signatureShell_Param2")
                                    },
                                    {
                                        label: "...",
                                        documentation: this.documentation.getDocumentation("signatureShell_Param3")
                                    },
                                    {
                                        label: "]"
                                    }
                                ]
                            }
                        ],
                        activeSignature: 0,
                        activeParameter: null
                    };
                    shellSignatureHelp.activeParameter = this.getJSONSignatureActiveParameter(document, shell, position, false, false, true);
                    return shellSignatureHelp.activeParameter === -1 ? null : shellSignatureHelp;
                case "STOPSIGNAL":
                    return {
                        signatures: [
                            {
                                label: "STOPSIGNAL signal",
                                documentation: this.documentation.getDocumentation("signatureStopsignal"),
                                parameters: [
                                    {
                                        label: "signal",
                                        documentation: this.documentation.getDocumentation("signatureStopsignal_Param")
                                    }
                                ]
                            }
                        ],
                        activeSignature: 0,
                        activeParameter: 0
                    };
                case "USER":
                    let userSignatureHelp = {
                        signatures: [
                            {
                                label: "USER user",
                                documentation: this.documentation.getDocumentation("signatureUser_Signature0"),
                                parameters: [
                                    {
                                        label: "user",
                                        documentation: this.documentation.getDocumentation("signatureUser_Signature0_Param")
                                    }
                                ]
                            },
                            {
                                label: "USER user:group",
                                documentation: this.documentation.getDocumentation("signatureUser_Signature1"),
                                parameters: [
                                    {
                                        label: "user",
                                        documentation: this.documentation.getDocumentation("signatureUser_Signature1_Param0")
                                    },
                                    {
                                        label: "group",
                                        documentation: this.documentation.getDocumentation("signatureUser_Signature1_Param1")
                                    }
                                ]
                            },
                            {
                                label: "USER uid",
                                documentation: this.documentation.getDocumentation("signatureUser_Signature2"),
                                parameters: [
                                    {
                                        label: "uid",
                                        documentation: this.documentation.getDocumentation("signatureUser_Signature2_Param")
                                    }
                                ]
                            },
                            {
                                label: "USER uid:gid",
                                documentation: this.documentation.getDocumentation("signatureUser_Signature3"),
                                parameters: [
                                    {
                                        label: "uid",
                                        documentation: this.documentation.getDocumentation("signatureUser_Signature3_Param0")
                                    },
                                    {
                                        label: "gid",
                                        documentation: this.documentation.getDocumentation("signatureUser_Signature3_Param1")
                                    }
                                ]
                            }
                        ],
                        activeSignature: 0,
                        activeParameter: 0
                    };
                    let userSeparatorIndex = instruction.getTextContent().indexOf(":");
                    if (userSeparatorIndex !== -1) {
                        userSignatureHelp = {
                            signatures: [
                                {
                                    label: "USER user:group",
                                    documentation: this.documentation.getDocumentation("signatureUser_Signature1"),
                                    parameters: [
                                        {
                                            label: "user",
                                            documentation: this.documentation.getDocumentation("signatureUser_Signature1_Param0")
                                        },
                                        {
                                            label: "group",
                                            documentation: this.documentation.getDocumentation("signatureUser_Signature1_Param1")
                                        }
                                    ]
                                },
                                {
                                    label: "USER uid:gid",
                                    documentation: this.documentation.getDocumentation("signatureUser_Signature3"),
                                    parameters: [
                                        {
                                            label: "uid",
                                            documentation: this.documentation.getDocumentation("signatureUser_Signature3_Param0")
                                        },
                                        {
                                            label: "gid",
                                            documentation: this.documentation.getDocumentation("signatureUser_Signature3_Param1")
                                        }
                                    ]
                                }
                            ],
                            activeSignature: 0,
                            activeParameter: 0
                        };

                        if (document.offsetAt(position) > document.offsetAt(instruction.getRange().start) + userSeparatorIndex) {
                            userSignatureHelp.activeParameter = 1;
                        }
                    }
                    return userSignatureHelp;
                case "VOLUME":
                    const volume = instruction as JSONInstruction;
                    const volumeJsonSignature = {
                        label: "VOLUME [ \"/vol\", ... ]",
                        documentation: this.documentation.getDocumentation("signatureVolume_Signature1"),
                        parameters: [
                            {
                                label: "["
                            },
                            {
                                label: "\"/vol\"",
                                documentation: this.documentation.getDocumentation("signatureVolume_Signature1_Param1")
                            },
                            {
                                label: "...",
                                documentation: this.documentation.getDocumentation("signatureVolume_Signature1_Param2")
                            },
                            {
                                label: "]"
                            }
                        ]
                    };
                    const volumeShellSignature = {
                        label: "VOLUME /vol ...",
                        documentation: this.documentation.getDocumentation("signatureVolume_Signature0"),
                        parameters: [
                            {
                                label: "/vol",
                                documentation: this.documentation.getDocumentation("signatureVolume_Signature0_Param0")
                            },
                            {
                                label: "...",
                                documentation: this.documentation.getDocumentation("signatureVolume_Signature0_Param1")
                            }
                        ]
                    };
                    return this.getJSONInstructionSignatureHelp(document, volume, position, [volumeJsonSignature], volumeShellSignature, false, true, true, true);
                case "WORKDIR":
                    return {
                        signatures: [
                            {
                                label: "WORKDIR /the/workdir/path",
                                documentation: this.documentation.getDocumentation("signatureWorkdir"),
                                parameters: [
                                    {
                                        label: "/the/workdir/path",
                                        documentation: this.documentation.getDocumentation("signatureWorkdir_Param")
                                    }
                                ]
                            }
                        ],
                        activeSignature: 0,
                        activeParameter: 0
                    };
            }
        }
        return null;
    }

    private getFromSignatureHelp(position: Position, from: From): SignatureHelp | null {
        let baseImage = {
            label: "FROM baseImage",
            documentation: this.documentation.getDocumentation("signatureFrom_Signature0"),
            parameters: [
                {
                    label: "baseImage",
                    documentation: this.documentation.getDocumentation("signatureFrom_Signature0_Param")
                }
            ]
        };
        let baseImageTag = {
            label: "FROM baseImage:tag",
            documentation: this.documentation.getDocumentation("signatureFrom_Signature1"),
            parameters: [
                {
                    label: "baseImage",
                    documentation: this.documentation.getDocumentation("signatureFrom_Signature1_Param0")
                },
                {
                    label: "tag",
                    documentation: this.documentation.getDocumentation("signatureFrom_Signature1_Param1")
                }
            ]
        };
        let baseImageDigest = {
            label: "FROM baseImage@digest",
            documentation: this.documentation.getDocumentation("signatureFrom_Signature2"),
            parameters: [
                {
                    label: "baseImage",
                    documentation: this.documentation.getDocumentation("signatureFrom_Signature2_Param0")
                },
                {
                    label: "digest",
                    documentation: this.documentation.getDocumentation("signatureFrom_Signature2_Param1")
                }
            ]
        };
        let baseImageStage = {
            label: "FROM baseImage AS stage",
            documentation: this.documentation.getDocumentation("signatureFrom_Signature3"),
            parameters: [
                {
                    label: "baseImage",
                    documentation: this.documentation.getDocumentation("signatureFrom_Signature3_Param0")
                },
                {
                    // placeholder parameter to get the activeParameter to line
                    // up with all three signature types of FROM
                    // see rcjsuen/dockerfile-language-service#8
                    label: ""
                },
                {
                    label: "AS",
                },
                {
                    label: "stage",
                    documentation: this.documentation.getDocumentation("signatureFrom_Signature3_Param2")
                }
            ]
        };
        let baseImageTagStage = {
            label: "FROM baseImage:tag AS stage",
            documentation: this.documentation.getDocumentation("signatureFrom_Signature4"),
            parameters: [
                {
                    label: "baseImage",
                    documentation: this.documentation.getDocumentation("signatureFrom_Signature4_Param0")
                },
                {
                    label: "tag",
                    documentation: this.documentation.getDocumentation("signatureFrom_Signature4_Param1")
                },
                {
                    label: "AS",
                },
                {
                    label: "stage",
                    documentation: this.documentation.getDocumentation("signatureFrom_Signature4_Param3")
                }
            ]
        };
        let baseImageDigestStage = {
            label: "FROM baseImage@digest AS stage",
            documentation: this.documentation.getDocumentation("signatureFrom_Signature5"),
            parameters: [
                {
                    label: "baseImage",
                    documentation: this.documentation.getDocumentation("signatureFrom_Signature5_Param0")
                },
                {
                    label: "digest",
                    documentation: this.documentation.getDocumentation("signatureFrom_Signature5_Param1")
                },
                {
                    label: "AS",
                },
                {
                    label: "stage",
                    documentation: this.documentation.getDocumentation("signatureFrom_Signature5_Param3")
                }
            ]
        };
        let fromSignatures = [
            baseImage, baseImageTag, baseImageDigest,
            baseImageStage, baseImageTagStage, baseImageDigestStage
        ];

        const args = from.getArguments();
        if (args.length >= 3 && args[2].isBefore(position)) {
            return null;
        } else if (args.length === 0) {
            return {
                signatures: fromSignatures,
                activeSignature: 0,
                activeParameter: 0
            };
        }

        const image = args[0].getValue();
        const digest = image.indexOf('@') !== -1;
        const tag = !digest && image.indexOf(':') !== -1;
        const stagesOnly = args.length > 1 || args[0].isBefore(position);
        return {
            signatures: this.getFromSignatures(fromSignatures, tag, digest, stagesOnly),
            activeSignature: 0,
            activeParameter: this.getFromActiveParameter(position, from, tag, digest, args)
        };
    }

    private getFromSignatures(fromSignatures: SignatureInformation[], tag: boolean, digest: boolean, stagesOnly: boolean): SignatureInformation[] {
        if (digest) {
            return stagesOnly ? [fromSignatures[5]] : [fromSignatures[2], fromSignatures[5]];
        } else if (tag) {
            return stagesOnly ? [fromSignatures[4]] : [fromSignatures[1], fromSignatures[4]];
        }
        return stagesOnly ? [fromSignatures[3], fromSignatures[4], fromSignatures[5]] : fromSignatures;
    }

    private getFromActiveParameter(position: Position, from: From, tag: boolean, digest: boolean, args: Argument[]): number {
        const inTag = tag && Util.isInsideRange(position, from.getImageTagRange());
        const inDigest = digest && Util.isInsideRange(position, from.getImageDigestRange());
        if (args.length === 1) {
            if (args[0].isBefore(position)) {
                return 2;
            }
        } else if (args.length === 2) {
            if (args[1].isBefore(position)) {
                return 3;
            } else if (Util.isInsideRange(position, args[1].getRange()) || args[0].isBefore(position)) {
                return 2;
            }
        } else {
            if (Util.isInsideRange(position, args[2].getRange()) || args[1].isBefore(position)) {
                return 3;
            } else if (Util.isInsideRange(position, args[1].getRange()) || args[0].isBefore(position)) {
                return 2;
            }
        }
        return inTag || inDigest ? 1 : 0;
    }

    private getJSONInstructionSignatureHelp(
        document: TextDocument,
        instruction: JSONInstruction, position: Position, jsonSignatures: SignatureInformation[],
        shellSignature: SignatureInformation,
        hasFlags: boolean, jsonFirst: boolean, singleParameter: boolean, finalRepeats: boolean
    ): SignatureHelp {
        let activeParameter = this.getJSONSignatureActiveParameter(document, instruction, position, hasFlags, singleParameter, finalRepeats);
        if (activeParameter === -1) {
            activeParameter = this.getSignatureActiveParameter(instruction, position, hasFlags, singleParameter ? 1 : 2, finalRepeats);
            return {
                signatures: [shellSignature],
                activeSignature: 0,
                activeParameter: activeParameter
            }
        } else if (activeParameter === 0) {
            if (jsonFirst) {
                jsonSignatures.push(shellSignature);
                return {
                    signatures: jsonSignatures,
                    activeSignature: 0,
                    activeParameter: 0
                }
            }
            jsonSignatures.unshift(shellSignature);
            return {
                signatures: jsonSignatures,
                activeSignature: 0,
                activeParameter: 0
            }
        } else if (activeParameter === 1 && hasFlags) {
            if (jsonFirst) {
                jsonSignatures.push(shellSignature);
                return {
                    signatures: jsonSignatures,
                    activeSignature: 0,
                    activeParameter: 1
                }
            }
            jsonSignatures.unshift(shellSignature);
            return {
                signatures: jsonSignatures,
                activeSignature: 0,
                activeParameter: 1
            }
        }
        return {
            signatures: jsonSignatures,
            activeSignature: 0,
            activeParameter: activeParameter
        }
    }

    private getJSONSignatureActiveParameter(document: TextDocument, instruction: JSONInstruction, position: Position, hasFlags: boolean, singleParameter: boolean, finalRepeats: boolean): number {
        const flagsOffset = hasFlags ? 1 : 0;
        if (hasFlags) {
            const flags = instruction.getFlags();
            if (flags.length > 0) {
                const flagPosition = flags[flags.length - 1].getRange().end;
                if (Util.positionBefore(position, flagPosition) || Util.positionEquals(position, flagPosition)) {
                    return 0;
                }
            }
        }

        const closingBracket = instruction.getClosingBracket();
        if (closingBracket) {
            const range = closingBracket.getRange();
            if (range.end.line === position.line && range.end.character === position.character) {
                if (singleParameter) {
                    return 3 + flagsOffset;
                }
                return 4 + flagsOffset;
            } else if (closingBracket.isBefore(position)) {
                return -1;
            }
        }

        const jsonStrings = instruction.getJSONStrings();
        if (!singleParameter && jsonStrings.length > 1 && jsonStrings[1].isBefore(position)) {
            if (jsonStrings.length === 2) {
                return 3 + flagsOffset;
            }

            if (finalRepeats || Util.isInsideRange(position, jsonStrings[jsonStrings.length - 1].getRange())) {
                return 3 + flagsOffset;
            }
            return 2 + flagsOffset;
        }

        if (jsonStrings.length > 0 && jsonStrings[0].isBefore(position)) {
            if (jsonStrings.length > 2) {
                return 2 + flagsOffset;
            }

            let start = document.offsetAt(jsonStrings[0].getRange().end)
            let end = document.offsetAt(position);
            let between = document.getText().substring(start, end);
            if (between.indexOf(',') === -1) {
                return 1 + flagsOffset;
            }
            if (finalRepeats) {
                return 2 + flagsOffset;
            }
            return 3 + flagsOffset;
        }

        const openingBracket = instruction.getOpeningBracket();
        if (openingBracket) {
            const range = openingBracket.getRange();
            if ((range.end.line === position.line && range.end.character === position.character) || openingBracket.isBefore(position)) {
                return 1 + flagsOffset;
            }
            return 0 + flagsOffset;
        } else if (instruction.getArguments().length === 0) {
            return 0 + flagsOffset;
        }

        return -1;
    }

    private getSignatureActiveParameter(instruction: Instruction, position: Position, hasFlags: boolean, max: number, finalRepeats: boolean): number {
        const flagsOffset = hasFlags ? 1 : 0;
        const args = instruction.getArguments();
        if (finalRepeats) {
            for (let i = args.length - 1; i >= 0; i--) {
                if (args[i].isBefore(position)) {
                    return Math.min(i + 1, max) + flagsOffset;
                } else if (Util.isInsideRange(position, args[i].getRange())) {
                    return Math.min(i, max) + flagsOffset;
                }
            }
        }

        switch (args.length) {
            case 1:
                if (args[0].isBefore(position)) {
                    return 2 + flagsOffset;
                }
                return 0 + flagsOffset;
            default:
                if (args[args.length - 1].isBefore(position) || Util.isInsideRange(position, args[args.length - 1].getRange())) {
                    return 2 + flagsOffset;
                } else if (args[0].isBefore(position)) {
                    return 1 + flagsOffset;
                }
                return 0 + flagsOffset;
        }
    }

    private getPropertySignatureHelp(document: TextDocument, position: Position, signatures: SignatureInformation[], properties: Property[]): SignatureHelp {
        return {
            signatures: this.getPropertySignatures(document, position, signatures, properties),
            activeSignature: 0,
            activeParameter: this.getPropertySignatureActiveParameter(document, position, properties)
        };
    }

    private getPropertySignatures(document: TextDocument, position: Position, signatures: SignatureInformation[], properties: Property[]): SignatureInformation[] {
        if (properties.length === 0) {
            return signatures;
        } else if (properties.length === 1) {
            const valueRange = properties[0].getValueRange();
            if (valueRange === null) {
                return DockerSignatures.isNameBefore(properties[0], position) ? [signatures[0]] : signatures;
            }

            const delimiter = document.getText().substring(document.offsetAt(properties[0].getNameRange().end), document.offsetAt(valueRange.start));
            if (delimiter.indexOf('=') === -1) {
                return [signatures[0]];
            } else if (DockerSignatures.isValueBefore(properties[0], position)) {
                return [signatures[2]];
            }
        } else {
            return [signatures[2]];
        }
        return [signatures[1], signatures[2]];
    }

    private getPropertySignatureActiveParameter(document: TextDocument, position: Position, properties: Property[]): number {
        if (properties.length === 0) {
            return 0;
        }

        for (let i = properties.length - 1; i > 0; i--) {
            if (DockerSignatures.isInValue(properties[i], position)) {
                return 3;
            } else if (DockerSignatures.isNameBefore(properties[i], position) || DockerSignatures.isInName(properties[i], position)) {
                return 2;
            }
        }

        if (DockerSignatures.isInValue(properties[0], position)) {
            return 1;
        } else if (DockerSignatures.isValueBefore(properties[0], position)) {
            const delimiter = document.getText().substring(document.offsetAt(properties[0].getNameRange().end), document.offsetAt(properties[0].getValueRange().start));
            return delimiter.indexOf('=') === -1 ? 1 : 2;
        }
        return DockerSignatures.isNameBefore(properties[0], position) ? 1 : 0;
    }

    private static isInName(property: Property, position: Position): boolean {
        return Util.isInsideRange(position, property.getNameRange());
    }

    private static isNameBefore(property: Property, position: Position): boolean {
        let range = property.getNameRange();
        if (DockerSignatures.isInName(property, position)) {
            return false;
        } else if (range.start.line < position.line) {
            return true;
        }
        return range.start.line === position.line ? range.end.character < position.character : false;
    }

    private static isInValue(property: Property, position: Position): boolean {
        let range = property.getValueRange();
        return range ? Util.isInsideRange(position, range) : false;
    }

    private static isValueBefore(property: Property, position: Position): boolean {
        let range = property.getValueRange();
        if (range === null) {
            return false;
        } else if (range.start.line < position.line) {
            return true;
        } else if (range.start.line === position.line) {
            if (range.start.line === range.end.line) {
                return range.end.character < position.character;
            }
            return range.start.character < position.character;
        }
        return false;
    }
}
