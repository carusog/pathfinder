<template>
  <div class="tile" :style="tileStyles">
    <div class="tile-container" :class="{'winning': isWinning}">
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
      directions: [],
      id: null
    }
  },
  // methods: {
  //   isWinning () {
  //     return this.$store.state.tiles[this.index].isWinning
  //   }
  // }
  computed: {
    isWinning: true
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
.winning {
  background-color: orange;
}
</style>
