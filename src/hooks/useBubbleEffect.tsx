import { useEffect, useCallback, useRef } from 'react';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  element: HTMLDivElement;
}

const INTERACTIVE_SELECTORS = 'button, a, [role="button"], [role="link"], .interactive, nav a, .nav-link, [data-interactive]';
const MAX_BUBBLES_PER_INTERACTION = 4;
const BUBBLE_LIFETIME = 400; // ms

export const useBubbleEffect = () => {
  const bubblesRef = useRef<Bubble[]>([]);
  const bubbleIdRef = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastBubbleTimeRef = useRef(0);
  const throttleDelay = 80; // ms between bubble spawns

  const createBubble = useCallback((x: number, y: number) => {
    if (!containerRef.current) return;

    const now = Date.now();
    if (now - lastBubbleTimeRef.current < throttleDelay) return;
    lastBubbleTimeRef.current = now;

    // Limit active bubbles
    if (bubblesRef.current.length >= MAX_BUBBLES_PER_INTERACTION * 2) return;

    const numBubbles = Math.floor(Math.random() * 2) + 2; // 2-3 bubbles

    for (let i = 0; i < numBubbles; i++) {
      const bubble = document.createElement('div');
      const size = Math.random() * 8 + 4; // 4-12px
      const offsetX = (Math.random() - 0.5) * 30;
      const offsetY = (Math.random() - 0.5) * 30;
      const floatX = (Math.random() - 0.5) * 40;
      const floatY = -Math.random() * 30 - 10;

      bubble.className = 'bubble-particle';
      bubble.style.cssText = `
        position: fixed;
        left: ${x + offsetX}px;
        top: ${y + offsetY}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: hsl(var(--primary) / 0.4);
        pointer-events: none;
        z-index: 9999;
        --float-x: ${floatX}px;
        --float-y: ${floatY}px;
        animation: bubbleFloat ${BUBBLE_LIFETIME}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
      `;

      containerRef.current.appendChild(bubble);

      const bubbleData: Bubble = {
        id: bubbleIdRef.current++,
        x,
        y,
        size,
        element: bubble,
      };

      bubblesRef.current.push(bubbleData);

      // Clean up after animation
      setTimeout(() => {
        bubble.remove();
        bubblesRef.current = bubblesRef.current.filter(b => b.id !== bubbleData.id);
      }, BUBBLE_LIFETIME);
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(INTERACTIVE_SELECTORS)) {
      createBubble(e.clientX, e.clientY);
    }
  }, [createBubble]);

  const handleMouseEnter = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target && typeof target.matches === 'function' && target.matches(INTERACTIVE_SELECTORS)) {
      createBubble(e.clientX, e.clientY);
    } else if (target && target.closest && target.closest(INTERACTIVE_SELECTORS)) {
      createBubble(e.clientX, e.clientY);
    }
  }, [createBubble]);

  useEffect(() => {
    // Create container for bubbles
    const container = document.createElement('div');
    container.id = 'bubble-container';
    container.style.cssText = 'position: fixed; inset: 0; pointer-events: none; z-index: 9999; overflow: hidden;';
    document.body.appendChild(container);
    containerRef.current = container;

    // Add CSS animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes bubbleFloat {
        0% {
          opacity: 0.7;
          transform: translate(0, 0) scale(1);
        }
        50% {
          opacity: 0.5;
          transform: translate(calc(var(--float-x) * 0.5), calc(var(--float-y) * 0.5)) scale(1.1);
        }
        100% {
          opacity: 0;
          transform: translate(var(--float-x), var(--float-y)) scale(0.3);
        }
      }
    `;
    document.head.appendChild(style);

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true, capture: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, { capture: true });
      container.remove();
      style.remove();
    };
  }, [handleMouseMove, handleMouseEnter]);
};

export default useBubbleEffect;
