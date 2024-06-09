import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="group relative w-full h-[-400px] border border-teal-500 hover:border-2 p-1 transition-all overflow-hidden rounded-lg sm:w-[430px]">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post cover"
          className="w-full h-[260px] object-cover group-hover:h-[200px]
          transition-all duration-200 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold">
          {post.title.length > 100
            ? `${post.title.substring(0, 100)}...`
            : post.title}
        </p>{" "}
        <span className="italic text-sm">{post.category}</span>
        <Link to={`/post/${post.slug}`}>
          <button
            className="z-10 bottom-[-200px] left-0 right-0 border border-teal-500 hover:bg-teal-500 hover:text-white 
          transition-all duration-300 py-2 m-2 text-center rounded-md !rounded-tl-none group-hover:bottom-0 absolute"
          >
            Read Artical
          </button>
        </Link>
      </div>
    </div>
  );
}
