import { Rating, MultiSelect, Button } from '@mantine/core'
import type { BookCategory } from '@prisma/client'
import { TrashIcon } from '@radix-ui/react-icons'
import { Form, useFetcher, useLoaderData } from '@remix-run/react'
import React from 'react'
import type { loader } from '~/routes/__books/books.$id.edit'
import TipTap from '../tip-tap'
import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'
dayjs.extend(utc)
export default function EditBookReview() {
  const data = useLoaderData<typeof loader>()
  const bookCategoryFetcher = useFetcher()

  React.useEffect(() => {
    if (bookCategoryFetcher.type === 'init') {
      bookCategoryFetcher.load('/books')
    }
  }, [bookCategoryFetcher])

  console.log(bookCategoryFetcher?.data?.categories, 'bookCategoryFetcher.data')
  const [selected, setSelected] = React.useState<string[]>(
    data.book.categories.map((item) => item.value)
  )

  const bookImageFetcher = useFetcher()
  const onClick = async () =>
    bookImageFetcher.submit({
      imageUrl: 'imageUrl',
      key: 'imageUrl',
      action: '/actions/cloudinary'
    })

  return (
    <>
      <form
        method='post'
        id='new-book'
        className='mx-auto flex flex-col gap-4 rounded-xl border p-2'
      >
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          className='rounded-md border text-black'
          defaultValue={data.book?.title}
          name='title'
          id='title'
        />

        <label htmlFor='review'>Review</label>
        <TipTap content={data.book?.review} />
        <label htmlFor='rating'>Rating</label>
        <Rating
          name='rating'
          id='rating'
          fractions={2}
          defaultValue={data.book?.rating ? data.book?.rating : 3}
        />

        <label htmlFor='bookBlurb'>Book Blurb</label>
        <input type='text' name='bookBlurb' id='bookBlurb' />

        <label htmlFor='dateCompleted'>Date Completed</label>

        <input
          type='date'
          name='dateCompleted'
          className='rounded-md border text-black'
          defaultValue={dayjs(data.book.dateCompleted)
            .utcOffset(10)
            .format('YYYY-MM-DD')}
          id='dateCompleted'
        />

        <input
          type='hidden'
          className='rounded-xl text-slate12'
          name='imageUrl'
          value={bookImageFetcher?.data?.imageUrl || data.book?.image}
          onChange={(e) => console.log(e.target.value)}
        />
        <label htmlFor='categories'>Categories</label>
        {bookCategoryFetcher?.data?.categories ? (
          <MultiSelect
            label='Categories'
            name='categories'
            id='categories'
            data={bookCategoryFetcher?.data?.categories.map(
              (category: BookCategory) => category.value
            )}
            defaultValue={selected}
          />
        ) : null}

        <label htmlFor='bookUrl'>Book Url</label>
        <input
          type='text'
          name='bookUrl'
          id='bookUrl'
          className='rounded-md border text-black'
          defaultValue={data.book?.bookUrl}
        />
      </form>

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
              <img
                src={bookImageFetcher?.data?.imageUrl || data.book.image}
                alt={'#'}
              />
            </div>
          </div>
        ) : null}
      </div>
      <button type='submit' form='new-book' name='_action' value='save'>
        Submit
      </button>

      <Form
        method='post'
        action={`/books/${data.book.id}/delete`}
        id='delete-book'
      >
        <button form='delete-book' type='submit' name='_action' value='delete'>
          Delete <TrashIcon />
        </button>
      </Form>
    </>
  )
}