import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>🔐 JWT Auth</Link>
      <div style={styles.links}>
        {user ? (
          <>
            <span style={styles.username}>👤 {user.username}</span>
            <button onClick={logout} style={styles.btn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: '#1e1e2e', color: '#fff' },
  brand: { color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' },
  links: { display: 'flex', alignItems: 'center', gap: '1rem' },
  link: { color: '#cdd6f4', textDecoration: 'none' },
  username: { color: '#a6e3a1' },
  btn: { background: '#f38ba8', border: 'none', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer', color: '#fff' },
};

export default Navbar;