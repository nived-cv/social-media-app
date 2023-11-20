
import { useRef } from "react"
import { CommentsData, PostData } from "../CommonTypes/TypesList1"
import { useComments, usePosts } from "./DataProvider"
import { Post } from "./Post"

export const Home = () =>{

    const {data,status} = usePosts()
    const {data : comments, status : cstatus} = useComments()

    const getComment = (id : Number) =>{

        const res = comments.find((comment : CommentsData) => comment.post_id === id)
        return res
    }

    const renderPosts = (data : PostData[]) =>{

        return data?.map((post:PostData) => {
            
            const comments = getComment(post.id)
            return <Post post = {post} comments = {comments} key = {String(post.id)}/>
    })}

    const createPost = () =>{

        // 681df0d2e2bf3d0b32bcdadc32c20111382302737816d60d7aef8c1816eb0918

    }

    const createForm = () =>{

        // const titleRef = useRef <HTMLInputElement> (null)
        // const bodyRef = useRef <HTMLInputElement> (null)
        // const userIdRef = useRef <HTMLInputElement> (null)

        return(
            
            <div className = "form">
                    <div className = "field">
                        Title : <input type="text" id = "form-title"/>
                    </div>
                    <div className = "field">
                        Body : <input type="text" id = "form-body"/>
                    </div>
                    <div className = "field">
                        user-id : <input type="text" id = "user-id"/>
                    </div>

                    <button onClick = { createPost }> Submit</button>
            </div>
        )
    }

    return(

        <div className = "Home">
            
            { status === "success" && cstatus === "success" ? renderPosts(data) : "loading..." }

        </div>
    )
}