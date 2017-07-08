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
            canGo.right = false
          }
          if (row === (rows - 1)) {
            // if the any other column, the path can move freely
            canGo.bottom = false
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
    setNext (prev, current) {
      if (!prev) {
        console.log('current: ', current)
        let moves = Object.keys(current.canGo)
        let availableMoves = moves.filter((move) => { return current.canGo[move] === true })
        let nextMove = availableMoves[Math.floor(Math.random() * availableMoves.length)]
        // this.setMove(nextMove, current)
        let leftTile = current.id - 1
        let rightTile = current.id + 1
        let bottomTile = current.id + this.rows
        switch (nextMove) {
          case 'right':
            console.log('selected tile for right: ', this.tiles[rightTile])
            this.$store.commit('setWinningTile', this.tiles[rightTile])
            break
          case 'bottom':
            console.log('selected tile for bottom: ', this.tiles[bottomTile])
            this.$store.commit('setWinningTile', this.tiles[bottomTile])
            break
          case 'left':
            console.log('selected tile for left: ', this.tiles[leftTile])
            this.$store.commit('setWinningTile', this.tiles[leftTile])
            break
          default:
            break
        }
      } else {
        console.log('previous: ', prev.id)
        console.log('current: ', current.id)
      }
    },
    setWinningPath () {
      // if there is no winning tile, then, we are choosing the first one
      if (this.latestWinningTile === null) {
        this.$store.commit('setWinningTile', Math.floor(Math.random() * this.tilesFirstRow.length))
      }
      if (this.latestWinningTile.coords.y === this.row) {
        console.log('Hey, we are on the latest row!!!!')
        console.log(this.latestWinningTile.id)
        return
      } else {
        this.setNext(this.previousWinningTile, this.latestWinningTile)
        console.log('chupa')
      }
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
      this.setWinningPath()
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
