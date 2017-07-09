<template>
  <div id="app">

    <header>
      <h1 class="page-title">PathFindr</h1>
      <h2>Level {{gameLevel}} ({{cols}}&times;{{rows}})</h2>
    </header>

    <button @click="newGame" class="btn btn-start-game" :class="{'btn-hidden': !isNewGame, 'countdown': countDown}">
      Start a new game
      <span v-if="countDown">{{time}}</span>
    </button>

    <maze :rows="rows" :cols="cols" :tiles="tiles" :class="{'show-path': showPath}"></maze>

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
      'isNewGame',
      'tiles',
      'tilesFirstRow',
      'winningPath',
      'previousWinningTile',
      'latestWinningTile',
      'showPath',
      'pathIsReady'
    ])
  },
  data () {
    return {
      countDown: false,
      time: 5
    }
  },
  methods: {
    setTiles () {
      console.log('setTiles START')
      let index = 0
      for (let row = 1, rows = this.rows; row <= rows; row++) {
        console.log(`current INDEX: ${index}`)
        for (let col = 1, cols = this.cols; col <= cols; col++) {
          let canGo = []
          // can go left?
          if (col === cols || col !== 1) {
            // if the last column, or not on the first column,
            // the path can move to the left
            canGo.push(index - 1)
          }
          // can go right?
          if (col === 1 || col !== cols) {
            // if the first column, or not on the last column,
            // the path can move to the right
            canGo.push(index + 1)
          }
          // can go bottom?
          if (row !== rows) {
            // if not on the last row
            // the path can move to bottom
            canGo.push(index + this.cols)
          }
          this.$store.commit('newTile', {
            id: index,
            coords: {x: col, y: row},
            canGo: canGo,
            isWinning: false
          })
          index++
        }
      }
    },
    setNextWinningTile () {
      let nextAvailableMoves
      // if on the last row, we stop
      if (this.previousWinningTile === null) {
        // nextAvailableMoves = this.latestWinningTile.canGo
        // I didn't like the solution above where the first row
        // would have been cluttered with possible randome winning sibling tiles
        // so I'm setting up next to the first winning tile on the second row
        this.$store.commit('setWinningTile', this.latestWinningTile.id + this.cols)
        return
      } else {
        nextAvailableMoves = this.latestWinningTile.canGo.filter(move => move !== this.previousWinningTile.id)
      }
      let randomMove = nextAvailableMoves[Math.floor(Math.random() * nextAvailableMoves.length)]
      this.$store.commit('setWinningTile', randomMove)
    },
    startTimer () {
      let vm = this
      let timer = null

      timer = setInterval(function () {
        if (vm.pathIsReady) {
          if (vm.time === 0) {
            vm.$store.commit('isNewGame', false)
            vm.$store.commit('showPath', false)
            return clearInterval(timer)
          }
          vm.time -= 1
        }
      }, 1000)
    },
    newGame () {
      // if there is no winning tile, then, we are choosing the first one
      if (this.latestWinningTile === null) {
        let randomIdFromFirstRow = Math.floor(Math.random() * this.cols)
        this.$store.commit('setWinningTile', randomIdFromFirstRow)
      }
      while (this.latestWinningTile.coords.y !== this.rows) {
        this.setNextWinningTile()
      }
      this.$store.commit('showPath', true)
      this.countDown = true
      this.startTimer()
    }
  },
  created () {
    this.setTiles()
  }

}
</script>

<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #35495e;
  margin-top: 60px;
}

.btn {
  font-size: 1em;
  border-radius: 3px;
  background-color: #3b8070;
  color: white;
  opacity: 1;
  border: none;
  margin-bottom: 30px;
  padding: 15px 20px;
  outline: none;
  transition: all 1s ease-in-out;
}

.btn.countdown {
  background-color: darkred;
}

.btn.countdown:hover {
  background-color: darkred;
}

.btn:hover {
  cursor: pointer;
  background-color: #41b883;
}

.btn-hidden {
  opacity: 0;
}
</style>
