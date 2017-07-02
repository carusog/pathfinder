import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    level: 1,
    rows: 4,
    cols: 4,
    seconds: 5,
    isNewGame: false,
    tiles: [],
    winningPath: []
  },
  getters: {
    gameLevel: (state) => state.level,
    rows: (state) => state.rows,
    cols: (state) => state.cols,
    mazeIndex: (state, getters) => { return getters.cols * getters.rows },
    seconds: (state) => state.seconds,
    isNewGame: (state) => state.isNewGame,
    tiles: (state) => state.tiles,
    tilesFirstRow: (state) => state.tiles.filter(tile => tile.coords[1] === 0)
  },
  mutations: {
    isNewGame (state) {
      state.isNewGame = true
    },
    newTile (state, tile) {
      state.tiles.push(tile)
    },
    setWinningTile (state, tile) {
      state.tiles[tile].isWinning = true
    }
  },
  actions: {}
})
