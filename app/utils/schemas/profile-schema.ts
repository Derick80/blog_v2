import type { Profile as PrismaProfile } from '@prisma/client'
import type { SerializeFrom } from '@remix-run/node'

export type Profile = SerializeFrom<PrismaProfile>
