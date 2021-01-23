<template>
  <v-container>
    <v-row justify="center">
      <v-col v-for="(cert, i) in certs" :key="i" md="6" lg="6" xl="3">
        <v-card class="mx-auto" max-width="400" max-height="400">
          <v-img height="200px" :src="cert.image" />
          <v-card-subtitle class="pb-0">
            {{ cert.title }}
          </v-card-subtitle>
          <v-card-subtitle> {{ cert.course }} </v-card-subtitle>
          <v-card-actions v-if="cert.certificate || cert.link">
            <v-btn
              v-if="cert.certificate"
              color="blue"
              text
              v-bind="componentSize"
              @click="openNewTab(cert.certificate)"
            >
              <v-icon left v-bind="componentSize" v-text="icons.certificate" />
              Certificate
            </v-btn>
            <v-btn
              v-if="cert.link"
              color="orange"
              text
              v-bind="componentSize"
              @click="openNewTab(cert.link)"
            >
              <v-icon left v-bind="componentSize" v-text="icons.notebook" />
              Course
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiCertificate, mdiNotebook } from '@mdi/js'

export default Vue.extend({
  data() {
    return {
      certs: [
        {
          title: 'Udemy Course',
          course:
            'NestJS Zero to Hero - Modern TypeScript Back-end Development',
          image: 'https://img-a.udemycdn.com/course/240x135/2053219_e620_2.jpg',
          link: 'https://www.udemy.com/course/nestjs-zero-to-hero/',
          certificate: 'https://ude.my/UC-Q59PAEUU',
        },
      ],
      icons: {
        notebook: mdiNotebook,
        certificate: mdiCertificate,
      },
    }
  },
  computed: {
    componentSize() {
      const size = {
        xs: 'x-small',
        sm: 'small',
        md: 'medium',
        lg: 'medium',
        xl: 'large',
      }[this.$vuetify.breakpoint.name]

      return size ? { [size]: true } : {}
    },
  },
  methods: {
    openNewTab(link: string) {
      window.open(link, '_blank')
    },
  },
})
</script>
