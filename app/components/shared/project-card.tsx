import { Container, Flex, Image, SimpleGrid, Text, Title } from '@mantine/core'
import { Project } from '@prisma/client'
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import { Link } from '@remix-run/react'
import { IconExternalLink } from '@tabler/icons'
import { ProjectCategories } from '~/utils/server/project.server'
import CategoryContainer from './category-container'

export const ProjectCard = ({
  project,
  categories
}: {
  project: Project
  categories: string[][]
}) => {
  return (
    <>
      <SimpleGrid cols={4}>
        <Container
          key={project.id}
          className='text-zing-900 border-zinc-600 dark:text-slate-100 m-1 mx-auto rounded border-4 bg-fixed opacity-90 shadow-md'
        >
          <Title size={1}>{project.title}</Title>
          <p className='p-2 indent-1 text-sm italic'>{project.description}</p>

          <Flex justify='center'>
            {categories.map((category: string[], index: number) => (
              <CategoryContainer key={index} value={category} index={index} />
            ))}
          </Flex>
          <Flex align='center' justify='end'>
            <a
              href={project.githubUrl}
              className='flex items-center space-x-1'
              target='_blank'
              rel='noreferrer'
            >
              <Text>View Code</Text>
              <IconExternalLink />
            </a>

            <a
              href={project.projectUrl}
              className='flex items-center space-x-1'
              target='_blank'
              rel='noreferrer'
            >
              <Text>Visit Project</Text>
              <IconExternalLink />
            </a>
          </Flex>
          <div className='h-40 md:h-60'>
            <img
              src={project.projectImg}
              alt={project.title}
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
          </div>
        </Container>
      </SimpleGrid>
    </>
  )
}
