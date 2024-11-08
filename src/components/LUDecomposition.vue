<template>
  <div>
    <h1>LU Decomposition</h1>
    <p>Instructions and details for LU Decomposition go here.</p>

    <label for="matrix">Enter Matrix:</label>
    <textarea
      v-model="matrixInput"
      placeholder="e.g., [[4,3],[6,3]]"
    ></textarea>

    <button @click="calculateLUDecomposition">Calculate</button>

    <div v-if="result">
      <h2>Result</h2>
      <p>LU Decomposition:</p>
      <p><strong>L:</strong> {{ result.L }}</p>
      <p><strong>U:</strong> {{ result.U }}</p>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <h3>Test Cases</h3>
    <div class="test-cases">
      <button
        @click="
          loadTestCase([
            [4, 3],
            [6, 3],
          ])
        "
      >
        Test Case 1: Simple 2x2
      </button>
      <button
        @click="
          loadTestCase([
            [2, 3, 1],
            [4, 7, 5],
            [6, 18, 9],
          ])
        "
      >
        Test Case 2: 3x3 Matrix
      </button>
      <button
        @click="
          loadTestCase([
            [1, 2, 3],
            [0, 4, 5],
            [1, 0, 6],
          ])
        "
      >
        Test Case 3: 3x3 Mixed Values
      </button>
      <button
        @click="
          loadTestCase([
            [2, 0, 0],
            [4, 5, 0],
            [6, 7, 8],
          ])
        "
      >
        Test Case 4: Lower Triangular
      </button>
    </div>
  </div>
</template>

<script>
import { zeros } from 'mathjs';

export default {
  name: 'LUDecomposition',
  data() {
    return {
      matrixInput: '[[4,3],[6,3]]', // Example matrix input
      result: null,
      errorMessage: '',
    };
  },
  methods: {
    calculateLUDecomposition() {
      this.errorMessage = '';
      try {
        const matrix = JSON.parse(this.matrixInput);

        if (matrix.length !== matrix[0].length) {
          throw new Error('The matrix must be square for LU decomposition.');
        }

        const { L, U } = this.luDecompose(matrix);
        this.result = { L, U };
      } catch (error) {
        this.errorMessage =
          'Error in calculating LU Decomposition: ' + error.message;
        console.error(error);
      }
    },
    luDecompose(matrix) {
      const n = matrix.length;
      const L = zeros(n, n)._data;
      const U = JSON.parse(JSON.stringify(matrix));

      for (let i = 0; i < n; i++) {
        L[i][i] = 1;
        for (let j = i + 1; j < n; j++) {
          const factor = U[j][i] / U[i][i];
          L[j][i] = factor;
          for (let k = i; k < n; k++) {
            U[j][k] -= factor * U[i][k];
          }
        }
      }
      return { L, U };
    },
    loadTestCase(matrix) {
      this.matrixInput = JSON.stringify(matrix);
      this.calculateLUDecomposition(); // Calculate immediately after loading the test case
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}

.test-cases {
  margin-top: 20px;
}

.test-cases button {
  margin: 5px;
  padding: 5px 10px;
  font-size: 0.9em;
  cursor: pointer;
}
</style>
