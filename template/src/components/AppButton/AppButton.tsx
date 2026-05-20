import {AppPressable, AppText} from '@/components'
import {useCommonHooks} from '@/hooks'

import {myStyles} from './AppButton.styles'
import type {AppButtonProps} from './types/AppButton.types'

const AppButton = (props: AppButtonProps) => {
  const {title, mode = 'primary', onPress, style, textStyle, disabled} = props
  const {colors, RS} = useCommonHooks()
  const styles = myStyles(colors, RS)

  const isPrimary = mode === 'primary'

  return (
    <AppPressable
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.primaryContainer,
        !isPrimary && styles.secondaryContainer,
        disabled && styles.disabledContainer,
        style
      ]}
    >
      <AppText
        variant="bodyNormalExtraBold"
        style={[styles.primaryText, !isPrimary && styles.secondaryText, textStyle]}
      >
        {title}
      </AppText>
    </AppPressable>
  )
}

export default AppButton
