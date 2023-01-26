import { useState } from "react"

type CommentFormProps = {
    message?: string
    autoFocus?: boolean
    initialValue?: string
}
export function CommentForm({
  message,
  autoFocus = false,
  initialValue = "",
}: CommentFormProps) {


  return (
    <form >
      <div className="comment-form-row">
        <textarea
          autoFocus={autoFocus}
          value={message}

          className="message-input"
        />
        <button className="btn" type="submit" >

        </button>
      </div>
    </form>
  )
}