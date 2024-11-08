<template>
  <div>
    <h1>Gaussian Elimination</h1>
    <p>Instructions and details for the Gaussian Elimination method go here.</p>
    <label>
      Enter Matrix:
      <textarea
        v-model="matrixInput"
        placeholder="e.g., [[2,1,-1,8],[-3,-1,2,-11],[-2,1,2,-3]]"
      ></textarea>
    </label>
    <button @click="calculateGaussianElimination">Calculate</button>

    <h2>Result</h2>
    <div v-if="solution && solution.length">
      <p>Solution:</p>
      <p>x = {{ solution[0] }}</p>
      <p>y = {{ solution[1] }}</p>
      <p>z = {{ solution[2] }}</p>
    </div>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      matrixInput: '[[2,1,-1,8],[-3,-1,2,-11],[-2,1,2,-3]]',
      solution: null,
      errorMessage: '',
    };
  },
  methods: {
    calculateGaussianElimination() {
      this.errorMessage = '';
      this.solution = null;

      try {
        const matrix = JSON.parse(this.matrixInput);

        if (
          !Array.isArray(matrix) ||
          matrix.length !== 3 ||
          matrix.some((row) => row.length !== 4)
        ) {
          this.errorMessage =
            'Invalid matrix format. Please enter a 3x4 matrix.';
          return;
        }

        this.solution = this.gaussianElimination(matrix);
        if (!this.solution) {
          this.errorMessage = 'No unique solution found.';
        }
      } catch (error) {
        this.errorMessage = 'Error parsing matrix input. Check your format.';
        console.error(error);
      }
    },
    gaussianElimination(matrix) {
      const n = matrix.length;

      for (let i = 0; i < n; i++) {
        let divisor = matrix[i][i];
        if (divisor === 0) return null; // Prevent division by zero

        for (let j = 0; j < n + 1; j++) {
          matrix[i][j] /= divisor;
        }

        for (let k = i + 1; k < n; k++) {
          let factor = matrix[k][i];
          for (let j = i; j < n + 1; j++) {
            matrix[k][j] -= factor * matrix[i][j];
          }
        }
      }

      const solution = new Array(n).fill(0);
      for (let i = n - 1; i >= 0; i--) {
        solution[i] = matrix[i][n];
        for (let j = i + 1; j < n; j++) {
          solution[i] -= matrix[i][j] * solution[j];
        }
      }

      return solution;
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}
</style>
