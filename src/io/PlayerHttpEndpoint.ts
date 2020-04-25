import store from '@/store'
import { HttpEndpoint } from '@/io/HttpEndpoint'

class PlayerHttpEndpoint extends HttpEndpoint {
  constructor () {
    super(process.env.VUE_APP_PLAYER_ENDPOINT)
  }

  async createPlayer (name: string) {
    const player = await this.post(name)
    store.commit('player/setUser', player)
  }
}

export default new PlayerHttpEndpoint()
