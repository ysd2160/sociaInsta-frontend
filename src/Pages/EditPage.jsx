import React from 'react'
import SideBaar from '../Components/SideBaar'
import EditProfile from '../Components/EditProfile'

const EditPage = () => {
    
  return (
     <div className='flex min-h-screen bg-slate-900'>
      <SideBaar/>
      <EditProfile/>
    </div>
  )
}

export default EditPage