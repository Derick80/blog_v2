import { Box } from '@mantine/core'
import { CommentWithChildren } from '~/utils/schemas/comment-schema'
import CommentForm from './comment-form'
import formatComments from './format-comments'
import ListComments from './list-comments'


type CommentSectionProps = {
    comments?: Array<CommentWithChildren>
}
export function CommentSection({ comments }: CommentSectionProps
) {

    const comment = comments.map((comment) => comment   )


  return (

<Box>

<CommentForm


comments={formatComments(comment || [])}


/>



{comments && <ListComments comments={formatComments(comments || [])} />}

</Box>

  )
}
