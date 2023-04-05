/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client'
import { fuji, kyoto, shimo, shinJuku } from '~/utils/constants/japan-links'
import { nyc } from '~/utils/constants/nycurls'



const prisma = new PrismaClient()

async function seed(){
    const email = (await process.env.SEED_EMAIL) as string
    //cleanup db

    await prisma.user.delete({
        where:{
            email: email
        }
    }).catch(()=>{
        console.log("No user found")
    })

    const hashedPassword = (await process.env.HASHEDPASSWORD) as string
const user2Password = (await process.env.USER2PASSWORD) as string
      const user2 = await prisma.user.create({
        data:{
            email:'elisser00@gmail.com',
            password: user2Password,
            userName: 'Lisser',
            avatarUrl: `https://remix-bucket.s3.us-east-2.amazonaws.com/blog-prototype-images/dch_elissa.jpg`
        }
    })



    const user = await prisma.user.create({
        data:{
            email,
            password: hashedPassword,
            userName: 'Derick',
            role: 'ADMIN',
            avatarUrl: `https://remix-bucket.s3.us-east-2.amazonaws.com/blog-prototype-images/DerickFace.jpg`,

        }
    })

        await prisma.profile.create({
      data:{

        userName: 'Grayone',
        firstName: 'Derick',
        lastName: 'Hoskinson',
bio:`I was born in western New York`
,
location:`Chicago, IL`,
education:`Tufts Graduate School of Biomedical Sciences`,
occupation:`Senior Clinical Scientist`,
profilePicture:'https://remix-bucket.s3.us-east-2.amazonaws.com/blog-prototype-images/DerickFace.jpg',
      userId: user.id,
      email: user.email,

      }
    })
    await prisma.about.create({
      data: {
        userName: 'Derick',
        firstName: 'Derick',
        lastName: 'Hoskinson',
bio:`<p></p><p>I was born in western New York state but have lived and attended school in Missouri and Boston.</p><p>I completed my undergraduate degree at the <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://www.umb.edu\">University of Massachusetts Boston</a>, where I focused on biology and <em>almost </em>minored in biochemistry.</p><p>I attended <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://gsbs.tufts.edu/\">Tufts Graduate School of Biomedical Sciences </a>where I studied mRNA processing in yeast and earned my phD.</p><p>I worked as a post doctoral student at The <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://personalizedmedicine.partners.org/laboratory-for-molecular-medicine/\">Laboratory for Molecular Medicine</a> at Harvard Medical School.</p><p>After a couple of years I used my skill in interpreting genomic variants to join a small start up called <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://www.tempus.com/\">Tempus labs</a>. It's been five years and I have expanded the breadth of my understanding in genetics and have fostered emergent coding skills. I have used those skills to create new assays, support automation in production, and improve processes in between. I'm really excited about the future in genetics and web development. I hope to find a really great position where I can use my fantastic scientific knowledge to inform data analysis, display and the development of modern web applications to view and use the data.</p>`,

location:`Chicago, IL`,
education:`Education I completed my Ph.D in genetics at Tufts Graduate School of Biomedical Sciences in Boston, MA.`,
occupation:`I am a Senior Clinical Scientist at Tempus Labs in Chicago, IL.`,
profilePicture:'https://blogphotosbucket.s3.us-east-2.amazonaws.com/profileimages/DerickFace.jpg',
      email: user.email,
      userId: user.id,
      }
    })





  for (let urls of shinJuku) {
    await prisma.travelLog.create({
      data: {
        imageUrl: urls.links,
        userId: user.id,
        imageTitle: '',
        imageDescription: '',
      album:'Japan',
      city:'Shinjuku',
      year:'2018'
      }
    }
    )
  }

  for (let urls of fuji) {
    await prisma.travelLog.create({
      data: {
        imageUrl: urls.links,
        userId: user.id,
        imageTitle: '',
        imageDescription: '',
        album: 'Japan',
        city:'Fuji',
        year:'2018'

      }
    }
    )
  }

  for(let urls of kyoto){
    await prisma.travelLog.create({
      data: {
        imageUrl: urls.links,
        userId: user.id,
        imageTitle: '',
        imageDescription: '',
        album: 'Japan',
        city:'Kyoto',
        year:'2018'

      }
    }
    )
  }

  for(let urls of shimo){
    await prisma.travelLog.create({
      data: {
        imageUrl: urls.links,
        userId: user.id,
        imageTitle: '',
        imageDescription: '',
        album: 'Japan',
        city:'Shimokitazawa'
,
        year:'2018'

  }
    }
    )
  }


  for(let urls of nyc){
    await prisma.travelLog.create({
      data: {
        imageUrl: urls.links,
        userId: user.id,
        imageTitle: urls.imageTitle,
        imageDescription: urls.imageDescription,

        album: 'NYC',
        city:'New York City',
        year:'2022'

      }
    }
    )
  }



await prisma.project.create({
      data: {
        title: "Social Media Blog V2",
        description: "A social media blog built with React and Typescript and Tailwindcss with new functionality",
        projectImg:"https://remix-bucket.s3.us-east-2.amazonaws.com/mystock/blogv2.png",
        projectUrl: "derickhoskinson.com",
        githubUrl:'https://github.com/Derick80/blog',
        userId: user.id,
        categories: {
      connectOrCreate: [
        {
          where: { value: 'Typescript' },
          create: { label: 'Typescript', value: 'Typescript' }
        },
        {
          where: {  value: 'React' },
          create: { label: 'React',value: 'React' }
        },
        {
          where: {  value: 'Tailwindcss' },
          create: { label: 'Tailwindcss',value: 'Tailwindcss' }
        },
        {
          where: {  value: 'Remix-run' },
          create: { label: 'Remix-run',value: 'Remix-run' }
        },
        {
          where: {  value: 'Prisma' },
          create: { label: 'Prisma',value: 'Prisma' }
        },
        {
          where: {  value: 'Postgres' },
          create: { label: 'Postgres',value: 'Postgres' }
        },

        {
          where:{ value: 'Vercel'},
          create:{label:'Vercel',value:'Vercel'}

        },
        {
          where:{ value: 'CockroachDB'},
          create:{label:'CockroachDB',value:'CockroachDB'}
        },
        {
          where:{ value: 'S3'},
          create:{label:'S3',value:'S3'}
        }
      ]
    }
      }
    })

    await prisma.project.create({
      data: {
        title:"Budget App",
        description: "A budget app built with React and Typescript and Tailwindcss and Remix-run metaframework",
        projectImg:"https://remix-bucket.s3.us-east-2.amazonaws.com/mystock/bankapp.png",
        projectUrl: "https://bank23-jhumheegh-derick80.vercel.app/",
        githubUrl:'https://github.com/Derick80/bank23',
        userId: user.id,
        categories:{
          connectOrCreate: [
            {
              where: { value: 'Typescript' },
              create: { label: 'Typescript', value: 'Typescript' }
            },
            {
              where: {  value: 'React' },
              create: { label: 'React',value: 'React' }
            },
            {
              where: {  value: 'Tailwindcss' },
              create: { label: 'Tailwindcss',value: 'Tailwindcss' }
            },
            {
              where: {  value: 'Remix-run' },
              create: { label: 'Remix-run',value: 'Remix-run' }
            },
            {
              where: {  value: 'Prisma' },
              create: { label: 'Prisma',value: 'Prisma' }
            },
            {
              where: {  value: 'Postgres' },
              create: { label: 'Postgres',value: 'Postgres' }
            },

            {
              where:{ value: 'Data Visualization'},
              create:{label:'Data Visualization',value:'Data Visualization'}
            }
          ]
        }
      }
    })




    await prisma.project.create({
      data: {
          title: "Japan 2023 Image Carousel",
          description: "An Image Carousel built with React and Typescript and Tailwindcss",
          projectImg: "https://remix-bucket.s3.us-east-2.amazonaws.com/mystock/photogallery.png",

          projectUrl: "https://photogallery-3r9pc82rg-derick80.vercel.app/",
          githubUrl:'https://github.com/Derick80/photogallery',
          userId: user.id,
         categories: {
      connectOrCreate: [
        {
          where: { value: 'Typescript' },
          create: { label: 'Typescript', value: 'Typescript' }
        },
        {
          where: {  value: 'React' },
          create: { label: 'React',value: 'React' }
        },
        {
          where: {  value: 'Tailwindcss' },
          create: { label: 'Tailwindcss',value: 'Tailwindcss' }

        },
        {
          where: {  value: 'Prisma' },
          create: { label: 'Prisma',value: 'Prisma' }
        },
        {
          where: {  value: 'Remix-run' },
          create: { label: 'Remix-run',value: 'Remix-run' }

        },
        {
          where:{ value: 'Vercel'},
          create:{label:'Vercel',value:'Vercel'}

        },
        {
          where:{ value: 'CockroachDB'},
          create:{label:'CockroachDB',value:'CockroachDB'}
        },
        {
          where:{ value: 'S3'},
          create:{label:'S3',value:'S3'}
        }
      ]
    }
      }
  })
  await prisma.project.create({
    data: {
        title: "Personal Blog 1.0 ",
        description: "A personal blog built with Remix and Typescript. This was the first first largely non-tutorial app that I built",
        projectImg: "https://remix-bucket.s3.us-east-2.amazonaws.com/mystock/blogV1.png",

        projectUrl: "https://derickcurtis.com/",
        githubUrl:'https://github.com/Derick80/blog_social_media',
        userId: user.id,
          categories: {
    connectOrCreate: [
      {
        where: {  value: 'Typescript' },
        create: { label: 'Typescript',value: 'Typescript' }

      },
      {
        where: {  value: 'React' },
        create: { label: 'React',value: 'React' }

      },
      {
        where: {  value: 'Tailwindcss' },
        create: { label: 'Tailwindcss',value: 'Tailwindcss' }

      },
      {
        where: {  value: 'Prisma' },
        create: { label: 'Prisma',value: 'Prisma' }
      },
      {
        where: {  value: 'Remix-run' },
        create: { label: 'Remix-run',value: 'Remix-run' }

      },
      {
        where:{ value: 'Vercel'},
        create:{label:'Vercel',value:'Vercel'}

      },
      {
        where:{ value: 'CockroachDB'},
        create:{label:'CockroachDB',value:'CockroachDB'}
      },
      {
        where:{ value: 'S3'},
        create:{label:'S3',value:'S3'}
      }
    ]
    }
    }
})
  await prisma.project.create({
    data: {
        title: "Memory Game",
        description: "A simple memory game built with React and Typescript",
        projectImg: "https://remix-bucket.s3.us-east-2.amazonaws.com/mystock/memory.png",

        projectUrl: "https://codesandbox.io/s/wow-memory-game-02b34",
        githubUrl:'https://github.com/Derick80/mindgame',
        userId: user.id,
       categories: {
    connectOrCreate: [
      {
        where: { value: 'Typescript' },
        create: { label: 'Typescript', value: 'Typescript' }
      },
      {
        where: {  value: 'React' },
        create: { label: 'React',value: 'React' }
      }
    ]
  }
    }
})
    const dataVisPost = await prisma.post.create({
        data: {
            title: "Data Visualization with Javascript",
            description: "Where I explore the world of data visualization a little bit at a time...",
            body:`<p>Data visualization has become increasingly important to me since starting my career in industry. I started with basic tools like Microsoft Office and Google Docs, but have since graduated to more advanced tools like ggplot in R. However, as I build a finance app for fun, I find that the data visualization landscape in Javascript is vast and confusing.</p><p>Initially, I thought about using a pie chart to display amounts by category, but ultimately decided to build my own band chart. Drawing inspiration from a portfolio tutorial on HTML and CSS, I created two elements: a container element that represents 0-100% and a child container element that takes a coded width to correspond to the percentage skill I want to visualize.</p><p>I found that by reshaping my data into data organized by category, I could display each category as a segment of a band-chart. </p><p></p><p>This chart is responsive and works at all viewpoints tested. I also decided to only display categories that are 10% or more, with the first three letters of the category, as I found that this displayed the most information with the least amount of clutter.</p><p></p><pre><code>import type { ReactNode } from 'react'

export function BandContainer({ children }: { children: ReactNode }) {
  return (
    &lt;div className='relative inline-flex h-5 w-96 bg-black dark:bg-white'&gt;
      {children}
    &lt;/div&gt;
  )
}</code></pre><p>Second, a child container element, a &lt;span&gt;, that would take in a coded width that would correspond to the % skill (0-100) that I wanted to visualize.</p><pre><code>export interface BandChartProps {
    bgFill: string
    // generated by chromajs scale
    itemWidth: number
    // percentage of total
    category: string
  }

  export function BandChart({
    bgFill,
    itemWidth,
    category,
  }: BandChartProps) {
    return (
      &lt;span
        key={category}
        className='flex h-5 flex-row items-center justify-center font-semibold'
        style={{
          backgroundColor: "{bgFill}",
          width: "{itemWidth}%"
        }}
      &gt;
        {/* only display if 10% or greater */}
  {itemWidth &lt; 9 ? '':  &lt;p className='translate-y-4 space-between flex text-[8px]'&gt;{category} {itemWidth}% &lt;/p&gt;}
      &lt;/span&gt;
    )
  }</code></pre><p></p><p></p><img src="https://remix-bucket.s3.us-east-2.amazonaws.com/Screenshot%202023-03-16%20at%202.41.48%20AM.png"><p></p><p>This chart is responsive and works at all viewpoints tested but I am only displaying categories that are 10% or more. I found that this + the first 3 letters of the category displayed the most information with the least amount of ugliness.</p>`,

            imageUrl: "https://remix-bucket.s3.us-east-2.amazonaws.com/Screenshot%202023-03-16%20at%202.41.48%20AM.png",
            createdBy:user.userName,
            createdAt: new Date('03-04-2023'),
            userId: user.id,
            published: true,
            featured: true,
            categories: {
        connectOrCreate: [
            {
            where: { value: 'Typescript' },
            create: { label: 'Typescript',value: 'Typescript' }
            },
            {
            where: { value: 'Coding' },
            create: { label: 'Coding',value: 'Coding' }
            },
            {
            where: { value: 'Javascript' },
            create: { label: 'Javascript',value: 'Javascript' }
            },
            {
            where: { value: 'React' },
            create: { label: 'React',value: 'React' }
            },

          ],
        }
        }

    })






 console.log(`Database has been seeded. 🌱`);



}


seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });



