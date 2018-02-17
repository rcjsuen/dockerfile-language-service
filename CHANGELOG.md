# Changelog
All notable changes to this project will be documented in this file.

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
