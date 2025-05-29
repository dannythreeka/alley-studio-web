import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  test('renders with children text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders as a link when href is provided', () => {
    render(<Button href="/test-link">Link Button</Button>);
    const linkElement = screen.getByRole('link', { name: 'Link Button' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/test-link');
  });

  test('applies primary variant styles by default', () => {
    render(<Button>Primary Button</Button>);
    expect(screen.getByText('Primary Button')).toHaveClass('bg-primary');
  });

  test('applies secondary variant styles', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    expect(screen.getByText('Secondary Button')).toHaveClass('bg-accent');
  });

  test('applies outline variant styles', () => {
    render(<Button variant="outline">Outline Button</Button>);
    expect(screen.getByText('Outline Button')).toHaveClass('border-primary');
  });

  test('is disabled when disabled prop is true', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Disabled Button</Button>);
    const buttonElement = screen.getByText('Disabled Button');
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('opacity-50 cursor-not-allowed');
    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('renders with custom className', () => {
    render(<Button className="custom-class">Custom Class Button</Button>);
    expect(screen.getByText('Custom Class Button')).toHaveClass('custom-class');
  });
});
