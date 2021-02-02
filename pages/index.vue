<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col>
          <div class="text-center my-3" :class="typerSize">
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
          <v-card class="mb-6 text-center px-1 pb-3">
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
              v-bind="componentSize"
              class="disable-pointer"
            >
              <v-icon v-if="technology.icon" v-bind="componentSize" left>
                {{ technology.icon }}
              </v-icon>
              <v-avatar v-if="!technology.icon && technology.svg_d">
                <svg
                  viewBox="0 0 24 24"
                  :style="`font-size: ${svgSize}; height: ${svgSize}; width: ${svgSize};`"
                >
                  <path
                    :style="`fill: ${technology.colour}`"
                    :d="technology.svg_d"
                  />
                </svg>
              </v-avatar>
              {{ technology.name }}
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          md="6"
          lg="6"
          xl="6"
          v-if="stackOverflowStats && stackOverflowTopTags"
        >
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
        <v-col md="6" lg="6" xl="6">
          <a @click="openInNewTab('https://github.com/Syntle')">
            <v-img
              class="mb-2"
              src="https://github-readme-stats.syntle.vercel.app/api?username=syntle&show_icons=true&theme=dark&include_all_commits=true&count_private=true&hide_border=true"
            />
          </a>
          <v-card>
            <v-card-title> You can find me on... </v-card-title>
            <v-row>
              <v-col
                v-for="social in socials"
                :key="social.site"
                class="text-center mr-2 mb-2"
              >
                <v-btn
                  :color="social.colour"
                  large
                  v-bind="componentSize"
                  @click="openInNewTab(social.link)"
                >
                  <v-icon v-bind="componentSize" left>
                    {{ social.icon }}
                  </v-icon>
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
  data() {
    return {
      typerText: [
        'Hello!',
        "I'm Syntle\n\nA passionate, versatile, self-taught software engineer who strives to build robust and efficient applications.",
      ],
      countWord: 0,
      stackOverflowStats: undefined,
      stackOverflowTopTags: undefined,
      technologies: [
        {
          name: 'JavaScript',
          icon: mdiLanguageJavascript,
          svg_d: '',
          colour: '#F7DF1E',
        },
        {
          name: 'TypeScript',
          icon: mdiLanguageTypescript,
          svg_d: '',
          colour: '#3178C6',
        },
        {
          name: 'Python',
          icon: mdiLanguagePython,
          svg_d: '',
          colour: '#3776AB',
        },
        {
          name: 'Node.js',
          icon: mdiNodejs,
          svg_d: '',
          colour: '#339933',
        },
        {
          name: 'Vue.js',
          icon: mdiVuejs,
          svg_d: '',
          colour: '#4FC08D',
        },
        {
          name: 'Nuxt.js',
          icon: mdiNuxt,
          svg_d: '',
          colour: '#00C58E',
        },
        {
          name: 'Vuetify',
          icon: mdiVuetify,
          svg_d: '',
          colour: '#1867C0',
        },
        {
          name: 'GraphQL',
          icon: mdiGraphql,
          svg_d: '',
          colour: '#E10098',
        },
        {
          name: 'Apollo',
          icon: '',
          svg_d:
            'M12,0C5.372,0 0,5.373 0,12 0,18.628 5.372,24 12,24 18.627,24 24,18.628 24,12A12.014,12.014 0 0 0 23.527,8.657 0.6,0.6 0 0 0 22.4,9.066H22.398C22.663,10.009 22.8,10.994 22.8,12A10.73,10.73 0 0 1 19.637,19.637 10.729,10.729 0 0 1 12,22.8 10.73,10.73 0 0 1 4.363,19.637 10.728,10.728 0 0 1 1.2,12 10.73,10.73 0 0 1 4.363,4.363 10.728,10.728 0 0 1 12,1.2C14.576,1.2 17.013,2.096 18.958,3.74A1.466,1.466 0 1 0 19.82,2.9 11.953,11.953 0 0 0 12,0ZM10.56,5.88 6.36,16.782H8.99L9.677,14.934H13.646L12.927,12.892H10.314L12.014,8.201 15.038,16.781H17.669L13.47,5.88Z',
          colour: '#311C87',
        },
        {
          name: 'MongoDB',
          icon: '',
          svg_d:
            'M17.182 9.518c-1.263-5.56-4.242-7.387-4.562-8.086C12.268.939 11.887 0 11.887 0l-.005.049v.013h-.001a.574.574 0 00-.004.039v.015h-.002l-.002.026v.026h-.003c-.001.008-.001.018-.003.025v.021h-.002c0 .007 0 .015-.002.021v.02h-.002l-.002.032v.002l-.01.05v.008h-.001l-.003.012v.017h-.003v.022h-.005v.018h-.005v.021h-.004v.019h-.004v.017h-.006v.014h-.004v.018h-.004v.014h-.005v.013h-.003v.015h-.004l-.001.004v.01h-.003l-.001.006v.006h-.002a.044.044 0 00-.002.01l-.01.021v.002a.03.03 0 00-.005.007v.008h-.004v.008h-.005v.008h-.003v.01h-.006v.014h-.004v.004h-.004v.008h-.004v.011h-.004v.008h-.006v.011h-.004v.008h-.005v.008h-.003v.01h-.005v.008h-.004v.006h-.004v.008h-.006V.76h-.004v.006h-.005v.008h-.004v.011h-.005v.004h-.003v.008h-.006v.004h-.004v.01h-.004v.004h-.004v.008h-.005v.006h-.003l-.002.004v.004h-.002l-.002.004v.001h-.001a.016.016 0 01-.004.007v.003h-.001l-.012.018v.001l-.01.01v.002l-.003.003v.003h-.002l-.003.003v.001h-.001l-.003.004v.004h-.003l-.002.002v.002h-.002c0 .002-.002.002-.002.003v.003h-.004l-.002.003V.92h-.003v.004h-.004V.93h-.004v.008h-.005V.93h-.005v.004h-.004V.94h-.005v.008h-.005v.004h-.004v.006h-.004v.004h-.004V.97h-.006v.004h-.004V.98h-.005v.004h-.004v.005h-.005v.01h-.002v.004h-.006v.005h-.004v.002h-.004v.004h-.005v.01h-.004v.004h-.005v.004h-.004v.006h-.005v.004h-.005v.004h-.004v.004h-.004v.01h-.004v.005h-.006v.004h-.004v.004h-.005v.006h-.004v.004h-.005v.007h-.004v.004h-.006V1.1h-.002v.004h-.004v.004h-.005v.004h-.004v.006h-.005v.004h-.003l-.001.002v.002h-.002l-.004.004-.004.003v.006h-.004v.005h-.004v.004h-.004v.004h-.003l-.003.003v.003h-.002l-.002.002v.003h-.002c-.005.006-.007.01-.014.016a.366.366 0 00-.051.042l-.022.017v.001h-.001a2.821 2.821 0 01-.05.039v.001l-.073.062V1.34h-.002c-.057.047-.117.1-.186.159V1.5h-.001c-.17.148-.37.338-.595.568l-.015.015-.004.004c-1.36 1.407-3.503 4.339-3.73 9.077-.02.392-.015.773.007 1.144v.009c.109 1.867.695 3.461 1.428 4.756v.001c.292.516.607.985.926 1.405v.001c1.102 1.455 2.227 2.317 2.514 2.526.44 1.023.4 2.779.4 2.779l.644.215s-.131-1.701.053-2.522c.057-.257.192-.476.349-.662a8.38 8.38 0 00.797-.645c.018-.019.028-.036.044-.054 1.52-1.418 4.362-4.91 3.388-10.599z',
          colour: '#47A248',
        },
        {
          name: 'Docker',
          icon: mdiDocker,
          svg_d: '',
          colour: '#2496ED',
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
  async fetch() {
    let stackOverflowStats = await fetch(
      'https://api.stackexchange.com/2.2/users/13176517?site=stackoverflow'
    ).then((res) => res.json())

    this.stackOverflowStats = stackOverflowStats.items[0]

    const stackOverflowTopTags = await fetch(
      'https://api.stackexchange.com/2.2/users/13176517/top-tags?pagesize=3&site=stackoverflow'
    ).then((res) => res.json())

    this.stackOverflowTopTags = stackOverflowTopTags.items
  },
  fetchOnServer: false,
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
    typerSize() {
      const size = {
        xs: 'text-subtitle-1',
        sm: 'text-subtitle-1',
        md: 'text-h5',
        lg: 'text-h4',
        xl: 'text-h3',
      }[this.$vuetify.breakpoint.name]

      return size ? [size] : {}
    },
    svgSize() {
      const size = {
        xs: '12px',
        sm: '16px',
        md: '18px',
        lg: '36px',
        xl: '40px',
      }[this.$vuetify.breakpoint.name]

      return size ? [size] : {}
    },
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

span.nowrap {
  white-space: nowrap;
}
</style>
