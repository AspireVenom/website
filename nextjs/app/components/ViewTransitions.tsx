'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ViewTransitions() {
  const pathname = usePathname()

  useEffect(() => {
    // Add meta tag for view transitions if not already present
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      const existingMeta = document.querySelector('meta[name="view-transition"]')
      if (!existingMeta) {
        const meta = document.createElement('meta')
        meta.name = 'view-transition'
        meta.content = 'same-origin'
        document.head.appendChild(meta)
      }
    }
  }, [])

  // Trigger view transition on route change
  useEffect(() => {
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      // Add a class to indicate we're ready for transitions
      document.documentElement.classList.add('view-transitions-ready')
    }
  }, [pathname])

  return null
}

