import { Cross2Icon } from '@radix-ui/react-icons'
import type { ActionArgs, LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import getAllCategories, {
  createCategory
} from '~/utils/server/categories.server'
export const meta: MetaFunction = () => {
  return {
    title: `Derick's Personal Blog | Blog Categories`,
    description: `Take a look at all the categories for this blog`
  }
}
export async function loader({ request }: LoaderArgs) {
  const categories = await getAllCategories()

  return json({ categories })
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  const categoryName = formData.get('categoryName')

  if (typeof categoryName !== 'string') {
    return json({
      errorMsg: 'categoryName is not a string'
    })
  }

  await createCategory(categoryName)

  return json({
    success: true
  })
}

export default function CategoryIndex() {
  const data = useLoaderData<typeof loader>()

  return (
    <>
      <div className='flex w-full flex-col items-center gap-4 p-2'>
        <h3 className=''>Existing Categories</h3>
        <div className='flex flex-row flex-wrap justify-start gap-2'>
          {data.categories.map((category: { id: string; value: string }) => (
            <div
              key={category.id}
              className='flex flex-col justify-start gap-4 rounded-sm outline'
            >
              <div className='flex items-center'>
                <div className='m-0.5 flex-grow text-sm'>{category.value}</div>
                <Form
                  method='post'
                  action={`/blog/categories/${category.id}/delete`}
                  className='inline-flex items-center border-l-2'
                >
                  <button type='submit' className=' '>
                    <Cross2Icon />
                  </button>
                </Form>
              </div>
            </div>
          ))}
        </div>
        <h3 className=''> New Category</h3>
        <form method='post'>
          <div className='flex flex-col'>
            <label htmlFor='categoryName'>Category Name</label>
            <input
              type='text'
              className='rounded-md border text-sm text-slate12'
              name='categoryName'
              id='categoryName'
            />

            <button className='' type='submit'>
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
