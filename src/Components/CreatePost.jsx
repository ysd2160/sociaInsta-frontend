import React, { useState } from 'react'
import { postApi } from '../utils/AxiosInstance'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    const navigate = useNavigate()
    const [img,setImg] = useState(null)
    const [caption,setCaption] = useState("")
    const [loading,setLoading] = useState(false)
    
    const onChanageHandler = (e)=>{
        setImg(e.target.files[0])
        
        
    }
    const submitHandler = async(e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            const formdata = new FormData()
            formdata.append("caption",caption)
            formdata.append("img",img)
            console.log(formdata);
            
            const response = await postApi.post("/create-post",formdata,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            console.log(response);
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

        <h2 className='font-bold p-3 text-2xl text-center '>Create Post</h2>
        <form onSubmit={(e)=>submitHandler(e)} className='flex flex-col gap-3 rounded-md p-10 0 '>
            <input
             type="text" 
             placeholder='Caption...' 
             className='bg-gray-800 outline-none rounded-md border border-gary-500 p-2 text-xl  ' 
             required
             onChange={(e)=>setCaption(e.target.value)}
             />
             
            <input 
            type="file"
            required
             className='bg-blue-600 rounded-md w-full text-xl p-2' 
             onChange={(e)=>onChanageHandler(e)}
             />

            {
                img &&( <img
                src={URL.createObjectURL(img)}
                className='w-full h-40 object-contain'
                />)
            }
            {
                loading ? (<button className='bg-blue-600 rounded-md w-full text-xl p-2 mt-2' >Creating...</button>):<button type='submit' className='bg-blue-600 rounded-md w-full text-xl p-2 mt-2' >Create</button>
            }
           
        </form>
        </div>
    </div>
  )
}

export default CreatePost