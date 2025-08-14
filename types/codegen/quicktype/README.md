# Quicktype Multi-Language Code Generator

Generates type-safe code in multiple languages from JSON Schema definitions using quicktype.

## Supported Languages

- **TypeScript** - Interfaces with union types
- **Java** - Classes with Jackson annotations
- **Kotlin** - Data classes with Moshi support
- **C#** - Classes with Newtonsoft.Json attributes

## Usage

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate code:**
   ```bash
   npm run generate
   ```

3. **Clean generated files:**
   ```bash
   npm run clean
   ```

## Generated Output

Code is organized by language in the `generated/` directory:

- `generated/typescript/ChatTypes.ts`
- `generated/java/ChatTypes.java`
- `generated/kotlin/ChatTypes.kt`
- `generated/csharp/ChatTypes.cs`

## Input Files

- `sample-schema.json` - JSON Schema definition for ChatParams
- `generate.js` - Code generation script with language-specific options

## Features

- **Type Safety** - Generates strongly-typed code from JSON Schema
- **Serialization** - Includes JSON serialization/deserialization support
- **Language-Specific Options** - Customized output for each target language
- **Organized Output** - Clean directory structure by language