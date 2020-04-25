import Vue from 'vue'
import Vuex from 'vuex'
import game from './modules/game'
import messages from './modules/messages'
import player from './modules/player'
import { StoreType } from '@/models/localModels'

Vue.use(Vuex)

export default new Vuex.Store<StoreType>({
  mutations: {},
  actions: {},
  modules: {
    game,
    messages,
    player
  }
})
