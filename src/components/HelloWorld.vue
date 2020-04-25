<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-text-field
            v-model="formName"
            :counter="32"
            :rules="nameRules"
            label="Name"
            required
          />
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Validate
          </v-btn>
        </v-form>
        <v-btn
          :disabled="!jwt"
          color="success"
          class="mr-4"
          @click="createGame"
        >
          New Game
        </v-btn>
      </v-col>
    </v-row>
    <v-col cols="12">
      <p>User : {{ id }} – {{ name }}</p>
      <pre>{{ jwt }}</pre>
    </v-col>
    <v-col cols="12">
      <Game v-if="gameDefined" />
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import store from '@/store'
import { mapGetters, mapState } from 'vuex'
import PGame from '@/components/PGame.vue'

@Component({
  computed: {
    ...mapGetters('game', ['gameDefined']),
    ...mapState('player', ['id', 'name', 'jwt'])
  },
  components: { Game: PGame }
})
export default class HelloWorld extends Vue {
  id!: string
  name!: string
  jwt!: string
  gameDefined!: boolean

  nameRules = [
    (v: string) => !!v || 'Name is required',
    (v: string) => (v && v.length <= 32) || 'Name must be less than 32 characters'
  ]

  formName = ''

  valid = true

  async validate () {
    try {
      const response = await fetch('http://localhost:10000', {
        method: 'POST',
        body: this.formName
      })
      const data = await response.json()
      store.commit('player/setUser', data)
    } catch (e) {
      console.error(e)
    }
  }

  async createGame () {
    try {
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', `Bearer ${this.jwt}`)
      const response = await fetch('http://localhost:10001', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          nbPlayers: 2,
          width: 10,
          height: 10
        })
      })
      const data = await response.json()
      store.commit('game/setGame', data)
      // const connexion = new GameWebSocket()
      // connexion.connect()
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
