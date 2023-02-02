

import {Project as PrismaProject} from '@prisma/client'
import { SerializeFrom } from '@remix-run/node'

export type Project = SerializeFrom<PrismaProject>