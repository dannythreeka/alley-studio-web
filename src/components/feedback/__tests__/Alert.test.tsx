import { render, screen, fireEvent } from '@testing-library/react';
import Alert from '../Alert'; // Assuming Alert.tsx is in the parent directory

describe('Alert Component', () => {
  test('renders with children message', () => {
    render(<Alert>This is an alert message.</Alert>);
    expect(screen.getByText('This is an alert message.')).toBeInTheDocument();
  });

  test('applies info severity styles and icon by default', () => {
    render(<Alert>Info alert</Alert>);
    const alertDiv = screen.getByText('Info alert').closest('div.flex.items-center').parentElement;
    expect(alertDiv).toHaveClass('bg-blue-50 text-blue-800 border-blue-200');
    // Check for info icon (using part of its path data as a proxy or a more specific selector)
    expect(alertDiv.querySelector('svg path[d*="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h.01a1 1 0 000-2H9z"]')).toBeInTheDocument();
  });

  test('applies success severity styles and icon', () => {
    render(<Alert severity="success">Success alert</Alert>);
    const alertDiv = screen.getByText('Success alert').closest('div.flex.items-center').parentElement;
    expect(alertDiv).toHaveClass('bg-green-50 text-green-800 border-green-200');
    // Check for success icon
    expect(alertDiv.querySelector('svg path[d*="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"]')).toBeInTheDocument();
  });

  test('applies error severity styles and icon', () => {
    render(<Alert severity="error">Error alert</Alert>);
    const alertDiv = screen.getByText('Error alert').closest('div.flex.items-center').parentElement;
    expect(alertDiv).toHaveClass('bg-red-50 text-red-800 border-red-200');
    // Check for error icon
    expect(alertDiv.querySelector('svg path[d*="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"]')).toBeInTheDocument();
  });

  test('applies warning severity styles and icon', () => {
    render(<Alert severity="warning">Warning alert</Alert>);
    const alertDiv = screen.getByText('Warning alert').closest('div.flex.items-center').parentElement;
    expect(alertDiv).toHaveClass('bg-amber-50 text-amber-800 border-amber-200');
    // Check for warning icon
    expect(alertDiv.querySelector('svg path[d*="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"]')).toBeInTheDocument();
  });

  test('calls onClose handler when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<Alert onClose={handleClose}>Closable alert</Alert>);
    const closeButton = screen.getByRole('button', { name: 'Close alert' });
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('does not render close button if onClose handler is not provided', () => {
    render(<Alert>Non-closable alert</Alert>);
    expect(screen.queryByRole('button', { name: 'Close alert' })).not.toBeInTheDocument();
  });
});
