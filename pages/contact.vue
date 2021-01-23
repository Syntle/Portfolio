<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="6" xl="6">
        <v-card v-if="!formSubmitted" class="pa-5">
          <div
            v-if="seekingStatus"
            :class="
              $vuetify.breakpoint.name === 'xs'
                ? 'text-center'
                : 'd-flex justify-end mb-n11'
            "
          >
            <v-btn
              class="disable-pointer"
              color="green"
              v-bind="seekingStatusSize"
            >
              Seeking Employment
            </v-btn>
          </div>
          <v-card-text class="text-center text-h6 white--text mt-n3">
            Contact Me!
          </v-card-text>
          <v-form v-model="validForm">
            <v-text-field v-model="name" :rules="nameRules" label="Name" />
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" />
            <v-textarea
              v-model="message"
              counter="500"
              :rules="messageRules"
              label="Message"
            />
          </v-form>
          <div class="d-flex justify-center">
            <v-btn
              color="green darken-2"
              :disabled="!validForm"
              v-bind="componentSize"
              @click="submitForm()"
            >
              Submit
            </v-btn>
          </div>
        </v-card>
        <v-card v-if="formSubmitted" class="text-center py-10">
          <v-icon x-large v-text="icons.commentCheck" />
          <v-card-text class="text-h6">
            Your message has been sent,
          </v-card-text>
          <v-card-text class="text-h6 mt-n5">
            Thank you for reaching out!
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiCheck, mdiCommentCheck } from '@mdi/js'

export default Vue.extend({
  data() {
    return {
      name: '',
      email: '',
      message: '',
      validForm: false,
      formSubmitted: false,
      nameRules: [
        (name: string) => !!name || 'Name is required',
        (name: string) =>
          (name && name.length <= 20) || 'Name must be less than 20 characters',
      ],
      emailRules: [
        (email: string) => !!email || 'E-mail is required',
        (email: string) => /.+@.+\..+/.test(email) || 'E-mail must be valid',
        (email: string) =>
          (email && email.length <= 90) ||
          'E-mail must be less than 90 characters',
      ],
      messageRules: [
        (message: string) => !!message || 'Message is required',
        (message: string) =>
          (message && message.length <= 500) ||
          'Message must be less than 500 characters',
      ],
      seekingStatus: true,
      icons: {
        commentCheck: mdiCommentCheck,
        check: mdiCheck,
      },
    }
  },
  computed: {
    componentSize() {
      const size = {
        xs: 'x-small',
        sm: 'small',
        md: 'medium',
        lg: 'large',
        xl: 'x-large',
      }[this.$vuetify.breakpoint.name]

      return size ? { [size]: true } : {}
    },
    seekingStatusSize() {
      const size = {
        xs: 'x-small',
        sm: 'x-small',
        md: 'small',
        lg: 'small',
        xl: 'small',
      }[this.$vuetify.breakpoint.name]

      return size ? { [size]: true } : {}
    },
  },
  methods: {
    async submitForm() {
      const { data: sentMessage } = await this.$axios({
        method: 'post',
        url: `${process.env.WEBSITE_URL}/graphql`,
        data: {
          query:
            'mutation Message($ipAddress: String! $name: String! $email: String! $message: String! ) { \
              setMessage(ipAddress: $ipAddress name: $name email: $email message: $message ) { \
                id \
              } \
            }',
          variables: {
            ipAddress: this.$store.state.ipAddress,
            name: this.name,
            email: this.email,
            message: this.message,
          },
        },
        headers: { 'Content-Type': 'application/json' },
      })

      this.name = ''
      this.email = ''
      this.message = ''

      this.formSubmitted = true

      await this.$axios.$post(`${process.env.WEBSITE_URL}/api/discord/notify`, {
        messageID: sentMessage.data.setMessage.id,
      })
    },
  },
})
</script>

<style>
.disable-pointer {
  pointer-events: none;
}
</style>
