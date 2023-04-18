import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  NavLink,
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError
} from '@remix-run/react'
import Button from '~/components/shared/button'
import ProjectsCard from '~/components/shared/projects-card'
import { getProjects } from '~/utils/server/project.server'
import { useOptionalUser } from '~/utils/utilities'

export async function loader({ request }: LoaderArgs) {
  const { projects } = await getProjects()
  if (!projects) {
    throw new Error('No projects found')
  }
  return json({ projects })
}

export default function Index() {
  const user = useOptionalUser()
  const isAdmin = user?.role === 'ADMIN'
  const data = useLoaderData<typeof loader>()
  return (
    <div className='flex h-full flex-row flex-wrap items-center gap-4 p-6'>
      {isAdmin && (
        <NavLink to='/projects/new' className='mx-auto w-full'>
          <Button variant='primary_filled' size='base'>
            Create new
          </Button>
        </NavLink>
      )}
      <Outlet />

      <div className='flex flex-col gap-4'>
        {data.projects.map((project) => (
          <ProjectsCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>oops</h1>
        <h1>Status:{error.status}</h1>
        <p>{error.data.message}</p>
      </div>
    )
  }
  let errorMessage = 'unknown error'
  if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  }

  return (
    <div>
      <h1 className='text-2xl font-bold'>uh Oh..</h1>
      <p className='text-xl'>something went wrong</p>
      <pre>{errorMessage}</pre>
    </div>
  )
}
