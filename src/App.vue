<template>
  <div id="app" class="min-h-screen bg-white dark:bg-gray-900">
    <SheetMusicDisplay />
  </div>
</template>

<script setup lang="ts">
import SheetMusicDisplay from './components/SheetMusicDisplay.vue'
</script>

<style>
:root {
  color-scheme: light dark;
}

body {
  background: transparent;
  margin: 0;
  padding: 0;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>