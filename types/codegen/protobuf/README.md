# Chat API Protobuf Generator

Protobuf is Google's "language-neutral, platform-neutral, extensible mechanism for serializing structured data". It uses a binary based RPC.

## Benefits
- Clean, readable type definitions in .proto files
- Strong versioning support through field numbers
- Consistent cross-language type mapping
- Strong backwards compatibility. Fields are implicitly optional in Proto3

## Limitations
- No native TypeScript support (though separate community projects exist)
- Built primarily for binary serialization, though JSON support exists with extra configuration
- Field numbers are required and cannot be reused, even after deletion
- Generates presence tracking code (like hasPrompt) for optional fields - useful for binary format but unnecessary for JSON

## Prerequisites
1. Install Protocol Buffers compiler:
```bash
./install-protoc.sh
```

2. Install npm dependencies:
```bash
npm install
```

## Usage
Generate code for all languages:
```bash
./generate.sh
```

## Input/Output
- **Input**: `sample.proto`
- **Output**: `Sample.cs`, `ChatProtos.java`, `sample.ts`

## Proto Definition
The `sample.proto` defines:
- `ChatPrompt` message with prompt, escaped_prompt, and command fields