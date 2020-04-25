<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      dense
    >
      <v-avatar size="32">
        <img
          src="/favicon-32x32.png"
          alt="Logo"
        >
      </v-avatar>
      <v-spacer />
      <v-toolbar-title>La Pipopipette</v-toolbar-title>
      <v-spacer />
      <template v-if="name">
        <v-toolbar-title>{{ name }}</v-toolbar-title>
      </template>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer padless>
      <v-col
        class="text-center"
        cols="12"
      >
        Jeu libre sous licence MIT par <a href="https://spacefox.fr/">SpaceFox</a> — <a href="https://github.com/La-Pipopipette">Signaler un problème ou voir le code</a>
      </v-col>
    </v-footer>

    <v-snackbar
      v-model="showMessage"
      :color="type"
    >
      {{ text }}
      <v-btn
        dark
        text
        @click="showMessage = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import store from './store'

export default Vue.extend({
  name: 'App',
  data: () => ({
    //
  }),
  computed: {
    ...mapState('messages', ['text', 'type', 'show']),
    ...mapState('player', ['name']),
    showMessage: {
      get: function () {
        return this.show
      },
      set: function (newValue) {
        store.commit('messages/setShow', newValue)
      }
    }
  }
})
</script>
