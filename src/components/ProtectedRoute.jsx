import { Navigate } from 'react-router-dom';
import { Box, Progress } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box minH="100vh" bgGradient="linear(to-br, #0f111a, #151a2d, #0b0e18)" p={8}>
        <Progress size="sm" isIndeterminate colorScheme="blue" />
      </Box>
    );
  }
  if (!user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
