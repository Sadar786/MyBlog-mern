import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [errOccur, setErrOccur] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setErrOccur(false);

        const res = await fetch(`/api/post/getPosts?slug=${postSlug}`);
        const data = await res.json();

        if (res.ok) {
          setErrOccur(false);
          setLoading(false);
          setPost(data.posts[0]);
        } else {
          setErrOccur(true);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        setErrOccur(true);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner size={"xl"} />
        </div>
      ) : errOccur ? (
        "An error occurred while fetching the post."
      ) : (
        <div>
          {post && (
            <main className="flex flex-col max-w-6xl mx-auto p-3 min-h-screen">
              <h1 className="text-3xl mt-10 text-center p-3 font-sarif mix-w-2xl mx-auto lg;text-4xl">
                {" "}
                {post.title}
              </h1>
              <Link
                to={`/search?category=${post && post.category}`}
                className="self-center mt-5"
              >
                <Button color={"gray"} pill size={"xs"}>
                  {post && post.category}
                </Button>
              </Link>
              <img
                src={post && post.image}
                alt={post && post.title}
                className="mt-10 max-h-[600px] p-3 w-full object-cover"
              />
              <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
                <span>
                  {post && new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span className="italic">
                  {post && Math.ceil(post.content.length / 1000)} mins read
                </span>
              </div>
              {post && post.content ? (
                <div
                  className="p-3 max-w-2xl mx-auto w-full post-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>
              ) : (
                <div>No content available</div>
              )}
            </main>
          )}
        </div>
      )}
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>

      <div>
        <div>{post && <CommentSection postId={post._id} />}</div>
      </div>
    </div>
  );
}
