import { Avatar, Image, Text } from '@mantine/core'
import { Form, NavLink } from '@remix-run/react'
import React from 'react'
import type { Profile } from '~/utils/schemas/profile-schema'
import type { UserProps } from '~/utils/server/user.server'
import { useOptionalUser } from '~/utils/utilities'
import { UserPlaceHolder } from '../icons'
import Button from '../button'
import UserProfileFetcher from '../user-profile-fetcher'

export type UserCardProps = {
  user: UserProps
}
export default function UserCard({ user }: UserCardProps) {
  const optionalUser = useOptionalUser()
  const currentUser = optionalUser?.id

  return (
    <div className='flex w-full flex-col gap-2'>
      {user && (
        <>
          <div
            key={user.id}
            className=' my-2 flex w-[350px] flex-col justify-between rounded-md border-2 p-1  md:p-2'
          >
            <div
              // main content
              className='flex flex-row justify-between  gap-2 border-b-2 border-b-red-300 pb-2'
            >
              {user?.avatarUrl ? (
                <>
                  <Avatar src={user.avatarUrl} size='sm' radius='xl' />
                </>
              ) : (
                <div className='relative h-10 w-10 overflow-hidden rounded-full'>
                  <UserPlaceHolder />
                </div>
              )}

              <NavLink
                className='flex flex-col pl-1 md:pl-2 '
                to={`/users/${user.userName}`}
              >
                <p className='p text-xs italic underline'>Username</p>
                <p className='text-sm font-semibold'> {user.userName}</p>
              </NavLink>
            </div>
            <div className='flex flex-col gap-1'>
              <UserProfileFetcher userName={user.userName} />
            </div>

            <p className='pt-1 text-xs font-bold md:pt-2'>User statistics</p>
            <div
              // sub content
              className='flex flex-row items-center justify-between text-sm'
            >
              <NavLink
                className='flex flex-row items-center gap-1 text-sm'
                to={`/users/${user.id}/posts`}
              >
                <p className='text-xs italic'>User posts:</p>
                <p className='text-sm'>{user._count.posts}</p>
              </NavLink>
              <NavLink
                className='flex flex-row items-center'
                to={`/users/${user.id}/posts`}
              >
                <p className='text-sm italic'>total likes:</p>
                <p className='text-sm'>{user._count.likes}</p>
              </NavLink>
            </div>
            {currentUser === user.id && (
              <div className='flex flex-row gap-1'>
                <NavLink
                  className='flex flex-row items-center'
                  to={`/users/${user.id}/edit`}
                >
                  <Button type='button' variant='primary_filled' size='small'>
                    Edit
                  </Button>
                </NavLink>

                <Form
                  method='post'
                  action='destroy'
                  onSubmit={(event) => {
                    if (
                      !confirm('Please confirm you want to delete this record.')
                    ) {
                      event.preventDefault()
                    }
                  }}
                >
                  <Button type='submit' variant='danger_filled' size='small'>
                    Delete
                  </Button>
                </Form>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
