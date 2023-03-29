import { Prisma } from '@prisma/client'
import { prisma } from './prisma.server'

export async function getProfiles() {
  const profiles = await prisma.profile.findMany()
  return profiles
}
export async function getUserProfile(id: string) {
  const profile = await prisma.profile.findUnique({
    where: {
      id
    }
  })
  return profile
}

export async function editUserProfile({
  input
}: {
  input: {
    id: string
    userName: string
    email: string
    firstName: string
    lastName: string
    bio: string
    profilePicture: string
    location: string
    occupation: string
    education: string
  }
}) {
  const profile = await prisma.profile.update({
    where: {
      id: input.id
    },
    data: {
      userName: input.userName,
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      bio: input.bio,
      profilePicture: input.profilePicture,
      location: input.location,
      occupation: input.occupation,
      education: input.education,
      user: {
        update: {
          userName: input.userName,
          email: input.email,
          avatarUrl: input.profilePicture
        }
      }
    }
  })

  return profile
}
