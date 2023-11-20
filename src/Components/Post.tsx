
import { useRef, useState } from "react"
import { CommentsData, PostData } from "../CommonTypes/TypesList1"
import "../Styles/Post.css"
import { useComments } from "./Apis"
import { RenderComments } from "./RenderComments"

type Props = {
    post: PostData
}

export const Post = ({ post }: Props) => {

    const commentsRef = useRef<HTMLDivElement>(null)
    const [comments , setComments] = useState <boolean> (false)
    const handleClick = () => setComments(!comments)

    return (

        <div className="post" key={String(post.id)} >
            <h5 className="post-title">{post.title}</h5>
            <div className="post-body">{post.body}</div>

            
            <button onClick = { handleClick }> Comments</button>
            <div className="post-comments" ref = {commentsRef}>

                {comments ? <RenderComments post = {post}/> : ''}
            </div>
        </div >
    )
}