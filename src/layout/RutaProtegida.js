import React, {useState} from 'react'
import Footer from '../components/Footer.js'
import Page from '../components/Page.js'
import AuthLayout from './AuthLayout.js'

const RutaProtegida = () => {
  const id = localStorage.getItem('key');
  const [mostrar, setMostrar] = useState(false);
  const [nombre]= useState(localStorage.getItem('name') || '');
  const [pagina, setPagina] = useState('Home');
  return (
    <>
      {id ? 
        <>
            <header className='container grid grid-cols-1 md:grid-cols-3 justify-center'>
                <div>
                    <h1 className="font-black text-3xl my-5 flex justify-center md:justify-start md:px-5">
                        INTER<span className=" text-rose-600">PATY</span>
                    </h1>
                    <h1 className="font-bold text-gray-800 text-xl flex justify-center md:justify-start md:px-3">
                    Bienvenido {nombre}.
                    </h1>
                </div>
                <div className='md:col-span-2 md:flex justify-end items-center text-center'>
                    <button
                        className='text-xl md:hidden bg-rose-600 w-8 h-8 rounded-sm text-white font-black border-2 border-white '
                        children={mostrar? '─':'☰'}
                        onClick={()=>{setMostrar(!mostrar)}}
                    />
                    
                    <div  className={`font-black text-sm uppercase flex flex-col md:grid md: grid-cols-4 justify-center items-center md:justify-end cursor-auto ${mostrar? 'block': 'hidden'} md:block `}>
                        <button value='AgregarProducto' onClick={(e)=>{setPagina(e.target.value)}} className='px-5 py-2 text-center w-auto' >Nuevo Producto</button>
                        <button value='Reportes' onClick={(e)=>{setPagina(e.target.value)}} className='px-5 py-2 text-center w-auto'>Reportes</button>
                        <button value='Home' onClick={(e)=>{setPagina(e.target.value)}} className='px-5 py-2 text-center  w-auto'>Nuevo Cliente</button>
                        <button value='Login' 
                        onClick={()=>{
                            localStorage.clear();
                            window.location.reload();
                        }} className='px-5 py-2 text-center  w-auto' >Cerrar Sesión</button>
                    </div>
                </div>
            </header>


          <Page page={pagina} />



          <Footer />
        </> :
          <div>
            <AuthLayout />
          </div>
      }
    </>
    
  )
}

export default RutaProtegida