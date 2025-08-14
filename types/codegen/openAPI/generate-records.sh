#!/bin/bash

# Create output directory
mkdir -p generated/java-records

# Generate Java code with records
openapi-generator-cli generate \
    -i api-spec.yaml \
    -g java \
    -o generated/java-records \
    -t custom-templates \
    --additional-properties java17=true \
    --skip-validate-spec