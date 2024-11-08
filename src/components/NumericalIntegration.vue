<template>
  <div>
    <h1>Numerical Integration</h1>
    <p>Instructions and details for Numerical Integration go here.</p>

    <label for="function">Function \( f(x) \):</label>
    <input v-model="functionInput" placeholder="e.g., x^2" />

    <label for="lowerLimit">Lower Limit (a):</label>
    <input type="number" v-model.number="lowerLimit" />

    <label for="upperLimit">Upper Limit (b):</label>
    <input type="number" v-model.number="upperLimit" />

    <button @click="calculateIntegration">Calculate</button>

    <div v-if="result !== null">
      <h2>Result</h2>
      <p>Integral: {{ result }}</p>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { evaluate } from 'mathjs';

export default {
  name: 'NumericalIntegration',
  data() {
    return {
      functionInput: 'x^2',
      lowerLimit: 0,
      upperLimit: 1,
      result: null,
      errorMessage: '',
    };
  },
  methods: {
    calculateIntegration() {
      this.errorMessage = '';
      try {
        // Parse the function
        const fn = this.functionInput;
        const a = this.lowerLimit;
        const b = this.upperLimit;
        const n = 1000; // Number of intervals for accuracy

        // Calculate using the Trapezoidal rule
        const h = (b - a) / n;
        let integral = 0;

        for (let i = 0; i <= n; i++) {
          const x = a + i * h;
          const fx = evaluate(fn, { x });
          integral += i === 0 || i === n ? fx : 2 * fx;
        }

        this.result = (h / 2) * integral; // Final trapezoidal calculation
      } catch (error) {
        this.errorMessage =
          'Error in calculating the integral. Please check the function syntax.';
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
