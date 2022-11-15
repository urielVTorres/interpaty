import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RutaProtegida from './layout/RutaProtegida';
// import AuthLayout from './layout/AuthLayout';
// import Home from './pages/home';
// import Reportes from './pages/Reportes';
// import AgregarProducto from './pages/AgregarProducto';
import EditarProducto from './pages/EditarProducto';
// import Login from './pages/Login';
// import AuthLayout from './layout/AuthLayout';
import Signup from './pages/Signup';


function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path='/' element={<RutaProtegida />} />
                    <Route path='/editar/:id' element={<EditarProducto />} />
                    
                    <Route path='/login/signup' element={<Signup />}/>
                </Routes>
            </div> 
        </Router>
    );
}


export default App;
