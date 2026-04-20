import { User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { userApi } from '../utils/AxiosInstance'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SuggestedUser = () => {
  const LoginUser = useSelector(state => state.auth.user)
  const navigate = useNavigate()
  const [users, setUsers] = useState(null)
  
  useEffect(() => {
    const getUsers = async () => {
      try {
        let response = await userApi.get("/suggesteduser")
        console.log(response);
        
        setUsers(response.data.users)
      } catch (error) {
        console.log(error);
      }
    }
    getUsers()
  }, [])

  

  const followHandler = async (userId) => {
    try {
      const response = await userApi.post(`/follow/${userId}`)
      console.log(response);
      setUsers(prev=>prev.map(user=>{
        if(user._id !== userId) return user
const isfollowing = user.followers.includes(LoginUser._id)
return isfollowing ? {...user,followers:user.followers.filter(id=>id !== LoginUser._id)} : {...user,followers:[...user.followers,LoginUser._id]}
        
      }))
      
      
    } catch (error) {
console.log(error);

    }
  }

  return (
    <div className= 'hidden lg:block text-white lg:w-1/3 p-4 rounded-sm'>
      <p className='font-semibold p-2 '>SuggestedUser</p>
      {users?.map(user => {
        let isfollwing = user?.followers.includes(LoginUser._id)
        return (

          <div key={user?._id} className='flex gap-4 bg-slate-800 w-full p-4 m-2 rounded-md items-center justify-between shadow-2xl'>
            <span className='flex gap-2 items-center'>

            <span className='border rounded-full '><img src={user?.profilePic} className='w-10 h-10 rounded-full object-cover border' /></span>
            <span className='text-gray-400 font-semibold text-xl ' onClick={() => { navigate(`/profile/${user?._id}`) }}>{user?.username}</span>
            </span>
            
              
              
            <button className='bg-blue-400 rounded-md p-2 font-medium' onClick={() => { followHandler(user?._id) }}>{isfollwing ? "Unfollow" : "Follow"}</button>
            
          </div>
        )
      })}



    </div>
  )
}

export default SuggestedUser