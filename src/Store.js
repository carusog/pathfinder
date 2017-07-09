import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    debug: false,
    level: 1,
    rows: 4,
    cols: 4,
    seconds: 5,
    isNewGame: true,
    tiles: [],
    winningPath: [],
    showPath: false,
    pathIsReady: false
  },
  getters: {
    gameLevel: (state) => state.level,
    rows: (state) => state.rows,
    cols: (state) => state.cols,
    mazeIndex: (state, getters) => { return getters.cols * getters.rows },
    seconds: (state) => state.seconds,
    isNewGame: (state) => state.isNewGame,
    tiles: (state) => state.tiles,
    tilesFirstRow: (state) => state.tiles.filter(tile => {
      return tile.coords.y === 0
    }),
    winningPath: state => state.winningPath,
    previousWinningTile: (state) => state.winningPath[state.winningPath.length - 2] || null,
    latestWinningTile: (state) => state.winningPath[state.winningPath.length - 1] || null,
    showPath: state => state.showPath,
    pathIsReady: state => state.pathIsReady
  },
  mutations: {
    isNewGame (state, gameState) {
      state.isNewGame = gameState
    },
    showPath (state, pathVisibility) {
      state.showPath = pathVisibility
    },
    newTile (state, tile) {
      state.tiles.push(tile)
    },
    setWinningTile (state, tile) {
      let winningTile = state.tiles[tile]
      let insertionDelay = state.winningPath.length * (1000 / state.rows)
      setTimeout(function () {
        winningTile.isWinning = true
        if (winningTile.coords.y === state.rows) {
          state.pathIsReady = true
        }
      }, insertionDelay)
      state.winningPath.push(winningTile)
    },
    pathIsReady (state) {
      state.pathIsReady = true
    }
  },
  actions: {}
})
