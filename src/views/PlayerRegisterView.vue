<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-card tile>
          <v-card-title>Bienvenue&nbsp;!</v-card-title>
          <v-form
            v-model="valid"
            @submit.prevent="register"
          >
            <v-card-text>
              <v-text-field
                v-model="nameInput"
                :counter="32"
                :rules="nameRules"
                label="Nom"
                placeholder="Comment doit-on vous appeler?"
                required
              />
            </v-card-text>
            <v-card-actions>
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                type="submit"
              >
                Jouer !
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-card tile>
          <v-card-title>Règles du jeu</v-card-title>
          <v-card-text>
            <p>
              Le jeu se joue sur une grille. Le but du jeu est d'avoir le plus de carrés remplis à la fin de la
              partie.
            </p>
            <p>Chacun son tour, chaque joueur trace un trace un trait.</p>
            <p>
              Quand les quatre côtés d’un carré sont tracés, le joueur qui a tracé le dernier côté gagne le carré et
              doit rejouer.
            </p>
            <p>Le jeu s'arrête&nbsp;:</p>
            <ul>
              <li>Soit quand un joueur a gagné plus de la moitié des carrés du plateau.</li>
              <li>Soit quand le plateau est plein.</li>
            </ul>
            <p>Exemple de partie sur un plateau de 2 x 2&nbsp;:</p>
            <v-img max-width="300px" src="../assets/game-example.svg" />
            <p><em>(Image <a href="https://commons.wikimedia.org/wiki/File:Dots-and-boxes.svg">CC BY-SA Tiger66</a>)</em></p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import playerHttpEndpoint from '@/io/PlayerHttpEndpoint'

@Component
export default class PlayerRegisterView extends Vue {
  nameInput = ''
  nameRules = [
    (v: string) => !!v || 'Le nom est obligatoire',
    (v: string) => (v && v.length <= 32) || 'Le nom doit faire moins de 32 caractères'
  ]

  valid = false

  async register () {
    await playerHttpEndpoint.createPlayer(this.nameInput)
    this.$router.push({ name: 'GameManagement' })
  }
}
</script>

<style scoped>

</style>
