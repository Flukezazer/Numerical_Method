<template>
  <div>
    <h1>Secant Method</h1>
    <p>Instructions and details for the Secant Method go here.</p>

    <label for="function">Function \( f(x) \):</label>
    <input type="text" v-model="functionInput" placeholder="e.g., x^2 - 4" />

    <label for="x0">Initial Guess (x0):</label>
    <input type="number" v-model="x0" />

    <label for="x1">Next Guess (x1):</label>
    <input type="number" v-model="x1" />

    <button @click="calculateSecantMethod">Calculate</button>

    <div v-if="result !== null">
      <h2>Final Result</h2>
      <p>Root: {{ result }}</p>
    </div>

    <div v-if="iterations.length > 0">
      <h2>Iterations</h2>
      <ul>
        <li v-for="(iter, index) in iterations" :key="index">
          Iteration {{ index + 1 }}: x = {{ iter }}
        </li>
      </ul>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { evaluate } from 'mathjs';

export default {
  name: 'SecantMethod',
  data() {
    return {
      functionInput: 'x^2 - 4',
      x0: 1,
      x1: 2,
      result: null,
      iterations: [],
      errorMessage: '',
      tolerance: 0.0001,
      maxIterations: 50,
    };
  },
  methods: {
    calculateSecantMethod() {
      this.errorMessage = '';
      this.iterations = [this.x0, this.x1];
      let x0 = this.x0;
      let x1 = this.x1;
      let iterationCount = 0;

      try {
        while (iterationCount < this.maxIterations) {
          const f_x0 = evaluate(this.functionInput, { x: x0 });
          const f_x1 = evaluate(this.functionInput, { x: x1 });
          const x2 = x1 - (f_x1 * (x1 - x0)) / (f_x1 - f_x0);

          this.iterations.push(x2);
          if (Math.abs(x2 - x1) < this.tolerance) {
            this.result = x2;
            break;
          }
          x0 = x1;
          x1 = x2;
          iterationCount++;
        }
        if (iterationCount === this.maxIterations) {
          this.errorMessage = 'Maximum iterations reached without convergence.';
        }
      } catch (error) {
        this.errorMessage = 'Error in calculating Secant Method.';
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
