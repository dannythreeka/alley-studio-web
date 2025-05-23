'use client';

import { FC, ReactNode, useState, useRef, useEffect } from 'react';

interface MenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Menu: FC<MenuProps> = ({ anchorEl, open, onClose, children }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (open && anchorEl) {
      const updatePosition = () => {
        if (!menuRef.current) return;

        const rect = anchorEl.getBoundingClientRect();
        const menuRect = menuRef.current.getBoundingClientRect();
        const menuHeight = menuRect.height;

        // Check if there is enough space below the window to display the menu
        const windowHeight = window.innerHeight;
        const spaceBelow = windowHeight - rect.bottom;

        // If there is not enough space below, expand the menu upward; otherwise expand it downward
        const topPosition =
          spaceBelow < menuHeight
            ? rect.top - menuHeight // Expand upward, window coordinates
            : rect.bottom; // Expand downward, window coordinates

        // Ensure the left side does not overflow the screen
        const leftPosition = Math.max(
          0,
          Math.min(rect.left, window.innerWidth - menuRect.width)
        );

        setPosition({
          top: topPosition,
          left: leftPosition,
        });
      };

      // After initial positioning, wait for the next frame to adjust the position based on actual size
      const rect = anchorEl.getBoundingClientRect();
      setPosition({
        top: rect.bottom,
        left: rect.left,
      });

      // Wait for rendering to complete before adjusting the position again
      requestAnimationFrame(updatePosition);
    }
  }, [open, anchorEl]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        open
      ) {
        onClose();
      }
    };

    // Close the menu when clicking outside
    document.addEventListener('mousedown', handleClickOutside);

    // Reposition the menu when scrolling or resizing the window
    const handleRepositioning = () => {
      if (open && anchorEl && menuRef.current) {
        const rect = anchorEl.getBoundingClientRect();
        const menuRect = menuRef.current.getBoundingClientRect();

        const windowHeight = window.innerHeight;
        const spaceBelow = windowHeight - rect.bottom;

        const topPosition =
          spaceBelow < menuRect.height
            ? rect.top - menuRect.height
            : rect.bottom;

        const leftPosition = Math.max(
          0,
          Math.min(rect.left, window.innerWidth - menuRect.width)
        );

        setPosition({
          top: topPosition,
          left: leftPosition,
        });
      }
    };

    window.addEventListener('scroll', handleRepositioning);
    window.addEventListener('resize', handleRepositioning);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleRepositioning);
      window.removeEventListener('resize', handleRepositioning);
    };
  }, [open, onClose, anchorEl]);

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-background rounded-md shadow-lg py-1 min-w-[120px] border border-accent/30"
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {children}
    </div>
  );
};

interface MenuItemProps {
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
}

export const MenuItem: FC<MenuItemProps> = ({
  onClick,
  children,
  disabled = false,
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`px-4 py-2 text-sm cursor-pointer hover:bg-accent/10 flex items-center 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleClick}
      role="menuitem"
      tabIndex={0}
    >
      {children}
    </div>
  );
};
