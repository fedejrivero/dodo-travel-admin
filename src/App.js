import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout';
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Paquetes from './pages/Paquetes';
import Requisitos from './pages/Requisitos';
import AgregarPaquete from './pages/AgregarPaquete';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/nosotros" element={
          <Layout>
            <Nosotros />
          </Layout>
        } />
        <Route path="/contacto" element={
          <Layout>
            <Contacto />
          </Layout>
        } />
        <Route path="/paquetes" element={
          <Layout>
            <Paquetes />
          </Layout>
        } />
        <Route path="/requisitos" element={
          <Layout>
            <Requisitos />
          </Layout>
        } />
        <Route path="/paquetes/agregar" element={
          <Layout>
            <AgregarPaquete />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
