import { PlusCircledIcon } from '@radix-ui/react-icons'
import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { NavLink, useLoaderData } from '@remix-run/react'
import BookCard from '~/components/shared/books-ui/book-card'
import { getBookByBookId } from '~/utils/server/book.server'
import { Text } from '@mantine/core'

export async function loader({ request, params }: LoaderArgs) {
  const { id } = params
  if (!id) {
    throw new Error('id is required')
  }
  const book = await getBookByBookId(id)

  if (!book) {
    throw new Error('Book not found')
  }

  return json({ book })
}

export default function BookRoute() {
  const data = useLoaderData<typeof loader>()
  console.log(data, 'data')

  return (
    <div className='flex flex-col items-center'>
      <NavLink
        to='/books/new'
        className='flex flex-row-reverse items-center gap-2 text-blue-500'
      >
        <PlusCircledIcon />
        <h3 className=''>Add Book</h3>
      </NavLink>
      <BookCard book={data.book} />
    </div>
  )
}
