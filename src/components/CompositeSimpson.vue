<template>
  <div>
    <h1>Composite Simpson's Method</h1>
    <p>Instructions and details for the Composite Simpson's method go here.</p>

    <div>
      <label for="function">Function \( f(x) \):</label>
      <input type="text" v-model="functionInput" placeholder="e.g., x^2" />

      <label for="lowerLimit">Lower Limit (a):</label>
      <input type="number" v-model="lowerLimit" />

      <label for="upperLimit">Upper Limit (b):</label>
      <input type="number" v-model="upperLimit" />

      <label for="intervals">Number of Intervals (n):</label>
      <input type="number" v-model="intervals" />

      <button @click="calculateCompositeSimpson">Calculate</button>
    </div>

    <div v-if="result !== null">
      <h2>Result</h2>
      <p>Result: {{ result }}</p>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { evaluate } from 'mathjs';

export default {
  name: 'CompositeSimpsonMethod',
  data() {
    return {
      functionInput: 'x^2',
      lowerLimit: 0,
      upperLimit: 1,
      intervals: 4,
      result: null,
      errorMessage: '',
    };
  },
  methods: {
    calculateCompositeSimpson() {
      this.errorMessage = '';
      this.result = null;

      try {
        let a = this.lowerLimit;
        let b = this.upperLimit;
        let n = this.intervals;

        // Ensure n is even
        if (n % 2 !== 0) {
          this.errorMessage = 'Number of intervals (n) must be even.';
          return;
        }

        let h = (b - a) / n;
        let f = (x) => evaluate(this.functionInput, { x });

        // Simpson's Rule calculation
        let sum = f(a) + f(b);

        for (let i = 1; i < n; i++) {
          let x_i = a + i * h;
          sum += (i % 2 === 0 ? 2 : 4) * f(x_i);
        }

        this.result = (h / 3) * sum;
      } catch (error) {
        this.errorMessage = "Error in calculating Composite Simpson's Method.";
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
