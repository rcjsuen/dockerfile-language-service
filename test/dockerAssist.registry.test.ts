/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as assert from "assert";

import {
    Position, CompletionItem, CompletionItemKind, InsertTextFormat, TextEdit
} from 'vscode-languageserver-types';
import { DockerfileLanguageServiceFactory } from '../src/main';
import { DockerRegistryClient } from '../src/dockerRegistryClient';

let dockerRegistryClient = new DockerRegistryClient(null);

function computePromise(content: string, line: number, character: number): PromiseLike<CompletionItem[]> {
    let service = DockerfileLanguageServiceFactory.createLanguageService();
    let items = service.computeCompletionItems(content, Position.create(line, character));
    return items as PromiseLike<CompletionItem[]>;
}

function assertImageTag(tag: string, item: CompletionItem, line: number, character: number, prefixLength: number) {
    assert.strictEqual(item.label, tag);
    assert.strictEqual(item.kind, CompletionItemKind.Property);
    assert.strictEqual(item.textEdit.newText, tag);
    assert.strictEqual((item.textEdit as TextEdit).range.start.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.start.character, character);
    assert.strictEqual((item.textEdit as TextEdit).range.end.line, line);
    assert.strictEqual((item.textEdit as TextEdit).range.end.character, character + prefixLength);
    assert.strictEqual(item.insertTextFormat, InsertTextFormat.PlainText);
}

function assertImageTags(tags: string[], items: CompletionItem[], cursorPosition: number, prefixLength: number) {
    assert.notEqual(items.length, 0);
    assert.notEqual(tags.length, 0);
    assert.strictEqual(items.length, tags.length);
    for (let i = 0; i < tags.length; i++) {
        assertImageTag(tags[i], items[i], 0, cursorPosition - prefixLength, prefixLength);
    }
}

describe("Docker Content Assist Registry Tests", () => {
    describe("FROM", () => {
        describe("image tags short name", () => {
            it("all", async function () {
                this.timeout(10000);
                const tags = await dockerRegistryClient.getTags("alpine");
                const items = await computePromise("FROM alpine:", 0, 12);
                assertImageTags(tags, items, 12, 0);
            });

            it("all ignore prefix", async function () {
                this.timeout(10000);
                const tags = await dockerRegistryClient.getTags("alpine");
                const items = await computePromise("FROM alpine:lat", 0, 12);
                assertImageTags(tags, items, 12, 0);
            });

            it("prefix", async function () {
                this.timeout(10000);
                const tags = await dockerRegistryClient.getTags("alpine", "lat");
                const items = await computePromise("FROM alpine:lat", 0, 15);
                assertImageTags(tags, items, 15, 3);
            });

            it("invalid", async function () {
                this.timeout(10000);
                const items = await computePromise("FROM alpine-abc:", 0, 16);
                assert.strictEqual(items.length, 0);
            });
        });

        describe("image tags full name", () => {
            it("all", async function () {
                this.timeout(10000);
                const tags = await dockerRegistryClient.getTags("library/alpine");
                const items = await computePromise("FROM library/alpine:", 0, 20);
                assertImageTags(tags, items, 20, 0);
            });

            it("all ignore prefix", async function () {
                this.timeout(10000);
                const tags = await dockerRegistryClient.getTags("library/alpine");
                const items = await computePromise("FROM library/alpine:lat", 0, 20);
                assertImageTags(tags, items, 20, 0);
            });

            it("prefix", async function () {
                this.timeout(10000);
                const tags = await dockerRegistryClient.getTags("library/alpine", "lat");
                const items = await computePromise("FROM library/alpine:lat", 0, 23);
                assertImageTags(tags, items, 23, 3);
            });

            it("invalid", async function () {
                this.timeout(10000);
                const items = await computePromise("FROM library/alpine-abc:", 0, 24);
                assert.strictEqual(items.length, 0);
            });

            it("issue #39", async function () {
                this.timeout(10000);
                const tags = await dockerRegistryClient.getTags("python", "3.8-b");
                const items = await computePromise("FROM python:3.8-b", 0, 17);
                assertImageTags(tags, items, 17, 5);
            });
        });

        describe("Docker Store published images", () => {
            it("issue #50", async function () {
                this.timeout(10000);
                const tags = await dockerRegistryClient.getTags("store/intersystems/iris-community");
                const items = await computePromise("FROM store/intersystems/iris-community:", 0, 39);
                assertImageTags(tags, items, 39, 0);
            });
        });
    });
});
