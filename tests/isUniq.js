 const Matrix = require('../main.js');
const { assert } = require('chai');

describe('isUniform', () => {
    it('should return true for uniform matrices', () => {
        const matrix = new Matrix([[3, 3], [3, 3]]);
        assert.isTrue(Matrix.isUniq(matrix));
    });

    it('should return false for non-uniform matrices', () => {
        const matrix = new Matrix([[3, 2], [3, 3]]);
        assert.isFalse(Matrix.isUniq(matrix));
    });

    it('should return false for invalid or empty inputs', () => {
        assert.isFalse(Matrix.isUniq(new Matrix([[]])));
        assert.isFalse(Matrix.isUniq(null));
    });
});
