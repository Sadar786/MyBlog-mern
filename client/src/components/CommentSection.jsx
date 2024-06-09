import { Alert, Button, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import { useNavigate } from "react-router-dom";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  
  // const [commentError, serCommentError] = useState(null); // Old line
  const [commentError, setCommentError] = useState(null); // Updated line
  
  const [comments, setComments] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.length > 200) {
      return;
    }

    try {
      const res = await fetch("/api/comment/createComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setCommentError(null); 
        setComment(""); 
        setComments([data, ...comments]);  
      }
    } catch (error) {
      console.log(error.message);
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getComment/${postId}`);
        const data = await res.json();
        
        if (res.ok) {
          setComments(data); // Updated line: Set comments with fetched data
        } else {
          console.log(data.message);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("An error occurred while fetching comments:", error);
        }
      }
    };

    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/signin");
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
  
      if (res.ok) {
        const data = await res.json();
        // Assuming `comments` is the state holding all comments
        setComments(comments.map((comment) => {
          if (comment._id === commentId) {
            // Update the liked comment with new like data
            return {
              ...comment,
              likes: data.likes,
              numberOfLikes: data.likes.length
            };
          }
          return comment;
        }));
      } else {
        console.error("Failed to like the comment");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="max-w-2xl p-3 w-full mx-auto ">
      {currentUser ? (
        <div className="flex text-gray-500 my-5 gap-1 items-center text-sm">
          <p>Signed in as:</p>
          {currentUser.profilePicture ? (
            <img
              src={currentUser.profilePicture}
              className="w-5 h-5 rounded-full object-cover"
              alt="User avatar"
            />
          ) : (
            <div>No image</div>
          )}
          <Link
            to="/dashboard?tab=profile"
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username || "Unknown User"}
          </Link>
        </div>
      ) : (
        <div className="text-teal-500 flex gap-1 text-sm my-5">
          You must be Signed in to comment!
          <Link className="text-blue-500 hover:underline" to={`/signin`}>
            Sign In
          </Link>
        </div>
      )}

      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            onChange={(e) => {
              setComment(e.target.value);
            }}
            value={comment}
            rows={3}
            placeholder="Add your comment"
            maxLength={"200"}
          ></Textarea>
          <div className="flex justify-between mt-5 items-center">
            <p className="text-xs text-gray-500">
              {200 - comment.length} character remaining
            </p>
            <Button outline gradientDuoTone={"purpleToBlue"} type="submit">
              Submit
            </Button>
          </div>
          {commentError && <Alert color="failure">{commentError}</Alert>}
        </form>
      )}

      {comments.length === 0 ? (
        <p className="text-sm py-7">No Comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comments key={comment._id} comment={comment} onLike={handleLike} /> // Updated line: Use comment._id as key
          ))}
        </>
      )}
    </div>
  );
}
