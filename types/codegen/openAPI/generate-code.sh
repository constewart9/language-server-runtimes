#!/bin/bash

# Create output directories
mkdir -p generated/typescript
mkdir -p generated/kotlin
mkdir -p generated/java
mkdir -p generated/java-records
mkdir -p generated/csharp

# Install OpenAPI Generator CLI if not already installed
if ! command -v openapi-generator-cli &> /dev/null; then
    echo "Installing OpenAPI Generator CLI..."
    npm install @openapitools/openapi-generator-cli -g
fi

# # Generate TypeScript code
# echo "Generating TypeScript code..."
# openapi-generator-cli generate \
#     -i api-spec.yaml \
#     -g typescript-fetch \
#     -o generated/typescript \
#     --skip-validate-spec

# Generate Kotlin code
echo "Generating Kotlin code..."
openapi-generator-cli generate \
    -i api-spec.yaml \
    -g kotlin \
    -o generated/kotlin \
    --skip-validate-spec

# Generate Java code
echo "Generating Java code..."
openapi-generator-cli generate \
    -i api-spec.yaml \
    -g java \
    -o generated/java \
    --skip-validate-spec



echo "Generating Java code with Jackson..."
openapi-generator-cli generate \
    -i api-spec.yaml \
    -g java \
    -o generated/java-records \
    -p library=native

# # Generate C# code
# echo "Generating C# code..."
# openapi-generator-cli generate \
#     -i api-spec.yaml \
#     -g csharp \
#     -o generated/csharp \
#     --skip-validate-spec

echo "Code generation complete!"