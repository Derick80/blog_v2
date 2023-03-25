import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import {
  Form,
  useActionData,
  useCatch,
  useFetcher,
  useLoaderData,
  useNavigation
} from '@remix-run/react'
import { Listbox } from '@headlessui/react'
import invariant from 'tiny-invariant'
import { isAuthenticated } from '~/utils/server/auth/auth.server'
import { getPostToEdit } from '~/utils/server/post.server'
import {
  deletePost,
  publishPost,
  savePost,
  unPublishPost
} from '~/utils/server/post.server'
import { validateText } from '~/utils/validators.server'
import { MultiSelect, Switch } from '@mantine/core'
import TipTap from '~/components/shared/tip-tap'
import { useState } from 'react'
import getAllCategories from '~/utils/server/categories.server'
import { useOptionalUser } from '~/utils/utilities'
import type { MetaFunction } from '@remix-run/node' // or cloudflare/deno
import { badRequest } from 'remix-utils'
import { ChevronDownIcon } from '@radix-ui/react-icons'

export const meta: MetaFunction = () => {
  return {
    title: "Edit Post | Derick's Blog",
    description:
      "Edit a post on Derick's blog and share your knowledge with the world"
  }
}
export async function loader({ params, request }: LoaderArgs) {
  const user = await isAuthenticated(request)
  if (!user) {
    throw new Response('Not authenticated', {
      status: 401
    })
  }
  const postId = 'c4ee164c-48d6-4bd2-825a-2c7884f5a368'
  const allCategories = await getAllCategories()
  invariant(postId, 'postId is required')
  const post = await getPostToEdit(postId)
  invariant(post, 'post is required')

  return json({ post, allCategories })
}

export async function action({ params, request }: ActionArgs) {
  const user = await isAuthenticated(request)
  invariant(user, 'user is required')
  const formData = await request.formData()
  const action = formData.get('_action')
  const postId = formData.get('postId')
  const userId = formData.get('userId')
  const title = formData.get('title')
  const createdBy = formData.get('createdBy')
  const description = formData.get('description')
  const body = formData.get('body')
  const imageUrl = formData.get('imageUrl')
  const featured = Boolean(formData.get('featured'))
  const categories = formData.get('categories')

  if (
    typeof body !== 'string' ||
    typeof categories !== 'string' ||
    typeof action !== 'string' ||
    typeof postId !== 'string' ||
    typeof userId !== 'string' ||
    typeof title !== 'string' ||
    typeof createdBy !== 'string' ||
    typeof description !== 'string' ||
    typeof imageUrl !== 'string'
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: 'Invalid form data'
    })
  }

  const fieldErrors = {
    title: validateText(title),
    description: validateText(description),
    body: validateText(body),
    imageUrl: validateText(imageUrl),
    action: validateText(action),
    createdBy: validateText(createdBy)
  }
  const fields = {
    title,
    description,
    body,
    imageUrl,
    createdBy,
    categories,
    action,
    featured
  }
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null
    })
  }
  const cats = categories?.split(',')
  const category = cats.map((cat) => {
    return {
      value: cat
    }
  })

  switch (action) {
    case 'save':
      await savePost({
        postId,
        title,
        description,
        body,
        imageUrl,
        createdBy,
        userId,
        category,
        featured
      })
      return redirect(`/blog/`)

    case 'publish':
      await publishPost(postId)
      return redirect(`/blog`)
    case 'unpublish':
      await unPublishPost(postId)
      return redirect(`/blog/${postId}`)
    case 'delete':
      await deletePost(postId)
      return redirect(`/blog`)
  }
}

export default function EditPost() {
  const data = useLoaderData<typeof loader>()

  const actionData = useActionData<typeof action>()
  const user = useOptionalUser()
  const saveNav = useNavigation()
  const pubNav = useNavigation()
  const unPubNav = useNavigation()
  const deleteNav = useNavigation()

  const text =
    saveNav.state === 'submitting'
      ? 'Saving...'
      : saveNav.state === 'loading'
      ? 'Saved!'
      : 'Save'

  const publishText =
    pubNav.state === 'submitting'
      ? 'Publishing...'
      : pubNav.state === 'loading'
      ? 'Published!'
      : 'Publish'

  const unpublishText =
    unPubNav.state === 'submitting'
      ? 'Unpublishing...'
      : unPubNav.state === 'loading'
      ? 'Unpublished!'
      : 'Unpublish'

  const deleteText =
    deleteNav.state === 'submitting'
      ? 'Deleting...'
      : deleteNav.state === 'loading'
      ? 'Deleted!'
      : 'Delete'

  const imageFetcher = useFetcher()
  const onClick = async () =>
    imageFetcher.submit({
      imageUrl: 'imageUrl',
      key: 'imageUrl',
      action: '/actions/cloudinary'
    })
  const {
    title,
    description,
    body,
    imageUrl,
    categories,
    id,
    published,
    userId,
    featured
  } = data.post
const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(categories)
  console.log(selected, 'selected')

  const [options, setOptions] = useState(data.allCategories)
  // console.log(options, 'options');

  const pickedCategories = categories.map((item) => item.value)

  const mainCategories = data.allCategories.map((item) => {
    return item.value
  })

  const [selectedPersons, setSelectedPersons] = useState([categories])

  function isSelected (value) {
    return selectedPersons.find((el) => el === value) ? true : false
  }

  function handleSelect (value: { id: string; label: string; value: string }) {
    if (!isSelected(value)) {
      const selectedPersonsUpdated = [
        ...selectedPersons,
        categories.find((el) => el === value)
      ]
      setSelectedPersons(selectedPersonsUpdated)
    } else {
      handleDeselect(value)
    }
    setIsOpen(true)
  }

  function handleDeselect (value) {
    const selectedPersonsUpdated = selectedPersons.filter((el) => el !== value)
    setSelectedPersons(selectedPersonsUpdated)
    setIsOpen(true)
  }

  const [formData, setFormData] = useState({
    title,
    description,
    body,
    imageUrl,
    categories: pickedCategories,
    id,
    published,
    featured
  })

  return (
    <div className='mx-auto mb-7 mt-5 flex w-full flex-col items-center border-2 bg-white p-2 text-slate12 dark:bg-crimson1 dark:text-slate1 '>
      <div className='flex w-full flex-col items-center justify-center'>
        <Form
          method='post'
          action={`/blog/${id}/edit`}
          id='editPost'
          className='flex flex-col gap-5 rounded-xl bg-white text-slate12  dark:bg-crimson1 dark:text-slate-50'
        >
          <input type='hidden' name='createdBy' value={user?.userName} />
          <input type='hidden' name='postId' value={id} />
          <input type='hidden' name='userId' value={userId} />

          <label htmlFor='title'>Title</label>
          <input
            type='text'
            className='rounded-md border text-sm text-slate12'
            name='title'
            id='title'
            defaultValue={actionData ? actionData.title : formData.title}
          />
          {actionData?.fieldErrors?.title && (
            <p className='text-base text-red-500'>
              {actionData.fieldErrors.title}
            </p>
          )}
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            className='rounded-md border text-sm text-slate12'
            name='description'
            id='description'
            defaultValue={
              actionData ? actionData.description : formData.description
            }
          />
          {actionData?.fieldErrors?.description && (
            <p className='text-base text-red-500'>
              {actionData.fieldErrors.description}
            </p>
          )}
          <label htmlFor='body'>Post Content</label>
          {body && <TipTap content={body} />}
          <input type='hidden' name='body' defaultValue={body} />

          <div className='flex flex-col gap-2 text-slate12 dark:text-slate-50'>
            <label
              className='text-slate12 dark:text-slate-50'
              htmlFor='categories'
            >
              Categories
            </label>

            <Listbox
            as="div"
              name='categories'
              value={selectedPersons}
              by={"id"}
              onChange={
                (value) => {
                  setSelectedPersons(value)
                  setFormData({ ...formData, categories: value })
                }

              }

              multiple
            >
           {() => (
            <>
              <Listbox.Label className="block text-sm leading-5 font-medium text-gray-700">
                Assigned to
              </Listbox.Label>
              <div className="relative">
                <span className="inline-block w-full rounded-md shadow-sm">
                  <Listbox.Button
                    className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span className="block truncate">
                      {selectedPersons.length < 1
                        ? "Select persons"
                        : `Selected persons (${selectedPersons.length})`}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Listbox.Button>
                </span>


                  <Listbox.Options
                    static
                    className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                  >
                    {data.allCategories.map((person) => {
                      const selected = isSelected(person);
                      return (
                        <Listbox.Option key={person.id} value={person.value}>
                          {({ active }) => (
                            <div
                              className={`${
                                active
                                  ? "text-white bg-blue-600"
                                  : "text-gray-900"
                              } cursor-default select-none relative py-2 pl-8 pr-4`}
                            >
                              <span
                                className={`${
                                  selected ? "font-semibold" : "font-normal"
                                } block truncate`}
                              >
                                {person.label}
                              </span>
                              {selected && (
                                <span
                                  className={`${
                                    active ? "text-white" : "text-blue-600"
                                  } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                >
                                  <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </span>
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      );
                    })}
                  </Listbox.Options>
                <div className="pt-1 text-sm">
                  {selectedPersons.length > 0 && (
                    <>Selected persons: {selectedPersons.join(", ")}</>
                  )}
                </div>
              </div>
            </>
          )}
            </Listbox>
            <pre className='text-xs text-slate12 dark:text-slate-50'>
              {JSON.stringify(selected, null, 2)}
            </pre>
            {/* <MultiSelect
              name='categories'
              id='categories'
              data={ mainCategories }
              defaultValue={ selected }
            /> */}
          </div>
          <div className='mt-5 mb-5 flex flex-row items-center justify-end gap-2 text-slate12 dark:text-slate-50'>
            <label htmlFor='featured'>Featured</label>
            <Switch
              name='featured'
              onChange={(e) => console.log(e.target.value)}
              defaultChecked={false}
            />
          </div>
          <input
            type='hidden'
            name='imageUrl'
            id='imageUrl'
            value={imageFetcher.data?.imageUrl || imageUrl}
          />
        </Form>

        <div className='flex flex-row flex-wrap gap-2'>
          <imageFetcher.Form
            method='post'
            encType='multipart/form-data'
            action='/actions/cloudinary'
            className='mx-auto flex flex-col items-center gap-2'
            onClick={onClick}
          >
            <label htmlFor='imageUrl' className='subtitle'>
              Attach an Image
            </label>
            <input
              type='file'
              name='imageUrl'
              id='imageUrl'
              className='block w-full rounded-xl border-2 p-2 text-sm text-slate12 dark:text-slate-50'
              accept='image/*'
            />
            <button className='btn-primary'>Upload</button>
          </imageFetcher.Form>
          {imageFetcher.data ? (
            <div className='flex w-full flex-col items-center gap-2'>
              <p className='h6'>Image Uploaded</p>
              <input
                type='hidden'
                name='imageUrl'
                value={imageFetcher?.data?.imageUrl}
              />
              <div className='flex'>
                <div className=' rounded-xl  text-slate12'>
                  <img
                    src={imageFetcher?.data?.imageUrl}
                    alt={'#'}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className='items-center rounded-xl  text-slate12'>
                  <img
                    src={formData.imageUrl}
                    style={{ objectFit: 'cover' }}
                    alt={'placeholder'}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className='w-full rounded-xl  text-slate12'>
              <img src={formData.imageUrl} alt={'#'} />
            </div>
          )}
        </div>
        <div className='flex flex-row items-center justify-end gap-2 text-slate12 dark:text-slate-50'>
          <button
            type='submit'
            name='_action'
            value='save'
            form='editPost'
            className='btn-primary'
          >
            {text}
          </button>
          {published ? (
            <button
              type='submit'
              form='editPost'
              name='_action'
              value='unpublish'
              className='btn-primary-warning'
            >
              {unpublishText}
            </button>
          ) : (
            <button
              type='submit'
              form='editPost'
              name='_action'
              value='publish'
              className='btn-secondary'
            >
              {publishText}
            </button>
          )}
          <button
            type='submit'
            form='editPost'
            name='_action'
            value='delete'
            className='btn-primary-danger'
          >
            {deleteText}
          </button>
        </div>
      </div>
    </div>
  )
}
export function CatchBoundary() {
  const caught = useCatch()

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  )
}
