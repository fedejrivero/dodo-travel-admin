import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout';
import Home from './pages/Home';
import PageA from './pages/Nosotros';
import PageB from './pages/Contacto';
import PageC from './pages/Paquetes';
import PageD from './pages/Requisitos';
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
            <PageA />
          </Layout>
        } />
        <Route path="/contacto" element={
          <Layout>
            <PageB />
          </Layout>
        } />
        <Route path="/paquetes" element={
          <Layout>
            <PageC />
          </Layout>
        } />
        <Route path="/requisitos" element={
          <Layout>
            <PageD />
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
