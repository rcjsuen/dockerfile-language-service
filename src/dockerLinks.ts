/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import { DocumentLink } from 'vscode-languageserver-types';
import { DockerfileParser } from 'dockerfile-ast';

export class DockerLinks {

    public getLinks(content: string): DocumentLink[] {
        let dockerfile = DockerfileParser.parse(content);
        let links = [];
        for (let from of dockerfile.getFROMs()) {
            let name = from.getImageName();
            if (name) {
                if (name.indexOf('/') === -1) {
                    links.push({
                        range: from.getImageNameRange(),
                        data: "_/" + name + '/'
                    });
                } else {
                    links.push({
                        range: from.getImageNameRange(),
                        data: "r/" + name + '/'
                    });
                }
            }
        }
        return links;
    }

    public resolveLink(link: DocumentLink): DocumentLink {
        if (link.data) {
            link.target =  "https://hub.docker.com/" + link.data;
        }
        return link;
    }
}
