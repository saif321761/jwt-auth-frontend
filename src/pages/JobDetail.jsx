import { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Progress,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Divider,
  Icon,
  Avatar,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaBuilding, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
import { ArrowBackIcon, EditIcon, CalendarIcon } from '@chakra-ui/icons';
import axiosInstance from '../api/axios';
import useAuth from '../hooks/useAuth';
import { useThemeColors } from '../hooks/useColorModeValues';

const JobDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const toast = useToast();
  const [job, setJob] = useState(null);
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
    gradientFrom,
    gradientTo,
    badgeBg,
    badgeText,
  } = useThemeColors();

  // Additional color mode values
  const progressBg = useColorModeValue('purple.50', 'purple.900');
  const progressText = useColorModeValue('purple.500', 'purple.300');
  const dividerColor = useColorModeValue('purple.100', 'purple.800');
  const backLinkColor = useColorModeValue('purple.600', 'purple.300');
  const backLinkHoverColor = useColorModeValue('purple.700', 'purple.200');
  const infoCardBg = useColorModeValue('purple.50', 'purple.800');
  const infoCardBorder = useColorModeValue('purple.100', 'purple.700');
  const infoCardLabel = useColorModeValue('purple.400', 'purple.300');
  const infoCardValue = useColorModeValue('purple.700', 'purple.200');
  const descriptionBg = useColorModeValue('white', '#121827');
  const descriptionText = useColorModeValue('gray.700', 'gray.200');
  const postedBySectionBg = useColorModeValue('purple.50', 'purple.800');
  const postedByLabel = useColorModeValue('gray.600', 'gray.400');
  const updatedText = useColorModeValue('gray.500', 'gray.400');
  const errorStateBg = useColorModeValue('white', '#121827');
  const errorStateBorder = useColorModeValue('purple.200', 'purple.700');
  const errorStateText = useColorModeValue('gray.600', 'gray.300');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axiosInstance.get(`/jobs/${id}/`);
        setJob(res.data);
      } catch (err) {
        toast({
          title: 'Failed to load job details',
          description: 'Please try again later',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, toast]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'open':
        return 'green';
      case 'in_progress':
        return 'yellow';
      case 'closed':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'open':
        return '🟢';
      case 'in_progress':
        return '🟡';
      case 'closed':
        return '🔴';
      default:
        return '⚪';
    }
  };

  // Theme-aware status badge styles
  const getStatusBadgeStyles = (status) => {
    const baseStyles = {
      px: 4,
      py: 1.5,
      borderRadius: 'full',
      textTransform: 'capitalize',
      fontSize: 'sm',
      fontWeight: '600',
      letterSpacing: '0.5px',
    };

    switch(status) {
      case 'open':
        return {
          ...baseStyles,
          bg: useColorModeValue('green.50', 'green.900'),
          color: useColorModeValue('green.700', 'green.200'),
        };
      case 'in_progress':
        return {
          ...baseStyles,
          bg: useColorModeValue('yellow.50', 'yellow.900'),
          color: useColorModeValue('yellow.700', 'yellow.200'),
        };
      case 'closed':
        return {
          ...baseStyles,
          bg: useColorModeValue('red.50', 'red.900'),
          color: useColorModeValue('red.700', 'red.200'),
        };
      default:
        return {
          ...baseStyles,
          bg: useColorModeValue('gray.50', 'gray.700'),
          color: useColorModeValue('gray.700', 'gray.200'),
        };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
            <HStack spacing={3} mb={2}>
              <Link
                as={RouterLink}
                to="/jobs"
                display="flex"
                alignItems="center"
                color={backLinkColor}
                fontSize="sm"
                fontWeight="600"
                _hover={{ color: backLinkHoverColor, textDecoration: 'none' }}
              >
                <ArrowBackIcon mr={1} />
                Back to Jobs
              </Link>
            </HStack>
            <Heading 
              as="h1" 
              size="xl" 
              fontWeight="800" 
              letterSpacing="-1px"
              bgGradient={`linear(135deg, ${gradientFrom}, ${gradientTo})`}
              bgClip="text"
            >
              Job Details
            </Heading>
          </Box>
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
              Loading job details...
            </Text>
          </Box>
        )}

        {job && (
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
              <VStack spacing={6} align="stretch">
                {/* Header with title and status */}
                <Flex 
                  direction={{ base: 'column', md: 'row' }}
                  justify="space-between"
                  align={{ base: 'start', md: 'center' }}
                  gap={4}
                >
                  <Box flex={1}>
                    <Heading 
                      as="h2" 
                      size="lg" 
                      color={textPurple}
                      fontWeight="700"
                      mb={2}
                    >
                      {job.title}
                    </Heading>
                    <HStack spacing={4} flexWrap="wrap">
                      <Box
                        {...getStatusBadgeStyles(job.status)}
                      >
                        {getStatusIcon(job.status)} {job.status.replace('_', ' ')}
                      </Box>
                      
                      {job.created_at && (
                        <HStack spacing={1} color={textSecondary}>
                          <CalendarIcon boxSize={3} />
                          <Text fontSize="sm">Posted {formatDate(job.created_at)}</Text>
                        </HStack>
                      )}
                    </HStack>
                  </Box>

                  {user?.username === job.created_by && (
                    <Button
                      as={RouterLink}
                      to={`/jobs/${job.id}/edit`}
                      leftIcon={<EditIcon />}
                      bgGradient={`linear(135deg, ${gradientFrom}, ${gradientTo})`}
                      color="white"
                      _hover={{
                        bgGradient: `linear(135deg, ${gradientTo}, ${gradientFrom})`,
                        transform: 'translateY(-2px)',
                        boxShadow: useColorModeValue(
                          '0 10px 25px -5px rgba(168, 85, 247, 0.4)',
                          '0 10px 25px -5px rgba(0, 0, 0, 0.6)'
                        ),
                      }}
                      _active={{
                        bgGradient: `linear(135deg, ${gradientTo}, ${gradientFrom})`,
                        transform: 'translateY(0)',
                      }}
                      size="lg"
                      fontWeight="600"
                      borderRadius="lg"
                      px={8}
                      transition="all 0.2s"
                    >
                      Edit Job
                    </Button>
                  )}
                </Flex>

                <Divider borderColor={dividerColor} />

                {/* Company and location info */}
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                  <Box
                    bg={infoCardBg}
                    borderRadius="lg"
                    p={4}
                    border="1px solid"
                    borderColor={infoCardBorder}
                  >
                    <HStack spacing={3}>
                      <Icon as={FaBuilding} color={gradientFrom} boxSize={5} />
                      <Box>
                        <Text color={infoCardLabel} fontSize="xs" fontWeight="600" mb={1}>
                          COMPANY
                        </Text>
                        <Text color={infoCardValue} fontWeight="600" fontSize="md">
                          {job.company}
                        </Text>
                      </Box>
                    </HStack>
                  </Box>

                  <Box
                    bg={infoCardBg}
                    borderRadius="lg"
                    p={4}
                    border="1px solid"
                    borderColor={infoCardBorder}
                  >
                    <HStack spacing={3}>
                      <Icon as={FaMapMarkerAlt} color={gradientFrom} boxSize={5} />
                      <Box>
                        <Text color={infoCardLabel} fontSize="xs" fontWeight="600" mb={1}>
                          LOCATION
                        </Text>
                        <Text color={infoCardValue} fontWeight="600" fontSize="md">
                          {job.location}
                        </Text>
                      </Box>
                    </HStack>
                  </Box>

                  {job.salary && (
                    <Box
                      bg={infoCardBg}
                      borderRadius="lg"
                      p={4}
                      border="1px solid"
                      borderColor={infoCardBorder}
                    >
                      <HStack spacing={3}>
                        <Icon as={FaDollarSign} color={gradientFrom} boxSize={5} />
                        <Box>
                          <Text color={infoCardLabel} fontSize="xs" fontWeight="600" mb={1}>
                            SALARY
                          </Text>
                          <Text color={infoCardValue} fontWeight="600" fontSize="md">
                            ${job.salary.toLocaleString()}
                          </Text>
                        </Box>
                      </HStack>
                    </Box>
                  )}
                </SimpleGrid>

                {/* Description section */}
                <Box>
                  <Text color={textPurple} fontWeight="600" fontSize="lg" mb={3}>
                    Job Description
                  </Text>
                  <Box
                    bg={descriptionBg}
                    borderRadius="lg"
                    p={5}
                    border="1px solid"
                    borderColor={borderColor}
                  >
                    <Text 
                      color={descriptionText} 
                      fontSize="md" 
                      lineHeight="1.8"
                      whiteSpace="pre-wrap"
                    >
                      {job.description}
                    </Text>
                  </Box>
                </Box>

                {/* Posted by section */}
                <Flex 
                  justify="space-between" 
                  align="center"
                  bg={postedBySectionBg}
                  borderRadius="lg"
                  p={4}
                  border="1px solid"
                  borderColor={borderColor}
                >
                  <HStack spacing={3}>
                    <Avatar
                      size="sm"
                      name={job.created_by}
                      bgGradient={`linear(135deg, ${gradientFrom}, ${gradientTo})`}
                      color="white"
                      src={`https://ui-avatars.com/api/?name=${job.created_by}&background=9333ea&color=fff&bold=true`}
                    />
                    <Box>
                      <Text color={postedByLabel} fontSize="xs">Posted by</Text>
                      <Text color={textPurple} fontWeight="600" fontSize="sm">
                        {job.created_by}
                      </Text>
                    </Box>
                  </HStack>
                  
                  {job.updated_at && job.updated_at !== job.created_at && (
                    <Text color={updatedText} fontSize="xs">
                      Updated {formatDate(job.updated_at)}
                    </Text>
                  )}
                </Flex>

                {/* Action buttons for mobile */}
                {user?.username === job.created_by && (
                  <Box display={{ base: 'block', md: 'none' }}>
                    <Button
                      as={RouterLink}
                      to={`/jobs/${job.id}/edit`}
                      w="full"
                      leftIcon={<EditIcon />}
                      bgGradient={`linear(135deg, ${gradientFrom}, ${gradientTo})`}
                      color="white"
                      _hover={{
                        bgGradient: `linear(135deg, ${gradientTo}, ${gradientFrom})`,
                      }}
                      size="lg"
                      fontWeight="600"
                      borderRadius="lg"
                    >
                      Edit Job
                    </Button>
                  </Box>
                )}
              </VStack>
            </Box>
          </Box>
        )}

        {/* Error state if job not found */}
        {!loading && !job && (
          <Box
            bg={errorStateBg}
            borderRadius="2xl"
            border="1px dashed"
            borderColor={errorStateBorder}
            p={12}
            textAlign="center"
          >
            <Heading size="md" color={textPurple} mb={2}>
              Job Not Found
            </Heading>
            <Text color={errorStateText} mb={6}>
              The job you're looking for doesn't exist or has been removed.
            </Text>
            <Button
              as={RouterLink}
              to="/jobs"
              bgGradient={`linear(135deg, ${gradientFrom}, ${gradientTo})`}
              color="white"
              _hover={{
                bgGradient: `linear(135deg, ${gradientTo}, ${gradientFrom})`,
              }}
            >
              View All Jobs
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default JobDetail;