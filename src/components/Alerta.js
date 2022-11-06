import React from 'react'

const Alerta = ({alerta}) => {
    if(alerta.error)
    return (
        <div className='container bg-red-800 text-white text-lg font-black text-center w-full md:w-3/4 p-3 mt-3 rounded-md' >
            <p>{alerta.msg}</p>
        </div>
    )
    return (
        <div className='container bg-rose-700 text-white text-lg font-black text-center w-full md:w-3/4 p-3 mt-3 rounded-md' >
            <p>{alerta.msg}</p>
        </div>
    )
}

export default Alerta