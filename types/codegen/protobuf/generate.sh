#!/bin/bash

# Create output directories
mkdir -p generated/java
mkdir -p generated/csharp
mkdir -p generated/typescript

# Generate Java code
protoc --java_out=generated/java sample.proto

# Generate C# code
protoc --csharp_out=generated/csharp sample.proto

# Generate TypeScript code using ts-proto
protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=generated/typescript sample.proto

echo "Code generation complete!"
echo "Java files: generated/java/"
echo "C# files: generated/csharp/"
echo "TypeScript files: generated/typescript/"