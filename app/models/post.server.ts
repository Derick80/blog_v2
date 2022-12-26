import { Like } from '~/utils/schemas/like-schema'
import { Post } from '~/utils/schemas/post-schema'

type QueriedPost = Post & {
  likes?: Like[]
  _count: {
    comments?: number
    likes?: number
  }
}
