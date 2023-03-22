import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import ProjectsCard from '~/components/shared/projects-card'
import { getProjects } from '~/utils/server/project.server'
export const meta: MetaFunction = () => {
  return {
    title: `Derick's Personal Blog | Personal Coding Projects`,
    description: `See the coding projects I have completed and am currently working on`
  }
}
export async function loader({ request }: LoaderArgs) {
  const { projects } = await getProjects()

  return json({ projects })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  return (
    <>
      <div className='flex flex-col justify-center gap-5 md:flex-row'>
        {data.projects.map((project) => (
          <ProjectsCard key={project.id} project={project} />
        ))}
      </div>
    </>
  )
}
export function ErrorBoundary({ error }: any) {
  return (
    <div>
      <h1 className='text-3xl font-bold'>Incomes root ERROR</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  )
}
