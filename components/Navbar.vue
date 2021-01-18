<template>
  <nav>
    <v-app-bar app fixed dense>
      <v-btn depressed link nuxt to="/">
        <v-icon left v-text="icons.home" />
        Home
      </v-btn>
      <v-btn depressed link nuxt to="/projects">
        <v-icon left v-text="icons.folderOpen" />
        Projects
      </v-btn>
      <v-btn depressed link nuxt to="/certificates">
        <v-icon left v-text="icons.certificate" />
        Certificates
      </v-btn>
      <v-spacer />
      <v-btn depressed link nuxt to="/contact">
        <v-icon left v-text="icons.accountBox" />
        Contact
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script lang="ts">
import { mdiAccountBox, mdiCertificate, mdiFolderOpen, mdiHome } from '@mdi/js'
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      icons: {
        home: mdiHome,
        folderOpen: mdiFolderOpen,
        certificate: mdiCertificate,
        accountBox: mdiAccountBox,
      },
    }
  },
})
</script>
