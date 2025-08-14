#!/bin/bash

# Create output directories
mkdir -p generated/chat-message/java
mkdir -p generated/chat-message/java-records
mkdir -p generated/chat-message/typescript
mkdir -p generated/chat-message/csharp
mkdir -p generated/chat-message/kotlin

# Generate Java code (standard)
echo "Generating Java code..."
openapi-generator-cli generate \
    -i chat-message-spec.yaml \
    -g java \
    -o generated/chat-message/java \
    --skip-validate-spec

# Generate Java code with records
echo "Generating Java records..."
openapi-generator-cli generate \
    -i chat-message-spec.yaml \
    -g java \
    -o generated/chat-message/java-records \
    -t templates/java-record-minimal \
    --additional-properties java17=true \
    --skip-validate-spec

# Generate TypeScript code
echo "Generating TypeScript code..."
openapi-generator-cli generate \
    -i chat-message-spec.yaml \
    -g typescript-fetch \
    -o generated/chat-message/typescript \
    --skip-validate-spec

# Generate C# code
echo "Generating C# code..."
openapi-generator-cli generate \
    -i chat-message-spec.yaml \
    -g csharp \
    -o generated/chat-message/csharp \
    --skip-validate-spec

# Generate Kotlin code
echo "Generating Kotlin code..."
openapi-generator-cli generate \
    -i chat-message-spec.yaml \
    -g kotlin \
    -o generated/chat-message/kotlin \
    --skip-validate-spec

echo "Code generation complete!"