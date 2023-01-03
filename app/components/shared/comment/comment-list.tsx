import { Comment } from '@prisma/client'
import { useParams } from '@remix-run/react'
import { Link } from 'react-router-dom'

export type Props = {
  comments: Comment[]
}

export default function CommentList({ comments }: Props) {
  return (
    <div>
      {comments.map((comment) => (
        <RootComments key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

type commentList = {
  comment: Comment
}
function RootComments({ comment }: commentList) {
  console.log('comment', comment.id);

  return (
    <ul key={comment.id} className='w-1/2 rounded-xl'>
      <li className='flex flex-col space-y-2'>{comment.message}</li>
      <li>
        <form method='post' action={`/blog/${comment.postId}/${comment.id}`}>
          <button type='submit'>Delete</button>
          </form>

      </li>
    </ul>
  )
}
