<template>
  <div id="app">
    <header>
      <h1>Numerical Methods Application</h1>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
/* General styling for the app */
#app {
  text-align: center;
  font-family: Arial, sans-serif;
  color: #333;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #007bff;
  color: white;
  padding: 1rem;
  text-align: center;
}

header h1 {
  margin: 0;
  font-size: 1.5rem;
}

main {
  flex-grow: 1;
  padding: 2rem;
  background-color: #f9f9f9;
}

/* Remove any footer styling */
footer {
  display: none;
}
</style>
