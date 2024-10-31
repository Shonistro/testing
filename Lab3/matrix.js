class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () => Array(cols).fill(0));
    }

    getNumRows() {
        return this.rows;
    }

    getNumCols() {
        return this.cols;
    }

    setValue(row, col, value) {
        this.data[row][col] = value;
    }

    getValue(row, col) {
        return this.data[row][col];
    }


    addScaledRow(targetRow, sourceRow, scale) {
        for (let col = 0; col < this.cols; col++) {
            this.data[targetRow][col] += this.data[sourceRow][col] * scale;
        }
    }


    hasInvalidRow() {
        return this.data.some(row => row.slice(0, this.cols - 1).every(value => value === 0) && row[this.cols - 1] !== 0);
    }
}

module.exports = Matrix;
