import type { PostAndComments } from '~/models/post.server'
import CommentContent from './comment'
import CommentActionBox from './comment-actions'

export type Props = {
  comments: {
    id: string
    message: string
    postId: string
    user: {
      id: string
      userName: string
      avatarUrl: string
      createdAt: string
    }[]
  }[]
}

export default function CommentList({ comments }: Props) {
  return (
    <ul className='flex flex-col gap-4'>
      {comments.map((comment) => (
        <CommentContent
          key={comment.id}
          comment={comment}
          user={comment.user}
        />
      ))}

      <CommentActionBox />
    </ul>
  )
}
