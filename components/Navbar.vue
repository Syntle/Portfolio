<template>
  <nav>
    <v-app-bar app fixed dense>
      <v-btn v-bind="size" text link nuxt to="/">
        <v-icon v-bind="size" left v-text="icons.home" />
        Home
      </v-btn>
      <v-btn v-bind="size" text link nuxt to="/projects">
        <v-icon v-bind="size" left v-text="icons.folderOpen" />
        Projects
      </v-btn>
      <v-btn v-bind="size" text link nuxt to="/certificates">
        <v-icon v-bind="size" left v-text="icons.certificate" />
        Certificates
      </v-btn>
      <v-spacer v-if="$vuetify.breakpoint.name === 'xs'" />
      <v-divider v-if="$vuetify.breakpoint.name === 'xs'" vertical inset />
      <v-spacer />
      <v-btn v-bind="size" text link nuxt to="/contact">
        <v-icon v-bind="size" left v-text="icons.accountBox" />
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
  computed: {
    size() {
      const size = {
        xs: 'x-small',
        sm: 'small',
        md: 'medium',
        lg: 'large',
        xl: 'x-large',
      }[this.$vuetify.breakpoint.name]
      return size ? { [size]: true } : {}
    },
  },
})
</script>
