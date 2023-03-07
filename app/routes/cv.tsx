import { Divider } from '@mantine/core'
import type { CVExperience, Education, Publication, Skill } from '@prisma/client'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { format } from 'date-fns'
import type { CV } from '~/utils/schemas/cv-schema'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { prisma } from '~/utils/server/prisma.server'

export async function loader({ request }: { request: Request }) {
  const user = await isAuthenticated(request)

  if (!user) {
    return json({ error: 'Not authenticated' }, { status: 401 })
  }
  const cv = await prisma.curriculumVitae.findMany({
    where: {
      userId: user.id
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
  const data = useLoaderData()
  const skills = data.cv.map((skill: CV) => skill.skills).flat()
  const education = data.cv.map((edu: CV) => edu.education).flat()
  const publications = data.cv.map((pub: CV) => pub.publications).flat()
  console.log(publications, 'publications');


  const experiences = data.cv.map((exp: CV) => exp.cvExperiences).flat()
  // Group the items by category using reduce
  const itemsBycategory = skills.reduce(
    (acc: { [x: string]: any[] }, item: { category: string | number }) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as { [key: string]: Skill[] }
  )

  return (
    <div className='flex w-[350px] flex-col items-center p-2 md:w-full'>
      <h1 className='text-3xl font-bold'>Curriculum Vitae</h1>

      <div className='gap-5'>
        <div className='flex flex-row gap-5'>
          <div className='flex flex-col gap-5'>
            <h2 className='text-2xl font-bold'>Work Experience</h2>
            <Divider />

            {experiences.map((exp: CVExperience) => (
              <DisplayData
                key={exp.id}
                id={exp.id}
                title={exp.title}
                place={exp.company}
                startDate={exp.startDate}
                endDate={exp.endDate}
                responsibilities={exp.responsibilities}
              />


            ))}
          </div>
        </div>
        <div className='flex flex-col gap-5 justify-between'>
          <h2 className='text-2xl font-bold'>Education</h2>
          <Divider />

          {education.map((edu: Education) => (
            <DisplayData
              key={edu.id}
              id={edu.id}
              title={edu.degree}
              place={edu.institution}
              startDate={edu.startDate}
              endDate={edu.endDate}

            />
          ))}

        </div>
        <h2 className='text-2xl font-bold'>Publications</h2>
        <Divider />

{publications.map((pub:Publication) => (
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

        <h2 className='text-2xl font-bold'>Skills</h2>
        <Divider

        />


        {Object.entries(itemsBycategory).map(([category, items]) => (
          <div className='' key={category}>
            <h2 className='font-bold'>{category}</h2>
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
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <span className='flex gap-5'>
          <CheckCircledIcon className='text-blue-500' />
          Mastered
          <CheckCircledIcon className='text-amber-500' />
          Familiar
        </span>
    </div>
  )
}



 function DisplayData({id, place, title, startDate, endDate, responsibilities}:{
  id: string, place: string, title: string, startDate: string, endDate: string, responsibilities?: string[]
 }){

  return (
    <div key={id} className='w-full gap-5 '>
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

    <ul className='list-disc indent-5'>
      {responsibilities?.map((resp, index) => (
        <li className='' key={index}>
          {resp}
        </li>
      ))}
    </ul>
  </div>
  )
 }


 function Pubs({id, title, year, authors, journal, edition,url}:{
  id: string, title: string, year: string, authors: string[], journal: string, edition: string, url: string
 }){

  return (
    <>
    <div key={id} className='w-full flex-col flex gap-1 mt-1'>
{authors && authors.length > 0 && (
        <div className='flex flex-row justify-between text-sm text-slate-400'>
          <div className='flex flex-col gap-1'>
            <p className='font-bold'>{authors}</p>
            <p className='font-bold italic text-black text-xl dark:text-slate-50'>{title}</p>


              </div>


      </div>)}

      <div className='flex flex-col justify-between text-sm text-gray-500'>
      <p className='font-bold'>{journal}</p>

          <p className='font-bold italic'>{edition}</p>

          </div>
          <a href={url}
          target='_blank'
          rel='noreferrer'
          className='font-bold italic'>{url}</a>


  </div>
    </>
  )
 }

