<template>
  <div>
    <h1>Simple Regression</h1>
    <p>Instructions and details for Simple Regression go here.</p>

    <label for="data">Data Points (x, y):</label>
    <textarea
      v-model="dataInput"
      placeholder="e.g., [[1,2], [2,3], [3,5]]"
    ></textarea>

    <button @click="calculateRegression">Calculate</button>

    <div v-if="result !== null">
      <h2>Result</h2>
      <p>Regression Line: {{ result }}</p>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'SimpleRegression',
  data() {
    return {
      dataInput: '[[1,2], [2,3], [3,5]]',
      result: null,
      errorMessage: '',
    };
  },
  methods: {
    calculateRegression() {
      this.errorMessage = '';
      try {
        // Implement Regression calculation here
        this.result = 'Regression line result';
      } catch (error) {
        this.errorMessage = 'Error in calculating Regression.';
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
