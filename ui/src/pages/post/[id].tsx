import { NavBar } from "@/components/navbar";
import { getPost_QUERY } from "@/graphql/query";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React  from "react";
import { useQuery } from "urql";
import Wrapper from "@/components/Wrapper";

const Post = ({}) => {
    const router = useRouter()
    const [result, reExecuteQuery] = useQuery({query: getPost_QUERY, variables: {postId: typeof router.query.id === "string" ? parseInt(router.query.id) : -1}});
    const { data, fetching, error } = result;

    return (
        <>   
            <NavBar />
            {fetching ? (
                <>
                    <Box>
                        Loading Post ... Please be Patient
                    </Box> 
                </>
                ) : (
                <>
                    <Wrapper>
                        <>
                            <h1>{data.post.title}</h1>
                            {data.post.text}
                        </>
                    </Wrapper>
                </>
            )}
        </>
    )

}
export default Post