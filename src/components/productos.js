const NuevoProducto = ({concepto, precio, unidad, imagen, linked}) => {

    
    
    return (
        <>

            {/* <img src={imagen} alt="foto del producto" className='h-56 m-auto' onClick={()=>{
                    if(linked !== "#")
                        window.open(linked);
                    else return;
                }
                } /> */}

            <div className='container p-5'>
                
                <h2 className='font-black text-2xl text-center text-gray-800'
                    onClick={()=>{
                        if(linked !== "#")
                            window.open(linked);
                        else return;
                    }
                    }
                    >{concepto}</h2>
                <p className='text-xl text-center font-black text-emerald-800'>
                    <span className='font-black'>Precio: </span>${precio} {unidad}  
                </p>
            </div>

        </>
    )
}

export default NuevoProducto;