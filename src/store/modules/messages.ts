export function initialState () {
  return {
    text: null,
    type: 'error',
    show: false
  }
}

export const getters = {}

export const actions = {}

export const mutations = {
  setMessage (state: any, message: string, type = 'error') {
    state.text = message
    state.type = type
    state.show = true
  },
  setShow (state: any, show: boolean) {
    state.show = show
  }
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}
