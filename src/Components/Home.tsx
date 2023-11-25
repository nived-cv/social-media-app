import { Reducer, useReducer, useState } from "react";
import { NewPostType, PostData } from "../types";
import { useCreatePost, useGetPosts } from "../api/posts";
import { CustomButton } from "./common";
import { Post } from "./Post";
import { Action } from "./UsersSection";
import "../styles/Home.css";

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

enum RequestStatus {
  SUCCESS = "success",
}

export const Home = () => {
  const { data: posts, status: getPostStatus } = useGetPosts();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { mutateAsync: addPost, status: createPostStatus } = useCreatePost();

  const [postData, dispatch] = useReducer<Reducer<NewPostType, Action>>(
    reducer,
    initialState
  );

  const renderPosts = (data: PostData[]) => {
    return data?.map((post: PostData) => (
      <Post post={post} key={String(post.id)} />
    ));
  };

  const handleCreatePost = () => {
    addPost(postData);
    if (createPostStatus === RequestStatus.SUCCESS) {
      dispatch({ type: "clear", payload: "" });
    }
    setIsModalOpen(!isModalOpen);
  };
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="Home">
      {getPostStatus === RequestStatus.SUCCESS
        ? renderPosts(posts)
        : "loading..."}

      <button onClick={handleToggleModal} className="btn addPost">
        Create Post
      </button>

      {isModalOpen && (
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

          <CustomButton
            buttonText="Submit"
            handleClick={handleCreatePost}
            type="submit"
            className="btn"
          />
          <CustomButton
            buttonText="Cancel"
            handleClick={handleToggleModal}
            className="btn"
          />
        </div>
      )}
    </div>
  );
};
