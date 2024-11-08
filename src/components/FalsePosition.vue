<template>
  <div>
    <h1>False Position Method</h1>
    <p>Instructions and details for the False Position method go here.</p>
    <label>
      Function \( f(x) \):
      <input v-model="functionInput" placeholder="e.g., x^2 - 4" />
    </label>
    <label>
      Lower Bound (a):
      <input v-model.number="lowerBound" type="number" />
    </label>
    <label>
      Upper Bound (b):
      <input v-model.number="upperBound" type="number" />
    </label>
    <button @click="calculateRoot">Calculate</button>

    <h2>Result</h2>
    <p>Root: {{ result !== null ? result : 'Root calculation result' }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { evaluate } from 'mathjs';

export default {
  data() {
    return {
      functionInput: 'x^2 - 4',
      lowerBound: 1,
      upperBound: 3,
      tolerance: 0.0001,
      maxIterations: 100,
      result: null,
      errorMessage: '',
    };
  },
  methods: {
    calculateRoot() {
      this.errorMessage = '';
      this.result = null;

      try {
        let a = this.lowerBound;
        let b = this.upperBound;
        let fa = evaluate(this.functionInput, { x: a });
        let fb = evaluate(this.functionInput, { x: b });

        if (fa * fb > 0) {
          this.errorMessage =
            'The function must have opposite signs at the bounds a and b.';
          return;
        }

        let root;
        for (let i = 0; i < this.maxIterations; i++) {
          root = (a * fb - b * fa) / (fb - fa);
          let fRoot = evaluate(this.functionInput, { x: root });

          if (Math.abs(fRoot) < this.tolerance) {
            this.result = root.toFixed(5);
            return;
          }

          if (fa * fRoot < 0) {
            b = root;
            fb = fRoot;
          } else {
            a = root;
            fa = fRoot;
          }
        }

        this.result = root.toFixed(5);
      } catch (error) {
        this.errorMessage = 'Error in calculating the root. Check your input.';
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
