/* eslint-disable custom-rules/custom-typedef-ignore-styles */
import type {StyleProp, ViewStyle} from 'react-native'

import {useColor} from '@/hooks'
import type {ColorType} from '@/theme/Theme'

import {Icons} from '../../utils'
import AppIcon from '../AppIcon/AppIcon'

export type AppCheckBoxProps = {
  isChecked: boolean
  hasError?: boolean
  style?: StyleProp<ViewStyle>
  onPress?: () => void
  disabled?: boolean
  activeColor?: string
  inactiveColor?: string
}

const AppCheckbox = ({
  isChecked = false,
  style,
  disabled = false,
  onPress = () => {},
  activeColor,
  inactiveColor
}: AppCheckBoxProps) => {
  const colors: ColorType = useColor()
  const active = activeColor ?? colors.accent
  const inactive = inactiveColor ?? colors.black00

  return (
    <AppIcon
      source={isChecked ? Icons.check : Icons.uncheck}
      style={style}
      tintColor={isChecked ? active : inactive}
      disabled={disabled}
      onPress={onPress}
    />
  )
}

export default AppCheckbox
