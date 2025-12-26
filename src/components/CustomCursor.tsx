import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorVariant = 'default' | 'link' | 'button' | 'text' | 'image' | 'input';

const CURSOR_CONFIG: Record<CursorVariant, { size: number; color: string; blend: string; label?: string }> = {
  default: { size: 12, color: 'hsl(var(--primary))', blend: 'difference' },
  link: { size: 48, color: 'hsl(var(--primary) / 0.15)', blend: 'normal', label: 'View' },
  button: { size: 56, color: 'hsl(var(--primary) / 0.2)', blend: 'normal', label: 'Click' },
  text: { size: 4, color: 'hsl(var(--foreground))', blend: 'difference' },
  image: { size: 72, color: 'hsl(var(--primary) / 0.1)', blend: 'normal', label: 'Explore' },
  input: { size: 2, color: 'hsl(var(--primary))', blend: 'normal' },
};

const CustomCursor = () => {
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const getElementType = useCallback((element: HTMLElement): CursorVariant => {
    // Check for specific element types
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.isContentEditable) {
      return 'input';
    }
    if (element.tagName === 'IMG' || element.closest('[data-cursor="image"]') || element.classList.contains('portfolio-image')) {
      return 'image';
    }
    if (element.tagName === 'BUTTON' || element.closest('button') || element.getAttribute('role') === 'button' || element.closest('[data-cursor="button"]')) {
      return 'button';
    }
    if (element.tagName === 'A' || element.closest('a') || element.getAttribute('role') === 'link') {
      return 'link';
    }
    if (element.tagName === 'P' || element.tagName === 'SPAN' || element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3' || element.tagName === 'H4' || element.tagName === 'H5' || element.tagName === 'H6') {
      // Only for text that's selectable and not inside interactive elements
      if (!element.closest('button, a, [role="button"], [role="link"]')) {
        return 'text';
      }
    }
    return 'default';
  }, []);

  useEffect(() => {
    // Check for mobile/touch devices
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      const target = e.target as HTMLElement;
      const elementType = getElementType(target);
      setVariant(elementType);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    if (!isMobile) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);

      // Hide default cursor
      document.body.style.cursor = 'none';
      const style = document.createElement('style');
      style.id = 'custom-cursor-styles';
      style.textContent = `
        *, *::before, *::after {
          cursor: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.style.cursor = '';
      const style = document.getElementById('custom-cursor-styles');
      if (style) style.remove();
      window.removeEventListener('resize', checkMobile);
    };
  }, [cursorX, cursorY, getElementType, isMobile]);

  // Don't render on mobile/touch devices
  if (isMobile) return null;

  const config = CURSOR_CONFIG[variant];

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full"
          animate={{
            width: config.size,
            height: config.size,
            backgroundColor: config.color,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            mixBlendMode: config.blend as any,
            border: variant === 'default' ? '2px solid hsl(var(--primary))' : 'none',
          }}
        >
          {config.label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[10px] font-medium text-primary-foreground uppercase tracking-wider"
              style={{ color: 'hsl(var(--primary))' }}
            >
              {config.label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Trailing ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border-2 border-primary/30"
          animate={{
            width: variant === 'default' ? 32 : config.size + 16,
            height: variant === 'default' ? 32 : config.size + 16,
            opacity: isVisible ? (variant === 'default' ? 0.5 : 0.3) : 0,
            scale: variant === 'button' || variant === 'link' ? 1.1 : 1,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
