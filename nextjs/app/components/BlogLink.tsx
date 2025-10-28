'use client'

import { useRouter } from 'next/navigation'

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
    const docAny = document as any
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      try {
        // Mark only the clicked card's title as the shared element
        const anchor = e.currentTarget as HTMLAnchorElement
        const titleEl = anchor.querySelector('[data-vt-title]') as HTMLElement | null
        if (titleEl) {
          // Ensure only this title participates
          titleEl.style.viewTransitionName = 'post-title'
        }
        docAny.startViewTransition(() => {
          // Use location.assign to allow cross-document transition
          window.location.assign(href)
        })
        return
      } catch (_) {
        // no-op, fallback below
      }
    }
    // Fallback for browsers that don't support View Transitions
    router.push(href)
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

