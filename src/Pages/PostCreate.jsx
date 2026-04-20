import React from 'react'
import SideBaar from '../Components/SideBaar'
import CreatePost from '../Components/CreatePost'

const PostCreate = () => {
  return (
    <div className='flex min-h-screen bg-slate-900'>
      <SideBaar/>
      <CreatePost/>
    </div>
  )
}

export default PostCreate