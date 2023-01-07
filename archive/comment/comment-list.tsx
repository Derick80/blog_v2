import CommentBox from './comment-box'
import CommentContent from './comment-content'

export type CommentProps = {
    id: string
    message: string
    createdAt: string
    createdBy: string

}
export default function CommentList({ comments }: { comments: CommentProps[] }) {
  return (
    <>
    {comments.map(comment => (
    <div key={comment.id} className='flex flex-col space-y-2'>
        <CommentContent {...comment} />
        </div>
  ))}
    </>
  )
}


