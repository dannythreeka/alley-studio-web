import { render, screen } from '@testing-library/react';
import Logo from '../Logo';

describe('Logo Component', () => {
  test('renders the logo image with correct attributes', () => {
    render(<Logo />);
    const imgElement = screen.getByAltText('Alley Studio Logo');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', '/images/alley-studio-logo.svg');
    expect(imgElement).toHaveAttribute('width', '40');
    expect(imgElement).toHaveAttribute('height', '40');
  });

  test('renders the company name and tagline', () => {
    render(<Logo />);
    expect(screen.getByText('巷製所')).toBeInTheDocument();
    expect(screen.getByText('Alley Studio')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<Logo className="custom-logo-class" />);
    // Check if the motion.div (the root element of Logo) has the custom class
    // This might require a more specific selector if the internal structure is complex
    // For now, we assume the className is applied to the outermost div.
    const logoContainer = screen.getByText('巷製所').closest('div.flex.items-center');
    expect(logoContainer).toHaveClass('custom-logo-class');
  });
});
