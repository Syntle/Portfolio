<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="(project, i) in projects" :key="i" cols="6">
        <v-card class="mx-auto" max-width="400">
          <v-img
            height="200px"
            contain
            :src="project.logo || '/CodeTags.png'"
          />

          <v-card-subtitle class="pb-0 white--text text-h6">
            {{ project.name }}
          </v-card-subtitle>
          <v-card-subtitle class="grey--text lighten-1">
            {{ project.description }}
          </v-card-subtitle>
          <v-spacer />
          <v-card-actions>
            <v-btn
              v-if="project.demo"
              color="blue"
              text
              @click="openNewTab(project.demo)"
            >
              <v-icon left v-text="icons.testTube" />
              Demo
            </v-btn>
            <v-btn
              v-if="project.code"
              color="orange"
              text
              @click="openNewTab(project.code)"
            >
              <v-icon left v-text="icons.github" />
              Code
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { mdiGithub, mdiTestTube } from '@mdi/js'
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      projects: [
        {
          name: 'Concordis',
          description:
            'A website which which utilises user interests to match users to make meaningful connections with like-minded people',
          logo: '',
          demo: 'https://concordis.xyz',
          code: 'https://github.com/Syntle/Concordis',
        },
        {
          name: 'RustTracker',
          description: 'A utility Discord bot & website for the game Rust',
          logo: '/RustTrackerLogo.png',
          demo: '',
          code: '',
        },
        {
          name: 'Portfolio',
          description: 'The website you are viewing right now!',
          logo: '',
          demo: '',
          code: 'https://github.com/Syntle/Portfolio',
        },
      ],
      icons: {
        testTube: mdiTestTube,
        github: mdiGithub,
      },
    }
  },
  methods: {
    openNewTab(link: string) {
      window.open(link, '_blank')
    },
  },
})
</script>
