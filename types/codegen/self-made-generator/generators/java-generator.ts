import { CodeGenerator, TypeSystem, TypeDefinition, PropertyDefinition, PropertyType } from '../intermediate-model';

/**
 * Generator for Java records and classes
 */
export class JavaGenerator implements CodeGenerator {
  generateCode(typeSystem: TypeSystem): Map<string, string> {
    const result = new Map<string, string>();
    
    // In Java, each class goes in its own file
    const namespace = typeSystem.namespace || 'com.example.models';
    
    // Generate each type in its own file
    typeSystem.types.forEach(type => {
      // Skip union component types that are only used as parts of a union
      if (!type.name.includes('With') || !this.isUnionComponent(type.name, typeSystem)) {
        const filename = `${type.name}.java`;
        const content = this.generateTypeFile(type, namespace);
        result.set(filename, content);
      }
    });
    
    return result;
  }
  
  private isUnionComponent(typeName: string, typeSystem: TypeSystem): boolean {
    // Check if this type is referenced in a union type's parentType
    return typeSystem.types.some(type => 
      type.isUnionType && type.parentType && type.parentType.includes(typeName)
    );
  }
  
  private generateTypeFile(type: TypeDefinition, namespace: string): string {
    let result = '';
    
    // Package declaration
    result += `package ${namespace};\n\n`;
    
    // Imports
    result += 'import java.util.List;\n';
    result += 'import java.util.Map;\n';
    result += 'import com.fasterxml.jackson.annotation.JsonProperty;\n\n';
    
    // Generate the type
    result += this.generateType(type);
    
    return result;
  }
  
  private generateType(type: TypeDefinition): string {
    if (type.isEnum) {
      return this.generateEnum(type);
    } else if (type.isUnionType) {
      return this.generateUnionType(type);
    } else {
      return this.generateRecord(type);
    }
  }
  
  private generateRecord(type: TypeDefinition): string {
    let result = '';
    
    // Add Javadoc
    if (type.description) {
      result += `/**\n * ${type.description}\n */\n`;
    }
    
    // Start record definition
    result += `public record ${type.name}(\n`;
    
    // Add record parameters (properties)
    type.properties.forEach((prop, index) => {
      result += this.generateRecordParameter(prop);
      if (index < type.properties.length - 1) {
        result += ',\n';
      }
    });
    
    // Close record definition
    result += '\n)';
    
    // Add inheritance if applicable
    if (type.parentType && !type.parentType.includes('|')) {
      // For records, we need to implement methods from parent class
      result += ` {\n    // Implementation of parent class methods would go here\n}`;
    } else {
      result += ' { }';
    }
    
    return result;
  }
  
  private generateRecordParameter(prop: PropertyDefinition): string {
    let result = '    ';
    
    // Add Javadoc if available
    if (prop.description) {
      result += `/**\n     * ${prop.description}\n     */\n    `;
    }
    
    // Add JsonProperty annotation
    result += `@JsonProperty("${prop.name}") `;
    
    // Parameter declaration
    const typeName = this.generatePropertyType(prop.type, prop.isRequired);
    result += `${typeName} ${prop.name}`;
    
    return result;
  }
  
  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  private generatePropertyType(type: PropertyType, isRequired: boolean): string {
    let typeName = '';
    
    switch (type.kind) {
      case 'primitive':
        // Map common primitive types
        switch (type.typeName.toLowerCase()) {
          case 'string': typeName = 'String'; break;
          case 'number': typeName = 'Double'; break;
          case 'boolean': typeName = 'Boolean'; break;
          case 'integer': typeName = 'Integer'; break;
          case 'any': typeName = 'Object'; break;
          default: typeName = type.typeName;
        }
        break;
        
      case 'reference':
        typeName = type.typeName;
        break;
        
      case 'array':
        typeName = `List<${this.generatePropertyType(type.elementType!, true)}>`;
        break;
        
      case 'map':
        typeName = `Map<String, ${this.generatePropertyType(type.valueType!, true)}>`;
        break;
        
      default:
        typeName = 'Object';
    }
    
    return typeName;
  }
  
  private generateEnum(type: TypeDefinition): string {
    let result = '';
    
    // Add Javadoc
    if (type.description) {
      result += `/**\n * ${type.description}\n */\n`;
    }
    
    result += `public enum ${type.name} {\n`;
    
    // Add enum values
    const enumValues = type.enumValues || [];
    if (enumValues.length > 0) {
      enumValues.forEach((value, index) => {
        result += `    @JsonProperty("${value}") ${value}`;
        if (index < enumValues.length - 1) {
          result += ',';
        }
        result += '\n';
      });
    }
    
    result += '}\n';
    return result;
  }
  
  private generateUnionType(type: TypeDefinition): string {
    // For Java, we'll use a sealed interface (Java 17+)
    let result = '';
    
    // Add Javadoc
    if (type.description) {
      result += `/**\n * ${type.description}\n */\n`;
    }
    
    // For Java, we use sealed interface for union types
    result += `public sealed interface ${type.name} `;
    
    // Add permits clause if we can determine the components
    if (type.parentType) {
      const components = type.parentType.split('|').map(t => t.trim());
      if (components.length > 0) {
        result += 'permits ' + components.join(', ');
      }
    }
    
    result += ' { }';
    
    return result;
  }
}