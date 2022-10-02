import {useState, useEffect} from 'react';
import axios from 'axios';


const Reportes = () => {
    const [fecha, setFecha] = useState("hola");
    const [reportes, setReportes] = useState([]);
    const [dinero, setDinero] = useState(0);
    const [detalle, setDetalle] = useState([]);
    const [mostrar, setMostrar] = useState(false);
    useEffect(()=>{
        const buscarReportes = async () =>{
            try {
                const {data} = await axios("http://192.168.100.95:4000/reporte");
                setReportes(data);
            } catch (error) {
                console.log(error);
            }
        }
        buscarReportes();

    }, []);
    useEffect(()=>{
        let money = 0;
        setDinero(0);
        const reporte = reportes.filter( reporte => {
            return reporte.fecha.toString().includes(fecha);
        })
        reporte.forEach(repo =>{
            money = money + repo.total
        });
        setDinero(money);
    }, [fecha, reportes])

    useEffect(()=>{
        if(detalle.length)
            setMostrar(true);
        else
            setMostrar(false);
    }, [detalle])


    return (
        <>
            <div className='text-lg m-10 text-gray-900 '>
                <form className='grid grid-cols-1 md:grid-cols-4 text-center items-center'>
                    <h1 className='font-bold text-4xl md:col-span-2'>Reportes</h1>
                    <input className='mx-auto my-3 p-3 bg-white border-2 border-lime-400 rounded-md w-full' 
                    type="date" 
                    onChange={e => {
                        setFecha(e.target.value.toString());
                        }}/>
                    <span  className='bg-emerald-600 text-white font-bold p-3 mx-2 w-full rounded-md'>Total: ${dinero}</span>
                </form>
            </div>
            <div className='text-2xl grid grid-cols-1 mx-auto text-center w-3/4 '>
            {mostrar ? 
                (
                    <div className='container resize-y  bg-lime-200 text-green-900 font-bold w-full h-36 text-lg p-2 rounded-xl opacity-90 -inset-3/4 overflow-auto hover:shadow-xl'>
                        <button 
                        className='bg-green-700 text-white p-2 w-full rounded-md hover:bg-green-900'
                        onClick={()=>{setDetalle([])}} >Cerrar</button>
                        {detalle.map( objeto => (
                            <p key={objeto._id}
                            className='grid grid-cols-3 shadow-lg py-1 px-10  rounded '
                            >
                                <span>{objeto.cantidad} - {objeto.concepto}</span> <span>{`${objeto.precio} ${objeto.unidad}`}</span> <span> Total: ${objeto.cantidad*objeto.precio} </span> 
                            </p>            
                        ))}
                    </div>
                ) : <></>}
                {reportes.filter( reporte => {
                    if(fecha === "") return []
                    return reporte.fecha.toString().includes(fecha);
                }).map( (venta, index) => {
                return(
                    <div key={venta._id} className="m-3 bg-white p-2 font-arial text-2xl shadow-md ">
                        <p className="flex justify-between items-center">
                            <span className='px-5 font-black'>{index+1}</span > 
                            <span className='px-5 font-bold text-emerald-800'>{venta.fecha.toLocaleString('es-MX').slice(11,-5)}, {venta.fecha.toLocaleString('es-MX').slice(0,10)}</span >
                            <span className='px-5 font-black text-emerald-800'>${venta.total}</span >
                            <button 
                                className='bg-emerald-600 p-2 mx-5 rounded-md text-white text-lg font-bold'
                                onClick={()=>{setDetalle(venta.lista)
                                console.log(detalle)}}    
                            >Ver detalles</button>
                        </p>
                    </div>
                )} )
                
                }
            </div>

        </>
    )
}

export default Reportes