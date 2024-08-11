export interface DashboardRootRendererContextValue {
    breakpoint: BreakpointKey
    colWidth: number
    rowHeight: number
    isPc: boolean
    designWidth: number
    designHeight: number
    themeProvider: string
    scale: number

    mobileRowHeight: number
}

export interface DashboardRootProps {
    breakpoints: string[]
    designWidth?: number
    designHeight?: number

    distributed?: boolean
    className?: string
    style?: React.CSSProperties
    isDarkTheme?: boolean
    showBg?: boolean
    children?: React.ReactNode
    cols?: number
    rows?: number
    rowheight?: number
    themeProvider?: string
    backgroundColor?: string
    backgroundImage?: string
}

export type BreakpointKey = 'showroom' | 'desktop' | 'tablet' | 'mobile'

export type Breakpoints = Record<BreakpointKey, number>

export interface PositionDecoratorOptions {
    w: number
    h: number
    x: number
    y: number
    minW?: number
    maxW?: number
    minH?: number
    maxH?: number
    padding?: number | string | number[]
    overflowHidden?: boolean
    style?: React.CSSProperties
    zIndex?: number
    className?: string
    elementId?: string
    isSelected?: boolean
}
