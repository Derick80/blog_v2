import {
  Image} from '@mantine/core'
import { ExternalLinkIcon } from '@radix-ui/react-icons'

import type{ Project } from '~/utils/schemas/projects-schema'

export const ProjectCard = ({
  project,

}: {
  project: Project
}) => {

  return (
      <div
        key={project.id}
        className='w-[350px] flex flex-col gap-5 rounded-md items-center border-2'
      >

        <h1 className='text-2xl font-bold'>{project.title}</h1>
        <div className='flex flex-col gap-2'>
<p
            className='text-base font-semibold'
          >Technologies</p>
<div className='flex flex-col gap-2'>
<div className='flex flex-row gap-2 items-center ml-1'>
{project.categories.map((category,index) => (
            <div key={index} className='rounded-sm border'>
              <p className='text-base'>{category.label}</p>
              </div>
          ))}
</div>
          <Image
  src={project.projectImg}
  alt={project.title}
  style={{ height: '100%', width: '100%', objectFit: 'cover' }}
/>




        </div>
        <p

className='text-base indent-1'
>{project.description}</p>
        </div>

        <div className='flex w-full gap-5 justify-between p-1'>
         <a
            href={project.githubUrl}
            className='flex items-center space-x-1'
            target='_blank'
            rel='noreferrer'
          >
 <p
            className='text-base font-semibold'
            >Code</p>            <ExternalLinkIcon />
          </a>

         <div>
         <a
            href={project.projectUrl}
            className='flex items-center space-x-1'
            target='_blank'
            rel='noreferrer'
          >
            <p
            className='text-base font-semibold'
            >Project</p>
            <ExternalLinkIcon />
          </a>
         </div>
        </div>




      </div>


  )
}
