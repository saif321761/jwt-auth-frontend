import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid credentials');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} name="username" placeholder="Username" onChange={handleChange} required />
          <input style={styles.input} name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <button style={styles.btn} type="submit">Login</button>
        </form>
        <p style={styles.footer}>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1e1e2e' },
  card: { background: '#313244', padding: '2.5rem', borderRadius: '12px', width: '100%', maxWidth: '420px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' },
  title: { color: '#cdd6f4', textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.8rem' },
  input: { width: '93%', padding: '0.8rem 1rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #45475a', background: '#1e1e2e', color: '#cdd6f4', fontSize: '1rem' },
  btn: { width: '100%', padding: '0.8rem', background: '#89b4fa', border: 'none', borderRadius: '8px', color: '#1e1e2e', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' },
  error: { color: '#f38ba8', textAlign: 'center', marginBottom: '1rem' },
  footer: { color: '#6c7086', textAlign: 'center', marginTop: '1rem' },
};

export default Login;