import { PrismaClient } from '@prisma/client'
import { imageUrls } from '~/utils/schemas/constants/imgurls'
import { nycUrls } from '~/utils/schemas/constants/nycurls'


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
            userName: 'Grayone',
            avatarUrl:`https://res.cloudinary.com/dch-photo/image/upload/v1672076729/stock/DerickTrain1_ysxonq.jpg`
        }
    })
      const user3 = await prisma.user.create({
        data:{
            email:'thegrayone00@gmail.com',
            password: '1234567',
            userName: 'TheGrayone00',
            avatarUrl: `https://res.cloudinary.com/dch-photo/image/upload/v1672076790/stock/fitzy_cx2zku.jpg`
        }
    })
      const user4 = await prisma.user.create({
        data:{
            email:'sean@gmail.com',
            password: '1234567',
            userName: 'Sean Dempsey',
            avatarUrl:`https://res.cloudinary.com/dch-photo/image/upload/v1672076840/stock/DerickWork_zah8vu.jpg`
        }
    })
      const user5 = await prisma.user.create({
        data:{
            email:'thatGrayone@gmail.com',
            password: '1234567',
            userName: 'ThatGrayone',
            avatarUrl:`https://res.cloudinary.com/dch-photo/image/upload/v1672076841/stock/turntable_bkgwyx.jpg`,


        }
    })

    await prisma.profile.create({
      data:{

        userName: 'Grayone',
        firstName: 'Grayone',
        lastName: 'Hoskinson',
bio:`I was born in western New York`
,
location:`Chicago, IL`,
education:`Education`,
occupation:`Coder`,
profilePicture:'https://blogphotosbucket.s3.us-east-2.amazonaws.com/profileimages/DerickFace.jpg',
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
            avatarUrl: `https://res.cloudinary.com/dch-photo/image/upload/v1672019067/stock/blogapp_xx4zq3.png`,

        }
    })
    await prisma.profile.create({
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
      userId: user.id,
      email: user.email,
      }
    })



  for (let urls of imageUrls) {
    await prisma.japanImages.create({
      data: {
        imageUrl: urls.imgUrl,
        userId: user.id,
        imgTitle: '',
        imgDescription: '',
      }
    }
    )
  }

  for (let urls of imageUrls) {
    await prisma.travelLog.create({
      data: {
        imageUrl: urls.imgUrl,
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

  for(let urls of nycUrls){
    await prisma.travelLog.create({
      data: {
        imageUrl: urls.imgUrl,
        userId: user.id,
        imageTitle: '',
        imageDescription: '',
        album: 'NYC',
        city:'New York City',
        year:'2022'

      }
    }
    )
  }
    await prisma.project.create({
        data: {
            title: "Memory Game",
            description: "A simple memory game built with React and Typescript",
            projectImg: "https://blogphotosbucket.s3.us-east-2.amazonaws.com/postimages/post_two_memory_game.png",
            projectUrl: "https://codesandbox.io/s/wow-memory-game-02b34",
            githubUrl:'https://github.com/Derick80/mindgame',
            userId: user.id,
           categories: {
        connectOrCreate: [
          {
            where: { name: 'Typescript' },
            create: { name: 'Typescript' }
          },
          {
            where: { name: 'React' },
            create: { name: 'React' }
          }
        ]
      }
        }
    })

    await prisma.project.create({
        data: {
            title: "Personal Blog 1.0 ",
            description: "A personal blog built with Remix and Typescript",
            projectImg: "https://res.cloudinary.com/dch-photo/image/upload/v1672019067/stock/blogapp_xx4zq3.png",
            projectUrl: "https://blog-nine-tau-49.vercel.app/",
            githubUrl:'https://github.com/Derick80/blog_social_media',
            userId: user.id,
              categories: {
        connectOrCreate: [
            {
            where: { name: 'Typescript' },
            create: { name: 'Typescript' }
            },
            {
            where: { name: 'Remix-run' },
            create: { name: 'Remix-run' }
            }
        ]
        }
        }
    })

    await prisma.post.create({
        data: {
            title: "Post One",
            description: "Post one",
          body:'This is the body of post one',
            postImg: "https://blogphotosbucket.s3.us-east-2.amazonaws.com/postimages/post_two_memory_game.png",
            createdBy:user.userName,
            userId: user.id,
            published: true,
           categories: {
        connectOrCreate: [
            {
            where: { name: 'Typescript' },
            create: { name: 'Typescript' }
            },
            {
            where: { name: 'Remix-run' },
            create: { name: 'Remix-run' }
            }
        ]
        }
        }
    })
await prisma.post.create({
        data: {
            title: "Post Two",
            description: "Post 2",
          body:'This is the body of post two',
            postImg: "",
            createdBy:user.userName,
            userId: user.id,
            published: true,
           categories: {
        connectOrCreate: [
            {
            where: { name: 'Science' },
            create: { name: 'Science' }
            },
            {
            where: { name: 'Genetics' },
            create: { name: 'Genetics' }
            }
        ]
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



