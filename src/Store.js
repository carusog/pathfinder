import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    level: 1,
    rows: 4,
    cols: 4,
    tilesIndex: 0,
    seconds: 5,
    tiles: []
  },
  getters: {
    gameLevel: (state) => state.level,
    rows: (state) => state.rows,
    cols: (state) => state.cols,
    mazeIndex: (state, getters) => { return getters.cols * getters.rows },
    seconds: (state) => state.seconds,
    tiles: (state) => state.tiles
  },
  mutations: {
    newTile (state, tile) {
      state.tiles.push(tile)
    }
  },
  actions: {}
})
