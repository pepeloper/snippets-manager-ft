import snippetValidator from './snippet-validator.js';

describe('Snippet Validator', () => {
  describe('isValidCategory', () => {
    test('accepts valid categories', () => {
      expect(snippetValidator.isValidCategory('javascript')).toBe(true);
      expect(snippetValidator.isValidCategory('NodeJS')).toBe(true);
      expect(snippetValidator.isValidCategory('CSS')).toBe(true);
    });

    test('rejects invalid categories', () => {
      expect(snippetValidator.isValidCategory('python')).toBe(false);
      expect(snippetValidator.isValidCategory('')).toBe(false);
      expect(snippetValidator.isValidCategory('invalid')).toBe(false);
    });
  });

  describe('formatSnippetContent', () => {
    test('formats valid content correctly', () => {
      const code = '  const x = 1;  ';
      expect(snippetValidator.formatSnippetContent(code))
        .toBe('const x = 1;');
    });

    test('throws error for invalid content', () => {
      expect(() => snippetValidator.formatSnippetContent(''))
        .toThrow('Content cannot be empty');
      expect(() => snippetValidator.formatSnippetContent(null))
        .toThrow('Content must be a string');
    });
  });

  describe('validateTitle', () => {
    test('accepts valid titles', () => {
      expect(snippetValidator.validateTitle('My Snippet')).toBe('My Snippet');
      expect(snippetValidator.validateTitle('  Test Title  ')).toBe('Test Title');
    });

    test('rejects invalid titles', () => {
      expect(() => snippetValidator.validateTitle('ab'))
        .toThrow('Title must be at least 3 characters long');
      expect(() => snippetValidator.validateTitle(''))
        .toThrow('Title must be at least 3 characters long');
    });
  });
});
