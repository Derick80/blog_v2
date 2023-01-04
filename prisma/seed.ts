/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client'
import { fuji, kyoto, shimo, shinJuku } from '~/utils/schemas/constants/japan-links'
import { nyc } from '~/utils/schemas/constants/nycurls'



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
            title: "Memory Game",
            description: "A simple memory game built with React and Typescript",
            projectImg: "https://blogphotosbucket.s3.us-east-2.amazonaws.com/postimages/post_two_memory_game.png",
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

    const post1= await prisma.post.create({
        data: {
            title: `PRODUCTION OF MATURE MRNA IS A MULTISTEP PROCESS REQUIRING MANY PROTEINS THAT IS ESSENTIAL FOR PROPER CELLULAR FUNCTION
            `,
                       description: `Defects in mRNA maturation lead to radical changes in development, growth and viability of the cell.`,
          body:`Production of mature mRNA is a multistep process requiring many proteins that is essential for proper cellular function. Defects in mRNA maturation lead to radical changes in development, growth and viability of the cell. The essential mRNA 3’ end processing subunit, Pcf11, is required for the cleavage and polyadenylation of nascent mRNAs and for proper termination of RNA polymerase II transcription. Pcf11 also plays a role in alternative polyadenylation. Previous work has identified and described the function of several domains in the Pcf11 protein, but the crystal structure has not been solved and there remain large stretches of Pcf11 that are uncharacterized. Pcf11 is part of the CF 1A factor involved in cleavage and polyadenylation. As part of CF 1A, Pcf11 makes contacts with each of the other CF 1A protein subunits as well as several of the protein subunits that make up the Cleavage and Polyadenylation Factor (CPF), but the importance of these cross-factor interactions is not known. Pcf11 and other mRNA 3’ end processing subunits have been primarily studied in the context of RNA polymerase II transcription and mRNA processing but there are indications that mRNA processing subunits participate in other aspects of RNA maturation such as tRNA `,
            imageUrl: "https://blogphotosbucket.s3.us-east-2.amazonaws.com/postimages/post_three_yeast_plates.jpeg",
            createdBy:user.userName,
            userId: user.id,
            published: true,
           categories: {
        connectOrCreate: [
            {
            where: { value: 'JavaScript' },
            create: { label: 'JavaScript',value: 'JavaScript' }
            },
            {
            where: { value: 'Elixir' },
            create: { label: 'Elixir',value: 'Elixir' }
            }
        ]
        }
        }
    })
const post2 = await prisma.post.create({
        data: {
            title: "mRNA Maturation",
            description: "Introns are removed from the pre-mRNA by the spliceosome components in a two step reaction that ends in the joining of two exons together",
          body:`Many genes, if not most, in higher organisms contain non-coding, intervening DNA sequences called introns, between the protein-coding exon portions of the gene. The second major step in mRNA maturation is the removal of introns and the splicing of exons. Introns are removed from the pre-mRNA by the spliceosome components in a two step reaction that ends in the joining of two exons together (Bentley 2014). Most metazoan genes have numerous introns while very few genes in yeast have introns. The selection of which exons are included in the final mRNA has lead to a diversification of gene products such that one gene can code for numerous different mRNA isoforms, each of which may have unique functions. Chromatin modifications and differential phosphorylation of the CTD of RNAP II play an active role in the recruitment of splicing factors, and the splicing reaction itself may occur prior to or following the cleavage and polyadenylation step of mRNA maturation (Bentley 2014; Rigo & Martinson 2009; Oesterreich et al. 2011; David & Manley 2011). mRNAs that contain introns that are not properly spliced are recognized by the mRNA surveillance complex, TRAMP (Trf4/Air2/Mtr4p Polyadenylation), and degraded by the nuclear exosome. If intron-containing mRNAs escape to the cytoplasm, they are degraded via nonsense mediated decay (NMD) or NMD-independent degradation pathways (Aguilera, 2005; Bentley, 2014).`,
            imageUrl: "https://remix-bucket.s3.us-east-2.amazonaws.com/lab.jpeg",
            createdBy:user.userName,
            userId: user.id,
            published: true,
           categories: {
        connectOrCreate: [
            {
            where: { value: 'Science' },
            create: { label: 'Science',value: 'Science' }
            },
            {
            where: { value: 'Genetics'},
            create: { label: 'Genetics',value: 'Genetics' }
            }
        ]
        }
        }
    })

    const comment1= await prisma.comment.create({
      data:{
        message:`I'm a root comment`,
        createdBy:user.userName,
        userId:user.id,

        postId:post1.id
      }
    })

const comment2= await prisma.comment.create({
      data:{
        parentId:comment1.id,
        message:`I'm a child comment of comment1`,
        createdBy:user2.userName,
        userId:user2.id,
        postId:post1.id

      }
    })




    const comment3= await prisma.comment.create({
      data:{
        message:`I'm a root comment comment3`,
        createdBy:user2.userName,
        userId:user2.id,
        postId:post2.id

      }
    })

    const comment4= await prisma.comment.create({
      data:{
        parentId:comment3.id,
        message:`I'm a child comment of comment 3`,
        createdBy:user.userName,
        userId:user.id,
        postId:post2.id

      }
    })


    const comment5= await prisma.comment.create({
      data:{
        parentId:comment3.id,
        message:`I'm a child comment`,
        createdBy:user.userName,
        userId:user.id,
        postId:post2.id

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



