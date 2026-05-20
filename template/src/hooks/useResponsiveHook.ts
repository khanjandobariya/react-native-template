import {useCallback} from 'react'
import {Platform} from 'react-native'
import {isTablet} from 'react-native-device-info'
import {useResponsive, type UseResponsiveReturnType} from 'react-native-responsive-hook'

import {isIOS26OrAbove} from '@/utils/Utility'

const GUIDELINE_BASE_WIDTH: number = 402
const GUIDELINE_BASE_HEIGHT: number = 874

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

  const hFact: number = isLandscape ? 0.6 : 0.8
  const vFact: number = isLandscape ? 1.2 : 0.8
  const FONT_FACT: number = 0.5

  const hs: (pixels: number) => number = useCallback(
    (pixels: number): number => {
      const value: number = isTab ? pixels * hFact : pixels
      return wp((value / GUIDELINE_BASE_WIDTH) * 100)
    },
    [isLandscape, isPortrait, hFact, isTab, wp]
  )

  const vs: (pixels: number) => number = useCallback(
    (pixels: number): number => {
      const value: number = isTab ? pixels * vFact : pixels

      return hp((value / GUIDELINE_BASE_HEIGHT) * 100)
    },
    [isLandscape, isPortrait, hp, isTab, vFact]
  )

  const ms: (pixels: number) => number = useCallback(
    (pixels: number): number => {
      const value: number = isTab ? pixels * FONT_FACT : pixels

      return rem(value)
    },
    [isLandscape, isPortrait, isTab, rem]
  )

  const isTransparent: boolean = isIOS26OrAbove(String(Platform.Version))
  const keyboardVerticalOffset: number = Platform.OS === 'android' ? 30 : isTransparent ? 10 : 40

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
    isPortrait,
    keyboardVerticalOffset
  }
}

export default useResponsiveHook
