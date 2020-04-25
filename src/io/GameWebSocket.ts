import store from '@/store'

export default class GameWebSocket {
  private static instance: GameWebSocket

  webSocket: WebSocket|undefined
  gameId: string

  private constructor (gameId: string) {
    this.gameId = gameId
  }

  public static init (gameId: string) {
    if (!GameWebSocket.instance || GameWebSocket.getInstance().gameId !== gameId) {
      GameWebSocket.instance = new GameWebSocket(gameId)
    }
  }

  public static getInstance (): GameWebSocket {
    return GameWebSocket.instance
  }

  connect () {
    this.webSocket = new WebSocket(`${process.env.VUE_APP_SIMPLE_GAME_ENDPOINT_WS}/${this.gameId}/${store.state.player.id}?jwt=${store.state.player.jwt}`)

    this.webSocket.onmessage = (event) => {
      const json = JSON.parse(event.data)
      console.log('Got from WebSocket:', json)
      // TODO check cleaner way to do this
      if (json.board) {
        store.commit('game/setGame', json)
      } else if (json.localizedMessage) {
        store.commit('messages/setMessage', json.localizedMessage)
      }
    }
  }

  playTurn (x: number, y: number, vertical: boolean) {
    if (this.webSocket) {
      this.webSocket.send(
        JSON.stringify({
          playerId: store.state.player.id,
          x: x,
          y: y,
          vertical: vertical
        })
      )
    } else {
      console.error("Can't play turn because no WebSocket")
    }
  }

  leave () {
    if (this.webSocket) {
      this.webSocket.close()
    }
  }
}
