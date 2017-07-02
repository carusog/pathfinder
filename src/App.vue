<template>
  <div id="app">

    <header>
      <h1 class="page-title">PathFindr</h1>
      <h2>Level {{gameLevel}} ({{cols}}&times;{{rows}})</h2>
    </header>

    <button @click="newGame" class="btn" :class="{'btn-hidden': !isNewGame}">
      Start a new game
      <span v-if="showTimer">{{time}}</span>
    </button>

    <maze :rows="rows" :cols="cols" :tiles="tiles"></maze>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Maze from './components/Maze'

export default {
  name: 'app',
  components: {
    Maze
  },
  computed: {
    ...mapGetters([
      'gameLevel',
      'rows',
      'cols',
      'seconds',
      'tiles'
    ]),
    time () {
      return this.$store.state.seconds
    }
  },
  data () {
    return {
      isNewGame: true,
      showTimer: false
    }
  },
  methods: {
    startTimer () {
      var vm = this
      var timer = null

      timer = setInterval(function () {
        if (vm.time === 0) {
          vm.isNewGame = false
          return clearInterval(timer)
        }
        vm.time -= 1
      }, 1000)
    },
    setTiles () {
      console.log('setTiles START')
      let index = 0
      for (let row = 0, rows = this.rows; row < rows; row++) {
        console.log(`current INDEX: ${index}`)
        for (let col = 0, cols = this.cols; col < cols; col++) {
          let canGo = {
            top: false,
            right: true,
            bottom: true,
            left: true
          }
          // if the first column, the path can move only to the right or to the bottom
          if (col === 0) {
            canGo.left = false
          }
          if (col === (cols - 1)) {
            // if the last column, the path can move only to the left or to the bottom
            canGo.left = false
          }
          if (row === (rows - 1)) {
            // if the any other column, the path can move freely
            canGo.bottom = false
          }
          this.$store.commit('newTile', {
            id: index,
            coords: [col, row],
            canGo: canGo,
            isWinning: false
          })
          index++
        }
      }
    },
    newGame () {
      this.showTimer = true
      this.startTimer()
    }
  },
  created () {
    this.setTiles()
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.btn {
  height: 30px;
  line-height: 30px;
  border-radius: 3px;
  background-color: #efefef;
  transition: all 1s;
  opacity: 1;
  border: none;
  margin-bottom: 30px;
}

.btn-hidden {
  opacity: 0;
}
</style>
