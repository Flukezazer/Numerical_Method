<template>
  <div>
    <h1>Gauss-Seidel Method</h1>
    <p>Instructions and details for the Gauss-Seidel method go here.</p>

    <label for="matrix">Enter Matrix:</label>
    <textarea
      v-model="matrixInput"
      placeholder="e.g., [[4,-1,0,3],[-1,4,-1,5],[0,-1,4,6]]"
    ></textarea>

    <label for="initialGuess">Initial Guess:</label>
    <input type="text" v-model="initialGuess" placeholder="e.g., [0,0,0]" />

    <button @click="calculateGaussSeidel">Calculate</button>

    <div v-if="result !== null">
      <h2>Result</h2>
      <p>Solution: {{ result }}</p>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'GaussSeidel',
  data() {
    return {
      matrixInput: '[[4,-1,0,3],[-1,4,-1,5],[0,-1,4,6]]',
      initialGuess: '[0,0,0]',
      result: null,
      errorMessage: '',
      maxIterations: 100,
      tolerance: 0.0001,
    };
  },
  methods: {
    calculateGaussSeidel() {
      this.errorMessage = '';
      try {
        // Parse input values
        const matrix = JSON.parse(this.matrixInput);
        const guess = JSON.parse(this.initialGuess);

        if (!Array.isArray(matrix) || !Array.isArray(guess)) {
          throw new Error('Invalid matrix or guess format');
        }

        // Perform Gauss-Seidel iteration
        const solution = this.gaussSeidel(
          matrix,
          guess,
          this.maxIterations,
          this.tolerance
        );
        this.result = solution
          ? `x = ${solution[0]}, y = ${solution[1]}, z = ${solution[2]}`
          : 'Solution did not converge';
      } catch (error) {
        this.errorMessage =
          'Error in calculating Gauss-Seidel Method. Check your input format.';
        console.error(error);
      }
    },
    gaussSeidel(matrix, initialGuess, maxIterations, tolerance) {
      const n = matrix.length;
      let x = [...initialGuess]; // Copy of initial guess
      let xOld = new Array(n);

      for (let iteration = 0; iteration < maxIterations; iteration++) {
        for (let i = 0; i < n; i++) {
          xOld[i] = x[i]; // Store previous values
          let sum = matrix[i][n]; // Last column is the constant term
          for (let j = 0; j < n; j++) {
            if (i !== j) {
              sum -= matrix[i][j] * x[j];
            }
          }
          x[i] = sum / matrix[i][i]; // Update current value
        }

        // Check for convergence
        let converged = true;
        for (let i = 0; i < n; i++) {
          if (Math.abs(x[i] - xOld[i]) > tolerance) {
            converged = false;
            break;
          }
        }
        if (converged) return x; // Return solution if converged
      }
      return null; // Return null if not converged within max iterations
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
