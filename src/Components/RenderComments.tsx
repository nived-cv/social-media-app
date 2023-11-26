import { useRef } from "react";
import { CommentsData, PostData } from "../types";
import { useCreateComment, useGetComments } from "../api/comments";
import { CustomButton } from "./common";

type Props = {
  post: PostData;
};

export const RenderComments = ({ post }: Props) => {
  const { data: commentsData, status: loadingStatus } = useGetComments(
    post.id
  );
  const { mutateAsync: addComment } = useCreateComment();
  const commentObj = useRef<HTMLInputElement>(null);

  const postComment = () => {
    const msg = commentObj.current!.value;
    addComment({
      id: 0,
      post_id: post.id,
      name: "Nived",
      email: "nived@google.com",
      body: msg,
    });
  };

  if(!commentsData) {
    return <div></div>;
  }

  if (loadingStatus === "loading") {
    return (
      <div>
        <p className="comment"> Loading Comments... </p>
      </div>
    );
  }

  if (loadingStatus === "error") {
    return (
      <div>
        <p className="comment"> Error fetching comments !! </p>
      </div>
    );
  }


  if (loadingStatus === "success" && commentsData.length > 0) {
    return (
      <div>
        {commentsData.map((comment: CommentsData) => (
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
        <CustomButton
          handleClick={postComment}
          className="btn"
          buttonText="Send"
        />
      </div>
    );
  }

  return (
    <div>
      <p className="comment"> Be the first to comment </p>
      <input type="text" placeholder="comment..." ref={commentObj} />
      <CustomButton
        handleClick={postComment}
        className="btn"
        buttonText="Send"
      />
    </div>
  );

};
