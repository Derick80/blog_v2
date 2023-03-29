import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { createNewBookReview } from '~/utils/server/book.server'
import { json } from '@remix-run/node'
import { Form, useActionData, useCatch, useFetcher } from '@remix-run/react'
import TipTap from '~/components/shared/tip-tap'
import { useNavigation } from 'react-router-dom'
import { Button, MultiSelect, Rating } from '@mantine/core'
import React, { useEffect } from 'react'
import { wait } from '~/utils/server/functions.server'
import { validateText, validateTitle } from '~/utils/validators.server'
export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)

  if (!user) {
    throw new Response('Not authenticated', { status: 401 })
  }
  return json({ user })
}
export async function action({ request }: ActionArgs) {
  await wait()
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
  const bookBlurb = formData.get('bookBlurb')
  const dateCompleted = formData.get('dateCompleted')
  const categories = formData.get('categories')
  if (
    typeof title !== 'string' ||
    typeof review !== 'string' ||
    typeof image !== 'string' ||
    typeof bookUrl !== 'string' ||
    typeof bookBlurb !== 'string' ||
    typeof dateCompleted !== 'string' ||
    typeof categories !== 'string'
  ) {
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
    review: validateTitle(review),
    image: validateText(image),
    bookUrl: validateText(bookUrl),
    bookBlurb: validateText(bookBlurb),
    dateCompleted: validateText(dateCompleted),
    categories: validateText(categories)
  }

  if (Object.values(formErrors).some(Boolean)) {
    return json(
      {
        formErrors,
        fields: {
          title,
          review,
          rating,
          image,
          bookBlurb,
          bookUrl,
          dateCompleted,
          categories
        },
        form: action
      },
      { status: 400 }
    )
  }

  const book = {
    title,
    review,
    rating,
    image,
    bookBlurb,
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

  const text =
    navigation.state === 'submitting'
      ? 'Saving...'
      : navigation.state === 'loading'
      ? 'Saved!'
      : 'Save'

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
          className='rounded-md border text-slate12'
          defaultValue={actionData ? actionData.formErrors.title : ''}
          name='title'
          id='title'
        />
        {actionData && actionData.formErrors ? (
          <p style={{ color: 'red' }}>{actionData.formErrors.title}</p>
        ) : null}
        <label htmlFor='review'>Review</label>
        <TipTap />
        <label htmlFor='bookBlurb'>Book Blurb</label>
        <textarea
          name='bookBlurb'
          id='bookBlurb'
          defaultValue={actionData ? actionData.formErrors.bookBlurb : ''}
          className='rounded-xl border text-slate12'
        />
        {actionData && actionData.formErrors ? (
          <p style={{ color: 'red' }}>{actionData.formErrors.bookBlurb}</p>
        ) : null}
        <label htmlFor='rating'>Rating</label>
        <Rating name='rating' id='rating' fractions={2} defaultValue={3} />
        <label htmlFor='dateCompleted'>Date Completed</label>
        <input type='date' name='dateCompleted' id='dateCompleted' />
        <input
          type='hidden'
          className='rounded-xl text-slate12'
          name='imageUrl'
          defaultValue={actionData ? actionData.formErrors.image : ''}
          value={bookImageFetcher?.data?.imageUrl}
          onChange={(e) => console.log(e.target.value)}
        />
        {actionData && actionData.formErrors ? (
          <p style={{ color: 'red' }}>{actionData.formErrors.image}</p>
        ) : null}
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
          defaultValue={actionData ? actionData.formErrors.categories : ''}
          name='categories'
          id='categories'
          value={selected}
        />{' '}
        {actionData && actionData.formErrors ? (
          <p style={{ color: 'red' }}>{actionData.formErrors.categories}</p>
        ) : null}
        <label htmlFor='bookUrl'>Book Url</label>
        <input
          type='text'
          name='bookUrl'
          id='bookUrl'
          defaultValue={actionData ? actionData.formErrors.bookUrl : ''}
        />
        {actionData && actionData.formErrors ? (
          <p style={{ color: 'red' }}>{actionData.formErrors.bookUrl}</p>
        ) : null}
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
            className='block rounded-xl  text-slate12'
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
            <div className='h-[100px] w-[100px] rounded-xl  text-slate12'>
              <img src={bookImageFetcher?.data?.imageUrl} alt={'#'} />
            </div>
          </div>
        ) : null}
      </div>
      <button type='submit' form='new-book'>
        {text}
      </button>
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
