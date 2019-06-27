<template lang="pug">
div.results
  h1 Результаты
  table
    tr
      th(@click="sort('number')")
        template(v-if="currentSort === 'number'")
          template(v-if="reversedDirection") ▲ №
          template(v-else) ▼ №
        template(v-else) №
      th(@click="sort('userAnswer')")
        template(v-if="currentSort === 'userAnswer'")
          template(v-if="reversedDirection") ▲ Слово
          template(v-else) ▼ Слово
        template(v-else) Слово
      th(@click="sort('time')")
        template(v-if="currentSort === 'time'")
          template(v-if="reversedDirection") ▲ Время
          template(v-else) ▼ Время
        template(v-else) Время
    tr(v-for='result in sortedResults')
      td {{ result.number }}
      td {{ result.userAnswer }}
      td {{ result.time }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Results',
  data () {
    return {
      currentSort: 'number',
      reversedDirection: false
    }
  },
  methods: {
    sort (field) {
      if (field === this.currentSort) {
        this.reversedDirection = !this.reversedDirection
      }
      this.currentSort = field
    }
  },
  computed: {
    ...mapGetters({
      results: 'getResults'
    }),
    sortedResults (state) {
      return state.results.sort((a, b) => {
        let modifier = 1
        if (state.reversedDirection) modifier = -1
        if (a[state.currentSort] < b[state.currentSort]) return -1 * modifier
        if (a[state.currentSort] > b[state.currentSort]) return modifier
        return 0
      })
    }
  }
}
</script>

<style scoped lang="sass">
div.results
  padding: 20px 10vw
  display: flex
  justify-content: center
  flex-direction: column
  table
    th
      cursor: pointer
    th, td
      text-align: left
      padding-left: 5px
      background-color: #2c3e50
      color: white
</style>
