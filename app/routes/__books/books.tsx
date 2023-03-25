import { PlusCircledIcon } from '@radix-ui/react-icons'
import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { NavLink, useCatch, useLoaderData } from '@remix-run/react'
import BookCard from '~/components/shared/books-ui/book-card'
import { isAuthenticated } from '~/utils/server/auth/auth.server'

import { useOptionalUser } from '~/utils/utilities'
import { getAllBooks, getBookCategories } from '~/utils/server/book.server'

export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)

  const books = await getAllBooks()
  if (!books) {
    throw new Error('Books not found')
  }
  const categories = await getBookCategories()
  if (!categories) {
    throw new Error('Categories not found')
  }

  return json({ books, categories })
}

export default function BookIndex() {
  const data = useLoaderData<typeof loader>()
  console.log(data, 'data')
  const user = useOptionalUser()
  return (
    <div className='flex flex-col items-center'>
      {user && (
        <NavLink
          to='/books/new'
          className='flex flex-row-reverse items-center gap-2 text-black dark:text-slate-50'
        >
          <PlusCircledIcon />
          <h3 className='h3'>Add Book</h3>
        </NavLink>
      )}

      {data.books.map((book) => {
        return <BookCard key={book.id} book={book} />
      })}
    </div>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  )
}
export function ErrorBoundary({ error }: any) {
  return (
    <div>
      <h1 className='text-3xl font-bold'>Incomes root ERROR</h1>
      <p>{error.message || error.statusText}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  )
}
