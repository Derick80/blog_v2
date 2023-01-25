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
import Layout from './components/shared/layout/layout'
import { isAuthenticated } from './utils/server/auth/auth.server'
import styles from './styles/app.css'

import getAllCategories from './utils/server/categories.server'
export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1'
})

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous'
  }
]

export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  const categories = await getAllCategories()

  return {  user, categories }
}
function LayoutWrapper() {
  return (
    <Layout>
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </Layout>
  )
}
function App() {
  const data = useLoaderData<typeof loader>()

  return (
    <html lang='en' >
      <head>
        <Meta />
        <Links />
      </head>

      <body className=''>
        <LayoutWrapper />
      </body>
    </html>
  )
}
export default function AppWithThemeProvider() {
  const data = useLoaderData<typeof loader>()
  return (

      <App />

  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        {error && <div> {error.message}</div>} <Scripts />
      </body>
    </html>
  )
}
