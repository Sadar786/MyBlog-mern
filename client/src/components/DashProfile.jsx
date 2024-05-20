import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux'

export default function DashProfile() {
  const {currentUser } = useSelector((state) => state.user)
  console.log(currentUser.profilePicture)
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4' > 
          <div className="flex self-center w-32 h-32 cursor-pointer shadow-md rounded-full overflow-hidden">
          <img src={currentUser.profilePicture} alt="user" className='rounded-full w-full h-full border-8 border-[lightgray] object-cover' />
          </div>
          <TextInput type='text' placeholder='username' id='username' defaultValue={currentUser.username} />
          <TextInput type='text' placeholder='email' id='email' defaultValue={currentUser.email} />
          <TextInput type='text' placeholder='*******' id='password'  />

          <Button type='submit' outline gradientDuoTone={'purpleToBlue'}> update</Button>
          
          <div className="text-red-500 justify-between flex mt-5">
            <span className="cursor-pointer">Delete</span>
            <span className="cursor-pointer">Sign Out</span>
          </div>
        </form>

     </div>
  )
}
