<template>
  <td>
    <div
      v-if="params"
      :class="{ wrapper: true,
                horizontal: horizontalAllowed,
                vertical: verticalAllowed }"
    >
      <v-icon
        v-if="params.filledBy"
        class="playerIndicator"
        :color="color(params.filledBy)"
        small
        v-text="icon(params.filledBy)"
      />
      <div
        v-if="horizontalAllowed"
        :class="{ hBorder: true, played: params.h, lastPlayed: isLastPlayed(false) }"
        @click="play(false)"
      />
      <div
        v-if="verticalAllowed"
        :class="{ vBorder: true, played: params.v, lastPlayed: isLastPlayed(true) }"
        @click="play(true)"
      />
      <div class="dot" />
    </div>
  </td>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Player, Square, Turn } from '@/models/localModels'
import GameWebSocket from '@/io/GameWebSocket'
import { mapState } from 'vuex'
@Component({
  computed: {
    ...mapState('game', ['players', 'lastPlayedTurn'])
  }
})
export default class SimpleGameSquare extends Vue {
  @Prop({ default: null }) params!: Square
  @Prop({ default: 0 }) x!: number
  @Prop({ default: 0 }) y!: number

  // From vuex mappings
  players!: { [playerId: number]: Player }
  lastPlayedTurn!: Turn

  get horizontalAllowed () {
    return this.x !== 0
  }

  get verticalAllowed () {
    return this.y !== 0
  }

  play (vertical: boolean) {
    if (this.played(vertical)) {
      console.info("Can't play here as it has been already played") // TODO user message
    } else {
      console.log(`Play on (${this.x}, ${this.y}) ${vertical ? 'vertical' : 'horizontal'}`)
      GameWebSocket.getInstance().playTurn(this.x, this.y, vertical)
    }
  }

  played (vertical: boolean) {
    return (vertical && this.params.v) || (!vertical && this.params.h)
  }

  icon (playerId: number) {
    return this.players[playerId].icon
  }

  color (playerId: number) {
    return this.players[playerId].color
  }

  isLastPlayed (vertical: boolean) {
    return this.lastPlayedTurn
      && this.lastPlayedTurn.x === this.x
      && this.lastPlayedTurn.y === this.y
      && this.lastPlayedTurn.vertical === vertical
  }
}
</script>

<style scoped lang="scss">
  td:hover {
    background-color: #eeeeee;
  }

  .wrapper {
    width: 10px;
    height: 10px;
    position: relative;

    .dot {
      width: 10px;
      height: 10px;
      position: absolute;
      bottom: 0;
      right: 0;
      background-color: black;
    }

    .vBorder {
      width: 10px;
      height: 40px;
      position: absolute;
      top: 0;
      right: 0;
      background-color: lightgray;
      cursor: pointer;
    }

    .hBorder {
      width: 30px;
      height: 10px;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: lightgray;
      cursor: pointer;
    }

    .playerIndicator {
      width: 30px;
      height: 30px;
      display: table-cell;
      text-align: center;
      vertical-align: middle;
    }

    .vBorder:hover, .hBorder:hover {
      background-color: gray;
    }

    .played {
      background-color: #444444;
      cursor: default;
    }
    .lastPlayed {
      background-color: red;
    }
  }
  .wrapper.horizontal {
    width: 40px;
  }
  .wrapper.vertical {
    height: 40px;
  }
</style>
