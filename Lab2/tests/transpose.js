const Matrix = require('../main.js');
const { assert } = require('chai');

describe('transpose', () => {
    it('must transpose a square matrix\n', () => {
        const matrix = new Matrix([[1, 2], [3, 4]]);
        const transposed = matrix.transpose();
        assert.deepEqual(transposed.data, [[1, 3], [2, 4]]);
    });

    it('must transpose a non-square matrix\n', () => {
        const matrix = new Matrix([[1, 2, 3], [4, 5, 6]]);
        const transposed = matrix.transpose();
        assert.deepEqual(transposed.data, [[1, 4], [2, 5], [3, 6]]);
    });

    it('should return an empty matrix for empty input\n', () => {
        const matrix = new Matrix([]);
        const transposed = matrix.transpose();
        assert.deepEqual(transposed.data, []);
    });
});
