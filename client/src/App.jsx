import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Register from './pages/Register'
import UserLogin from './pages/Login'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'
import Login from './components/admin/Login'
import PageTransition from './components/PageTransition'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

const App = () => {
 
  const {token} = useAppContext()
  const location = useLocation()

  return (
    <div>
    <Toaster/>

    <Routes location={location}>

            <Route
    path='/'
    element={
        <PageTransition transitionKey={location.pathname}>
            <Home/>
        </PageTransition>
    }
/>

<Route
    path='/blog/:id'
    element={
        <PageTransition transitionKey={location.pathname}>
            <Blog/>
        </PageTransition>
    }
/>

<Route
    path='/register'
    element={
        <PageTransition transitionKey={location.pathname}>
            <Register/>
        </PageTransition>
    }
/>

<Route
    path='/login'
    element={
        <PageTransition transitionKey={location.pathname}>
            <UserLogin/>
        </PageTransition>
    }
/>

            <Route path='/admin' element={token ? <Layout/> : <Login/>}>
                <Route index element={<Dashboard/>}/>
                <Route path='addBlog' element={<AddBlog/>}/>
                <Route path='listBlog' element={<ListBlog/>}/>
                <Route path='comments' element={<Comments/>}/>
            </Route>

        </Routes>
    </div>

  )
}

export default App
