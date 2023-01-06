import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import React from 'react'
import type { SelectOption } from '~/components/shared/selection'
import { Select } from '~/components/shared/selection'
import getAllCategories from '~/models/categories.server'
import { getPosts } from '~/models/post.server'

export async function loader({ request }: LoaderArgs) {
  const results = await getPosts()
  const categories = await getAllCategories()
  const result = results.posts[0]
  const cats = result.categories.map((item) => item)

  return json({ categories, result, cats })
}

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData()
  const categories = formData.getAll('categories')

  return redirect('/blog')
}
export default function BlogIndex() {
  const data = useLoaderData<typeof loader>()

  const [selected, setSelected] = React.useState<SelectOption[]>(
    data.cats.map((item) => ({ label: item.value, value: item.id }))
  )

  return (
    <div className='mx-auto flex w-fit flex-col gap-5'>
      <div></div>
      <form>
        <input type='hidden' name='categories' value={selected.value} />

        <Select
          multiple
          value={selected}
          options={data.categories}
          onChange={(o) => setSelected(o)}
        />

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

// `absolute m-0 p-0 list-style-none max-h-15 overflow-y-auto border-2 border-black rounded-lg w-full left-0 bg-white z-index-50 ${isOptionSelected(option) ?
//   'bg-blue-300' : ''}`
