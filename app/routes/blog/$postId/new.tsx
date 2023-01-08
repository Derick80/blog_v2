import { ActionArgs, json, LoaderArgs, redirect } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import React from 'react'
import { badRequest } from 'remix-utils'
import invariant from 'tiny-invariant'
import { Modal } from '~/components/shared/layout/modal'
import { isAuthenticated } from '~/models/auth/auth.server'
import { flashAndCommit } from '~/models/auth/session.server'
import { createComment } from '~/models/comments.server'

export async function loader({ request, params }: LoaderArgs) {
  const postId = params?.postId
  if (!postId) return badRequest({ message: 'Invalid post' })

  const user = await isAuthenticated(request)
  if (!user) return badRequest({ message: 'Invalid user' })

  return json({ postId, user })
}

export async function action({ request, params }: ActionArgs) {
  const user = await isAuthenticated(request)
  const formData = await request.formData()
  const message = formData.get('message')
  const postId = formData.get('postId')
  const userId = formData.get('userId')
  const createdBy = formData.get('createdBy')

  invariant(postId, 'Invalid post')
  console.log('message', postId)

  if (
    typeof message !== 'string' ||
    typeof postId !== 'string' ||
    typeof userId !== 'string' ||
    typeof createdBy !== 'string'
  ) {
    return badRequest({ message: 'Invalid comment' })
  }

  if (!userId || !postId) return badRequest({ message: 'Invalid post' })

  const fields = {
    message,
    userId,
    postId,
    createdBy
  }

  try {
    await createComment(fields)

    const headers = await flashAndCommit(request, 'Your comment has been added')

    return redirect('/blog', { headers })
  } catch (error) {
    if (error instanceof Error) {
      return badRequest({ message: error.message })
    }
  }
}
