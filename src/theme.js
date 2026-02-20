import { extendTheme, theme as baseTheme } from '@chakra-ui/react';

const colors = {
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
  },
};

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors,
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif`,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#0f111a' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: 'lg',
      },
      variants: {
        solid: (props) => ({
          bg: props.colorMode === 'dark' ? 'purple.500' : 'purple.500',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'purple.600' : 'purple.600',
            transform: 'translateY(-1px)',
            boxShadow: 'md',
          },
          _active: {
            bg: props.colorMode === 'dark' ? 'purple.700' : 'purple.700',
          },
        }),
        outline: (props) => ({
          borderColor: props.colorMode === 'dark' ? 'purple.700' : 'purple.200',
          color: props.colorMode === 'dark' ? 'purple.300' : 'purple.700',
          _hover: {
            bg: props.colorMode === 'dark' ? 'purple.800' : 'purple.50',
            borderColor: props.colorMode === 'dark' ? 'purple.600' : 'purple.300',
          },
        }),
        ghost: (props) => ({
          color: props.colorMode === 'dark' ? 'purple.300' : 'purple.600',
          _hover: {
            bg: props.colorMode === 'dark' ? 'purple.800' : 'purple.50',
          },
        }),
      },
    },
    Card: {
      baseStyle: (props) => ({
        container: {
          borderRadius: 'xl',
          boxShadow: props.colorMode === 'dark' 
            ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
            : '0 4px 20px rgba(168, 85, 247, 0.05)',
          border: '1px solid',
          borderColor: props.colorMode === 'dark' ? 'purple.800' : 'purple.100',
          bg: props.colorMode === 'dark' ? '#121827' : 'white',
          overflow: 'hidden',
        },
      }),
    },
    Input: {
      variants: {
        outline: (props) => ({
          field: {
            borderColor: props.colorMode === 'dark' ? 'purple.700' : 'purple.100',
            bg: props.colorMode === 'dark' ? '#0f1322' : 'white',
            color: props.colorMode === 'dark' ? 'white' : 'gray.800',
            _hover: {
              borderColor: props.colorMode === 'dark' ? 'purple.600' : 'purple.300',
            },
            _focus: {
              borderColor: 'purple.500',
              boxShadow: '0 0 0 3px rgba(168, 85, 247, 0.1)',
            },
          },
        }),
      },
    },
  },
});

export default theme;