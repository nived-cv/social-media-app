
import { useRef } from "react"
import { PostData } from "../CommonTypes/TypesList1"
import { usePosts } from "./DataProvider"
import { Post } from "./Post"

export const Home = () =>{

    const {data,status} = usePosts()

    const renderPosts = (data : PostData[]) =>{
        return data?.map((post:PostData) => <Post post = {post}/>)
    }

    const createPost = () =>{

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
            
            { status === "success" ? renderPosts(data) : "loading..." }

        </div>
    )
}