import { prisma } from './prisma.server'


export type Profile = {
    id: string
    userName: string
    firstName: string
    lastName: string
    bio: string
    location: string
    education: string
    occupation: string
    profilePicture: string
    userId: string
    email: string
}
export async function getProfiles(){
    const profiles = await prisma.profile.findMany()
    return profiles
}
export async function getUserProfile(userId:string){
    const profile = await prisma.profile.findUnique({
        where: {
        userId
        }
    })
    return profile
}