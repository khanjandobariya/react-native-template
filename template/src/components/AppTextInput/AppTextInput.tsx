import {TextInput, View} from 'react-native'

import {AppIcon, AppInputWrapper} from '@/components'
import {useCommonHooks} from '@/hooks'
import {Icons} from '@/utils'

import {myStyles} from './AppTextInput.styles'
import useAppTextInput from './hooks/useAppTextInput'
import type {AppTextInputProps} from './types/AppTextInput.types'

const AppTextInput = (props: AppTextInputProps) => {
  const {
    errorMessage,
    isSecureText,
    containerStyle,
    inputStyle,
    leftIcon,
    rightIcon,
    mode = 'primary',
    ...rest
  } = props
  const {colors, RS} = useCommonHooks()
  const {isPasswordVisible, onTogglePasswordVisibility} = useAppTextInput(props)

  const isSecondry = mode === 'secondary'
  const styles = myStyles(colors, RS, isSecondry)

  return (
    <AppInputWrapper errorMessage={errorMessage}>
      <View style={[styles.container, containerStyle]}>
        {leftIcon && (
          <AppIcon
            source={leftIcon}
            tintColor={isSecondry ? colors.white : colors.black}
            style={styles.iconLeft}
            size={20}
          />
        )}

        <TextInput
          {...rest}
          style={[styles.input, inputStyle]}
          secureTextEntry={isSecureText && !isPasswordVisible}
          placeholderTextColor={isSecondry ? colors.white : colors.lightBlue}
        />

        {isSecureText ? (
          <AppIcon
            source={isPasswordVisible ? Icons.eye_open : Icons.eye_close}
            onPress={onTogglePasswordVisibility}
            disabled={false}
            style={styles.iconRight}
            size={22}
            tintColor={isSecondry ? colors.white : colors.black}
          />
        ) : (
          rightIcon && <AppIcon source={rightIcon} style={styles.iconRight} size={22} />
        )}
      </View>
    </AppInputWrapper>
  )
}

export default AppTextInput
