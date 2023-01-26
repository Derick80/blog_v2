import { Container, MultiSelect } from '@mantine/core'
import { EyeOpenIcon } from '@radix-ui/react-icons'
import { LoaderArgs, json, ActionArgs } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import invariant from 'tiny-invariant'
import { Select } from '~/components/shared/box/select-box'
import CategoryContainer from '~/components/shared/category-container'
import TipTap from '~/components/shared/tip-tap'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import getAllCategories from '~/utils/server/categories.server'
import { CategoryForm, createPost } from '~/utils/server/post.server'
import { Categories } from '../postTags'
export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  const categories = await getAllCategories()

  return json({ user, categories })
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


  return (
    <div className='col-span-4 p-2 md:col-span-1 md:col-start-3 md:col-end-11'>
      <h1>Omega</h1>
    </div>
  )
}
