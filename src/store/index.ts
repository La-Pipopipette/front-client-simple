import Vue from 'vue'
import Vuex from 'vuex'
import game from './modules/game'
import messages from './modules/messages'
import player from './modules/player'
import { State } from '@/models/localModels'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage
})

const vuexPersist = new VuexPersistence<State>({
  strictMode: process.env.NODE_ENV !== 'production',
  storage: window.localStorage,
  reducer: state => ({ player: state.player }), // only save player
  filter: mutation => (mutation.type === 'setUser')
})

export default new Vuex.Store<State>({
  mutations: {
    // This mutation **MUST** be named "RESTORE_MUTATION"
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION
  },
  actions: {},
  modules: {
    game,
    messages,
    player
  },
  plugins: [vuexLocal.plugin],
  strict: process.env.NODE_ENV !== 'production'
})
