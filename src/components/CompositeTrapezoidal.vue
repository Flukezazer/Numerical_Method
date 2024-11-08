<template>
  <div>
    <h1>Composite Trapezoidal Method</h1>
    <p>
      Instructions and details for the Composite Trapezoidal method go here.
    </p>

    <div>
      <label for="function">Function \( f(x) \):</label>
      <input type="text" v-model="functionInput" placeholder="e.g., x^2" />

      <label for="lowerLimit">Lower Limit (a):</label>
      <input type="number" v-model="lowerLimit" />

      <label for="upperLimit">Upper Limit (b):</label>
      <input type="number" v-model="upperLimit" />

      <label for="intervals">Number of Intervals (n):</label>
      <input type="number" v-model="intervals" />

      <button @click="calculateCompositeTrapezoidal">Calculate</button>
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
  name: 'CompositeTrapezoidalMethod',
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
    calculateCompositeTrapezoidal() {
      this.errorMessage = '';
      this.result = null;

      try {
        let a = this.lowerLimit;
        let b = this.upperLimit;
        let n = this.intervals;

        if (n <= 0) {
          this.errorMessage = 'Number of intervals (n) must be positive.';
          return;
        }

        let h = (b - a) / n;
        let f = (x) => evaluate(this.functionInput, { x });

        // Trapezoidal Rule calculation
        let sum = 0.5 * (f(a) + f(b));

        for (let i = 1; i < n; i++) {
          let x_i = a + i * h;
          sum += f(x_i);
        }

        this.result = h * sum;
      } catch (error) {
        this.errorMessage =
          'Error in calculating Composite Trapezoidal Method.';
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
