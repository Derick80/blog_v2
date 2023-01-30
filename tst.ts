export default function brr() {}

// const cbpid = [
//   {
//     id: '8e83ba73-0aba-443c-9356-6fa05653a681',
//     message: 'reoly to first post',
//     createdAt: '2023-01-26T01:15:24.030Z',
//     updatedAt: '2023-01-26T01:15:24.030Z',
//     createdBy: 'Derick',
//     userId: '8f39ec0c-09ba-429e-b883-5a523b989e59',
//     postId: 'fe858dda-7f10-4991-bb0e-a5cd2b381ce9',
//     parentId: '4daa1008-d15d-4f57-8654-0151d8cbc8e1'
//   },
//   {
//     id: '6b75fb51-854f-4d5e-9592-716ac33ddd55',
//     message: 'reoly to first post',
//     createdAt: '2023-01-26T01:16:54.146Z',
//     updatedAt: '2023-01-26T01:16:54.146Z',
//     createdBy: 'Derick',
//     userId: '8f39ec0c-09ba-429e-b883-5a523b989e59',
//     postId: 'fe858dda-7f10-4991-bb0e-a5cd2b381ce9',
//     parentId: '4daa1008-d15d-4f57-8654-0151d8cbc8e1'
//   },
//   {
//     id: '1ac20fca-0b59-4a32-8ab8-4abaaa4378dc',
//     message: 'two',
//     createdAt: '2023-01-26T01:19:59.654Z',
//     updatedAt: '2023-01-26T01:19:59.654Z',
//     createdBy: 'Derick',
//     userId: '8f39ec0c-09ba-429e-b883-5a523b989e59',
//     postId: 'cd2abef1-abcb-42aa-8e8a-a005c24b38cb',
//     parentId: '1f14b77e-ffb7-4b31-8cbf-1f1f73e8b658'
//   },
//   {
//     id: '7071a5f6-a9db-4163-bf89-a4bb801df199',
//     message: 'one.2',
//     createdAt: '2023-01-26T01:20:30.213Z',
//     updatedAt: '2023-01-26T01:20:30.213Z',
//     createdBy: 'Derick',
//     userId: '8f39ec0c-09ba-429e-b883-5a523b989e59',
//     postId: 'cd2abef1-abcb-42aa-8e8a-a005c24b38cb',
//     parentId: '1f14b77e-ffb7-4b31-8cbf-1f1f73e8b658'
//   }
// ]

// const regroup = cbpid.reduce((group: any, values) => {
//   const index = group.findIndex((obj: any) => obj.parentId === values.parentId)
//   if (index !== -1) {
//     group[index].value += values.id

//     group[index].id = values.id
//   } else {
//     group.push({
//       id: values.id,
//       parentId: values.parentId,
//       message: values.message
//     })
//   }

//   return group
// }, [])

// console.log(regroup.length)
// console.log(regroup)

const test = ['Prisma,React']

const test2 = test.map((item) => {
  return item.split(',')
})

console.log(test2)
