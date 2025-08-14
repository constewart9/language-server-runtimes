# OpenAPI Code Generation Proof of Concept

This project explores different approaches to generating client code from OpenAPI specifications. Multiple generation scripts test various configurations, templates, and output styles.

## Proof of Concept Findings

### Script Comparison

**`generate-code.js`** - Modern Node.js approach
- **Finding**: Clean, cross-platform generation
- **Output**: Well-organized directory structure by language
- **Best for**: Production use, consistent multi-language output

**`generate-code.sh`** - Shell-based with custom templates
- **Finding**: More control over generator options and custom templates
- **Output**: Advanced configurations, some experimental features
- **Best for**: Custom template testing, advanced generator options

**`generate.js`** - Legacy TypeScript-focused approach
- **Finding**: Simple single-language generation
- **Output**: TypeScript interfaces only, older API style
- **Best for**: TypeScript-only projects, minimal setup

### Key Discoveries

1. **Template Customization**: Custom templates in `templates/` allow fine-grained control over generated code style
2. **Java Records Template**: Custom template generates modern Java Records instead of traditional classes
   - **Proof**: Templates enable easy formatting changes without generator modifications
   - **Result**: Cleaner, more concise Java code with immutable data structures
   - **Location**: `templates/java/model/model.mustache` and `java-record-config.yaml`
3. **Language Variations**: Different generators produce varying code quality and patterns
4. **Configuration Impact**: Generator options significantly affect output structure and features
5. **Standalone Testing**: `standalone-jackson-test/` proves Jackson serialization works independently

## Test All Approaches

Run each script to compare outputs:

```bash
# Modern multi-language approach
node generate-code.js

# Advanced shell-based generation
./generate-code.sh

# Legacy TypeScript-only
node generate.js
```

## Generated Output

Each approach creates different output structures:
- `generated/typescript/` - TypeScript client and types
- `generated/java/` - Java client library
- `generated/kotlin/` - Kotlin client library
- `generated/csharp/` - C# client library

## Input Files

- `api-spec.yaml` - OpenAPI 3.0 specification defining chat API
- `templates/` - Custom generator templates for testing
- `openapitools.json` - OpenAPI Generator CLI configuration

## Specialized Testing

- **`standalone-jackson-test/`** - Isolated Jackson serialization validation
- **`custom-templates/`** - Template customization experiments