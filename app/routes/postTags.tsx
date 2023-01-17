import { json, LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import getAllCategories from '~/utils/server/categories.server'

export type Categories = { label: string; value: string }[]
export async function loader({ request }: LoaderArgs) {
  const categories = await getAllCategories()

  return json({ categories })
}

export default function Page() {
  const data = useLoaderData<typeof loader>()
  const { categories } = data

  return (
    <>
      <h1>These are the current Categories for Blog Posts</h1>
      {data.categories
        ? data.categories.map((category) => (
            <div key={category.value}>
              <h2>{category.label}</h2>
            </div>
          ))
        : null}
    </>
  )
}
