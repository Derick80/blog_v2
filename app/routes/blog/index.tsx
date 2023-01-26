import { Center, Stack } from '@mantine/core'
import type { SerializeFrom } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import React from 'react'
import { badRequest } from 'remix-utils'
import { PostCard } from '~/components/shared/blog-ui/post-card'
import getAllCategories from '~/utils/server/categories.server'
import { getPosts } from '~/utils/server/post.server'

export type SimpleComments = {
  id: string
  parentId: string
  message: string
  createdAt: string
  user: {
    id: string
    username: string
    email: string
  }
}


export async function loader() {
  const posts = await getPosts()

  if (!posts) return badRequest({ message: 'There are no Posts' })
  // get all Categoiries for posts use this for useMatches, etc
  const categories = await getAllCategories()
const comments = posts.map((post) => post.comments)
// console.log(comments, 'comments');

function getStuff(
  comments: SimpleComments[],
){
  let group = {} as SimpleComments[]
comments.forEach(comment =>  {

 group[comment.parentId] ||= []
 group[comment.parentId].push(comment)
})

return group

}


const commentsByParentId = getStuff(comments)
// console.log(commentsByParentId, 'commentsByParentId');

const rootComments = commentsByParentId[null]


  return json({ posts, categories, commentsByParentId, rootComments })
}

export default function Index() {
  const data = useLoaderData<{
    posts: SerializeFrom<typeof getPosts>
    categories: SerializeFrom<typeof getAllCategories>
  }>()

  return (
    <div className='col-span-1 col-start-1  md:col-span-6 md:col-start-4'>
      <Center>
         <Stack align="center" >



<h1 className='text-2xl font-semibold'>Posts</h1>{' '}

      {data.posts.map((post) => (
          <PostCard
            key={post.id}
            data={post}
            user={post.user}
            showCategories={true}
            showLikes={true}
            showComments={true}
            showFavorites={true}
            showOptions={true}
            showShare={true}
          />
        ))}
        <Outlet context={data.categories} />
      </Stack>
      </Center>
    </div>
  )
}
