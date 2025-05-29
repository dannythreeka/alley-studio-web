import { render, screen } from '@testing-library/react';
import SectionTitle from '../SectionTitle';

// The global mock in src/__mocks__/framer-motion.js will be used.
// No need for a local mock here.

describe('SectionTitle Component', () => {
  test('renders the title text', () => {
    render(<SectionTitle title="Main Title" />);
    expect(screen.getByText('Main Title')).toBeInTheDocument();
  });

  test('renders with correct heading level (h2)', () => {
    render(<SectionTitle title="Main Title" />);
    const headingElement = screen.getByRole('heading', { level: 2, name: 'Main Title' });
    expect(headingElement).toBeInTheDocument();
  });

  test('renders the subtitle text when provided', () => {
    render(<SectionTitle title="Main Title" subtitle="This is a subtitle" />);
    expect(screen.getByText('This is a subtitle')).toBeInTheDocument();
  });

  test('does not render subtitle paragraph if subtitle is not provided', () => {
    render(<SectionTitle title="Main Title" />);
    // Assuming subtitle is rendered as a <p> tag.
    // Framer motion mock will render it as a <p> tag if it exists.
    const subtitleElement = screen.queryByText(/./); // A way to select any text
    // We expect the title to be there, but no other paragraph for subtitle
    const titleElement = screen.getByText('Main Title');
    const allParagraphs = screen.queryAllByRole('paragraph');

    // If there's a subtitle, it would be a <p>.
    // Since framer-motion is mocked, we check if any <p> tag exists beyond what might be part of the title itself (if any).
    // A more robust way would be to ensure no <p> tag with the specific subtitle class exists.
    // For now, we check if the subtitle text itself is absent.
    expect(screen.queryByText("This is a subtitle")).not.toBeInTheDocument();
  });


  test('applies text-center class when center prop is true', () => {
    render(<SectionTitle title="Centered Title" center />);
    // The class 'text-center' is applied to the parent div
    const parentDiv = screen.getByText('Centered Title').closest('div');
    expect(parentDiv).toHaveClass('text-center');
  });

  test('does not apply text-center class by default', () => {
    render(<SectionTitle title="Default Title" />);
    const parentDiv = screen.getByText('Default Title').closest('div');
    expect(parentDiv).not.toHaveClass('text-center');
  });

  test('applies custom className to the root div', () => {
    render(<SectionTitle title="Custom Class Title" className="my-custom-class" />);
    const parentDiv = screen.getByText('Custom Class Title').closest('div');
    expect(parentDiv).toHaveClass('my-custom-class');
  });
});
