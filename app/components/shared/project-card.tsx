export const ProjectCard = ({ project }: { project: any }) => {
  return (
    <>
      <div
        key={project.id}
        className='text-zing-900 m-1 rounded border-4 border-zinc-600 bg-fixed opacity-90 shadow-md dark:text-slate-100'
      >
        <h1 className='mh1'>{project.title}</h1>
        <p className='italic text-sm indent-4'>{project.description}</p>
        <div className='flex flex-row justify-between'>
          <div className='w-1/2 h-1/2'>
            <img
              src={project.projectImg}
              alt={project.title}
              style={{ height: '100%', width: '100%' }}
            />

          </div>
          <div className='ml-2 flex flex-col items-center'>
          <h1 className='text-base md:mh1 italic'>Technologies Used:</h1>
            <ul className='flex flex-col flex-wrap'>
              <li>TypeScript</li>
              <li>React</li>
              </ul>
          </div>
          <div className='flex mx-auto items-end mb-2 md:mb-5 flex-row space-x-2'>

            <a href={project.githubUrl} target='_blank' rel='noreferrer'>
              <button className='btn-base btn-solid'>
                View Code
              </button>
            </a>

          <a href={project.projectUrl} target='_blank' rel='noreferrer'>
            <button className='btn-base btn-solid'>
              Visit Project
            </button>
          </a>
          </div>

        </div>
      </div>
    </>
  )
}
