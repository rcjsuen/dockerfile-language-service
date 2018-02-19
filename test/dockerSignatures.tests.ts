/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import * as assert from "assert";

import {
    TextDocument, Position, SignatureHelp, SignatureInformation
} from 'vscode-languageserver-types';
import { PlainTextDocumentation } from '../src/dockerPlainText';
import { DockerfileLanguageServiceFactory } from '../src/main';

let docs = new PlainTextDocumentation();
let service = DockerfileLanguageServiceFactory.createLanguageService();

function compute(content: string, line: number, character: number): SignatureHelp {
    return service.computeSignatureHelp(content, Position.create(line, character));
}

function assertNoSignatures(signatureHelp: SignatureHelp) {
    assert.equal(signatureHelp.activeSignature, null);
    assert.equal(signatureHelp.activeParameter, null);
    assert.equal(signatureHelp.signatures.length, 0);
}

function assertKeyValue_Single(signature: SignatureInformation, label: string, documentation: string, paramLabel: string, paramDoc: string, paramLabel2: string, paramDoc2: string) {
    assert.equal(signature.label, label);
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, documentation);
    assert.equal(signature.parameters.length, 2);
    assert.equal(signature.parameters[0].label, paramLabel);
    assert.notEqual(signature.parameters[0].documentation, null);
    assert.equal(signature.parameters[0].documentation, paramDoc);
    assert.equal(signature.parameters[1].label, paramLabel2);
    assert.notEqual(signature.parameters[1].documentation, null);
    assert.equal(signature.parameters[1].documentation, paramDoc2);
}

function assertKeyValue_EqualsMulti(signature: SignatureInformation, label: string, documentation: string, paramLabel: string, paramDoc: string, paramLabel2: string, paramDoc2: string, paramLabel3: string, paramDoc3: string, paramLabel4: string, paramDoc4: string) {
    assert.equal(signature.label, label);
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, documentation);
    assert.equal(signature.parameters.length, 4);
    assert.equal(signature.parameters[0].label, paramLabel);
    assert.notEqual(signature.parameters[0].documentation, null);
    assert.equal(signature.parameters[0].documentation, paramDoc);
    assert.equal(signature.parameters[1].label, paramLabel2);
    assert.notEqual(signature.parameters[1].documentation, null);
    assert.equal(signature.parameters[1].documentation, paramDoc2);
    assert.equal(signature.parameters[2].label, paramLabel3);
    assert.notEqual(signature.parameters[2].documentation, null);
    assert.equal(signature.parameters[2].documentation, paramDoc3);
    assert.equal(signature.parameters[3].label, paramLabel4);
    assert.notEqual(signature.parameters[3].documentation, null);
    assert.equal(signature.parameters[3].documentation, paramDoc4);
}

function assertAdd_Shell(signature: SignatureInformation) {
    assert.equal(signature.label, "ADD [flags] source ... dest");
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, docs.getDocumentation("signatureAdd_Signature0"));
    assert.equal(signature.parameters.length, 4);
    assert.equal(signature.parameters[0].label, "[flags]");
    assert.notEqual(signature.parameters[0].documentation, null);
    assert.equal(signature.parameters[0].documentation, docs.getDocumentation("signatureAdd_Signature0_Param0"));
    assert.equal(signature.parameters[1].label, "source");
    assert.notEqual(signature.parameters[1].documentation, null);
    assert.equal(signature.parameters[1].documentation, docs.getDocumentation("signatureAdd_Signature0_Param1"));
    assert.equal(signature.parameters[2].label, "...");
    assert.notEqual(signature.parameters[2].documentation, null);
    assert.equal(signature.parameters[2].documentation, docs.getDocumentation("signatureAdd_Signature0_Param2"));
    assert.equal(signature.parameters[3].label, "dest");
    assert.notEqual(signature.parameters[3].documentation, null);
    assert.equal(signature.parameters[3].documentation, docs.getDocumentation("signatureAdd_Signature0_Param3"));
}

function assertAdd_JSON(signature: SignatureInformation) {
    assert.equal(signature.label, "ADD [flags] [ \"source\", ..., \"dest\" ]");
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, docs.getDocumentation("signatureAdd_Signature1"));
    assert.equal(signature.parameters.length, 6);
    assert.equal(signature.parameters[0].label, "[flags]");
    assert.notEqual(signature.parameters[0].documentation, null);
    assert.equal(signature.parameters[0].documentation, docs.getDocumentation("signatureAdd_Signature1_Param0"));
    assert.equal(signature.parameters[1].label, "[");
    assert.equal(signature.parameters[1].documentation, null);
    assert.equal(signature.parameters[2].label, "\"source\"");
    assert.notEqual(signature.parameters[2].documentation, null);
    assert.equal(signature.parameters[2].documentation, docs.getDocumentation("signatureAdd_Signature1_Param2"));
    assert.equal(signature.parameters[3].label, "...");
    assert.notEqual(signature.parameters[3].documentation, null);
    assert.equal(signature.parameters[3].documentation, docs.getDocumentation("signatureAdd_Signature1_Param3"));
    assert.equal(signature.parameters[4].label, "\"dest\"");
    assert.notEqual(signature.parameters[4].documentation, null);
    assert.equal(signature.parameters[4].documentation, docs.getDocumentation("signatureAdd_Signature1_Param4"));
    assert.equal(signature.parameters[5].label, "]");
    assert.equal(signature.parameters[5].documentation, null);
}

function assertAdd(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assert.equal(signatureHelp.signatures.length, 2);
    assertAdd_Shell(signatureHelp.signatures[0]);
    assertAdd_JSON(signatureHelp.signatures[1]);
}

function assertAdd_JSONOnly(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assert.equal(signatureHelp.signatures.length, 1);
    assertAdd_JSON(signatureHelp.signatures[0]);
}

function assertAdd_ShellOnly(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assert.equal(signatureHelp.signatures.length, 1);
    assertAdd_Shell(signatureHelp.signatures[0]);
}

function assertEscape(signatureHelp: SignatureHelp) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, 0);
    assert.equal(signatureHelp.signatures.length, 1);
    assert.equal(signatureHelp.signatures[0].label, "escape=`\\`");
    assert.notEqual(signatureHelp.signatures[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].documentation, docs.getDocumentation("signatureEscape"));
    assert.equal(signatureHelp.signatures[0].parameters.length, 1);
    assert.equal(signatureHelp.signatures[0].parameters[0].label, "\\");
    assert.notEqual(signatureHelp.signatures[0].parameters[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].parameters[0].documentation, docs.getDocumentation("signatureEscape_Param"));
}

function assertCmd_JSONExecutable(signature: SignatureInformation) {
    assert.equal(signature.label, "CMD [ \"executable\", \"parameter\", ... ]");
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, docs.getDocumentation("signatureCmd_Signature0"));
    assert.equal(signature.parameters.length, 5);
    assert.equal(signature.parameters[0].label, "[");
    assert.equal(signature.parameters[0].documentation, null);
    assert.equal(signature.parameters[1].label, "\"executable\"");
    assert.notEqual(signature.parameters[1].documentation, null);
    assert.equal(signature.parameters[1].documentation, docs.getDocumentation("signatureCmd_Signature0_Param1"));
    assert.equal(signature.parameters[2].label, "\"parameter\"");
    assert.notEqual(signature.parameters[2].documentation, null);
    assert.equal(signature.parameters[2].documentation, docs.getDocumentation("signatureCmd_Signature0_Param2"));
    assert.equal(signature.parameters[3].label, "...");
    assert.notEqual(signature.parameters[3].documentation, null);
    assert.equal(signature.parameters[3].documentation, docs.getDocumentation("signatureCmd_Signature0_Param3"));
    assert.equal(signature.parameters[4].label, "]");
    assert.equal(signature.parameters[4].documentation, null);
}

function assertCmd_JSONParameters(signature: SignatureInformation) {
    assert.equal(signature.label, "CMD [ \"parameter\", \"parameter2\", ... ]");
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, docs.getDocumentation("signatureCmd_Signature1"));
    assert.equal(signature.parameters.length, 5);
    assert.equal(signature.parameters[0].label, "[");
    assert.equal(signature.parameters[0].documentation, null);
    assert.equal(signature.parameters[1].label, "\"parameter\"");
    assert.notEqual(signature.parameters[1].documentation, null);
    assert.equal(signature.parameters[1].documentation, docs.getDocumentation("signatureCmd_Signature1_Param1"));
    assert.equal(signature.parameters[2].label, "\"parameter2\"");
    assert.notEqual(signature.parameters[2].documentation, null);
    assert.equal(signature.parameters[2].documentation, docs.getDocumentation("signatureCmd_Signature1_Param2"));
    assert.equal(signature.parameters[3].label, "...");
    assert.notEqual(signature.parameters[3].documentation, null);
    assert.equal(signature.parameters[3].documentation, docs.getDocumentation("signatureCmd_Signature1_Param3"));
    assert.equal(signature.parameters[4].label, "]");
    assert.equal(signature.parameters[4].documentation, null);
}

function assertCmd_Shell(signature: SignatureInformation) {
    assert.equal(signature.label, "CMD executable parameter ...");
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, docs.getDocumentation("signatureCmd_Signature2"));
    assert.equal(signature.parameters.length, 3);
    assert.equal(signature.parameters[0].label, "executable");
    assert.notEqual(signature.parameters[0].documentation, null);
    assert.equal(signature.parameters[0].documentation, docs.getDocumentation("signatureCmd_Signature2_Param0"));
    assert.equal(signature.parameters[1].label, "parameter");
    assert.notEqual(signature.parameters[1].documentation, null);
    assert.equal(signature.parameters[1].documentation, docs.getDocumentation("signatureCmd_Signature2_Param1"));
    assert.equal(signature.parameters[2].label, "...");
    assert.notEqual(signature.parameters[2].documentation, null);
    assert.equal(signature.parameters[2].documentation, docs.getDocumentation("signatureCmd_Signature2_Param2"));
}

function assertCmd(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assert.equal(signatureHelp.signatures.length, 3);
    assertCmd_JSONExecutable(signatureHelp.signatures[0]);
    assertCmd_JSONParameters(signatureHelp.signatures[1]);
    assertCmd_Shell(signatureHelp.signatures[2]);
}

function assertCmd_JSONOnly(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assert.equal(signatureHelp.signatures.length, 2);
    assertCmd_JSONExecutable(signatureHelp.signatures[0]);
    assertCmd_JSONParameters(signatureHelp.signatures[1]);
}

function assertCmd_ShellOnly(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assert.equal(signatureHelp.signatures.length, 1);
    assertCmd_Shell(signatureHelp.signatures[0]);
}

function assertCopy_FlagFrom(signatureHelp: SignatureHelp) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, 0);
    assert.equal(signatureHelp.signatures.length, 1);
    assert.equal(signatureHelp.signatures[0].label, "--from=stage");
    assert.notEqual(signatureHelp.signatures[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].documentation, docs.getDocumentation("signatureCopyFlagFrom"));
    assert.equal(signatureHelp.signatures[0].parameters.length, 1);
    assert.equal(signatureHelp.signatures[0].parameters[0].label, "stage");
    assert.notEqual(signatureHelp.signatures[0].parameters[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].parameters[0].documentation, docs.getDocumentation("signatureCopyFlagFrom_Param"));
}

function assertCopy_Shell(signature: SignatureInformation) {
    assert.equal(signature.label, "COPY [flags] source ... dest");
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, docs.getDocumentation("signatureCopy_Signature0"));
    assert.equal(signature.parameters.length, 4);
    assert.equal(signature.parameters[0].label, "[flags]");
    assert.notEqual(signature.parameters[0].documentation, null);
    assert.equal(signature.parameters[0].documentation, docs.getDocumentation("signatureCopy_Signature0_Param0"));
    assert.equal(signature.parameters[1].label, "source");
    assert.notEqual(signature.parameters[1].documentation, null);
    assert.equal(signature.parameters[1].documentation, docs.getDocumentation("signatureCopy_Signature0_Param1"));
    assert.equal(signature.parameters[2].label, "...");
    assert.notEqual(signature.parameters[2].documentation, null);
    assert.equal(signature.parameters[2].documentation, docs.getDocumentation("signatureCopy_Signature0_Param2"));
    assert.equal(signature.parameters[3].label, "dest");
    assert.notEqual(signature.parameters[3].documentation, null);
    assert.equal(signature.parameters[3].documentation, docs.getDocumentation("signatureCopy_Signature0_Param3"));
}

function assertCopy_JSON(signature: SignatureInformation) {
    assert.equal(signature.label, "COPY [flags] [ \"source\", ..., \"dest\" ]");
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, docs.getDocumentation("signatureCopy_Signature1"));
    assert.equal(signature.parameters.length, 6);
    assert.equal(signature.parameters[0].label, "[flags]");
    assert.notEqual(signature.parameters[0].documentation, null);
    assert.equal(signature.parameters[0].documentation, docs.getDocumentation("signatureCopy_Signature1_Param0"));
    assert.equal(signature.parameters[1].label, "[");
    assert.equal(signature.parameters[1].documentation, null);
    assert.equal(signature.parameters[2].label, "\"source\"");
    assert.notEqual(signature.parameters[2].documentation, null);
    assert.equal(signature.parameters[2].documentation, docs.getDocumentation("signatureCopy_Signature1_Param2"));
    assert.equal(signature.parameters[3].label, "...");
    assert.notEqual(signature.parameters[3].documentation, null);
    assert.equal(signature.parameters[3].documentation, docs.getDocumentation("signatureCopy_Signature1_Param3"));
    assert.equal(signature.parameters[4].label, "\"dest\"");
    assert.notEqual(signature.parameters[4].documentation, null);
    assert.equal(signature.parameters[4].documentation, docs.getDocumentation("signatureCopy_Signature1_Param4"));
    assert.equal(signature.parameters[5].label, "]");
    assert.equal(signature.parameters[5].documentation, null);
}

function assertCopy(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assert.equal(signatureHelp.signatures.length, 2);
    assertCopy_Shell(signatureHelp.signatures[0]);
    assertCopy_JSON(signatureHelp.signatures[1]);
}

function assertCopy_JSONOnly(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assert.equal(signatureHelp.signatures.length, 1);
    assertCopy_JSON(signatureHelp.signatures[0]);
}

function assertCopy_ShellOnly(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assert.equal(signatureHelp.signatures.length, 1);
    assertCopy_Shell(signatureHelp.signatures[0]);
}

function assertHealthcheck_FlagInterval(signatureHelp: SignatureHelp) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, 0);
    assert.equal(signatureHelp.signatures.length, 1);
    assert.equal(signatureHelp.signatures[0].label, "HEALTHCHECK --interval=30s ...");
    assert.notEqual(signatureHelp.signatures[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].documentation, docs.getDocumentation("signatureHealthcheck"));
    assert.equal(signatureHelp.signatures[0].parameters.length, 1);
    assert.equal(signatureHelp.signatures[0].parameters[0].label, "30s");
    assert.notEqual(signatureHelp.signatures[0].parameters[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].parameters[0].documentation, docs.getDocumentation("signatureHealthcheckFlagInterval_Param"));
}

function assertHealthcheck_FlagRetries(signatureHelp: SignatureHelp) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, 0);
    assert.equal(signatureHelp.signatures.length, 1);
    assert.equal(signatureHelp.signatures[0].label, "HEALTHCHECK --retries=3 ...");
    assert.notEqual(signatureHelp.signatures[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].documentation, docs.getDocumentation("signatureHealthcheck"));
    assert.equal(signatureHelp.signatures[0].parameters.length, 1);
    assert.equal(signatureHelp.signatures[0].parameters[0].label, "3");
    assert.notEqual(signatureHelp.signatures[0].parameters[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].parameters[0].documentation, docs.getDocumentation("signatureHealthcheckFlagRetries_Param"));
}

function assertHealthcheck_FlagStartPeriod(signatureHelp: SignatureHelp) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, 0);
    assert.equal(signatureHelp.signatures.length, 1);
    assert.equal(signatureHelp.signatures[0].label, "HEALTHCHECK --start-period=5s ...");
    assert.notEqual(signatureHelp.signatures[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].documentation, docs.getDocumentation("signatureHealthcheck"));
    assert.equal(signatureHelp.signatures[0].parameters.length, 1);
    assert.equal(signatureHelp.signatures[0].parameters[0].label, "5s");
    assert.notEqual(signatureHelp.signatures[0].parameters[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].parameters[0].documentation, docs.getDocumentation("signatureHealthcheckFlagStartPeriod_Param"));
}

function assertHealthcheck_FlagTimeout(signatureHelp: SignatureHelp) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, 0);
    assert.equal(signatureHelp.signatures.length, 1);
    assert.equal(signatureHelp.signatures[0].label, "HEALTHCHECK --timeout=30s ...");
    assert.notEqual(signatureHelp.signatures[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].documentation, docs.getDocumentation("signatureHealthcheck"));
    assert.equal(signatureHelp.signatures[0].parameters.length, 1);
    assert.equal(signatureHelp.signatures[0].parameters[0].label, "30s");
    assert.notEqual(signatureHelp.signatures[0].parameters[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].parameters[0].documentation, docs.getDocumentation("signatureHealthcheckFlagTimeout_Param"));
}

function assertArg_Name(signatureHelp: SignatureHelp) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, 0);
    assert.equal(signatureHelp.signatures.length, 2);

    assert.equal(signatureHelp.signatures[0].label, "ARG name");
    assert.notEqual(signatureHelp.signatures[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].documentation, docs.getDocumentation("signatureArg_Signature0"));
    assert.equal(signatureHelp.signatures[0].parameters.length, 1);
    assert.equal(signatureHelp.signatures[0].parameters[0].label, "name");
    assert.notEqual(signatureHelp.signatures[0].parameters[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].parameters[0].documentation, docs.getDocumentation("signatureArg_Signature0_Param"));

    assert.equal(signatureHelp.signatures[1].label, "ARG name=defaultValue");
    assert.notEqual(signatureHelp.signatures[1].documentation, null);
    assert.equal(signatureHelp.signatures[1].documentation, docs.getDocumentation("signatureArg_Signature1"));
    assert.equal(signatureHelp.signatures[1].parameters.length, 2);
    assert.equal(signatureHelp.signatures[1].parameters[0].label, "name");
    assert.notEqual(signatureHelp.signatures[1].parameters[0].documentation, null);
    assert.equal(signatureHelp.signatures[1].parameters[0].documentation, docs.getDocumentation("signatureArg_Signature1_Param0"));
    assert.equal(signatureHelp.signatures[1].parameters[1].label, "defaultValue");
    assert.notEqual(signatureHelp.signatures[1].parameters[1].documentation, null);
    assert.equal(signatureHelp.signatures[1].parameters[1].documentation, docs.getDocumentation("signatureArg_Signature1_Param1"));
}

function assertArg_NameDefaultValue(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assert.equal(signatureHelp.signatures[0].label, "ARG name=defaultValue");
    assert.notEqual(signatureHelp.signatures[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].documentation, docs.getDocumentation("signatureArg_Signature1"));
    assert.equal(signatureHelp.signatures[0].parameters.length, 2);
    assert.equal(signatureHelp.signatures[0].parameters[0].label, "name");
    assert.notEqual(signatureHelp.signatures[0].parameters[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].parameters[0].documentation, docs.getDocumentation("signatureArg_Signature1_Param0"));
    assert.equal(signatureHelp.signatures[0].parameters[1].label, "defaultValue");
    assert.notEqual(signatureHelp.signatures[0].parameters[1].documentation, null);
    assert.equal(signatureHelp.signatures[0].parameters[1].documentation, docs.getDocumentation("signatureArg_Signature1_Param1"));
}

function assertEnv_Space(signature: SignatureInformation) {
    assertKeyValue_Single(
        signature,
        "ENV key value",
        docs.getDocumentation("signatureEnv_Signature0"),
        "key",
        docs.getDocumentation("signatureEnv_Signature0_Param0"),
        "value",
        docs.getDocumentation("signatureEnv_Signature0_Param1")
    );
}

function assertEnv_EqualsSingle(signature: SignatureInformation) {
    assertKeyValue_Single(
        signature,
        "ENV key=value",
        docs.getDocumentation("signatureEnv_Signature1"),
        "key",
        docs.getDocumentation("signatureEnv_Signature1_Param0"),
        "value",
        docs.getDocumentation("signatureEnv_Signature1_Param1")
    );
}

function assertEnv_EqualsMulti(signature: SignatureInformation) {
    assertKeyValue_EqualsMulti(
        signature,
        "ENV key=value key2=value2",
        docs.getDocumentation("signatureEnv_Signature2"),
        "key",
        docs.getDocumentation("signatureEnv_Signature2_Param0"),
        "value",
        docs.getDocumentation("signatureEnv_Signature2_Param1"),
        "key2",
        docs.getDocumentation("signatureEnv_Signature2_Param2"),
        "value2",
        docs.getDocumentation("signatureEnv_Signature2_Param3")
    );
}

function assertEnv(signatureHelp: SignatureHelp) {
    assert.equal(signatureHelp.signatures.length, 3);
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, 0);
    assertEnv_Space(signatureHelp.signatures[0]);
    assertEnv_EqualsSingle(signatureHelp.signatures[1]);
    assertEnv_EqualsMulti(signatureHelp.signatures[2]);
}

function assertEnv_SpaceOnly(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.signatures.length, 1);
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assertEnv_Space(signatureHelp.signatures[0]);
}

function assertEnv_Equals(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.signatures.length, 2);
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assertEnv_EqualsSingle(signatureHelp.signatures[0]);
    assertEnv_EqualsMulti(signatureHelp.signatures[1]);
}

function assertEnv_EqualsMultiOnly(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.signatures.length, 1);
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assertEnv_EqualsMulti(signatureHelp.signatures[0]);
}

function assertEntrypoint_JSON(signature: SignatureInformation) {
    assert.equal(signature.label, "ENTRYPOINT [ \"executable\", \"parameter\", ... ]");
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, docs.getDocumentation("signatureEntrypoint_Signature0"));
    assert.equal(signature.parameters.length, 5);
    assert.equal(signature.parameters[0].label, "[");
    assert.equal(signature.parameters[0].documentation, null);
    assert.equal(signature.parameters[1].label, "\"executable\"");
    assert.notEqual(signature.parameters[1].documentation, null);
    assert.equal(signature.parameters[1].documentation, docs.getDocumentation("signatureEntrypoint_Signature0_Param1"));
    assert.equal(signature.parameters[2].label, "\"parameter\"");
    assert.notEqual(signature.parameters[2].documentation, null);
    assert.equal(signature.parameters[2].documentation, docs.getDocumentation("signatureEntrypoint_Signature0_Param2"));
    assert.equal(signature.parameters[3].label, "...");
    assert.notEqual(signature.parameters[3].documentation, null);
    assert.equal(signature.parameters[3].documentation, docs.getDocumentation("signatureEntrypoint_Signature0_Param3"));
    assert.equal(signature.parameters[4].label, "]");
    assert.equal(signature.parameters[4].documentation, null);
}

function assertEntrypoint_Shell(signature: SignatureInformation) {
    assert.equal(signature.label, "ENTRYPOINT executable parameter ...");
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, docs.getDocumentation("signatureEntrypoint_Signature1"));
    assert.equal(signature.parameters.length, 3);
    assert.equal(signature.parameters[0].label, "executable");
    assert.notEqual(signature.parameters[0].documentation, null);
    assert.equal(signature.parameters[0].documentation, docs.getDocumentation("signatureEntrypoint_Signature1_Param0"));
    assert.equal(signature.parameters[1].label, "parameter");
    assert.notEqual(signature.parameters[1].documentation, null);
    assert.equal(signature.parameters[1].documentation, docs.getDocumentation("signatureEntrypoint_Signature1_Param1"));
    assert.equal(signature.parameters[2].label, "...");
    assert.notEqual(signature.parameters[2].documentation, null);
    assert.equal(signature.parameters[2].documentation, docs.getDocumentation("signatureEntrypoint_Signature1_Param2"));
}

function assertEntrypoint(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assert.equal(signatureHelp.signatures.length, 2);
    assertEntrypoint_JSON(signatureHelp.signatures[0]);
    assertEntrypoint_Shell(signatureHelp.signatures[1]);
}

function assertEntrypoint_JSONOnly(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assert.equal(signatureHelp.signatures.length, 1);
    assertEntrypoint_JSON(signatureHelp.signatures[0]);
}

function assertEntrypoint_ShellOnly(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assert.equal(signatureHelp.signatures.length, 1);
    assertEntrypoint_Shell(signatureHelp.signatures[0]);
}

function assertExpose(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assert.equal(signatureHelp.signatures.length, 1);
    assert.equal(signatureHelp.signatures[0].label, "EXPOSE port ...");
    assert.notEqual(signatureHelp.signatures[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].documentation, docs.getDocumentation("signatureExpose"));
    assert.equal(signatureHelp.signatures[0].parameters.length, 2);
    assert.equal(signatureHelp.signatures[0].parameters[0].label, "port");
    assert.notEqual(signatureHelp.signatures[0].parameters[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].parameters[0].documentation, docs.getDocumentation("signatureExpose_Param0"));
    assert.equal(signatureHelp.signatures[0].parameters[1].label, "...");
    assert.notEqual(signatureHelp.signatures[0].parameters[1].documentation, null);
    assert.equal(signatureHelp.signatures[0].parameters[1].documentation, docs.getDocumentation("signatureExpose_Param1"));
}

function assertFrom_Image(signature: SignatureInformation) {
    assert.equal(signature.label, "FROM baseImage");
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, docs.getDocumentation("signatureFrom_Signature0"));
    assert.equal(signature.parameters.length, 1);
    assert.equal(signature.parameters[0].label, "baseImage");
    assert.notEqual(signature.parameters[0].documentation, null);
    assert.equal(signature.parameters[0].documentation, docs.getDocumentation("signatureFrom_Signature0_Param"));
}

function assertFrom_ImageTag(signature: SignatureInformation) {
    assert.equal(signature.label, "FROM baseImage:tag");
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, docs.getDocumentation("signatureFrom_Signature1"));
    assert.equal(signature.parameters.length, 2);
    assert.equal(signature.parameters[0].label, "baseImage");
    assert.notEqual(signature.parameters[0].documentation, null);
    assert.equal(signature.parameters[0].documentation, docs.getDocumentation("signatureFrom_Signature1_Param0"));
    assert.equal(signature.parameters[1].label, "tag");
    assert.notEqual(signature.parameters[1].documentation, null);
    assert.equal(signature.parameters[1].documentation, docs.getDocumentation("signatureFrom_Signature1_Param1"));
}

function assertFrom_ImageDigest(signature: SignatureInformation) {
    assert.equal(signature.label, "FROM baseImage@digest");
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, docs.getDocumentation("signatureFrom_Signature2"));
    assert.equal(signature.parameters.length, 2);
    assert.equal(signature.parameters[0].label, "baseImage");
    assert.notEqual(signature.parameters[0].documentation, null);
    assert.equal(signature.parameters[0].documentation, docs.getDocumentation("signatureFrom_Signature2_Param0"));
    assert.equal(signature.parameters[1].label, "digest");
    assert.notEqual(signature.parameters[1].documentation, null);
    assert.equal(signature.parameters[1].documentation, docs.getDocumentation("signatureFrom_Signature2_Param1"));
}

function assertFrom_Image_BuildStage(signature: SignatureInformation) {
    assert.equal(signature.label, "FROM baseImage AS stage");
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, docs.getDocumentation("signatureFrom_Signature3"));
    assert.equal(signature.parameters.length, 4);
    assert.equal(signature.parameters[0].label, "baseImage");
    assert.notEqual(signature.parameters[0].documentation, null);
    assert.equal(signature.parameters[0].documentation, docs.getDocumentation("signatureFrom_Signature3_Param0"));
    assert.equal(signature.parameters[1].label, "");
    assert.equal(signature.parameters[1].documentation, null);
    assert.equal(signature.parameters[2].label, "AS");
    assert.equal(signature.parameters[2].documentation, null);
    assert.equal(signature.parameters[3].label, "stage");
    assert.notEqual(signature.parameters[3].documentation, null);
    assert.equal(signature.parameters[3].documentation, docs.getDocumentation("signatureFrom_Signature3_Param2"));
}

function assertFrom_ImageTag_BuildStage(signature: SignatureInformation) {
    assert.equal(signature.label, "FROM baseImage:tag AS stage");
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, docs.getDocumentation("signatureFrom_Signature4"));
    assert.equal(signature.parameters.length, 4);
    assert.equal(signature.parameters[0].label, "baseImage");
    assert.notEqual(signature.parameters[0].documentation, null);
    assert.equal(signature.parameters[0].documentation, docs.getDocumentation("signatureFrom_Signature4_Param0"));
    assert.equal(signature.parameters[1].label, "tag");
    assert.notEqual(signature.parameters[1].documentation, null);
    assert.equal(signature.parameters[1].documentation, docs.getDocumentation("signatureFrom_Signature4_Param1"));
    assert.equal(signature.parameters[2].label, "AS");
    assert.equal(signature.parameters[2].documentation, null);
    assert.equal(signature.parameters[3].label, "stage");
    assert.notEqual(signature.parameters[3].documentation, null);
    assert.equal(signature.parameters[3].documentation, docs.getDocumentation("signatureFrom_Signature4_Param3"));
}

function assertFrom_ImageDigest_BuildStage(signature: SignatureInformation) {
    assert.equal(signature.label, "FROM baseImage@digest AS stage");
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, docs.getDocumentation("signatureFrom_Signature5"));
    assert.equal(signature.parameters.length, 4);
    assert.equal(signature.parameters[0].label, "baseImage");
    assert.notEqual(signature.parameters[0].documentation, null);
    assert.equal(signature.parameters[0].documentation, docs.getDocumentation("signatureFrom_Signature5_Param0"));
    assert.equal(signature.parameters[1].label, "digest");
    assert.notEqual(signature.parameters[1].documentation, null);
    assert.equal(signature.parameters[1].documentation, docs.getDocumentation("signatureFrom_Signature5_Param1"));
    assert.equal(signature.parameters[2].label, "AS");
    assert.equal(signature.parameters[2].documentation, null);
    assert.equal(signature.parameters[3].label, "stage");
    assert.notEqual(signature.parameters[3].documentation, null);
    assert.equal(signature.parameters[3].documentation, docs.getDocumentation("signatureFrom_Signature5_Param3"));
}

function assertFrom(signatureHelp: SignatureHelp) {
    assert.equal(signatureHelp.signatures.length, 6);
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, 0);
    assertFrom_Image(signatureHelp.signatures[0]);
    assertFrom_ImageTag(signatureHelp.signatures[1]);
    assertFrom_ImageDigest(signatureHelp.signatures[2]);
    assertFrom_Image_BuildStage(signatureHelp.signatures[3]);
    assertFrom_ImageTag_BuildStage(signatureHelp.signatures[4]);
    assertFrom_ImageDigest_BuildStage(signatureHelp.signatures[5]);
}

function assertFrom_Tags(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.signatures.length, 2);
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assertFrom_ImageTag(signatureHelp.signatures[0]);
    assertFrom_ImageTag_BuildStage(signatureHelp.signatures[1]);
}

function assertFrom_Digests(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.signatures.length, 2);
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assertFrom_ImageDigest(signatureHelp.signatures[0]);
    assertFrom_ImageDigest_BuildStage(signatureHelp.signatures[1]);
}

function assertFrom_BuildStages(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.signatures.length, 3);
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assertFrom_Image_BuildStage(signatureHelp.signatures[0]);
    assertFrom_ImageTag_BuildStage(signatureHelp.signatures[1]);
    assertFrom_ImageDigest_BuildStage(signatureHelp.signatures[2]);
}

function assertFrom_Tags_BuildStages_Only(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.signatures.length, 1);
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assertFrom_ImageTag_BuildStage(signatureHelp.signatures[0]);
}

function assertFrom_Digests_BuildStages_Only(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.signatures.length, 1);
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assertFrom_ImageDigest_BuildStage(signatureHelp.signatures[0]);
}

function assertHealthcheck_Cmd_Empty(signature: SignatureInformation) {
    assert.equal(signature.label, "HEALTHCHECK [flags] CMD ...");
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, docs.getDocumentation("signatureHealthcheck_Signature0"));
    assert.equal(signature.parameters.length, 1);
    assert.equal(signature.parameters[0].label, "CMD");
    assert.equal(signature.parameters[0].documentation, null);
}

function assertHealthcheck_Cmd_Normal(signature: SignatureInformation) {
    assert.equal(signature.label, "HEALTHCHECK [flags] CMD ...");
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, docs.getDocumentation("signatureHealthcheck_Signature1"));
    assert.equal(signature.parameters.length, 3);
    assert.equal(signature.parameters[0].label, "[flags]");
    assert.notEqual(signature.parameters[0].documentation, null);
    assert.equal(signature.parameters[0].documentation, docs.getDocumentation("signatureHealthcheck_Signature1_Param0"));
    assert.equal(signature.parameters[1].label, "CMD");
    assert.equal(signature.parameters[1].documentation, null);
    assert.equal(signature.parameters[2].label, "...");
    assert.notEqual(signature.parameters[2].documentation, null);
    assert.equal(signature.parameters[2].documentation, docs.getDocumentation("signatureHealthcheck_Signature1_Param2"));
}

function assertHealthcheck_None(signature: SignatureInformation) {
    assert.equal(signature.label, "HEALTHCHECK NONE");
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, docs.getDocumentation("signatureHealthcheck_Signature2"));
    assert.equal(signature.parameters.length, 1);
    assert.equal(signature.parameters[0].label, "NONE");
    assert.equal(signature.parameters[0].documentation, null);
}

function assertHealthcheck_Both(signatureHelp: SignatureHelp) {
    assert.equal(signatureHelp.signatures.length, 2);
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, 0);
    assertHealthcheck_Cmd_Empty(signatureHelp.signatures[0]);
    assertHealthcheck_None(signatureHelp.signatures[1]);
}

function assertHealthcheck_Cmd_NormalOnly(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.signatures.length, 1);
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assertHealthcheck_Cmd_Normal(signatureHelp.signatures[0]);
}

function assertHealthcheck_NoneOnly(signatureHelp: SignatureHelp) {
    assert.equal(signatureHelp.signatures.length, 1);
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, 0);
    assertHealthcheck_None(signatureHelp.signatures[0]);
}

function assertLabel_Space(signature: SignatureInformation) {
    assertKeyValue_Single(
        signature,
        "LABEL key value",
        docs.getDocumentation("signatureLabel_Signature0"),
        "key",
        docs.getDocumentation("signatureLabel_Signature0_Param0"),
        "value",
        docs.getDocumentation("signatureLabel_Signature0_Param1")
    );
}

function assertLabel_EqualsSingle(signature: SignatureInformation) {
    assertKeyValue_Single(
        signature,
        "LABEL key=value",
        docs.getDocumentation("signatureLabel_Signature1"),
        "key",
        docs.getDocumentation("signatureLabel_Signature1_Param0"),
        "value",
        docs.getDocumentation("signatureLabel_Signature1_Param1")
    );
}

function assertLabel_EqualsMulti(signature: SignatureInformation) {
    assertKeyValue_EqualsMulti(
        signature,
        "LABEL key=value key2=value2",
        docs.getDocumentation("signatureLabel_Signature2"),
        "key",
        docs.getDocumentation("signatureLabel_Signature2_Param0"),
        "value",
        docs.getDocumentation("signatureLabel_Signature2_Param1"),
        "key2",
        docs.getDocumentation("signatureLabel_Signature2_Param2"),
        "value2",
        docs.getDocumentation("signatureLabel_Signature2_Param3")
    );
}

function assertLabel(signatureHelp: SignatureHelp) {
    assert.equal(signatureHelp.signatures.length, 3);
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, 0);
    assertLabel_Space(signatureHelp.signatures[0]);
    assertLabel_EqualsSingle(signatureHelp.signatures[1]);
    assertLabel_EqualsMulti(signatureHelp.signatures[2]);
}

function assertLabel_SpaceOnly(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.signatures.length, 1);
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assertLabel_Space(signatureHelp.signatures[0]);
}

function assertLabel_Equals(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.signatures.length, 2);
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assertLabel_EqualsSingle(signatureHelp.signatures[0]);
    assertLabel_EqualsMulti(signatureHelp.signatures[1]);
}

function assertLabel_EqualsMultiOnly(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.signatures.length, 1);
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assertLabel_EqualsMulti(signatureHelp.signatures[0]);
}

function assertMaintainer(signatureHelp: SignatureHelp) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, 0);
    assert.equal(signatureHelp.signatures.length, 1);
    assert.equal(signatureHelp.signatures[0].label, "MAINTAINER name");
    assert.notEqual(signatureHelp.signatures[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].documentation, docs.getDocumentation("signatureMaintainer"));
    assert.equal(signatureHelp.signatures[0].parameters.length, 1);
    assert.equal(signatureHelp.signatures[0].parameters[0].label, "name");
    assert.notEqual(signatureHelp.signatures[0].parameters[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].parameters[0].documentation, docs.getDocumentation("signatureMaintainer_Param"));
}

function assertOnbuild(signatureHelp: SignatureHelp) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, 0);
    assert.equal(signatureHelp.signatures.length, 1);
    assert.equal(signatureHelp.signatures[0].label, "ONBUILD INSTRUCTION");
    assert.notEqual(signatureHelp.signatures[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].documentation, docs.getDocumentation("signatureOnbuild"));
    assert.equal(signatureHelp.signatures[0].parameters.length, 1);
    assert.equal(signatureHelp.signatures[0].parameters[0].label, "INSTRUCTION");
    assert.notEqual(signatureHelp.signatures[0].parameters[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].parameters[0].documentation, docs.getDocumentation("signatureOnbuild_Param"));
}

function assertRun_Shell(signature: SignatureInformation) {
    assert.equal(signature.label, "RUN command parameter ...");
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, docs.getDocumentation("signatureRun_Signature0"));
    assert.equal(signature.parameters.length, 3);
    assert.equal(signature.parameters[0].label, "command");
    assert.notEqual(signature.parameters[0].documentation, null);
    assert.equal(signature.parameters[0].documentation, docs.getDocumentation("signatureRun_Signature0_Param0"));
    assert.equal(signature.parameters[1].label, "parameter");
    assert.notEqual(signature.parameters[1].documentation, null);
    assert.equal(signature.parameters[1].documentation, docs.getDocumentation("signatureRun_Signature0_Param1"));
    assert.equal(signature.parameters[2].label, "...");
    assert.notEqual(signature.parameters[2].documentation, null);
    assert.equal(signature.parameters[2].documentation, docs.getDocumentation("signatureRun_Signature0_Param2"));
}

function assertRun_JSON(signature: SignatureInformation) {
    assert.equal(signature.label, "RUN [ \"command\", \"parameter\", ... ]");
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, docs.getDocumentation("signatureRun_Signature1"));
    assert.equal(signature.parameters.length, 5);
    assert.equal(signature.parameters[0].label, "[");
    assert.equal(signature.parameters[0].documentation, null);
    assert.equal(signature.parameters[1].label, "\"command\"");
    assert.notEqual(signature.parameters[1].documentation, null);
    assert.equal(signature.parameters[1].documentation, docs.getDocumentation("signatureRun_Signature1_Param1"));
    assert.equal(signature.parameters[2].label, "\"parameter\"");
    assert.notEqual(signature.parameters[2].documentation, null);
    assert.equal(signature.parameters[2].documentation, docs.getDocumentation("signatureRun_Signature1_Param2"));
    assert.equal(signature.parameters[3].label, "...");
    assert.notEqual(signature.parameters[3].documentation, null);
    assert.equal(signature.parameters[3].documentation, docs.getDocumentation("signatureRun_Signature1_Param3"));
    assert.equal(signature.parameters[4].label, "]");
    assert.equal(signature.parameters[4].documentation, null);
}

function assertRun(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assert.equal(signatureHelp.signatures.length, 2);
    assertRun_Shell(signatureHelp.signatures[0]);
    assertRun_JSON(signatureHelp.signatures[1]);
}

function assertRun_JSONOnly(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assert.equal(signatureHelp.signatures.length, 1);
    assertRun_JSON(signatureHelp.signatures[0]);
}

function assertRun_ShellOnly(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assert.equal(signatureHelp.signatures.length, 1);
    assertRun_Shell(signatureHelp.signatures[0]);
}

function assertShell(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assert.equal(signatureHelp.signatures.length, 1);
    assert.equal(signatureHelp.signatures[0].label, "SHELL [ \"executable\", \"parameter\", ... ]");
    assert.notEqual(signatureHelp.signatures[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].documentation, docs.getDocumentation("signatureShell"));
    assert.equal(signatureHelp.signatures[0].parameters.length, 5);
    assert.equal(signatureHelp.signatures[0].parameters[0].label, "[");
    assert.equal(signatureHelp.signatures[0].parameters[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].parameters[1].label, "\"executable\"");
    assert.notEqual(signatureHelp.signatures[0].parameters[1].documentation, null);
    assert.equal(signatureHelp.signatures[0].parameters[1].documentation, docs.getDocumentation("signatureShell_Param1"));
    assert.equal(signatureHelp.signatures[0].parameters[2].label, "\"parameter\"");
    assert.notEqual(signatureHelp.signatures[0].parameters[2].documentation, null);
    assert.equal(signatureHelp.signatures[0].parameters[2].documentation, docs.getDocumentation("signatureShell_Param2"));
    assert.equal(signatureHelp.signatures[0].parameters[3].label, "...");
    assert.notEqual(signatureHelp.signatures[0].parameters[3].documentation, null);
    assert.equal(signatureHelp.signatures[0].parameters[3].documentation, docs.getDocumentation("signatureShell_Param3"));
    assert.equal(signatureHelp.signatures[0].parameters[4].label, "]");
    assert.equal(signatureHelp.signatures[0].parameters[4].documentation, null);
}

function assertStopsignal(signatureHelp: SignatureHelp) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, 0);
    assert.equal(signatureHelp.signatures.length, 1);
    assert.equal(signatureHelp.signatures[0].label, "STOPSIGNAL signal");
    assert.notEqual(signatureHelp.signatures[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].documentation, docs.getDocumentation("signatureStopsignal"));
    assert.equal(signatureHelp.signatures[0].parameters.length, 1);
    assert.equal(signatureHelp.signatures[0].parameters[0].label, "signal");
    assert.notEqual(signatureHelp.signatures[0].parameters[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].parameters[0].documentation, docs.getDocumentation("signatureStopsignal_Param"));
}

function assertUser_All(signatureHelp: SignatureHelp) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, 0);
    assert.equal(signatureHelp.signatures.length, 4);

    assert.equal(signatureHelp.signatures[0].label, "USER user");
    assert.notEqual(signatureHelp.signatures[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].documentation, docs.getDocumentation("signatureUser_Signature0"));
    assert.equal(signatureHelp.signatures[0].parameters.length, 1);
    assert.equal(signatureHelp.signatures[0].parameters[0].label, "user");
    assert.notEqual(signatureHelp.signatures[0].parameters[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].parameters[0].documentation, docs.getDocumentation("signatureUser_Signature0_Param"));

    assert.equal(signatureHelp.signatures[1].label, "USER user:group");
    assert.notEqual(signatureHelp.signatures[1].documentation, null);
    assert.equal(signatureHelp.signatures[1].documentation, docs.getDocumentation("signatureUser_Signature1"));
    assert.equal(signatureHelp.signatures[1].parameters.length, 2);
    assert.equal(signatureHelp.signatures[1].parameters[0].label, "user");
    assert.notEqual(signatureHelp.signatures[1].parameters[0].documentation, null);
    assert.equal(signatureHelp.signatures[1].parameters[0].documentation, docs.getDocumentation("signatureUser_Signature1_Param0"));
    assert.equal(signatureHelp.signatures[1].parameters[1].label, "group");
    assert.notEqual(signatureHelp.signatures[1].parameters[1].documentation, null);
    assert.equal(signatureHelp.signatures[1].parameters[1].documentation, docs.getDocumentation("signatureUser_Signature1_Param1"));

    assert.equal(signatureHelp.signatures[2].label, "USER uid");
    assert.notEqual(signatureHelp.signatures[2].documentation, null);
    assert.equal(signatureHelp.signatures[2].documentation, docs.getDocumentation("signatureUser_Signature2"));
    assert.equal(signatureHelp.signatures[2].parameters.length, 1);
    assert.equal(signatureHelp.signatures[2].parameters[0].label, "uid");
    assert.notEqual(signatureHelp.signatures[2].parameters[0].documentation, null);
    assert.equal(signatureHelp.signatures[2].parameters[0].documentation, docs.getDocumentation("signatureUser_Signature2_Param"));

    assert.equal(signatureHelp.signatures[3].label, "USER uid:gid");
    assert.notEqual(signatureHelp.signatures[3].documentation, null);
    assert.equal(signatureHelp.signatures[3].documentation, docs.getDocumentation("signatureUser_Signature3"));
    assert.equal(signatureHelp.signatures[3].parameters.length, 2);
    assert.equal(signatureHelp.signatures[3].parameters[0].label, "uid");
    assert.notEqual(signatureHelp.signatures[3].parameters[0].documentation, null);
    assert.equal(signatureHelp.signatures[3].parameters[0].documentation, docs.getDocumentation("signatureUser_Signature3_Param0"));
    assert.equal(signatureHelp.signatures[3].parameters[1].label, "gid");
    assert.notEqual(signatureHelp.signatures[3].parameters[1].documentation, null);
    assert.equal(signatureHelp.signatures[3].parameters[1].documentation, docs.getDocumentation("signatureUser_Signature3_Param1"));
}

function assertUser_GroupsOnly(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assert.equal(signatureHelp.signatures.length, 2);

    assert.equal(signatureHelp.signatures[0].label, "USER user:group");
    assert.notEqual(signatureHelp.signatures[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].documentation, docs.getDocumentation("signatureUser_Signature1"));
    assert.equal(signatureHelp.signatures[0].parameters.length, 2);
    assert.equal(signatureHelp.signatures[0].parameters[0].label, "user");
    assert.notEqual(signatureHelp.signatures[0].parameters[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].parameters[0].documentation, docs.getDocumentation("signatureUser_Signature1_Param0"));
    assert.equal(signatureHelp.signatures[0].parameters[1].label, "group");
    assert.notEqual(signatureHelp.signatures[0].parameters[1].documentation, null);
    assert.equal(signatureHelp.signatures[0].parameters[1].documentation, docs.getDocumentation("signatureUser_Signature1_Param1"));

    assert.equal(signatureHelp.signatures[1].label, "USER uid:gid");
    assert.notEqual(signatureHelp.signatures[1].documentation, null);
    assert.equal(signatureHelp.signatures[1].documentation, docs.getDocumentation("signatureUser_Signature3"));
    assert.equal(signatureHelp.signatures[1].parameters.length, 2);
    assert.equal(signatureHelp.signatures[1].parameters[0].label, "uid");
    assert.notEqual(signatureHelp.signatures[1].parameters[0].documentation, null);
    assert.equal(signatureHelp.signatures[1].parameters[0].documentation, docs.getDocumentation("signatureUser_Signature3_Param0"));
    assert.equal(signatureHelp.signatures[1].parameters[1].label, "gid");
    assert.notEqual(signatureHelp.signatures[1].parameters[1].documentation, null);
    assert.equal(signatureHelp.signatures[1].parameters[1].documentation, docs.getDocumentation("signatureUser_Signature3_Param1"));
}

function assertVolume_JSON(signature: SignatureInformation) {
    assert.equal(signature.label, "VOLUME [ \"/vol\", ... ]");
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, docs.getDocumentation("signatureVolume_Signature1"));
    assert.equal(signature.parameters.length, 4);
    assert.equal(signature.parameters[0].label, "[");
    assert.equal(signature.parameters[0].documentation, null);
    assert.equal(signature.parameters[1].label, "\"/vol\"");
    assert.notEqual(signature.parameters[1].documentation, null);
    assert.equal(signature.parameters[1].documentation, docs.getDocumentation("signatureVolume_Signature1_Param1"));
    assert.equal(signature.parameters[2].label, "...");
    assert.notEqual(signature.parameters[2].documentation, null);
    assert.equal(signature.parameters[2].documentation, docs.getDocumentation("signatureVolume_Signature1_Param2"));
    assert.equal(signature.parameters[3].label, "]");
    assert.equal(signature.parameters[3].documentation, null);
}

function assertVolume_Shell(signature: SignatureInformation) {
    assert.equal(signature.label, "VOLUME /vol ...");
    assert.notEqual(signature.documentation, null);
    assert.equal(signature.documentation, docs.getDocumentation("signatureVolume_Signature0"));
    assert.equal(signature.parameters.length, 2);
    assert.equal(signature.parameters[0].label, "/vol");
    assert.notEqual(signature.parameters[0].documentation, null);
    assert.equal(signature.parameters[0].documentation, docs.getDocumentation("signatureVolume_Signature0_Param0"));
    assert.equal(signature.parameters[1].label, "...");
    assert.notEqual(signature.parameters[1].documentation, null);
    assert.equal(signature.parameters[1].documentation, docs.getDocumentation("signatureVolume_Signature0_Param1"));
}

function assertVolume(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assert.equal(signatureHelp.signatures.length, 2);
    assertVolume_JSON(signatureHelp.signatures[0]);
    assertVolume_Shell(signatureHelp.signatures[1]);
}

function assertVolume_JSONOnly(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assert.equal(signatureHelp.signatures.length, 1);
    assertVolume_JSON(signatureHelp.signatures[0]);
}

function assertVolume_ShellOnly(signatureHelp: SignatureHelp, activeParameter: number) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, activeParameter);
    assert.equal(signatureHelp.signatures.length, 1);
    assertVolume_Shell(signatureHelp.signatures[0]);
}

function assertWorkdir(signatureHelp: SignatureHelp) {
    assert.equal(signatureHelp.activeSignature, 0);
    assert.equal(signatureHelp.activeParameter, 0);
    assert.equal(signatureHelp.signatures.length, 1);
    assert.equal(signatureHelp.signatures[0].label, "WORKDIR /the/workdir/path");
    assert.notEqual(signatureHelp.signatures[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].documentation, docs.getDocumentation("signatureWorkdir"));
    assert.equal(signatureHelp.signatures[0].parameters.length, 1);
    assert.equal(signatureHelp.signatures[0].parameters[0].label, "/the/workdir/path");
    assert.notEqual(signatureHelp.signatures[0].parameters[0].documentation, null);
    assert.equal(signatureHelp.signatures[0].parameters[0].documentation, docs.getDocumentation("signatureWorkdir_Param"));
}

describe("Dockerfile Signature Tests", function () {
    describe("directives", function () {
        describe("escape", function () {
            it("ok", function () {
                let signatureHelp = compute("#escape=", 0, 8);
                assertEscape(signatureHelp);

                signatureHelp = compute("# escape=", 0, 9);
                assertEscape(signatureHelp);

                signatureHelp = compute("#escape =", 0, 9);
                assertEscape(signatureHelp);

                signatureHelp = compute("#escape= ", 0, 9);
                assertEscape(signatureHelp);

                signatureHelp = compute("#ESCAPE=", 0, 8);
                assertEscape(signatureHelp);

                signatureHelp = compute("# ESCAPE=", 0, 9);
                assertEscape(signatureHelp);

                signatureHelp = compute("#ESCAPE =", 0, 9);
                assertEscape(signatureHelp);

                signatureHelp = compute("#esCaPE=", 0, 8);
                assertEscape(signatureHelp);

                signatureHelp = compute("# esCaPE=", 0, 9);
                assertEscape(signatureHelp);

                signatureHelp = compute("#esCaPE =", 0, 9);
                assertEscape(signatureHelp);
            });

            it("invalid", function () {
                let signatureHelp = compute("#property=", 0, 10);
                assertNoSignatures(signatureHelp);
            });
        });
    });

    function testAdd(trigger: boolean) {
        let onbuild = trigger ? "ONBUILD " : "";
        let triggerOffset = trigger ? 8 : 0;

        describe("ADD", function () {
            testParameterizedInstruction("ADD", trigger, true, false, false, assertAdd, assertAdd_JSONOnly, assertAdd_ShellOnly);

            describe("flags", function () {
                it("inside", function () {
                    assertAdd(compute(onbuild + "ADD --f ", 0, triggerOffset + 4), 0);
                    assertAdd(compute(onbuild + "ADD --f ", 0, triggerOffset + 5), 0);
                    assertAdd(compute(onbuild + "ADD --f ", 0, triggerOffset + 6), 0);
                    assertAdd(compute(onbuild + "ADD --f ", 0, triggerOffset + 7), 0);
                });

                it("outside", function () {
                    assertAdd(compute(onbuild + "ADD --chown= ", 0, triggerOffset + 13), 1);
                    assertAdd_ShellOnly(compute(onbuild + "ADD app --chown= app ", 0, triggerOffset + 16), 2);
                    assertAdd_ShellOnly(compute(onbuild + "ADD app app --chown=", 0, triggerOffset + 20), 3);
                });

                it("before", function () {
                    assertAdd(compute(onbuild + "ADD  \\\n--chown=node:node . .", 0, triggerOffset + 4), 0);
                });

                it("after", function () {
                    assertAdd(compute(onbuild + "ADD --chown=node:node ", 0, triggerOffset + 22), 1);
                    assertAdd(compute(onbuild + "ADD --chown=node:node \\\n ", 1, 1), 1);

                    assertAdd_JSONOnly(compute(onbuild + "ADD --chown=node:node [", 0, triggerOffset + 23), 2);
                    assertAdd_JSONOnly(compute(onbuild + "ADD --chown=node:node [ ", 0, triggerOffset + 23), 2);
                    assertAdd_JSONOnly(compute(onbuild + "ADD --chown=node:node [ ", 0, triggerOffset + 24), 2);

                    assertAdd_ShellOnly(compute(onbuild + "ADD --chown=node:node .", 0, triggerOffset + 23), 1);
                    assertAdd_ShellOnly(compute(onbuild + "ADD --chown=node:node . ", 0, triggerOffset + 23), 1);
                    assertAdd_ShellOnly(compute(onbuild + "ADD --chown=node:node . ", 0, triggerOffset + 24), 3);
                });

                it("not a flag", function () {
                    assertAdd_ShellOnly(compute(onbuild + "ADD - ", 0, triggerOffset + 4), 1);
                    assertAdd_ShellOnly(compute(onbuild + "ADD - ", 0, triggerOffset + 5), 1);
                    assertAdd_ShellOnly(compute(onbuild + "ADD - ", 0, triggerOffset + 6), 3);
                });
            });
        });
    }

    testAdd(false);

    function testArg(trigger: boolean) {
        let onbuild = trigger ? "ONBUILD " : "";
        let triggerOffset = trigger ? 8 : 0;

        describe("ARG", function () {
            it("name", function () {
                let signatureHelp = compute(onbuild + "ARG ", 0, triggerOffset + 4);
                assertArg_Name(signatureHelp);

                signatureHelp = compute(onbuild + "ARG name", 0, triggerOffset + 6);
                assertArg_Name(signatureHelp);

                signatureHelp = compute(onbuild + "ARG name", 0, triggerOffset + 8);
                assertArg_Name(signatureHelp);
            });

            it("name=defaultValue", function () {
                let signatureHelp = compute(onbuild + "ARG name=", 0, triggerOffset + 4);
                assertArg_NameDefaultValue(signatureHelp, 0);

                signatureHelp = compute(onbuild + "ARG name=", 0, triggerOffset + 6);
                assertArg_NameDefaultValue(signatureHelp, 0);

                signatureHelp = compute(onbuild + "ARG name=", 0, triggerOffset + 8);
                assertArg_NameDefaultValue(signatureHelp, 0);

                signatureHelp = compute(onbuild + "ARG name=value", 0, triggerOffset + 4);
                assertArg_NameDefaultValue(signatureHelp, 0);

                signatureHelp = compute(onbuild + "ARG name=value", 0, triggerOffset + 6);
                assertArg_NameDefaultValue(signatureHelp, 0);

                signatureHelp = compute(onbuild + "ARG name=value", 0, triggerOffset + 8);
                assertArg_NameDefaultValue(signatureHelp, 0);

                signatureHelp = compute(onbuild + "ARG name=value", 0, triggerOffset + 9);
                assertArg_NameDefaultValue(signatureHelp, 1);

                signatureHelp = compute(onbuild + "ARG name=value", 0, triggerOffset + 12);
                assertArg_NameDefaultValue(signatureHelp, 1);

                signatureHelp = compute(onbuild + "ARG name=value ", 0, triggerOffset + 15);
                assertArg_NameDefaultValue(signatureHelp, 1);

                signatureHelp = compute(onbuild + "ARG name=value space", 0, triggerOffset + 16);
                assertArg_NameDefaultValue(signatureHelp, 1);
            });

            it("invalid", function () {
                let signatureHelp = compute(onbuild + "ARG ", 0, triggerOffset + 1);
                if (trigger) {
                    assertOnbuild(signatureHelp);
                } else {
                    assertNoSignatures(signatureHelp);
                }

                signatureHelp = compute(onbuild + "ARG ", 0, triggerOffset + 3);
                if (trigger) {
                    assertOnbuild(signatureHelp);
                } else {
                    assertNoSignatures(signatureHelp);
                }
            });
        });
    }

    testArg(false);

    function testCmd(trigger: boolean) {
        describe("CMD", function () {
            testParameterizedInstruction("CMD", trigger, false, false, true, assertCmd, assertCmd_JSONOnly, assertCmd_ShellOnly);
        });
    }

    testCmd(false);

    function testCopy(trigger: boolean) {
        let onbuild = trigger ? "ONBUILD " : "";
        let triggerOffset = trigger ? 8 : 0;

        describe("COPY", function () {
            testParameterizedInstruction("COPY", trigger, true, false, false, assertCopy, assertCopy_JSONOnly, assertCopy_ShellOnly);

            describe("flags", function () {
                it("inside", function () {
                    assertCopy(compute(onbuild + "COPY --f ", 0, triggerOffset + 5), 0);
                    assertCopy(compute(onbuild + "COPY --f ", 0, triggerOffset + 6), 0);
                    assertCopy(compute(onbuild + "COPY --f ", 0, triggerOffset + 7), 0);
                    assertCopy(compute(onbuild + "COPY --f ", 0, triggerOffset + 8), 0);
                });

                it("outside", function () {
                    assertCopy(compute(onbuild + "COPY --from= ", 0, triggerOffset + 13), 1);
                    assertCopy_ShellOnly(compute(onbuild + "COPY app --from= app ", 0, triggerOffset + 16), 2);
                    assertCopy_ShellOnly(compute(onbuild + "COPY app app --from=", 0, triggerOffset + 20), 3);
                });

                it("before", function () {
                    assertCopy(compute(onbuild + "COPY  \\\n--from=stage . .", 0, triggerOffset + 5), 0);
                });

                it("after", function () {
                    assertCopy(compute(onbuild + "COPY --from=dev ", 0, triggerOffset + 16), 1);
                    assertCopy(compute(onbuild + "COPY --from=dev \\\n ", 1, 1), 1);

                    assertCopy_JSONOnly(compute(onbuild + "COPY --from=stage [", 0, triggerOffset + 19), 2);
                    assertCopy_JSONOnly(compute(onbuild + "COPY --from=stage [ ", 0, triggerOffset + 19), 2);
                    assertCopy_JSONOnly(compute(onbuild + "COPY --from=stage [ ", 0, triggerOffset + 20), 2);

                    assertCopy_ShellOnly(compute(onbuild + "COPY --from=stage .", 0, triggerOffset + 19), 1);
                    assertCopy_ShellOnly(compute(onbuild + "COPY --from=stage . ", 0, triggerOffset + 19), 1);
                    assertCopy_ShellOnly(compute(onbuild + "COPY --from=stage . ", 0, triggerOffset + 20), 3);
                });

                it("not a flag", function () {
                    assertCopy_ShellOnly(compute(onbuild + "COPY - ", 0, triggerOffset + 5), 1);
                    assertCopy_ShellOnly(compute(onbuild + "COPY - ", 0, triggerOffset + 6), 1);
                    assertCopy_ShellOnly(compute(onbuild + "COPY - ", 0, triggerOffset + 7), 3);
                });
            });

            describe("--from", function () {
                it("ok", function () {
                    let signatureHelp = compute(onbuild + "COPY --from=", 0, triggerOffset + 12);
                    assertCopy_FlagFrom(signatureHelp);

                    signatureHelp = compute(onbuild + "COPY --from= app app", 0, triggerOffset + 12);
                    assertCopy_FlagFrom(signatureHelp);

                    signatureHelp = compute(onbuild + "COPY --from=s app app", 0, triggerOffset + 13);
                    assertCopy_FlagFrom(signatureHelp);
                });
            });
        });
    }

    testCopy(false);

    function testParameterizedInstruction(instruction: string, trigger: boolean, hasFlags: boolean, singleParameter: boolean, finalRepeats: boolean, assertAll: Function, assertJSON: Function, assertShell: Function) {
        const onbuild = trigger ? "ONBUILD " : "";
        const prefix = onbuild + instruction;
        const triggerOffset = onbuild.length;
        const offset = instruction.length + triggerOffset;
        const parameterOffset = hasFlags ? 1 : 0;

        describe("JSON", function () {
            it("[", function () {
                assertAll(compute(prefix + " ", 0, offset + 1), parameterOffset + 0);
                assertAll(compute(prefix + "  ", 0, offset + 2), parameterOffset + 0);
                assertAll(compute(prefix + "  [", 0, offset + 1), parameterOffset + 0);
            });

            it("executable", function () {
                assertJSON(compute(prefix + " [", 0, offset + 2), parameterOffset + 1);
                assertJSON(compute(prefix + " [\"", 0, offset + 3), parameterOffset + 1);
                assertJSON(compute(prefix + " [ ", 0, offset + 3), parameterOffset + 1);
                assertJSON(compute(prefix + " [ \"", 0, offset + 4), parameterOffset + 1);
                assertJSON(compute(prefix + " [\"cmd\"", 0, offset + 7), parameterOffset + 1);
                assertJSON(compute(prefix + " [ \"cmd\"", 0, offset + 8), parameterOffset + 1);
                assertJSON(compute(prefix + " [\"cmd\",", 0, offset + 7), parameterOffset + 1);
                assertJSON(compute(prefix + " [ \"cmd\",", 0, offset + 8), parameterOffset + 1);
                assertJSON(compute(prefix + " []", 0, offset + 2), parameterOffset + 1);
                assertJSON(compute(prefix + " [ \"cmd\" ", 0, offset + 9), parameterOffset + 1);
            });

            it("parameter", function () {
                const activeParameter = finalRepeats ? 2 : 3;
                assertJSON(compute(prefix + " [\"cmd\",", 0, offset + 8), parameterOffset + activeParameter);
                assertJSON(compute(prefix + " [ \"cmd\",", 0, offset + 9), parameterOffset + activeParameter);
                assertJSON(compute(prefix + " [\"cmd\" ,", 0, offset + 9), parameterOffset + activeParameter);
                assertJSON(compute(prefix + " [ \"cmd\" ,", 0, offset + 10), parameterOffset + activeParameter);
                assertJSON(compute(prefix + " [\"cmd\", ", 0, offset + 9), parameterOffset + activeParameter);
                assertJSON(compute(prefix + " [ \"cmd\", ", 0, offset + 10), parameterOffset + activeParameter);
                assertJSON(compute(prefix + " [\"cmd\" , ", 0, offset + 10), parameterOffset + activeParameter);
                assertJSON(compute(prefix + " [ \"cmd\" , ", 0, offset + 11), parameterOffset + activeParameter);
                assertJSON(compute(prefix + " [ \"cmd\" , \"\"", 0, offset + 13), parameterOffset + activeParameter);
                assertJSON(compute(prefix + " [ \"cmd\" , \"\",", 0, offset + 13), parameterOffset + activeParameter);
            });

            it("...", function () {
                const activeParameter = singleParameter ? 2 : 3;
                assertJSON(compute(prefix + " [\"cmd\", \"/C\",", 0, offset + 14), parameterOffset + activeParameter);
                assertJSON(compute(prefix + " [\"cmd\", \"/C\", ", 0, offset + 15), parameterOffset + activeParameter);
                assertJSON(compute(prefix + " [\"cmd\", \"/C\", \"/C\"]", 0, offset + 19), parameterOffset + activeParameter);

                assertJSON(compute(prefix + " [ \"cmd\", \"/C\", \"/C\" ]", 0, offset + 3), parameterOffset + 1);
                assertJSON(compute(prefix + " [ \"cmd\", \"/C\", \"/C\" ]", 0, offset + 5), parameterOffset + 1);
                assertJSON(compute(prefix + " [ \"cmd\", \"/C\", \"/C\" ]", 0, offset + 8), parameterOffset + 1);
                assertJSON(compute(prefix + " [ \"cmd\", \"/C\", \"/C\" ]", 0, offset + 10), parameterOffset + 2);
                assertJSON(compute(prefix + " [ \"cmd\", \"/C\", \"/C\" ]", 0, offset + 12), parameterOffset + 2);
                assertJSON(compute(prefix + " [ \"cmd\", \"/C\", \"/C\" ]", 0, offset + 14), parameterOffset + 2);
                assertJSON(compute(prefix + " [ \"cmd\", \"/C\", \"/C\" ]", 0, offset + 16), parameterOffset + activeParameter);
                assertJSON(compute(prefix + " [ \"cmd\", \"/C\", \"/C\" ]", 0, offset + 18), parameterOffset + activeParameter);
                assertJSON(compute(prefix + " [ \"cmd\", \"/C\", \"/C\" ]", 0, offset + 20), parameterOffset + activeParameter);

                const thirdArgument = finalRepeats && !singleParameter ? 3 : 2;
                assertJSON(compute(prefix + " [ \"cmd\", \"/C\", \"/C\", \"/C\" ]", 0, offset + 3), parameterOffset + 1);
                assertJSON(compute(prefix + " [ \"cmd\", \"/C\", \"/C\", \"/C\" ]", 0, offset + 5), parameterOffset + 1);
                assertJSON(compute(prefix + " [ \"cmd\", \"/C\", \"/C\", \"/C\" ]", 0, offset + 8), parameterOffset + 1);
                assertJSON(compute(prefix + " [ \"cmd\", \"/C\", \"/C\", \"/C\" ]", 0, offset + 10), parameterOffset + 2);
                assertJSON(compute(prefix + " [ \"cmd\", \"/C\", \"/C\", \"/C\" ]", 0, offset + 12), parameterOffset + 2);
                assertJSON(compute(prefix + " [ \"cmd\", \"/C\", \"/C\", \"/C\" ]", 0, offset + 14), parameterOffset + 2);
                assertJSON(compute(prefix + " [ \"cmd\", \"/C\", \"/C\", \"/C\" ]", 0, offset + 16), parameterOffset + thirdArgument);
                assertJSON(compute(prefix + " [ \"cmd\", \"/C\", \"/C\", \"/C\" ]", 0, offset + 18), parameterOffset + thirdArgument);
                assertJSON(compute(prefix + " [ \"cmd\", \"/C\", \"/C\", \"/C\" ]", 0, offset + 20), parameterOffset + thirdArgument);
                assertJSON(compute(prefix + " [ \"cmd\", \"/C\", \"/C\", \"/C\" ]", 0, offset + 22), parameterOffset + activeParameter);
                assertJSON(compute(prefix + " [ \"cmd\", \"/C\", \"/C\", \"/C\" ]", 0, offset + 24), parameterOffset + activeParameter);
                assertJSON(compute(prefix + " [ \"cmd\", \"/C\", \"/C\", \"/C\" ]", 0, offset + 26), parameterOffset + activeParameter);
            });

            it("]", function () {
                const activeParameter = singleParameter ? 3 : 4;
                assertJSON(compute(prefix + " []", 0, offset + 3), parameterOffset + activeParameter);
                assertJSON(compute(prefix + "  [ ]", 0, offset + 5), parameterOffset + activeParameter);
                assertJSON(compute(prefix + "  [ \"cmd\" ]", 0, offset + 11), parameterOffset + activeParameter);
            });

            it("invalid", function () {
                const signatureHelp = compute(prefix + " [ \"cmd\" ] ", 0, triggerOffset + 2);
                if (trigger) {
                    assertOnbuild(signatureHelp);
                } else {
                    assertNoSignatures(signatureHelp);
                }
            });
        });

        describe("shell", function () {
            it("executable", function () {
                assertShell(compute(prefix + " node", 0, offset + 1), parameterOffset + 0);
                assertShell(compute(prefix + " node", 0, offset + 2), parameterOffset + 0);
                assertShell(compute(prefix + " node", 0, offset + 5), parameterOffset + 0);

                assertShell(compute(prefix + " node ", 0, offset + 1), parameterOffset + 0);
                assertShell(compute(prefix + " node ", 0, offset + 2), parameterOffset + 0);
                assertShell(compute(prefix + " node ", 0, offset + 5), parameterOffset + 0);

                assertShell(compute(prefix + " node --inspect", 0, offset + 1), parameterOffset + 0);
                assertShell(compute(prefix + " node --inspect", 0, offset + 2), parameterOffset + 0);
                assertShell(compute(prefix + " node --inspect", 0, offset + 5), parameterOffset + 0);

                assertShell(compute(prefix + " node --inspect ", 0, offset + 1), parameterOffset + 0);
                assertShell(compute(prefix + " node --inspect ", 0, offset + 2), parameterOffset + 0);
                assertShell(compute(prefix + " node --inspect ", 0, offset + 5), parameterOffset + 0);

                assertShell(compute(prefix + " node --inspect server.js", 0, offset + 1), parameterOffset + 0);
                assertShell(compute(prefix + " node --inspect server.js", 0, offset + 2), parameterOffset + 0);
                assertShell(compute(prefix + " node --inspect server.js", 0, offset + 5), parameterOffset + 0);

                assertShell(compute(prefix + " node --inspect server.js ", 0, offset + 1), parameterOffset + 0);
                assertShell(compute(prefix + " node --inspect server.js ", 0, offset + 2), parameterOffset + 0);
                assertShell(compute(prefix + " node --inspect server.js ", 0, offset + 5), parameterOffset + 0);

                assertShell(compute(prefix + " node --inspect server.js --port=8000", 0, offset + 1), parameterOffset + 0);
                assertShell(compute(prefix + " node --inspect server.js --port=8000", 0, offset + 2), parameterOffset + 0);
                assertShell(compute(prefix + " node --inspect server.js --port=8000", 0, offset + 5), parameterOffset + 0);
            });

            it("parameter", function () {
                const activeParameter = finalRepeats ? 1 : 2;
                assertShell(compute(prefix + " node ", 0, offset + 6), parameterOffset + activeParameter);

                assertShell(compute(prefix + " node --inspect", 0, offset + 6), parameterOffset + activeParameter);
                assertShell(compute(prefix + " node --inspect", 0, offset + 12), parameterOffset + activeParameter);
                assertShell(compute(prefix + " node --inspect", 0, offset + 15), parameterOffset + activeParameter);

                assertShell(compute(prefix + " node --inspect ", 0, offset + 6), parameterOffset + activeParameter);
                assertShell(compute(prefix + " node --inspect ", 0, offset + 12), parameterOffset + activeParameter);
                assertShell(compute(prefix + " node --inspect ", 0, offset + 15), parameterOffset + activeParameter);

                assertShell(compute(prefix + " node --inspect server.js", 0, offset + 6), parameterOffset + 1);
                assertShell(compute(prefix + " node --inspect server.js", 0, offset + 12), parameterOffset + 1);
                assertShell(compute(prefix + " node --inspect server.js", 0, offset + 15), parameterOffset + 1);

                assertShell(compute(prefix + " node --inspect server.js ", 0, offset + 6), parameterOffset + 1);
                assertShell(compute(prefix + " node --inspect server.js ", 0, offset + 12), parameterOffset + 1);
                assertShell(compute(prefix + " node --inspect server.js ", 0, offset + 15), parameterOffset + 1);

                assertShell(compute(prefix + " node --inspect server.js --port=8000", 0, offset + 6), parameterOffset + 1);
                assertShell(compute(prefix + " node --inspect server.js --port=8000", 0, offset + 12), parameterOffset + 1);
                assertShell(compute(prefix + " node --inspect server.js --port=8000", 0, offset + 15), parameterOffset + 1);
            });

            it("...", function () {
                let activeParameter = singleParameter ? 1 : 2;
                assertShell(compute(prefix + " node --inspect ", 0, offset + 16), parameterOffset + activeParameter);

                assertShell(compute(prefix + " node --inspect server.js", 0, offset + 16), parameterOffset + activeParameter);
                assertShell(compute(prefix + " node --inspect server.js", 0, offset + 20), parameterOffset + activeParameter);
                assertShell(compute(prefix + " node --inspect server.js", 0, offset + 25), parameterOffset + activeParameter);

                assertShell(compute(prefix + " node --inspect server.js ", 0, offset + 16), parameterOffset + activeParameter);
                assertShell(compute(prefix + " node --inspect server.js ", 0, offset + 20), parameterOffset + activeParameter);
                assertShell(compute(prefix + " node --inspect server.js ", 0, offset + 25), parameterOffset + activeParameter);
                assertShell(compute(prefix + " node --inspect server.js ", 0, offset + 26), parameterOffset + activeParameter);

                activeParameter = singleParameter || !finalRepeats ? 1 : 2;
                assertShell(compute(prefix + " node --inspect server.js --port=8000", 0, offset + 16), parameterOffset + activeParameter);
                assertShell(compute(prefix + " node --inspect server.js --port=8000", 0, offset + 20), parameterOffset + activeParameter);
                assertShell(compute(prefix + " node --inspect server.js --port=8000", 0, offset + 25), parameterOffset + activeParameter);
                activeParameter = singleParameter ? 1 : 2;
                assertShell(compute(prefix + " node --inspect server.js --port=8000", 0, offset + 26), parameterOffset + activeParameter);
                assertShell(compute(prefix + " node --inspect server.js --port=8000", 0, offset + 30), parameterOffset + activeParameter);
                assertShell(compute(prefix + " node --inspect server.js --port=8000", 0, offset + 37), parameterOffset + activeParameter);
            });

            it("valid JSON", function () {
                assertShell(compute(prefix + " [] ", 0, offset + 4), parameterOffset + (finalRepeats ? 1 : 2));
                assertShell(compute(prefix + "  [ \"cmd\" ] ", 0, offset + 12), parameterOffset + (singleParameter ? 1 : 2));
            });
        });
    }

    function testEntrypoint(trigger: boolean) {
        describe("ENTRYPOINT", function () {
            testParameterizedInstruction("ENTRYPOINT", trigger, false, false, true, assertEntrypoint, assertEntrypoint_JSONOnly, assertEntrypoint_ShellOnly);
        });
    }

    testEntrypoint(false);

    function testEnv(trigger: boolean) {
        testKeyValue("ENV", trigger, assertEnv, assertEnv_SpaceOnly, assertEnv_Equals, assertEnv_EqualsMultiOnly);
    }

    testEnv(false);

    function testExpose(trigger: boolean) {
        let onbuild = trigger ? "ONBUILD " : "";
        let triggerOffset = trigger ? 8 : 0;

        describe("EXPOSE", function () {
            it("port", function () {
                let signatureHelp = compute(onbuild + "EXPOSE ", 0, triggerOffset + 7);
                assertExpose(signatureHelp, 0);

                signatureHelp = compute(onbuild + "EXPOSE 8080", 0, triggerOffset + 7);
                assertExpose(signatureHelp, 0);

                signatureHelp = compute(onbuild + "EXPOSE 8080", 0, triggerOffset + 9);
                assertExpose(signatureHelp, 0);

                signatureHelp = compute(onbuild + "EXPOSE 8080 ", 0, triggerOffset + 11);
                assertExpose(signatureHelp, 0);
            });

            it("...", function () {
                let signatureHelp = compute(onbuild + "EXPOSE 8080 ", 0, triggerOffset + 12);
                assertExpose(signatureHelp, 1);

                signatureHelp = compute(onbuild + "EXPOSE 8080 8081", 0, triggerOffset + 12);
                assertExpose(signatureHelp, 1);

                signatureHelp = compute(onbuild + "EXPOSE 8080 8081", 0, triggerOffset + 14);
                assertExpose(signatureHelp, 1);

                signatureHelp = compute(onbuild + "EXPOSE 8080 8081", 0, triggerOffset + 14);
                assertExpose(signatureHelp, 1);

                signatureHelp = compute(onbuild + "EXPOSE 8080 8081", 0, triggerOffset + 16);
                assertExpose(signatureHelp, 1);

                signatureHelp = compute(onbuild + "EXPOSE 8080 8081 ", 0, triggerOffset + 16);
                assertExpose(signatureHelp, 1);

                signatureHelp = compute(onbuild + "EXPOSE 8080 8081 8082", 0, triggerOffset + 18);
                assertExpose(signatureHelp, 1);
            });

            it("invalid", function () {
                let signatureHelp = compute(onbuild + "EXPOSE 8080", 0, triggerOffset + 0);
                if (trigger) {
                    assertOnbuild(signatureHelp);
                } else {
                    assertNoSignatures(signatureHelp);
                }

                signatureHelp = compute(onbuild + "EXPOSE 8080", 0, triggerOffset + 3);
                if (trigger) {
                    assertOnbuild(signatureHelp);
                } else {
                    assertNoSignatures(signatureHelp);
                }

                signatureHelp = compute(onbuild + "EXPOSE 8080", 0, triggerOffset + 6);
                if (trigger) {
                    assertOnbuild(signatureHelp);
                } else {
                    assertNoSignatures(signatureHelp);
                }
            });
        });
    }

    testExpose(false);

    describe("FROM", function () {
        it("all", function () {
            assertFrom(compute("FROM ", 0, 5));
            assertFrom(compute("FROM node", 0, 7));
            assertFrom(compute("FROM node", 0, 9));
            assertFrom(compute("FROM  node", 0, 5));
        });

        it("tags", function () {
            assertFrom_Tags(compute("FROM node:", 0, 7), 0);
            assertFrom_Tags(compute("FROM node:", 0, 10), 1);
            assertFrom_Tags(compute("FROM node:latest", 0, 12), 1);
            assertFrom_Tags(compute("FROM node:latest", 0, 16), 1);
        });

        it("digests", function () {
            assertFrom_Digests(compute("FROM node@", 0, 7), 0);
            assertFrom_Digests(compute("FROM node@", 0, 10), 1);
            assertFrom_Digests(compute("FROM node@sha256:613685c22f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700", 0, 12), 1);
            assertFrom_Digests(compute("FROM node@sha256:613685c22f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700", 0, 16), 1);
            assertFrom_Digests(compute("FROM node@sha256:613685c22f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700", 0, 17), 1);
            assertFrom_Digests(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700", 0, 20), 1);
            assertFrom_Digests(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700", 0, 80), 1);
        });

        it("stages", function () {
            assertFrom_BuildStages(compute("FROM node ", 0, 10), 2);

            assertFrom_BuildStages(compute("FROM node AS", 0, 5), 0);
            assertFrom_BuildStages(compute("FROM node AS", 0, 7), 0);
            assertFrom_BuildStages(compute("FROM node AS", 0, 9), 0);
            assertFrom_BuildStages(compute("FROM node AS", 0, 10), 2);
            assertFrom_BuildStages(compute("FROM node AS", 0, 11), 2);
            assertFrom_BuildStages(compute("FROM node AS", 0, 12), 2);

            assertFrom_BuildStages(compute("FROM node AS ", 0, 13), 3);

            assertFrom_BuildStages(compute("FROM node AS js", 0, 5), 0);
            assertFrom_BuildStages(compute("FROM node AS js", 0, 7), 0);
            assertFrom_BuildStages(compute("FROM node AS js", 0, 9), 0);
            assertFrom_BuildStages(compute("FROM node AS js", 0, 10), 2);
            assertFrom_BuildStages(compute("FROM node AS js", 0, 11), 2);
            assertFrom_BuildStages(compute("FROM node AS js", 0, 12), 2);
            assertFrom_BuildStages(compute("FROM node AS js", 0, 13), 3);
            assertFrom_BuildStages(compute("FROM node AS js", 0, 14), 3);
            assertFrom_BuildStages(compute("FROM node AS js", 0, 15), 3);
        });

        it("tags and stages", function () {
            assertFrom_Tags_BuildStages_Only(compute("FROM node: ", 0, 11), 2);

            assertFrom_Tags_BuildStages_Only(compute("FROM node: AS", 0, 5), 0);
            assertFrom_Tags_BuildStages_Only(compute("FROM node: AS", 0, 7), 0);
            assertFrom_Tags_BuildStages_Only(compute("FROM node: AS", 0, 9), 0);
            assertFrom_Tags_BuildStages_Only(compute("FROM node: AS", 0, 10), 1);
            assertFrom_Tags_BuildStages_Only(compute("FROM node: AS", 0, 11), 2);
            assertFrom_Tags_BuildStages_Only(compute("FROM node: AS", 0, 12), 2);
            assertFrom_Tags_BuildStages_Only(compute("FROM node: AS", 0, 13), 2);

            assertFrom_Tags_BuildStages_Only(compute("FROM node: AS ", 0, 14), 3);

            assertFrom_Tags_BuildStages_Only(compute("FROM node: AS js", 0, 5), 0);
            assertFrom_Tags_BuildStages_Only(compute("FROM node: AS js", 0, 7), 0);
            assertFrom_Tags_BuildStages_Only(compute("FROM node: AS js", 0, 9), 0);
            assertFrom_Tags_BuildStages_Only(compute("FROM node: AS js", 0, 10), 1);
            assertFrom_Tags_BuildStages_Only(compute("FROM node: AS js", 0, 11), 2);
            assertFrom_Tags_BuildStages_Only(compute("FROM node: AS js", 0, 12), 2);
            assertFrom_Tags_BuildStages_Only(compute("FROM node: AS js", 0, 13), 2);
            assertFrom_Tags_BuildStages_Only(compute("FROM node: AS js", 0, 14), 3);
            assertFrom_Tags_BuildStages_Only(compute("FROM node: AS js", 0, 15), 3);
            assertFrom_Tags_BuildStages_Only(compute("FROM node: AS js", 0, 16), 3);

            assertFrom_Tags_BuildStages_Only(compute("FROM node:latest AS", 0, 5), 0);
            assertFrom_Tags_BuildStages_Only(compute("FROM node:latest AS", 0, 7), 0);
            assertFrom_Tags_BuildStages_Only(compute("FROM node:latest AS", 0, 9), 0);
            assertFrom_Tags_BuildStages_Only(compute("FROM node:latest AS", 0, 10), 1);
            assertFrom_Tags_BuildStages_Only(compute("FROM node:latest AS", 0, 13), 1);
            assertFrom_Tags_BuildStages_Only(compute("FROM node:latest AS", 0, 16), 1);
            assertFrom_Tags_BuildStages_Only(compute("FROM node:latest AS", 0, 17), 2);
            assertFrom_Tags_BuildStages_Only(compute("FROM node:latest AS", 0, 18), 2);
            assertFrom_Tags_BuildStages_Only(compute("FROM node:latest AS", 0, 19), 2);
            assertFrom_Tags_BuildStages_Only(compute("FROM node:latest AS ", 0, 20), 3);
            assertFrom_Tags_BuildStages_Only(compute("FROM node:latest AS js", 0, 5), 0);
            assertFrom_Tags_BuildStages_Only(compute("FROM node:latest AS js", 0, 7), 0);
            assertFrom_Tags_BuildStages_Only(compute("FROM node:latest AS js", 0, 9), 0);
            assertFrom_Tags_BuildStages_Only(compute("FROM node:latest AS js", 0, 10), 1);
            assertFrom_Tags_BuildStages_Only(compute("FROM node:latest AS js", 0, 13), 1);
            assertFrom_Tags_BuildStages_Only(compute("FROM node:latest AS js", 0, 16), 1);
            assertFrom_Tags_BuildStages_Only(compute("FROM node:latest AS js", 0, 17), 2);
            assertFrom_Tags_BuildStages_Only(compute("FROM node:latest AS js", 0, 18), 2);
            assertFrom_Tags_BuildStages_Only(compute("FROM node:latest AS js", 0, 19), 2);
            assertFrom_Tags_BuildStages_Only(compute("FROM node:latest AS js", 0, 20), 3);
            assertFrom_Tags_BuildStages_Only(compute("FROM node:latest AS js", 0, 21), 3);
            assertFrom_Tags_BuildStages_Only(compute("FROM node:latest AS js", 0, 22), 3);
        });

        it("digests and stages", function () {
            assertFrom_Digests_BuildStages_Only(compute("FROM node@ ", 0, 11), 2);

            assertFrom_Digests_BuildStages_Only(compute("FROM node@ AS", 0, 5), 0);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@ AS", 0, 7), 0);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@ AS", 0, 9), 0);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@ AS", 0, 10), 1);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@ AS", 0, 11), 2);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@ AS", 0, 12), 2);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@ AS", 0, 13), 2);

            assertFrom_Digests_BuildStages_Only(compute("FROM node@ AS ", 0, 14), 3);

            assertFrom_Digests_BuildStages_Only(compute("FROM node@ AS js", 0, 5), 0);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@ AS js", 0, 7), 0);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@ AS js", 0, 9), 0);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@ AS js", 0, 10), 1);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@ AS js", 0, 11), 2);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@ AS js", 0, 12), 2);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@ AS js", 0, 13), 2);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@ AS js", 0, 14), 3);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@ AS js", 0, 15), 3);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@ AS js", 0, 16), 3);

            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS", 0, 5), 0);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS", 0, 7), 0);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS", 0, 9), 0);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS", 0, 10), 1);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS", 0, 13), 1);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS", 0, 16), 1);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS", 0, 17), 1);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS", 0, 35), 1);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS", 0, 80), 1);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS", 0, 81), 2);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS", 0, 82), 2);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS", 0, 83), 2);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS ", 0, 84), 3);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS js", 0, 5), 0);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS js", 0, 7), 0);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS js", 0, 9), 0);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS js", 0, 10), 1);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS js", 0, 13), 1);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS js", 0, 16), 1);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS js", 0, 17), 1);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS js", 0, 35), 1);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS js", 0, 80), 1);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS js", 0, 81), 2);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS js", 0, 82), 2);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS js", 0, 83), 2);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS js", 0, 84), 3);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS js", 0, 85), 3);
            assertFrom_Digests_BuildStages_Only(compute("FROM node@sha256:61368522f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700 AS js", 0, 86), 3);
        });

        it("invalid", function () {
            assertNoSignatures(compute("FROM node AS js ", 0, 16));
        });
    });

    function testHealthcheck(trigger: boolean) {
        let onbuild = trigger ? "ONBUILD " : "";
        let triggerOffset = trigger ? 8 : 0;

        describe("HEALTHCHECK", function () {
            describe("initial", function () {
                it("empty", function () {
                    assertHealthcheck_Both(compute(onbuild + "HEALTHCHECK ", 0, triggerOffset + 12));
                });

                it("prefix", function () {
                    assertHealthcheck_Cmd_NormalOnly(compute(onbuild + "HEALTHCHECK C", 0, triggerOffset + 13), 1);
                    assertHealthcheck_Cmd_NormalOnly(compute(onbuild + "HEALTHCHECK c", 0, triggerOffset + 13), 1);
                    assertHealthcheck_Cmd_NormalOnly(compute(onbuild + "HEALTHCHECK a", 0, triggerOffset + 13), 1);
                    assertHealthcheck_Cmd_NormalOnly(compute(onbuild + "HEALTHCHECK a", 0, triggerOffset + 13), 1);
                    assertHealthcheck_NoneOnly(compute(onbuild + "HEALTHCHECK N", 0, triggerOffset + 13));
                    assertHealthcheck_NoneOnly(compute(onbuild + "HEALTHCHECK n", 0, triggerOffset + 13));
                    assertHealthcheck_NoneOnly(compute(onbuild + "HEALTHCHECK no", 0, triggerOffset + 14));
                    assertHealthcheck_NoneOnly(compute(onbuild + "HEALTHCHECK non", 0, triggerOffset + 15));
                    assertHealthcheck_NoneOnly(compute(onbuild + "HEALTHCHECK none", 0, triggerOffset + 16));
                    assertHealthcheck_Cmd_NormalOnly(compute(onbuild + "HEALTHCHECK nonee", 0, triggerOffset + 17), 1);
                });
            });

            describe("CMD", function () {
                it("args", function () {
                    assertHealthcheck_Cmd_NormalOnly(compute(onbuild + "HEALTHCHECK CMD ", 0, triggerOffset + 16), 2);
                    assertHealthcheck_Cmd_NormalOnly(compute(onbuild + "HEALTHCHECK  \\\n CMD", 0, triggerOffset + 12), 0);
                    assertHealthcheck_Cmd_NormalOnly(compute(onbuild + "HEALTHCHECK CMD \\\n", 1, 0), 2);
                });

                it("flags", function () {
                    assertHealthcheck_Cmd_NormalOnly(compute(onbuild + "HEALTHCHECK --ab", 0, triggerOffset + 16), 0);
                    assertHealthcheck_Cmd_NormalOnly(compute(onbuild + "HEALTHCHECK  CMD", 0, triggerOffset + 12), 0);
                    assertHealthcheck_Cmd_NormalOnly(compute(onbuild + "HEALTHCHECK --random= CMD", 0, triggerOffset + 21), 0);
                });
            });

            describe("NONE", function () {
                it("no signatures", function () {
                    assertNoSignatures(compute(onbuild + "HEALTHCHECK NONE ", 0, triggerOffset + 17));
                    assertNoSignatures(compute(onbuild + "HEALTHCHECK none ", 0, triggerOffset + 17));
                });
            });

            describe("--interval", function () {
                it("ok", function () {
                    let signatureHelp = compute(onbuild + "HEALTHCHECK --interval=", 0, triggerOffset + 23);
                    assertHealthcheck_FlagInterval(signatureHelp);

                    signatureHelp = compute(onbuild + "HEALTHCHECK --interval=1", 0, triggerOffset + 24);
                    assertHealthcheck_FlagInterval(signatureHelp);

                    signatureHelp = compute(onbuild + "HEALTHCHECK --interval=30s --interval=", 0, triggerOffset + 38);
                    assertHealthcheck_FlagInterval(signatureHelp);

                    signatureHelp = compute(onbuild + "HEALTHCHECK --retries=3 --interval=", 0, triggerOffset + 35);
                    assertHealthcheck_FlagInterval(signatureHelp);
                });

                it("invalid", function () {
                    let signatureHelp = compute(onbuild + "HEALTHCHECK CMD --interval=", 0, triggerOffset + 37);
                    assertNoSignatures(signatureHelp);

                    signatureHelp = compute(onbuild + "HEALTHCHECK NONE --interval=", 0, triggerOffset + 38);
                    assertNoSignatures(signatureHelp);
                });
            });

            describe("--retries", function () {
                it("ok", function () {
                    let signatureHelp = compute(onbuild + "HEALTHCHECK --retries=", 0, triggerOffset + 22);
                    assertHealthcheck_FlagRetries(signatureHelp);

                    signatureHelp = compute(onbuild + "HEALTHCHECK --retries=1", 0, triggerOffset + 23);
                    assertHealthcheck_FlagRetries(signatureHelp);

                    signatureHelp = compute(onbuild + "HEALTHCHECK --retries=30s --retries=", 0, triggerOffset + 36);
                    assertHealthcheck_FlagRetries(signatureHelp);

                    signatureHelp = compute(onbuild + "HEALTHCHECK --interval=30s --retries=", 0, triggerOffset + 37);
                    assertHealthcheck_FlagRetries(signatureHelp);
                });

                it("invalid", function () {
                    let signatureHelp = compute(onbuild + "HEALTHCHECK CMD --retries=", 0, triggerOffset + 36);
                    assertNoSignatures(signatureHelp);

                    signatureHelp = compute(onbuild + "HEALTHCHECK NONE --retries=", 0, triggerOffset + 37);
                    assertNoSignatures(signatureHelp);
                });
            });

            describe("--start-period", function () {
                it("ok", function () {
                    let signatureHelp = compute(onbuild + "HEALTHCHECK --start-period=", 0, triggerOffset + 27);
                    assertHealthcheck_FlagStartPeriod(signatureHelp);

                    signatureHelp = compute(onbuild + "HEALTHCHECK --start-period=1", 0, triggerOffset + 28);
                    assertHealthcheck_FlagStartPeriod(signatureHelp);

                    signatureHelp = compute(onbuild + "HEALTHCHECK --start-period=30s --start-period=", 0, triggerOffset + 46);
                    assertHealthcheck_FlagStartPeriod(signatureHelp);

                    signatureHelp = compute(onbuild + "HEALTHCHECK --retries=3 --start-period=", 0, triggerOffset + 39);
                    assertHealthcheck_FlagStartPeriod(signatureHelp);
                });

                it("invalid", function () {
                    let signatureHelp = compute(onbuild + "HEALTHCHECK CMD --start-period=", 0, triggerOffset + 41);
                    assertNoSignatures(signatureHelp);

                    signatureHelp = compute(onbuild + "HEALTHCHECK NONE --start-period=", 0, triggerOffset + 42);
                    assertNoSignatures(signatureHelp);
                });
            });

            describe("--timeout", function () {
                it("ok", function () {
                    let signatureHelp = compute(onbuild + "HEALTHCHECK --timeout=", 0, triggerOffset + 22);
                    assertHealthcheck_FlagTimeout(signatureHelp);

                    signatureHelp = compute(onbuild + "HEALTHCHECK --timeout=1", 0, triggerOffset + 23);
                    assertHealthcheck_FlagTimeout(signatureHelp);

                    signatureHelp = compute(onbuild + "HEALTHCHECK --timeout=30s --timeout=", 0, triggerOffset + 36);
                    assertHealthcheck_FlagTimeout(signatureHelp);

                    signatureHelp = compute(onbuild + "HEALTHCHECK --retries=3 --timeout=", 0, triggerOffset + 34);
                    assertHealthcheck_FlagTimeout(signatureHelp);
                });

                it("invalid", function () {
                    let signatureHelp = compute(onbuild + "HEALTHCHECK CMD --timeout=", 0, triggerOffset + 36);
                    assertNoSignatures(signatureHelp);

                    signatureHelp = compute(onbuild + "HEALTHCHECK NONE --timeout=", 0, triggerOffset + 37);
                    assertNoSignatures(signatureHelp);
                });
            });
        });
    }

    testHealthcheck(false);

    function testKeyValue(instruction: string, trigger: boolean, assertAll: Function, assertSpaceOnly: Function, assertEquals: Function, assertEqualsMultiOnly: Function) {
        let onbuild = trigger ? "ONBUILD " : "";
        const prefix = onbuild + instruction;
        const offset = instruction.length + (trigger ? 8 : 0);

        describe(instruction, function () {
            it("all", function () {
                assertAll(compute(prefix + " ", 0, offset + 1));

                assertAll(compute(prefix + " key", 0, offset + 1));
                assertAll(compute(prefix + " key", 0, offset + 2));
                assertAll(compute(prefix + " key", 0, offset + 3));

                assertAll(compute(prefix + "  key", 0, offset + 1));

                assertAll(compute(prefix + " key ", 0, offset + 1));
                assertAll(compute(prefix + " key ", 0, offset + 3));

                assertAll(compute(prefix + " key \\\n", 0, offset + 1));
                assertAll(compute(prefix + " key \\\n", 0, offset + 2));
                assertAll(compute(prefix + " key \\\n", 0, offset + 3));
                assertAll(compute(prefix + " key \\\n", 0, offset + 4));
            });

            it("space", function () {
                assertSpaceOnly(compute(prefix + " key ", 0, offset + 5), 1);

                assertSpaceOnly(compute(prefix + " key value", 0, offset + 1), 0);
                assertSpaceOnly(compute(prefix + " key value", 0, offset + 4), 0);
                assertSpaceOnly(compute(prefix + " key value", 0, offset + 5), 1);
                assertSpaceOnly(compute(prefix + " key value", 0, offset + 7), 1);
                assertSpaceOnly(compute(prefix + " key value", 0, offset + 10), 1);

                assertSpaceOnly(compute(prefix + " key =value", 0, offset + 1), 0);
                assertSpaceOnly(compute(prefix + " key =value", 0, offset + 4), 0);
                assertSpaceOnly(compute(prefix + " key =value", 0, offset + 5), 1);
                assertSpaceOnly(compute(prefix + " key =value", 0, offset + 6), 1);
                assertSpaceOnly(compute(prefix + " key =value", 0, offset + 8), 1);
                assertSpaceOnly(compute(prefix + " key =value", 0, offset + 11), 1);

                assertSpaceOnly(compute(prefix + " key value ", 0, offset + 11), 1);

                assertSpaceOnly(compute(prefix + " key value spaced", 0, offset + 1), 0);
                assertSpaceOnly(compute(prefix + " key value spaced", 0, offset + 4), 0);
                assertSpaceOnly(compute(prefix + " key value spaced", 0, offset + 5), 1);
                assertSpaceOnly(compute(prefix + " key value spaced", 0, offset + 7), 1);
                assertSpaceOnly(compute(prefix + " key value spaced", 0, offset + 10), 1);
                assertSpaceOnly(compute(prefix + " key value spaced", 0, offset + 11), 1);
                assertSpaceOnly(compute(prefix + " key value spaced", 0, offset + 13), 1);
                assertSpaceOnly(compute(prefix + " key value spaced", 0, offset + 17), 1);

                assertSpaceOnly(compute(prefix + " key \\\nvalue", 0, offset + 1), 0);
                assertSpaceOnly(compute(prefix + " key \\\nvalue", 0, offset + 2), 0);
                assertSpaceOnly(compute(prefix + " key \\\nvalue", 0, offset + 3), 0);
                assertSpaceOnly(compute(prefix + " key \\\nvalue", 0, offset + 4), 0);

                assertSpaceOnly(compute(prefix + " key val\\\nue ", 1, 3), 1);

                assertSpaceOnly(compute(prefix + " key\\\n ", 1, 1), 1);

                assertSpaceOnly(compute(prefix + " \\\n \\\nkey value", 1, 1), 0);
            });

            it("equals", function () {
                assertEquals(compute(prefix + " key=", 0, offset + 1), 0);
                assertEquals(compute(prefix + " key=", 0, offset + 2), 0);
                assertEquals(compute(prefix + " key=", 0, offset + 4), 0);
                assertEquals(compute(prefix + " key=", 0, offset + 5), 1);

                assertEquals(compute(prefix + " key=value", 0, offset + 1), 0);
                assertEquals(compute(prefix + " key=value", 0, offset + 4), 0);
                assertEquals(compute(prefix + " key=value", 0, offset + 5), 1);
                assertEquals(compute(prefix + " key=value", 0, offset + 7), 1);
                assertEquals(compute(prefix + " key=value", 0, offset + 10), 1);

                assertEquals(compute(prefix + " key=\\\n", 0, offset + 1), 0);
                assertEquals(compute(prefix + " key=\\\n", 0, offset + 2), 0);
                assertEquals(compute(prefix + " key=\\\n", 0, offset + 3), 0);
                assertEquals(compute(prefix + " key=\\\n", 0, offset + 4), 0);

                assertEquals(compute(prefix + " key=\\\nvalue", 0, offset + 1), 0);
                assertEquals(compute(prefix + " key=\\\nvalue", 0, offset + 2), 0);
                assertEquals(compute(prefix + " key=\\\nvalue", 0, offset + 3), 0);
                assertEquals(compute(prefix + " key=\\\nvalue", 0, offset + 4), 0);

                assertEquals(compute(prefix + " key\\\n=", 1, 0), 0);
                assertEquals(compute(prefix + " key\\\n=", 1, 1), 1);

                assertEquals(compute(prefix + " \\\n \\\nkey=value", 1, 1), 0);
            });

            it("equals multiples", function () {
                assertEqualsMultiOnly(compute(prefix + " key=value ", 0, offset + 11), 2);

                assertEqualsMultiOnly(compute(prefix + " key=val\\\nue ", 1, 3), 2);

                assertEqualsMultiOnly(compute(prefix + " key=value key2", 0, offset + 1), 0);
                assertEqualsMultiOnly(compute(prefix + " key=value key2", 0, offset + 4), 0);
                assertEqualsMultiOnly(compute(prefix + " key=value key2", 0, offset + 5), 1);
                assertEqualsMultiOnly(compute(prefix + " key=value key2", 0, offset + 7), 1);
                assertEqualsMultiOnly(compute(prefix + " key=value key2", 0, offset + 10), 1);
                assertEqualsMultiOnly(compute(prefix + " key=value key2", 0, offset + 11), 2);
                assertEqualsMultiOnly(compute(prefix + " key=value key2", 0, offset + 13), 2);
                assertEqualsMultiOnly(compute(prefix + " key=value key2", 0, offset + 15), 2);

                assertEqualsMultiOnly(compute(prefix + " key=value key2=", 0, offset + 1), 0);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=", 0, offset + 4), 0);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=", 0, offset + 5), 1);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=", 0, offset + 7), 1);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=", 0, offset + 10), 1);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=", 0, offset + 11), 2);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=", 0, offset + 13), 2);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=", 0, offset + 15), 2);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=", 0, offset + 16), 3);

                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2", 0, offset + 1), 0);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2", 0, offset + 4), 0);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2", 0, offset + 5), 1);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2", 0, offset + 7), 1);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2", 0, offset + 10), 1);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2", 0, offset + 11), 2);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2", 0, offset + 13), 2);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2", 0, offset + 15), 2);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2", 0, offset + 16), 3);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2", 0, offset + 19), 3);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2", 0, offset + 22), 3);

                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2 ", 0, offset + 23), 2);

                assertEqualsMultiOnly(compute(prefix + " key=value  key2=value2", 0, offset + 11), 2);

                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2 key3=value3", 0, offset + 1), 0);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2 key3=value3", 0, offset + 4), 0);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2 key3=value3", 0, offset + 5), 1);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2 key3=value3", 0, offset + 7), 1);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2 key3=value3", 0, offset + 10), 1);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2 key3=value3", 0, offset + 11), 2);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2 key3=value3", 0, offset + 13), 2);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2 key3=value3", 0, offset + 15), 2);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2 key3=value3", 0, offset + 16), 3);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2 key3=value3", 0, offset + 19), 3);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2 key3=value3", 0, offset + 22), 3);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2 key3=value3", 0, offset + 23), 2);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2 key3=value3", 0, offset + 25), 2);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2 key3=value3", 0, offset + 27), 2);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2 key3=value3", 0, offset + 28), 3);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2 key3=value3", 0, offset + 31), 3);
                assertEqualsMultiOnly(compute(prefix + " key=value key2=value2 key3=value3", 0, offset + 34), 3);
            });

            it("invalid", function () {
                let signatureHelp = compute(prefix + " key=value \\\n# ", 1, 2);
                assertNoSignatures(signatureHelp);

                signatureHelp = compute(prefix + " key=value \\\n# \nkey2=value2", 1, 2);
                assertNoSignatures(signatureHelp);
            });
        });
    }

    function testLabel(trigger: boolean) {
        testKeyValue("LABEL", trigger, assertLabel, assertLabel_SpaceOnly, assertLabel_Equals, assertLabel_EqualsMultiOnly);
    }

    testLabel(false);

    function testMaintainer(trigger: boolean) {
        let onbuild = trigger ? "ONBUILD " : "";
        let triggerOffset = trigger ? 8 : 0;

        describe("MAINTAINER", function () {
            it("ok", function () {
                assertMaintainer(compute(onbuild + "MAINTAINER ", 0, triggerOffset + 11));
                assertMaintainer(compute(onbuild + "MAINTAINER name", 0, triggerOffset + 11));
                assertMaintainer(compute(onbuild + "MAINTAINER name", 0, triggerOffset + 12));
                assertMaintainer(compute(onbuild + "MAINTAINER name", 0, triggerOffset + 15));
            });

            it("invalid", function () {
                let signatureHelp = compute(onbuild + "MAINTAINER name", 0, triggerOffset + 5);
                if (trigger) {
                    assertOnbuild(signatureHelp);
                } else {
                    assertNoSignatures(signatureHelp);
                }
            });
        });
    }

    testMaintainer(false);

    describe("ONBUILD", function () {
        it("trigger instruction", function () {
            assertOnbuild(compute("ONBUILD ", 0, 8));

            assertOnbuild(compute("ONBUILD  ", 0, 8));
            assertOnbuild(compute("ONBUILD  ", 0, 9));

            assertOnbuild(compute("ONBUILD TRIGGER", 0, 8));
            assertOnbuild(compute("ONBUILD TRIGGER", 0, 12));
            assertOnbuild(compute("ONBUILD TRIGGER", 0, 15));

            assertNoSignatures(compute("ONBUILD TRIGGER ", 0, 16));

            assertNoSignatures(compute("ONBUILD TRIGGER argument", 0, 16));
            assertNoSignatures(compute("ONBUILD TRIGGER argument", 0, 20));
            assertNoSignatures(compute("ONBUILD TRIGGER argument", 0, 24));
        });
    });

    function testRun(trigger: boolean) {
        describe("RUN", function () {
            testParameterizedInstruction("RUN", trigger, false, false, true, assertRun, assertRun_JSONOnly, assertRun_ShellOnly);
        });
    }

    testRun(false);

    function testShell(trigger: boolean) {
        let onbuild = trigger ? "ONBUILD " : "";
        let triggerOffset = trigger ? 8 : 0;

        describe("SHELL", function () {
            it("[", function () {
                let signatureHelp = compute(onbuild + "SHELL ", 0, triggerOffset + 6);
                assertShell(signatureHelp, 0);

                signatureHelp = compute(onbuild + "SHELL  ", 0, triggerOffset + 7);
                assertShell(signatureHelp, 0);
            });

            it("executable", function () {
                let signatureHelp = compute(onbuild + "SHELL [", 0, triggerOffset + 7);
                assertShell(signatureHelp, 1);

                signatureHelp = compute(onbuild + "SHELL [\"", 0, triggerOffset + 8);
                assertShell(signatureHelp, 1);

                signatureHelp = compute(onbuild + "SHELL [ ", 0, triggerOffset + 8);
                assertShell(signatureHelp, 1);

                signatureHelp = compute(onbuild + "SHELL [ \"", 0, triggerOffset + 9);
                assertShell(signatureHelp, 1);

                signatureHelp = compute(onbuild + "SHELL [\"cmd\"", 0, triggerOffset + 12);
                assertShell(signatureHelp, 1);

                signatureHelp = compute(onbuild + "SHELL [ \"cmd\"", 0, triggerOffset + 13);
                assertShell(signatureHelp, 1);

                signatureHelp = compute(onbuild + "SHELL [\"cmd\",", 0, triggerOffset + 12);
                assertShell(signatureHelp, 1);

                signatureHelp = compute(onbuild + "SHELL [ \"cmd\",", 0, triggerOffset + 13);
                assertShell(signatureHelp, 1);

                signatureHelp = compute(onbuild + "SHELL []", 0, triggerOffset + 7);
                assertShell(signatureHelp, 1);
            });

            it("parameter", function () {
                let signatureHelp = compute(onbuild + "SHELL [\"cmd\",", 0, triggerOffset + 13);
                assertShell(signatureHelp, 2);

                signatureHelp = compute(onbuild + "SHELL [ \"cmd\",", 0, triggerOffset + 14);
                assertShell(signatureHelp, 2);

                signatureHelp = compute(onbuild + "SHELL [\"cmd\" ,", 0, triggerOffset + 14);
                assertShell(signatureHelp, 2);

                signatureHelp = compute(onbuild + "SHELL [ \"cmd\" ,", 0, triggerOffset + 15);
                assertShell(signatureHelp, 2);

                signatureHelp = compute(onbuild + "SHELL [\"cmd\", ", 0, triggerOffset + 14);
                assertShell(signatureHelp, 2);

                signatureHelp = compute(onbuild + "SHELL [ \"cmd\", ", 0, triggerOffset + 15);
                assertShell(signatureHelp, 2);

                signatureHelp = compute(onbuild + "SHELL [\"cmd\" , ", 0, triggerOffset + 15);
                assertShell(signatureHelp, 2);

                signatureHelp = compute(onbuild + "SHELL [ \"cmd\" , ", 0, triggerOffset + 16);
                assertShell(signatureHelp, 2);

                signatureHelp = compute(onbuild + "SHELL [ \"cmd\" , \"\"", 0, triggerOffset + 18);
                assertShell(signatureHelp, 2);

                signatureHelp = compute(onbuild + "SHELL [ \"cmd\" , \"\",", 0, triggerOffset + 18);
                assertShell(signatureHelp, 2);
            });

            it("...", function () {
                let signatureHelp = compute(onbuild + "SHELL [\"cmd\", \"/C\",", 0, triggerOffset + 19);
                assertShell(signatureHelp, 3);

                signatureHelp = compute(onbuild + "SHELL [\"cmd\", \"/C\", ", 0, triggerOffset + 20);
                assertShell(signatureHelp, 3);

                signatureHelp = compute(onbuild + "SHELL [\"cmd\", \"/C\", \"/C\"]", 0, triggerOffset + 24);
                assertShell(signatureHelp, 3);
            });

            it("]", function () {
                let signatureHelp = compute(onbuild + "SHELL []", 0, triggerOffset + 8);
                assertShell(signatureHelp, 4);

                signatureHelp = compute(onbuild + "SHELL  [ ]", 0, triggerOffset + 10);
                assertShell(signatureHelp, 4);

                signatureHelp = compute(onbuild + "SHELL  [ \"cmd\" ]", 0, triggerOffset + 16);
                assertShell(signatureHelp, 4);
            });

            it("invalid", function () {
                let signatureHelp = compute(onbuild + "SHELL [ \"cmd\" ] ", 0, triggerOffset + 2);
                if (trigger) {
                    assertOnbuild(signatureHelp);
                } else {
                    assertNoSignatures(signatureHelp);
                }

                signatureHelp = compute(onbuild + "SHELL [] ", 0, triggerOffset + 9);
                assertNoSignatures(signatureHelp);

                signatureHelp = compute(onbuild + "SHELL  [ \"cmd\" ] ", 0, triggerOffset + 17);
                assertNoSignatures(signatureHelp);
            });
        });
    }

    testShell(false);

    function testStopsignal(trigger: boolean) {
        let onbuild = trigger ? "ONBUILD " : "";
        let triggerOffset = trigger ? 8 : 0;

        describe("STOPSIGNAL", function () {
            it("ok", function () {
                let signatureHelp = compute(onbuild + "STOPSIGNAL ", 0, triggerOffset + 11);
                assertStopsignal(signatureHelp);

                signatureHelp = compute(onbuild + "STOPSIGNAL SIGKILL", 0, triggerOffset + 14);
                assertStopsignal(signatureHelp);

                signatureHelp = compute("WORKDIR /path\n" + onbuild + "STOPSIGNAL SIGKILL", 1, triggerOffset + 14);
                assertStopsignal(signatureHelp);
            });

            it("invalid", function () {
                let signatureHelp = compute(onbuild + "STOPSIGNAL SIGKILL", 0, triggerOffset + 5);
                if (trigger) {
                    assertOnbuild(signatureHelp);
                } else {
                    assertNoSignatures(signatureHelp);
                }
            });
        });
    }

    testStopsignal(false);

    function testUser(trigger: boolean) {
        let onbuild = trigger ? "ONBUILD " : "";
        let triggerOffset = trigger ? 8 : 0;

        describe("USER", function () {
            it("user / uid", function () {
                let signatureHelp = compute(onbuild + "USER ", 0, triggerOffset + 5);
                assertUser_All(signatureHelp);

                signatureHelp = compute(onbuild + "USER user", 0, triggerOffset + 7);
                assertUser_All(signatureHelp);

                signatureHelp = compute(onbuild + "USER user ", 0, triggerOffset + 10);
                assertUser_All(signatureHelp);

                signatureHelp = compute(onbuild + "USER user name", 0, triggerOffset + 12);
                assertUser_All(signatureHelp);
            });

            it("user:group / uid:gid", function () {
                let signatureHelp = compute(onbuild + "USER user:group", 0, triggerOffset + 7);
                assertUser_GroupsOnly(signatureHelp, 0);

                signatureHelp = compute(onbuild + "USER user:group", 0, triggerOffset + 9);
                assertUser_GroupsOnly(signatureHelp, 0);

                signatureHelp = compute(onbuild + "USER user:group", 0, triggerOffset + 10);
                assertUser_GroupsOnly(signatureHelp, 1);

                signatureHelp = compute(onbuild + "USER user:group", 0, triggerOffset + 13);
                assertUser_GroupsOnly(signatureHelp, 1);

                signatureHelp = compute(onbuild + "USER user name:group name", 0, triggerOffset + 12);
                assertUser_GroupsOnly(signatureHelp, 0);

                signatureHelp = compute(onbuild + "USER user name:group name", 0, triggerOffset + 14);
                assertUser_GroupsOnly(signatureHelp, 0);

                signatureHelp = compute(onbuild + "USER user name:group name", 0, triggerOffset + 15);
                assertUser_GroupsOnly(signatureHelp, 1);

                signatureHelp = compute(onbuild + "USER user name:group name", 0, triggerOffset + 18);
                assertUser_GroupsOnly(signatureHelp, 1);
            });

            it("invalid", function () {
                let signatureHelp = compute(onbuild + "USER user", 0, triggerOffset + 2);
                if (trigger) {
                    assertOnbuild(signatureHelp);
                } else {
                    assertNoSignatures(signatureHelp);
                }
            });
        });
    }

    testUser(false);

    function testVolume(trigger: boolean) {
        describe("VOLUME", function () {
            testParameterizedInstruction("VOLUME", trigger, false, true, true, assertVolume, assertVolume_JSONOnly, assertVolume_ShellOnly);
        });
    }

    testVolume(false);

    function testWorkdir(trigger: boolean) {
        let onbuild = trigger ? "ONBUILD " : "";
        let triggerOffset = trigger ? 8 : 0;

        describe("WORKDIR", function () {
            it("ok", function () {
                let signatureHelp = compute(onbuild + "WORKDIR ", 0, triggerOffset + 8);
                assertWorkdir(signatureHelp);

                signatureHelp = compute(onbuild + "WORKDIR a b", 0, triggerOffset + 11);
                assertWorkdir(signatureHelp);
            });

            it("invalid", function () {
                let signatureHelp = compute(onbuild + "WORKDIR /path", 0, triggerOffset + 2);
                if (trigger) {
                    assertOnbuild(signatureHelp);
                } else {
                    assertNoSignatures(signatureHelp);
                }
            });
        });
    }

    testWorkdir(false);

    describe("ONBUILD triggers", function () {
        testAdd(true);
        testArg(true);
        testCmd(true);
        testCopy(true);
        testEntrypoint(true);
        testEnv(true);
        testExpose(true);
        testHealthcheck(true);
        testLabel(true);
        testMaintainer(true);
        testRun(true);
        testShell(true);
        testStopsignal(true);
        testUser(true);
        testVolume(true);
        testWorkdir(true);
    });
});
