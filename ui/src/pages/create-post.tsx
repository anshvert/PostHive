import Wrapper from "@/components/Wrapper"
import { Box, TextField, Button } from "@mui/material"
import React, { useState } from "react"
import NextLink from "next/link"
import { CREATEPOST_MUT } from "@/graphql/mutations"
import { NextRouter, useRouter } from "next/router"
import { useMutation } from "urql"

export interface PostInput {
    title: string,
    text: string
}


const CreatePost: React.FC<{}> = ({}) => {
    const [,createPost] = useMutation(CREATEPOST_MUT)
    const router: NextRouter = useRouter()
    const [title,setTitle] = useState<string>("")
    const [text,setText] = useState<string>("")

     async function handleSubmit(event: any): Promise<undefined> {
        event.preventDefault();
        const input: PostInput = {"title": title,"text" : text}
        const response = await createPost(input);
        if (response.data?.createPost.errors?.length) {
            alert(`${response.data?.login.errors[0].message}`)
        } else if (!response.data) {
            alert(`Something went Wrong !!`)
        } else {
            await router.push("/")
        }
        return
    }

    return (
        <Box sx={{
            width: 600,
            height: 300,
            backgroundColor: 'white',
            m: 'auto',
            position: "absolute",
            top: '20%',
            left: '30%',
            opacity: [0.9, 0.8, 0.7],
            '&:hover': {
                backgroundColor: 'white',
                opacity: [1, 1, 1],
                borderBottom: 1,
                borderColor: "grey.500"
            }}}>
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Title"
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label = "Body"
                    placeholder ="Say out what u feelin ...."
                    onChange={e => setText(e.target.value)}
                    value={text}
                    required
                    fullWidth
                    multiline
                    sx={{mb: 2}}
                />
                <Button variant="outlined" color="secondary" type="submit">Create Post</Button>
            </form>
        </Box>
    )
}

export default CreatePost