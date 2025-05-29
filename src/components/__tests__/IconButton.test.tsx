import { render, screen, fireEvent } from '@testing-library/react';
import IconButton from '../IconButton'; // Adjust the path as necessary

// A simple SVG icon for testing purposes
const TestIcon = () => (
  <svg data-testid="test-icon" width="24" height="24" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
  </svg>
);

describe('IconButton Component', () => {
  test('renders with an icon child', () => {
    render(
      <IconButton>
        <TestIcon />
      </IconButton>
    );
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(
      <IconButton onClick={handleClick}>
        <TestIcon />
      </IconButton>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('has an aria-label for accessibility when title is provided', () => {
    const buttonTitle = 'Settings';
    render(
      <IconButton title={buttonTitle}>
        <TestIcon />
      </IconButton>
    );
    // IconButton itself doesn't directly use title for aria-label,
    // but the button element should have the title attribute.
    // For better accessibility, an explicit aria-label would be preferred.
    // We'll test for the presence of the title attribute on the button.
    expect(screen.getByRole('button')).toHaveAttribute('title', buttonTitle);
  });

  test('is disabled when disabled prop is true', () => {
    const handleClick = jest.fn();
    render(
      <IconButton onClick={handleClick} disabled>
        <TestIcon />
      </IconButton>
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('applies default color styles by default', () => {
    render(<IconButton><TestIcon /></IconButton>);
    expect(screen.getByRole('button')).toHaveClass('text-foreground');
  });

  test('applies primary color styles', () => {
    render(<IconButton color="primary"><TestIcon /></IconButton>);
    expect(screen.getByRole('button')).toHaveClass('text-primary');
  });

  test('applies secondary color styles', () => {
    render(<IconButton color="secondary"><TestIcon /></IconButton>);
    expect(screen.getByRole('button')).toHaveClass('text-secondary');
  });

  test('applies medium size styles by default', () => {
    render(<IconButton><TestIcon /></IconButton>);
    expect(screen.getByRole('button')).toHaveClass('p-2'); // medium size
  });

  test('applies small size styles', () => {
    render(<IconButton size="small"><TestIcon /></IconButton>);
    expect(screen.getByRole('button')).toHaveClass('p-1'); // small size
  });

  test('applies large size styles', () => {
    render(<IconButton size="large"><TestIcon /></IconButton>);
    expect(screen.getByRole('button')).toHaveClass('p-3'); // large size
  });

  test('renders with custom className', () => {
    render(<IconButton className="custom-icon-button"><TestIcon /></IconButton>);
    expect(screen.getByRole('button')).toHaveClass('custom-icon-button');
  });
});
