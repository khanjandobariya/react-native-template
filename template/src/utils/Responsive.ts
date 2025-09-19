import {Dimensions, Platform, StatusBar} from 'react-native'
import {isTablet} from 'react-native-device-info'

const {height: W_HEIGHT, width: W_WIDTH} = Dimensions.get('window')

type CommonFunType = (val: number) => number
type GetStatusBarHeightFn = () => number

let isIPhoneX: boolean = false

if (Platform.OS === 'ios' && !Platform.isPad) {
  isIPhoneX =
    W_HEIGHT === 780 ||
    W_WIDTH === 780 ||
    W_HEIGHT === 812 ||
    W_WIDTH === 812 ||
    W_HEIGHT === 844 ||
    W_WIDTH === 844 ||
    W_HEIGHT === 896 ||
    W_WIDTH === 896 ||
    W_HEIGHT === 926 ||
    W_WIDTH === 926
}

const screenWidth: number = Dimensions.get('window').width
const screenHeight: number = Dimensions.get('window').height

const widthPx: CommonFunType = (widthPercent: number): number => {
  return (screenWidth * widthPercent) / 100
}

const heightPx: CommonFunType = (heightPercent: number) => {
  return ((screenHeight - getStatusBarHeight()) * heightPercent) / 100
}

const font: CommonFunType = (size: number) => {
  return (screenWidth * size) / 100
}

const getStatusBarHeight: GetStatusBarHeightFn = () => {
  const statusBarHeight: number = Platform.select({
    ios: isIPhoneX ? 78 : 20,
    android:
      typeof StatusBar.currentHeight === 'number' && StatusBar.currentHeight <= 24
        ? StatusBar.currentHeight
        : 0,
    default: 0
  })
  return statusBarHeight
}

const isIPhoneXSeries: CommonFunType = () => {
  if (Platform.OS === 'android') {
    return 0
  }
  return isIPhoneX ? 34 : 0
}

const isAndroidNouch: boolean =
  Platform.OS === 'android'
    ? typeof StatusBar.currentHeight === 'number' && StatusBar.currentHeight > 24
    : false
const [shortDimension, longDimension] =
  W_WIDTH < W_HEIGHT ? [W_WIDTH, W_HEIGHT] : [W_HEIGHT, W_WIDTH]

// guideline size
const GUIDELINE_BASE_WIDTH: number = 375
const GUIDELINE_BASE_HEIGHT: number = 812

const scale: CommonFunType = (size: number) => (shortDimension / GUIDELINE_BASE_WIDTH) * size

const verticalScale: CommonFunType = (size: number) =>
  (longDimension / GUIDELINE_BASE_HEIGHT) * size

const moderateScale: CommonFunType = (size: number, factor: number = 0.5): number =>
  size + (scale(size) - size) * factor

const isTab: boolean = isTablet()

export {
  font,
  getStatusBarHeight,
  heightPx,
  isAndroidNouch,
  isIPhoneX,
  isIPhoneXSeries,
  isTab,
  moderateScale,
  scale,
  verticalScale,
  widthPx
}
