import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authApi } from '../utils/AxiosInstance'
import { loginUser } from '../Redux/authSlice'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
  const user = useSelector(state=>state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [img,setImg] = useState(null)
  const [loading,setLoading] = useState(false)
  const [data,setData] = useState({
    username:user?.username,
    email:user?.email,
    bio:user?.bio,
    file:user?.profilePic
  })
// console.log(user);
const onChangeHandler = (e)=>{
 const {name,value,type,files} = e.target
 if(type === "file"){
  setData({...data,file:files[0]})
  setImg(files[0])
 }else{
  setData({...data,[name]:value})
 }
 
 
}
const onsubmitHandler = async(e)=>{
  e.preventDefault()
  setLoading(true)
try {
  let formdata = new FormData()
  formdata.append("username",data.username)
  formdata.append("email",data.email)
  
  formdata.append("bio",data.bio)
  formdata.append("profilePic",data.file)

  let response = await authApi.put("/edit-profile",formdata,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
  console.log(response);
  dispatch(loginUser(response.data.user))
  navigate("/")
  
  
  
} catch (error) {
  console.log(error);
  
}finally{
  setLoading(false)
}
} 

  return (
     <div className='text-white   mx-auto w-1/2 flex items-center justify-center'>
        <div className='border-2 border-slate-700 rounded-md p-14 bg-slate-800 shadow-2xl'>

        <h2 className='font-bold p-3 text-2xl text-center '>Edit Profile</h2>
        <form 
        onSubmit={e=>onsubmitHandler(e)}
        className='flex flex-col gap-3 rounded-md p-10 0 '>
            <input
             type="text" 
             placeholder='username...' 
             className='bg-gray-800 outline-none rounded-md border border-gary-500 p-2 text-xl  '
             name='username' 
             defaultValue={data.username}
             onChange={(e)=>onChangeHandler(e)}

             />
              <input
             type="text" 
             placeholder='email...' 
             className='bg-gray-800 outline-none rounded-md border border-gary-500 p-2 text-xl  ' 
             name='email'
             defaultValue={data.email}
             onChange={(e)=>onChangeHandler(e)}

             />
             
              <input
             type="text" 
             placeholder='bio...' 
             name='bio'
             className='bg-gray-800 outline-none rounded-md border border-gary-500 p-2 text-xl  ' 
             defaultValue={data.bio}
             onChange={(e)=>onChangeHandler(e)}

             />
             
             <label className='bg-blue-600 rounded-md w-full text-xl p-2'>
Upload ProfilePicture
            <input 
            type="file"
           
             className='hidden' 
             onChange={(e)=>onChangeHandler(e)}
            
             />
             </label>
             {
                img &&( <img
                src={URL.createObjectURL(img)}
                className='w-full h-40 object-contain'
                />)
            }



           <button className='bg-blue-600 rounded-md w-full text-xl p-2 mt-2' >{loading ? "loading..." : "Save"}</button>
           
        </form>
        </div>
    </div>
  )
}

export default EditProfile