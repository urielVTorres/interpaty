import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import axios from 'axios'
const RutaProtegida = () => {
  const id = localStorage.getItem('key');
  const navigate = useNavigate();
  
  useEffect(()=>{
    const isLogged = async ()=>{
        const {data} = await axios(`${process.env.REACT_APP_URL_BACKEND}/reporte`, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
          }
        });
        if(data.id !== id)
          navigate('/login');
    }
    isLogged();
  }, []);

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