<template>
  <div id="app">
    <Navigation />
    <router-view />
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
    background-color: #282A2C; 
  }
</style>
