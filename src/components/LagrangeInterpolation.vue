<template>
  <div>
    <h1>Lagrange Interpolation</h1>
    <p>Instructions and details for Lagrange Interpolation go here.</p>

    <label for="data">Data Points (x, y):</label>
    <textarea
      v-model="dataInput"
      placeholder="e.g., [[1,2], [2,4], [3,6]]"
    ></textarea>

    <button @click="calculateLagrangeInterpolation">Calculate</button>

    <div v-if="result !== null">
      <h2>Result</h2>
      <p>Interpolated Polynomial: {{ result }}</p>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <h3>Test Cases</h3>
    <div class="test-cases">
      <button
        @click="
          loadTestCase([
            [1, 2],
            [2, 4],
          ])
        "
      >
        Basic Linear Interpolation (Two Points)
      </button>
      <button
        @click="
          loadTestCase([
            [1, 1],
            [2, 4],
            [3, 9],
          ])
        "
      >
        Quadratic Interpolation (Three Points)
      </button>
      <button
        @click="
          loadTestCase([
            [1, 3],
            [2, 7],
            [3, 13],
          ])
        "
      >
        Non-linear Interpolation (Three Points)
      </button>
      <button
        @click="
          loadTestCase([
            [1, 1],
            [2, 8],
            [3, 27],
            [4, 64],
          ])
        "
      >
        Cubic Interpolation (Four Points)
      </button>
      <button
        @click="
          loadTestCase([
            [1, 1],
            [2, 8],
            [3, 27],
            [4, 65],
          ])
        "
      >
        Non-trivial Points (Four Points)
      </button>
      <button
        @click="
          loadTestCase([
            [0, 1],
            [1, 2],
            [2, 0],
            [3, 2],
            [4, 5],
          ])
        "
      >
        Complex Interpolation (Five Points)
      </button>
    </div>
  </div>
</template>

<script>
import { evaluate, simplify } from 'mathjs';

export default {
  name: 'LagrangeInterpolation',
  data() {
    return {
      dataInput: '[[1,2], [2,4], [3,6]]', // Example data points
      result: null,
      errorMessage: '',
    };
  },
  methods: {
    calculateLagrangeInterpolation() {
      this.errorMessage = '';
      try {
        // Parse input data
        const points = JSON.parse(this.dataInput);
        if (points.length < 2)
          throw new Error('At least two data points are required.');

        const terms = points.map((_, i) => {
          const [xi, yi] = points[i];
          let term = `${yi}`;

          // Build each Lagrange basis polynomial
          points.forEach(([xj], j) => {
            if (i !== j) {
              term += ` * ((x - ${xj}) / (${xi} - ${xj}))`;
            }
          });
          return `(${term})`;
        });

        // Combine terms to form the interpolated polynomial
        const polynomial = terms.join(' + ');
        this.result = simplify(polynomial).toString(); // Simplify the result for better readability
      } catch (error) {
        this.errorMessage =
          'Error in calculating Lagrange Interpolation: ' + error.message;
        console.error(error);
      }
    },
    loadTestCase(points) {
      this.dataInput = JSON.stringify(points);
      this.calculateLagrangeInterpolation(); // Calculate immediately after loading the test case
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}

.test-cases {
  margin-top: 20px;
}

.test-cases button {
  margin: 5px;
  padding: 5px 10px;
  font-size: 0.9em;
  cursor: pointer;
}
</style>
