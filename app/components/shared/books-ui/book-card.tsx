import { Card, Rating, Image, Button, Spoiler } from '@mantine/core'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import type { SerializeFrom } from '@remix-run/node'
import { Form, Link } from '@remix-run/react'
import dayjs from 'dayjs'
import type { Book } from '~/utils/schemas/book-schema'
import { useOptionalUser } from '~/utils/utilities'

export default function BookCard({ book }: { book: SerializeFrom<Book> }) {
  const user = useOptionalUser()
  return (
    <>
      <Card
        withBorder
        shadow='sm'
        radius='md'
        className='mb-5 flex w-[350px] flex-col items-center justify-center gap-5 p-2 md:w-[650px]'
        key={book.id}
      >
        <div className='flex w-full flex-col justify-between'>
          <p className='text-xl font-bold'>Book in Review</p>
          <h1 className='mb-2 text-2xl font-bold italic'>{book.title}</h1>

          <div className='flex flex-row items-center justify-center gap-2'>
            <Image src={book.image} fit='cover' />
          </div>

          <div className='flex w-full flex-row items-center justify-between gap-5'>
            <Rating
              className=''
              value={book.rating}
              fractions={2}
              size='lg'
              readOnly
            />
            {book.dateCompleted && (
              <p className='text-sm italic'>
                {dayjs(book.dateCompleted).format('MMMM D, YYYY')}
              </p>
            )}
          </div>
          <div
            className='prose text-sm '
            dangerouslySetInnerHTML={{ __html: book.review }}
          />
          <Spoiler maxHeight={60} showLabel='more...' hideLabel='...less'>
            <h3 className='text-xl font-bold'>Blurb</h3>
            <p className='prose text-sm italic'>{book.bookBlurb}</p>
          </Spoiler>
          {/* below should be actions container for this card */}
          <div className='flex items-center'>
            <a
              href={book.bookUrl || 'buy'}
              target='_blank'
              rel='noopener noreferrer'
            >
              <button className='rounded py-2 px-4 font-bold text-black hover:bg-blue-700'>
                Buy on Amazon
              </button>
            </a>
            <p>Likes container</p>
          </div>
          <div className='flex w-full justify-between text-sm'>
            {' '}
            {book.userId === user?.id && (
              <>
                <Link
                  to={`/books/${book.id}/edit`}
                  className='flex items-center gap-2 text-green-500'
                >
                  <Pencil1Icon />
                </Link>
                <Form
                  action={`/books/${book.id}/delete`}
                  method='post'
                  id='deleteBook'
                  reloadDocument
                >
                  <Button
                    type='submit'
                    form='deleteBook'
                    className='text-red-500 hover:text-red-700'
                  >
                    <TrashIcon />
                  </Button>
                </Form>
              </>
            )}
          </div>
        </div>
      </Card>
    </>
  )
}
