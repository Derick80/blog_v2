import { json, LoaderArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { getPostById } from '~/models/post.server'


export async function loader({params, request}:LoaderArgs){
    const postId = params.postId
    invariant(postId, 'postId is required')
 const post = await getPostById(postId)


    return json({post})
}