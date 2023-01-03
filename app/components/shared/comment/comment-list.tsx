import { useState } from 'react'
import Comment from './comment'

export type Props = {
  rootComments:
}

export default function CommentList({ rootComments }: Props) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <span className='material-symbols-outlined justify-right'>
            expand_less
          </span>
        ) : (
          <span className='material-symbols-outlined'>expand_more</span>
        )}
      </button>

      {isOpen && (
        <div className='mt-1 flex flex-col items-center'>
          {rootComments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </>
  )
}
