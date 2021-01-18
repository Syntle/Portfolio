import { Middleware } from '@nuxt/types'

const userMiddleware: Middleware = async ({ $auth, $axios, redirect, env }) => {
  if ($auth.loggedIn) {
    const {
      data: {
        data: { getSession: getSession },
      },
    } = await $axios({
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
          id: $auth.$state.sid,
        },
      },
      headers: { 'Content-Type': 'application/json' },
    })

    if (!getSession) {
      if ($auth.$storage.getCookie('sid')) {
        $auth.$storage.removeCookie('sid')
      }

      return redirect(env.WEBSITE_URL)
    }

    const user = await $axios.$post(`${env.WEBSITE_URL}/api/discord/user`, {
      token: getSession.accessToken,
    })

    $auth.setUser(user)
  }
}

export default userMiddleware
