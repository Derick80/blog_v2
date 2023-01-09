

import type {LoaderArgs} from '@remix-run/node';
import {json, redirect} from '@remix-run/node';
import { useLoaderData, Outlet } from '@remix-run/react'
import { isAuthenticated } from '~/models/auth/auth.server'
export async function loader({request}: LoaderArgs) { const user = await isAuthenticated(request); if (!user) { return {redirect: '/auth/login'}; } return json({user})} export default function Index() { const data = useLoaderData(); return ( <div> <h1>Index</h1> <Outlet /> </div> ) }