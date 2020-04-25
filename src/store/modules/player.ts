import { UserServer } from '@/models/serverModels'
import { User } from '@/models/localModels'

export function initialState () {
  return {
    id: null,
    name: null,
    jwt: null
  }
}

export const getters = {
  userDefined: (state: User) => state.id && state.name && state.jwt
}

export const actions = {}

export const mutations = {
  setUser (state: any, user: UserServer) {
    state.id = user.id
    state.name = user.name
    state.jwt = user.jwt
  }
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}
