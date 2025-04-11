/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as assert from "assert";

import { DocumentLink } from 'vscode-languageserver-types';
import { DockerfileLanguageServiceFactory } from '../src/main';

let service = DockerfileLanguageServiceFactory.createLanguageService();

function assertLink(documentLink: DocumentLink, target: string, data: string, startLine: number, startCharacter: number, endLine: number, endCharacter: number) {
    assert.strictEqual(documentLink.target, target);
    assert.strictEqual(documentLink.data, data);
    assert.strictEqual(documentLink.range.start.line, startLine);
    assert.strictEqual(documentLink.range.start.character, startCharacter);
    assert.strictEqual(documentLink.range.end.line, endLine);
    assert.strictEqual(documentLink.range.end.character, endCharacter);
}

describe("Dockerfile links", function () {
    describe("Docker Hub", function() {
        it("FROM", function () {
            let links = service.computeLinks("FROM");
            assert.strictEqual(links.length, 0);
        });

        it("FROM node", function () {
            let links = service.computeLinks("FROM node");
            assert.strictEqual(links.length, 1);
            assertLink(links[0], undefined, "_/node/", 0, 5, 0, 9);
            links[0] = service.resolveLink(links[0]);
            assertLink(links[0], "https://hub.docker.com/_/node/", "_/node/", 0, 5, 0, 9);
        });

        it("FROM node:latest", function () {
            let links = service.computeLinks("FROM node:latest");
            assert.strictEqual(links.length, 1);
            assertLink(links[0], undefined, "_/node/", 0, 5, 0, 9);
            links[0] = service.resolveLink(links[0]);
            assertLink(links[0], "https://hub.docker.com/_/node/", "_/node/", 0, 5, 0, 9);
        });

        it("FROM node@sha256:613685c22f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700", function () {
            let links = service.computeLinks("FROM node@sha256:613685c22f65d01f2264bdd49b8a336488e14faf29f3ff9b6bf76a4da23c4700");
            assert.strictEqual(links.length, 1);
            assertLink(links[0], undefined, "_/node/", 0, 5, 0, 9);
            links[0] = service.resolveLink(links[0]);
            assertLink(links[0], "https://hub.docker.com/_/node/", "_/node/", 0, 5, 0, 9);
        });

        it("FROM microsoft/dotnet", function () {
            let links = service.computeLinks("FROM microsoft/dotnet");
            assert.strictEqual(links.length, 1);
            assertLink(links[0], undefined, "r/microsoft/dotnet/", 0, 5, 0, 21);
            links[0] = service.resolveLink(links[0]);
            assertLink(links[0], "https://hub.docker.com/r/microsoft/dotnet/", "r/microsoft/dotnet/", 0, 5, 0, 21);
        });

        it("FROM microsoft/dotnet:sdk", function () {
            let links = service.computeLinks("FROM microsoft/dotnet:sdk");
            assert.strictEqual(links.length, 1);
            assertLink(links[0], undefined, "r/microsoft/dotnet/", 0, 5, 0, 21);
            links[0] = service.resolveLink(links[0]);
            assertLink(links[0], "https://hub.docker.com/r/microsoft/dotnet/", "r/microsoft/dotnet/", 0, 5, 0, 21);
        });

        it("FROM microsoft/dotnet@sha256:5483e2b609c0f66c3ebd96666de7b0a74537613b43565879ecb0d0a73e845d7d", function () {
            let links = service.computeLinks("FROM microsoft/dotnet@sha256:5483e2b609c0f66c3ebd96666de7b0a74537613b43565879ecb0d0a73e845d7d");
            assert.strictEqual(links.length, 1);
            assertLink(links[0], undefined, "r/microsoft/dotnet/", 0, 5, 0, 21);
            links[0] = service.resolveLink(links[0]);
            assertLink(links[0], "https://hub.docker.com/r/microsoft/dotnet/", "r/microsoft/dotnet/", 0, 5, 0, 21);
        });

        it("FROM microsoft/dotnet:non-existent-tag@sha256:5483e2b609c0f66c3ebd96666de7b0a74537613b43565879ecb0d0a73e845d7d", () => {
            const links = service.computeLinks("FROM microsoft/dotnet:non-existent-tag@sha256:5483e2b609c0f66c3ebd96666de7b0a74537613b43565879ecb0d0a73e845d7d");
            assert.strictEqual(links.length, 1);
            assertLink(links[0], undefined, "r/microsoft/dotnet/", 0, 5, 0, 21);
            links[0] = service.resolveLink(links[0]);
            assertLink(links[0], "https://hub.docker.com/r/microsoft/dotnet/", "r/microsoft/dotnet/", 0, 5, 0, 21);
        });
    });

    describe("ghcr.io", function() {
        it("FROM ghcr.io/super-linter/super-linter", function() {
            const links = service.computeLinks("FROM ghcr.io/super-linter/super-linter");
            assert.strictEqual(links.length, 1);
            assertLink(links[0], "https://github.com/super-linter/super-linter/pkgs/container/super-linter", undefined, 0, 5, 0, 38);
            links[0] = service.resolveLink(links[0]);
            assertLink(links[0], "https://github.com/super-linter/super-linter/pkgs/container/super-linter", undefined, 0, 5, 0, 38);
        });

        it("FROM ghcr.io/super-linter/super-linter:latest-buildcache", function() {
            const links = service.computeLinks("FROM ghcr.io/super-linter/super-linter:latest-buildcache");
            assert.strictEqual(links.length, 1);
            assertLink(links[0], "https://github.com/super-linter/super-linter/pkgs/container/super-linter", undefined, 0, 5, 0, 38);
            links[0] = service.resolveLink(links[0]);
            assertLink(links[0], "https://github.com/super-linter/super-linter/pkgs/container/super-linter", undefined, 0, 5, 0, 38);
        });
    });

    describe("mcr.microsoft.com", function() {
        it("FROM mcr.microsoft.com/powershell", function() {
            const links = service.computeLinks("FROM mcr.microsoft.com/powershell");
            assert.strictEqual(links.length, 1);
            assertLink(links[0], "https://mcr.microsoft.com/artifact/mar/powershell", undefined, 0, 5, 0, 33);
            links[0] = service.resolveLink(links[0]);
            assertLink(links[0], "https://mcr.microsoft.com/artifact/mar/powershell", undefined, 0, 5, 0, 33);
        });

        it("FROM mcr.microsoft.com/powershell:3.17", function() {
            const links = service.computeLinks("FROM mcr.microsoft.com/powershell:3.17");
            assert.strictEqual(links.length, 1);
            assertLink(links[0], "https://mcr.microsoft.com/artifact/mar/powershell", undefined, 0, 5, 0, 33);
            links[0] = service.resolveLink(links[0]);
            assertLink(links[0], "https://mcr.microsoft.com/artifact/mar/powershell", undefined, 0, 5, 0, 33);
        });

        it("FROM mcr.microsoft.com/windows/servercore", function() {
            const links = service.computeLinks("FROM mcr.microsoft.com/windows/servercore");
            assert.strictEqual(links.length, 1);
            assertLink(links[0], "https://mcr.microsoft.com/artifact/mar/windows/servercore", undefined, 0, 5, 0, 41);
            links[0] = service.resolveLink(links[0]);
            assertLink(links[0], "https://mcr.microsoft.com/artifact/mar/windows/servercore", undefined, 0, 5, 0, 41);
        });

        it("FROM mcr.microsoft.com/windows/servercore:ltsc2025", function() {
            const links = service.computeLinks("FROM mcr.microsoft.com/windows/servercore:ltsc2025");
            assert.strictEqual(links.length, 1);
            assertLink(links[0], "https://mcr.microsoft.com/artifact/mar/windows/servercore", undefined, 0, 5, 0, 41);
            links[0] = service.resolveLink(links[0]);
            assertLink(links[0], "https://mcr.microsoft.com/artifact/mar/windows/servercore", undefined, 0, 5, 0, 41);
        });
    });

    describe("quay.io", function() {
        it("FROM quay.io/prometheus/node-exporter", function() {
            const links = service.computeLinks("FROM quay.io/prometheus/node-exporter");
            assert.strictEqual(links.length, 1);
            assertLink(links[0], "https://quay.io/repository/prometheus/node-exporter", undefined, 0, 5, 0, 37);
            links[0] = service.resolveLink(links[0]);
            assertLink(links[0], "https://quay.io/repository/prometheus/node-exporter", undefined, 0, 5, 0, 37);
        });

        it("FROM quay.io/prometheus/node-exporter:v1.9.1", function() {
            const links = service.computeLinks("FROM quay.io/prometheus/node-exporter:v1.9.1");
            assert.strictEqual(links.length, 1);
            assertLink(links[0], "https://quay.io/repository/prometheus/node-exporter", undefined, 0, 5, 0, 37);
            links[0] = service.resolveLink(links[0]);
            assertLink(links[0], "https://quay.io/repository/prometheus/node-exporter", undefined, 0, 5, 0, 37);
        });
    });

    describe("build stages", function () {
        it("valid", () => {
            let links = service.computeLinks("FROM node AS base\nFROM base");
            assert.strictEqual(links.length, 1);
            assertLink(links[0], undefined, "_/node/", 0, 5, 0, 9);
            links[0] = service.resolveLink(links[0]);
            assertLink(links[0], "https://hub.docker.com/_/node/", "_/node/", 0, 5, 0, 9);
        });

        it("wrong stage name", () => {
            let links = service.computeLinks("FROM node AS base\nFROM base2");
            assert.strictEqual(links.length, 2);
            assertLink(links[0], undefined, "_/node/", 0, 5, 0, 9);
            links[0] = service.resolveLink(links[0]);
            assertLink(links[0], "https://hub.docker.com/_/node/", "_/node/", 0, 5, 0, 9);
            assertLink(links[1], undefined, "_/base2/", 1, 5, 1, 10);
            links[1] = service.resolveLink(links[1]);
            assertLink(links[1], "https://hub.docker.com/_/base2/", "_/base2/", 1, 5, 1, 10);
        });
    });
});
