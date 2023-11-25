import { useRef } from "react";
import { CommentsData, PostData } from "../types";
import { useCreateComment, useGetComments } from "../api/comments";

type Props = {
  post: PostData;
};

export const RenderComments = ({ post }: Props) => {
  const { data: CommentsData, status: CommentsStatus } = useGetComments(
    post.id
  );
  const { mutateAsync: addComment } = useCreateComment();
  const commentObj = useRef<HTMLInputElement>(null);

  const postComment = () => {
    const msg = commentObj.current!.value;
    console.log(post.id);
    addComment({
      id: 0,
      post_id: post.id,
      name: "Nived",
      email: "nived@google.com",
      body: msg,
    });
  };

  if (CommentsData) {
    if (CommentsStatus === "loading")
      return (
        <div>
          <p className="comment"> Loading Comments... </p>
        </div>
      );

    if (CommentsStatus === "success" && CommentsData.length > 0)
      return (
        <div>
          {CommentsData.map((comment: CommentsData) => (
            <p className="comment" key={comment.id}>
              {comment.body}
            </p>
          ))}
          <input
            type="text"
            className="comment-in"
            placeholder="comment..."
            ref={commentObj}
          />
          <button onClick={postComment} className="btn">
            Send
          </button>
        </div>
      );

    if (CommentsStatus === "error")
      return (
        <div>
          <p className="comment"> Error fetching comments !! </p>
        </div>
      );

    return (
      <div>
        <p className="comment"> Be the first to comment </p>
        <input type="text" placeholder="comment..." ref={commentObj} />
        <button onClick={postComment} className="btn">
          Send
        </button>
      </div>
    );
  }
  return <div></div>;
};
