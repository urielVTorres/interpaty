import React from 'react'
import AgregarProducto from '../pages/AgregarProducto.js';
import Reportes from '../pages/Reportes.js';
import Home from '../pages/home.js';



const Page = ({page}) => {

    if(page === 'AgregarProducto')
        return <AgregarProducto />
    else if(page === 'Reportes')
        return <Reportes />
    else if(page === 'Home')
        return <Home />

}

export default Page