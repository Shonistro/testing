const Matrix = require('../main.js');
const { assert } = require('chai');

describe('clearMatrix', () => {
    it('should set all elements to zero', () => {
        const matrix = new Matrix([[5, 5], [5, 5]]);
        matrix.clearMatrix();
        const expected = new Matrix([[0, 0], [0, 0]]);
        assert.deepEqual(matrix.data, expected.data);
    });
});
