import React, { useEffect } from 'react'
import { authApi } from '../utils/AxiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '../Redux/authSlice'
import { useNavigate } from 'react-router-dom'

import SideBaar from '../Components/SideBaar'
import Posts from '../Components/Posts'
import SuggestedUser from '../Components/SuggestedUser'

const Homepage = () => {
    const user = useSelector((state) => state.auth.user) // apne state ke hisab se change karna
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            dispatch(Logout())
            navigate("/login")
        }
    }, [user, dispatch, navigate])

    const logoutHandler = async () => {
        try {
            await authApi.get("/logout")
            dispatch(Logout())
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex lg:gap-10 bg-slate-900 w-full min-h-screen">
            <div className="lg:w-1/3">
                <SideBaar />
            </div>

            <div className="flex gap-10">
                <Posts />
                <SuggestedUser />
            </div>
        </div>
    )
}

export default Homepage