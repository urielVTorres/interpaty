import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
const RutaProtegida = () => {
  const id = localStorage.getItem('key');
  return (
    <>
      {id? 
        <>
          <Header />
          <Outlet />
          <Footer />
        </> :
          <div>
            <h1>Sorry, no has iniciado sesion</h1>
          </div>
      }
    </>
    
  )
}

export default RutaProtegida