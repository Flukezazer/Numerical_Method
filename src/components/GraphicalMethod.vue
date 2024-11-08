<template>
  <div>
    <h1>Graphical Method</h1>
    <p>Instructions and details for the Graphical Method go here.</p>

    <label for="functionInput">Function \( f(x) \):</label>
    <input v-model="functionInput" placeholder="e.g., x^2 - 4" />
    <button @click="plotGraph">Plot Graph</button>

    <div v-if="graphData">
      <h2>Graph Result</h2>
      <plotly :data="graphData" :layout="layout"></plotly>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import Plotly from 'vue-plotly';
import { evaluate } from 'mathjs';

export default {
  name: 'GraphicalMethod',
  components: {
    Plotly,
  },
  data() {
    return {
      functionInput: 'x^2 - 4',
      graphData: null,
      layout: {
        title: 'Graph of f(x)',
        xaxis: { title: 'x' },
        yaxis: { title: 'f(x)' },
      },
      errorMessage: '',
    };
  },
  methods: {
    plotGraph() {
      try {
        this.errorMessage = '';
        const fn = this.functionInput;

        // Generate x and y values
        const xValues = Array.from({ length: 100 }, (_, i) => i / 10 - 5); // x from -5 to 5
        const yValues = xValues.map((x) => evaluate(fn, { x }));

        // Set data for Plotly
        this.graphData = [
          {
            x: xValues,
            y: yValues,
            type: 'scatter',
            mode: 'lines',
            line: { color: 'blue' },
          },
        ];
      } catch (error) {
        this.errorMessage =
          'Error plotting graph. Please check the function syntax.';
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
