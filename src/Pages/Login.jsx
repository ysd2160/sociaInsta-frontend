import React, { useState } from 'react'
import { authApi } from '../utils/AxiosInstance';
import { EyeOff, Eye } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { useNavigate, useNavigation } from 'react-router-dom';
import { loginUser } from '../Redux/authSlice';

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState("")
    const [data, setData] = useState({
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
            const response = await authApi.post("/login", data)
            console.log(response);
            setMessage(response.data.message)
            dispatch(loginUser(response.data.user))
            navigate("/")
            // setLoading(false)

        } catch (error) {
            console.log(error);
            alert(error)

        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className='min-w-screen min-h-screen flex flex-col items-center justify-center bg-slate-500'>
                <span className='font-semibold text-xl m-5 p-2'>{message ? message : ""}</span>
                <div className='border-3 shadow-2xl bg-slate-400   rounded-xl p-10 border-gray-600 '>

                    <div className='text-2xl m-4 p-3 font-bold  '>Login Form</div>
                    <div className='  flex items-center justify-center '>

                        <form onSubmit={(e) => onSubmitHandler(e)}

                        >

                            <input
                                type='email'
                                placeholder='Enter Email..'
                                name='email'
                                value={data.email}
                                onChange={(e) => onChangeHandler(e)}
                                required
                                className='outline-none border-2 p-2 rounded-md  m-2 border-gray-600 text-md w-full text-black cursor-pointer'
                            />

                            <div className='relative'>

                                <input
                                    type={show ? "text" : "password"}
                                    placeholder='Enter Paswword..'
                                    name='password'
                                    value={data.password}
                                    onChange={(e) => onChangeHandler(e)}
                                    required
                                    className=' outline-none border-2 p-2 rounded-md  m-2 border-gray-600 text-md w-full text-black cursor-pointer'
                                /> <span
                                    className='absolute bottom-5 right-2'
                                    onClick={() => setShow(!show)}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</span>
                            </div>


                            <button
                                type='submit'
                                className='text-lg bg-blue-500  cursor-pointer  rounded-lg p-2 m-2 w-full font-medium '
                            >{loading ? "Loading..." : " Login"}</button>
                            <p className='text-black'>Don't have Acount ? <span className='text-blue-600' onClick={()=>navigate("/signup")}>Signup</span></p>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login