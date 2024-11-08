<template>
  <div class="cramers-rule-container">
    <h1>Cramer's Rule</h1>
    <p class="instructions">
      Instructions and details for Cramer's Rule go here.
    </p>

    <div class="input-container">
      <label for="matrix">Enter Coefficient Matrix:</label>
      <textarea
        v-model="matrixInput"
        placeholder="e.g., [[2,3],[4,5]]"
        class="input-box"
      ></textarea>

      <label for="constants">Enter Constants Vector:</label>
      <textarea
        v-model="constantsInput"
        placeholder="e.g., [1,2]"
        class="input-box"
      ></textarea>

      <button @click="calculateCramersRule" class="calculate-button">
        Calculate
      </button>
    </div>

    <div v-if="result !== null" class="result-container">
      <h2>Result</h2>
      <p>Solution: {{ result }}</p>
    </div>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { matrix, det, clone, index } from 'mathjs';

export default {
  name: 'CramersRule',
  data() {
    return {
      matrixInput: '[[2,3],[4,5]]',
      constantsInput: '[1,2]',
      result: null,
      errorMessage: '',
    };
  },
  methods: {
    calculateCramersRule() {
      this.errorMessage = '';
      try {
        const A = matrix(JSON.parse(this.matrixInput));
        const B = JSON.parse(this.constantsInput);

        if (A.size()[0] !== A.size()[1]) {
          this.errorMessage = 'The coefficient matrix must be square.';
          return;
        }

        if (B.length !== A.size()[0]) {
          this.errorMessage =
            'The size of the constants vector must match the matrix dimension.';
          return;
        }

        const detA = det(A);

        if (detA === 0) {
          this.errorMessage =
            "The matrix is singular and cannot be solved using Cramer's Rule.";
          return;
        }

        const solutions = B.map((_, i) => {
          const modifiedMatrix = clone(A);
          for (let row = 0; row < A.size()[0]; row++) {
            modifiedMatrix.subset(index(row, i), B[row]);
          }
          return det(modifiedMatrix) / detA;
        });

        this.result = solutions;
      } catch (error) {
        this.errorMessage = `Error in calculating Cramer's Rule: ${error.message}`;
        console.error('Calculation error:', error);
      }
    },
  },
};
</script>

<style scoped>
.cramers-rule-container {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.instructions {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1rem;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.input-box {
  width: 80%;
  height: 2rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.calculate-button {
  padding: 0.5rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.calculate-button:hover {
  background-color: #0056b3;
}

.result-container {
  margin-top: 1.5rem;
  font-size: 1.1rem;
  font-weight: bold;
}

.error-message {
  color: red;
  font-weight: bold;
}
</style>
