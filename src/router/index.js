import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import OnePointIteration from '../components/OnePointIteration.vue';
import Bisection from '../components/Bisection.vue';
import BackwardDivided from '../components/BackwardDivided.vue';
import CentralDividedDifference from '../components/CentralDividedDifference.vue';
import CompositeSimpson from '../components/CompositeSimpson.vue';
import CompositeTrapezoidal from '../components/CompositeTrapezoidal.vue';
import ConjugateMethod from '../components/ConjugateMethod.vue';
import CramersRule from '../components/CramersRule.vue';
import DefiniteIntegration from '../components/DefiniteIntegration.vue';
import DoubleIntegration from '../components/DoubleIntegration.vue';
import ExactIntegration from '../components/ExactIntegration.vue';
import FalsePosition from '../components/FalsePosition.vue';
import FirstDividedDifference from '../components/FirstDividedDifference.vue';
import ForwardDividedDifference from '../components/ForwardDividedDifference.vue';
import GaussianElimination from '../components/GaussianElimination.vue';
import GaussIntegration from '../components/GaussIntegration.vue';
import GaussSeidel from '../components/GaussSeidel.vue';
import GradientDescent from '../components/GradientDescent.vue';
import GraphicalMethod from '../components/GraphicalMethod.vue';
import JacobiIteration from '../components/JacobiIteration.vue';
import LagrangeInterpolation from '../components/LagrangeInterpolation.vue';
import LUDecomposition from '../components/LUDecomposition.vue';
import MultipleRegression from '../components/MultipleRegression.vue';
import NewtonRaphson from '../components/NewtonRaphson.vue';
import NumericalIntegration from '../components/NumericalIntegration.vue';
import PolynomialRegression from '../components/PolynomialRegression.vue';
import SimpleRegression from '../components/SimpleRegression.vue'; // Changed name to SimpleRegression
import RombergIntegration from '../components/RombergIntegration.vue';
import SecantMethod from '../components/SecantMethod.vue';
import SimpsonIteration from '../components/SimpsonIteration.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  {
    path: '/one-point-iteration',
    name: 'OnePointIteration',
    component: OnePointIteration,
  },
  { path: '/bisection', name: 'Bisection', component: Bisection },
  {
    path: '/backward-divided',
    name: 'BackwardDivided',
    component: BackwardDivided,
  },
  {
    path: '/central-divided-difference',
    name: 'CentralDividedDifference',
    component: CentralDividedDifference,
  },
  {
    path: '/composite-simpson',
    name: 'CompositeSimpson',
    component: CompositeSimpson,
  },
  {
    path: '/composite-trapezoidal',
    name: 'CompositeTrapezoidal',
    component: CompositeTrapezoidal,
  },
  {
    path: '/conjugate-method',
    name: 'ConjugateMethod',
    component: ConjugateMethod,
  },
  { path: '/cramers-rule', name: 'CramersRule', component: CramersRule },
  {
    path: '/definite-integration',
    name: 'DefiniteIntegration',
    component: DefiniteIntegration,
  },
  {
    path: '/double-integration',
    name: 'DoubleIntegration',
    component: DoubleIntegration,
  },
  {
    path: '/exact-integration',
    name: 'ExactIntegration',
    component: ExactIntegration,
  },
  { path: '/false-position', name: 'FalsePosition', component: FalsePosition },
  {
    path: '/first-divided-difference',
    name: 'FirstDividedDifference',
    component: FirstDividedDifference,
  },
  {
    path: '/forward-divided-difference',
    name: 'ForwardDividedDifference',
    component: ForwardDividedDifference,
  },
  {
    path: '/gaussian-elimination',
    name: 'GaussianElimination',
    component: GaussianElimination,
  },
  {
    path: '/gauss-integration',
    name: 'GaussIntegration',
    component: GaussIntegration,
  },
  { path: '/gauss-seidel', name: 'GaussSeidel', component: GaussSeidel },
  {
    path: '/gradient-descent',
    name: 'GradientDescent',
    component: GradientDescent,
  },
  {
    path: '/graphical-method',
    name: 'GraphicalMethod',
    component: GraphicalMethod,
  },
  {
    path: '/jacobi-iteration',
    name: 'JacobiIteration',
    component: JacobiIteration,
  },
  {
    path: '/lagrange-interpolation',
    name: 'LagrangeInterpolation',
    component: LagrangeInterpolation,
  },
  {
    path: '/lu-decomposition',
    name: 'LUDecomposition',
    component: LUDecomposition,
  },
  {
    path: '/multiple-regression',
    name: 'MultipleRegression',
    component: MultipleRegression,
  },
  { path: '/newton-raphson', name: 'NewtonRaphson', component: NewtonRaphson },
  {
    path: '/numerical-integration',
    name: 'NumericalIntegration',
    component: NumericalIntegration,
  },
  {
    path: '/polynomial-regression',
    name: 'PolynomialRegression',
    component: PolynomialRegression,
  },
  {
    path: '/simple-regression',
    name: 'SimpleRegression',
    component: SimpleRegression,
  }, // Updated route path and name
  {
    path: '/romberg-integration',
    name: 'RombergIntegration',
    component: RombergIntegration,
  },
  { path: '/secant-method', name: 'SecantMethod', component: SecantMethod },
  {
    path: '/simpson-iteration',
    name: 'SimpsonIteration',
    component: SimpsonIteration,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
