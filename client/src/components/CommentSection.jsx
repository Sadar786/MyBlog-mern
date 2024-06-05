import { Alert, Button, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CommentSection({ postId }) {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [commentError, serCommentError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(comment.length> 200){
            return;
        }

        try {
            
            const res = await fetch('/api/comment/createComment',
                {
                    method:"POST",
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({content: comment, postId, userId: currentUser._id })
                }
            );

            const data = await res.json();
            if(res.ok){
                serCommentError(null)
                setComment('')
            }

        } catch (error) {
            console.log(error.message)
            setCommentError(error.message)
        }
    }
    console.log(comment)
  
    return (
        <div className='max-w-2xl p-3 w-full mx-auto '>
            {currentUser ? (
                <div className="flex text-gray-500 my-5 gap-1 items-center text-sm">
                    <p>Signed in as:</p>
                    {currentUser.profilePicture ? <img src={currentUser.profilePicture}className='w-5 h-5 rounded-full object-cover' alt="User avatar" /> : <div>No image</div>}
                    <Link to="/dashboard?tab=profile" className='text-xs text-cyan-600 hover:underline'>@{currentUser.username || 'Unknown User'}</Link>
                </div>
            ) : (
                <div className="text-teal-500 flex gap-1 text-sm my-5">
                    You must be Signed in to comment!
                    <Link className='text-blue-500 hover:underline' to={`/signin`}>
                        Sign In
                    </Link>
                </div>
            )}

            {
                currentUser && (
                    <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3'> 
                        <Textarea onChange={(e)=>{setComment(e.target.value)}} value={comment} rows={3} placeholder='Add your comment'
                        maxLength={"200"}></Textarea>
                        <div className="flex justify-between mt-5 items-center">
                        <p className='text-xs text-gray-500'>{200-comment.length} character remaining</p>
                        <Button outline gradientDuoTone={"purpleToBlue"} type='submit'>Submit</Button>
                        </div>
                        {
                            commentError && (
                                <Alert color='failure'>{commentError}</Alert>
                            )
                        }
                    </form>
                )
            }
        </div>
    );
}
