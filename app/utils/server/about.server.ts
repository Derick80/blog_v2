import { prisma } from './prisma.server'

export async function getAbout() {
  const about = await prisma.about.findMany()
  return about
}

export async function getAboutById(id: string) {
  const about = await prisma.about.findUnique({
    where: {
      id
    }
  })
  return about
}

export async function editAbout(input: any) {
  const about = await prisma.about.update({
    where: {
      id: input.id
    },
    data: {
      userName: input.userName,
      firstName: input.firstName,
      lastName: input.lastName,
      bio: input.bio,
      location: input.location,
      education: input.education,
      occupation: input.occupation,
      profilePicture: input.profilePicture,
      email: input.email
    }
  })
  return about
}
