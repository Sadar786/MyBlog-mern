import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Table, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  const [error, setError] = useState(null);

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
        if (data.length < 9) {
          setShowMore(false);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id, currentUser.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = posts.length;

    try {
      const res = await fetch(`/api/post/getPosts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();

      if (res.ok) {
        if (Array.isArray(data.posts)) {
          setPosts((prev) => [...prev, ...data.posts]);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        } else {
          throw new Error('Invalid response format');
        }
      } else {
        throw new Error('Failed to fetch posts');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);

    try {
      const res = await fetch(`/api/post/deletePost/${postIdToDelete}/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
      } else {
        setPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:ax-auto p-3 scrollbar
     scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
     dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin ? (
        posts.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell className="">Date</Table.HeadCell>
                <Table.HeadCell className="">Image</Table.HeadCell>
                <Table.HeadCell className="">Title</Table.HeadCell>
                <Table.HeadCell className="">Category</Table.HeadCell>
                <Table.HeadCell className="">Delete</Table.HeadCell>
                <Table.HeadCell className="">
                  <span className="">Edit</span>
                </Table.HeadCell>
              </Table.Head>

              {posts.map((post, index) => {
                return (
                  <Table.Body key={index} className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </Table.Cell>

                      <Table.Cell>
                        <Link to={`/post/${post.slug}`}>
                          <img
                            src={post.image}
                            className="w-20 h-10 object-cover bg-gray-500"
                            alt=""
                          />
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          className="font-medium text-gray-900 dark:text-white "
                          to={`/post/${post.slug}`}
                        >
                          {post.title}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{post.category}</Table.Cell>
                      <Table.Cell>
                        <span
                          onClick={() => {
                            setShowModal(true);
                            setPostIdToDelete(post._id);
                          }}
                          className="font-medium text-red-500 hover:underline cursor-pointer"
                        >
                          Delete
                        </span>
                      </Table.Cell>
                      <Table.Cell>
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
            {showMore && (
              <button className="text-teal-500 self-center text-sm py-7 w-full" onClick={handleShowMore}>Show more</button>
            )}
          </>
        ) : (
          <p>You have no posts yet.</p>
        )
      ) : (
        <p>Only admins can view posts.</p>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size={"md"}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-400 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400 ">Are you sure you want to delete this Post?</h3>
            <div className="flex justify-center gap-4">
              <Button color={"failure"} onClick={handleDeletePost}>Yes, I'm sure.</Button>
              <Button color='gray' onClick={() => setShowModal(false)}>Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {error && (
        <div className="text-red-500">{error}</div>
      )}
    </div>
  );
}
