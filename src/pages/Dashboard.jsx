import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/profile/');
        setProfile(res.data);
      } catch (err) {
        setError('Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🎉 Dashboard</h2>
        {error && <p style={styles.error}>{error}</p>}
        {profile ? (
          <div style={styles.info}>
            <p style={styles.item}><span style={styles.label}>ID:</span> {profile.id}</p>
            <p style={styles.item}><span style={styles.label}>Username:</span> {profile.username}</p>
            <p style={styles.item}><span style={styles.label}>Email:</span> {profile.email}</p>
          </div>
        ) : (
          <p style={styles.loading}>Loading profile...</p>
        )}
        <button onClick={logout} style={styles.btn}>Logout</button>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1e1e2e' },
  card: { background: '#313244', padding: '2.5rem', borderRadius: '12px', width: '100%', maxWidth: '420px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' },
  title: { color: '#cdd6f4', textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.8rem' },
  info: { background: '#1e1e2e', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem' },
  item: { color: '#cdd6f4', marginBottom: '0.8rem', fontSize: '1rem' },
  label: { color: '#89b4fa', fontWeight: 'bold', marginRight: '0.5rem' },
  btn: { width: '100%', padding: '0.8rem', background: '#f38ba8', border: 'none', borderRadius: '8px', color: '#1e1e2e', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' },
  error: { color: '#f38ba8', textAlign: 'center', marginBottom: '1rem' },
  loading: { color: '#6c7086', textAlign: 'center' },
};

export default Dashboard;