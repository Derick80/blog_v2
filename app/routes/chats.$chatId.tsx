import { ActionArgs, json, LoaderArgs } from '@remix-run/node'
import { Outlet, useCatch, useFetcher, useLoaderData, useParams } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import invariant from 'tiny-invariant'
import { useEventSource, useRevalidator } from '~/utils/hooks'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { chatEmitter, EVENTS } from '~/utils/server/chat.server'
import { prisma } from '~/utils/server/prisma.server'


export  async function loader({request, params}:LoaderArgs){

    invariant(params.chatId, 'chatId is required')
    const user = await isAuthenticated(request)
    invariant(user, 'User is not authenticated')
    const userId = user.id
    const chat = await prisma.chat.findFirst({
        where:{
            id: params.chatId,
             users:{
                some:{
                    id: userId
            }
        },
    },
    select:{
        id: true,
        users:{
            select:{
                id: true,
                userName: true,
                avatarUrl: true
            }
        },
        messages:{
            select:{
                id: true,
                content: true,
                userId: true,
            }
        }
    },
    })

    if(!chat){
        throw new Response('Chat not found', {status: 404})

    }
    return json({chat})

}

export async function action({request, params}:ActionArgs){
    const user = await isAuthenticated(request)
    invariant(user, 'User is not authenticated')
    invariant(params.chatId, 'chatId is required')
    const userId = user.id
    const formData = await request.formData()
    const {action, content} = Object.fromEntries(formData)
    invariant(typeof content ==='string' , 'content invalid')
    switch(action){
        case 'send-message':{
             await prisma.message.create({
                data:{
                    content,
                    userId,
                    chatId: params.chatId
                },
                select:{
                    id: true,
                }
            })
            chatEmitter.emit(EVENTS.NEW_MESSAGE, Date.now())
            return json({success: true})
        }
        default:{
            throw new Error(`Unexpected action: ${action}`)
    }



}

}
export default function ChatRoute(){
    const {chatId} = useParams()

    const data = useLoaderData<typeof loader>()
    const messageFetcher = useFetcher<typeof action>()
    const chatUpdateData = useEventSource(`/chats/${chatId}/events`)
    const revalidator = useRevalidator()
    const mounted = useRef(false)

    useEffect(()=>{
        if(!mounted.current){
            mounted.current = true
            return}
        revalidator.revalidate()
    },[chatUpdateData, revalidator])

    return(
        <div>
            <h1>Chat</h1>
            {/* <pre>{
                JSON.stringify(data, null, 2)}</pre> */}
                <hr />
                <div className='flex flex-col'>
                    {data.chat.messages.map((message)=>{
                        const sender = data.chat.users.find((user)=>user.id === message.userId)
                        return(
                            <div key={message.id} className='flex flex-row'>
                                <img src={sender?.avatarUrl ?? ''} alt={sender?.userName} className='w-8 h-8 rounded-full' />
                                <div className='flex flex-col'>
                                    <div className='flex flex-row'>
                                        <div className='font-bold'>{sender?.userName}</div>
                                        <div className='text-gray-500 ml-2'>{message.id}</div>
                                    </div>
                                    <div>{message.content}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <hr />
                <messageFetcher.Form
                method='post'
                onSubmit={event => {
                    const form = event.currentTarget
                    requestAnimationFrame(()=>{
                        form.reset()
                    })
                }}


                >
                    <input type='text' name='content'
                    className='text-black'

                    />
                    <button type='submit'
                        name='action'
                        value='send-message'
                    >Send</button>
                </messageFetcher.Form>
                <Outlet />
        </div>
    )
}


export function CatchBoundary(){
    const caught = useCatch()
    const params = useParams()

    if(caught.status === 404){
        return <div>Chat "{params.chatId}" not found</div>
    }

    throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

export function ErrorBoundary({error}:{error: Error}){
    console.error(error)
    return <div>{error.message}
    </div>
}