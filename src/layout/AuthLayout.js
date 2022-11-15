import React from 'react'
import Footer from '../components/Footer'
import Login from '../pages/Login.js'

const AuthLayout = () => {
  return (
    <div className='w-full h-full mt-10'>
        <div className=''>
            <Login />
        </div>
        <Footer />
    </div>
  )
}

export default AuthLayout