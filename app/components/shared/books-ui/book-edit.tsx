import { Rating, MultiSelect, Button } from '@mantine/core'
import { BookCategory } from '@prisma/client'
import { Form, useFetcher, useLoaderData } from '@remix-run/react'
import { format } from 'date-fns'
import React from 'react'
import { loader } from '~/routes/__books/books.$id.edit'
import TipTap from '../tip-tap'

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
        <label htmlFor='dateCompleted'>Date Completed</label>
        {data.book?.dateCompleted ? (
          <input
            type='date'
            name='dateCompleted'
            className='rounded-md border text-black'
            defaultValue={format(
              new Date(data.book.dateCompleted),
              'yyyy-MM-dd'
            )}
            id='dateCompleted'
          />
        ) : null}
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
      <button type='submit' form='new-book'>
        Submit
      </button>
    </>
  )
}
