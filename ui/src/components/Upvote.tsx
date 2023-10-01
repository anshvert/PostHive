import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { Post } from '@/interfaces/interfaces';
import { VOTEPOST_MUT } from '@/graphql/mutations';
import { useMutation } from 'urql';
import { useState } from 'react';

interface UpvoteProps {
    post: Post
}

const Upvote: React.FC<UpvoteProps> = ({post}) => {

    const [,vote] = useMutation(VOTEPOST_MUT)
    const [points,setPoints] = useState<number>(post.points)

    const handleVote = async (val : number,postId: number) => {
        const data = {value: val, postId: postId}
        const response = await vote(data)
        if (!response.error) setPoints(points+val)
    }   
    return (
        <div style={{display: "flex", flexDirection: "column",alignItems: "center"}}>
            <ThumbUpIcon onClick={() =>  handleVote(1,post.id)}/>
                {points}
            <ThumbDownAltIcon onClick={() => handleVote(-1,post.id)}/>
        </div>
)
}
export default Upvote
