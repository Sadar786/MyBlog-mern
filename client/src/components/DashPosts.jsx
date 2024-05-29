import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Table } from "flowbite-react";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]); // State to store the fetched posts
  const [error, setError] = useState(null); // State to store any error messages

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `/api/post/getPosts?userId=${currentUser._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (error) {
        setError(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id, currentUser.isAdmin]);

  console.log(posts);

  return (
    <div className="table-auto overflow-x-scroll md:ax-auto p-3 scrollbar
     scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
     dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && posts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell className="">Date</Table.HeadCell>
              <Table.HeadCell className="">Image</Table.HeadCell>
              <Table.HeadCell className="">Title</Table.HeadCell>
              <Table.HeadCell className="">Catagory</Table.HeadCell>
              <Table.HeadCell className="">Delete</Table.HeadCell>
              <Table.HeadCell className="">
                <span className="">Edit</span>
              </Table.HeadCell>
            </Table.Head>

            {posts.map((post) => {
              return (
                <Table.Body className="divide-y">
                  <Table.Row className="bg-wihte dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>

                    <Table.Cell>
                      {
                        <Link to={`/post/${post.slug}`}>
                          <img
                            src={post.image}
                            className="w-20 h-10 object-cover bg-gray-500"
                            alt=""
                          />
                        </Link>
                      }
                    </Table.Cell>
                    <Table.Cell>
                      {" "}
                      <Link
                        className="font-medium text-gray-900 dark:text-white "
                        to={`/post/${post.slug}`}
                      >
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell>
                      <span className="font-medium text-red-500 hover:underline cursor-pointer">
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      {" "}
                      <Link
                        className="text-teal-500"
                        to={`/update-post/${post.slug}`}
                      >
                        <span>Edit</span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              );
            })}
          </Table>
        </>
      ) : (
        <p>You have no posts yet.</p>
      )}
    </div>
  );
}
