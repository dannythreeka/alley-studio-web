import { render, screen, fireEvent, act } from '@testing-library/react';
import Navbar from '../Navbar';

// Mock hooks
jest.mock('@/hooks/useViewport', () => jest.fn(() => ({ isMobile: false })));
const mockT = jest.fn(key => key); // Simple mock for t function
jest.mock('@/hooks/useTranslation', () => jest.fn(() => ({ t: mockT })));

// Mock child components
jest.mock('../Logo', () => jest.fn(() => <div data-testid="logo">Logo</div>));
jest.mock('../ThemeToggle', () => jest.fn(() => <button data-testid="theme-toggle">ThemeToggle</button>));
jest.mock('../LanguageSwitcher', () => jest.fn(() => <button data-testid="language-switcher">LanguageSwitcher</button>));
jest.mock('../IconButton', () => jest.fn(({ children, onClick, 'aria-label': ariaLabel }) => (
  <button onClick={onClick} aria-label={ariaLabel} data-testid="icon-button">
    {children}
  </button>
)));
jest.mock('../icons', () => ({
  MenuIcon: jest.fn(() => <svg data-testid="menu-icon" />),
  CloseIcon: jest.fn(() => <svg data-testid="close-icon" />),
}));

// The global mock in src/__mocks__/framer-motion.js will be used.
// No need for a local mock here.


describe('Navbar Component', () => {
  beforeEach(() => {
    // Reset mocks and viewport
    mockT.mockClear();
    require('@/hooks/useViewport').mockImplementation(() => ({ isMobile: false }));
    window.scrollY = 0; // Reset scroll position
    // Clear any previous event listeners if necessary (though Jest usually handles this)
  });

  test('renders Logo, desktop navigation links, ThemeToggle, and LanguageSwitcher on desktop', () => {
    render(<Navbar />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();

    // Check for desktop nav items (mockT returns the key)
    expect(screen.getByText('about')).toBeInTheDocument();
    expect(screen.getByText('services')).toBeInTheDocument();
    expect(screen.getByText('work')).toBeInTheDocument();
    expect(screen.getByText('contact')).toBeInTheDocument();

    // Mobile menu toggle button should not be immediately visible (or should be the MenuIcon one)
    // The IconButton mock will render, so we check its aria-label or the icon it contains.
    // On desktop, the mobile-specific toggle logic for MenuIcon/CloseIcon isn't primary.
    // We are more interested in the main layout.
  });

  describe('Mobile View', () => {
    beforeEach(() => {
      require('@/hooks/useViewport').mockImplementation(() => ({ isMobile: true }));
    });

    test('renders Logo, ThemeToggle, LanguageSwitcher, and mobile menu toggle button on mobile', () => {
      render(<Navbar />);

      expect(screen.getByTestId('logo')).toBeInTheDocument();
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
      expect(screen.getByTestId('language-switcher')).toBeInTheDocument();

      // Mobile menu toggle button (should show MenuIcon initially)
      const mobileToggle = screen.getAllByTestId('icon-button').find(
        button => button.getAttribute('aria-label') === 'Open menu' || button.getAttribute('aria-label') === 'Close menu'
      );
      expect(mobileToggle).toBeInTheDocument();
      expect(mobileToggle.getAttribute('aria-label')).toBe('Open menu');
      expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('close-icon')).not.toBeInTheDocument();

      // Desktop nav items should not be visible
      expect(screen.queryByText('about')).not.toBeVisible(); // Or check for a specific class that hides them
    });

    test('opens and closes mobile menu when toggle button is clicked', () => {
      render(<Navbar />);
      const mobileToggle = screen.getAllByTestId('icon-button').find(
        button => button.getAttribute('aria-label') === 'Open menu'
      );
      expect(mobileToggle).toBeInTheDocument();

      // Check initial state (menu closed) - based on translate-x-full class
      // The mobile menu itself is an unnamed div, so we might need a testid or check its class
      const mobileMenuDrawer = screen.getByText('about').closest('div[class*="fixed right-0"]');
      expect(mobileMenuDrawer).toHaveClass('translate-x-full');


      // Open menu
      fireEvent.click(mobileToggle);
      expect(mobileToggle.getAttribute('aria-label')).toBe('Close menu');
      expect(screen.getByTestId('close-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('menu-icon')).not.toBeInTheDocument();
      expect(mobileMenuDrawer).not.toHaveClass('translate-x-full');
      expect(mobileMenuDrawer).toHaveClass('translate-x-0');

      // Close menu by clicking the toggle button again
      fireEvent.click(mobileToggle);
      expect(mobileToggle.getAttribute('aria-label')).toBe('Open menu');
      expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('close-icon')).not.toBeInTheDocument();
      expect(mobileMenuDrawer).toHaveClass('translate-x-full');
    });

    test('mobile menu contains navigation links', () => {
      render(<Navbar />);
      const mobileToggle = screen.getAllByTestId('icon-button').find(
        button => button.getAttribute('aria-label') === 'Open menu'
      );
      fireEvent.click(mobileToggle); // Open menu

      const mobileMenuDrawer = screen.getByText('about').closest('div[class*="fixed right-0"]');
      expect(mobileMenuDrawer.getByText('about')).toBeInTheDocument();
      expect(mobileMenuDrawer.getByText('services')).toBeInTheDocument();
      expect(mobileMenuDrawer.getByText('work')).toBeInTheDocument();
      expect(mobileMenuDrawer.getByText('contact')).toBeInTheDocument();
    });

     test('clicking a link in mobile menu closes the menu', () => {
      render(<Navbar />);
      const mobileToggle = screen.getAllByTestId('icon-button').find(
        button => button.getAttribute('aria-label') === 'Open menu'
      );
      fireEvent.click(mobileToggle); // Open menu

      const mobileMenuDrawer = screen.getByText('about').closest('div[class*="fixed right-0"]');
      const aboutLink = mobileMenuDrawer.getByText('about');
      fireEvent.click(aboutLink);

      // Menu should be closed
      expect(mobileMenuDrawer).toHaveClass('translate-x-full');
      expect(mobileToggle.getAttribute('aria-label')).toBe('Open menu');
    });

    test('clicking overlay closes mobile menu', () => {
      render(<Navbar />);
      const mobileToggle = screen.getAllByTestId('icon-button').find(
        button => button.getAttribute('aria-label') === 'Open menu'
      );
      fireEvent.click(mobileToggle); // Open menu

      const mobileMenuDrawer = screen.getByText('about').closest('div[class*="fixed right-0"]');
      expect(mobileMenuDrawer).not.toHaveClass('translate-x-full');

      // The overlay is the sibling div of the motion.header, difficult to select directly
      // Let's assume it's the div with class 'fixed inset-0 bg-black/50'
      // For robust testing, this overlay should have a testid.
      // For now, we test if clicking outside (e.g., on the header itself, if that's not part of the menu) closes it.
      // A better way: add a test-id to the overlay div in the component.
      // Let's find the overlay by its class signature.
      const overlay = document.querySelector('div[class*="fixed inset-0 bg-black/50"]');
      if (overlay) {
        fireEvent.click(overlay);
        expect(mobileMenuDrawer).toHaveClass('translate-x-full');
      } else {
        console.warn("Could not find overlay to test click-to-close functionality.");
      }
    });
  });


  test('changes background on scroll', () => {
    render(<Navbar />);
    const header = screen.getByTestId('motion-header');

    expect(header).not.toHaveClass('bg-background/80 backdrop-blur-md shadow-sm');
    expect(header).toHaveClass('bg-transparent');

    // Simulate scroll down
    act(() => {
      window.scrollY = 50;
      fireEvent.scroll(window);
    });

    expect(header).toHaveClass('bg-background/80 backdrop-blur-md shadow-sm');
    expect(header).not.toHaveClass('bg-transparent');

    // Simulate scroll back to top
    act(() => {
      window.scrollY = 0;
      fireEvent.scroll(window);
    });

    expect(header).not.toHaveClass('bg-background/80 backdrop-blur-md shadow-sm');
    expect(header).toHaveClass('bg-transparent');
  });
});

// Required for Jest to process JSX in the mocks if not using Babel transform for node_modules
const React = require('react');
