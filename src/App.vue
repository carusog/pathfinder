<template>
  <div id="app">

    <header>
      <h1 class="page-title">PathFindr</h1>
      <h2>Level {{level}} ({{tiles}}&times;{{tiles}})</h2>
    </header>

    <button @click="newGame"
      class="btn"
      :class="{'btn-hidden': !isNewGame}">
        Start a new game <span v-if="showTimer">{{time}}</span>
    </button>

    <maze :tilesNumber="tiles"></maze>

  </div>
</template>

<script>
import Maze from './components/Maze'

export default {
  name: 'app',
  components: {
    Maze
  },
  computed: {
    level () {
      return this.$store.state.level
    }
  },
  data () {
    return {
      tiles: this.$store.state.tiles,
      time: 5,
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
    newGame () {
      this.showTimer = true
      this.startTimer()
    }
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
