import { CodeGenerator, TypeSystem, TypeDefinition, PropertyDefinition, PropertyType } from '../intermediate-model';

/**
 * Generator for TypeScript interfaces and types
 */
export class TypeScriptGenerator implements CodeGenerator {
  generateCode(typeSystem: TypeSystem): Map<string, string> {
    const result = new Map<string, string>();
    
    // Generate one file for all types
    const filename = 'types.ts';
    let fileContent = '';
    
    // Add namespace if provided
    if (typeSystem.namespace) {
      fileContent += `// Namespace: ${typeSystem.namespace}\n\n`;
    }
    
    // Generate each type
    typeSystem.types.forEach(type => {
      // Skip union type components that are only used as parts of a union
      if (!type.name.startsWith('CursorStateWith')) {
        fileContent += this.generateType(type) + '\n\n';
      }
    });
    
    result.set(filename, fileContent);
    return result;
  }
  
  private generateType(type: TypeDefinition): string {
    if (type.isEnum) {
      return this.generateEnum(type);
    } else if (type.isUnionType) {
      return this.generateUnionType(type);
    } else {
      return this.generateInterface(type);
    }
  }
  
  private generateInterface(type: TypeDefinition): string {
    let result = '';
    
    // Add description as JSDoc
    if (type.description) {
      result += `/**\n * ${type.description}\n */\n`;
    }
    
    // Start interface definition with inheritance if applicable
    result += `export interface ${type.name}`;
    if (type.parentType && !type.parentType.includes('|')) {
      result += ` extends ${type.parentType}`;
    }
    result += ' {\n';
    
    // Add properties
    type.properties.forEach(prop => {
      result += this.generateProperty(prop);
    });
    
    result += '}';
    return result;
  }
  
  private generateProperty(prop: PropertyDefinition): string {
    let result = '';
    
    // Add description as JSDoc if available
    if (prop.description) {
      result += `  /**\n   * ${prop.description}\n   */\n`;
    }
    
    // Property name with optional marker if needed
    result += `  ${prop.name}${prop.isRequired ? '' : '?'}: `;
    
    // Property type
    result += this.generatePropertyType(prop.type);
    
    result += ';\n';
    return result;
  }
  
  private generatePropertyType(type: PropertyType): string {
    switch (type.kind) {
      case 'primitive':
        return type.typeName;
      case 'reference':
        return type.typeName;
      case 'array':
        return `${this.generatePropertyType(type.elementType!)}[]`;
      case 'map':
        return `Record<string, ${this.generatePropertyType(type.valueType!)}>`;
      default:
        return 'any';
    }
  }
  
  private generateEnum(type: TypeDefinition): string {
    let result = '';
    
    // Add description as JSDoc
    if (type.description) {
      result += `/**\n * ${type.description}\n */\n`;
    }
    
    result += `export enum ${type.name} {\n`;
    
    // Add enum values
    const enumValues = type.enumValues || [];
    if (enumValues.length > 0) {
      enumValues.forEach(value => {
        result += `  ${value} = '${value}',\n`;
      });
    }
    
    result += '}';
    return result;
  }
  
  private generateUnionType(type: TypeDefinition): string {
    let result = '';
    
    // Add description as JSDoc
    if (type.description) {
      result += `/**\n * ${type.description}\n */\n`;
    }
    
    // For TypeScript, we can use a direct union type
    if (type.parentType) {
      result += `export type ${type.name} = ${type.parentType};`;
    } else {
      // Fallback if no union components are specified
      result += `export type ${type.name} = any;`;
    }
    
    return result;
  }
}