import { chatTypeSystem } from './chat-interfaces';
import { TypeScriptGenerator } from './generators/typescript-generator';
import { KotlinGenerator } from './generators/kotlin-generator';
import { CSharpGenerator } from './generators/csharp-generator';
import { JavaGenerator } from './generators/java-generator';
import * as fs from 'fs';
import * as path from 'path';

// Example usage of the code generator system for chat interfaces
function main() {
  // Initialize generators
  const generators = [
    { name: 'typescript', generator: new TypeScriptGenerator() },
    { name: 'kotlin', generator: new KotlinGenerator() },
    { name: 'csharp', generator: new CSharpGenerator() },
    { name: 'java', generator: new JavaGenerator() }
  ];
  
  // Generate code for each language
  generators.forEach(({ name, generator }) => {
    console.log(`Generating ${name} code for chat interfaces...`);
    
    const outputDir = path.join(__dirname, 'output', name);
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Generate code
    const files = generator.generateCode(chatTypeSystem);
    
    // Write files
    files.forEach((content, filename) => {
      const filePath = path.join(outputDir, filename);
      fs.writeFileSync(filePath, content);
      console.log(`  Created ${filePath}`);
    });
  });
  
  console.log('Chat interfaces code generation complete!');
}

// Run the generator
main();