import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import PageA from './pages/PageA';
import PageB from './pages/PageB';
import PageC from './pages/PageC';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/a" element={
          <Layout>
            <PageA />
          </Layout>
        } />
        <Route path="/b" element={
          <Layout>
            <PageB />
          </Layout>
        } />
        <Route path="/c" element={
          <Layout>
            <PageC />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
