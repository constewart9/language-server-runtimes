# Self-Made Code Generator

Q supported the PoC for "self-made" generators in each of the four languages. Instead of JSON, they operated on a custom TypeScript format that included fields such as isRequired for nonoptional fields and parentType to model inheritance. This is similar to how OpenAPI Generator uses an intermediate data type from JSON and YAML inputs before generating code.

## Benefits
- Code is very customizable with full control over type mappings and output format
- Closest out-of-the-box fit to the current definitions

## Limitations
- Difficult to maintain and extend in the future
- Would be rigid and could only handle clean/expected inputs

## Input/Output
- **Generators**: `csharp-generator.ts`, `java-generator.ts`, `kotlin-generator.ts`, `typescript-generator.ts`
- **Input**: `chat-interfaces.ts`
- **Output**: `types.ts`, `Types.kt`, `Types.cs`, `ChatParams.java`

## Features

Produces type-safe code in multiple languages from a single source definition:
- **TypeScript** - Interfaces with optional properties
- **Java** - Records with Jackson annotations  
- **Kotlin** - Data classes
- **C#** - Classes with properties

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the generator:**
   ```bash
   npm start
   ```

## Generated Output

Code is generated in language-specific directories:

- **TypeScript**: `output/typescript/types.ts`
- **Java**: `output/java/*.java` (individual files per class)
- **Kotlin**: `output/kotlin/Types.kt`
- **C#**: `output/csharp/Types.cs`

## Example

Define types once in the intermediate format:

```typescript
// chat-interfaces.ts
export const chatTypeSystem: TypeSystem = {
  namespace: 'com.example.chat',
  types: [
    {
      name: 'ChatPrompt',
      description: 'Represents a chat prompt',
      properties: [
        {
          name: 'prompt',
          type: createPrimitiveType('string'),
          isRequired: false
        },
        {
          name: 'command', 
          type: createPrimitiveType('string'),
          isRequired: false
        }
      ]
    }
  ]
};
```

**Generates TypeScript:**
```typescript
export interface ChatPrompt {
  prompt?: string;
  command?: string;
}
```

**Generates Java:**
```java
public record ChatPrompt(
    @JsonProperty("prompt") String prompt,
    @JsonProperty("command") String command
) { }
```

**Generates Kotlin:**
```kotlin
data class ChatPrompt(
    val prompt: String? = null,
    val command: String? = null
)
```

## Project Structure

- `chat-interfaces.ts` - Source type definitions
- `intermediate-model.ts` - Type system framework
- `generators/` - Language-specific code generators
- `output/` - Generated code by language
- `index.ts` - Main generator script