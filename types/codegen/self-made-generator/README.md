# Multi-Language Code Generator

Generate code for multiple programming languages from a TypeScript-based intermediate representation.

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