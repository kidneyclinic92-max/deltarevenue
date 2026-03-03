import { useInView } from '../hooks/useInView'

/**
 * Wraps content and animates it into view on scroll.
 * MindMate-style: supports slide up, slide from left, slide from right.
 * @param {React.ReactNode} children
 * @param {string} className - Additional classes for the wrapper
 * @param {number} delay - Optional delay in ms for stagger (e.g. 100, 200)
 * @param {string} as - HTML element type: 'div', 'section', 'article'. Default 'div'
 * @param {'up'|'left'|'right'} direction - 'up' (default), 'left', or 'right' for sideways slide-in
 */
export function AnimateOnScroll({ children, className = '', delay = 0, as: Tag = 'div', direction = 'up' }) {
  const [ref, isInView] = useInView({ threshold: 0.08, rootMargin: '-40px 0px -40px 0px' })

  const directionClasses = {
    up: isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
    left: isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12',
    right: isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12',
  }

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out ${directionClasses[direction]} ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  )
}
