import { PlusCircledIcon } from '@radix-ui/react-icons'
import { json, LoaderArgs } from '@remix-run/node'
import { NavLink, useLoaderData } from '@remix-run/react'
import BookCard from '~/components/shared/books-ui/book-card'
import { Text } from '@mantine/core'
import { Book } from '~/utils/schemas/book-schema'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
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

  return (
    <div className='flex flex-col items-center'>
      <NavLink
        to='/books/new'
        className='flex flex-row-reverse items-center gap-2 text-blue-500'
      >
        <PlusCircledIcon />
        <Text size='sm'>Add Book</Text>
      </NavLink>

      {data.books.map((book) => {
        return <BookCard key={book.id} book={book} />
      })}
    </div>
  )
}
