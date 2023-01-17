import { json, LoaderArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { ProjectCard } from '~/components/shared/project-card'
import { getProjects } from '~/utils/server/project.server'

export async function loader({ request }: LoaderArgs) {
  const { projects, cats } = await getProjects()

  return json({ projects, cats })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  return (
    <div className='mx-auto gap-10 p-2 md:flex'>
      {data.projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          categories={data.cats}
        />
      ))}
      <Outlet />
    </div>
  )
}
