<template>
  <v-container>
    <v-row>
      <v-col cols="12">
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

  async newGame () {
    await gameHttpEndpoint.createGame(this.nbPlayersInput, this.widthInput, this.heightInput)
    this.$router.push({ name: 'SimpleGameView', params: { id: this.gameId } })
  }
}
</script>

<style scoped>

</style>
