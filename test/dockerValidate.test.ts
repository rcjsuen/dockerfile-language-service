/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as assert from "assert";

import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver-types';
import { ValidationCode, ValidationSeverity } from 'dockerfile-utils';
import { DockerfileLanguageServiceFactory } from '../src/main';

const service = DockerfileLanguageServiceFactory.createLanguageService();

function assertInstructionCasing(diagnostic: Diagnostic, severity: DiagnosticSeverity) {
    assert.strictEqual(diagnostic.code, ValidationCode.CASING_INSTRUCTION);
    assert.strictEqual(diagnostic.severity, severity);
}

describe("Docker Validation Tests", () => {
    it("settings ignore case default", () => {
        let content = "from node";
        let problems = service.validate(content);
        assert.strictEqual(1, problems.length);
        assertInstructionCasing(problems[0], DiagnosticSeverity.Warning);
    });

    it("settings ignore case ignore", () => {
        let content = "from node";
        let problems = service.validate(content, { instructionCasing: ValidationSeverity.IGNORE });
        assert.strictEqual(0, problems.length);
    });

    it("settings ignore case warning", () => {
        let content = "from node";
        let problems = service.validate(content, { instructionCasing: ValidationSeverity.WARNING });
        assert.strictEqual(1, problems.length);
        assertInstructionCasing(problems[0], DiagnosticSeverity.Warning);
    });

    it("settings ignore case error", () => {
        let content = "from node";
        let problems = service.validate(content, { instructionCasing: ValidationSeverity.ERROR });
        assert.strictEqual(1, problems.length);
        assertInstructionCasing(problems[0], DiagnosticSeverity.Error);
    });
});
