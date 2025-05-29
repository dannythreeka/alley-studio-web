import { render, screen, act } from '@testing-library/react';
import PageLoader from '../PageLoader'; // Adjust the path as necessary
import { AnimatePresence, motion } from 'framer-motion'; // Import for potential mocking needs

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    const { src, alt, fill, ...rest } = props;
    if (fill) {
      delete rest.width;
      delete rest.height;
    }
    // Ensure a default data-testid if none is provided, or allow override
    const testId = rest['data-testid'] || "next-image";
    delete rest['data-testid']; // remove from rest to avoid duplicate attribute
    return <img src={src} alt={alt} {...rest} data-testid={testId} />;
  },
}));

// The global mock in src/__mocks__/framer-motion.js will be used.
// No need for a local mock here.


describe('PageLoader Component', () => {
  jest.useFakeTimers(); // Use fake timers for setTimeout

  beforeEach(() => {
    // Clear any pending timers before each test
    jest.clearAllTimers();
  });

  test('renders the loader initially', () => {
    render(<PageLoader />);

    expect(screen.getByTestId('page-loader-container')).toBeInTheDocument();
    expect(screen.getByAltText('Loading')).toBeInTheDocument(); // The Next/Image mock
    expect(screen.getByTestId('page-loader-text-main')).toHaveTextContent('ALLEY STUDIO');
    expect(screen.getByTestId('page-loader-text-sub')).toHaveTextContent('巷製所');
    expect(screen.getByTestId('page-loader-spinner')).toBeInTheDocument();

    // Check ARIA status
    const statusRegion = screen.getByRole('status', { hidden: true }); // sr-only makes it hidden
    expect(statusRegion).toHaveTextContent('Loading site content, please wait.');
  });

  test('hides the loader after the timeout (1500ms)', () => {
    render(<PageLoader />);

    // Initially visible
    expect(screen.getByTestId('page-loader-container')).toBeInTheDocument();
    const statusRegion = screen.getByRole('status', { hidden: true });
    expect(statusRegion).toHaveTextContent('Loading site content, please wait.');

    // Fast-forward timers
    act(() => {
      jest.advanceTimersByTime(1500);
    });

    // Now the loader container should not be in the document
    // because AnimatePresence mock renders its children (which become null when loading is false)
    expect(screen.queryByTestId('page-loader-container')).toBeNull();
    expect(statusRegion).toHaveTextContent('Content loaded');
  });

  test('updates aria-live region when loading state changes', () => {
    render(<PageLoader />);
    const statusRegion = screen.getByRole('status', { hidden: true });

    // Initial state
    expect(statusRegion).toHaveTextContent('Loading site content, please wait.');

    // Fast-forward timers
    act(() => {
      jest.advanceTimersByTime(1500);
    });

    // After loading
    expect(statusRegion).toHaveTextContent('Content loaded');
  });

  test('clears timeout on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    const { unmount } = render(<PageLoader />);

    unmount();
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
    clearTimeoutSpy.mockRestore();
  });
});
