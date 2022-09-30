import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className='container grid grid-cols-1 md:grid-cols-2'>
        <h1 className="font-black text-3xl my-5 flex justify-center md:justify-start md:px-5">
            INTER<span className=" text-lime-600">PATY</span>
        </h1>
        <nav className=" font-black text-md uppercase flex justify-between items-center md:justify-end cursor-auto">
            <Link to="/" className='px-5 text-center  w-1/3 md:w-auto' >Inicio</Link>
            <Link to="/reporte" className='px-5 text-center w-1/3 md:w-auto'>Reportes</Link>
            <Link to="/nuevo-cliente" className='px-5 text-center  w-1/3 md:w-auto'>Nuevo Cliente</Link>
        </nav>
    </header>
  )
}

export default Header