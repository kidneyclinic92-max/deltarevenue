import { useState, useEffect, useRef } from 'react'

/**
 * Hook that detects when an element enters the viewport.
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Ratio of visibility (0-1). Default 0.1
 * @param {string} options.rootMargin - Margin around root. Default '-50px 0px -50px 0px'
 * @returns {[React.RefObject, boolean]} - [ref to attach to element, isInView]
 */
export function useInView(options = {}) {
  const { threshold = 0.1, rootMargin = '-50px 0px -50px 0px' } = options
  const [isInView, setIsInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold, rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, isInView]
}
