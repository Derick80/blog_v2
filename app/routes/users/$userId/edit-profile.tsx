import { Button, Stack, Textarea } from '@mantine/core'
import { ActionArgs, json, LoaderArgs, redirect } from '@remix-run/node'
import {
  Form,
  useLoaderData,
  useMatches,
  useOutletContext,
  useParams,
  useRouteLoaderData
} from '@remix-run/react'
import React from 'react'
import invariant from 'tiny-invariant'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { prisma } from '~/utils/server/prisma.server'
import { getUserProfile } from '~/utils/server/profile.server'

export default function EditProfile() {
  const params = useParams()
  const userId = params.userId
  console.log(userId, 'userId')

  const data = useMatches()
  console.log(data, 'data')

  return <></>
}
