declare global {
  interface Document {
    /** Optional View Transitions API entrypoint (not yet in TS DOM lib) */
    startViewTransition?: (callback: () => void) => void
  }
}

export {}


