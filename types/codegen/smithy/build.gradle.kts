plugins {
    java
    id("software.amazon.smithy") version "0.6.0"
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("software.amazon.smithy:smithy-model:1.27.2")
    implementation("software.amazon.smithy:smithy-cli:1.27.2")
    
    // TypeScript code generator
    implementation("software.amazon.smithy.typescript:smithy-typescript-codegen:0.12.0")
    
    // Java code generator
    implementation("software.amazon.smithy:smithy-codegen-core:1.27.2")
    
    // Kotlin code generator  
    implementation("software.amazon.smithy.kotlin:smithy-kotlin-codegen:0.30.0")
}

tasks.register("generateTypeScript") {
    dependsOn("smithyBuildJar")
    doLast {
        println("TypeScript code generated in build/smithyprojections/typescript/")
    }
}

tasks.register("generateAllCode") {
    dependsOn("smithyBuildJar")
    doLast {
        println("TypeScript code generated in build/smithyprojections/")
    }
}