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
  return (
    <Stack align='center' className='w-[350px] mt-10'>

      <Flex direction='column' gap={5} align='center' justify='center'>
        {data.projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            categories={data.categories}
          />
        ))}
      </Flex>
          </Stack>
  )
}
