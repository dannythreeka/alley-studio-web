import { render, screen } from '@testing-library/react';
import Section from '../Section'; // Adjust the path as necessary
import { motion } from 'framer-motion'; // Keep for type hints or if part of the component's API is tested directly

// The global mock in src/__mocks__/framer-motion.js will be used.
// No need for a local mock here.

describe('Section Component', () => {
  test('renders with children content', () => {
    render(<Section><div>Child Content</div></Section>);
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  test('applies id and className props to the motion.section element', () => {
    const { container } = render(<Section id="test-section" className="custom-class">Content</Section>);
    // The global mock renders a <section> element. We can select it by its id.
    const sectionElement = container.querySelector('#test-section'); 
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement).toHaveClass('custom-class');
    expect(sectionElement).toHaveClass('py-12 md:py-20'); // Default padding
  });

  test('applies default animation props (whileInView) when immediate is false (or not provided)', () => {
    render(<Section>Content</Section>);
    // With the global mock, framer-motion specific props should be filtered out and not on the DOM element.
    // We primarily test that the component renders without React warnings about unknown props.
    const { container } = render(<Section>Content</Section>);
    const sectionElement = container.querySelector('section'); // Get the rendered section
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement).not.toHaveAttribute('whileInView');
    expect(sectionElement).not.toHaveAttribute('viewport');
    expect(sectionElement).not.toHaveAttribute('initial'); // These should be filtered
    expect(sectionElement).not.toHaveAttribute('transition');
  });

  test('applies animate props correctly when immediate is true (mock behavior)', () => {
    // This test also now relies on the global mock filtering props.
    // The main assertion is that it renders and doesn't pass invalid props to DOM.
    const { container } = render(<Section immediate={true}>Content</Section>);
    const sectionElement = container.querySelector('section');
    expect(sectionElement).toBeInTheDocument();
    expect(sectionElement).not.toHaveAttribute('animate'); 
    expect(sectionElement).not.toHaveAttribute('initial');
    expect(sectionElement).not.toHaveAttribute('transition');
  });

  test('applies fullWidth styles to the inner div when fullWidth is true', () => {
    const { container } = render(<Section fullWidth={true}>Content</Section>);
    const sectionElement = container.querySelector('section');
    const innerDiv = sectionElement.querySelector('div'); 
    expect(innerDiv).toHaveClass('w-full');
    expect(innerDiv).not.toHaveClass('container mx-auto px-4 md:px-8');
  });

  test('applies container styles to the inner div by default (fullWidth is false)', () => {
    const { container } = render(<Section>Content</Section>);
    const sectionElement = container.querySelector('section');
    const innerDiv = sectionElement.querySelector('div');
    expect(innerDiv).toHaveClass('container mx-auto px-4 md:px-8');
    expect(innerDiv).not.toHaveClass('w-full');
  });

  test('applies border-b to inner div when not immediate', () => {
    const { container } = render(<Section>Content</Section>); // immediate is false by default
    const sectionElement = container.querySelector('section');
    const innerDiv = sectionElement.querySelector('div');
    expect(innerDiv).toHaveClass('border-b border-accent pb-6');
  });

  test('does not apply border-b to inner div when immediate is true', () => {
    const { container } = render(<Section immediate={true}>Content</Section>);
    const sectionElement = container.querySelector('section');
    const innerDiv = sectionElement.querySelector('div');
    expect(innerDiv).not.toHaveClass('border-b border-accent pb-6');
  });
});
