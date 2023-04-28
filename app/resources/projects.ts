export const projects = [
  {
    id: 'be56d035-9164-4ad0-b929-8b7802e1e00e',
    title: 'A Cellular Wind',
    description:
      "A Cellular Wind is a blog that I'm writing using markdown.  It's really my first foray into MD",
    projectImage:
      'https://res.cloudinary.com/dch-photo/image/upload/v1681854400/wzrjntlj3s8aqdbgmaxc.png',
    projectUrl: 'https://cellularwind.com/',
    githubUrl: 'https://github.com/Derick80/astro-blog',
    createdAt: '2023-04-18T21:52:08.779Z',
    userId: '6d11174e-9d65-4bef-949f-8e1ea3496ad3',
    implementations: [
      {
        id: '1',
        task: 'Markdown Posts'
      },
      {
        id: '2',
        task: 'Markdown Projects'
      },
      {
        id: '3',
        task: 'Markdown Resume'
      },
      {
        id: '4',
        task: 'Markdown About'
      }
    ],
    categories: [
      {
        id: '1d3410c7-9494-4d73-b143-c7bb805817d8',
        label: 'Astro',
        value: 'Astro'
      },
      {
        id: '8f206d44-4fcc-4f90-a9e2-80c175b9f061',
        label: 'Markdown',
        value: 'Markdown'
      }
    ],
    user: {
      id: '6d11174e-9d65-4bef-949f-8e1ea3496ad3',
      userName: 'Derick',
      avatarUrl:
        'https://remix-bucket.s3.us-east-2.amazonaws.com/blog-prototype-images/DerickFace.jpg',
      email: 'iderick@gmail.com'
    }
  },
  {
    id: '4da5dc46-2350-45db-a810-5b06af0e77f6',
    title: 'To Do App',
    description: 'A simple todo application created with Remix',
    projectImage:
      'https://res.cloudinary.com/dch-photo/image/upload/v1681854627/ve402op3lbngdzjuhoby.png',
    projectUrl: 'https://dchtodos.fly.dev/',
    githubUrl: 'https://github.com/Derick80/todos',
    createdAt: '2023-04-17T21:52:08.779Z',
    userId: '6d11174e-9d65-4bef-949f-8e1ea3496ad3',
    implementations: [
      {
        id: '1',
        task: 'Create a todo'
      },
      {
        id: '2',
        task: 'Delete a todo'
      },
      {
        id: '3',
        task: 'Update a todo'
      },
      {
        id: '4',
        task: 'Mark a todo as complete'
      },
      {
        id: '5',
        task: 'Filter todos by status'
      },
      {
        id: '6',
        task: 'More nested layouts'
      }
    ],

    categories: [
      {
        id: '80e98747-5dc0-465f-907e-4fea069d6c3c',
        label: 'TypeScript',
        value: 'TypeScript'
      },
      {
        id: '8f206d44-4fcc-4f90-a9e2-80c175b9f062',
        label: 'Remix',
        value: 'Remix'
      },
      {
        id: '8f206d44-4fcc-4f90-a9e2-80c175b9f063',
        label: 'TailwindCSS',
        value: 'TailwindCSS'
      },
      {
        id: '8f206d44-4fcc-4f90-a9e2-80c175b9f064',
        label: 'React',
        value: 'React'
      },
      {
        id: '8f206d44-4fcc-4f90-a9e2-80c175b9f065',
        label: 'Prisma',
        value: 'Prisma'
      },
      {
        id: '8f206d44-4fcc-4f90-a9e2-80c175b9f066',
        label: 'Postgres',
        value: 'Postgres'
      }
    ],
    user: {
      id: '6d11174e-9d65-4bef-949f-8e1ea3496ad3',
      userName: 'Derick',
      avatarUrl:
        'https://remix-bucket.s3.us-east-2.amazonaws.com/blog-prototype-images/DerickFace.jpg',
      email: 'iderick@gmail.com'
    }
  },
  {
    id: 'ac20afe6-7a01-46df-955a-ce50b98bb279',
    title: 'DNA Reverse Complement ',
    description:
      'A simple DNA reverse complement app.  Enter a DNA sequence and get the reverse complement back',
    projectImage:
      'https://res.cloudinary.com/dch-photo/image/upload/v1679951416/f4druehyvkialpjgajbm.png',
    projectUrl: 'https://dna-tawny.vercel.app/',
    githubUrl: 'https://github.com/Derick80/dna',
    createdAt: '2023-04-17T21:52:08.779Z',
    userId: '6d11174e-9d65-4bef-949f-8e1ea3496ad3',
    categories: [
      {
        id: 'ba447bb8-abe6-4a99-ba9a-bb436dca1626',
        label: 'Genetics',
        value: 'Genetics'
      },
      {
        id: '8f206d44-4fcc-4f90-a9e2-80c175b9f061',
        label: 'React',
        value: 'React'
      },
      {
        id: '8f206d44-4fcc-4f90-a9e2-80c175b9f062',
        label: 'TailwindCSS',
        value: 'TailwindCSS'
      },
      {
        id: '8f206d44-4fcc-4f90-a9e2-80c175b9f063',
        label: 'TypeScript',
        value: 'TypeScript'
      }
    ],
    user: {
      id: '6d11174e-9d65-4bef-949f-8e1ea3496ad3',
      userName: 'Derick',
      avatarUrl:
        'https://remix-bucket.s3.us-east-2.amazonaws.com/blog-prototype-images/DerickFace.jpg',
      email: 'iderick@gmail.com'
    }
  },
  {
    id: '126db16f-e505-42b6-abc1-af715f7924e3',
    title: 'T3 Stack S3 Image Upload with Blog Post',
    description:
      'I wanted to try a new technology stack so I replicated Image upload functionality from my social media apps in the T3 stack.',
    projectImage:
      'https://res.cloudinary.com/dch-photo/image/upload/v1680132957/rbk0xpqxkptfi90ddnhu.png',
    projectUrl: 'https://trpc-blog-two.vercel.app/',
    githubUrl: 'https://github.com/Derick80/trpc-blog',
    createdAt: '2023-04-16T21:52:08.779Z',
    userId: '6d11174e-9d65-4bef-949f-8e1ea3496ad3',
    implementations: [
      {
        id: '1',
        task: 'Comment system'
      },
      {
        id: '2',
        task: 'Image upload'
      },
      {
        id: '3',
        task: 'User authentication'
      },
      {
        id: '4',
        task: 'Blog post'
      }
    ],
    categories: [
      {
        id: 'c46e0554-c284-4580-89ce-83c4323c86a6',
        label: 'CockroachDB',
        value: 'CockroachDB'
      },
      {
        id: 'c46e0554-c284-4580-89ce-83c4323c86a7',
        label: 'React',
        value: 'React'
      },
      {
        id: 'c46e0554-c284-4580-89ce-83c4323c86a8',
        label: 'TailwindCSS',
        value: 'TailwindCSS'
      },
      {
        id: 'c46e0554-c284-4580-89ce-83c4323c86a9',
        label: 'Prisma',
        value: 'Prisma'
      },
      {
        id: 'c46e0554-c284-4580-89ce-83c4323c86a10',
        label: 'React Query',
        value: 'React Query'
      },
      {
        id: 'c46e0554-c284-4580-89ce-83c4323c86a11',
        label: 'React Hook Form',
        value: 'React Hook Form'
      },
      {
        id: 'c46e0554-c284-4580-89ce-83c4323c86a12',
        label: 'React Router',
        value: 'React Router'
      }
    ],
    user: {
      id: '6d11174e-9d65-4bef-949f-8e1ea3496ad3',
      userName: 'Derick',
      avatarUrl:
        'https://remix-bucket.s3.us-east-2.amazonaws.com/blog-prototype-images/DerickFace.jpg',
      email: 'iderick@gmail.com'
    }
  },
  {
    id: '9710dbd1-7490-4b0a-b739-267a4dfd4908',
    title: 'Japan 2023 Image Carousel',
    description:
      'An Image Carousel built with React and Typescript and Tailwindcss',
    projectImage:
      'https://remix-bucket.s3.us-east-2.amazonaws.com/mystock/photogallery.png',
    projectUrl: 'https://photogallery-3r9pc82rg-derick80.vercel.app/',
    githubUrl: 'https://github.com/Derick80/photogallery',
    createdAt: '2023-04-15T21:52:08.779Z',
    userId: '6d11174e-9d65-4bef-949f-8e1ea3496ad3',
    implementations: [
      {
        id: '1',
        task: 'Image Carousel'
      },
      {
        id: '2',
        task: 'Tailwindcss'
      }
    ],
    categories: [
      {
        id: '93b090c8-f7a1-43a7-b188-bb15462537b8',
        label: 'Typescript',
        value: 'Typescript'
      },
      {
        id: '9edaa73a-af41-4767-b04c-c04613ad10ec',
        label: 'Vercel',
        value: 'Vercel'
      },
      {
        id: 'a06602f8-544b-48e5-b75d-7da1991471de',
        label: 'S3',
        value: 'S3'
      },
      {
        id: 'bae95457-43eb-4c46-8090-729e11f5f618',
        label: 'Tailwindcss',
        value: 'Tailwindcss'
      },
      {
        id: 'c46e0554-c284-4580-89ce-83c4323c86a6',
        label: 'CockroachDB',
        value: 'CockroachDB'
      },
      {
        id: 'ce122a29-a5ba-4442-a83a-e81bc162b231',
        label: 'Prisma',
        value: 'Prisma'
      },
      {
        id: 'e40afd67-4811-45b4-ba03-af98747a6109',
        label: 'Remix-run',
        value: 'Remix-run'
      },
      {
        id: 'fe3d6970-46a0-4762-a779-50ec33e53b84',
        label: 'React',
        value: 'React'
      }
    ],
    user: {
      id: '6d11174e-9d65-4bef-949f-8e1ea3496ad3',
      userName: 'Derick',
      avatarUrl:
        'https://remix-bucket.s3.us-east-2.amazonaws.com/blog-prototype-images/DerickFace.jpg',
      email: 'iderick@gmail.com'
    }
  },
  {
    id: '82f992ff-3c44-47e0-9796-3ffec823a782',
    title: 'Budget App',
    description:
      'A budget app built with React and Typescript and Tailwindcss and Remix-run metaframework',
    projectImage:
      'https://remix-bucket.s3.us-east-2.amazonaws.com/mystock/bankapp.png',
    projectUrl: 'https://bank23-jhumheegh-derick80.vercel.app/',
    githubUrl: 'https://github.com/Derick80/bank23',
    createdAt: '2023-04-10T21:52:08.779Z',
    userId: '6d11174e-9d65-4bef-949f-8e1ea3496ad3',
    implementations: [
      {
        id: '1',
        task: 'Nested routing with Remix'
      },
      {
        id: '2',
        task: 'Band chart creation'
      },
      {
        id: '3',
        task: 'User authentication'
      },
      {
        id: '4',
        task: 'Date time manipulation'
      }
    ],
    categories: [
      {
        id: '3b761ae5-b5aa-4c1c-be55-bd2e28392540',
        label: 'Data Visualization',
        value: 'Data Visualization'
      },
      {
        id: '75438a0f-0e58-4266-b127-b7f9aed4550e',
        label: 'Postgres',
        value: 'Postgres'
      },
      {
        id: '93b090c8-f7a1-43a7-b188-bb15462537b8',
        label: 'Typescript',
        value: 'Typescript'
      },
      {
        id: 'bae95457-43eb-4c46-8090-729e11f5f618',
        label: 'Tailwindcss',
        value: 'Tailwindcss'
      },
      {
        id: 'ce122a29-a5ba-4442-a83a-e81bc162b231',
        label: 'Prisma',
        value: 'Prisma'
      },
      {
        id: 'e40afd67-4811-45b4-ba03-af98747a6109',
        label: 'Remix-run',
        value: 'Remix-run'
      },
      {
        id: 'fe3d6970-46a0-4762-a779-50ec33e53b84',
        label: 'React',
        value: 'React'
      }
    ],
    user: {
      id: '6d11174e-9d65-4bef-949f-8e1ea3496ad3',
      userName: 'Derick',
      avatarUrl:
        'https://remix-bucket.s3.us-east-2.amazonaws.com/blog-prototype-images/DerickFace.jpg',
      email: 'iderick@gmail.com'
    }
  },
  {
    id: '01b6e4fd-b20f-43cf-9fc1-3b81df6efdfb',
    title: 'Social Media Blog V2',
    description:
      'A social media blog built with React and Typescript and Tailwindcss with new functionality',
    projectImage:
      'https://remix-bucket.s3.us-east-2.amazonaws.com/mystock/blogv2.png',
    projectUrl: 'derickhoskinson.com',
    githubUrl: 'https://github.com/Derick80/blog',
    createdAt: '2023-04-09T21:52:08.779Z',
    userId: '6d11174e-9d65-4bef-949f-8e1ea3496ad3',
    implementations: [
      {
        id: '1',
        task: 'Comment system'
      },
      {
        id: '2',
        task: 'Image upload'
      },
      {
        id: '3',
        task: 'User authentication'
      },
      {
        id: '4',
        task: 'Blog post'
      },
      {
        id: '5',
        task: 'Like system'
      },
      {
        id: '6',
        task: 'Favorite system'
      },
      {
        id: '7',
        task: 'Advanced CSS'
      },
      {
        id: '8',
        task: 'Typescript'
      },
      {
        id: '9',
        task: 'React'
      },
      {
        id: '10',
        task: 'Remix-run'
      }
    ],
    categories: [
      {
        id: '75438a0f-0e58-4266-b127-b7f9aed4550e',
        label: 'Postgres',
        value: 'Postgres'
      },
      {
        id: '93b090c8-f7a1-43a7-b188-bb15462537b8',
        label: 'Typescript',
        value: 'Typescript'
      },
      {
        id: '9edaa73a-af41-4767-b04c-c04613ad10ec',
        label: 'Vercel',
        value: 'Vercel'
      },
      {
        id: 'a06602f8-544b-48e5-b75d-7da1991471de',
        label: 'S3',
        value: 'S3'
      },
      {
        id: 'bae95457-43eb-4c46-8090-729e11f5f618',
        label: 'Tailwindcss',
        value: 'Tailwindcss'
      },
      {
        id: 'c46e0554-c284-4580-89ce-83c4323c86a6',
        label: 'CockroachDB',
        value: 'CockroachDB'
      },
      {
        id: 'ce122a29-a5ba-4442-a83a-e81bc162b231',
        label: 'Prisma',
        value: 'Prisma'
      },
      {
        id: 'e40afd67-4811-45b4-ba03-af98747a6109',
        label: 'Remix-run',
        value: 'Remix-run'
      },
      {
        id: 'fe3d6970-46a0-4762-a779-50ec33e53b84',
        label: 'React',
        value: 'React'
      }
    ],
    user: {
      id: '6d11174e-9d65-4bef-949f-8e1ea3496ad3',
      userName: 'Derick',
      avatarUrl:
        'https://remix-bucket.s3.us-east-2.amazonaws.com/blog-prototype-images/DerickFace.jpg',
      email: 'iderick@gmail.com'
    }
  },
  {
    id: '848dcc55-b9f3-4acb-8534-eda5dc1f5ee3',
    title: 'Personal Blog 1.0 ',
    description:
      'A personal blog built with Remix and Typescript. This was the first first largely non-tutorial app that I built',
    projectImage:
      'https://remix-bucket.s3.us-east-2.amazonaws.com/mystock/blogV1.png',
    projectUrl: 'https://derickcurtis.com/',
    githubUrl: 'https://github.com/Derick80/blog_social_media',
    createdAt: '2023-04-08T21:52:08.779Z',
    userId: '6d11174e-9d65-4bef-949f-8e1ea3496ad3',
    implementations: [
      {
        id: '1',
        task: 'Comment system'
      },
      {
        id: '2',
        task: 'Image upload'
      },
      {
        id: '3',
        task: 'User authentication'
      },
      {
        id: '4',
        task: 'Blog post'
      },
      {
        id: '5',
        task: 'Like system'
      },
      {
        id: '6',
        task: 'Favorite system'
      }
    ],
    categories: [
      {
        id: '93b090c8-f7a1-43a7-b188-bb15462537b8',
        label: 'Typescript',
        value: 'Typescript'
      },
      {
        id: '9edaa73a-af41-4767-b04c-c04613ad10ec',
        label: 'Vercel',
        value: 'Vercel'
      },
      {
        id: 'a06602f8-544b-48e5-b75d-7da1991471de',
        label: 'S3',
        value: 'S3'
      },
      {
        id: 'bae95457-43eb-4c46-8090-729e11f5f618',
        label: 'Tailwindcss',
        value: 'Tailwindcss'
      },
      {
        id: 'c46e0554-c284-4580-89ce-83c4323c86a6',
        label: 'CockroachDB',
        value: 'CockroachDB'
      },
      {
        id: 'ce122a29-a5ba-4442-a83a-e81bc162b231',
        label: 'Prisma',
        value: 'Prisma'
      },
      {
        id: 'e40afd67-4811-45b4-ba03-af98747a6109',
        label: 'Remix-run',
        value: 'Remix-run'
      },
      {
        id: 'fe3d6970-46a0-4762-a779-50ec33e53b84',
        label: 'React',
        value: 'React'
      }
    ],
    user: {
      id: '6d11174e-9d65-4bef-949f-8e1ea3496ad3',
      userName: 'Derick',
      avatarUrl:
        'https://remix-bucket.s3.us-east-2.amazonaws.com/blog-prototype-images/DerickFace.jpg',
      email: 'iderick@gmail.com'
    }
  },
  {
    id: '297deb25-03d9-4982-a4fc-6c6ec7b280c3',
    title: 'Memory Game',
    description: 'A simple memory game built with React and Typescript',
    projectImage:
      'https://remix-bucket.s3.us-east-2.amazonaws.com/mystock/memory.png',
    projectUrl: 'https://codesandbox.io/s/wow-memory-game-02b34',
    githubUrl: 'https://github.com/Derick80/mindgame',
    createdAt: '2023-03-18T21:52:08.779Z',
    userId: '6d11174e-9d65-4bef-949f-8e1ea3496ad3',
    categories: [
      {
        id: '93b090c8-f7a1-43a7-b188-bb15462537b8',
        label: 'Typescript',
        value: 'Typescript'
      },
      {
        id: 'fe3d6970-46a0-4762-a779-50ec33e53b84',
        label: 'React',
        value: 'React'
      }
    ],
    user: {
      id: '6d11174e-9d65-4bef-949f-8e1ea3496ad3',
      userName: 'Derick',
      avatarUrl:
        'https://remix-bucket.s3.us-east-2.amazonaws.com/blog-prototype-images/DerickFace.jpg',
      email: 'iderick@gmail.com'
    }
  }
]
