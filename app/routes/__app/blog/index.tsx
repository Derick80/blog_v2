import { LoaderArgs, json } from '@remix-run/node'
import { useLoaderData } from 'react-router'
import invariant from 'tiny-invariant'
import { isAuthenticated } from '~/models/auth/auth.server'
import { getPosts, getUserPosts } from '~/models/post.server'
import { useOptionalUser } from '~/utils/utils'



export async function loader ({ ...args }: LoaderArgs) {
    const user = await isAuthenticated(args.request)
    invariant(user, 'User must be authenticated')
    const userId = user.id
    const posts = await getUserPosts(userId)

    return json({ posts })
}

