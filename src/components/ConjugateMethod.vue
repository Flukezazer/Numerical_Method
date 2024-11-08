<template>
  <div>
    <h1>Conjugate Method</h1>
    <p>Instructions and details for the Conjugate method go here.</p>

    <label for="function">Function \( f(x) \):</label>
    <input
      type="text"
      v-model="functionInput"
      placeholder="e.g., x^2 + 2x + 1"
    />
    <button @click="calculateConjugateMethod">Calculate</button>

    <div v-if="result !== null">
      <h2>Result</h2>
      <p>Result: {{ result }}</p>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { evaluate } from 'mathjs';

export default {
  name: 'ConjugateMethod',
  data() {
    return {
      functionInput: 'x^2 + 2x + 1', // default function input
      result: null,
      errorMessage: '',
    };
  },
  methods: {
    calculateConjugateMethod() {
      this.errorMessage = '';
      try {
        const x = 1; // Set a value for x, or prompt the user for it
        this.result = evaluate(this.functionInput, { x });
      } catch (error) {
        this.errorMessage = 'Error in calculating the Conjugate method.';
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
