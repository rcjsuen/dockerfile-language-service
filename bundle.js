/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 67);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return Position; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Range", function() { return Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Location", function() { return Location; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationLink", function() { return LocationLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorInformation", function() { return ColorInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorPresentation", function() { return ColorPresentation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FoldingRangeKind", function() { return FoldingRangeKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FoldingRange", function() { return FoldingRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiagnosticRelatedInformation", function() { return DiagnosticRelatedInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiagnosticSeverity", function() { return DiagnosticSeverity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiagnosticTag", function() { return DiagnosticTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Diagnostic", function() { return Diagnostic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Command", function() { return Command; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextEdit", function() { return TextEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextDocumentEdit", function() { return TextDocumentEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateFile", function() { return CreateFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenameFile", function() { return RenameFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteFile", function() { return DeleteFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkspaceEdit", function() { return WorkspaceEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkspaceChange", function() { return WorkspaceChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextDocumentIdentifier", function() { return TextDocumentIdentifier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VersionedTextDocumentIdentifier", function() { return VersionedTextDocumentIdentifier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextDocumentItem", function() { return TextDocumentItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkupKind", function() { return MarkupKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkupContent", function() { return MarkupContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompletionItemKind", function() { return CompletionItemKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsertTextFormat", function() { return InsertTextFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompletionItemTag", function() { return CompletionItemTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompletionItem", function() { return CompletionItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompletionList", function() { return CompletionList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkedString", function() { return MarkedString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hover", function() { return Hover; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParameterInformation", function() { return ParameterInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignatureInformation", function() { return SignatureInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentHighlightKind", function() { return DocumentHighlightKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentHighlight", function() { return DocumentHighlight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SymbolKind", function() { return SymbolKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SymbolTag", function() { return SymbolTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SymbolInformation", function() { return SymbolInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentSymbol", function() { return DocumentSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeActionKind", function() { return CodeActionKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeActionContext", function() { return CodeActionContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeAction", function() { return CodeAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeLens", function() { return CodeLens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormattingOptions", function() { return FormattingOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentLink", function() { return DocumentLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionRange", function() { return SelectionRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EOL", function() { return EOL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextDocument", function() { return TextDocument; });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

/**
 * The Position namespace provides helper functions to work with
 * [Position](#Position) literals.
 */
var Position;
(function (Position) {
    /**
     * Creates a new Position literal from the given line and character.
     * @param line The position's line.
     * @param character The position's character.
     */
    function create(line, character) {
        return { line: line, character: character };
    }
    Position.create = create;
    /**
     * Checks whether the given liternal conforms to the [Position](#Position) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Is.number(candidate.line) && Is.number(candidate.character);
    }
    Position.is = is;
})(Position || (Position = {}));
/**
 * The Range namespace provides helper functions to work with
 * [Range](#Range) literals.
 */
var Range;
(function (Range) {
    function create(one, two, three, four) {
        if (Is.number(one) && Is.number(two) && Is.number(three) && Is.number(four)) {
            return { start: Position.create(one, two), end: Position.create(three, four) };
        }
        else if (Position.is(one) && Position.is(two)) {
            return { start: one, end: two };
        }
        else {
            throw new Error("Range#create called with invalid arguments[" + one + ", " + two + ", " + three + ", " + four + "]");
        }
    }
    Range.create = create;
    /**
     * Checks whether the given literal conforms to the [Range](#Range) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
    }
    Range.is = is;
})(Range || (Range = {}));
/**
 * The Location namespace provides helper functions to work with
 * [Location](#Location) literals.
 */
var Location;
(function (Location) {
    /**
     * Creates a Location literal.
     * @param uri The location's uri.
     * @param range The location's range.
     */
    function create(uri, range) {
        return { uri: uri, range: range };
    }
    Location.create = create;
    /**
     * Checks whether the given literal conforms to the [Location](#Location) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
    }
    Location.is = is;
})(Location || (Location = {}));
/**
 * The LocationLink namespace provides helper functions to work with
 * [LocationLink](#LocationLink) literals.
 */
var LocationLink;
(function (LocationLink) {
    /**
     * Creates a LocationLink literal.
     * @param targetUri The definition's uri.
     * @param targetRange The full range of the definition.
     * @param targetSelectionRange The span of the symbol definition at the target.
     * @param originSelectionRange The span of the symbol being defined in the originating source file.
     */
    function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
        return { targetUri: targetUri, targetRange: targetRange, targetSelectionRange: targetSelectionRange, originSelectionRange: originSelectionRange };
    }
    LocationLink.create = create;
    /**
     * Checks whether the given literal conforms to the [LocationLink](#LocationLink) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri)
            && (Range.is(candidate.targetSelectionRange) || Is.undefined(candidate.targetSelectionRange))
            && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
    }
    LocationLink.is = is;
})(LocationLink || (LocationLink = {}));
/**
 * The Color namespace provides helper functions to work with
 * [Color](#Color) literals.
 */
var Color;
(function (Color) {
    /**
     * Creates a new Color literal.
     */
    function create(red, green, blue, alpha) {
        return {
            red: red,
            green: green,
            blue: blue,
            alpha: alpha,
        };
    }
    Color.create = create;
    /**
     * Checks whether the given literal conforms to the [Color](#Color) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.number(candidate.red)
            && Is.number(candidate.green)
            && Is.number(candidate.blue)
            && Is.number(candidate.alpha);
    }
    Color.is = is;
})(Color || (Color = {}));
/**
 * The ColorInformation namespace provides helper functions to work with
 * [ColorInformation](#ColorInformation) literals.
 */
var ColorInformation;
(function (ColorInformation) {
    /**
     * Creates a new ColorInformation literal.
     */
    function create(range, color) {
        return {
            range: range,
            color: color,
        };
    }
    ColorInformation.create = create;
    /**
     * Checks whether the given literal conforms to the [ColorInformation](#ColorInformation) interface.
     */
    function is(value) {
        var candidate = value;
        return Range.is(candidate.range) && Color.is(candidate.color);
    }
    ColorInformation.is = is;
})(ColorInformation || (ColorInformation = {}));
/**
 * The Color namespace provides helper functions to work with
 * [ColorPresentation](#ColorPresentation) literals.
 */
var ColorPresentation;
(function (ColorPresentation) {
    /**
     * Creates a new ColorInformation literal.
     */
    function create(label, textEdit, additionalTextEdits) {
        return {
            label: label,
            textEdit: textEdit,
            additionalTextEdits: additionalTextEdits,
        };
    }
    ColorPresentation.create = create;
    /**
     * Checks whether the given literal conforms to the [ColorInformation](#ColorInformation) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.string(candidate.label)
            && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate))
            && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
    }
    ColorPresentation.is = is;
})(ColorPresentation || (ColorPresentation = {}));
/**
 * Enum of known range kinds
 */
var FoldingRangeKind;
(function (FoldingRangeKind) {
    /**
     * Folding range for a comment
     */
    FoldingRangeKind["Comment"] = "comment";
    /**
     * Folding range for a imports or includes
     */
    FoldingRangeKind["Imports"] = "imports";
    /**
     * Folding range for a region (e.g. `#region`)
     */
    FoldingRangeKind["Region"] = "region";
})(FoldingRangeKind || (FoldingRangeKind = {}));
/**
 * The folding range namespace provides helper functions to work with
 * [FoldingRange](#FoldingRange) literals.
 */
var FoldingRange;
(function (FoldingRange) {
    /**
     * Creates a new FoldingRange literal.
     */
    function create(startLine, endLine, startCharacter, endCharacter, kind) {
        var result = {
            startLine: startLine,
            endLine: endLine
        };
        if (Is.defined(startCharacter)) {
            result.startCharacter = startCharacter;
        }
        if (Is.defined(endCharacter)) {
            result.endCharacter = endCharacter;
        }
        if (Is.defined(kind)) {
            result.kind = kind;
        }
        return result;
    }
    FoldingRange.create = create;
    /**
     * Checks whether the given literal conforms to the [FoldingRange](#FoldingRange) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.number(candidate.startLine) && Is.number(candidate.startLine)
            && (Is.undefined(candidate.startCharacter) || Is.number(candidate.startCharacter))
            && (Is.undefined(candidate.endCharacter) || Is.number(candidate.endCharacter))
            && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
    }
    FoldingRange.is = is;
})(FoldingRange || (FoldingRange = {}));
/**
 * The DiagnosticRelatedInformation namespace provides helper functions to work with
 * [DiagnosticRelatedInformation](#DiagnosticRelatedInformation) literals.
 */
var DiagnosticRelatedInformation;
(function (DiagnosticRelatedInformation) {
    /**
     * Creates a new DiagnosticRelatedInformation literal.
     */
    function create(location, message) {
        return {
            location: location,
            message: message
        };
    }
    DiagnosticRelatedInformation.create = create;
    /**
     * Checks whether the given literal conforms to the [DiagnosticRelatedInformation](#DiagnosticRelatedInformation) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
    }
    DiagnosticRelatedInformation.is = is;
})(DiagnosticRelatedInformation || (DiagnosticRelatedInformation = {}));
/**
 * The diagnostic's severity.
 */
var DiagnosticSeverity;
(function (DiagnosticSeverity) {
    /**
     * Reports an error.
     */
    DiagnosticSeverity.Error = 1;
    /**
     * Reports a warning.
     */
    DiagnosticSeverity.Warning = 2;
    /**
     * Reports an information.
     */
    DiagnosticSeverity.Information = 3;
    /**
     * Reports a hint.
     */
    DiagnosticSeverity.Hint = 4;
})(DiagnosticSeverity || (DiagnosticSeverity = {}));
/**
 * The diagnostic tags.
 *
 * @since 3.15.0
 */
var DiagnosticTag;
(function (DiagnosticTag) {
    /**
     * Unused or unnecessary code.
     *
     * Clients are allowed to render diagnostics with this tag faded out instead of having
     * an error squiggle.
     */
    DiagnosticTag.Unnecessary = 1;
    /**
     * Deprecated or obsolete code.
     *
     * Clients are allowed to rendered diagnostics with this tag strike through.
     */
    DiagnosticTag.Deprecated = 2;
})(DiagnosticTag || (DiagnosticTag = {}));
/**
 * The Diagnostic namespace provides helper functions to work with
 * [Diagnostic](#Diagnostic) literals.
 */
var Diagnostic;
(function (Diagnostic) {
    /**
     * Creates a new Diagnostic literal.
     */
    function create(range, message, severity, code, source, relatedInformation) {
        var result = { range: range, message: message };
        if (Is.defined(severity)) {
            result.severity = severity;
        }
        if (Is.defined(code)) {
            result.code = code;
        }
        if (Is.defined(source)) {
            result.source = source;
        }
        if (Is.defined(relatedInformation)) {
            result.relatedInformation = relatedInformation;
        }
        return result;
    }
    Diagnostic.create = create;
    /**
     * Checks whether the given literal conforms to the [Diagnostic](#Diagnostic) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate)
            && Range.is(candidate.range)
            && Is.string(candidate.message)
            && (Is.number(candidate.severity) || Is.undefined(candidate.severity))
            && (Is.number(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code))
            && (Is.string(candidate.source) || Is.undefined(candidate.source))
            && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
    }
    Diagnostic.is = is;
})(Diagnostic || (Diagnostic = {}));
/**
 * The Command namespace provides helper functions to work with
 * [Command](#Command) literals.
 */
var Command;
(function (Command) {
    /**
     * Creates a new Command literal.
     */
    function create(title, command) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var result = { title: title, command: command };
        if (Is.defined(args) && args.length > 0) {
            result.arguments = args;
        }
        return result;
    }
    Command.create = create;
    /**
     * Checks whether the given literal conforms to the [Command](#Command) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
    }
    Command.is = is;
})(Command || (Command = {}));
/**
 * The TextEdit namespace provides helper function to create replace,
 * insert and delete edits more easily.
 */
var TextEdit;
(function (TextEdit) {
    /**
     * Creates a replace text edit.
     * @param range The range of text to be replaced.
     * @param newText The new text.
     */
    function replace(range, newText) {
        return { range: range, newText: newText };
    }
    TextEdit.replace = replace;
    /**
     * Creates a insert text edit.
     * @param position The position to insert the text at.
     * @param newText The text to be inserted.
     */
    function insert(position, newText) {
        return { range: { start: position, end: position }, newText: newText };
    }
    TextEdit.insert = insert;
    /**
     * Creates a delete text edit.
     * @param range The range of text to be deleted.
     */
    function del(range) {
        return { range: range, newText: '' };
    }
    TextEdit.del = del;
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate)
            && Is.string(candidate.newText)
            && Range.is(candidate.range);
    }
    TextEdit.is = is;
})(TextEdit || (TextEdit = {}));
/**
 * The TextDocumentEdit namespace provides helper function to create
 * an edit that manipulates a text document.
 */
var TextDocumentEdit;
(function (TextDocumentEdit) {
    /**
     * Creates a new `TextDocumentEdit`
     */
    function create(textDocument, edits) {
        return { textDocument: textDocument, edits: edits };
    }
    TextDocumentEdit.create = create;
    function is(value) {
        var candidate = value;
        return Is.defined(candidate)
            && VersionedTextDocumentIdentifier.is(candidate.textDocument)
            && Array.isArray(candidate.edits);
    }
    TextDocumentEdit.is = is;
})(TextDocumentEdit || (TextDocumentEdit = {}));
var CreateFile;
(function (CreateFile) {
    function create(uri, options) {
        var result = {
            kind: 'create',
            uri: uri
        };
        if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
            result.options = options;
        }
        return result;
    }
    CreateFile.create = create;
    function is(value) {
        var candidate = value;
        return candidate && candidate.kind === 'create' && Is.string(candidate.uri) &&
            (candidate.options === void 0 ||
                ((candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))));
    }
    CreateFile.is = is;
})(CreateFile || (CreateFile = {}));
var RenameFile;
(function (RenameFile) {
    function create(oldUri, newUri, options) {
        var result = {
            kind: 'rename',
            oldUri: oldUri,
            newUri: newUri
        };
        if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
            result.options = options;
        }
        return result;
    }
    RenameFile.create = create;
    function is(value) {
        var candidate = value;
        return candidate && candidate.kind === 'rename' && Is.string(candidate.oldUri) && Is.string(candidate.newUri) &&
            (candidate.options === void 0 ||
                ((candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))));
    }
    RenameFile.is = is;
})(RenameFile || (RenameFile = {}));
var DeleteFile;
(function (DeleteFile) {
    function create(uri, options) {
        var result = {
            kind: 'delete',
            uri: uri
        };
        if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) {
            result.options = options;
        }
        return result;
    }
    DeleteFile.create = create;
    function is(value) {
        var candidate = value;
        return candidate && candidate.kind === 'delete' && Is.string(candidate.uri) &&
            (candidate.options === void 0 ||
                ((candidate.options.recursive === void 0 || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === void 0 || Is.boolean(candidate.options.ignoreIfNotExists))));
    }
    DeleteFile.is = is;
})(DeleteFile || (DeleteFile = {}));
var WorkspaceEdit;
(function (WorkspaceEdit) {
    function is(value) {
        var candidate = value;
        return candidate &&
            (candidate.changes !== void 0 || candidate.documentChanges !== void 0) &&
            (candidate.documentChanges === void 0 || candidate.documentChanges.every(function (change) {
                if (Is.string(change.kind)) {
                    return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
                }
                else {
                    return TextDocumentEdit.is(change);
                }
            }));
    }
    WorkspaceEdit.is = is;
})(WorkspaceEdit || (WorkspaceEdit = {}));
var TextEditChangeImpl = /** @class */ (function () {
    function TextEditChangeImpl(edits) {
        this.edits = edits;
    }
    TextEditChangeImpl.prototype.insert = function (position, newText) {
        this.edits.push(TextEdit.insert(position, newText));
    };
    TextEditChangeImpl.prototype.replace = function (range, newText) {
        this.edits.push(TextEdit.replace(range, newText));
    };
    TextEditChangeImpl.prototype.delete = function (range) {
        this.edits.push(TextEdit.del(range));
    };
    TextEditChangeImpl.prototype.add = function (edit) {
        this.edits.push(edit);
    };
    TextEditChangeImpl.prototype.all = function () {
        return this.edits;
    };
    TextEditChangeImpl.prototype.clear = function () {
        this.edits.splice(0, this.edits.length);
    };
    return TextEditChangeImpl;
}());
/**
 * A workspace change helps constructing changes to a workspace.
 */
var WorkspaceChange = /** @class */ (function () {
    function WorkspaceChange(workspaceEdit) {
        var _this = this;
        this._textEditChanges = Object.create(null);
        if (workspaceEdit) {
            this._workspaceEdit = workspaceEdit;
            if (workspaceEdit.documentChanges) {
                workspaceEdit.documentChanges.forEach(function (change) {
                    if (TextDocumentEdit.is(change)) {
                        var textEditChange = new TextEditChangeImpl(change.edits);
                        _this._textEditChanges[change.textDocument.uri] = textEditChange;
                    }
                });
            }
            else if (workspaceEdit.changes) {
                Object.keys(workspaceEdit.changes).forEach(function (key) {
                    var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
                    _this._textEditChanges[key] = textEditChange;
                });
            }
        }
    }
    Object.defineProperty(WorkspaceChange.prototype, "edit", {
        /**
         * Returns the underlying [WorkspaceEdit](#WorkspaceEdit) literal
         * use to be returned from a workspace edit operation like rename.
         */
        get: function () {
            return this._workspaceEdit;
        },
        enumerable: true,
        configurable: true
    });
    WorkspaceChange.prototype.getTextEditChange = function (key) {
        if (VersionedTextDocumentIdentifier.is(key)) {
            if (!this._workspaceEdit) {
                this._workspaceEdit = {
                    documentChanges: []
                };
            }
            if (!this._workspaceEdit.documentChanges) {
                throw new Error('Workspace edit is not configured for document changes.');
            }
            var textDocument = key;
            var result = this._textEditChanges[textDocument.uri];
            if (!result) {
                var edits = [];
                var textDocumentEdit = {
                    textDocument: textDocument,
                    edits: edits
                };
                this._workspaceEdit.documentChanges.push(textDocumentEdit);
                result = new TextEditChangeImpl(edits);
                this._textEditChanges[textDocument.uri] = result;
            }
            return result;
        }
        else {
            if (!this._workspaceEdit) {
                this._workspaceEdit = {
                    changes: Object.create(null)
                };
            }
            if (!this._workspaceEdit.changes) {
                throw new Error('Workspace edit is not configured for normal text edit changes.');
            }
            var result = this._textEditChanges[key];
            if (!result) {
                var edits = [];
                this._workspaceEdit.changes[key] = edits;
                result = new TextEditChangeImpl(edits);
                this._textEditChanges[key] = result;
            }
            return result;
        }
    };
    WorkspaceChange.prototype.createFile = function (uri, options) {
        this.checkDocumentChanges();
        this._workspaceEdit.documentChanges.push(CreateFile.create(uri, options));
    };
    WorkspaceChange.prototype.renameFile = function (oldUri, newUri, options) {
        this.checkDocumentChanges();
        this._workspaceEdit.documentChanges.push(RenameFile.create(oldUri, newUri, options));
    };
    WorkspaceChange.prototype.deleteFile = function (uri, options) {
        this.checkDocumentChanges();
        this._workspaceEdit.documentChanges.push(DeleteFile.create(uri, options));
    };
    WorkspaceChange.prototype.checkDocumentChanges = function () {
        if (!this._workspaceEdit || !this._workspaceEdit.documentChanges) {
            throw new Error('Workspace edit is not configured for document changes.');
        }
    };
    return WorkspaceChange;
}());

/**
 * The TextDocumentIdentifier namespace provides helper functions to work with
 * [TextDocumentIdentifier](#TextDocumentIdentifier) literals.
 */
var TextDocumentIdentifier;
(function (TextDocumentIdentifier) {
    /**
     * Creates a new TextDocumentIdentifier literal.
     * @param uri The document's uri.
     */
    function create(uri) {
        return { uri: uri };
    }
    TextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [TextDocumentIdentifier](#TextDocumentIdentifier) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri);
    }
    TextDocumentIdentifier.is = is;
})(TextDocumentIdentifier || (TextDocumentIdentifier = {}));
/**
 * The VersionedTextDocumentIdentifier namespace provides helper functions to work with
 * [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) literals.
 */
var VersionedTextDocumentIdentifier;
(function (VersionedTextDocumentIdentifier) {
    /**
     * Creates a new VersionedTextDocumentIdentifier literal.
     * @param uri The document's uri.
     * @param uri The document's text.
     */
    function create(uri, version) {
        return { uri: uri, version: version };
    }
    VersionedTextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.number(candidate.version));
    }
    VersionedTextDocumentIdentifier.is = is;
})(VersionedTextDocumentIdentifier || (VersionedTextDocumentIdentifier = {}));
/**
 * The TextDocumentItem namespace provides helper functions to work with
 * [TextDocumentItem](#TextDocumentItem) literals.
 */
var TextDocumentItem;
(function (TextDocumentItem) {
    /**
     * Creates a new TextDocumentItem literal.
     * @param uri The document's uri.
     * @param languageId The document's language identifier.
     * @param version The document's version number.
     * @param text The document's text.
     */
    function create(uri, languageId, version, text) {
        return { uri: uri, languageId: languageId, version: version, text: text };
    }
    TextDocumentItem.create = create;
    /**
     * Checks whether the given literal conforms to the [TextDocumentItem](#TextDocumentItem) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.number(candidate.version) && Is.string(candidate.text);
    }
    TextDocumentItem.is = is;
})(TextDocumentItem || (TextDocumentItem = {}));
/**
 * Describes the content type that a client supports in various
 * result literals like `Hover`, `ParameterInfo` or `CompletionItem`.
 *
 * Please note that `MarkupKinds` must not start with a `$`. This kinds
 * are reserved for internal usage.
 */
var MarkupKind;
(function (MarkupKind) {
    /**
     * Plain text is supported as a content format
     */
    MarkupKind.PlainText = 'plaintext';
    /**
     * Markdown is supported as a content format
     */
    MarkupKind.Markdown = 'markdown';
})(MarkupKind || (MarkupKind = {}));
(function (MarkupKind) {
    /**
     * Checks whether the given value is a value of the [MarkupKind](#MarkupKind) type.
     */
    function is(value) {
        var candidate = value;
        return candidate === MarkupKind.PlainText || candidate === MarkupKind.Markdown;
    }
    MarkupKind.is = is;
})(MarkupKind || (MarkupKind = {}));
var MarkupContent;
(function (MarkupContent) {
    /**
     * Checks whether the given value conforms to the [MarkupContent](#MarkupContent) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
    }
    MarkupContent.is = is;
})(MarkupContent || (MarkupContent = {}));
/**
 * The kind of a completion entry.
 */
var CompletionItemKind;
(function (CompletionItemKind) {
    CompletionItemKind.Text = 1;
    CompletionItemKind.Method = 2;
    CompletionItemKind.Function = 3;
    CompletionItemKind.Constructor = 4;
    CompletionItemKind.Field = 5;
    CompletionItemKind.Variable = 6;
    CompletionItemKind.Class = 7;
    CompletionItemKind.Interface = 8;
    CompletionItemKind.Module = 9;
    CompletionItemKind.Property = 10;
    CompletionItemKind.Unit = 11;
    CompletionItemKind.Value = 12;
    CompletionItemKind.Enum = 13;
    CompletionItemKind.Keyword = 14;
    CompletionItemKind.Snippet = 15;
    CompletionItemKind.Color = 16;
    CompletionItemKind.File = 17;
    CompletionItemKind.Reference = 18;
    CompletionItemKind.Folder = 19;
    CompletionItemKind.EnumMember = 20;
    CompletionItemKind.Constant = 21;
    CompletionItemKind.Struct = 22;
    CompletionItemKind.Event = 23;
    CompletionItemKind.Operator = 24;
    CompletionItemKind.TypeParameter = 25;
})(CompletionItemKind || (CompletionItemKind = {}));
/**
 * Defines whether the insert text in a completion item should be interpreted as
 * plain text or a snippet.
 */
var InsertTextFormat;
(function (InsertTextFormat) {
    /**
     * The primary text to be inserted is treated as a plain string.
     */
    InsertTextFormat.PlainText = 1;
    /**
     * The primary text to be inserted is treated as a snippet.
     *
     * A snippet can define tab stops and placeholders with `$1`, `$2`
     * and `${3:foo}`. `$0` defines the final tab stop, it defaults to
     * the end of the snippet. Placeholders with equal identifiers are linked,
     * that is typing in one will update others too.
     *
     * See also: https://github.com/Microsoft/vscode/blob/master/src/vs/editor/contrib/snippet/common/snippet.md
     */
    InsertTextFormat.Snippet = 2;
})(InsertTextFormat || (InsertTextFormat = {}));
/**
 * Completion item tags are extra annotations that tweak the rendering of a completion
 * item.
 *
 * @since 3.15.0
 */
var CompletionItemTag;
(function (CompletionItemTag) {
    /**
     * Render a completion as obsolete, usually using a strike-out.
     */
    CompletionItemTag.Deprecated = 1;
})(CompletionItemTag || (CompletionItemTag = {}));
/**
 * The CompletionItem namespace provides functions to deal with
 * completion items.
 */
var CompletionItem;
(function (CompletionItem) {
    /**
     * Create a completion item and seed it with a label.
     * @param label The completion item's label
     */
    function create(label) {
        return { label: label };
    }
    CompletionItem.create = create;
})(CompletionItem || (CompletionItem = {}));
/**
 * The CompletionList namespace provides functions to deal with
 * completion lists.
 */
var CompletionList;
(function (CompletionList) {
    /**
     * Creates a new completion list.
     *
     * @param items The completion items.
     * @param isIncomplete The list is not complete.
     */
    function create(items, isIncomplete) {
        return { items: items ? items : [], isIncomplete: !!isIncomplete };
    }
    CompletionList.create = create;
})(CompletionList || (CompletionList = {}));
var MarkedString;
(function (MarkedString) {
    /**
     * Creates a marked string from plain text.
     *
     * @param plainText The plain text.
     */
    function fromPlainText(plainText) {
        return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&'); // escape markdown syntax tokens: http://daringfireball.net/projects/markdown/syntax#backslash
    }
    MarkedString.fromPlainText = fromPlainText;
    /**
     * Checks whether the given value conforms to the [MarkedString](#MarkedString) type.
     */
    function is(value) {
        var candidate = value;
        return Is.string(candidate) || (Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value));
    }
    MarkedString.is = is;
})(MarkedString || (MarkedString = {}));
var Hover;
(function (Hover) {
    /**
     * Checks whether the given value conforms to the [Hover](#Hover) interface.
     */
    function is(value) {
        var candidate = value;
        return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) ||
            MarkedString.is(candidate.contents) ||
            Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === void 0 || Range.is(value.range));
    }
    Hover.is = is;
})(Hover || (Hover = {}));
/**
 * The ParameterInformation namespace provides helper functions to work with
 * [ParameterInformation](#ParameterInformation) literals.
 */
var ParameterInformation;
(function (ParameterInformation) {
    /**
     * Creates a new parameter information literal.
     *
     * @param label A label string.
     * @param documentation A doc string.
     */
    function create(label, documentation) {
        return documentation ? { label: label, documentation: documentation } : { label: label };
    }
    ParameterInformation.create = create;
})(ParameterInformation || (ParameterInformation = {}));
/**
 * The SignatureInformation namespace provides helper functions to work with
 * [SignatureInformation](#SignatureInformation) literals.
 */
var SignatureInformation;
(function (SignatureInformation) {
    function create(label, documentation) {
        var parameters = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            parameters[_i - 2] = arguments[_i];
        }
        var result = { label: label };
        if (Is.defined(documentation)) {
            result.documentation = documentation;
        }
        if (Is.defined(parameters)) {
            result.parameters = parameters;
        }
        else {
            result.parameters = [];
        }
        return result;
    }
    SignatureInformation.create = create;
})(SignatureInformation || (SignatureInformation = {}));
/**
 * A document highlight kind.
 */
var DocumentHighlightKind;
(function (DocumentHighlightKind) {
    /**
     * A textual occurrence.
     */
    DocumentHighlightKind.Text = 1;
    /**
     * Read-access of a symbol, like reading a variable.
     */
    DocumentHighlightKind.Read = 2;
    /**
     * Write-access of a symbol, like writing to a variable.
     */
    DocumentHighlightKind.Write = 3;
})(DocumentHighlightKind || (DocumentHighlightKind = {}));
/**
 * DocumentHighlight namespace to provide helper functions to work with
 * [DocumentHighlight](#DocumentHighlight) literals.
 */
var DocumentHighlight;
(function (DocumentHighlight) {
    /**
     * Create a DocumentHighlight object.
     * @param range The range the highlight applies to.
     */
    function create(range, kind) {
        var result = { range: range };
        if (Is.number(kind)) {
            result.kind = kind;
        }
        return result;
    }
    DocumentHighlight.create = create;
})(DocumentHighlight || (DocumentHighlight = {}));
/**
 * A symbol kind.
 */
var SymbolKind;
(function (SymbolKind) {
    SymbolKind.File = 1;
    SymbolKind.Module = 2;
    SymbolKind.Namespace = 3;
    SymbolKind.Package = 4;
    SymbolKind.Class = 5;
    SymbolKind.Method = 6;
    SymbolKind.Property = 7;
    SymbolKind.Field = 8;
    SymbolKind.Constructor = 9;
    SymbolKind.Enum = 10;
    SymbolKind.Interface = 11;
    SymbolKind.Function = 12;
    SymbolKind.Variable = 13;
    SymbolKind.Constant = 14;
    SymbolKind.String = 15;
    SymbolKind.Number = 16;
    SymbolKind.Boolean = 17;
    SymbolKind.Array = 18;
    SymbolKind.Object = 19;
    SymbolKind.Key = 20;
    SymbolKind.Null = 21;
    SymbolKind.EnumMember = 22;
    SymbolKind.Struct = 23;
    SymbolKind.Event = 24;
    SymbolKind.Operator = 25;
    SymbolKind.TypeParameter = 26;
})(SymbolKind || (SymbolKind = {}));
/**
 * Symbol tags are extra annotations that tweak the rendering of a symbol.
 * @since 3.15
 */
var SymbolTag;
(function (SymbolTag) {
    /**
     * Render a symbol as obsolete, usually using a strike-out.
     */
    SymbolTag.Deprecated = 1;
})(SymbolTag || (SymbolTag = {}));
var SymbolInformation;
(function (SymbolInformation) {
    /**
     * Creates a new symbol information literal.
     *
     * @param name The name of the symbol.
     * @param kind The kind of the symbol.
     * @param range The range of the location of the symbol.
     * @param uri The resource of the location of symbol, defaults to the current document.
     * @param containerName The name of the symbol containing the symbol.
     */
    function create(name, kind, range, uri, containerName) {
        var result = {
            name: name,
            kind: kind,
            location: { uri: uri, range: range }
        };
        if (containerName) {
            result.containerName = containerName;
        }
        return result;
    }
    SymbolInformation.create = create;
})(SymbolInformation || (SymbolInformation = {}));
var DocumentSymbol;
(function (DocumentSymbol) {
    /**
     * Creates a new symbol information literal.
     *
     * @param name The name of the symbol.
     * @param detail The detail of the symbol.
     * @param kind The kind of the symbol.
     * @param range The range of the symbol.
     * @param selectionRange The selectionRange of the symbol.
     * @param children Children of the symbol.
     */
    function create(name, detail, kind, range, selectionRange, children) {
        var result = {
            name: name,
            detail: detail,
            kind: kind,
            range: range,
            selectionRange: selectionRange
        };
        if (children !== void 0) {
            result.children = children;
        }
        return result;
    }
    DocumentSymbol.create = create;
    /**
     * Checks whether the given literal conforms to the [DocumentSymbol](#DocumentSymbol) interface.
     */
    function is(value) {
        var candidate = value;
        return candidate &&
            Is.string(candidate.name) && Is.number(candidate.kind) &&
            Range.is(candidate.range) && Range.is(candidate.selectionRange) &&
            (candidate.detail === void 0 || Is.string(candidate.detail)) &&
            (candidate.deprecated === void 0 || Is.boolean(candidate.deprecated)) &&
            (candidate.children === void 0 || Array.isArray(candidate.children));
    }
    DocumentSymbol.is = is;
})(DocumentSymbol || (DocumentSymbol = {}));
/**
 * A set of predefined code action kinds
 */
var CodeActionKind;
(function (CodeActionKind) {
    /**
     * Empty kind.
     */
    CodeActionKind.Empty = '';
    /**
     * Base kind for quickfix actions: 'quickfix'
     */
    CodeActionKind.QuickFix = 'quickfix';
    /**
     * Base kind for refactoring actions: 'refactor'
     */
    CodeActionKind.Refactor = 'refactor';
    /**
     * Base kind for refactoring extraction actions: 'refactor.extract'
     *
     * Example extract actions:
     *
     * - Extract method
     * - Extract function
     * - Extract variable
     * - Extract interface from class
     * - ...
     */
    CodeActionKind.RefactorExtract = 'refactor.extract';
    /**
     * Base kind for refactoring inline actions: 'refactor.inline'
     *
     * Example inline actions:
     *
     * - Inline function
     * - Inline variable
     * - Inline constant
     * - ...
     */
    CodeActionKind.RefactorInline = 'refactor.inline';
    /**
     * Base kind for refactoring rewrite actions: 'refactor.rewrite'
     *
     * Example rewrite actions:
     *
     * - Convert JavaScript function to class
     * - Add or remove parameter
     * - Encapsulate field
     * - Make method static
     * - Move method to base class
     * - ...
     */
    CodeActionKind.RefactorRewrite = 'refactor.rewrite';
    /**
     * Base kind for source actions: `source`
     *
     * Source code actions apply to the entire file.
     */
    CodeActionKind.Source = 'source';
    /**
     * Base kind for an organize imports source action: `source.organizeImports`
     */
    CodeActionKind.SourceOrganizeImports = 'source.organizeImports';
    /**
     * Base kind for auto-fix source actions: `source.fixAll`.
     *
     * Fix all actions automatically fix errors that have a clear fix that do not require user input.
     * They should not suppress errors or perform unsafe fixes such as generating new types or classes.
     *
     * @since 3.15.0
     */
    CodeActionKind.SourceFixAll = 'source.fixAll';
})(CodeActionKind || (CodeActionKind = {}));
/**
 * The CodeActionContext namespace provides helper functions to work with
 * [CodeActionContext](#CodeActionContext) literals.
 */
var CodeActionContext;
(function (CodeActionContext) {
    /**
     * Creates a new CodeActionContext literal.
     */
    function create(diagnostics, only) {
        var result = { diagnostics: diagnostics };
        if (only !== void 0 && only !== null) {
            result.only = only;
        }
        return result;
    }
    CodeActionContext.create = create;
    /**
     * Checks whether the given literal conforms to the [CodeActionContext](#CodeActionContext) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === void 0 || Is.typedArray(candidate.only, Is.string));
    }
    CodeActionContext.is = is;
})(CodeActionContext || (CodeActionContext = {}));
var CodeAction;
(function (CodeAction) {
    function create(title, commandOrEdit, kind) {
        var result = { title: title };
        if (Command.is(commandOrEdit)) {
            result.command = commandOrEdit;
        }
        else {
            result.edit = commandOrEdit;
        }
        if (kind !== void 0) {
            result.kind = kind;
        }
        return result;
    }
    CodeAction.create = create;
    function is(value) {
        var candidate = value;
        return candidate && Is.string(candidate.title) &&
            (candidate.diagnostics === void 0 || Is.typedArray(candidate.diagnostics, Diagnostic.is)) &&
            (candidate.kind === void 0 || Is.string(candidate.kind)) &&
            (candidate.edit !== void 0 || candidate.command !== void 0) &&
            (candidate.command === void 0 || Command.is(candidate.command)) &&
            (candidate.isPreferred === void 0 || Is.boolean(candidate.isPreferred)) &&
            (candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit));
    }
    CodeAction.is = is;
})(CodeAction || (CodeAction = {}));
/**
 * The CodeLens namespace provides helper functions to work with
 * [CodeLens](#CodeLens) literals.
 */
var CodeLens;
(function (CodeLens) {
    /**
     * Creates a new CodeLens literal.
     */
    function create(range, data) {
        var result = { range: range };
        if (Is.defined(data)) {
            result.data = data;
        }
        return result;
    }
    CodeLens.create = create;
    /**
     * Checks whether the given literal conforms to the [CodeLens](#CodeLens) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
    }
    CodeLens.is = is;
})(CodeLens || (CodeLens = {}));
/**
 * The FormattingOptions namespace provides helper functions to work with
 * [FormattingOptions](#FormattingOptions) literals.
 */
var FormattingOptions;
(function (FormattingOptions) {
    /**
     * Creates a new FormattingOptions literal.
     */
    function create(tabSize, insertSpaces) {
        return { tabSize: tabSize, insertSpaces: insertSpaces };
    }
    FormattingOptions.create = create;
    /**
     * Checks whether the given literal conforms to the [FormattingOptions](#FormattingOptions) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.number(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
    }
    FormattingOptions.is = is;
})(FormattingOptions || (FormattingOptions = {}));
/**
 * The DocumentLink namespace provides helper functions to work with
 * [DocumentLink](#DocumentLink) literals.
 */
var DocumentLink;
(function (DocumentLink) {
    /**
     * Creates a new DocumentLink literal.
     */
    function create(range, target, data) {
        return { range: range, target: target, data: data };
    }
    DocumentLink.create = create;
    /**
     * Checks whether the given literal conforms to the [DocumentLink](#DocumentLink) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
    }
    DocumentLink.is = is;
})(DocumentLink || (DocumentLink = {}));
/**
 * The SelectionRange namespace provides helper function to work with
 * SelectionRange literals.
 */
var SelectionRange;
(function (SelectionRange) {
    /**
     * Creates a new SelectionRange
     * @param range the range.
     * @param parent an optional parent.
     */
    function create(range, parent) {
        return { range: range, parent: parent };
    }
    SelectionRange.create = create;
    function is(value) {
        var candidate = value;
        return candidate !== undefined && Range.is(candidate.range) && (candidate.parent === undefined || SelectionRange.is(candidate.parent));
    }
    SelectionRange.is = is;
})(SelectionRange || (SelectionRange = {}));
var EOL = ['\n', '\r\n', '\r'];
/**
 * @deprecated Use the text document from the new vscode-languageserver-textdocument package.
 */
var TextDocument;
(function (TextDocument) {
    /**
     * Creates a new ITextDocument literal from the given uri and content.
     * @param uri The document's uri.
     * @param languageId  The document's language Id.
     * @param content The document's content.
     */
    function create(uri, languageId, version, content) {
        return new FullTextDocument(uri, languageId, version, content);
    }
    TextDocument.create = create;
    /**
     * Checks whether the given literal conforms to the [ITextDocument](#ITextDocument) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.number(candidate.lineCount)
            && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
    }
    TextDocument.is = is;
    function applyEdits(document, edits) {
        var text = document.getText();
        var sortedEdits = mergeSort(edits, function (a, b) {
            var diff = a.range.start.line - b.range.start.line;
            if (diff === 0) {
                return a.range.start.character - b.range.start.character;
            }
            return diff;
        });
        var lastModifiedOffset = text.length;
        for (var i = sortedEdits.length - 1; i >= 0; i--) {
            var e = sortedEdits[i];
            var startOffset = document.offsetAt(e.range.start);
            var endOffset = document.offsetAt(e.range.end);
            if (endOffset <= lastModifiedOffset) {
                text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
            }
            else {
                throw new Error('Overlapping edit');
            }
            lastModifiedOffset = startOffset;
        }
        return text;
    }
    TextDocument.applyEdits = applyEdits;
    function mergeSort(data, compare) {
        if (data.length <= 1) {
            // sorted
            return data;
        }
        var p = (data.length / 2) | 0;
        var left = data.slice(0, p);
        var right = data.slice(p);
        mergeSort(left, compare);
        mergeSort(right, compare);
        var leftIdx = 0;
        var rightIdx = 0;
        var i = 0;
        while (leftIdx < left.length && rightIdx < right.length) {
            var ret = compare(left[leftIdx], right[rightIdx]);
            if (ret <= 0) {
                // smaller_equal -> take left to preserve order
                data[i++] = left[leftIdx++];
            }
            else {
                // greater -> take right
                data[i++] = right[rightIdx++];
            }
        }
        while (leftIdx < left.length) {
            data[i++] = left[leftIdx++];
        }
        while (rightIdx < right.length) {
            data[i++] = right[rightIdx++];
        }
        return data;
    }
})(TextDocument || (TextDocument = {}));
var FullTextDocument = /** @class */ (function () {
    function FullTextDocument(uri, languageId, version, content) {
        this._uri = uri;
        this._languageId = languageId;
        this._version = version;
        this._content = content;
        this._lineOffsets = undefined;
    }
    Object.defineProperty(FullTextDocument.prototype, "uri", {
        get: function () {
            return this._uri;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "languageId", {
        get: function () {
            return this._languageId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "version", {
        get: function () {
            return this._version;
        },
        enumerable: true,
        configurable: true
    });
    FullTextDocument.prototype.getText = function (range) {
        if (range) {
            var start = this.offsetAt(range.start);
            var end = this.offsetAt(range.end);
            return this._content.substring(start, end);
        }
        return this._content;
    };
    FullTextDocument.prototype.update = function (event, version) {
        this._content = event.text;
        this._version = version;
        this._lineOffsets = undefined;
    };
    FullTextDocument.prototype.getLineOffsets = function () {
        if (this._lineOffsets === undefined) {
            var lineOffsets = [];
            var text = this._content;
            var isLineStart = true;
            for (var i = 0; i < text.length; i++) {
                if (isLineStart) {
                    lineOffsets.push(i);
                    isLineStart = false;
                }
                var ch = text.charAt(i);
                isLineStart = (ch === '\r' || ch === '\n');
                if (ch === '\r' && i + 1 < text.length && text.charAt(i + 1) === '\n') {
                    i++;
                }
            }
            if (isLineStart && text.length > 0) {
                lineOffsets.push(text.length);
            }
            this._lineOffsets = lineOffsets;
        }
        return this._lineOffsets;
    };
    FullTextDocument.prototype.positionAt = function (offset) {
        offset = Math.max(Math.min(offset, this._content.length), 0);
        var lineOffsets = this.getLineOffsets();
        var low = 0, high = lineOffsets.length;
        if (high === 0) {
            return Position.create(0, offset);
        }
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (lineOffsets[mid] > offset) {
                high = mid;
            }
            else {
                low = mid + 1;
            }
        }
        // low is the least x for which the line offset is larger than the current offset
        // or array.length if no line offset is larger than the current offset
        var line = low - 1;
        return Position.create(line, offset - lineOffsets[line]);
    };
    FullTextDocument.prototype.offsetAt = function (position) {
        var lineOffsets = this.getLineOffsets();
        if (position.line >= lineOffsets.length) {
            return this._content.length;
        }
        else if (position.line < 0) {
            return 0;
        }
        var lineOffset = lineOffsets[position.line];
        var nextLineOffset = (position.line + 1 < lineOffsets.length) ? lineOffsets[position.line + 1] : this._content.length;
        return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
    };
    Object.defineProperty(FullTextDocument.prototype, "lineCount", {
        get: function () {
            return this.getLineOffsets().length;
        },
        enumerable: true,
        configurable: true
    });
    return FullTextDocument;
}());
var Is;
(function (Is) {
    var toString = Object.prototype.toString;
    function defined(value) {
        return typeof value !== 'undefined';
    }
    Is.defined = defined;
    function undefined(value) {
        return typeof value === 'undefined';
    }
    Is.undefined = undefined;
    function boolean(value) {
        return value === true || value === false;
    }
    Is.boolean = boolean;
    function string(value) {
        return toString.call(value) === '[object String]';
    }
    Is.string = string;
    function number(value) {
        return toString.call(value) === '[object Number]';
    }
    Is.number = number;
    function func(value) {
        return toString.call(value) === '[object Function]';
    }
    Is.func = func;
    function objectLiteral(value) {
        // Strictly speaking class instances pass this check as well. Since the LSP
        // doesn't use classes we ignore this for now. If we do we need to add something
        // like this: `Object.getPrototypeOf(Object.getPrototypeOf(x)) === null`
        return value !== null && typeof value === 'object';
    }
    Is.objectLiteral = objectLiteral;
    function typedArray(value, check) {
        return Array.isArray(value) && value.every(check);
    }
    Is.typedArray = typedArray;
})(Is || (Is = {}));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var argument_1 = __webpack_require__(12);
exports.Argument = argument_1.Argument;
var jsonArgument_1 = __webpack_require__(44);
exports.JSONArgument = jsonArgument_1.JSONArgument;
const comment_1 = __webpack_require__(35);
exports.Comment = comment_1.Comment;
const parser_1 = __webpack_require__(45);
var flag_1 = __webpack_require__(36);
exports.Flag = flag_1.Flag;
const instruction_1 = __webpack_require__(3);
exports.Instruction = instruction_1.Instruction;
var line_1 = __webpack_require__(15);
exports.Line = line_1.Line;
const parserDirective_1 = __webpack_require__(46);
exports.ParserDirective = parserDirective_1.ParserDirective;
var property_1 = __webpack_require__(28);
exports.Property = property_1.Property;
var variable_1 = __webpack_require__(47);
exports.Variable = variable_1.Variable;
var add_1 = __webpack_require__(37);
exports.Add = add_1.Add;
const arg_1 = __webpack_require__(21);
exports.Arg = arg_1.Arg;
const cmd_1 = __webpack_require__(22);
exports.Cmd = cmd_1.Cmd;
const copy_1 = __webpack_require__(23);
exports.Copy = copy_1.Copy;
const entrypoint_1 = __webpack_require__(24);
exports.Entrypoint = entrypoint_1.Entrypoint;
const env_1 = __webpack_require__(25);
exports.Env = env_1.Env;
const from_1 = __webpack_require__(14);
exports.From = from_1.From;
const healthcheck_1 = __webpack_require__(26);
exports.Healthcheck = healthcheck_1.Healthcheck;
var jsonInstruction_1 = __webpack_require__(4);
exports.JSONInstruction = jsonInstruction_1.JSONInstruction;
var label_1 = __webpack_require__(38);
exports.Label = label_1.Label;
var modifiableInstruction_1 = __webpack_require__(16);
exports.ModifiableInstruction = modifiableInstruction_1.ModifiableInstruction;
var onbuild_1 = __webpack_require__(27);
exports.Onbuild = onbuild_1.Onbuild;
var propertyInstruction_1 = __webpack_require__(17);
exports.PropertyInstruction = propertyInstruction_1.PropertyInstruction;
var shell_1 = __webpack_require__(39);
exports.Shell = shell_1.Shell;
var stopsignal_1 = __webpack_require__(40);
exports.Stopsignal = stopsignal_1.Stopsignal;
var user_1 = __webpack_require__(41);
exports.User = user_1.User;
var volume_1 = __webpack_require__(42);
exports.Volume = volume_1.Volume;
var workdir_1 = __webpack_require__(43);
exports.Workdir = workdir_1.Workdir;
var Keyword;
(function (Keyword) {
    Keyword["ADD"] = "ADD";
    Keyword["ARG"] = "ARG";
    Keyword["CMD"] = "CMD";
    Keyword["COPY"] = "COPY";
    Keyword["ENTRYPOINT"] = "ENTRYPOINT";
    Keyword["ENV"] = "ENV";
    Keyword["EXPOSE"] = "EXPOSE";
    Keyword["FROM"] = "FROM";
    Keyword["HEALTHCHECK"] = "HEALTHCHECK";
    Keyword["LABEL"] = "LABEL";
    Keyword["MAINTAINER"] = "MAINTAINER";
    Keyword["ONBUILD"] = "ONBUILD";
    Keyword["RUN"] = "RUN";
    Keyword["SHELL"] = "SHELL";
    Keyword["STOPSIGNAL"] = "STOPSIGNAL";
    Keyword["USER"] = "USER";
    Keyword["VOLUME"] = "VOLUME";
    Keyword["WORKDIR"] = "WORKDIR";
})(Keyword = exports.Keyword || (exports.Keyword = {}));
var Directive;
(function (Directive) {
    Directive["escape"] = "escape";
    Directive["syntax"] = "syntax";
})(Directive = exports.Directive || (exports.Directive = {}));
exports.DefaultVariables = [
    "FTP_PROXY", "ftp_proxy",
    "HTTP_PROXY", "http_proxy",
    "HTTPS_PROXY", "https_proxy",
    "NO_PROXY", "no_proxy"
];
var DockerfileParser;
(function (DockerfileParser) {
    function parse(content) {
        let parser = new parser_1.Parser();
        return parser.parse(content);
    }
    DockerfileParser.parse = parse;
})(DockerfileParser = exports.DockerfileParser || (exports.DockerfileParser = {}));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
const vscode_languageserver_types_1 = __webpack_require__(0);
const util_1 = __webpack_require__(7);
const line_1 = __webpack_require__(15);
const argument_1 = __webpack_require__(12);
const variable_1 = __webpack_require__(47);
const main_1 = __webpack_require__(1);
class Instruction extends line_1.Line {
    constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
        super(document, range);
        this.dockerfile = dockerfile;
        this.escapeChar = escapeChar;
        this.instruction = instruction;
        this.instructionRange = instructionRange;
    }
    toString() {
        let value = this.getKeyword();
        for (let arg of this.getArguments()) {
            value += ' ';
            value += arg.getValue();
        }
        return value;
    }
    getRangeContent(range) {
        if (range === null) {
            return null;
        }
        return this.document.getText().substring(this.document.offsetAt(range.start), this.document.offsetAt(range.end));
    }
    getInstructionRange() {
        return this.instructionRange;
    }
    getInstruction() {
        return this.instruction;
    }
    getKeyword() {
        return this.getInstruction().toUpperCase();
    }
    getArgumentsRange() {
        let args = this.getArguments();
        if (args.length === 0) {
            return null;
        }
        return vscode_languageserver_types_1.Range.create(args[0].getRange().start, args[args.length - 1].getRange().end);
    }
    getArgumentsRanges() {
        let args = this.getArguments();
        if (args.length === 0) {
            return [];
        }
        if (args[0].getRange().start.line === args[args.length - 1].getRange().end.line) {
            return [vscode_languageserver_types_1.Range.create(args[0].getRange().start, args[args.length - 1].getRange().end)];
        }
        let ranges = [];
        let end = -1;
        let startPosition = args[0].getRange().start;
        let range = this.getInstructionRange();
        let extra = this.document.offsetAt(range.end) - this.document.offsetAt(range.start);
        let content = this.getTextContent();
        let fullArgs = content.substring(extra, this.document.offsetAt(args[args.length - 1].getRange().end) - this.document.offsetAt(range.start));
        let offset = this.document.offsetAt(range.start) + extra;
        let start = false;
        let comment = false;
        for (let i = 0; i < fullArgs.length; i++) {
            let char = fullArgs.charAt(i);
            if (char === this.escapeChar) {
                let next = fullArgs.charAt(i + 1);
                if (next === ' ' || next === '\t') {
                    whitespaceCheck: for (let j = i + 2; j < fullArgs.length; j++) {
                        switch (fullArgs.charAt(j)) {
                            case ' ':
                            case '\t':
                                continue;
                            case '\r':
                                j++;
                            case '\n':
                                ranges.push(vscode_languageserver_types_1.Range.create(startPosition, this.document.positionAt(offset + end + 1)));
                                startPosition = null;
                                start = true;
                                comment = false;
                                i = j;
                                break whitespaceCheck;
                            default:
                                break whitespaceCheck;
                        }
                    }
                }
                else if (next === '\r') {
                    ranges.push(vscode_languageserver_types_1.Range.create(startPosition, this.document.positionAt(offset + end + 1)));
                    startPosition = null;
                    start = true;
                    comment = false;
                    i += 2;
                }
                else if (next === '\n') {
                    ranges.push(vscode_languageserver_types_1.Range.create(startPosition, this.document.positionAt(offset + end + 1)));
                    startPosition = null;
                    start = true;
                    comment = false;
                    i++;
                }
                else {
                    i++;
                }
            }
            else if (util_1.Util.isNewline(char)) {
                if (comment) {
                    if (startPosition) {
                        ranges.push(vscode_languageserver_types_1.Range.create(startPosition, this.document.positionAt(offset + end)));
                    }
                    startPosition = null;
                    start = true;
                    comment = false;
                }
            }
            else {
                if (!comment) {
                    if (startPosition === null) {
                        if (char === '#') {
                            comment = true;
                        }
                        let position = this.document.positionAt(offset + i);
                        if (position.character !== 0) {
                            startPosition = vscode_languageserver_types_1.Position.create(position.line, 0);
                        }
                    }
                    end = i;
                }
            }
        }
        if (startPosition === null) {
            // should only happen if the last argument is on its own line with
            // no leading whitespace
            ranges.push(vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + end), this.document.positionAt(offset + end + 1)));
        }
        else {
            ranges.push(vscode_languageserver_types_1.Range.create(startPosition, this.document.positionAt(offset + end + 1)));
        }
        return ranges;
    }
    getRawArgumentsContent() {
        let args = this.getArguments();
        if (args.length === 0) {
            return null;
        }
        return this.getRangeContent(vscode_languageserver_types_1.Range.create(args[0].getRange().start, args[args.length - 1].getRange().end));
    }
    getArgumentsContent() {
        let args = this.getArguments();
        if (args.length === 0) {
            return null;
        }
        let content = "";
        let ranges = this.getArgumentsRanges();
        let documentText = this.document.getText();
        for (let range of ranges) {
            content += documentText.substring(this.document.offsetAt(range.start), this.document.offsetAt(range.end));
        }
        return content;
    }
    getArguments() {
        let args = [];
        let range = this.getInstructionRange();
        let extra = this.document.offsetAt(range.end) - this.document.offsetAt(range.start);
        let content = this.getTextContent();
        let fullArgs = content.substring(extra);
        let offset = this.document.offsetAt(range.start) + extra;
        let start = false;
        let comment = false;
        let found = -1;
        // determines whether the parser has found a space or tab
        // whitespace character that's a part of an escaped newline sequence
        let escapedWhitespaceDetected = false;
        // determines if the parser is currently in an escaped newline sequence
        let escaping = false;
        let escapeMarker = -1;
        let escapedArg = "";
        for (let i = 0; i < fullArgs.length; i++) {
            let char = fullArgs.charAt(i);
            if (util_1.Util.isWhitespace(char)) {
                if (escaping) {
                    escapedWhitespaceDetected = true;
                    if (util_1.Util.isNewline(char)) {
                        // reached a newline, any previously
                        // detected whitespace should be ignored
                        escapedWhitespaceDetected = false;
                        if (comment) {
                            // reached a newline, no longer in a comment
                            comment = false;
                        }
                    }
                    continue;
                }
                else if (found !== -1) {
                    if (escapeMarker === -1) {
                        args.push(new argument_1.Argument(escapedArg, vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + found), this.document.positionAt(offset + i))));
                    }
                    else {
                        args.push(new argument_1.Argument(escapedArg, vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + found), this.document.positionAt(offset + escapeMarker))));
                    }
                    escapeMarker = -1;
                    escapedArg = "";
                    found = -1;
                }
            }
            else if (char === this.escapeChar) {
                let next = fullArgs.charAt(i + 1);
                if (next === ' ' || next === '\t') {
                    whitespaceCheck: for (let j = i + 2; j < fullArgs.length; j++) {
                        let newlineCheck = fullArgs.charAt(j);
                        switch (newlineCheck) {
                            case ' ':
                            case '\t':
                                continue;
                            case '\r':
                                j++;
                            case '\n':
                                escaping = true;
                                start = true;
                                if (found !== -1) {
                                    escapeMarker = i;
                                }
                                i = j;
                                break whitespaceCheck;
                            default:
                                escapeMarker = i;
                                if (found === -1) {
                                    i = j - 1;
                                }
                                break whitespaceCheck;
                        }
                    }
                }
                else if (next === '\r') {
                    escaping = true;
                    start = true;
                    if (found !== -1) {
                        escapeMarker = i;
                    }
                    i += 2;
                }
                else if (next === '\n') {
                    escaping = true;
                    start = true;
                    if (found !== -1) {
                        escapeMarker = i;
                    }
                    i++;
                }
                else {
                    if (escapedWhitespaceDetected && escapeMarker !== -1) {
                        args.push(new argument_1.Argument(escapedArg, vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + found), this.document.positionAt(offset + escapeMarker))));
                        escapedArg = "";
                        found = -1;
                    }
                    escapedWhitespaceDetected = false;
                    escaping = false;
                    if (next === '$') {
                        escapedArg = escapedArg + char + next;
                    }
                    else {
                        escapedArg = escapedArg + next;
                    }
                    if (found === -1) {
                        found = i;
                    }
                    i++;
                }
            }
            else if (!comment) {
                if (start && char === '#') {
                    start = false;
                    comment = true;
                }
                else {
                    if (escapedWhitespaceDetected && escapeMarker !== -1) {
                        args.push(new argument_1.Argument(escapedArg, vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + found), this.document.positionAt(offset + escapeMarker))));
                        escapedArg = "";
                        found = -1;
                    }
                    escapedWhitespaceDetected = false;
                    escaping = false;
                    escapeMarker = -1;
                    escapedArg = escapedArg + char;
                    if (found === -1) {
                        found = i;
                    }
                }
            }
        }
        if (found !== -1) {
            if (escapeMarker === -1) {
                args.push(new argument_1.Argument(escapedArg, vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + found), this.document.positionAt(offset + fullArgs.length))));
            }
            else {
                args.push(new argument_1.Argument(escapedArg, vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + found), this.document.positionAt(offset + escapeMarker))));
            }
        }
        return args;
    }
    getExpandedArguments() {
        let args = this.getArguments();
        for (let i = 0; i < args.length; i++) {
            const argRange = args[i].getRange();
            let offset = this.document.offsetAt(argRange.start);
            const variables = this.parseVariables(offset, args[i].getValue());
            const swaps = [];
            let requiresExpansion = false;
            for (let variable of variables) {
                const value = this.dockerfile.resolveVariable(variable.getName(), variable.getNameRange().start.line);
                swaps.push(value);
                requiresExpansion = requiresExpansion || value !== undefined;
            }
            if (requiresExpansion) {
                let expanded = "";
                for (let j = 0; j < swaps.length; j++) {
                    const variableRange = variables[j].getRange();
                    const start = this.document.offsetAt(variableRange.start);
                    const end = this.document.offsetAt(variableRange.end);
                    if (swaps[j]) {
                        // replace variable with its resolved value
                        expanded += this.document.getText().substring(offset, start);
                        expanded += swaps[j];
                        offset = end;
                    }
                    else {
                        expanded += this.document.getText().substring(offset, end);
                        offset = end;
                    }
                }
                const argEnd = this.document.offsetAt(argRange.end);
                if (argEnd !== offset) {
                    // if the variable's range doesn't match the argument,
                    // append the remaining text
                    expanded += this.document.getText().substring(offset, argEnd);
                }
                args[i] = new argument_1.Argument(expanded, argRange);
            }
        }
        return args;
    }
    getVariables() {
        const variables = [];
        const args = this.getArguments();
        for (const arg of args) {
            let range = arg.getRange();
            let rawValue = this.document.getText().substring(this.document.offsetAt(range.start), this.document.offsetAt(range.end));
            const parsedVariables = this.parseVariables(this.document.offsetAt(arg.getRange().start), rawValue);
            for (const parsedVariable of parsedVariables) {
                variables.push(parsedVariable);
            }
        }
        return variables;
    }
    parseVariables(offset, arg) {
        let variables = [];
        variableLoop: for (let i = 0; i < arg.length; i++) {
            switch (arg.charAt(i)) {
                case this.escapeChar:
                    if (arg.charAt(i + 1) === '$') {
                        i++;
                    }
                    break;
                case '$':
                    if (arg.charAt(i + 1) === '{') {
                        let escapedString = "${";
                        let escapedName = "";
                        let nameEnd = -1;
                        let escapedSubstitutionParameter = "";
                        let substitutionStart = -1;
                        let substitutionEnd = -1;
                        let modifierRead = -1;
                        nameLoop: for (let j = i + 2; j < arg.length; j++) {
                            let char = arg.charAt(j);
                            switch (char) {
                                case this.escapeChar:
                                    for (let k = j + 1; k < arg.length; k++) {
                                        switch (arg.charAt(k)) {
                                            case ' ':
                                            case '\t':
                                            case '\r':
                                                // ignore whitespace
                                                continue;
                                            case '\n':
                                                // escape this newline
                                                j = k;
                                                continue nameLoop;
                                        }
                                    }
                                    break;
                                case '}':
                                    escapedString += '}';
                                    let modifier = null;
                                    let modifierRange = null;
                                    let substitutionParameter = modifierRead !== -1 ? escapedSubstitutionParameter : null;
                                    let substitutionRange = null;
                                    if (nameEnd === -1) {
                                        nameEnd = j;
                                    }
                                    else if (nameEnd + 1 === j) {
                                        modifier = "";
                                        modifierRange = vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + nameEnd + 1), this.document.positionAt(offset + nameEnd + 1));
                                    }
                                    else {
                                        if (substitutionStart === -1) {
                                            // no substitution parameter found,
                                            // but a modifier character existed,
                                            // just offset the range by 1 from
                                            // the modifier character
                                            substitutionStart = modifierRead + 1;
                                            substitutionEnd = modifierRead + 1;
                                        }
                                        else {
                                            // offset one more from the last
                                            // character found
                                            substitutionEnd = substitutionEnd + 1;
                                        }
                                        modifier = arg.substring(modifierRead, modifierRead + 1);
                                        modifierRange = vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + modifierRead), this.document.positionAt(offset + modifierRead + 1));
                                        substitutionRange = vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + substitutionStart), this.document.positionAt(offset + substitutionEnd));
                                    }
                                    let start = this.document.positionAt(offset + i);
                                    variables.push(new variable_1.Variable(escapedName, vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + i + 2), this.document.positionAt(offset + nameEnd)), vscode_languageserver_types_1.Range.create(start, this.document.positionAt(offset + j + 1)), modifier, modifierRange, substitutionParameter, substitutionRange, this.dockerfile.resolveVariable(escapedName, start.line) !== undefined, this.isBuildVariable(escapedName, start.line), escapedString));
                                    i = j;
                                    continue variableLoop;
                                case ':':
                                    if (nameEnd === -1) {
                                        nameEnd = j;
                                    }
                                    else if (modifierRead !== -1) {
                                        if (substitutionStart === -1) {
                                            substitutionStart = j;
                                            substitutionEnd = j;
                                        }
                                        else {
                                            substitutionEnd = j;
                                        }
                                        escapedSubstitutionParameter += ':';
                                    }
                                    else {
                                        modifierRead = j;
                                    }
                                    escapedString += ':';
                                    break;
                                case '\n':
                                case '\r':
                                case ' ':
                                case '\t':
                                    break;
                                default:
                                    if (nameEnd === -1) {
                                        escapedName += char;
                                    }
                                    else if (modifierRead !== -1) {
                                        if (substitutionStart === -1) {
                                            substitutionStart = j;
                                            substitutionEnd = j;
                                        }
                                        else {
                                            substitutionEnd = j;
                                        }
                                        escapedSubstitutionParameter += char;
                                    }
                                    else {
                                        modifierRead = j;
                                    }
                                    escapedString += char;
                                    break;
                            }
                        }
                        // no } found, not a valid variable, stop processing
                        break variableLoop;
                    }
                    else if (util_1.Util.isWhitespace(arg.charAt(i + 1)) || i === arg.length - 1) {
                        // $ followed by whitespace or EOF, ignore this variable
                        continue;
                    }
                    else {
                        let escapedName = "";
                        nameLoop: for (let j = i + 1; j < arg.length; j++) {
                            let char = arg.charAt(j);
                            switch (char) {
                                case '\r':
                                case '\n':
                                case ' ':
                                case '\t':
                                    continue;
                                case '$':
                                case '\'':
                                case '"':
                                    let varStart = this.document.positionAt(offset + i);
                                    variables.push(new variable_1.Variable(escapedName, vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + i + 1), this.document.positionAt(offset + j)), vscode_languageserver_types_1.Range.create(varStart, this.document.positionAt(offset + j)), null, null, null, null, this.dockerfile.resolveVariable(escapedName, varStart.line) !== undefined, this.isBuildVariable(escapedName, varStart.line), '$' + escapedName));
                                    i = j - 1;
                                    continue variableLoop;
                                case this.escapeChar:
                                    for (let k = j + 1; k < arg.length; k++) {
                                        switch (arg.charAt(k)) {
                                            case ' ':
                                            case '\t':
                                            case '\r':
                                                // ignore whitespace
                                                continue;
                                            case '\n':
                                                // escape this newline
                                                j = k;
                                                continue nameLoop;
                                        }
                                    }
                                    // reached EOF after an escape character
                                    let start = this.document.positionAt(offset + i);
                                    variables.push(new variable_1.Variable(escapedName, vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + i + 1), this.document.positionAt(offset + j)), vscode_languageserver_types_1.Range.create(start, this.document.positionAt(offset + j)), null, null, null, null, this.dockerfile.resolveVariable(escapedName, start.line) !== undefined, this.isBuildVariable(escapedName, start.line), '$' + escapedName));
                                    break variableLoop;
                            }
                            if (char.match(/^[a-z0-9_]+$/i) === null) {
                                let varStart = this.document.positionAt(offset + i);
                                variables.push(new variable_1.Variable(escapedName, vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + i + 1), this.document.positionAt(offset + j)), vscode_languageserver_types_1.Range.create(varStart, this.document.positionAt(offset + j)), null, null, null, null, this.dockerfile.resolveVariable(escapedName, varStart.line) !== undefined, this.isBuildVariable(escapedName, varStart.line), '$' + escapedName));
                                i = j - 1;
                                continue variableLoop;
                            }
                            escapedName += char;
                        }
                        let start = this.document.positionAt(offset + i);
                        variables.push(new variable_1.Variable(escapedName, vscode_languageserver_types_1.Range.create(this.document.positionAt(offset + i + 1), this.document.positionAt(offset + arg.length)), vscode_languageserver_types_1.Range.create(start, this.document.positionAt(offset + arg.length)), null, null, null, null, this.dockerfile.resolveVariable(escapedName, start.line) !== undefined, this.isBuildVariable(escapedName, start.line), '$' + escapedName));
                    }
                    break variableLoop;
            }
        }
        return variables;
    }
    isBuildVariable(variable, line) {
        if (this.getKeyword() === main_1.Keyword.FROM) {
            for (const initialArg of this.dockerfile.getInitialARGs()) {
                const arg = initialArg;
                const property = arg.getProperty();
                if (property && variable === property.getName()) {
                    return true;
                }
            }
            return undefined;
        }
        let image = this.dockerfile.getContainingImage(vscode_languageserver_types_1.Position.create(line, 0));
        let envs = image.getENVs();
        for (let i = envs.length - 1; i >= 0; i--) {
            if (envs[i].isBefore(line)) {
                for (let property of envs[i].getProperties()) {
                    if (property.getName() === variable) {
                        return false;
                    }
                }
            }
        }
        let args = image.getARGs();
        for (let i = args.length - 1; i >= 0; i--) {
            if (args[i].isBefore(line)) {
                let property = args[i].getProperty();
                if (property && property.getName() === variable) {
                    return true;
                }
            }
        }
        return undefined;
    }
}
exports.Instruction = Instruction;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
const vscode_languageserver_types_1 = __webpack_require__(0);
const argument_1 = __webpack_require__(12);
const jsonArgument_1 = __webpack_require__(44);
const modifiableInstruction_1 = __webpack_require__(16);
class JSONInstruction extends modifiableInstruction_1.ModifiableInstruction {
    constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
        super(document, range, dockerfile, escapeChar, instruction, instructionRange);
        this.openingBracket = null;
        this.closingBracket = null;
        this.jsonStrings = [];
        const argsContent = this.getRawArgumentsContent();
        if (argsContent === null) {
            return;
        }
        const args = this.getArguments();
        if (args.length === 1 && args[0].getValue() === "[]") {
            let argRange = args[0].getRange();
            this.openingBracket = new argument_1.Argument("[", vscode_languageserver_types_1.Range.create(argRange.start.line, argRange.start.character, argRange.start.line, argRange.start.character + 1));
            this.closingBracket = new argument_1.Argument("]", vscode_languageserver_types_1.Range.create(argRange.start.line, argRange.start.character + 1, argRange.end.line, argRange.end.character));
            return;
        }
        else if (args.length === 2 && args[0].getValue() === '[' && args[1].getValue() === ']') {
            this.openingBracket = args[0];
            this.closingBracket = args[1];
            return;
        }
        const argsOffset = document.offsetAt(this.getArgumentsRange().start);
        let start = -1;
        let last = "";
        let quoted = false;
        let escapedArg = "";
        argsCheck: for (let i = 0; i < argsContent.length; i++) {
            let char = argsContent.charAt(i);
            switch (char) {
                case '[':
                    if (last === "") {
                        this.openingBracket = new argument_1.Argument("[", vscode_languageserver_types_1.Range.create(document.positionAt(argsOffset + i), document.positionAt(argsOffset + i + 1)));
                        last = '[';
                    }
                    else if (quoted) {
                        escapedArg = escapedArg + char;
                    }
                    else {
                        break argsCheck;
                    }
                    break;
                case '"':
                    if (last === '[' || last === ',') {
                        start = i;
                        quoted = true;
                        last = '"';
                        escapedArg = escapedArg + char;
                        continue;
                    }
                    else if (last === '"') {
                        if (quoted) {
                            escapedArg = escapedArg + char;
                            // quoted string done
                            quoted = false;
                            this.jsonStrings.push(new jsonArgument_1.JSONArgument(escapedArg, vscode_languageserver_types_1.Range.create(document.positionAt(argsOffset + start), document.positionAt(argsOffset + i + 1)), vscode_languageserver_types_1.Range.create(document.positionAt(argsOffset + start + 1), document.positionAt(argsOffset + i))));
                            escapedArg = "";
                        }
                        else {
                            // should be a , or a ]
                            break argsCheck;
                        }
                    }
                    else {
                        break argsCheck;
                    }
                    break;
                case ',':
                    if (quoted) {
                        escapedArg = escapedArg + char;
                    }
                    else {
                        if (last === '"') {
                            last = ',';
                        }
                        else {
                            break argsCheck;
                        }
                    }
                    break;
                case ']':
                    if (quoted) {
                        escapedArg = escapedArg + char;
                    }
                    else if (last !== "") {
                        this.closingBracket = new argument_1.Argument("]", vscode_languageserver_types_1.Range.create(document.positionAt(argsOffset + i), document.positionAt(argsOffset + i + 1)));
                        break argsCheck;
                    }
                    break;
                case ' ':
                case '\t':
                    break;
                case '\\':
                    if (quoted) {
                        switch (argsContent.charAt(i + 1)) {
                            case '"':
                            case '\\':
                                escapedArg = escapedArg + argsContent.charAt(i + 1);
                                i++;
                                continue;
                            case ' ':
                            case '\t':
                                escapeCheck: for (let j = i + 2; j < argsContent.length; j++) {
                                    switch (argsContent.charAt(j)) {
                                        case '\r':
                                            // offset one more for \r\n
                                            j++;
                                        case '\n':
                                            i = j;
                                            continue argsCheck;
                                        case ' ':
                                        case '\t':
                                            break;
                                        default:
                                            break escapeCheck;
                                    }
                                }
                                break;
                            case '\r':
                                // offset one more for \r\n
                                i++;
                            default:
                                i++;
                                continue;
                        }
                    }
                    else {
                        escapeCheck: for (let j = i + 1; j < argsContent.length; j++) {
                            switch (argsContent.charAt(j)) {
                                case '\r':
                                    // offset one more for \r\n
                                    j++;
                                case '\n':
                                    i = j;
                                    continue argsCheck;
                                case ' ':
                                case '\t':
                                    break;
                                default:
                                    break escapeCheck;
                            }
                        }
                    }
                    break argsCheck;
                default:
                    if (!quoted) {
                        break argsCheck;
                    }
                    escapedArg = escapedArg + char;
                    break;
            }
        }
    }
    stopSearchingForFlags(_value) {
        return true;
    }
    getOpeningBracket() {
        return this.openingBracket;
    }
    getJSONStrings() {
        return this.jsonStrings;
    }
    getClosingBracket() {
        return this.closingBracket;
    }
}
exports.JSONInstruction = JSONInstruction;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(68)
var ieee754 = __webpack_require__(75)
var isArray = __webpack_require__(49)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
class Util {
    static isWhitespace(char) {
        return char === ' ' || char === '\t' || Util.isNewline(char);
    }
    static isNewline(char) {
        return char === '\r' || char === '\n';
    }
    static findLeadingNonWhitespace(content, escapeChar) {
        whitespaceCheck: for (let i = 0; i < content.length; i++) {
            switch (content.charAt(i)) {
                case ' ':
                case '\t':
                    continue;
                case escapeChar:
                    escapeCheck: for (let j = i + 1; j < content.length; j++) {
                        switch (content.charAt(j)) {
                            case ' ':
                            case '\t':
                                continue;
                            case '\r':
                                // offset one more for \r\n
                                i = j + 1;
                                continue whitespaceCheck;
                            case '\n':
                                i = j;
                                continue whitespaceCheck;
                            default:
                                break escapeCheck;
                        }
                    }
                    return i;
                default:
                    return i;
            }
        }
        // only possible if the content is the empty string
        return -1;
    }
    /**
     * Determines if the given position is contained within the given range.
     *
     * @param position the position to check
     * @param range the range to see if the position is inside of
     */
    static isInsideRange(position, range) {
        if (range.start.line === range.end.line) {
            return range.start.line === position.line
                && range.start.character <= position.character
                && position.character <= range.end.character;
        }
        else if (range.start.line === position.line) {
            return range.start.character <= position.character;
        }
        else if (range.end.line === position.line) {
            return position.character <= range.end.character;
        }
        return range.start.line < position.line && position.line < range.end.line;
    }
}
exports.Util = Util;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/

var pna = __webpack_require__(18);
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = __webpack_require__(11);
util.inherits = __webpack_require__(8);
/*</replacement>*/

var Readable = __webpack_require__(50);
var Writable = __webpack_require__(52);

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  pna.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  pna.nextTick(cb, err);
};

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
exports.KEYWORDS = [
    "ADD",
    "ARG",
    "CMD",
    "COPY",
    "ENTRYPOINT",
    "ENV",
    "EXPOSE",
    "FROM",
    "HEALTHCHECK",
    "LABEL",
    "MAINTAINER",
    "ONBUILD",
    "RUN",
    "SHELL",
    "STOPSIGNAL",
    "USER",
    "VOLUME",
    "WORKDIR"
];
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.isWhitespace = function (char) {
        return char === ' ' || char === '\t' || Util.isNewline(char);
    };
    Util.isNewline = function (char) {
        return char === '\r' || char === '\n';
    };
    /**
     * Determines if the given position is contained within the given range.
     *
     * @param position the position to check
     * @param range the range to see if the position is inside of
     */
    Util.isInsideRange = function (position, range) {
        if (range === null) {
            return false;
        }
        else if (range.start.line === range.end.line) {
            return range.start.line === position.line
                && range.start.character <= position.character
                && position.character <= range.end.character;
        }
        else if (range.start.line === position.line) {
            return range.start.character <= position.character;
        }
        else if (range.end.line === position.line) {
            return position.character <= range.end.character;
        }
        return range.start.line < position.line && position.line < range.end.line;
    };
    Util.rangeEquals = function (range, range2) {
        return Util.positionEquals(range.start, range2.start) && Util.positionEquals(range.end, range2.end);
    };
    Util.positionEquals = function (position, position2) {
        return position.line == position2.line && position.character === position2.character;
    };
    Util.positionBefore = function (origin, other) {
        if (origin.line < other.line) {
            return true;
        }
        else if (origin.line > other.line) {
            return false;
        }
        return origin.character < other.character;
    };
    return Util;
}());
exports.Util = Util;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).Buffer))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Argument {
    constructor(value, range) {
        this.value = value;
        this.range = range;
    }
    toString() {
        return this.value;
    }
    getRange() {
        return this.range;
    }
    getValue() {
        return this.value;
    }
    isAfter(position) {
        if (this.range.end.line < position.line) {
            return false;
        }
        return this.range.start.line > position.line ? true : this.range.start.character > position.character;
    }
    isBefore(position) {
        if (this.range.start.line < position.line) {
            return true;
        }
        return this.range.end.line > position.line ? false : this.range.end.character < position.character;
    }
}
exports.Argument = Argument;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
function boolean(value) {
    return value === true || value === false;
}
exports.boolean = boolean;
function string(value) {
    return typeof value === 'string' || value instanceof String;
}
exports.string = string;
function number(value) {
    return typeof value === 'number' || value instanceof Number;
}
exports.number = number;
function error(value) {
    return value instanceof Error;
}
exports.error = error;
function func(value) {
    return typeof value === 'function';
}
exports.func = func;
function array(value) {
    return Array.isArray(value);
}
exports.array = array;
function stringArray(value) {
    return array(value) && value.every(elem => string(elem));
}
exports.stringArray = stringArray;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
const vscode_languageserver_types_1 = __webpack_require__(0);
const modifiableInstruction_1 = __webpack_require__(16);
class From extends modifiableInstruction_1.ModifiableInstruction {
    constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
        super(document, range, dockerfile, escapeChar, instruction, instructionRange);
    }
    stopSearchingForFlags(argument) {
        return argument.indexOf("--") === -1;
    }
    getImage() {
        return this.getRangeContent(this.getImageRange());
    }
    /**
     * Returns the name of the image that will be used as the base image.
     *
     * @return the base image's name, or null if unspecified
     */
    getImageName() {
        return this.getRangeContent(this.getImageNameRange());
    }
    /**
     * Returns the range that covers the name of the image used by
     * this instruction.
     *
     * @return the range of the name of this instruction's argument,
     *         or null if no image has been specified
     */
    getImageNameRange() {
        let range = this.getImageRange();
        if (range) {
            let registryRange = this.getRegistryRange();
            if (registryRange) {
                range.start = this.document.positionAt(this.document.offsetAt(registryRange.end) + 1);
            }
            let tagRange = this.getImageTagRange();
            let digestRange = this.getImageDigestRange();
            if (tagRange === null) {
                if (digestRange !== null) {
                    range.end = this.document.positionAt(this.document.offsetAt(digestRange.start) - 1);
                }
            }
            else {
                range.end = this.document.positionAt(this.document.offsetAt(tagRange.start) - 1);
            }
            return range;
        }
        return null;
    }
    /**
     * Returns the range that covers the image argument of this
     * instruction. This includes the tag or digest of the image if
     * it has been specified by the instruction.
     *
     * @return the range of the image argument, or null if no image
     *         has been specified
     */
    getImageRange() {
        let args = this.getArguments();
        return args.length !== 0 ? args[0].getRange() : null;
    }
    getImageTag() {
        return this.getRangeContent(this.getImageTagRange());
    }
    /**
     * Returns the range in the document that the tag of the base
     * image encompasses.
     *
     * @return the base image's tag's range in the document, or null
     *         if no tag has been specified
     */
    getImageTagRange() {
        const range = this.getImageRange();
        if (range) {
            if (this.getImageDigestRange() === null) {
                let content = this.getRangeContent(range);
                let index = this.lastIndexOf(this.document.offsetAt(range.start), content, ':');
                // the colon might be for a private registry's port and not a tag
                if (index > content.indexOf('/')) {
                    return vscode_languageserver_types_1.Range.create(range.start.line, range.start.character + index + 1, range.end.line, range.end.character);
                }
            }
        }
        return null;
    }
    getImageDigest() {
        return this.getRangeContent(this.getImageDigestRange());
    }
    /**
     * Returns the range in the document that the digest of the base
     * image encompasses.
     *
     * @return the base image's digest's range in the document, or null
     *         if no digest has been specified
     */
    getImageDigestRange() {
        let range = this.getImageRange();
        if (range) {
            let content = this.getRangeContent(range);
            let index = this.lastIndexOf(this.document.offsetAt(range.start), content, '@');
            if (index !== -1) {
                return vscode_languageserver_types_1.Range.create(range.start.line, range.start.character + index + 1, range.end.line, range.end.character);
            }
        }
        return null;
    }
    indexOf(documentOffset, content, searchString) {
        let index = content.indexOf(searchString);
        const variables = this.getVariables();
        for (let i = 0; i < variables.length; i++) {
            const position = documentOffset + index;
            const variableRange = variables[i].getRange();
            if (this.document.offsetAt(variableRange.start) < position && position < this.document.offsetAt(variableRange.end)) {
                const offset = this.document.offsetAt(variableRange.end) - documentOffset;
                const substring = content.substring(offset);
                const subIndex = substring.indexOf(searchString);
                if (subIndex === -1) {
                    return -1;
                }
                index = subIndex + offset;
                i = -1;
                continue;
            }
        }
        return index;
    }
    lastIndexOf(documentOffset, content, searchString) {
        let index = content.lastIndexOf(searchString);
        const variables = this.getVariables();
        for (let i = 0; i < variables.length; i++) {
            const position = documentOffset + index;
            const variableRange = variables[i].getRange();
            if (this.document.offsetAt(variableRange.start) < position && position < this.document.offsetAt(variableRange.end)) {
                index = content.substring(0, index).lastIndexOf(searchString);
                if (index === -1) {
                    return -1;
                }
                i = -1;
                continue;
            }
        }
        return index;
    }
    getRegistry() {
        return this.getRangeContent(this.getRegistryRange());
    }
    getRegistryRange() {
        const range = this.getImageRange();
        if (range) {
            const tagRange = this.getImageTagRange();
            const digestRange = this.getImageDigestRange();
            if (tagRange === null) {
                if (digestRange !== null) {
                    range.end = this.document.positionAt(this.document.offsetAt(digestRange.start) - 1);
                }
            }
            else {
                range.end = this.document.positionAt(this.document.offsetAt(tagRange.start) - 1);
            }
            const content = this.getRangeContent(range);
            const rangeStart = this.document.offsetAt(range.start);
            const portIndex = this.indexOf(rangeStart, content, ':');
            const dotIndex = this.indexOf(rangeStart, content, '.');
            const startingSlashIndex = this.indexOf(rangeStart, content, '/');
            // hostname detected
            if (portIndex !== -1 || dotIndex !== -1) {
                return vscode_languageserver_types_1.Range.create(range.start, this.document.positionAt(rangeStart + startingSlashIndex));
            }
            const registry = content.substring(0, startingSlashIndex);
            // localhost registry detected
            if (registry === 'localhost') {
                return vscode_languageserver_types_1.Range.create(range.start, this.document.positionAt(rangeStart + startingSlashIndex));
            }
        }
        return null;
    }
    getBuildStage() {
        let range = this.getBuildStageRange();
        return range === null ? null : this.getRangeContent(range);
    }
    getBuildStageRange() {
        let args = this.getArguments();
        if (args.length === 3 && args[1].getValue().toUpperCase() === "AS") {
            return args[2].getRange();
        }
        return null;
    }
    getPlatformFlag() {
        let flags = super.getFlags();
        return flags.length === 1 && flags[0].getName() === "platform" ? flags[0] : null;
    }
}
exports.From = From;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Line {
    constructor(document, range) {
        this.document = document;
        this.range = range;
    }
    getRange() {
        return this.range;
    }
    getTextContent() {
        return this.document.getText().substring(this.document.offsetAt(this.range.start), this.document.offsetAt(this.range.end));
    }
    isAfter(line) {
        return this.range.start.line > line.range.start.line;
    }
    isBefore(line) {
        return this.range.start.line < line;
    }
}
exports.Line = Line;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
const vscode_languageserver_types_1 = __webpack_require__(0);
const flag_1 = __webpack_require__(36);
const instruction_1 = __webpack_require__(3);
class ModifiableInstruction extends instruction_1.Instruction {
    constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
        super(document, range, dockerfile, escapeChar, instruction, instructionRange);
    }
    getFlags() {
        if (!this.flags) {
            this.flags = [];
            for (let arg of this.getArguments()) {
                let value = arg.getValue();
                if (this.stopSearchingForFlags(value)) {
                    return this.flags;
                }
                else if (value.indexOf("--") === 0) {
                    let range = arg.getRange();
                    let rawValue = this.document.getText().substring(this.document.offsetAt(range.start), this.document.offsetAt(range.end));
                    let nameIndex = value.indexOf('=');
                    let index = rawValue.indexOf('=');
                    let firstMatch = false;
                    let secondMatch = false;
                    let startIndex = -1;
                    nameSearchLoop: for (let i = 0; i < rawValue.length; i++) {
                        switch (rawValue.charAt(i)) {
                            case '\\':
                            case ' ':
                            case '\t':
                            case '\r':
                            case '\n':
                                break;
                            case '-':
                                if (secondMatch) {
                                    startIndex = i;
                                    break nameSearchLoop;
                                }
                                else if (firstMatch) {
                                    secondMatch = true;
                                }
                                else {
                                    firstMatch = true;
                                }
                                break;
                            default:
                                startIndex = i;
                                break nameSearchLoop;
                        }
                    }
                    let nameStart = this.document.positionAt(this.document.offsetAt(range.start) + startIndex);
                    if (index === -1) {
                        this.flags.push(new flag_1.Flag(range, value.substring(2), vscode_languageserver_types_1.Range.create(nameStart, range.end), null, null));
                    }
                    else if (index === value.length - 1) {
                        let nameEnd = this.document.positionAt(this.document.offsetAt(range.start) + index);
                        this.flags.push(new flag_1.Flag(range, value.substring(2, index), vscode_languageserver_types_1.Range.create(nameStart, nameEnd), "", vscode_languageserver_types_1.Range.create(range.end, range.end)));
                    }
                    else {
                        let nameEnd = this.document.positionAt(this.document.offsetAt(range.start) + index);
                        this.flags.push(new flag_1.Flag(range, value.substring(2, nameIndex), vscode_languageserver_types_1.Range.create(nameStart, nameEnd), value.substring(nameIndex + 1), vscode_languageserver_types_1.Range.create(this.document.positionAt(this.document.offsetAt(range.start) + index + 1), range.end)));
                    }
                }
            }
        }
        return this.flags;
    }
    getArguments() {
        const args = super.getArguments();
        const flags = this.getFlags();
        if (flags.length === 0) {
            return args;
        }
        for (let i = 0; i < flags.length; i++) {
            args.shift();
        }
        return args;
    }
}
exports.ModifiableInstruction = ModifiableInstruction;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
const vscode_languageserver_types_1 = __webpack_require__(0);
const instruction_1 = __webpack_require__(3);
const property_1 = __webpack_require__(28);
const argument_1 = __webpack_require__(12);
const util_1 = __webpack_require__(7);
class PropertyInstruction extends instruction_1.Instruction {
    constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
        super(document, range, dockerfile, escapeChar, instruction, instructionRange);
        this.properties = undefined;
    }
    getProperties() {
        if (this.properties === undefined) {
            let args = this.getPropertyArguments();
            if (args.length === 0) {
                this.properties = [];
            }
            else if (args.length === 1) {
                this.properties = [new property_1.Property(this.document, this.escapeChar, args[0])];
            }
            else if (args.length === 2) {
                if (args[0].getValue().indexOf('=') === -1) {
                    this.properties = [new property_1.Property(this.document, this.escapeChar, args[0], args[1])];
                }
                else {
                    this.properties = [
                        new property_1.Property(this.document, this.escapeChar, args[0]),
                        new property_1.Property(this.document, this.escapeChar, args[1])
                    ];
                }
            }
            else if (args[0].getValue().indexOf('=') === -1) {
                let text = this.document.getText();
                let start = args[1].getRange().start;
                let end = args[args.length - 1].getRange().end;
                text = text.substring(this.document.offsetAt(start), this.document.offsetAt(end));
                this.properties = [new property_1.Property(this.document, this.escapeChar, args[0], new argument_1.Argument(text, vscode_languageserver_types_1.Range.create(args[1].getRange().start, args[args.length - 1].getRange().end)))];
            }
            else {
                this.properties = [];
                for (let i = 0; i < args.length; i++) {
                    this.properties.push(new property_1.Property(this.document, this.escapeChar, args[i]));
                }
            }
        }
        return this.properties;
    }
    /**
     * Goes from the back of the string and returns the first
     * non-whitespace character that is found. If an escape character
     * is found with newline characters, the escape character will
     * not be considered a non-whitespace character and its index in
     * the string will not be returned.
     *
     * @param content the string to search through
     * @return the index in the string for the first non-whitespace
     *         character when searching from the end of the string
     */
    findTrailingNonWhitespace(content) {
        // loop back to find the first non-whitespace character
        let index = content.length;
        whitespaceCheck: for (let i = content.length - 1; i >= 0; i--) {
            switch (content.charAt(i)) {
                case ' ':
                case '\t':
                    continue;
                case '\n':
                    if (content.charAt(i - 1) === '\r') {
                        i = i - 1;
                    }
                case '\r':
                    newlineCheck: for (let j = i - 1; j >= 0; j--) {
                        switch (content.charAt(j)) {
                            case ' ':
                            case '\t':
                            case '\r':
                            case '\n':
                            case this.escapeChar:
                                continue;
                            default:
                                index = j;
                                break newlineCheck;
                        }
                    }
                    break whitespaceCheck;
                default:
                    index = i;
                    break whitespaceCheck;
            }
        }
        return index;
    }
    getPropertyArguments() {
        const args = [];
        let range = this.getInstructionRange();
        let instructionNameEndOffset = this.document.offsetAt(range.end);
        let extra = instructionNameEndOffset - this.document.offsetAt(range.start);
        let content = this.getTextContent();
        let fullArgs = content.substring(extra);
        let start = util_1.Util.findLeadingNonWhitespace(fullArgs, this.escapeChar);
        if (start === -1) {
            // only whitespace found, no arguments
            return [];
        }
        // records whether the parser has just processed an escaped newline or not
        let escaped = false;
        // flag to track if the last character was an escape character
        let endingEscape = false;
        // position before the first escape character was hit
        let mark = -1;
        let end = this.findTrailingNonWhitespace(fullArgs);
        content = fullArgs.substring(start, end + 1);
        let argStart = 0;
        let spaced = false;
        argumentLoop: for (let i = 0; i < content.length; i++) {
            let char = content.charAt(i);
            switch (char) {
                case this.escapeChar:
                    if (i + 1 === content.length) {
                        endingEscape = true;
                        break argumentLoop;
                    }
                    if (!escaped) {
                        mark = i;
                    }
                    switch (content.charAt(i + 1)) {
                        case ' ':
                        case '\t':
                            if (!util_1.Util.isWhitespace(content.charAt(i + 2))) {
                                // space was escaped, continue as normal
                                i = i + 1;
                                continue argumentLoop;
                            }
                            // whitespace encountered, need to figure out if it extends to EOL
                            whitespaceCheck: for (let j = i + 2; j < content.length; j++) {
                                switch (content.charAt(j)) {
                                    case '\r':
                                        // offset one more for \r\n
                                        j++;
                                    case '\n':
                                        // whitespace only, safe to skip
                                        escaped = true;
                                        i = j;
                                        continue argumentLoop;
                                    case ' ':
                                    case '\t':
                                        // ignore whitespace
                                        break;
                                    default:
                                        // whitespace doesn't extend to EOL, create an argument
                                        args.push(new argument_1.Argument(content.substring(argStart, i), vscode_languageserver_types_1.Range.create(this.document.positionAt(instructionNameEndOffset + start + argStart), this.document.positionAt(instructionNameEndOffset + start + i + 2))));
                                        argStart = j;
                                        break whitespaceCheck;
                                }
                            }
                            // go back and start processing the encountered non-whitespace character
                            i = argStart - 1;
                            continue argumentLoop;
                        case '\r':
                            // offset one more for \r\n
                            i++;
                        case '\n':
                            // immediately followed by a newline, skip the newline
                            escaped = true;
                            i = i + 1;
                            continue argumentLoop;
                        case this.escapeChar:
                            // double escape found, skip it and move on
                            if (argStart === -1) {
                                argStart = i;
                            }
                            i = i + 1;
                            continue argumentLoop;
                        default:
                            if (argStart === -1) {
                                argStart = i;
                            }
                            // non-whitespace encountered, skip the escape and process the
                            // character normally
                            continue argumentLoop;
                    }
                case '\'':
                case '"':
                    if (argStart === -1) {
                        argStart = i;
                    }
                    for (let j = i + 1; j < content.length; j++) {
                        switch (content.charAt(j)) {
                            case char:
                                if (content.charAt(j + 1) !== ' ' && content.charAt(j + 1) !== '') {
                                    // there is more content after this quote,
                                    // continue so that it is all processed as
                                    // one single argument
                                    i = j;
                                    continue argumentLoop;
                                }
                                args.push(new argument_1.Argument(content.substring(argStart, j + 1), vscode_languageserver_types_1.Range.create(this.document.positionAt(instructionNameEndOffset + start + argStart), this.document.positionAt(instructionNameEndOffset + start + j + 1))));
                                i = j;
                                argStart = -1;
                                continue argumentLoop;
                            case this.escapeChar:
                                j++;
                                break;
                        }
                    }
                    break argumentLoop;
                case ' ':
                case '\t':
                    if (escaped) {
                        // consider there to be a space only if an argument
                        // is not spanning multiple lines
                        if (argStart !== -1) {
                            spaced = true;
                        }
                    }
                    else if (argStart !== -1) {
                        args.push(new argument_1.Argument(content.substring(argStart, i), vscode_languageserver_types_1.Range.create(this.document.positionAt(instructionNameEndOffset + start + argStart), this.document.positionAt(instructionNameEndOffset + start + i))));
                        argStart = -1;
                    }
                    break;
                case '\r':
                    // offset one more for \r\n
                    i++;
                case '\n':
                    spaced = false;
                    break;
                case '#':
                    if (escaped) {
                        // a newline was escaped and now there's a comment
                        for (let j = i + 1; j < content.length; j++) {
                            switch (content.charAt(j)) {
                                case '\r':
                                    j++;
                                case '\n':
                                    i = j;
                                    spaced = false;
                                    continue argumentLoop;
                            }
                        }
                        // went to the end without finding a newline,
                        // the comment was the last line in the instruction,
                        // just stop parsing, create an argument if needed
                        if (argStart !== -1) {
                            let value = content.substring(argStart, mark);
                            args.push(new argument_1.Argument(value, vscode_languageserver_types_1.Range.create(this.document.positionAt(instructionNameEndOffset + start + argStart), this.document.positionAt(instructionNameEndOffset + start + mark))));
                            argStart = -1;
                        }
                        break argumentLoop;
                    }
                    else if (argStart === -1) {
                        argStart = i;
                    }
                    break;
                default:
                    if (spaced) {
                        if (argStart !== -1) {
                            args.push(new argument_1.Argument(content.substring(argStart, mark), vscode_languageserver_types_1.Range.create(this.document.positionAt(instructionNameEndOffset + start + argStart), this.document.positionAt(instructionNameEndOffset + start + mark))));
                            argStart = -1;
                        }
                        spaced = false;
                    }
                    escaped = false;
                    if (argStart === -1) {
                        argStart = i;
                    }
                    // variable detected
                    if (char === '$' && content.charAt(i + 1) === '{') {
                        let singleQuotes = false;
                        let doubleQuotes = false;
                        let escaped = false;
                        for (let j = i + 1; j < content.length; j++) {
                            switch (content.charAt(j)) {
                                case this.escapeChar:
                                    escaped = true;
                                    break;
                                case '\r':
                                case '\n':
                                    break;
                                case '\'':
                                    singleQuotes = !singleQuotes;
                                    escaped = false;
                                    break;
                                case '"':
                                    doubleQuotes = !doubleQuotes;
                                    escaped = false;
                                    break;
                                case ' ':
                                case '\t':
                                    if (escaped || singleQuotes || doubleQuotes) {
                                        break;
                                    }
                                    i = j - 1;
                                    continue argumentLoop;
                                case '}':
                                    i = j;
                                    continue argumentLoop;
                                default:
                                    escaped = false;
                                    break;
                            }
                        }
                        break argumentLoop;
                    }
                    break;
            }
        }
        if (argStart !== -1 && argStart !== content.length) {
            let end = endingEscape ? content.length - 1 : content.length;
            let value = content.substring(argStart, end);
            args.push(new argument_1.Argument(value, vscode_languageserver_types_1.Range.create(this.document.positionAt(instructionNameEndOffset + start + argStart), this.document.positionAt(instructionNameEndOffset + start + end))));
        }
        return args;
    }
}
exports.PropertyInstruction = PropertyInstruction;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = { nextTick: nextTick };
} else {
  module.exports = process
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(6)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
var Disposable;
(function (Disposable) {
    function create(func) {
        return {
            dispose: func
        };
    }
    Disposable.create = create;
})(Disposable = exports.Disposable || (exports.Disposable = {}));
var Event;
(function (Event) {
    const _disposable = { dispose() { } };
    Event.None = function () { return _disposable; };
})(Event = exports.Event || (exports.Event = {}));
class CallbackList {
    add(callback, context = null, bucket) {
        if (!this._callbacks) {
            this._callbacks = [];
            this._contexts = [];
        }
        this._callbacks.push(callback);
        this._contexts.push(context);
        if (Array.isArray(bucket)) {
            bucket.push({ dispose: () => this.remove(callback, context) });
        }
    }
    remove(callback, context = null) {
        if (!this._callbacks) {
            return;
        }
        var foundCallbackWithDifferentContext = false;
        for (var i = 0, len = this._callbacks.length; i < len; i++) {
            if (this._callbacks[i] === callback) {
                if (this._contexts[i] === context) {
                    // callback & context match => remove it
                    this._callbacks.splice(i, 1);
                    this._contexts.splice(i, 1);
                    return;
                }
                else {
                    foundCallbackWithDifferentContext = true;
                }
            }
        }
        if (foundCallbackWithDifferentContext) {
            throw new Error('When adding a listener with a context, you should remove it with the same context');
        }
    }
    invoke(...args) {
        if (!this._callbacks) {
            return [];
        }
        var ret = [], callbacks = this._callbacks.slice(0), contexts = this._contexts.slice(0);
        for (var i = 0, len = callbacks.length; i < len; i++) {
            try {
                ret.push(callbacks[i].apply(contexts[i], args));
            }
            catch (e) {
                // eslint-disable-next-line no-console
                console.error(e);
            }
        }
        return ret;
    }
    isEmpty() {
        return !this._callbacks || this._callbacks.length === 0;
    }
    dispose() {
        this._callbacks = undefined;
        this._contexts = undefined;
    }
}
class Emitter {
    constructor(_options) {
        this._options = _options;
    }
    /**
     * For the public to allow to subscribe
     * to events from this Emitter
     */
    get event() {
        if (!this._event) {
            this._event = (listener, thisArgs, disposables) => {
                if (!this._callbacks) {
                    this._callbacks = new CallbackList();
                }
                if (this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty()) {
                    this._options.onFirstListenerAdd(this);
                }
                this._callbacks.add(listener, thisArgs);
                let result;
                result = {
                    dispose: () => {
                        this._callbacks.remove(listener, thisArgs);
                        result.dispose = Emitter._noop;
                        if (this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty()) {
                            this._options.onLastListenerRemove(this);
                        }
                    }
                };
                if (Array.isArray(disposables)) {
                    disposables.push(result);
                }
                return result;
            };
        }
        return this._event;
    }
    /**
     * To be kept private to fire an event to
     * subscribers
     */
    fire(event) {
        if (this._callbacks) {
            this._callbacks.invoke.call(this._callbacks, event);
        }
    }
    dispose() {
        if (this._callbacks) {
            this._callbacks.dispose();
            this._callbacks = undefined;
        }
    }
}
exports.Emitter = Emitter;
Emitter._noop = function () { };


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const property_1 = __webpack_require__(28);
const propertyInstruction_1 = __webpack_require__(17);
class Arg extends propertyInstruction_1.PropertyInstruction {
    constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
        super(document, range, dockerfile, escapeChar, instruction, instructionRange);
        this.property = null;
        const args = this.getPropertyArguments();
        if (args.length === 1) {
            this.property = new property_1.Property(this.document, this.escapeChar, args[0]);
        }
        else {
            this.property = null;
        }
    }
    /**
     * Returns the variable defined by this ARG. This may be null if
     * this ARG instruction is malformed and has no variable
     * declaration.
     */
    getProperty() {
        return this.property;
    }
}
exports.Arg = Arg;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const jsonInstruction_1 = __webpack_require__(4);
class Cmd extends jsonInstruction_1.JSONInstruction {
    constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
        super(document, range, dockerfile, escapeChar, instruction, instructionRange);
    }
}
exports.Cmd = Cmd;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const jsonInstruction_1 = __webpack_require__(4);
class Copy extends jsonInstruction_1.JSONInstruction {
    constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
        super(document, range, dockerfile, escapeChar, instruction, instructionRange);
    }
    stopSearchingForFlags(argument) {
        return argument.indexOf("--") === -1;
    }
    getFromFlag() {
        let flags = super.getFlags();
        return flags.length === 1 && flags[0].getName() === "from" ? flags[0] : null;
    }
}
exports.Copy = Copy;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const jsonInstruction_1 = __webpack_require__(4);
class Entrypoint extends jsonInstruction_1.JSONInstruction {
    constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
        super(document, range, dockerfile, escapeChar, instruction, instructionRange);
    }
}
exports.Entrypoint = Entrypoint;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const propertyInstruction_1 = __webpack_require__(17);
class Env extends propertyInstruction_1.PropertyInstruction {
    constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
        super(document, range, dockerfile, escapeChar, instruction, instructionRange);
    }
    getProperties() {
        return super.getProperties();
    }
}
exports.Env = Env;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const modifiableInstruction_1 = __webpack_require__(16);
class Healthcheck extends modifiableInstruction_1.ModifiableInstruction {
    constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
        super(document, range, dockerfile, escapeChar, instruction, instructionRange);
    }
    stopSearchingForFlags(argument) {
        argument = argument.toUpperCase();
        return argument === "CMD" || argument === "NONE";
    }
    getSubcommand() {
        let args = this.getArguments();
        return args.length !== 0 ? args[0] : null;
    }
}
exports.Healthcheck = Healthcheck;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
const vscode_languageserver_types_1 = __webpack_require__(0);
const parser_1 = __webpack_require__(45);
const instruction_1 = __webpack_require__(3);
class Onbuild extends instruction_1.Instruction {
    constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
        super(document, range, dockerfile, escapeChar, instruction, instructionRange);
    }
    getTrigger() {
        let trigger = this.getTriggerWord();
        return trigger === null ? null : trigger.toUpperCase();
    }
    getTriggerWord() {
        return this.getRangeContent(this.getTriggerRange());
    }
    getTriggerRange() {
        let args = this.getArguments();
        return args.length > 0 ? args[0].getRange() : null;
    }
    getTriggerInstruction() {
        let triggerRange = this.getTriggerRange();
        if (triggerRange === null) {
            return null;
        }
        let args = this.getArguments();
        return parser_1.Parser.createInstruction(this.document, this.dockerfile, this.escapeChar, vscode_languageserver_types_1.Range.create(args[0].getRange().start, this.getRange().end), this.getTriggerWord(), triggerRange);
    }
}
exports.Onbuild = Onbuild;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
const vscode_languageserver_types_1 = __webpack_require__(0);
const util_1 = __webpack_require__(7);
class Property {
    constructor(document, escapeChar, arg, arg2) {
        this.valueRange = null;
        this.value = null;
        this.document = document;
        this.escapeChar = escapeChar;
        this.nameRange = Property.getNameRange(document, arg);
        let value = document.getText().substring(document.offsetAt(this.nameRange.start), document.offsetAt(this.nameRange.end));
        this.name = Property.getValue(value, escapeChar);
        if (arg2) {
            this.valueRange = arg2.getRange();
            value = document.getText().substring(document.offsetAt(this.valueRange.start), document.offsetAt(this.valueRange.end));
            this.value = Property.getValue(value, escapeChar);
            this.range = vscode_languageserver_types_1.Range.create(this.nameRange.start, this.valueRange.end);
        }
        else {
            let argRange = arg.getRange();
            if (this.nameRange.start.line === argRange.start.line
                && this.nameRange.start.character === argRange.start.character
                && this.nameRange.end.line === argRange.end.line
                && this.nameRange.end.character === argRange.end.character) {
            }
            else {
                this.valueRange = Property.getValueRange(document, arg);
                value = document.getText().substring(document.offsetAt(this.valueRange.start), document.offsetAt(this.valueRange.end));
                this.value = Property.getValue(value, escapeChar);
            }
            this.range = argRange;
        }
    }
    getRange() {
        return this.range;
    }
    getName() {
        return this.name;
    }
    getNameRange() {
        return this.nameRange;
    }
    getValue() {
        return this.value;
    }
    getValueRange() {
        return this.valueRange;
    }
    /**
     * Returns the value of this property including any enclosing
     * single or double quotes and relevant escape characters.
     * Escaped newlines and its associated contiguous whitespace
     * characters however will not be returned as they are deemed to
     * be uninteresting to clients trying to return a Dockerfile.
     *
     * @return the unescaped value of this property or null if this
     *         property has no associated value
     */
    getUnescapedValue() {
        if (this.valueRange === null) {
            return null;
        }
        let escaped = false;
        let rawValue = "";
        let value = this.document.getText().substring(this.document.offsetAt(this.valueRange.start), this.document.offsetAt(this.valueRange.end));
        rawLoop: for (let i = 0; i < value.length; i++) {
            let char = value.charAt(i);
            switch (char) {
                case this.escapeChar:
                    for (let j = i + 1; j < value.length; j++) {
                        switch (value.charAt(j)) {
                            case '\r':
                                j++;
                            case '\n':
                                escaped = true;
                                i = j;
                                continue rawLoop;
                            case ' ':
                            case '\t':
                                break;
                            default:
                                rawValue = rawValue + char;
                                continue rawLoop;
                        }
                    }
                    // this happens if there's only whitespace after the escape character
                    rawValue = rawValue + char;
                    break;
                case '\r':
                case '\n':
                    break;
                case ' ':
                case '\t':
                    if (!escaped) {
                        rawValue = rawValue + char;
                    }
                    break;
                case '#':
                    if (escaped) {
                        for (let j = i + 1; j < value.length; j++) {
                            switch (value.charAt(j)) {
                                case '\r':
                                    j++;
                                case '\n':
                                    i = j;
                                    continue rawLoop;
                            }
                        }
                    }
                    else {
                        rawValue = rawValue + char;
                    }
                    break;
                default:
                    rawValue = rawValue + char;
                    escaped = false;
                    break;
            }
        }
        return rawValue;
    }
    static getNameRange(document, arg) {
        let value = arg.getValue();
        let index = value.indexOf('=');
        if (index !== -1) {
            let initial = value.charAt(0);
            let before = value.charAt(index - 1);
            // check if content before the equals sign are in quotes
            // "var"=value
            // 'var'=value
            // otherwise, just assume it's a standard definition
            // var=value
            if ((initial === '"' && before === '"') || (initial === '\'' && before === '\'') || (initial !== '"' && initial !== '\'')) {
                return vscode_languageserver_types_1.Range.create(arg.getRange().start, document.positionAt(document.offsetAt(arg.getRange().start) + index));
            }
        }
        // no '=' found, just defined the property's name
        return arg.getRange();
    }
    static getValueRange(document, arg) {
        return vscode_languageserver_types_1.Range.create(document.positionAt(document.offsetAt(arg.getRange().start) + arg.getValue().indexOf('=') + 1), document.positionAt(document.offsetAt(arg.getRange().end)));
    }
    /**
     * Returns the actual value of this key-value pair. The value will
     * have its escape characters removed if applicable. If the value
     * spans multiple lines and there are comments nested within the
     * lines, they too will be removed.
     *
     * @return the value that this key-value pair will actually be, may
     *         be null if no value is defined, may be the empty string
     *         if the value only consists of whitespace
     */
    static getValue(value, escapeChar) {
        let escaped = false;
        const skip = util_1.Util.findLeadingNonWhitespace(value, escapeChar);
        if (skip !== 0 && value.charAt(skip) === '#') {
            // need to skip over comments
            escaped = true;
        }
        value = value.substring(skip);
        let first = value.charAt(0);
        let last = value.charAt(value.length - 1);
        let literal = first === '\'' || first === '"';
        let inSingle = (first === '\'' && last === '\'');
        let inDouble = false;
        if (first === '"') {
            for (let i = 1; i < value.length; i++) {
                if (value.charAt(i) === escapeChar) {
                    i++;
                }
                else if (value.charAt(i) === '"' && i === value.length - 1) {
                    inDouble = true;
                }
            }
        }
        if (inSingle || inDouble) {
            value = value.substring(1, value.length - 1);
        }
        let commentCheck = -1;
        let escapedValue = "";
        let start = 0;
        parseValue: for (let i = 0; i < value.length; i++) {
            let char = value.charAt(i);
            switch (char) {
                case escapeChar:
                    if (i + 1 === value.length) {
                        escapedValue = escapedValue + escapeChar;
                        break parseValue;
                    }
                    char = value.charAt(i + 1);
                    if (char === ' ' || char === '\t') {
                        whitespaceCheck: for (let j = i + 2; j < value.length; j++) {
                            let char2 = value.charAt(j);
                            switch (char2) {
                                case ' ':
                                case '\t':
                                    break;
                                case '\r':
                                    j++;
                                case '\n':
                                    escaped = true;
                                    i = j;
                                    continue parseValue;
                                default:
                                    if (!inDouble && !inSingle && !literal) {
                                        if (char2 === escapeChar) {
                                            // add the escaped character
                                            escapedValue = escapedValue + char;
                                            // now start parsing from the next escape character
                                            i = i + 1;
                                        }
                                        else {
                                            // the expectation is that this j = i + 2 here
                                            escapedValue = escapedValue + char + char2;
                                            i = j;
                                        }
                                        continue parseValue;
                                    }
                                    break whitespaceCheck;
                            }
                        }
                    }
                    if (inDouble) {
                        if (char === '\r') {
                            escaped = true;
                            i = i + 2;
                        }
                        else if (char === '\n') {
                            escaped = true;
                            i++;
                        }
                        else if (char !== '"') {
                            if (char === escapeChar) {
                                i++;
                            }
                            escapedValue = escapedValue + escapeChar;
                        }
                        continue parseValue;
                    }
                    else if (inSingle || literal) {
                        if (char === '\r') {
                            escaped = true;
                            i = i + 2;
                        }
                        else if (char === '\n') {
                            escaped = true;
                            i++;
                        }
                        else {
                            escapedValue = escapedValue + escapeChar;
                        }
                        continue parseValue;
                    }
                    else if (char === escapeChar) {
                        // double escape, append one and move on
                        escapedValue = escapedValue + escapeChar;
                        i++;
                    }
                    else if (char === '\r') {
                        escaped = true;
                        // offset one more for \r\n
                        i = i + 2;
                    }
                    else if (char === '\n') {
                        escaped = true;
                        i++;
                        start = i;
                    }
                    else {
                        // any other escapes are simply ignored
                        escapedValue = escapedValue + char;
                        i++;
                    }
                    break;
                case ' ':
                case '\t':
                    if (escaped && commentCheck === -1) {
                        commentCheck = i;
                    }
                    escapedValue = escapedValue + char;
                    break;
                case '\r':
                    i++;
                case '\n':
                    if (escaped && commentCheck !== -1) {
                        // rollback and remove the whitespace that was previously appended
                        escapedValue = escapedValue.substring(0, escapedValue.length - (i - commentCheck - 1));
                        commentCheck = -1;
                    }
                    break;
                case '#':
                    // a newline was escaped and now there's a comment
                    if (escaped) {
                        if (commentCheck !== -1) {
                            // rollback and remove the whitespace that was previously appended
                            escapedValue = escapedValue.substring(0, escapedValue.length - (i - commentCheck));
                            commentCheck = -1;
                        }
                        newlineCheck: for (let j = i + 1; j < value.length; j++) {
                            switch (value.charAt(j)) {
                                case '\r':
                                    j++;
                                case '\n':
                                    i = j;
                                    break newlineCheck;
                            }
                        }
                        continue parseValue;
                    }
                default:
                    if (escaped) {
                        escaped = false;
                        commentCheck = -1;
                    }
                    escapedValue = escapedValue + char;
                    break;
            }
        }
        return escapedValue;
    }
}
exports.Property = Property;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_types_1 = __webpack_require__(32);
const dockerFormatter_1 = __webpack_require__(72);
const dockerValidator_1 = __webpack_require__(73);
/**
 * Error codes that correspond to a given validation error. These
 * values are exposed for the purpose of allowing clients to identify
 * what kind of validation error has occurred and to then prompt
 * action that is appropriate for resolving the error to the user.
 *
 * Note that the names and values of these errors are not considered
 * to be API and may change between releases of dockerfiles-util.
 * This is because the Docker builder's errors and error messages are
 * itself not considered to be API. Thus, Dockerfiles that originally
 * would not build and throw an error may stop throwing an error
 * a future release of Docker due to newly added features. This would
 * then mean that an error (code and message) is no longer valid and
 * should thus be removed. Hence, this list of error codes is not
 * stable and as aforementioned may change between releases of
 * dockerfile-utils.
 */
var ValidationCode;
(function (ValidationCode) {
    ValidationCode[ValidationCode["CASING_INSTRUCTION"] = 0] = "CASING_INSTRUCTION";
    ValidationCode[ValidationCode["CASING_DIRECTIVE"] = 1] = "CASING_DIRECTIVE";
    ValidationCode[ValidationCode["ARGUMENT_MISSING"] = 2] = "ARGUMENT_MISSING";
    ValidationCode[ValidationCode["ARGUMENT_EXTRA"] = 3] = "ARGUMENT_EXTRA";
    ValidationCode[ValidationCode["ARGUMENT_REQUIRES_ONE"] = 4] = "ARGUMENT_REQUIRES_ONE";
    ValidationCode[ValidationCode["ARGUMENT_REQUIRES_AT_LEAST_ONE"] = 5] = "ARGUMENT_REQUIRES_AT_LEAST_ONE";
    ValidationCode[ValidationCode["ARGUMENT_REQUIRES_TWO"] = 6] = "ARGUMENT_REQUIRES_TWO";
    ValidationCode[ValidationCode["ARGUMENT_REQUIRES_AT_LEAST_TWO"] = 7] = "ARGUMENT_REQUIRES_AT_LEAST_TWO";
    ValidationCode[ValidationCode["ARGUMENT_REQUIRES_ONE_OR_THREE"] = 8] = "ARGUMENT_REQUIRES_ONE_OR_THREE";
    ValidationCode[ValidationCode["ARGUMENT_UNNECESSARY"] = 9] = "ARGUMENT_UNNECESSARY";
    ValidationCode[ValidationCode["DUPLICATE_BUILD_STAGE_NAME"] = 10] = "DUPLICATE_BUILD_STAGE_NAME";
    ValidationCode[ValidationCode["EMPTY_CONTINUATION_LINE"] = 11] = "EMPTY_CONTINUATION_LINE";
    ValidationCode[ValidationCode["INVALID_BUILD_STAGE_NAME"] = 12] = "INVALID_BUILD_STAGE_NAME";
    ValidationCode[ValidationCode["FLAG_AT_LEAST_ONE"] = 13] = "FLAG_AT_LEAST_ONE";
    ValidationCode[ValidationCode["FLAG_DUPLICATE"] = 14] = "FLAG_DUPLICATE";
    ValidationCode[ValidationCode["FLAG_INVALID_DURATION"] = 15] = "FLAG_INVALID_DURATION";
    ValidationCode[ValidationCode["FLAG_LESS_THAN_1MS"] = 16] = "FLAG_LESS_THAN_1MS";
    ValidationCode[ValidationCode["FLAG_MISSING_DURATION"] = 17] = "FLAG_MISSING_DURATION";
    ValidationCode[ValidationCode["FLAG_MISSING_VALUE"] = 18] = "FLAG_MISSING_VALUE";
    ValidationCode[ValidationCode["FLAG_UNKNOWN_UNIT"] = 19] = "FLAG_UNKNOWN_UNIT";
    ValidationCode[ValidationCode["NO_SOURCE_IMAGE"] = 20] = "NO_SOURCE_IMAGE";
    ValidationCode[ValidationCode["INVALID_ESCAPE_DIRECTIVE"] = 21] = "INVALID_ESCAPE_DIRECTIVE";
    ValidationCode[ValidationCode["INVALID_AS"] = 22] = "INVALID_AS";
    ValidationCode[ValidationCode["INVALID_DESTINATION"] = 23] = "INVALID_DESTINATION";
    ValidationCode[ValidationCode["INVALID_PORT"] = 24] = "INVALID_PORT";
    ValidationCode[ValidationCode["INVALID_PROTO"] = 25] = "INVALID_PROTO";
    /**
     * The error code used if the base image of a FROM instruction
     * has an invalid tag or digest specified.
     */
    ValidationCode[ValidationCode["INVALID_REFERENCE_FORMAT"] = 26] = "INVALID_REFERENCE_FORMAT";
    ValidationCode[ValidationCode["INVALID_SIGNAL"] = 27] = "INVALID_SIGNAL";
    ValidationCode[ValidationCode["INVALID_SYNTAX"] = 28] = "INVALID_SYNTAX";
    ValidationCode[ValidationCode["ONBUILD_CHAINING_DISALLOWED"] = 29] = "ONBUILD_CHAINING_DISALLOWED";
    ValidationCode[ValidationCode["ONBUILD_TRIGGER_DISALLOWED"] = 30] = "ONBUILD_TRIGGER_DISALLOWED";
    ValidationCode[ValidationCode["SHELL_JSON_FORM"] = 31] = "SHELL_JSON_FORM";
    ValidationCode[ValidationCode["SHELL_REQUIRES_ONE"] = 32] = "SHELL_REQUIRES_ONE";
    ValidationCode[ValidationCode["SYNTAX_MISSING_EQUALS"] = 33] = "SYNTAX_MISSING_EQUALS";
    ValidationCode[ValidationCode["SYNTAX_MISSING_NAMES"] = 34] = "SYNTAX_MISSING_NAMES";
    ValidationCode[ValidationCode["SYNTAX_MISSING_SINGLE_QUOTE"] = 35] = "SYNTAX_MISSING_SINGLE_QUOTE";
    ValidationCode[ValidationCode["SYNTAX_MISSING_DOUBLE_QUOTE"] = 36] = "SYNTAX_MISSING_DOUBLE_QUOTE";
    ValidationCode[ValidationCode["MULTIPLE_INSTRUCTIONS"] = 37] = "MULTIPLE_INSTRUCTIONS";
    ValidationCode[ValidationCode["UNKNOWN_INSTRUCTION"] = 38] = "UNKNOWN_INSTRUCTION";
    ValidationCode[ValidationCode["UNKNOWN_ADD_FLAG"] = 39] = "UNKNOWN_ADD_FLAG";
    ValidationCode[ValidationCode["UNKNOWN_COPY_FLAG"] = 40] = "UNKNOWN_COPY_FLAG";
    ValidationCode[ValidationCode["UNKNOWN_FROM_FLAG"] = 41] = "UNKNOWN_FROM_FLAG";
    ValidationCode[ValidationCode["UNKNOWN_HEALTHCHECK_FLAG"] = 42] = "UNKNOWN_HEALTHCHECK_FLAG";
    ValidationCode[ValidationCode["UNKNOWN_TYPE"] = 43] = "UNKNOWN_TYPE";
    ValidationCode[ValidationCode["UNSUPPORTED_MODIFIER"] = 44] = "UNSUPPORTED_MODIFIER";
    ValidationCode[ValidationCode["DEPRECATED_MAINTAINER"] = 45] = "DEPRECATED_MAINTAINER";
    ValidationCode[ValidationCode["HEALTHCHECK_CMD_ARGUMENT_MISSING"] = 46] = "HEALTHCHECK_CMD_ARGUMENT_MISSING";
    ValidationCode[ValidationCode["FLAG_INVALID_FROM_VALUE"] = 47] = "FLAG_INVALID_FROM_VALUE";
    /**
     * The error code used if an instruction has arguments written in
     * JSON form except that it is not actually valid JSON because
     * single quotes are used instead of double quotes.
     */
    ValidationCode[ValidationCode["JSON_IN_SINGLE_QUOTES"] = 48] = "JSON_IN_SINGLE_QUOTES";
    /**
     * The error code used if a WORKDIR instrction does not point to
     * an absolute path.
     */
    ValidationCode[ValidationCode["WORKDIR_IS_NOT_ABSOLUTE"] = 49] = "WORKDIR_IS_NOT_ABSOLUTE";
    /**
     * The error code used if a FROM instruction uses a variable to
     * reference its base image but the variable does not exist.
     */
    ValidationCode[ValidationCode["BASE_NAME_EMPTY"] = 50] = "BASE_NAME_EMPTY";
    /**
     * The error code used if more than one escape parser directive is
     * defined.
     */
    ValidationCode[ValidationCode["DUPLICATED_ESCAPE_DIRECTIVE"] = 51] = "DUPLICATED_ESCAPE_DIRECTIVE";
})(ValidationCode = exports.ValidationCode || (exports.ValidationCode = {}));
/**
 * The severity options that may be defined for the validator.
 */
var ValidationSeverity;
(function (ValidationSeverity) {
    /**
     * The value to set to ignore a problem that has been detected of
     * a certain type.
     */
    ValidationSeverity[ValidationSeverity["IGNORE"] = 0] = "IGNORE";
    /**
     * The value to set to classify a problem that has been detected
     * of a certain type as a warning.
     */
    ValidationSeverity[ValidationSeverity["WARNING"] = 1] = "WARNING";
    /**
     * The value to set to classify a problem that has been detected
     * of a certain type as an error.
     */
    ValidationSeverity[ValidationSeverity["ERROR"] = 2] = "ERROR";
})(ValidationSeverity = exports.ValidationSeverity || (exports.ValidationSeverity = {}));
/**
 * Analyzes the Dockerfile contained within the given string and
 * provides an array of TextEdits back for formatting the document.
 */
function format(content, options) {
    const document = vscode_languageserver_types_1.TextDocument.create("", "", 0, content);
    let formatter = new dockerFormatter_1.DockerFormatter();
    return formatter.formatDocument(document, options);
}
exports.format = format;
/**
 * Validates the Dockerfile that is contained in the given string.
 */
function validate(content, settings) {
    const document = vscode_languageserver_types_1.TextDocument.create("", "", 0, content);
    const validator = new dockerValidator_1.Validator(settings);
    return validator.validate(document);
}
exports.validate = validate;


/***/ }),
/* 30 */
/***/ (function(module, exports) {



/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
* Copyright (c) Remy Suen. All rights reserved.
* Licensed under the MIT License. See License.txt in the project root for license information.
* ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
var PlainTextDocumentation = /** @class */ (function () {
    function PlainTextDocumentation() {
        this.dockerMessages = {
            "hoverAdd": "Copy files, folders, or remote URLs from `source` to the `dest` path in the image's filesystem.\n\n",
            "hoverArg": "Define a variable with an optional default value that users can override at build-time when using `docker build`.\n\nSince Docker 1.9\n\n",
            "hoverCmd": "Provide defaults for an executing container. If an executable is not specified, then ENTRYPOINT must be specified as well. There can only be one CMD instruction in a Dockerfile.\n\n",
            "hoverCopy": "Copy files or folders from `source` to the `dest` path in the image's filesystem.\n\n",
            "hoverEntrypoint": "Configures the container to be run as an executable.\n\n",
            "hoverEnv": "Set the environment variable `key` to the value `value`.\n\n",
            "hoverExpose": "Define the network `port`s that this container will listen on at runtime.\n\n",
            "hoverFrom": "Set the `baseImage` to use for subsequent instructions. FROM must be the first instruction in a Dockerfile.\n\n",
            "hoverHealthcheck": "Define how Docker should test the container to check that it is still working. Alternatively, disable the base image's HEALTHCHECK instruction. There can only be one HEALTHCHECK instruction in a Dockerfile.\n\nSince Docker 1.12\n\n",
            "hoverLabel": "Adds metadata to an image.\n\nSince Docker 1.6\n\n",
            "hoverMaintainer": "Set the Author field of the generated images. This instruction has been deprecated in favor of LABEL.\n\n",
            "hoverOnbuild": "Add a trigger instruction to the image that will be executed when the image is used as a base image for another build.\n\n",
            "hoverRun": "Execute any commands on top of the current image as a new layer and commit the results.\n\n",
            "hoverShell": "Override the default shell used for the shell form of commands.\n\nSince Docker 1.12\n\n",
            "hoverStopsignal": "Set the system call signal to use to send to the container to exit. Signals can be valid unsigned numbers or a signal name in the SIGNAME format such as SIGKILL.\n\nSince Docker 1.9\n\n",
            "hoverUser": "Set the user name or UID to use when running the image in addition to any subsequent CMD, ENTRYPOINT, or RUN instructions that follow it in the Dockerfile.\n\n",
            "hoverVolume": "Create a mount point with the specified name and mark it as holding externally mounted volumes from the native host or from other containers.\n\n",
            "hoverWorkdir": "Set the working directory for any subsequent ADD, COPY, CMD, ENTRYPOINT, or RUN` instructions that follow it in the `Dockerfile`.\n\n",
            "hoverAddFlagChown": "The username, groupname, or UID/GID combination to own the added content.",
            "hoverCopyFlagChown": "The username, groupname, or UID/GID combination to own the copied content.",
            "hoverCopyFlagFrom": "The previous build stage to use as the source location instead of the build's context.\n\nSince Docker 17.05.0-ce.",
            "hoverFromFlagPlatform": "The platform of the image if referencing a multi-platform image.\n\nSince Docker CE 18.04.",
            "hoverHealthcheckFlagInterval": "The seconds to wait for the health check to run after the container has started, and then again the number of seconds to wait before running again after the previous check has completed.",
            "hoverHealthcheckFlagRetries": "The number of consecutive failures of this health check before the container is considered to be `unhealthy`.",
            "hoverHealthcheckFlagStartPeriod": "The number of seconds to wait for the container to startup. Failures during this grace period will not count towards the maximum number of retries. However, should a health check succeed during this period then any subsequent failures will count towards the maximum number of retries.\n\nSince Docker 17.05.0-ce.",
            "hoverHealthcheckFlagTimeout": "The number of seconds to wait for the check to complete before considering it to have failed.",
            "hoverEscape": "Sets the character to use to escape characters and newlines in this Dockerfile. If unspecified, the default escape character is `\\`.\n\n",
            "signatureEscape": "Sets this Dockerfile's escape character. If unspecified, the default escape character is `\\`.",
            "signatureEscape_Param": "The character to use to escape characters and newlines in this Dockerfile.",
            "signatureAdd_Signature0": "Copy new files, directories or remote URLs to the image's filesystem.",
            "signatureAdd_Signature0_Param1": "The resource to copy or unpack if it is a local tar archive in a recognized compression format.",
            "signatureAdd_Signature0_Param3": "The name of the destination file or folder.",
            "signatureArg_Signature0": "Define a variable that users can pass a value to at build-time with `docker build`.",
            "signatureArg_Signature0_Param": "The name of the variable.",
            "signatureArg_Signature1": "Define a variable with an optional default value that users can override at build-time with `docker build`.",
            "signatureArg_Signature1_Param1": "The default value of the variable.",
            "signatureCmd_Signature0": "Set the default executable and parameters for this executing container.",
            "signatureCmd_Signature0_Param0": "The default executable for this executing container.",
            "signatureCmd_Signature0_Param1": "A parameter to the default executable.",
            "signatureCmd_Signature1": "Set the default parameters for this executing container. An ENTRYPOINT instruction must also be specified.",
            "signatureCmd_Signature1_Param0": "A parameter to the entrypoint executable.",
            "signatureCopy_Signature0": "Copy new files and directories to the image's filesystem.",
            "signatureCopy_Signature0_Param0": "Optional flags to configure this instruction.",
            "signatureCopy_Signature0_Param1": "The resource to copy.",
            "signatureCopyFlagFrom": "Set the build stage to use as the source location of this copy instruction instead of the build's context.",
            "signatureCopyFlagFrom_Param": "The build stage or image name to use as the source. Also may be a numeric index.",
            "signatureEntrypoint_Signature0": "Configure this container for running as an executable.",
            "signatureEntrypoint_Signature0_Param1": "The container's main executable.",
            "signatureEntrypoint_Signature0_Param2": "A parameter to the entrypoint executable.",
            "signatureEnv_Signature0": "Set an environment variable to the specified value. The value will be in the environment of any descendent Dockerfiles",
            "signatureEnv_Signature0_Param0": "The name of the environment variable.",
            "signatureEnv_Signature0_Param1": "The value to set the environment variable to.",
            "signatureExpose": "Define network ports for this container to listen on at runtime.",
            "signatureExpose_Param0": "The port that this container should listen on.",
            "signatureFrom_Signature0": "Set the base image to use for any subsequent instructions that follow.",
            "signatureFrom_Signature0_Param": "The name of the base image to use.",
            "signatureFrom_Signature1_Param1": "The tag of the base image to use.",
            "signatureFrom_Signature2_Param1": "The digest of the base image to use.",
            "signatureFrom_Signature3": "Set the base image to use for any subsequent instructions that follow and also give this build stage a name.",
            "signatureFrom_Signature3_Param2": "The name of this build stage.",
            "signatureFrom_Param2": "The name of this build stage.",
            "signatureHealthcheck_Signature0": "Define how Docker should test the container to check that it is still working.",
            "signatureHealthcheck_Signature1_Param2": "The parameters to the CMD instruction for the healthcheck.",
            "signatureHealthcheck_Signature2": "Disable the inherited HEALTHCHECK instruction from the base image.",
            "signatureLabel_Signature0": "Set metadata to an image.",
            "signatureLabel_Signature0_Param0": "The name of the metadata.",
            "signatureLabel_Signature0_Param1": "The value of the metadata.",
            "signatureMaintainer": "Set the \"Author\" field of this image.",
            "signatureMaintainer_Param": "The name of this image's maintainer.",
            "signatureOnbuild": "Register a build instruction as a trigger to be executed when this image is used as a base image for another build.",
            "signatureOnbuild_Param": "The build instruction to register as a trigger instruction.",
            "signatureRun_Signature0": "Execute commands inside a shell.",
            "signatureRun_Signature0_Param0": "The command to run.",
            "signatureRun_Signature0_Param1": "A parameter to the command.",
            "signatureRun_Signature1": "Execute commands without invoking a command shell.",
            "signatureShell": "Override default shell used for the shell form of commands.",
            "signatureShell_Param1": "The shell executable to use.",
            "signatureShell_Param2": "The parameters to the shell executable.",
            "signatureStopsignal": "Set the system call signal to use to send to the container to exit.",
            "signatureStopsignal_Param": "The signal to send to the container to exit. This may be an valid unsigned number or a signal name in the SIGNAME format such as SIGKILL.",
            "signatureUser_Signature0": "Set the user name to use for running any RUN, CMD, and ENTRYPOINT instructions that follow.",
            "signatureUser_Signature0_Param": "The user name to use.",
            "signatureUser_Signature1": "Set the user name and user group to use for running any RUN, CMD, and ENTRYPOINT instructions that follow.",
            "signatureUser_Signature1_Param1": "The group name to use.",
            "signatureUser_Signature2": "Set the UID to use for running any RUN, CMD, and ENTRYPOINT instructions that follow.",
            "signatureUser_Signature2_Param": "The UID to use.",
            "signatureUser_Signature3": "Set the UID and GID to use for running any RUN, CMD, and ENTRYPOINT instructions that follow.",
            "signatureUser_Signature3_Param1": "The GID to use.",
            "signatureVolume_Signature0": "Create mount points for holding externally mounted volumes from the native host or other containers.",
            "signatureVolume_Signature0_Param0": "The name of the mount point.",
            "signatureWorkdir": "Set the working directory for any ADD, COPY, CMD, ENTRYPOINT, or RUN instructions that follow.",
            "signatureWorkdir_Param": "The absolute or relative path to use as the working directory. Will be created if it does not exist.",
            "proposalArgNameOnly": "Define a variable that users can set at build-time when using `docker build`.\n\n",
            "proposalArgDefaultValue": "Define a variable with the given default value that users can override at build-time when using `docker build`.\n\n",
            "proposalHealthcheckExec": "Define how Docker should test the container to check that it is still working. There can only be one HEALTHCHECK instruction in a Dockerfile.\n\nSince Docker 1.12\n\n",
            "proposalHealthcheckNone": "Disable the HEALTHCHECK instruction inherited from the base image if one exists. There can only be one HEALTHCHECK instruction in a Dockerfile.\n\nSince Docker 1.12"
        };
        this.markdowns = {
            ADD: this.dockerMessages["hoverAdd"] +
                "ADD hello.txt /absolute/path\n" +
                "ADD hello.txt relative/to/workdir",
            ADD_FlagChown: this.dockerMessages["hoverAddFlagChown"],
            ARG: this.dockerMessages["hoverArg"] +
                "ARG userName\n" +
                "ARG testOutputDir=test",
            ARG_NameOnly: this.dockerMessages["proposalArgNameOnly"] +
                "ARG userName",
            ARG_DefaultValue: this.dockerMessages["proposalArgDefaultValue"] +
                "ARG testOutputDir=test",
            CMD: this.dockerMessages["hoverCmd"] +
                "CMD [ \"/bin/ls\", \"-l\" ]",
            COPY: this.dockerMessages["hoverCopy"] +
                "COPY hello.txt /absolute/path\n" +
                "COPY hello.txt relative/to/workdir",
            COPY_FlagChown: this.dockerMessages["hoverCopyFlagChown"],
            COPY_FlagFrom: this.dockerMessages["hoverCopyFlagFrom"],
            ENTRYPOINT: this.dockerMessages["hoverEntrypoint"] +
                "ENTRYPOINT [ \"/opt/app/run.sh\", \"--port\", \"8080\" ]",
            ENV: this.dockerMessages["hoverEnv"] +
                "ENV buildTag=1.0",
            EXPOSE: this.dockerMessages["hoverExpose"] +
                "EXPOSE 8080\n" +
                "EXPOSE 80 443 22\n" +
                "EXPOSE 7000-8000",
            FROM: this.dockerMessages["hoverFrom"] +
                "FROM baseImage\n" +
                "FROM baseImage:tag\n" +
                "FROM baseImage@digest",
            FROM_FlagPlatform: this.dockerMessages["hoverFromFlagPlatform"],
            HEALTHCHECK: this.dockerMessages["hoverHealthcheck"] +
                "HEALTHCHECK --interval=10m --timeout=5s \\\n" +
                "    CMD curl -f http://localhost/ || exit 1\n" +
                "HEALTHCHECK NONE",
            HEALTHCHECK_CMD: this.dockerMessages["proposalHealthcheckExec"] +
                "HEALTHCHECK --interval=10m --timeout=5s \\\n" +
                "    CMD curl -f http://localhost/ || exit 1",
            HEALTHCHECK_FlagInterval: this.dockerMessages["hoverHealthcheckFlagInterval"],
            HEALTHCHECK_FlagRetries: this.dockerMessages["hoverHealthcheckFlagRetries"],
            HEALTHCHECK_FlagStartPeriod: this.dockerMessages["hoverHealthcheckFlagStartPeriod"],
            HEALTHCHECK_FlagTimeout: this.dockerMessages["hoverHealthcheckFlagTimeout"],
            HEALTHCHECK_NONE: this.dockerMessages["proposalHealthcheckNone"],
            LABEL: this.dockerMessages["hoverLabel"] +
                "LABEL version=\"1.0\"",
            MAINTAINER: this.dockerMessages["hoverMaintainer"] +
                "MAINTAINER name",
            ONBUILD: this.dockerMessages["hoverOnbuild"] +
                "ONBUILD ADD . /opt/app/src/extensions\n" +
                "ONBUILD RUN /usr/local/bin/build.sh /opt/app",
            RUN: this.dockerMessages["hoverRun"] +
                "RUN apt-get update && apt-get install -y curl",
            SHELL: this.dockerMessages["hoverShell"] +
                "SHELL [ \"powershell\", \"-command\" ]",
            STOPSIGNAL: this.dockerMessages["hoverStopsignal"] +
                "STOPSIGNAL 9",
            USER: this.dockerMessages["hoverUser"] +
                "USER daemon",
            VOLUME: this.dockerMessages["hoverVolume"] +
                "VOLUME [ \"/var/db\" ]",
            WORKDIR: this.dockerMessages["hoverWorkdir"] +
                "WORKDIR /path/to/workdir\n" +
                "WORKDIR relative/path",
            escape: this.dockerMessages["hoverEscape"] +
                "# escape=`",
            signatureEscape: this.dockerMessages["signatureEscape"],
            signatureEscape_Param: this.dockerMessages["signatureEscape_Param"],
            signatureAdd_Signature0: this.dockerMessages["signatureAdd_Signature0"],
            signatureAdd_Signature0_Param0: this.dockerMessages["signatureCopy_Signature0_Param0"],
            signatureAdd_Signature0_Param1: this.dockerMessages["signatureAdd_Signature0_Param1"],
            signatureAdd_Signature0_Param2: this.dockerMessages["signatureAdd_Signature0_Param1"],
            signatureAdd_Signature0_Param3: this.dockerMessages["signatureAdd_Signature0_Param3"],
            signatureAdd_Signature1: this.dockerMessages["signatureAdd_Signature0"],
            signatureAdd_Signature1_Param0: this.dockerMessages["signatureCopy_Signature0_Param0"],
            signatureAdd_Signature1_Param2: this.dockerMessages["signatureAdd_Signature0_Param1"],
            signatureAdd_Signature1_Param3: this.dockerMessages["signatureAdd_Signature0_Param1"],
            signatureAdd_Signature1_Param4: this.dockerMessages["signatureAdd_Signature0_Param3"],
            signatureArg_Signature0: this.dockerMessages["signatureArg_Signature0"],
            signatureArg_Signature0_Param: this.dockerMessages["signatureArg_Signature0_Param"],
            signatureArg_Signature1: this.dockerMessages["signatureArg_Signature1"],
            signatureArg_Signature1_Param0: this.dockerMessages["signatureArg_Signature0_Param"],
            signatureArg_Signature1_Param1: this.dockerMessages["signatureArg_Signature1_Param1"],
            signatureCmd_Signature0: this.dockerMessages["signatureCmd_Signature0"],
            signatureCmd_Signature0_Param1: this.dockerMessages["signatureCmd_Signature0_Param0"],
            signatureCmd_Signature0_Param2: this.dockerMessages["signatureCmd_Signature0_Param1"],
            signatureCmd_Signature0_Param3: this.dockerMessages["signatureCmd_Signature0_Param1"],
            signatureCmd_Signature1: this.dockerMessages["signatureCmd_Signature1"],
            signatureCmd_Signature1_Param1: this.dockerMessages["signatureCmd_Signature1_Param0"],
            signatureCmd_Signature1_Param2: this.dockerMessages["signatureCmd_Signature1_Param0"],
            signatureCmd_Signature1_Param3: this.dockerMessages["signatureCmd_Signature1_Param0"],
            signatureCmd_Signature2: this.dockerMessages["signatureCmd_Signature0"],
            signatureCmd_Signature2_Param0: this.dockerMessages["signatureCmd_Signature0_Param0"],
            signatureCmd_Signature2_Param1: this.dockerMessages["signatureCmd_Signature0_Param1"],
            signatureCmd_Signature2_Param2: this.dockerMessages["signatureCmd_Signature0_Param1"],
            signatureCopy_Signature0: this.dockerMessages["signatureCopy_Signature0"],
            signatureCopy_Signature0_Param0: this.dockerMessages["signatureCopy_Signature0_Param0"],
            signatureCopy_Signature0_Param1: this.dockerMessages["signatureCopy_Signature0_Param1"],
            signatureCopy_Signature0_Param2: this.dockerMessages["signatureCopy_Signature0_Param1"],
            signatureCopy_Signature0_Param3: this.dockerMessages["signatureAdd_Signature0_Param3"],
            signatureCopy_Signature1: this.dockerMessages["signatureCopy_Signature0"],
            signatureCopy_Signature1_Param0: this.dockerMessages["signatureCopy_Signature0_Param0"],
            signatureCopy_Signature1_Param2: this.dockerMessages["signatureCopy_Signature0_Param1"],
            signatureCopy_Signature1_Param3: this.dockerMessages["signatureCopy_Signature0_Param1"],
            signatureCopy_Signature1_Param4: this.dockerMessages["signatureAdd_Signature0_Param3"],
            signatureCopyFlagFrom: this.dockerMessages["signatureCopyFlagFrom"],
            signatureCopyFlagFrom_Param: this.dockerMessages["signatureCopyFlagFrom_Param"],
            signatureEntrypoint_Signature0: this.dockerMessages["signatureEntrypoint_Signature0"],
            signatureEntrypoint_Signature0_Param1: this.dockerMessages["signatureEntrypoint_Signature0_Param1"],
            signatureEntrypoint_Signature0_Param2: this.dockerMessages["signatureEntrypoint_Signature0_Param2"],
            signatureEntrypoint_Signature0_Param3: this.dockerMessages["signatureEntrypoint_Signature0_Param2"],
            signatureEntrypoint_Signature1: this.dockerMessages["signatureEntrypoint_Signature0"],
            signatureEntrypoint_Signature1_Param0: this.dockerMessages["signatureEntrypoint_Signature0_Param1"],
            signatureEntrypoint_Signature1_Param1: this.dockerMessages["signatureEntrypoint_Signature0_Param2"],
            signatureEntrypoint_Signature1_Param2: this.dockerMessages["signatureEntrypoint_Signature0_Param2"],
            signatureEnv_Signature0: this.dockerMessages["signatureEnv_Signature0"],
            signatureEnv_Signature0_Param0: this.dockerMessages["signatureEnv_Signature0_Param0"],
            signatureEnv_Signature0_Param1: this.dockerMessages["signatureEnv_Signature0_Param1"],
            signatureEnv_Signature1: this.dockerMessages["signatureEnv_Signature0"],
            signatureEnv_Signature1_Param0: this.dockerMessages["signatureEnv_Signature0_Param0"],
            signatureEnv_Signature1_Param1: this.dockerMessages["signatureEnv_Signature0_Param1"],
            signatureEnv_Signature2: this.dockerMessages["signatureEnv_Signature0"],
            signatureEnv_Signature2_Param0: this.dockerMessages["signatureEnv_Signature0_Param0"],
            signatureEnv_Signature2_Param1: this.dockerMessages["signatureEnv_Signature0_Param1"],
            signatureEnv_Signature2_Param2: this.dockerMessages["signatureEnv_Signature0_Param0"],
            signatureEnv_Signature2_Param3: this.dockerMessages["signatureEnv_Signature0_Param1"],
            signatureExpose: this.dockerMessages["signatureExpose"],
            signatureExpose_Param0: this.dockerMessages["signatureExpose_Param0"],
            signatureExpose_Param1: this.dockerMessages["signatureExpose_Param0"],
            signatureFrom_Signature0: this.dockerMessages["signatureFrom_Signature0"],
            signatureFrom_Signature0_Param: this.dockerMessages["signatureFrom_Signature0_Param"],
            signatureFrom_Signature1: this.dockerMessages["signatureFrom_Signature0"],
            signatureFrom_Signature1_Param0: this.dockerMessages["signatureFrom_Signature0_Param"],
            signatureFrom_Signature1_Param1: this.dockerMessages["signatureFrom_Signature1_Param1"],
            signatureFrom_Signature2: this.dockerMessages["signatureFrom_Signature0"],
            signatureFrom_Signature2_Param0: this.dockerMessages["signatureFrom_Signature0_Param"],
            signatureFrom_Signature2_Param1: this.dockerMessages["signatureFrom_Signature2_Param1"],
            signatureFrom_Signature3: this.dockerMessages["signatureFrom_Signature3"],
            signatureFrom_Signature3_Param0: this.dockerMessages["signatureFrom_Signature0_Param"],
            signatureFrom_Signature3_Param2: this.dockerMessages["signatureFrom_Signature3_Param2"],
            signatureFrom_Signature4: this.dockerMessages["signatureFrom_Signature3"],
            signatureFrom_Signature4_Param0: this.dockerMessages["signatureFrom_Signature0_Param"],
            signatureFrom_Signature4_Param1: this.dockerMessages["signatureFrom_Signature1_Param1"],
            signatureFrom_Signature4_Param3: this.dockerMessages["signatureFrom_Signature3_Param2"],
            signatureFrom_Signature5: this.dockerMessages["signatureFrom_Signature3"],
            signatureFrom_Signature5_Param0: this.dockerMessages["signatureFrom_Signature0_Param"],
            signatureFrom_Signature5_Param1: this.dockerMessages["signatureFrom_Signature2_Param1"],
            signatureFrom_Signature5_Param3: this.dockerMessages["signatureFrom_Signature3_Param2"],
            signatureHealthcheck: this.dockerMessages["signatureHealthcheck_Signature0"],
            signatureHealthcheck_Signature0: this.dockerMessages["signatureHealthcheck_Signature0"],
            signatureHealthcheck_Signature1: this.dockerMessages["signatureHealthcheck_Signature0"],
            signatureHealthcheck_Signature1_Param0: this.dockerMessages["signatureCopy_Signature0_Param0"],
            signatureHealthcheck_Signature1_Param2: this.dockerMessages["signatureHealthcheck_Signature1_Param2"],
            signatureHealthcheck_Signature2: this.dockerMessages["signatureHealthcheck_Signature0"],
            signatureHealthcheckFlagInterval_Param: this.dockerMessages["hoverHealthcheckFlagInterval"],
            signatureHealthcheckFlagRetries_Param: this.dockerMessages["hoverHealthcheckFlagRetries"],
            signatureHealthcheckFlagStartPeriod_Param: this.dockerMessages["hoverHealthcheckFlagStartPeriod"],
            signatureHealthcheckFlagTimeout_Param: this.dockerMessages["hoverHealthcheckFlagTimeout"],
            signatureLabel_Signature0: this.dockerMessages["signatureLabel_Signature0"],
            signatureLabel_Signature0_Param0: this.dockerMessages["signatureLabel_Signature0_Param0"],
            signatureLabel_Signature0_Param1: this.dockerMessages["signatureLabel_Signature0_Param1"],
            signatureLabel_Signature1: this.dockerMessages["signatureLabel_Signature0"],
            signatureLabel_Signature1_Param0: this.dockerMessages["signatureLabel_Signature0_Param0"],
            signatureLabel_Signature1_Param1: this.dockerMessages["signatureLabel_Signature0_Param1"],
            signatureLabel_Signature2: this.dockerMessages["signatureLabel_Signature0"],
            signatureLabel_Signature2_Param0: this.dockerMessages["signatureLabel_Signature0_Param0"],
            signatureLabel_Signature2_Param1: this.dockerMessages["signatureLabel_Signature0_Param1"],
            signatureLabel_Signature2_Param2: this.dockerMessages["signatureLabel_Signature0_Param0"],
            signatureLabel_Signature2_Param3: this.dockerMessages["signatureLabel_Signature0_Param1"],
            signatureMaintainer: this.dockerMessages["signatureMaintainer"],
            signatureMaintainer_Param: this.dockerMessages["signatureMaintainer_Param"],
            signatureOnbuild: this.dockerMessages["signatureOnbuild"],
            signatureOnbuild_Param: this.dockerMessages["signatureOnbuild_Param"],
            signatureRun_Signature0: this.dockerMessages["signatureRun_Signature0"],
            signatureRun_Signature0_Param0: this.dockerMessages["signatureRun_Signature0_Param0"],
            signatureRun_Signature0_Param1: this.dockerMessages["signatureRun_Signature0_Param1"],
            signatureRun_Signature0_Param2: this.dockerMessages["signatureRun_Signature0_Param1"],
            signatureRun_Signature1: this.dockerMessages["signatureRun_Signature1"],
            signatureRun_Signature1_Param1: this.dockerMessages["signatureRun_Signature0_Param0"],
            signatureRun_Signature1_Param2: this.dockerMessages["signatureRun_Signature0_Param1"],
            signatureRun_Signature1_Param3: this.dockerMessages["signatureRun_Signature0_Param1"],
            signatureShell: this.dockerMessages["signatureShell"],
            signatureShell_Param1: this.dockerMessages["signatureShell_Param1"],
            signatureShell_Param2: this.dockerMessages["signatureShell_Param2"],
            signatureShell_Param3: this.dockerMessages["signatureShell_Param2"],
            signatureStopsignal: this.dockerMessages["signatureStopsignal"],
            signatureStopsignal_Param: this.dockerMessages["signatureStopsignal_Param"],
            signatureUser_Signature0: this.dockerMessages["signatureUser_Signature0"],
            signatureUser_Signature0_Param: this.dockerMessages["signatureUser_Signature0_Param"],
            signatureUser_Signature1: this.dockerMessages["signatureUser_Signature1"],
            signatureUser_Signature1_Param0: this.dockerMessages["signatureUser_Signature0"],
            signatureUser_Signature1_Param1: this.dockerMessages["signatureUser_Signature1_Param1"],
            signatureUser_Signature2: this.dockerMessages["signatureUser_Signature2"],
            signatureUser_Signature2_Param: this.dockerMessages["signatureUser_Signature2_Param"],
            signatureUser_Signature3: this.dockerMessages["signatureUser_Signature3"],
            signatureUser_Signature3_Param0: this.dockerMessages["signatureUser_Signature2_Param"],
            signatureUser_Signature3_Param1: this.dockerMessages["signatureUser_Signature3_Param1"],
            signatureVolume_Signature0: this.dockerMessages["signatureVolume_Signature0"],
            signatureVolume_Signature0_Param0: this.dockerMessages["signatureVolume_Signature0_Param0"],
            signatureVolume_Signature0_Param1: this.dockerMessages["signatureVolume_Signature0_Param0"],
            signatureVolume_Signature1: this.dockerMessages["signatureVolume_Signature0"],
            signatureVolume_Signature1_Param1: this.dockerMessages["signatureVolume_Signature0_Param0"],
            signatureVolume_Signature1_Param2: this.dockerMessages["signatureVolume_Signature0_Param0"],
            signatureWorkdir: this.dockerMessages["signatureWorkdir"],
            signatureWorkdir_Param: this.dockerMessages["signatureWorkdir_Param"]
        };
    }
    PlainTextDocumentation.prototype.getDocumentation = function (data) {
        return this.markdowns[data];
    };
    return PlainTextDocumentation;
}());
exports.PlainTextDocumentation = PlainTextDocumentation;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The Position namespace provides helper functions to work with
 * [Position](#Position) literals.
 */
var Position;
(function (Position) {
    /**
     * Creates a new Position literal from the given line and character.
     * @param line The position's line.
     * @param character The position's character.
     */
    function create(line, character) {
        return { line: line, character: character };
    }
    Position.create = create;
    /**
     * Checks whether the given liternal conforms to the [Position](#Position) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.number(candidate.line) && Is.number(candidate.character);
    }
    Position.is = is;
})(Position = exports.Position || (exports.Position = {}));
/**
 * The Range namespace provides helper functions to work with
 * [Range](#Range) literals.
 */
var Range;
(function (Range) {
    function create(one, two, three, four) {
        if (Is.number(one) && Is.number(two) && Is.number(three) && Is.number(four)) {
            return { start: Position.create(one, two), end: Position.create(three, four) };
        }
        else if (Position.is(one) && Position.is(two)) {
            return { start: one, end: two };
        }
        else {
            throw new Error("Range#create called with invalid arguments[" + one + ", " + two + ", " + three + ", " + four + "]");
        }
    }
    Range.create = create;
    /**
     * Checks whether the given literal conforms to the [Range](#Range) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
    }
    Range.is = is;
})(Range = exports.Range || (exports.Range = {}));
/**
 * The Location namespace provides helper functions to work with
 * [Location](#Location) literals.
 */
var Location;
(function (Location) {
    /**
     * Creates a Location literal.
     * @param uri The location's uri.
     * @param range The location's range.
     */
    function create(uri, range) {
        return { uri: uri, range: range };
    }
    Location.create = create;
    /**
     * Checks whether the given literal conforms to the [Location](#Location) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
    }
    Location.is = is;
})(Location = exports.Location || (exports.Location = {}));
/**
 * The diagnostic's serverity.
 */
var DiagnosticSeverity;
(function (DiagnosticSeverity) {
    /**
     * Reports an error.
     */
    DiagnosticSeverity.Error = 1;
    /**
     * Reports a warning.
     */
    DiagnosticSeverity.Warning = 2;
    /**
     * Reports an information.
     */
    DiagnosticSeverity.Information = 3;
    /**
     * Reports a hint.
     */
    DiagnosticSeverity.Hint = 4;
})(DiagnosticSeverity = exports.DiagnosticSeverity || (exports.DiagnosticSeverity = {}));
/**
 * The Diagnostic namespace provides helper functions to work with
 * [Diagnostic](#Diagnostic) literals.
 */
var Diagnostic;
(function (Diagnostic) {
    /**
     * Creates a new Diagnostic literal.
     */
    function create(range, message, severity, code, source) {
        var result = { range: range, message: message };
        if (Is.defined(severity)) {
            result.severity = severity;
        }
        if (Is.defined(code)) {
            result.code = code;
        }
        if (Is.defined(source)) {
            result.source = source;
        }
        return result;
    }
    Diagnostic.create = create;
    /**
     * Checks whether the given literal conforms to the [Diagnostic](#Diagnostic) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate)
            && Range.is(candidate.range)
            && Is.string(candidate.message)
            && (Is.number(candidate.severity) || Is.undefined(candidate.severity))
            && (Is.number(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code))
            && (Is.string(candidate.source) || Is.undefined(candidate.source));
    }
    Diagnostic.is = is;
})(Diagnostic = exports.Diagnostic || (exports.Diagnostic = {}));
/**
 * The Command namespace provides helper functions to work with
 * [Command](#Command) literals.
 */
var Command;
(function (Command) {
    /**
     * Creates a new Command literal.
     */
    function create(title, command) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var result = { title: title, command: command };
        if (Is.defined(args) && args.length > 0) {
            result.arguments = args;
        }
        return result;
    }
    Command.create = create;
    /**
     * Checks whether the given literal conforms to the [Command](#Command) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.title);
    }
    Command.is = is;
})(Command = exports.Command || (exports.Command = {}));
/**
 * The TextEdit namespace provides helper function to create replace,
 * insert and delete edits more easily.
 */
var TextEdit;
(function (TextEdit) {
    /**
     * Creates a replace text edit.
     * @param range The range of text to be replaced.
     * @param newText The new text.
     */
    function replace(range, newText) {
        return { range: range, newText: newText };
    }
    TextEdit.replace = replace;
    /**
     * Creates a insert text edit.
     * @param position The position to insert the text at.
     * @param newText The text to be inserted.
     */
    function insert(position, newText) {
        return { range: { start: position, end: position }, newText: newText };
    }
    TextEdit.insert = insert;
    /**
     * Creates a delete text edit.
     * @param range The range of text to be deleted.
     */
    function del(range) {
        return { range: range, newText: '' };
    }
    TextEdit.del = del;
})(TextEdit = exports.TextEdit || (exports.TextEdit = {}));
/**
 * The TextDocumentEdit namespace provides helper function to create
 * an edit that manipulates a text document.
 */
var TextDocumentEdit;
(function (TextDocumentEdit) {
    /**
     * Creates a new `TextDocumentEdit`
     */
    function create(textDocument, edits) {
        return { textDocument: textDocument, edits: edits };
    }
    TextDocumentEdit.create = create;
    function is(value) {
        var candidate = value;
        return Is.defined(candidate)
            && VersionedTextDocumentIdentifier.is(candidate.textDocument)
            && Array.isArray(candidate.edits);
    }
    TextDocumentEdit.is = is;
})(TextDocumentEdit = exports.TextDocumentEdit || (exports.TextDocumentEdit = {}));
var TextEditChangeImpl = /** @class */ (function () {
    function TextEditChangeImpl(edits) {
        this.edits = edits;
    }
    TextEditChangeImpl.prototype.insert = function (position, newText) {
        this.edits.push(TextEdit.insert(position, newText));
    };
    TextEditChangeImpl.prototype.replace = function (range, newText) {
        this.edits.push(TextEdit.replace(range, newText));
    };
    TextEditChangeImpl.prototype.delete = function (range) {
        this.edits.push(TextEdit.del(range));
    };
    TextEditChangeImpl.prototype.add = function (edit) {
        this.edits.push(edit);
    };
    TextEditChangeImpl.prototype.all = function () {
        return this.edits;
    };
    TextEditChangeImpl.prototype.clear = function () {
        this.edits.splice(0, this.edits.length);
    };
    return TextEditChangeImpl;
}());
/**
 * A workspace change helps constructing changes to a workspace.
 */
var WorkspaceChange = /** @class */ (function () {
    function WorkspaceChange(workspaceEdit) {
        var _this = this;
        this._textEditChanges = Object.create(null);
        if (workspaceEdit) {
            this._workspaceEdit = workspaceEdit;
            if (workspaceEdit.documentChanges) {
                workspaceEdit.documentChanges.forEach(function (textDocumentEdit) {
                    var textEditChange = new TextEditChangeImpl(textDocumentEdit.edits);
                    _this._textEditChanges[textDocumentEdit.textDocument.uri] = textEditChange;
                });
            }
            else if (workspaceEdit.changes) {
                Object.keys(workspaceEdit.changes).forEach(function (key) {
                    var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
                    _this._textEditChanges[key] = textEditChange;
                });
            }
        }
    }
    Object.defineProperty(WorkspaceChange.prototype, "edit", {
        /**
         * Returns the underlying [WorkspaceEdit](#WorkspaceEdit) literal
         * use to be returned from a workspace edit operation like rename.
         */
        get: function () {
            return this._workspaceEdit;
        },
        enumerable: true,
        configurable: true
    });
    WorkspaceChange.prototype.getTextEditChange = function (key) {
        if (VersionedTextDocumentIdentifier.is(key)) {
            if (!this._workspaceEdit) {
                this._workspaceEdit = {
                    documentChanges: []
                };
            }
            if (!this._workspaceEdit.documentChanges) {
                throw new Error('Workspace edit is not configured for versioned document changes.');
            }
            var textDocument = key;
            var result = this._textEditChanges[textDocument.uri];
            if (!result) {
                var edits = [];
                var textDocumentEdit = {
                    textDocument: textDocument,
                    edits: edits
                };
                this._workspaceEdit.documentChanges.push(textDocumentEdit);
                result = new TextEditChangeImpl(edits);
                this._textEditChanges[textDocument.uri] = result;
            }
            return result;
        }
        else {
            if (!this._workspaceEdit) {
                this._workspaceEdit = {
                    changes: Object.create(null)
                };
            }
            if (!this._workspaceEdit.changes) {
                throw new Error('Workspace edit is not configured for normal text edit changes.');
            }
            var result = this._textEditChanges[key];
            if (!result) {
                var edits = [];
                this._workspaceEdit.changes[key] = edits;
                result = new TextEditChangeImpl(edits);
                this._textEditChanges[key] = result;
            }
            return result;
        }
    };
    return WorkspaceChange;
}());
exports.WorkspaceChange = WorkspaceChange;
/**
 * The TextDocumentIdentifier namespace provides helper functions to work with
 * [TextDocumentIdentifier](#TextDocumentIdentifier) literals.
 */
var TextDocumentIdentifier;
(function (TextDocumentIdentifier) {
    /**
     * Creates a new TextDocumentIdentifier literal.
     * @param uri The document's uri.
     */
    function create(uri) {
        return { uri: uri };
    }
    TextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [TextDocumentIdentifier](#TextDocumentIdentifier) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri);
    }
    TextDocumentIdentifier.is = is;
})(TextDocumentIdentifier = exports.TextDocumentIdentifier || (exports.TextDocumentIdentifier = {}));
/**
 * The VersionedTextDocumentIdentifier namespace provides helper functions to work with
 * [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) literals.
 */
var VersionedTextDocumentIdentifier;
(function (VersionedTextDocumentIdentifier) {
    /**
     * Creates a new VersionedTextDocumentIdentifier literal.
     * @param uri The document's uri.
     * @param uri The document's text.
     */
    function create(uri, version) {
        return { uri: uri, version: version };
    }
    VersionedTextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.number(candidate.version);
    }
    VersionedTextDocumentIdentifier.is = is;
})(VersionedTextDocumentIdentifier = exports.VersionedTextDocumentIdentifier || (exports.VersionedTextDocumentIdentifier = {}));
/**
 * The TextDocumentItem namespace provides helper functions to work with
 * [TextDocumentItem](#TextDocumentItem) literals.
 */
var TextDocumentItem;
(function (TextDocumentItem) {
    /**
     * Creates a new TextDocumentItem literal.
     * @param uri The document's uri.
     * @param languageId The document's language identifier.
     * @param version The document's version number.
     * @param text The document's text.
     */
    function create(uri, languageId, version, text) {
        return { uri: uri, languageId: languageId, version: version, text: text };
    }
    TextDocumentItem.create = create;
    /**
     * Checks whether the given literal conforms to the [TextDocumentItem](#TextDocumentItem) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.number(candidate.version) && Is.string(candidate.text);
    }
    TextDocumentItem.is = is;
})(TextDocumentItem = exports.TextDocumentItem || (exports.TextDocumentItem = {}));
/**
 * Describes the content type that a client supports in various
 * result literals like `Hover`, `ParameterInfo` or `CompletionItem`.
 *
 * Please note that `MarkupKinds` must not start with a `$`. This kinds
 * are reserved for internal usage.
 */
var MarkupKind;
(function (MarkupKind) {
    /**
     * Plain text is supported as a content format
     */
    MarkupKind.PlainText = 'plaintext';
    /**
     * Markdown is supported as a content format
     */
    MarkupKind.Markdown = 'markdown';
})(MarkupKind = exports.MarkupKind || (exports.MarkupKind = {}));
/**
 * The kind of a completion entry.
 */
var CompletionItemKind;
(function (CompletionItemKind) {
    CompletionItemKind.Text = 1;
    CompletionItemKind.Method = 2;
    CompletionItemKind.Function = 3;
    CompletionItemKind.Constructor = 4;
    CompletionItemKind.Field = 5;
    CompletionItemKind.Variable = 6;
    CompletionItemKind.Class = 7;
    CompletionItemKind.Interface = 8;
    CompletionItemKind.Module = 9;
    CompletionItemKind.Property = 10;
    CompletionItemKind.Unit = 11;
    CompletionItemKind.Value = 12;
    CompletionItemKind.Enum = 13;
    CompletionItemKind.Keyword = 14;
    CompletionItemKind.Snippet = 15;
    CompletionItemKind.Color = 16;
    CompletionItemKind.File = 17;
    CompletionItemKind.Reference = 18;
    CompletionItemKind.Folder = 19;
    CompletionItemKind.EnumMember = 20;
    CompletionItemKind.Constant = 21;
    CompletionItemKind.Struct = 22;
    CompletionItemKind.Event = 23;
    CompletionItemKind.Operator = 24;
    CompletionItemKind.TypeParameter = 25;
})(CompletionItemKind = exports.CompletionItemKind || (exports.CompletionItemKind = {}));
/**
 * Defines whether the insert text in a completion item should be interpreted as
 * plain text or a snippet.
 */
var InsertTextFormat;
(function (InsertTextFormat) {
    /**
     * The primary text to be inserted is treated as a plain string.
     */
    InsertTextFormat.PlainText = 1;
    /**
     * The primary text to be inserted is treated as a snippet.
     *
     * A snippet can define tab stops and placeholders with `$1`, `$2`
     * and `${3:foo}`. `$0` defines the final tab stop, it defaults to
     * the end of the snippet. Placeholders with equal identifiers are linked,
     * that is typing in one will update others too.
     *
     * See also: https://github.com/Microsoft/vscode/blob/master/src/vs/editor/contrib/snippet/common/snippet.md
     */
    InsertTextFormat.Snippet = 2;
})(InsertTextFormat = exports.InsertTextFormat || (exports.InsertTextFormat = {}));
/**
 * The CompletionItem namespace provides functions to deal with
 * completion items.
 */
var CompletionItem;
(function (CompletionItem) {
    /**
     * Create a completion item and seed it with a label.
     * @param label The completion item's label
     */
    function create(label) {
        return { label: label };
    }
    CompletionItem.create = create;
})(CompletionItem = exports.CompletionItem || (exports.CompletionItem = {}));
/**
 * The CompletionList namespace provides functions to deal with
 * completion lists.
 */
var CompletionList;
(function (CompletionList) {
    /**
     * Creates a new completion list.
     *
     * @param items The completion items.
     * @param isIncomplete The list is not complete.
     */
    function create(items, isIncomplete) {
        return { items: items ? items : [], isIncomplete: !!isIncomplete };
    }
    CompletionList.create = create;
})(CompletionList = exports.CompletionList || (exports.CompletionList = {}));
var MarkedString;
(function (MarkedString) {
    /**
     * Creates a marked string from plain text.
     *
     * @param plainText The plain text.
     */
    function fromPlainText(plainText) {
        return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&"); // escape markdown syntax tokens: http://daringfireball.net/projects/markdown/syntax#backslash
    }
    MarkedString.fromPlainText = fromPlainText;
})(MarkedString = exports.MarkedString || (exports.MarkedString = {}));
/**
 * The ParameterInformation namespace provides helper functions to work with
 * [ParameterInformation](#ParameterInformation) literals.
 */
var ParameterInformation;
(function (ParameterInformation) {
    /**
     * Creates a new parameter information literal.
     *
     * @param label A label string.
     * @param documentation A doc string.
     */
    function create(label, documentation) {
        return documentation ? { label: label, documentation: documentation } : { label: label };
    }
    ParameterInformation.create = create;
    ;
})(ParameterInformation = exports.ParameterInformation || (exports.ParameterInformation = {}));
/**
 * The SignatureInformation namespace provides helper functions to work with
 * [SignatureInformation](#SignatureInformation) literals.
 */
var SignatureInformation;
(function (SignatureInformation) {
    function create(label, documentation) {
        var parameters = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            parameters[_i - 2] = arguments[_i];
        }
        var result = { label: label };
        if (Is.defined(documentation)) {
            result.documentation = documentation;
        }
        if (Is.defined(parameters)) {
            result.parameters = parameters;
        }
        else {
            result.parameters = [];
        }
        return result;
    }
    SignatureInformation.create = create;
})(SignatureInformation = exports.SignatureInformation || (exports.SignatureInformation = {}));
/**
 * A document highlight kind.
 */
var DocumentHighlightKind;
(function (DocumentHighlightKind) {
    /**
     * A textual occurrance.
     */
    DocumentHighlightKind.Text = 1;
    /**
     * Read-access of a symbol, like reading a variable.
     */
    DocumentHighlightKind.Read = 2;
    /**
     * Write-access of a symbol, like writing to a variable.
     */
    DocumentHighlightKind.Write = 3;
})(DocumentHighlightKind = exports.DocumentHighlightKind || (exports.DocumentHighlightKind = {}));
/**
 * DocumentHighlight namespace to provide helper functions to work with
 * [DocumentHighlight](#DocumentHighlight) literals.
 */
var DocumentHighlight;
(function (DocumentHighlight) {
    /**
     * Create a DocumentHighlight object.
     * @param range The range the highlight applies to.
     */
    function create(range, kind) {
        var result = { range: range };
        if (Is.number(kind)) {
            result.kind = kind;
        }
        return result;
    }
    DocumentHighlight.create = create;
})(DocumentHighlight = exports.DocumentHighlight || (exports.DocumentHighlight = {}));
/**
 * A symbol kind.
 */
var SymbolKind;
(function (SymbolKind) {
    SymbolKind.File = 1;
    SymbolKind.Module = 2;
    SymbolKind.Namespace = 3;
    SymbolKind.Package = 4;
    SymbolKind.Class = 5;
    SymbolKind.Method = 6;
    SymbolKind.Property = 7;
    SymbolKind.Field = 8;
    SymbolKind.Constructor = 9;
    SymbolKind.Enum = 10;
    SymbolKind.Interface = 11;
    SymbolKind.Function = 12;
    SymbolKind.Variable = 13;
    SymbolKind.Constant = 14;
    SymbolKind.String = 15;
    SymbolKind.Number = 16;
    SymbolKind.Boolean = 17;
    SymbolKind.Array = 18;
    SymbolKind.Object = 19;
    SymbolKind.Key = 20;
    SymbolKind.Null = 21;
    SymbolKind.EnumMember = 22;
    SymbolKind.Struct = 23;
    SymbolKind.Event = 24;
    SymbolKind.Operator = 25;
    SymbolKind.TypeParameter = 26;
})(SymbolKind = exports.SymbolKind || (exports.SymbolKind = {}));
var SymbolInformation;
(function (SymbolInformation) {
    /**
     * Creates a new symbol information literal.
     *
     * @param name The name of the symbol.
     * @param kind The kind of the symbol.
     * @param range The range of the location of the symbol.
     * @param uri The resource of the location of symbol, defaults to the current document.
     * @param containerName The name of the symbol containg the symbol.
     */
    function create(name, kind, range, uri, containerName) {
        var result = {
            name: name,
            kind: kind,
            location: { uri: uri, range: range }
        };
        if (containerName) {
            result.containerName = containerName;
        }
        return result;
    }
    SymbolInformation.create = create;
})(SymbolInformation = exports.SymbolInformation || (exports.SymbolInformation = {}));
/**
 * The CodeActionContext namespace provides helper functions to work with
 * [CodeActionContext](#CodeActionContext) literals.
 */
var CodeActionContext;
(function (CodeActionContext) {
    /**
     * Creates a new CodeActionContext literal.
     */
    function create(diagnostics) {
        return { diagnostics: diagnostics };
    }
    CodeActionContext.create = create;
    /**
     * Checks whether the given literal conforms to the [CodeActionContext](#CodeActionContext) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is);
    }
    CodeActionContext.is = is;
})(CodeActionContext = exports.CodeActionContext || (exports.CodeActionContext = {}));
/**
 * The CodeLens namespace provides helper functions to work with
 * [CodeLens](#CodeLens) literals.
 */
var CodeLens;
(function (CodeLens) {
    /**
     * Creates a new CodeLens literal.
     */
    function create(range, data) {
        var result = { range: range };
        if (Is.defined(data))
            result.data = data;
        return result;
    }
    CodeLens.create = create;
    /**
     * Checks whether the given literal conforms to the [CodeLens](#CodeLens) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
    }
    CodeLens.is = is;
})(CodeLens = exports.CodeLens || (exports.CodeLens = {}));
/**
 * The FormattingOptions namespace provides helper functions to work with
 * [FormattingOptions](#FormattingOptions) literals.
 */
var FormattingOptions;
(function (FormattingOptions) {
    /**
     * Creates a new FormattingOptions literal.
     */
    function create(tabSize, insertSpaces) {
        return { tabSize: tabSize, insertSpaces: insertSpaces };
    }
    FormattingOptions.create = create;
    /**
     * Checks whether the given literal conforms to the [FormattingOptions](#FormattingOptions) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.number(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
    }
    FormattingOptions.is = is;
})(FormattingOptions = exports.FormattingOptions || (exports.FormattingOptions = {}));
/**
 * A document link is a range in a text document that links to an internal or external resource, like another
 * text document or a web site.
 */
var DocumentLink = /** @class */ (function () {
    function DocumentLink() {
    }
    return DocumentLink;
}());
exports.DocumentLink = DocumentLink;
/**
 * The DocumentLink namespace provides helper functions to work with
 * [DocumentLink](#DocumentLink) literals.
 */
(function (DocumentLink) {
    /**
     * Creates a new DocumentLink literal.
     */
    function create(range, target) {
        return { range: range, target: target };
    }
    DocumentLink.create = create;
    /**
     * Checks whether the given literal conforms to the [DocumentLink](#DocumentLink) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
    }
    DocumentLink.is = is;
})(DocumentLink = exports.DocumentLink || (exports.DocumentLink = {}));
exports.DocumentLink = DocumentLink;
exports.EOL = ['\n', '\r\n', '\r'];
var TextDocument;
(function (TextDocument) {
    /**
     * Creates a new ITextDocument literal from the given uri and content.
     * @param uri The document's uri.
     * @param languageId  The document's language Id.
     * @param content The document's content.
     */
    function create(uri, languageId, version, content) {
        return new FullTextDocument(uri, languageId, version, content);
    }
    TextDocument.create = create;
    /**
     * Checks whether the given literal conforms to the [ITextDocument](#ITextDocument) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.number(candidate.lineCount)
            && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
    }
    TextDocument.is = is;
})(TextDocument = exports.TextDocument || (exports.TextDocument = {}));
/**
 * Represents reasons why a text document is saved.
 */
var TextDocumentSaveReason;
(function (TextDocumentSaveReason) {
    /**
     * Manually triggered, e.g. by the user pressing save, by starting debugging,
     * or by an API call.
     */
    TextDocumentSaveReason.Manual = 1;
    /**
     * Automatic after a delay.
     */
    TextDocumentSaveReason.AfterDelay = 2;
    /**
     * When the editor lost focus.
     */
    TextDocumentSaveReason.FocusOut = 3;
})(TextDocumentSaveReason = exports.TextDocumentSaveReason || (exports.TextDocumentSaveReason = {}));
var FullTextDocument = /** @class */ (function () {
    function FullTextDocument(uri, languageId, version, content) {
        this._uri = uri;
        this._languageId = languageId;
        this._version = version;
        this._content = content;
        this._lineOffsets = null;
    }
    Object.defineProperty(FullTextDocument.prototype, "uri", {
        get: function () {
            return this._uri;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "languageId", {
        get: function () {
            return this._languageId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "version", {
        get: function () {
            return this._version;
        },
        enumerable: true,
        configurable: true
    });
    FullTextDocument.prototype.getText = function (range) {
        if (range) {
            var start = this.offsetAt(range.start);
            var end = this.offsetAt(range.end);
            return this._content.substring(start, end);
        }
        return this._content;
    };
    FullTextDocument.prototype.update = function (event, version) {
        this._content = event.text;
        this._version = version;
        this._lineOffsets = null;
    };
    FullTextDocument.prototype.getLineOffsets = function () {
        if (this._lineOffsets === null) {
            var lineOffsets = [];
            var text = this._content;
            var isLineStart = true;
            for (var i = 0; i < text.length; i++) {
                if (isLineStart) {
                    lineOffsets.push(i);
                    isLineStart = false;
                }
                var ch = text.charAt(i);
                isLineStart = (ch === '\r' || ch === '\n');
                if (ch === '\r' && i + 1 < text.length && text.charAt(i + 1) === '\n') {
                    i++;
                }
            }
            if (isLineStart && text.length > 0) {
                lineOffsets.push(text.length);
            }
            this._lineOffsets = lineOffsets;
        }
        return this._lineOffsets;
    };
    FullTextDocument.prototype.positionAt = function (offset) {
        offset = Math.max(Math.min(offset, this._content.length), 0);
        var lineOffsets = this.getLineOffsets();
        var low = 0, high = lineOffsets.length;
        if (high === 0) {
            return Position.create(0, offset);
        }
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (lineOffsets[mid] > offset) {
                high = mid;
            }
            else {
                low = mid + 1;
            }
        }
        // low is the least x for which the line offset is larger than the current offset
        // or array.length if no line offset is larger than the current offset
        var line = low - 1;
        return Position.create(line, offset - lineOffsets[line]);
    };
    FullTextDocument.prototype.offsetAt = function (position) {
        var lineOffsets = this.getLineOffsets();
        if (position.line >= lineOffsets.length) {
            return this._content.length;
        }
        else if (position.line < 0) {
            return 0;
        }
        var lineOffset = lineOffsets[position.line];
        var nextLineOffset = (position.line + 1 < lineOffsets.length) ? lineOffsets[position.line + 1] : this._content.length;
        return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
    };
    Object.defineProperty(FullTextDocument.prototype, "lineCount", {
        get: function () {
            return this.getLineOffsets().length;
        },
        enumerable: true,
        configurable: true
    });
    return FullTextDocument;
}());
var Is;
(function (Is) {
    var toString = Object.prototype.toString;
    function defined(value) {
        return typeof value !== 'undefined';
    }
    Is.defined = defined;
    function undefined(value) {
        return typeof value === 'undefined';
    }
    Is.undefined = undefined;
    function boolean(value) {
        return value === true || value === false;
    }
    Is.boolean = boolean;
    function string(value) {
        return toString.call(value) === '[object String]';
    }
    Is.string = string;
    function number(value) {
        return toString.call(value) === '[object Number]';
    }
    Is.number = number;
    function func(value) {
        return toString.call(value) === '[object Function]';
    }
    Is.func = func;
    function typedArray(value, check) {
        return Array.isArray(value) && value.every(check);
    }
    Is.typedArray = typedArray;
})(Is || (Is = {}));


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__(20);
const Is = __webpack_require__(13);
let DefaultSize = 8192;
let CR = Buffer.from('\r', 'ascii')[0];
let LF = Buffer.from('\n', 'ascii')[0];
let CRLF = '\r\n';
class MessageBuffer {
    constructor(encoding = 'utf8') {
        this.encoding = encoding;
        this.index = 0;
        this.buffer = Buffer.allocUnsafe(DefaultSize);
    }
    append(chunk) {
        var toAppend = chunk;
        if (typeof (chunk) === 'string') {
            var str = chunk;
            var bufferLen = Buffer.byteLength(str, this.encoding);
            toAppend = Buffer.allocUnsafe(bufferLen);
            toAppend.write(str, 0, bufferLen, this.encoding);
        }
        if (this.buffer.length - this.index >= toAppend.length) {
            toAppend.copy(this.buffer, this.index, 0, toAppend.length);
        }
        else {
            var newSize = (Math.ceil((this.index + toAppend.length) / DefaultSize) + 1) * DefaultSize;
            if (this.index === 0) {
                this.buffer = Buffer.allocUnsafe(newSize);
                toAppend.copy(this.buffer, 0, 0, toAppend.length);
            }
            else {
                this.buffer = Buffer.concat([this.buffer.slice(0, this.index), toAppend], newSize);
            }
        }
        this.index += toAppend.length;
    }
    tryReadHeaders() {
        let result = undefined;
        let current = 0;
        while (current + 3 < this.index && (this.buffer[current] !== CR || this.buffer[current + 1] !== LF || this.buffer[current + 2] !== CR || this.buffer[current + 3] !== LF)) {
            current++;
        }
        // No header / body separator found (e.g CRLFCRLF)
        if (current + 3 >= this.index) {
            return result;
        }
        result = Object.create(null);
        let headers = this.buffer.toString('ascii', 0, current).split(CRLF);
        headers.forEach((header) => {
            let index = header.indexOf(':');
            if (index === -1) {
                throw new Error('Message header must separate key and value using :');
            }
            let key = header.substr(0, index);
            let value = header.substr(index + 1).trim();
            result[key] = value;
        });
        let nextStart = current + 4;
        this.buffer = this.buffer.slice(nextStart);
        this.index = this.index - nextStart;
        return result;
    }
    tryReadContent(length) {
        if (this.index < length) {
            return null;
        }
        let result = this.buffer.toString(this.encoding, 0, length);
        let nextStart = length;
        this.buffer.copy(this.buffer, 0, nextStart);
        this.index = this.index - nextStart;
        return result;
    }
    get numberOfBytes() {
        return this.index;
    }
}
var MessageReader;
(function (MessageReader) {
    function is(value) {
        let candidate = value;
        return candidate && Is.func(candidate.listen) && Is.func(candidate.dispose) &&
            Is.func(candidate.onError) && Is.func(candidate.onClose) && Is.func(candidate.onPartialMessage);
    }
    MessageReader.is = is;
})(MessageReader = exports.MessageReader || (exports.MessageReader = {}));
class AbstractMessageReader {
    constructor() {
        this.errorEmitter = new events_1.Emitter();
        this.closeEmitter = new events_1.Emitter();
        this.partialMessageEmitter = new events_1.Emitter();
    }
    dispose() {
        this.errorEmitter.dispose();
        this.closeEmitter.dispose();
    }
    get onError() {
        return this.errorEmitter.event;
    }
    fireError(error) {
        this.errorEmitter.fire(this.asError(error));
    }
    get onClose() {
        return this.closeEmitter.event;
    }
    fireClose() {
        this.closeEmitter.fire(undefined);
    }
    get onPartialMessage() {
        return this.partialMessageEmitter.event;
    }
    firePartialMessage(info) {
        this.partialMessageEmitter.fire(info);
    }
    asError(error) {
        if (error instanceof Error) {
            return error;
        }
        else {
            return new Error(`Reader received error. Reason: ${Is.string(error.message) ? error.message : 'unknown'}`);
        }
    }
}
exports.AbstractMessageReader = AbstractMessageReader;
class StreamMessageReader extends AbstractMessageReader {
    constructor(readable, encoding = 'utf8') {
        super();
        this.readable = readable;
        this.buffer = new MessageBuffer(encoding);
        this._partialMessageTimeout = 10000;
    }
    set partialMessageTimeout(timeout) {
        this._partialMessageTimeout = timeout;
    }
    get partialMessageTimeout() {
        return this._partialMessageTimeout;
    }
    listen(callback) {
        this.nextMessageLength = -1;
        this.messageToken = 0;
        this.partialMessageTimer = undefined;
        this.callback = callback;
        this.readable.on('data', (data) => {
            this.onData(data);
        });
        this.readable.on('error', (error) => this.fireError(error));
        this.readable.on('close', () => this.fireClose());
    }
    onData(data) {
        this.buffer.append(data);
        while (true) {
            if (this.nextMessageLength === -1) {
                let headers = this.buffer.tryReadHeaders();
                if (!headers) {
                    return;
                }
                let contentLength = headers['Content-Length'];
                if (!contentLength) {
                    throw new Error('Header must provide a Content-Length property.');
                }
                let length = parseInt(contentLength);
                if (isNaN(length)) {
                    throw new Error('Content-Length value must be a number.');
                }
                this.nextMessageLength = length;
                // Take the encoding form the header. For compatibility
                // treat both utf-8 and utf8 as node utf8
            }
            var msg = this.buffer.tryReadContent(this.nextMessageLength);
            if (msg === null) {
                /** We haven't received the full message yet. */
                this.setPartialMessageTimer();
                return;
            }
            this.clearPartialMessageTimer();
            this.nextMessageLength = -1;
            this.messageToken++;
            var json = JSON.parse(msg);
            this.callback(json);
        }
    }
    clearPartialMessageTimer() {
        if (this.partialMessageTimer) {
            clearTimeout(this.partialMessageTimer);
            this.partialMessageTimer = undefined;
        }
    }
    setPartialMessageTimer() {
        this.clearPartialMessageTimer();
        if (this._partialMessageTimeout <= 0) {
            return;
        }
        this.partialMessageTimer = setTimeout((token, timeout) => {
            this.partialMessageTimer = undefined;
            if (token === this.messageToken) {
                this.firePartialMessage({ messageToken: token, waitingTime: timeout });
                this.setPartialMessageTimer();
            }
        }, this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout);
    }
}
exports.StreamMessageReader = StreamMessageReader;
class IPCMessageReader extends AbstractMessageReader {
    constructor(process) {
        super();
        this.process = process;
        let eventEmitter = this.process;
        eventEmitter.on('error', (error) => this.fireError(error));
        eventEmitter.on('close', () => this.fireClose());
    }
    listen(callback) {
        this.process.on('message', callback);
    }
}
exports.IPCMessageReader = IPCMessageReader;
class SocketMessageReader extends StreamMessageReader {
    constructor(socket, encoding = 'utf-8') {
        super(socket, encoding);
    }
}
exports.SocketMessageReader = SocketMessageReader;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).Buffer))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__(20);
const Is = __webpack_require__(13);
let ContentLength = 'Content-Length: ';
let CRLF = '\r\n';
var MessageWriter;
(function (MessageWriter) {
    function is(value) {
        let candidate = value;
        return candidate && Is.func(candidate.dispose) && Is.func(candidate.onClose) &&
            Is.func(candidate.onError) && Is.func(candidate.write);
    }
    MessageWriter.is = is;
})(MessageWriter = exports.MessageWriter || (exports.MessageWriter = {}));
class AbstractMessageWriter {
    constructor() {
        this.errorEmitter = new events_1.Emitter();
        this.closeEmitter = new events_1.Emitter();
    }
    dispose() {
        this.errorEmitter.dispose();
        this.closeEmitter.dispose();
    }
    get onError() {
        return this.errorEmitter.event;
    }
    fireError(error, message, count) {
        this.errorEmitter.fire([this.asError(error), message, count]);
    }
    get onClose() {
        return this.closeEmitter.event;
    }
    fireClose() {
        this.closeEmitter.fire(undefined);
    }
    asError(error) {
        if (error instanceof Error) {
            return error;
        }
        else {
            return new Error(`Writer received error. Reason: ${Is.string(error.message) ? error.message : 'unknown'}`);
        }
    }
}
exports.AbstractMessageWriter = AbstractMessageWriter;
class StreamMessageWriter extends AbstractMessageWriter {
    constructor(writable, encoding = 'utf8') {
        super();
        this.writable = writable;
        this.encoding = encoding;
        this.errorCount = 0;
        this.writable.on('error', (error) => this.fireError(error));
        this.writable.on('close', () => this.fireClose());
    }
    write(msg) {
        let json = JSON.stringify(msg);
        let contentLength = Buffer.byteLength(json, this.encoding);
        let headers = [
            ContentLength, contentLength.toString(), CRLF,
            CRLF
        ];
        try {
            // Header must be written in ASCII encoding
            this.writable.write(headers.join(''), 'ascii');
            // Now write the content. This can be written in any encoding
            this.writable.write(json, this.encoding);
            this.errorCount = 0;
        }
        catch (error) {
            this.errorCount++;
            this.fireError(error, msg, this.errorCount);
        }
    }
}
exports.StreamMessageWriter = StreamMessageWriter;
class IPCMessageWriter extends AbstractMessageWriter {
    constructor(process) {
        super();
        this.process = process;
        this.errorCount = 0;
        this.queue = [];
        this.sending = false;
        let eventEmitter = this.process;
        eventEmitter.on('error', (error) => this.fireError(error));
        eventEmitter.on('close', () => this.fireClose);
    }
    write(msg) {
        if (!this.sending && this.queue.length === 0) {
            // See https://github.com/nodejs/node/issues/7657
            this.doWriteMessage(msg);
        }
        else {
            this.queue.push(msg);
        }
    }
    doWriteMessage(msg) {
        try {
            if (this.process.send) {
                this.sending = true;
                this.process.send(msg, undefined, undefined, (error) => {
                    this.sending = false;
                    if (error) {
                        this.errorCount++;
                        this.fireError(error, msg, this.errorCount);
                    }
                    else {
                        this.errorCount = 0;
                    }
                    if (this.queue.length > 0) {
                        this.doWriteMessage(this.queue.shift());
                    }
                });
            }
        }
        catch (error) {
            this.errorCount++;
            this.fireError(error, msg, this.errorCount);
        }
    }
}
exports.IPCMessageWriter = IPCMessageWriter;
class SocketMessageWriter extends AbstractMessageWriter {
    constructor(socket, encoding = 'utf8') {
        super();
        this.socket = socket;
        this.queue = [];
        this.sending = false;
        this.encoding = encoding;
        this.errorCount = 0;
        this.socket.on('error', (error) => this.fireError(error));
        this.socket.on('close', () => this.fireClose());
    }
    dispose() {
        super.dispose();
        this.socket.destroy();
    }
    write(msg) {
        if (!this.sending && this.queue.length === 0) {
            // See https://github.com/nodejs/node/issues/7657
            this.doWriteMessage(msg);
        }
        else {
            this.queue.push(msg);
        }
    }
    doWriteMessage(msg) {
        let json = JSON.stringify(msg);
        let contentLength = Buffer.byteLength(json, this.encoding);
        let headers = [
            ContentLength, contentLength.toString(), CRLF,
            CRLF
        ];
        try {
            // Header must be written in ASCII encoding
            this.sending = true;
            this.socket.write(headers.join(''), 'ascii', (error) => {
                if (error) {
                    this.handleError(error, msg);
                }
                try {
                    // Now write the content. This can be written in any encoding
                    this.socket.write(json, this.encoding, (error) => {
                        this.sending = false;
                        if (error) {
                            this.handleError(error, msg);
                        }
                        else {
                            this.errorCount = 0;
                        }
                        if (this.queue.length > 0) {
                            this.doWriteMessage(this.queue.shift());
                        }
                    });
                }
                catch (error) {
                    this.handleError(error, msg);
                }
            });
        }
        catch (error) {
            this.handleError(error, msg);
        }
    }
    handleError(error, msg) {
        this.errorCount++;
        this.fireError(error, msg, this.errorCount);
    }
}
exports.SocketMessageWriter = SocketMessageWriter;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).Buffer))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
const vscode_languageserver_types_1 = __webpack_require__(0);
const line_1 = __webpack_require__(15);
const util_1 = __webpack_require__(7);
class Comment extends line_1.Line {
    constructor(document, range) {
        super(document, range);
    }
    toString() {
        const content = this.getContent();
        if (content) {
            return "# " + content;
        }
        return "#";
    }
    /**
     * Returns the content of this comment. This excludes leading and
     * trailing whitespace as well as the # symbol. If the comment only
     * consists of whitespace, the empty string will be returned.
     */
    getContent() {
        let range = this.getContentRange();
        if (range === null) {
            return "";
        }
        return this.document.getText().substring(this.document.offsetAt(range.start), this.document.offsetAt(range.end));
    }
    /**
     * Returns a range that includes the content of the comment
     * excluding any leading and trailing whitespace as well as the #
     * symbol. May return null if the comment only consists of whitespace
     * characters.
     */
    getContentRange() {
        let range = this.getRange();
        const startOffset = this.document.offsetAt(range.start);
        let raw = this.document.getText().substring(startOffset, this.document.offsetAt(range.end));
        let start = -1;
        let end = -1;
        // skip the first # symbol
        for (let i = 1; i < raw.length; i++) {
            if (!util_1.Util.isWhitespace(raw.charAt(i))) {
                start = i;
                break;
            }
        }
        if (start === -1) {
            return null;
        }
        // go backwards up to the first # symbol
        for (let i = raw.length - 1; i >= 1; i--) {
            if (!util_1.Util.isWhitespace(raw.charAt(i))) {
                end = i + 1;
                break;
            }
        }
        return vscode_languageserver_types_1.Range.create(this.document.positionAt(startOffset + start), this.document.positionAt(startOffset + end));
    }
}
exports.Comment = Comment;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Flag {
    constructor(range, name, nameRange, value, valueRange) {
        this.range = range;
        this.name = name;
        this.nameRange = nameRange;
        this.value = value;
        this.valueRange = valueRange;
    }
    toString() {
        if (this.valueRange) {
            return "--" + this.name + "=" + this.value;
        }
        return "--" + this.name;
    }
    /**
     * Returns the range that encompasses this entire flag. This includes the
     * -- prefix in the beginning to the last character of the flag's value (if
     * it has been defined).
     *
     * @return the entire range of this flag
     */
    getRange() {
        return this.range;
    }
    /**
     * Returns the name of this flag. The name does not include the -- prefix.
     * Thus, for HEALTHCHECK's --interval flag, interval is the flag's name and
     * not --interval.
     *
     * @return this flag's name
     */
    getName() {
        return this.name;
    }
    /**
     * Returns the range that encompasses the flag's name
     *
     * @return the range containing the flag's name
     */
    getNameRange() {
        return this.nameRange;
    }
    /**
     * Returns the value that has been set to this flag. May be null if the
     * flag is invalid and has no value set like a --start-period. If the flag
     * is instead a --start-period= with an equals sign then the flag's value
     * is the empty string.
     *
     * @return this flag's value if it has been defined, null otherwise
     */
    getValue() {
        return this.value;
    }
    /**
     * Returns the range that encompasses this flag's value. If no value has
     * been set then null will be returned.
     *
     * @return the range containing this flag's value, or null if the flag
     *         has no value defined
     */
    getValueRange() {
        return this.valueRange;
    }
}
exports.Flag = Flag;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const jsonInstruction_1 = __webpack_require__(4);
class Add extends jsonInstruction_1.JSONInstruction {
    constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
        super(document, range, dockerfile, escapeChar, instruction, instructionRange);
    }
    stopSearchingForFlags(argument) {
        return argument.indexOf("--") === -1;
    }
}
exports.Add = Add;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const propertyInstruction_1 = __webpack_require__(17);
const util_1 = __webpack_require__(7);
class Label extends propertyInstruction_1.PropertyInstruction {
    constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
        super(document, range, dockerfile, escapeChar, instruction, instructionRange);
    }
    getVariables() {
        const variables = super.getVariables();
        const properties = this.getProperties();
        // iterate over all of this LABEL's properties
        for (const property of properties) {
            const value = property.getUnescapedValue();
            // check if the value is contained in single quotes,
            // single quotes would indicate a literal value
            if (value !== null && value.length > 2 && value.charAt(0) === '\'' && value.charAt(value.length - 1) === '\'') {
                const range = property.getValueRange();
                for (let i = 0; i < variables.length; i++) {
                    // if a variable is in a single quote, remove it from the list
                    if (util_1.Util.isInsideRange(variables[i].getRange().start, range)) {
                        variables.splice(i, 1);
                        i--;
                    }
                }
            }
        }
        return variables;
    }
    getProperties() {
        return super.getProperties();
    }
}
exports.Label = Label;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const jsonInstruction_1 = __webpack_require__(4);
class Shell extends jsonInstruction_1.JSONInstruction {
    constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
        super(document, range, dockerfile, escapeChar, instruction, instructionRange);
    }
}
exports.Shell = Shell;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = __webpack_require__(3);
class Stopsignal extends instruction_1.Instruction {
    constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
        super(document, range, dockerfile, escapeChar, instruction, instructionRange);
    }
}
exports.Stopsignal = Stopsignal;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = __webpack_require__(3);
class User extends instruction_1.Instruction {
    constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
        super(document, range, dockerfile, escapeChar, instruction, instructionRange);
    }
}
exports.User = User;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const jsonInstruction_1 = __webpack_require__(4);
class Volume extends jsonInstruction_1.JSONInstruction {
    constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
        super(document, range, dockerfile, escapeChar, instruction, instructionRange);
    }
}
exports.Volume = Volume;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = __webpack_require__(3);
class Workdir extends instruction_1.Instruction {
    constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
        super(document, range, dockerfile, escapeChar, instruction, instructionRange);
    }
}
exports.Workdir = Workdir;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const argument_1 = __webpack_require__(12);
class JSONArgument extends argument_1.Argument {
    constructor(value, range, jsonRange) {
        super(value, range);
        this.jsonRange = jsonRange;
    }
    getJSONRange() {
        return this.jsonRange;
    }
    getJSONValue() {
        let value = super.getValue();
        value = value.substring(1, value.length - 1);
        return value;
    }
}
exports.JSONArgument = JSONArgument;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_types_1 = __webpack_require__(0);
const comment_1 = __webpack_require__(35);
const parserDirective_1 = __webpack_require__(46);
const instruction_1 = __webpack_require__(3);
const jsonInstruction_1 = __webpack_require__(4);
const add_1 = __webpack_require__(37);
const arg_1 = __webpack_require__(21);
const cmd_1 = __webpack_require__(22);
const copy_1 = __webpack_require__(23);
const env_1 = __webpack_require__(25);
const entrypoint_1 = __webpack_require__(24);
const from_1 = __webpack_require__(14);
const healthcheck_1 = __webpack_require__(26);
const label_1 = __webpack_require__(38);
const onbuild_1 = __webpack_require__(27);
const shell_1 = __webpack_require__(39);
const stopsignal_1 = __webpack_require__(40);
const workdir_1 = __webpack_require__(43);
const user_1 = __webpack_require__(41);
const volume_1 = __webpack_require__(42);
const dockerfile_1 = __webpack_require__(70);
class Parser {
    constructor() {
        this.escapeChar = null;
    }
    static createInstruction(document, dockerfile, escapeChar, lineRange, instruction, instructionRange) {
        switch (instruction.toUpperCase()) {
            case "ADD":
                return new add_1.Add(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "ARG":
                return new arg_1.Arg(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "CMD":
                return new cmd_1.Cmd(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "COPY":
                return new copy_1.Copy(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "ENTRYPOINT":
                return new entrypoint_1.Entrypoint(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "ENV":
                return new env_1.Env(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "FROM":
                return new from_1.From(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "HEALTHCHECK":
                return new healthcheck_1.Healthcheck(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "LABEL":
                return new label_1.Label(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "ONBUILD":
                return new onbuild_1.Onbuild(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "RUN":
                return new jsonInstruction_1.JSONInstruction(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "SHELL":
                return new shell_1.Shell(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "STOPSIGNAL":
                return new stopsignal_1.Stopsignal(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "WORKDIR":
                return new workdir_1.Workdir(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "USER":
                return new user_1.User(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "VOLUME":
                return new volume_1.Volume(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
        }
        return new instruction_1.Instruction(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
    }
    getParserDirectives(document, buffer) {
        // reset the escape directive in between runs
        const directives = [];
        this.escapeChar = '';
        directiveCheck: for (let i = 0; i < buffer.length; i++) {
            switch (buffer.charAt(i)) {
                case ' ':
                case '\t':
                    break;
                case '\r':
                case '\n':
                    // blank lines stop the parsing of directives immediately
                    break directiveCheck;
                case '#':
                    let commentStart = i;
                    let directiveStart = -1;
                    let directiveEnd = -1;
                    for (let j = i + 1; j < buffer.length; j++) {
                        let char = buffer.charAt(j);
                        switch (char) {
                            case ' ':
                            case '\t':
                                if (directiveStart !== -1 && directiveEnd === -1) {
                                    directiveEnd = j;
                                }
                                break;
                            case '\r':
                            case '\n':
                                break directiveCheck;
                            case '=':
                                let valueStart = -1;
                                let valueEnd = -1;
                                if (directiveEnd === -1) {
                                    directiveEnd = j;
                                }
                                // assume the line ends with the file
                                let lineEnd = buffer.length;
                                directiveValue: for (let k = j + 1; k < buffer.length; k++) {
                                    char = buffer.charAt(k);
                                    switch (char) {
                                        case '\r':
                                        case '\n':
                                            if (valueStart !== -1 && valueEnd === -1) {
                                                valueEnd = k;
                                            }
                                            // line break found, reset
                                            lineEnd = k;
                                            break directiveValue;
                                        case '\t':
                                        case ' ':
                                            if (valueStart !== -1 && valueEnd === -1) {
                                                valueEnd = k;
                                            }
                                            continue;
                                        default:
                                            if (valueStart === -1) {
                                                valueStart = k;
                                            }
                                            break;
                                    }
                                }
                                let lineRange = vscode_languageserver_types_1.Range.create(document.positionAt(commentStart), document.positionAt(lineEnd));
                                if (directiveStart === -1) {
                                    // no directive, it's a regular comment
                                    break directiveCheck;
                                }
                                if (valueStart === -1) {
                                    // no non-whitespace characters found, highlight all the characters then
                                    valueStart = j + 1;
                                    valueEnd = lineEnd;
                                }
                                else if (valueEnd === -1) {
                                    // reached EOF
                                    valueEnd = buffer.length;
                                }
                                let nameRange = vscode_languageserver_types_1.Range.create(document.positionAt(directiveStart), document.positionAt(directiveEnd));
                                let valueRange = vscode_languageserver_types_1.Range.create(document.positionAt(valueStart), document.positionAt(valueEnd));
                                directives.push(new parserDirective_1.ParserDirective(document, lineRange, nameRange, valueRange));
                                directiveStart = -1;
                                if (buffer.charAt(valueEnd) === '\r') {
                                    // skip over the \r
                                    i = valueEnd + 1;
                                }
                                else {
                                    i = valueEnd;
                                }
                                continue directiveCheck;
                            default:
                                if (directiveStart === -1) {
                                    directiveStart = j;
                                }
                                break;
                        }
                    }
                    break;
                default:
                    break directiveCheck;
            }
        }
        return directives;
    }
    parse(buffer) {
        let document = vscode_languageserver_types_1.TextDocument.create("", "", 0, buffer);
        let dockerfile = new dockerfile_1.Dockerfile(document);
        let directives = this.getParserDirectives(document, buffer);
        let offset = 0;
        this.escapeChar = '\\';
        if (directives.length > 0) {
            dockerfile.setDirectives(directives);
            this.escapeChar = dockerfile.getEscapeCharacter();
            // start parsing after the directives
            offset = document.offsetAt(vscode_languageserver_types_1.Position.create(directives.length, 0));
        }
        lineCheck: for (let i = offset; i < buffer.length; i++) {
            let char = buffer.charAt(i);
            switch (char) {
                case ' ':
                case '\t':
                case '\r':
                case '\n':
                    break;
                case '#':
                    for (let j = i + 1; j < buffer.length; j++) {
                        char = buffer.charAt(j);
                        switch (char) {
                            case '\r':
                                dockerfile.addComment(new comment_1.Comment(document, vscode_languageserver_types_1.Range.create(document.positionAt(i), document.positionAt(j))));
                                // offset one more for \r\n
                                i = j + 1;
                                continue lineCheck;
                            case '\n':
                                dockerfile.addComment(new comment_1.Comment(document, vscode_languageserver_types_1.Range.create(document.positionAt(i), document.positionAt(j))));
                                i = j;
                                continue lineCheck;
                        }
                    }
                    // reached EOF
                    let range = vscode_languageserver_types_1.Range.create(document.positionAt(i), document.positionAt(buffer.length));
                    dockerfile.addComment(new comment_1.Comment(document, range));
                    break lineCheck;
                default:
                    let instruction = char;
                    let instructionStart = i;
                    let instructionEnd = -1;
                    let lineRange = null;
                    let instructionRange = null;
                    instructionCheck: for (let j = i + 1; j < buffer.length; j++) {
                        char = buffer.charAt(j);
                        switch (char) {
                            case this.escapeChar:
                                char = buffer.charAt(j + 1);
                                if (char === '\r') {
                                    // skip two for \r\n
                                    j += 2;
                                }
                                else if (char === '\n') {
                                    j++;
                                }
                                else if (char === ' ' || char === '\t') {
                                    for (let k = j + 2; k < buffer.length; k++) {
                                        switch (buffer.charAt(k)) {
                                            case ' ':
                                            case '\t':
                                                break;
                                            case '\r':
                                                // skip another for \r\n
                                                j = k + 1;
                                                continue instructionCheck;
                                            case '\n':
                                                j = k;
                                                continue instructionCheck;
                                            default:
                                                instructionEnd = j + 1;
                                                instruction = instruction + this.escapeChar;
                                                j = k - 2;
                                                continue instructionCheck;
                                        }
                                    }
                                    instructionEnd = j + 1;
                                    instruction = instruction + this.escapeChar;
                                    break instructionCheck;
                                }
                                else {
                                    instructionEnd = j + 1;
                                    instruction = instruction + this.escapeChar;
                                }
                                break;
                            case ' ':
                            case '\t':
                                if (instructionEnd === -1) {
                                    instructionEnd = j;
                                }
                                let escaped = false;
                                argumentsCheck: for (let k = j + 1; k < buffer.length; k++) {
                                    switch (buffer.charAt(k)) {
                                        case '\r':
                                        case '\n':
                                            if (escaped) {
                                                continue;
                                            }
                                            i = k;
                                            lineRange = vscode_languageserver_types_1.Range.create(document.positionAt(instructionStart), document.positionAt(k));
                                            instructionRange = vscode_languageserver_types_1.Range.create(document.positionAt(instructionStart), document.positionAt(instructionEnd));
                                            dockerfile.addInstruction(Parser.createInstruction(document, dockerfile, this.escapeChar, lineRange, instruction, instructionRange));
                                            continue lineCheck;
                                        case this.escapeChar:
                                            let next = buffer.charAt(k + 1);
                                            if (next === '\n') {
                                                escaped = true;
                                                k++;
                                            }
                                            else if (next === '\r') {
                                                escaped = true;
                                                // skip two chars for \r\n
                                                k = k + 2;
                                            }
                                            else if (next === ' ' || next === '\t') {
                                                escapeCheck: for (let l = k + 2; l < buffer.length; l++) {
                                                    switch (buffer.charAt(l)) {
                                                        case ' ':
                                                        case '\t':
                                                            break;
                                                        case '\r':
                                                            // skip another char for \r\n
                                                            escaped = true;
                                                            k = l + 1;
                                                            break escapeCheck;
                                                        case '\n':
                                                            escaped = true;
                                                            k = l;
                                                            break escapeCheck;
                                                        default:
                                                            k = l;
                                                            break escapeCheck;
                                                    }
                                                }
                                            }
                                            continue;
                                        case '#':
                                            if (escaped) {
                                                for (let l = k + 1; l < buffer.length; l++) {
                                                    switch (buffer.charAt(l)) {
                                                        case '\r':
                                                            dockerfile.addComment(new comment_1.Comment(document, vscode_languageserver_types_1.Range.create(document.positionAt(k), document.positionAt(l))));
                                                            // offset one more for \r\n
                                                            k = l + 1;
                                                            continue argumentsCheck;
                                                        case '\n':
                                                            let range = vscode_languageserver_types_1.Range.create(document.positionAt(k), document.positionAt(l));
                                                            dockerfile.addComment(new comment_1.Comment(document, range));
                                                            k = l;
                                                            continue argumentsCheck;
                                                    }
                                                }
                                                let range = vscode_languageserver_types_1.Range.create(document.positionAt(k), document.positionAt(buffer.length));
                                                dockerfile.addComment(new comment_1.Comment(document, range));
                                                break argumentsCheck;
                                            }
                                            break;
                                        case ' ':
                                        case '\t':
                                            break;
                                        default:
                                            if (escaped) {
                                                escaped = false;
                                            }
                                            break;
                                    }
                                }
                                // reached EOF
                                lineRange = vscode_languageserver_types_1.Range.create(document.positionAt(instructionStart), document.positionAt(buffer.length));
                                instructionRange = vscode_languageserver_types_1.Range.create(document.positionAt(instructionStart), document.positionAt(instructionEnd));
                                dockerfile.addInstruction(Parser.createInstruction(document, dockerfile, this.escapeChar, lineRange, instruction, instructionRange));
                                break lineCheck;
                            case '\r':
                                if (instructionEnd === -1) {
                                    instructionEnd = j;
                                }
                                // skip for \r\n
                                j++;
                            case '\n':
                                if (instructionEnd === -1) {
                                    instructionEnd = j;
                                }
                                lineRange = vscode_languageserver_types_1.Range.create(document.positionAt(instructionStart), document.positionAt(instructionEnd));
                                dockerfile.addInstruction(Parser.createInstruction(document, dockerfile, this.escapeChar, lineRange, instruction, lineRange));
                                i = j;
                                continue lineCheck;
                            default:
                                instructionEnd = j + 1;
                                instruction = instruction + char;
                                break;
                        }
                    }
                    // reached EOF
                    if (instructionEnd === -1) {
                        instructionEnd = buffer.length;
                    }
                    lineRange = vscode_languageserver_types_1.Range.create(document.positionAt(instructionStart), document.positionAt(instructionEnd));
                    dockerfile.addInstruction(Parser.createInstruction(document, dockerfile, this.escapeChar, lineRange, instruction, lineRange));
                    break lineCheck;
            }
        }
        dockerfile.organizeComments();
        return dockerfile;
    }
}
exports.Parser = Parser;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = __webpack_require__(1);
const line_1 = __webpack_require__(15);
class ParserDirective extends line_1.Line {
    constructor(document, range, nameRange, valueRange) {
        super(document, range);
        this.nameRange = nameRange;
        this.valueRange = valueRange;
    }
    toString() {
        return "# " + this.getName() + '=' + this.getValue();
    }
    getNameRange() {
        return this.nameRange;
    }
    getValueRange() {
        return this.valueRange;
    }
    getName() {
        return this.document.getText().substring(this.document.offsetAt(this.nameRange.start), this.document.offsetAt(this.nameRange.end));
    }
    getValue() {
        return this.document.getText().substring(this.document.offsetAt(this.valueRange.start), this.document.offsetAt(this.valueRange.end));
    }
    getDirective() {
        const directive = main_1.Directive[this.getName().toLowerCase()];
        return directive === undefined ? null : directive;
    }
}
exports.ParserDirective = ParserDirective;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Variable {
    constructor(name, nameRange, range, modifier, modifierRange, substitutionParameter, substitutionRange, defined, buildVariable, stringValue) {
        this.name = name;
        this.nameRange = nameRange;
        this.range = range;
        this.modifier = modifier;
        this.modifierRange = modifierRange;
        this.substitutionParameter = substitutionParameter;
        this.substitutionRange = substitutionRange;
        this.defined = defined;
        this.buildVariable = buildVariable;
        this.stringValue = stringValue;
    }
    toString() {
        return this.stringValue;
    }
    getName() {
        return this.name;
    }
    getNameRange() {
        return this.nameRange;
    }
    /**
     * Returns the range of the entire variable. This includes the symbols for
     * the declaration of the variable such as the $, {, and } symbols.
     *
     * @return the range in the document that this variable encompasses in its
     *         entirety
     */
    getRange() {
        return this.range;
    }
    /**
     * Returns the modifier character that has been set for
     * specifying how this variable should be expanded and resolved.
     * If this variable is ${variable:+value} then the modifier
     * character is '+'. Will be the empty string if the variable is
     * declared as ${variable:}. Otherwise, will be null if this
     * variable will not use variable substitution at all (such as
     * ${variable} or $variable).
     *
     * @return this variable's modifier character, or the empty
     *         string if it does not have one, or null if this
     *         variable will not use variable substitution
     */
    getModifier() {
        return this.modifier;
    }
    getModifierRange() {
        return this.modifierRange;
    }
    /**
     * Returns the parameter that will be used for substitution if
     * this variable uses modifiers to define how its value should be
     * resolved. If this variable is ${variable:+value} then the
     * substitution value will be 'value'. Will be the empty string
     * if the variable is declared as ${variable:+} or some other
     * variant where the only thing that follows the modifier
     * character (excluding considerations of escape characters and
     * so on) is the variable's closing bracket. May be null if this
     * variable does not have a modifier character defined (such as
     * ${variable} or $variable).
     *
     * @return this variable's substitution parameter, or the empty
     *         string if it does not have one, or null if there is
     *         not one defined
     */
    getSubstitutionParameter() {
        return this.substitutionParameter;
    }
    getSubstitutionRange() {
        return this.substitutionRange;
    }
    /**
     * Returns whether this variable has been defined or not.
     *
     * @return true if this variable has been defined, false otherwise
     */
    isDefined() {
        return this.defined;
    }
    isBuildVariable() {
        return this.buildVariable === true;
    }
    isEnvironmentVariable() {
        return this.buildVariable === false;
    }
}
exports.Variable = Variable;


/***/ }),
/* 48 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 49 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var pna = __webpack_require__(18);
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = __webpack_require__(49);
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = __webpack_require__(48).EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(54);
/*</replacement>*/

/*<replacement>*/

var Buffer = __webpack_require__(19).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(11);
util.inherits = __webpack_require__(8);
/*</replacement>*/

/*<replacement>*/
var debugUtil = __webpack_require__(112);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__(83);
var destroyImpl = __webpack_require__(53);
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

  // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(9);

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var readableHwm = options.readableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(58).StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(9);

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(58).StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    pna.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        pna.nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    pna.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;

  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  this._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    pna.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(5)))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;

var Duplex = __webpack_require__(9);

/*<replacement>*/
var util = __webpack_require__(11);
util.inherits = __webpack_require__(8);
/*</replacement>*/

util.inherits(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return this.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);

  cb(er);

  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function') {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this2 = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this2.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');

  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, setImmediate, global) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



/*<replacement>*/

var pna = __webpack_require__(18);
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = __webpack_require__(11);
util.inherits = __webpack_require__(8);
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(102)
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(54);
/*</replacement>*/

/*<replacement>*/

var Buffer = __webpack_require__(19).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

var destroyImpl = __webpack_require__(53);

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(9);

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var writableHwm = options.writableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(9);

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  pna.nextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    pna.nextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    pna.nextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    pna.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      pna.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), __webpack_require__(59).setImmediate, __webpack_require__(2)))

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

var pna = __webpack_require__(18);
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      pna.nextTick(emitErrorNT, this, err);
    }
    return this;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      pna.nextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });

  return this;
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(48).EventEmitter;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(50);
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(52);
exports.Duplex = __webpack_require__(9);
exports.Transform = __webpack_require__(51);
exports.PassThrough = __webpack_require__(82);


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports.fetch = isFunction(global.fetch) && isFunction(global.ReadableStream)

exports.writableStream = isFunction(global.WritableStream)

exports.abortController = isFunction(global.AbortController)

exports.blobConstructor = false
try {
	new Blob([new ArrayBuffer(1)])
	exports.blobConstructor = true
} catch (e) {}

// The xhr request to example.com may violate some restrictive CSP configurations,
// so if we're running in a browser that supports `fetch`, avoid calling getXHR()
// and assume support for certain features below.
var xhr
function getXHR () {
	// Cache the xhr value
	if (xhr !== undefined) return xhr

	if (global.XMLHttpRequest) {
		xhr = new global.XMLHttpRequest()
		// If XDomainRequest is available (ie only, where xhr might not work
		// cross domain), use the page location. Otherwise use example.com
		// Note: this doesn't actually make an http request.
		try {
			xhr.open('GET', global.XDomainRequest ? '/' : 'https://example.com')
		} catch(e) {
			xhr = null
		}
	} else {
		// Service workers don't have XHR
		xhr = null
	}
	return xhr
}

function checkTypeSupport (type) {
	var xhr = getXHR()
	if (!xhr) return false
	try {
		xhr.responseType = type
		return xhr.responseType === type
	} catch (e) {}
	return false
}

// For some strange reason, Safari 7.0 reports typeof global.ArrayBuffer === 'object'.
// Safari 7.1 appears to have fixed this bug.
var haveArrayBuffer = typeof global.ArrayBuffer !== 'undefined'
var haveSlice = haveArrayBuffer && isFunction(global.ArrayBuffer.prototype.slice)

// If fetch is supported, then arraybuffer will be supported too. Skip calling
// checkTypeSupport(), since that calls getXHR().
exports.arraybuffer = exports.fetch || (haveArrayBuffer && checkTypeSupport('arraybuffer'))

// These next two tests unavoidably show warnings in Chrome. Since fetch will always
// be used if it's available, just return false for these to avoid the warnings.
exports.msstream = !exports.fetch && haveSlice && checkTypeSupport('ms-stream')
exports.mozchunkedarraybuffer = !exports.fetch && haveArrayBuffer &&
	checkTypeSupport('moz-chunked-arraybuffer')

// If fetch is supported, then overrideMimeType will be supported too. Skip calling
// getXHR().
exports.overrideMimeType = exports.fetch || (getXHR() ? isFunction(getXHR().overrideMimeType) : false)

exports.vbArray = isFunction(global.VBArray)

function isFunction (value) {
	return typeof value === 'function'
}

xhr = null // Help gc

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, Buffer, global) {var capability = __webpack_require__(56)
var inherits = __webpack_require__(8)
var stream = __webpack_require__(55)

var rStates = exports.readyStates = {
	UNSENT: 0,
	OPENED: 1,
	HEADERS_RECEIVED: 2,
	LOADING: 3,
	DONE: 4
}

var IncomingMessage = exports.IncomingMessage = function (xhr, response, mode) {
	var self = this
	stream.Readable.call(self)

	self._mode = mode
	self.headers = {}
	self.rawHeaders = []
	self.trailers = {}
	self.rawTrailers = []

	// Fake the 'close' event, but only once 'end' fires
	self.on('end', function () {
		// The nextTick is necessary to prevent the 'request' module from causing an infinite loop
		process.nextTick(function () {
			self.emit('close')
		})
	})

	if (mode === 'fetch') {
		self._fetchResponse = response

		self.url = response.url
		self.statusCode = response.status
		self.statusMessage = response.statusText
		
		response.headers.forEach(function (header, key){
			self.headers[key.toLowerCase()] = header
			self.rawHeaders.push(key, header)
		})

		if (capability.writableStream) {
			var writable = new WritableStream({
				write: function (chunk) {
					return new Promise(function (resolve, reject) {
						if (self._destroyed) {
							return
						} else if(self.push(new Buffer(chunk))) {
							resolve()
						} else {
							self._resumeFetch = resolve
						}
					})
				},
				close: function () {
					if (!self._destroyed)
						self.push(null)
				},
				abort: function (err) {
					if (!self._destroyed)
						self.emit('error', err)
				}
			})

			try {
				response.body.pipeTo(writable)
				return
			} catch (e) {} // pipeTo method isn't defined. Can't find a better way to feature test this
		}
		// fallback for when writableStream or pipeTo aren't available
		var reader = response.body.getReader()
		function read () {
			reader.read().then(function (result) {
				if (self._destroyed)
					return
				if (result.done) {
					self.push(null)
					return
				}
				self.push(new Buffer(result.value))
				read()
			}).catch(function(err) {
				if (!self._destroyed)
					self.emit('error', err)
			})
		}
		read()
	} else {
		self._xhr = xhr
		self._pos = 0

		self.url = xhr.responseURL
		self.statusCode = xhr.status
		self.statusMessage = xhr.statusText
		var headers = xhr.getAllResponseHeaders().split(/\r?\n/)
		headers.forEach(function (header) {
			var matches = header.match(/^([^:]+):\s*(.*)/)
			if (matches) {
				var key = matches[1].toLowerCase()
				if (key === 'set-cookie') {
					if (self.headers[key] === undefined) {
						self.headers[key] = []
					}
					self.headers[key].push(matches[2])
				} else if (self.headers[key] !== undefined) {
					self.headers[key] += ', ' + matches[2]
				} else {
					self.headers[key] = matches[2]
				}
				self.rawHeaders.push(matches[1], matches[2])
			}
		})

		self._charset = 'x-user-defined'
		if (!capability.overrideMimeType) {
			var mimeType = self.rawHeaders['mime-type']
			if (mimeType) {
				var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/)
				if (charsetMatch) {
					self._charset = charsetMatch[1].toLowerCase()
				}
			}
			if (!self._charset)
				self._charset = 'utf-8' // best guess
		}
	}
}

inherits(IncomingMessage, stream.Readable)

IncomingMessage.prototype._read = function () {
	var self = this

	var resolve = self._resumeFetch
	if (resolve) {
		self._resumeFetch = null
		resolve()
	}
}

IncomingMessage.prototype._onXHRProgress = function () {
	var self = this

	var xhr = self._xhr

	var response = null
	switch (self._mode) {
		case 'text:vbarray': // For IE9
			if (xhr.readyState !== rStates.DONE)
				break
			try {
				// This fails in IE8
				response = new global.VBArray(xhr.responseBody).toArray()
			} catch (e) {}
			if (response !== null) {
				self.push(new Buffer(response))
				break
			}
			// Falls through in IE8	
		case 'text':
			try { // This will fail when readyState = 3 in IE9. Switch mode and wait for readyState = 4
				response = xhr.responseText
			} catch (e) {
				self._mode = 'text:vbarray'
				break
			}
			if (response.length > self._pos) {
				var newData = response.substr(self._pos)
				if (self._charset === 'x-user-defined') {
					var buffer = new Buffer(newData.length)
					for (var i = 0; i < newData.length; i++)
						buffer[i] = newData.charCodeAt(i) & 0xff

					self.push(buffer)
				} else {
					self.push(newData, self._charset)
				}
				self._pos = response.length
			}
			break
		case 'arraybuffer':
			if (xhr.readyState !== rStates.DONE || !xhr.response)
				break
			response = xhr.response
			self.push(new Buffer(new Uint8Array(response)))
			break
		case 'moz-chunked-arraybuffer': // take whole
			response = xhr.response
			if (xhr.readyState !== rStates.LOADING || !response)
				break
			self.push(new Buffer(new Uint8Array(response)))
			break
		case 'ms-stream':
			response = xhr.response
			if (xhr.readyState !== rStates.LOADING)
				break
			var reader = new global.MSStreamReader()
			reader.onprogress = function () {
				if (reader.result.byteLength > self._pos) {
					self.push(new Buffer(new Uint8Array(reader.result.slice(self._pos))))
					self._pos = reader.result.byteLength
				}
			}
			reader.onload = function () {
				self.push(null)
			}
			// reader.onerror = ??? // TODO: this
			reader.readAsArrayBuffer(response)
			break
	}

	// The ms-stream case handles end separately in reader.onload()
	if (self._xhr.readyState === rStates.DONE && self._mode !== 'ms-stream') {
		self.push(null)
	}
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), __webpack_require__(6).Buffer, __webpack_require__(2)))

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Buffer = __webpack_require__(19).Buffer;

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return -1;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// UTF-8 replacement characters ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd'.repeat(p);
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd'.repeat(p + 1);
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd'.repeat(p + 2);
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character for each buffered byte of a (partial)
// character needs to be added to the output.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd'.repeat(this.lastTotal - this.lastNeed);
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(84);
// On some exotic environments, it's not clear which object `setimmeidate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
var vscode_languageserver_types_1 = __webpack_require__(0);
var docker_1 = __webpack_require__(10);
var dockerfile_ast_1 = __webpack_require__(1);
var DockerDefinition = /** @class */ (function () {
    function DockerDefinition() {
    }
    DockerDefinition.prototype.computeBuildStageDefinition = function (dockerfile, position) {
        var source = undefined;
        for (var _i = 0, _a = dockerfile.getCOPYs(); _i < _a.length; _i++) {
            var instruction = _a[_i];
            var flag = instruction.getFromFlag();
            if (flag) {
                var range = flag.getValueRange();
                if (range && range.start.line === position.line && range.start.character <= position.character && position.character <= range.end.character) {
                    source = flag.getValue();
                    break;
                }
            }
        }
        for (var _b = 0, _c = dockerfile.getFROMs(); _b < _c.length; _b++) {
            var instruction = _c[_b];
            var range = instruction.getBuildStageRange();
            if (range) {
                if (range.start.line === position.line && range.start.character <= position.character && position.character <= range.end.character) {
                    // cursor in FROM's build stage itself
                    return range;
                }
                else if (source !== undefined && instruction.getBuildStage().toLowerCase() === source.toLowerCase()) {
                    // FROM's build stage matches what's in COPY
                    return range;
                }
            }
        }
        return null;
    };
    DockerDefinition.computeVariableDefinition = function (image, position) {
        var variableName = null;
        for (var _i = 0, _a = image.getARGs(); _i < _a.length; _i++) {
            var arg = _a[_i];
            var property = arg.getProperty();
            // might be an ARG with no arguments
            if (property) {
                // is the caret inside the definition itself
                if (docker_1.Util.isInsideRange(position, property.getNameRange())) {
                    variableName = property.getName();
                    break;
                }
            }
        }
        if (variableName === null) {
            variableCheck: for (var _b = 0, _c = image.getENVs(); _b < _c.length; _b++) {
                var env = _c[_b];
                var properties = env.getProperties();
                for (var _d = 0, properties_1 = properties; _d < properties_1.length; _d++) {
                    var property = properties_1[_d];
                    // is the caret inside the definition itself
                    if (docker_1.Util.isInsideRange(position, property.getNameRange())) {
                        variableName = property.getName();
                        break variableCheck;
                    }
                }
            }
        }
        if (variableName === null) {
            variableCheck: for (var _e = 0, _f = image.getInstructions(); _e < _f.length; _e++) {
                var instruction = _f[_e];
                for (var _g = 0, _h = instruction.getVariables(); _g < _h.length; _g++) {
                    var variable = _h[_g];
                    if (docker_1.Util.isInsideRange(position, variable.getNameRange())) {
                        variableName = variable.getName();
                        break variableCheck;
                    }
                }
            }
        }
        for (var _j = 0, _k = image.getInstructions(); _j < _k.length; _j++) {
            var instruction = _k[_j];
            if (instruction instanceof dockerfile_ast_1.Arg) {
                var property = instruction.getProperty();
                // might be an ARG with no arguments
                if (property && property.getName() === variableName) {
                    return property;
                }
            }
            else if (instruction instanceof dockerfile_ast_1.Env) {
                var properties = instruction.getProperties();
                for (var _l = 0, properties_2 = properties; _l < properties_2.length; _l++) {
                    var property = properties_2[_l];
                    if (property.getName() === variableName) {
                        return property;
                    }
                }
            }
        }
        return null;
    };
    DockerDefinition.findDefinition = function (dockerfile, position) {
        for (var _i = 0, _a = dockerfile.getFROMs(); _i < _a.length; _i++) {
            var from = _a[_i];
            for (var _b = 0, _c = from.getVariables(); _b < _c.length; _b++) {
                var variable = _c[_b];
                if (docker_1.Util.isInsideRange(position, variable.getNameRange())) {
                    for (var _d = 0, _e = dockerfile.getInitialARGs(); _d < _e.length; _d++) {
                        var arg = _e[_d];
                        var property = arg.getProperty();
                        if (property && property.getName() === variable.getName()) {
                            return property;
                        }
                    }
                    return null;
                }
            }
        }
        var image = dockerfile.getContainingImage(position);
        return DockerDefinition.computeVariableDefinition(image, position);
    };
    DockerDefinition.prototype.computeVariableDefinition = function (dockerfile, position) {
        var property = DockerDefinition.findDefinition(dockerfile, position);
        return property ? property.getNameRange() : null;
    };
    DockerDefinition.prototype.computeDefinitionRange = function (content, position) {
        var dockerfile = dockerfile_ast_1.DockerfileParser.parse(content);
        var range = this.computeBuildStageDefinition(dockerfile, position);
        return range ? range : this.computeVariableDefinition(dockerfile, position);
    };
    DockerDefinition.prototype.computeDefinition = function (textDocument, content, position) {
        var dockerfile = dockerfile_ast_1.DockerfileParser.parse(content);
        var range = this.computeBuildStageDefinition(dockerfile, position);
        if (range !== null) {
            return vscode_languageserver_types_1.Location.create(textDocument.uri, range);
        }
        range = this.computeVariableDefinition(dockerfile, position);
        if (range !== null) {
            return vscode_languageserver_types_1.Location.create(textDocument.uri, range);
        }
        return null;
    };
    return DockerDefinition;
}());
exports.DockerDefinition = DockerDefinition;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
var vscode_languageserver_types_1 = __webpack_require__(0);
var dockerfile_ast_1 = __webpack_require__(1);
var dockerDefinition_1 = __webpack_require__(60);
var docker_1 = __webpack_require__(10);
var DockerHighlight = /** @class */ (function () {
    function DockerHighlight() {
    }
    DockerHighlight.prototype.computeHighlightRanges = function (content, position) {
        var dockerfile = dockerfile_ast_1.DockerfileParser.parse(content);
        var provider = new dockerDefinition_1.DockerDefinition();
        var definitionRange = provider.computeDefinitionRange(content, position);
        var image = definitionRange === null ? dockerfile.getContainingImage(position) : dockerfile.getContainingImage(definitionRange.start);
        var highlights = [];
        if (definitionRange === null) {
            for (var _i = 0, _a = dockerfile.getCOPYs(); _i < _a.length; _i++) {
                var instruction = _a[_i];
                var flag = instruction.getFromFlag();
                if (flag) {
                    var range = flag.getValueRange();
                    if (range && range.start.line === position.line && range.start.character <= position.character && position.character <= range.end.character) {
                        var stage = flag.getValue();
                        for (var _b = 0, _c = dockerfile.getCOPYs(); _b < _c.length; _b++) {
                            var other = _c[_b];
                            var otherFlag = other.getFromFlag();
                            if (otherFlag && otherFlag.getValue().toLowerCase() === stage.toLowerCase()) {
                                highlights.push(vscode_languageserver_types_1.DocumentHighlight.create(otherFlag.getValueRange(), vscode_languageserver_types_1.DocumentHighlightKind.Read));
                            }
                        }
                        return highlights;
                    }
                }
            }
            for (var _d = 0, _e = dockerfile.getFROMs(); _d < _e.length; _d++) {
                var from = _e[_d];
                for (var _f = 0, _g = from.getVariables(); _f < _g.length; _f++) {
                    var variable = _g[_f];
                    if (docker_1.Util.isInsideRange(position, variable.getNameRange())) {
                        var name = variable.getName();
                        for (var _h = 0, _j = dockerfile.getFROMs(); _h < _j.length; _h++) {
                            var loopFrom = _j[_h];
                            for (var _k = 0, _l = loopFrom.getVariables(); _k < _l.length; _k++) {
                                var fromVariable = _l[_k];
                                if (fromVariable.getName() === name) {
                                    highlights.push(vscode_languageserver_types_1.DocumentHighlight.create(fromVariable.getNameRange(), vscode_languageserver_types_1.DocumentHighlightKind.Read));
                                }
                            }
                        }
                        return highlights;
                    }
                }
            }
            for (var _m = 0, _o = image.getInstructions(); _m < _o.length; _m++) {
                var instruction = _o[_m];
                for (var _p = 0, _q = instruction.getVariables(); _p < _q.length; _p++) {
                    var variable = _q[_p];
                    if (docker_1.Util.isInsideRange(position, variable.getNameRange())) {
                        var name = variable.getName();
                        for (var _r = 0, _s = image.getInstructions(); _r < _s.length; _r++) {
                            var instruction_1 = _s[_r];
                            if (!(instruction_1 instanceof dockerfile_ast_1.From)) {
                                for (var _t = 0, _u = instruction_1.getVariables(); _t < _u.length; _t++) {
                                    var variable_1 = _u[_t];
                                    if (variable_1.getName() === name) {
                                        highlights.push(vscode_languageserver_types_1.DocumentHighlight.create(variable_1.getNameRange(), vscode_languageserver_types_1.DocumentHighlightKind.Read));
                                    }
                                }
                            }
                        }
                        return highlights;
                    }
                }
            }
        }
        else {
            var document = vscode_languageserver_types_1.TextDocument.create("", "", 0, content);
            var definition = document.getText().substring(document.offsetAt(definitionRange.start), document.offsetAt(definitionRange.end));
            var isBuildStage = false;
            for (var _v = 0, _w = dockerfile.getFROMs(); _v < _w.length; _v++) {
                var from = _w[_v];
                var stage = from.getBuildStage();
                if (stage && definition.toLowerCase() === stage.toLowerCase()) {
                    highlights.push(vscode_languageserver_types_1.DocumentHighlight.create(from.getBuildStageRange(), vscode_languageserver_types_1.DocumentHighlightKind.Write));
                    isBuildStage = true;
                }
            }
            if (isBuildStage) {
                for (var _x = 0, _y = dockerfile.getCOPYs(); _x < _y.length; _x++) {
                    var instruction = _y[_x];
                    var flag = instruction.getFromFlag();
                    if (flag) {
                        if (flag.getValue().toLowerCase() === definition.toLowerCase()) {
                            highlights.push(vscode_languageserver_types_1.DocumentHighlight.create(flag.getValueRange(), vscode_languageserver_types_1.DocumentHighlightKind.Read));
                        }
                    }
                }
                return highlights;
            }
            for (var _z = 0, _0 = image.getARGs(); _z < _0.length; _z++) {
                var arg = _0[_z];
                var property = arg.getProperty();
                // property may be null if it's an ARG with no arguments
                if (property && property.getName() === definition) {
                    highlights.push(vscode_languageserver_types_1.DocumentHighlight.create(property.getNameRange(), vscode_languageserver_types_1.DocumentHighlightKind.Write));
                }
            }
            for (var _1 = 0, _2 = image.getENVs(); _1 < _2.length; _1++) {
                var env = _2[_1];
                for (var _3 = 0, _4 = env.getProperties(); _3 < _4.length; _3++) {
                    var property = _4[_3];
                    if (property.getName() === definition) {
                        highlights.push(vscode_languageserver_types_1.DocumentHighlight.create(property.getNameRange(), vscode_languageserver_types_1.DocumentHighlightKind.Write));
                    }
                }
            }
            for (var _5 = 0, _6 = image.getInstructions(); _5 < _6.length; _5++) {
                var instruction = _6[_5];
                // only highlight variables in non-FROM instructions
                if (!(instruction instanceof dockerfile_ast_1.From)) {
                    for (var _7 = 0, _8 = instruction.getVariables(); _7 < _8.length; _7++) {
                        var variable = _8[_7];
                        if (variable.getName() === definition) {
                            highlights.push(vscode_languageserver_types_1.DocumentHighlight.create(variable.getNameRange(), vscode_languageserver_types_1.DocumentHighlightKind.Read));
                        }
                    }
                }
            }
            for (var _9 = 0, _10 = dockerfile.getInitialARGs(); _9 < _10.length; _9++) {
                var arg = _10[_9];
                var property = arg.getProperty();
                if (property && docker_1.Util.rangeEquals(property.getNameRange(), definitionRange)) {
                    for (var _11 = 0, _12 = dockerfile.getFROMs(); _11 < _12.length; _11++) {
                        var from = _12[_11];
                        for (var _13 = 0, _14 = from.getVariables(); _13 < _14.length; _13++) {
                            var variable = _14[_13];
                            if (variable.getName() === definition) {
                                highlights.push(vscode_languageserver_types_1.DocumentHighlight.create(variable.getNameRange(), vscode_languageserver_types_1.DocumentHighlightKind.Read));
                            }
                        }
                    }
                }
            }
        }
        return highlights;
    };
    return DockerHighlight;
}());
exports.DockerHighlight = DockerHighlight;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
* Copyright (c) Remy Suen. All rights reserved.
* Licensed under the MIT License. See License.txt in the project root for license information.
* ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
var MarkdownDocumentation = /** @class */ (function () {
    function MarkdownDocumentation() {
        this.dockerMessages = {
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
            "hoverOnlineDocumentationFooter": "\n\n[Online documentation](${0})",
            "hoverAddFlagChown": "The username, groupname, or UID/GID combination to own the added content.",
            "hoverCopyFlagChown": "The username, groupname, or UID/GID combination to own the copied content.",
            "hoverCopyFlagFrom": "The previous build stage to use as the source location instead of the build's context.\n\nSince Docker 17.05.0-ce.",
            "hoverFromFlagPlatform": "The platform of the image if referencing a multi-platform image.\n\nSince Docker CE 18.04.",
            "hoverHealthcheckFlagInterval": "The seconds to wait for the health check to run after the container has started, and then again the number of seconds to wait before running again after the previous check has completed.",
            "hoverHealthcheckFlagRetries": "The number of consecutive failures of this health check before the container is considered to be `unhealthy`.",
            "hoverHealthcheckFlagStartPeriod": "The number of seconds to wait for the container to startup. Failures during this grace period will not count towards the maximum number of retries. However, should a health check succeed during this period then any subsequent failures will count towards the maximum number of retries.\n\nSince Docker 17.05.0-ce.",
            "hoverHealthcheckFlagTimeout": "The number of seconds to wait for the check to complete before considering it to have failed.",
            "proposalArgNameOnly": "Define a variable that users can set at build-time when using `docker build`.\n\n",
            "proposalArgDefaultValue": "Define a variable with the given default value that users can override at build-time when using `docker build`.\n\n",
            "proposalHealthcheckExec": "Define how Docker should test the container to check that it is still working. There can only be one `HEALTHCHECK` instruction in a `Dockerfile`.\n\nSince Docker 1.12\n\n",
            "proposalHealthcheckNone": "Disable the `HEALTHCHECK` instruction inherited from the base image if one exists. There can only be one `HEALTHCHECK` instruction in a `Dockerfile`.\n\nSince Docker 1.12"
        };
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
            }
        };
    }
    MarkdownDocumentation.prototype.formatMessage = function (text, variable) {
        return text.replace("${0}", variable);
    };
    /**
     * Retrieves the Markdown documentation for the given word.
     *
     * @param word the Dockerfile keyword or directive, must not be null
     */
    MarkdownDocumentation.prototype.getMarkdown = function (word) {
        return this.markdowns[word];
    };
    return MarkdownDocumentation;
}());
exports.MarkdownDocumentation = MarkdownDocumentation;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var languageService_1 = __webpack_require__(100);
var CommandIds;
(function (CommandIds) {
    CommandIds["LOWERCASE"] = "docker.command.convertToLowercase";
    CommandIds["UPPERCASE"] = "docker.command.convertToUppercase";
    CommandIds["EXTRA_ARGUMENT"] = "docker.command.removeExtraArgument";
    CommandIds["DIRECTIVE_TO_BACKTICK"] = "docker.command.directiveToBacktick";
    CommandIds["DIRECTIVE_TO_BACKSLASH"] = "docker.command.directiveToBackslash";
    CommandIds["FLAG_TO_CHOWN"] = "docker.command.flagToChown";
    CommandIds["FLAG_TO_COPY_FROM"] = "docker.command.flagToCopyFrom";
    CommandIds["FLAG_TO_HEALTHCHECK_INTERVAL"] = "docker.command.flagToHealthcheckInterval";
    CommandIds["FLAG_TO_HEALTHCHECK_RETRIES"] = "docker.command.flagToHealthcheckRetries";
    CommandIds["FLAG_TO_HEALTHCHECK_START_PERIOD"] = "docker.command.flagToHealthcheckStartPeriod";
    CommandIds["FLAG_TO_HEALTHCHECK_TIMEOUT"] = "docker.command.flagToHealthcheckTimeout";
    CommandIds["REMOVE_EMPTY_CONTINUATION_LINE"] = "docker.command.removeEmptyContinuationLine";
    CommandIds["CONVERT_TO_AS"] = "docker.command.convertToAS";
})(CommandIds = exports.CommandIds || (exports.CommandIds = {}));
var DockerfileLanguageServiceFactory;
(function (DockerfileLanguageServiceFactory) {
    function createLanguageService() {
        return new languageService_1.LanguageService();
    }
    DockerfileLanguageServiceFactory.createLanguageService = createLanguageService;
})(DockerfileLanguageServiceFactory = exports.DockerfileLanguageServiceFactory || (exports.DockerfileLanguageServiceFactory = {}));


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(78);
var util = __webpack_require__(101);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(81);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = __webpack_require__(109);
/**
 * A set of predefined token types. This set is not fixed
 * an clients can specify additional token types via the
 * corresponding client capabilities.
 *
 * @since 3.16.0 - Proposed state
 */
var SemanticTokenTypes;
(function (SemanticTokenTypes) {
    SemanticTokenTypes["comment"] = "comment";
    SemanticTokenTypes["keyword"] = "keyword";
    SemanticTokenTypes["string"] = "string";
    SemanticTokenTypes["number"] = "number";
    SemanticTokenTypes["regexp"] = "regexp";
    SemanticTokenTypes["operator"] = "operator";
    SemanticTokenTypes["namespace"] = "namespace";
    SemanticTokenTypes["type"] = "type";
    SemanticTokenTypes["struct"] = "struct";
    SemanticTokenTypes["class"] = "class";
    SemanticTokenTypes["interface"] = "interface";
    SemanticTokenTypes["enum"] = "enum";
    SemanticTokenTypes["typeParameter"] = "typeParameter";
    SemanticTokenTypes["function"] = "function";
    SemanticTokenTypes["member"] = "member";
    SemanticTokenTypes["property"] = "property";
    SemanticTokenTypes["marco"] = "marco";
    SemanticTokenTypes["variable"] = "variable";
    SemanticTokenTypes["parameter"] = "parameter";
    SemanticTokenTypes["label"] = "label";
})(SemanticTokenTypes = exports.SemanticTokenTypes || (exports.SemanticTokenTypes = {}));
/**
 * A set of predefined token modifiers. This set is not fixed
 * an clients can specify additional token types via the
 * corresponding client capabilities.
 *
 * @since 3.16.0 - Proposed state
 */
var SemanticTokenModifiers;
(function (SemanticTokenModifiers) {
    SemanticTokenModifiers["documentation"] = "documentation";
    SemanticTokenModifiers["declaration"] = "declaration";
    SemanticTokenModifiers["definition"] = "definition";
    SemanticTokenModifiers["reference"] = "reference";
    SemanticTokenModifiers["static"] = "static";
    SemanticTokenModifiers["abstract"] = "abstract";
    SemanticTokenModifiers["deprecated"] = "deprected";
    SemanticTokenModifiers["async"] = "async";
    SemanticTokenModifiers["volatile"] = "volatile";
    SemanticTokenModifiers["final"] = "final";
})(SemanticTokenModifiers = exports.SemanticTokenModifiers || (exports.SemanticTokenModifiers = {}));
/**
 * @since 3.16.0 - Proposed state
 */
var SemanticTokens;
(function (SemanticTokens) {
    function is(value) {
        const candidate = value;
        return candidate !== undefined && (candidate.resultId === undefined || typeof candidate.resultId === 'string') &&
            Array.isArray(candidate.data) && (candidate.data.length === 0 || typeof candidate.data[0] === 'number');
    }
    SemanticTokens.is = is;
})(SemanticTokens = exports.SemanticTokens || (exports.SemanticTokens = {}));
/**
 * @since 3.16.0 - Proposed state
 */
var SemanticTokensRequest;
(function (SemanticTokensRequest) {
    SemanticTokensRequest.method = 'textDocument/semanticTokens';
    SemanticTokensRequest.type = new messages_1.ProtocolRequestType(SemanticTokensRequest.method);
})(SemanticTokensRequest = exports.SemanticTokensRequest || (exports.SemanticTokensRequest = {}));
/**
 * @since 3.16.0 - Proposed state
 */
var SemanticTokensEditsRequest;
(function (SemanticTokensEditsRequest) {
    SemanticTokensEditsRequest.method = 'textDocument/semanticTokens/edits';
    SemanticTokensEditsRequest.type = new messages_1.ProtocolRequestType(SemanticTokensEditsRequest.method);
})(SemanticTokensEditsRequest = exports.SemanticTokensEditsRequest || (exports.SemanticTokensEditsRequest = {}));
/**
 * @since 3.16.0 - Proposed state
 */
var SemanticTokensRangeRequest;
(function (SemanticTokensRangeRequest) {
    SemanticTokensRangeRequest.method = 'textDocument/semanticTokens/range';
    SemanticTokensRangeRequest.type = new messages_1.ProtocolRequestType(SemanticTokensRangeRequest.method);
})(SemanticTokensRangeRequest = exports.SemanticTokensRangeRequest || (exports.SemanticTokensRangeRequest = {}));


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
var dockerfile_language_service_1 = __webpack_require__(63);
var protocol_sematicTokens_proposed_1 = __webpack_require__(65);
var LANGUAGE_ID = 'dockerfile';
// content to initialize the editor with
var content = "FROM node:alpine\nCOPY lib /docker-langserver/lib\nCOPY bin /docker-langserver/bin\nCOPY package.json /docker-langserver/package.json\nWORKDIR /docker-langserver/\nRUN npm install --production && \\\n    chmod +x /docker-langserver/bin/docker-langserver\nENTRYPOINT [ \"/docker-langserver/bin/docker-langserver\" ]";
// create the Monaco editor
var editor = monaco.editor.create(document.getElementById("container"), {
    language: LANGUAGE_ID,
    value: content,
    lightbulb: {
        enabled: true
    },
    'semanticHighlighting.enabled': true,
    formatOnType: true,
    theme: "vs"
});
var monacoModel = editor.getModel();
var MONACO_URI = monacoModel.uri;
var MODEL_URI = MONACO_URI.toString();
var LSP_URI = { uri: MODEL_URI };
var darkThemeMap = {
    "keyword": 0,
    "comment": 7,
    "parameter": 10,
    "property": 3,
    "label": 11,
    "class": 5,
    "marco": 6,
    "string": 5,
    "variable": {
        "declaration": 8,
        "definition": 8,
        "deprecated": 8,
        "reference": 4,
    }
};
function getStyleMetadataDark(type, modifiers) {
    var color = darkThemeMap[type];
    if (type === "variable") {
        color = darkThemeMap[type][modifiers[0]];
    }
    var style = {
        foreground: color,
        bold: false,
        underline: false,
        italic: false
    };
    if (true) {
        return style;
    }
}
;
var lightThemeMap = {
    "keyword": 0,
    "comment": 7,
    "parameter": 5,
    "property": 4,
    "label": 11,
    "class": 5,
    "marco": 3,
    "string": 11,
    "variable": {
        "declaration": 12,
        "definition": 12,
        "deprecated": 12,
        "reference": 13,
    }
};
function getStyleMetadataLight(type, modifiers) {
    var color = lightThemeMap[type];
    if (type === "variable") {
        color = lightThemeMap[type][modifiers[0]];
    }
    var style = {
        foreground: color,
        bold: false,
        underline: false,
        italic: false
    };
    if (true) {
        return style;
    }
}
;
monaco.editor.setTheme('vs');
editor._themeService._theme.getTokenStyleMetadata = getStyleMetadataLight;
monaco.editor.setTheme('vs-dark');
editor._themeService._theme.getTokenStyleMetadata = getStyleMetadataDark;
var service = dockerfile_language_service_1.DockerfileLanguageServiceFactory.createLanguageService();
service.setCapabilities({ completion: { completionItem: { snippetSupport: true } } });
function convertFormattingOptions(options) {
    return {
        tabSize: options.tabSize,
        insertSpaces: options.insertSpaces
    };
}
function convertHover(hover) {
    return {
        contents: [
            {
                value: hover.contents
            }
        ],
        range: hover.range === undefined ? undefined : convertProtocolRange(hover.range)
    };
}
function convertMonacoRange(range) {
    return {
        start: {
            line: range.startLineNumber - 1,
            character: range.startColumn - 1
        },
        end: {
            line: range.endLineNumber - 1,
            character: range.endColumn - 1
        }
    };
}
function convertPosition(line, character) {
    return {
        line: line - 1,
        character: character - 1
    };
}
function convertProtocolRange(range) {
    return {
        startLineNumber: range.start.line + 1,
        startColumn: range.start.character + 1,
        endLineNumber: range.end.line + 1,
        endColumn: range.end.character + 1,
    };
}
function convertLink(link) {
    return {
        range: convertProtocolRange(link.range),
        url: link.target,
    };
}
function convertTextEdit(edit) {
    return {
        range: convertProtocolRange(edit.range),
        text: edit.newText
    };
}
function convertTextEdits(edits) {
    return edits.map(convertTextEdit);
}
function convertParameter(parameter) {
    return {
        label: parameter.label,
        documentation: {
            value: parameter.documentation
        }
    };
}
function convertSignature(signature) {
    return {
        documentation: {
            value: signature.documentation
        },
        label: signature.label,
        parameters: signature.parameters ? signature.parameters.map(convertParameter) : []
    };
}
function convertToWorkspaceEdit(monacoEdits) {
    var workspaceEdits = monacoEdits.map(function (edit) {
        return {
            edit: edit,
            resource: MONACO_URI
        };
    });
    return {
        edits: workspaceEdits
    };
}
function convertCompletionItem(item) {
    item = service.resolveCompletionItem(item);
    return {
        label: item.label,
        documentation: {
            value: item.documentation
        },
        range: item.textEdit ? convertProtocolRange(item.textEdit.range) : undefined,
        kind: item.kind + 1,
        insertText: item.textEdit ? item.textEdit.newText : item.insertText,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    };
}
function convertMonacoCodeActionContext(context) {
    return {
        diagnostics: context.markers.map(function (marker) {
            var range = convertMonacoRange(marker);
            return {
                code: Number(marker.code),
                range: range
            };
        })
    };
}
monacoModel.onDidChangeContent(function () {
    var diagnostics = service.validate(monacoModel.getValue());
    var markers = diagnostics.map(function (diagnostic) {
        var range = convertProtocolRange(diagnostic.range);
        return {
            code: diagnostic.code !== undefined ? diagnostic.code.toString() : undefined,
            severity: diagnostic.severity === 1 ? monaco.MarkerSeverity.Error : monaco.MarkerSeverity.Warning,
            startLineNumber: range.startLineNumber,
            startColumn: range.startColumn,
            endLineNumber: range.endLineNumber,
            endColumn: range.endColumn,
            message: diagnostic.message,
            source: diagnostic.source,
        };
    });
    monaco.editor.setModelMarkers(monacoModel, LANGUAGE_ID, markers);
});
monaco.languages.registerDocumentSemanticTokensProvider(LANGUAGE_ID, {
    getLegend: function () {
        var tokenTypes = [];
        var tokenModifiers = [];
        tokenTypes.push(protocol_sematicTokens_proposed_1.SemanticTokenTypes.keyword);
        tokenTypes.push(protocol_sematicTokens_proposed_1.SemanticTokenTypes.comment);
        tokenTypes.push(protocol_sematicTokens_proposed_1.SemanticTokenTypes.parameter);
        tokenTypes.push(protocol_sematicTokens_proposed_1.SemanticTokenTypes.property);
        tokenTypes.push(protocol_sematicTokens_proposed_1.SemanticTokenTypes.label);
        tokenTypes.push(protocol_sematicTokens_proposed_1.SemanticTokenTypes.class);
        tokenTypes.push(protocol_sematicTokens_proposed_1.SemanticTokenTypes.marco);
        tokenTypes.push(protocol_sematicTokens_proposed_1.SemanticTokenTypes.string);
        tokenTypes.push(protocol_sematicTokens_proposed_1.SemanticTokenTypes.variable);
        tokenModifiers.push(protocol_sematicTokens_proposed_1.SemanticTokenModifiers.declaration);
        tokenModifiers.push(protocol_sematicTokens_proposed_1.SemanticTokenModifiers.definition);
        tokenModifiers.push(protocol_sematicTokens_proposed_1.SemanticTokenModifiers.deprecated);
        tokenModifiers.push(protocol_sematicTokens_proposed_1.SemanticTokenModifiers.reference);
        return {
            tokenModifiers: tokenModifiers,
            tokenTypes: tokenTypes
        };
    },
    provideDocumentSemanticTokens: function (model) {
        return service.computeSemanticTokens(model.getValue());
    },
    releaseDocumentSemanticTokens: function () {
        // nothing to do
    }
});
monaco.languages.registerCodeActionProvider(LANGUAGE_ID, {
    provideCodeActions: function (_model, range, context) {
        var commands = service.computeCodeActions(LSP_URI, convertMonacoRange(range), convertMonacoCodeActionContext(context));
        var codeActions = [];
        for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
            var command = commands_1[_i];
            var args = command.arguments ? command.arguments : [];
            var edits = service.computeCommandEdits(monacoModel.getValue(), command.command, args);
            codeActions.push({
                title: command.title,
                edit: convertToWorkspaceEdit(convertTextEdits(edits))
            });
        }
        return {
            actions: codeActions,
            dispose: function () { }
        };
    }
});
monaco.languages.registerCompletionItemProvider(LANGUAGE_ID, {
    triggerCharacters: ['=', ' ', '$', '-'],
    provideCompletionItems: function (model, position) {
        var lspPosition = convertPosition(position.lineNumber, position.column);
        var items = service.computeCompletionItems(model.getValue(), lspPosition);
        if (items.then) {
            return items.then(function (result) {
                return {
                    incomplete: false,
                    suggestions: result.map(convertCompletionItem)
                };
            });
        }
        return {
            incomplete: false,
            suggestions: items.map(convertCompletionItem)
        };
    },
});
monaco.languages.registerDefinitionProvider(LANGUAGE_ID, {
    provideDefinition: function (model, position) {
        var definition = service.computeDefinition(LSP_URI, model.getValue(), convertPosition(position.lineNumber, position.column));
        if (definition) {
            return {
                range: convertProtocolRange(definition.range),
                uri: MONACO_URI
            };
        }
        return null;
    }
});
monaco.languages.registerDocumentHighlightProvider(LANGUAGE_ID, {
    provideDocumentHighlights: function (model, position) {
        var highlightRanges = service.computeHighlightRanges(model.getValue(), convertPosition(position.lineNumber, position.column));
        return highlightRanges.map(function (highlightRange) {
            return {
                kind: highlightRange.kind ? highlightRange.kind - 1 : undefined,
                range: convertProtocolRange(highlightRange.range)
            };
        });
    }
});
monaco.languages.registerHoverProvider(LANGUAGE_ID, {
    provideHover: function (model, position) {
        var hover = service.computeHover(model.getValue(), convertPosition(position.lineNumber, position.column));
        return hover === null ? null : convertHover(hover);
    }
});
monaco.languages.registerDocumentSymbolProvider(LANGUAGE_ID, {
    provideDocumentSymbols: function (model) {
        var symbols = service.computeSymbols(LSP_URI, model.getValue());
        return symbols.map(function (symbol) {
            return {
                name: symbol.name,
                range: convertProtocolRange(symbol.location.range),
                kind: symbol.kind - 1
            };
        });
    }
});
monaco.languages.registerSignatureHelpProvider(LANGUAGE_ID, {
    signatureHelpTriggerCharacters: [' ', '-', '=', '[', ','],
    provideSignatureHelp: function (model, position) {
        var signatureHelp = service.computeSignatureHelp(model.getValue(), convertPosition(position.lineNumber, position.column));
        return {
            value: {
                activeParameter: signatureHelp.activeParameter !== undefined ? signatureHelp.activeParameter : undefined,
                activeSignature: signatureHelp.activeSignature !== undefined ? signatureHelp.activeSignature : undefined,
                signatures: signatureHelp.signatures.map(convertSignature)
            }
        };
    }
});
monaco.languages.registerRenameProvider(LANGUAGE_ID, {
    provideRenameEdits: function (model, position, newName) {
        var edits = service.computeRename(LSP_URI, model.getValue(), convertPosition(position.lineNumber, position.column), newName);
        var monacoEdits = convertTextEdits(edits);
        return convertToWorkspaceEdit(monacoEdits);
    }
});
monaco.languages.registerLinkProvider(LANGUAGE_ID, {
    provideLinks: function (model) {
        var links = service.computeLinks(model.getValue());
        return {
            links: links.map(function (link) {
                return convertLink(service.resolveLink(link));
            })
        };
    }
});
monaco.languages.registerDocumentFormattingEditProvider(LANGUAGE_ID, {
    provideDocumentFormattingEdits: function (model, options) {
        var edits = service.format(model.getValue(), convertFormattingOptions(options));
        return convertTextEdits(edits);
    }
});
monaco.languages.registerDocumentRangeFormattingEditProvider(LANGUAGE_ID, {
    provideDocumentRangeFormattingEdits: function (model, range, options) {
        var edits = service.formatRange(model.getValue(), convertMonacoRange(range), convertFormattingOptions(options));
        return convertTextEdits(edits);
    }
});
monaco.languages.registerOnTypeFormattingEditProvider(LANGUAGE_ID, {
    autoFormatTriggerCharacters: ['`', '\\'],
    provideOnTypeFormattingEdits: function (model, position, ch, options) {
        var edits = service.formatOnType(model.getValue(), convertPosition(position.lineNumber, position.column), ch, convertFormattingOptions(options));
        return convertTextEdits(edits);
    }
});
//# sourceMappingURL=client.js.map

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
window.onload = function () {
    var w = window;
    // load Monaco code
    w.require(['vs/editor/editor.main'], function () {
        // load client code
        __webpack_require__(66);
    });
};
//# sourceMappingURL=main.js.map

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = ((uint8[i] << 16) & 0xFF0000) + ((uint8[i + 1] << 8) & 0xFF00) + (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = {
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Unordered Collection",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "509": "Bandwidth Limit Exceeded",
  "510": "Not Extended",
  "511": "Network Authentication Required"
}


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_types_1 = __webpack_require__(0);
const ast = __webpack_require__(1);
const imageTemplate_1 = __webpack_require__(71);
const from_1 = __webpack_require__(14);
const util_1 = __webpack_require__(7);
const main_1 = __webpack_require__(1);
class Dockerfile extends imageTemplate_1.ImageTemplate {
    constructor(document) {
        super();
        this.initialInstructions = new imageTemplate_1.ImageTemplate();
        this.buildStages = [];
        this.directives = [];
        /**
         * Whether a FROM instruction has been added to this Dockerfile or not.
         */
        this.foundFrom = false;
        this.document = document;
    }
    getEscapeCharacter() {
        for (const directive of this.directives) {
            if (directive.getDirective() === ast.Directive.escape) {
                const value = directive.getValue();
                if (value === '\\' || value === '`') {
                    return value;
                }
            }
        }
        return '\\';
    }
    getInitialARGs() {
        return this.initialInstructions.getARGs();
    }
    getContainingImage(position) {
        let range = vscode_languageserver_types_1.Range.create(vscode_languageserver_types_1.Position.create(0, 0), this.document.positionAt(this.document.getText().length));
        if (!util_1.Util.isInsideRange(position, range)) {
            // not inside the document, invalid position
            return null;
        }
        if (this.initialInstructions.getComments().length > 0 || this.initialInstructions.getInstructions().length > 0) {
            if (util_1.Util.isInsideRange(position, this.initialInstructions.getRange())) {
                return this.initialInstructions;
            }
        }
        for (const buildStage of this.buildStages) {
            if (util_1.Util.isInsideRange(position, buildStage.getRange())) {
                return buildStage;
            }
        }
        return this;
    }
    addInstruction(instruction) {
        if (instruction.getKeyword() === main_1.Keyword.FROM) {
            this.currentBuildStage = new imageTemplate_1.ImageTemplate();
            this.buildStages.push(this.currentBuildStage);
            this.foundFrom = true;
        }
        else if (!this.foundFrom) {
            this.initialInstructions.addInstruction(instruction);
        }
        if (this.foundFrom) {
            this.currentBuildStage.addInstruction(instruction);
        }
        super.addInstruction(instruction);
    }
    setDirectives(directives) {
        this.directives = directives;
    }
    getDirective() {
        return this.directives.length === 0 ? null : this.directives[0];
    }
    getDirectives() {
        return this.directives;
    }
    resolveVariable(variable, line) {
        for (let from of this.getFROMs()) {
            let range = from.getRange();
            if (range.start.line <= line && line <= range.end.line) {
                // resolve the FROM variable against the initial ARGs
                let initialARGs = new imageTemplate_1.ImageTemplate();
                for (let instruction of this.initialInstructions.getARGs()) {
                    initialARGs.addInstruction(instruction);
                }
                return initialARGs.resolveVariable(variable, line);
            }
        }
        let image = this.getContainingImage(vscode_languageserver_types_1.Position.create(line, 0));
        if (image === null) {
            return undefined;
        }
        let resolvedVariable = image.resolveVariable(variable, line);
        if (resolvedVariable === null) {
            // refers to an uninitialized ARG variable,
            // try resolving it against the initial ARGs then
            let initialARGs = new imageTemplate_1.ImageTemplate();
            for (let instruction of this.initialInstructions.getARGs()) {
                initialARGs.addInstruction(instruction);
            }
            return initialARGs.resolveVariable(variable, line);
        }
        return resolvedVariable;
    }
    getAvailableVariables(currentLine) {
        if (this.getInstructionAt(currentLine) instanceof from_1.From) {
            let variables = [];
            for (let arg of this.getInitialARGs()) {
                let property = arg.getProperty();
                if (property) {
                    variables.push(property.getName());
                }
            }
            return variables;
        }
        let image = this.getContainingImage(vscode_languageserver_types_1.Position.create(currentLine, 0));
        return image ? image.getAvailableVariables(currentLine) : [];
    }
    /**
     * Internally reorganize the comments in the Dockerfile and allocate
     * them to the relevant build stages that they belong to.
     */
    organizeComments() {
        const comments = this.getComments();
        for (let i = 0; i < comments.length; i++) {
            if (util_1.Util.isInsideRange(comments[i].getRange().end, this.initialInstructions.getRange())) {
                this.initialInstructions.addComment(comments[i]);
            }
            else {
                for (const buildStage of this.buildStages) {
                    if (util_1.Util.isInsideRange(comments[i].getRange().start, buildStage.getRange())) {
                        buildStage.addComment(comments[i]);
                    }
                }
            }
        }
    }
    getRange() {
        const comments = this.getComments();
        const instructions = this.getInstructions();
        let range = null;
        if (comments.length === 0) {
            if (instructions.length > 0) {
                range = vscode_languageserver_types_1.Range.create(instructions[0].getRange().start, instructions[instructions.length - 1].getRange().end);
            }
        }
        else if (instructions.length === 0) {
            range = vscode_languageserver_types_1.Range.create(comments[0].getRange().start, comments[comments.length - 1].getRange().end);
        }
        else {
            const commentStart = comments[0].getRange().start;
            const commentEnd = comments[comments.length - 1].getRange().end;
            const instructionStart = instructions[0].getRange().start;
            const instructionEnd = instructions[instructions.length - 1].getRange().end;
            if (commentStart.line < instructionStart.line) {
                if (commentEnd.line < instructionEnd.line) {
                    range = vscode_languageserver_types_1.Range.create(commentStart, instructionEnd);
                }
                range = vscode_languageserver_types_1.Range.create(commentStart, commentEnd);
            }
            else if (commentEnd.line < instructionEnd.line) {
                range = vscode_languageserver_types_1.Range.create(instructionStart, instructionEnd);
            }
            else {
                range = vscode_languageserver_types_1.Range.create(instructionStart, commentEnd);
            }
        }
        if (range === null) {
            if (this.directives.length === 0) {
                return null;
            }
            return this.directives[0].getRange();
        }
        else if (this.directives.length === 0) {
            return range;
        }
        return vscode_languageserver_types_1.Range.create(this.directives[0].getRange().start, range.end);
    }
}
exports.Dockerfile = Dockerfile;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_types_1 = __webpack_require__(0);
const arg_1 = __webpack_require__(21);
const cmd_1 = __webpack_require__(22);
const copy_1 = __webpack_require__(23);
const env_1 = __webpack_require__(25);
const entrypoint_1 = __webpack_require__(24);
const from_1 = __webpack_require__(14);
const healthcheck_1 = __webpack_require__(26);
const onbuild_1 = __webpack_require__(27);
const util_1 = __webpack_require__(7);
class ImageTemplate {
    constructor() {
        this.comments = [];
        this.instructions = [];
    }
    addComment(comment) {
        this.comments.push(comment);
    }
    getComments() {
        return this.comments;
    }
    addInstruction(instruction) {
        this.instructions.push(instruction);
    }
    getInstructions() {
        return this.instructions;
    }
    getInstructionAt(line) {
        for (let instruction of this.instructions) {
            if (util_1.Util.isInsideRange(vscode_languageserver_types_1.Position.create(line, 0), instruction.getRange())) {
                return instruction;
            }
        }
        return null;
    }
    /**
     * Gets all the ARG instructions that are defined in this image.
     */
    getARGs() {
        let args = [];
        for (let instruction of this.instructions) {
            if (instruction instanceof arg_1.Arg) {
                args.push(instruction);
            }
        }
        return args;
    }
    /**
     * Gets all the CMD instructions that are defined in this image.
     */
    getCMDs() {
        let cmds = [];
        for (let instruction of this.instructions) {
            if (instruction instanceof cmd_1.Cmd) {
                cmds.push(instruction);
            }
        }
        return cmds;
    }
    /**
     * Gets all the COPY instructions that are defined in this image.
     */
    getCOPYs() {
        let copies = [];
        for (let instruction of this.instructions) {
            if (instruction instanceof copy_1.Copy) {
                copies.push(instruction);
            }
        }
        return copies;
    }
    /**
     * Gets all the ENTRYPOINT instructions that are defined in this image.
     */
    getENTRYPOINTs() {
        let froms = [];
        for (let instruction of this.instructions) {
            if (instruction instanceof entrypoint_1.Entrypoint) {
                froms.push(instruction);
            }
        }
        return froms;
    }
    /**
     * Gets all the ENV instructions that are defined in this image.
     */
    getENVs() {
        let args = [];
        for (let instruction of this.instructions) {
            if (instruction instanceof env_1.Env) {
                args.push(instruction);
            }
        }
        return args;
    }
    /**
     * Gets all the FROM instructions that are defined in this image.
     */
    getFROMs() {
        let froms = [];
        for (let instruction of this.instructions) {
            if (instruction instanceof from_1.From) {
                froms.push(instruction);
            }
        }
        return froms;
    }
    /**
     * Gets all the HEALTHCHECK instructions that are defined in this image.
     */
    getHEALTHCHECKs() {
        let froms = [];
        for (let instruction of this.instructions) {
            if (instruction instanceof healthcheck_1.Healthcheck) {
                froms.push(instruction);
            }
        }
        return froms;
    }
    getOnbuildTriggers() {
        let triggers = [];
        for (let instruction of this.instructions) {
            if (instruction instanceof onbuild_1.Onbuild) {
                let trigger = instruction.getTriggerInstruction();
                if (trigger) {
                    triggers.push(trigger);
                }
            }
        }
        return triggers;
    }
    getAvailableVariables(currentLine) {
        const variables = [];
        for (const arg of this.getARGs()) {
            if (arg.isBefore(currentLine)) {
                const property = arg.getProperty();
                if (property) {
                    const variable = property.getName();
                    if (variables.indexOf(variable) === -1) {
                        variables.push(variable);
                    }
                }
            }
        }
        for (const env of this.getENVs()) {
            if (env.isBefore(currentLine)) {
                for (const property of env.getProperties()) {
                    const variable = property.getName();
                    if (variables.indexOf(variable) === -1) {
                        variables.push(variable);
                    }
                }
            }
        }
        return variables;
    }
    /**
     * Resolves a variable with the given name at the specified line
     * to its value. If null is returned, then the variable has been
     * defined but no value was given. If undefined is returned, then
     * a variable with the given name has not been defined yet as of
     * the given line.
     *
     * @param variable the name of the variable to resolve
     * @param line the line number that the variable is on, zero-based
     * @return the value of the variable as defined by an ARG or ENV
     *         instruction, or null if no value has been specified, or
     *         undefined if a variable with the given name has not
     *         been defined
     */
    resolveVariable(variable, line) {
        let envs = this.getENVs();
        for (let i = envs.length - 1; i >= 0; i--) {
            if (envs[i].isBefore(line)) {
                for (let property of envs[i].getProperties()) {
                    if (property.getName() === variable) {
                        return property.getValue();
                    }
                }
            }
        }
        let args = this.getARGs();
        for (let i = args.length - 1; i >= 0; i--) {
            if (args[i].isBefore(line)) {
                let property = args[i].getProperty();
                if (property && property.getName() === variable) {
                    return property.getValue();
                }
            }
        }
        return undefined;
    }
    getRange() {
        const instructions = this.getInstructions();
        if (instructions.length === 0) {
            // all templates should have instructions, this only happens for
            // the initial set of instruction
            return vscode_languageserver_types_1.Range.create(0, 0, 0, 0);
        }
        const instructionStart = instructions[0].getRange().start;
        const instructionEnd = instructions[instructions.length - 1].getRange().end;
        return vscode_languageserver_types_1.Range.create(instructionStart, instructionEnd);
    }
    contains(position) {
        const range = this.getRange();
        if (range === null) {
            return false;
        }
        return util_1.Util.isInsideRange(position, range);
    }
}
exports.ImageTemplate = ImageTemplate;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_types_1 = __webpack_require__(32);
const dockerfile_ast_1 = __webpack_require__(1);
class DockerFormatter {
    getIndentation(formattingOptions) {
        let indentation = "\t";
        if (formattingOptions && formattingOptions.insertSpaces) {
            indentation = "";
            for (let i = 0; i < formattingOptions.tabSize; i++) {
                indentation = indentation + " ";
            }
        }
        return indentation;
    }
    /**
     * Creates a TextEdit for formatting the given document.
     *
     * @param document the document being formatted
     * @param start the start offset of the document's content to be replaced
     * @param end the end offset of the document's content to be replaced
     * @param indent true if this block should be replaced with an indentation, false otherwise
     * @param indentation the string to use for an indentation
     */
    createFormattingEdit(document, start, end, indent, indentation) {
        if (indent) {
            return vscode_languageserver_types_1.TextEdit.replace({
                start: document.positionAt(start),
                end: document.positionAt(end)
            }, indentation);
        }
        else {
            return vscode_languageserver_types_1.TextEdit.del({
                start: document.positionAt(start),
                end: document.positionAt(end)
            });
        }
    }
    formatOnType(document, position, ch, options) {
        const dockerfile = dockerfile_ast_1.DockerfileParser.parse(document.getText());
        // check that the inserted character is the escape character
        if (dockerfile.getEscapeCharacter() === ch) {
            for (let comment of dockerfile.getComments()) {
                // ignore if we're in a comment
                if (comment.getRange().start.line === position.line) {
                    return [];
                }
            }
            const directive = dockerfile.getDirective();
            // ignore if we're in the parser directive
            if (directive && position.line === 0) {
                return [];
            }
            const content = document.getText();
            validityCheck: for (let i = document.offsetAt(position); i < content.length; i++) {
                switch (content.charAt(i)) {
                    case ' ':
                    case '\t':
                        break;
                    case '\r':
                    case '\n':
                        break validityCheck;
                    default:
                        // not escaping a newline, no need to format the next line
                        return [];
                }
            }
            const lines = [position.line + 1];
            const indentedLines = [];
            indentedLines[lines[0]] = true;
            return this.formatLines(document, document.getText(), lines, indentedLines, options);
        }
        return [];
    }
    formatRange(document, range, options) {
        const lines = [];
        for (let i = range.start.line; i <= range.end.line; i++) {
            lines.push(i);
        }
        return this.format(document, lines, options);
    }
    formatDocument(document, options) {
        const lines = [];
        for (let i = 0; i < document.lineCount; i++) {
            lines.push(i);
        }
        return this.format(document, lines, options);
    }
    /**
     * Formats the specified lines of the given document based on the
     * provided formatting options.
     *
     * @param document the text document to format
     * @param lines the lines to format
     * @param options the formatting options to use to perform the format
     * @return the text edits to apply to format the lines of the document
     */
    format(document, lines, options) {
        let content = document.getText();
        let dockerfile = dockerfile_ast_1.DockerfileParser.parse(content);
        const indentedLines = [];
        for (let i = 0; i < document.lineCount; i++) {
            indentedLines[i] = false;
        }
        for (let instruction of dockerfile.getInstructions()) {
            let range = instruction.getRange();
            indentedLines[range.start.line] = false;
            for (let i = range.start.line + 1; i <= range.end.line; i++) {
                indentedLines[i] = true;
            }
        }
        return this.formatLines(document, content, lines, indentedLines, options);
    }
    formatLines(document, content, lines, indentedLines, options) {
        const indentation = this.getIndentation(options);
        const edits = [];
        lineCheck: for (let line of lines) {
            let startOffset = document.offsetAt(vscode_languageserver_types_1.Position.create(line, 0));
            for (let i = startOffset; i < content.length; i++) {
                switch (content.charAt(i)) {
                    case ' ':
                    case '\t':
                        break;
                    case '\r':
                    case '\n':
                        if (i !== startOffset) {
                            // only whitespace on this line, trim it
                            let edit = vscode_languageserver_types_1.TextEdit.del({
                                start: document.positionAt(startOffset),
                                end: document.positionAt(i)
                            });
                            edits.push(edit);
                        }
                        // process the next line
                        continue lineCheck;
                    default:
                        // found a line that should be indented
                        if (indentedLines[line]) {
                            const originalIndentation = document.getText().substring(startOffset, i);
                            // change the indentation if it's not what we expect
                            if (originalIndentation !== indentation) {
                                const edit = this.createFormattingEdit(document, startOffset, i, indentedLines[line], indentation);
                                edits.push(edit);
                            }
                        }
                        else if (i !== startOffset) {
                            // non-whitespace character encountered, realign
                            const edit = this.createFormattingEdit(document, startOffset, i, indentedLines[line], indentation);
                            edits.push(edit);
                        }
                        // process the next line
                        continue lineCheck;
                }
            }
            if (startOffset < content.length) {
                // only whitespace on the last line, trim it
                let edit = vscode_languageserver_types_1.TextEdit.del({
                    start: document.positionAt(startOffset),
                    end: document.positionAt(content.length)
                });
                edits.push(edit);
            }
        }
        return edits;
    }
}
exports.DockerFormatter = DockerFormatter;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
const vscode_languageserver_types_1 = __webpack_require__(32);
const dockerfile_ast_1 = __webpack_require__(1);
const main_1 = __webpack_require__(29);
exports.KEYWORDS = [
    "ADD",
    "ARG",
    "CMD",
    "COPY",
    "ENTRYPOINT",
    "ENV",
    "EXPOSE",
    "FROM",
    "HEALTHCHECK",
    "LABEL",
    "MAINTAINER",
    "ONBUILD",
    "RUN",
    "SHELL",
    "STOPSIGNAL",
    "USER",
    "VOLUME",
    "WORKDIR"
];
class Validator {
    constructor(settings) {
        this.settings = {
            deprecatedMaintainer: main_1.ValidationSeverity.WARNING,
            directiveCasing: main_1.ValidationSeverity.WARNING,
            emptyContinuationLine: main_1.ValidationSeverity.WARNING,
            instructionCasing: main_1.ValidationSeverity.WARNING,
            instructionCmdMultiple: main_1.ValidationSeverity.WARNING,
            instructionEntrypointMultiple: main_1.ValidationSeverity.WARNING,
            instructionHealthcheckMultiple: main_1.ValidationSeverity.WARNING,
            instructionJSONInSingleQuotes: main_1.ValidationSeverity.WARNING,
            instructionWorkdirRelative: main_1.ValidationSeverity.WARNING
        };
        if (settings) {
            this.settings = settings;
        }
    }
    checkDirectives(dockerfile, problems) {
        const duplicatedEscapes = [];
        for (const directive of dockerfile.getDirectives()) {
            if (directive.getDirective() === dockerfile_ast_1.Directive.escape) {
                duplicatedEscapes.push(directive);
            }
        }
        if (duplicatedEscapes.length > 1) {
            // multiple escape parser directives have been found
            for (const directive of duplicatedEscapes) {
                problems.push(Validator.createDuplicatedEscapeDirective(directive.getNameRange().start, directive.getValueRange().end));
            }
            return;
        }
        for (const directive of dockerfile.getDirectives()) {
            const directiveName = directive.getDirective();
            if (directiveName === dockerfile_ast_1.Directive.escape) {
                const value = directive.getValue();
                if (value !== '\\' && value !== '`' && value !== "") {
                    // if the directive's value is invalid or isn't the empty string, flag it
                    const range = directive.getValueRange();
                    problems.push(Validator.createInvalidEscapeDirective(range.start, range.end, value));
                }
                if (directive.getName() !== dockerfile_ast_1.Directive.escape) {
                    const range = directive.getNameRange();
                    const diagnostic = this.createLowercaseDirective(range.start, range.end);
                    if (diagnostic) {
                        problems.push(diagnostic);
                    }
                }
            }
        }
    }
    /**
     * Checks the arguments of the given instruction.
     *
     * @param instruction the instruction to validate
     * @param problems an array of identified problems in the document
     * @param expectedArgCount an array of expected number of arguments
     *                         for the instruction, if its length is 1
     *                         and its value is -1, any number of
     *                         arguments greater than zero is valid
     * @param validate the function to use to validate an argument
     * @param createIncompleteDiagnostic the function to use to create a diagnostic
     *                                   if the number of arguments is incorrect
     */
    checkArguments(instruction, problems, expectedArgCount, validate, createIncompleteDiagnostic) {
        let args = instruction instanceof dockerfile_ast_1.PropertyInstruction ? instruction.getPropertyArguments() : instruction.getArguments();
        if (args.length === 0) {
            // all instructions are expected to have at least one argument
            let range = instruction.getInstructionRange();
            problems.push(Validator.createMissingArgument(range.start, range.end));
        }
        else if (expectedArgCount[0] === -1) {
            for (let i = 0; i < args.length; i++) {
                let createInvalidDiagnostic = validate(i, args[i].getValue(), args[i].getRange());
                if (createInvalidDiagnostic) {
                    let range = args[i].getRange();
                    problems.push(createInvalidDiagnostic(range.start, range.end, args[i].getValue()));
                }
            }
        }
        else {
            for (let i = 0; i < expectedArgCount.length; i++) {
                if (expectedArgCount[i] === args.length) {
                    for (let j = 0; j < args.length; j++) {
                        let range = args[j].getRange();
                        let createInvalidDiagnostic = validate(j, args[j].getValue(), range);
                        if (createInvalidDiagnostic instanceof Function) {
                            problems.push(createInvalidDiagnostic(range.start, range.end, args[j].getValue()));
                        }
                        else if (createInvalidDiagnostic !== null) {
                            problems.push(createInvalidDiagnostic);
                        }
                    }
                    return;
                }
            }
            let range = args[args.length - 1].getRange();
            if (createIncompleteDiagnostic) {
                problems.push(createIncompleteDiagnostic(range.start, range.end));
            }
            else {
                problems.push(Validator.createExtraArgument(range.start, range.end));
            }
        }
    }
    checkVariables(instruction, problems) {
        for (let variable of instruction.getVariables()) {
            let modifier = variable.getModifier();
            if (modifier !== null) {
                if (instruction.getKeyword() === dockerfile_ast_1.Keyword.RUN) {
                    // allow shell expansions to go through for RUN instructions
                    continue;
                }
                else if (modifier === "") {
                    problems.push(Validator.createVariableUnsupportedModifier(variable.getRange(), variable.toString(), modifier));
                }
                else if (modifier !== '+' && modifier !== '-') {
                    problems.push(Validator.createVariableUnsupportedModifier(variable.getModifierRange(), variable.toString(), modifier));
                }
            }
        }
    }
    checkProperty(document, escapeChar, keyword, property, firstProperty, optionalValue, problems) {
        let name = property.getName();
        if (name === "") {
            let range = property.getRange();
            problems.push(Validator.createSyntaxMissingNames(range.start, range.end, keyword));
        }
        else if (name.indexOf('=') !== -1) {
            let nameRange = property.getNameRange();
            let unescapedName = document.getText(nameRange);
            let index = unescapedName.indexOf('=');
            if (unescapedName.charAt(0) === '\'') {
                problems.push(Validator.createSyntaxMissingSingleQuote(nameRange.start, document.positionAt(document.offsetAt(nameRange.start) + index), unescapedName.substring(0, unescapedName.indexOf('='))));
            }
            else if (unescapedName.charAt(0) === '"') {
                problems.push(Validator.createSyntaxMissingDoubleQuote(nameRange.start, document.positionAt(document.offsetAt(nameRange.start) + index), unescapedName.substring(0, unescapedName.indexOf('='))));
            }
            return;
        }
        let value = property.getValue();
        if (value === null) {
            if (!optionalValue) {
                let range = property.getNameRange();
                if (firstProperty) {
                    problems.push(Validator.createENVRequiresTwoArguments(range.start, range.end));
                }
                else {
                    problems.push(Validator.createSyntaxMissingEquals(range.start, range.end, name));
                }
            }
        }
        else if (value.charAt(0) === '"') {
            let found = false;
            for (let i = 1; i < value.length; i++) {
                switch (value.charAt(i)) {
                    case escapeChar:
                        i++;
                        break;
                    case '"':
                        if (i === value.length - 1) {
                            found = true;
                        }
                        break;
                }
            }
            if (!found) {
                let range = property.getValueRange();
                problems.push(Validator.createSyntaxMissingDoubleQuote(range.start, range.end, property.getUnescapedValue()));
            }
        }
        else if (value.charAt(0) === '\'' && value.charAt(value.length - 1) !== '\'') {
            let range = property.getValueRange();
            problems.push(Validator.createSyntaxMissingSingleQuote(range.start, range.end, value));
        }
    }
    validate(document) {
        this.document = document;
        let problems = [];
        let dockerfile = dockerfile_ast_1.DockerfileParser.parse(document.getText());
        this.checkDirectives(dockerfile, problems);
        let instructions = dockerfile.getInstructions();
        if (instructions.length === 0 || dockerfile.getARGs().length === instructions.length) {
            // no instructions in this file, or only ARGs
            problems.push(Validator.createNoSourceImage(document.positionAt(0), document.positionAt(0)));
        }
        let cmds = [];
        let entrypoints = [];
        let healthchecks = [];
        let duplicates = [];
        for (let instruction of instructions) {
            if (instruction instanceof dockerfile_ast_1.Cmd) {
                cmds.push(instruction);
            }
            else if (instruction instanceof dockerfile_ast_1.Entrypoint) {
                entrypoints.push(instruction);
            }
            else if (instruction instanceof dockerfile_ast_1.Healthcheck) {
                healthchecks.push(instruction);
            }
            else if (instruction instanceof dockerfile_ast_1.From) {
                if (cmds.length > 1) {
                    duplicates = duplicates.concat(cmds);
                }
                if (entrypoints.length > 1) {
                    duplicates = duplicates.concat(entrypoints);
                }
                if (healthchecks.length > 1) {
                    duplicates = duplicates.concat(healthchecks);
                }
                cmds = [];
                entrypoints = [];
                healthchecks = [];
            }
        }
        if (cmds.length > 1) {
            duplicates = duplicates.concat(cmds);
        }
        if (entrypoints.length > 1) {
            duplicates = duplicates.concat(entrypoints);
        }
        if (healthchecks.length > 1) {
            duplicates = duplicates.concat(healthchecks);
        }
        for (let duplicate of duplicates) {
            if (duplicate instanceof dockerfile_ast_1.Cmd) {
                // more than one CMD found, warn the user
                let diagnostic = this.createMultipleInstructions(duplicate.getInstructionRange(), this.settings.instructionCmdMultiple, "CMD");
                if (diagnostic) {
                    problems.push(diagnostic);
                }
            }
            else if (duplicate instanceof dockerfile_ast_1.Entrypoint) {
                // more than one ENTRYPOINT found, warn the user
                let diagnostic = this.createMultipleInstructions(duplicate.getInstructionRange(), this.settings.instructionEntrypointMultiple, "ENTRYPOINT");
                if (diagnostic) {
                    problems.push(diagnostic);
                }
            }
            else {
                // more than one HEALTHCHECK found, warn the user
                let diagnostic = this.createMultipleInstructions(duplicate.getInstructionRange(), this.settings.instructionHealthcheckMultiple, "HEALTHCHECK");
                if (diagnostic) {
                    problems.push(diagnostic);
                }
            }
        }
        const names = {};
        const froms = dockerfile.getFROMs();
        for (let from of froms) {
            let name = from.getBuildStage();
            if (name) {
                name = name.toLowerCase();
                if (!names[name]) {
                    names[name] = [];
                }
                names[name].push(from.getBuildStageRange());
            }
        }
        for (let name in names) {
            // duplicates found
            if (names[name].length > 1) {
                for (let range of names[name]) {
                    problems.push(Validator.createDuplicateBuildStageName(range, name));
                }
            }
        }
        let escapeChar = dockerfile.getEscapeCharacter();
        let hasFrom = false;
        for (let instruction of dockerfile.getInstructions()) {
            let keyword = instruction.getKeyword();
            if (keyword === "FROM") {
                hasFrom = true;
            }
            else if (!hasFrom && keyword !== "ARG") {
                // first non-ARG instruction is not a FROM
                let range = instruction.getInstructionRange();
                problems.push(Validator.createNoSourceImage(range.start, range.end));
                hasFrom = true;
            }
            this.validateInstruction(document, escapeChar, instruction, keyword, false, problems);
            this.checkVariables(instruction, problems);
        }
        for (let instruction of dockerfile.getOnbuildTriggers()) {
            this.validateInstruction(document, escapeChar, instruction, instruction.getKeyword(), true, problems);
        }
        return problems;
    }
    validateInstruction(document, escapeChar, instruction, keyword, isTrigger, problems) {
        if (exports.KEYWORDS.indexOf(keyword) === -1) {
            let range = instruction.getInstructionRange();
            // invalid instruction found
            problems.push(Validator.createUnknownInstruction(range.start, range.end, keyword));
        }
        else {
            if (keyword !== instruction.getInstruction()) {
                let range = instruction.getInstructionRange();
                // warn about uppercase convention if the keyword doesn't match the actual instruction
                let diagnostic = this.createUppercaseInstruction(range.start, range.end);
                if (diagnostic) {
                    problems.push(diagnostic);
                }
            }
            if (keyword === "MAINTAINER") {
                let range = instruction.getInstructionRange();
                let diagnostic = this.createMaintainerDeprecated(range.start, range.end);
                if (diagnostic) {
                    problems.push(diagnostic);
                }
            }
            const fullRange = instruction.getRange();
            if (fullRange.start.line !== fullRange.end.line && !isTrigger) {
                // if the instruction spans multiple lines, check for empty newlines
                const content = document.getText();
                const endingLine = fullRange.end.line;
                let start = -1;
                for (let i = fullRange.start.line; i <= endingLine; i++) {
                    const lineContent = content.substring(document.offsetAt(vscode_languageserver_types_1.Position.create(i, 0)), document.offsetAt(vscode_languageserver_types_1.Position.create(i + 1, 0)));
                    if (lineContent.trim().length === 0) {
                        if (start === -1) {
                            start = i;
                            continue;
                        }
                    }
                    else if (start !== -1) {
                        const diagnostic = Validator.createEmptyContinuationLine(vscode_languageserver_types_1.Position.create(start, 0), vscode_languageserver_types_1.Position.create(i, 0), this.settings.emptyContinuationLine);
                        if (diagnostic) {
                            problems.push(diagnostic);
                        }
                        start = -1;
                    }
                }
                if (start !== -1) {
                    const diagnostic = Validator.createEmptyContinuationLine(vscode_languageserver_types_1.Position.create(start, 0), vscode_languageserver_types_1.Position.create(endingLine + 1, 0), this.settings.emptyContinuationLine);
                    if (diagnostic) {
                        problems.push(diagnostic);
                    }
                    start = -1;
                }
            }
            switch (keyword) {
                case "CMD":
                    this.checkJSONQuotes(instruction, problems);
                    break;
                case "ENTRYPOINT":
                case "RUN":
                case "VOLUME":
                    this.checkArguments(instruction, problems, [-1], function () {
                        return null;
                    });
                    this.checkJSONQuotes(instruction, problems);
                    break;
                case "ARG":
                    this.checkArguments(instruction, problems, [-1], function (index) {
                        if (index > 0) {
                            return Validator.createARGRequiresOneArgument;
                        }
                        return null;
                    }, Validator.createARGRequiresOneArgument);
                    let arg = instruction;
                    let argProperty = arg.getProperty();
                    if (argProperty) {
                        this.checkProperty(document, escapeChar, keyword, argProperty, true, true, problems);
                    }
                    break;
                case "ENV":
                case "LABEL":
                    this.checkArguments(instruction, problems, [-1], function () {
                        return null;
                    });
                    let properties = instruction.getProperties();
                    if (properties.length === 1) {
                        this.checkProperty(document, escapeChar, keyword, properties[0], true, false, problems);
                    }
                    else if (properties.length !== 0) {
                        for (let property of properties) {
                            this.checkProperty(document, escapeChar, keyword, property, false, false, problems);
                        }
                    }
                    break;
                case "FROM":
                    const fromFlags = instruction.getFlags();
                    for (const flag of fromFlags) {
                        const flagName = flag.getName();
                        if (flagName !== "platform") {
                            const range = flag.getRange();
                            problems.push(Validator.createUnknownFromFlag(range.start, flagName === "" ? range.end : flag.getNameRange().end, flag.getName()));
                        }
                    }
                    this.checkFlagValue(fromFlags, ["platform"], problems);
                    this.checkArguments(instruction, problems, [1, 3], function (index, argument, range) {
                        switch (index) {
                            case 0:
                                let variables = instruction.getVariables();
                                if (variables.length > 0) {
                                    let variableRange = variables[0].getRange();
                                    if (variableRange.start.line === range.start.line
                                        && variableRange.start.character === range.start.character
                                        && variableRange.end.line === range.end.line
                                        && variableRange.end.character === range.end.character) {
                                        if (!variables[0].isDefined()) {
                                            return Validator.createBaseNameEmpty(variableRange, variables[0].toString());
                                        }
                                    }
                                    return null;
                                }
                                let from = instruction;
                                let digestRange = from.getImageDigestRange();
                                if (digestRange === null) {
                                    let tagRange = from.getImageTagRange();
                                    if (tagRange === null) {
                                        return null;
                                    }
                                    let tag = document.getText(tagRange);
                                    if (tag === "") {
                                        // no tag specified, just highlight the whole argument
                                        return Validator.createInvalidReferenceFormat(range);
                                    }
                                    let tagRegexp = new RegExp(/^[\w][\w.-]{0,127}$/);
                                    if (tagRegexp.test(tag)) {
                                        return null;
                                    }
                                    return Validator.createInvalidReferenceFormat(from.getImageTagRange());
                                }
                                let digest = document.getText(digestRange);
                                let algorithmIndex = digest.indexOf(':');
                                if (algorithmIndex === -1) {
                                    if (digest === "") {
                                        // no digest specified, just highlight the whole argument
                                        return Validator.createInvalidReferenceFormat(range);
                                    }
                                    return Validator.createInvalidReferenceFormat(from.getImageDigestRange());
                                }
                                let algorithmRegexp = new RegExp(/[A-Fa-f0-9_+.-]+/);
                                let algorithm = digest.substring(0, algorithmIndex);
                                if (!algorithmRegexp.test(algorithm)) {
                                    return Validator.createInvalidReferenceFormat(from.getImageDigestRange());
                                }
                                let hex = digest.substring(algorithmIndex + 1);
                                let hexRegexp = new RegExp(/[A-Fa-f0-9]+/);
                                if (hexRegexp.test(hex)) {
                                    return null;
                                }
                                return Validator.createInvalidReferenceFormat(from.getImageDigestRange());
                            case 1:
                                return argument.toUpperCase() === "AS" ? null : Validator.createInvalidAs;
                            case 2:
                                argument = argument.toLowerCase();
                                let regexp = new RegExp(/^[a-z]([a-z0-9_\-.]*)*$/);
                                if (regexp.test(argument)) {
                                    return null;
                                }
                                return Validator.createInvalidBuildStageName(range, argument);
                                ;
                            default:
                                return null;
                        }
                    }, Validator.createRequiresOneOrThreeArguments);
                    break;
                case "HEALTHCHECK":
                    let args = instruction.getArguments();
                    const healthcheckFlags = instruction.getFlags();
                    if (args.length === 0) {
                        // all instructions are expected to have at least one argument
                        problems.push(Validator.createHEALTHCHECKRequiresAtLeastOneArgument(instruction.getInstructionRange()));
                    }
                    else {
                        const value = args[0].getValue();
                        const uppercase = value.toUpperCase();
                        if (uppercase === "NONE") {
                            // check that NONE doesn't have any arguments after it
                            if (args.length > 1) {
                                // get the next argument
                                const start = args[1].getRange().start;
                                // get the last argument
                                const end = args[args.length - 1].getRange().end;
                                // highlight everything after the NONE and warn the user
                                problems.push(Validator.createHealthcheckNoneUnnecessaryArgument(start, end));
                            }
                            // don't need to validate flags of a NONE
                            break;
                        }
                        else if (uppercase === "CMD") {
                            if (args.length === 1) {
                                // this HEALTHCHECK has a CMD with no arguments
                                const range = args[0].getRange();
                                problems.push(Validator.createHealthcheckCmdArgumentMissing(range.start, range.end));
                            }
                        }
                        else {
                            // unknown HEALTHCHECK type
                            problems.push(Validator.createHealthcheckTypeUnknown(args[0].getRange(), uppercase));
                        }
                    }
                    const validFlags = ["interval", "retries", "start-period", "timeout"];
                    for (const flag of healthcheckFlags) {
                        const flagName = flag.getName();
                        if (validFlags.indexOf(flagName) === -1) {
                            const range = flag.getRange();
                            problems.push(Validator.createUnknownHealthcheckFlag(range.start, flagName === "" ? range.end : flag.getNameRange().end, flag.getName()));
                        }
                        else if (flagName === "retries") {
                            const value = flag.getValue();
                            if (value) {
                                const valueRange = flag.getValueRange();
                                const integer = parseInt(value);
                                // test for NaN or numbers with decimals
                                if (isNaN(integer) || value.indexOf('.') !== -1) {
                                    problems.push(Validator.createInvalidSyntax(valueRange.start, valueRange.end, value));
                                }
                                else if (integer < 1) {
                                    problems.push(Validator.createFlagAtLeastOne(valueRange.start, valueRange.end, "--retries", integer.toString()));
                                }
                            }
                        }
                    }
                    this.checkFlagValue(healthcheckFlags, validFlags, problems);
                    this.checkFlagDuration(healthcheckFlags, ["interval", "start-period", "timeout"], problems);
                    this.checkDuplicateFlags(healthcheckFlags, validFlags, problems);
                    break;
                case "ONBUILD":
                    this.checkArguments(instruction, problems, [-1], function () {
                        return null;
                    });
                    let onbuild = instruction;
                    let trigger = onbuild.getTrigger();
                    switch (trigger) {
                        case "FROM":
                        case "MAINTAINER":
                            problems.push(Validator.createOnbuildTriggerDisallowed(onbuild.getTriggerRange(), trigger));
                            break;
                        case "ONBUILD":
                            problems.push(Validator.createOnbuildChainingDisallowed(onbuild.getTriggerRange()));
                            break;
                    }
                    break;
                case "SHELL":
                    this.checkArguments(instruction, problems, [-1], function () {
                        return null;
                    });
                    this.checkJSON(document, instruction, problems);
                    break;
                case "STOPSIGNAL":
                    this.checkArguments(instruction, problems, [1], function (_index, argument) {
                        if (argument.indexOf("SIG") === 0 || argument.indexOf('$') != -1) {
                            return null;
                        }
                        for (var i = 0; i < argument.length; i++) {
                            if ('0' > argument.charAt(i) || '9' < argument.charAt(i)) {
                                return Validator.createInvalidStopSignal;
                            }
                        }
                        return null;
                    });
                    let stopsignalArgs = instruction.getExpandedArguments();
                    if (stopsignalArgs.length === 1) {
                        let value = stopsignalArgs[0].getValue();
                        let variables = instruction.getVariables();
                        if (variables.length === 0) {
                            if (value.indexOf('$') !== -1) {
                                let range = stopsignalArgs[0].getRange();
                                problems.push(Validator.createInvalidStopSignal(range.start, range.end, value));
                            }
                        }
                        else {
                            for (let variable of variables) {
                                let variableRange = variable.getRange();
                                let variableDefinition = this.document.getText().substring(this.document.offsetAt(variableRange.start), this.document.offsetAt(variableRange.end));
                                // an un-expanded variable is here
                                if (value.includes(variableDefinition) && !variable.isBuildVariable() && !variable.isDefined()) {
                                    let range = stopsignalArgs[0].getRange();
                                    problems.push(Validator.createInvalidStopSignal(range.start, range.end, ""));
                                    break;
                                }
                            }
                        }
                    }
                    break;
                case "EXPOSE":
                    let exposeArgs = instruction.getArguments();
                    let exposeExpandedArgs = instruction.getExpandedArguments();
                    if (exposeExpandedArgs.length === 0) {
                        let range = instruction.getInstructionRange();
                        problems.push(Validator.createMissingArgument(range.start, range.end));
                    }
                    else {
                        const regex = /^([0-9])+(-[0-9]+)?(:([0-9])+(-[0-9]*)?)?(\/(\w*))?(\/\w*)*$/;
                        argCheck: for (let i = 0; i < exposeExpandedArgs.length; i++) {
                            let value = exposeExpandedArgs[i].getValue();
                            if (value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
                                value = value.substring(1, value.length - 1);
                            }
                            const match = regex.exec(value);
                            if (match) {
                                if (match[7]) {
                                    const protocol = match[7].toLowerCase();
                                    if (protocol !== "" && protocol !== "tcp" && protocol !== "udp" && protocol !== "sctp") {
                                        const range = exposeExpandedArgs[i].getRange();
                                        const rangeStart = this.document.offsetAt(range.start);
                                        const rawArg = this.document.getText().substring(rangeStart, this.document.offsetAt(range.end));
                                        const start = rangeStart + rawArg.indexOf(match[7].substring(0, 1));
                                        const end = protocol.length === 1 ? rangeStart + start + 1 : rangeStart + rawArg.length;
                                        problems.push(Validator.createInvalidProto(this.document.positionAt(start), this.document.positionAt(end), match[7]));
                                    }
                                }
                            }
                            else {
                                // see if we're referencing a variable here
                                if (value.charAt(0) === '$') {
                                    continue argCheck;
                                }
                                problems.push(Validator.createInvalidPort(exposeExpandedArgs[i].getRange(), value));
                            }
                        }
                    }
                    break;
                case "ADD":
                    const add = instruction;
                    const addFlags = add.getFlags();
                    for (let flag of addFlags) {
                        const name = flag.getName();
                        const flagRange = flag.getRange();
                        if (name === "") {
                            problems.push(Validator.createUnknownAddFlag(flagRange.start, flagRange.end, name));
                        }
                        else if (name !== "chown") {
                            let range = flag.getNameRange();
                            problems.push(Validator.createUnknownAddFlag(flagRange.start, range.end, name));
                        }
                    }
                    const addDestinationDiagnostic = this.checkDestinationIsDirectory(add, Validator.createADDRequiresAtLeastTwoArguments, Validator.createADDDestinationNotDirectory);
                    if (addDestinationDiagnostic !== null) {
                        problems.push(addDestinationDiagnostic);
                    }
                    this.checkFlagValue(addFlags, ["chown"], problems);
                    this.checkDuplicateFlags(addFlags, ["chown"], problems);
                    this.checkJSONQuotes(instruction, problems);
                    break;
                case "COPY":
                    let copy = instruction;
                    let flags = copy.getFlags();
                    if (flags.length > 0) {
                        for (let flag of flags) {
                            const name = flag.getName();
                            const flagRange = flag.getRange();
                            if (name === "") {
                                problems.push(Validator.createUnknownCopyFlag(flagRange.start, flagRange.end, name));
                            }
                            else if (name !== "from" && name !== "chown") {
                                let range = flag.getNameRange();
                                problems.push(Validator.createUnknownCopyFlag(flagRange.start, range.end, name));
                            }
                        }
                        let flag = copy.getFromFlag();
                        if (flag) {
                            let value = flag.getValue();
                            if (value !== null) {
                                let regexp = new RegExp(/^[a-zA-Z0-9].*$/);
                                if (!regexp.test(value)) {
                                    let range = value === "" ? flag.getRange() : flag.getValueRange();
                                    problems.push(Validator.createFlagInvalidFrom(range.start, range.end, value));
                                }
                            }
                        }
                    }
                    const copyDestinationDiagnostic = this.checkDestinationIsDirectory(copy, Validator.createCOPYRequiresAtLeastTwoArguments, Validator.createCOPYDestinationNotDirectory);
                    if (copyDestinationDiagnostic !== null) {
                        problems.push(copyDestinationDiagnostic);
                    }
                    this.checkFlagValue(flags, ["chown", "from"], problems);
                    this.checkDuplicateFlags(flags, ["chown", "from"], problems);
                    this.checkJSONQuotes(instruction, problems);
                    break;
                case "WORKDIR":
                    this.checkArguments(instruction, problems, [-1], function () {
                        return null;
                    });
                    let content = instruction.getArgumentsContent();
                    if (content) {
                        // strip out any surrounding quotes
                        const first = content.substring(0, 1);
                        const last = content.substring(content.length - 1);
                        if ((first === '\'' && last === '\'') || (first === '"' && last === '"')) {
                            content = content.substring(1, content.length - 1);
                        }
                        let regexp = new RegExp(/^(\$|([a-zA-Z](\$|:(\$|\\|\/)))).*$/);
                        if (!content.startsWith('/') && !regexp.test(content)) {
                            let problem = this.createWORKDIRNotAbsolute(instruction.getArgumentsRange());
                            if (problem) {
                                problems.push(problem);
                            }
                        }
                    }
                    break;
                default:
                    this.checkArguments(instruction, problems, [-1], function () {
                        return null;
                    });
                    break;
            }
        }
    }
    checkDestinationIsDirectory(instruction, requiresTwoArgumentsFunction, notDirectoryFunction) {
        if (instruction.getClosingBracket()) {
            return this.checkJsonDestinationIsDirectory(instruction, requiresTwoArgumentsFunction, notDirectoryFunction);
        }
        const args = instruction.getArguments();
        if (args.length === 1) {
            return requiresTwoArgumentsFunction(args[0].getRange());
        }
        else if (args.length === 0) {
            return requiresTwoArgumentsFunction(instruction.getInstructionRange());
        }
        else if (args.length > 2) {
            const lastArg = args[args.length - 1];
            const variables = instruction.getVariables();
            if (variables.length !== 0) {
                const lastJsonStringOffset = this.document.offsetAt(lastArg.getRange().end);
                const lastVarOffset = this.document.offsetAt(variables[variables.length - 1].getRange().end);
                if (lastJsonStringOffset === lastVarOffset || lastJsonStringOffset - 1 === lastVarOffset) {
                    return null;
                }
            }
            const destination = lastArg.getValue();
            const lastChar = destination.charAt(destination.length - 1);
            if (lastChar !== '\\' && lastChar !== '/') {
                return notDirectoryFunction(lastArg.getRange());
            }
        }
        return null;
    }
    checkJsonDestinationIsDirectory(instruction, requiresTwoArgumentsFunction, notDirectoryFunction) {
        const jsonStrings = instruction.getJSONStrings();
        if (jsonStrings.length === 0) {
            return requiresTwoArgumentsFunction(instruction.getArgumentsRange());
        }
        else if (jsonStrings.length === 1) {
            return requiresTwoArgumentsFunction(jsonStrings[0].getJSONRange());
        }
        else if (jsonStrings.length > 2) {
            const lastJsonString = jsonStrings[jsonStrings.length - 1];
            const variables = instruction.getVariables();
            if (variables.length !== 0) {
                const lastVar = variables[variables.length - 1];
                const lastJsonStringOffset = this.document.offsetAt(lastJsonString.getRange().end);
                const lastVarOffset = this.document.offsetAt(lastVar.getRange().end);
                if (lastJsonStringOffset === lastVarOffset || lastJsonStringOffset - 1 === lastVarOffset) {
                    return null;
                }
            }
            const destination = lastJsonString.getValue();
            const lastChar = destination.charAt(destination.length - 2);
            if (lastChar !== '\\' && lastChar !== '/') {
                return notDirectoryFunction(jsonStrings[jsonStrings.length - 1].getJSONRange());
            }
        }
        return null;
    }
    checkFlagValue(flags, validFlagNames, problems) {
        for (let flag of flags) {
            let flagName = flag.getName();
            // only validate flags with the right name
            if (flag.getValue() === null && validFlagNames.indexOf(flagName) !== -1) {
                let range = flag.getNameRange();
                problems.push(Validator.createFlagMissingValue(range.start, range.end, flagName));
            }
        }
    }
    checkFlagDuration(flags, validFlagNames, problems) {
        flagCheck: for (let flag of flags) {
            let flagName = flag.getName();
            // only validate flags with the right name
            if (validFlagNames.indexOf(flagName) !== -1) {
                let value = flag.getValue();
                if (value !== null && value.length !== 0) {
                    switch (value.charAt(0)) {
                        case '0':
                        case '1':
                        case '2':
                        case '3':
                        case '4':
                        case '5':
                        case '6':
                        case '7':
                        case '8':
                        case '9':
                        case '.':
                        case '-':
                            break;
                        default:
                            let range = flag.getValueRange();
                            problems.push(Validator.createFlagInvalidDuration(range.start, range.end, value));
                            continue flagCheck;
                    }
                    let durationSpecified = false;
                    let start = 0;
                    let duration = 0;
                    let digitFound = false;
                    let hyphenFound = false;
                    let periodsDetected = 0;
                    durationParse: for (let i = 0; i < value.length; i++) {
                        durationSpecified = false;
                        switch (value.charAt(i)) {
                            case '-':
                                if (digitFound) {
                                    let range = flag.getValueRange();
                                    problems.push(Validator.createFlagUnknownUnit(range, value.charAt(i), value));
                                    continue flagCheck;
                                }
                                else if (hyphenFound) {
                                    let range = flag.getValueRange();
                                    problems.push(Validator.createFlagInvalidDuration(range.start, range.end, value));
                                    continue flagCheck;
                                }
                                hyphenFound = true;
                                continue;
                            case '.':
                                periodsDetected++;
                                continue;
                            case '0':
                            case '1':
                            case '2':
                            case '3':
                            case '4':
                            case '5':
                            case '6':
                            case '7':
                            case '8':
                            case '9':
                                digitFound = true;
                                continue;
                            default:
                                if (periodsDetected > 1) {
                                    let range = flag.getValueRange();
                                    problems.push(Validator.createFlagMissingDuration(range.start, range.end, value));
                                    continue flagCheck;
                                }
                                periodsDetected = 0;
                                let time = parseFloat(value.substring(start, i));
                                for (let j = i + 1; j < value.length; j++) {
                                    if (Validator.isNumberRelated(value.charAt(j))) {
                                        let unit = value.substring(i, j);
                                        if (time < 0 || (value.charAt(start) === '-' && time === 0)) {
                                            let nameRange = flag.getNameRange();
                                            problems.push(Validator.createFlagLessThan1ms(nameRange.start, nameRange.end, flagName));
                                            continue flagCheck;
                                        }
                                        switch (unit) {
                                            case 'h':
                                                // hours
                                                duration += time * 1000 * 60 * 60;
                                                i = j - 1;
                                                start = i;
                                                durationSpecified = true;
                                                continue durationParse;
                                            case 'm':
                                                // minutes
                                                duration += time * 1000 * 60;
                                                i = j - 1;
                                                start = i;
                                                durationSpecified = true;
                                                continue durationParse;
                                            case 's':
                                                // seconds
                                                duration += time * 1000;
                                                i = j - 1;
                                                start = i;
                                                durationSpecified = true;
                                                continue durationParse;
                                            case "ms":
                                                // milliseconds
                                                duration += time;
                                                i = j - 1;
                                                start = i;
                                                durationSpecified = true;
                                                continue durationParse;
                                            case "us":
                                            case "µs":
                                                // microseconds
                                                duration += time / 1000;
                                                i = j - 1;
                                                start = i;
                                                durationSpecified = true;
                                                continue durationParse;
                                            case "ns":
                                                // nanoseconds
                                                duration += time / 1000000;
                                                i = j - 1;
                                                start = i;
                                                durationSpecified = true;
                                                continue durationParse;
                                            default:
                                                let range = flag.getValueRange();
                                                problems.push(Validator.createFlagUnknownUnit(range, unit, value));
                                                continue flagCheck;
                                        }
                                    }
                                }
                                if (time < 0 || (value.charAt(start) === '-' && time === 0)) {
                                    let nameRange = flag.getNameRange();
                                    problems.push(Validator.createFlagLessThan1ms(nameRange.start, nameRange.end, flagName));
                                    continue flagCheck;
                                }
                                let unit = value.substring(i, value.length);
                                switch (unit) {
                                    case 'h':
                                        // hours
                                        duration += time * 1000 * 60 * 60;
                                        durationSpecified = true;
                                        break durationParse;
                                    case 'm':
                                        // minutes
                                        duration += time * 1000 * 60;
                                        durationSpecified = true;
                                        break durationParse;
                                    case 's':
                                        // seconds
                                        duration += time * 1000;
                                        durationSpecified = true;
                                        break durationParse;
                                    case "ms":
                                        // minutes
                                        duration += time;
                                        durationSpecified = true;
                                        break durationParse;
                                    case "us":
                                    case "µs":
                                        // microseconds
                                        duration += time / 1000;
                                        durationSpecified = true;
                                        break durationParse;
                                    case "ns":
                                        // nanoseconds
                                        duration += time / 1000000;
                                        durationSpecified = true;
                                        break durationParse;
                                    default:
                                        let range = flag.getValueRange();
                                        problems.push(Validator.createFlagUnknownUnit(range, unit, value));
                                        break;
                                }
                                continue flagCheck;
                        }
                    }
                    if (!durationSpecified) {
                        let range = flag.getValueRange();
                        problems.push(Validator.createFlagMissingDuration(range.start, range.end, value));
                    }
                    else if (duration < 1) {
                        let range = flag.getNameRange();
                        problems.push(Validator.createFlagLessThan1ms(range.start, range.end, flagName));
                    }
                }
            }
        }
    }
    static isNumberRelated(character) {
        switch (character) {
            case '.':
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                return true;
        }
        return false;
    }
    checkDuplicateFlags(flags, validFlags, problems) {
        let flagNames = flags.map(function (flag) {
            return flag.getName();
        });
        for (let validFlag of validFlags) {
            let index = flagNames.indexOf(validFlag);
            let lastIndex = flagNames.lastIndexOf(validFlag);
            if (index !== lastIndex) {
                let range = flags[index].getNameRange();
                problems.push(Validator.createFlagDuplicate(range.start, range.end, flagNames[index]));
                range = flags[lastIndex].getNameRange();
                problems.push(Validator.createFlagDuplicate(range.start, range.end, flagNames[index]));
            }
        }
    }
    checkJSON(document, instruction, problems) {
        let argsContent = instruction.getArgumentsContent();
        if (argsContent === null) {
            return;
        }
        let argsRange = instruction.getArgumentsRange();
        let args = instruction.getArguments();
        if ((args.length === 1 && args[0].getValue() === "[]") ||
            (args.length === 2 && args[0].getValue() === '[' && args[1].getValue() === ']')) {
            problems.push(Validator.createShellRequiresOne(argsRange));
            return;
        }
        const closing = instruction.getClosingBracket();
        if (closing) {
            let content = document.getText();
            content = content.substring(document.offsetAt(instruction.getOpeningBracket().getRange().end), document.offsetAt(closing.getRange().start));
            content = content.trim();
            if (content.charAt(content.length - 1) !== '"') {
                problems.push(Validator.createShellJsonForm(argsRange));
            }
        }
        else {
            problems.push(Validator.createShellJsonForm(argsRange));
        }
    }
    checkJSONQuotes(instruction, problems) {
        let argsContent = instruction.getArgumentsContent();
        if (argsContent === null) {
            return;
        }
        let argsRange = instruction.getArgumentsRange();
        let args = instruction.getArguments();
        if ((args.length === 1 && args[0].getValue() === "[]") ||
            (args.length === 2 && args[0].getValue() === '[' && args[1].getValue() === ']')) {
            return;
        }
        let jsonLike = false;
        let last = null;
        let quoted = false;
        argsCheck: for (let i = 0; i < argsContent.length; i++) {
            switch (argsContent.charAt(i)) {
                case '[':
                    if (last === null) {
                        last = '[';
                        jsonLike = true;
                    }
                    break;
                case '\'':
                    if (last === '[' || last === ',') {
                        quoted = true;
                        last = '\'';
                        continue;
                    }
                    else if (last === '\'') {
                        if (quoted) {
                            // quoted string done
                            quoted = false;
                        }
                        else {
                            // should be a , or a ]
                            break argsCheck;
                        }
                    }
                    else {
                        break argsCheck;
                    }
                    break;
                case ',':
                    if (!jsonLike) {
                        break argsCheck;
                    }
                    else if (!quoted) {
                        if (last === '\'') {
                            last = ',';
                        }
                        else {
                            break argsCheck;
                        }
                    }
                    break;
                case ']':
                    if (!quoted) {
                        if (last === '\'' || last === ',') {
                            last = null;
                            const problem = Validator.createJSONInSingleQuotes(argsRange, this.settings.instructionJSONInSingleQuotes);
                            if (problem) {
                                problems.push(problem);
                            }
                        }
                        break argsCheck;
                    }
                    break;
                case ' ':
                case '\t':
                    break;
                default:
                    if (!quoted) {
                        break argsCheck;
                    }
                    break;
            }
        }
    }
    static formatMessage(text, ...variables) {
        for (let i = 0; i < variables.length; i++) {
            text = text.replace("${" + i + "}", variables[i]);
        }
        return text;
    }
    static getDiagnosticMessage_DirectiveCasing() {
        return Validator.dockerProblems["directiveCasing"];
    }
    static getDiagnosticMessage_DirectiveEscapeDuplicated() {
        return Validator.dockerProblems["directiveEscapeDuplicated"];
    }
    static getDiagnosticMessage_DirectiveEscapeInvalid(value) {
        return Validator.formatMessage(Validator.dockerProblems["directiveEscapeInvalid"], value);
    }
    static getDiagnosticMessage_NoSourceImage() {
        return Validator.dockerProblems["noSourceImage"];
    }
    static getDiagnosticMessage_EmptyContinuationLine() {
        return Validator.dockerProblems["emptyContinuationLine"];
    }
    static getDiagnosticMessage_DuplicateBuildStageName(name) {
        return Validator.formatMessage(Validator.dockerProblems["duplicateBuildStageName"], name);
    }
    static getDiagnosticMessage_InvalidBuildStageName(name) {
        return Validator.formatMessage(Validator.dockerProblems["invalidBuildStageName"], name);
    }
    static getDiagnosticMessage_FlagAtLeastOne(flagName, flagValue) {
        return Validator.formatMessage(Validator.dockerProblems["flagAtLeastOne"], flagName, flagValue);
    }
    static getDiagnosticMessage_FlagDuplicate(flag) {
        return Validator.formatMessage(Validator.dockerProblems["flagDuplicate"], flag);
    }
    static getDiagnosticMessage_FlagInvalidDuration(flag) {
        return Validator.formatMessage(Validator.dockerProblems["flagInvalidDuration"], flag);
    }
    static getDiagnosticMessage_FlagLessThan1ms(flag) {
        return Validator.formatMessage(Validator.dockerProblems["flagLessThan1ms"], flag);
    }
    static getDiagnosticMessage_FlagMissingDuration(duration) {
        return Validator.formatMessage(Validator.dockerProblems["flagMissingDuration"], duration);
    }
    static getDiagnosticMessage_FlagInvalidFromValue(value) {
        return Validator.formatMessage(Validator.dockerProblems["flagInvalidFrom"], value);
    }
    static getDiagnosticMessage_FlagMissingValue(flag) {
        return Validator.formatMessage(Validator.dockerProblems["flagMissingValue"], flag);
    }
    static getDiagnosticMessage_FlagUnknown(flag) {
        return Validator.formatMessage(Validator.dockerProblems["flagUnknown"], flag);
    }
    static getDiagnosticMessage_FlagUnknownUnit(unit, duration) {
        return Validator.formatMessage(Validator.dockerProblems["flagUnknownUnit"], unit, duration);
    }
    static getDiagnosticMessage_BaseNameEmpty(name) {
        return Validator.formatMessage(Validator.dockerProblems["baseNameEmpty"], name);
    }
    static getDiagnosticMessage_InvalidAs() {
        return Validator.dockerProblems["invalidAs"];
    }
    static getDiagnosticMessage_InvalidPort(port) {
        return Validator.formatMessage(Validator.dockerProblems["invalidPort"], port);
    }
    static getDiagnosticMessage_InvalidProto(protocol) {
        return Validator.formatMessage(Validator.dockerProblems["invalidProtocol"], protocol);
    }
    static getDiagnosticMessage_InvalidReferenceFormat() {
        return Validator.dockerProblems["invalidReferenceFormat"];
    }
    static getDiagnosticMessage_InvalidSignal(signal) {
        return Validator.formatMessage(Validator.dockerProblems["invalidStopSignal"], signal);
    }
    static getDiagnosticMessage_InvalidSyntax(syntax) {
        return Validator.formatMessage(Validator.dockerProblems["invalidSyntax"], syntax);
    }
    static getDiagnosticMessage_InstructionExtraArgument() {
        return Validator.dockerProblems["instructionExtraArgument"];
    }
    static getDiagnosticMessage_InstructionMissingArgument() {
        return Validator.dockerProblems["instructionMissingArgument"];
    }
    static getDiagnosticMessage_ADDDestinationNotDirectory() {
        return Validator.formatMessage(Validator.dockerProblems["invalidDestination"], "ADD");
    }
    static getDiagnosticMessage_ADDRequiresAtLeastTwoArguments() {
        return Validator.formatMessage(Validator.dockerProblems["instructionRequiresAtLeastTwoArguments"], "ADD");
    }
    static getDiagnosticMessage_ARGRequiresOneArgument() {
        return Validator.formatMessage(Validator.dockerProblems["instructionRequiresOneArgument"], "ARG");
    }
    static getDiagnosticMessage_COPYDestinationNotDirectory() {
        return Validator.formatMessage(Validator.dockerProblems["invalidDestination"], "COPY");
    }
    static getDiagnosticMessage_COPYRequiresAtLeastTwoArguments() {
        return Validator.formatMessage(Validator.dockerProblems["instructionRequiresAtLeastTwoArguments"], "COPY");
    }
    static getDiagnosticMessage_HEALTHCHECKRequiresAtLeastOneArgument() {
        return Validator.formatMessage(Validator.dockerProblems["instructionRequiresAtLeastOneArgument"], "HEALTHCHECK");
    }
    static getDiagnosticMessage_ENVRequiresTwoArguments() {
        return Validator.formatMessage(Validator.dockerProblems["instructionRequiresTwoArguments"], "ENV");
    }
    static getDiagnosticMessage_InstructionRequiresOneOrThreeArguments() {
        return Validator.dockerProblems["fromRequiresOneOrThreeArguments"];
    }
    static getDiagnosticMessage_HealthcheckNoneUnnecessaryArgument() {
        return Validator.formatMessage(Validator.dockerProblems["instructionUnnecessaryArgument"], "HEALTHCHECK NONE");
    }
    static getDiagnosticMessage_InstructionMultiple(instruction) {
        return Validator.formatMessage(Validator.dockerProblems["instructionMultiple"], instruction);
    }
    static getDiagnosticMessage_InstructionUnknown(instruction) {
        return Validator.formatMessage(Validator.dockerProblems["instructionUnknown"], instruction);
    }
    static getDiagnosticMessage_SyntaxMissingEquals(argument) {
        return Validator.formatMessage(Validator.dockerProblems["syntaxMissingEquals"], argument);
    }
    static getDiagnosticMessage_SyntaxMissingNames(instruction) {
        return Validator.formatMessage(Validator.dockerProblems["syntaxMissingNames"], instruction);
    }
    static getDiagnosticMessage_SyntaxMissingSingleQuote(key) {
        return Validator.formatMessage(Validator.dockerProblems["syntaxMissingSingleQuote"], key);
    }
    static getDiagnosticMessage_SyntaxMissingDoubleQuote(key) {
        return Validator.formatMessage(Validator.dockerProblems["syntaxMissingDoubleQuote"], key);
    }
    static getDiagnosticMessage_InstructionCasing() {
        return Validator.dockerProblems["instructionCasing"];
    }
    static getDiagnosticMessage_InstructionJSONInSingleQuotes() {
        return Validator.dockerProblems["instructionJSONInSingleQuotes"];
    }
    static getDiagnosticMessage_OnbuildChainingDisallowed() {
        return Validator.dockerProblems["onbuildChainingDisallowed"];
    }
    static getDiagnosticMessage_OnbuildTriggerDisallowed(trigger) {
        return Validator.formatMessage(Validator.dockerProblems["onbuildTriggerDisallowed"], trigger);
    }
    static getDiagnosticMessage_VariableModifierUnsupported(variable, modifier) {
        return Validator.formatMessage(Validator.dockerProblems["variableModifierUnsupported"], variable, modifier);
    }
    static getDiagnosticMessage_ShellJsonForm() {
        return Validator.dockerProblems["shellJsonForm"];
    }
    static getDiagnosticMessage_ShellRequiresOne() {
        return Validator.dockerProblems["shellRequiresOne"];
    }
    static getDiagnosticMessage_DeprecatedMaintainer() {
        return Validator.dockerProblems["deprecatedMaintainer"];
    }
    static getDiagnosticMessage_HealthcheckCmdArgumentMissing() {
        return Validator.dockerProblems["healthcheckCmdArgumentMissing"];
    }
    static getDiagnosticMessage_HealthcheckTypeUnknown(type) {
        return Validator.formatMessage(Validator.dockerProblems["healthcheckTypeUnknown"], type);
    }
    static getDiagnosticMessage_WORKDIRPathNotAbsolute() {
        return Validator.formatMessage(Validator.dockerProblems["workdirPathNotAbsolute"]);
    }
    static createDuplicatedEscapeDirective(start, end) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_DirectiveEscapeDuplicated(), main_1.ValidationCode.DUPLICATED_ESCAPE_DIRECTIVE);
    }
    static createInvalidEscapeDirective(start, end, value) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_DirectiveEscapeInvalid(value), main_1.ValidationCode.INVALID_ESCAPE_DIRECTIVE);
    }
    static createDuplicateBuildStageName(range, name) {
        return Validator.createError(range.start, range.end, Validator.getDiagnosticMessage_DuplicateBuildStageName(name), main_1.ValidationCode.DUPLICATE_BUILD_STAGE_NAME);
    }
    static createInvalidBuildStageName(range, name) {
        return Validator.createError(range.start, range.end, Validator.getDiagnosticMessage_InvalidBuildStageName(name), main_1.ValidationCode.INVALID_BUILD_STAGE_NAME);
    }
    static createFlagAtLeastOne(start, end, flagName, flagValue) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_FlagAtLeastOne(flagName, flagValue), main_1.ValidationCode.FLAG_AT_LEAST_ONE);
    }
    static createFlagDuplicate(start, end, flag) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_FlagDuplicate(flag), main_1.ValidationCode.FLAG_DUPLICATE);
    }
    static createFlagInvalidDuration(start, end, flag) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_FlagInvalidDuration(flag), main_1.ValidationCode.FLAG_INVALID_DURATION);
    }
    static createFlagLessThan1ms(start, end, flag) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_FlagLessThan1ms(flag), main_1.ValidationCode.FLAG_LESS_THAN_1MS);
    }
    static createFlagMissingDuration(start, end, duration) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_FlagMissingDuration(duration), main_1.ValidationCode.FLAG_MISSING_DURATION);
    }
    static createFlagInvalidFrom(start, end, flag) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_FlagInvalidFromValue(flag), main_1.ValidationCode.FLAG_INVALID_FROM_VALUE);
    }
    static createFlagMissingValue(start, end, flag) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_FlagMissingValue(flag), main_1.ValidationCode.FLAG_MISSING_VALUE);
    }
    static createUnknownAddFlag(start, end, flag) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_FlagUnknown(flag), main_1.ValidationCode.UNKNOWN_ADD_FLAG);
    }
    static createUnknownCopyFlag(start, end, flag) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_FlagUnknown(flag), main_1.ValidationCode.UNKNOWN_COPY_FLAG);
    }
    static createUnknownFromFlag(start, end, flag) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_FlagUnknown(flag), main_1.ValidationCode.UNKNOWN_FROM_FLAG);
    }
    static createUnknownHealthcheckFlag(start, end, flag) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_FlagUnknown(flag), main_1.ValidationCode.UNKNOWN_HEALTHCHECK_FLAG);
    }
    static createFlagUnknownUnit(range, unit, duration) {
        return Validator.createError(range.start, range.end, Validator.getDiagnosticMessage_FlagUnknownUnit(unit, duration), main_1.ValidationCode.FLAG_UNKNOWN_UNIT);
    }
    static createBaseNameEmpty(range, name) {
        return Validator.createError(range.start, range.end, Validator.getDiagnosticMessage_BaseNameEmpty(name), main_1.ValidationCode.BASE_NAME_EMPTY);
    }
    static createInvalidAs(start, end) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_InvalidAs(), main_1.ValidationCode.INVALID_AS);
    }
    static createInvalidPort(range, port) {
        return Validator.createError(range.start, range.end, Validator.getDiagnosticMessage_InvalidPort(port), main_1.ValidationCode.INVALID_PORT);
    }
    static createInvalidProto(start, end, protocol) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_InvalidProto(protocol), main_1.ValidationCode.INVALID_PROTO);
    }
    static createInvalidReferenceFormat(range) {
        return Validator.createError(range.start, range.end, Validator.getDiagnosticMessage_InvalidReferenceFormat(), main_1.ValidationCode.INVALID_REFERENCE_FORMAT);
    }
    static createInvalidStopSignal(start, end, signal) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_InvalidSignal(signal), main_1.ValidationCode.INVALID_SIGNAL);
    }
    static createInvalidSyntax(start, end, syntax) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_InvalidSyntax(syntax), main_1.ValidationCode.INVALID_SYNTAX);
    }
    static createMissingArgument(start, end) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_InstructionMissingArgument(), main_1.ValidationCode.ARGUMENT_MISSING);
    }
    static createExtraArgument(start, end) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_InstructionExtraArgument(), main_1.ValidationCode.ARGUMENT_EXTRA);
    }
    static createHealthcheckNoneUnnecessaryArgument(start, end) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_HealthcheckNoneUnnecessaryArgument(), main_1.ValidationCode.ARGUMENT_UNNECESSARY);
    }
    static createARGRequiresOneArgument(start, end) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_ARGRequiresOneArgument(), main_1.ValidationCode.ARGUMENT_REQUIRES_ONE);
    }
    static createADDDestinationNotDirectory(range) {
        return Validator.createError(range.start, range.end, Validator.getDiagnosticMessage_ADDDestinationNotDirectory(), main_1.ValidationCode.INVALID_DESTINATION);
    }
    static createADDRequiresAtLeastTwoArguments(range) {
        return Validator.createError(range.start, range.end, Validator.getDiagnosticMessage_ADDRequiresAtLeastTwoArguments(), main_1.ValidationCode.ARGUMENT_REQUIRES_AT_LEAST_TWO);
    }
    static createCOPYDestinationNotDirectory(range) {
        return Validator.createError(range.start, range.end, Validator.getDiagnosticMessage_COPYDestinationNotDirectory(), main_1.ValidationCode.INVALID_DESTINATION);
    }
    static createCOPYRequiresAtLeastTwoArguments(range) {
        return Validator.createError(range.start, range.end, Validator.getDiagnosticMessage_COPYRequiresAtLeastTwoArguments(), main_1.ValidationCode.ARGUMENT_REQUIRES_AT_LEAST_TWO);
    }
    static createENVRequiresTwoArguments(start, end) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_ENVRequiresTwoArguments(), main_1.ValidationCode.ARGUMENT_REQUIRES_TWO);
    }
    static createHEALTHCHECKRequiresAtLeastOneArgument(range) {
        return Validator.createError(range.start, range.end, Validator.getDiagnosticMessage_HEALTHCHECKRequiresAtLeastOneArgument(), main_1.ValidationCode.ARGUMENT_REQUIRES_AT_LEAST_ONE);
    }
    static createHealthcheckCmdArgumentMissing(start, end) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_HealthcheckCmdArgumentMissing(), main_1.ValidationCode.HEALTHCHECK_CMD_ARGUMENT_MISSING);
    }
    static createHealthcheckTypeUnknown(range, type) {
        return Validator.createError(range.start, range.end, Validator.getDiagnosticMessage_HealthcheckTypeUnknown(type), main_1.ValidationCode.UNKNOWN_TYPE);
    }
    static createOnbuildChainingDisallowed(range) {
        return Validator.createError(range.start, range.end, Validator.getDiagnosticMessage_OnbuildChainingDisallowed(), main_1.ValidationCode.ONBUILD_CHAINING_DISALLOWED);
    }
    static createOnbuildTriggerDisallowed(range, trigger) {
        return Validator.createError(range.start, range.end, Validator.getDiagnosticMessage_OnbuildTriggerDisallowed(trigger), main_1.ValidationCode.ONBUILD_TRIGGER_DISALLOWED);
    }
    static createShellJsonForm(range) {
        return Validator.createError(range.start, range.end, Validator.getDiagnosticMessage_ShellJsonForm(), main_1.ValidationCode.SHELL_JSON_FORM);
    }
    static createShellRequiresOne(range) {
        return Validator.createError(range.start, range.end, Validator.getDiagnosticMessage_ShellRequiresOne(), main_1.ValidationCode.SHELL_REQUIRES_ONE);
    }
    static createRequiresOneOrThreeArguments(start, end) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_InstructionRequiresOneOrThreeArguments(), main_1.ValidationCode.ARGUMENT_REQUIRES_ONE_OR_THREE);
    }
    static createNoSourceImage(start, end) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_NoSourceImage(), main_1.ValidationCode.NO_SOURCE_IMAGE);
    }
    static createSyntaxMissingEquals(start, end, argument) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_SyntaxMissingEquals(argument), main_1.ValidationCode.SYNTAX_MISSING_EQUALS);
    }
    static createSyntaxMissingSingleQuote(start, end, argument) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_SyntaxMissingSingleQuote(argument), main_1.ValidationCode.SYNTAX_MISSING_SINGLE_QUOTE);
    }
    static createSyntaxMissingDoubleQuote(start, end, argument) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_SyntaxMissingDoubleQuote(argument), main_1.ValidationCode.SYNTAX_MISSING_DOUBLE_QUOTE);
    }
    static createSyntaxMissingNames(start, end, instruction) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_SyntaxMissingNames(instruction), main_1.ValidationCode.SYNTAX_MISSING_NAMES);
    }
    static createVariableUnsupportedModifier(range, variable, modifier) {
        return Validator.createError(range.start, range.end, Validator.getDiagnosticMessage_VariableModifierUnsupported(variable, modifier), main_1.ValidationCode.UNSUPPORTED_MODIFIER);
    }
    static createUnknownInstruction(start, end, instruction) {
        return Validator.createError(start, end, Validator.getDiagnosticMessage_InstructionUnknown(instruction), main_1.ValidationCode.UNKNOWN_INSTRUCTION);
    }
    static createError(start, end, description, code) {
        return Validator.createDiagnostic(vscode_languageserver_types_1.DiagnosticSeverity.Error, start, end, description, code);
    }
    static createJSONInSingleQuotes(range, severity) {
        if (severity === main_1.ValidationSeverity.ERROR) {
            return Validator.createError(range.start, range.end, Validator.getDiagnosticMessage_InstructionJSONInSingleQuotes(), main_1.ValidationCode.JSON_IN_SINGLE_QUOTES);
        }
        else if (severity === main_1.ValidationSeverity.WARNING) {
            return Validator.createWarning(range.start, range.end, Validator.getDiagnosticMessage_InstructionJSONInSingleQuotes(), main_1.ValidationCode.JSON_IN_SINGLE_QUOTES);
        }
        return null;
    }
    static createEmptyContinuationLine(start, end, severity) {
        if (severity === main_1.ValidationSeverity.ERROR) {
            return Validator.createError(start, end, Validator.getDiagnosticMessage_EmptyContinuationLine(), main_1.ValidationCode.EMPTY_CONTINUATION_LINE);
        }
        else if (severity === main_1.ValidationSeverity.WARNING) {
            return Validator.createWarning(start, end, Validator.getDiagnosticMessage_EmptyContinuationLine(), main_1.ValidationCode.EMPTY_CONTINUATION_LINE);
        }
        return null;
    }
    createMultipleInstructions(range, severity, instruction) {
        if (severity === main_1.ValidationSeverity.ERROR) {
            return Validator.createError(range.start, range.end, Validator.getDiagnosticMessage_InstructionMultiple(instruction), main_1.ValidationCode.MULTIPLE_INSTRUCTIONS);
        }
        else if (severity === main_1.ValidationSeverity.WARNING) {
            return Validator.createWarning(range.start, range.end, Validator.getDiagnosticMessage_InstructionMultiple(instruction), main_1.ValidationCode.MULTIPLE_INSTRUCTIONS);
        }
        return null;
    }
    createLowercaseDirective(start, end) {
        if (this.settings.directiveCasing === main_1.ValidationSeverity.ERROR) {
            return Validator.createError(start, end, Validator.getDiagnosticMessage_DirectiveCasing(), main_1.ValidationCode.CASING_DIRECTIVE);
        }
        else if (this.settings.directiveCasing === main_1.ValidationSeverity.WARNING) {
            return Validator.createWarning(start, end, Validator.getDiagnosticMessage_DirectiveCasing(), main_1.ValidationCode.CASING_DIRECTIVE);
        }
        return null;
    }
    createUppercaseInstruction(start, end) {
        if (this.settings.instructionCasing === main_1.ValidationSeverity.ERROR) {
            return Validator.createError(start, end, Validator.getDiagnosticMessage_InstructionCasing(), main_1.ValidationCode.CASING_INSTRUCTION);
        }
        else if (this.settings.instructionCasing === main_1.ValidationSeverity.WARNING) {
            return Validator.createWarning(start, end, Validator.getDiagnosticMessage_InstructionCasing(), main_1.ValidationCode.CASING_INSTRUCTION);
        }
        return null;
    }
    createMaintainerDeprecated(start, end) {
        if (this.settings.deprecatedMaintainer === main_1.ValidationSeverity.ERROR) {
            return Validator.createError(start, end, Validator.getDiagnosticMessage_DeprecatedMaintainer(), main_1.ValidationCode.DEPRECATED_MAINTAINER);
        }
        else if (this.settings.deprecatedMaintainer === main_1.ValidationSeverity.WARNING) {
            return Validator.createWarning(start, end, Validator.getDiagnosticMessage_DeprecatedMaintainer(), main_1.ValidationCode.DEPRECATED_MAINTAINER);
        }
        return null;
    }
    createWORKDIRNotAbsolute(range) {
        if (this.settings.instructionWorkdirRelative === main_1.ValidationSeverity.ERROR) {
            return Validator.createError(range.start, range.end, Validator.getDiagnosticMessage_WORKDIRPathNotAbsolute(), main_1.ValidationCode.WORKDIR_IS_NOT_ABSOLUTE);
        }
        else if (this.settings.instructionWorkdirRelative === main_1.ValidationSeverity.WARNING) {
            return Validator.createWarning(range.start, range.end, Validator.getDiagnosticMessage_WORKDIRPathNotAbsolute(), main_1.ValidationCode.WORKDIR_IS_NOT_ABSOLUTE);
        }
        return null;
    }
    static createWarning(start, end, description, code) {
        return Validator.createDiagnostic(vscode_languageserver_types_1.DiagnosticSeverity.Warning, start, end, description, code);
    }
    static createDiagnostic(severity, start, end, description, code) {
        return {
            range: {
                start: start,
                end: end
            },
            message: description,
            severity: severity,
            code: code,
            source: "dockerfile-utils"
        };
    }
}
exports.Validator = Validator;
Validator.dockerProblems = {
    "baseNameEmpty": "base name (${0}) should not be blank",
    "directiveCasing": "Parser directives should be written in lowercase letters",
    "directiveEscapeDuplicated": "only one escape parser directive can be used",
    "directiveEscapeInvalid": "invalid ESCAPE '${0}'. Must be ` or \\",
    "noSourceImage": "No source image provided with `FROM`",
    "emptyContinuationLine": "Empty continuation line",
    "fromRequiresOneOrThreeArguments": "FROM requires either one or three arguments",
    "invalidAs": "Second argument should be AS",
    "invalidPort": "Invalid containerPort: ${0}",
    "invalidProtocol": "Invalid proto: ${0}",
    "invalidReferenceFormat": "invalid reference format",
    "invalidStopSignal": "Invalid signal: ${0}",
    "invalidSyntax": "parsing \"${0}\": invalid syntax",
    "invalidDestination": "When using ${0} with more than one source file, the destination must be a directory and end with a / or a \\",
    "syntaxMissingEquals": "Syntax error - can't find = in \"${0}\". Must be of the form: name=value",
    "syntaxMissingNames": "${0} names can not be blank",
    "syntaxMissingSingleQuote": "failed to process \"${0}\": unexpected end of statement while looking for matching single-quote",
    "syntaxMissingDoubleQuote": "failed to process \"${0}\": unexpected end of statement while looking for matching double-quote",
    "duplicateBuildStageName": "duplicate name ${0}",
    "invalidBuildStageName": "invalid name for build stage: \"${0}\", name can't start with a number or contain symbols",
    "flagAtLeastOne": "${0} must be at least 1 (not ${1})",
    "flagDuplicate": "Duplicate flag specified: ${0}",
    "flagInvalidDuration": "time: invalid duration ${0}",
    "flagInvalidFrom": "invalid from flag value ${0}: invalid reference format",
    "flagLessThan1ms": "Interval \"${0}\" cannot be less than 1ms",
    "flagMissingDuration": "time: missing unit in duration ${0}",
    "flagMissingValue": "Missing a value on flag: ${0}",
    "flagUnknown": "Unknown flag: ${0}",
    "flagUnknownUnit": "time: unknown unit ${0} in duration ${1}",
    "instructionExtraArgument": "Instruction has an extra argument",
    "instructionMissingArgument": "Instruction has no arguments",
    "instructionMultiple": "There can only be one ${0} instruction in a Dockerfile",
    "instructionRequiresOneArgument": "${0} requires exactly one argument",
    "instructionRequiresAtLeastOneArgument": "${0} requires at least one argument",
    "instructionRequiresAtLeastTwoArguments": "${0} requires at least two arguments",
    "instructionRequiresTwoArguments": "${0} must have two arguments",
    "instructionUnnecessaryArgument": "${0} takes no arguments",
    "instructionUnknown": "Unknown instruction: ${0}",
    "instructionCasing": "Instructions should be written in uppercase letters",
    "instructionJSONInSingleQuotes": "Instruction written as a JSON array but is using single quotes instead of double quotes",
    "variableModifierUnsupported": "failed to process \"${0}\": unsupported modifier (${1}) in substitution",
    "onbuildChainingDisallowed": "Chaining ONBUILD via `ONBUILD ONBUILD` isn't allowed",
    "onbuildTriggerDisallowed": "${0} isn't allowed as an ONBUILD trigger",
    "shellJsonForm": "SHELL requires the arguments to be in JSON form",
    "shellRequiresOne": "SHELL requires at least one argument",
    "deprecatedMaintainer": "MAINTAINER has been deprecated",
    "healthcheckCmdArgumentMissing": "Missing command after HEALTHCHECK CMD",
    "healthcheckTypeUnknown": "Unknown type\"${0}\" in HEALTHCHECK (try CMD)",
    "workdirPathNotAbsolute": "WORKDIR paths should be absolute"
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var http = __webpack_require__(85)
var url = __webpack_require__(64)

var https = module.exports

for (var key in http) {
  if (http.hasOwnProperty(key)) https[key] = http[key]
}

https.request = function (params, cb) {
  params = validateParams(params)
  return http.request.call(this, params, cb)
}

https.get = function (params, cb) {
  params = validateParams(params)
  return http.get.call(this, params, cb)
}

function validateParams (params) {
  if (typeof params === 'string') {
    params = url.parse(params)
  }
  if (!params.protocol) {
    params.protocol = 'https:'
  }
  if (params.protocol !== 'https:') {
    throw new Error('Protocol "' + params.protocol + '" not supported. Expected "https:"')
  }
  return params
}


/***/ }),
/* 75 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 76 */
/***/ (function(module, exports) {

exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
	return '/'
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return punycode;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(110)(module), __webpack_require__(2)))

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(79);
exports.encode = exports.stringify = __webpack_require__(80);


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;

var Transform = __webpack_require__(51);

/*<replacement>*/
var util = __webpack_require__(11);
util.inherits = __webpack_require__(8);
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = __webpack_require__(19).Buffer;
var util = __webpack_require__(113);

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

if (util && util.inspect && util.inspect.custom) {
  module.exports.prototype[util.inspect.custom] = function () {
    var obj = util.inspect({ length: this.length });
    return this.constructor.name + ' ' + obj;
  };
}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(5)))

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var ClientRequest = __webpack_require__(86)
var IncomingMessage = __webpack_require__(57)
var extend = __webpack_require__(111)
var statusCodes = __webpack_require__(69)
var url = __webpack_require__(64)

var http = exports

http.request = function (opts, cb) {
	if (typeof opts === 'string')
		opts = url.parse(opts)
	else
		opts = extend(opts)

	// Normally, the page is loaded from http or https, so not specifying a protocol
	// will result in a (valid) protocol-relative url. However, this won't work if
	// the protocol is something else, like 'file:'
	var defaultProtocol = global.location.protocol.search(/^https?:$/) === -1 ? 'http:' : ''

	var protocol = opts.protocol || defaultProtocol
	var host = opts.hostname || opts.host
	var port = opts.port
	var path = opts.path || '/'

	// Necessary for IPv6 addresses
	if (host && host.indexOf(':') !== -1)
		host = '[' + host + ']'

	// This may be a relative url. The browser should always be able to interpret it correctly.
	opts.url = (host ? (protocol + '//' + host) : '') + (port ? ':' + port : '') + path
	opts.method = (opts.method || 'GET').toUpperCase()
	opts.headers = opts.headers || {}

	// Also valid opts.auth, opts.mode

	var req = new ClientRequest(opts)
	if (cb)
		req.on('response', cb)
	return req
}

http.get = function get (opts, cb) {
	var req = http.request(opts, cb)
	req.end()
	return req
}

http.ClientRequest = ClientRequest
http.IncomingMessage = IncomingMessage

http.Agent = function () {}
http.Agent.defaultMaxSockets = 4

http.STATUS_CODES = statusCodes

http.METHODS = [
	'CHECKOUT',
	'CONNECT',
	'COPY',
	'DELETE',
	'GET',
	'HEAD',
	'LOCK',
	'M-SEARCH',
	'MERGE',
	'MKACTIVITY',
	'MKCOL',
	'MOVE',
	'NOTIFY',
	'OPTIONS',
	'PATCH',
	'POST',
	'PROPFIND',
	'PROPPATCH',
	'PURGE',
	'PUT',
	'REPORT',
	'SEARCH',
	'SUBSCRIBE',
	'TRACE',
	'UNLOCK',
	'UNSUBSCRIBE'
]
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer, global, process) {var capability = __webpack_require__(56)
var inherits = __webpack_require__(8)
var response = __webpack_require__(57)
var stream = __webpack_require__(55)
var toArrayBuffer = __webpack_require__(87)

var IncomingMessage = response.IncomingMessage
var rStates = response.readyStates

function decideMode (preferBinary, useFetch) {
	if (capability.fetch && useFetch) {
		return 'fetch'
	} else if (capability.mozchunkedarraybuffer) {
		return 'moz-chunked-arraybuffer'
	} else if (capability.msstream) {
		return 'ms-stream'
	} else if (capability.arraybuffer && preferBinary) {
		return 'arraybuffer'
	} else if (capability.vbArray && preferBinary) {
		return 'text:vbarray'
	} else {
		return 'text'
	}
}

var ClientRequest = module.exports = function (opts) {
	var self = this
	stream.Writable.call(self)

	self._opts = opts
	self._body = []
	self._headers = {}
	if (opts.auth)
		self.setHeader('Authorization', 'Basic ' + new Buffer(opts.auth).toString('base64'))
	Object.keys(opts.headers).forEach(function (name) {
		self.setHeader(name, opts.headers[name])
	})

	var preferBinary
	var useFetch = true
	if (opts.mode === 'disable-fetch' || ('requestTimeout' in opts && !capability.abortController)) {
		// If the use of XHR should be preferred. Not typically needed.
		useFetch = false
		preferBinary = true
	} else if (opts.mode === 'prefer-streaming') {
		// If streaming is a high priority but binary compatibility and
		// the accuracy of the 'content-type' header aren't
		preferBinary = false
	} else if (opts.mode === 'allow-wrong-content-type') {
		// If streaming is more important than preserving the 'content-type' header
		preferBinary = !capability.overrideMimeType
	} else if (!opts.mode || opts.mode === 'default' || opts.mode === 'prefer-fast') {
		// Use binary if text streaming may corrupt data or the content-type header, or for speed
		preferBinary = true
	} else {
		throw new Error('Invalid value for opts.mode')
	}
	self._mode = decideMode(preferBinary, useFetch)

	self.on('finish', function () {
		self._onFinish()
	})
}

inherits(ClientRequest, stream.Writable)

ClientRequest.prototype.setHeader = function (name, value) {
	var self = this
	var lowerName = name.toLowerCase()
	// This check is not necessary, but it prevents warnings from browsers about setting unsafe
	// headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
	// http-browserify did it, so I will too.
	if (unsafeHeaders.indexOf(lowerName) !== -1)
		return

	self._headers[lowerName] = {
		name: name,
		value: value
	}
}

ClientRequest.prototype.getHeader = function (name) {
	var header = this._headers[name.toLowerCase()]
	if (header)
		return header.value
	return null
}

ClientRequest.prototype.removeHeader = function (name) {
	var self = this
	delete self._headers[name.toLowerCase()]
}

ClientRequest.prototype._onFinish = function () {
	var self = this

	if (self._destroyed)
		return
	var opts = self._opts

	var headersObj = self._headers
	var body = null
	if (opts.method !== 'GET' && opts.method !== 'HEAD') {
		if (capability.arraybuffer) {
			body = toArrayBuffer(Buffer.concat(self._body))
		} else if (capability.blobConstructor) {
			body = new global.Blob(self._body.map(function (buffer) {
				return toArrayBuffer(buffer)
			}), {
				type: (headersObj['content-type'] || {}).value || ''
			})
		} else {
			// get utf8 string
			body = Buffer.concat(self._body).toString()
		}
	}

	// create flattened list of headers
	var headersList = []
	Object.keys(headersObj).forEach(function (keyName) {
		var name = headersObj[keyName].name
		var value = headersObj[keyName].value
		if (Array.isArray(value)) {
			value.forEach(function (v) {
				headersList.push([name, v])
			})
		} else {
			headersList.push([name, value])
		}
	})

	if (self._mode === 'fetch') {
		var signal = null
		if (capability.abortController) {
			var controller = new AbortController()
			signal = controller.signal
			self._fetchAbortController = controller

			if ('requestTimeout' in opts && opts.requestTimeout !== 0) {
				global.setTimeout(function () {
					self.emit('requestTimeout')
					if (self._fetchAbortController)
						self._fetchAbortController.abort()
				}, opts.requestTimeout)
			}
		}

		global.fetch(self._opts.url, {
			method: self._opts.method,
			headers: headersList,
			body: body || undefined,
			mode: 'cors',
			credentials: opts.withCredentials ? 'include' : 'same-origin',
			signal: signal
		}).then(function (response) {
			self._fetchResponse = response
			self._connect()
		}, function (reason) {
			self.emit('error', reason)
		})
	} else {
		var xhr = self._xhr = new global.XMLHttpRequest()
		try {
			xhr.open(self._opts.method, self._opts.url, true)
		} catch (err) {
			process.nextTick(function () {
				self.emit('error', err)
			})
			return
		}

		// Can't set responseType on really old browsers
		if ('responseType' in xhr)
			xhr.responseType = self._mode.split(':')[0]

		if ('withCredentials' in xhr)
			xhr.withCredentials = !!opts.withCredentials

		if (self._mode === 'text' && 'overrideMimeType' in xhr)
			xhr.overrideMimeType('text/plain; charset=x-user-defined')

		if ('requestTimeout' in opts) {
			xhr.timeout = opts.requestTimeout
			xhr.ontimeout = function () {
				self.emit('requestTimeout')
			}
		}

		headersList.forEach(function (header) {
			xhr.setRequestHeader(header[0], header[1])
		})

		self._response = null
		xhr.onreadystatechange = function () {
			switch (xhr.readyState) {
				case rStates.LOADING:
				case rStates.DONE:
					self._onXHRProgress()
					break
			}
		}
		// Necessary for streaming in Firefox, since xhr.response is ONLY defined
		// in onprogress, not in onreadystatechange with xhr.readyState = 3
		if (self._mode === 'moz-chunked-arraybuffer') {
			xhr.onprogress = function () {
				self._onXHRProgress()
			}
		}

		xhr.onerror = function () {
			if (self._destroyed)
				return
			self.emit('error', new Error('XHR error'))
		}

		try {
			xhr.send(body)
		} catch (err) {
			process.nextTick(function () {
				self.emit('error', err)
			})
			return
		}
	}
}

/**
 * Checks if xhr.status is readable and non-zero, indicating no error.
 * Even though the spec says it should be available in readyState 3,
 * accessing it throws an exception in IE8
 */
function statusValid (xhr) {
	try {
		var status = xhr.status
		return (status !== null && status !== 0)
	} catch (e) {
		return false
	}
}

ClientRequest.prototype._onXHRProgress = function () {
	var self = this

	if (!statusValid(self._xhr) || self._destroyed)
		return

	if (!self._response)
		self._connect()

	self._response._onXHRProgress()
}

ClientRequest.prototype._connect = function () {
	var self = this

	if (self._destroyed)
		return

	self._response = new IncomingMessage(self._xhr, self._fetchResponse, self._mode)
	self._response.on('error', function(err) {
		self.emit('error', err)
	})

	self.emit('response', self._response)
}

ClientRequest.prototype._write = function (chunk, encoding, cb) {
	var self = this

	self._body.push(chunk)
	cb()
}

ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function () {
	var self = this
	self._destroyed = true
	if (self._response)
		self._response._destroyed = true
	if (self._xhr)
		self._xhr.abort()
	else if (self._fetchAbortController)
		self._fetchAbortController.abort()
}

ClientRequest.prototype.end = function (data, encoding, cb) {
	var self = this
	if (typeof data === 'function') {
		cb = data
		data = undefined
	}

	stream.Writable.prototype.end.call(self, data, encoding, cb)
}

ClientRequest.prototype.flushHeaders = function () {}
ClientRequest.prototype.setTimeout = function () {}
ClientRequest.prototype.setNoDelay = function () {}
ClientRequest.prototype.setSocketKeepAlive = function () {}

// Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
var unsafeHeaders = [
	'accept-charset',
	'accept-encoding',
	'access-control-request-headers',
	'access-control-request-method',
	'connection',
	'content-length',
	'cookie',
	'cookie2',
	'date',
	'dnt',
	'expect',
	'host',
	'keep-alive',
	'origin',
	'referer',
	'te',
	'trailer',
	'transfer-encoding',
	'upgrade',
	'user-agent',
	'via'
]

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).Buffer, __webpack_require__(2), __webpack_require__(5)))

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__(6).Buffer

module.exports = function (buf) {
	// If the buffer is backed by a Uint8Array, a faster version will work
	if (buf instanceof Uint8Array) {
		// If the buffer isn't a subarray, return the underlying ArrayBuffer
		if (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {
			return buf.buffer
		} else if (typeof buf.buffer.slice === 'function') {
			// Otherwise we need to get a proper copy
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
		}
	}

	if (Buffer.isBuffer(buf)) {
		// This is the slow version that will work with any Buffer
		// implementation (even in old browsers)
		var arrayCopy = new Uint8Array(buf.length)
		var len = buf.length
		for (var i = 0; i < len; i++) {
			arrayCopy[i] = buf[i]
		}
		return arrayCopy.buffer
	} else {
		throw new Error('Argument must be a Buffer')
	}
}


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* --------------------------------------------------------------------------------------------
* Copyright (c) Remy Suen. All rights reserved.
* Licensed under the MIT License. See License.txt in the project root for license information.
* ------------------------------------------------------------------------------------------ */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_languageserver_types_1 = __webpack_require__(0);
var docker_1 = __webpack_require__(10);
var dockerfile_ast_1 = __webpack_require__(1);
var DockerAssist = /** @class */ (function () {
    /**
     * Creates a content assist processor for suggesting completion items related to a Dockerfile.
     *
     * @param document the text document to provide suggestions for
     * @param dockerRegistryClient the client for communicating with a Docker registry
     * @param snippetSupport true if snippets are supported by the client, false otherwise
     * @param deprecatedSupport true if the client supports the deprecated property on a completion item
     */
    function DockerAssist(document, dockerRegistryClient, snippetSupport, deprecatedSupport) {
        this.document = document;
        this.dockerRegistryClient = dockerRegistryClient;
        this.snippetSupport = snippetSupport;
        this.deprecatedSupport = deprecatedSupport;
    }
    DockerAssist.prototype.computeProposals = function (position) {
        var buffer = this.document.getText();
        var offset = this.document.offsetAt(position);
        var dockerfile = dockerfile_ast_1.DockerfileParser.parse(buffer);
        var escapeCharacter = dockerfile.getEscapeCharacter();
        var directive = dockerfile.getDirective();
        if (directive !== null && position.line === 0) {
            var range = directive.getNameRange();
            if (position.character <= range.start.character) {
                // in whitespace before the directive's name
                return [this.createEscape(0, offset, dockerfile_ast_1.Directive.escape)];
            }
            else if (position.character <= range.end.character) {
                // in the name
                return [this.createEscape(position.character - range.start.character, offset, dockerfile_ast_1.Directive.escape)];
            }
            return [];
        }
        // directive only possible on the first line
        var comments = dockerfile.getComments();
        if (comments.length !== 0) {
            if (position.line === 0) {
                var commentRange = comments[0].getRange();
                // check if the first comment is on the first line
                if (commentRange.start.line === 0) {
                    // is the user inside the comment
                    if (commentRange.start.character < position.character) {
                        var range = comments[0].getContentRange();
                        if (range === null || position.character <= range.start.character) {
                            // in whitespace
                            return [this.createEscape(0, offset, dockerfile_ast_1.Directive.escape)];
                        }
                        var comment = comments[0].getContent();
                        if (position.character <= range.end.character) {
                            // within the content
                            var prefix_1 = comment.substring(0, position.character - range.start.character);
                            // substring check
                            if (dockerfile_ast_1.Directive.escape.indexOf(prefix_1.toLowerCase()) === 0) {
                                return [this.createEscape(prefix_1.length, offset, dockerfile_ast_1.Directive.escape)];
                            }
                        }
                        return [];
                    }
                }
            }
            else {
                for (var _i = 0, comments_1 = comments; _i < comments_1.length; _i++) {
                    var comment = comments_1[_i];
                    var range = comment.getRange();
                    if (range.start.line === position.line) {
                        if (range.start.character < position.character && position.character <= range.end.character) {
                            // inside a comment
                            return [];
                        }
                    }
                }
            }
        }
        var prefix = DockerAssist.calculateTruePrefix(buffer, offset, escapeCharacter);
        if (prefix !== "") {
            var index = prefix.lastIndexOf('$');
            // $ exists so we're at a variable
            if (index !== -1) {
                // check that the variable $ wasn't escaped
                if (prefix.charAt(index - 1) !== '\\') {
                    // get the variable's prefix thus far
                    var variablePrefix = prefix.substring(index + 1).toLowerCase();
                    var prefixLength = variablePrefix.length + 1;
                    var items = [];
                    if (variablePrefix === "") {
                        // empty prefix, return all variables
                        for (var _a = 0, _b = dockerfile.getAvailableVariables(position.line); _a < _b.length; _a++) {
                            var variable = _b[_a];
                            var doc = dockerfile.resolveVariable(variable, position.line);
                            items.push(this.createVariableCompletionItem(variable, prefixLength, offset, true, doc));
                        }
                        for (var _c = 0, DefaultVariables_1 = dockerfile_ast_1.DefaultVariables; _c < DefaultVariables_1.length; _c++) {
                            var variable = DefaultVariables_1[_c];
                            var doc = dockerfile.resolveVariable(variable, position.line);
                            items.push(this.createVariableCompletionItem(variable, prefixLength, offset, true, doc));
                        }
                    }
                    else {
                        var brace = false;
                        if (variablePrefix.charAt(0) === '{') {
                            brace = true;
                            variablePrefix = variablePrefix.substring(1);
                        }
                        // merge list of available variables with the defaults
                        var variables = dockerfile.getAvailableVariables(position.line);
                        for (var _d = 0, DefaultVariables_2 = dockerfile_ast_1.DefaultVariables; _d < DefaultVariables_2.length; _d++) {
                            var variable = DefaultVariables_2[_d];
                            if (variables.indexOf(variable) === -1) {
                                variables.push(variable);
                            }
                        }
                        for (var _e = 0, variables_1 = variables; _e < variables_1.length; _e++) {
                            var variable = variables_1[_e];
                            if (variable.toLowerCase().indexOf(variablePrefix) === 0) {
                                var doc = dockerfile.resolveVariable(variable, position.line);
                                items.push(this.createVariableCompletionItem(variable, prefixLength, offset, brace, doc));
                            }
                        }
                    }
                    items.sort(function (a, b) {
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
        var previousWord = "";
        instructionsCheck: for (var _f = 0, _g = dockerfile.getInstructions(); _f < _g.length; _f++) {
            var instruction = _g[_f];
            if (docker_1.Util.isInsideRange(position, instruction.getInstructionRange())) {
                break;
            }
            else if (docker_1.Util.isInsideRange(position, instruction.getRange())) {
                switch (instruction.getKeyword()) {
                    case "ADD":
                        return this.createAddProposals(instruction, position, offset, prefix);
                    case "COPY":
                        return this.createCopyProposals(dockerfile, instruction, position, offset, prefix);
                    case "FROM":
                        return this.createFromProposals(instruction, position, offset, prefix);
                    case "HEALTHCHECK":
                        var subcommand = instruction.getSubcommand();
                        if (subcommand && subcommand.isBefore(position)) {
                            return [];
                        }
                        return this.createHealthcheckProposals(offset, prefix);
                    case "ONBUILD":
                        var onbuildArgs = instruction.getArguments();
                        if (onbuildArgs.length === 0 || docker_1.Util.isInsideRange(position, onbuildArgs[0].getRange())) {
                            // no trigger instructions or the cursor is in the trigger instruction
                            previousWord = "ONBUILD";
                            break instructionsCheck;
                        }
                        else {
                            var trigger = instruction.getTriggerInstruction();
                            switch (trigger.getKeyword()) {
                                case "ADD":
                                    return this.createAddProposals(trigger, position, offset, prefix);
                                case "COPY":
                                    return this.createCopyProposals(dockerfile, trigger, position, offset, prefix);
                                case "HEALTHCHECK":
                                    var subcommand_1 = trigger.getSubcommand();
                                    if (subcommand_1 && subcommand_1.isBefore(position)) {
                                        return [];
                                    }
                                    return this.createHealthcheckProposals(offset, prefix);
                            }
                        }
                        return [];
                    default:
                        return [];
                }
            }
        }
        if (prefix === "") {
            if (dockerfile.getInstructions().length === 0) {
                // if we don't have any instructions, only suggest FROM
                return [this.createFROM(0, offset, "FROM")];
            }
            // no prefix, return all the proposals
            return this.createProposals(docker_1.KEYWORDS, previousWord, 0, offset);
        }
        var suggestions = [];
        var uppercasePrefix = prefix.toUpperCase();
        for (var i = 0; i < docker_1.KEYWORDS.length; i++) {
            if (docker_1.KEYWORDS[i] === uppercasePrefix) {
                // prefix is a keyword already, nothing to suggest
                return [];
            }
            else if (docker_1.KEYWORDS[i].indexOf(uppercasePrefix) === 0) {
                suggestions.push(docker_1.KEYWORDS[i]);
            }
        }
        if (suggestions.length === 0) {
            // prefix doesn't match any keywords, nothing to suggest
            return [];
        }
        return this.createProposals(suggestions, previousWord, prefix.length, offset);
    };
    DockerAssist.prototype.createProposals = function (keywords, previousWord, prefixLength, offset) {
        var proposals = [];
        for (var i = 0; i < keywords.length; i++) {
            switch (keywords[i]) {
                case "ARG":
                    if (this.snippetSupport) {
                        proposals.push(this.createARG_NameOnly(prefixLength, offset));
                        proposals.push(this.createARG_DefaultValue(prefixLength, offset));
                    }
                    else {
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
    };
    DockerAssist.prototype.createAddProposals = function (add, position, offset, prefix) {
        var flags = add.getFlags();
        var copyArgs = add.getArguments();
        if (copyArgs.length === 0 && add.getFlags().length === 0) {
            return [this.createADD_FlagChown(0, offset)];
        }
        else if (copyArgs.length > 0 && docker_1.Util.isInsideRange(position, copyArgs[0].getRange()) && prefix === "-") {
            return [this.createADD_FlagChown(prefix.length, offset)];
        }
        else if (flags.length > 0 && flags[0].toString() === "--") {
            return [this.createADD_FlagChown(prefix.length, offset)];
        }
        else if ((copyArgs.length > 0 && docker_1.Util.isInsideRange(position, copyArgs[0].getRange()) && "--chown=".indexOf(prefix) === 0)
            || (flags.length > 0 && "--chown=".indexOf(flags[0].toString()) === 0)) {
            return [this.createADD_FlagChown(prefix.length, offset)];
        }
        return [];
    };
    DockerAssist.prototype.createCopyProposals = function (dockerfile, copy, position, offset, prefix) {
        var flag = copy.getFromFlag();
        // is the user in the --from= area
        if (flag && docker_1.Util.isInsideRange(position, flag.getValueRange())) {
            var names = {};
            var items = [];
            var stageIndex = 0;
            // determines if the last build stage was named or not
            var lastNumber = false;
            // get the prefix
            var stagePrefix = this.document.getText().substring(this.document.offsetAt(flag.getValueRange().start), offset).toLowerCase();
            for (var _i = 0, _a = dockerfile.getFROMs(); _i < _a.length; _i++) {
                var from = _a[_i];
                if (copy.isAfter(from)) {
                    var image = from.getImage();
                    var stage = from.getBuildStage();
                    if (stage) {
                        var lowercase = stage.toLowerCase();
                        if (lowercase.indexOf(stagePrefix) === 0 && !names[lowercase]) {
                            names[lowercase] = true;
                            items.push(this.createSourceImageCompletionItem(stage, image, stageIndex, stagePrefix.length, offset));
                        }
                        lastNumber = false;
                    }
                    else if (!names[stageIndex]) {
                        names[stageIndex] = true;
                        items.push(this.createSourceImageCompletionItem(stageIndex.toString(), image, stageIndex, stagePrefix.length, offset));
                        lastNumber = true;
                    }
                    stageIndex++;
                }
                else {
                    break;
                }
            }
            // last build stage was not named, don't suggest it as it is recursive
            if (lastNumber && items.length > 0) {
                items.pop();
            }
            return items;
        }
        var flags = copy.getFlags();
        var copyArgs = copy.getArguments();
        if (copyArgs.length === 0 && copy.getFlags().length === 0) {
            return [this.createCOPY_FlagChown(0, offset), this.createCOPY_FlagFrom(0, offset)];
        }
        else if (copyArgs.length > 0 && docker_1.Util.isInsideRange(position, copyArgs[0].getRange()) && prefix === "-") {
            return [this.createCOPY_FlagChown(prefix.length, offset), this.createCOPY_FlagFrom(prefix.length, offset)];
        }
        else if (flags.length > 0 && flags[0].toString() === "--") {
            return [this.createCOPY_FlagChown(prefix.length, offset), this.createCOPY_FlagFrom(prefix.length, offset)];
        }
        else if ((copyArgs.length > 0 && docker_1.Util.isInsideRange(position, copyArgs[0].getRange()) && "--chown=".indexOf(prefix) === 0)
            || (flags.length > 0 && "--chown=".indexOf(flags[0].toString()) === 0)) {
            return [this.createCOPY_FlagChown(prefix.length, offset)];
        }
        else if ((copyArgs.length > 0 && docker_1.Util.isInsideRange(position, copyArgs[0].getRange()) && "--from=".indexOf(prefix) === 0)
            || (flags.length > 0 && "--from=".indexOf(flags[0].toString()) === 0)) {
            return [this.createCOPY_FlagFrom(prefix.length, offset)];
        }
        return [];
    };
    DockerAssist.prototype.createFromProposals = function (from, position, offset, prefix) {
        var _this = this;
        // checks if the cursor is in the image's tag area
        if (docker_1.Util.isInsideRange(position, from.getImageTagRange())) {
            var index = prefix.indexOf(':');
            var lastIndex = prefix.indexOf(':');
            if (index === lastIndex) {
                prefix = prefix.substring(index + 1);
            }
            else {
                prefix = prefix.substring(index + 1, lastIndex);
            }
            var client_1 = this.dockerRegistryClient;
            return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                var items, tags, _i, tags_1, tag;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            items = [];
                            return [4 /*yield*/, client_1.getTags(from.getImageName())];
                        case 1:
                            tags = _a.sent();
                            for (_i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
                                tag = tags_1[_i];
                                if (tag.indexOf(prefix) === 0) {
                                    items.push({
                                        textEdit: this.createTextEdit(prefix.length, this.document.offsetAt(position), tag),
                                        label: tag,
                                        kind: vscode_languageserver_types_1.CompletionItemKind.Property,
                                        insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.PlainText,
                                    });
                                }
                            }
                            resolve(items);
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        var args = from.getArguments();
        if (args.length > 0 && args[0].isBefore(position)) {
            return [];
        }
        if ("--platform".indexOf(prefix) === 0) {
            return [this.createFROM_FlagPlatform(prefix.length, offset)];
        }
        return [];
    };
    DockerAssist.prototype.createHealthcheckProposals = function (offset, prefix) {
        var items = [];
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
        if ("--start-period".indexOf(prefix) === 0) {
            items.push(this.createHEALTHCHECK_FlagStartPeriod(prefix.length, offset));
        }
        if ("--timeout".indexOf(prefix) === 0) {
            items.push(this.createHEALTHCHECK_FlagTimeout(prefix.length, offset));
        }
        for (var i = 0; i < items.length; i++) {
            items[i].sortText = i.toString();
        }
        return items;
    };
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
    DockerAssist.calculateTruePrefix = function (buffer, offset, escapeCharacter) {
        var char = buffer.charAt(offset - 1);
        switch (char) {
            case '\n':
                var escapedPrefix = "";
                for (var i = offset - 1; i >= 0; i--) {
                    if (buffer.charAt(i) === '\n') {
                        if (buffer.charAt(i - 1) === escapeCharacter) {
                            i--;
                        }
                        else if (buffer.charAt(i - 1) === '\r' && buffer.charAt(i - 2) === escapeCharacter) {
                            i = i - 2;
                        }
                        else {
                            break;
                        }
                    }
                    else if (buffer.charAt(i) === ' ' || buffer.charAt(i) === '\t') {
                        break;
                    }
                    else {
                        escapedPrefix = buffer.charAt(i).toUpperCase() + escapedPrefix;
                    }
                }
                if (escapedPrefix !== "") {
                    return escapedPrefix;
                }
                break;
            case '\r':
            case ' ':
            case '\t':
                break;
            default:
                var truePrefix = char;
                for (var i_1 = offset - 2; i_1 >= 0; i_1--) {
                    char = buffer.charAt(i_1);
                    if (docker_1.Util.isWhitespace(char)) {
                        break;
                    }
                    else {
                        truePrefix = char + truePrefix;
                    }
                }
                return truePrefix;
        }
        return "";
    };
    DockerAssist.prototype.createSingleProposals = function (keyword, prefixLength, offset) {
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
    };
    DockerAssist.prototype.createADD = function (prefixLength, offset, markdown) {
        return this.createKeywordCompletionItem("ADD", "ADD source dest", prefixLength, offset, "ADD ${1:source} ${2:dest}", markdown);
    };
    DockerAssist.prototype.createARG = function (prefixLength, offset) {
        return this.createKeywordCompletionItem("ARG", "ARG", prefixLength, offset, "ARG", "ARG");
    };
    DockerAssist.prototype.createARG_NameOnly = function (prefixLength, offset) {
        return this.createKeywordCompletionItem("ARG", "ARG name", prefixLength, offset, "ARG ${1:name}", "ARG_NameOnly");
    };
    DockerAssist.prototype.createARG_DefaultValue = function (prefixLength, offset) {
        return this.createKeywordCompletionItem("ARG", "ARG name=defaultValue", prefixLength, offset, "ARG ${1:name}=${2:defaultValue}", "ARG_DefaultValue");
    };
    DockerAssist.prototype.createCMD = function (prefixLength, offset, markdown) {
        return this.createKeywordCompletionItem("CMD", "CMD [ \"executable\" ]", prefixLength, offset, "CMD [ \"${1:executable}\" ]", markdown);
    };
    DockerAssist.prototype.createCOPY = function (prefixLength, offset, markdown) {
        return this.createKeywordCompletionItem("COPY", "COPY source dest", prefixLength, offset, "COPY ${1:source} ${2:dest}", markdown);
    };
    DockerAssist.prototype.createENTRYPOINT = function (prefixLength, offset, markdown) {
        return this.createKeywordCompletionItem("ENTRYPOINT", "ENTRYPOINT [ \"executable\" ]", prefixLength, offset, "ENTRYPOINT [ \"${1:executable}\" ]", markdown);
    };
    DockerAssist.prototype.createENV = function (prefixLength, offset, markdown) {
        return this.createKeywordCompletionItem("ENV", "ENV key=value", prefixLength, offset, "ENV ${1:key}=${2:value}", markdown);
    };
    DockerAssist.prototype.createEXPOSE = function (prefixLength, offset, markdown) {
        return this.createKeywordCompletionItem("EXPOSE", "EXPOSE port", prefixLength, offset, "EXPOSE ${1:port}", markdown);
    };
    DockerAssist.prototype.createFROM = function (prefixLength, offset, markdown) {
        return this.createKeywordCompletionItem("FROM", "FROM baseImage", prefixLength, offset, "FROM ${1:baseImage}", markdown);
    };
    DockerAssist.prototype.createHEALTHCHECK_CMD = function (prefixLength, offset) {
        if (this.snippetSupport) {
            return this.createKeywordCompletionItem("HEALTHCHECK", "HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ \"executable\" ]", prefixLength, offset, "HEALTHCHECK --interval=${1:30s} --timeout=${2:30s} --start-period=${3:5s} --retries=${4:3} CMD [ \"${5:executable}\" ]", "HEALTHCHECK_CMD");
        }
        var textEdit = this.createTextEdit(prefixLength, offset, "HEALTHCHECK CMD");
        return {
            data: "HEALTHCHECK_CMD",
            textEdit: textEdit,
            label: "HEALTHCHECK CMD",
            kind: vscode_languageserver_types_1.CompletionItemKind.Keyword,
            insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.PlainText,
        };
    };
    DockerAssist.prototype.createHEALTHCHECK_CMD_Subcommand = function (prefixLength, offset) {
        if (this.snippetSupport) {
            return this.createKeywordCompletionItem("CMD", "CMD [ \"executable\" ]", prefixLength, offset, "CMD [ \"${1:executable}\" ]", "HEALTHCHECK_CMD");
        }
        var textEdit = this.createTextEdit(prefixLength, offset, "CMD");
        return {
            data: "HEALTHCHECK_CMD",
            textEdit: textEdit,
            label: "CMD",
            kind: vscode_languageserver_types_1.CompletionItemKind.Keyword,
            insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.PlainText,
        };
    };
    DockerAssist.prototype.createADD_FlagChown = function (prefixLength, offset) {
        if (this.snippetSupport) {
            return this.createFlagCompletionItem("--chown=user:group", prefixLength, offset, "--chown=${1:user\:group}", "ADD_FlagChown");
        }
        return this.createFlagCompletionItem("--chown=", prefixLength, offset, "--chown=", "ADD_FlagChown");
    };
    DockerAssist.prototype.createCOPY_FlagChown = function (prefixLength, offset) {
        if (this.snippetSupport) {
            return this.createFlagCompletionItem("--chown=user:group", prefixLength, offset, "--chown=${1:user\:group}", "COPY_FlagChown");
        }
        return this.createFlagCompletionItem("--chown=", prefixLength, offset, "--chown=", "COPY_FlagChown");
    };
    DockerAssist.prototype.createCOPY_FlagFrom = function (prefixLength, offset) {
        if (this.snippetSupport) {
            return this.createFlagCompletionItem("--from=stage", prefixLength, offset, "--from=${1:stage}", "COPY_FlagFrom");
        }
        return this.createFlagCompletionItem("--from=", prefixLength, offset, "--from=", "COPY_FlagFrom");
    };
    DockerAssist.prototype.createFROM_FlagPlatform = function (prefixLength, offset) {
        if (this.snippetSupport) {
            return this.createFlagCompletionItem("--platform=arm64", prefixLength, offset, "--platform=${1:arm64}", "FROM_FlagPlatform");
        }
        return this.createFlagCompletionItem("--platform=", prefixLength, offset, "--platform=", "FROM_FlagPlatform");
    };
    DockerAssist.prototype.createHEALTHCHECK_FlagInterval = function (prefixLength, offset) {
        if (this.snippetSupport) {
            return this.createFlagCompletionItem("--interval=30s", prefixLength, offset, "--interval=${1:30s}", "HEALTHCHECK_FlagInterval");
        }
        return this.createFlagCompletionItem("--interval=", prefixLength, offset, "--interval=", "HEALTHCHECK_FlagInterval");
    };
    DockerAssist.prototype.createHEALTHCHECK_FlagRetries = function (prefixLength, offset) {
        if (this.snippetSupport) {
            return this.createFlagCompletionItem("--retries=3", prefixLength, offset, "--retries=${1:3}", "HEALTHCHECK_FlagRetries");
        }
        return this.createFlagCompletionItem("--retries=", prefixLength, offset, "--retries=", "HEALTHCHECK_FlagRetries");
    };
    DockerAssist.prototype.createHEALTHCHECK_FlagStartPeriod = function (prefixLength, offset) {
        if (this.snippetSupport) {
            return this.createFlagCompletionItem("--start-period=5s", prefixLength, offset, "--start-period=${1:5s}", "HEALTHCHECK_FlagStartPeriod");
        }
        return this.createFlagCompletionItem("--start-period=", prefixLength, offset, "--start-period=", "HEALTHCHECK_FlagStartPeriod");
    };
    DockerAssist.prototype.createHEALTHCHECK_FlagTimeout = function (prefixLength, offset) {
        if (this.snippetSupport) {
            return this.createFlagCompletionItem("--timeout=30s", prefixLength, offset, "--timeout=${1:30s}", "HEALTHCHECK_FlagTimeout");
        }
        return this.createFlagCompletionItem("--timeout=", prefixLength, offset, "--timeout=", "HEALTHCHECK_FlagTimeout");
    };
    DockerAssist.prototype.createHEALTHCHECK_NONE = function (prefixLength, offset) {
        return this.createPlainTextCompletionItem("HEALTHCHECK NONE", prefixLength, offset, "HEALTHCHECK NONE", "HEALTHCHECK_NONE");
    };
    DockerAssist.prototype.createHEALTHCHECK_NONE_Subcommand = function (prefixLength, offset) {
        return this.createPlainTextCompletionItem("NONE", prefixLength, offset, "NONE", "HEALTHCHECK_NONE");
    };
    DockerAssist.prototype.createLABEL = function (prefixLength, offset, markdown) {
        return this.createKeywordCompletionItem("LABEL", "LABEL key=\"value\"", prefixLength, offset, "LABEL ${1:key}=\"${2:value}\"", markdown);
    };
    DockerAssist.prototype.createMAINTAINER = function (prefixLength, offset, markdown) {
        var item = this.createKeywordCompletionItem("MAINTAINER", "MAINTAINER name", prefixLength, offset, "MAINTAINER ${1:name}", markdown);
        if (this.deprecatedSupport) {
            item.deprecated = true;
        }
        return item;
    };
    DockerAssist.prototype.createONBUILD = function (prefixLength, offset, markdown) {
        return this.createKeywordCompletionItem("ONBUILD", "ONBUILD INSTRUCTION", prefixLength, offset, "ONBUILD ${1:INSTRUCTION}", markdown);
    };
    DockerAssist.prototype.createRUN = function (prefixLength, offset, markdown) {
        return this.createKeywordCompletionItem("RUN", "RUN command", prefixLength, offset, "RUN ${1:command}", markdown);
    };
    DockerAssist.prototype.createSHELL = function (prefixLength, offset, markdown) {
        return this.createKeywordCompletionItem("SHELL", "SHELL [ \"executable\" ]", prefixLength, offset, "SHELL [ \"${1:executable}\" ]", markdown);
    };
    DockerAssist.prototype.createSTOPSIGNAL = function (prefixLength, offset, markdown) {
        return this.createKeywordCompletionItem("STOPSIGNAL", "STOPSIGNAL signal", prefixLength, offset, "STOPSIGNAL ${1:signal}", markdown);
    };
    DockerAssist.prototype.createUSER = function (prefixLength, offset, markdown) {
        return this.createKeywordCompletionItem("USER", "USER daemon", prefixLength, offset, "USER ${1:daemon}", markdown);
    };
    DockerAssist.prototype.createVOLUME = function (prefixLength, offset, markdown) {
        return this.createKeywordCompletionItem("VOLUME", "VOLUME [ \"/data\" ]", prefixLength, offset, "VOLUME [ \"${1:/data}\" ]", markdown);
    };
    DockerAssist.prototype.createWORKDIR = function (prefixLength, offset, markdown) {
        return this.createKeywordCompletionItem("WORKDIR", "WORKDIR /the/workdir/path", prefixLength, offset, "WORKDIR ${1:/the/workdir/path}", markdown);
    };
    DockerAssist.prototype.createEscape = function (prefixLength, offset, markdown) {
        return this.createKeywordCompletionItem(dockerfile_ast_1.Directive.escape, "escape=`", prefixLength, offset, "escape=${1:`}", markdown);
    };
    DockerAssist.prototype.createKeywordCompletionItem = function (keyword, label, prefixLength, offset, insertText, markdown) {
        if (!this.snippetSupport) {
            // only inserting the keyword so set the label to the keyword
            label = keyword;
            // just insert the keyword if snippets are not supported by the client
            insertText = keyword;
        }
        var textEdit = this.createTextEdit(prefixLength, offset, insertText);
        return {
            data: markdown,
            textEdit: textEdit,
            label: label,
            kind: vscode_languageserver_types_1.CompletionItemKind.Keyword,
            insertTextFormat: this.snippetSupport ? vscode_languageserver_types_1.InsertTextFormat.Snippet : vscode_languageserver_types_1.InsertTextFormat.PlainText,
        };
    };
    DockerAssist.prototype.createPlainTextCompletionItem = function (label, prefixLength, offset, insertText, markdown) {
        var textEdit = this.createTextEdit(prefixLength, offset, insertText);
        return {
            data: markdown,
            textEdit: textEdit,
            label: label,
            kind: vscode_languageserver_types_1.CompletionItemKind.Keyword,
            insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.PlainText,
        };
    };
    DockerAssist.prototype.createFlagCompletionItem = function (label, prefixLength, offset, insertText, markdown) {
        var textEdit = this.createTextEdit(prefixLength, offset, insertText);
        return {
            data: markdown,
            textEdit: textEdit,
            label: label,
            kind: vscode_languageserver_types_1.CompletionItemKind.Field,
            insertTextFormat: this.snippetSupport ? vscode_languageserver_types_1.InsertTextFormat.Snippet : vscode_languageserver_types_1.InsertTextFormat.PlainText,
        };
    };
    DockerAssist.prototype.createSourceImageCompletionItem = function (label, documentation, buildIndex, prefixLength, offset) {
        return {
            textEdit: this.createTextEdit(prefixLength, offset, label),
            label: label,
            documentation: documentation,
            kind: vscode_languageserver_types_1.CompletionItemKind.Reference,
            insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.PlainText,
            sortText: buildIndex.toString()
        };
    };
    DockerAssist.prototype.createVariableCompletionItem = function (text, prefixLength, offset, brace, documentation) {
        text = brace ? "${" + text + '}' : '$' + text;
        return {
            textEdit: this.createTextEdit(prefixLength, offset, text),
            label: text,
            kind: vscode_languageserver_types_1.CompletionItemKind.Variable,
            insertTextFormat: vscode_languageserver_types_1.InsertTextFormat.PlainText,
            documentation: documentation
        };
    };
    DockerAssist.prototype.createTextEdit = function (prefixLength, offset, content) {
        if (prefixLength === 0) {
            return vscode_languageserver_types_1.TextEdit.insert(this.document.positionAt(offset), content);
        }
        return vscode_languageserver_types_1.TextEdit.replace(vscode_languageserver_types_1.Range.create(this.document.positionAt(offset - prefixLength), this.document.positionAt(offset)), content);
    };
    return DockerAssist;
}());
exports.DockerAssist = DockerAssist;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
var vscode_languageserver_types_1 = __webpack_require__(0);
var dockerfile_utils_1 = __webpack_require__(29);
var main_1 = __webpack_require__(63);
var DockerCommands = /** @class */ (function () {
    function DockerCommands() {
    }
    DockerCommands.prototype.analyzeDiagnostics = function (diagnostics, textDocumentURI) {
        var commands = [];
        for (var i = 0; i < diagnostics.length; i++) {
            // Diagnostic's code is (number | string), convert it if necessary
            if (typeof diagnostics[i].code === "string") {
                diagnostics[i].code = parseInt(diagnostics[i].code);
            }
            switch (diagnostics[i].code) {
                case dockerfile_utils_1.ValidationCode.CASING_DIRECTIVE:
                    commands.push({
                        title: "Convert directive to lowercase",
                        command: main_1.CommandIds.LOWERCASE,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    break;
                case dockerfile_utils_1.ValidationCode.CASING_INSTRUCTION:
                    commands.push({
                        title: "Convert instruction to uppercase",
                        command: main_1.CommandIds.UPPERCASE,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    break;
                case dockerfile_utils_1.ValidationCode.ARGUMENT_EXTRA:
                    commands.push({
                        title: "Remove extra argument",
                        command: main_1.CommandIds.EXTRA_ARGUMENT,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    break;
                case dockerfile_utils_1.ValidationCode.INVALID_ESCAPE_DIRECTIVE:
                    commands.push({
                        title: "Convert to backslash",
                        command: main_1.CommandIds.DIRECTIVE_TO_BACKSLASH,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    commands.push({
                        title: "Convert to backtick",
                        command: main_1.CommandIds.DIRECTIVE_TO_BACKTICK,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    break;
                case dockerfile_utils_1.ValidationCode.INVALID_AS:
                    commands.push({
                        title: "Convert to AS",
                        command: main_1.CommandIds.CONVERT_TO_AS,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    break;
                case dockerfile_utils_1.ValidationCode.UNKNOWN_HEALTHCHECK_FLAG:
                    commands.push({
                        title: "Convert to --interval",
                        command: main_1.CommandIds.FLAG_TO_HEALTHCHECK_INTERVAL,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    commands.push({
                        title: "Convert to --retries",
                        command: main_1.CommandIds.FLAG_TO_HEALTHCHECK_RETRIES,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    commands.push({
                        title: "Convert to --start-period",
                        command: main_1.CommandIds.FLAG_TO_HEALTHCHECK_START_PERIOD,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    commands.push({
                        title: "Convert to --timeout",
                        command: main_1.CommandIds.FLAG_TO_HEALTHCHECK_TIMEOUT,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    break;
                case dockerfile_utils_1.ValidationCode.UNKNOWN_ADD_FLAG:
                    commands.push({
                        title: "Convert to --chown",
                        command: main_1.CommandIds.FLAG_TO_CHOWN,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    break;
                case dockerfile_utils_1.ValidationCode.UNKNOWN_COPY_FLAG:
                    commands.push({
                        title: "Convert to --chown",
                        command: main_1.CommandIds.FLAG_TO_CHOWN,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    commands.push({
                        title: "Convert to --from",
                        command: main_1.CommandIds.FLAG_TO_COPY_FROM,
                        arguments: [textDocumentURI, diagnostics[i].range]
                    });
                    break;
                case dockerfile_utils_1.ValidationCode.EMPTY_CONTINUATION_LINE:
                    if (diagnostics[i].range.start.line + 1 === diagnostics[i].range.end.line) {
                        commands.push({
                            title: "Remove empty continuation line",
                            command: main_1.CommandIds.REMOVE_EMPTY_CONTINUATION_LINE,
                            arguments: [textDocumentURI, diagnostics[i].range]
                        });
                    }
                    else {
                        commands.push({
                            title: "Remove empty continuation lines",
                            command: main_1.CommandIds.REMOVE_EMPTY_CONTINUATION_LINE,
                            arguments: [textDocumentURI, diagnostics[i].range]
                        });
                    }
                    break;
            }
        }
        return commands;
    };
    DockerCommands.prototype.computeCommandEdits = function (content, command, args) {
        var document = vscode_languageserver_types_1.TextDocument.create("", "", 0, content);
        var range = args[1];
        switch (command) {
            case main_1.CommandIds.LOWERCASE:
                var directive = document.getText().substring(document.offsetAt(range.start), document.offsetAt(range.end));
                return [
                    vscode_languageserver_types_1.TextEdit.replace(range, directive.toLowerCase())
                ];
            case main_1.CommandIds.UPPERCASE:
                var instruction = document.getText().substring(document.offsetAt(range.start), document.offsetAt(range.end));
                return [
                    vscode_languageserver_types_1.TextEdit.replace(range, instruction.toUpperCase())
                ];
            case main_1.CommandIds.EXTRA_ARGUMENT:
                return [
                    vscode_languageserver_types_1.TextEdit.del(range)
                ];
            case main_1.CommandIds.DIRECTIVE_TO_BACKSLASH:
                return [
                    vscode_languageserver_types_1.TextEdit.replace(range, '\\')
                ];
            case main_1.CommandIds.DIRECTIVE_TO_BACKTICK:
                return [
                    vscode_languageserver_types_1.TextEdit.replace(range, '`')
                ];
            case main_1.CommandIds.CONVERT_TO_AS:
                return [
                    vscode_languageserver_types_1.TextEdit.replace(range, "AS")
                ];
            case main_1.CommandIds.FLAG_TO_CHOWN:
                return [
                    vscode_languageserver_types_1.TextEdit.replace(range, "--chown")
                ];
            case main_1.CommandIds.FLAG_TO_HEALTHCHECK_INTERVAL:
                return [
                    vscode_languageserver_types_1.TextEdit.replace(range, "--interval")
                ];
            case main_1.CommandIds.FLAG_TO_HEALTHCHECK_RETRIES:
                return [
                    vscode_languageserver_types_1.TextEdit.replace(range, "--retries")
                ];
            case main_1.CommandIds.FLAG_TO_HEALTHCHECK_START_PERIOD:
                return [
                    vscode_languageserver_types_1.TextEdit.replace(range, "--start-period")
                ];
            case main_1.CommandIds.FLAG_TO_HEALTHCHECK_TIMEOUT:
                return [
                    vscode_languageserver_types_1.TextEdit.replace(range, "--timeout")
                ];
            case main_1.CommandIds.FLAG_TO_COPY_FROM:
                return [
                    vscode_languageserver_types_1.TextEdit.replace(range, "--from")
                ];
            case main_1.CommandIds.REMOVE_EMPTY_CONTINUATION_LINE:
                return [
                    vscode_languageserver_types_1.TextEdit.del(range)
                ];
        }
        return null;
    };
    return DockerCommands;
}());
exports.DockerCommands = DockerCommands;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
* Copyright (c) Remy Suen. All rights reserved.
* Licensed under the MIT License. See License.txt in the project root for license information.
* ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
var vscode_languageserver_types_1 = __webpack_require__(0);
var dockerMarkdown_1 = __webpack_require__(62);
var dockerPlainText_1 = __webpack_require__(31);
var DockerCompletion = /** @class */ (function () {
    function DockerCompletion() {
        this.dockerMarkdown = new dockerMarkdown_1.MarkdownDocumentation();
        this.dockerPlainText = new dockerPlainText_1.PlainTextDocumentation();
    }
    DockerCompletion.prototype.resolveCompletionItem = function (item, documentationFormat) {
        if (!item.documentation && item.data) {
            if (documentationFormat === undefined || documentationFormat === null) {
                item.documentation = this.dockerPlainText.getDocumentation(item.data);
            }
            else {
                for (var _i = 0, documentationFormat_1 = documentationFormat; _i < documentationFormat_1.length; _i++) {
                    var format = documentationFormat_1[_i];
                    if (format === vscode_languageserver_types_1.MarkupKind.PlainText) {
                        item.documentation = {
                            kind: vscode_languageserver_types_1.MarkupKind.PlainText,
                            value: this.dockerPlainText.getDocumentation(item.data)
                        };
                        return item;
                    }
                    else if (format === vscode_languageserver_types_1.MarkupKind.Markdown) {
                        item.documentation = {
                            kind: vscode_languageserver_types_1.MarkupKind.Markdown,
                            value: this.dockerMarkdown.getMarkdown(item.data).contents
                        };
                        return item;
                    }
                }
                // no known format detected, just use plain text then
                item.documentation = this.dockerPlainText.getDocumentation(item.data);
            }
        }
        return item;
    };
    return DockerCompletion;
}());
exports.DockerCompletion = DockerCompletion;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
* Copyright (c) Remy Suen. All rights reserved.
* Licensed under the MIT License. See License.txt in the project root for license information.
* ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
var vscode_languageserver_types_1 = __webpack_require__(0);
var dockerfile_ast_1 = __webpack_require__(1);
var DockerFolding = /** @class */ (function () {
    function DockerFolding() {
    }
    DockerFolding.prototype.createFoldingRange = function (foldingRangeLineFoldingOnly, startLine, endLine, startCharacter, endCharacter, kind) {
        if (foldingRangeLineFoldingOnly) {
            return {
                startLine: startLine,
                endLine: endLine,
                kind: kind
            };
        }
        return vscode_languageserver_types_1.FoldingRange.create(startLine, endLine, startCharacter, endCharacter, kind);
    };
    DockerFolding.prototype.getLineLength = function (document, line) {
        var text = document.getText(vscode_languageserver_types_1.Range.create(line, 0, line, Number.MAX_SAFE_INTEGER));
        var length = text.length;
        var char = text.charAt(length - 1);
        while (char === '\r' || char === '\n') {
            length--;
            char = text.charAt(length - 1);
        }
        return length;
    };
    DockerFolding.prototype.computeFoldingRanges = function (content, lineFoldingOnly, limit) {
        if (limit < 1) {
            return [];
        }
        var ranges = [];
        var dockerfile = dockerfile_ast_1.DockerfileParser.parse(content);
        var document = vscode_languageserver_types_1.TextDocument.create("", "", 0, content);
        for (var _i = 0, _a = dockerfile.getInstructions(); _i < _a.length; _i++) {
            var instruction = _a[_i];
            var range = instruction.getRange();
            if (range.start.line !== range.end.line) {
                var startLineLength = this.getLineLength(document, range.start.line);
                var endLineLength = this.getLineLength(document, range.end.line);
                ranges.push(this.createFoldingRange(lineFoldingOnly, range.start.line, range.end.line, startLineLength, endLineLength));
                if (ranges.length === limit) {
                    // return if we've reached the client's desired limit
                    return ranges;
                }
            }
        }
        var comments = dockerfile.getComments();
        if (comments.length < 2) {
            // no folding if zero or one comment
            return ranges;
        }
        var found = false;
        var startRange = comments[0].getRange();
        var end = vscode_languageserver_types_1.Position.create(startRange.start.line + 1, startRange.start.character);
        for (var i = 1; i < comments.length; i++) {
            var range = comments[i].getRange();
            if (range.start.line === end.line) {
                // lines match, increment the folding range
                end = vscode_languageserver_types_1.Position.create(range.end.line + 1, range.end.character);
                found = true;
            }
            else {
                if (found) {
                    // fold the previously found lines
                    ranges.push(this.createFoldingRange(lineFoldingOnly, startRange.start.line, end.line - 1, startRange.end.character, end.character, vscode_languageserver_types_1.FoldingRangeKind.Comment));
                    if (ranges.length === limit) {
                        // return if we've reached the client's desired limit
                        return ranges;
                    }
                }
                // reset
                startRange = range;
                end = vscode_languageserver_types_1.Position.create(startRange.start.line + 1, startRange.start.character);
                found = false;
            }
        }
        // loop ended, consider fold any found lines if necessary
        if (found) {
            ranges.push(this.createFoldingRange(lineFoldingOnly, startRange.start.line, end.line - 1, startRange.end.character, end.character, vscode_languageserver_types_1.FoldingRangeKind.Comment));
        }
        return ranges;
    };
    return DockerFolding;
}());
exports.DockerFolding = DockerFolding;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
* Copyright (c) Remy Suen. All rights reserved.
* Licensed under the MIT License. See License.txt in the project root for license information.
* ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
var vscode_languageserver_types_1 = __webpack_require__(0);
var dockerfile_ast_1 = __webpack_require__(1);
var DockerFormatter = /** @class */ (function () {
    function DockerFormatter() {
    }
    DockerFormatter.prototype.getIndentation = function (formattingOptions) {
        var indentation = "\t";
        if (formattingOptions && formattingOptions.insertSpaces) {
            indentation = "";
            for (var i = 0; i < formattingOptions.tabSize; i++) {
                indentation = indentation + " ";
            }
        }
        return indentation;
    };
    /**
     * Creates a TextEdit for formatting the given document.
     *
     * @param document the document being formatted
     * @param start the start offset of the document's content to be replaced
     * @param end the end offset of the document's content to be replaced
     * @param indent true if this block should be replaced with an indentation, false otherwise
     * @param indentation the string to use for an indentation
     */
    DockerFormatter.prototype.createFormattingEdit = function (document, start, end, indent, indentation) {
        if (indent) {
            return vscode_languageserver_types_1.TextEdit.replace({
                start: document.positionAt(start),
                end: document.positionAt(end)
            }, indentation);
        }
        else {
            return vscode_languageserver_types_1.TextEdit.del({
                start: document.positionAt(start),
                end: document.positionAt(end)
            });
        }
    };
    DockerFormatter.prototype.formatOnType = function (content, position, ch, options) {
        var dockerfile = dockerfile_ast_1.DockerfileParser.parse(content);
        // check that the inserted character is the escape character
        if (dockerfile.getEscapeCharacter() === ch) {
            for (var _i = 0, _a = dockerfile.getComments(); _i < _a.length; _i++) {
                var comment = _a[_i];
                // ignore if we're in a comment
                if (comment.getRange().start.line === position.line) {
                    return [];
                }
            }
            var directive = dockerfile.getDirective();
            // ignore if we're in the parser directive
            if (directive && position.line === 0) {
                return [];
            }
            var document = vscode_languageserver_types_1.TextDocument.create("", "", 0, content);
            validityCheck: for (var i = document.offsetAt(position); i < content.length; i++) {
                switch (content.charAt(i)) {
                    case ' ':
                    case '\t':
                        break;
                    case '\r':
                    case '\n':
                        break validityCheck;
                    default:
                        // not escaping a newline, no need to format the next line
                        return [];
                }
            }
            var lines = [position.line + 1];
            var indentedLines = [];
            indentedLines[lines[0]] = true;
            return this.formatLines(document, document.getText(), lines, indentedLines, options);
        }
        return [];
    };
    DockerFormatter.prototype.formatRange = function (content, range, options) {
        var lines = [];
        for (var i = range.start.line; i <= range.end.line; i++) {
            lines.push(i);
        }
        return this.format(content, lines, options);
    };
    /**
     * Formats the specified lines of the given document based on the
     * provided formatting options.
     *
     * @param document the text document to format
     * @param lines the lines to format
     * @param options the formatting options to use to perform the format
     * @return the text edits to apply to format the lines of the document
     */
    DockerFormatter.prototype.format = function (content, lines, options) {
        var document = vscode_languageserver_types_1.TextDocument.create("", "", 0, content);
        var dockerfile = dockerfile_ast_1.DockerfileParser.parse(content);
        var indentedLines = [];
        for (var i = 0; i < document.lineCount; i++) {
            indentedLines[i] = false;
        }
        for (var _i = 0, _a = dockerfile.getInstructions(); _i < _a.length; _i++) {
            var instruction = _a[_i];
            var range = instruction.getRange();
            indentedLines[range.start.line] = false;
            for (var i = range.start.line + 1; i <= range.end.line; i++) {
                indentedLines[i] = true;
            }
        }
        return this.formatLines(document, content, lines, indentedLines, options);
    };
    DockerFormatter.prototype.formatLines = function (document, content, lines, indentedLines, options) {
        var indentation = this.getIndentation(options);
        var edits = [];
        lineCheck: for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            var startOffset = document.offsetAt(vscode_languageserver_types_1.Position.create(line, 0));
            for (var i = startOffset; i < content.length; i++) {
                switch (content.charAt(i)) {
                    case ' ':
                    case '\t':
                        break;
                    case '\r':
                    case '\n':
                        if (i !== startOffset) {
                            // only whitespace on this line, trim it
                            var edit = vscode_languageserver_types_1.TextEdit.del({
                                start: document.positionAt(startOffset),
                                end: document.positionAt(i)
                            });
                            edits.push(edit);
                        }
                        // process the next line
                        continue lineCheck;
                    default:
                        // non-whitespace encountered
                        if (i !== startOffset || indentedLines[line]) {
                            var edit = this.createFormattingEdit(document, startOffset, i, indentedLines[line], indentation);
                            edits.push(edit);
                        }
                        // process the next line
                        continue lineCheck;
                }
            }
            if (startOffset < content.length) {
                // only whitespace on the last line, trim it
                var edit = vscode_languageserver_types_1.TextEdit.del({
                    start: document.positionAt(startOffset),
                    end: document.positionAt(content.length)
                });
                edits.push(edit);
            }
        }
        return edits;
    };
    return DockerFormatter;
}());
exports.DockerFormatter = DockerFormatter;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
var vscode_languageserver_types_1 = __webpack_require__(0);
var dockerfile_ast_1 = __webpack_require__(1);
var docker_1 = __webpack_require__(10);
var DockerHover = /** @class */ (function () {
    function DockerHover(markdown, plainText) {
        this.markdown = markdown;
        this.plainText = plainText;
    }
    DockerHover.prototype.onHover = function (content, position, markupKind) {
        var dockerfile = dockerfile_ast_1.DockerfileParser.parse(content);
        var image = dockerfile.getContainingImage(position);
        if (!image) {
            // position is invalid, not inside the Dockerfile
            return null;
        }
        var key = this.computeHoverKey(dockerfile, position);
        if (key) {
            // if it's not a raw value, apply markup if necessary
            if (markupKind && markupKind.length > 0) {
                switch (markupKind[0]) {
                    case vscode_languageserver_types_1.MarkupKind.Markdown:
                        var markdownDocumentation = this.markdown.getMarkdown(key);
                        if (markdownDocumentation) {
                            return {
                                contents: {
                                    kind: vscode_languageserver_types_1.MarkupKind.Markdown,
                                    value: markdownDocumentation.contents
                                }
                            };
                        }
                        return null;
                    case vscode_languageserver_types_1.MarkupKind.PlainText:
                        var plainTextDocumentation = this.plainText.getDocumentation(key);
                        if (plainTextDocumentation) {
                            return {
                                contents: {
                                    kind: vscode_languageserver_types_1.MarkupKind.PlainText,
                                    value: plainTextDocumentation
                                }
                            };
                        }
                }
                return null;
            }
            return this.markdown.getMarkdown(key);
        }
        for (var _i = 0, _a = image.getInstructions(); _i < _a.length; _i++) {
            var instruction = _a[_i];
            if (instruction instanceof dockerfile_ast_1.Arg) {
                // hovering over an argument defined by ARG
                var property = instruction.getProperty();
                if (property && docker_1.Util.isInsideRange(position, property.getNameRange()) && property.getValue() !== null) {
                    return { contents: property.getValue() };
                }
            }
            if (instruction instanceof dockerfile_ast_1.Env) {
                // hovering over an argument defined by ENV
                for (var _b = 0, _c = instruction.getProperties(); _b < _c.length; _b++) {
                    var property = _c[_b];
                    if (docker_1.Util.isInsideRange(position, property.getNameRange()) && property.getValue() !== null) {
                        return {
                            contents: property.getValue()
                        };
                    }
                }
            }
        }
        for (var _d = 0, _e = image.getInstructions(); _d < _e.length; _d++) {
            var instruction = _e[_d];
            for (var _f = 0, _g = instruction.getVariables(); _f < _g.length; _f++) {
                var variable = _g[_f];
                // are we hovering over a variable
                if (docker_1.Util.isInsideRange(position, variable.getNameRange())) {
                    var resolved = dockerfile.resolveVariable(variable.getName(), variable.getNameRange().start.line);
                    if (resolved || resolved === "") {
                        return { contents: resolved };
                    }
                    else if (resolved === null) {
                        return null;
                    }
                }
            }
        }
        return null;
    };
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
    DockerHover.prototype.computeHoverKey = function (dockerfile, position) {
        for (var _i = 0, _a = dockerfile.getDirectives(); _i < _a.length; _i++) {
            var directive = _a[_i];
            if (directive.getDirective() === dockerfile_ast_1.Directive.escape) {
                var range = directive.getNameRange();
                if (docker_1.Util.isInsideRange(position, range)) {
                    return dockerfile_ast_1.Directive.escape;
                }
            }
        }
        var image = dockerfile.getContainingImage(position);
        for (var _b = 0, _c = image.getInstructions(); _b < _c.length; _b++) {
            var instruction = _c[_b];
            var instructionRange = instruction.getInstructionRange();
            if (docker_1.Util.isInsideRange(position, instructionRange)) {
                return instruction.getKeyword();
            }
            if (instruction instanceof dockerfile_ast_1.Onbuild) {
                // hovering over a trigger instruction of an ONBUILD
                var range = instruction.getTriggerRange();
                if (docker_1.Util.isInsideRange(position, range)) {
                    return instruction.getTrigger();
                }
            }
            var hover = this.getFlagsHover(position, instruction);
            if (hover !== null) {
                return hover;
            }
        }
        return null;
    };
    DockerHover.prototype.getFlagsHover = function (position, instruction) {
        switch (instruction.getKeyword()) {
            case "ADD":
                var addFlags = instruction.getFlags();
                for (var _i = 0, addFlags_1 = addFlags; _i < addFlags_1.length; _i++) {
                    var flag = addFlags_1[_i];
                    if (docker_1.Util.isInsideRange(position, flag.getNameRange())) {
                        switch (flag.getName()) {
                            case "chown":
                                return "ADD_FlagChown";
                        }
                    }
                }
                break;
            case "COPY":
                var copyFlags = instruction.getFlags();
                for (var _a = 0, copyFlags_1 = copyFlags; _a < copyFlags_1.length; _a++) {
                    var flag = copyFlags_1[_a];
                    if (docker_1.Util.isInsideRange(position, flag.getNameRange())) {
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
                var fromFlags = instruction.getFlags();
                for (var _b = 0, fromFlags_1 = fromFlags; _b < fromFlags_1.length; _b++) {
                    var flag = fromFlags_1[_b];
                    if (docker_1.Util.isInsideRange(position, flag.getNameRange())) {
                        if (flag.getName() === "platform") {
                            return "FROM_FlagPlatform";
                        }
                        return null;
                    }
                }
                break;
            case "HEALTHCHECK":
                var flags = instruction.getFlags();
                for (var _c = 0, flags_1 = flags; _c < flags_1.length; _c++) {
                    var flag = flags_1[_c];
                    if (docker_1.Util.isInsideRange(position, flag.getNameRange())) {
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
                var trigger = instruction.getTriggerInstruction();
                if (trigger !== null) {
                    return this.getFlagsHover(position, trigger);
                }
                break;
        }
        return null;
    };
    return DockerHover;
}());
exports.DockerHover = DockerHover;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
var dockerfile_ast_1 = __webpack_require__(1);
var DockerLinks = /** @class */ (function () {
    function DockerLinks() {
    }
    DockerLinks.prototype.getLinks = function (content) {
        var dockerfile = dockerfile_ast_1.DockerfileParser.parse(content);
        var links = [];
        for (var _i = 0, _a = dockerfile.getFROMs(); _i < _a.length; _i++) {
            var from = _a[_i];
            var name = from.getImageName();
            if (name) {
                if (name.indexOf('/') === -1) {
                    links.push({
                        range: from.getImageNameRange(),
                        data: "_/" + name + '/'
                    });
                }
                else {
                    links.push({
                        range: from.getImageNameRange(),
                        data: "r/" + name + '/'
                    });
                }
            }
        }
        return links;
    };
    DockerLinks.prototype.resolveLink = function (link) {
        if (link.data) {
            link.target = "https://hub.docker.com/" + link.data;
        }
        return link;
    };
    return DockerLinks;
}());
exports.DockerLinks = DockerLinks;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
* Copyright (c) Remy Suen. All rights reserved.
* Licensed under the MIT License. See License.txt in the project root for license information.
* ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
var https = __webpack_require__(74);
/**
 * The DockerRegistryClient provides a way to communicate with the
 * official Docker registry hosted on Docker Hub.
 */
var DockerRegistryClient = /** @class */ (function () {
    function DockerRegistryClient(logger) {
        this.logger = logger;
    }
    /**
     * Gets the list of tags of the specified image from the Docker registry on Docker Hub.
     *
     * @param image the name of the interested image
     * @param prefix an optional prefix for filtering the list of tags
     * @return a promise that resolves to the specified image's list
     *         of tags, may be empty
     */
    DockerRegistryClient.prototype.getTags = function (image, prefix) {
        var _this = this;
        if (image.indexOf('/') === -1) {
            image = "library/" + image;
        }
        return this.requestToken(image).then(function (data) {
            if (data === null) {
                return [];
            }
            return _this.listTags(data.token, image).then(function (data) {
                if (!prefix) {
                    return data.tags;
                }
                var tags = [];
                for (var _i = 0, _a = data.tags; _i < _a.length; _i++) {
                    var tag = _a[_i];
                    if (tag.indexOf(prefix) === 0) {
                        tags.push(tag);
                    }
                }
                return tags;
            });
        });
    };
    /**
     * Requests for an authentication token from the Docker registry
     * for accessing the given image.
     *
     * @param image the name of the interested image
     * @return a promise that resolves to the authentication token if
     *         successful, or null if an error has occurred
     */
    DockerRegistryClient.prototype.requestToken = function (image) {
        var _this = this;
        return this.performHttpsGet({
            hostname: "auth.docker.io",
            port: 443,
            path: "/token?service=registry.docker.io&scope=repository:" + image + ":pull",
            headers: {
                Accept: "application/json"
            }
        }).catch(function (error) {
            _this.log(error);
            return null;
        });
    };
    /**
     * Queries the registry for the given image's list of tags.
     *
     * @param authToken the authentication token to use for the GET
     * @param image the name of the interested image
     * @return a promise that will resolve to the image's list of
     *         tags, an empty array will be returned if an error
     *         occurs during the GET request
     */
    DockerRegistryClient.prototype.listTags = function (authToken, image) {
        var _this = this;
        return this.performHttpsGet({
            hostname: "registry-1.docker.io",
            port: 443,
            path: "/v2/" + image + "/tags/list",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + authToken
            }
        }).catch(function (error) {
            _this.log(error);
            return { tags: [] };
        });
    };
    DockerRegistryClient.prototype.performHttpsGet = function (opts) {
        return new Promise(function (resolve, reject) {
            var request = https.get(opts, function (response) {
                if (response.statusCode !== 200) {
                    // not a 200 OK, reject the promise with the error
                    var error = new Error(response.statusMessage);
                    error.statusCode = response.statusCode;
                    reject(error);
                }
                else {
                    var buffer_1 = '';
                    response.on('data', function (data) {
                        buffer_1 += data;
                    });
                    response.on('end', function () {
                        resolve(JSON.parse(buffer_1));
                    });
                }
            });
            request.end();
            request.on('error', function (error) {
                reject(error);
            });
        });
    };
    DockerRegistryClient.prototype.log = function (error) {
        if (this.logger) {
            this.logger.log(error.toString());
        }
    };
    return DockerRegistryClient;
}());
exports.DockerRegistryClient = DockerRegistryClient;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
var vscode_languageserver_types_1 = __webpack_require__(0);
var dockerfile_ast_1 = __webpack_require__(1);
var dockerHighlight_1 = __webpack_require__(61);
var docker_1 = __webpack_require__(10);
var DockerRename = /** @class */ (function () {
    function DockerRename() {
    }
    DockerRename.prototype.prepareRename = function (content, position) {
        var dockerfile = dockerfile_ast_1.DockerfileParser.parse(content);
        var image = dockerfile.getContainingImage(position);
        for (var _i = 0, _a = dockerfile.getCOPYs(); _i < _a.length; _i++) {
            var instruction = _a[_i];
            var flag = instruction.getFromFlag();
            if (flag) {
                var range = flag.getValueRange();
                if (docker_1.Util.isInsideRange(position, range)) {
                    return range;
                }
            }
        }
        for (var _b = 0, _c = image.getFROMs(); _b < _c.length; _b++) {
            var from = _c[_b];
            if (docker_1.Util.isInsideRange(position, from.getBuildStageRange())) {
                return from.getBuildStageRange();
            }
        }
        for (var _d = 0, _e = image.getENVs(); _d < _e.length; _d++) {
            var env = _e[_d];
            for (var _f = 0, _g = env.getProperties(); _f < _g.length; _f++) {
                var property = _g[_f];
                if (docker_1.Util.isInsideRange(position, property.getNameRange())) {
                    return property.getNameRange();
                }
            }
        }
        for (var _h = 0, _j = image.getARGs(); _h < _j.length; _h++) {
            var arg = _j[_h];
            var property = arg.getProperty();
            if (property !== null && docker_1.Util.isInsideRange(position, property.getNameRange())) {
                return property.getNameRange();
            }
        }
        for (var _k = 0, _l = image.getInstructions(); _k < _l.length; _k++) {
            var instruction = _l[_k];
            for (var _m = 0, _o = instruction.getVariables(); _m < _o.length; _m++) {
                var variable = _o[_m];
                if (docker_1.Util.isInsideRange(position, variable.getNameRange())) {
                    return variable.getNameRange();
                }
            }
        }
        return null;
    };
    DockerRename.prototype.rename = function (textDocument, content, position, newName) {
        var edits = [];
        var highlighter = new dockerHighlight_1.DockerHighlight();
        var highlightRanges = highlighter.computeHighlightRanges(content, position);
        for (var _i = 0, highlightRanges_1 = highlightRanges; _i < highlightRanges_1.length; _i++) {
            var highlightRange = highlightRanges_1[_i];
            edits.push(vscode_languageserver_types_1.TextEdit.replace(highlightRange.range, newName));
        }
        return edits;
    };
    return DockerRename;
}());
exports.DockerRename = DockerRename;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
var protocol_sematicTokens_proposed_1 = __webpack_require__(65);
var dockerfile_ast_1 = __webpack_require__(1);
var vscode_languageserver_types_1 = __webpack_require__(0);
var TokensLegend = /** @class */ (function () {
    function TokensLegend() {
    }
    TokensLegend.init = function () {
        this.tokenTypes[protocol_sematicTokens_proposed_1.SemanticTokenTypes.keyword] = 0;
        this.tokenTypes[protocol_sematicTokens_proposed_1.SemanticTokenTypes.comment] = 1;
        this.tokenTypes[protocol_sematicTokens_proposed_1.SemanticTokenTypes.parameter] = 2;
        this.tokenTypes[protocol_sematicTokens_proposed_1.SemanticTokenTypes.property] = 3;
        this.tokenTypes[protocol_sematicTokens_proposed_1.SemanticTokenTypes.label] = 4;
        this.tokenTypes[protocol_sematicTokens_proposed_1.SemanticTokenTypes.class] = 5;
        this.tokenTypes[protocol_sematicTokens_proposed_1.SemanticTokenTypes.marco] = 6;
        this.tokenTypes[protocol_sematicTokens_proposed_1.SemanticTokenTypes.string] = 7;
        this.tokenTypes[protocol_sematicTokens_proposed_1.SemanticTokenTypes.variable] = 8;
        this.tokenModifiers[protocol_sematicTokens_proposed_1.SemanticTokenModifiers.declaration] = 1;
        this.tokenModifiers[protocol_sematicTokens_proposed_1.SemanticTokenModifiers.definition] = 2;
        this.tokenModifiers[protocol_sematicTokens_proposed_1.SemanticTokenModifiers.deprecated] = 4;
        this.tokenModifiers[protocol_sematicTokens_proposed_1.SemanticTokenModifiers.reference] = 8;
    };
    TokensLegend.getTokenType = function (type) {
        var tokenType = this.tokenTypes[type];
        return tokenType;
    };
    TokensLegend.getTokenModifiers = function (modifiers) {
        var bit = 0;
        for (var _i = 0, modifiers_1 = modifiers; _i < modifiers_1.length; _i++) {
            var modifier = modifiers_1[_i];
            bit |= this.tokenModifiers[modifier];
        }
        return bit;
    };
    TokensLegend.tokenTypes = {};
    TokensLegend.tokenModifiers = {};
    return TokensLegend;
}());
exports.TokensLegend = TokensLegend;
TokensLegend.init();
var DockerSemanticTokens = /** @class */ (function () {
    function DockerSemanticTokens() {
        this.currentRange = null;
    }
    DockerSemanticTokens.prototype.computeSemanticTokens = function (content) {
        var document = vscode_languageserver_types_1.TextDocument.create("", "", 0, content);
        var dockerfile = dockerfile_ast_1.DockerfileParser.parse(content);
        var tokens = [];
        var lines = dockerfile.getComments();
        lines = lines.concat(dockerfile.getInstructions());
        lines.sort(function (a, b) {
            return a.getRange().start.line - b.getRange().start.line;
        });
        for (var _i = 0, _a = dockerfile.getDirectives(); _i < _a.length; _i++) {
            var directive = _a[_i];
            var directiveRange = directive.getRange();
            tokens = tokens.concat(this.createToken(directiveRange, protocol_sematicTokens_proposed_1.SemanticTokenTypes.marco));
        }
        var escapeCharacter = dockerfile.getEscapeCharacter();
        for (var i = 0; i < lines.length; i++) {
            if (lines[i] instanceof dockerfile_ast_1.Comment) {
                var range = lines[i].getRange();
                tokens = tokens.concat(this.createToken(range, protocol_sematicTokens_proposed_1.SemanticTokenTypes.comment));
                this.currentRange = range;
            }
            else {
                tokens = this.createTokensForInstruction(document, escapeCharacter, lines[i], tokens);
            }
        }
        return {
            data: tokens
        };
    };
    DockerSemanticTokens.prototype.createTokensForInstruction = function (document, escapeCharacter, instruction, tokens) {
        var instructionRange = instruction.getInstructionRange();
        tokens = tokens.concat(this.createToken(instructionRange, protocol_sematicTokens_proposed_1.SemanticTokenTypes.keyword));
        this.currentRange = instructionRange;
        if (instruction instanceof dockerfile_ast_1.ModifiableInstruction) {
            for (var _i = 0, _a = instruction.getFlags(); _i < _a.length; _i++) {
                var flag = _a[_i];
                var flagRange = flag.getRange();
                var nameRange = flag.getNameRange();
                var mergedRange = {
                    start: { line: flagRange.start.line, character: flagRange.start.character },
                    end: { line: nameRange.end.line, character: nameRange.end.character }
                };
                tokens = tokens.concat(this.createToken(mergedRange, protocol_sematicTokens_proposed_1.SemanticTokenTypes.parameter));
                this.currentRange = flagRange;
                var flagValue = flag.getValue();
                if (flagValue !== null && flagValue !== "") {
                    var valueRange = flag.getValueRange();
                    tokens = tokens.concat(this.createToken(valueRange, protocol_sematicTokens_proposed_1.SemanticTokenTypes.property));
                    this.currentRange = valueRange;
                }
            }
        }
        switch (instruction.getKeyword()) {
            case dockerfile_ast_1.Keyword.FROM:
                var from = instruction;
                var nameRange = from.getImageNameRange();
                if (nameRange !== null) {
                    tokens = tokens.concat(this.createToken(nameRange, protocol_sematicTokens_proposed_1.SemanticTokenTypes.class));
                    this.currentRange = nameRange;
                }
                var tagRange = from.getImageTagRange();
                if (tagRange !== null) {
                    tokens = tokens.concat(this.createToken(tagRange, protocol_sematicTokens_proposed_1.SemanticTokenTypes.label));
                    this.currentRange = tagRange;
                }
                var digestRange = from.getImageDigestRange();
                if (digestRange !== null) {
                    tokens = tokens.concat(this.createToken(digestRange, protocol_sematicTokens_proposed_1.SemanticTokenTypes.label));
                    this.currentRange = digestRange;
                }
                var fromArgs = instruction.getArguments();
                if (fromArgs.length > 1 && fromArgs[1].getValue().toUpperCase() === "AS") {
                    var range_1 = fromArgs[1].getRange();
                    tokens = tokens.concat(this.createToken(range_1, protocol_sematicTokens_proposed_1.SemanticTokenTypes.keyword));
                    this.currentRange = range_1;
                    range_1 = from.getBuildStageRange();
                    if (range_1 !== null) {
                        tokens = tokens.concat(this.createToken(range_1, protocol_sematicTokens_proposed_1.SemanticTokenTypes.label));
                    }
                }
                break;
            case dockerfile_ast_1.Keyword.HEALTHCHECK:
                var healthcheck = instruction;
                var subcommand = healthcheck.getSubcommand();
                if (subcommand !== null) {
                    var range_2 = subcommand.getRange();
                    tokens = tokens.concat(this.createToken(range_2, protocol_sematicTokens_proposed_1.SemanticTokenTypes.keyword));
                }
                break;
            case dockerfile_ast_1.Keyword.ONBUILD:
                var onbuild = instruction;
                var range = onbuild.getTriggerRange();
                if (range !== null) {
                    tokens = this.createTokensForInstruction(document, escapeCharacter, onbuild.getTriggerInstruction(), tokens);
                }
                break;
        }
        var args = instruction.getArguments();
        if (args.length === 0) {
            return tokens;
        }
        var start = args[0].getRange().start;
        var startOffset = document.offsetAt(start);
        var argsContent = instruction.getRawArgumentsContent();
        var variables = instruction.getVariables();
        var quote = null;
        var offset = -1;
        argsLoop: for (var i = 0; i < argsContent.length; i++) {
            var ch = argsContent.charAt(i);
            switch (ch) {
                case escapeCharacter:
                    for (var j = i + 1; j < argsContent.length; j++) {
                        var escapedChar = argsContent.charAt(j);
                        switch (escapedChar) {
                            case '\"':
                            case '\'':
                                if (quote === null) {
                                    var range = {
                                        start: document.positionAt(startOffset + i),
                                        end: document.positionAt(startOffset + j + 1)
                                    };
                                    tokens = tokens.concat(this.createToken(range, protocol_sematicTokens_proposed_1.SemanticTokenTypes.string));
                                    this.currentRange = range;
                                    i = j;
                                    continue argsLoop;
                                }
                                else {
                                    var range = {
                                        start: document.positionAt(startOffset + offset),
                                        end: document.positionAt(startOffset + i)
                                    };
                                    tokens = tokens.concat(this.createToken(range, protocol_sematicTokens_proposed_1.SemanticTokenTypes.string));
                                    this.currentRange = range;
                                    range = {
                                        start: document.positionAt(startOffset + i),
                                        end: document.positionAt(startOffset + j + 1)
                                    };
                                    tokens = tokens.concat(this.createToken(range, protocol_sematicTokens_proposed_1.SemanticTokenTypes.string));
                                    this.currentRange = range;
                                    // reset as the string has been cut off part ways
                                    quote = null;
                                    offset = -1;
                                }
                            default:
                                i = j;
                                continue argsLoop;
                        }
                    }
                    break;
                case '$':
                    for (var _b = 0, variables_1 = variables; _b < variables_1.length; _b++) {
                        var variable = variables_1[_b];
                        var range = variable.getRange();
                        if (startOffset + i === document.offsetAt(range.start)) {
                            tokens = tokens.concat(this.createToken(range, protocol_sematicTokens_proposed_1.SemanticTokenTypes.variable, [protocol_sematicTokens_proposed_1.SemanticTokenModifiers.reference]));
                            this.currentRange = range;
                            variables = variables.splice(0, 1);
                            break;
                        }
                    }
                    break;
                case '\"':
                case '\'':
                    if (quote === null) {
                        quote = ch;
                        offset = i;
                    }
                    else if (quote === ch) {
                        // ensure that quotes match
                        var range = {
                            start: document.positionAt(startOffset + offset),
                            end: document.positionAt(startOffset + i + 1)
                        };
                        tokens = tokens.concat(this.createToken(range, protocol_sematicTokens_proposed_1.SemanticTokenTypes.string));
                        this.currentRange = range;
                        quote = null;
                        offset = -1;
                    }
                    break;
            }
        }
        if (quote !== null) {
            // trailing string token
            var range = {
                start: document.positionAt(startOffset + offset),
                end: document.positionAt(startOffset + argsContent.length)
            };
            tokens = tokens.concat(this.createToken(range, protocol_sematicTokens_proposed_1.SemanticTokenTypes.string));
            this.currentRange = range;
        }
        return tokens;
    };
    DockerSemanticTokens.prototype.createToken = function (range, tokenType, tokenModifiers) {
        if (tokenModifiers === void 0) { tokenModifiers = []; }
        if (this.currentRange === null) {
            return [
                range.start.line,
                range.start.character,
                range.end.character - range.start.character,
                TokensLegend.getTokenType(tokenType),
                TokensLegend.getTokenModifiers(tokenModifiers)
            ];
        }
        else if (this.currentRange.end.line !== range.start.line) {
            return [
                range.start.line - this.currentRange.end.line,
                range.start.character,
                range.end.character - range.start.character,
                TokensLegend.getTokenType(tokenType),
                TokensLegend.getTokenModifiers(tokenModifiers)
            ];
        }
        return [
            range.start.line - this.currentRange.start.line,
            range.start.character - this.currentRange.start.character,
            range.end.character - range.start.character,
            TokensLegend.getTokenType(tokenType),
            TokensLegend.getTokenModifiers(tokenModifiers)
        ];
    };
    return DockerSemanticTokens;
}());
exports.DockerSemanticTokens = DockerSemanticTokens;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
var vscode_languageserver_types_1 = __webpack_require__(0);
var dockerPlainText_1 = __webpack_require__(31);
var dockerfile_ast_1 = __webpack_require__(1);
var docker_1 = __webpack_require__(10);
var DockerSignatures = /** @class */ (function () {
    function DockerSignatures() {
        this.documentation = new dockerPlainText_1.PlainTextDocumentation();
    }
    DockerSignatures.prototype.computeSignatures = function (content, position) {
        var document = vscode_languageserver_types_1.TextDocument.create("", "", 0, content);
        var dockerfile = dockerfile_ast_1.DockerfileParser.parse(document.getText());
        if (position.line === 0) {
            var directive = dockerfile.getDirective();
            if (directive !== null && directive.getDirective() === dockerfile_ast_1.Directive.escape) {
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
                };
            }
        }
        for (var _i = 0, _a = dockerfile.getComments(); _i < _a.length; _i++) {
            var comment = _a[_i];
            if (docker_1.Util.isInsideRange(position, comment.getRange())) {
                return {
                    signatures: [],
                    activeSignature: null,
                    activeParameter: null
                };
            }
        }
        var signatureHelp = this.getInstructionSignatures(document, dockerfile.getOnbuildTriggers(), position);
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
    };
    DockerSignatures.prototype.getInstructionSignatures = function (document, instructions, position) {
        for (var _i = 0, instructions_1 = instructions; _i < instructions_1.length; _i++) {
            var instruction = instructions_1[_i];
            if (!docker_1.Util.isInsideRange(position, instruction.getRange())) {
                continue;
            }
            else if (docker_1.Util.isInsideRange(position, instruction.getInstructionRange())) {
                return null;
            }
            switch (instruction.getKeyword()) {
                case "ADD":
                    var add = instruction;
                    var addShellSignature = {
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
                    var addJsonSignature = {
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
                    var argSignatureHelp = {
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
                    var content = instruction.getTextContent();
                    var index = content.indexOf('=');
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
                    var cmd = instruction;
                    var cmdJsonExecutableSignature = {
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
                    var cmdJsonParameterSignature = {
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
                    var cmdShellSignature = {
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
                    var copy = instruction;
                    var flag = copy.getFromFlag();
                    if (flag !== null) {
                        var range = flag.getValueRange();
                        if (range !== null && docker_1.Util.isInsideRange(position, range)) {
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
                            };
                        }
                    }
                    var copyShellSignature = {
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
                    var copyJsonSignature = {
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
                    var entrypoint = instruction;
                    var entrypointJsonSignature = {
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
                    var entrypointShellSignature = {
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
                    var envSignatures = [
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
                    return this.getPropertySignatureHelp(document, position, envSignatures, instruction.getProperties());
                case "EXPOSE":
                    var exposeSignatureHelp = {
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
                    var exposeArgs = instruction.getArguments();
                    if (exposeArgs.length > 0 && document.offsetAt(position) > document.offsetAt(exposeArgs[0].getRange().end)) {
                        exposeSignatureHelp.activeParameter = 1;
                    }
                    return exposeSignatureHelp;
                case "FROM":
                    return this.getFromSignatureHelp(position, instruction);
                case "HEALTHCHECK":
                    var healthcheckCmdEmptySignature = {
                        label: "HEALTHCHECK [flags] CMD ...",
                        documentation: this.documentation.getDocumentation("signatureHealthcheck_Signature0"),
                        parameters: [
                            {
                                label: "CMD"
                            }
                        ]
                    };
                    var healthcheckCmdNormalSignature = {
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
                    var healthcheckNoneSignature = {
                        label: "HEALTHCHECK NONE",
                        documentation: this.documentation.getDocumentation("signatureHealthcheck_Signature2"),
                        parameters: [
                            {
                                label: "NONE"
                            }
                        ]
                    };
                    var healthcheck = instruction;
                    var flags = healthcheck.getFlags();
                    for (var _a = 0, flags_1 = flags; _a < flags_1.length; _a++) {
                        var flag_1 = flags_1[_a];
                        var range = flag_1.getValueRange();
                        if (range !== null && docker_1.Util.isInsideRange(position, range)) {
                            switch (flag_1.getName()) {
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
                                    };
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
                                    };
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
                                    };
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
                                    };
                            }
                            break;
                        }
                    }
                    var healthcheckArgs = healthcheck.getArguments();
                    if (flags.length == 0 && healthcheckArgs.length === 0) {
                        // no flags or args, suggest both CMD and NONE
                        return {
                            signatures: [
                                healthcheckCmdEmptySignature,
                                healthcheckNoneSignature
                            ],
                            activeSignature: 0,
                            activeParameter: 0
                        };
                    }
                    var subcommand = healthcheck.getSubcommand();
                    if (subcommand === null) {
                        return {
                            signatures: [
                                healthcheckCmdNormalSignature
                            ],
                            activeSignature: 0,
                            activeParameter: 0
                        };
                    }
                    var beforeSubcommand = subcommand.isBefore(position);
                    var afterSubcommand = subcommand.isAfter(position);
                    var subcommandValue = subcommand.getValue();
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
                        };
                    }
                    var activeHealthcheckParameter = beforeSubcommand ? 2 : afterSubcommand ? 0 : 1;
                    return {
                        signatures: [
                            healthcheckCmdNormalSignature
                        ],
                        activeSignature: 0,
                        activeParameter: activeHealthcheckParameter
                    };
                case "LABEL":
                    var labelSignatures = [
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
                    return this.getPropertySignatureHelp(document, position, labelSignatures, instruction.getProperties());
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
                    var onbuildArgs = instruction.getArguments();
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
                    var run_1 = instruction;
                    var runShellSignature = {
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
                    var runJsonSignature = {
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
                    return this.getJSONInstructionSignatureHelp(document, run_1, position, [runJsonSignature], runShellSignature, false, false, false, true);
                case "SHELL":
                    var shell = instruction;
                    var shellSignatureHelp = {
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
                    var userSignatureHelp = {
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
                    var userSeparatorIndex = instruction.getTextContent().indexOf(":");
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
                    var volume = instruction;
                    var volumeJsonSignature = {
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
                    var volumeShellSignature = {
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
    };
    DockerSignatures.prototype.getFromSignatureHelp = function (position, from) {
        var baseImage = {
            label: "FROM baseImage",
            documentation: this.documentation.getDocumentation("signatureFrom_Signature0"),
            parameters: [
                {
                    label: "baseImage",
                    documentation: this.documentation.getDocumentation("signatureFrom_Signature0_Param")
                }
            ]
        };
        var baseImageTag = {
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
        var baseImageDigest = {
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
        var baseImageStage = {
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
        var baseImageTagStage = {
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
        var baseImageDigestStage = {
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
        var fromSignatures = [
            baseImage, baseImageTag, baseImageDigest,
            baseImageStage, baseImageTagStage, baseImageDigestStage
        ];
        var args = from.getArguments();
        if (args.length >= 3 && args[2].isBefore(position)) {
            return null;
        }
        else if (args.length === 0) {
            return {
                signatures: fromSignatures,
                activeSignature: 0,
                activeParameter: 0
            };
        }
        var image = args[0].getValue();
        var digest = image.indexOf('@') !== -1;
        var tag = !digest && image.indexOf(':') !== -1;
        var stagesOnly = args.length > 1 || args[0].isBefore(position);
        return {
            signatures: this.getFromSignatures(fromSignatures, tag, digest, stagesOnly),
            activeSignature: 0,
            activeParameter: this.getFromActiveParameter(position, from, tag, digest, args)
        };
    };
    DockerSignatures.prototype.getFromSignatures = function (fromSignatures, tag, digest, stagesOnly) {
        if (digest) {
            return stagesOnly ? [fromSignatures[5]] : [fromSignatures[2], fromSignatures[5]];
        }
        else if (tag) {
            return stagesOnly ? [fromSignatures[4]] : [fromSignatures[1], fromSignatures[4]];
        }
        return stagesOnly ? [fromSignatures[3], fromSignatures[4], fromSignatures[5]] : fromSignatures;
    };
    DockerSignatures.prototype.getFromActiveParameter = function (position, from, tag, digest, args) {
        var inTag = tag && docker_1.Util.isInsideRange(position, from.getImageTagRange());
        var inDigest = digest && docker_1.Util.isInsideRange(position, from.getImageDigestRange());
        if (args.length === 1) {
            if (args[0].isBefore(position)) {
                return 2;
            }
        }
        else if (args.length === 2) {
            if (args[1].isBefore(position)) {
                return 3;
            }
            else if (docker_1.Util.isInsideRange(position, args[1].getRange()) || args[0].isBefore(position)) {
                return 2;
            }
        }
        else {
            if (docker_1.Util.isInsideRange(position, args[2].getRange()) || args[1].isBefore(position)) {
                return 3;
            }
            else if (docker_1.Util.isInsideRange(position, args[1].getRange()) || args[0].isBefore(position)) {
                return 2;
            }
        }
        return inTag || inDigest ? 1 : 0;
    };
    DockerSignatures.prototype.getJSONInstructionSignatureHelp = function (document, instruction, position, jsonSignatures, shellSignature, hasFlags, jsonFirst, singleParameter, finalRepeats) {
        var activeParameter = this.getJSONSignatureActiveParameter(document, instruction, position, hasFlags, singleParameter, finalRepeats);
        if (activeParameter === -1) {
            activeParameter = this.getSignatureActiveParameter(instruction, position, hasFlags, singleParameter ? 1 : 2, finalRepeats);
            return {
                signatures: [shellSignature],
                activeSignature: 0,
                activeParameter: activeParameter
            };
        }
        else if (activeParameter === 0) {
            if (jsonFirst) {
                jsonSignatures.push(shellSignature);
                return {
                    signatures: jsonSignatures,
                    activeSignature: 0,
                    activeParameter: 0
                };
            }
            jsonSignatures.unshift(shellSignature);
            return {
                signatures: jsonSignatures,
                activeSignature: 0,
                activeParameter: 0
            };
        }
        else if (activeParameter === 1 && hasFlags) {
            if (jsonFirst) {
                jsonSignatures.push(shellSignature);
                return {
                    signatures: jsonSignatures,
                    activeSignature: 0,
                    activeParameter: 1
                };
            }
            jsonSignatures.unshift(shellSignature);
            return {
                signatures: jsonSignatures,
                activeSignature: 0,
                activeParameter: 1
            };
        }
        return {
            signatures: jsonSignatures,
            activeSignature: 0,
            activeParameter: activeParameter
        };
    };
    DockerSignatures.prototype.getJSONSignatureActiveParameter = function (document, instruction, position, hasFlags, singleParameter, finalRepeats) {
        var flagsOffset = hasFlags ? 1 : 0;
        if (hasFlags) {
            var flags = instruction.getFlags();
            if (flags.length > 0) {
                var flagPosition = flags[flags.length - 1].getRange().end;
                if (docker_1.Util.positionBefore(position, flagPosition) || docker_1.Util.positionEquals(position, flagPosition)) {
                    return 0;
                }
            }
        }
        var closingBracket = instruction.getClosingBracket();
        if (closingBracket) {
            var range = closingBracket.getRange();
            if (range.end.line === position.line && range.end.character === position.character) {
                if (singleParameter) {
                    return 3 + flagsOffset;
                }
                return 4 + flagsOffset;
            }
            else if (closingBracket.isBefore(position)) {
                return -1;
            }
        }
        var jsonStrings = instruction.getJSONStrings();
        if (!singleParameter && jsonStrings.length > 1 && jsonStrings[1].isBefore(position)) {
            if (jsonStrings.length === 2) {
                return 3 + flagsOffset;
            }
            if (finalRepeats || docker_1.Util.isInsideRange(position, jsonStrings[jsonStrings.length - 1].getRange())) {
                return 3 + flagsOffset;
            }
            return 2 + flagsOffset;
        }
        if (jsonStrings.length > 0 && jsonStrings[0].isBefore(position)) {
            if (jsonStrings.length > 2) {
                return 2 + flagsOffset;
            }
            var start = document.offsetAt(jsonStrings[0].getRange().end);
            var end = document.offsetAt(position);
            var between = document.getText().substring(start, end);
            if (between.indexOf(',') === -1) {
                return 1 + flagsOffset;
            }
            if (finalRepeats) {
                return 2 + flagsOffset;
            }
            return 3 + flagsOffset;
        }
        var openingBracket = instruction.getOpeningBracket();
        if (openingBracket) {
            var range = openingBracket.getRange();
            if ((range.end.line === position.line && range.end.character === position.character) || openingBracket.isBefore(position)) {
                return 1 + flagsOffset;
            }
            return 0 + flagsOffset;
        }
        else if (instruction.getArguments().length === 0) {
            return 0 + flagsOffset;
        }
        return -1;
    };
    DockerSignatures.prototype.getSignatureActiveParameter = function (instruction, position, hasFlags, max, finalRepeats) {
        var flagsOffset = hasFlags ? 1 : 0;
        var args = instruction.getArguments();
        if (finalRepeats) {
            for (var i = args.length - 1; i >= 0; i--) {
                if (args[i].isBefore(position)) {
                    return Math.min(i + 1, max) + flagsOffset;
                }
                else if (docker_1.Util.isInsideRange(position, args[i].getRange())) {
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
                if (args[args.length - 1].isBefore(position) || docker_1.Util.isInsideRange(position, args[args.length - 1].getRange())) {
                    return 2 + flagsOffset;
                }
                else if (args[0].isBefore(position)) {
                    return 1 + flagsOffset;
                }
                return 0 + flagsOffset;
        }
    };
    DockerSignatures.prototype.getPropertySignatureHelp = function (document, position, signatures, properties) {
        return {
            signatures: this.getPropertySignatures(document, position, signatures, properties),
            activeSignature: 0,
            activeParameter: this.getPropertySignatureActiveParameter(document, position, properties)
        };
    };
    DockerSignatures.prototype.getPropertySignatures = function (document, position, signatures, properties) {
        if (properties.length === 0) {
            return signatures;
        }
        else if (properties.length === 1) {
            var valueRange = properties[0].getValueRange();
            if (valueRange === null) {
                return DockerSignatures.isNameBefore(properties[0], position) ? [signatures[0]] : signatures;
            }
            var delimiter = document.getText().substring(document.offsetAt(properties[0].getNameRange().end), document.offsetAt(valueRange.start));
            if (delimiter.indexOf('=') === -1) {
                return [signatures[0]];
            }
            else if (DockerSignatures.isValueBefore(properties[0], position)) {
                return [signatures[2]];
            }
        }
        else {
            return [signatures[2]];
        }
        return [signatures[1], signatures[2]];
    };
    DockerSignatures.prototype.getPropertySignatureActiveParameter = function (document, position, properties) {
        if (properties.length === 0) {
            return 0;
        }
        for (var i = properties.length - 1; i > 0; i--) {
            if (DockerSignatures.isInValue(properties[i], position)) {
                return 3;
            }
            else if (DockerSignatures.isNameBefore(properties[i], position) || DockerSignatures.isInName(properties[i], position)) {
                return 2;
            }
        }
        if (DockerSignatures.isInValue(properties[0], position)) {
            return 1;
        }
        else if (DockerSignatures.isValueBefore(properties[0], position)) {
            var delimiter = document.getText().substring(document.offsetAt(properties[0].getNameRange().end), document.offsetAt(properties[0].getValueRange().start));
            return delimiter.indexOf('=') === -1 ? 1 : 2;
        }
        return DockerSignatures.isNameBefore(properties[0], position) ? 1 : 0;
    };
    DockerSignatures.isInName = function (property, position) {
        return docker_1.Util.isInsideRange(position, property.getNameRange());
    };
    DockerSignatures.isNameBefore = function (property, position) {
        var range = property.getNameRange();
        if (DockerSignatures.isInName(property, position)) {
            return false;
        }
        else if (range.start.line < position.line) {
            return true;
        }
        return range.start.line === position.line ? range.end.character < position.character : false;
    };
    DockerSignatures.isInValue = function (property, position) {
        var range = property.getValueRange();
        return range ? docker_1.Util.isInsideRange(position, range) : false;
    };
    DockerSignatures.isValueBefore = function (property, position) {
        var range = property.getValueRange();
        if (range === null) {
            return false;
        }
        else if (range.start.line < position.line) {
            return true;
        }
        else if (range.start.line === position.line) {
            if (range.start.line === range.end.line) {
                return range.end.character < position.character;
            }
            return range.start.character < position.character;
        }
        return false;
    };
    return DockerSignatures;
}());
exports.DockerSignatures = DockerSignatures;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
var vscode_languageserver_types_1 = __webpack_require__(0);
var dockerfile_ast_1 = __webpack_require__(1);
var DockerSymbols = /** @class */ (function () {
    function DockerSymbols() {
    }
    DockerSymbols.prototype.createSymbolInformation = function (name, textDocumentURI, range, kind, deprecated) {
        if (deprecated) {
            return {
                name: name,
                location: {
                    uri: textDocumentURI,
                    range: range
                },
                kind: kind,
                deprecated: true
            };
        }
        return {
            name: name,
            location: {
                uri: textDocumentURI,
                range: range
            },
            kind: kind
        };
    };
    DockerSymbols.prototype.parseSymbolInformation = function (textDocument, content) {
        var dockerfile = dockerfile_ast_1.DockerfileParser.parse(content);
        var directive = dockerfile.getDirective();
        var symbols = [];
        if (directive !== null) {
            symbols.push(this.createSymbolInformation(directive.getName(), textDocument.uri, directive.getNameRange(), vscode_languageserver_types_1.SymbolKind.Property, false));
        }
        for (var _i = 0, _a = dockerfile.getInstructions(); _i < _a.length; _i++) {
            var instruction = _a[_i];
            var keyword = instruction.getKeyword();
            symbols.push(this.createSymbolInformation(instruction.getInstruction(), textDocument.uri, instruction.getInstructionRange(), vscode_languageserver_types_1.SymbolKind.Function, keyword === dockerfile_ast_1.Keyword.MAINTAINER));
        }
        return symbols;
    };
    return DockerSymbols;
}());
exports.DockerSymbols = DockerSymbols;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vscode_languageserver_types_1 = __webpack_require__(0);
var DockerfileUtils = __webpack_require__(29);
var dockerAssist_1 = __webpack_require__(88);
var dockerRegistryClient_1 = __webpack_require__(95);
var dockerCommands_1 = __webpack_require__(89);
var dockerFolding_1 = __webpack_require__(91);
var dockerDefinition_1 = __webpack_require__(60);
var dockerHighlight_1 = __webpack_require__(61);
var dockerSymbols_1 = __webpack_require__(99);
var dockerSignatures_1 = __webpack_require__(98);
var dockerLinks_1 = __webpack_require__(94);
var dockerPlainText_1 = __webpack_require__(31);
var dockerRename_1 = __webpack_require__(96);
var dockerHover_1 = __webpack_require__(93);
var dockerMarkdown_1 = __webpack_require__(62);
var dockerFormatter_1 = __webpack_require__(92);
var dockerCompletion_1 = __webpack_require__(90);
var dockerSemanticTokens_1 = __webpack_require__(97);
var LanguageService = /** @class */ (function () {
    function LanguageService() {
        this.markdownDocumentation = new dockerMarkdown_1.MarkdownDocumentation();
        this.plainTextDocumentation = new dockerPlainText_1.PlainTextDocumentation();
        this.snippetSupport = false;
        this.deprecatedSupport = false;
        this.foldingRangeLineFoldingOnly = false;
        this.foldingRangeLimit = Number.MAX_VALUE;
    }
    LanguageService.prototype.setLogger = function (logger) {
        this.logger = logger;
    };
    LanguageService.prototype.setCapabilities = function (capabilities) {
        this.completionDocumentationFormat = capabilities && capabilities.completion && capabilities.completion.completionItem && capabilities.completion.completionItem.documentationFormat;
        this.hoverContentFormat = capabilities && capabilities.hover && capabilities.hover.contentFormat;
        this.snippetSupport = capabilities && capabilities.completion && capabilities.completion.completionItem && capabilities.completion.completionItem.snippetSupport;
        this.deprecatedSupport = capabilities && capabilities.completion && capabilities.completion.completionItem && capabilities.completion.completionItem.deprecatedSupport;
        this.foldingRangeLineFoldingOnly = capabilities && capabilities.foldingRange && capabilities.foldingRange.lineFoldingOnly;
        this.foldingRangeLimit = capabilities && capabilities.foldingRange && capabilities.foldingRange.rangeLimit;
    };
    LanguageService.prototype.computeCodeActions = function (textDocument, range, context) {
        var dockerCommands = new dockerCommands_1.DockerCommands();
        return dockerCommands.analyzeDiagnostics(context.diagnostics, textDocument.uri);
    };
    LanguageService.prototype.computeLinks = function (content) {
        var dockerLinks = new dockerLinks_1.DockerLinks();
        return dockerLinks.getLinks(content);
    };
    LanguageService.prototype.resolveLink = function (link) {
        var dockerLinks = new dockerLinks_1.DockerLinks();
        return dockerLinks.resolveLink(link);
    };
    LanguageService.prototype.computeCommandEdits = function (content, command, args) {
        var dockerCommands = new dockerCommands_1.DockerCommands();
        return dockerCommands.computeCommandEdits(content, command, args);
    };
    LanguageService.prototype.computeCompletionItems = function (content, position) {
        var document = vscode_languageserver_types_1.TextDocument.create("", "", 0, content);
        var dockerAssist = new dockerAssist_1.DockerAssist(document, new dockerRegistryClient_1.DockerRegistryClient(this.logger), this.snippetSupport, this.deprecatedSupport);
        return dockerAssist.computeProposals(position);
    };
    LanguageService.prototype.resolveCompletionItem = function (item) {
        if (!item.documentation) {
            var dockerCompletion = new dockerCompletion_1.DockerCompletion();
            return dockerCompletion.resolveCompletionItem(item, this.completionDocumentationFormat);
        }
        return item;
    };
    LanguageService.prototype.computeDefinition = function (textDocument, content, position) {
        var dockerDefinition = new dockerDefinition_1.DockerDefinition();
        return dockerDefinition.computeDefinition(textDocument, content, position);
    };
    LanguageService.prototype.computeFoldingRanges = function (content) {
        var dockerFolding = new dockerFolding_1.DockerFolding();
        return dockerFolding.computeFoldingRanges(content, this.foldingRangeLineFoldingOnly, this.foldingRangeLimit);
    };
    LanguageService.prototype.computeHighlightRanges = function (content, position) {
        var dockerHighlight = new dockerHighlight_1.DockerHighlight();
        return dockerHighlight.computeHighlightRanges(content, position);
    };
    LanguageService.prototype.computeHover = function (content, position) {
        var dockerHover = new dockerHover_1.DockerHover(this.markdownDocumentation, this.plainTextDocumentation);
        return dockerHover.onHover(content, position, this.hoverContentFormat);
    };
    LanguageService.prototype.computeSymbols = function (textDocument, content) {
        var dockerSymbols = new dockerSymbols_1.DockerSymbols();
        return dockerSymbols.parseSymbolInformation(textDocument, content);
    };
    LanguageService.prototype.computeSignatureHelp = function (content, position) {
        var dockerSignature = new dockerSignatures_1.DockerSignatures();
        return dockerSignature.computeSignatures(content, position);
    };
    LanguageService.prototype.computeRename = function (textDocument, content, position, newName) {
        var dockerRename = new dockerRename_1.DockerRename();
        return dockerRename.rename(textDocument, content, position, newName);
    };
    LanguageService.prototype.prepareRename = function (content, position) {
        var dockerRename = new dockerRename_1.DockerRename();
        return dockerRename.prepareRename(content, position);
    };
    LanguageService.prototype.computeSemanticTokens = function (content) {
        var dockerSemanticTokens = new dockerSemanticTokens_1.DockerSemanticTokens();
        return dockerSemanticTokens.computeSemanticTokens(content);
    };
    LanguageService.prototype.validate = function (content, settings) {
        return DockerfileUtils.validate(content, settings);
    };
    LanguageService.prototype.format = function (content, options) {
        return DockerfileUtils.format(content, options);
    };
    LanguageService.prototype.formatRange = function (content, range, options) {
        var dockerFormat = new dockerFormatter_1.DockerFormatter();
        return dockerFormat.formatRange(content, range, options);
    };
    LanguageService.prototype.formatOnType = function (content, position, ch, options) {
        var dockerFormat = new dockerFormatter_1.DockerFormatter();
        return dockerFormat.formatOnType(content, position, ch, options);
    };
    return LanguageService;
}());
exports.LanguageService = LanguageService;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__(20);
const Is = __webpack_require__(13);
var CancellationToken;
(function (CancellationToken) {
    CancellationToken.None = Object.freeze({
        isCancellationRequested: false,
        onCancellationRequested: events_1.Event.None
    });
    CancellationToken.Cancelled = Object.freeze({
        isCancellationRequested: true,
        onCancellationRequested: events_1.Event.None
    });
    function is(value) {
        let candidate = value;
        return candidate && (candidate === CancellationToken.None
            || candidate === CancellationToken.Cancelled
            || (Is.boolean(candidate.isCancellationRequested) && !!candidate.onCancellationRequested));
    }
    CancellationToken.is = is;
})(CancellationToken = exports.CancellationToken || (exports.CancellationToken = {}));
const shortcutEvent = Object.freeze(function (callback, context) {
    let handle = setTimeout(callback.bind(context), 0);
    return { dispose() { clearTimeout(handle); } };
});
class MutableToken {
    constructor() {
        this._isCancelled = false;
    }
    cancel() {
        if (!this._isCancelled) {
            this._isCancelled = true;
            if (this._emitter) {
                this._emitter.fire(undefined);
                this.dispose();
            }
        }
    }
    get isCancellationRequested() {
        return this._isCancelled;
    }
    get onCancellationRequested() {
        if (this._isCancelled) {
            return shortcutEvent;
        }
        if (!this._emitter) {
            this._emitter = new events_1.Emitter();
        }
        return this._emitter.event;
    }
    dispose() {
        if (this._emitter) {
            this._emitter.dispose();
            this._emitter = undefined;
        }
    }
}
class CancellationTokenSource {
    get token() {
        if (!this._token) {
            // be lazy and create the token only when
            // actually needed
            this._token = new MutableToken();
        }
        return this._token;
    }
    cancel() {
        if (!this._token) {
            // save an object by returning the default
            // cancelled token when cancellation happens
            // before someone asks for the token
            this._token = CancellationToken.Cancelled;
        }
        else {
            this._token.cancel();
        }
    }
    dispose() {
        if (!this._token) {
            // ensure to initialize with an empty token if we had none
            this._token = CancellationToken.None;
        }
        else if (this._token instanceof MutableToken) {
            // actually dispose
            this._token.dispose();
        }
    }
}
exports.CancellationTokenSource = CancellationTokenSource;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
var Touch;
(function (Touch) {
    Touch.None = 0;
    Touch.First = 1;
    Touch.Last = 2;
})(Touch = exports.Touch || (exports.Touch = {}));
class LinkedMap {
    constructor() {
        this._map = new Map();
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
    }
    clear() {
        this._map.clear();
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
    }
    isEmpty() {
        return !this._head && !this._tail;
    }
    get size() {
        return this._size;
    }
    has(key) {
        return this._map.has(key);
    }
    get(key) {
        const item = this._map.get(key);
        if (!item) {
            return undefined;
        }
        return item.value;
    }
    set(key, value, touch = Touch.None) {
        let item = this._map.get(key);
        if (item) {
            item.value = value;
            if (touch !== Touch.None) {
                this.touch(item, touch);
            }
        }
        else {
            item = { key, value, next: undefined, previous: undefined };
            switch (touch) {
                case Touch.None:
                    this.addItemLast(item);
                    break;
                case Touch.First:
                    this.addItemFirst(item);
                    break;
                case Touch.Last:
                    this.addItemLast(item);
                    break;
                default:
                    this.addItemLast(item);
                    break;
            }
            this._map.set(key, item);
            this._size++;
        }
    }
    delete(key) {
        const item = this._map.get(key);
        if (!item) {
            return false;
        }
        this._map.delete(key);
        this.removeItem(item);
        this._size--;
        return true;
    }
    shift() {
        if (!this._head && !this._tail) {
            return undefined;
        }
        if (!this._head || !this._tail) {
            throw new Error('Invalid list');
        }
        const item = this._head;
        this._map.delete(item.key);
        this.removeItem(item);
        this._size--;
        return item.value;
    }
    forEach(callbackfn, thisArg) {
        let current = this._head;
        while (current) {
            if (thisArg) {
                callbackfn.bind(thisArg)(current.value, current.key, this);
            }
            else {
                callbackfn(current.value, current.key, this);
            }
            current = current.next;
        }
    }
    forEachReverse(callbackfn, thisArg) {
        let current = this._tail;
        while (current) {
            if (thisArg) {
                callbackfn.bind(thisArg)(current.value, current.key, this);
            }
            else {
                callbackfn(current.value, current.key, this);
            }
            current = current.previous;
        }
    }
    values() {
        let result = [];
        let current = this._head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }
    keys() {
        let result = [];
        let current = this._head;
        while (current) {
            result.push(current.key);
            current = current.next;
        }
        return result;
    }
    /* JSON RPC run on es5 which has no Symbol.iterator
    public keys(): IterableIterator<K> {
        let current = this._head;
        let iterator: IterableIterator<K> = {
            [Symbol.iterator]() {
                return iterator;
            },
            next():IteratorResult<K> {
                if (current) {
                    let result = { value: current.key, done: false };
                    current = current.next;
                    return result;
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }

    public values(): IterableIterator<V> {
        let current = this._head;
        let iterator: IterableIterator<V> = {
            [Symbol.iterator]() {
                return iterator;
            },
            next():IteratorResult<V> {
                if (current) {
                    let result = { value: current.value, done: false };
                    current = current.next;
                    return result;
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }
    */
    addItemFirst(item) {
        // First time Insert
        if (!this._head && !this._tail) {
            this._tail = item;
        }
        else if (!this._head) {
            throw new Error('Invalid list');
        }
        else {
            item.next = this._head;
            this._head.previous = item;
        }
        this._head = item;
    }
    addItemLast(item) {
        // First time Insert
        if (!this._head && !this._tail) {
            this._head = item;
        }
        else if (!this._tail) {
            throw new Error('Invalid list');
        }
        else {
            item.previous = this._tail;
            this._tail.next = item;
        }
        this._tail = item;
    }
    removeItem(item) {
        if (item === this._head && item === this._tail) {
            this._head = undefined;
            this._tail = undefined;
        }
        else if (item === this._head) {
            this._head = item.next;
        }
        else if (item === this._tail) {
            this._tail = item.previous;
        }
        else {
            const next = item.next;
            const previous = item.previous;
            if (!next || !previous) {
                throw new Error('Invalid list');
            }
            next.previous = previous;
            previous.next = next;
        }
    }
    touch(item, touch) {
        if (!this._head || !this._tail) {
            throw new Error('Invalid list');
        }
        if ((touch !== Touch.First && touch !== Touch.Last)) {
            return;
        }
        if (touch === Touch.First) {
            if (item === this._head) {
                return;
            }
            const next = item.next;
            const previous = item.previous;
            // Unlink the item
            if (item === this._tail) {
                // previous must be defined since item was not head but is tail
                // So there are more than on item in the map
                previous.next = undefined;
                this._tail = previous;
            }
            else {
                // Both next and previous are not undefined since item was neither head nor tail.
                next.previous = previous;
                previous.next = next;
            }
            // Insert the node at head
            item.previous = undefined;
            item.next = this._head;
            this._head.previous = item;
            this._head = item;
        }
        else if (touch === Touch.Last) {
            if (item === this._tail) {
                return;
            }
            const next = item.next;
            const previous = item.previous;
            // Unlink the item.
            if (item === this._head) {
                // next must be defined since item was not tail but is head
                // So there are more than on item in the map
                next.previous = undefined;
                this._head = next;
            }
            else {
                // Both next and previous are not undefined since item was neither head nor tail.
                next.previous = previous;
                previous.next = next;
            }
            item.next = undefined;
            item.previous = this._tail;
            this._tail.next = item;
            this._tail = item;
        }
    }
}
exports.LinkedMap = LinkedMap;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
/// <reference path="../typings/thenable.d.ts" />

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const Is = __webpack_require__(13);
const messages_1 = __webpack_require__(106);
exports.RequestType = messages_1.RequestType;
exports.RequestType0 = messages_1.RequestType0;
exports.RequestType1 = messages_1.RequestType1;
exports.RequestType2 = messages_1.RequestType2;
exports.RequestType3 = messages_1.RequestType3;
exports.RequestType4 = messages_1.RequestType4;
exports.RequestType5 = messages_1.RequestType5;
exports.RequestType6 = messages_1.RequestType6;
exports.RequestType7 = messages_1.RequestType7;
exports.RequestType8 = messages_1.RequestType8;
exports.RequestType9 = messages_1.RequestType9;
exports.ResponseError = messages_1.ResponseError;
exports.ErrorCodes = messages_1.ErrorCodes;
exports.NotificationType = messages_1.NotificationType;
exports.NotificationType0 = messages_1.NotificationType0;
exports.NotificationType1 = messages_1.NotificationType1;
exports.NotificationType2 = messages_1.NotificationType2;
exports.NotificationType3 = messages_1.NotificationType3;
exports.NotificationType4 = messages_1.NotificationType4;
exports.NotificationType5 = messages_1.NotificationType5;
exports.NotificationType6 = messages_1.NotificationType6;
exports.NotificationType7 = messages_1.NotificationType7;
exports.NotificationType8 = messages_1.NotificationType8;
exports.NotificationType9 = messages_1.NotificationType9;
const messageReader_1 = __webpack_require__(33);
exports.MessageReader = messageReader_1.MessageReader;
exports.StreamMessageReader = messageReader_1.StreamMessageReader;
exports.IPCMessageReader = messageReader_1.IPCMessageReader;
exports.SocketMessageReader = messageReader_1.SocketMessageReader;
const messageWriter_1 = __webpack_require__(34);
exports.MessageWriter = messageWriter_1.MessageWriter;
exports.StreamMessageWriter = messageWriter_1.StreamMessageWriter;
exports.IPCMessageWriter = messageWriter_1.IPCMessageWriter;
exports.SocketMessageWriter = messageWriter_1.SocketMessageWriter;
const events_1 = __webpack_require__(20);
exports.Disposable = events_1.Disposable;
exports.Event = events_1.Event;
exports.Emitter = events_1.Emitter;
const cancellation_1 = __webpack_require__(103);
exports.CancellationTokenSource = cancellation_1.CancellationTokenSource;
exports.CancellationToken = cancellation_1.CancellationToken;
const linkedMap_1 = __webpack_require__(104);
__export(__webpack_require__(107));
__export(__webpack_require__(108));
var CancelNotification;
(function (CancelNotification) {
    CancelNotification.type = new messages_1.NotificationType('$/cancelRequest');
})(CancelNotification || (CancelNotification = {}));
var ProgressNotification;
(function (ProgressNotification) {
    ProgressNotification.type = new messages_1.NotificationType('$/progress');
})(ProgressNotification || (ProgressNotification = {}));
class ProgressType {
    constructor() {
    }
}
exports.ProgressType = ProgressType;
exports.NullLogger = Object.freeze({
    error: () => { },
    warn: () => { },
    info: () => { },
    log: () => { }
});
var Trace;
(function (Trace) {
    Trace[Trace["Off"] = 0] = "Off";
    Trace[Trace["Messages"] = 1] = "Messages";
    Trace[Trace["Verbose"] = 2] = "Verbose";
})(Trace = exports.Trace || (exports.Trace = {}));
(function (Trace) {
    function fromString(value) {
        if (!Is.string(value)) {
            return Trace.Off;
        }
        value = value.toLowerCase();
        switch (value) {
            case 'off':
                return Trace.Off;
            case 'messages':
                return Trace.Messages;
            case 'verbose':
                return Trace.Verbose;
            default:
                return Trace.Off;
        }
    }
    Trace.fromString = fromString;
    function toString(value) {
        switch (value) {
            case Trace.Off:
                return 'off';
            case Trace.Messages:
                return 'messages';
            case Trace.Verbose:
                return 'verbose';
            default:
                return 'off';
        }
    }
    Trace.toString = toString;
})(Trace = exports.Trace || (exports.Trace = {}));
var TraceFormat;
(function (TraceFormat) {
    TraceFormat["Text"] = "text";
    TraceFormat["JSON"] = "json";
})(TraceFormat = exports.TraceFormat || (exports.TraceFormat = {}));
(function (TraceFormat) {
    function fromString(value) {
        value = value.toLowerCase();
        if (value === 'json') {
            return TraceFormat.JSON;
        }
        else {
            return TraceFormat.Text;
        }
    }
    TraceFormat.fromString = fromString;
})(TraceFormat = exports.TraceFormat || (exports.TraceFormat = {}));
var SetTraceNotification;
(function (SetTraceNotification) {
    SetTraceNotification.type = new messages_1.NotificationType('$/setTraceNotification');
})(SetTraceNotification = exports.SetTraceNotification || (exports.SetTraceNotification = {}));
var LogTraceNotification;
(function (LogTraceNotification) {
    LogTraceNotification.type = new messages_1.NotificationType('$/logTraceNotification');
})(LogTraceNotification = exports.LogTraceNotification || (exports.LogTraceNotification = {}));
var ConnectionErrors;
(function (ConnectionErrors) {
    /**
     * The connection is closed.
     */
    ConnectionErrors[ConnectionErrors["Closed"] = 1] = "Closed";
    /**
     * The connection got disposed.
     */
    ConnectionErrors[ConnectionErrors["Disposed"] = 2] = "Disposed";
    /**
     * The connection is already in listening mode.
     */
    ConnectionErrors[ConnectionErrors["AlreadyListening"] = 3] = "AlreadyListening";
})(ConnectionErrors = exports.ConnectionErrors || (exports.ConnectionErrors = {}));
class ConnectionError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, ConnectionError.prototype);
    }
}
exports.ConnectionError = ConnectionError;
var ConnectionStrategy;
(function (ConnectionStrategy) {
    function is(value) {
        let candidate = value;
        return candidate && Is.func(candidate.cancelUndispatched);
    }
    ConnectionStrategy.is = is;
})(ConnectionStrategy = exports.ConnectionStrategy || (exports.ConnectionStrategy = {}));
var ConnectionState;
(function (ConnectionState) {
    ConnectionState[ConnectionState["New"] = 1] = "New";
    ConnectionState[ConnectionState["Listening"] = 2] = "Listening";
    ConnectionState[ConnectionState["Closed"] = 3] = "Closed";
    ConnectionState[ConnectionState["Disposed"] = 4] = "Disposed";
})(ConnectionState || (ConnectionState = {}));
function _createMessageConnection(messageReader, messageWriter, logger, strategy) {
    let sequenceNumber = 0;
    let notificationSquenceNumber = 0;
    let unknownResponseSquenceNumber = 0;
    const version = '2.0';
    let starRequestHandler = undefined;
    let requestHandlers = Object.create(null);
    let starNotificationHandler = undefined;
    let notificationHandlers = Object.create(null);
    let progressHandlers = new Map();
    let timer;
    let messageQueue = new linkedMap_1.LinkedMap();
    let responsePromises = Object.create(null);
    let requestTokens = Object.create(null);
    let trace = Trace.Off;
    let traceFormat = TraceFormat.Text;
    let tracer;
    let state = ConnectionState.New;
    let errorEmitter = new events_1.Emitter();
    let closeEmitter = new events_1.Emitter();
    let unhandledNotificationEmitter = new events_1.Emitter();
    let unhandledProgressEmitter = new events_1.Emitter();
    let disposeEmitter = new events_1.Emitter();
    function createRequestQueueKey(id) {
        return 'req-' + id.toString();
    }
    function createResponseQueueKey(id) {
        if (id === null) {
            return 'res-unknown-' + (++unknownResponseSquenceNumber).toString();
        }
        else {
            return 'res-' + id.toString();
        }
    }
    function createNotificationQueueKey() {
        return 'not-' + (++notificationSquenceNumber).toString();
    }
    function addMessageToQueue(queue, message) {
        if (messages_1.isRequestMessage(message)) {
            queue.set(createRequestQueueKey(message.id), message);
        }
        else if (messages_1.isResponseMessage(message)) {
            queue.set(createResponseQueueKey(message.id), message);
        }
        else {
            queue.set(createNotificationQueueKey(), message);
        }
    }
    function cancelUndispatched(_message) {
        return undefined;
    }
    function isListening() {
        return state === ConnectionState.Listening;
    }
    function isClosed() {
        return state === ConnectionState.Closed;
    }
    function isDisposed() {
        return state === ConnectionState.Disposed;
    }
    function closeHandler() {
        if (state === ConnectionState.New || state === ConnectionState.Listening) {
            state = ConnectionState.Closed;
            closeEmitter.fire(undefined);
        }
        // If the connection is disposed don't sent close events.
    }
    function readErrorHandler(error) {
        errorEmitter.fire([error, undefined, undefined]);
    }
    function writeErrorHandler(data) {
        errorEmitter.fire(data);
    }
    messageReader.onClose(closeHandler);
    messageReader.onError(readErrorHandler);
    messageWriter.onClose(closeHandler);
    messageWriter.onError(writeErrorHandler);
    function triggerMessageQueue() {
        if (timer || messageQueue.size === 0) {
            return;
        }
        timer = setImmediate(() => {
            timer = undefined;
            processMessageQueue();
        });
    }
    function processMessageQueue() {
        if (messageQueue.size === 0) {
            return;
        }
        let message = messageQueue.shift();
        try {
            if (messages_1.isRequestMessage(message)) {
                handleRequest(message);
            }
            else if (messages_1.isNotificationMessage(message)) {
                handleNotification(message);
            }
            else if (messages_1.isResponseMessage(message)) {
                handleResponse(message);
            }
            else {
                handleInvalidMessage(message);
            }
        }
        finally {
            triggerMessageQueue();
        }
    }
    let callback = (message) => {
        try {
            // We have received a cancellation message. Check if the message is still in the queue
            // and cancel it if allowed to do so.
            if (messages_1.isNotificationMessage(message) && message.method === CancelNotification.type.method) {
                let key = createRequestQueueKey(message.params.id);
                let toCancel = messageQueue.get(key);
                if (messages_1.isRequestMessage(toCancel)) {
                    let response = strategy && strategy.cancelUndispatched ? strategy.cancelUndispatched(toCancel, cancelUndispatched) : cancelUndispatched(toCancel);
                    if (response && (response.error !== void 0 || response.result !== void 0)) {
                        messageQueue.delete(key);
                        response.id = toCancel.id;
                        traceSendingResponse(response, message.method, Date.now());
                        messageWriter.write(response);
                        return;
                    }
                }
            }
            addMessageToQueue(messageQueue, message);
        }
        finally {
            triggerMessageQueue();
        }
    };
    function handleRequest(requestMessage) {
        if (isDisposed()) {
            // we return here silently since we fired an event when the
            // connection got disposed.
            return;
        }
        function reply(resultOrError, method, startTime) {
            let message = {
                jsonrpc: version,
                id: requestMessage.id
            };
            if (resultOrError instanceof messages_1.ResponseError) {
                message.error = resultOrError.toJson();
            }
            else {
                message.result = resultOrError === void 0 ? null : resultOrError;
            }
            traceSendingResponse(message, method, startTime);
            messageWriter.write(message);
        }
        function replyError(error, method, startTime) {
            let message = {
                jsonrpc: version,
                id: requestMessage.id,
                error: error.toJson()
            };
            traceSendingResponse(message, method, startTime);
            messageWriter.write(message);
        }
        function replySuccess(result, method, startTime) {
            // The JSON RPC defines that a response must either have a result or an error
            // So we can't treat undefined as a valid response result.
            if (result === void 0) {
                result = null;
            }
            let message = {
                jsonrpc: version,
                id: requestMessage.id,
                result: result
            };
            traceSendingResponse(message, method, startTime);
            messageWriter.write(message);
        }
        traceReceivedRequest(requestMessage);
        let element = requestHandlers[requestMessage.method];
        let type;
        let requestHandler;
        if (element) {
            type = element.type;
            requestHandler = element.handler;
        }
        let startTime = Date.now();
        if (requestHandler || starRequestHandler) {
            let cancellationSource = new cancellation_1.CancellationTokenSource();
            let tokenKey = String(requestMessage.id);
            requestTokens[tokenKey] = cancellationSource;
            try {
                let handlerResult;
                if (requestMessage.params === void 0 || (type !== void 0 && type.numberOfParams === 0)) {
                    handlerResult = requestHandler
                        ? requestHandler(cancellationSource.token)
                        : starRequestHandler(requestMessage.method, cancellationSource.token);
                }
                else if (Is.array(requestMessage.params) && (type === void 0 || type.numberOfParams > 1)) {
                    handlerResult = requestHandler
                        ? requestHandler(...requestMessage.params, cancellationSource.token)
                        : starRequestHandler(requestMessage.method, ...requestMessage.params, cancellationSource.token);
                }
                else {
                    handlerResult = requestHandler
                        ? requestHandler(requestMessage.params, cancellationSource.token)
                        : starRequestHandler(requestMessage.method, requestMessage.params, cancellationSource.token);
                }
                let promise = handlerResult;
                if (!handlerResult) {
                    delete requestTokens[tokenKey];
                    replySuccess(handlerResult, requestMessage.method, startTime);
                }
                else if (promise.then) {
                    promise.then((resultOrError) => {
                        delete requestTokens[tokenKey];
                        reply(resultOrError, requestMessage.method, startTime);
                    }, error => {
                        delete requestTokens[tokenKey];
                        if (error instanceof messages_1.ResponseError) {
                            replyError(error, requestMessage.method, startTime);
                        }
                        else if (error && Is.string(error.message)) {
                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
                        }
                        else {
                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
                        }
                    });
                }
                else {
                    delete requestTokens[tokenKey];
                    reply(handlerResult, requestMessage.method, startTime);
                }
            }
            catch (error) {
                delete requestTokens[tokenKey];
                if (error instanceof messages_1.ResponseError) {
                    reply(error, requestMessage.method, startTime);
                }
                else if (error && Is.string(error.message)) {
                    replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
                }
                else {
                    replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
                }
            }
        }
        else {
            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.MethodNotFound, `Unhandled method ${requestMessage.method}`), requestMessage.method, startTime);
        }
    }
    function handleResponse(responseMessage) {
        if (isDisposed()) {
            // See handle request.
            return;
        }
        if (responseMessage.id === null) {
            if (responseMessage.error) {
                logger.error(`Received response message without id: Error is: \n${JSON.stringify(responseMessage.error, undefined, 4)}`);
            }
            else {
                logger.error(`Received response message without id. No further error information provided.`);
            }
        }
        else {
            let key = String(responseMessage.id);
            let responsePromise = responsePromises[key];
            traceReceivedResponse(responseMessage, responsePromise);
            if (responsePromise) {
                delete responsePromises[key];
                try {
                    if (responseMessage.error) {
                        let error = responseMessage.error;
                        responsePromise.reject(new messages_1.ResponseError(error.code, error.message, error.data));
                    }
                    else if (responseMessage.result !== void 0) {
                        responsePromise.resolve(responseMessage.result);
                    }
                    else {
                        throw new Error('Should never happen.');
                    }
                }
                catch (error) {
                    if (error.message) {
                        logger.error(`Response handler '${responsePromise.method}' failed with message: ${error.message}`);
                    }
                    else {
                        logger.error(`Response handler '${responsePromise.method}' failed unexpectedly.`);
                    }
                }
            }
        }
    }
    function handleNotification(message) {
        if (isDisposed()) {
            // See handle request.
            return;
        }
        let type = undefined;
        let notificationHandler;
        if (message.method === CancelNotification.type.method) {
            notificationHandler = (params) => {
                let id = params.id;
                let source = requestTokens[String(id)];
                if (source) {
                    source.cancel();
                }
            };
        }
        else {
            let element = notificationHandlers[message.method];
            if (element) {
                notificationHandler = element.handler;
                type = element.type;
            }
        }
        if (notificationHandler || starNotificationHandler) {
            try {
                traceReceivedNotification(message);
                if (message.params === void 0 || (type !== void 0 && type.numberOfParams === 0)) {
                    notificationHandler ? notificationHandler() : starNotificationHandler(message.method);
                }
                else if (Is.array(message.params) && (type === void 0 || type.numberOfParams > 1)) {
                    notificationHandler ? notificationHandler(...message.params) : starNotificationHandler(message.method, ...message.params);
                }
                else {
                    notificationHandler ? notificationHandler(message.params) : starNotificationHandler(message.method, message.params);
                }
            }
            catch (error) {
                if (error.message) {
                    logger.error(`Notification handler '${message.method}' failed with message: ${error.message}`);
                }
                else {
                    logger.error(`Notification handler '${message.method}' failed unexpectedly.`);
                }
            }
        }
        else {
            unhandledNotificationEmitter.fire(message);
        }
    }
    function handleInvalidMessage(message) {
        if (!message) {
            logger.error('Received empty message.');
            return;
        }
        logger.error(`Received message which is neither a response nor a notification message:\n${JSON.stringify(message, null, 4)}`);
        // Test whether we find an id to reject the promise
        let responseMessage = message;
        if (Is.string(responseMessage.id) || Is.number(responseMessage.id)) {
            let key = String(responseMessage.id);
            let responseHandler = responsePromises[key];
            if (responseHandler) {
                responseHandler.reject(new Error('The received response has neither a result nor an error property.'));
            }
        }
    }
    function traceSendingRequest(message) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose && message.params) {
                data = `Params: ${JSON.stringify(message.params, null, 4)}\n\n`;
            }
            tracer.log(`Sending request '${message.method} - (${message.id})'.`, data);
        }
        else {
            logLSPMessage('send-request', message);
        }
    }
    function traceSendingNotification(message) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose) {
                if (message.params) {
                    data = `Params: ${JSON.stringify(message.params, null, 4)}\n\n`;
                }
                else {
                    data = 'No parameters provided.\n\n';
                }
            }
            tracer.log(`Sending notification '${message.method}'.`, data);
        }
        else {
            logLSPMessage('send-notification', message);
        }
    }
    function traceSendingResponse(message, method, startTime) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose) {
                if (message.error && message.error.data) {
                    data = `Error data: ${JSON.stringify(message.error.data, null, 4)}\n\n`;
                }
                else {
                    if (message.result) {
                        data = `Result: ${JSON.stringify(message.result, null, 4)}\n\n`;
                    }
                    else if (message.error === void 0) {
                        data = 'No result returned.\n\n';
                    }
                }
            }
            tracer.log(`Sending response '${method} - (${message.id})'. Processing request took ${Date.now() - startTime}ms`, data);
        }
        else {
            logLSPMessage('send-response', message);
        }
    }
    function traceReceivedRequest(message) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose && message.params) {
                data = `Params: ${JSON.stringify(message.params, null, 4)}\n\n`;
            }
            tracer.log(`Received request '${message.method} - (${message.id})'.`, data);
        }
        else {
            logLSPMessage('receive-request', message);
        }
    }
    function traceReceivedNotification(message) {
        if (trace === Trace.Off || !tracer || message.method === LogTraceNotification.type.method) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose) {
                if (message.params) {
                    data = `Params: ${JSON.stringify(message.params, null, 4)}\n\n`;
                }
                else {
                    data = 'No parameters provided.\n\n';
                }
            }
            tracer.log(`Received notification '${message.method}'.`, data);
        }
        else {
            logLSPMessage('receive-notification', message);
        }
    }
    function traceReceivedResponse(message, responsePromise) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose) {
                if (message.error && message.error.data) {
                    data = `Error data: ${JSON.stringify(message.error.data, null, 4)}\n\n`;
                }
                else {
                    if (message.result) {
                        data = `Result: ${JSON.stringify(message.result, null, 4)}\n\n`;
                    }
                    else if (message.error === void 0) {
                        data = 'No result returned.\n\n';
                    }
                }
            }
            if (responsePromise) {
                let error = message.error ? ` Request failed: ${message.error.message} (${message.error.code}).` : '';
                tracer.log(`Received response '${responsePromise.method} - (${message.id})' in ${Date.now() - responsePromise.timerStart}ms.${error}`, data);
            }
            else {
                tracer.log(`Received response ${message.id} without active response promise.`, data);
            }
        }
        else {
            logLSPMessage('receive-response', message);
        }
    }
    function logLSPMessage(type, message) {
        if (!tracer || trace === Trace.Off) {
            return;
        }
        const lspMessage = {
            isLSPMessage: true,
            type,
            message,
            timestamp: Date.now()
        };
        tracer.log(lspMessage);
    }
    function throwIfClosedOrDisposed() {
        if (isClosed()) {
            throw new ConnectionError(ConnectionErrors.Closed, 'Connection is closed.');
        }
        if (isDisposed()) {
            throw new ConnectionError(ConnectionErrors.Disposed, 'Connection is disposed.');
        }
    }
    function throwIfListening() {
        if (isListening()) {
            throw new ConnectionError(ConnectionErrors.AlreadyListening, 'Connection is already listening');
        }
    }
    function throwIfNotListening() {
        if (!isListening()) {
            throw new Error('Call listen() first.');
        }
    }
    function undefinedToNull(param) {
        if (param === void 0) {
            return null;
        }
        else {
            return param;
        }
    }
    function computeMessageParams(type, params) {
        let result;
        let numberOfParams = type.numberOfParams;
        switch (numberOfParams) {
            case 0:
                result = null;
                break;
            case 1:
                result = undefinedToNull(params[0]);
                break;
            default:
                result = [];
                for (let i = 0; i < params.length && i < numberOfParams; i++) {
                    result.push(undefinedToNull(params[i]));
                }
                if (params.length < numberOfParams) {
                    for (let i = params.length; i < numberOfParams; i++) {
                        result.push(null);
                    }
                }
                break;
        }
        return result;
    }
    let connection = {
        sendNotification: (type, ...params) => {
            throwIfClosedOrDisposed();
            let method;
            let messageParams;
            if (Is.string(type)) {
                method = type;
                switch (params.length) {
                    case 0:
                        messageParams = null;
                        break;
                    case 1:
                        messageParams = params[0];
                        break;
                    default:
                        messageParams = params;
                        break;
                }
            }
            else {
                method = type.method;
                messageParams = computeMessageParams(type, params);
            }
            let notificationMessage = {
                jsonrpc: version,
                method: method,
                params: messageParams
            };
            traceSendingNotification(notificationMessage);
            messageWriter.write(notificationMessage);
        },
        onNotification: (type, handler) => {
            throwIfClosedOrDisposed();
            if (Is.func(type)) {
                starNotificationHandler = type;
            }
            else if (handler) {
                if (Is.string(type)) {
                    notificationHandlers[type] = { type: undefined, handler };
                }
                else {
                    notificationHandlers[type.method] = { type, handler };
                }
            }
        },
        onProgress: (_type, token, handler) => {
            if (progressHandlers.has(token)) {
                throw new Error(`Progress handler for token ${token} already registered`);
            }
            progressHandlers.set(token, handler);
            return {
                dispose: () => {
                    progressHandlers.delete(token);
                }
            };
        },
        sendProgress: (_type, token, value) => {
            connection.sendNotification(ProgressNotification.type, { token, value });
        },
        onUnhandledProgress: unhandledProgressEmitter.event,
        sendRequest: (type, ...params) => {
            throwIfClosedOrDisposed();
            throwIfNotListening();
            let method;
            let messageParams;
            let token = undefined;
            if (Is.string(type)) {
                method = type;
                switch (params.length) {
                    case 0:
                        messageParams = null;
                        break;
                    case 1:
                        // The cancellation token is optional so it can also be undefined.
                        if (cancellation_1.CancellationToken.is(params[0])) {
                            messageParams = null;
                            token = params[0];
                        }
                        else {
                            messageParams = undefinedToNull(params[0]);
                        }
                        break;
                    default:
                        const last = params.length - 1;
                        if (cancellation_1.CancellationToken.is(params[last])) {
                            token = params[last];
                            if (params.length === 2) {
                                messageParams = undefinedToNull(params[0]);
                            }
                            else {
                                messageParams = params.slice(0, last).map(value => undefinedToNull(value));
                            }
                        }
                        else {
                            messageParams = params.map(value => undefinedToNull(value));
                        }
                        break;
                }
            }
            else {
                method = type.method;
                messageParams = computeMessageParams(type, params);
                let numberOfParams = type.numberOfParams;
                token = cancellation_1.CancellationToken.is(params[numberOfParams]) ? params[numberOfParams] : undefined;
            }
            let id = sequenceNumber++;
            let result = new Promise((resolve, reject) => {
                let requestMessage = {
                    jsonrpc: version,
                    id: id,
                    method: method,
                    params: messageParams
                };
                let responsePromise = { method: method, timerStart: Date.now(), resolve, reject };
                traceSendingRequest(requestMessage);
                try {
                    messageWriter.write(requestMessage);
                }
                catch (e) {
                    // Writing the message failed. So we need to reject the promise.
                    responsePromise.reject(new messages_1.ResponseError(messages_1.ErrorCodes.MessageWriteError, e.message ? e.message : 'Unknown reason'));
                    responsePromise = null;
                }
                if (responsePromise) {
                    responsePromises[String(id)] = responsePromise;
                }
            });
            if (token) {
                token.onCancellationRequested(() => {
                    connection.sendNotification(CancelNotification.type, { id });
                });
            }
            return result;
        },
        onRequest: (type, handler) => {
            throwIfClosedOrDisposed();
            if (Is.func(type)) {
                starRequestHandler = type;
            }
            else if (handler) {
                if (Is.string(type)) {
                    requestHandlers[type] = { type: undefined, handler };
                }
                else {
                    requestHandlers[type.method] = { type, handler };
                }
            }
        },
        trace: (_value, _tracer, sendNotificationOrTraceOptions) => {
            let _sendNotification = false;
            let _traceFormat = TraceFormat.Text;
            if (sendNotificationOrTraceOptions !== void 0) {
                if (Is.boolean(sendNotificationOrTraceOptions)) {
                    _sendNotification = sendNotificationOrTraceOptions;
                }
                else {
                    _sendNotification = sendNotificationOrTraceOptions.sendNotification || false;
                    _traceFormat = sendNotificationOrTraceOptions.traceFormat || TraceFormat.Text;
                }
            }
            trace = _value;
            traceFormat = _traceFormat;
            if (trace === Trace.Off) {
                tracer = undefined;
            }
            else {
                tracer = _tracer;
            }
            if (_sendNotification && !isClosed() && !isDisposed()) {
                connection.sendNotification(SetTraceNotification.type, { value: Trace.toString(_value) });
            }
        },
        onError: errorEmitter.event,
        onClose: closeEmitter.event,
        onUnhandledNotification: unhandledNotificationEmitter.event,
        onDispose: disposeEmitter.event,
        dispose: () => {
            if (isDisposed()) {
                return;
            }
            state = ConnectionState.Disposed;
            disposeEmitter.fire(undefined);
            let error = new Error('Connection got disposed.');
            Object.keys(responsePromises).forEach((key) => {
                responsePromises[key].reject(error);
            });
            responsePromises = Object.create(null);
            requestTokens = Object.create(null);
            messageQueue = new linkedMap_1.LinkedMap();
            // Test for backwards compatibility
            if (Is.func(messageWriter.dispose)) {
                messageWriter.dispose();
            }
            if (Is.func(messageReader.dispose)) {
                messageReader.dispose();
            }
        },
        listen: () => {
            throwIfClosedOrDisposed();
            throwIfListening();
            state = ConnectionState.Listening;
            messageReader.listen(callback);
        },
        inspect: () => {
            // eslint-disable-next-line no-console
            console.log('inspect');
        }
    };
    connection.onNotification(LogTraceNotification.type, (params) => {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        tracer.log(params.message, trace === Trace.Verbose ? params.verbose : undefined);
    });
    connection.onNotification(ProgressNotification.type, (params) => {
        const handler = progressHandlers.get(params.token);
        if (handler) {
            handler(params.value);
        }
        else {
            unhandledProgressEmitter.fire(params);
        }
    });
    return connection;
}
function isMessageReader(value) {
    return value.listen !== void 0 && value.read === void 0;
}
function isMessageWriter(value) {
    return value.write !== void 0 && value.end === void 0;
}
function createMessageConnection(input, output, logger, strategy) {
    if (!logger) {
        logger = exports.NullLogger;
    }
    let reader = isMessageReader(input) ? input : new messageReader_1.StreamMessageReader(input);
    let writer = isMessageWriter(output) ? output : new messageWriter_1.StreamMessageWriter(output);
    return _createMessageConnection(reader, writer, logger, strategy);
}
exports.createMessageConnection = createMessageConnection;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(59).setImmediate))

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const is = __webpack_require__(13);
/**
 * Predefined error codes.
 */
var ErrorCodes;
(function (ErrorCodes) {
    // Defined by JSON RPC
    ErrorCodes.ParseError = -32700;
    ErrorCodes.InvalidRequest = -32600;
    ErrorCodes.MethodNotFound = -32601;
    ErrorCodes.InvalidParams = -32602;
    ErrorCodes.InternalError = -32603;
    ErrorCodes.serverErrorStart = -32099;
    ErrorCodes.serverErrorEnd = -32000;
    ErrorCodes.ServerNotInitialized = -32002;
    ErrorCodes.UnknownErrorCode = -32001;
    // Defined by the protocol.
    ErrorCodes.RequestCancelled = -32800;
    ErrorCodes.ContentModified = -32801;
    // Defined by VSCode library.
    ErrorCodes.MessageWriteError = 1;
    ErrorCodes.MessageReadError = 2;
})(ErrorCodes = exports.ErrorCodes || (exports.ErrorCodes = {}));
/**
 * An error object return in a response in case a request
 * has failed.
 */
class ResponseError extends Error {
    constructor(code, message, data) {
        super(message);
        this.code = is.number(code) ? code : ErrorCodes.UnknownErrorCode;
        this.data = data;
        Object.setPrototypeOf(this, ResponseError.prototype);
    }
    toJson() {
        return {
            code: this.code,
            message: this.message,
            data: this.data,
        };
    }
}
exports.ResponseError = ResponseError;
/**
 * An abstract implementation of a MessageType.
 */
class AbstractMessageType {
    constructor(_method, _numberOfParams) {
        this._method = _method;
        this._numberOfParams = _numberOfParams;
    }
    get method() {
        return this._method;
    }
    get numberOfParams() {
        return this._numberOfParams;
    }
}
exports.AbstractMessageType = AbstractMessageType;
/**
 * Classes to type request response pairs
 *
 * The type parameter RO will be removed in the next major version
 * of the JSON RPC library since it is a LSP concept and doesn't
 * belong here. For now it is tagged as default never.
 */
class RequestType0 extends AbstractMessageType {
    constructor(method) {
        super(method, 0);
    }
}
exports.RequestType0 = RequestType0;
class RequestType extends AbstractMessageType {
    constructor(method) {
        super(method, 1);
    }
}
exports.RequestType = RequestType;
class RequestType1 extends AbstractMessageType {
    constructor(method) {
        super(method, 1);
    }
}
exports.RequestType1 = RequestType1;
class RequestType2 extends AbstractMessageType {
    constructor(method) {
        super(method, 2);
    }
}
exports.RequestType2 = RequestType2;
class RequestType3 extends AbstractMessageType {
    constructor(method) {
        super(method, 3);
    }
}
exports.RequestType3 = RequestType3;
class RequestType4 extends AbstractMessageType {
    constructor(method) {
        super(method, 4);
    }
}
exports.RequestType4 = RequestType4;
class RequestType5 extends AbstractMessageType {
    constructor(method) {
        super(method, 5);
    }
}
exports.RequestType5 = RequestType5;
class RequestType6 extends AbstractMessageType {
    constructor(method) {
        super(method, 6);
    }
}
exports.RequestType6 = RequestType6;
class RequestType7 extends AbstractMessageType {
    constructor(method) {
        super(method, 7);
    }
}
exports.RequestType7 = RequestType7;
class RequestType8 extends AbstractMessageType {
    constructor(method) {
        super(method, 8);
    }
}
exports.RequestType8 = RequestType8;
class RequestType9 extends AbstractMessageType {
    constructor(method) {
        super(method, 9);
    }
}
exports.RequestType9 = RequestType9;
/**
 * The type parameter RO will be removed in the next major version
 * of the JSON RPC library since it is a LSP concept and doesn't
 * belong here. For now it is tagged as default never.
 */
class NotificationType extends AbstractMessageType {
    constructor(method) {
        super(method, 1);
        this._ = undefined;
    }
}
exports.NotificationType = NotificationType;
class NotificationType0 extends AbstractMessageType {
    constructor(method) {
        super(method, 0);
    }
}
exports.NotificationType0 = NotificationType0;
class NotificationType1 extends AbstractMessageType {
    constructor(method) {
        super(method, 1);
    }
}
exports.NotificationType1 = NotificationType1;
class NotificationType2 extends AbstractMessageType {
    constructor(method) {
        super(method, 2);
    }
}
exports.NotificationType2 = NotificationType2;
class NotificationType3 extends AbstractMessageType {
    constructor(method) {
        super(method, 3);
    }
}
exports.NotificationType3 = NotificationType3;
class NotificationType4 extends AbstractMessageType {
    constructor(method) {
        super(method, 4);
    }
}
exports.NotificationType4 = NotificationType4;
class NotificationType5 extends AbstractMessageType {
    constructor(method) {
        super(method, 5);
    }
}
exports.NotificationType5 = NotificationType5;
class NotificationType6 extends AbstractMessageType {
    constructor(method) {
        super(method, 6);
    }
}
exports.NotificationType6 = NotificationType6;
class NotificationType7 extends AbstractMessageType {
    constructor(method) {
        super(method, 7);
    }
}
exports.NotificationType7 = NotificationType7;
class NotificationType8 extends AbstractMessageType {
    constructor(method) {
        super(method, 8);
    }
}
exports.NotificationType8 = NotificationType8;
class NotificationType9 extends AbstractMessageType {
    constructor(method) {
        super(method, 9);
    }
}
exports.NotificationType9 = NotificationType9;
/**
 * Tests if the given message is a request message
 */
function isRequestMessage(message) {
    let candidate = message;
    return candidate && is.string(candidate.method) && (is.string(candidate.id) || is.number(candidate.id));
}
exports.isRequestMessage = isRequestMessage;
/**
 * Tests if the given message is a notification message
 */
function isNotificationMessage(message) {
    let candidate = message;
    return candidate && is.string(candidate.method) && message.id === void 0;
}
exports.isNotificationMessage = isNotificationMessage;
/**
 * Tests if the given message is a response message
 */
function isResponseMessage(message) {
    let candidate = message;
    return candidate && (candidate.result !== void 0 || !!candidate.error) && (is.string(candidate.id) || is.number(candidate.id) || candidate.id === null);
}
exports.isResponseMessage = isResponseMessage;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __webpack_require__(77);
const os_1 = __webpack_require__(76);
const crypto_1 = __webpack_require__(30);
const net_1 = __webpack_require__(30);
const messageReader_1 = __webpack_require__(33);
const messageWriter_1 = __webpack_require__(34);
function generateRandomPipeName() {
    const randomSuffix = crypto_1.randomBytes(21).toString('hex');
    if (process.platform === 'win32') {
        return `\\\\.\\pipe\\vscode-jsonrpc-${randomSuffix}-sock`;
    }
    else {
        // Mac/Unix: use socket file
        return path_1.join(os_1.tmpdir(), `vscode-${randomSuffix}.sock`);
    }
}
exports.generateRandomPipeName = generateRandomPipeName;
function createClientPipeTransport(pipeName, encoding = 'utf-8') {
    let connectResolve;
    let connected = new Promise((resolve, _reject) => {
        connectResolve = resolve;
    });
    return new Promise((resolve, reject) => {
        let server = net_1.createServer((socket) => {
            server.close();
            connectResolve([
                new messageReader_1.SocketMessageReader(socket, encoding),
                new messageWriter_1.SocketMessageWriter(socket, encoding)
            ]);
        });
        server.on('error', reject);
        server.listen(pipeName, () => {
            server.removeListener('error', reject);
            resolve({
                onConnected: () => { return connected; }
            });
        });
    });
}
exports.createClientPipeTransport = createClientPipeTransport;
function createServerPipeTransport(pipeName, encoding = 'utf-8') {
    const socket = net_1.createConnection(pipeName);
    return [
        new messageReader_1.SocketMessageReader(socket, encoding),
        new messageWriter_1.SocketMessageWriter(socket, encoding)
    ];
}
exports.createServerPipeTransport = createServerPipeTransport;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __webpack_require__(30);
const messageReader_1 = __webpack_require__(33);
const messageWriter_1 = __webpack_require__(34);
function createClientSocketTransport(port, encoding = 'utf-8') {
    let connectResolve;
    let connected = new Promise((resolve, _reject) => {
        connectResolve = resolve;
    });
    return new Promise((resolve, reject) => {
        let server = net_1.createServer((socket) => {
            server.close();
            connectResolve([
                new messageReader_1.SocketMessageReader(socket, encoding),
                new messageWriter_1.SocketMessageWriter(socket, encoding)
            ]);
        });
        server.on('error', reject);
        server.listen(port, '127.0.0.1', () => {
            server.removeListener('error', reject);
            resolve({
                onConnected: () => { return connected; }
            });
        });
    });
}
exports.createClientSocketTransport = createClientSocketTransport;
function createServerSocketTransport(port, encoding = 'utf-8') {
    const socket = net_1.createConnection(port, '127.0.0.1');
    return [
        new messageReader_1.SocketMessageReader(socket, encoding),
        new messageWriter_1.SocketMessageWriter(socket, encoding)
    ];
}
exports.createServerSocketTransport = createServerSocketTransport;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const vscode_jsonrpc_1 = __webpack_require__(105);
class ProtocolRequestType0 extends vscode_jsonrpc_1.RequestType0 {
    constructor(method) {
        super(method);
    }
}
exports.ProtocolRequestType0 = ProtocolRequestType0;
class ProtocolRequestType extends vscode_jsonrpc_1.RequestType {
    constructor(method) {
        super(method);
    }
}
exports.ProtocolRequestType = ProtocolRequestType;
class ProtocolNotificationType extends vscode_jsonrpc_1.NotificationType {
    constructor(method) {
        super(method);
    }
}
exports.ProtocolNotificationType = ProtocolNotificationType;
class ProtocolNotificationType0 extends vscode_jsonrpc_1.NotificationType0 {
    constructor(method) {
        super(method);
    }
}
exports.ProtocolNotificationType0 = ProtocolNotificationType0;


/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}


/***/ }),
/* 112 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 113 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map