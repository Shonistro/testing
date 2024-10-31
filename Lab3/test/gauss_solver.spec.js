const sinon = require('sinon');
const fs = require('fs');
const { loadInputMatrix, loadExpectedResult, forwardElimination, gaussElimination, saveOutputResult } = require('../gauss_solver');
const Matrix = require('../matrix');
const { assert } = require('chai');

describe('Тести для перевірки роботи з файлами', () => {
    let fsStub;

    beforeEach(() => {
        fsStub = sinon.stub(fs, 'readFileSync');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('Функція loadInputMatrix має коректно зчитувати матрицю з файлу', () => {
        const inputData = "3\n3 -6 9\n2 4 -8\n5 7 10";
        fsStub.withArgs('input.txt', 'utf8').returns(inputData);
        const matrix = loadInputMatrix();
        assert.equal(matrix.getNumRows(), 3);
        assert.equal(matrix.getNumCols(), 3);
        assert.equal(matrix.getValue(0, 0), 3);
        assert.equal(matrix.getValue(1, 2), -8);
        assert.equal(matrix.getValue(2, 1), 7);
    });

    it('Функція loadExpectedResult має коректно зчитувати еталонний результат', () => {
        const goldenData = "5 -2 4";
        fsStub.withArgs('golden.txt', 'utf8').returns(goldenData);
        const expectedResult = loadExpectedResult();
        assert.deepEqual(expectedResult, ["5", "-2", "4"]);
    });
});

describe('Додаткові тести для перевірки методу Гаусса', () => {
    it('Алгоритм forwardElimination повинен коректно виконувати прямий хід на прикладі простої матриці', () => {
        const matrix = new Matrix(3, 4);
        matrix.setValue(0, 0, 2);
        matrix.setValue(0, 1, -1);
        matrix.setValue(0, 2, 3);
        matrix.setValue(0, 3, 8);
        matrix.setValue(1, 0, 4);
        matrix.setValue(1, 1, 2);
        matrix.setValue(1, 2, -2);
        matrix.setValue(1, 3, 5);
        matrix.setValue(2, 0, -3);
        matrix.setValue(2, 1, 1);
        matrix.setValue(2, 2, 2);
        matrix.setValue(2, 3, -7);

        forwardElimination(matrix);
        assert.equal(matrix.getValue(1, 0), 0);
    });

    it('Алгоритм gaussElimination повинен повертати null для матриці без рішення', () => {
        const matrix = new Matrix(3, 4);
        matrix.setValue(0, 0, 0);
        matrix.setValue(0, 1, 0);
        matrix.setValue(0, 2, 3);
        matrix.setValue(0, 3, 4);
        matrix.setValue(1, 0, 0);
        matrix.setValue(1, 1, 0);
        matrix.setValue(1, 2, -2);
        matrix.setValue(1, 3, 5);
        matrix.setValue(2, 0, 0);
        matrix.setValue(2, 1, 0);
        matrix.setValue(2, 2, 0);
        matrix.setValue(2, 3, 1);

        const result = gaussElimination(matrix);
        assert.isNull(result, 'Матриця без рішення повинна повертати null');
    });

    it('Функція saveOutputResult повинна коректно зберігати результат у файл', () => {
        const outputStub = sinon.stub(fs, 'writeFileSync');
        saveOutputResult([-3, 2, 7]);
        assert(outputStub.calledOnceWith('output.txt', '-3 2 7'));
        outputStub.restore();
    });
});
