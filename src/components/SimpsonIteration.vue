<template>
  <div>
    <h1>Simpson's Iteration</h1>
    <p>Instructions and details for Simpson's Iteration go here.</p>

    <label for="function">Function \( f(x) \):</label>
    <input type="text" v-model="functionInput" placeholder="e.g., x^2" />

    <label for="a">Lower Limit (a):</label>
    <input type="number" v-model="a" />

    <label for="b">Upper Limit (b):</label>
    <input type="number" v-model="b" />

    <label for="n">Number of Intervals (n):</label>
    <input type="number" v-model="n" />

    <button @click="calculateSimpsonIteration">Calculate</button>

    <div v-if="result !== null">
      <h2>Final Result</h2>
      <p>Integral: {{ result }}</p>
    </div>

    <div v-if="iterations.length > 0">
      <h2>Iterations</h2>
      <ul>
        <li v-for="(iter, index) in iterations" :key="index">
          Iteration {{ index + 1 }}: Step Value = {{ iter }}
        </li>
      </ul>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { evaluate } from 'mathjs';

export default {
  name: 'SimpsonIteration',
  data() {
    return {
      functionInput: 'x^2',
      a: 0,
      b: 1,
      n: 10,
      result: null,
      iterations: [],
      errorMessage: '',
    };
  },
  methods: {
    calculateSimpsonIteration() {
      this.errorMessage = '';
      this.iterations = [];
      let h = (this.b - this.a) / this.n;
      let sum = 0;

      try {
        for (let i = 0; i <= this.n; i++) {
          let x = this.a + i * h;
          let fx = evaluate(this.functionInput, { x });
          let coeff = i === 0 || i === this.n ? 1 : i % 2 === 0 ? 2 : 4;
          let stepValue = coeff * fx;
          this.iterations.push(stepValue);
          sum += stepValue;
        }
        this.result = (h / 3) * sum;
      } catch (error) {
        this.errorMessage = "Error in calculating Simpson's Iteration.";
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
