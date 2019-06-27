<template lang="pug">
  mixin letter(letter)
    template(v-if="!gameOver")
      div.letter(
        @click="addLetter(letter)" v-bind:class="[ letter.position == letter.choose ?  'correct' : '' ]"
      ) {{ letter.letter }}
    template(v-else)
      div.letter_nonclickable {{ letter.letter }}

  mixin letters()
    ul.letters
      li(v-for='letter in unansweredLetters')
        +letter('{{ letter }}')

  mixin answered()
    ul.answered
      li(v-for='letter in answeredLetters')
        +letter('{{ letter }}')

  mixin results(status)
    div.results
      p.title= status
      p
        button(@click="restart") Конечно
      p
        button(@click="showResults") Я уже устал

  div.game-wrapper
    div(v-if="!isStarted")
      button(@click="restart") Новая игра
    template(v-if="isOpenResults")
      Results
    template(v-else)
      div.output
      +letters
      +answered
      div(v-if="gameOver")
        div(v-if="isWin")
          +results('Вы выиграли! Повторить?')
        div(v-else)
          +results('Вы проиграли! Повторить?')
      h1.status {{ time }}
</template>

<script>
import { mapGetters } from 'vuex'
import { GET_RANDOM_WORD } from '../store/actions.type'
import { ADD_RESULT } from '../store/mutations.type'
import Generator from '../tools/Generator.js'
import Timer from '../tools/Timer'
import Results from './Results'

const generator = new Generator(2, 1368)

const shuffleString = word => {
  const list = Array.apply()
  const letters = word.split('')
  letters.map(
    (i, index) => list.push({ letter: i, position: index, choose: undefined })
  )
  return list.sort((a, b) => Math.random() - 0.5)
}

export default {
  name: 'WordGame',
  components: { Results },
  data () {
    return {
      shuffledWord: Array.apply(),
      answer: String(),
      totalSeconds: 0,
      timer: new Timer(),
      isOpenResults: false,
      isStarted: false,
      gamesCounter: 1
    }
  },
  methods: {
    addLetter (letter) {
      // Присваивает позицию для символа,
      // если позиция уже установлена
      // удаляет индекс и пересчитывает порядок
      if (letter.choose !== undefined) {
        letter.choose = undefined
        this.answeredLetters.map((i, index) => {
          i.choose = index
        })
      } else {
        letter.choose = this.answeredLetters.length
      }
    },
    async updateWord () {
      let n = generator.getRandomNumber()
      await this.$store.dispatch(GET_RANDOM_WORD, n)
        .then(data => {
          const obj = data.data
          if (!obj || obj.status !== 10) {
            return this.updateWord()
          }
          const word = obj.name.toUpperCase()
          this.shuffledWord = shuffleString(word)
          this.answer = word
        })
    },
    isCorrectAnswer () {
      // Находит несоответствие,
      // если таковое не найдено - возвращает true
      const notequal = this.answeredLetters.find(i => i.choose !== i.position)
      if (notequal === undefined) return true
    },
    saveResults () {
      // В случае корректного ответа
      // сохраняем результаты в хранилище
      if (
        this.isCorrectAnswer() &&
        this.answeredLetters.length &&
        this.isStarted
      ) {
        let userAnswer = String()
        this.answeredLetters.map(i => {
          userAnswer += i.letter
        })
        this.$store.commit(ADD_RESULT, {
          number: this.gamesCounter,
          time: this.timer.getSeconds(),
          userAnswer: userAnswer,
          answer: this.answer
        })
        ++this.gamesCounter
      }
    },
    restart () {
      this.saveResults()
      this.updateWord().then(() => {
        this.timer.start()
        this.isStarted = true
      })
      this.isOpenResults = false
    },
    stop () {
      // Вызывается когда игра окончена
      this.timer.pause()
    },
    showResults () {
      this.isOpenResults = true
      this.isStarted = false
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading'
    }),
    unansweredLetters (state) {
      return state.shuffledWord.filter(letter => letter.choose === undefined)
    },
    answeredLetters (state) {
      const compareLetters = (a, b) => a.choose - b.choose
      return state.shuffledWord.filter(letter => letter.choose !== undefined).sort(compareLetters)
    },
    gameOver (state) {
      // Игра считается завершенной,
      // если пользователь выставил позиции для всех символов
      const wordlength = state.shuffledWord.length
      return wordlength > 0 && wordlength === this.answeredLetters.length
    },
    isWin () {
      if (this.gameOver) return this.isCorrectAnswer()
      return false
    },
    time (state) {
      return `${state.timer.minutes()}:${state.timer.seconds()}`
    }
  },
  watch: {
    gameOver: {
      handler: function (val) {
        if (val) {
          this.stop()
          this.saveResults()
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
div.game-wrapper
  height: 100vh
  display: flex
  justify-content: center
  text-align: center
  flex-direction: column
  ul
    list-style-type: none
    padding: 0 0 20px 0
    li
      display: inline-block
      margin: 10px 10px
      .letter
        box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.5)
        padding: 10px
        cursor: pointer
        transition: 0.1s
        border-radius: 3px
      .letter:hover
        transform: scale(1.1)
      .letter.correct
        box-shadow: 0px 0px 13px 0px #46729e
  h1
    margin: 5px
  h1.status
    font-size: 10vw
  button
    cursor: pointer
    background-color: #2c3e50
    border: 0
    color: white
    padding: 10px
    border-radius: 3px
    font-weight: bold
    transition: 0.2s transform ease-in-out
  button:hover
    transform: scale(1.05)
</style>
