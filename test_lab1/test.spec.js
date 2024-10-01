const { expect } = require('chai');
const Mtrx = require('mtrx');


describe('Mtrx Test Lab1', function () {

    it('create a matrix with correct values', () => {
        const matrix = new Mtrx([[2, 4], [6, 8]]);
        expect(matrix).to.deep.equal(new Mtrx([[2, 4], [6, 8]]));
    });


    it('return the correct dimensions of the matrix', () => {
        const matrix = new Mtrx([[1, 2, 3], [4, 5, 6]]);
        expect(matrix.rows).to.equal(2);
        expect(matrix.cols).to.equal(3);
    });

    it('correctly add two matrices', () => {
        const matrix1 = new Mtrx([[1, 2], [3, 4]]);
        const matrix2 = new Mtrx([[5, 6], [7, 8]]);
        const result = matrix1.add(matrix2);
        expect(result).to.deep.equal(new Mtrx([[6, 8], [10, 12]]));
    });

    it('correctly multiply two matrices', () => {
        const matrix1 = new Mtrx([[1, 2], [3, 4]]);
        const matrix2 = new Mtrx([[2, 0], [1, 2]]);
        const result = matrix1.mul(matrix2);
        expect(result).to.deep.equal(new Mtrx([[4, 4], [10, 8]]));
    });

    it('transpose the matrix', () => {
        const matrix = new Mtrx([[1, 2], [3, 4]]);
        const result = matrix.T();
        expect(result).to.deep.equal(new Mtrx([[1, 3], [2, 4]]));
    });

    it('create a zero matrix', () => {
        const zeroMatrix = Mtrx.zeros(2, 3);
        expect(zeroMatrix).to.deep.equal(new Mtrx([[0, 0, 0], [0, 0, 0]]));
    });

    it('create an identity matrix', () => {
        const identityMatrix = Mtrx.eye(3);
        expect(identityMatrix).to.deep.equal(new Mtrx([[1, 0, 0], [0, 1, 0], [0, 0, 1]]));
    });

    it('create a diagonal matrix', () => {
        const diagMatrix = Mtrx.diag([1, 2, 3]);
        expect(diagMatrix).to.deep.equal(new Mtrx([[1, 0, 0], [0, 2, 0], [0, 0, 3]]));
    });

    it('check if two matrices have the same shape', () => {
        const matrix1 = new Mtrx([[1, 2], [3, 3]]);
        const matrix2 = new Mtrx([[5, 6], [7, 7]]);
        const matrix3 = new Mtrx([[1, 2, 3], [4, 5, 6]]);

        expect(Mtrx.isSameShape(matrix1, matrix2)).to.be.false;
        expect(Mtrx.isSameShape(matrix1, matrix3)).to.be.false;
    });


});

