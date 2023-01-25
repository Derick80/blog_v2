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
    <div className='col-span-4 p-2 md:col-span-1 md:col-start-3 md:col-end-11'>
      {' '}
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
