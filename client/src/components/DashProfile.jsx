import { Alert, Button, TextInput } from 'flowbite-react'
import React, {useEffect, useRef, useState} from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFaluire } from '../redex/user/userSlice.js';
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redex/user/userSlice.js'

export default function DashProfile() {
  const {currentUser } = useSelector((state) => state.user)
  const [formData, setFormData] = useState({})
  const [imageFile, setImageFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const filePickerRef = useRef();
  const [imageFileUploadingProgress, setimageFileUploadingProgress] = useState(null)
  const [imageFileUploadingError, setimageFileUploadingError] = useState(null)
  const dispatch = useDispatch();
  const [imageFileLoading , setImageFileLoading ] = useState(false)
  const [updatedUserSuccess , setUpdatedUserSuccess] = useState(false)
  const [updateUserError, setUpdatedUserError] = useState(null)



  const handleImageChange =  (e) =>{
    let file = e.target.files[0]
    if(file){
    setImageFile(file)
    setImageFileUrl(URL.createObjectURL(file))
    }
  }
 
  
  useEffect(()=>{
    if(imageFile){
      upLoadImage()
    }
  }, [imageFile])

  const upLoadImage = () => {
    setImageFileLoading(true)
    setimageFileUploadingError(null)
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
  
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setimageFileUploadingProgress(progress.toFixed(2)); // Fixed to two decimal places
      },
      (error) => {
        setimageFileUploadingError("Could not upload Image (file must be less than 2MB) " + error.message);
        setimageFileUploadingProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileLoading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({...formData, profilePicture: downloadURL})
          setImageFileLoading(false)
        });
      }
    );
  };
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()})
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdatedUserError(null);
    setUpdatedUserSuccess(null)
    if(Object.keys(formData).length === 0){
      setUpdatedUserError("No Change made !!")
      return;
    }
    if(imageFileLoading){
      setUpdatedUserError("please wait for image to upload!")
      return;
    }
    
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if(!res.ok){
        dispatch(updateFaluire(data.message))
        setUpdatedUserError( data.message)

      }
      else{
        dispatch(updateSuccess(data))
        setUpdatedUserSuccess("User Profile updated successfully! :" )
        setUpdatedUserError(null)
      }
    } catch (error) {
      dispatch(updateFaluire(error.message))
      setUpdatedUserError("Occur some Error on updating!" + error.message)

    }

  }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit} > 
            <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
          <div className="relative flex self-center w-32 h-32 cursor-pointer shadow-md rounded-full overflow-hidden" onClick={()=>filePickerRef.current.click()}>
            {imageFileUploadingProgress && (
              <CircularProgressbar
              value={parseFloat(imageFileUploadingProgress) || 0}
              text={`${parseFloat(imageFileUploadingProgress) || 0}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${parseFloat(imageFileUploadingProgress) / 100})`
                },
                trail: {
                  stroke: '#d6d6d6' // Color of the background circle
                },
                text: {
                  fill: '#000', // Color of the text showing the progress percentage
                  fontSize: '16px' // Size of the text showing the progress percentage
                }
              }}
            />
            
            )}
          <img src={imageFileUrl || currentUser.profilePicture} alt="user"
           className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover ${imageFileUploadingProgress && imageFileUploadingProgress < 100 && 'opacity-60'}`} />
          </div>
          {imageFileUploadingError && <Alert color='failure'>{imageFileUploadingError}</Alert>}
          <TextInput type='text' onChange={handleChange} placeholder='username' id='username' defaultValue={currentUser.username} />
          <TextInput type='text' onChange={handleChange} placeholder='email' id='email' defaultValue={currentUser.email} />
          <TextInput type='text' onChange={handleChange} placeholder='*******' id='password'  />

          <Button type='submit' outline gradientDuoTone={'purpleToBlue'}> update</Button>
          
        </form>
          <div className="text-red-500 justify-between flex mt-5">
            <span className="cursor-pointer">Delete</span>
            <span className="cursor-pointer">Sign Out</span>
          </div>
            {updatedUserSuccess && (<Alert
            color={"success"} className='mt-5'>{updatedUserSuccess}</Alert>)
            }
            {updateUserError && (<Alert
            color={"failure"} className='mt-5'>{updateUserError}</Alert>)
            }
     </div>
  )
}
