import './App.css';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Reportes from './pages/Reportes';
import AgregarProducto from './pages/AgregarProducto';
import EditarProducto from './pages/EditarProducto';


function App() {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route index="/" element={<Home />} />
                    <Route path="reporte" element={<Reportes />}/>
                    <Route path="nuevo-producto" element={<AgregarProducto />} />
                    <Route path="/editar/:id" element={<EditarProducto />} />
                </Routes>
            </div> 
        </Router>
    );
}


export default App;
