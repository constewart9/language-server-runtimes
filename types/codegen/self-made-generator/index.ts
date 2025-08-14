import { TypeSystem } from './intermediate-model';
import { TypeScriptGenerator } from './generators/typescript-generator';
import { KotlinGenerator } from './generators/kotlin-generator';
import * as fs from 'fs';
import * as path from 'path';

// Import the chat type system
import { chatTypeSystem } from './chat-interfaces';

// Example usage of the code generator system
function main() {
  // Initialize generators
  const generators = [
    { name: 'typescript', generator: new TypeScriptGenerator() },
    { name: 'kotlin', generator: new KotlinGenerator() }
    // Add more generators as needed (Java, C#)
  ];
  
  // Generate code for each language
  generators.forEach(({ name, generator }) => {
    console.log(`Generating ${name} code...`);
    
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
  
  console.log('Code generation complete!');
}

// Run the generator
main();