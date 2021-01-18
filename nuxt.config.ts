import colors from 'vuetify/es5/util/colors'

const title = "Syntle's Portfolio"
const description =
  'A passionate, quick learning, self-taught software engineer who strives to build robust and efficient applications.'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: title,
    title: title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: description,
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: process.env.WEBSITE_URL,
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: title,
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: description,
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: title,
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description,
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: '@/plugins/VueTyper', ssr: false }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},
  auth: {
    redirect: {
      login: '/admin',
    },
    strategies: {
      discord: {
        _scheme: 'oauth2',
        authorization_endpoint: 'https://discord.com/api/oauth2/authorize',
        userinfo_endpoint: false,
        scope: ['identify'],
        response_type: 'code',
        redirect_uri: `${process.env.WEBSITE_URL}/token`,
        client_id: process.env.CLIENT_ID,
      },
    },
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
      icons: {
        iconfont: 'mdiSvg',
      },
    },
    treeShake: {
      components: [
        'VCard',
        'VIcon',
        'VForm',
        'VImg',
        'VTooltip',
        'VBtn',
        'VVirtualScroll',
        'VHover',
        'VList',
        'VDivider',
        'VSpacer',
        'VOverlay',
        'VDialog',
        'VAppBar',
      ],
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    DISCORD_API_BASE: process.env.DISCORD_API_BASE,
    WEBSITE_URL: process.env.WEBSITE_URL,
    SE_API_BASE: process.env.SE_API_BASE,
    OWNER_ID: process.env.OWNER_ID,
  },
  server: {
    port: process.env.PORT,
    host: '0.0.0.0',
  },
  router: {
    middleware: ['user'],
  },
  serverMiddleware: ['~/api/discord', '~/graphql/main'],
  privateRuntimeConfig: {
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    WEBHOOK_URL: process.env.WEBHOOK_URL,
  },
}
