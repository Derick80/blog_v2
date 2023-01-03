import { ActionArgs, redirect } from '@remix-run/node'
import { badRequest } from 'remix-utils'
import invariant from 'tiny-invariant'
import { prisma } from '~/models/prisma.server'



export async function action({ request, params }: ActionArgs) {
    console.log('params', params);

    const commentId = params?.commentId
    invariant(commentId, 'Invalid comment')


    if(
        typeof commentId !== 'string'

    )
    return badRequest({ message: 'Invalid comment' })


     await prisma.comment.delete({
        where: {
            id: commentId

        }
    })

    return redirect('/blog', { headers: { 'Set-Cookie': 'flash=Comment deleted' } })
}
