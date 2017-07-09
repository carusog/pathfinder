<template>
  <div class="tile-container">
    <div class="tile" :class="{'winning': isWinning}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'tileCoords',
    'tileStyles',
    'isWinning'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tile-container {
  float: left;
  height: 100%;
  background-color: red;
}
.tile {
  color: white;
  width: 100%;
  height: 100%;
  border: 1px solid white;
  background-color: #35495e;
}
.tile:hover, .tile:active {
  background-color: #253341;
}
.winning {
  background-color: #41b883;
}
</style>
