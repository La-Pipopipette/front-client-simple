import store from '@/store'
import { HttpEndpoint } from '@/io/HttpEndpoint'

class GameHttpEndpoint extends HttpEndpoint {
  constructor () {
    super(process.env.VUE_APP_SIMPLE_GAME_ENDPOINT)
  }

  async createGame (nbPlayers: number, width: number, height: number) {
    const game = await this.postJson({
      nbPlayers: nbPlayers,
      width: width,
      height: height
    })
    store.commit('game/setGame', game)
  }
}

export default new GameHttpEndpoint()
