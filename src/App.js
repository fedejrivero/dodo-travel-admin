import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/auth/Login';
import './App.css';
import Layout from './components/layout';
import Trip from './pages/trips/Trip';
import Trips from './pages/trips/Trips';

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading-container">Cargando...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/" replace /> : <Login />
      } />
      
      <Route path="/" element={
        <ProtectedRoute>
          <Layout>
            <main className="main-content">
              <Trips />
            </main>
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/paquetes" element={
        <ProtectedRoute>
          <Layout>
            <main className="main-content">
              <Trips />
            </main>
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/paquete/nuevo" element={
        <ProtectedRoute>
          <Layout>
            <main className="main-content">
              <Trip />
            </main>
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/paquete/:id" element={
        <ProtectedRoute>
          <Layout>
            <main className="main-content">
              <Trip />
            </main>
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
