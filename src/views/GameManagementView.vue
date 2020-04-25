<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-form ref="form">
          <v-card tile>
            <v-card-title>
              Nouvelle partie
            </v-card-title>
            <v-card-text>
              <v-slider
                v-model="nbPlayersInput"
                label="Nombre de joueurs"
                thumb-label="always"
                :thumb-size="24"
                ticks
                :min="2"
                :max="8"
              />
              <v-slider
                v-model="widthInput"
                label="Largeur de grille"
                thumb-label="always"
                :thumb-size="24"
                ticks
                :min="2"
                :max="15"
              />
              <v-slider
                v-model="heightInput"
                label="Hauteur de grille"
                thumb-label="always"
                :thumb-size="24"
                ticks
                :min="2"
                :max="15"
              />
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="success"
                class="mr-4"
                @click="newGame"
              >
                Créer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-card tile>
          <v-form
            ref="form"
            v-model="gameIdValid"
          >
            <v-card-title>Rejoindre une partie</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="gameIdInput"
                :rules="gameIdRules"
                label="Identifiant de la partie"
                required
              />
            </v-card-text>
            <v-card-actions>
              <v-btn
                :disabled="!gameIdValid"
                color="success"
                class="mr-4"
                @click="joinGame"
              >
                Rejoindre
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import { Component, Vue } from 'vue-property-decorator'
import gameHttpEndpoint from '@/io/GameHttpEndpoint'

@Component({
  computed: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...mapState({ gameId: (state: any) => state.game.id }),
    ...mapState('player', ['name'])
  }
})
export default class GameManagementView extends Vue {
  // From vuex mappings
  gameId!: string

  nbPlayersInput = 2
  widthInput = 10
  heightInput = 10

  gameIdInput = ''
  gameIdValid = false
  gameIdRules = [
    (v: string) => !!v || 'L’ID de partie obligatoire',
    (v: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v.trim()) || 'L’ID de partie est invalide'
  ]

  async newGame () {
    await gameHttpEndpoint.createGame(this.nbPlayersInput, this.widthInput, this.heightInput)
    this.$router.push({ name: 'SimpleGameView', params: { id: this.gameId } })
  }

  joinGame () {
    this.$router.push({ name: 'SimpleGameView', params: { id: this.gameIdInput.trim() } })
  }
}
</script>

<style scoped>

</style>
