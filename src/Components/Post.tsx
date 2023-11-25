import { useRef, useState } from "react";
import { PostData } from "../types";
import "../styles/Post.css";
import { RenderComments } from "./RenderComments";
import { useDeletePost } from "../api/posts";

type Props = {
  post: PostData;
};

export const Post = ({ post }: Props) => {
  const commentsRef = useRef<HTMLDivElement>(null);
  const dltRef = useRef<HTMLDivElement>(null);
  const [comments, setComments] = useState<boolean>(false);
  const { mutateAsync: deletePost } = useDeletePost();

  const handleClick = () => setComments(!comments);
  const handleDlt = () => deletePost(post.id);

  return (
    <div className="post" key={String(post.id)}>
      <div className="fa-solid fa-trash" ref={dltRef} onClick={handleDlt} />

      <h2 className="post-title">{post.title}</h2>
      <div className="post-body">{post.body}</div>

      <p className="fa-solid fa-comments" onClick={handleClick} />
      <div className="post-comments" ref={commentsRef}>
        {comments ? <RenderComments post={post} /> : ""}
      </div>
    </div>
  );
};
