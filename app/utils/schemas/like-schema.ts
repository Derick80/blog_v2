import type { Like as PrismaLike } from '@prisma/client'
import type { SerializeFrom } from '@remix-run/node'

export type Like = SerializeFrom<PrismaLike>
