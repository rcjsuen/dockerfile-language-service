# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
- updated Capabilities interface to support documentation formats for CompletionItems
```TypeScript
interface Capabilities {
    /**
     * Capabilities related to completion requests.
     */
    completion?: {
        /**
         * Capabilities related to completion items.
         */
        completionItem?: {
            /**
             * Describes the supported content types that can be used
             * for a CompletionItem's documentation field.
             */
            documentationFormat?: MarkupKind[];
            /**
             * Indicates whether the snippet syntax should be used in
             * returned completion items.
             */
            snippetSupport?: boolean;
        }
    }
}
```
- allow documentation in CompletionItems to be provided in Markdown ([#12](https://github.com/rcjsuen/dockerfile-language-service/issues/12))

## [0.0.2] - 2018-03-08
### Added
- new Capabilities interface for defining what features the language service should support and enable
```TypeScript
interface Capabilities {
    /**
     * Capabilities related to completion requests.
     */
    completion?: {
        /**
         * Capabilities related to completion items.
         */
        completionItem?: {
            /**
             * Indicates whether the snippet syntax should be used in
             * returned completion items.
             */
            snippetSupport?: boolean;
        }
    };
    /**
     * Capabilities related to hover requests.
     */
    hover?: {
        /**
         * Describes the content type that should be returned for hovers.
         */
        contentFormat?: MarkupKind[];
    }
}
```
- new computeCommandEdits function to DockerfileLanguageService ([#4](https://github.com/rcjsuen/dockerfile-language-service/issues/4))
- update documentation to state that ARG was introduced in Docker 1.9 ([#7](https://github.com/rcjsuen/dockerfile-language-service/issues/7))
- allow hover information to be returned in Markdown or plain text ([#14](https://github.com/rcjsuen/dockerfile-language-service/issues/14))

### Changed
- change the signature of DockerfileLanguageService's computeHighlightRanges function by removing its first URI string parameter ([#15](https://github.com/rcjsuen/dockerfile-language-service/issues/15))
```TypeScript
import { Position } from 'vscode-languageserver-types';
// removed
let ranges = service.computeHighlightRanges(uri, content, Position.create(3, 1));
// replace the above with the following
let ranges = service.computeHighlightRanges(content, Position.create(3, 1));
```
- change the signature of DockerfileLanguageService's computeCompletionItems function by removing its final boolean parameter ([#23](https://github.com/rcjsuen/dockerfile-language-service/issues/23))
```TypeScript
import { Position } from 'vscode-languageserver-types';
// removed
let ranges = service.computeCompletionItems(content, Position.create(3, 1), true);
// replace the above with the following
service.setCapabilities({ completion: { completionItem: { snippetSupport: true } } });
let ranges = service.computeCompletionItems(content, Position.create(3, 1));
```

### Fixed
- change documentation to state that STOPSIGNAL was added in Docker 1.9 instead of Docker 1.12 ([#6](https://github.com/rcjsuen/dockerfile-language-service/issues/6))
- align active parameter amongst all displayed signatures for a FROM with a build stage name ([#8](https://github.com/rcjsuen/dockerfile-language-service/issues/8))
- fix validate function to read the provided settings ([#18](https://github.com/rcjsuen/dockerfile-language-service/issues/18))
- use a non-zero range for the diagnostic if FROM's base image's digest is the empty string ([rcjsuen/dockerfile-utils#21](https://github.com/rcjsuen/dockerfile-utils/issues/21))
- ignore multiple CMD, ENTRYPOINT, and HEALTHCHECK instructions in a Dockerfile if there is only ever one in a build stage ([rcjsuen/dockerfile-utils#22](https://github.com/rcjsuen/dockerfile-utils/issues/22))
- handle invalid decimal values without a leading zero for duration flags ([rcjsuen/dockerfile-utils#23](https://github.com/rcjsuen/dockerfile-utils/issues/23))
- ignore and return null for hover computations with an invalid position ([#22](https://github.com/rcjsuen/dockerfile-language-service/issues/22))

### Removed
- replaced DockerfileLanguageService's createWorkspaceEdit with a computeCommandEdits function ([#4](https://github.com/rcjsuen/dockerfile-language-service/issues/4))
```TypeScript
// removed
let workspaceEdit = service.createWorkspaceEdit(dockerfileContent, commandId, args);
// replace the above with the following
let uri = ...; // the URI of the opened Dockerfile
let edits = service.computeCommandEdits(dockerfileContent, commandId, args);
let workspaceEdit = {
  changes: {
    [ uri ]: edits
  }
}
```

## 0.0.1 - 2018-02-17
### Added
- created a language service that exposes an API similar to that defined by the language server protocol
  - validation and proposed resolution of said errors and warnings
    - textDocument/publishDiagnostics
    - textDocument/codeAction
    - workspace/executeCommand
  - navigation and editing
    - textDocument/definition
    - textDocument/documentHighlight
    - textDocument/documentSymbol
    - textDocument/documentLink
  - code completion
    - completionItem/resolve
    - textDocument/completion
    - textDocument/signatureHelp
  - formatting
    - textDocument/formatting
    - textDocument/onTypeFormatting
    - textDocument/rangeFormatting
  - contextual information
    - textDocument/rename
    - textDocument/hover

[Unreleased]: https://github.com/rcjsuen/dockerfile-language-service/compare/v0.0.2...HEAD
[0.0.2]: https://github.com/rcjsuen/dockerfile-language-service/compare/v0.0.1...v0.0.2
