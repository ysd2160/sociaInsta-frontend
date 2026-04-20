import { Edit, Home, LogOut, Menu, PersonStandingIcon, Search, Settings, Upload } from 'lucide-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../utils/AxiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../Redux/authSlice';

const SideBaar = () => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    let data = [
        {
            id: 1,
            icon: <Home />,
            text: "Home"
        },
        {
            id: 2,
            icon: <PersonStandingIcon />,
            text: "Profile"
        },
        {
            id: 3,
            icon: <LogOut />,
            text: "Logout"
        },
        {
            id: 4,
            icon: <Edit />,
            text: "Edit"
        },
        {
            id: 5,
            icon: <Search />,
            text: "Search"
        },
        {
            id: 6,
            icon: <Upload />,
            text: "Create"
        },

    ]
    const logoutHandler = async () => {
        try {
            let response = await authApi.get("/logout")
            console.log(response);
            dispatch(Logout())
            navigate("/login")
        } catch (error) {
            console.log(error);

        }
    }

    const handleClick = async (text) => {
        if (text === 'Logout') {
            await logoutHandler()
        } if (text === "Profile") {
            navigate(`/profile/${user?._id}`)
        } if (text === "Home") {
            navigate(`/`)
        } if (text === "Edit") {
            navigate(`/edit-profile`)
        } if (text === "Create") {
            navigate(`/create-post`)
        }if (text === "Search") {
            navigate(`/search`)
        }
    }

    return (
        <>
            <button className='lg:hidden text-white absolute top-1 left-0 z-20' onClick={() => setOpen(!open)}><Menu /></button>
            <div className={`${open ? "block" : "hidden"}  lg:block fixed top-0 w-1/2 z-10 lg:w-1/6 bg-slate-800 text-black font-md h-screen `} >
                <div className='pt-10 pl-10 text-lg font-bold text-white'>
                    <span>icon</span> <span>LOGO</span>
                </div>
                <div className='pt-10 text-white'>

                    {
                        data?.map(item => {
                            return <li key={item.id} className=' list-none flex items-center hover:bg-slate-900 rounded-full'>
                                <span className="pl-5">{item.icon}</span>
                                <span className='text-md  pl-5 p-2 m-2 hover:font-bold' onClick={() => handleClick(item.text)}>{item.text}</span>
                            </li>
                        })
                    }
                </div>
                <div className='pt-20 text-white flex items-center pl-5'>
                    <Settings /><span className='text-md m-5 text-white'>Setting</span>
                </div>
            </div>
        </>
    )
}

export default SideBaar