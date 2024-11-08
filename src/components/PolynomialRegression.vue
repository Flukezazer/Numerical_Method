<template>
  <div>
    <h1>Polynomial Regression</h1>
    <p>Instructions and details for Polynomial Regression go here.</p>

    <label for="data">Data Points (x, y):</label>
    <textarea
      v-model="dataInput"
      placeholder="e.g., [[1,2], [2,4], [3,6]]"
    ></textarea>

    <label for="degree">Degree of Polynomial:</label>
    <input type="number" v-model="degree" placeholder="e.g., 2" />

    <button @click="calculatePolynomialRegression">Calculate</button>

    <div v-if="result !== null">
      <h2>Final Result</h2>
      <p>Polynomial: {{ result }}</p>
    </div>

    <div v-if="iterations.length > 0">
      <h2>Iterations</h2>
      <ul>
        <li v-for="(iter, index) in iterations" :key="index">
          Iteration {{ index + 1 }}: Polynomial coefficients = {{ iter }}
        </li>
      </ul>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'PolynomialRegression',
  data() {
    return {
      dataInput: '[[1,2], [2,4], [3,6]]',
      degree: 2,
      result: null,
      iterations: [],
      errorMessage: '',
    };
  },
  methods: {
    calculatePolynomialRegression() {
      this.errorMessage = '';
      this.iterations = [];
      try {
        // Simulate iterative polynomial fitting process
        for (let i = 1; i <= this.degree; i++) {
          const coefficients = this.generateMockCoefficients(i);
          this.iterations.push(coefficients);
        }
        this.result = `Final polynomial with degree ${this.degree}`;
      } catch (error) {
        this.errorMessage = 'Error in calculating Polynomial Regression.';
        console.error(error);
      }
    },
    generateMockCoefficients(degree) {
      // This is a mock function to simulate coefficients
      return Array.from({ length: degree + 1 }, () => Math.random().toFixed(2));
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
