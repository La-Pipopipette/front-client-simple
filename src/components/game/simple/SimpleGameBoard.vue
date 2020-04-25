<template>
  <v-card tile>
    <v-card-text>
      <table class="board">
        <tr
          v-for="(row, y) in board"
          :key="y"
        >
          <SimpleGameSquare
            v-for="(square, x) in row"
            :key="x"
            class="square"
            :params="square"
            :x="x"
            :y="y"
          />
        </tr>
      </table>
    </v-card-text>
    <v-overlay
      :absolute="true"
      :value="!canPlay"
      color="rgba(200, 200, 200, 0.5)"
    >
      <v-chip color="secondary">
        {{ overlayMessage }}
      </v-chip>
    </v-overlay>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters, mapState } from 'vuex'
import SimpleGameSquare from '@/components/game/simple/SimpleGameSquare.vue'

@Component({
  components: { SimpleGameSquare },
  computed: {
    ...mapGetters('game', ['gamePlayable']),
    ...mapState('game', ['board', 'playerIdToPlay']),
    ...mapState('player', ['id'])
  }
})
export default class SimpleGameBoard extends Vue {
  // From vuex mappings
  gamePlayable!: boolean
  playerIdToPlay!: number
  id!: number

  get canPlay () {
    return this.gamePlayable && this.playerIdToPlay === this.id
  }

  get overlayMessage () {
    return this.gamePlayable
      ? 'Tour d’autres joueurs'
      : 'En attente de joueurs'
  }
}
</script>

<style scoped lang="scss">
  .board {
    border-collapse: collapse;
  }
  .toto {
    width: 100%;
    height: 100%;
    background-color: red;
  }
</style>
