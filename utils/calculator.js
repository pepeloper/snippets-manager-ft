const calculator = {
  sum: (a, b) => {
    if(typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Invalid input');
    }
    return a + b;
  },
};

export default calculator;
