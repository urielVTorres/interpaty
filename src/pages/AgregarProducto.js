import {useState} from 'react'
import axios from 'axios'
import Alerta from '../components/Alerta.js';

const AgregarProducto =  () => {
  const [producto, setProducto]= useState({
        concepto:'',
        precio:'',
        imagen:'',
        linked:'',
        categoria:''
  });
  const [alerta, setAlerta] = useState({});
  const handleSubmit = async e => {
    e.preventDefault();
    //Modificar el acceso de las políticas de CORS
    try {
      const {data} = await axios.post(`https://interpaty-backend-production.up.railway.app/agregar`, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*'
        },
        data: producto
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

  const {msg} = alerta;
  return (
    <div className='text-gray-800 grid md:grid-cols-2 grid-cols-1 items-center'>
      <h1 className='text-4xl font-bold text-center ' >Agregar un nuevo <span className="text-cyan-600">Producto</span></h1>
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

                {/* <label className='font-black text-2xl ' children="Imagen:"/>
                <input 
                  type="text" 
                  name="imagen"
                  placeholder='Link de la imagen'
                  className='bg-stone-200 rounded-md border-green-300 block border-2 my-2 text-xl p-2 md:w-3/4 w-full focus:bg-white'  
                  value={producto.imagen}
                  onChange={e =>{
                    setProducto({
                      ...producto,
                      [e.target.name]: e.target.value
                    })
                  }}
                /> */}
                
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
                <input 
                  type="submit" 
                  value="Agregar"
                  className='bg-rose-700 p-3 text-white font-bold uppercase rounded-md mt-4 block md:w-3/4 w-full '  
                />
            {msg && <Alerta alerta={alerta} />}
            </form>
        </div>
    </div>
  )
}

export default AgregarProducto;