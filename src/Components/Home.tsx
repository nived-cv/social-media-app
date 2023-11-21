
import { Reducer, useReducer, useRef, useState } from "react"
import { PostData } from "../CommonTypes/TypesList1"
import { useAddPost, usePosts } from "./Apis"
import { Post } from "./Post"
import { Action } from "./UsersSection"

const reducer = (state : PostData , action : Action) => {

    switch(action.type){

        case "title" : state.title = action.payload
                        return {...state}
        case "body" : state.body = action.payload
                        return {...state}
        default : return state
    }
}

export const Home = () =>{

    const {data,status} = usePosts()
    const [display, setDisplay] = useState <boolean> (false)
    const mutation = useAddPost()

    const [postData, dispatch] = useReducer<Reducer <PostData , Action>>(reducer , {id : 0, user_id : 187187} as PostData)

    const renderPosts = (data : PostData[]) =>{
        return data?.map((post:PostData) =>  <Post post = {post}  key = {String(post.id)}/>)
    }

    const createPost = () =>{

        mutation.mutate(postData)
        postData.title = ""
        postData.body = ""
    }

    return(

        <div className = "Home">
            
            { status === "success" ? renderPosts(data) : "loading..." }

            <button onClick = {() => setDisplay(!display)} className = "btn addPost"> Create Post </button>
            
            { display &&
            <div className = "form">
                <input type = "text" name = "title" 
                    onChange = { (e)=> dispatch({type : "title" , payload : e.target.value}) } 
                    placeholder="type a title..." required />
                <input type = "text" name = "body" 
                    onChange = { (e)=> dispatch({type : "body" , payload : e.target.value}) } 
                    placeholder=" say something" required />
        
                <button type = "submit" onSubmit = {createPost}> Create</button>
                <button onClick = {() => setDisplay(!display)}> Cancel</button>
            </div>
            }
        </div>
    )
}