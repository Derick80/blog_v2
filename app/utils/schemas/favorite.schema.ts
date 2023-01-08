import type { Favorite as Fav } from '@prisma/client'
import { SerializeFrom } from '@remix-run/node'

export type Favorites = Partial<Fav>

export type Favorite = SerializeFrom<Favorites>
