import type { LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useParams
} from '@remix-run/react'
import { StylesPlaceholder } from '@mantine/remix'
import { isAuthenticated } from './utils/server/auth/auth.server'
import getAllCategories from './utils/server/categories.server'
import Layout from './components/shared/layout/layout'
import styles from './styles/app.css'
import { useIsBot } from './is-bot.context'
import { getFlash } from './utils/server/auth/session.server'
export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous'
  }
]
export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: `Derick's blog`,
  viewport: 'width=device-width,initial-scale=1'
})

export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  const categories = await getAllCategories()
  const { message, headers } = await getFlash(request)

  return json({ user, categories, message }, { headers })
}
export async function action() {
  return { ok: true }
}

export default function App() {
  const data = useLoaderData<typeof loader>()
  let isBot = useIsBot()

  return (
    <html lang='en'>
      <head>
        <StylesPlaceholder />
        <Meta />
        <Links />
      </head>
      <body className='bg-white text-zinc-900 dark:bg-zinc-900 dark:text-slate-50'>
        <Layout>
          <Outlet />
          <ScrollRestoration />
          {isBot ? null : <Scripts />}
          <LiveReload />
        </Layout>
      </body>
    </html>
  )
}
export function ErrorBoundary({ error }: any) {
  return (
    <div>
      <h1>ROOT ERROR</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  const params = useParams()

  switch (caught.status) {
    case 404: {
      return <h2>User with ID "{params.userId}" not found!</h2>
    }
    default: {
      // if we don't handle this then all bets are off. Just throw an error
      // and let the nearest ErrorBoundary handle this
      throw new Error(`${caught.status} not handled`)
    }
  }
}
