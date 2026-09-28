import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';
import { useUserAuth } from '../context/UserAuthContext';

const Navbar = () => {

    
    const {navigate, token} = useAppContext()
    const { user, userToken, logout } = useUserAuth() 

  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
      <img onClick={()=>navigate('/')} src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' />
      
      <div className='flex items-center gap-3'>

    {userToken ? (
        <>
            <span className='text-sm text-gray-600'>
                Hi, {user?.name}
            </span>

            <button
                onClick={logout}
                className='text-sm cursor-pointer border border-gray-300 rounded-full px-5 py-2'
            >
                Logout
            </button>
        </>
    ) : (
        <>
            <button
                onClick={() => navigate('/login')}
                className='text-sm cursor-pointer text-gray-600'
            >
                Login
            </button>

            <button
                onClick={() => navigate('/register')}
                className='text-sm cursor-pointer bg-primary text-white rounded-full px-6 py-2.5'
            >
                Register
            </button>
        </>
    )}

    {token && (
        <button
            onClick={() => navigate('/admin')}
            className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2.5'
        >
            Admin Panel
            <img src={assets.arrow} className='w-3' alt="arrow" />
        </button>
    )}

</div>
      
    </div>
  )
}

export default Navbar
