import { Flex, MediaQuery, Stack } from '@mantine/core'
import { json, LoaderArgs } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { ProjectCard } from '~/components/shared/project-card'
import { getProjects } from '~/utils/server/project.server'

export async function loader({ request }: LoaderArgs) {
  const { projects, categories } = await getProjects()

  return json({ projects, categories })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  return ( <>
        <Stack justify='space-around' align='center' spacing='xl'>
        {data.projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            categories={data.categories}
          />
        ))}
      </Stack>
      </>
  )
}
