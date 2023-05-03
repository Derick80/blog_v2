import type { LinksFunction, LoaderArgs, SerializeFrom } from '@remix-run/node'
import { json } from '@remix-run/node'
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
import Layout from './components/shared/layout/layout'
import styles from './tailwind.css'
import { useIsBot } from './is-bot.context'
import { ToastMessage, commitSession, getFlash, getSession } from './utils/server/auth/session.server'
import { Toaster, toast } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'
import React from 'react'
declare global {
  interface Window {
    ENV: SerializeFrom<typeof loader>['ENV']
  }
}

export function meta() {
  return [
    {
      name: 'description',
      content: 'A blog about web development and programming'
    },
    {
      name: 'keywords',
      content:
        'web development, programming, javascript, typescript, react, remix, tailwind, vercel'
    },
    {
      name: 'author',
      content: 'Derick Hoskinson'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    }
  ]
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
  const session = await getSession(request.headers.get('Cookie'))

  const toastMessage = (await session.get('toastMessage')) as ToastMessage

  if (!toastMessage) {
    return json({ toastMessage: null, user })
  }

  if (!toastMessage.type) {
    throw new Error('Message should have a type')
  }

   return json(
    {
      user,
      toastMessage,
      ENV: {
        VERCEL_ANALYTICS_ID: process.env.VERCEL_ANALYTICS_ID
      }
    },
    { headers :{
      'Set-Cookie': await commitSession(session)
    }}
  )
}
export async function action() {
  return { ok: true }
}

export default function App() {
  const data = useLoaderData<{
    user: any
    toastMessage: ToastMessage
    ENV: {
      VERCEL_ANALYTICS_ID: string
    }
  }>()
  const { toastMessage } = data
  let isBot = useIsBot()

  React.useEffect(() => {
    if (!toastMessage) {
      return
    }
    const { message, type } = toastMessage

    switch (type) {
      case 'success':
        toast.success(message)
        break
      case 'error':
        toast.error(message)
        break
      default:
        throw new Error(`${type} is not handled`)
    }
  }, [toastMessage])

  // bg-gradient-to-b from-[#2e026d] to-[#15162c]
  return (
    <html lang='en'>
      <head>
        <StylesPlaceholder />
        <Meta />
        <Links />
      </head>
      {/* bg-gradient-to-b from-crimson3 to-crimson1 text-slate12' */}
      <body className='bg-slate-50 text-black dark:bg-slate-900 dark:text-slate-50'>
        <Layout>
          <Outlet />
          <Toaster
              position='bottom-right'
              toastOptions={{
                success: {
                  style: {
                    background: 'green'
                  }
                },
                error: {
                  style: {
                    background: 'red'
                  }
                }
              }}
            />
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
