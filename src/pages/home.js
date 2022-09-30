import {useState, useEffect} from 'react';
// import catalogo from "../productos.json";
import NuevoProducto from '../components/productos';
import axios from 'axios';
import Alerta from '../components/Alerta.js';


const Home = () => {
    const [total, setTotal] = useState(JSON.parse(localStorage.getItem('TotalCliente')) || 0);
    const [lista, setLista] = useState(JSON.parse(localStorage.getItem('ClienteActual')) || []);
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [alerta, setAlerta] = useState({});
    // const productos = catalogo.productos;

    useEffect(()=>{
        localStorage.setItem('ClienteActual', JSON.stringify(lista));
        localStorage.setItem('TotalCliente', JSON.stringify(total));
    },[lista, total]);

    useEffect(()=>{
        const losProductos = async ()=>{
            try {
                const {data} = await axios('http://192.168.100.95:4000/productos');
                setProductos(data);
                
            } catch (error) {
                console.log(error);
            }
    
        }
        losProductos();
    }, [])

    const finalizarCompra = async () => {
        
        //Envía las compras realizadas a la base de datos y se agregarán a la página de reporte;
        const {data} = await axios.post('http://192.168.100.95:4000/compra', {
            lista, total
        });
        //Resetea el contenido de la página "Nuevo Cliente";
        setAlerta(data);
        if(data.error) return;
        localStorage.clear();
        setTotal(0);
        setLista([]);
        setTimeout(()=>{
            setAlerta({});
        },5000);
    }
    const {msg} = alerta;

    return (
        <>
        <div className=' grid md:grid-cols-3 gap-5  bg-emerald-800 p-5 rounded-2xl my-5 items-center hover:shadow-xl '>
            <h1 className=' md:col-span-2  font-black text-white text-3xl text-center '>
                Total: ${total}
            </h1>
            <input 
                type="text"
                className='rounded-lg mx-3 p-3 font-medium bg-gray-100'
                placeholder='Buscar producto'
                onChange={e => setBusqueda(e.target.value)}
            />
        </div>
        <div className='absolute'>

            {msg && <Alerta alerta={alerta}/>}
        </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-4 ">
                {/* crea un objeto por cada procuto en el archivo "productos.json" */}
                {productos.filter(prod =>{
                    if(busqueda === ""){
                        return prod
                    }
                    return prod.concepto.toLowerCase().includes(busqueda.toLowerCase());
                }).map( objeto =>  
                <div key={objeto._id} className='container mx-auto hover:bg-white bg-stone-50 rounded-xl p-2 w-full hover:shadow-lg'>
                    <NuevoProducto 
                        concepto={objeto.concepto}
                        precio={objeto.precio}
                        unidad={objeto.unidad}
                        imagen={objeto.imagen || ''}
                        linked={objeto.linked || '#'}
                    />
                    <div className='flex justify-center mb-2'>
                        <button 
                            className=' m-auto bg-emerald-900 rounded-md py-2 px-10 font-bold text-white '
                            onClick={e => {
                                e.preventDefault();
                                setTotal(total + objeto.precio);
                                const item = {
                                    id: Date.now(),
                                    concepto: objeto.concepto,
                                    precio: objeto.precio
                                }
                                setLista([...lista, item]);
                            }}
                        >Agregar</button>
                    </div>
                </div>
                )}
            </div>
            {/* Crea una lista con los productos agregados. */}
            {!lista.length? <> </> : 
            <div className='container resize-y  bg-lime-200 text-green-900 font-bold w-80 h-36 p-2 rounded-xl sticky bottom-8 opacity-90 -inset-3/4 overflow-auto hover:shadow-xl'>
                <button
                    className=" bg-green-700 text-white p-2 w-full rounded-md hover:bg-green-900"
                    children="Finalizar Compra"
                    onClick={finalizarCompra}
                />
                <ul >
                    {lista.map( (elemento,index) => <li key={index} className='flex justify-between shadow-lg p-2 rounded '>
                        <span className=' text-xl ' >{elemento.concepto}</span>
                        <button 
                            className='text-white font-black text-xs bg-red-600 px-2 rounded-full'
                            onClick={() => {
                                const newLista = lista.filter( ele => ele.id !== elemento.id);
                                setLista(newLista);
                                setTotal(total - elemento.precio);
                            }}
                        >╳</button>
                    </li>)}
                </ul>
            </div>
            }
        </>
    );
}

export default Home