import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Flex, 
  HStack, 
  Button, 
  Text, 
  Avatar, 
  Link, 
  useColorModeValue 
} from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, logout } = useAuth();
  
  // Color mode values
  const bgColor = useColorModeValue('white', '#0f111a');
  const borderColor = useColorModeValue('purple.100', 'purple.800');
  const textColor = useColorModeValue('purple.600', 'purple.300');
  const hoverColor = useColorModeValue('purple.700', 'purple.400');
  const badgeBg = useColorModeValue('purple.50', 'purple.800');
  const badgeText = useColorModeValue('purple.700', 'purple.300');
  const gradientFrom = useColorModeValue('purple.500', 'purple.400');
  const gradientTo = useColorModeValue('purple.400', 'purple.500');
  const buttonHoverBg = useColorModeValue('purple.50', 'purple.800');
  const boxShadow = useColorModeValue(
    '0 4px 20px rgba(168, 85, 247, 0.03)', 
    '0 4px 20px rgba(0, 0, 0, 0.3)'
  );
  const backdropBg = useColorModeValue(
    'rgba(255, 255, 255, 0.9)', 
    'rgba(15, 17, 26, 0.9)'
  );

  return (
    <Box 
      bg={bgColor} 
      borderBottom="1px solid" 
      borderColor={borderColor}
      boxShadow={boxShadow}
      position="sticky"
      top={0}
      zIndex={10}
      backdropFilter="blur(10px)"
      backgroundColor={backdropBg}
    >
      <Flex 
        maxW="1280px" 
        mx="auto" 
        px={{ base: 4, md: 8 }} 
        py={3} 
        align="center" 
        justify="space-between"
      >
        <Link 
          as={RouterLink} 
          to="/" 
          _hover={{ textDecoration: 'none' }}
          display="flex"
          alignItems="center"
        >
          <Box
            bgGradient={`linear(135deg, ${gradientFrom}, ${gradientTo})`}
            borderRadius="lg"
            p={2}
            mr={3}
            boxShadow="md"
          >
            <Text fontSize="lg" fontWeight="800" color="white" lineHeight={1}>
              JWT
            </Text>
          </Box>
          <Text 
            fontSize="xl" 
            fontWeight="800" 
            letterSpacing="-0.5px"
            bgGradient={`linear(135deg, ${gradientFrom}, ${gradientTo})`}
            bgClip="text"
          >
            Suite
          </Text>
        </Link>
        
        <HStack spacing={4}>
          <ThemeToggle />
          
          {user ? (
            <>
              <HStack spacing={1} mr={2}>
                <Avatar 
                  size="xs" 
                  name={user.username} 
                  bgGradient={`linear(135deg, ${gradientFrom}, ${gradientTo})`}
                  color="white"
                />
                <Text 
                  fontSize="sm" 
                  fontWeight="600" 
                  color={badgeText}
                  bg={badgeBg}
                  px={3}
                  py={1.5}
                  borderRadius="full"
                >
                  {user.username}
                </Text>
              </HStack>
              
              <Link
                as={RouterLink}
                to="/dashboard"
                fontSize="sm"
                fontWeight="600"
                color={textColor}
                position="relative"
                _hover={{
                  color: hoverColor,
                  textDecoration: 'none',
                  _after: {
                    width: '100%',
                  }
                }}
                _after={{
                  content: '""',
                  position: 'absolute',
                  width: '0%',
                  height: '2px',
                  bottom: '-4px',
                  left: '0',
                  bg: gradientFrom,
                  transition: 'width 0.2s ease',
                }}
              >
                Dashboard
              </Link>
              
              <Link
                as={RouterLink}
                to="/jobs"
                fontSize="sm"
                fontWeight="600"
                color={textColor}
                position="relative"
                _hover={{
                  color: hoverColor,
                  textDecoration: 'none',
                  _after: {
                    width: '100%',
                  }
                }}
                _after={{
                  content: '""',
                  position: 'absolute',
                  width: '0%',
                  height: '2px',
                  bottom: '-4px',
                  left: '0',
                  bg: gradientFrom,
                  transition: 'width 0.2s ease',
                }}
              >
                Jobs
              </Link>
              
              <Button
                size="sm"
                variant="ghost"
                colorScheme="purple"
                onClick={logout}
                fontSize="sm"
                fontWeight="600"
                _hover={{
                  bg: buttonHoverBg,
                }}
                borderRadius="full"
                px={4}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                as={RouterLink}
                to="/jobs"
                fontSize="sm"
                fontWeight="600"
                color={textColor}
                _hover={{ color: hoverColor, textDecoration: 'none' }}
              >
                Jobs
              </Link>
              <Link
                as={RouterLink}
                to="/login"
                fontSize="sm"
                fontWeight="600"
                color={textColor}
                _hover={{ color: hoverColor, textDecoration: 'none' }}
              >
                Login
              </Link>
              <Button
                as={RouterLink}
                to="/register"
                size="sm"
                bgGradient={`linear(135deg, ${gradientFrom}, ${gradientTo})`}
                color="white"
                _hover={{
                  bgGradient: `linear(135deg, ${gradientTo}, ${gradientFrom})`,
                  transform: 'translateY(-1px)',
                  boxShadow: 'lg',
                }}
                borderRadius="full"
                px={6}
                fontWeight="600"
                fontSize="sm"
              >
                Get Started
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
