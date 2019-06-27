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

<style lang="sass">
  body
    padding: 0px
    margin: 0px
  #app
    font-family: Rubik, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
  li, p, button
    font-family: Rubik, Helvetica, Arial, sans-serif
    font-weight: lighter
    font-size: 30px
    margin: 10px
</style>
