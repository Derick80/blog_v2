import { Container, Flex, MultiSelect } from '@mantine/core'
import { EyeOpenIcon } from '@radix-ui/react-icons'
import { LoaderArgs, json, ActionArgs } from '@remix-run/node'
import { Form, useFetcher, useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { badRequest } from 'remix-utils'
import invariant from 'tiny-invariant'
import FormComments from '~/components/comments/com-form'
import ListComments from '~/components/comments/comList'
import { formatComments } from '~/components/comments/format-comments'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { getPosts } from '~/utils/server/post.server'
export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  const posts = await getPosts()

  if (!posts) return badRequest({ message: 'There are no Posts' })
  // get all Categoiries for posts use this for useMatches, etc
  const comments = posts.map((post) => post.comments)
  return json({ user, posts, comments })
}
// Path: app/routes/omega/index.tsx

// Compare this snippet from app/routes/testing/index.tsx:

export async function action({ request }: ActionArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    return { redirect: '/auth/login' }
  }

  return json({ user })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  // const fetcher = useFetcher();

  // useEffect(() => {
  //   if (fetcher.type === "init") {
  //     fetcher.load("/blog");
  //   }
  // }, [fetcher]);

  // const posts = fetcher?.data?.posts
  // console.log(posts,'posts');

  return (
    <Flex direction={'column'} gap={5} align='center'>
      {data.posts.map((post) => (
        <div key={post.id}>
          <div> {post.title}</div>

          <FormComments />
          {data.comments && (
            <ListComments comments={formatComments(data.comments || [])} />
          )}
        </div>
      ))}
      {/* {fetcher?.data?.posts ? (
  fetcher?.data?.posts.map((post)=>(
    <div key={post.id}>
    <div>{post.title}</div>
    <FormComments

    />
    {
      post.comments && <ListComments comments={formatComments(post.comments || [])} />
    }
  </div>
  ))
):null} */}
    </Flex>
  )
}
