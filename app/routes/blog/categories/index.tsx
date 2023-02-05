import { TextInput, Button, Title } from '@mantine/core'
import { ActionArgs, LoaderArgs, redirect } from '@remix-run/node';
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import CategoryContainer from '~/components/shared/category-container'
import { Modal } from '~/components/shared/modal'
import getAllCategories, { createCategory } from '~/utils/server/categories.server'

export async function loader({request}:LoaderArgs){

    const categories = await getAllCategories()

    return json({categories})
}

export async function action({request}:ActionArgs){


    const formData =await  request.formData()
    const categoryName = formData.get('categoryName')


    if(typeof categoryName !== 'string') {
        return json({
          errorMsg: 'categoryName is not a string'
        })
      }

      await createCategory(categoryName)

      return redirect('/blog/categories')

}


export default function CategoryIndex(){
    const data = useLoaderData<typeof loader>()

    return(
        <Modal
        isOpen={true}
        ariaLabel='Edit Income'
        className='h-3/4 w-full md:w-1/2 lg:w-2/3'
      >
        <div
        className='flex flex-col gap-4 items-center'
        >

            <Title
            >
                Existing Categories
            </Title>
                <div>
                {data.categories.map((category: {
                    id: string;
                    value: string;
                }) => (
                    <CategoryContainer
                        key={category.id}
                        value={category.value}
                        index={category.id}
                    />
                )
                )}
                </div>
            <Title
            >New Category</Title>
            <form method="post">
            <div className='flex flex-col'>
                    <TextInput
                    name='categoryName'
                    label='Category Name'
                    />
                <Button type="submit">Create</Button>
            </div>
            </form>
        </div>
        </Modal>
    )
}