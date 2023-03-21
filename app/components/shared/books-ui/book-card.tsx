import { Card, Text, Rating, Flex, Image, Box, Group } from '@mantine/core'
import { SerializeFrom } from '@remix-run/node'
import { Link } from '@remix-run/react'
import dayjs from 'dayjs'
import { Book } from '~/utils/schemas/book-schema'
import { useOptionalUser } from '~/utils/utilities'

export default function BookCard({ book }: { book: SerializeFrom<Book> }) {
  const user = useOptionalUser()
  return (
    <>
      <Card
        withBorder
        shadow='sm'
        radius='md'
        className='mb-5 flex '
        key={book.id}
        sx={{
          width: '350px'
        }}
      >
        <Flex direction='column' align='center'>
          <h1 className='text-2xl font-bold'>{book.title}</h1>
          <Flex
            direction='row'
            align='center'
            justify='center'
            sx={{
              width: '100%',
              height: '100%'
            }}
          >
            <Image src={book.image} fit='cover' />
          </Flex>

          <div className='flex w-full flex-row items-center justify-between gap-5'>
            <Rating
              className=''
              value={book.rating}
              fractions={2}
              size='lg'
              readOnly
            />
            {book.dateCompleted && (
              <Text className='text-sm italic'>
                {dayjs(book.dateCompleted).format('MMMM D, YYYY')}
              </Text>
            )}
          </div>
          <div
            className='text-sm '
            dangerouslySetInnerHTML={{ __html: book.review }}
          />
          <Box>
            <a
              href={book.bookUrl || 'buy'}
              target='_blank'
              rel='noopener noreferrer'
            >
              <button className='rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700'>
                Buy on Amazon
              </button>
            </a>
          </Box>
          <Group position='center'>
            {book.userId === user?.id && (
              <Link
                to={`/books/${book.id}/edit`}
                className='text-blue-500 hover:text-blue-700'
              >
                Edit
              </Link>
            )}
          </Group>
        </Flex>
      </Card>
    </>
  )
}
