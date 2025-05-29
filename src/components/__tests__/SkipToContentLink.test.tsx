import { render, screen, fireEvent, act } from '@testing-library/react';
import SkipToContentLink from '../SkipToContentLink'; // Adjust the path as necessary

describe('SkipToContentLink Component', () => {
  let mainContentElement;
  let originalQuerySelector;

  beforeEach(() => {
    // Create a mock main content element for testing focus behavior
    mainContentElement = document.createElement('main');
    mainContentElement.id = 'main'; // Assuming your main content has an id or is a <main> tag
    document.body.appendChild(mainContentElement);

    // Mock document.querySelector to return our mock main content
    originalQuerySelector = document.querySelector;
    document.querySelector = jest.fn(selector => {
      if (selector === 'main') {
        return mainContentElement;
      }
      return originalQuerySelector(selector); // Fallback for other selectors
    });

    // Spy on focus and removeAttribute
    jest.spyOn(mainContentElement, 'focus');
    jest.spyOn(mainContentElement, 'removeAttribute');
    jest.useFakeTimers(); // For setTimeout
  });

  afterEach(() => {
    document.body.removeChild(mainContentElement);
    document.querySelector = originalQuerySelector; // Restore original querySelector
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('renders a link with the correct href and text', () => {
    render(<SkipToContentLink />);
    const linkElement = screen.getByRole('link', { name: 'Skip to content' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '#main');
  });

  test('is visually hidden by default (sr-only class)', () => {
    render(<SkipToContentLink />);
    const linkElement = screen.getByRole('link', { name: 'Skip to content' });
    expect(linkElement).toHaveClass('sr-only');
  });

  test('becomes visible on focus (removes sr-only effectively due to focus:not-sr-only)', () => {
    render(<SkipToContentLink />);
    const linkElement = screen.getByRole('link', { name: 'Skip to content' });
    
    // Note: Testing focus styles that are purely CSS driven (like focus:not-sr-only)
    // is tricky with JSDOM because it doesn't apply styles or layout.
    // We can check that the class for being "focusable and then visible" is present.
    // The important part is that it *can* receive focus.
    // We'll check for the classes that would make it visible on focus.
    expect(linkElement).toHaveClass('focus:not-sr-only focus:absolute'); 
    
    // Simulate focus (though JSDOM doesn't fully replicate browser focus styling)
    // fireEvent.focus(linkElement);
    // It's hard to assert the "not-sr-only" directly without a browser environment.
    // We assert that the necessary classes for this behavior are present.
  });

  test('onClick handler prevents default, focuses main content, and sets/removes tabindex', () => {
    render(<SkipToContentLink />);
    const linkElement = screen.getByRole('link', { name: 'Skip to content' });

    // fireEvent.click returns false if preventDefault was called, true otherwise.
    const clickResult = fireEvent.click(linkElement);

    expect(clickResult).toBe(false); // Indicates preventDefault was called
    expect(document.querySelector).toHaveBeenCalledWith('main');
    expect(mainContentElement.tabIndex).toBe(-1);
    expect(mainContentElement.focus).toHaveBeenCalledTimes(1);

    // Fast-forward timers for setTimeout
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(mainContentElement.removeAttribute).toHaveBeenCalledWith('tabindex');
  });

  test('handles case where main content is not found gracefully', () => {
    // Override document.querySelector for this specific test
    document.querySelector = jest.fn(selector => {
      if (selector === 'main') {
        return null; // Simulate main content not found
      }
      return originalQuerySelector(selector);
    });

    render(<SkipToContentLink />);
    const linkElement = screen.getByRole('link', { name: 'Skip to content' });
    
    // No error should be thrown
    let clickResult;
    expect(() => {
      clickResult = fireEvent.click(linkElement);
    }).not.toThrow();
    
    expect(clickResult).toBe(false); // Indicates preventDefault was called
    expect(mainContentElement.focus).not.toHaveBeenCalled(); // Original mainContentElement's focus
  });
});
