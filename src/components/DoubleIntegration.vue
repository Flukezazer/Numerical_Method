<template>
  <div class="container">
    <h1>Double Integration</h1>
    <p class="instructions">
      Calculate the double integral of a function within given limits.
    </p>

    <form @submit.prevent="calculateDoubleIntegral">
      <label for="functionInput">Function \( f(x, y) \):</label>
      <input type="text" v-model="functionInput" placeholder="x * y" />

      <label for="xLower">X Limits (a, b):</label>
      <input type="number" v-model.number="xLower" placeholder="0" />
      <input type="number" v-model.number="xUpper" placeholder="1" />

      <label for="yLower">Y Limits (c, d):</label>
      <input type="number" v-model.number="yLower" placeholder="0" />
      <input type="number" v-model.number="yUpper" placeholder="1" />

      <label for="intervals">Number of Intervals:</label>
      <input type="number" v-model.number="intervals" placeholder="100" />

      <button type="submit" class="calculate-btn">Calculate</button>
    </form>

    <div v-if="result !== null" class="result">
      <h2>Result</h2>
      <p>Total Double Integral: {{ result.toFixed(5) }}</p>

      <h3>Step-by-Step Results for Each Interval</h3>
      <div class="interval-results">
        <ul>
          <li v-for="(value, index) in displayedIntervals" :key="index">
            Interval {{ index + 1 }}: f(x = {{ value.x.toFixed(5) }}, y =
            {{ value.y.toFixed(5) }}) = {{ value.f_xy.toFixed(5) }}
          </li>
        </ul>
        <p v-if="displayedIntervals.length < stepResults.length">
          Showing {{ displayedIntervals.length }} of
          {{ stepResults.length }} intervals.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { evaluate } from 'mathjs';

export default {
  data() {
    return {
      functionInput: 'x * y',
      xLower: 0,
      xUpper: 1,
      yLower: 0,
      yUpper: 1,
      intervals: 100,
      result: null,
      stepResults: [], // Array to hold the results for each interval
    };
  },
  computed: {
    displayedIntervals() {
      // Show only a maximum of 100 interval results
      return this.stepResults.slice(0, Math.min(this.intervals, 100));
    },
  },
  methods: {
    calculateDoubleIntegral() {
      this.stepResults = []; // Reset previous results
      this.result = 0;

      const dx = (this.xUpper - this.xLower) / this.intervals;
      const dy = (this.yUpper - this.yLower) / this.intervals;

      for (let i = 0; i < this.intervals; i++) {
        const x = this.xLower + i * dx + dx / 2;
        for (let j = 0; j < this.intervals; j++) {
          const y = this.yLower + j * dy + dy / 2;
          const f_xy = evaluate(this.functionInput, { x, y });

          // Save intermediate values for each interval
          this.stepResults.push({ x, y, f_xy });

          this.result += f_xy * dx * dy;
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
  margin-top: 20px;
}

.instructions {
  margin: 15px 0;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

input[type='text'],
input[type='number'] {
  padding: 5px;
  font-size: 1em;
  width: 200px;
}

.calculate-btn {
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;
}

.calculate-btn:hover {
  background-color: #0056b3;
}

.result {
  margin-top: 20px;
  text-align: center;
}

.interval-results {
  margin-top: 15px;
  text-align: left;
  display: inline-block;
}

.interval-results ul {
  padding: 0;
  list-style: none;
}

.interval-results li {
  font-size: 0.9em;
}
</style>
