import type { Post } from '~/utils/schemas/post-schema'
import Button from '../button'
import { Form, Link } from '@remix-run/react'

export default function Actions({ postId }: { postId: Post['id'] }) {
  return (
    <div className='flex flex-row gap-2'>
      <Button variant='primary_filled' size='small'>
        {' '}
        <Link to={`/blog/${postId}`}>View</Link>
      </Button>{' '}
      <Button variant='primary_filled' size='small'>
        <Link to={`/blog/${postId}/edit`}>Edit</Link>
      </Button>
      <Form method='POST' action={`/blog/${postId}/delete`}>
        <Button variant='danger_filled' size='small'>
          Delete
        </Button>
      </Form>
    </div>
  )
}
