import { render, screen } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage'; // Adjust the path as necessary

describe('ErrorMessage Component', () => {
  test('renders null when no message prop is provided', () => {
    const { container } = render(<ErrorMessage />);
    // When returning null, the container's firstChild will be null
    expect(container.firstChild).toBeNull();
  });

  test('renders the message when a message prop is provided', () => {
    const testMessage = "This is an error.";
    render(<ErrorMessage message={testMessage} />);
    
    // Check if the element with role "alert" is present
    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();
    
    // Check if the message content is correct
    expect(alertElement).toHaveTextContent(testMessage);
    
    // Optionally, check for the class name if it's important
    expect(alertElement).toHaveClass('error-message');
  });

  test('renders null if the message prop is an empty string', () => {
    const { container } = render(<ErrorMessage message="" />);
    expect(container.firstChild).toBeNull();
  });
});
