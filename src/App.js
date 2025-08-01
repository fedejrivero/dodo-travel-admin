import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout';
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Paquetes from './pages/Paquetes';
import Requisitos from './pages/Requisitos';
import AgregarPaquete from './pages/AgregarPaquete';
import Banner from './components/banner';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Banner />
            <main className="main-content">
              <Home />
            </main>
          </Layout>
        } />
        <Route path="/nosotros" element={
          <Layout>
            <main className="main-content">
              <Nosotros />
            </main>
          </Layout>
        } />
        <Route path="/contacto" element={
          <Layout>
            <main className="main-content">
              <Contacto />
            </main>
          </Layout>
        } />
        <Route path="/paquetes" element={
          <Layout>
            <main className="main-content">
              <Paquetes />
            </main>
          </Layout>
        } />
        <Route path="/requisitos" element={
          <Layout>
            <main className="main-content">
              <Requisitos />
            </main>
          </Layout>
        } />
        <Route path="/paquetes/agregar" element={
          <Layout>
            <main className="main-content">
              <AgregarPaquete />
            </main>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
