import {
  json,
  LinksFunction,
  LoaderArgs,
  MetaFunction,
  SerializeFrom
} from '@remix-run/node'
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
import { Analytics } from '@vercel/analytics/react'
declare global {
  interface Window {
    ENV: SerializeFrom<typeof loader>['ENV']
  }
}
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

  const { message, headers } = await getFlash(request)

  return json(
    {
      user,
      categories,
      message,
      ENV: {
        VERCEL_ANALYTICS_ID: process.env.VERCEL_ANALYTICS_ID
      }
    },
    { headers }
  )
}
export async function action() {
  return { ok: true }
}

export default function App() {
  const data = useLoaderData<typeof loader>()
  let isBot = useIsBot()
  // bg-gradient-to-b from-[#2e026d] to-[#15162c]
  return (
    <html lang='en'>
      <head>
        <StylesPlaceholder />
        <Meta />
        <Links />
      </head>
      {/* bg-gradient-to-b from-crimson3 to-crimson1 text-slate12' */}
      <body className=''>
        <Layout>
          <Outlet />
          <Analytics />
          <ScrollRestoration />
          {isBot ? null : <Scripts />}
          <LiveReload />
          {/* 👇 Write the ENV values to the window */}
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(data.ENV)}`
            }}
          />
        </Layout>
      </body>
    </html>
  )
}
