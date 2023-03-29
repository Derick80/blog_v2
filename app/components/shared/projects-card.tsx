import { Image } from '@mantine/core'
import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import { ExitIcon, ExternalLinkIcon } from '@radix-ui/react-icons'
import { Link, NavLink } from '@remix-run/react'
import type { Project } from '~/utils/schemas/projects-schema'
import { useOptionalUser } from '~/utils/utilities'
import CategoryContainer from './category-container'

export default function ProjectsCard({ project }: { project: Project }) {
  const user = useOptionalUser()
  const isOwner = user?.id === project.userId

  return (
    <div
      key={project.id}
      className='mx-auto  grid grid-cols-3 rounded-md p-2 shadow-2xl'
    >
      <div className='col-span-4'>
        <a
          href={project.projectUrl}
          className='flex items-center space-x-1'
          target='_blank'
          rel='noreferrer'
        >
          <h1 className='text-2xl font-bold'>{project.title} </h1>
        </a>

        <AspectRatio.Root ratio={3 / 2}>
          <img
            src={project.projectImg}
            alt={project.title}
            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
          />
        </AspectRatio.Root>
        <div className='flex flex-col gap-2'>
          <p className='text-base font-semibold italic'>Technologies</p>
        </div>
        <div className='mb-2 flex flex-wrap gap-2'>
          {project.categories.map((category, index) => (
            <CategoryContainer
              key={index}
              value={category.label}
              index={index}
              isLink={false}
            />
          ))}
        </div>
        <div>
          <p className='h-full overflow-auto indent-1 text-sm'>
            {project.description}
          </p>
        </div>
      </div>
      <div className='col-span-2'>
        <div className='flex w-full justify-start gap-5 p-1'>
          <a
            href={project.projectUrl}
            className='flex items-center space-x-1'
            target='_blank'
            rel='noreferrer'
          >
            <p className='text-base font-semibold'>Project</p>
            <ExternalLinkIcon />
          </a>
        </div>
      </div>
      <div className='col-span-2'>
        <div className='flex w-full justify-end gap-5 p-1'>
          <a
            href={project.githubUrl}
            className='flex items-center space-x-1'
            target='_blank'
            rel='noreferrer'
          >
            <p className='text-base font-semibold'>Code</p>
            <ExternalLinkIcon />
          </a>
        </div>
      </div>
      {isOwner && (
        <div className='col-span-4'>
          <NavLink to={`/projects/${project.id}/edit`}>edit</NavLink>
        </div>
      )}
    </div>
  )
}
