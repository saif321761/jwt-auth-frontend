import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  useColorModeValue,
  Container,
  InputGroup,
  InputRightElement,
  IconButton,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    
    // Theme colors
    const bgColor = useColorModeValue('white', '#121827');
    const textColor = useColorModeValue('gray.600', 'gray.300');
    const headingText = useColorModeValue('gray.800', 'white');
    const borderColor = useColorModeValue('purple.100', 'purple.700');
    const borderColorHover = useColorModeValue('purple.300', 'purple.500');
    const gradientFrom = useColorModeValue('purple.500', 'purple.400');
    const gradientTo = useColorModeValue('purple.400', 'purple.500');
    const labelColor = useColorModeValue('purple.700', 'purple.300');
    const inputBg = useColorModeValue('white', '#0f1322');
    const inputText = useColorModeValue('gray.800', 'white');
    const iconColor = useColorModeValue('purple.500', 'purple.300');
    const iconHoverBg = useColorModeValue('purple.50', 'purple.800');
    const linkColor = useColorModeValue('purple.600', 'purple.300');
    const linkHoverColor = useColorModeValue('purple.700', 'purple.200');
    const dividerColor = useColorModeValue('purple.100', 'purple.700');
    const outlineBtnColor = useColorModeValue('purple.700', 'purple.300');
    const outlineBtnBorder = useColorModeValue('purple.200', 'purple.600');
    const outlineBtnHoverBg = useColorModeValue('purple.50', 'purple.800');
    const outlineBtnHoverBorder = useColorModeValue('purple.300', 'purple.500');
    const decorativeBg1 = useColorModeValue('purple.50', 'purple.900');
    const decorativeBg2 = useColorModeValue('purple.100', 'purple.800');
    const cardShadow = useColorModeValue(
        '0 20px 40px -15px rgba(168, 85, 247, 0.15), 0 0 0 1px rgba(168, 85, 247, 0.1)',
        '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(168, 85, 247, 0.2)'
    );
    const inputFocusShadow = useColorModeValue(
        '0 0 0 3px rgba(168, 85, 247, 0.1)',
        '0 0 0 3px rgba(168, 85, 247, 0.3)'
    );
    const buttonShadow = useColorModeValue(
        '0 10px 25px -5px rgba(168, 85, 247, 0.4)',
        '0 10px 25px -5px rgba(0, 0, 0, 0.6)'
    );

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
        await login(form);
        toast({
            title: 'Welcome back!',
            description: 'You have successfully logged in.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
        });
        navigate('/dashboard');
        } catch (err) {
        toast({
            title: 'Login failed',
            description: err.response?.data?.detail || err.response?.data?.non_field_errors?.[0] || 'Invalid credentials',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
        });
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <Container maxW="lg" py={{ base: 8, md: 12 }}>
        <Box
            bg={bgColor}
            borderRadius="2xl"
            boxShadow={cardShadow}
            p={{ base: 6, md: 8 }}
            position="relative"
            overflow="hidden"
        >
            {/* Decorative gradient orbs - theme aware */}
            <Box
            position="absolute"
            top="-20%"
            right="-10%"
            w="200px"
            h="200px"
            bg={decorativeBg1}
            borderRadius="full"
            filter="blur(60px)"
            opacity="0.5"
            zIndex={0}
            />
            <Box
            position="absolute"
            bottom="-20%"
            left="-10%"
            w="200px"
            h="200px"
            bg={decorativeBg2}
            borderRadius="full"
            filter="blur(60px)"
            opacity="0.5"
            zIndex={0}
            />

            <VStack spacing={6} align="stretch" position="relative" zIndex={1}>
            <VStack spacing={2} textAlign="center">
                <Heading 
                as="h1" 
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="800"
                letterSpacing="-1px"
                bgGradient={`linear(135deg, ${gradientFrom}, ${gradientTo})`}
                bgClip="text"
                >
                Welcome Back
                </Heading>
                <Text color={textColor} fontSize="md" fontWeight="400">
                Sign in to continue to your account
                </Text>
            </VStack>

            <form onSubmit={handleSubmit}>
                <VStack spacing={5}>
                <FormControl isRequired>
                    <FormLabel 
                    color={labelColor} 
                    fontWeight="600" 
                    fontSize="sm"
                    mb={1}
                    >
                    Username
                    </FormLabel>
                    <Input
                    name="username"
                    placeholder="Enter your username"
                    value={form.username}
                    onChange={handleChange}
                    size="lg"
                    borderRadius="lg"
                    borderColor={borderColor}
                    bg={inputBg}
                    color={inputText}
                    _hover={{ borderColor: borderColorHover }}
                    _focus={{
                        borderColor: gradientFrom,
                        boxShadow: inputFocusShadow,
                    }}
                    transition="all 0.2s"
                    fontSize="md"
                    _placeholder={{ color: useColorModeValue('gray.400', 'gray.500') }}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel 
                    color={labelColor} 
                    fontWeight="600" 
                    fontSize="sm"
                    mb={1}
                    >
                    Password
                    </FormLabel>
                    <InputGroup size="lg">
                    <Input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={form.password}
                        onChange={handleChange}
                        borderRadius="lg"
                        borderColor={borderColor}
                        bg={inputBg}
                        color={inputText}
                        _hover={{ borderColor: borderColorHover }}
                        _focus={{
                        borderColor: gradientFrom,
                        boxShadow: inputFocusShadow,
                        }}
                        transition="all 0.2s"
                        fontSize="md"
                        pr="4.5rem"
                        _placeholder={{ color: useColorModeValue('gray.400', 'gray.500') }}
                    />
                    <InputRightElement>
                        <IconButton
                        variant="ghost"
                        size="sm"
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        color={iconColor}
                        _hover={{ bg: iconHoverBg }}
                        borderRadius="full"
                        />
                    </InputRightElement>
                    </InputGroup>
                </FormControl>

                <HStack w="full" justify="flex-end">
                    <Button
                    variant="link"
                    color={linkColor}
                    fontSize="sm"
                    fontWeight="600"
                    _hover={{ color: linkHoverColor, textDecoration: 'none' }}
                    >
                    Forgot password?
                    </Button>
                </HStack>

                <Button
                    type="submit"
                    w="full"
                    size="lg"
                    bgGradient={`linear(135deg, ${gradientFrom}, ${gradientTo})`}
                    color="white"
                    _hover={{
                    bgGradient: `linear(135deg, ${gradientTo}, ${gradientFrom})`,
                    transform: 'translateY(-2px)',
                    boxShadow: buttonShadow,
                    }}
                    _active={{
                    bgGradient: `linear(135deg, ${gradientTo}, ${gradientFrom})`,
                    transform: 'translateY(0)',
                    }}
                    isLoading={isLoading}
                    loadingText="Signing in..."
                    borderRadius="lg"
                    fontWeight="600"
                    fontSize="md"
                    transition="all 0.2s"
                >
                    Sign In
                </Button>
                </VStack>
            </form>

            <VStack spacing={4}>
                <HStack w="full">
                <Divider borderColor={dividerColor} />
                <Text fontSize="sm" color={textColor} fontWeight="500" whiteSpace="nowrap" px={3}>
                    New to JWT Suite?
                </Text>
                <Divider borderColor={dividerColor} />
                </HStack>

                <Button
                as={RouterLink}
                to="/register"
                w="full"
                variant="outline"
                borderColor={outlineBtnBorder}
                color={outlineBtnColor}
                _hover={{
                    bg: outlineBtnHoverBg,
                    borderColor: outlineBtnHoverBorder,
                    transform: 'translateY(-1px)',
                }}
                _active={{
                    bg: outlineBtnHoverBg,
                    transform: 'translateY(0)',
                }}
                size="lg"
                fontWeight="600"
                borderRadius="lg"
                transition="all 0.2s"
                >
                Create an account
                </Button>
            </VStack>
            </VStack>
        </Box>

        {/* Decorative background elements - theme aware */}
        <Box
            position="fixed"
            top="15%"
            left="5%"
            w="300px"
            h="300px"
            bg={decorativeBg1}
            borderRadius="full"
            filter="blur(80px)"
            opacity="0.4"
            zIndex={-1}
            pointerEvents="none"
        />
        <Box
            position="fixed"
            bottom="15%"
            right="5%"
            w="350px"
            h="350px"
            bg={decorativeBg2}
            borderRadius="full"
            filter="blur(90px)"
            opacity="0.4"
            zIndex={-1}
            pointerEvents="none"
        />
        </Container>
    );
};

export default Login;