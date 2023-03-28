import type { Favorite as PrismaFavorites } from '@prisma/client'
import type { SerializeFrom } from '@remix-run/node'

export type Favorite = SerializeFrom<PrismaFavorites>
