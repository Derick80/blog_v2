import { createCookieSessionStorage } from '@remix-run/node'
import { isTheme, Theme } from './theme-provider'

const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
  throw new Error('NO SESSION_SECRET!!')
}

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: 'my_theme',
    secure: false,
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    httpOnly: true
  }
})

async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(request.headers.get('Cookie'))
  return {
    getTheme: () => {
      const themeValue = session.get('theme')
      // default to dark
      return isTheme(themeValue) ? themeValue : Theme.DARK
    },
    setTheme: (theme: Theme) => session.set('theme', theme),
    commit: () =>
      themeStorage.commitSession(session, { expires: new Date('2099-05-23') })
  }
}

export { getThemeSession }
