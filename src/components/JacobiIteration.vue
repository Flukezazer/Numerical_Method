<template>
  <div>
    <h1>Jacobi Iteration</h1>
    <p>Instructions and details for Jacobi Iteration go here.</p>

    <label for="matrix">Enter Matrix:</label>
    <textarea
      v-model="matrixInput"
      placeholder="e.g., [[4,1],[2,3]]"
    ></textarea>

    <label for="b">Enter Constants Vector:</label>
    <textarea v-model="bInput" placeholder="e.g., [1, 2]"></textarea>

    <button @click="calculateJacobiIteration">Calculate</button>

    <div v-if="result !== null">
      <h2>Result</h2>
      <p>Solution: {{ result }}</p>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'JacobiIteration',
  data() {
    return {
      matrixInput: '[[4,1],[2,3]]', // Sample input for the coefficient matrix
      bInput: '[1, 2]', // Sample input for the constants vector
      result: null,
      errorMessage: '',
    };
  },
  methods: {
    calculateJacobiIteration() {
      this.errorMessage = '';
      try {
        // Parse the inputs from string to arrays
        const matrix = JSON.parse(this.matrixInput);
        const b = JSON.parse(this.bInput);

        // Check if matrix and vector dimensions are compatible
        const n = matrix.length;
        if (b.length !== n || !matrix.every((row) => row.length === n)) {
          throw new Error('Matrix and vector dimensions do not match');
        }

        // Initialize variables
        const tolerance = 1e-10; // Convergence tolerance
        const maxIterations = 100; // Maximum iterations
        let x = Array(n).fill(0); // Initial guess (zero vector)
        let xNew = Array(n).fill(0);

        // Jacobi Iteration
        let converged = false;
        for (let iteration = 0; iteration < maxIterations; iteration++) {
          for (let i = 0; i < n; i++) {
            let sum = 0;
            for (let j = 0; j < n; j++) {
              if (j !== i) sum += matrix[i][j] * x[j];
            }
            xNew[i] = (b[i] - sum) / matrix[i][i];
          }

          // Check for convergence
          if (x.every((xi, i) => Math.abs(xi - xNew[i]) < tolerance)) {
            converged = true;
            break;
          }

          // Update x for the next iteration
          x = [...xNew];
        }

        if (!converged) {
          throw new Error(
            'Jacobi Iteration did not converge within the maximum number of iterations'
          );
        }

        // Update result with the solution vector
        this.result = `[${xNew.map((v) => v.toFixed(6)).join(', ')}]`;
      } catch (error) {
        this.errorMessage =
          'Error in calculating Jacobi Iteration: ' + error.message;
        console.error(error);
      }
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
