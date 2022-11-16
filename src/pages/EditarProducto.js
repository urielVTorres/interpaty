import {useState, useEffect} from 'react'
import axios from 'axios'
import Alerta from '../components/Alerta.js';
import { useNavigate } from 'react-router-dom/dist/index.js';


const EditarProducto =  () => {
    const [mostrar, setMostrar] = useState(false);
    const [nombre]= useState(localStorage.getItem('name') || '');
    const [pagina, setPagina] = useState('Editando');
    const [producto, setProducto]= useState({
            concepto:'',
            precio:'',
            imagen:'',
            linked:'',
            categoria:'',
    });
    const [alerta, setAlerta] = useState({});
    const [id, setID] = useState(localStorage.getItem("productoID") || '');
    //const ide = document.location.pathname.substr(8)
  useEffect(()=>{
    const losProductos = async ()=>{
        setID(localStorage.getItem("productoID"));
        try {
            const {data} = await axios(`https://interpaty-backend.herokuapp.com/producto/${id}`,{
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8',
                  'Access-Control-Allow-Origin': '*'
                }
            });

            setProducto(data);
            
        } catch (error) {
            console.log(error);
        }

    }
        losProductos();
}, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    //Modificar el acceso de las políticas de CORS
    console.log(producto);
    try {
      const {data} = await axios.put(`https://interpaty-backend.herokuapp.com/producto/${id}`, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        },
        data: producto
      });
      console.log(data);
      setAlerta(data);
      if(data.error){
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarProducto = async e => {
    e.preventDefault();
    //Eliminar producto
    try {
      const {data} = await axios.delete(`https://interpaty-backend.herokuapp.com/producto/${id}`, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        }
      });
      setAlerta(data);
      if(data.error){
        return;
      }
      setProducto({
        concepto:'',
        precio:'',
        imagen:'',
        linked:'',
        categoria:''
      });
    } catch (error) {
      console.log(error);
    }
  }
  const navigate = useNavigate();
  useEffect(()=>{
    if(pagina !== 'Editando')
        navigate('/');
    // eslint-disable-next-line
  },[pagina]);

  const {msg} = alerta;
  return (
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
                children={mostrar? '─':'🞡'}
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
    <div className='text-gray-800 grid md:grid-cols-2 grid-cols-1 items-center'>
      <h1 className='text-4xl font-bold text-center' >Edita el <span className="text-cyan-600">Producto</span></h1>
        <div className='container  justify-center mx-10 w-full'>
            <form className='md:col-span-2 w-4/5 justify-center' onSubmit={handleSubmit}>
                <label className='font-black text-2xl ' children="Nombre:*"/>
                <input 
                  type="text" 
                  name="concepto"
                  placeholder='Nombre del Producto'
                  className='bg-stone-200 rounded-md border-rose-300 block border-2 my-2 text-xl p-2 md:w-3/4 w-full focus:bg-white'
                  value={producto.concepto || ''}
                  onChange={e =>{
                    setProducto({
                      ...producto,
                      [e.target.name]: e.target.value
                    })
                  }}
                />

                <label className='font-black text-2xl ' children="Precio:*"/>
                <input 
                  type="number" 
                  name="precio"
                  placeholder='Precio del Producto'
                  className='bg-stone-200 rounded-md border-rose-300 block border-2 my-2 text-xl p-2 md:w-3/4 w-full focus:bg-white'
                  value={producto.precio || ''}
                  onChange={e =>{
                    setProducto({
                      ...producto,
                      [e.target.name]: e.target.value
                    })
                  }}
                />
                <label className='font-black text-2xl ' children="Categoría:*"/>
                <select  
                  name="categoria"
                  className='bg-stone-200 rounded-md border-rose-300 block border-2 my-2 text-xl p-2 md:w-3/4 w-full focus:bg-white'
                  value={producto.categoria || ''}
                  onChange={e =>{
                    setProducto({
                      ...producto,
                      [e.target.name]: e.target.value
                    })
                  }}
                >
                  <option value="">Seleccione una categoría</option>
                  <option value="tramites">Tramites</option>
                  <option value="dulces">Dulces</option>
                  <option value="papeleria">Papelería</option>
                  <option value="otros">Otros</option>
                </select>
                
                <label className='font-black text-2xl ' children="Link de la página:"/>
                <input 
                  type="text" 
                  name="linked"
                  placeholder='www.unapagina.com/hola'
                  className='bg-stone-200 rounded-md border-rose-300 block border-2 my-2 text-xl p-2 md:w-3/4 w-full focus:bg-white'  
                  value={producto.linked}
                  onChange={e =>{
                    setProducto({
                      ...producto,
                      [e.target.name]: e.target.value
                    })
                  }}
                />
                <div className='grid grid-cols-2 w-3/4'>
                    <button 
                        children="Guardar"
                        className='bg-cyan-700 p-3 text-white font-bold uppercase rounded-md mt-2 block mr-1 '
                        onClick={e => {handleSubmit(e)}}
                    />
                    <button 
                        children="Eliminar"
                        className='bg-red-700 p-3 text-white font-bold uppercase rounded-md mt-2 block ml-1 '
                        onClick={e => {eliminarProducto(e)}}
                    />
                </div>
            {msg && <Alerta alerta={alerta} />}
            </form>
        </div>
    </div>
    </>
  )
}

export default EditarProducto;