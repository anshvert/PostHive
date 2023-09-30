import {NavBar} from "@/components/navbar";
import {getPosts_QUERY} from "@/graphql/query"
import {useQuery} from "urql";
import React from "react";
import {Post} from "@/interfaces/interfaces";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import Wrapper from "@/components/Wrapper";

const Home: React.FC = () =>  {
    const [result, reExecuteQuery] = useQuery({query: getPosts_QUERY, variables: {limit: 10}});
    const { data, fetching, error } = result;
    return (
        <>
            <NavBar />
            <Wrapper>
                <>  
                    {fetching && <p>Loading...</p>}
                    {error &&  <p>Oh no... {error.message}</p>}
                    {!error && !fetching && (
                        <>  
                            <Box sx={{display: "flex"}}>
                                <Link href="/create-post" underline="none" sx={{marginLeft: "auto"}}>
                                    {"Create Post"}
                                </Link>
                            </Box>
                            <Stack spacing={5} mb={5}>
                                {data.posts.map((post: Post) => (
                                    <Box key={post.id} sx={{boxShadow: 3, padding: 4}}>
                                        <Typography mt={1} mb={2} sx={{fontWeight:"bold", fontSize: 19}}>{post.title}</Typography> 
                                            Added by {post.creator.username}
                                        <Typography>{post.textSnippet}</Typography>
                                    </Box>
                                ))}
                            </Stack>
                            <Box sx={{display: "flex", marginBottom: 5}}>
                                <Button sx={{margin:"auto", border: 1, borderColor: "green"}}>Load More</Button>
                            </Box>  
                        </>
                    )}
                </>
            </Wrapper>
        </>
    );
}
export default Home
