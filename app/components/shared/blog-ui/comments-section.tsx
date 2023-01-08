import { CommentWithChildren } from '~/utils/schemas/comment-schema'
import ListComments from './list-comments'

export function CommentSection({
  comments
}: {
  comments: Array<CommentWithChildren>
}) {
  return (
    <div className='block'>
      <ListComments comments={comments || []} />
    </div>
  )
}
