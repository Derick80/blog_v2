import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { NavLink, useCatch, useLoaderData } from '@remix-run/react'
import Button from '~/components/shared/layout/button'
import ProjectsCard from '~/components/shared/projects-card'
import { getProjects } from '~/utils/server/project.server'
import { useOptionalUser } from '~/utils/utilities'
export const meta: MetaFunction = () => {
  return {
    title: `Derick's Personal Blog | Personal Coding Projects`,
    description: `See the coding projects I have completed and am currently working on`
  }
}
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
    <div className='flex flex-col items-center gap-2'>
      {isAdmin && (
        <NavLink to='/projects/new' className=' mx-auto w-full'>
          <Button variant='outline' size='regular'>
            Create new
          </Button>
        </NavLink>
      )}

      <div>
        {data.projects.map((project) => (
          <ProjectsCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
export function CatchBoundary() {
  const caught = useCatch()

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  )
}
