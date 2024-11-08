<template>
  <div>
    <h1>Exact Integration</h1>
    <p>Instructions and details for Exact Integration go here.</p>
    <label>
      Function \( f(x) \):
      <input v-model="functionInput" placeholder="e.g., x^2" />
    </label>
    <label>
      Lower Limit (a):
      <input v-model.number="lowerLimit" type="number" />
    </label>
    <label>
      Upper Limit (b):
      <input v-model.number="upperLimit" type="number" />
    </label>
    <button @click="calculateIntegral">Calculate</button>

    <h2>Result</h2>
    <p>
      Integral: {{ result !== null ? result : 'Enter function and limits' }}
    </p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { evaluate } from 'mathjs';

export default {
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
    calculateIntegral() {
      this.errorMessage = '';
      try {
        const expr = this.functionInput;
        const n = 1000; // Number of intervals for approximation
        const deltaX = (this.upperLimit - this.lowerLimit) / n;
        let sum = 0;

        for (let i = 0; i < n; i++) {
          const x = this.lowerLimit + i * deltaX;
          sum += evaluate(expr, { x }) * deltaX;
        }

        this.result = sum.toFixed(5); // Approximate integral result
      } catch (error) {
        this.errorMessage =
          'Error in calculating the integral. Check your input.';
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
