import { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
}, []);

  const register = async (data) => {
    const res = await axiosInstance.post('/register/', data);
    localStorage.setItem('access', res.data.access);
    localStorage.setItem('refresh', res.data.refresh);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    setUser(res.data.user);
  };

  const login = async (data) => {
    const res = await axiosInstance.post('/login/', data);
    localStorage.setItem('access', res.data.access);
    localStorage.setItem('refresh', res.data.refresh);

    // Fetch user profile after login
    const profileRes = await axiosInstance.get('/profile/', {
      headers: { Authorization: `Bearer ${res.data.access}` }
    });
    localStorage.setItem('user', JSON.stringify(profileRes.data));
    setUser(profileRes.data);
};

    const logout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user');
        setUser(null);
    };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};