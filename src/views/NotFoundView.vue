<template>
  <v-container>
    <v-alert
      type="error"
      prominent
      elevation="2"
    >
      <v-row align="center">
        <v-col class="grow">
          Page introuvable.
        </v-col>
        <v-col class="shrink">
          <v-btn @click="toHome">
            Retour à l’accueil
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class NotFoundView extends Vue {
  toHome () {
    this.$router.push({ name: 'GameManagement' })
  }
}
</script>

<style scoped>

</style>
