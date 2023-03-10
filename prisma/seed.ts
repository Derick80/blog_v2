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
      userId: user2.id,
      email: user2.email,

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
      }
    })


    const cv = await prisma.curriculumVitae.create({
      data: {
          title: "Derick Hoskinson PHD",
          email: "derickchoskinson@gmail.com",
          phone: "312-871-8067",
          location: "Chicago, IL",
          blurb: "I am a clinical scientist with a passion for data science and genetics. I have a PhD in Genetics from Tufts University School of Biomedical Sciences. I have experience in the fields of inherited genetics, cancer genetics, and clinical research. I am currently working as a Senior Clinical Scientist at Tempus Labs. I am looking for a position where I can apply my skills to solve real-world problems.",
          userId: user.id,
      }
  })

  const educations =  await prisma.education.createMany({
    data: [
        {
            institution: "Tufts University School of Biomedical Sciences",
            degree: "Genetics PhD",
            location: "Boston, MA",
            startDate: "2006-09-01",
            endDate: "2014-05-01",
            cvId: cv.id
        },
        {
            institution: "University of Massachusetts Boston",
            degree: "Bachelors of Science in Biology",
            location: "Boston, MA",
            startDate: "2001-09-01",
            endDate: "2006-06-01",
            cvId: cv.id
        }
    ]
})

  const experiences =
  await prisma.cVExperience.createMany({
      data: [
          {
              title: "Senior Clinical Scientist",
              company: "Tempus Labs",
              location: "Chicago, IL",
              responsibilities: [
                  'Evaluated data and analyzed variants for a project that lead to the publication of the results in Nature Biotechnology',
                  'Trained over 20 M.A.s, Ph.D.’s and post-baccalaureate in germline and somatic variant classification',
'Worked closely with colleagues to build a team of variant scientists from 2 individuals to over 20 highly skilled variant scientists',
'Gained proficiency in the R programming language and experience using Python, JavaScript, HTML, and CSS',

              ],
              startDate: "2019-03-01",
              endDate: "",
              cvId: cv.id


          },
          {
              title: "Clinical Scientist",
              company: "Tempus Labs",
              location: "Chicago, IL",
              responsibilities: [
                  'Acted as the scientific lead in the development of the Tempus xF liquid biopsy panel to sequence and report SNVs and indels in clinically relevant regions of 105 genes plus CNVs and DNA rearrangements in a subset of these genes',
                  'Used R programming language to programmatically access data, wrangle data, analyze data and present data to implement changes in workflow or other internal processes',


              ],
              startDate: "2017-06-07",
              endDate: "2019-03-01",
              cvId: cv.id

          },
          {
              title: "Clinical Knowledge Curation Coordinator",
              company: "Laboratory for Molecular Medicine and Genetics",
              location: "Boston, MA",
              responsibilities: [
                  'Trained over 25 M.Ds, M.D. Ph.D.’s, rotating fellows, undergraduates, and post-baccalaureate in constitutional variant classification',
                  'Assessed pathogenicity of variants from large gene panels covering cardiomyopathy, hearing loss, pulmonary disease, and Noonan syndrome',
                  'Evaluated data and assessed variants as a critical member of the Geisinger MyCode project including the 56 genes recommended by the ACMG and 20 additional genes from Geisinger',
                  'Extensive experience with population databases (1000 genomes, ESP, ExAC, gnomAD)',
                  'Proficient in use of variant databases including, HGMD, ClinVar, LOVD, Deafness Variation database, Cardiodb, MitoMap, Leiden Muscular Dystrophy database, ARUP, and COSMIC',
              ],
              startDate: "2015-06-01",
              endDate: "2017-06-01",
              cvId: cv.id

          }

]


  })


  const publications = await prisma.publication.createMany({
      data: [
          {
              title: "Tumor Mutational Burden From Tumor-Only Sequencing Compared With Germline Subtraction From Paired Tumor and Normal Specimens",
              year: "2020",
              journal: "JAMA",
              authors: ['Parikh K, Huether R, White K, Hoskinson D, Beaubier N, Dong H, Adjei AA, Mansfield AS'],
              edition: `2020 Feb 5;3(2):e200202. PMID: 32108894; PMCID: PMC7049088.`,
              type: 'published',
              url:`https://doi.org/10.1001/jamanetworkopen.2020.0202`,
              cvId: cv.id
          },


          {
            title: "Integrated genomic profiling expands clinical options for patients with cancer ",
            year: "2020",
            journal: "Nature Biotechnology",
            authors: ['Beaubier, N., Bontrager, M., Huether, R., Igartua, C., Lau, D., Tell, R., Bobe, A. M., Bush, S., Chang, A. L., Hoskinson, D. C., Khan, A. A., Kudalkar, E., Leibowitz, B. D., Lozachmeur, A., Michuda, J., Parsons, J., Perera, J. F., Salahudeen, A., Shah, K. P., Taxter, T., … White, K. P. (2019) '],
            edition: `37(11), 1351–1360`,
            type: 'published',
            url:`https://www.nature.com/articles/s41587-019-0259-z`,
            cvId: cv.id
        }
      ]
  })

  const skills = await prisma.skill.createMany({
      data: [
          {
              name: "Genetics",
              category: "Clinical",
              cvId: cv.id
          },{
              name: "Clinical Research",
              category: "Clinical",
              cvId: cv.id

          },{
              name: "Variant Classification",
              category: "Clinical",
              cvId: cv.id

          },
          {
              name: "HTML",
              category: "Coding",
              level: "Intermediate",
              cvId: cv.id
          },
          {
              name: "CSS",
              category: "Coding",
              level: "Intermediate",
              cvId: cv.id

          },
          {
              name: "JavaScript",
              category: "Coding",
              level: "Intermediate",
              cvId: cv.id

          },{
              name: "Python",
              category: "Coding",
              level: "Intermediate",
              cvId: cv.id

          },
          {
              name: "qPCR",
              category: "Laboratory",
              cvId: cv.id
          },{
              name: "PCR",
              category: "Laboratory",
              cvId: cv.id
          },{
              name: "Western Blotting",
              category: "Laboratory",
              cvId: cv.id
          },
          {name: "Northern Blotting",
              category: "Laboratory",
              cvId: cv.id
              },
              {
                  name: `3' end R.A.C.E.`,
                  category: "Laboratory",
                  cvId: cv.id
              },
              {
                  name: "RNA ImmunoPrecipitation",
                  category: "Laboratory",
                  cvId: cv.id

              },
              {
                  name:"BioChemical analysis of  3' end mRNA formation",
                  category: "Laboratory",
                  cvId: cv.id
              },
              {
                  name: " RNA Isolation",
                  category: "Laboratory",
                  cvId: cv.id

              },
              {
                  name: "DNA Isolation",
                  category: "Laboratory",
                  cvId: cv.id

              },
              {
                  name: "Primer Extension assays",
                  category: "Laboratory",
                  cvId: cv.id

              }, {
                  name: "In Vitro transcribed RNAs",
                  category: "Laboratory",
                  cvId: cv.id

              },
              {
                  name: "Yeast two hybrid assays",
                  category: "Laboratory",
                  cvId: cv.id

              },
          {
              name: "ELISA",
              category: "Laboratory",
              cvId: cv.id
          },{
              name: "Mammalian Cell Culture",
              category: "Laboratory",
              cvId: cv.id
          },{
              name: 'Protein Purification',
              category: "Laboratory",
              cvId: cv.id
          },{
              name: "Protein Expression",
              category: "Laboratory",
              cvId: cv.id
          },{
              name: "Gene Tagging",
              category: "Laboratory",
              cvId: cv.id
          },{
              name: "Gene Knockout",
              category: "Laboratory",
              cvId: cv.id

          }


      ]
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
        projectUrl: "",
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
    const book1 = await prisma.post.create({
        data: {
            title: "Atomic habits",
            description: "Atomic Habits is a book by James Clear that explains how to build good habits and break bad ones.",
            body:`Atomic Habits is a book by James Clear that explains how to build good habits and break bad ones. The book is based on the idea that habits are the compound interest of self-improvement. The book is divided into four parts: The first part explains the science behind habits and how they are formed. The second part explains how to make good habits. The third part explains how to break bad habits. The fourth part explains how to make habits automatic. The book is based on the idea that habits are the compound interest of self-improvement. The book is divided into four parts: The first part explains the science behind habits and how they are formed. The second part explains how to make good habits. The third part explains how to break bad habits. The fourth part explains how to make habits automatic.`,
            imageUrl: "https://remix-bucket.s3.us-east-2.amazonaws.com/books_2022/atamic.png",
            createdBy:user.userName,
            userId: user.id,
            published: true,
            categories: {
        connectOrCreate: [
            {
            where: { value: 'Self-help' },
            create: { label: 'Self-help',value: 'Self-help' }
            },
            {
            where: { value: 'Books' },
            create: { label: 'Books',value: 'Books' }
            },
          ],
        }
        }

    })

const book2 = await prisma.post.create({
        data: {
            title: "The Checklist Manifesto",
           description: "The Checklist Manifesto is a book by Atul Gawande that explains how to use checklists to improve performance in all walks of life.",
          body:`The Checklist Manifesto is a book by Atul Gawande that explains how to use checklists to improve performance in all walks of life. The book is based on the idea that habits are the compound interest of self-improvement. The book is divided into four parts: The first part explains the science behind habits and how they are formed. The second part explains how to make good habits. The third part explains how to break bad habits. The fourth part explains how to make habits automatic.`,
            imageUrl: "https://remix-bucket.s3.us-east-2.amazonaws.com/books_2022/checklist.png",
            createdBy:user.userName,
            userId: user.id,
            published: true,
            categories: {
        connectOrCreate: [
            {
            where: { value: 'Self-help' },
            create: { label: 'Self-help',value: 'Self-help' }
            },
            {
            where: { value: 'Books' },
            create: { label: 'Books',value: 'Books' }
            },
          ],
        }
        }

    })

    const book3 = await prisma.post.create({
        data: {
            title:"Edges",
            description:`Edges is a new entry point into the classic story world of Linda Nagata’s The Nanotech Succession.`,
            body:`Deception Well is a world on the edge, home to an isolated remnant surviving at the farthest reach of human expansion. All across the frontier, other worlds have succumbed to the relentless attacks of robotic alien warships, while hundreds of light years away, the core of human civilization—those star systems closest to Earth, known as the Hallowed Vasties—have all fallen to ruins. Powerful telescopes can see only dust and debris where once there were orbital mega-structures so huge they eclipsed the light of their parent stars.`,
            imageUrl: "https://remix-bucket.s3.us-east-2.amazonaws.com/books_2022/edges.png",
            createdBy:user.userName,
            userId: user.id,
            published: true,
            categories: {
        connectOrCreate: [
            {
            where: { value: 'Science Fiction' },
            create: { label: 'Science Fiction',value: 'Science Fiction' }
            },
            {
            where: { value: 'Books' },
            create: { label: 'Books',value: 'Books' }
            },
          ],
        }
        }

    })

const book4 = await prisma.post.create({
        data: {
            title:"Moon Witch Spider King",
            description:`Moon Witch, Spider King is a 2022 fantasy novel by Jamaican writer Marlon James. It is the second book of a planned trilogy, after Black Leopard, Red Wolf.`,
            body:`Moon Witch, Spider King is a 2022 fantasy novel by Jamaican writer Marlon James. It is the second book of a planned trilogy, after Black Leopard, Red Wolf. The book is based on the idea that habits are the compound interest of self-improvement. The book is divided into four parts: The first part explains the science behind habits and how they are formed. The second part explains how to make good habits. The third part explains how to break bad habits. The fourth part explains how to make habits automatic.`,
            imageUrl: "https://remix-bucket.s3.us-east-2.amazonaws.com/books_2022/james.png",
            createdBy:user.userName,
            userId: user.id,
            published: true,
            categories: {
        connectOrCreate: [
            {
            where: { value: 'Fantasy' },
            create: { label: 'Fantasy',value: 'Fantasy' }
            },
            {
            where: { value: 'Books' },
            create: { label: 'Books',value: 'Books' }
            },
          ],
        }
        }

    })

const book5 = await prisma.post.create({
        data: {
            title:"The Last Watch",
            description:`The Last Watch, where a handful of soldiers stand between humanity and annihilation.
            `,
            body:`The Last Watch, where a handful of soldiers stand between humanity and annihilation. The book is based on the idea that habits are the compound interest of self-improvement. The book is divided into four parts: The first part explains the science behind habits and how they are formed. The second part explains how to make good habits. The third part explains how to break bad habits. The fourth part explains how to make habits automatic.`,
            imageUrl: "https://remix-bucket.s3.us-east-2.amazonaws.com/books_2022/lastwatch.png",
            createdBy:user.userName,
            userId: user.id,
            published: true,
            categories: {
        connectOrCreate: [
            {
            where: { value: 'Science Fiction' },
            create: { label: 'Science Fiction',value: 'Science Fiction' }
            },
            {
            where: { value: 'Books' },
            create: { label: 'Books',value: 'Books' }
            },
          ],
        }
        }

    })

const book6 = await prisma.post.create({
        data: {
            title:"Sea of Tranquility",
            description:`Sea of Tranquility is a 2022 novel by the Canadian writer Emily St. John Mandel.`
            ,
            body:`Edwin St. Andrew is eighteen years old when he crosses the Atlantic by steamship, exiled from polite society following an ill-conceived diatribe at a dinner party. He enters the forest, spellbound by the beauty of the Canadian wilderness, and suddenly hears the notes of a violin echoing in an airship terminal--an experience that shocks him to his core.`,
            imageUrl: "https://remix-bucket.s3.us-east-2.amazonaws.com/books_2022/sea.png",
            createdBy:user.userName,
            userId: user.id,
            published: true,
            categories: {
        connectOrCreate: [
            {
            where: { value: 'Fantasy' },
            create: { label: 'Fantasy',value: 'Fantasy' }
            },
            {
            where: { value: 'Books' },
            create: { label: 'Books',value: 'Books' }
            },
          ],
        }
        }

    })

const book7 = await prisma.post.create({
        data: {
            title:"Tomorrow, and Tomorrow, and Tomorrow: A novel",
            description:`Tomorrow, and Tomorrow, and Tomorrow: A novel is a 2022 novel by the American writer John Darnielle.`
            ,
            body:`Sam and Sadie—two college friends, often in love, but never lovers—become creative partners in a dazzling and intricately imagined world of video game design, where success brings them fame, joy, tragedy, duplicity, and, ultimately, a kind of immortality. It is a love story, but not one you have read before`,
            imageUrl: "https://remix-bucket.s3.us-east-2.amazonaws.com/books_2022/tomorrow.png",
            createdBy:user.userName,
            userId: user.id,
            published: true,
            categories: {
        connectOrCreate: [
            {
            where: { value: 'Science Fiction' },
            create: { label: 'Science Fiction',value: 'Science Fiction' }
            },
            {
            where: { value: 'Books' },
            create: { label: 'Books',value: 'Books' }
            },
          ],
        }
        }

    })









const post1 = await prisma.post.create({
        data: {
            title: "mRNA Maturation",
            description: "Introns are removed from the pre-mRNA by the spliceosome components in a two step reaction that ends in the joining of two exons together",
          body:`Introns are removed from primary transcripts by cleavage at conserved sequences called splice sites. These sites are found at the 5′ and 3′ ends of introns. Most commonly, the RNA sequence that is removed begins with the dinucleotide GU at its 5′ end, and ends with AG at its 3′ end`,
            imageUrl: "https://remix-bucket.s3.us-east-2.amazonaws.com/blog-prototype-images/dna.jpg",
            createdBy:user.userName,
            userId: user.id,
            published: true,
           categories: {
        connectOrCreate: [
            {
            where: { value: 'DNA' },
            create: { label: 'DNA',value: 'DNA' }
            },
            {
            where: { value: 'Science'},
            create: { label: 'Science',value: 'Science' }
            }
        ]
        }
        }
    })

    const comment1= await prisma.comment.create({
      data:{
        message:`I love this and wish I could read your phD dissertation`,
        createdBy:user.userName,
        userId:user2.id,

        postId:post1.id
      }
    })

const comment2= await prisma.comment.create({
      data:{
        parentId:comment1.id,
        message:`Thanks! Although I don't think that you would really like to read the dissertation.  It's a bit dry.`,
        createdBy:user2.userName,
        userId:user.id,
        postId:post1.id

      }
    })




    const comment3= await prisma.comment.create({
      data:{
        message:`I always loved images like these!`,
        createdBy:user2.userName,
        userId:user2.id,
        postId:post1.id

      }
    })

    const comment4= await prisma.comment.create({
      data:{
        parentId:comment3.id,
        message:`Yeah same. I like looking for even better ones.  This one was just lying around on the internet`,
        createdBy:user.userName,
        userId:user.id,
        postId:post1.id

      }
    })


    const comment5= await prisma.comment.create({
      data:{
        parentId:comment3.id,
        message:`Hahah -- I think you should look for better quality images next time.  This one is a bit blurry.`,
        createdBy:user.userName,
        userId:user2.id,
        postId:post1.id

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



