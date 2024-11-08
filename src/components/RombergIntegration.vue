<template>
  <div>
    <h1>Romberg Integration</h1>
    <p>Instructions and details for Romberg Integration go here.</p>

    <label for="function">Function \( f(x) \):</label>
    <input type="text" v-model="functionInput" placeholder="e.g., x^2" />

    <label for="a">Lower Limit (a):</label>
    <input type="number" v-model="a" />

    <label for="b">Upper Limit (b):</label>
    <input type="number" v-model="b" />

    <button @click="calculateRombergIntegration">Calculate</button>

    <div v-if="result !== null">
      <h2>Result</h2>
      <p>Integral: {{ result }}</p>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { evaluate } from 'mathjs';

export default {
  name: 'RombergIntegration',
  data() {
    return {
      functionInput: 'x^2',
      a: 0,
      b: 1,
      result: null,
      errorMessage: '',
    };
  },
  methods: {
    calculateRombergIntegration() {
      this.errorMessage = '';
      try {
        const func = this.functionInput;
        const lower = parseFloat(this.a);
        const upper = parseFloat(this.b);

        const romberg = (f, a, b, maxIterations = 5) => {
          const R = Array.from({ length: maxIterations }, () =>
            Array(maxIterations).fill(0)
          );
          const h = b - a;

          R[0][0] = 0.5 * h * (evaluate(f, { x: a }) + evaluate(f, { x: b }));

          for (let i = 1; i < maxIterations; i++) {
            const h_i = h / Math.pow(2, i);
            let sum = 0;
            for (let k = 1; k <= Math.pow(2, i - 1); k++) {
              sum += evaluate(f, { x: a + (2 * k - 1) * h_i });
            }
            R[i][0] = 0.5 * R[i - 1][0] + h_i * sum;

            for (let j = 1; j <= i; j++) {
              R[i][j] =
                (Math.pow(4, j) * R[i][j - 1] - R[i - 1][j - 1]) /
                (Math.pow(4, j) - 1);
            }
          }

          return R[maxIterations - 1][maxIterations - 1];
        };

        this.result = romberg(func, lower, upper).toFixed(5);
      } catch (error) {
        this.errorMessage = 'Error in calculating Romberg Integration.';
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
