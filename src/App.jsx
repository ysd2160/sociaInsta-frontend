import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./Pages/Login"
import SignUp from "./Pages/SignUp"
import Homepage from "./Pages/Homepage"
import ProtectedRoute from "./utils/ProtectedRoute"
import ProfilePage from "./Pages/ProfilePage"
import EditPage from "./Pages/EditPage"
import PostCreate from "./Pages/PostCreate"
import SearchPage from "./Pages/SearchPage"



function App() {

const router = createBrowserRouter([
  {
    path:"/signup",
    element:<SignUp/>
  },
   {
    path:"/login",
    element:<Login/>
  },
   {
    path:"/",
    element:<ProtectedRoute><Homepage/></ProtectedRoute>
    
  },{
    path:"/profile/:userId",
    // element:<ProfilePage/>
    element:<ProtectedRoute><ProfilePage/></ProtectedRoute>
  },
  {
    path:"/create-post",
    element:<ProtectedRoute><PostCreate/></ProtectedRoute>
    
  },
  {
    path:"/edit-profile",
    element:<ProtectedRoute><EditPage/></ProtectedRoute>
    
  },
  {
    path:"/search",
    element:<ProtectedRoute><SearchPage/></ProtectedRoute>
    
  }
])
  return (
   
   <RouterProvider router={router}/>
   
  )
}

export default App
