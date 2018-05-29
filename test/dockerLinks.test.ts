/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as assert from "assert";

import { DocumentLink } from 'vscode-languageserver-types';
import { DockerfileLanguageServiceFactory } from '../src/main';

let service = DockerfileLanguageServiceFactory.createLanguageService();

function assertLink(documentLink: DocumentLink, target: string, data: string, startLine: number, startCharacter: number, endLine: number, endCharacter: number) {
    assert.equal(documentLink.target, target);
    assert.equal(documentLink.data, data);
    assert.equal(documentLink.range.start.line, startLine);
    assert.equal(documentLink.range.start.character, startCharacter);
    assert.equal(documentLink.range.end.line, endLine);
    assert.equal(documentLink.range.end.character, endCharacter);
}

describe("Dockerfile links", function () {
    it("FROM", function () {
        let links = service.computeLinks("FROM");
        assert.equal(links.length, 0);
    });

    it("FROM node", function () {
        let links = service.computeLinks("FROM node");
        assert.equal(links.length, 1);
        assertLink(links[0], undefined, "_/node/", 0, 5, 0, 9);
        links[0] = service.resolveLink(links[0]);
        assertLink(links[0], "https://hub.docker.com/_/node/", "_/node/", 0, 5, 0, 9);
    });

    it("FROM node:latest", function () {
        let links = service.computeLinks("FROM node:latest");
        assert.equal(links.length, 1);
        assertLink(links[0], undefined, "_/node/", 0, 5, 0, 9);
        links[0] = service.resolveLink(links[0]);
        assertLink(links[0], "https://hub.docker.com/_/node/", "_/node/", 0, 5, 0, 9);
    });

    it("FROM node@sha256:613685c22f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700", function () {
        let links = service.computeLinks("FROM node@sha256:613685c22f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700");
        assert.equal(links.length, 1);
        assertLink(links[0], undefined, "_/node/", 0, 5, 0, 9);
        links[0] = service.resolveLink(links[0]);
        assertLink(links[0], "https://hub.docker.com/_/node/", "_/node/", 0, 5, 0, 9);
    });

    it("FROM microsoft/dotnet", function () {
        let links = service.computeLinks("FROM microsoft/dotnet");
        assert.equal(links.length, 1);
        assertLink(links[0], undefined, "r/microsoft/dotnet/", 0, 5, 0, 21);
        links[0] = service.resolveLink(links[0]);
        assertLink(links[0], "https://hub.docker.com/r/microsoft/dotnet/", "r/microsoft/dotnet/", 0, 5, 0, 21);
    });

    it("FROM microsoft/dotnet:sdk", function () {
        let links = service.computeLinks("FROM microsoft/dotnet:sdk");
        assert.equal(links.length, 1);
        assertLink(links[0], undefined, "r/microsoft/dotnet/", 0, 5, 0, 21);
        links[0] = service.resolveLink(links[0]);
        assertLink(links[0], "https://hub.docker.com/r/microsoft/dotnet/", "r/microsoft/dotnet/", 0, 5, 0, 21);
    });

    it("FROM microsoft/dotnet@sha256:5483e2b609c0f66c3ebd96666de7b0a74537613b43565879ecb0d0a73e845d7d", function () {
        let links = service.computeLinks("FROM microsoft/dotnet@sha256:5483e2b609c0f66c3ebd96666de7b0a74537613b43565879ecb0d0a73e845d7d");
        assert.equal(links.length, 1);
        assertLink(links[0], undefined, "r/microsoft/dotnet/", 0, 5, 0, 21);
        links[0] = service.resolveLink(links[0]);
        assertLink(links[0], "https://hub.docker.com/r/microsoft/dotnet/", "r/microsoft/dotnet/", 0, 5, 0, 21);
    });
});
