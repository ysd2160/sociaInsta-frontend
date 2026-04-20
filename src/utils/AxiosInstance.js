import axios from "axios";

export const authApi = axios.create({
    baseURL: "http://10.183.163.203:3000/v1/api/auth",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials:true
})

export const userApi = axios.create({
    baseURL: "http://10.183.163.203:3000/v1/api/user",
    withCredentials: true,

})

export const postApi = axios.create({
    baseURL: "http://10.183.163.203:3000/v1/api/post",
    withCredentials: true
})

export const commentApi = axios.create({
    baseURL: "http://10.183.163.203:3000/v1/api/comment",
    withCredentials: true
})