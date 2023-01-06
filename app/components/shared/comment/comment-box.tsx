import { Comment } from '@prisma/client'
import { format } from 'date-fns'
import { SerializedPost } from '~/utils/schemas/post-schema'
import { UserPlaceHolder } from '../icons'

type CommentBoxProps = {
    comments: Comment[]
    post: SerializedPost
}
export default function CommentBox({ comments, post }: CommentBoxProps ) {

    return(
        <>
           {comments.map((parent) => (
              <div
                className='mb-1 flex flex-col space-y-2 rounded-xl border-2 border-black p-2 shadow-lg'
                key={parent.parentId}
              >
                <h2 className='text-right'>{parent.message}</h2>
                {post.imageUrl ? (
                  <div className='relative'>
                    <img
                      src={post.imageUrl}
                      alt='avatar'
                      className='h-5 w-5 rounded-full'
                    />

                      <p
                        className='text-xs text-gray-500 absolute top-0 right-5'

                        >
                            {post.createdBy[0]}
                        </p>
                      {' '}
                      {format(new Date(post.createdAt), 'MMM dd ')}

                    <div></div>
                  </div>
                ) : (
                  <div className='h-10 w-10 rounded-full bg-gray-300'>
                    <UserPlaceHolder />
                  </div>
                )}
              </div>
            ))}

        </>
    )
}