'use client'

import { useRouter } from 'next/navigation'
import type { Route } from 'next'

interface BlogLinkProps {
  href: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}

export default function BlogLink({ href, className, ariaLabel, children }: BlogLinkProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // Cross-document View Transition if supported (same-origin)
    if (typeof document !== 'undefined' && document.startViewTransition) {
      try {
        // Mark only the clicked card's title as the shared element
        const anchor = e.currentTarget as HTMLAnchorElement
        const titleEl = anchor.querySelector('[data-vt-title]') as HTMLElement | null
        if (titleEl) {
          // Ensure only this title participates
          titleEl.style.setProperty('view-transition-name', 'post-title')
        }
        document.startViewTransition(() => {
          // Use location.assign to allow cross-document transition
          window.location.assign(href)
        })
        return
      } catch {
        // no-op, fallback below
      }
    }
    // Fallback for browsers that don't support View Transitions
    if (href.startsWith('/')) {
      // Safe: internal routes only; satisfies Next typed routes
      router.push(href as Route)
    } else {
      // External URL fallback
      window.location.assign(href)
    }
  }

  return (
    <a 
      href={href} 
      className={className} 
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}

