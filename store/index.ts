import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  interests: [],
  autoJoin: false,
  ipAddress: '',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {}

export const mutations: MutationTree<RootState> = {
  setSID(state, sid) {
    // @ts-ignore
    state.auth.sid = sid
  },
  setLoggedIn(state, loggedIn) {
    // @ts-ignore
    state.auth.loggedIn = loggedIn
  },
  setIpAddress(state, ipAddress) {
    state.ipAddress = ipAddress
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit }, { req, redirect }) {
    if (process.server) {
      const headers = req && req.headers ? Object.assign({}, req.headers) : {}
      const ipAddress = headers['x-forwarded-for']

      commit('setIpAddress', ipAddress)
    }

    const cookies = this.$auth.$storage.getCookies()

    if (cookies['auth.sid']) {
      commit('setSID', cookies['auth.sid'])
      commit('setLoggedIn', true)
    }

    if (this.$auth.loggedIn) {
      const {
        data: {
          data: { getSession: getSession },
        },
      } = await this.$axios({
        method: 'post',
        url: `${process.env.WEBSITE_URL}/graphql`,
        data: {
          query:
            'query Session($id: ID!) { \
              getSession(id: $id) { \
                id \
                accessToken \
              } \
            }',
          variables: {
            id: this.$auth.$state.sid,
          },
        },
        headers: { 'Content-Type': 'application/json' },
      })

      if (!getSession) {
        if (this.$auth.$storage.getCookie('sid')) {
          this.$auth.$storage.removeCookie('sid')
        }

        return redirect(process.env.WEBSITE_URL)
      }

      try {
        const user = await this.$axios({
          method: 'get',
          url: `${process.env.DISCORD_API_BASE}/users/@me`,
          headers: {
            Authorization: `Bearer ${getSession.accessToken}`,
          },
        })

        this.$auth.setUser(user.data)
      } catch (e) {
        if (this.$auth.$storage.getCookie('sid')) {
          this.$auth.$storage.removeCookie('sid')
        }

        return redirect(`${process.env.WEBSITE_URL}/admin`)
      }
    }
  },
}
