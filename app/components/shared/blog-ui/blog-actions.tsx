import type { Post } from '~/utils/schemas/post-schema'
import Button from '../button'
import { Form, Link } from '@remix-run/react'

export default function Actions({ postId }: { postId: Post['id'] }) {
  return (
    <div className='flex flex-row gap-2'>
      <Button variant='primary_filled' size='tiny'>
        {' '}
        <Link to={`/blog/${postId}`}>View</Link>
      </Button>{' '}
      <Button variant='primary_filled' size='tiny'>
        <Link to={`/blog/${postId}/edit`}>Edit</Link>
      </Button>
      <Form method='POST' action={`/${postId}/delete`}>
        <Button
          name='action'
          value='delete'
          variant='danger_filled'
          size='tiny'
        >
          Delete
        </Button>
      </Form>
    </div>
  )
}
