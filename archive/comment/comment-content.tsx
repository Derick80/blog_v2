import { ChatBubbleIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import { useFetcher, useMatches } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { useMatchesData, useOptionalUser } from '~/utils/utils'
import CommentList, { CommentProps } from './comment-list'
type ChildCommentProps = {
    id: string
    message: string
    createdAt: string
    createdBy: string
    parentId?: string
}
type Props = {
    id: string
    message: string
    createdAt: string
    createdBy: string

}

export default function CommentContent({id, message, createdAt, createdBy}: Props){
    const [isOpen, setIsOpen] = useState(false)
    const fetcher = useFetcher()

    function handleOpen(){
        setIsOpen(!isOpen)
        fetcher.load(`/comments/${id}`)

    }

const childComments = fetcher.data?.data?.comments as ChildCommentProps[]
console.log(childComments, 'childComments');
    return(
        <>
        <button
        type='button'
        className=''
        onClick={() => handleOpen()}
      >

        {isOpen ? (

            <div className='flex-col items-center'>
    <CommentList comments={childComments} />

            </div>
        )
        :
        (
            <ChevronDownIcon />

        )
        }



  </button>
        </>
    )


}