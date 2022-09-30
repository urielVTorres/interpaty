import {useState, useEffect} from 'react';
import axios from 'axios';

const Reportes = () => {
    const [fecha, setFecha] = useState("hola");
    const [reportes, setReportes] = useState([]);
    const [dinero, setDinero] = useState(0);
    useEffect(()=>{
        const buscarReportes = async () =>{
            try {
                const {data} = await axios("http://192.168.100.95:4000/reporte");
                setReportes(data);
                console.log("reportado");
            } catch (error) {
                console.log(error);
            }
        }
        buscarReportes();

    }, []);
    console.log(fecha);
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
                {reportes.filter( reporte => {
                    if(fecha === "") return []
                    return reporte.fecha.toString().includes(fecha);
                }).map( (venta, index) => {
                return(
                    <div key={venta._id} className="m-3 bg-white p-2 font-arial text-2xl shadow-md ">
                        <p className="flex justify-between items-center">
                            <span className='px-5 font-black'>{index+1}</span > 
                            <span className='px-5 font-bold text-emerald-800'>{venta.fecha.toLocaleString('es-MX')}</span >
                            <span className='px-5 font-black text-emerald-800'>${venta.total}</span >
                            <button className='bg-emerald-600 p-2 mx-5 rounded-md text-white text-lg font-bold'>Ver detalles</button>
                        </p>
                    </div>
                )} )
                
                }
            </div>

        </>
    )
}

export default Reportes