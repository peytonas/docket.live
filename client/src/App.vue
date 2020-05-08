<template>
  <div id="app">
    <router-view />
    <toaster />
  </div>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}
::-webkit-scrollbar {
  display: none;
}
</style>
