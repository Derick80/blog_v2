import { json, LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import getAllCategories from '~/models/categories.server'

type LoaderData = {
  categories: { label: string; value: string }[]
}
export async function loader({ request }: LoaderArgs) {
  const categories = await getAllCategories()

  const data: LoaderData = {
    categories
  }

  return json({ data })
}

export default function Page() {
  const data = useLoaderData<typeof loader>()
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
