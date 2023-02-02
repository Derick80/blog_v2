import { Container,  Flex,  Group, Image,  Stack,  Text, Title } from '@mantine/core'
import { IconExternalLink } from '@tabler/icons'
import { Project } from '~/utils/schemas/projects-schema'
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

        <Flex direction='column' gap={20}
          key={project.id}
          className='w-[350px]  pb-2'
        >
         <Stack >
         <Title size={1}>{project.title}</Title>
          <Text>{project.description}</Text>
          </Stack>

           <Group position='left' >
           {categories.map((category: string[], index: number) => (
              <CategoryContainer key={index} value={category} index={index} />
            ))}
          </Group>
          <Group position='apart' >
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
          </Group>
          <div className='h-40 md:h-60'>
            <Image
              src={project.projectImg}
              alt={project.title}
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
          </div>
        </Flex>
    </>
  )
}
