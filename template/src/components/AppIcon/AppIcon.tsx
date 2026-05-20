import {Image} from 'react-native'

import {useCommonHooks} from '@/hooks'

import AppPressable from '../AppPressable/AppPressable'
import {myStyles} from './AppIcon.styles'
import type {AppIconProps} from './types/AppIcon.types'

const AppIcon = (props: AppIconProps) => {
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
  const {colors, RS} = useCommonHooks()
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
