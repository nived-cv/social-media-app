
import { PostData } from "../CommonTypes/TypesList1"
import "../Styles/Post.css"

type Props = {
    post : PostData
}

const handleClick = (id:Number) =>{
    
    
}

export const Post = ({post}:Props) =>{

    return (
         <div className = "post" key = {String(post.id)} onClick = {() => handleClick(post.user_id) } >
            <h5 className = "post-title">{post.title}</h5>
            <div className = "post-body">{post.body}</div>
        </div>
    )
}