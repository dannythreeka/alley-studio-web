import { render, screen, fireEvent, act } from '@testing-library/react';
import LanguageSwitcher from '../LanguageSwitcher';
import { LanguageProvider, useLanguage } from '@/context/LanguageProvider';

// Mock child components and hooks
jest.mock('../IconButton', () => jest.fn(({ children, onClick, ...props }) => (
  <button {...props} onClick={onClick} data-testid="icon-button">
    {children}
  </button>
)));

jest.mock('../icons', () => ({
  LanguageIcon: jest.fn((props) => <svg {...props} data-testid="language-icon" />),
}));

jest.mock('../navigation/Menu', () => ({
  Menu: jest.fn(({ children, open, onClose }) => (
    open ? <div data-testid="menu" onMouseLeave={onClose}>{children}</div> : null
  )),
  MenuItem: jest.fn(({ children, onClick }) => (
    <div data-testid="menu-item" onClick={onClick}>{children}</div>
  )),
}));

// Mock the useLanguage hook
const mockSetLanguage = jest.fn();
jest.mock('@/context/LanguageProvider', () => ({
  ...jest.requireActual('@/context/LanguageProvider'), // Keep actual LanguageProvider for wrapping
  useLanguage: () => ({
    language: 'en', // Default mock language
    setLanguage: mockSetLanguage,
  }),
}));


describe('LanguageSwitcher Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockSetLanguage.mockClear();
    // Ensure we start with the "not mounted" state for relevant tests
    // This requires a bit of a workaround because of the immediate useEffect in the component
    // We can mock useEffect for the initial render test.
  });

  test('renders a disabled button with icon initially (before mount)', () => {
    // For this specific test, we want to see the pre-mounted state.
    // We can achieve this by temporarily overriding the useEffect mock for one render.
    const originalUseEffect = React.useEffect;
    React.useEffect = jest.fn(); // Disable useEffect for this render

    render(
        <LanguageSwitcher />
    );

    const button = screen.getByTestId('icon-button');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(screen.getByTestId('language-icon')).toBeInTheDocument();

    React.useEffect = originalUseEffect; // Restore useEffect
  });


  test('renders the language switch button after client-side mount', async () => {
    render(
        <LanguageSwitcher />
    );
    // Wait for the useEffect to run and set mounted to true
    // The component re-renders, so the button should now be enabled
    const button = await screen.findByTestId('icon-button');
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(screen.getByTestId('language-icon')).toBeInTheDocument();
  });

  test('opens the language menu when the button is clicked', async () => {
    render(
        <LanguageSwitcher />
    );
    const button = await screen.findByTestId('icon-button');
    fireEvent.click(button);
    expect(screen.getByTestId('menu')).toBeInTheDocument();
    expect(screen.getAllByTestId('menu-item').length).toBe(3); // zh-TW, en, ja
  });

  test('renders available languages in the menu', async () => {
    render(
        <LanguageSwitcher />
    );
    const button = await screen.findByTestId('icon-button');
    fireEvent.click(button);

    expect(screen.getByText('繁體中文')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('日本語')).toBeInTheDocument();

    // Check for flags (assuming they are rendered as text)
    expect(screen.getByText('🇹🇼')).toBeInTheDocument();
    expect(screen.getByText('🇺🇸')).toBeInTheDocument();
    expect(screen.getByText('🇯🇵')).toBeInTheDocument();
  });

  test('calls setLanguage with the correct code when a language is selected', async () => {
    render(
        <LanguageSwitcher />
    );
    const button = await screen.findByTestId('icon-button');
    fireEvent.click(button);

    const japaneseOption = screen.getByText('日本語').closest('[data-testid="menu-item"]');
    if (japaneseOption) {
      fireEvent.click(japaneseOption);
    }

    expect(mockSetLanguage).toHaveBeenCalledTimes(1);
    expect(mockSetLanguage).toHaveBeenCalledWith('ja');
  });

  test('highlights the currently selected language', async () => {
    // useLanguage mock is already set to 'en'
    render(
        <LanguageSwitcher />
    );
    const button = await screen.findByTestId('icon-button');
    fireEvent.click(button);

    const englishOptionText = screen.getByText('English');
    expect(englishOptionText).toHaveClass('font-medium text-primary');

    const japaneseOptionText = screen.getByText('日本語');
    expect(japaneseOptionText).not.toHaveClass('font-medium text-primary');
  });

  test('menu closes when an option is clicked', async () => {
    render(
        <LanguageSwitcher />
    );
    const button = await screen.findByTestId('icon-button');
    fireEvent.click(button);

    expect(screen.getByTestId('menu')).toBeInTheDocument();

    const japaneseOption = screen.getByText('日本語').closest('[data-testid="menu-item"]');
     if (japaneseOption) {
      fireEvent.click(japaneseOption);
    }

    expect(screen.queryByTestId('menu')).not.toBeInTheDocument();
  });
});

// Need to import React for JSX in mocks
const React = require('react');
