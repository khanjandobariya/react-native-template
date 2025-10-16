/* eslint-disable custom-rules/camelcase-dynamic-data */
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

  const H_FACT: number = isLandscape ? 0.6 : 0.8
  const V_FACT: number = isLandscape ? 1.2 : 0.8
  const FONT_FACT: number = 0.5

  const hs: (pixels: number) => number = useCallback(
    (pixels: number): number => {
      const value: number = isTab ? pixels * H_FACT : pixels
      return wp((value / GUIDELINE_BASE_WIDTH) * 100)
    },
    [isLandscape, isPortrait]
  )

  const vs: (pixels: number) => number = useCallback(
    (pixels: number): number => {
      const value: number = isTab ? pixels * V_FACT : pixels

      return hp((value / GUIDELINE_BASE_HEIGHT) * 100)
    },
    [isLandscape, isPortrait]
  )

  const ms: (pixels: number) => number = useCallback(
    (pixels: number): number => {
      const value: number = isTab ? pixels * FONT_FACT : pixels

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
