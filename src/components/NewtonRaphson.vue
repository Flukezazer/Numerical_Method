<template>
  <div>
    <h1>Newton-Raphson Method</h1>
    <p>Instructions and details for the Newton-Raphson Method go here.</p>

    <label for="function">Function \( f(x) \):</label>
    <input type="text" v-model="functionInput" placeholder="e.g., x^2 - 4" />

    <label for="initialGuess">Initial Guess:</label>
    <input type="number" v-model="initialGuess" />

    <button @click="calculateNewtonRaphson">Calculate</button>

    <div v-if="result !== null">
      <h2>Result</h2>
      <p>Root: {{ result }}</p>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { derivative, evaluate } from 'mathjs';

export default {
  name: 'NewtonRaphson',
  data() {
    return {
      functionInput: 'x^2 - 4', // Default function
      initialGuess: 2, // Default initial guess
      result: null,
      errorMessage: '',
    };
  },
  methods: {
    calculateNewtonRaphson() {
      this.errorMessage = '';
      this.result = null;
      try {
        // Parse function and derivative
        const fn = this.functionInput;
        const df = derivative(fn, 'x').toString(); // Derivative of the function
        let x = this.initialGuess;
        const tolerance = 1e-7;
        const maxIterations = 100;
        let iteration = 0;

        // Newton-Raphson iteration loop
        while (iteration < maxIterations) {
          const fx = evaluate(fn, { x });
          const dfx = evaluate(df, { x });

          if (Math.abs(dfx) < tolerance) {
            throw new Error('Derivative near zero; Newton-Raphson may fail.');
          }

          const nextX = x - fx / dfx;

          // Check for convergence
          if (Math.abs(nextX - x) < tolerance) {
            this.result = nextX.toFixed(7); // Round to 7 decimal places for display
            return;
          }

          x = nextX;
          iteration++;
        }

        // If loop exits without convergence
        throw new Error(
          'Newton-Raphson did not converge within max iterations.'
        );
      } catch (error) {
        this.errorMessage =
          'Error in calculating Newton-Raphson Method: ' + error.message;
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
