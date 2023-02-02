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

    const user2 = await prisma.user.create({
        data:{
            email:'Grayone@gmail.com',
            password: '1234567',
            userName: 'Chris&Jason',
            avatarUrl:`https://remix-bucket.s3.us-east-2.amazonaws.com/blog-prototype-images/dch_chris_jason.jpg`
        }
    })
      const user3 = await prisma.user.create({
        data:{
            email:'elisser00@gmail.com',
            password: '1234567',
            userName: 'Lisser',
            avatarUrl: `https://remix-bucket.s3.us-east-2.amazonaws.com/blog-prototype-images/dch_elissa.jpg`
        }
    })
      const user4 = await prisma.user.create({
        data:{
            email:'liss@gmail.com',
            password: '1234567',
            userName: 'Elissa',
            avatarUrl:`https://remix-bucket.s3.us-east-2.amazonaws.com/blog-prototype-images/dch_elissa.jpg`
        }
    })
      const user5 = await prisma.user.create({
        data:{
            email:'sean@gmail.com',
            password: '1234567',
            userName: 'SeanD',
            avatarUrl:`https://remix-bucket.s3.us-east-2.amazonaws.com/blog-prototype-images/sean.jpg`,


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
bio:`I was born in western New York state where I lived until I moved to Bolivar Missouri (yikes) until I went off to college, quit college and moved to Boston in 2001.
I completed my undergraduate degree at the University of Massachusetts Boston, then graduate school at Tufts Graduate School of Biomedical Sciences and finally I worked as a post doctoral student at The Laboratory for Molecular Medicine at Harvard Medical School.

After a couple of years I used my skill in interpreting genomic variants to join a small start up called Tempus labs. It's been five years and I have expanded the breadth of my understanding in genetics and have fostered emergent coding skills. I have used those skills to create new assays, support automation in production, and improve processes in between.

I'm really excited about the future in genetics and web development. I hope to find a really great position where I can use my fantastic scientific knowledge to inform data analysis, display and the development of modern web applications to view and use the data.`,

location:`Chicago, IL`,
education:`Education I completed my Ph.D in genetics at Tufts Graduate School of Biomedical Sciences in Boston, MA.`,
occupation:`I am a Senior Clinical Scientist at Tempus Labs in Chicago, IL.`,
profilePicture:'https://blogphotosbucket.s3.us-east-2.amazonaws.com/profileimages/DerickFace.jpg',
      email: user.email,
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
        title: "Personal Blog 1.0 ",
        description: "A personal blog built with Remix and Typescript",
        projectImg: "https://remix-bucket.s3.us-east-2.amazonaws.com/mystock/blog.png",

        projectUrl: "https://blog-nine-tau-49.vercel.app/",
        githubUrl:'https://github.com/Derick80/blog_social_media',
        userId: user.id,
          categories: {
    connectOrCreate: [
        {
        where: { value: 'Prisma' },
        create: { label: 'Prisma',value: 'Prisma' }
        },
        {
        where: {value: 'Remix-run' },
        create: { label: 'Remix-run',value: 'Remix-run' }
        }
    ]
    }
    }
})

    await prisma.project.create({
        data: {
            title: "Memory Game",
            description: "A simple memory game built with React and Typescript",
            projectImg: "https://remix-bucket.s3.us-east-2.amazonaws.com/mystock/post_two_memory_game.png",

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








    const post1= await prisma.post.create({
        data: {
            title: `Production of mature mRNA is a multistep process requiring many proteins that is essential for proper cellular function.`,
                       description: `Defects in mRNA maturation lead to radical changes in development, growth and viability of the cell.`,
          body:`Production of mature mRNA is a multistep process requiring many proteins that is essential for proper cellular function. Defects in mRNA maturation lead to radical changes in development, growth and viability of the cell. The essential mRNA 3’ end processing subunit, Pcf11, is required for the cleavage and polyadenylation of nascent mRNAs and for proper termination of RNA polymerase II transcription. Pcf11 also plays a role in alternative polyadenylation. Previous work has identified`,
            imageUrl: "https://remix-bucket.s3.us-east-2.amazonaws.com/lab.jpeg",
            createdBy:user.userName,
            userId: user.id,
            published: true,
           categories: {
        connectOrCreate: [
            {
            where: { value: 'Genetics' },
            create: { label: 'Genetics',value: 'Genetics' }
            },
            {
            where: { value: 'Science' },
            create: { label: 'Science',value: 'Science' }
            }
        ]
        }
        }
    })
const post2 = await prisma.post.create({
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
        postId:post2.id

      }
    })

    const comment4= await prisma.comment.create({
      data:{
        parentId:comment3.id,
        message:`Yeah same. I like looking for even better ones.  This one was just lying around on the internet`,
        createdBy:user.userName,
        userId:user.id,
        postId:post2.id

      }
    })


    const comment5= await prisma.comment.create({
      data:{
        parentId:comment3.id,
        message:`Hahah -- I think you should look for better quality images next time.  This one is a bit blurry.`,
        createdBy:user.userName,
        userId:user2.id,
        postId:post2.id

      }

    })





    const profile3 = await prisma.profile.create({
        data: {
            bio: `I am a biochemist and I love to read and write about science.  I also love to play video games and watch movies.`,
            firstName: "Jane",
            lastName: "Doe",
            education: "PhD in Biochemistry",
user:{
              connect:{
                id:user3.id


},
            },
         userName: user3.userName,
            profilePicture: "https://remix-bucket.s3.us-east-2.amazonaws.com/blog-prototype-images/dch_elissa.jpg",
            occupation: "Biochemist",
          email: user3.email,
            location: "New York, NY"
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



