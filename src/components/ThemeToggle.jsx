import { IconButton, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle theme"
      size="md"
      fontSize="lg"
      color={colorMode === 'light' ? 'purple.600' : 'purple.300'}
      _hover={{
        bg: colorMode === 'light' ? 'purple.50' : 'purple.800',
      }}
      borderRadius="full"
    />
  );
};

export default ThemeToggle;