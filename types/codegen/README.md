# Code Generation Proof of Concepts

This directory contains proof-of-concept implementations for various code generation approaches to create type-safe client libraries across multiple languages (TypeScript, Java, Kotlin, C#).

## Options Evaluated

### [OpenAPI Generator](openAPI/)
The IDL file will be a JSON Schema that follows the OpenAPI Specification v3.0. Mature, well-maintained tool with extensive customization options and supports code generation in 40+ languages. Additional requirements to meet OpenAPI specification and code generation "out of the box" is less of a match with existing code.

### [Quicktype](quicktype/)
Code generation tool that generates strongly-typed models and serializers from JSON, JSON Schemas, and TypeScript. Support for 15+ languages with out-of-the-box fit closest to current definitions, but very little documentation makes development and maintenance difficult.

### [Smithy](smithy/)
Language and protocol agnostic IDL with tooling for code generation created by AWS. The IDL file is clean and readable and closer to TypeScript than JSON, but no generator for C#.

### [Self-Made Generator](self-made-generator/)
Custom generators operating on a TypeScript format with fields like isRequired and parentType. Code is very customizable with full control over type mappings and closest out-of-the-box fit, but difficult to maintain and extend and would be rigid.

### [Protobuf](protobuf/)
Google's "language-neutral, platform-neutral, extensible mechanism for serializing structured data". Clean, readable type definitions with strong versioning support and consistent cross-language type mapping, but no native TypeScript support and generates presence tracking code unnecessary for JSON.

## Purpose

These are experimental implementations to evaluate different approaches for generating consistent type definitions across multiple programming languages. Each directory contains a working example with its own README detailing benefits, limitations, and usage instructions.

## Decision

After evaluation, **OpenAPI Generator** was chosen as the solution for production use.