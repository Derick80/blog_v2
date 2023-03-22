import { PlusCircledIcon } from '@radix-ui/react-icons'
import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { NavLink, useLoaderData } from '@remix-run/react'
import EditBookReview from '~/components/shared/books-ui/book-edit'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import {
  deleteBookReview,
  getBookByBookId,
  updateBookReview
} from '~/utils/server/book.server'
import { validateText } from '~/utils/validators.server'
import { Text } from '@mantine/core'
export async function loader({ request, params }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    throw new Error('Not Authenticated')
  }
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

export async function action({ request, params }: ActionArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    throw new Error('Not Authenticated')
  }
  const { id } = params
  if (!id) {
    throw new Error('id is required')
  }
  const formData = await request.formData()
  const action = formData.get('_action') as string
  const title = formData.get('title') as string
  const review = formData.get('body') as string
  const rating = Number(formData.get('rating'))
  const bookBlurb = formData.get('bookBlurb') as string
  const image = formData.get('imageUrl') as string
  const bookUrl = formData.get('bookUrl') as string
  const dateCompleted = new Date(formData.get('dateCompleted') as string)
  const categories = formData.get('categories') as string

  if (typeof title !== 'string') {
    throw new Error('title is required')
  }

  const cats = categories?.split(',')
  const category = cats.map((cat) => {
    return {
      value: cat
    }
  })
  const formErrors = {
    title: validateText(title),
    review: validateText(review)
  }
  const book = {
    userId: user.id,
    title,
    review,
    rating,
    bookBlurb,
    image,
    bookUrl,
    dateCompleted,
    categories: category,
    id
  }
  if (Object.values(formErrors).some(Boolean)) {
    return json(
      {
        formErrors,
        fields: {
          id,
          title,
          review,
          rating,
          bookBlurb,
          image,
          bookUrl,
          dateCompleted,
          categories
        },
        bookId: id
      },
      {
        status: 400
      }
    )
  }

  switch (action) {
    case 'save':
      await updateBookReview(book)
      return redirect(`/books/${id}`)
    case 'delete':
      await deleteBookReview(id)
      return redirect(`/books`)
    default:
      break
  }

  return redirect(`/books/${id}`)
}

export default function EditBookRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className='flex flex-col items-center'>
      <NavLink
        to='/books/new'
        className='flex flex-row-reverse items-center gap-2 text-blue-500'
      >
        <PlusCircledIcon />
        <Text size='sm'>Add Book</Text>
      </NavLink>
      <EditBookReview />
    </div>
  )
}
