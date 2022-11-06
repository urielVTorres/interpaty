import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='container grid grid-cols-1 md:grid-cols-3'>
        <h1 className="font-black text-3xl my-5 flex justify-center md:justify-start md:px-5">
            INTER<span className=" text-lime-600">PATY</span>
        </h1>
        <nav className=" font-black text-sm uppercase flex justify-between items-center md:justify-end cursor-auto md:col-span-2">
            <Link to="/nuevo-producto" className='px-5 text-center  w-1/3 md:w-auto' >Nuevo Producto</Link>
            <Link to="/reporte" className='px-5 text-center w-1/3 md:w-auto'>Reportes</Link>
            <Link to="/" className='px-5 text-center  w-1/3 md:w-auto'>Nuevo Cliente</Link>
            {/* <Link to="/login" className='px-5 text-center  w-1/3 md:w-auto'>Cerrar Sesión</Link> */}
        </nav>
    </header>
  )
}

export default Header