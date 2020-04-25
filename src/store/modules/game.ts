import { Game, Player } from '@/models/localModels'
import { GameServer } from '@/models/serverModels'

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle<T> (a: Array<T>): Array<T> {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
const icons = shuffle([
  'fa-paw',
  'fa-dragon',
  'fa-feather-alt',
  'fa-fish',
  'fa-crow',
  'fa-hippo',
  'fa-frog',
  'fa-horse-head'
])
const colors = shuffle([
  '#0042fd',
  '#b3141c',
  '#00a760',
  '#fb890c',
  '#53017e',
  '#e9e029',
  '#1ba7e8',
  '#a56a40'
])

export function initialState (): Game {
  return {
    id: null,
    board: null,
    started: false,
    finished: false,
    height: 0,
    width: 0,
    nbPlayers: 0,
    playerIdToPlay: 0,
    players: null,
    winnersIds: [],
    lastPlayedTurn: null
  }
}

export const getters = {
  gameDefined: (state: Game) => state.id != null,
  nbPlayersJoined: (state: Game) => state.players ? Object.keys(state.players).length : 0,
  allPlayersJoined: (state: Game, getters: any) => getters.nbPlayersJoined === state.nbPlayers,
  gamePlayable: (state: Game, getters: any) => getters.allPlayersJoined && !state.finished
}

export const actions = {}

export const mutations = {
  setGame (state: Game, gameServer: GameServer) {
    state.id = gameServer.id
    state.board = gameServer.board
    state.started = gameServer.started
    state.finished = gameServer.finished
    state.height = gameServer.height
    state.width = gameServer.width
    state.nbPlayers = gameServer.nbPlayers
    state.playerIdToPlay = gameServer.playerIdToPlay
    const players: Record<number, Player> = {}
    let i = 0
    for (const playerId in gameServer.players) {
      players[playerId] = {
        ...gameServer.players[playerId],
        index: i,
        icon: icons[i],
        color: colors[i]
      }
      i++
    }
    state.players = players
    state.winnersIds = gameServer.winnersIds
    state.lastPlayedTurn = gameServer.lastPlayedTurn == null
      ? null
      : {
        playerId: gameServer.lastPlayedTurn.playerId,
        x: gameServer.lastPlayedTurn.x,
        y: gameServer.lastPlayedTurn.y,
        vertical: gameServer.lastPlayedTurn.vertical
      }
  },

  reset (state: Game) {
    const s = initialState()
    // Loop on keys instead of "state = initialState()" as reactivity will be loss
    Object.keys(s).forEach((key) => {
      (state as any)[key] = (s as any)[key]
    })
  }
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}
