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
    const [cantidad, setCantidad] = useState(1);
    const [categ, setCateg] = useState('');
    // const [ID, setId] = useState('');
    
    // useEffect(()=>{

    //     const eliminarProducto = async (ID)=>{
    //         console.log(ID);
    //         if(ID==='') return;
    //         try {
    //             const {data} = await axios.delete(`${process.env.REACT_APP_URL_BACKEND}/productos`, {id:ID});
    //             console.log(data);
                
    //         } catch (error) {
    //             console.log(error);
    //         }
    //         setId('');
    
    //     }
    //     eliminarProducto();
    // },[ID])


    useEffect(()=>{
        localStorage.setItem('ClienteActual', JSON.stringify(lista));
        localStorage.setItem('TotalCliente', JSON.stringify(total));
    },[lista, total]);

    useEffect(()=>{
        const losProductos = async ()=>{
            try {
                const {data} = await axios(`${process.env.REACT_APP_URL_BACKEND}/productos`);
                setProductos(data);
                
            } catch (error) {
                console.log(error);
            }
    
        }
        losProductos();
    }, [])

    const finalizarCompra = async () => {
        console.log(lista);
        //Envía las compras realizadas a la base de datos y se agregarán a la página de reporte;
        const {data} = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/compra`, {
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
        <div
            className="px-3 mb-2"
            onClick={e=>{setCateg(e.target.value)}}
        >
            <button
                type='button'
                value=''
                children='Todo'
                className="px-2 py-1 mr-2 hover:bg-emerald-800 hover:text-white font-bold text-md text-gray-800 rounded-xl"
                
            />
            <button
                type='button'
                value='tramites'
                children='Tramites'
                className="px-2 py-1 mr-2 hover:bg-emerald-800 hover:text-white font-bold text-md text-gray-800 rounded-xl"
            />
            <button
                type='button'
                value='dulces'
                children='Dulces'
                className="px-2 py-1 mr-2 hover:bg-emerald-800 hover:text-white font-bold text-md text-gray-800 rounded-xl"
            />
            <button
                type='button'
                value='papeleria'
                children='Papelería'
                className="px-2 py-1 mr-2 hover:bg-emerald-800 hover:text-white font-bold text-md text-gray-800 rounded-xl"
            />
            <button
                type='button'
                value='otros'
                children='Otros'
                className="px-2 py-1 mr-2 hover:bg-emerald-800 hover:text-white font-bold text-md text-gray-800 rounded-xl"
            />

        </div>
        <div className='absolute'>

            {msg && <Alerta alerta={alerta}/>}
        </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-4 ">
                {/* crea un objeto por cada procuto en el archivo "productos.json" */}
                {productos.filter(prod =>{
                    if(busqueda === "" && categ ===""){
                        return prod
                    } else if(busqueda === "" && categ !== ""){
                        return prod.categoria?.toLowerCase().includes(categ.toLowerCase());
                    }
                    return (prod.concepto.toLowerCase().includes(busqueda.toLowerCase()) && prod.categoria?.toLowerCase().includes(categ.toLowerCase()));
                }).map( objeto =>  
                <div key={objeto._id} className='container mx-auto hover:bg-white bg-stone-50 rounded-xl p-2 w-full hover:shadow-lg'>
                    {/* <input
                    type="submit"
                    value="✕"
                    className='font-bold text-gray-600 text-lg hover:cursor-pointer'
                    onClick={()=>{setId(objeto._id)}}
                    /> */}
                    <NuevoProducto 
                        concepto={objeto.concepto}
                        precio={objeto.precio}
                        unidad={objeto.unidad}
                        // imagen={objeto.imagen || ''}
                        // linked={objeto.linked || '#'}
                        // id={objeto._id}
                    />
                    <form className='container grid grid-cols-2 mb-2'>
                        <input 
                            type="number"
                            placeholder='Cantidad'
                            className="font-semibold text-lg px-3 rounded-md bg-gray-100 w-auto mx-3 border-2"
                            onChange={e => {
                                setCantidad(e.target.value); 
                            }}
                            onBlurCapture={e=>
                                e.target.value=null
                            }
                        />
                        <input 
                            className=' m-auto bg-emerald-900 rounded-md py-2 px-10 font-bold text-white '
                            type="submit"
                            onClick={e => {
                                e.preventDefault();
                                setTotal(total + objeto.precio*cantidad);
                                const item = {
                                    id: Date.now(),
                                    concepto: objeto.concepto,
                                    precio: objeto.precio,
                                    cantidad
                                }

                                setLista([...lista, item]);
                                setCantidad(1);

                            }}
                            value="Agregar"
                        />
                    </form>
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