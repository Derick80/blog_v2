import { ActionArgs, LoaderArgs, redirect } from '@remix-run/node'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { createNewBookReview } from '~/utils/server/book.server'
import { json } from '@remix-run/node'
import { Form, useActionData, useFetcher } from '@remix-run/react'
import TipTap from '~/components/shared/tip-tap'
import { useNavigation, useRouteLoaderData } from 'react-router-dom'
import { Button, MultiSelect, Rating } from '@mantine/core'
import { BookCategory } from '@prisma/client'
import React, { useEffect } from 'react'
export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)

  if (!user) {
    throw new Response('Not authenticated', { status: 401 })
  }
  return json({ user })
}
export async function action({ request }: ActionArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    throw new Error('Not Authenticated')
  }

  const userId = user.id
  const formData = await request.formData()
  const title = formData.get('title')
  const review = formData.get('body')
  const rating = Number(formData.get('rating'))
  const image = formData.get('imageUrl')
  const bookUrl = formData.get('bookUrl')
  const dateCompleted = formData.get('dateCompleted')
  const categories = formData.get('categories') as string

  const cats = categories?.split(',')

  const category = cats.map((cat) => {
    return {
      value: cat
    }
  })
  const book = {
    title,
    review,
    rating,
    image,
    bookUrl,
    dateCompleted,
    userId,
    categories: category
  }

  await createNewBookReview(book)

  return redirect('/books')
}

export default function NewBookRoute() {
  const navigation = useNavigation()
  const actionData = useActionData<typeof action>()
  const bookCategoryFetcher = useFetcher()

  useEffect(() => {
    if (bookCategoryFetcher.type === 'init') {
      bookCategoryFetcher.load('/books')
    }
  }, [bookCategoryFetcher])

  console.log(bookCategoryFetcher?.data?.categories, 'bookCategoryFetcher.data')

  const [selected, setSelected] = React.useState<string>('')

  const bookImageFetcher = useFetcher()

  const onClick = async () =>
    bookImageFetcher.submit({
      imageUrl: 'imageUrl',
      key: 'imageUrl',
      action: '/actions/cloudinary'
    })

  return (
    <div>
      <h1>New Book</h1>
      <Form method='post' id='new-book' className='flex flex-col gap-4'>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          className='rounded-md border text-black'
          defaultValue={actionData ? actionData.formErrors.title : ''}
          name='title'
          id='title'
        />
        {actionData && actionData.errors.name ? (
          <p style={{ color: 'red' }}>{actionData.errors.name}</p>
        ) : null}
        <label htmlFor='review'>Review</label>
        <TipTap />
        <label htmlFor='rating'>Rating</label>
        <Rating name='rating' id='rating' fractions={2} defaultValue={3} />
        <label htmlFor='dateCompleted'>Date Completed</label>
        <input type='date' name='dateCompleted' id='dateCompleted' />
        <input
          type='hidden'
          className='rounded-xl text-slate12'
          name='imageUrl'
          value={bookImageFetcher?.data?.imageUrl}
          onChange={(e) => console.log(e.target.value)}
        />
        <label htmlFor='categories'>Categories</label>
        {bookCategoryFetcher?.data?.categories ? (
          <MultiSelect
            data={bookCategoryFetcher?.data?.categories.map(
              (category: BookCategory) => category.value
            )}
            onChange={(e) => {
              setSelected(e.join(','))
            }}
          />
        ) : null}
        <input
          type='hidden'
          name='categories'
          id='categories'
          value={selected}
        />

        <label htmlFor='bookUrl'>Book Url</label>
        <input type='text' name='bookUrl' id='bookUrl' />
      </Form>

      <div className='flex flex-col gap-5'>
        <bookImageFetcher.Form
          method='post'
          encType='multipart/form-data'
          action='/actions/cloudinary'
          onClick={onClick}
          className='flex flex-col gap-5'
        >
          <label htmlFor='imageUrl'>Upload an Image</label>
          <input
            id='imageUrl'
            className='block rounded-xl bg-crimson12 text-slate12'
            type='file'
            name='imageUrl'
            accept='image/*'
          />
          <Button color={'blue'} variant='subtle' type='submit'>
            Upload Image
          </Button>
        </bookImageFetcher.Form>
        {bookImageFetcher.data ? (
          <div className='flex  flex-col items-center'>
            <p className='text-white'>File has been uploaded</p>
            <input
              type='hidden'
              name='imageUrl'
              value={bookImageFetcher?.data?.imageUrl}
            />
            <div className='h-[100px] w-[100px] rounded-xl bg-crimson12 text-slate12'>
              <img src={bookImageFetcher?.data?.imageUrl} alt={'#'} />
            </div>
          </div>
        ) : null}
      </div>
      <button type='submit' form='new-book'>
        Submit
      </button>
    </div>
  )
}
