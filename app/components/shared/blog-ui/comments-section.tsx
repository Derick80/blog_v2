import { useFetcher } from '@remix-run/react'
import { IconMessage2 } from '@tabler/icons'
import React, { useEffect } from 'react'
import type { CommentWithChildren } from '~/utils/schemas/comment-schema'
import { Button } from '../button'
import { CommentForm } from './commentForm'
import { CommentList } from './commentList'
import formatComments from './format-comments'

type CommentSectionProps = {
  comments?: Array<CommentWithChildren>
  postComments?: number
  postId: string
}
export function CommentSection({
  comments,
  postComments,
  postId
}: CommentSectionProps) {
  const [isOpen, setIsOpen] = React.useState(true)
  const fetcher = useFetcher()

  useEffect(() => {
    if (fetcher.type === "init") {
      fetcher.load("/blog");
    }
  }, [fetcher]);


console.log(fetcher.data);

const rootComments = fetcher.data




  return (
    <div className='flex flex-row-reverse p-2'>
      <h3 className="comments-title">Comments</h3>
      <section>
        <CommentForm

        />
        {rootComments != null && rootComments.length > 0 && (
          <div className="mt-4">
            <CommentList comments={rootComments} />
          </div>
        )}
      </section>
    </div>
  )
}
