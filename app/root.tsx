import type { LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react'
import { RemixInspector } from 'remix-inspector'
import Layout from './components/shared/layout/layout'
import { isAuthenticated } from './models/auth/auth.server'
import styles from './styles/app.css'
import {
  NonFlashOfWrongThemeEls,
  ThemeProvider,
  useTheme
} from './utils/theme-provider'
import { getThemeSession } from './utils/theme.server'
export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1'
})

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export async function loader({ request }: LoaderArgs) {
  const themeSession = await getThemeSession(request)
  const user = await isAuthenticated(request)

  return { theme: themeSession, user }
}
function LayoutWrapper() {
  return (
    <Layout>
      {process.env.NODE_ENV == 'development' && <RemixInspector defaultOpen={true} />}

      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </Layout>
  )
}
function App() {
  const data = useLoaderData<typeof loader>()
  const [theme] = useTheme()

  return (
    <html lang='en' className={`${theme}`}>
      <head>
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls ssrTheme={Boolean(data.theme)} />
      </head>

      <body className='flex min-h-screen flex-col bg-slate-200 from-emerald-500 to-slate-600 text-black dark:bg-gradient-to-br dark:text-white'>
        <LayoutWrapper />
      </body>
    </html>
  )
}
export default function AppWithThemeProvider() {
  const data = useLoaderData<typeof loader>()
  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  )
}
