/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { _EM } from 'vscode-jsonrpc'
import {
    InitializeParams as _InitializeParamsBase,
    InitializeResult as _InitializeResultBase,
    ParameterStructures,
    ProgressType,
    RegistrationType,
    RequestType,
} from 'vscode-languageserver-protocol'
import { ChatOptions } from '@local/language-server-runtimes-generated-types'
import { LogLevel } from '../runtimes/util/loggingUtil'

//Changed so only METHODS are exported from ./chat
export * from '@aws/language-server-runtimes-types'

export * from '@local/language-server-runtimes-generated-types'
export { TextDocument } from 'vscode-languageserver-textdocument'

// LSP protocol is a core dependency for LSP feature provided by runtimes.
// Since we aim to provide whole range of LSP specification for Clients and Capabilities,
// we re-exporting whole LSP protocol for usage.
// Scoping it down is not practical due to large surface of protocol and types relationship.
// It will be limiting implementors, if they choose to type their code with more specific types from LSP.
export * from 'vscode-languageserver-protocol'

// Custom Runtimes LSP extensions
export * from './inlineCompletionWithReferences'
export * from './inlineCompletions'

// AutoParameterStructuresProtocolRequestType allows ParameterStructures both by-name and by-position
export class AutoParameterStructuresProtocolRequestType<P, R, PR, E, RO>
    extends RequestType<P, R, E>
    implements ProgressType<PR>, RegistrationType<RO>
{
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    public readonly __: [PR, _EM] | undefined
    public readonly ___: [PR, RO, _EM] | undefined
    public readonly ____: [RO, _EM] | undefined
    public readonly _pr: PR | undefined

    public constructor(method: string) {
        super(method, ParameterStructures.auto)
    }
}

/**
 * Configuration options for file indexing in local project context.
 * Controls what files are indexed.
 */
export interface WorkspaceIndexConfiguration {
    /**
     * Array of file patterns to be be excluded from indexing. Patterns must follow the git ignore convention.
     */
    ignoreFilePatterns?: string[]

    /**
     * List of file extensions that should be included.
     * Example: ['.ts', '.js', '.json']
     * Files with extensions not in this list will be ignored.
     */
    fileExtensions?: string[]
}

/**
 * Represents the global context configuration settings.
 */
export interface ContextConfiguration {
    workspaceIndexConfiguration?: WorkspaceIndexConfiguration
    /**
     * A unique identifier for the IDE workspace that remains consistent across IDE window reopenings.
     * The value should be stable and unique for each workspace, regardless of IDE restarts or system reboots.
     */
    workspaceIdentifier?: string
}

/**
 * Extended Client information, passed from client extension to server at initialization.
 * Use to pass additional information about Client Extension, which connects to Language Server,
 * when information in default LSP request is not enough.
 */
export interface ExtendedClientInfo {
    /**
     * Client environment name. May represent IDE or host platform of the Extension.
     */
    name: string

    /**
     * Client environment version.
     */
    version: string

    /**
     * Information about Client Extension passed during initialization from Client to Server.
     * Use to identify extension and pass additional data, not available in standard InitializeParams object.
     */
    extension: {
        /**
         * Client Extension name, which is used for managing and interacting with AWS Language Server.
         * May contain spaces.
         */
        name: string

        /**
         * Client extension version.
         */
        version: string
    }

    /**
     * Unique client Id, defined by the client extension.
     */
    clientId?: string
}

export interface AWSInitializationOptions {
    /**
     * Additional clientInfo to extend or override default data passed by LSP Client.
     * This information may be used to generate client-specific data folder path if clientDataFolder is not specified.
     */
    clientInfo?: ExtendedClientInfo
    /**
     * Client data folder, used as an application data folder to store LSP server-specific data.
     * LSP servers are expected to use the folder for storing their configuration files,
     * temporary data, and user-specific settings. Servers should create subfolder
     * within the client data folder for storing server-specific data.
     *
     * The folder is expected to be created by client, separate folder per application
     * (e.g. multiple IDEs on a client machine should not share the same folder),
     * and is extected to maintain data across updates and re-installations.
     */
    clientDataFolder?: string
    /**
     * The client signals AWS capabilities it supports.
     */
    awsClientCapabilities?: {
        [key: string]: any
        window?: {
            notifications?: boolean

            /**
             * Indicates client support for `aws/showSaveFileDialog` request from server.
             */
            showSaveFileDialog?: boolean

            /**
             * Indicates client support for `aws/showLogs` request from server.
             */
            showLogs?: boolean
        }
        textDocument?: {
            /**
             * Capabilities specific to the `aws/textDocument/inlineCompletionWithReferences` request.
             */
            inlineCompletionWithReferences?: {
                /**
                 * Whether the client supports inline edit suggestions with the tab-tab-tab workflow.
                 */
                inlineEditSupport?: boolean
            }
        }
    }
    /**
     * Represents the global context configuration settings.
     */
    contextConfiguration?: ContextConfiguration
    /**
     * Global region configuration option set by the client application.
     * Server implementations can use this value to preconfigure SDKs, API clients, etc. at server process startup.
     */
    region?: string
}

/**
 * Extended AWS Runtimes InitializeParams interface,
 * sent from Client to Server as part of [`initialize`](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#initialize) request
 */
export interface InitializeParams extends _InitializeParamsBase {
    initializationOptions?: {
        [key: string]: any
        logLevel?: LogLevel
        telemetryOptOut?: boolean
        aws?: AWSInitializationOptions
    }
}

/**
 * Custom AWS Runtimes InitializeResult object interface with extended options.
 */
export interface InitializeResult extends _InitializeResultBase {
    /**
     * The server signals custom AWS Runtimes capabilities it supports.
     */
    awsServerCapabilities?: {
        chatOptions?: ChatOptions
        configurationProvider?: ConfigurationOptions
    }
}

/**
 * Configuration options for AWS Runtimes
 * Sent back to the client to signal available configuration values
 */
export interface ConfigurationOptions {
    sections: string[]
}
