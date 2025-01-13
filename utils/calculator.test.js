import calculator from './calculator.js';

describe('Calculator', () => {
  test('suma', () => {
    const suma = calculator.sum(2,2);
    expect(suma).toBe(4);
  });
  test('no acepta strings', () => {
    // The function that throws an exception needs to be invoked within a wrapping function otherwise the toThrow assertion will fail.
    expect(() => calculator.sum(2, 'Pepe')).toThrow('Invalid input');
  });
});
