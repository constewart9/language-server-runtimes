$version: "2"

namespace chat.api

structure ChatPrompt {
    prompt: String
    escapedPrompt: String
    command: String
}

structure CursorState {
    data: String
}

structure TextDocumentIdentifier {
    uri: String
}

structure QuickActionCommand {
    data: String
}

@mixin
structure PartialResultParams {
    partialResultToken: String
}

@private
list CursorStateList {
    member: CursorState
}

@private
list QuickActionCommandList {
    member: QuickActionCommand
}

structure ChatParams with [PartialResultParams] {
    @required
    tabId: String
    
    @required
    prompt: ChatPrompt
    
    cursorState: CursorStateList
    
    textDocument: TextDocumentIdentifier
    
    /// Context of the current chat message to be handled by the servers.
    /// Context can be added through QuickActionCommand triggered by `@`.
    context: QuickActionCommandList
}

structure ChatResponse {
    message: String
}

/// A service that provides chat functionality
service ChatService {
    version: "1.0.0"
    operations: [SendChat]
}

/// Sends a chat message
operation SendChat {
    input: ChatParams
    output: ChatResponse
}