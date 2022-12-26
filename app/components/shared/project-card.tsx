export const ProjectCard = ({ project }: { project: any }) => {
  return (
    <>
      <div
        key={project.id}
        className='text-zing-900 m-1 rounded border-4 border-zinc-600 bg-fixed opacity-90 shadow-md dark:text-slate-100'
      >
        <h1 className='text-2xl font-bold'>{project.title}</h1>
        <p>{project.description}</p>
        <div
          className=''
          style={{
            backgroundImage: `url(${project.projectImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '300px',
            width: '300px'
          }}
        >
          <div>{project.projectUrl}</div>
        </div>
      </div>
    </>
  )
}
