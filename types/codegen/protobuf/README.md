# Chat API Protobuf Generator

Generates type-safe client code from Protocol Buffer definitions for chat interfaces.

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

## Generated Files
- **Java**: `generated/java/com/example/sample/ChatProtos.java`
- **C#**: `generated/csharp/Sample.cs`
- **TypeScript**: `generated/typescript/sample.ts`

## Proto Definition
The `sample.proto` defines:
- `ChatPrompt` message with prompt, escaped_prompt, and command fields