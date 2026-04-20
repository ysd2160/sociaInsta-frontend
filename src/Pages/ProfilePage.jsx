import React from 'react'
import SideBaar from '../Components/SideBaar'
import Profile from '../Components/Profile'
import { useParams } from 'react-router-dom'

const ProfilePage = () => {
  
  
  return (
    <>
    <div className='flex bg-slate-900 min-h-screen'>

    <SideBaar/>
    <Profile />
    </div>
    </>
  )
}

export default ProfilePage