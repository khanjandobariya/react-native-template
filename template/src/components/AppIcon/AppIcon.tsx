import {
  Image,
  type ImageResizeMode,
  type ImageSourcePropType,
  type ImageStyle,
  type StyleProp,
  type ViewStyle
} from 'react-native'

import {useColor, useResponsiveHook} from '@/hooks'
import type {ColorType} from '@/theme/Theme'

import AppPressable from '../AppPressable/AppPressable'
import {myStyles} from './AppIcon.styles'

type AppIconProps = {
  style?: StyleProp<ViewStyle>
  resizeMode?: ImageResizeMode
  source: ImageSourcePropType
  size?: number
  tintColor?: string
  onPress?: () => void
  disabled?: boolean
  iconStyle?: StyleProp<ImageStyle>
}

const AppIcon = (props: AppIconProps) => {
  const colors: ColorType = useColor()

  const {
    style,
    resizeMode = 'contain',
    source,
    size = 20,
    tintColor,
    onPress = () => {},
    disabled = true,
    iconStyle
  } = props

  const RS = useResponsiveHook()

  const styles = myStyles(colors, RS, disabled)
  const {ms} = RS

  return (
    <AppPressable
      style={[styles.imageView, {width: ms(size), height: ms(size)}, style]}
      onPress={onPress}
      disabled={disabled}
      hitSlop={{left: 15, right: 15, top: 15, bottom: 15}}
    >
      <Image
        source={source}
        resizeMode={resizeMode}
        style={[styles.image, iconStyle, tintColor ? {tintColor} : {}]}
      />
    </AppPressable>
  )
}

export default AppIcon
