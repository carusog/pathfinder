<template>
  <div class="tile" :style="tileStyles">
    <div class="tile-container">
      {{tileCoords}}
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'tileCoords',
    'tileStyles'
  ],
  data () {
    return {
      directions: []
    }
  },
  created () {
    // if the first column, the path can move only to the right or to the bottom
    if (this.tileCoords[0] === 1) {
      this.directions.push('R', 'B')
    } else if (this.tileCoords[0] === this.$store.state.tilesNumber) {
      // if the last column, the path can move only to the left or to the bottom
      this.directions.push('L', 'B')
    } else if (this.tileCoords[0] > 1 || this.tileCoords[0] < this.$store.state.tilesNumber) {
      // if the any other column, the path can move freely
      this.directions.push('L', 'B', 'R')
    }
    this.$store.state.tilesIndex += 1
    this.$store.commit('newTile', {
      id: this.$store.state.tilesIndex,
      tileCoords: this.tileCoords,
      directions: this.directions
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tile {
  float: left;
  height: 100%;
  background-color: red;
}
.tile-container {
  color: white;
  width: 100%;
  height: 100%;
  border: 1px solid white;
  background-color: #2c3e50;
}
</style>
