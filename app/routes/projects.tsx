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
      <div className='flex flex-col flex-wrap justify-center gap-5 md:flex-row'>
        {data.projects.map((project) => (
          <ProjectsCard key={project.id} project={project} />
        ))}
      </div>
    </>
  )
}
