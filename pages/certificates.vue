<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="(cert, i) in certs" :key="i" cols="6">
        <v-card class="mx-auto" hover max-width="400">
          <v-img height="200px" :src="cert.image" />
          <v-card-subtitle class="pb-0">
            {{ cert.title }}
          </v-card-subtitle>
          <v-card-subtitle> {{ cert.course }} </v-card-subtitle>
          <v-card-actions>
            <v-btn
              v-if="cert.certificate"
              color="blue"
              text
              @click="openNewTab(cert.certificate)"
            >
              <v-icon left v-text="icons.certificate" />
              Certificate
            </v-btn>
            <v-btn
              v-if="cert.link"
              color="orange"
              text
              @click="openNewTab(cert.link)"
            >
              <v-icon left v-text="icons.notebook" />
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
  methods: {
    openNewTab(link: string) {
      window.open(link, '_blank')
    },
  },
})
</script>
