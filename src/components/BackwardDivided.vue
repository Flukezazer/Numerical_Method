<template>
  <div>
    <h1>Backward Divided Difference</h1>
    <p>
      Instructions and details for the Backward Divided Difference method go
      here.
    </p>

    <label for="function">Function \( f(x) \):</label>
    <input type="text" v-model="functionInput" placeholder="e.g., cos(x)" />

    <label for="xValue">X Value:</label>
    <input type="number" v-model="xValue" />

    <label for="hValue">Step Size (h):</label>
    <input type="number" v-model="hValue" />

    <button @click="calculateBackwardDividedDifference">Calculate</button>

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
  name: 'BackwardDivided',
  data() {
    return {
      functionInput: 'cos(x)',
      xValue: 1,
      hValue: 0.1,
      result: null,
      errorMessage: '',
    };
  },
  methods: {
    g(x) {
      try {
        return evaluate(this.functionInput, { x });
      } catch (error) {
        this.errorMessage = 'Invalid function. Please check your input.';
        console.error(error);
        return null;
      }
    },
    calculateBackwardDividedDifference() {
      this.errorMessage = '';
      try {
        const f_x = this.g(this.xValue);
        const f_x_minus_h = this.g(this.xValue - this.hValue);
        this.result = (f_x - f_x_minus_h) / this.hValue;
      } catch (error) {
        this.errorMessage = 'Error in calculating Backward Divided Difference.';
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
