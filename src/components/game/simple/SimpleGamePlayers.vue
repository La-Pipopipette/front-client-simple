<template>
  <v-card tile>
    <v-list
      disabled
      dense
    >
      <v-list-item-group
        v-model="playerIdToPlay"
        color="primary"
      >
        <v-list-item
          v-for="(player, playerId) in players"
          :key="playerId"
          :value="parseInt(playerId, 10)"
          :disabled="!player.active"
          two-line
        >
          <v-list-item-avatar>
            <v-icon
              :disabled="!player.active"
              :color="player.color"
              v-text="player.icon"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="player.name" />
            <v-list-item-subtitle>Score&nbsp;: {{ player.score }} / {{ maxScore }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
@Component({
  computed: {
    ...mapState('game', ['players', 'playerIdToPlay', 'width', 'height'])
  }
})
export default class SimpleGamePlayers extends Vue {
  // From vuex mappings
  width!: number
  height!: number

  get maxScore () {
    return this.width * this.height
  }
}
</script>

<style scoped>

</style>
