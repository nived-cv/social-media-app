
import { useEffect, useRef } from "react"
import { CommentsData, PostData } from "../CommonTypes/TypesList1"
import "../Styles/Post.css"
import { useComments } from "./DataProvider"

type Props = {
    post: PostData
}

export const Post = ({ post }: Props) => {

    const { data: CommentsData} = useComments(post?.id)
    const commentsRef = useRef<HTMLDivElement>(null)
    const handleClick = () => commentsRef.current!.classList.toggle('show')

    const renderComments = () =>{

        console.log(CommentsData)
        if (CommentsData)
        return CommentsData.map((comment:CommentsData) => <p className = "comment"> { comment.body } </p>)

        return <p className = "comment"> Be the first to comment </p>
    }

    return (

        <div className="post" key={String(post.id)} onClick={handleClick} >
            <h5 className="post-title">{post.title}</h5>
            <div className="post-body">{post.body}</div>

            <div className="post-comments" ref={commentsRef}>

                    { CommentsData && renderComments() }
                
            </div>
        </div >
    )
}