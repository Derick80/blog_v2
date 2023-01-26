import Comment from './comment'

export function CommentList({comments}){

    return comments.map((comment)=> (
        <div className="flex flex-col space-y-2" key={comment.id}>
            <Comment  {...comment}/>
        </div>
    ))
}