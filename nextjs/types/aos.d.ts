declare module 'aos' {
  export type AosEasing =
    | 'linear'
    | 'ease'
    | 'ease-in'
    | 'ease-out'
    | 'ease-in-out'
    | string
    
  export type AosAnchorPlacement =
    | 'top-bottom'
    | 'top-center'
    | 'top-top'
    | 'center-bottom'
    | 'center-center'
    | 'center-top'
    | 'bottom-bottom'
    | 'bottom-center'
    | 'bottom-top'

  export type AosDisable = boolean | 'phone' | 'tablet' | 'mobile' | ((...args: unknown[]) => boolean)

  export interface AosOptions {
    // Core timing/animation options
    offset?: number
    delay?: number
    duration?: number
    easing?: AosEasing
    once?: boolean
    mirror?: boolean
    anchorPlacement?: AosAnchorPlacement

    // Behavior and performance options
    disable?: AosDisable
    startEvent?: string
    initClassName?: string
    animatedClassName?: string
    useClassNames?: boolean
    disableMutationObserver?: boolean
    debounceDelay?: number
    throttleDelay?: number
  }

  interface AosStatic {
    init(options?: AosOptions): void
    refresh(): void
    refreshHard(): void
  }

  const AOS: AosStatic
  export default AOS
}


