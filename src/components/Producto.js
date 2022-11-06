import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'

library.add(faPenToSquare);

const Producto = ({concepto, precio, unidad, imagen, linked, cantidad, setCantidad, total, setTotal, lista, setLista, id}) => {

    
    
    return (
        <>

            {/* <img src={imagen} alt="foto del producto" className='h-56 m-auto' onClick={()=>{
                    if(linked !== "#")
                        window.open(linked);
                    else return;
                }
                } /> */}

            <div className='container p-5' >
                <div className=" block  w-fit ">
                    <Link to={`/editar/${id}`} > 
                        <FontAwesomeIcon icon={faPenToSquare} color="gray" className="flex" size="lg"  />
                    </Link>
                </div>
                <h2 className='font-black text-2xl text-center text-gray-800'
                    onClick={()=>{
                        if(linked === "#")
                            return;
                        window.open(linked);
                        }
                    }
                    >{concepto}</h2>
                <p className='text-xl text-center font-black text-emerald-800'>
                    <span className='font-black'>Precio: </span>${precio} {unidad}  
                </p>
            </div>
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
                        setTotal(total + precio*Math.abs(cantidad));
                        const item = {
                            id: Date.now(),
                            concepto: concepto,
                            precio: precio,
                            cantidad: Math.abs(cantidad)
                        }

                        setLista([...lista, item]);
                        setCantidad(1);

                    }}
                    value="Agregar"
                />
            </form>

        </>
    )
}

export default Producto;