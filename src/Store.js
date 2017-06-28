import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    level: 1,
    tilesNumber: 4,
    tilesIndex: 0,
    tiles: []
  },
  mutations: {
    newTile (state, tile) {
      state.tiles.push(tile)
    }
  },
  actions: {}
})
