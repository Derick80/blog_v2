import { json, LoaderArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { useLoaderData } from 'react-router'
import { ProjectCard } from '~/components/shared/project-card'
import { getProjects } from '~/models/project.server'
import { projects } from '~/utils/mock.data'

export async function loader({ request }: LoaderArgs) {
  const projects = await getProjects()
  return json({ projects })
}

export default function Projects() {
  return (
    <div className='flex flex-col mb-2 md:mb-5 mx-auto mt-2 md:mt-5 h-fit rounded-2xl p-2'>
      <h1 className='mh1 mx-auto'>Projects</h1>

      <div className='flex h-fit flex-wrap'>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        <Outlet />

          </div>
    </div>
  )
}
