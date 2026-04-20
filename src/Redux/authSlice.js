import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
name:"auth",
initialState:{
    user:null
},
reducers:{
    loginUser:(state,action)=>{
        state.user = action.payload
    },
    Logout:(state,action)=>{
        state.user = null
    }
}
})

export const {loginUser,Logout} = authSlice.actions
export default authSlice.reducer