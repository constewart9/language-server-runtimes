import { CodeGenerator, TypeSystem, TypeDefinition, PropertyDefinition, PropertyType } from '../intermediate-model';

/**
 * Generator for Kotlin data classes and sealed classes
 */
export class KotlinGenerator implements CodeGenerator {
  generateCode(typeSystem: TypeSystem): Map<string, string> {
    const result = new Map<string, string>();
    
    // Generate one file for all types
    const filename = 'Types.kt';
    let fileContent = '';
    
    // Add package if namespace is provided
    if (typeSystem.namespace) {
      fileContent += `package ${typeSystem.namespace}\n\n`;
    }
    
    // First pass: Generate all non-union types
    typeSystem.types.forEach(type => {
      if (!type.isUnionType) {
        fileContent += this.generateType(type) + '\n\n';
      }
    });
    
    // Second pass: Generate union types (which may reference other types)
    typeSystem.types.forEach(type => {
      if (type.isUnionType) {
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
      return this.generateSealedClass(type, this.findUnionComponents(type, type.parentType));
    } else {
      return this.generateDataClass(type);
    }
  }
  
  private findUnionComponents(type: TypeDefinition, parentTypeStr?: string): string[] {
    if (!parentTypeStr) return [];
    
    // Parse the union type string (e.g., "TypeA | TypeB")
    return parentTypeStr.split('|').map(t => t.trim());
  }
  
  private generateDataClass(type: TypeDefinition): string {
    let result = '';
    
    // Add description as KDoc
    if (type.description) {
      result += `/**\n * ${type.description}\n */\n`;
    }
    
    // Start data class definition
    result += `data class ${type.name}`;
    
    // Constructor parameters (properties)
    result += '(\n';
    type.properties.forEach((prop, index) => {
      result += this.generateProperty(prop);
      if (index < type.properties.length - 1) {
        result += ',\n';
      }
    });
    result += '\n)';
    
    // Add parent class if applicable and not a union type
    if (type.parentType && !type.parentType.includes('|')) {
      result += ` : ${type.parentType}()`;
    }
    
    return result;
  }
  
  private generateProperty(prop: PropertyDefinition): string {
    let result = '';
    
    // Add description as KDoc if available
    if (prop.description) {
      result += `    /**\n     * ${prop.description}\n     */\n    `;
    } else {
      result += '    ';
    }
    
    // Property with val keyword
    result += `val ${prop.name}: ${this.generatePropertyType(prop.type)}`;
    
    // Make nullable if not required
    if (!prop.isRequired) {
      result += '?';
    }
    
    return result;
  }
  
  private generatePropertyType(type: PropertyType): string {
    switch (type.kind) {
      case 'primitive':
        // Map common primitive types
        switch (type.typeName.toLowerCase()) {
          case 'string': return 'String';
          case 'number': return 'Double';
          case 'boolean': return 'Boolean';
          case 'integer': return 'Int';
          case 'any': return 'Any';
          default: return type.typeName;
        }
      case 'reference':
        return type.typeName;
      case 'array':
        return `List<${this.generatePropertyType(type.elementType!)}>`;
      case 'map':
        return `Map<String, ${this.generatePropertyType(type.valueType!)}>`;
      default:
        return 'Any';
    }
  }
  
  private generateEnum(type: TypeDefinition): string {
    let result = '';
    
    // Add description as KDoc
    if (type.description) {
      result += `/**\n * ${type.description}\n */\n`;
    }
    
    result += `enum class ${type.name} {\n`;
    
    // Add enum values
    const enumValues = type.enumValues || [];
    if (enumValues.length > 0) {
      enumValues.forEach((value, index) => {
        result += `    ${value}`;
        if (index < enumValues.length - 1) {
          result += ',';
        }
        result += '\n';
      });
    }
    
    result += '}';
    return result;
  }
  
  private generateSealedClass(type: TypeDefinition, components: string[]): string {
    let result = '';
    
    // Add description as KDoc
    if (type.description) {
      result += `/**\n * ${type.description}\n */\n`;
    }
    
    // For Kotlin, we use sealed class for union types
    result += `sealed class ${type.name}`;
    
    // Close the sealed class definition
    result += ' { }';
    
    return result;
  }
}