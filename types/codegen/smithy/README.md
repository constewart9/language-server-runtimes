# Smithy Code Generator

Smithy is a language and protocol agnostic IDL with tooling for code generation created by AWS.

## Benefits
- The IDL file is clean and readable and closer to TypeScript than JSON

## Limitations
- No generator for C#. (There is tooling that supports Smithy code converted into c2j (coral 2 json) format. But at that point, a JSON based code generator like OpenAPI or Quicktype would need to be used anyway)

## Input/Output
- **Input**: `main.smithy`
- **Output**: `models_0.ts`

## Requirements

- Java 8 or higher
- Gradle (wrapper included)

## Quick Start

1. Generate the Gradle wrapper (first time only):
   ```bash
   gradle wrapper
   ```

2. Build and generate TypeScript code:
   ```bash
   bash gradlew smithyBuildJar
   ```

## Generated Output

TypeScript interfaces are generated at:
```
build/smithyprojections/smithy-typescript-example/typescript/typescript-codegen/src/models/models_0.ts
```

## Project Structure

- `model/main.smithy` - Smithy model definition
- `build.gradle.kts` - Build configuration with TypeScript codegen
- `smithy-build.json` - Smithy build projections configuration

## API Model

The Smithy model defines a chat service with:

### Service
- `ChatService` - Main service (v1.0.0) with `SendChat` operation

### Structures
- `ChatParams` - Input parameters (extends `PartialResultParams`)
  - `tabId` (required)
  - `prompt` (required ChatPrompt)
  - `cursorState` (optional array)
  - `textDocument` (optional)
  - `context` (optional QuickActionCommand array)
- `ChatResponse` - Output with message
- `ChatPrompt` - Prompt structure with command support
- `CursorState` - Editor cursor state
- `TextDocumentIdentifier` - Document reference
- `QuickActionCommand` - Context commands triggered by `@`

## Configuration

**Package**: `@example/chat-api` (v0.1.0)  
**Namespace**: `chat.api`  
**Target**: TypeScript interfaces only

## Notes

- Currently configured for TypeScript generation only
- Java/Kotlin generators require additional AWS SDK dependencies
- Service generates with protocol warning (expected for interface-only generation)