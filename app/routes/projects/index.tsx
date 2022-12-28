import { json, LoaderArgs } from '@remix-run/node'
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
    <>
      <h1>Projects</h1>

      <div className='flex flex-col md:flex-row'>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  )
}
