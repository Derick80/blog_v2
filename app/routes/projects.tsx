import { json, LoaderArgs } from '@remix-run/node'
import {  useLoaderData } from '@remix-run/react'
import { ProjectCard } from '~/components/shared/project-card'
import { getProjects } from '~/utils/server/project.server'

export async function loader({ request }: LoaderArgs) {
  const { projects } = await getProjects()

  return json({ projects })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  return (
    <>
    <div className='flex-col md:flex-row flex  gap-5 justify-center'>
        {data.projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </>
  )
}
