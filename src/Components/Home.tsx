
import { Reducer, useReducer, useState } from "react"
import { NewPostType, PostData } from "../CommonTypes/TypesList1"
import { useAddPost, usePosts } from "./Apis"
import { Post } from "./Post"
import { Action } from "./UsersSection"
import "../Styles/Home.css"

const reducer = (state : NewPostType , action : Action) => {

    switch(action.type){

        case "title" : state.title = action.payload
                        return {...state}
        case "body" : state.body = action.payload
                        return {...state}
        default : return state
    }
}

const initialState = {
    id: 187187,
    user_id: 5766243,
    user: "User0",
    title: "",
    body: "",
}

export const Home = () =>{

    const {data,status} = usePosts()
    const [display, setDisplay] = useState <boolean> (false)
    const {mutateAsync : create_post , status : postStatus} = useAddPost()

    const [postData, dispatch] = useReducer<Reducer <NewPostType , Action>>(reducer , initialState)

    const renderPosts = (data : PostData[]) =>{
        return data?.map((post:PostData) =>  <Post post = {post}  key = {String(post.id)}/>)
    }

    const createPost = () =>{

        create_post(postData)
        if(postStatus === 'success'){
            postData.body = ""
            postData.title = ""
        }
        setDisplay(!display)
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
        
                <button type = "submit" onClick = {createPost} className = "btn"> Create</button>
                <button onClick = {() => setDisplay(!display)} className = "btn"> Cancel</button>
            </div>
            }
        </div>
    )
}