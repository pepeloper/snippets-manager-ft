import calculator from './calculator.js';

describe('Calculator', () => {
  describe('add', () => {
    test('adds two positive numbers correctly', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    test('handles negative numbers', () => {
      expect(calculator.add(-1, -2)).toBe(-3);
    });
  });

  describe('divide', () => {
    test('divides two numbers correctly', () => {
      expect(calculator.divide(6, 2)).toBe(3);
    });

    test('throws error when dividing by zero', () => {
      expect(() => {
        calculator.divide(5, 0);
      }).toThrow('Division by zero is not allowed');
    });
  });
});
