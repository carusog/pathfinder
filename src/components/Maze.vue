<template>
  <div class="maze">
    <div class="maze--board">
      <div class="tile-row"
        v-for="(row, rowIndex) in tilesNumber"
        :key="row" :style="rowStyles">
        <tile v-for="(tile, tileIndex) in tilesNumber"
          :key="tile"
          :tileIndex="setIndex(rowIndex, tileIndex)"
          :tileStyles="tileStyles"></tile>
      </div>
    </div>
  </div>
</template>

<script>
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
    setIndex (rowIndex, tileIndex) {
      return rowIndex.toString() + tileIndex.toString()
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
}
</style>
