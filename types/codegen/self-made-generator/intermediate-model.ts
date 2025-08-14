/**
 * Intermediate Type Model for Code Generation
 * 
 * This model represents types that can be converted to multiple target languages
 * including TypeScript, Kotlin, Java, and C#.
 */

// Type of property (primitive or reference to another type)
export type PropertyType = {
  kind: 'primitive' | 'reference' | 'array' | 'map';
  typeName: string;
  // For arrays, the element type
  elementType?: PropertyType;
  // For maps, the value type (key is always string)
  valueType?: PropertyType;
};

// Definition of a property within a type
export type PropertyDefinition = {
  name: string;
  type: PropertyType;
  isRequired: boolean;
  description?: string;
};

// Definition of a type (class/interface)
export type TypeDefinition = {
  name: string;
  properties: PropertyDefinition[];
  parentType?: string;
  description?: string;
  // For enums
  isEnum?: boolean;
  enumValues?: string[];
  // For union types
  isUnionType?: boolean;
};

// The complete type system
export type TypeSystem = {
  types: TypeDefinition[];
  namespace?: string;
};

// Generator interface
export interface CodeGenerator {
  generateCode(typeSystem: TypeSystem): Map<string, string>; // filename -> content
}

// Example of how to create a type definition
export function createPrimitiveType(name: string): PropertyType {
  return { kind: 'primitive', typeName: name };
}

export function createReferenceType(typeName: string): PropertyType {
  return { kind: 'reference', typeName };
}

export function createArrayType(elementType: PropertyType): PropertyType {
  return { kind: 'array', typeName: 'Array', elementType };
}

export function createMapType(valueType: PropertyType): PropertyType {
  return { kind: 'map', typeName: 'Map', valueType };
}