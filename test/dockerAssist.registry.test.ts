/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as assert from "assert";

import {
    TextDocument, Position, CompletionItem, CompletionItemKind, InsertTextFormat
} from 'vscode-languageserver-types';
import { DockerfileLanguageServiceFactory } from '../src/main';
import { DockerRegistryClient } from '../src/dockerRegistryClient';

let dockerRegistryClient = new DockerRegistryClient(null);

function computePromise(content: string, line: number, character: number): PromiseLike<CompletionItem[]> {
    let service = DockerfileLanguageServiceFactory.createLanguageService();
    let items = service.computeCompletionItems(content, Position.create(line, character), false);
    return items as PromiseLike<CompletionItem[]>;
}

function assertImageTag(tag: string, item: CompletionItem) {
    assert.equal(item.label, tag);
    assert.equal(item.kind, CompletionItemKind.Property);
    assert.equal(item.insertTextFormat, InsertTextFormat.PlainText);
}

function assertImageTags(tags: string[], items: CompletionItem[]) {
    assert.equal(items.length, tags.length);
    for (let i = 0; i < tags.length; i++) {
        assertImageTag(tags[i], items[i]);
    }
}

describe("Docker Content Assist Registry Tests", () => {
    describe("FROM", () => {
        describe("image tags short name", () => {
            it("all", async function () {
                this.timeout(10000);
                const tags = await dockerRegistryClient.getTags("alpine");
                const items = await computePromise("FROM alpine:", 0, 12);
                assertImageTags(tags, items);
            });

            it("all ignore prefix", async function () {
                this.timeout(10000);
                const tags = await dockerRegistryClient.getTags("alpine");
                const items = await computePromise("FROM alpine:lat", 0, 12);
                assertImageTags(tags, items);
            });

            it("prefix", async function () {
                this.timeout(10000);
                const tags = await dockerRegistryClient.getTags("alpine", "lat");
                const items = await computePromise("FROM alpine:lat", 0, 15);
                assertImageTags(tags, items);
            });

            it("invalid", async function () {
                this.timeout(10000);
                const items = await computePromise("FROM alpine-abc:", 0, 16);
                assert.equal(items.length, 0);
            });
        });

        describe("image tags full name", () => {
            it("all", async function () {
                this.timeout(10000);
                const tags = await dockerRegistryClient.getTags("library/alpine");
                const items = await computePromise("FROM library/alpine:", 0, 20);
                assertImageTags(tags, items);
            });

            it("all ignore prefix", async function () {
                this.timeout(10000);
                const tags = await dockerRegistryClient.getTags("library/alpine");
                const items = await computePromise("FROM library/alpine:lat", 0, 20);
                assertImageTags(tags, items);
            });

            it("prefix", async function () {
                this.timeout(10000);
                const tags = await dockerRegistryClient.getTags("library/alpine", "lat");
                const items = await computePromise("FROM library/alpine:lat", 0, 23);
                assertImageTags(tags, items);
            });

            it("invalid", async function () {
                this.timeout(10000);
                const items = await computePromise("FROM library/alpine-abc:", 0, 24);
                assert.equal(items.length, 0);
            });
        });
    });
});
