import {type StyleProp, type TextStyle, type ViewStyle} from 'react-native'

import {useColor, useResponsiveHook} from '@/hooks'
import type {RSType} from '@/hooks/useResponsiveHook'
import type {ColorType} from '@/theme/Theme'

import AppPressable from '../AppPressable/AppPressable'
import AppText, {TEXT} from '../AppText/AppText'
import {myStyles} from './AppButton.styles'

type AppButtonProps = {
  onPress: () => void
  label: string
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
}

const AppButton = (props: AppButtonProps) => {
  const colors: ColorType = useColor()
  const RS: RSType = useResponsiveHook()

  const styles = myStyles(colors, RS)
  const {onPress, label, disabled, style, labelStyle} = props

  return (
    <AppPressable onPress={onPress} disabled={disabled} style={[styles.buttonContainer, style]}>
      <AppText style={[styles.labelStyle, labelStyle]} type={TEXT.h2}>
        {label}
      </AppText>
    </AppPressable>
  )
}

export default AppButton
