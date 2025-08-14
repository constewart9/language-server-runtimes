import { CodeGenerator, TypeSystem, TypeDefinition, PropertyDefinition, PropertyType } from '../intermediate-model';

/**
 * Generator for C# classes and interfaces
 */
export class CSharpGenerator implements CodeGenerator {
  generateCode(typeSystem: TypeSystem): Map<string, string> {
    const result = new Map<string, string>();
    
    // Generate one file for all types
    const filename = 'Types.cs';
    let fileContent = '';
    
    // Add using statements
    fileContent += 'using System;\n';
    fileContent += 'using System.Collections.Generic;\n';
    fileContent += 'using System.Text.Json.Serialization;\n\n';
    
    // Add namespace
    const namespace = typeSystem.namespace || 'Models';
    fileContent += `namespace ${namespace}\n{\n`;
    
    // Generate each type
    typeSystem.types.forEach(type => {
      // Skip union component types that are only used as parts of a union
      if (!type.name.includes('With') || !this.isUnionComponent(type.name, typeSystem)) {
        fileContent += this.generateType(type) + '\n';
      }
    });
    
    // Close namespace
    fileContent += '}\n';
    
    result.set(filename, fileContent);
    return result;
  }
  
  private isUnionComponent(typeName: string, typeSystem: TypeSystem): boolean {
    // Check if this type is referenced in a union type's parentType
    return typeSystem.types.some(type => 
      type.isUnionType && type.parentType && type.parentType.includes(typeName)
    );
  }
  
  private generateType(type: TypeDefinition): string {
    if (type.isEnum) {
      return this.generateEnum(type);
    } else if (type.isUnionType) {
      return this.generateUnionType(type);
    } else {
      return this.generateClass(type);
    }
  }
  
  private generateClass(type: TypeDefinition): string {
    let result = '    ';
    
    // Add XML documentation
    if (type.description) {
      result += `/// <summary>\n    /// ${type.description}\n    /// </summary>\n    `;
    }
    
    // Start class definition with inheritance if applicable
    result += `public class ${type.name}`;
    if (type.parentType && !type.parentType.includes('|')) {
      result += ` : ${type.parentType}`;
    }
    result += '\n    {\n';
    
    // Add properties
    type.properties.forEach(prop => {
      result += this.generateProperty(prop);
    });
    
    result += '    }\n';
    return result;
  }
  
  private generateProperty(prop: PropertyDefinition): string {
    let result = '        ';
    
    // Add XML documentation if available
    if (prop.description) {
      result += `/// <summary>\n        /// ${prop.description}\n        /// </summary>\n        `;
    }
    
    // Add JsonPropertyName attribute
    result += `[JsonPropertyName("${prop.name}")]\n        `;
    
    // Property with get/set
    const nullableMark = !prop.isRequired && this.isValueType(prop.type) ? '?' : '';
    result += `public ${this.generatePropertyType(prop.type)}${nullableMark} ${this.capitalizeFirstLetter(prop.name)} { get; set; }`;
    
    // Add default value for non-required reference types
    if (!prop.isRequired && !this.isValueType(prop.type)) {
      result += ' = null;';
    }
    
    result += '\n';
    return result;
  }
  
  private isValueType(type: PropertyType): boolean {
    if (type.kind === 'primitive') {
      const typeName = type.typeName.toLowerCase();
      return typeName === 'int' || typeName === 'double' || typeName === 'float' || 
             typeName === 'bool' || typeName === 'boolean' || typeName === 'number';
    }
    return false;
  }
  
  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  private generatePropertyType(type: PropertyType): string {
    switch (type.kind) {
      case 'primitive':
        // Map common primitive types
        switch (type.typeName.toLowerCase()) {
          case 'string': return 'string';
          case 'number': return 'double';
          case 'boolean': return 'bool';
          case 'integer': return 'int';
          case 'any': return 'object';
          default: return type.typeName;
        }
      case 'reference':
        return type.typeName;
      case 'array':
        return `List<${this.generatePropertyType(type.elementType!)}>`;
      case 'map':
        return `Dictionary<string, ${this.generatePropertyType(type.valueType!)}>`;
      default:
        return 'object';
    }
  }
  
  private generateEnum(type: TypeDefinition): string {
    let result = '    ';
    
    // Add XML documentation
    if (type.description) {
      result += `/// <summary>\n    /// ${type.description}\n    /// </summary>\n    `;
    }
    
    result += `public enum ${type.name}\n    {\n`;
    
    // Add enum values
    const enumValues = type.enumValues || [];
    if (enumValues.length > 0) {
      enumValues.forEach((value, index) => {
        result += `        [JsonPropertyName("${value}")]\n        ${value}`;
        if (index < enumValues.length - 1) {
          result += ',';
        }
        result += '\n';
      });
    }
    
    result += '    }\n';
    return result;
  }
  
  private generateUnionType(type: TypeDefinition): string {
    // For C#, we'll use a base class with derived classes for each variant
    let result = '    ';
    
    // Add XML documentation
    if (type.description) {
      result += `/// <summary>\n    /// ${type.description}\n    /// </summary>\n    `;
    }
    
    // For C#, we use abstract base class for union types
    result += `public abstract class ${type.name}\n    {\n    }\n`;
    
    return result;
  }
}