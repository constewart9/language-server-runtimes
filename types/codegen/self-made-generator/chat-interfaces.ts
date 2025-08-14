import { 
  TypeSystem, 
  createPrimitiveType,
  createReferenceType,
  createArrayType
} from './intermediate-model';

// Define the intermediate representation for the chat interfaces
export const chatTypeSystem: TypeSystem = {
  namespace: 'com.example.chat',
  types: [
    // Position type (referenced by Range)
    {
      name: 'Position',
      description: 'Represents a position in a text document',
      properties: [
        {
          name: 'line',
          type: createPrimitiveType('number'),
          isRequired: true
        },
        {
          name: 'character',
          type: createPrimitiveType('number'),
          isRequired: true
        }
      ]
    },
    
    // Range type (referenced by CursorState)
    {
      name: 'Range',
      description: 'Represents a range in a text document',
      properties: [
        {
          name: 'start',
          type: createReferenceType('Position'),
          isRequired: true
        },
        {
          name: 'end',
          type: createReferenceType('Position'),
          isRequired: true
        }
      ]
    },
    
    // TextDocumentIdentifier type
    {
      name: 'TextDocumentIdentifier',
      description: 'Identifies a text document',
      properties: [
        {
          name: 'uri',
          type: createPrimitiveType('string'),
          isRequired: true
        }
      ]
    },
    
    // QuickActionCommand type
    {
      name: 'QuickActionCommand',
      description: 'Represents a quick action command',
      properties: [
        {
          name: 'command',
          type: createPrimitiveType('string'),
          isRequired: true
        },
        {
          name: 'arguments',
          type: createArrayType(createPrimitiveType('any')),
          isRequired: false
        }
      ]
    },
    
    // ChatPrompt type
    {
      name: 'ChatPrompt',
      description: 'Represents a chat prompt',
      properties: [
        {
          name: 'prompt',
          type: createPrimitiveType('string'),
          isRequired: false
        },
        {
          name: 'escapedPrompt',
          type: createPrimitiveType('string'),
          isRequired: false
        },
        {
          name: 'command',
          type: createPrimitiveType('string'),
          isRequired: false
        }
      ]
    },
    
    // PartialResultParams type
    {
      name: 'PartialResultParams',
      description: 'Parameters for partial results',
      properties: [
        {
          name: 'partialResultToken',
          type: createPrimitiveType('any'), // Can be number or string
          isRequired: false
        }
      ]
    },
    
    // CursorState with position
    {
      name: 'CursorStateWithPosition',
      description: 'Cursor state with position',
      properties: [
        {
          name: 'position',
          type: createReferenceType('Position'),
          isRequired: true
        }
      ]
    },
    
    // CursorState with range
    {
      name: 'CursorStateWithRange',
      description: 'Cursor state with range',
      properties: [
        {
          name: 'range',
          type: createReferenceType('Range'),
          isRequired: true
        }
      ]
    },
    
    // CursorState as a union type
    {
      name: 'CursorState',
      description: 'Represents the state of a cursor',
      isUnionType: true,
      properties: [], // No direct properties for union types
      parentType: 'CursorStateWithPosition | CursorStateWithRange' // Used for TypeScript
    },
    
    // ChatParams type
    {
      name: 'ChatParams',
      parentType: 'PartialResultParams',
      description: 'Parameters for a chat request',
      properties: [
        {
          name: 'tabId',
          type: createPrimitiveType('string'),
          isRequired: true
        },
        {
          name: 'prompt',
          type: createReferenceType('ChatPrompt'),
          isRequired: true
        },
        {
          name: 'cursorState',
          type: createArrayType(createReferenceType('CursorState')),
          isRequired: false
        },
        {
          name: 'textDocument',
          type: createReferenceType('TextDocumentIdentifier'),
          isRequired: false
        },
        {
          name: 'context',
          type: createArrayType(createReferenceType('QuickActionCommand')),
          isRequired: false,
          description: 'Context of the current chat message to be handled by the servers. Context can be added through QuickActionCommand triggered by `@`.'
        }
      ]
    }
  ]
};