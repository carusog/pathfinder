<template>
  <div class="maze">
    <div class="maze__board">
      <tile v-for="tile in tiles" :key="tile.id"
        :style="tileStyles"
        :tileCoords="tile.coords"
        :isWinning="tile.isWinning">
        {{tile.id}}
        <br>
        {{tile.coords}}
        <br>
        {{tile.canGo}}
      </tile>
    </div>
  </div>
</template>

<script>
import Tile from './Tile'

export default {
  name: 'maze',
  components: {
    Tile
  },
  props: [
    'rows',
    'cols',
    'tiles'
  ],
  computed: {
    tileStyles () {
      return {
        width: 100 / this.cols + '%',
        height: 100 / this.rows + '%'
      }
    }
  }
}
</script>

<style scoped>
h2 {
  font-weight: normal;
}
.maze__board {
  width: 300px;
  height: 300px;
  background-color: #ccc;
  margin: auto;
  max-width: 90vw;
  max-height: auto;
  transition: width 1s ease-in-out, height 1s ease-in-out;
}
@media (min-width: 640px) {
  .maze__board {
    width: 500px;
    height: 500px;
  }
}
</style>
