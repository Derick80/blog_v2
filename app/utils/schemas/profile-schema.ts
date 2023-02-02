import { Profile as PrismaProfile } from '@prisma/client'
import { SerializeFrom } from '@remix-run/node'

export type Profile = SerializeFrom<PrismaProfile>
