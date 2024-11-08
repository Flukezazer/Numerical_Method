<template>
  <div class="container">
    <h1>Numerical Methods Application</h1>
    <p>Select a calculation method:</p>

    <nav>
      <ul class="nav-links">
        <li class="dropdown">
          <span @click="toggleDropdown" class="dropdown-toggle">
            Calculation Method ▼
          </span>
          <ul v-if="isDropdownOpen" class="dropdown-menu">
            <li>
              <router-link to="/one-point-iteration"
                >One Point Iteration</router-link
              >
            </li>
            <li>
              <router-link to="/backward-divided"
                >Backward Divided Difference</router-link
              >
            </li>
            <li><router-link to="/bisection">Bisection Method</router-link></li>
            <li>
              <router-link to="/central-divided-difference"
                >Central Divided Difference</router-link
              >
            </li>
            <li>
              <router-link to="/composite-simpson"
                >Composite Simpson</router-link
              >
            </li>
            <li>
              <router-link to="/composite-trapezoidal"
                >Composite Trapezoidal</router-link
              >
            </li>
            <li>
              <router-link to="/conjugate-method">Conjugate Method</router-link>
            </li>
            <li><router-link to="/cramers-rule">Cramer's Rule</router-link></li>
            <li>
              <router-link to="/definite-integration"
                >Definite Integration</router-link
              >
            </li>
            <li>
              <router-link to="/double-integration"
                >Double Integration</router-link
              >
            </li>
            <li>
              <router-link to="/exact-integration"
                >Exact Integration</router-link
              >
            </li>
            <li>
              <router-link to="/false-position">False Position</router-link>
            </li>
            <li>
              <router-link to="/first-divided-difference"
                >First Divided Difference</router-link
              >
            </li>
            <li>
              <router-link to="/forward-divided-difference"
                >Forward Divided Difference</router-link
              >
            </li>
            <li>
              <router-link to="/gaussian-elimination"
                >Gaussian Elimination</router-link
              >
            </li>
            <li>
              <router-link to="/gauss-integration"
                >Gauss Integration</router-link
              >
            </li>
            <li><router-link to="/gauss-seidel">Gauss Seidel</router-link></li>
            <li>
              <router-link to="/gradient-descent">Gradient Descent</router-link>
            </li>
            <li>
              <router-link to="/graphical-method">Graphical Method</router-link>
            </li>
            <li>
              <router-link to="/jacobi-iteration">Jacobi Iteration</router-link>
            </li>
            <li>
              <router-link to="/lagrange-interpolation"
                >Lagrange Interpolation</router-link
              >
            </li>
            <li>
              <router-link to="/lu-decomposition">LU Decomposition</router-link>
            </li>
            <li>
              <router-link to="/multiple-regression"
                >Multiple Regression</router-link
              >
            </li>
            <li>
              <router-link to="/newton-raphson">Newton Raphson</router-link>
            </li>
            <li>
              <router-link to="/numerical-integration"
                >Numerical Integration</router-link
              >
            </li>
            <li>
              <router-link to="/polynomial-regression"
                >Polynomial Regression</router-link
              >
            </li>
            <li>
              <router-link to="/simple-regression"
                >Simple Regression</router-link
              >
            </li>
            <li>
              <router-link to="/romberg-integration"
                >Romberg Integration</router-link
              >
            </li>
            <li>
              <router-link to="/secant-method">Secant Method</router-link>
            </li>
            <li>
              <router-link to="/simpson-iteration"
                >Simpson Iteration</router-link
              >
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      isDropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
  margin-top: 20px;
}

.nav-links {
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
}

.dropdown {
  display: inline-block;
  position: relative;
}

.dropdown-toggle {
  cursor: pointer;
  font-weight: bold;
  padding: 10px 20px;
  font-size: 1.2rem;
  border: 1px solid #333;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s;
}

.dropdown-toggle:hover {
  background-color: #0056b3;
}

.dropdown-menu {
  list-style: none;
  padding: 0;
  margin: 5px 0 0 0;
  position: absolute;
  left: 0;
  right: 0;
  width: 250px;
  text-align: left;
  border: 1px solid #ddd;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.dropdown-menu li {
  padding: 10px;
  font-size: 1.1rem;
}

.dropdown-menu li a {
  text-decoration: none;
  color: #333;
  display: block;
}

.dropdown-menu li a:hover {
  color: #007bff;
  background-color: #f1f1f1;
}
</style>
