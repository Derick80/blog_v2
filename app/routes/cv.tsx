import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { Link } from '@remix-run/react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback } from 'react'
import { ColBox, RowBox } from '~/components/shared/boxes'
import { blurb } from '~/resources/resume/blurb'
import { skills } from '~/resources/resume/skills'
import { work_experience } from '~/resources/resume/workexperience'

import type { LoaderArgs } from '@remix-run/node'
import {json, redirect} from '@remix-run/node';
import { pubs } from '~/resources/resume/pubs'
export default function Cv() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <div className='items-censter flex flex-col justify-center gap-1 font-Montserrat'>
        <ColBox>
          <h1 className='text-2xl font-bold'>Derick Hoskinson, PhD</h1>
          <h2 className='text-xl font-bold'></h2>
          <p className='text-sm'>
            <span className='text-xs'>{blurb.blurb}</span>
          </p>
        </ColBox>

        <h1 className='text-2xl font-bold'>Work Experience</h1>

        {work_experience.map((job, index) => (
          <div
            key={index}
            className='flex flex-col items-stretch gap-2 rounded-md border-2 p-1'
          >
            <h3 className='text-md font-Montserrat'>{job.institution}</h3>
            <AccordianTriggers job={job}>
              <div className='flex flex-col items-start px-4'>
                <ul>
                  {job.duties.map((duty) => (
                    <li className='list-disc text-teal-400' key={duty.id}>
                      <div className='flex flex-row items-center'>
                        <span className='text-xs leading-5 text-slate-900 dark:text-slate-50'>
                          {duty.duty}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </AccordianTriggers>
          </div>
        ))}
        <h1 className='text-2xl font-bold'>Publications</h1>
        {pubs.map((pub, index) => (
          <div
            key={index}
            className='flex flex-col items-stretch gap-2 rounded-md border-2 p-1'
          >
            <h3 className='text-md font-Montserrat'>{pub.title}</h3>
            <AccordianTriggerPub pub={pub}>
              <div className='flex flex-col items-start px-4'>
                <ul>
                  <li className='list-disc text-teal-400' key={pub.id}>
                    <div className='flex flex-row items-center'>
                      {pub.authors.map((author, index) => (
                        <ColBox key={index}>
                          <span className='text-xs leading-5 text-slate-900 dark:text-slate-50'>
                            {author}
                          </span>
                          <span className='text-xs leading-5 text-slate-900 dark:text-slate-50'>
                            {pub.edition}
                            {pub.type}
                          </span>
                          <span className='text-xs leading-5 text-slate-900 dark:text-slate-50'>
                            <Link to={pub.url}>{pub.journal}</Link>
                          </span>
                          <RowBox>
                            <span className='text-xs leading-5 text-slate-900 dark:text-slate-50'></span>
                          </RowBox>
                        </ColBox>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </AccordianTriggerPub>
          </div>
        ))}
        <h1 className='text-2xl font-bold'>Education</h1>

        <ColBox className='flex flex-col items-stretch gap-2 rounded-md p-1'>
          <div className='flex flex-row justify-between gap-2 text-xs'>
            <h1 className='text-2xl font-bold'>Skills</h1>
            <button type='button' onClick={() => setOpen(!open)}>
              {open ? (
                <ChevronUpIcon className='text-teal-400' />
              ) : (
                <ChevronDownIcon className='text-teal-400' />
              )}
            </button>
          </div>
          {open && (
            <ul className='flex flex-row flex-wrap gap-2'>
              {skills.map((skill, index) => (
                <li className='rounded-md border-2 p-1 text-xs ' key={index}>
                  <span className='text-xs leading-5 text-slate-900 dark:text-slate-50'>
                    {skill.skill}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </ColBox>
      </div>
    </>
  )
}
type Props = {
  children: React.ReactNode
  job: {
    id: number
    institution: string
    title: string
    period: string
    duties: {
      id: number
      duty: string
    }[]
  }
}
type PubProps = {
  children: React.ReactNode
  pub: {
    id: string
    title: string
    year: string
    authors: string[]
    journal: string
    edition: string
    type: string
    url: string
    pdf?: string | null | undefined
  }
}

function AccordianTriggers(props: Props) {
  const { children, job } = props

  const [open, setOpen] = React.useState(false)
  const toggleOpen = useCallback(() => {
    setOpen((open) => !open)
  }, [])

  return (
    <div className='flex flex-col rounded-md bg-white/5 '>
      <div className='flex flex-row justify-between gap-2 text-xs'>
        <p className='italic'>{job.title}</p>
        <div className='grow' />

        <div className='flex text-black/50 dark:text-white/50'>
          {job.period}
        </div>
        <div className='flex flex-col items-center justify-center pl-4'>
          <button
            type='button'
            onClick={toggleOpen}
            aria-label='Search database'
            className='rounded-md p-2 text-teal-400 transition-all duration-300 hover:backdrop-blur-sm'
          >
            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'tween' }}
          >
            <div className='flex flex-col items-stretch'>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function AccordianTriggerPub(props: PubProps) {
  const { children, pub } = props

  const [open, setOpen] = React.useState(false)
  const toggleOpen = useCallback(() => {
    setOpen((open) => !open)
  }, [])

  return (
    <div className='flex flex-col rounded-md bg-white/5 '>
      <div className='flex flex-row justify-between gap-2 text-xs'>
        <p className='italic'>{pub.journal}</p>
        <div className='grow' />

        <div className='flex text-black/50 dark:text-white/50'>{pub.year}</div>
        <div className='flex flex-col items-center justify-center pl-4'>
          <button
            type='button'
            onClick={toggleOpen}
            aria-label='Search database'
            className='rounded-md p-2 text-teal-400 transition-all duration-300 hover:backdrop-blur-sm'
          >
            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            key={pub.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'tween' }}
          >
            <div className='flex flex-col items-stretch'>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
