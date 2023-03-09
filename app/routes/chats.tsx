import { json, LoaderArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { prisma } from '~/utils/server/prisma.server'

export async function loader({request}:LoaderArgs){
    const user = await isAuthenticated(request)
    invariant(user, 'User is not authenticated')
    const userId = user.id
    const chats = await prisma.chat.findMany({
        where:{
            users:{some:{
                id: userId
            }},
        },
        select:{
            id: true,
        }})

        return json({chats})
}


export default function ChatsRoute(){
    const data = useLoaderData<typeof loader>()
    return (
        <>
        <h1>Chats</h1>
        <details>
            <summary>Chats</summary>
        </details>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <hr />
        <Outlet />
        </>
    )

}