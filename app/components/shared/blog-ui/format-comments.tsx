import { CommentWithChildren } from '~/utils/schemas/comment-schema'
import { Comment } from '~/utils/schemas/comment-schema'

export default function FormatComments(comments: Array<Comment>) {
  const map = new Map()
  const roots: Array<CommentWithChildren> = []

  for (let i = 0; i < comments.length; i++) {
    const commentId = comments[i]?.id

    map.set(commentId, i)

    ;(comments[i] as unknown as CommentWithChildren).children = []

    if (typeof comments[i].parentId === 'string') {
      const parentCommentIndex: number = map
        .get(comments[i]?.parentId)
        (comments[parentCommentIndex] as unknown as CommentWithChildren)
        .children.push(comments[i] as unknown as CommentWithChildren)

      continue
    }
    roots.push(comments[i] as unknown as CommentWithChildren)
  }
  return roots
}
