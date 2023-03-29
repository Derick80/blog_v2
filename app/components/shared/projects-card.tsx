import { Image } from '@mantine/core'
import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import { ExitIcon, ExternalLinkIcon, Pencil1Icon } from '@radix-ui/react-icons'
import { Link, NavLink } from '@remix-run/react'
import type { Project } from '~/utils/schemas/projects-schema'
import { useOptionalUser } from '~/utils/utilities'
import CategoryContainer from './category-container'
import Button from './layout/button'

export default function ProjectsCard({ project }: { project: Project }) {
  const user = useOptionalUser()
  const isOwner = user?.id === project.userId

  return (
    <div
      key={project.id}
      className='mx-1 flex flex-col overflow-hidden rounded-md border'
    >
      <div className='flex flex-row items-start justify-between'>
        <a
          href={project.projectUrl}
          className='flex items-center space-x-1'
          target='_blank'
          rel='noreferrer'
        >
          <h1 className='text-2xl font-bold'>{project.title} </h1>
        </a>
        <div className='h-24 w-24'>
          <img
            src={project.projectImg}
            alt={project.title}
            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

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
        <p className='h-full overflow-auto indent-1 text-sm'>
          {project.description}
        </p>
      </div>
      <div className='flex w-full items-center justify-between gap-5 p-1'>
        <a
          href={project.projectUrl}
          className='flex items-center space-x-1'
          target='_blank'
          rel='noreferrer'
        >
          <p className='text-base font-semibold'>Project</p>
          <ExternalLinkIcon />
        </a>

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
      {isOwner && (
        <NavLink className='flex flex-row' to={`/projects/${project.id}/edit`}>
          <Button variant='unfilled' size='small'>
            <Pencil1Icon className='text-blue-500' />
          </Button>
        </NavLink>
      )}
    </div>
  )
}
