
import { useEffect, useRef } from "react"
import { CommentsData, PostData } from "../CommonTypes/TypesList1"
import "../Styles/Post.css"
import { useComments } from "./DataProvider"

type Props = {
    post: PostData
    comments : CommentsData;
}

export const Post = ({ post,comments }: Props) => {

    //const { data: comments} = useComments(post?.id)

    const commentsRef = useRef<HTMLDivElement>(null)
    const handleClick = () => commentsRef.current!.classList.toggle('show')

    return (

        <div className="post" key={String(post.id)} onClick={handleClick} >
            <h5 className="post-title">{post.title}</h5>
            <div className="post-body">{post.body}</div>

            <div className="post-comments" ref={commentsRef}>

                    {comments ? comments.body : "be the first to add comment"}
                
            </div>
        </div >
    )
}