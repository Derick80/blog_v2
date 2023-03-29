import type { Skill, CVExperience, Education, Publication } from '@prisma/client'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { json } from '@remix-run/node'
import { NavLink, Outlet, useCatch, useLoaderData } from '@remix-run/react'
import { format } from 'date-fns'
import Divider from '~/components/shared/divider'
import type{ CV } from '~/utils/schemas/cv-schema'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { prisma } from '~/utils/server/prisma.server'
import { useOptionalUser } from '~/utils/utilities'

export async function loader({ request }: { request: Request }) {
  const user = await isAuthenticated(request)

  const cv = await prisma.curriculumVitae.findMany({
    where: {
      userId: user?.id
    },
    include: {
      education: true,
      cvExperiences: true,
      skills: true,
      publications: true
    }
  })

  return json({ cv }, { status: 200 })
}

export default function BetaRoute() {
  const {cv} = useLoaderData()
  const user = useOptionalUser()

  const skills = cv.map((skill: CV) => skill.skills).flat()
  const education = cv.map((edu: CV) => edu.education).flat()
  const publications = cv.map((pub: CV) => pub.publications).flat()
  console.table(publications)

  // Sort the experiences by start date
  const experiences = cv.map((exp: CV) => exp.cvExperiences).flat().sort((a: { startDate: number }, b: { startDate: number }) => {
    if (a.startDate < b.startDate) {
      return 1
    }
    if (a.startDate > b.startDate) {
      return -1
    }
    return 0
  })

  // Group the items by category using reduce not sure about assigning the type to the object at the end
  const itemsBycategory = skills.reduce(
    (acc: { [x: string]: any[] }, item: { category: string | number }) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as { [key: string]: Skill[] }
  ) as { [key: string]: Skill[] }

  return (
    <div className='flex w-full flex-col items-center p-2 md:w-full'>
      <Outlet />
      <h1 className='text-3xl font-bold'>Curriculum Vitae</h1>

      <div className='gap-5'>
        <div className='flex flex-row gap-5'>
          <div className='flex flex-col gap-5'>
            <h2 className='text-2xl mt-5 mb-5 font-bold'>Work Experience</h2>

            <Divider />

            {experiences.map((exp: CVExperience) => (
              <>

              <DisplayEducationData
                key={exp.id}
                id={exp.id}
                title={exp.title}
                place={exp.company}
                startDate={exp.startDate}
                endDate={exp.endDate}
                responsibilities={exp.responsibilities}
              />
              </>
            ))}
          </div>
        </div>
        <div className='flex flex-col justify-between gap-5'>
          <h2 className='mt-5 mb-5 text-2xl font-bold'>Education</h2>
          <Divider />

          {education.map((edu: Education) => (
            <DisplayEducationData
              key={edu.id}
              id={edu.id}
              title={edu.degree}
              place={edu.institution}
              startDate={edu.startDate}
              endDate={edu.endDate}
            />
          ))}
        </div>
        <h2 className='mt-5 mb-5 text-2xl font-bold'>Publications</h2>
        <Divider />

        {publications.map((pub: Publication) => (
          <Pubs
            key={pub.id}
            id={pub.id}
            title={pub.title}
            authors={pub.authors}
            year={pub.year}
            edition={pub.edition}
            journal={pub.journal}
            url={pub.url}
          />
        ))}

        <h2 className='mt-5 mb-5 h2 font-bold'>Skills</h2>
        <Divider />
        <div className='mt-5 mx-auto flex flex-col gap-5'>
          <span className='flex gap-5 mx-auto'>
            <CheckCircledIcon className='text-blue-500' />
            Mastered
            <CheckCircledIcon className='text-amber-500' />
            Familiar
          </span>
          </div>
        {Object.entries(itemsBycategory).map(([category, items]) => (
          <div className='' key={category}>
            <h2 className='font-bold h2'>{category}</h2>
            <ul className='flex flex-wrap gap-2'>
              {items.map((item) => (
                <li key={item.id} className='flex flex-row items-center gap-2'>
                  {item.level === 'master' ? (
                    <div className='h-4 w-4'>
                      <CheckCircledIcon className='text-blue-500' />
                    </div>
                  ) : (
                    <div className='h-4 w-4'>
                      <CheckCircledIcon className='text-amber-500' />
                    </div>
                  )}
                  <p
                    className='h6'
                  >{item.name}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </div>
  )
}

function DisplayEducationData({
  id,
  place,
  title,
  startDate,
  endDate,
  responsibilities
}: {
  id: string
  place: string
  title: string
  startDate: string
  endDate: string
  responsibilities?: string[]
}) {
  return (
    <div key={id} className='mt-5 w-full gap-5 '>
      <div className='flex flex-row justify-between text-sm text-gray-500'>
        <div className='flex flex-col gap-2'>
          <p className='font-bold'>{place}</p>
          <p className='font-bold italic'>{title}</p>
        </div>
        <div className='flex gap-5'>
          <p>{format(new Date(startDate), 'MMM yyyy')}</p>-{' '}
          {endDate ? (
            <p>{format(new Date(endDate), 'MMM yyyy')}</p>
          ) : (
            <p>Present</p>
          )}
        </div>
      </div>

      <ul className=' indent-5'>
        {responsibilities?.map((resp, index) => (
          <li className='text-xs' key={index}>
            {resp}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Pubs({
  id,
  title,
  year,
  authors,
  journal,
  edition,
  url
}: {
  id: string
  title: string
  year: string
  authors: string[]
  journal: string
  edition: string
  url: string
}) {
  return (
    <>
      <div key={id} className='mt-1 flex w-full flex-col gap-1'>
        {authors && authors.length > 0 && (
          <div className='flex flex-row justify-between text-sm text-slate-400'>
            <div className='flex flex-col gap-1'>
              <p className='text-xs'>{authors}</p>
              <p className='text-xl font-bold italic text-black dark:text-slate-50'>
                {title}
              </p>
            </div>
          </div>
        )}

        <div className='flex flex-col justify-between text-sm text-gray-500'>
          <p className='font-bold text-xs'>{journal}</p>

          <p className='font-bold italic text-xs'>{edition}</p>
        </div>
        <a
          href={url}
          target='_blank'
          rel='noreferrer'
          className='font-bold italic'
        >
          {url}
        </a>
      </div>
    </>
  )
}

export function CatchBoundary () {
  const caught = useCatch()

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: { caught.status }</p>
      <pre>
        <code>{ JSON.stringify(caught.data, null, 2) }</code>
      </pre>
    </div>
  )
}
