import { useMatches } from '@remix-run/react'
import { useMemo } from 'react'
import type{ ZodError, ZodSchema } from 'zod'
import type { UserType } from './schemas/user-schema'

const DEFAULT_REDIRECT = '/'

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== 'string') {
    return defaultRedirect
  }

  if (!to.startsWith('/') || to.startsWith('//')) {
    return defaultRedirect
  }

  return to
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches()
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  )
  return route?.data
}

function isUser(user: any): user is UserType {
  return user && typeof user === 'object' && typeof user.email === 'string'
}

export function useOptionalUser(): UserType | undefined {
  const data = useMatchesData('root')
  if (!data || !isUser(data.user)) {
    return undefined
  }
  return data.user
}

export function useUser(): UserType {
  const maybeUser = useOptionalUser()
  if (!maybeUser) {
    throw new Error(
      'No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.'
    )
  }
  return maybeUser
}


export async function validateNewPostAction({
  request, schema
}:{
  request: Request,
  schema: ZodSchema
}){
const body = Object.fromEntries(await request.formData())

try{
const formData =schema.parse(body)
return {formData, errors:null}
}catch(error){
  console.log(error)

const errors = error as ZodError

return{
  formData:body, errors:errors.issues.reduce((acc, curr) => {
const key = curr.path[0]

acc[key] = curr.message
return acc

}, {}
    )
}
}
}