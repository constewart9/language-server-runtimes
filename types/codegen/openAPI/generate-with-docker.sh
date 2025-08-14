#!/bin/bash

# Create output directories
mkdir -p generated/typescript
mkdir -p generated/kotlin
mkdir -p generated/java
mkdir -p generated/csharp

# Define the OpenAPI spec path
SPEC_PATH="$(pwd)/api-spec.yaml"

# Generate TypeScript code
echo "Generating TypeScript code..."
docker run --rm -v "${SPEC_PATH}:/local/api-spec.yaml" -v "$(pwd)/generated/typescript:/local/out" \
  openapitools/openapi-generator-cli generate \
  -i /local/api-spec.yaml \
  -g typescript-fetch \
  -o /local/out \
  --skip-validate-spec

# Generate Kotlin code
echo "Generating Kotlin code..."
docker run --rm -v "${SPEC_PATH}:/local/api-spec.yaml" -v "$(pwd)/generated/kotlin:/local/out" \
  openapitools/openapi-generator-cli generate \
  -i /local/api-spec.yaml \
  -g kotlin \
  -o /local/out \
  --skip-validate-spec

# Generate Java code
echo "Generating Java code..."
docker run --rm -v "${SPEC_PATH}:/local/api-spec.yaml" -v "$(pwd)/generated/java:/local/out" \
  openapitools/openapi-generator-cli generate \
  -i /local/api-spec.yaml \
  -g java \
  -o /local/out \
  --skip-validate-spec

# Generate C# code
echo "Generating C# code..."
docker run --rm -v "${SPEC_PATH}:/local/api-spec.yaml" -v "$(pwd)/generated/csharp:/local/out" \
  openapitools/openapi-generator-cli generate \
  -i /local/api-spec.yaml \
  -g csharp \
  -o /local/out \
  --skip-validate-spec

echo "Code generation complete!"