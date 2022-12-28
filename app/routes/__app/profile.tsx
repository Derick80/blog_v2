import { json, LoaderArgs, MetaFunction, redirect } from '@remix-run/node'
import { isAuthenticated } from '~/models/auth/auth.server'



export const meta: MetaFunction = ()=>{
    return {
        title:`Derick's Personal Blog | Profile`,
        description:`Profile Page`
    }
}

export async function loader({request}:LoaderArgs){
    const user = await isAuthenticated(request)
 if(user) throw redirect(`/${user.id}`)
 return json({user: null})
}


export default function Page(){
    return(
        <div
        className='pt5'
        >
            <h1>Profile</h1>
        </div>
    )
}