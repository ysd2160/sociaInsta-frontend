import axios from "axios";

export const authApi = axios.create({
    baseURL: "https://socioinsta-backend.onrender.com//v1/api/auth",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials:true
})

export const userApi = axios.create({
    baseURL: "https://socioinsta-backend.onrender.com//v1/api/user",
    withCredentials: true,

})

export const postApi = axios.create({
    baseURL: "https://socioinsta-backend.onrender.com/v1/api/post",
    withCredentials: true
})

export const commentApi = axios.create({
    baseURL: "https://socioinsta-backend.onrender.com//v1/api/comment",
    withCredentials: true
})