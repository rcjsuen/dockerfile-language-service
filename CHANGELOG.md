# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
- new computeCommandEdits function to DockerfileLanguageService ([#4](https://github.com/rcjsuen/dockerfile-language-service/issues/4))

### Removed
- replaced DockerfileLanguageService's createWorkspaceEdit with a computeCommandEdits function ([#4](https://github.com/rcjsuen/dockerfile-language-service/issues/4))
```TypeScript
// removed
let workspaceEdit = service.computeCommandEdits(dockerfileContent, commandId, args);
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

[Unreleased]: https://github.com/rcjsuen/dockerfile-language-server-nodejs/compare/v0.0.1...HEAD
