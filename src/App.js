import './App.css';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Reportes from './pages/Reportes';
import AgregarProducto from './pages/AgregarProducto';
import EditarProducto from './pages/EditarProducto';
import RutaProtegida from './layout/RutaProtegida';
import Login from './pages/Login';
import AuthLayout from './layout/AuthLayout';


function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path='/' element={<RutaProtegida />}>
                        <Route index element={<Home />} />
                        <Route path="reporte" element={<Reportes />}/>
                        <Route path="nuevo-producto" element={<AgregarProducto />} />
                        <Route path="/editar/:id" element={<EditarProducto />} />
                    </Route>
                    <Route path='/login' element={<AuthLayout />} >
                        <Route index element={<Login />} />
                    </Route>

                </Routes>
            </div> 
        </Router>
    );
}


export default App;
