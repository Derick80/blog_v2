import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'
import { Link } from '@remix-run/react'
import { ProjectCategories } from '~/models/project.server'
import CategoryContainer from './category-container'

export const ProjectCard = ({ project, categories }: any) => {
  return (
    <>
      <div
        key={project.id}
        className='text-zing-900 border-zinc-600 dark:text-slate-100 m-1 mx-auto rounded border-4 bg-fixed opacity-90 shadow-md'
      >
        <h1 className='mh1'>{project.title}</h1>
        <p className='p-2 indent-2 text-sm italic'>{project.description}</p>

        <div className='flex justify-center'>
          {categories.map((category: ProjectCategories[], index: number) => (
            <CategoryContainer key={index} category={category} />
          ))}
        </div>
        <div className='flex items-center justify-end space-x-2 p-2 text-xs md:mb-2 md:text-base'>
          <a
            href={project.githubUrl}
            className='flex items-center space-x-1'
            target='_blank'
            rel='noreferrer'
          >
            <p>View Code</p>
            <ArrowTopRightOnSquareIcon className='h-5 w-5' />
          </a>

          <a
            href={project.projectUrl}
            className='flex items-center space-x-1'
            target='_blank'
            rel='noreferrer'
          >
            <p>Visit Project</p>
            <ArrowTopRightOnSquareIcon className='h-5 w-5' />{' '}
          </a>
        </div>
        <div className='h-40 md:h-60'>
          <img
            src={project.projectImg}
            alt={project.title}
            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
    </>
  )
}
