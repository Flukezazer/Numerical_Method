<template>
  <div>
    <h1>Bisection Method</h1>
    <p>Instructions and details for the Bisection Method go here.</p>

    <div>
      <label for="function">Function \( f(x) \):</label>
      <input type="text" v-model="functionInput" placeholder="e.g., x^2 - 4" />

      <label for="lowerBound">Lower Bound (a):</label>
      <input type="number" v-model="lowerBound" />

      <label for="upperBound">Upper Bound (b):</label>
      <input type="number" v-model="upperBound" />

      <label for="tolerance">Tolerance:</label>
      <input type="number" v-model="tolerance" step="0.001" />

      <label for="maxIterations">Max Iterations:</label>
      <input type="number" v-model="maxIterations" />

      <button @click="calculateBisectionMethod">Calculate</button>
    </div>

    <div v-if="result !== null">
      <h2>Result</h2>
      <p>Root: {{ result }}</p>
      <p>Total Iterations: {{ iterations.length }}</p>

      <h3>Iteration Details</h3>
      <ul>
        <li v-for="(iteration, index) in iterations" :key="index">
          Iteration {{ index + 1 }} - a: {{ iteration.a }}, b:
          {{ iteration.b }}, c: {{ iteration.c }}, f(c): {{ iteration.f_c }}
        </li>
      </ul>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { evaluate } from 'mathjs';

export default {
  name: 'BisectionMethod',
  data() {
    return {
      functionInput: 'x^2 - 4',
      lowerBound: 0,
      upperBound: 4,
      tolerance: 0.001,
      maxIterations: 40,
      result: null,
      errorMessage: '',
      iterations: [],
    };
  },
  methods: {
    calculateBisectionMethod() {
      this.errorMessage = '';
      this.iterations = [];
      try {
        let a = this.lowerBound;
        let b = this.upperBound;
        let f = (x) => evaluate(this.functionInput, { x });

        if (f(a) * f(b) >= 0) {
          this.errorMessage =
            'The function must have different signs at a and b.';
          return;
        }

        let c;
        for (let i = 0; i < this.maxIterations; i++) {
          c = (a + b) / 2;
          let f_c = f(c);

          // Record the current iteration details
          this.iterations.push({ a, b, c, f_c });

          if (
            Math.abs(f_c) <= this.tolerance ||
            Math.abs(b - a) / 2 < this.tolerance
          ) {
            this.result = c;
            return;
          }

          if (f(a) * f_c < 0) {
            b = c;
          } else {
            a = c;
          }
        }

        this.result = c;
      } catch (error) {
        this.errorMessage = 'Error in calculating the Bisection Method.';
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
