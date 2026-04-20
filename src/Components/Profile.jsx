import React, { useEffect, useState } from 'react'
import { userApi } from '../utils/AxiosInstance'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const Profile = () => {
    const LoginUser = useSelector(state => state.auth.user)
    const navigate = useNavigate()
    // console.log(LoginUser);
    const {userId} = useParams()
    // console.log(userId);
    
    
    
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function getUserData() {
            try {
                let response = await userApi(`/${userId}`)
                console.log(response.data.user);
                setUser(response.data.user)
                // console.log(user);


            } catch (error) {
                console.log(error);

            }
        }
        getUserData()
    }, [])

const onFollowHandler = async(userId)=>{
    try {
        const response = await userApi.post(`/follow/${userId}`)
        console.log(response);
        
        setUser(prevuser=>{
            const isFollowing = user.followers.includes(LoginUser._id)

           return isFollowing ? {...prevuser,followers:prevuser.followers.filter(id=>id !==LoginUser._id)} : {...prevuser,followers : [...prevuser.followers,LoginUser._id]}
        }
        )
    } catch (error) {
        console.log(error);
        
    }
}


    return (
        <div className=' mx-auto lg:min-h-1/2 flex flex-col gap-5 lg:w-1/2 '>
            <div className='text-white flex flex-col mt-20 p-5 lg:mt-5 lg:h-fit items-center rounded-md lg:p-5'>
                <div className='flex items-center lg:w-full p-3 '>

                    <span className='flex items-center gap-2'>

                        <img
                            src={user?.profilePic}
                            alt=""
                            className='w-30 h-30 lg:w-40 lg:h-40 border rounded-full '
                        />
                    </span>
                    <span className='flex  flex-col gap-1 p-2'>

                        <span className='font-xl font-bold text-gray-400'>{user?.username}</span>
                        <span>{user?.bio ? user?.bio : "bio"}</span>
                        <span className='flex gap-2'>

                            <span>{user?.posts?.length} Posts</span>
                            <span>{user?.followers?.length} Followers</span>
                            <span>{user?.following?.length} Following</span>
                        </span>
                    </span>
                </div>
                <span className='flex gap-2 w-full m-2 p-2'>
                   {userId === LoginUser._id ?  (<button onClick={()=>navigate("/edit-profile")} className='bg-gray-600 text-md rounded-md text-white p-2 w-full'> Edit</button>): ( <button onClick={()=>onFollowHandler(user?._id)} className='bg-blue-600 text-md rounded-md text-white p-2 w-full'>{user?.followers?.includes(LoginUser?._id) ? "Unfollow" : "Follow"}</button>)}
                    <button className='bg-gray-600 text-md rounded-md text-white p-2 w-full'>share</button>
                </span>
            </div>
            <div className='text-white'>
            <span><p className='text-gray-400 font-bold text-2xl text-center  p-3 '>Posts</p></span>
            <div className='flex flex-wrap'>

            {user?.posts?.length === 0 ? <div className='text-gray-400 font-bold text-xl text-center  p-3 '>No posts to show</div> : user?.posts?.map(post=>(
                <div className=' w-1/3 lg:w-1/3 p-2  aspect-square' key={post?._id}>
                    <img 
                    src={post?.post}
                    alt=""
                    className='w-full h-full object-cover'
                    />
                </div>
            ))}
            </div>
            </div>
        </div>
    )
}

export default Profile