import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import React from 'react'
import type { SelectOption } from '~/components/shared/selection'
import { Select } from '~/components/shared/selection'
import getAllCategories from '~/models/categories.server'
import { getPosts } from '~/models/post.server'

export async function loader({ request }: LoaderArgs) {
  const results = await getPosts()



  return json({  results })
}

