/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const buildRoot = path.resolve(__dirname, "lib");
const monacoEditorPath = './node_modules/monaco-editor/min/vs';

module.exports = {
    entry: path.resolve(buildRoot, "main.js"),
    output: {
        filename: 'bundle.js',
        path: buildRoot
    },
    module: {
        rules: [
            {
                test: /node_modules[\\\\|\/](dockerfile-language-service|vscode-languageserver-types)/,
                use: { loader: 'umd-compat-loader' }
            }
        ]
    },
    resolve: {
        fallback: {
            fs: 'empty',
            https: false,
            child_process: 'empty',
            net: 'empty',
            crypto: 'empty'
        },
        extensions: ['.js'],
        alias: {
            'vs': path.resolve(buildRoot, monacoEditorPath)
        }
    },
    devtool: 'source-map',
    target: 'web',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: monacoEditorPath,
                    to: 'vs'
                }
            ]
        })
    ]
}
