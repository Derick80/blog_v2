import { json, LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
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
      <body className='bg-white text-zinc-900 dark:text-slate-50 dark:bg-zinc-900'>
        <Layout>
          <Outlet context={data} />
          <ScrollRestoration />
          {isBot ? null : <Scripts />}
          <LiveReload />
        </Layout>
      </body>
    </html>
  )
}
export function ErrorBoundary() {
  return (
    <div>
      <h1>ROOT ERROR</h1>
    </div>
  )
}

export function CatchBoundary() {
  return (
    <div>
      <h1>ROOT CATCH</h1>
    </div>
  )
}
