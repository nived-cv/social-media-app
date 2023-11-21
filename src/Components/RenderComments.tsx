
import { useRef } from "react"
import { CommentsData, PostData } from "../CommonTypes/TypesList1"
import { useAddComment, useComments } from "./Apis"

type Props = {
    post : PostData
}

export const RenderComments = ({post} : Props) =>{
        
    const { data: CommentsData,status} = useComments(post.id)
    const mutation = useAddComment()

    const commentObj = useRef <HTMLInputElement> (null)

    const postComment = () =>{
        const value = commentObj.current!.value
        mutation.mutate({id: 0, post_id : post.id , name : "Nived", email: "nived@google.com" ,body : value})
    }

    if (CommentsData){

        if (status === "loading")
        return <div>
                    <p className = "comment"> Loading Comments... </p>
                </div>

        if (status === "success" && CommentsData.length > 0)
        return <div>
                    { CommentsData.map((comment:CommentsData) => <p className = "comment" key = {comment.id}> { comment.body } </p>) }
                    <input type = "text" className = "comment-in" placeholder = "comment..." ref = {commentObj}/>
                    <button onClick = { postComment } > Send </button>
                </div>

        if (status === "error")
        return <div>
                    <p className = "comment"> Error fetching comments !! </p>
                </div>

        return <div>
                    <p className = "comment" > Be the first to comment </p>
                    <input type = "text" placeholder = "comment..." ref = {commentObj}/>
                    <button onClick = { postComment } > Send </button>
                </div>
    }
    return <div></div>
}