import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  Progress,
  SimpleGrid,
  Text,
  useToast,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Divider,
  useColorModeValue,
  Input,
  Select,
  Stack,
  Spacer,
} from '@chakra-ui/react';
import { AddIcon, ViewIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axiosInstance from '../api/axios';
import useAuth from '../hooks/useAuth';
import { useThemeColors } from '../hooks/useColorModeValues';

const JobsList = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    q: '',
    status: '',
    company: '',
    location: '',
  });
  const [appliedFilters, setAppliedFilters] = useState({
    q: '',
    status: '',
    company: '',
    location: '',
  });

  const PAGE_SIZE = 10;

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
    inputBg,
    inputBorder,
  } = useThemeColors();

  // Additional color mode values
  const progressBg = useColorModeValue('purple.50', 'purple.900');
  const progressText = useColorModeValue('purple.500', 'purple.300');
  const dividerColor = useColorModeValue('purple.100', 'purple.800');
  const emptyStateBg = useColorModeValue('white', '#121827');
  const emptyStateBorder = useColorModeValue('purple.200', 'purple.700');
  const emptyStateIconBg = useColorModeValue('purple.50', 'purple.800');
  const emptyStateIconColor = useColorModeValue('purple.500', 'purple.300');
  const jobCountBg = useColorModeValue('purple.50', 'purple.800');
  const jobCountText = useColorModeValue('purple.700', 'purple.200');
  const menuBg = useColorModeValue('white', '#121827');
  const menuBorder = useColorModeValue('purple.100', 'purple.700');
  const menuHoverBg = useColorModeValue('purple.50', 'purple.800');
  const deleteHoverBg = useColorModeValue('red.50', 'red.900');
  const salaryBg = useColorModeValue('purple.50', 'purple.800');
  const salaryText = useColorModeValue('purple.700', 'purple.200');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        q: appliedFilters.q || undefined,
        status: appliedFilters.status || undefined,
        company: appliedFilters.company || undefined,
        location: appliedFilters.location || undefined,
      };
      const res = await axiosInstance.get('/jobs/', { params });
      const data = res.data;
      if (data && Array.isArray(data.results)) {
        setJobs(data.results);
        setCount(data.count || 0);
      } else {
        setJobs(data);
        setCount(Array.isArray(data) ? data.length : 0);
      }
    } catch (err) {
      toast({
        title: 'Failed to load jobs',
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

  useEffect(() => {
    fetchJobs();
  }, [page, appliedFilters]);

  const applyFilters = () => {
    setPage(1);
    setAppliedFilters(filters);
  };

  const clearFilters = () => {
    const cleared = { q: '', status: '', company: '', location: '' };
    setFilters(cleared);
    setAppliedFilters(cleared);
    setPage(1);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/jobs/${id}/`);
      setJobs((prev) => prev.filter((job) => job.id !== id));
      toast({
        title: 'Job deleted',
        description: 'The job has been successfully deleted.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (err) {
      toast({
        title: 'Failed to delete job',
        description: err.response?.data?.error || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

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

  const getStatusBadgeVariant = (status) => {
    switch(status) {
      case 'open':
        return 'subtle';
      default:
        return 'solid';
    }
  };

  // Theme-aware status badge colors
  const getStatusBadgeStyles = (status) => {
    const baseStyles = {
      px: 3,
      py: 1,
      borderRadius: 'full',
      textTransform: 'capitalize',
      fontSize: 'xs',
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

  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

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

      <Container maxW="1280px" position="relative" zIndex={1}>
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
              Job Listings
            </Heading>
            <Text color={textSecondary} fontSize="md">
              Manage your job postings and track their status in real time
            </Text>
          </Box>
          
          <Button
            as={RouterLink}
            to={user ? '/jobs/new' : '/login'}
            size="lg"
            bgGradient={`linear(135deg, ${gradientFrom}, ${gradientTo})`}
            color="white"
            leftIcon={<AddIcon />}
            _hover={{
              bgGradient: `linear(135deg, ${gradientTo}, ${gradientFrom})`,
              transform: 'translateY(-2px)',
              boxShadow: '0 10px 25px -5px rgba(168, 85, 247, 0.4)',
            }}
            _active={{
              bgGradient: `linear(135deg, ${gradientTo}, ${gradientFrom})`,
              transform: 'translateY(0)',
            }}
            borderRadius="lg"
            fontWeight="600"
            transition="all 0.2s"
          >
            {user ? 'Create New Job' : 'Login to Create'}
          </Button>
        </Flex>

        <Box
          bg={bgSecondary}
          borderRadius="xl"
          border="1px solid"
          borderColor={borderColor}
          p={5}
          mb={6}
          boxShadow={cardShadow}
        >
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4} align="center">
            <Input
              placeholder="Search title, company, location..."
              value={filters.q}
              onChange={(e) => setFilters({ ...filters, q: e.target.value })}
              bg={inputBg}
              borderColor={inputBorder}
            />
            <Input
              placeholder="Company"
              value={filters.company}
              onChange={(e) => setFilters({ ...filters, company: e.target.value })}
              bg={inputBg}
              borderColor={inputBorder}
            />
            <Input
              placeholder="Location"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              bg={inputBg}
              borderColor={inputBorder}
            />
            <Select
              placeholder="Status"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              bg={inputBg}
              borderColor={inputBorder}
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </Select>
            <Spacer />
            <HStack spacing={3}>
              <Button colorScheme="purple" onClick={applyFilters}>
                Apply
              </Button>
              <Button variant="outline" onClick={clearFilters}>
                Clear
              </Button>
            </HStack>
          </Stack>
        </Box>

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
              Loading your jobs...
            </Text>
          </Box>
        )}

        {jobs.length === 0 && !loading ? (
          <Box
            bg={emptyStateBg}
            borderRadius="2xl"
            border="1px dashed"
            borderColor={emptyStateBorder}
            p={12}
            textAlign="center"
            boxShadow={cardShadow}
          >
            <Box
              bg={emptyStateIconBg}
              w="80px"
              h="80px"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mx="auto"
              mb={4}
            >
              <AddIcon boxSize={6} color={emptyStateIconColor} />
            </Box>
            <Heading size="md" color={textPurple} mb={2}>
              No results
            </Heading>
            <Text color={textSecondary} mb={6}>
              Try adjusting your search or filters
            </Text>
            <Button
              as={RouterLink}
              to={user ? '/jobs/new' : '/login'}
              bgGradient={`linear(135deg, ${gradientFrom}, ${gradientTo})`}
              color="white"
              _hover={{
                bgGradient: `linear(135deg, ${gradientTo}, ${gradientFrom})`,
                transform: 'translateY(-2px)',
              }}
              size="lg"
              leftIcon={<AddIcon />}
            >
              {user ? 'Create Your First Job' : 'Login to Create'}
            </Button>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {jobs.map((job) => (
              <Box
                key={job.id}
                bg={bgSecondary}
                borderRadius="xl"
                border="1px solid"
                borderColor={borderColor}
                overflow="hidden"
                boxShadow={cardShadow}
                transition="all 0.3s ease"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: useColorModeValue(
                    '0 20px 30px -10px rgba(168, 85, 247, 0.2)',
                    '0 20px 30px -10px rgba(0, 0, 0, 0.5)'
                  ),
                  borderColor: borderColorHover,
                }}
                position="relative"
              >
                {/* Top gradient accent */}
                <Box
                  h="4px"
                  bgGradient={`linear(to-r, ${gradientFrom}, ${gradientTo})`}
                  w="full"
                />
                
                <Box p={6}>
                  <Flex justify="space-between" align="start" mb={3}>
                    <Box flex={1}>
                      <Heading 
                        as="h2" 
                        size="md" 
                        color={textPurple}
                        fontWeight="700"
                        noOfLines={1}
                        mb={1}
                      >
                        {job.title}
                      </Heading>
                      <HStack spacing={2} color={textSecondary} fontSize="sm" mb={2}>
                        <Text fontWeight="500">{job.company}</Text>
                        <Text>•</Text>
                        <Text>{job.location}</Text>
                      </HStack>
                    </Box>
                    <Box
                      {...getStatusBadgeStyles(job.status)}
                    >
                      {job.status.replace('_', ' ')}
                    </Box>
                  </Flex>

                  {job.salary && (
                    <Box 
                      bg={salaryBg} 
                      px={3} 
                      py={1.5} 
                      borderRadius="lg" 
                      display="inline-block"
                      mb={3}
                    >
                      <Text color={salaryText} fontSize="sm" fontWeight="600">
                        💰 {job.salary}
                      </Text>
                    </Box>
                  )}

                  <Text 
                    color={textSecondary} 
                    fontSize="sm" 
                    lineHeight="1.6"
                    noOfLines={3}
                    mb={4}
                  >
                    {job.description}
                  </Text>

                  <Divider borderColor={dividerColor} mb={4} />

                  <Flex justify="space-between" align="center">
                    <HStack spacing={2}>
                      <Button
                        as={RouterLink}
                        to={`/jobs/${job.id}`}
                        size="sm"
                        variant="ghost"
                        color={textPurple}
                        leftIcon={<ViewIcon />}
                        _hover={{ bg: bgTertiary }}
                        fontWeight="600"
                      >
                        Details
                      </Button>

                      {user?.username === job.created_by && (
                        <>
                          <Button
                            as={RouterLink}
                            to={`/jobs/${job.id}/edit`}
                            size="sm"
                            variant="ghost"
                            color={textPurple}
                            leftIcon={<EditIcon />}
                            _hover={{ bg: bgTertiary }}
                            fontWeight="600"
                          >
                            Edit
                          </Button>
                          
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              icon={<DeleteIcon />}
                              size="sm"
                              variant="ghost"
                              color="red.500"
                              _hover={{ bg: deleteHoverBg }}
                              aria-label="Delete options"
                            />
                            <MenuList 
                              bg={menuBg} 
                              borderColor={menuBorder}
                              boxShadow={cardShadow}
                              minW="auto"
                            >
                              <MenuItem 
                                onClick={() => handleDelete(job.id)}
                                icon={<DeleteIcon />}
                                color="red.500"
                                _hover={{ bg: deleteHoverBg }}
                                fontSize="sm"
                                fontWeight="500"
                              >
                                Confirm Delete
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </>
                      )}
                    </HStack>

                    {user?.username === job.created_by && (
                      <Avatar
                        size="xs"
                        name={job.created_by}
                        bgGradient={`linear(135deg, ${gradientFrom}, ${gradientTo})`}
                        color="white"
                        src={`https://ui-avatars.com/api/?name=${job.created_by}&background=9333ea&color=fff&bold=true&size=32`}
                      />
                    )}
                  </Flex>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}

        {/* Job count footer */}
        {!loading && jobs.length > 0 && (
          <Flex direction="column" align="center" mt={8} gap={4}>
            <HStack spacing={3}>
              <Button
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                isDisabled={page <= 1}
              >
                Prev
              </Button>
              <Text color={textSecondary} fontSize="sm">
                Page {page} of {totalPages}
              </Text>
              <Button
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                isDisabled={page >= totalPages}
              >
                Next
              </Button>
            </HStack>
            <Box
              bg={jobCountBg}
              px={4}
              py={2}
              borderRadius="full"
              display="inline-flex"
              alignItems="center"
              gap={2}
            >
              <Text color={jobCountText} fontSize="sm" fontWeight="600">
                ???? {count || jobs.length} {count === 1 ? 'job' : 'jobs'} total
              </Text>
            </Box>
          </Flex>
        )}

      </Container>
    </Box>
  );
};

export default JobsList;
