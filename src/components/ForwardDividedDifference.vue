<template>
  <div>
    <h1>Forward Divided Difference</h1>
    <p>
      Instructions and details for the Forward Divided Difference method go
      here.
    </p>

    <label for="function">Function \( f(x) \):</label>
    <input type="text" v-model="functionInput" placeholder="e.g., cos(x)" />

    <label for="xValue">X Value:</label>
    <input type="number" v-model="xValue" />

    <label for="hValue">Step Size (h):</label>
    <input type="number" v-model="hValue" />

    <button @click="calculateForwardDividedDifference">Calculate</button>

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
  name: 'ForwardDividedDifference',
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
    calculateForwardDividedDifference() {
      this.errorMessage = '';
      try {
        const f_x = evaluate(this.functionInput, { x: this.xValue });
        const f_x_plus_h = evaluate(this.functionInput, {
          x: this.xValue + this.hValue,
        });
        this.result = (f_x_plus_h - f_x) / this.hValue;
      } catch (error) {
        this.errorMessage = 'Error in calculating Forward Divided Difference.';
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
