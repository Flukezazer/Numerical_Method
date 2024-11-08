<template>
  <div>
    <h1>Multiple Regression</h1>
    <p>Instructions and details for Multiple Regression go here.</p>

    <label for="data">Data Points (x1, x2, ..., y):</label>
    <textarea
      v-model="dataInput"
      placeholder="e.g., [[1,2,3], [4,5,6], [7,8,9]]"
    ></textarea>

    <button @click="calculateMultipleRegression">Calculate</button>

    <div v-if="formattedResult">
      <h2>Result</h2>
      <p><strong>Intercept:</strong> {{ formattedResult.intercept }}</p>
      <p><strong>Coefficients:</strong></p>
      <ul>
        <li v-for="(coef, index) in formattedResult.coefficients" :key="index">
          Coefficient for variable {{ index + 1 }}: {{ coef }}
        </li>
      </ul>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { Matrix } from 'ml-matrix';
import MLR from 'ml-regression-multivariate-linear';

export default {
  name: 'MultipleRegression',
  data() {
    return {
      dataInput: '[[1,2,3], [4,5,6], [7,8,9]]', // Example data points
      result: null,
      formattedResult: null,
      errorMessage: '',
    };
  },
  methods: {
    calculateMultipleRegression() {
      this.errorMessage = '';
      try {
        // Parse input data
        const points = JSON.parse(this.dataInput);

        // Separate the input variables (X) and output variable (y)
        const X = points.map((point) => point.slice(0, -1)); // All except last element
        const y = points.map((point) => [point[point.length - 1]]); // Only the last element

        // Perform multiple regression
        const mlr = new MLR(X, y);

        // Log intercept for debugging
        console.log('Intercept:', mlr.intercept);

        // Ensure intercept is treated as a number
        const intercept = Array.isArray(mlr.intercept)
          ? parseFloat(mlr.intercept[0])
          : parseFloat(mlr.intercept);

        // Store raw result
        this.result = {
          coefficients: mlr.weights.map((weight) => parseFloat(weight[0])), // Flatten and parse each coefficient
          intercept: intercept,
        };

        // Format result for better readability
        this.formattedResult = {
          intercept: intercept.toFixed(4), // Round to 4 decimal places
          coefficients: this.result.coefficients.map((coef) => coef.toFixed(4)), // Round each coefficient
        };
      } catch (error) {
        this.errorMessage =
          'Error in calculating Multiple Regression: ' + error.message;
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
ul {
  list-style-type: none;
  padding-left: 0;
}
ul li {
  padding: 2px 0;
}
</style>
