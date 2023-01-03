import type { LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { isAuthenticated } from '~/models/auth/auth.server'
import { getPosts, getPostsAndComments } from '~/models/post.server'
export async function loader({ request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  const posts = await getPosts()
  const comments = posts.map((post) => post.comments || [])
  const rootcomments = comments
    .map((comment) =>
      comment.map((c) => (c.parentId === null ? c : null)).filter((c) => c)
    )
    .flat()
  return json({ comments })
}

// export default function BlogIndex() {
//     const data = useLoaderData()
//     console.log(data)
//     return (
//         <div>
//         {data.comments.map((comment) => {
//             return (
//            <>
//            {comment.parentId === null && (
//                <div>
//                 <p>{comment.message}</p>
//                 <p>{comment.createdBy}</p>
//                 <p>{comment.createdAt}</p>
//                 </div>
//             )}

//            </>
//             )
//         })

//         }
//         </div>
//     )
//     }
