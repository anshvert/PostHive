import {NavBar} from "@/components/navbar";
import {getPosts_QUERY} from "@/graphql/query"
import {useQuery} from "urql";
import React from "react";
import {Post} from "@/interfaces/interfaces";
import { Link } from "@mui/material";
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
                            <Link href="/create-post" underline="none">
                                {"Create Post"}
                            </Link>
                            <ul>
                                {data.posts.map((post: Post) => (
                                    <li key={post.id}>{post.title}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </>
            </Wrapper>
        </>
    );
}
export default Home
