<template>
  <div v-if="isOwner()">
    <v-container>
      <v-row justify="center">
        <v-col md="8" lg="8" xl="8">
          <v-card>
            <v-card-text class="text-center text-h6 white--text mb-2">
              Your Messages
            </v-card-text>
            <v-divider />
            <v-virtual-scroll :items="messages" height="550" item-height="97">
              <template #default="{ index, item }">
                <v-hover v-slot="{ hover }">
                  <v-list-item
                    :key="index"
                    :color="item.read ? '' : '#686868'"
                    :input-value="item.read ? false : true"
                    @click="openMessage(item)"
                  >
                    <v-overlay
                      absolute
                      color="white"
                      opacity="0.2"
                      :value="hover"
                    />
                    <v-list-item-content>
                      <v-list-item-title
                        :class="item.read ? '' : 'font-weight-bold'"
                        v-text="item.name"
                      />
                      <v-list-item-subtitle
                        :class="item.read ? '' : 'font-weight-bold'"
                        v-text="item.email"
                      />
                      <v-list-item-subtitle
                        :class="item.read ? '' : 'font-weight-bold'"
                        v-text="item.message"
                      />
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-list-item-action-text
                        v-if="
                          $moment(item.createdAt).get('date') ===
                          $moment(Date.now()).get('date')
                        "
                        v-text="$moment(item.createdAt).format('hh:mm A')"
                      />
                      <v-list-item-action-text
                        v-if="
                          $moment(item.createdAt).get('date') !==
                          $moment(Date.now()).get('date')
                        "
                        v-text="$moment(item.createdAt).format('DD/MM/YY')"
                      />
                      <v-list-item-icon>
                        <v-icon
                          :color="item.favourited ? '#ffcc00' : ''"
                          v-bind="messageIconSize"
                        >
                          {{ item.favourited ? icons.star : icons.starOutline }}
                        </v-icon>
                      </v-list-item-icon>
                    </v-list-item-action>
                  </v-list-item>
                </v-hover>
                <v-divider v-if="index < messages.length - 1" />
              </template>
            </v-virtual-scroll>
          </v-card>

          <v-dialog
            v-model="expandMessage"
            width="550"
            @click:outside="closeMessage()"
          >
            <v-card>
              <v-container>
                <v-row>
                  <v-col cols="11">
                    <v-card-text
                      class="text-subtitle-1 font-weight-bold white--text mt-n3 mb-n5"
                    >
                      Name: {{ openedMessage.name }}
                    </v-card-text>
                    <v-card-text
                      class="text-subtitle-1 font-weight-bold white--text mb-n5"
                    >
                      Email: {{ openedMessage.email }}
                    </v-card-text>
                    <v-card-text
                      class="text-subtitle-1 font-weight-bold white--text"
                    >
                      IP Address: {{ showIP ? openedMessage.ipAddress : '' }}
                      <v-btn
                        x-small
                        :color="showIP ? 'red' : 'green'"
                        @click="showIP = !showIP"
                        v-text="showIP ? 'Hide' : 'Reveal'"
                      />
                    </v-card-text>
                  </v-col>
                  <v-col cols="1">
                    <div class="d-flex justify-end">
                      <v-btn
                        icon
                        v-bind="messageIconSize"
                        @click="toggleFavourite(openedMessage)"
                      >
                        <v-icon
                          :color="openedMessage.favourited ? '#ffcc00' : ''"
                          v-bind="messageIconSize"
                        >
                          {{
                            openedMessage.favourited
                              ? icons.star
                              : icons.starOutline
                          }}
                        </v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        v-bind="messageIconSize"
                        @click="showDeletePrompt = true"
                      >
                        <v-icon
                          v-bind="messageIconSize"
                          v-text="icons.delete"
                        />
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
              <v-divider class="mb-5" />
              <v-card-text
                class="text-right"
                v-text="
                  $moment(openedMessage.createdAt).format(
                    'ddd, MMM DD, YYYY, hh:mm A'
                  )
                "
              />
              <v-card-text
                class="text-body-1 white--text"
                v-text="openedMessage.message"
              />
            </v-card>
          </v-dialog>

          <v-dialog v-model="showDeletePrompt" width="500">
            <v-card class="text-center">
              <v-card-title class="text-center">
                Are you sure you want to delete this message?
              </v-card-title>
              <v-divider />
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-3" @click="showDeletePrompt = false">
                  Cancel
                </v-btn>
                <v-btn
                  color="green darken-2"
                  @click="deleteMessage(openedMessage)"
                >
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiDelete, mdiStar, mdiStarOutline } from '@mdi/js'

export default Vue.extend({
  data() {
    return {
      messages: [],
      openedMessage: {},
      expandMessage: false,
      showDeletePrompt: false,
      showIP: false,
      icons: {
        star: mdiStar,
        starOutline: mdiStarOutline,
        delete: mdiDelete,
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
    messageIconSize() {
      const size = {
        xs: 'small',
        sm: 'small',
        md: 'medium',
        lg: 'medium',
        xl: 'medium',
      }[this.$vuetify.breakpoint.name]

      return size ? { [size]: true } : {}
    },
  },
  created() {
    if (process.client && !this.$auth.loggedIn) this.$auth.loginWith('discord')
  },
  async mounted() {
    if (this.$auth.loggedIn && this.$auth.user.id !== process.env.OWNER_ID) {
      this.$router.push('/')
    }

    if (this.$auth.loggedIn && this.$auth.user.id === process.env.OWNER_ID) {
      const { data: messages } = await this.$axios({
        method: 'post',
        url: `${process.env.WEBSITE_URL}/graphql`,
        data: {
          query:
            'query Messages { \
            getMessages { \
              id \
              ipAddress \
              name \
              email \
              message \
              read \
              favourited \
              createdAt \
            } \
          }',
        },
        headers: { 'Content-Type': 'application/json' },
      })

      this.messages = messages.data.getMessages

      if (this.$route.query.messageID) {
        const { data: message } = await this.$axios({
          method: 'post',
          url: `${process.env.WEBSITE_URL}/graphql`,
          data: {
            query:
              'query Messages($id: ID!) { \
              getMessage(id: $id) { \
                id \
                ipAddress \
                name \
                email \
                message \
                read \
                favourited \
                createdAt \
              } \
            }',
            variables: { id: this.$route.query.messageID },
          },
          headers: { 'Content-Type': 'application/json' },
        })

        this.openMessage(message.data.getMessage)
      }
    }
  },
  methods: {
    isOwner() {
      return this.$auth.loggedIn && this.$auth.user.id === process.env.OWNER_ID
    },
    async openMessage(message: any) {
      this.openedMessage = message
      this.expandMessage = true

      if (!message.read) {
        const msg = this.messages.find((msg: any) => msg.id === message.id)
        // @ts-ignore
        msg.read = true

        await this.$axios({
          method: 'post',
          url: `${process.env.WEBSITE_URL}/graphql`,
          data: {
            query:
              'mutation Message($id: ID! $read: Boolean!) { \
                setMessageRead(id: $id read: $read) \
              }',
            variables: { id: message.id, read: true },
          },
          headers: { 'Content-Type': 'application/json' },
        })
      }
    },
    closeMessage() {
      this.openedMessage = {}
      this.expandMessage = false
      this.showIP = false
    },
    async deleteMessage(message: any) {
      this.showDeletePrompt = false
      this.closeMessage()

      await this.$axios({
        method: 'post',
        url: `${process.env.WEBSITE_URL}/graphql`,
        data: {
          query:
            'mutation Message($id: ID!) { \
              deleteMessage(id: $id) \
            }',
          variables: { id: message.id },
        },
        headers: { 'Content-Type': 'application/json' },
      })

      const index = this.messages.findIndex((msg: any) => msg.id === message.id)

      if (index > -1) this.messages.splice(index, 1)
    },
    async toggleFavourite(message: any) {
      await this.$axios({
        method: 'post',
        url: `${process.env.WEBSITE_URL}/graphql`,
        data: {
          query:
            'mutation Message($id: ID! $favourited: Boolean!) { \
                setMessageFavourite(id: $id favourited: $favourited) \
              }',
          variables: { id: message.id, favourited: !message.favourited },
        },
        headers: { 'Content-Type': 'application/json' },
      })

      const msg = this.messages.find((msg: any) => msg.id === message.id)
      // @ts-ignore
      msg.favourited = !msg.favourited
    },
  },
})
</script>
