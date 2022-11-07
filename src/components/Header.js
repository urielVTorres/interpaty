import {useState} from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [mostrar, setMostrar] = useState(false);
  return (
    <header className='container grid grid-cols-1 md:grid-cols-3 justify-center'>
        <h1 className="font-black text-3xl my-5 flex justify-center md:justify-start md:px-5">
            INTER<span className=" text-rose-600">PATY</span>
        </h1>
        <div className='md:col-span-2 md:flex justify-end items-center text-center'>
          <button
            className='text-xl md:hidden bg-rose-600 w-8 h-8 rounded-sm text-white font-black border-2 border-white '
            children={mostrar? '─':'🞡'}
            onClick={()=>{setMostrar(!mostrar)}}
          />
          
          <nav className={`font-black text-sm uppercase flex flex-col md:flex-row justify-center items-center md:justify-end cursor-auto ${mostrar? 'block': 'hidden'} md:block `}>
              <Link to="/nuevo-producto" className='px-5 py-2 text-center w-auto' >Nuevo Producto</Link>
              <Link to="/reporte" className='px-5 py-2 text-center w-auto'>Reportes</Link>
              <Link to="/" className='px-5 py-2 text-center  w-auto'>Nuevo Cliente</Link>
              <Link to="/login" className='px-5 py-2 text-center  w-auto'>Cerrar Sesión</Link>
          </nav>
        </div>
    </header>
  )
}

export default Header