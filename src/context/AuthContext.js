import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// const API_URL = 'http://localhost:5001/api';
const API_URL = 'https://srv942210.hstgr.cloud/api';
axios.defaults.baseURL = API_URL;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          // Set auth token in axios headers
          axios.defaults.headers.common['x-auth-token'] = token;
          
          // Fetch user data
          const response = await axios.get(`${API_URL}/auth/me`);
          setUser(response.data);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid token
        delete axios.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Axios interceptor to catch 401 and force logout
    const interceptorId = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          delete axios.defaults.headers.common['x-auth-token'];
          localStorage.removeItem('token');
          setUser(null);
          if (window.location.pathname !== '/login') {
            navigate('/login');
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptorId);
    };
  }, [navigate]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      
      // Save token to localStorage and axios headers
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['x-auth-token'] = token;
      
      // Update user state
      setUser(user);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred during login';
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear auth state
      delete axios.defaults.headers.common['x-auth-token'];
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
