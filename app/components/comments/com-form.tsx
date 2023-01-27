import { Box, Button, Group, Textarea } from '@mantine/core'
import { Form } from '@remix-run/react'


export default function FormComments({parentId}:{
    parentId?:string
}){

    return(
        <Box mt='md' mb='md'>
            <Form method="post">
<Textarea
required
name='message'
placeholder='your comment here'
label='Comment'/>

<Group position='right' mt='md'>
    <Button type='submit'>
        {parentId ? 'post reply' : 'post comment'}
    </Button>
</Group>

            </Form>
        </Box>
    )
}