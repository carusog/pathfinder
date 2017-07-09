<template>
  <div id="app">

    <header>
      <h1 class="page-title">PathFindr</h1>
      <h2>Level {{gameLevel}} ({{cols}}&times;{{rows}})</h2>
    </header>

    <button @click="newGame" class="btn" :class="{'btn-hidden': isNewGame}">
      Start a new game
      <span v-if="countDown">{{time}}</span>
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
      'isNewGame',
      'tiles',
      'tilesFirstRow',
      'previousWinningTile',
      'latestWinningTile'
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
      for (let row = 0, rows = this.rows; row < rows; row++) {
        console.log(`current INDEX: ${index}`)
        for (let col = 0, cols = this.cols; col < cols; col++) {
          let canGo = []
          // can go left?
          if (col === (cols - 1) || col !== 0) {
            // if the last column, or not on the first column,
            // the path can move to the left
            canGo.push(index - 1)
          }
          // can go right?
          if (col === 0 || col !== (cols - 1)) {
            // if the first column, or not on the last column,
            // the path can move to the right
            canGo.push(index + 1)
          }
          // can go bottom?
          if (row !== (rows - 1)) {
            // if not on the last row
            // the path can move to bottom
            canGo.push(index + this.cols)
          }
          this.$store.commit('newTile', {
            id: index,
            coords: {x: col + 1, y: row + 1},
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
        if (vm.time === 0) {
          vm.$store.commit('isNewGame')
          return clearInterval(timer)
        }
        vm.time -= 1
      }, 1000)
    },
    newGame () {
      // if there is no winning tile, then, we are choosing the first one
      if (this.latestWinningTile === null) {
        this.$store.commit('setWinningTile', Math.floor(Math.random() * this.cols))
      }
      while (this.latestWinningTile.coords.y !== this.rows) {
        this.setNextWinningTile()
      }
      // this.countDown = true
      // this.startTimer()
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
  color: #253341;
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
