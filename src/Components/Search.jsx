import { SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import { userApi } from '../utils/AxiosInstance'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Search = () => {
  let [username, setUsername] = useState("")
  const [users, setUsers] = useState(null)
  const LoginUser = useSelector(state => state.auth.user)
  const navigate = useNavigate()

  const getUsers = async (e) => {
    e.preventDefault()
    try {
      let userName = username.toLowerCase()
      const response = await userApi.get(`/finduser/?username=${userName}`)
      console.log(response);
      setUsers(response.data.user)
      setUsername("")

    } catch (error) {
      console.log(error);

    }
  }

  const followFollowing = async (userId) => {
    try {
      const response = await userApi.post(`/follow/${userId}`)
      console.log(response);
      // console.log(userId);

      setUsers(prev => prev.map(user => {
        if (user._id !== userId) return user
        const isfollowing = user.followers.includes(LoginUser._id)
        return isfollowing ? { ...user, followers: user.followers.filter(id => id !== LoginUser._id) } : { ...user, followers: [...user.followers, LoginUser._id] }

      }))
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <div className='w-1/2 mx-auto '>
      <div className=' text-white border rounded-md mt-2 '>
        <form className='flex justify-between p-1' onSubmit={(e) => getUsers(e)} >
          <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="outline-none w-full p-1 rounded-md  " placeholder="Username ..." />
          <button type='submit' className="w-10 p-2"><SearchIcon /></button>
        </form>
      </div>

      {
        users?.length === 0 ? (<div className="text-white font-bold text-center m-2 p-1">no users to show</div>) : (
          users?.map(user => {
            const isfollowing = user?.followers
              .includes(LoginUser._id)
            // console.log(user);
            // console.log(LoginUser);

            return (
              <div key={user?._id} className='border flex justify-between items-center p-2 m-2 rounded-md '>
                <div className="flex items-center gap-2">

                  <span className=''><img className='w-10 h-10 border rounded-full' src={user?.profilePic} alt="" /></span>
                  <span className='text-white text-lg font-semibold' onClick={() => navigate(`/profile/${user?._id}`)}>{user?.username}</span>
                </div>
                <button
                  onClick={() => followFollowing(user?._id)}
                  className={`bg-blue-500 p-2 text-white rounded-md`}>{isfollowing ? "Following" : "Follow"}</button>
              </div>
            )
          }))}

    </div>
  )
}

export default Search