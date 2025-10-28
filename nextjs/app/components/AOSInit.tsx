'use client'

import { useEffect } from 'react'
import AOS from 'aos'

export default function AOSInit() {
  useEffect(() => {
    try {
      AOS.init({ duration: 1000, easing: 'ease-out-cubic', offset: 100, once: true })
    } catch (_) {
      // no-op
    }
  }, [])
  return null
}


