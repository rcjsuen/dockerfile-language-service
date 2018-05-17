/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import { SymbolInformation, SymbolKind, Range, TextDocumentIdentifier } from 'vscode-languageserver-types';
import { DockerfileParser } from 'dockerfile-ast';

export class DockerSymbols {

    private createSymbolInformation(name: string, textDocumentURI: string, range: Range, kind: SymbolKind): SymbolInformation {
        return {
            name: name,
            location: {
                uri: textDocumentURI,
                range: range
            },
            kind: kind
        };
    }

    public parseSymbolInformation(textDocument: TextDocumentIdentifier, content: string): SymbolInformation[] {
        let dockerfile = DockerfileParser.parse(content);
        let directive = dockerfile.getDirective();
        let symbols: SymbolInformation[] = [];
        if (directive !== null) {
            symbols.push(this.createSymbolInformation(directive.getName(), textDocument.uri, directive.getNameRange(), SymbolKind.Property));
        }
        for (let instruction of dockerfile.getInstructions()) {
            symbols.push(this.createSymbolInformation(instruction.getInstruction(), textDocument.uri, instruction.getInstructionRange(), SymbolKind.Function));
        }
        return symbols;
    }

}
