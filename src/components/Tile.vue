<template>
  <div class="tile" :style="tileStyles">
    <div class="tile-container">
      {{ tileIndex }}
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'tileIndex',
    'tileStyles'
  ]
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
