import { useColorModeValue } from '@chakra-ui/react';

export const useThemeColors = () => {
  const bgPrimary = useColorModeValue('white', '#0f111a');
  const bgSecondary = useColorModeValue('white', '#121827');
  const bgTertiary = useColorModeValue('purple.50', 'purple.800');
  
  const borderColor = useColorModeValue('purple.100', 'purple.800');
  const borderColorHover = useColorModeValue('purple.300', 'purple.600');
  
  const textPrimary = useColorModeValue('gray.800', 'white');
  const textSecondary = useColorModeValue('gray.600', 'gray.300');
  const textPurple = useColorModeValue('purple.700', 'purple.300');
  
  const cardShadow = useColorModeValue(
    '0 20px 40px -15px rgba(168, 85, 247, 0.15)',
    '0 20px 40px -15px rgba(0, 0, 0, 0.5)'
  );
  
  const decorativeBg1 = useColorModeValue('purple.50', 'purple.900');
  const decorativeBg2 = useColorModeValue('purple.100', 'purple.800');
  
  const inputBg = useColorModeValue('white', '#0f1322');
  const inputBorder = useColorModeValue('purple.100', 'purple.700');
  
  const badgeBg = useColorModeValue('purple.50', 'purple.800');
  const badgeText = useColorModeValue('purple.700', 'purple.300');
  
  const gradientFrom = useColorModeValue('purple.500', 'purple.400');
  const gradientTo = useColorModeValue('purple.400', 'purple.500');
  
  return {
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
    inputBg,
    inputBorder,
    badgeBg,
    badgeText,
    gradientFrom,
    gradientTo,
  };
};