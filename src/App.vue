<template>
  <div id="app">
    <Navigation />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'App',
  components: {
    Navigation
  }
  
}
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
  }
</style>