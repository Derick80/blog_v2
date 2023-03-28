import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  await prisma.curriculumVitae.deleteMany()
  const cv = await prisma.curriculumVitae.create({

    data: {
      title: 'Derick Hoskinson PHD',
      email: 'derickchoskinson@gmail.com',
      phone: '312-871-8067',
      location: 'Chicago, IL',
      blurb:
        'I am a clinical scientist with a passion for data science and genetics. I have a PhD in Genetics from Tufts University School of Biomedical Sciences. I have experience in the fields of inherited genetics, cancer genetics, and clinical research. I am currently working as a Senior Clinical Scientist at Tempus Labs. I am looking for a position where I can apply my skills to solve real-world problems.',
      userId: '6d11174e-9d65-4bef-949f-8e1ea3496ad3'
    }
  })


    await prisma.education.createMany({
      data: [
        {
          institution: 'Tufts University School of Biomedical Sciences',
          degree: 'PhD',
          location: 'Boston, MA',
          startDate: '2006-09-01',
          endDate: '2014-05-01',
          cvId: cv.id
        },
        {
          institution: 'University of Massachusetts Boston',
          degree: 'bachelors of science',
          location: 'Boston, MA',
          startDate: '2001-09-01',
          endDate: '2006-06-01',
          cvId: cv.id
        }
      ]
    })

  await prisma.cVExperience.createMany({
    data: [
      {
        title: 'Clinical Scientist',
        company: 'Tempus Labs',
        location: 'Chicago, IL',
        responsibilities: [
          'Evaluated data and analyzed variants for a project that lead to the publication of the results in Nature Biotechnology',
          'Trained over 20 M.A.s, Ph.D.’s and post-baccalaureate in germline and somatic variant classification',
          'Worked closely with colleagues to build a team of variant scientists from 2 individuals to over 20 highly skilled variant scientists',
          'Gained proficiency in the R programming language and experience using Python, JavaScript, HTML, and CSS'
        ],
        startDate: '2017-06-07',
        endDate: '2019-03-01',
        cvId: cv.id
      },
      {
        title: 'Clinical Scientist',
        company: 'Tempus Labs',
        location: 'Chicago, IL',
        responsibilities: [
          'Acted as the scientific lead in the development of the Tempus xF liquid biopsy panel to sequence and report SNVs and indels in clinically relevant regions of 105 genes plus CNVs and DNA rearrangements in a subset of these genes',
          'Used R programming language to programmatically access data, wrangle data, analyze data and present data to implement changes in workflow or other internal processes'
        ],
        startDate: '2017-06-07',
        endDate: '2019-03-01',
        cvId: cv.id
      },
      {
        title: 'Clinical Knowledge Curation Coordinator',
        company: 'Laboratory for Molecular Medicine and Genetics',
        location: 'Boston, MA',
        responsibilities: [
          'Trained over 25 M.Ds, M.D. Ph.D.’s, rotating fellows, undergraduates, and post-baccalaureate in constitutional variant classification',
          'Assessed pathogenicity of variants from large gene panels covering cardiomyopathy, hearing loss, pulmonary disease, and Noonan syndrome',
          'Evaluated data and assessed variants as a critical member of the Geisinger MyCode project including the 56 genes recommended by the ACMG and 20 additional genes from Geisinger',
          'Extensive experience with population databases (1000 genomes, ESP, ExAC, gnomAD)',
          'Proficient in use of variant databases including, HGMD, ClinVar, LOVD, Deafness Variation database, Cardiodb, MitoMap, Leiden Muscular Dystrophy database, ARUP, and COSMIC'
        ],
        startDate: '2015-06-01',
        endDate: '2017-06-01',
        cvId: cv.id
      }
    ]
  })

 await prisma.skill.createMany({
    data: [
      {
        name: 'Genetics',
        category: 'Clinical',
        cvId: cv.id
      },
      {
        name: 'Clinical Research',
        category: 'Clinical',
        cvId: cv.id
      },
      {
        name: 'Variant Classification',
        category: 'Clinical',
        cvId: cv.id
      },
      {
        name: 'HTML',
        category: 'Coding',
        level: 'Intermediate',
        cvId: cv.id
      },
      {
        name: 'CSS',
        category: 'Coding',
        level: 'Intermediate',
        cvId: cv.id
      },
      {
        name: 'JavaScript',
        category: 'Coding',
        level: 'Intermediate',
        cvId: cv.id
      },
      {
        name: 'Python',
        category: 'Coding',
        level: 'Intermediate',
        cvId: cv.id
      },
      {
        name: 'qPCR',
        category: 'Laboratory',
        cvId: cv.id
      },
      {
        name: 'PCR',
        category: 'Laboratory',
        cvId: cv.id
      },
      {
        name: 'Western Blotting',
        category: 'Laboratory',
        cvId: cv.id
      },
      { name: 'Northern Blotting', category: 'Laboratory', cvId: cv.id },
      {
        name: `3' end R.A.C.E.`,
        category: 'Laboratory',
        cvId: cv.id
      },
      {
        name: 'RNA ImmunoPrecipitation',
        category: 'Laboratory',
        cvId: cv.id
      },
      {
        name: "BioChemical analysis of  3' end mRNA formation",
        category: 'Laboratory',
        cvId: cv.id
      },
      {
        name: ' RNA Isolation',
        category: 'Laboratory',
        cvId: cv.id
      },
      {
        name: 'DNA Isolation',
        category: 'Laboratory',
        cvId: cv.id
      },
      {
        name: 'Primer Extension assays',
        category: 'Laboratory',
        cvId: cv.id
      },
      {
        name: 'In Vitro transcribed RNAs',
        category: 'Laboratory',
        cvId: cv.id
      },
      {
        name: 'Yeast two hybrid assays',
        category: 'Laboratory',
        cvId: cv.id
      },
      {
        name: 'ELISA',
        category: 'Laboratory',
        cvId: cv.id
      },
      {
        name: 'Mammalian Cell Culture',
        category: 'Laboratory',
        cvId: cv.id
      },
      {
        name: 'Protein Purification',
        category: 'Laboratory',
        cvId: cv.id
      },
      {
        name: 'Protein Expression',
        category: 'Laboratory',
        cvId: cv.id
      },
      {
        name: 'Gene Tagging',
        category: 'Laboratory',
        cvId: cv.id
      },
      {
        name: 'Gene Knockout',
        category: 'Laboratory',
        cvId: cv.id
      }
    ]
  })
  const publications = await prisma.publication.createMany({
    data: [
      {
        title:
          'Tumor Mutational Burden From Tumor-Only Sequencing Compared With Germline Subtraction From Paired Tumor and Normal Specimens',
        year: '2020',
        journal: 'JAMA',
        authors: [
          'Parikh K, Huether R, White K, Hoskinson D, Beaubier N, Dong H, Adjei AA, Mansfield AS'
        ],
        edition: `2020 Feb 5;3(2):e200202. PMID: 32108894; PMCID: PMC7049088.`,
        type: 'published',
        url: `https://doi.org/10.1001/jamanetworkopen.2020.0202`,
        cvId: cv.id
      },

      {
        title:
          'Integrated genomic profiling expands clinical options for patients with cancer ',
        year: '2020',
        journal: 'Nature Biotechnology',
        authors: [
          'Beaubier, N., Bontrager, M., Huether, R., Igartua, C., Lau, D., Tell, R., Bobe, A. M., Bush, S., Chang, A. L., Hoskinson, D. C., Khan, A. A., Kudalkar, E., Leibowitz, B. D., Lozachmeur, A., Michuda, J., Parsons, J., Perera, J. F., Salahudeen, A., Shah, K. P., Taxter, T., … White, K. P. (2019) '
        ],
        edition: `37(11), 1351–1360`,
        type: 'published',
        url: `https://www.nature.com/articles/s41587-019-0259-z`,
        cvId: cv.id
      }
    ]
  })
  console.log(`Database has been seeded. 🌱`)
}

seed()

  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
