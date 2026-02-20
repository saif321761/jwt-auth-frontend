import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import GalaxyBackground from '../components/GalaxyBackground';

const Home = () => {
  const { user } = useAuth();

  // Theme colors
  const gradientFrom = useColorModeValue('purple.500', 'purple.400');
  const gradientTo = useColorModeValue('purple.400', 'purple.500');
  
  // Text colors
  const headingColor = useColorModeValue('purple.700', 'white');
  const headingShadow = useColorModeValue(
    '0 0 20px rgba(168, 85, 247, 0.3)',
    '0 0 20px rgba(168, 85, 247, 0.5)'
  );
  const textColor = useColorModeValue('gray.600', 'gray.300');
  
  // Card colors
  const cardBg = useColorModeValue(
    'rgba(255, 255, 255, 0.8)',
    'rgba(18, 24, 39, 0.7)'
  );
  const cardBorder = useColorModeValue(
    'rgba(168, 85, 247, 0.2)',
    'rgba(168, 85, 247, 0.2)'
  );
  const cardShadow = useColorModeValue(
    '0 20px 60px rgba(168, 85, 247, 0.15)',
    '0 20px 60px rgba(0, 0, 0, 0.35)'
  );
  
  // Feature item colors
  const itemBg = useColorModeValue(
    'rgba(255, 255, 255, 0.9)',
    'rgba(15, 19, 34, 0.7)'
  );
  const itemBorder = useColorModeValue(
    'rgba(168, 85, 247, 0.15)',
    'rgba(168, 85, 247, 0.2)'
  );
  const itemTitleColor = useColorModeValue('purple.700', 'white');
  const itemDescColor = useColorModeValue('gray.600', 'gray.400');
  
  // Button colors
  const outlineBtnBorder = useColorModeValue('purple.400', 'purple.400');
  const outlineBtnHoverBg = useColorModeValue(
    'rgba(168, 85, 247, 0.05)',
    'rgba(168, 85, 247, 0.1)'
  );
  const buttonShadow = useColorModeValue(
    '0 10px 25px -5px rgba(168, 85, 247, 0.4)',
    '0 10px 25px -5px rgba(0, 0, 0, 0.6)'
  );

  const features = [
    {
      title: "Create roles in minutes",
      description: "Add title, location, salary, and status."
    },
    {
      title: "Track progress",
      description: "Open, in progress, or closed — always clear."
    },
    {
      title: "Secure by default",
      description: "JWT auth keeps your data protected."
    }
  ];

  return (
    <Box minH="100vh" position="relative" overflow="hidden">
      {/* Custom Galaxy Background */}
      <GalaxyBackground />

      {/* Content Overlay */}
      <Container 
        maxW="1100px" 
        py={12}
        position="relative"
        zIndex={1}
      >
        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          align="center" 
          justify="space-between" 
          gap={10}
        >
          {/* Left Content */}
          <Box flex="1">
            <Heading 
              size="2xl" 
              lineHeight="1.1" 
              mb={4}
              color={headingColor}
              textShadow={headingShadow}
            >
              Hire faster with a clean job hub
            </Heading>
            <Text color={textColor} fontSize="lg" mb={6}>
              Post jobs, track status, and manage your listings in a modern, secure dashboard.
            </Text>
            <HStack spacing={4} flexWrap="wrap" gap={2}>
              {user ? (
                <>
                  <Button
                    as={RouterLink}
                    to="/dashboard"
                    bgGradient={`linear(135deg, ${gradientFrom}, ${gradientTo})`}
                    color="white"
                    _hover={{
                      bgGradient: `linear(135deg, ${gradientTo}, ${gradientFrom})`,
                      transform: 'translateY(-2px)',
                      boxShadow: buttonShadow,
                    }}
                    size="lg"
                  >
                    Go to Dashboard
                  </Button>
                  <Button
                    as={RouterLink}
                    to="/jobs"
                    variant="outline"
                    borderColor={outlineBtnBorder}
                    color={headingColor}
                    _hover={{
                      bg: outlineBtnHoverBg,
                      borderColor: gradientFrom,
                      transform: 'translateY(-2px)',
                    }}
                    size="lg"
                  >
                    View Jobs
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    as={RouterLink}
                    to="/login"
                    bgGradient={`linear(135deg, ${gradientFrom}, ${gradientTo})`}
                    color="white"
                    _hover={{
                      bgGradient: `linear(135deg, ${gradientTo}, ${gradientFrom})`,
                      transform: 'translateY(-2px)',
                      boxShadow: buttonShadow,
                    }}
                    size="lg"
                  >
                    Login
                  </Button>
                  <Button
                    as={RouterLink}
                    to="/register"
                    variant="outline"
                    borderColor={outlineBtnBorder}
                    color={headingColor}
                    _hover={{
                      bg: outlineBtnHoverBg,
                      borderColor: gradientFrom,
                      transform: 'translateY(-2px)',
                    }}
                    size="lg"
                  >
                    Create Account
                  </Button>
                </>
              )}
            </HStack>
          </Box>
          
          {/* Feature Cards */}
          <Box 
            flex="1" 
            bg={cardBg}
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor={cardBorder}
            borderRadius="20px" 
            p={8} 
            boxShadow={cardShadow}
          >
            <Text 
              color={useColorModeValue('purple.600', 'purple.300')} 
              mb={3} 
              fontWeight="600"
            >
              ✨ What you can do
            </Text>
            
            {features.map((item, index) => (
              <Box 
                key={index}
                bg={itemBg}
                border="1px solid"
                borderColor={itemBorder}
                borderRadius="12px" 
                p={4} 
                mb={index < features.length - 1 ? 4 : 0}
                backdropFilter="blur(5px)"
                transition="all 0.3s ease"
                _hover={{
                  transform: 'translateX(5px)',
                  borderColor: gradientFrom,
                  boxShadow: useColorModeValue(
                    '0 0 20px rgba(168, 85, 247, 0.2)',
                    '0 0 20px rgba(168, 85, 247, 0.3)'
                  ),
                }}
              >
                <Text fontWeight="600" color={itemTitleColor}>
                  {item.title}
                </Text>
                <Text color={itemDescColor} fontSize="sm">
                  {item.description}
                </Text>
              </Box>
            ))}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Home;