<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <SimpleGameStatus />
        <SimpleGamePlayers />
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
        <SimpleGameBoard v-if="gameDefined" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import GameWebSocket from '@/io/GameWebSocket'
import SimpleGameBoard from '@/components/game/simple/SimpleGameBoard.vue'
import SimpleGamePlayers from '@/components/game/simple/SimpleGamePlayers.vue'
import SimpleGameStatus from '@/components/game/simple/SimpleGameStatus.vue'
import { mapGetters } from 'vuex'
@Component({
  computed: {
    ...mapGetters('game', ['gameDefined'])
  },
  components: { SimpleGameStatus, SimpleGamePlayers, SimpleGameBoard }
})
export default class SimpleGameView extends Vue {
  mounted () {
    GameWebSocket.init(this.$route.params.id)
    GameWebSocket.getInstance().connect()
  }
}
</script>

<style scoped>

</style>
