import React from 'react'
import SideBaar from '../Components/SideBaar'
import Search from '../Components/Search'

const SearchPage = () => {
  return (
     <div className='flex min-h-screen bg-slate-900'>
      <SideBaar/>
      <Search/>
    </div>
  )
}

export default SearchPage