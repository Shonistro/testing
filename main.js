class Matrix {
    constructor(data) {
        this.data = data;
        this.rows = data.length;
        this.cols = data[0] ? data[0].length : 0;
    }

    static isUniq(matrix) {
        if (!matrix || !Array.isArray(matrix.data) || matrix.rows === 0 || matrix.cols === 0) {
            return false;
        }
        const value = matrix.data[0][0];
        return matrix.data.every(row => row.every(cell => cell === value));
    }

    clearMatrix() {
        this.data = this.data.map(row => row.map(() => 0));
        return this;
    }

    transpose() {
        const transposedData = [];
        for (let i = 0; i < this.cols; i++) {
            const row = [];
            for (let j = 0; j < this.rows; j++) {
                row.push(this.data[j][i]);
            }
            transposedData.push(row);
        }
        return new Matrix(transposedData);
    }

}

module.exports = Matrix;
