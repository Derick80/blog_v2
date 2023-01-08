import {
  AvatarIcon,
  ChatBubbleIcon,
  ChevronDownIcon,
  PersonIcon
} from '@radix-ui/react-icons'
import { json } from '@remix-run/node'
import { format } from 'date-fns'
import React from 'react'
import {
  Comment as CommentType,
  CommentWithChildren
} from '~/utils/schemas/comment-schema'
import CommentForm from './comment-form'
import { Avatar, Box, Button, Group, Paper, Text } from '@mantine/core'
import { useFetcher } from '@remix-run/react'
import { useMatchesData } from '~/utils/utils'


function CommentActions({ commentId, userId, postId, createdBy, replyCount }: { commentId: string, userId: string, postId: string, createdBy: string , replyCount: number}) {
  const [replying, setReplying] = React.useState(false)

  const fetcher = useFetcher()

  const matches= useMatchesData('/blog')
console.log(matches, 'matches');

const comments = matches?.post?.comments.find((comment) => comment.parentId === commentId)

console.log(comments, 'comments');



  return (
    <Group position="apart" mt="md">
<Text >{replyCount}</Text>
      <Button type='button' onClick={() => setReplying(!replying)}>
        <p className='text-xs'>Reply</p>
        <PersonIcon />
        </Button>



      {replying ? <CommentForm parentId={commentId}  userId={userId}
      postId={postId} createdBy={createdBy}
      /> : <></>}




    </Group>
  )
}



function Comment({ comment }: { comment: CommentWithChildren }) {
  const users = comment.user
  console.log(users, 'users')

  return (
    <>
         <Paper withBorder radius="md" mb="md" p="md">

         <Box
        sx={() => ({
          display: "flex",
        })}
      >
        <Avatar />

        <Box
          pl="md"
          sx={() => ({
            display: "flex",
            flexDirection: "column",
          })}
        >
          <Group>
            <Text>{comment.user.userName}</Text>
            <Text>{comment.createdAt.toString()}</Text>
          </Group>

          {comment.message}
        </Box>
      </Box>

      <CommentActions
        commentId={comment.id || ''}
        replyCount={comment.children.length}
        userId={comment.user.id}
        postId={comment.postId}
        createdBy={comment.createdBy}

      />

      {comment.children && comment.children.length >0  && (

          <ListComments key={comment.parentId} comments={comment.children} />
        )


      }
    </Paper>

    </>
  )
}
function ListComments({ comments }: { comments: Array<CommentWithChildren> }) {
  return (
    <Box>
      {comments.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </Box>
  );
}

export default ListComments;
