<template>
  <div class="maze">
    <h1>Store: {{this.$store.state.level}}</h1>
    <div class="maze--board">
      <div class="tile-row"
        v-for="(row, rowIndex) in tilesNumber"
        :key="row" :style="rowStyles">
        <tile v-for="(tile, columnIndex) in tilesNumber"
          :key="tile"
          :tileCoords="setIndex(columnIndex, rowIndex)"
          :tileStyles="tileStyles"
          :isWinning="setWinning"></tile>
      </div>
    </div>
  </div>
</template>

<script>
import Store from '../main.js'
import Tile from './Tile'

export default {
  name: 'maze',
  props: [
    'tilesNumber'
  ],
  components: {
    Tile
  },
  computed: {
    rowStyles () {
      return {
        height: 100 / this.tilesNumber + '%'
      }
    },
    tileStyles () {
      return {
        width: 100 / this.tilesNumber + '%'
      }
    }
  },
  methods: {
    setIndex (columnIndex, rowIndex) {
      return [columnIndex + 1, rowIndex + 1]
    },
    setWinning () {
      return
    }
  },
  data () {
    return {
      store: Store
    }
  }
}
</script>

<style scoped>
h2 {
  font-weight: normal;
}
.maze--board {
  width: 500px;
  height: 500px;
  background-color: #ccc;
  margin: auto;
  max-width: 90vw;
  max-height: auto;
}
</style>
