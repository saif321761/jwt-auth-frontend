import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Progress,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  Link,
  VStack,
  useToast,
  HStack,
  Icon,
  Divider,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowBackIcon, InfoIcon } from '@chakra-ui/icons';
import axiosInstance from '../api/axios';
import { useThemeColors } from '../hooks/useColorModeValues';

const JobForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const isEdit = Boolean(id);

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
    inputBg,
    inputBorder,
  } = useThemeColors();

  // Additional color mode values
  const progressBg = useColorModeValue('purple.50', 'purple.900');
  const progressText = useColorModeValue('purple.500', 'purple.300');
  const dividerColor = useColorModeValue('purple.100', 'purple.800');
  const previewBg = useColorModeValue('purple.50', 'purple.800');
  const previewBorder = useColorModeValue('purple.100', 'purple.700');
  const previewText = useColorModeValue('purple.700', 'purple.200');
  const previewTitle = useColorModeValue('purple.900', 'purple.100');
  const tipText = useColorModeValue('gray.600', 'gray.400');
  const backLinkColor = useColorModeValue('purple.600', 'purple.300');
  const backLinkHoverColor = useColorModeValue('purple.700', 'purple.200');
  const selectOptionBg = useColorModeValue('white', '#121827');
  const selectOptionColor = useColorModeValue('gray.800', 'white');

  const [form, setForm] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: '',
    status: 'open',
  });
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    const fetchJob = async () => {
      if (!isEdit) return;
      try {
        const res = await axiosInstance.get(`/jobs/${id}/`);
        setForm({
          title: res.data.title || '',
          description: res.data.description || '',
          company: res.data.company || '',
          location: res.data.location || '',
          salary: res.data.salary ?? '',
          status: res.data.status || 'open',
        });
      } catch (err) {
        toast({
          title: 'Failed to load job',
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
  }, [id, isEdit, toast]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      salary: form.salary === '' ? null : Number(form.salary),
    };
    try {
      if (isEdit) {
        await axiosInstance.put(`/jobs/${id}/`, payload);
      } else {
        await axiosInstance.post('/jobs/', payload);
      }
      toast({
        title: isEdit ? 'Job updated successfully!' : 'Job created successfully!',
        description: isEdit ? 'Your job has been updated.' : 'Your new job has been posted.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      navigate('/jobs');
    } catch (err) {
      toast({
        title: 'Failed to save job',
        description: err.response?.data?.error || 'Please check your inputs and try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
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

      <Container maxW="900px" position="relative" zIndex={1}>
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
              {isEdit ? 'Edit Job' : 'Create New Job'}
            </Heading>
            <Text color={textSecondary} fontSize="md" mt={1}>
              {isEdit ? 'Update the job details below' : 'Fill in the details to post a new job'}
            </Text>
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
            <form onSubmit={handleSubmit}>
              <VStack spacing={6} align="stretch">
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <FormControl isRequired>
                    <FormLabel 
                      color={textPurple} 
                      fontWeight="600" 
                      fontSize="sm"
                      mb={1}
                    >
                      Job Title
                    </FormLabel>
                    <Input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="e.g., Senior Frontend Developer"
                      size="lg"
                      borderRadius="lg"
                      borderColor={borderColor}
                      bg={inputBg}
                      color={textPrimary}
                      _hover={{ borderColor: borderColorHover }}
                      _focus={{
                        borderColor: gradientFrom,
                        boxShadow: `0 0 0 3px ${useColorModeValue('rgba(168, 85, 247, 0.1)', 'rgba(168, 85, 247, 0.3)')}`,
                      }}
                      transition="all 0.2s"
                      _placeholder={{ color: useColorModeValue('gray.400', 'gray.500') }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel 
                      color={textPurple} 
                      fontWeight="600" 
                      fontSize="sm"
                      mb={1}
                    >
                      Company
                    </FormLabel>
                    <Input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="e.g., Tech Corp Inc."
                      size="lg"
                      borderRadius="lg"
                      borderColor={borderColor}
                      bg={inputBg}
                      color={textPrimary}
                      _hover={{ borderColor: borderColorHover }}
                      _focus={{
                        borderColor: gradientFrom,
                        boxShadow: `0 0 0 3px ${useColorModeValue('rgba(168, 85, 247, 0.1)', 'rgba(168, 85, 247, 0.3)')}`,
                      }}
                      transition="all 0.2s"
                      _placeholder={{ color: useColorModeValue('gray.400', 'gray.500') }}
                    />
                  </FormControl>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <FormControl isRequired>
                    <FormLabel 
                      color={textPurple} 
                      fontWeight="600" 
                      fontSize="sm"
                      mb={1}
                    >
                      Location
                    </FormLabel>
                    <Input
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="e.g., New York, NY (Remote)"
                      size="lg"
                      borderRadius="lg"
                      borderColor={borderColor}
                      bg={inputBg}
                      color={textPrimary}
                      _hover={{ borderColor: borderColorHover }}
                      _focus={{
                        borderColor: gradientFrom,
                        boxShadow: `0 0 0 3px ${useColorModeValue('rgba(168, 85, 247, 0.1)', 'rgba(168, 85, 247, 0.3)')}`,
                      }}
                      transition="all 0.2s"
                      _placeholder={{ color: useColorModeValue('gray.400', 'gray.500') }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel 
                      color={textPurple} 
                      fontWeight="600" 
                      fontSize="sm"
                      mb={1}
                    >
                      Salary (Optional)
                    </FormLabel>
                    <InputGroup size="lg">
                      <InputLeftElement>
                        <Text color={textPurple}>$</Text>
                      </InputLeftElement>
                      <Input
                        name="salary"
                        type="number"
                        step="0.01"
                        value={form.salary}
                        onChange={handleChange}
                        placeholder="e.g., 80000"
                        borderRadius="lg"
                        borderColor={borderColor}
                        bg={inputBg}
                        color={textPrimary}
                        _hover={{ borderColor: borderColorHover }}
                        _focus={{
                          borderColor: gradientFrom,
                          boxShadow: `0 0 0 3px ${useColorModeValue('rgba(168, 85, 247, 0.1)', 'rgba(168, 85, 247, 0.3)')}`,
                        }}
                        transition="all 0.2s"
                        pl={8}
                        _placeholder={{ color: useColorModeValue('gray.400', 'gray.500') }}
                      />
                    </InputGroup>
                  </FormControl>
                </SimpleGrid>

                <FormControl>
                  <FormLabel 
                    color={textPurple} 
                    fontWeight="600" 
                    fontSize="sm"
                    mb={1}
                  >
                    Status
                  </FormLabel>
                  <Select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="lg"
                    borderColor={borderColor}
                    bg={inputBg}
                    color={textPrimary}
                    _hover={{ borderColor: borderColorHover }}
                    _focus={{
                      borderColor: gradientFrom,
                      boxShadow: `0 0 0 3px ${useColorModeValue('rgba(168, 85, 247, 0.1)', 'rgba(168, 85, 247, 0.3)')}`,
                    }}
                    transition="all 0.2s"
                    iconColor={textPurple}
                  >
                    <option value="open" style={{ backgroundColor: selectOptionBg, color: selectOptionColor }}>🟢 Open</option>
                    <option value="in_progress" style={{ backgroundColor: selectOptionBg, color: selectOptionColor }}>🟡 In Progress</option>
                    <option value="closed" style={{ backgroundColor: selectOptionBg, color: selectOptionColor }}>🔴 Closed</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel 
                    color={textPurple} 
                    fontWeight="600" 
                    fontSize="sm"
                    mb={1}
                  >
                    Job Description
                  </FormLabel>
                  <Textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the role, responsibilities, and requirements..."
                    size="lg"
                    borderRadius="lg"
                    borderColor={borderColor}
                    bg={inputBg}
                    color={textPrimary}
                    _hover={{ borderColor: borderColorHover }}
                    _focus={{
                      borderColor: gradientFrom,
                      boxShadow: `0 0 0 3px ${useColorModeValue('rgba(168, 85, 247, 0.1)', 'rgba(168, 85, 247, 0.3)')}`,
                    }}
                    minH="200px"
                    transition="all 0.2s"
                    fontSize="md"
                    _placeholder={{ color: useColorModeValue('gray.400', 'gray.500') }}
                  />
                </FormControl>

                <Divider borderColor={dividerColor} />

                <Flex 
                  direction={{ base: 'column', sm: 'row' }}
                  justify="space-between"
                  align={{ base: 'stretch', sm: 'center' }}
                  gap={4}
                >
                  <HStack spacing={2}>
                    <Icon as={InfoIcon} color={textPurple} boxSize={4} />
                    <Text color={tipText} fontSize="sm">
                      Tip: Keep descriptions concise and highlight key skills.
                    </Text>
                  </HStack>

                  <HStack spacing={3}>
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
                      _active={{
                        bg: bgTertiary,
                      }}
                      size="lg"
                      fontWeight="600"
                      borderRadius="lg"
                      px={8}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
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
                      {isEdit ? 'Update Job' : 'Create Job'}
                    </Button>
                  </HStack>
                </Flex>
              </VStack>
            </form>
          </Box>
        </Box>

        {/* Preview card */}
        {form.title && form.company && (
          <Box
            mt={6}
            bg={previewBg}
            borderRadius="lg"
            p={4}
            border="1px solid"
            borderColor={previewBorder}
          >
            <Text color={previewText} fontSize="sm" fontWeight="600" mb={2}>
              📋 Preview:
            </Text>
            <Text color={previewTitle} fontWeight="500">
              {form.title} at {form.company}
              {form.location && ` • ${form.location}`}
            </Text>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default JobForm;