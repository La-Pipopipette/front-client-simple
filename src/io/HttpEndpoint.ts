import store from '@/store'

export class HttpEndpoint {
  private readonly baseUrl: string

  constructor (baseUrl: string) {
    this.baseUrl = baseUrl
  }

  protected async post (body: BodyInit | null, endpoint = '') {
    return await HttpEndpoint.requestToJson(`${this.baseUrl}/${endpoint}`, {
      method: 'POST',
      body: body
    })
  }

  protected async postJson (json: object, endpoint = '') {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${store.state.player.jwt}`)
    return await HttpEndpoint.requestToJson(`${this.baseUrl}/${endpoint}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(json)
    })
  }

  private static async requestToJson (url: string, init: RequestInit) {
    try {
      const response = await fetch(url, init)
      return await response.json()
    } catch (e) {
      console.error(e) // TODO display relevant errors to user
    }
  }
}
