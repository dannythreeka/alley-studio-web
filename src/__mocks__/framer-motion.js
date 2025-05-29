import React from 'react';

const framerMotionProps = new Set([
  'initial', 'animate', 'variants', 'transition', 'whileHover', 'whileTap', 'whileFocus', 'whileDrag', 'whileInView', 'exit', 'layout', 'layoutId', 'onLayoutAnimationComplete', 'onViewportEnter', 'onViewportLeave',
  // Add any other motion-specific props you identify from warnings or docs
  'drag', 'dragConstraints', 'dragElastic', 'dragMomentum', 'dragSnapToOrigin', 'dragTransition',
  'onAnimationStart', 'onAnimationComplete', 'onUpdate', 'onDragStart', 'onDrag', 'onDragEnd',
  'positionTransition', // Deprecated but might appear
  'transformTemplate', 'transformValues',
  'layoutScroll', 'layoutRoot',
  // viewport specific ones from whileInView
  'viewport',
]);

const M = (tag) => {
  return React.forwardRef(({ children, ...props }, ref) => {
    const filteredProps = {};
    for (const key in props) {
      if (!framerMotionProps.has(key)) {
        filteredProps[key] = props[key];
      }
    }
    return React.createElement(tag, { ...filteredProps, ref }, children);
  });
};

export const motion = {
  div: M('div'),
  h2: M('h2'),
  p: M('p'),
  span: M('span'),
  ul: M('ul'),
  li: M('li'),
  header: M('header'),
  button: M('button'),
  section: M('section'), // Added for Section.tsx
  a: M('a'), // Added for potential animated links
  // Add other motion elements as needed by your components
};

// If your components use AnimatePresence, PresenceContext, etc., mock them minimally or re-export from actual
export const AnimatePresence = ({ children }) => <>{children}</>;
export const PresenceContext = null; // Or a more sophisticated mock if needed

// For other exports, you might need to re-export from actual or provide minimal mocks
const actual = jest.requireActual('framer-motion');
export const useAnimation = actual.useAnimation;
export const usePresence = actual.usePresence;
export const useCycle = actual.useCycle;
// Add any other specific exports your project uses if they cause issues

// Default export if some imports use `import fm from 'framer-motion'`
export default {
  motion,
  AnimatePresence,
  PresenceContext,
  useAnimation,
  usePresence,
  useCycle,
};
