import React, { useEffect } from 'react'
import { authApi } from '../utils/AxiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '../Redux/authSlice'
import SideBaar from '../Components/SideBaar'
import Posts from '../Components/Posts'
import SuggestedUser from '../Components/SuggestedUser'

const Homepage = () => {
     const user = useSelector(state=>state.auth)
     const dispatch = useDispatch()


     
    const logoutHandler = async()=>{
        try {
            let response = await authApi.get("/logout")
            console.log(response);
            dispatch(Logout())

            
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <>
    <div className='flex  lg:gap-10 bg-slate-900 w-full min-h-screen '>

<div className='lg:w-1/3'>

  
    <SideBaar/>
</div>

<div className='flex gap-10  '>

    <Posts/>
    <SuggestedUser/>
</div>
    </div>
    </>
  )
}

export default Homepage