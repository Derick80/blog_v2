import { useState } from 'react'


export default function CommentForm(){

    const [formData, setFormData] = useState({
        message: ''
    })

    return (
        <form className='flex flex-col space-y-2'>
        <label htmlFor='message'>Message</label>
        <textarea
          id='message'
          className='border border-gray-300 bg-slate-200 dark:bg-zinc-600 rounded-md text-zinc-900 dark:text-slate-200'
          name='message'
          rows={3}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />
        <button type='submit'>Submit</button>
      </form>
    )
}