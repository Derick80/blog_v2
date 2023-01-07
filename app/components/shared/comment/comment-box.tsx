import type { Comment } from '@prisma/client'
import { ChatBubbleIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import { useFetcher } from '@remix-run/react'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useOptionalUser } from '~/utils/utils'
import { UserPlaceHolder } from '../icons'

type CommentBoxProps = {
  postId?: string
  parentId?: string
  comments: Comment[]

}
export default function CommentBox({ postId, parentId , comments}: CommentBoxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const fetcher = useFetcher()
  console.log(fetcher, 'fetcher')
  console.log(postId, 'postId');

const parents = comments.filter((isParent)=> isParent.parentId === null)
console.log(parents, 'parents');
const children = comments.filter((isChild)=> isChild.parentId !== null)
console.log(children, 'children');
  const user = useOptionalUser()
  useEffect(() => {
    if (fetcher.type === 'init') {
      fetcher.load(`/comments/${postId}`)
    }
  }, [fetcher, postId])

  const fetcherComments = fetcher.data?.data?.comments.flat() as Comment[]

  return (
    <>
     <button
        type='button'
        className=''
        onClick={() => setIsOpen(!isOpen)}
      >

        {isOpen ? (

          <div className='flex-col items-center'>
            <ChevronDownIcon />
            { parents.map((parent: Comment) => (
        <div
          className='border-black mb-1 flex flex-col space-y-2 rounded-xl border-2 p-2 shadow-lg'
          key={parent.id}
        >
          <h2 className='text-right'>{parent.message}</h2>
          {user?.avatarUrl ? (
            <div className='relative'>
              <img
                src={user.avatarUrl}
                alt='avatar'
                className='h-5 w-5 rounded-full'
              />
              <p className='text-gray-500 absolute top-0 right-5 text-xs'>
                {parent.createdBy[0]}
              </p>{' '}
              {format(new Date(parent.createdAt), 'MMM dd ')}
              <div></div>
            </div>
          ) : (
            <div className='bg-gray-300 h-10 w-10 rounded-full'>
              <UserPlaceHolder />
            </div>
          )}
        </div>
      )) }



      </div>
        ) : (
          <div className='flex flex-col items-center'>
            <ChatBubbleIcon />
          </div>
        )}
      </button>


    </>
  )
}



