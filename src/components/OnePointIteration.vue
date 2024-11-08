<template>
  <div>
    <h1>One Point Iteration</h1>
    <p>Instructions and details for One Point Iteration go here.</p>

    <label for="function">Function \( g(x) \):</label>
    <input type="text" v-model="functionInput" placeholder="e.g., cos(x)" />

    <label for="initialGuess">Initial Guess:</label>
    <input type="number" v-model="initialGuess" />

    <button @click="calculateOnePointIteration">Calculate</button>

    <div v-if="result !== null">
      <h2>Final Result</h2>
      <p>Root: {{ result }}</p>
    </div>

    <div v-if="iterations.length > 0">
      <h2>Iterations</h2>
      <ul>
        <li v-for="(iter, index) in iterations" :key="index">
          Iteration {{ index }}: x = {{ iter }}
        </li>
      </ul>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { evaluate } from 'mathjs';

export default {
  name: 'OnePointIteration',
  data() {
    return {
      functionInput: 'cos(x)',
      initialGuess: 0.5,
      result: null,
      iterations: [],
      errorMessage: '',
      tolerance: 0.0001,
      maxIterations: 50,
    };
  },
  methods: {
    calculateOnePointIteration() {
      this.errorMessage = '';
      this.iterations = [this.initialGuess]; // Add initial guess as the first iteration
      let x = this.initialGuess;
      let iterationCount = 1;

      try {
        while (iterationCount <= this.maxIterations) {
          const nextX = evaluate(this.functionInput, { x });
          this.iterations.push(nextX);
          if (Math.abs(nextX - x) < this.tolerance) {
            this.result = nextX;
            break;
          }
          x = nextX;
          iterationCount++;
        }
        if (iterationCount > this.maxIterations) {
          this.errorMessage = 'Maximum iterations reached without convergence.';
        }
      } catch (error) {
        this.errorMessage = 'Error in calculating One Point Iteration.';
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
