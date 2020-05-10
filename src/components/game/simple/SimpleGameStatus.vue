<template>
  <v-card tile>
    <v-card-title>
      Informations et joueurs
    </v-card-title>
    <template v-if="!allPlayersJoined">
      <v-alert
        type="info"
        tile
        dense
      >
        En attente de joueurs … ({{ nbPlayersJoined }} / {{ nbPlayers }})
      </v-alert>
      <v-card-title>Partager la partie</v-card-title>
      <v-card-text>
        <v-btn @click="copyLink">
          <v-icon left>
            fa-copy
          </v-icon>
          Copier le lien
        </v-btn>
      </v-card-text>
      <v-card-text>
        Invitez les autres joueurs à ouvrir cette adresse dans leur navigateur pour rejoindre cette partie.
      </v-card-text>
    </template>
    <template v-if="finished">
      <v-alert
        v-if="winner && !draw && !singlePlayer"
        type="success"
        tile
        dense
      >
        Victoire ! Vous avez gagné ! À vous la richesse et la gloire !
      </v-alert>
      <v-alert
        v-if="winner && draw"
        type="info"
        tile
        dense
      >
        Vous avez gagné ex-aequo. Une demi-victoire, en somme.
      </v-alert>
      <v-alert
        v-if="winner && singlePlayer"
        type="info"
        tile
        dense
      >
        Vous avez gagné. En étant seul en jeu, ça n’est ni compliqué, ni glorieux.
      </v-alert>
      <v-alert
        v-if="!winner"
        type="error"
        tile
        dense
      >
        Vous avez perdu. <a href="http://jeuducarre.canalblog.com/">Peut-être que ce guide stratégique vous aider à faire mieux</a> ?
      </v-alert>
    </template>
    <v-card-actions>
      <v-btn
        v-if="finished"
        @click="newGame"
      >
        Nouvelle partie
      </v-btn>
      <v-btn
        v-else
        @click="newGame"
      >
        Quitter
        <v-icon right>
          fa-sign-out-alt
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters, mapState } from 'vuex'
import store from '@/store'
import GameWebSocket from '@/io/GameWebSocket'
import { Player } from '@/models/localModels'
@Component({
  computed: {
    ...mapGetters('game', ['nbPlayersJoined', 'allPlayersJoined']),
    ...mapState('game', ['players', 'nbPlayers', 'finished', 'winnersIds']),
    ...mapState('player', ['id'])
  }
})
export default class SimpleGamePlayers extends Vue {
  // From vuex mappings
  winnersIds!: number[]
  id!: number
  players!: Record<number, Player>

  get winner () {
    return this.winnersIds.includes(this.id)
  }

  get draw () {
    return this.winnersIds.length > 1
  }

  get singlePlayer () {
    return Object.values(this.players)
      .filter(player => player.active)
      .length === 1
  }

  newGame () {
    GameWebSocket.getInstance().leave()
    store.commit('game/reset')
    this.$router.push({ name: 'GameManagement' })
  }

  copyLink () {
    const path = this.$router.resolve({ name: 'SimpleGameView', params: { id: this.$route.params.id } }).href
    const fullPath = `${window.location.origin}${path}`
    navigator.clipboard.writeText(fullPath)
  }
}
</script>

<style scoped>

</style>
