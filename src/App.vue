<template>
  <div id="app">
    <WordGame/>
  </div>
</template>

<script>
import WordGame from './components/WordGame.vue'

export default {
  name: 'App',
  components: {
    WordGame
  },
  created () {
    this.$store.dispatch('init')
  }
}
</script>
