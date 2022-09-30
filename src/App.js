import './App.css';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Reportes from './pages/Reportes';
import AgregarProducto from './pages/AgregarProducto';


function App() {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route index="/" element={<AgregarProducto />} />
                    <Route path="reporte" element={<Reportes />}/>
                    <Route path="nuevo-cliente" element={<Home />} />
                </Routes>
            </div> 
        </Router>
    );
}


export default App;
