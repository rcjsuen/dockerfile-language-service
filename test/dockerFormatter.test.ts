/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as assert from "assert";

import {
    TextEdit, TextDocument, Position, Range
} from 'vscode-languageserver-types';
import { DockerfileLanguageServiceFactory, FormatterSettings } from '../src/main';

const service = DockerfileLanguageServiceFactory.createLanguageService();

function formatRange(content: string, range: Range, settings?: FormatterSettings): TextEdit[] {
    if (!settings) {
        settings = {
            insertSpaces: false,
            tabSize: 4
        };
    }
    return service.formatRange(content, range, settings);
}

function formatOnType(content: string, position: Position, ch: string, settings?: FormatterSettings): TextEdit[] {
    if (!settings) {
        settings = {
            insertSpaces: false,
            tabSize: 4
        };
    }
    return service.formatOnType(content, position, ch, settings);
}

describe("Dockerfile formatter", function () {
    describe("range", function () {
        describe("single line selection", function () {
            it("empty", function () {
                let content = "";
                let range = Range.create(Position.create(0, 0), Position.create(0, 0));
                let edits = formatRange(content, range);
                assert.equal(edits.length, 0);
            });

            it("whitespace", function () {
                let content = "  \t";
                let range = Range.create(Position.create(0, 1), Position.create(0, 2));
                let edits = formatRange(content, range);
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "");
                assert.equal(edits[0].range.start.line, 0);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 0);
                assert.equal(edits[0].range.end.character, 3);
            });

            it("instruction", function () {
                let content = "FROM node";
                let range = Range.create(Position.create(0, 1), Position.create(0, 2));
                let edits = formatRange(content, range);
                assert.equal(edits.length, 0);

                content = "  FROM node";
                range = Range.create(Position.create(0, 1), Position.create(0, 2));
                edits = formatRange(content, range);
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "");
                assert.equal(edits[0].range.start.line, 0);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 0);
                assert.equal(edits[0].range.end.character, 2);
            });

            it("comment", function () {
                let content = "  # comment";
                let range = Range.create(Position.create(0, 1), Position.create(0, 2));
                let edits = formatRange(content, range);
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "");
                assert.equal(edits[0].range.start.line, 0);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 0);
                assert.equal(edits[0].range.end.character, 2);
            });

            it("nested", function () {
                let content = "FROM node\n\tEXPOSE 8080\nHEALTHCHECK NONE";
                let range = Range.create(Position.create(1, 3), Position.create(1, 4));
                let edits = formatRange(content, range);
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "");
                assert.equal(edits[0].range.start.line, 1);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 1);
                assert.equal(edits[0].range.end.character, 1);

                // select an irrelevant line
                range = Range.create(Position.create(2, 3), Position.create(2, 4));
                edits = formatRange(content, range);
                assert.equal(edits.length, 0);
            });

			/**
			 * FROM node
			 * EXPOSE 8080\
			 * 8[08]1
			 * ------------
			 * FROM node
			 * EXPOSE 8080\
			 * \t8081
			 */
            it("escape non-whitespace", function () {
                let content = "FROM node\nEXPOSE 8080\\\n8081";
                let range = Range.create(Position.create(2, 1), Position.create(2, 2));
                let edits = formatRange(content, range);
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "\t");
                assert.equal(edits[0].range.start.line, 2);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 2);
                assert.equal(edits[0].range.end.character, 0);

                content = "FROM node\rEXPOSE 8080\\\r8081";
                range = Range.create(Position.create(2, 1), Position.create(2, 2));
                edits = formatRange(content, range);
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "\t");
                assert.equal(edits[0].range.start.line, 2);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 2);
                assert.equal(edits[0].range.end.character, 0);

                content = "FROM node\r\nEXPOSE 8080\\\r\n8081";
                range = Range.create(Position.create(2, 1), Position.create(2, 2));
                edits = formatRange(content, range);
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "\t");
                assert.equal(edits[0].range.start.line, 2);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 2);
                assert.equal(edits[0].range.end.character, 0);
            });

			/**
			 * FROM node
			 * EXPOSE 8080\
			 *  8[08]1
			 * ------------
			 * FROM node
			 * EXPOSE 8080\
			 * \t8081
			 */
            it("escape whitespace", function () {
                let content = "FROM node\nEXPOSE 8080\\\n 8081";
                let range = Range.create(Position.create(2, 2), Position.create(2, 3));
                let edits = formatRange(content, range);
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "\t");
                assert.equal(edits[0].range.start.line, 2);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 2);
                assert.equal(edits[0].range.end.character, 1);

                edits = formatRange(content, range, { tabSize: 2, insertSpaces: true });
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "  ");
                assert.equal(edits[0].range.start.line, 2);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 2);
                assert.equal(edits[0].range.end.character, 1);

                content = "FROM node\rEXPOSE 8080\\\r 8081";
                range = Range.create(Position.create(2, 1), Position.create(2, 2));
                edits = formatRange(content, range);
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "\t");
                assert.equal(edits[0].range.start.line, 2);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 2);
                assert.equal(edits[0].range.end.character, 1);

                content = "FROM node\r\nEXPOSE 8080\\\r\n 8081";
                range = Range.create(Position.create(2, 1), Position.create(2, 2));
                edits = formatRange(content, range);
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "\t");
                assert.equal(edits[0].range.start.line, 2);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 2);
                assert.equal(edits[0].range.end.character, 1);
            });

            it("no indentation", function () {
                let content = "FROM node\n\tEXPOSE 8080";
                let range = Range.create(Position.create(1, 3), Position.create(1, 4));
                let edits = formatRange(content, range);
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "");
                assert.equal(edits[0].range.start.line, 1);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 1);
                assert.equal(edits[0].range.end.character, 1);

                content = "FROM node\r\tEXPOSE 8080";
                range = Range.create(Position.create(1, 3), Position.create(1, 4));
                edits = formatRange(content, range);
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "");
                assert.equal(edits[0].range.start.line, 1);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 1);
                assert.equal(edits[0].range.end.character, 1);

                content = "FROM node\r\n\tEXPOSE 8080";
                range = Range.create(Position.create(1, 3), Position.create(1, 4));
                edits = formatRange(content, range);
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "");
                assert.equal(edits[0].range.start.line, 1);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 1);
                assert.equal(edits[0].range.end.character, 1);
            });

            it("whitespace before escape", function () {
                let content = "EXPOSE 8081\\ \n8082";
                let range = Range.create(Position.create(1, 3), Position.create(1, 4));
                let edits = formatRange(content, range);
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "\t");
                assert.equal(edits[0].range.start.line, 1);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 1);
                assert.equal(edits[0].range.end.character, 0);

                content = "EXPOSE 8081\\ \r8082";
                range = Range.create(Position.create(1, 3), Position.create(1, 4));
                edits = formatRange(content, range);
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "\t");
                assert.equal(edits[0].range.start.line, 1);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 1);
                assert.equal(edits[0].range.end.character, 0);

                content = "EXPOSE 8081\\ \r\n8082";
                range = Range.create(Position.create(1, 3), Position.create(1, 4));
                edits = formatRange(content, range);
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "\t");
                assert.equal(edits[0].range.start.line, 1);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 1);
                assert.equal(edits[0].range.end.character, 0);
            });

            it("no edits returned", () => {
                let content = "EXPOSE 8081\\ \n\t8082";
                let range = Range.create(Position.create(1, 3), Position.create(1, 4));
                let edits = formatRange(content, range);
                assert.equal(edits.length, 0);
            });

            it("ignore multiline instructions", () => {
                const content = "EXPOSE 8081\\ \n8082";
                const range = Range.create(Position.create(1, 3), Position.create(1, 4));
                const edits = formatRange(
                    content,
                    range,
                    {
                        insertSpaces: false,
                        tabSize: 4,
                        ignoreMultilineInstructions: true
                    }
                );
                assert.equal(edits.length, 0);
            });
        });

        describe("multi line selection", function () {

			/**
			 *  [ 
			 *  ] 
			 * ---
			 * 
			 * 
			 */
            it("empty", function () {
                let content = "  \n  ";
                let range = Range.create(Position.create(0, 1), Position.create(1, 1));
                let edits = formatRange(content, range);
                assert.equal(edits.length, 2);
                assert.equal(edits[0].newText, "");
                assert.equal(edits[0].range.start.line, 0);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 0);
                assert.equal(edits[0].range.end.character, 2);
                assert.equal(edits[1].newText, "");
                assert.equal(edits[1].range.start.line, 1);
                assert.equal(edits[1].range.start.character, 0);
                assert.equal(edits[1].range.end.line, 1);
                assert.equal(edits[1].range.end.character, 2);

                content = "  \r\n  ";
                range = Range.create(Position.create(0, 1), Position.create(1, 1));
                edits = formatRange(content, range);
                assert.equal(edits.length, 2);
                assert.equal(edits[0].newText, "");
                assert.equal(edits[0].range.start.line, 0);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 0);
                assert.equal(edits[0].range.end.character, 2);
                assert.equal(edits[1].newText, "");
                assert.equal(edits[1].range.start.line, 1);
                assert.equal(edits[1].range.start.character, 0);
                assert.equal(edits[1].range.end.line, 1);
                assert.equal(edits[1].range.end.character, 2);
            });

			/**
			 *  [ 
			 *   
			 *  ] 
			 * ---
			 * 
			 * 
			 * 
			 */
            it("empty double", function () {
                let content = "  \n  \n  ";
                let range = Range.create(Position.create(0, 1), Position.create(2, 1));
                let edits = formatRange(content, range);
                assert.equal(edits.length, 3);
                assert.equal(edits[0].newText, "");
                assert.equal(edits[0].range.start.line, 0);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 0);
                assert.equal(edits[0].range.end.character, 2);
                assert.equal(edits[1].newText, "");
                assert.equal(edits[1].range.start.line, 1);
                assert.equal(edits[1].range.start.character, 0);
                assert.equal(edits[1].range.end.line, 1);
                assert.equal(edits[1].range.end.character, 2);
                assert.equal(edits[2].newText, "");
                assert.equal(edits[2].range.start.line, 2);
                assert.equal(edits[2].range.start.character, 0);
                assert.equal(edits[2].range.end.line, 2);
                assert.equal(edits[2].range.end.character, 2);
            });

			/**
			 *   [FROM node
			 * \tEXPOSE 8080
			 * HEALT]HCHECK NONE
			 */
            it("instructions", function () {
                let content = "  FROM node\n\tEXPOSE 8080\n  HEALTHCHECK NONE";
                let range = Range.create(Position.create(0, 3), Position.create(2, 5));
                let edits = formatRange(content, range);
                assert.equal(edits.length, 3);
                assert.equal(edits[0].newText, "");
                assert.equal(edits[0].range.start.line, 0);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 0);
                assert.equal(edits[0].range.end.character, 2);
                assert.equal(edits[1].newText, "");
                assert.equal(edits[1].range.start.line, 1);
                assert.equal(edits[1].range.start.character, 0);
                assert.equal(edits[1].range.end.line, 1);
                assert.equal(edits[1].range.end.character, 1);

                content = "  FROM node\r\tEXPOSE 8080\r  HEALTHCHECK NONE";
                range = Range.create(Position.create(0, 3), Position.create(2, 5));
                edits = formatRange(content, range);
                assert.equal(edits.length, 3);
                assert.equal(edits[0].newText, "");
                assert.equal(edits[0].range.start.line, 0);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 0);
                assert.equal(edits[0].range.end.character, 2);
                assert.equal(edits[1].newText, "");
                assert.equal(edits[1].range.start.line, 1);
                assert.equal(edits[1].range.start.character, 0);
                assert.equal(edits[1].range.end.line, 1);
                assert.equal(edits[1].range.end.character, 1);

                content = "  FROM node\r\n\tEXPOSE 8080\r\n  HEALTHCHECK NONE";
                range = Range.create(Position.create(0, 3), Position.create(2, 5));
                edits = formatRange(content, range);
                assert.equal(edits.length, 3);
                assert.equal(edits[0].newText, "");
                assert.equal(edits[0].range.start.line, 0);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 0);
                assert.equal(edits[0].range.end.character, 2);
                assert.equal(edits[1].newText, "");
                assert.equal(edits[1].range.start.line, 1);
                assert.equal(edits[1].range.start.character, 0);
                assert.equal(edits[1].range.end.line, 1);
                assert.equal(edits[1].range.end.character, 1);
            });

			/**
			 * FROM node
			 * EXPOSE 8080\
			 * 8[081\
			 * 8082\
			 * 808]3
			 * ------------
			 * FROM node
			 * EXPOSE 8080\
			 * \t8081\
			 * \t8082\
			 * \t8083
			 */
            it("escaped indents selected", function () {
                let content = "FROM node\nEXPOSE 8080\\\n8081\\\n8082\\\n8083";
                let range = Range.create(Position.create(2, 1), Position.create(4, 3));
                let edits = formatRange(content, range);
                assert.equal(edits.length, 3);
                assert.equal(edits[0].newText, "\t");
                assert.equal(edits[0].range.start.line, 2);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 2);
                assert.equal(edits[0].range.end.character, 0);
                assert.equal(edits[1].newText, "\t");
                assert.equal(edits[1].range.start.line, 3);
                assert.equal(edits[1].range.start.character, 0);
                assert.equal(edits[1].range.end.line, 3);
                assert.equal(edits[1].range.end.character, 0);
                assert.equal(edits[2].newText, "\t");
                assert.equal(edits[2].range.start.line, 4);
                assert.equal(edits[2].range.start.character, 0);
                assert.equal(edits[2].range.end.line, 4);
                assert.equal(edits[2].range.end.character, 0);
            });

			/**
			 * EXPOSE 8080 \
			 * [8081 \
			 * 8082]
			 * ------------
			 * EXPOSE 8080 \
			 * \t8081 \
			 * \t8082
			 */
            it("whitespace before escape", function () {
                let content = "EXPOSE 8080 \\\n8081 \\\n8082";
                let range = Range.create(Position.create(1, 0), Position.create(2, 4));
                let edits = formatRange(content, range);
                assert.equal(edits.length, 2);
                assert.equal(edits[0].newText, "\t");
                assert.equal(edits[0].range.start.line, 1);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 1);
                assert.equal(edits[0].range.end.character, 0);
                assert.equal(edits[1].newText, "\t");
                assert.equal(edits[1].range.start.line, 2);
                assert.equal(edits[1].range.start.character, 0);
                assert.equal(edits[1].range.end.line, 2);
                assert.equal(edits[1].range.end.character, 0);
            });

			/**
			 * EXPOSE 8080 \
			 * [8081 \
			 * 
			 * 8082]
			 * ------------
			 * EXPOSE 8080 \
			 * \t8081 \
			 * 
			 * \t8082
			 */
            it("empty line after escape", function () {
                let content = "EXPOSE 8080 \\\n8081 \\\n\n8082";
                let range = Range.create(Position.create(1, 0), Position.create(3, 4));
                let edits = formatRange(content, range);
                assert.equal(edits.length, 2);
                assert.equal(edits[0].newText, "\t");
                assert.equal(edits[0].range.start.line, 1);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 1);
                assert.equal(edits[0].range.end.character, 0);
                assert.equal(edits[1].newText, "\t");
                assert.equal(edits[1].range.start.line, 3);
                assert.equal(edits[1].range.start.character, 0);
                assert.equal(edits[1].range.end.line, 3);
                assert.equal(edits[1].range.end.character, 0);
            });

			/**
			 * EXPOSE 8080 \
			 * [8081 \
			 *  \t 
			 * 8082]
			 * ------------
			 * EXPOSE 8080 \
			 * \t8081 \
			 * 
			 * \t8082
			 */
            it("whitespace line after escape", function () {
                let content = "EXPOSE 8080 \\\n8081 \\\n \t \n8082";
                let range = Range.create(Position.create(1, 0), Position.create(3, 4));
                let edits = formatRange(content, range);
                assert.equal(edits.length, 3);
                assert.equal(edits[0].newText, "\t");
                assert.equal(edits[0].range.start.line, 1);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 1);
                assert.equal(edits[0].range.end.character, 0);
                assert.equal(edits[1].newText, "");
                assert.equal(edits[1].range.start.line, 2);
                assert.equal(edits[1].range.start.character, 0);
                assert.equal(edits[1].range.end.line, 2);
                assert.equal(edits[1].range.end.character, 3);
                assert.equal(edits[2].newText, "\t");
                assert.equal(edits[2].range.start.line, 3);
                assert.equal(edits[2].range.start.character, 0);
                assert.equal(edits[2].range.end.line, 3);
                assert.equal(edits[2].range.end.character, 0);
            });

			/**
			 * EXPOSE 8080 \
			 * [8081 \
			 * # comment
			 * 8082]
			 * ------------
			 * EXPOSE 8080 \
			 * \t8081 \
			 * \t# comment
			 * \t8082
			 */
            it("comment after escape", function () {
                let content = "EXPOSE 8080 \\\n8081 \\\n# comment\n8082";
                let range = Range.create(Position.create(1, 0), Position.create(3, 4));
                let edits = formatRange(content, range);
                assert.equal(edits.length, 3);
                assert.equal(edits[0].newText, "\t");
                assert.equal(edits[0].range.start.line, 1);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 1);
                assert.equal(edits[0].range.end.character, 0);
                assert.equal(edits[1].newText, "\t");
                assert.equal(edits[1].range.start.line, 2);
                assert.equal(edits[1].range.start.character, 0);
                assert.equal(edits[1].range.end.line, 2);
                assert.equal(edits[1].range.end.character, 0);
                assert.equal(edits[2].newText, "\t");
                assert.equal(edits[2].range.start.line, 3);
                assert.equal(edits[2].range.start.character, 0);
                assert.equal(edits[2].range.end.line, 3);
                assert.equal(edits[2].range.end.character, 0);
            });

			/**
			 * EXPOSE 8080 \
			 * [8081 \
			 * \t \t# comment
			 * 8082]
			 * ------------
			 * EXPOSE 8080 \
			 * \t8081 \
			 * \t# comment
			 * \t8082
			 */
            it("whitespace before comment after escape", function () {
                let content = "EXPOSE 8080 \\\n8081 \\\n\t \t# comment\n8082";
                let range = Range.create(Position.create(1, 0), Position.create(3, 4));
                let edits = formatRange(content, range);
                assert.equal(edits.length, 3);
                assert.equal(edits[0].newText, "\t");
                assert.equal(edits[0].range.start.line, 1);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 1);
                assert.equal(edits[0].range.end.character, 0);
                assert.equal(edits[1].newText, "\t");
                assert.equal(edits[1].range.start.line, 2);
                assert.equal(edits[1].range.start.character, 0);
                assert.equal(edits[1].range.end.line, 2);
                assert.equal(edits[1].range.end.character, 3);
                assert.equal(edits[2].newText, "\t");
                assert.equal(edits[2].range.start.line, 3);
                assert.equal(edits[2].range.start.character, 0);
                assert.equal(edits[2].range.end.line, 3);
                assert.equal(edits[2].range.end.character, 0);
            });

            it("full file", function () {
                let content = "FROM node\n EXPOSE 8081\nHEALTHCHECK NONE";
                let range = Range.create(Position.create(0, 1), Position.create(1, 3));
                let edits = formatRange(content, range);
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "");
                assert.equal(edits[0].range.start.line, 1);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 1);
                assert.equal(edits[0].range.end.character, 1);
            });

            it("no edits returned", () => {
                let content = "EXPOSE 8081\\ \n\t8082";
                let range = Range.create(Position.create(0, 3), Position.create(1, 4));
                let edits = formatRange(content, range);
                assert.equal(edits.length, 0);
            });

            it("ignore multiline instructions", () => {
                const content = "EXPOSE 8081\\ \n8082";
                const range = Range.create(Position.create(0, 3), Position.create(1, 4));
                const edits = formatRange(
                    content,
                    range,
                    {
                        insertSpaces: false,
                        tabSize: 4,
                        ignoreMultilineInstructions: true
                    }
                );
                assert.equal(edits.length, 0);
            });
        });
    });

    describe("on type", function () {
        describe("backslash", function () {
            it("one line", function () {
                let content = "FROM node AS ";
                let edits = formatOnType(content, Position.create(0, 13), '\\');
                assert.equal(edits.length, 0);
            });

            it("two lines", function () {
                let content = "FROM node AS \n";
                let edits = formatOnType(content, Position.create(0, 13), '\\');
                assert.equal(edits.length, 0);

                content = "FROM node AS  \t\r\n";
                edits = formatOnType(content, Position.create(0, 13), '\\');
                assert.equal(edits.length, 0);

                content = "FROM node AS \nsetup";
                edits = formatOnType(content, Position.create(0, 13), '\\');
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "\t");
                assert.equal(edits[0].range.start.line, 1);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 1);
                assert.equal(edits[0].range.end.character, 0);
            });

            it("three lines", function () {
                let content = "FROM node AS \n\n";
                let edits = formatOnType(content, Position.create(0, 13), '\\');
                assert.equal(edits.length, 0);

                content = "FROM node AS \nsetup\n";
                edits = formatOnType(content, Position.create(0, 13), '\\');
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "\t");
                assert.equal(edits[0].range.start.line, 1);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 1);
                assert.equal(edits[0].range.end.character, 0);

                content = "FROM node \nAS \nsetup\n";
                edits = formatOnType(content, Position.create(0, 10), '\\');
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "\t");
                assert.equal(edits[0].range.start.line, 1);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 1);
                assert.equal(edits[0].range.end.character, 0);
            });

            it("directive defined as backtick", function () {
                let content = "#escape=`\nFROM node AS \nsetup";
                let edits = formatOnType(content, Position.create(1, 13), '\\');
                assert.equal(edits.length, 0);
            });

            it("nested", function () {
                let content = "SHELL [ \"\", \n \"\" ]";
                let edits = formatOnType(content, Position.create(0, 9), '\\');
                assert.equal(edits.length, 0);
            });

            it("comment", function () {
                let content = "# comment\nFROM node";
                let edits = formatOnType(content, Position.create(0, 9), '\\');
                assert.equal(edits.length, 0);

                content = "FROM node\n# comment";
                edits = formatOnType(content, Position.create(0, 9), '\\');
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "\t");
                assert.equal(edits[0].range.start.line, 1);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 1);
                assert.equal(edits[0].range.end.character, 0);
            });

            it("directive", function () {
                let content = "#escape=\nFROM node";
                let edits = formatOnType(content, Position.create(0, 8), '\\');
                assert.equal(edits.length, 0);
            });

            it("no edits returned", () => {
                let content = "EXPOSE 8081 \n\t8082";
                let edits = formatOnType(content, Position.create(0, 11), '\\');
                assert.equal(edits.length, 0);
            });

            it("ignore multiline instructions", () => {
                const content = "EXPOSE 8081 \n8082";
                const edits = formatOnType(
                    content,
                    Position.create(0, 11),
                    '\\',
                    {
                        insertSpaces: false,
                        tabSize: 4,
                        ignoreMultilineInstructions: true
                    }
                );
                assert.equal(edits.length, 0);
            });
        });

        describe("backtick", function () {
            it("ignored", function () {
                let content = "FROM node AS \nsetup";
                let edits = formatOnType(content, Position.create(0, 13), '`');
                assert.equal(edits.length, 0);
            });

            it("directive defined as backtick", function () {
                let content = "#escape=`\nFROM node AS \nsetup";
                let edits = formatOnType(content, Position.create(1, 13), '`');
                assert.equal(edits.length, 1);
                assert.equal(edits[0].newText, "\t");
                assert.equal(edits[0].range.start.line, 2);
                assert.equal(edits[0].range.start.character, 0);
                assert.equal(edits[0].range.end.line, 2);
                assert.equal(edits[0].range.end.character, 0);
            });

            it("no edits returned", () => {
                let content = "#escape=`\nEXPOSE 8081 \n\t8082";
                let edits = formatOnType(content, Position.create(1, 11), '`');
                assert.equal(edits.length, 0);
            });

            it("ignore multiline instructions", () => {
                const content = "#escape=`\nEXPOSE 8081 \n8082";
                const edits = formatOnType(
                    content,
                    Position.create(1, 11),
                    '`',
                    {
                        insertSpaces: false,
                        tabSize: 4,
                        ignoreMultilineInstructions: true
                    }
                );
                assert.equal(edits.length, 0);
            });
        });
    });
});
