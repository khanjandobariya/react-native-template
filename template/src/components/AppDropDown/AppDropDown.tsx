import {AppIcon, AppInputWrapper, AppPressable, AppText} from '@/components'
import {useCommonHooks} from '@/hooks'
import {Icons} from '@/utils'

import {myStyles} from './AppDropDown.styles'
import type {AppDropDownProps} from './types/AppDropDown.types'

const AppDropDown = (props: AppDropDownProps) => {
  const {
    text,
    errorMessage,
    containerStyle,
    textStyle,
    leftIcon,
    mode = 'primary',
    onPress = () => {}
  } = props
  const {colors, RS} = useCommonHooks()
  const isSecondary = mode === 'secondary'
  const styles = myStyles(colors, RS, isSecondary)

  return (
    <AppInputWrapper errorMessage={errorMessage}>
      <AppPressable style={[styles.container, containerStyle]} onPress={onPress}>
        {leftIcon && (
          <AppIcon
            source={leftIcon}
            size={20}
            tintColor={isSecondary ? colors.white : colors.black}
          />
        )}

        <AppText variant="bodyNormal" style={[styles.text, textStyle]}>
          {text}
        </AppText>

        <AppIcon
          source={Icons.down}
          size={14}
          tintColor={isSecondary ? colors.white : colors.black}
        />
      </AppPressable>
    </AppInputWrapper>
  )
}

export default AppDropDown
