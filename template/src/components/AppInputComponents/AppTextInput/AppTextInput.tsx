import {TextInput, View} from 'react-native'

import {useColor, useResponsiveHook} from '@/hooks'
import type {ColorType} from '@/theme/Theme'
import {Images} from '@/utils'

import AppIcon from '../../AppIcon/AppIcon'
import AppInputWrapper from '../AppInputWrapper/AppInputWrapper'
import {myStyles} from './AppTextInput.styles'
import useAppTextInput from './hooks/useAppTextInput'
import type {AppTextInputProps} from './types/AppTextInput.types'

const AppTextInput = ({
  label,
  errorMessage,
  secureTextEntry,
  innerRef,
  prefixIcon,
  ...rest
}: AppTextInputProps) => {
  const colors: ColorType = useColor()

  const RS = useResponsiveHook()
  const styles = myStyles(colors, RS)

  const {isHidePassword, onPressSecureText} = useAppTextInput({secureTextEntry})

  return (
    <AppInputWrapper label={label} errorMessage={errorMessage}>
      <View style={styles.inputContainer}>
        {prefixIcon && (
          <AppIcon style={styles.iconStyle} tintColor={colors.blueDark00} source={prefixIcon} />
        )}
        <TextInput
          {...rest}
          ref={innerRef}
          placeholderTextColor={colors.grayLight}
          secureTextEntry={secureTextEntry && isHidePassword}
          style={styles.inputStyle}
          blurOnSubmit={false}
        />

        {secureTextEntry && (
          <AppIcon
            style={styles.iconStyle}
            disabled={false}
            onPress={onPressSecureText}
            source={isHidePassword ? Images.eye_off : Images.eye_open}
          />
        )}
      </View>
    </AppInputWrapper>
  )
}

export default AppTextInput
