import {cloneDeep} from 'lodash'
import {isTablet} from 'react-native-device-info'
import type {UseResponsiveReturnType} from 'react-native-responsive-hook'

import type {anyType} from '@/types/commonTypes'

const GUIDELINE_BASE_WIDTH: number = 375
const GUIDELINE_BASE_HEIGHT: number = 812

const isTab: boolean = isTablet()

const clone: anyType = (val: anyType) => {
  return cloneDeep(val)
}

const log: (key: string, value: anyType) => void = (key: string, value: anyType) => {
  // eslint-disable-next-line no-console
  console.log(`${key} => ${value}`)
}

const pth: (pixels: number, RS: UseResponsiveReturnType) => number = (
  pixels: number,
  RS: UseResponsiveReturnType
): number => {
  const {isLandscape} = RS
  const diff: number = isTab ? 1.5 : 2
  const value: number = isLandscape ? pixels * diff : pixels
  return (value / GUIDELINE_BASE_HEIGHT) * 100
}

const ptw: (pixels: number, RS: UseResponsiveReturnType) => number = (
  pixels: number,
  RS: UseResponsiveReturnType
): number => {
  const {isLandscape} = RS
  const diff: number = isTab ? 1.5 : 2
  const value: number = isLandscape ? pixels * diff : pixels
  return (value / GUIDELINE_BASE_WIDTH) * 100
}

export {clone, log, pth, ptw}
