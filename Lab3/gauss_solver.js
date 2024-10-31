const fs = require('fs');
const Matrix = require('./matrix');

function loadInputMatrix() {
    const rawData = fs.readFileSync('input.txt', 'utf8');
    const lines = rawData.trim().split('\n');
    const matrixData = lines.slice(1).map(line => line.split(' ').map(Number));
    const matrix = new Matrix(matrixData.length, matrixData[0].length);

    matrixData.forEach((row, rowIndex) =>
        row.forEach((value, colIndex) => matrix.setValue(rowIndex, colIndex, value))
    );

    return matrix;
}

function loadExpectedResult() {
    const rawData = fs.readFileSync('golden.txt', 'utf8');
    return rawData.trim().split(' ');
}

function forwardElimination(matrix) {
    const rowCount = matrix.getNumRows();
    const colCount = matrix.getNumCols();
    for (let pivotRow = 0; pivotRow < rowCount; pivotRow++) {
        if (matrix.getValue(pivotRow, pivotRow) === 0) {
            matrix.swapNonZeroRow(pivotRow);
        }
        for (let targetRow = pivotRow + 1; targetRow < rowCount; targetRow++) {
            const factor = -matrix.getValue(targetRow, pivotRow) / matrix.getValue(pivotRow, pivotRow);
            matrix.addScaledRow(targetRow, pivotRow, factor);
        }
    }
}

function gaussElimination(matrix) {
    if (matrix.hasInvalidRow() || matrix.hasZeroRow()) return null;
    forwardElimination(matrix);
    return matrix;
}

function saveOutputResult(output) {
    fs.writeFileSync('output.txt', output ? output.join(' ') : 'no solution');
}

module.exports = { loadInputMatrix, loadExpectedResult, forwardElimination, gaussElimination, saveOutputResult };
