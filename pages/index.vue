<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col>
          <div class="text-h4 text-center">
            <vue-typer
              id="typewriter"
              :text="typerText"
              :repeat="0"
              caret-animation="blink"
              @typed-char="onTypedChar"
            />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="text-h4 text-center my-3">
            <vue-typer
              text="A passionate, quick learning, self-taught software engineer who strives to build robust and efficient applications."
              repeat="0"
              pre-type-delay="4000"
              caret-animation="blink"
            />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card class="mb-6 text-center">
            <v-card-text
              class="text-h6 text-decoration-underline text-center white--text"
            >
              Technologies I Work With
            </v-card-text>
            <v-btn
              v-for="technology in technologies"
              :key="technology.name"
              :color="technology.colour"
              text
              class="disable-pointer"
            >
              <v-icon v-if="technology.icon" left>
                {{ technology.icon }}
              </v-icon>
              <v-avatar v-if="!technology.icon && technology.svg_d" size="18">
                <svg viewBox="0 0 24 24">
                  <path :class="technology.name" :d="technology.svg_d" />
                </svg>
              </v-avatar>
              {{ technology.name }}
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card hover @click="openInNewTab(stackOverflowStats.link)">
            <v-card-text
              class="text-h5 text-decoration-underline text-center white--text"
            >
              My StackOverflow Stats
            </v-card-text>
            <v-card class="ma-2 mb-4 pl-4 text-center" elevation="3">
              <v-btn
                class="disable-pointer"
                color="green lighten-1"
                x-large
                text
              >
                {{ stackOverflowStats.reputation }} Rep
              </v-btn>
              <v-spacer />
              <v-btn class="disable-pointer" color="#ffcc00" text>
                <v-icon left v-text="icons.circleMedium" />
                {{ stackOverflowStats.badge_counts.gold }}
              </v-btn>
              <v-btn class="disable-pointer ml-n4" color="#cccccc" text>
                <v-icon left v-text="icons.circleMedium" />
                {{ stackOverflowStats.badge_counts.silver }}
              </v-btn>
              <v-btn class="disable-pointer ml-n4" color="#cc6633" text>
                <v-icon left v-text="icons.circleMedium" />
                {{ stackOverflowStats.badge_counts.bronze }}
              </v-btn>
            </v-card>
            <v-spacer />
            <v-card-text
              class="text-h5 text-decoration-underline text-center white--text mt-n4 mb-n1"
            >
              Top Tags
            </v-card-text>
            <div class="pb-2">
              <v-card
                v-for="tag in stackOverflowTopTags"
                :key="tag.tag_name"
                class="ma-2"
                elevation="3"
              >
                <v-card-text
                  class="text-subtitle-1 white--text font-weight-bold"
                >
                  {{ tag.tag_name }}
                </v-card-text>
                <v-card-text class="text-subtitle-2 mt-n5">
                  Answered {{ tag.answer_count }} questions with a total score
                  of {{ tag.answer_score }}
                </v-card-text>
              </v-card>
            </div>
          </v-card>
        </v-col>
        <v-col cols="6">
          <a href="https://github.com/Syntle">
            <v-img
              class="mb-2"
              src="https://github-readme-stats.syntle.vercel.app/api?username=syntle&show_icons=true&theme=dark&include_all_commits=true&count_private=true&hide_border=true"
            />
            <v-img
              src="https://github-readme-stats.syntle.vercel.app/api/top-langs/?username=syntle&layout=compact&theme=dark&hide_border=true"
            />
          </a>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title> You can find me on... </v-card-title>
            <v-row justify="center">
              <v-col v-for="social in socials" :key="social.site" cols="2">
                <v-btn
                  :color="social.colour"
                  large
                  v-bind="size"
                  @click="openInNewTab(social.link)"
                >
                  <v-icon v-bind="size" left> {{ social.icon }} </v-icon>
                  {{ social.user }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  mdiCircleMedium,
  mdiLanguageJavascript,
  mdiLanguageTypescript,
  mdiLanguagePython,
  mdiNodejs,
  mdiVuejs,
  mdiNuxt,
  mdiVuetify,
  mdiGraphql,
  mdiGithub,
  mdiStackOverflow,
  mdiDiscord,
  mdiDocker,
} from '@mdi/js'

export default Vue.extend({
  async asyncData({ $axios, env }) {
    const {
      items: { 0: stackOverflowStats },
    } = await $axios.$get(
      `${env.SE_API_BASE}/users/13176517?site=stackoverflow`
    )

    const { items: stackOverflowTopTags } = await $axios.$get(
      `${env.SE_API_BASE}/users/13176517/top-tags?pagesize=3&site=stackoverflow`
    )

    return { stackOverflowStats, stackOverflowTopTags }
  },
  data() {
    return {
      typerText: [
        'Hello!',
        "I'm Syntle\n\nA passionate, quick learning, self-taught software engineer who strives to build robust and efficient applications.",
      ],
      countWord: 0,
      technologies: [
        {
          name: 'JavaScript',
          icon: mdiLanguageJavascript,
          svg_d: '',
          colour: '#f7df1e',
        },
        {
          name: 'TypeScript',
          icon: mdiLanguageTypescript,
          svg_d: '',
          colour: '#007acc',
        },
        {
          name: 'Python',
          icon: mdiLanguagePython,
          svg_d: '',
          colour: '#ffd748',
        },
        {
          name: 'Node.js',
          icon: mdiNodejs,
          svg_d: '',
          colour: '#539e43',
        },
        {
          name: 'Vue.js',
          icon: mdiVuejs,
          svg_d: '',
          colour: '#41b883',
        },
        {
          name: 'Nuxt.js',
          icon: mdiNuxt,
          svg_d: '',
          colour: '#00c58e',
        },
        {
          name: 'Vuetify',
          icon: mdiVuetify,
          svg_d: '',
          colour: '#1697f6',
        },
        {
          name: 'GraphQL',
          icon: mdiGraphql,
          svg_d: '',
          colour: '#e10098',
        },
        {
          name: 'MongoDB',
          icon: '',
          svg_d:
            'M17.182 9.518c-1.263-5.56-4.242-7.387-4.562-8.086C12.268.939 11.887 0 11.887 0l-.005.049v.013h-.001a.574.574 0 00-.004.039v.015h-.002l-.002.026v.026h-.003c-.001.008-.001.018-.003.025v.021h-.002c0 .007 0 .015-.002.021v.02h-.002l-.002.032v.002l-.01.05v.008h-.001l-.003.012v.017h-.003v.022h-.005v.018h-.005v.021h-.004v.019h-.004v.017h-.006v.014h-.004v.018h-.004v.014h-.005v.013h-.003v.015h-.004l-.001.004v.01h-.003l-.001.006v.006h-.002a.044.044 0 00-.002.01l-.01.021v.002a.03.03 0 00-.005.007v.008h-.004v.008h-.005v.008h-.003v.01h-.006v.014h-.004v.004h-.004v.008h-.004v.011h-.004v.008h-.006v.011h-.004v.008h-.005v.008h-.003v.01h-.005v.008h-.004v.006h-.004v.008h-.006V.76h-.004v.006h-.005v.008h-.004v.011h-.005v.004h-.003v.008h-.006v.004h-.004v.01h-.004v.004h-.004v.008h-.005v.006h-.003l-.002.004v.004h-.002l-.002.004v.001h-.001a.016.016 0 01-.004.007v.003h-.001l-.012.018v.001l-.01.01v.002l-.003.003v.003h-.002l-.003.003v.001h-.001l-.003.004v.004h-.003l-.002.002v.002h-.002c0 .002-.002.002-.002.003v.003h-.004l-.002.003V.92h-.003v.004h-.004V.93h-.004v.008h-.005V.93h-.005v.004h-.004V.94h-.005v.008h-.005v.004h-.004v.006h-.004v.004h-.004V.97h-.006v.004h-.004V.98h-.005v.004h-.004v.005h-.005v.01h-.002v.004h-.006v.005h-.004v.002h-.004v.004h-.005v.01h-.004v.004h-.005v.004h-.004v.006h-.005v.004h-.005v.004h-.004v.004h-.004v.01h-.004v.005h-.006v.004h-.004v.004h-.005v.006h-.004v.004h-.005v.007h-.004v.004h-.006V1.1h-.002v.004h-.004v.004h-.005v.004h-.004v.006h-.005v.004h-.003l-.001.002v.002h-.002l-.004.004-.004.003v.006h-.004v.005h-.004v.004h-.004v.004h-.003l-.003.003v.003h-.002l-.002.002v.003h-.002c-.005.006-.007.01-.014.016a.366.366 0 00-.051.042l-.022.017v.001h-.001a2.821 2.821 0 01-.05.039v.001l-.073.062V1.34h-.002c-.057.047-.117.1-.186.159V1.5h-.001c-.17.148-.37.338-.595.568l-.015.015-.004.004c-1.36 1.407-3.503 4.339-3.73 9.077-.02.392-.015.773.007 1.144v.009c.109 1.867.695 3.461 1.428 4.756v.001c.292.516.607.985.926 1.405v.001c1.102 1.455 2.227 2.317 2.514 2.526.44 1.023.4 2.779.4 2.779l.644.215s-.131-1.701.053-2.522c.057-.257.192-.476.349-.662a8.38 8.38 0 00.797-.645c.018-.019.028-.036.044-.054 1.52-1.418 4.362-4.91 3.388-10.599z',
          colour: '#13aa52',
        },
        {
          name: 'Docker',
          icon: mdiDocker,
          svg_d: '',
          colour: '#0091e2',
        },
      ],
      socials: [
        {
          site: 'GitHub',
          icon: mdiGithub,
          user: 'Syntle',
          link: 'https://github.com/Syntle',
          colour: '#0d1117',
        },
        {
          site: 'StackOverflow',
          icon: mdiStackOverflow,
          user: 'Syntle',
          link: 'https://stackoverflow.com/users/13176517/syntle',
          colour: '#f48024',
        },
        {
          site: 'Discord',
          icon: mdiDiscord,
          user: 'Syntle#7136',
          link: 'https://discord.com/users/152428352358187008',
          colour: '#7289da',
        },
      ],
      icons: {
        circleMedium: mdiCircleMedium,
      },
    }
  },
  methods: {
    openInNewTab(link: string) {
      window.open(link, '_blank')
    },
    onTypedChar(typedChar: string, typedCharIndex: number) {
      if (typedCharIndex === 0) {
        document.getElementById('typewriter')!.firstChild!.innerHTML = ''
      }

      const lessNodes = document.getElementById('typewriter')!.lastChild!
        .childNodes

      if (typedChar === ' ' || lessNodes.length === 1) {
        const finalNodes = document.getElementById('typewriter')!.firstChild
        const listNodes = finalNodes!.childNodes

        const newNode = document.createElement('span')

        let x = this.countWord
        const countNodes = listNodes.length
        while (x < countNodes) {
          if (listNodes[this.countWord].innerHTML !== ' ')
            newNode.insertAdjacentElement(
              'beforeend',
              listNodes[this.countWord]
            )
          else this.countWord++

          x++
        }
        newNode.className = 'nowrap'
        finalNodes!.insertAdjacentElement('beforeend', newNode)

        this.countWord++
      }
    },
  },
})
</script>

<style>
.vue-typer .custom.char.typed {
  color: white;
}

.vue-typer .custom.caret {
  width: 2px;
  background-color: white;
}

.vue-typer .custom.caret.complete {
  display: inline-block !important;
}

.vue-typer .custom.caret.idle {
  display: unset !important;
}

.disable-pointer {
  pointer-events: none;
}

.MongoDB {
  fill: #13aa52;
}

span.nowrap {
  white-space: nowrap;
}
</style>
