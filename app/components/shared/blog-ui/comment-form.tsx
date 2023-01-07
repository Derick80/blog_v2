import { useState } from 'react'

export default function CommentForm() {
  const [formData, setFormData] = useState({
    message: '',
    userId: '',
    postId: '',
    createdBy: ''
  })

  return (
    <>
      <div className='container mx-auto '>
        <form
          className='text-black border-bg-crimson6 flex w-full flex-col items-center justify-center rounded-lg'
          method='post'
          action='/blog/comment/new'
        >
          <input type='hidden' name='_action' value='create' />
          <input type='hidden' name='userId' value={formData.userId} />
          <input type='hidden' name='postId' value={formData.postId} />
          <input type='hidden' name='createdBy' value={formData.createdBy} />
          <textarea
            rows={1}
            cols={50}
            id='message'
            name='message'
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
          <button
            className='text-white rounded-lg bg-crimson6 p-2'
            type='submit'
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}
