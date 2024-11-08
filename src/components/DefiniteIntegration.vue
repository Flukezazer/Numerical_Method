<template>
  <div class="definite-integration-container">
    <h1>Definite Integration</h1>
    <p class="instructions">
      Calculate the definite integral of a function within given limits using
      the Trapezoidal Rule.
    </p>

    <div class="input-container">
      <label for="function">Function \( f(x) \):</label>
      <input
        v-model="functionInput"
        placeholder="e.g., x^2 + 1"
        class="input-box"
      />

      <label for="a">Lower Limit (a):</label>
      <input
        v-model.number="a"
        placeholder="0"
        type="number"
        class="input-box"
      />

      <label for="b">Upper Limit (b):</label>
      <input
        v-model.number="b"
        placeholder="1"
        type="number"
        class="input-box"
      />

      <label for="n">Number of Intervals (n):</label>
      <input
        v-model.number="n"
        placeholder="100"
        type="number"
        class="input-box"
      />

      <button @click="calculateIntegral" class="calculate-button">
        Calculate
      </button>
    </div>

    <div v-if="result !== null" class="result-container">
      <h2>Result</h2>
      <p>Total Integral: {{ result }}</p>

      <h3>Step-by-Step Results for Each Interval</h3>
      <ul class="interval-results">
        <li
          v-for="(value, index) in intervalResults"
          :key="index"
          class="interval-item"
        >
          Interval {{ index + 1 }}: {{ value }}
        </li>
      </ul>
    </div>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { evaluate } from 'mathjs';

export default {
  name: 'DefiniteIntegration',
  data() {
    return {
      functionInput: 'x^2 + 1',
      a: 0,
      b: 1,
      n: 100,
      result: null,
      intervalResults: [],
      errorMessage: '',
    };
  },
  methods: {
    calculateIntegral() {
      this.errorMessage = '';
      this.intervalResults = []; // Reset interval results
      try {
        const h = (this.b - this.a) / this.n;
        let integral = 0;

        // Calculate first and last terms
        let x0 = evaluate(this.functionInput, { x: this.a });
        let xn = evaluate(this.functionInput, { x: this.b });
        integral += (x0 + xn) / 2;

        // Calculate the intermediate terms
        for (let i = 1; i < this.n; i++) {
          const x = this.a + i * h;
          const fx = evaluate(this.functionInput, { x: x });
          integral += fx;
          this.intervalResults.push(`f(${x.toFixed(5)}) = ${fx.toFixed(5)}`);
        }

        integral *= h;
        this.result = integral.toFixed(5); // Set the final integral as the result with 5 decimal places
      } catch (error) {
        this.errorMessage = 'Error in calculating the integral.';
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.definite-integration-container {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.instructions {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1rem;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.input-box {
  width: 80%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.calculate-button {
  padding: 0.5rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.calculate-button:hover {
  background-color: #0056b3;
}

.result-container {
  margin-top: 1.5rem;
  font-size: 1.1rem;
  font-weight: bold;
}

.interval-results {
  text-align: center;
  list-style: none;
  padding: 0;
}

.interval-item {
  padding: 0.25rem 0;
}

.error-message {
  color: red;
  font-weight: bold;
}
</style>
