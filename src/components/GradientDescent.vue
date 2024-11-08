<template>
  <div>
    <h1>Gradient Descent</h1>
    <p>Instructions and details for the Gradient Descent method go here.</p>

    <label for="function">Function \( f(x) \):</label>
    <input v-model="functionInput" placeholder="e.g., x^2 + 4x + 4" />

    <label for="initialValue">Initial Value:</label>
    <input type="number" v-model.number="initialValue" placeholder="e.g., 0" />

    <label for="learningRate">Learning Rate:</label>
    <input
      type="number"
      v-model.number="learningRate"
      placeholder="e.g., 0.1"
    />

    <button @click="calculateGradientDescent">Calculate</button>

    <div v-if="result !== null">
      <h2>Result</h2>
      <p>Optimal value: {{ result }}</p>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { derivative, evaluate } from 'mathjs';

export default {
  name: 'GradientDescent',
  data() {
    return {
      functionInput: 'x^2 + 4x + 4',
      initialValue: 0,
      learningRate: 0.1,
      result: null,
      errorMessage: '',
      maxIterations: 1000,
      tolerance: 0.0001,
    };
  },
  methods: {
    calculateGradientDescent() {
      this.errorMessage = '';
      try {
        const func = this.functionInput;
        const initial = this.initialValue;
        const rate = this.learningRate;

        // Call Gradient Descent function
        this.result = this.gradientDescent(
          func,
          initial,
          rate,
          this.maxIterations,
          this.tolerance
        );
      } catch (error) {
        this.errorMessage =
          'Error in calculating Gradient Descent. Check your input.';
        console.error(error);
      }
    },
    gradientDescent(
      func,
      initialValue,
      learningRate,
      maxIterations,
      tolerance
    ) {
      let x = initialValue;
      let prevX;
      let iteration = 0;

      while (iteration < maxIterations) {
        // Calculate the derivative of the function at the current point
        const grad = derivative(func, 'x').evaluate({ x });

        // Update x using the gradient
        prevX = x;
        x = x - learningRate * grad;

        // Check for convergence
        if (Math.abs(x - prevX) < tolerance) break;

        iteration++;
      }

      return x;
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
