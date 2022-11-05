import {useState, useEffect} from 'react';
// import catalogo from "../productos.json";
import NuevoProducto from '../components/NuevoProducto.js';
import CategoriaBar from '../components/CategoriaBar.js';
import axios from 'axios';
import Alerta from '../components/Alerta.js';


const Home = () => {
    const [total, setTotal] = useState(JSON.parse(localStorage.getItem('TotalCliente')) || 0);
    const [lista, setLista] = useState(JSON.parse(localStorage.getItem('ClienteActual')) || []);
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [alerta, setAlerta] = useState({});
    const [cantidad, setCantidad] = useState(1);
    const [categ, setCateg] = useState('');

    //Guardar la lista de compra del cliente en localStorage, para evitar que se pierda al recargar la página.
    useEffect(()=>{
        localStorage.setItem('ClienteActual', JSON.stringify(lista));
        localStorage.setItem('TotalCliente', JSON.stringify(total));
    },[lista, total]);

    //Obtener los productos desde el backend
    useEffect(()=>{
        const losProductos = async ()=>{
            try {
                const {data} = await axios(`${process.env.REACT_APP_URL_BACKEND}/productos`,{
                    headers: {
                      'Content-Type': 'application/json;charset=UTF-8',
                      'Access-Control-Allow-Origin': '*'
                    }
                });
                // Organizar los datos en orden alfabetico
                data.sort((a,b) => (a.concepto > b.concepto) ? 1 : ((b.concepto > a.concepto) ? -1 : 0));
                setProductos(data);
                
            } catch (error) {
                console.log(error);
            }
    
        }
        losProductos();
    }, [])

    //Envía las compras realizadas a la base de datos y se agregarán a la página de reporte
    const finalizarCompra = async () => {
       
        const {data} = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/compra`, {
            lista, total
        });
        //Resetea el contenido de la página y muestra un mensaje con el status de la compra que desaparece después de 5 segundos
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

            {/* Barra de filtrado por categoría */}
            <div
                className="px-3 mb-2"
                onClick={e=>{setCateg(e.target.value || "")}}
            >
                <CategoriaBar />
            </div>

            <div className='absolute'>
                {msg && <Alerta alerta={alerta}/>}
            </div>

            {/* crea un objeto por cada procuto en el archivo "productos.json" */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-4 ">
                {productos.filter(prod =>{
                    if(busqueda === "" && categ ===""){
                        return prod
                    } else if(busqueda === "" && categ !== ""){
                        return prod.categoria?.toLowerCase().includes(categ.toLowerCase());
                    }
                    return (prod.concepto.toLowerCase().includes(busqueda.toLowerCase()) && prod.categoria?.toLowerCase().includes(categ.toLowerCase()));
                }).map( objeto =>  
                <div key={objeto._id} className='container mx-auto hover:bg-white bg-stone-50 rounded-xl p-2 w-full hover:shadow-lg'>
                    <NuevoProducto 
                        concepto={objeto.concepto}
                        precio={objeto.precio}
                        unidad={objeto.unidad}
                        // imagen={objeto.imagen || ''}
                        linked={objeto.linked || '#'}
                        // id={objeto._id}
                        cantidad={cantidad}
                        setCantidad={setCantidad}
                        total={total}
                        setTotal={setTotal}
                        lista={lista}
                        setLista={setLista}
                        objeto={objeto}
                    />
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
                        <span className=' text-xl ' >{elemento.cantidad} - {elemento.concepto}</span>
                        <button 
                            className='text-white font-black text-xs bg-red-600 px-2 rounded-full'
                            onClick={() => {
                                const newLista = lista.filter( ele => ele.id !== elemento.id);
                                setLista(newLista);
                                setTotal(total - elemento.precio*elemento.cantidad);
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