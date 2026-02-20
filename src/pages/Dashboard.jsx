import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  VStack,
  Avatar,
  Divider,
  SimpleGrid,
  Icon,
  useToast,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaSignOutAlt, FaUser, FaIdBadge, FaEnvelope, FaCalendar, FaShieldAlt } from 'react-icons/fa';
import axiosInstance from '../api/axios';
import useAuth from '../hooks/useAuth';
import { useThemeColors } from '../hooks/useColorModeValues';

const Dashboard = () => {
  const { logout } = useAuth();
  const toast = useToast();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Use theme colors hook
  const {
    bgPrimary,
    bgSecondary,
    bgTertiary,
    borderColor,
    borderColorHover,
    textPrimary,
    textSecondary,
    textPurple,
    cardShadow,
    decorativeBg1,
    decorativeBg2,
    badgeBg,
    badgeText,
    gradientFrom,
    gradientTo,
  } = useThemeColors();

  // Additional color mode values
  const statBg = useColorModeValue('white', '#121827');
  const errorBg = useColorModeValue('red.50', 'red.900');
  const errorBorder = useColorModeValue('red.200', 'red.700');
  const errorText = useColorModeValue('red.600', 'red.200');
  const progressBg = useColorModeValue('purple.50', 'purple.900');
  const progressText = useColorModeValue('purple.500', 'purple.300');
  const dividerColor = useColorModeValue('purple.100', 'purple.800');
  const avatarShadow = useColorModeValue(
    '0 10px 25px -5px rgba(168, 85, 247, 0.4)',
    '0 10px 25px -5px rgba(0, 0, 0, 0.6)'
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/auth/profile/');
        setProfile(res.data);
      } catch (err) {
        setError('Failed to load profile');
        toast({
          title: 'Error loading profile',
          description: 'Could not fetch your profile information',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [toast]);

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out successfully',
      description: 'You have been logged out of your account',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

  // Get initials from username for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box bg={bgPrimary} minH="100vh" py={10}>
      {/* Decorative background elements - theme aware */}
      <Box
        position="fixed"
        top="10%"
        right="5%"
        w="400px"
        h="400px"
        bg={decorativeBg1}
        borderRadius="full"
        filter="blur(100px)"
        opacity="0.3"
        zIndex={0}
        pointerEvents="none"
      />
      <Box
        position="fixed"
        bottom="10%"
        left="5%"
        w="350px"
        h="350px"
        bg={decorativeBg2}
        borderRadius="full"
        filter="blur(90px)"
        opacity="0.3"
        zIndex={0}
        pointerEvents="none"
      />

      <Container maxW="1000px" position="relative" zIndex={1}>
        <Flex 
          direction={{ base: 'column', sm: 'row' }}
          justify="space-between" 
          align={{ base: 'start', sm: 'center' }} 
          mb={8}
          gap={4}
        >
          <Box>
            <Heading 
              as="h1" 
              size="xl" 
              fontWeight="800" 
              letterSpacing="-1px"
              bgGradient={`linear(135deg, ${gradientFrom}, ${gradientTo})`}
              bgClip="text"
              mb={2}
            >
              Dashboard
            </Heading>
            <Text color={textSecondary} fontSize="md">
              Welcome back! View your account details and statistics
            </Text>
          </Box>
          
          <Button
            onClick={handleLogout}
            size="lg"
            variant="outline"
            borderColor={borderColor}
            color={textPurple}
            leftIcon={<FaSignOutAlt />}
            _hover={{
              bg: bgTertiary,
              borderColor: borderColorHover,
              transform: 'translateY(-2px)',
            }}
            _active={{
              bg: badgeBg,
              transform: 'translateY(0)',
            }}
            borderRadius="lg"
            fontWeight="600"
            transition="all 0.2s"
          >
            Logout
          </Button>
        </Flex>

        {loading && (
          <Box mb={8}>
            <Progress 
              size="xs" 
              isIndeterminate 
              colorScheme="purple" 
              borderRadius="full"
              bg={progressBg}
            />
            <Text color={progressText} fontSize="sm" mt={2} textAlign="center" fontWeight="500">
              Loading your profile...
            </Text>
          </Box>
        )}

        {error && (
          <Box
            bg={errorBg}
            border="1px solid"
            borderColor={errorBorder}
            borderRadius="lg"
            p={4}
            mb={6}
          >
            <Text color={errorText} fontWeight="500">
              ⚠️ {error}
            </Text>
          </Box>
        )}

        {profile && (
          <VStack spacing={6} align="stretch">
            {/* Profile Card */}
            <Box
              bg={bgSecondary}
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
              boxShadow={cardShadow}
              overflow="hidden"
            >
              {/* Top gradient accent */}
              <Box
                h="4px"
                bgGradient={`linear(to-r, ${gradientFrom}, ${gradientTo})`}
                w="full"
              />
              
              <Box p={{ base: 6, md: 8 }}>
                <Flex 
                  direction={{ base: 'column', md: 'row' }}
                  align={{ base: 'center', md: 'start' }}
                  gap={6}
                  mb={6}
                >
                  {/* Avatar section */}
                  <Avatar
                    size="xl"
                    name={profile.username}
                    bgGradient={`linear(135deg, ${gradientFrom}, ${gradientTo})`}
                    color="white"
                    src={`https://ui-avatars.com/api/?name=${profile.username}&background=9333ea&color=fff&bold=true&size=128`}
                    boxShadow={avatarShadow}
                  />
                  
                  <Box flex={1} textAlign={{ base: 'center', md: 'left' }}>
                    <HStack 
                      spacing={2} 
                      justify={{ base: 'center', md: 'flex-start' }}
                      mb={2}
                    >
                      <Heading 
                        as="h2" 
                        size="lg" 
                        color={textPurple}
                        fontWeight="700"
                      >
                        {profile.username}
                      </Heading>
                      <Badge
                        colorScheme="purple"
                        variant="subtle"
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="xs"
                        bg={badgeBg}
                        color={badgeText}
                      >
                        Active
                      </Badge>
                    </HStack>
                    
                    <Text color={textSecondary} fontSize="md" mb={4}>
                      Account details and statistics
                    </Text>
                    
                    <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={4}>
                      <Box
                        bg={bgTertiary}
                        borderRadius="lg"
                        p={3}
                        border="1px solid"
                        borderColor={borderColor}
                      >
                        <HStack spacing={2}>
                          <Icon as={FaIdBadge} color={`${gradientFrom}`} boxSize={4} />
                          <Box>
                            <Text color={textPurple} fontSize="xs" fontWeight="600" opacity={0.8}>
                              USER ID
                            </Text>
                            <Text color={textPurple} fontWeight="600" fontSize="md">
                              #{profile.id}
                            </Text>
                          </Box>
                        </HStack>
                      </Box>

                      <Box
                        bg={bgTertiary}
                        borderRadius="lg"
                        p={3}
                        border="1px solid"
                        borderColor={borderColor}
                      >
                        <HStack spacing={2}>
                          <Icon as={FaUser} color={`${gradientFrom}`} boxSize={4} />
                          <Box>
                            <Text color={textPurple} fontSize="xs" fontWeight="600" opacity={0.8}>
                              USERNAME
                            </Text>
                            <Text color={textPurple} fontWeight="600" fontSize="md">
                              {profile.username}
                            </Text>
                          </Box>
                        </HStack>
                      </Box>

                      <Box
                        bg={bgTertiary}
                        borderRadius="lg"
                        p={3}
                        border="1px solid"
                        borderColor={borderColor}
                      >
                        <HStack spacing={2}>
                          <Icon as={FaEnvelope} color={`${gradientFrom}`} boxSize={4} />
                          <Box>
                            <Text color={textPurple} fontSize="xs" fontWeight="600" opacity={0.8}>
                              EMAIL
                            </Text>
                            <Text color={textPurple} fontWeight="600" fontSize="md" noOfLines={1}>
                              {profile.email}
                            </Text>
                          </Box>
                        </HStack>
                      </Box>
                    </SimpleGrid>
                  </Box>
                </Flex>

                <Divider borderColor={dividerColor} my={6} />

                {/* Statistics Section */}
                <Box>
                  <Heading size="md" color={textPurple} mb={4}>
                    Account Statistics
                  </Heading>
                  
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                    <Stat
                      bg={statBg}
                      p={4}
                      borderRadius="lg"
                      border="1px solid"
                      borderColor={borderColor}
                    >
                      <StatLabel color={textPurple} fontWeight="600" fontSize="sm" opacity={0.8}>
                        Account Age
                      </StatLabel>
                      <StatNumber color={textPurple} fontSize="2xl">
                        {profile.created_at ? new Date(profile.created_at).toLocaleDateString() : 'New'}
                      </StatNumber>
                      <Text color={textSecondary} fontSize="xs" mt={1}>
                        Member since
                      </Text>
                    </Stat>

                    <Stat
                      bg={statBg}
                      p={4}
                      borderRadius="lg"
                      border="1px solid"
                      borderColor={borderColor}
                    >
                      <StatLabel color={textPurple} fontWeight="600" fontSize="sm" opacity={0.8}>
                        Account Status
                      </StatLabel>
                      <StatNumber color={textPurple} fontSize="2xl">
                        <HStack>
                          <Badge 
                            colorScheme="green" 
                            variant="subtle" 
                            px={3} 
                            py={1}
                            bg={useColorModeValue('green.50', 'green.900')}
                            color={useColorModeValue('green.700', 'green.200')}
                          >
                            Active
                          </Badge>
                        </HStack>
                      </StatNumber>
                      <Text color={textSecondary} fontSize="xs" mt={1}>
                        Verified account
                      </Text>
                    </Stat>

                    <Stat
                      bg={statBg}
                      p={4}
                      borderRadius="lg"
                      border="1px solid"
                      borderColor={borderColor}
                    >
                      <StatLabel color={textPurple} fontWeight="600" fontSize="sm" opacity={0.8}>
                        Last Login
                      </StatLabel>
                      <StatNumber color={textPurple} fontSize="2xl">
                        {profile.last_login ? new Date(profile.last_login).toLocaleDateString() : 'Today'}
                      </StatNumber>
                      <Text color={textSecondary} fontSize="xs" mt={1}>
                        Recent activity
                      </Text>
                    </Stat>
                  </SimpleGrid>
                </Box>

                {/* Quick Actions */}
                <Box mt={6}>
                  <Heading size="sm" color={textPurple} mb={3}>
                    Quick Actions
                  </Heading>
                  <HStack spacing={4} flexWrap="wrap">
                    <Button
                      as={RouterLink}
                      to="/jobs"
                      variant="outline"
                      borderColor={borderColor}
                      color={textPurple}
                      _hover={{
                        bg: bgTertiary,
                        borderColor: borderColorHover,
                      }}
                      size="md"
                      fontWeight="600"
                    >
                      View Jobs
                    </Button>
                    <Button
                      as={RouterLink}
                      to="/jobs/new"
                      bgGradient={`linear(135deg, ${gradientFrom}, ${gradientTo})`}
                      color="white"
                      _hover={{
                        bgGradient: `linear(135deg, ${gradientTo}, ${gradientFrom})`,
                        transform: 'translateY(-2px)',
                        boxShadow: avatarShadow,
                      }}
                      size="md"
                      fontWeight="600"
                    >
                      Create New Job
                    </Button>
                  </HStack>
                </Box>
              </Box>
            </Box>

            {/* Activity Timeline Placeholder */}
            <Box
              bg={bgSecondary}
              borderRadius="xl"
              border="1px solid"
              borderColor={borderColor}
              p={6}
            >
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="sm" color={textPurple}>
                  Recent Activity
                </Heading>
                <Badge 
                  colorScheme="purple" 
                  variant="subtle" 
                  px={3} 
                  py={1}
                  bg={badgeBg}
                  color={badgeText}
                >
                  Coming Soon
                </Badge>
              </Flex>
              <Text color={textSecondary} fontSize="sm">
                Your recent job applications and activity will appear here.
              </Text>
            </Box>
          </VStack>
        )}
      </Container>
    </Box>
  );
};

export default Dashboard;