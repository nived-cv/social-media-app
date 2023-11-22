
import { useRef, useState } from "react"
import { PostData } from "../CommonTypes/TypesList1"
import "../Styles/Post.css"
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

            
            <p className = "fa-solid fa-comments" onClick = { handleClick } /> 
            <div className="post-comments" ref = {commentsRef}>

                {comments ? <RenderComments post = {post}/> : ''}
            </div>
        </div >
    )
}