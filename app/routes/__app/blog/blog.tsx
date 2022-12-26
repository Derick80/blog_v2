import { LoaderArgs, json } from '@remix-run/node'
import { useLoaderData } from 'react-router'
import { getPosts } from '~/models/post.server'
import { useOptionalUser } from '~/utils/utils'



export async function loader({...args}:LoaderArgs){
const posts = await getPosts()

  return json({posts})
}

