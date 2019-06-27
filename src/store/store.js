import Vue from 'vue'
import Vuex from 'vuex'
import { GET_RANDOM_WORD } from './actions.type'
import { ADD_RESULT, TURN_OFF_GAME, TURN_ON_GAME } from './mutations.type'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    results: [],
    isLoading: true,
    isStarted: false
  },
  getters: {
    getResults (state) {
      return state.results
    },
    isLoading (state) {
      return state.isLoading
    }
  },
  actions: {
    init ({ commit }) {
      commit(TURN_ON_GAME)
    },
    async [GET_RANDOM_WORD] (context, number) {
      this.isLoading = true
      return Vue.axios.get(number.toString())
        .then((response) => {
          this.isLoading = false
          return response.data
        })
    }
  },
  mutations: {
    [ADD_RESULT] (state, result) {
      state.results.push(result)
      state.isLoading = true
    },
    [TURN_ON_GAME] (state) {
      state.result = []
      state.isStarted = true
    },
    [TURN_OFF_GAME] (state) {
      state.isStarted = false
    }
  }
})

export default store
