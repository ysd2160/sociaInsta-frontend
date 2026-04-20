import axios from 'axios';
import React, { useState } from 'react'
import { authApi } from '../utils/AxiosInstance';
import { Eye,EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (e) => {
        let { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await authApi.post("/signup", data)
            console.log(response.data.message);
             setMessage(response.data.message)
             navigate("/login")

        } catch (error) {
            console.log(error);

        }finally{
            setLoading(false)
        }
    }

    return (
        <>
            <div className='min-w-screen min-h-screen flex flex-col items-center justify-center bg-slate-500'>
                <span className='font-semibold text-xl m-5 p-2'>{message?message:""}</span>
<div className='border-3 shadow-2xl bg-slate-400   rounded-xl p-10 border-gray-600 '>

                <div className='text-2xl m-4 p-3 font-bold  '>SignUp Form</div>
                <div className='  flex items-center justify-center '>

                    <form onSubmit={(e) => onSubmitHandler(e)}

>
<div>

                        <input
                            type='text'
                            placeholder='Enter Username..'
                            name='username'
                            value={data.username}
                            onChange={(e) => onChangeHandler(e)}
                            required 
                            className='outline-none border-2 p-2 rounded-md  m-2 border-gray-600 text-md w-full text-black cursor-pointer '
                            />
                            </div>
                            <div>

                        <input
                            type='email'
                            placeholder='Enter Email..'
                            name='email'
                            value={data.email}
                            onChange={(e) => onChangeHandler(e)}
                            required
                            className='outline-none border-2 p-2 rounded-md  m-2 border-gray-600 text-md w-full text-black cursor-pointer'
                            />
                            </div>
                            <div>

                        <input
                            type='password'
                            placeholder='Enter Paswword..'
                            name='password'
                            value={data.password}
                            onChange={(e) => onChangeHandler(e)}
                            required
                            className='outline-none border-2 p-2 rounded-md  m-2 border-gray-600 text-md w-full text-black cursor-pointer'
                            /><span 
                            className='absolute bottom-5 right-2'
                            onClick={()=>setShow(!show)}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</span>
                            </div>

                        <button
                         type='submit' 
                         className='text-lg bg-blue-500  cursor-pointer  rounded-lg p-2 m-2 w-full font-medium '
                         >{loading ? "loading..." : "SignUp"}</button>
 <p className='text-black'>Don'Already have Acount ? <span className='text-blue-600' onClick={()=>navigate("/login")}>Login</span></p>
                    </form>
                </div>
                         </div>
            </div>
        </>
    )
}

export default SignUp