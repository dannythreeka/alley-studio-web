import { render, screen, fireEvent, act } from '@testing-library/react';
import ScrollToTopButton from '../ScrollToTopButton'; // Adjust the path as necessary
import { AnimatePresence, motion } from 'framer-motion'; // Keep these for type hints if using TS, or if part of the component's API is tested directly

// The global mock in src/__mocks__/framer-motion.js will be used.
// No need for a local mock here.

describe('ScrollToTopButton Component', () => {
  let scrollToSpy;

  beforeEach(() => {
    // Mock window.scrollTo
    scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
    // Reset scroll position and visibility before each test
    window.scrollY = 0;
    // Trigger a scroll event to ensure initial state is set based on scrollY = 0
    act(() => {
      fireEvent.scroll(window);
    });
  });

  afterEach(() => {
    scrollToSpy.mockRestore();
    jest.clearAllMocks();
  });

  test('is hidden initially (when scrollY is 0)', () => {
    render(<ScrollToTopButton />);
    // Since AnimatePresence mock renders children directly, and motion.button mock renders a button,
    // we check for the absence of the button by its aria-label.
    expect(screen.queryByLabelText('Scroll to top')).toBeNull();
  });

  test('becomes visible after scrolling down (scrollY > 500)', () => {
    render(<ScrollToTopButton />);

    // Simulate scroll down
    act(() => {
      window.scrollY = 600;
      fireEvent.scroll(window);
    });

    // The button should now be rendered by the global mock.
    // It has aria-label="Scroll to top" from the component.
    expect(screen.getByLabelText('Scroll to top')).toBeInTheDocument();
  });

  test('becomes hidden again after scrolling up (scrollY <= 500)', () => {
    render(<ScrollToTopButton />);

    // First, scroll down to make it visible
    act(() => {
      window.scrollY = 600;
      fireEvent.scroll(window);
    });
    expect(screen.getByLabelText('Scroll to top')).toBeInTheDocument();

    // Then, scroll back up
    act(() => {
      window.scrollY = 300;
      fireEvent.scroll(window);
    });
    
    expect(screen.queryByLabelText('Scroll to top')).toBeNull();
  });

  test('calls window.scrollTo({ top: 0, behavior: "smooth" }) when clicked', () => {
    render(<ScrollToTopButton />);

    // Scroll down to make it visible
    act(() => {
      window.scrollY = 600;
      fireEvent.scroll(window);
    });

    const button = screen.getByLabelText('Scroll to top');
    fireEvent.click(button);

    expect(scrollToSpy).toHaveBeenCalledTimes(1);
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  test('removes scroll event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<ScrollToTopButton />);
    
    unmount();
    
    // Check if removeEventListener was called for the 'scroll' event with the specific function.
    // This is hard to check directly for the exact function instance without exporting it.
    // However, we can check if it was called for the 'scroll' event.
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
