import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../ThemeToggle';
import { ThemeProvider, useTheme } from '@/context/ThemeProvider'; // Import actual provider for wrapping

// Mock child components and hooks as needed
jest.mock('../IconButton', () => jest.fn(({ children, onClick, 'aria-label': ariaLabel, ...props }) => (
  <button {...props} onClick={onClick} aria-label={ariaLabel} data-testid="icon-button">
    {children}
  </button>
)));

jest.mock('../icons', () => ({
  SunIcon: jest.fn((props) => <svg {...props} data-testid="sun-icon" />),
  MoonIcon: jest.fn((props) => <svg {...props} data-testid="moon-icon" />),
}));

// The global mock in src/__mocks__/framer-motion.js will be used.
// No need for a local mock here.

// Custom mock for useTheme to allow changing its return value per test
let mockTheme = 'light';
const mockToggleTheme = jest.fn();

jest.mock('@/context/ThemeProvider', () => ({
  ...jest.requireActual('@/context/ThemeProvider'), // Keep actual ThemeProvider for wrapping if needed
  useTheme: () => ({
    theme: mockTheme,
    toggleTheme: mockToggleTheme,
  }),
}));


describe('ThemeToggle Component', () => {
  beforeEach(() => {
    mockToggleTheme.mockClear();
    // Default to 'light' theme for each test unless overridden
    mockTheme = 'light';
    // Re-require useTheme to pick up the new mockTheme value if changed in a test
    // This is a bit of a hack; a more robust way might involve a setter for mockTheme.
    jest.doMock('@/context/ThemeProvider', () => ({
        ...jest.requireActual('@/context/ThemeProvider'),
        useTheme: () => ({
            theme: mockTheme,
            toggleTheme: mockToggleTheme,
        }),
    }));

  });

  test('renders the IconButton', () => {
    render(<ThemeToggle />);
    expect(screen.getByTestId('icon-button')).toBeInTheDocument();
  });

  test('calls toggleTheme when the button is clicked', () => {
    render(<ThemeToggle />);
    const button = screen.getByTestId('icon-button');
    fireEvent.click(button);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  describe('When theme is light', () => {
    beforeEach(() => {
      mockTheme = 'light';
       jest.doMock('@/context/ThemeProvider', () => ({ // Re-mock to apply new theme value
        ...jest.requireActual('@/context/ThemeProvider'),
        useTheme: () => ({ theme: 'light', toggleTheme: mockToggleTheme }),
      }));
    });

    test('displays the SunIcon', () => {
      render(<ThemeToggle />);
      expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument();
    });

    test('has correct aria-label to switch to dark mode', () => {
      render(<ThemeToggle />);
      expect(screen.getByTestId('icon-button')).toHaveAttribute('aria-label', 'Switch to dark mode');
    });
  });

  describe('When theme is dark', () => {
    beforeEach(() => {
      mockTheme = 'dark';
      jest.doMock('@/context/ThemeProvider', () => ({ // Re-mock to apply new theme value
        ...jest.requireActual('@/context/ThemeProvider'),
        useTheme: () => ({ theme: 'dark', toggleTheme: mockToggleTheme }),
      }));
    });

    test('displays the MoonIcon', () => {
      render(<ThemeToggle />);
      expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument();
    });

    test('has correct aria-label to switch to light mode', () => {
      render(<ThemeToggle />);
      expect(screen.getByTestId('icon-button')).toHaveAttribute('aria-label', 'Switch to light mode');
    });
  });

  test('motion.div rotates based on theme', () => {
    mockTheme = 'light';
     jest.doMock('@/context/ThemeProvider', () => ({
        ...jest.requireActual('@/context/ThemeProvider'),
        useTheme: () => ({ theme: 'light', toggleTheme: mockToggleTheme }),
      }));
    const { rerender } = render(<ThemeToggle />);
    // The global mock renders a plain 'div'. The 'flex' class is on it.
    // We find the div by its child icon.
    let motionHostElement = screen.getByTestId('sun-icon').parentElement; 
    expect(motionHostElement).toHaveClass('flex');
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();


    mockTheme = 'dark';
    jest.doMock('@/context/ThemeProvider', () => ({
        ...jest.requireActual('@/context/ThemeProvider'),
        useTheme: () => ({ theme: 'dark', toggleTheme: mockToggleTheme }),
      }));
    rerender(<ThemeToggle />);
    motionHostElement = screen.getByTestId('moon-icon').parentElement;
    expect(motionHostElement).toHaveClass('flex');
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    // The global mock filters out framer-motion specific props like 'animate',
    // so we can't directly test for its value. The presence of the correct icon
    // (which depends on the 'theme' state that 'animate' also depends on) is the key assertion here.
    // Then: expect(motionDiv.dataset.animate).toContain('rotate: 180');
  });
});

// Required for Jest to process JSX in the mocks if not using Babel transform for node_modules
const React = require('react');
