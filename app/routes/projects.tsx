import { Image } from '@mantine/core'
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import { json, LoaderArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { ProjectCard } from '~/components/shared/project-card'
import { getProjects } from '~/utils/server/project.server'
export const meta: MetaFunction = () => {
  return {
    title: `Derick's Personal Blog | Personal coding Projects`,
    description: `See the coding projects I have completed and am currently working on`
  }
}
export async function loader({ request }: LoaderArgs) {
  const { projects } = await getProjects()

  return json({ projects })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  return (
    <>
      <div className='flex flex-col justify-center  gap-5 md:flex-row'>
        {/* {data.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))} */}
        <div className='flex w-[350px] flex-col items-center gap-5 rounded-md border-2 p-2'>
          <h1 className='text-2xl font-bold'>Personal Blog V1.0</h1>
          <div className='flex flex-col gap-2'>
            <p className='text-base font-semibold'>Technologies</p>
            <div className='flex flex-col gap-2'>
              <div className='ml-1 flex flex-row flex-wrap items-center gap-2'>
                <div className='rounded-sm border p-1'>
                  <p className='text-base'>Remix-Run</p>
                </div>
                <div className='rounded-sm border p-1'>
                  <p className='text-base'>React</p>
                </div>
                <div className='rounded-sm border p-1'>
                  <p className='text-base'>Typescript</p>
                </div>

                <div className='rounded-sm border p-1'>
                  <p className='text-base'>Prisma</p>
                </div>
                <div className='rounded-sm border p-1'>
                  <p className='text-base'>Tailwindcss</p>
                </div>
              </div>
              <Image
                src='https://remix-bucket.s3.us-east-2.amazonaws.com/mystock/blog.png'
                alt='project title'
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              />
              <p className='prose-invert indent-1 text-base'>
                A personal blog built with Remix and Typescript. This was the
                first first largely non-tutorial app that I built
              </p>
              <div className='flex w-full flex-col justify-between gap-5 p-1'>
                <p className='text-base font-semibold'>App Features</p>
                <ul className='indent-2'>
                  <li className='flex items-center space-x-1'>
                    <p className='text-base '>CRUD blog posts</p>
                  </li>
                  <li className='flex items-center space-x-1'>
                    <p className='text-base '>Email + Password login</p>
                  </li>
                  <li className='flex items-center space-x-1'>
                    <p className='text-base '>Blog categories</p>
                  </li>
                </ul>
              </div>
              <div className='bottom-0 flex w-full justify-between gap-5 p-1'>
                <a
                  href='#'
                  className='flex items-center space-x-1'
                  target='_blank'
                  rel='noreferrer'
                >
                  <p className='text-base font-semibold'>Code</p>{' '}
                  <ExternalLinkIcon />
                </a>

                <a
                  href='#'
                  className='flex items-center space-x-1'
                  target='_blank'
                  rel='noreferrer'
                >
                  <p className='text-base font-semibold'>Project</p>
                  <ExternalLinkIcon />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='flex w-[350px] flex-col items-center gap-5 rounded-md border-2 p-2'>
          <h1 className='text-2xl font-bold'>Memory game</h1>
          <div className='flex flex-col gap-2'>
            <p className='text-base font-semibold'>Technologies</p>
            <div className='flex flex-col gap-2'>
              <div className='ml-1 flex flex-row flex-wrap items-center gap-2'>
                <div className='rounded-sm border p-1'>
                  <p className='text-base'>React</p>
                </div>

                <div className='rounded-sm border p-1'>
                  <p className='text-base'>Typescript</p>
                </div>

                <div className='rounded-sm border p-1'>
                  <p className='text-base'>CSS</p>
                </div>
                <div>
                  <Image
                    src='https://remix-bucket.s3.us-east-2.amazonaws.com/mystock/post_two_memory_game.png'
                    alt='project title'
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <p className='prose-invert indent-1 text-base'>
                  A personal blog built with Remix and Typescript. This was the
                  first first largely non-tutorial app that I built
                </p>
                <div className='flex w-full flex-col justify-between gap-5 p-1'>
                  <p className='text-base font-semibold'>App Features</p>
                  <ul className='indent-2'>
                    <li className='flex items-center space-x-1'>
                      <p className='text-base '>
                        Implimentation of typescript and css
                      </p>
                    </li>
                  </ul>
                </div>
                <div className='flex w-full justify-between gap-5 p-1'>
                  <a
                    href='https://codesandbox.io/s/wow-memory-game-02b34'
                    className='flex items-center space-x-1'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <p className='text-base font-semibold'>Code</p>{' '}
                    <ExternalLinkIcon />
                  </a>

                  <a
                    href='https://github.com/Derick80/mindgame'
                    className='flex items-center space-x-1'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <p className='text-base font-semibold'>Project</p>
                    <ExternalLinkIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
