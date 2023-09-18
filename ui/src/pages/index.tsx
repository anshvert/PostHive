import {NavBar} from "@/components/navbar";
import {POST_QUERY} from "@/graphql/query"
import {useQuery} from "urql";
import React from "react";
import {Post} from "@/interfaces/interfaces";

const Home: React.FC = () =>  {
    const [result, reExecuteQuery] = useQuery({
        query: POST_QUERY,
    });
    const { data, fetching, error } = result;
    return (
        <>
            <NavBar />
            {fetching && <p>Loading...</p>}
            {error &&  <p>Oh no... {error.message}</p>}
            {!error && !fetching &&
                <ul>
                    {data.posts.map((post: Post) => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            }
        </>
    );
}
export default Home
