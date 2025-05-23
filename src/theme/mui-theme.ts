// MUI Theme configuration for MINI DEV
import { createTheme, ThemeOptions } from '@mui/material/styles';

// Theme options for light mode
const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: { main: '#2F80ED' }, // 品牌主色
    background: { default: '#F5F2E8', paper: '#FFFFFF' },
    text: { primary: '#1C2B3A', secondary: '#5A5A5A' },
    divider: '#E0DED8',
    error: { main: '#e63946' }, // 保留原錯誤色
    success: { main: '#28a745' }, // 保留原成功色
    // Optional: secondary can be customized or omitted
    // secondary: { main: '#D9A441' },
  },
  typography: {
    fontFamily: ['"Noto Sans TC"', 'Roboto', 'sans-serif'].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
};

// Theme options for dark mode
const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: { main: '#2F80ED' }, // 品牌主色
    background: { default: '#0E1218', paper: '#1A1F26' },
    text: { primary: '#F4F2EC', secondary: '#B0B5BA' },
    divider: '#2C3139',
    error: { main: '#e63946' }, // 保留原錯誤色
    success: { main: '#28a745' }, // 保留原成功色
  },
  typography: {
    fontFamily: ['"Noto Sans TC"', 'Roboto', 'sans-serif'].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
};

// Create light and dark themes
export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);

// Export a function to get the appropriate theme based on mode
export const getTheme = (mode: 'light' | 'dark') => {
  return mode === 'light' ? lightTheme : darkTheme;
};
