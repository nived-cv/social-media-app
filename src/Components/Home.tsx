import { Reducer, useReducer, useState } from "react";
import { NewPostType, PostData } from "../CommonTypes/TypesList1";
import { useCreatePost } from "../Api/posts/useCreatePosts";
import { useGetPosts } from "../Api/posts/useGetPosts";
import { Post } from "./Post";
import { Action } from "./UsersSection";
import "../Styles/Home.css";

const reducer = (state: NewPostType, action: Action) => {
  switch (action.type) {
    case "title":
      return { ...state, title: action.payload };
    case "body":
      return { ...state, body: action.payload };
    case "clear":
      return { ...state, title: "", body: "" };
    default:
      return state;
  }
};

const initialState = {
  id: 187187,
  user_id: 5766243,
  user: "User0",
  title: "",
  body: "",
};

export const Home = () => {
  const { data: posts, status } = useGetPosts();
  const [showForm, setShowForm] = useState<boolean>(false);
  const { mutateAsync: addPost, status: postStatus } = useCreatePost();

  const [postData, dispatch] = useReducer<Reducer<NewPostType, Action>>(
    reducer,
    initialState
  );

  const renderPosts = (data: PostData[]) => {
    return data?.map((post: PostData) => (
      <Post post={post} key={String(post.id)} />
    ));
  };

  const createPost = () => {
    addPost(postData);
    if (postStatus === "success") {
      dispatch({ type: "clear", payload: "" });
    }
    setShowForm(!showForm);
  };

  return (
    <div className="Home">
      {status === "success" ? renderPosts(posts) : "loading..."}

      <button onClick={() => setShowForm(!showForm)} className="btn addPost">
        Create Post
      </button>

      {showForm && (
        <div className="form">
          <input
            type="text"
            name="title"
            onChange={(e) =>
              dispatch({ type: "title", payload: e.target.value })
            }
            placeholder="type a title..."
            required
          />
          <input
            type="text"
            name="body"
            onChange={(e) =>
              dispatch({ type: "body", payload: e.target.value })
            }
            placeholder=" say something"
            required
          />

          <button type="submit" onClick={createPost} className="btn">
            Create
          </button>
          <button onClick={() => setShowForm(!showForm)} className="btn">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
