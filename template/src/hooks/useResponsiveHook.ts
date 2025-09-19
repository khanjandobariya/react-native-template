import {useCallback} from 'react'
import {isTablet} from 'react-native-device-info'
import {useResponsive, type UseResponsiveReturnType} from 'react-native-responsive-hook'

const GUIDELINE_BASE_WIDTH: number = 375
const GUIDELINE_BASE_HEIGHT: number = 812

export type RSType = {
  hs: (pixels: number) => number
  vs: (pixels: number) => number
  ms: (pixels: number) => number
  isTab: boolean
} & UseResponsiveReturnType

const useResponsiveHook = () => {
  const {
    wp,
    hp,
    rem,
    rf,
    vw,
    vh,
    isIOS,
    isAndroid,
    breakpointGroup,
    isLandscape,
    isPortrait
  }: UseResponsiveReturnType = useResponsive()

  const isTab: boolean = isTablet()

  const hs: (pixels: number) => number = useCallback(
    (pixels: number): number => {
      const diff: number = (pixels * 25) / 100
      const value: number = isLandscape ? pixels - diff : pixels
      return wp((value / GUIDELINE_BASE_WIDTH) * 100)
    },
    [isLandscape, isPortrait]
  )

  const vs: (pixels: number) => number = useCallback(
    (pixels: number): number => {
      const diff: number = isTab ? 1.5 : 2
      const value: number = isLandscape ? pixels * diff : pixels

      return hp((value / GUIDELINE_BASE_HEIGHT) * 100)
    },
    [isLandscape, isPortrait]
  )

  const ms: (pixels: number) => number = useCallback(
    (pixels: number): number => {
      const isDiff = isTab && pixels > 5
      const value: number = isDiff ? pixels - 5 : pixels

      return rem(value)
    },
    [isLandscape, isPortrait]
  )

  return {
    wp,
    hp,
    rem,
    rf,
    vw,
    vh,
    hs,
    vs,
    ms,
    isTab,
    isIOS,
    isAndroid,
    breakpointGroup,
    isLandscape,
    isPortrait
  }
}

export default useResponsiveHook
