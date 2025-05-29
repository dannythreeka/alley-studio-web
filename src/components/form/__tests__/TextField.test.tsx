import { render, screen, fireEvent } from '@testing-library/react';
import { Input, TextArea } from '../TextField'; // Assuming TextField.tsx exports Input and TextArea

describe('Input Component', () => {
  test('renders with label and placeholder', () => {
    render(<Input id="test-input" label="Test Label" placeholder="Enter text" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  test('calls onChange handler with correct value', () => {
    const handleChange = jest.fn();
    render(<Input id="test-input" label="Test Label" onChange={handleChange} />);
    const inputElement = screen.getByLabelText('Test Label');
    fireEvent.change(inputElement, { target: { value: 'test value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    // For <input type="text">, event.target.value is the way to get the value
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: 'test value' })
    }));
  });

  test('displays error message when error prop is provided', () => {
    render(<Input id="test-input" label="Test Label" error="This is an error" />);
    expect(screen.getByText('This is an error')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Label')).toHaveClass('border-red-500');
  });

  test('is disabled when disabled prop is true', () => {
    render(<Input id="test-input" label="Test Label" disabled />);
    expect(screen.getByLabelText('Test Label')).toBeDisabled();
  });

  test('renders with startIcon and endIcon', () => {
    render(
      <Input
        id="test-input"
        label="Test Label"
        startIcon={<span>Start</span>}
        endIcon={<span>End</span>}
      />
    );
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('End')).toBeInTheDocument();
    // Check for padding classes
    expect(screen.getByLabelText('Test Label')).toHaveClass('pl-10 pr-10');
  });

  test('applies fullWidth class when fullWidth prop is true', () => {
    render(<Input id="test-input" label="Test Label" fullWidth />);
    // The w-full class is applied to the parent div
    expect(screen.getByLabelText('Test Label').closest('div.mb-4')).toHaveClass('w-full');
  });
});

describe('TextArea Component', () => {
  test('renders with label and placeholder', () => {
    render(<TextArea id="test-textarea" label="Test Label" placeholder="Enter text" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  test('calls onChange handler with correct value', () => {
    const handleChange = jest.fn();
    render(<TextArea id="test-textarea" label="Test Label" onChange={handleChange} />);
    const textAreaElement = screen.getByLabelText('Test Label');
    fireEvent.change(textAreaElement, { target: { value: 'test value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: 'test value' })
    }));
  });

  test('displays error message when error prop is provided', () => {
    render(<TextArea id="test-textarea" label="Test Label" error="This is an error" />);
    expect(screen.getByText('This is an error')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Label')).toHaveClass('border-red-500');
  });

  test('is disabled when disabled prop is true', () => {
    render(<TextArea id="test-textarea" label="Test Label" disabled />);
    expect(screen.getByLabelText('Test Label')).toBeDisabled();
  });

  test('renders with specified number of rows', () => {
    render(<TextArea id="test-textarea" label="Test Label" rows={5} />);
    expect(screen.getByLabelText('Test Label')).toHaveAttribute('rows', '5');
  });

  test('applies fullWidth class when fullWidth prop is true', () => {
    render(<TextArea id="test-textarea" label="Test Label" fullWidth />);
    // The w-full class is applied to the parent div
    expect(screen.getByLabelText('Test Label').closest('div.mb-4')).toHaveClass('w-full');
  });
});
