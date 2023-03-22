import type {
  CurriculumVitae,
  CVExperience,
  Education,
  Publication,
  Skill
} from '@prisma/client'

export type CV = CurriculumVitae & {
  skills: Array<Skill>
  cvExperiences: Array<CVExperience>
  education: Array<Education>
  publications: Array<Publication>
}
