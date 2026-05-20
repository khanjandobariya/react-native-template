import {TextInput, View} from 'react-native'

import {AppIcon, AppInputWrapper} from '@/components'
import {useCommonHooks} from '@/hooks'

import {myStyles} from './AppTextAreaInput.styles'
import useAppTextAreaInput from './hooks/useAppTextAreaInput'
import type {AppTextAreaInputProps} from './types/AppTextAreaInput.types'

const AppTextAreaInput = (props: AppTextAreaInputProps) => {
  const {errorMessage, containerStyle, inputStyle, leftIcon, mode = 'primary', ...rest} = props
  const {colors, RS} = useCommonHooks()
  const {} = useAppTextAreaInput(props)

  const isSecondary = mode === 'secondary'
  const styles = myStyles(colors, RS, isSecondary)

  return (
    <AppInputWrapper errorMessage={errorMessage}>
      <View style={[styles.container, containerStyle]}>
        {leftIcon && (
          <AppIcon
            source={leftIcon}
            style={styles.iconLeft}
            tintColor={isSecondary ? colors.white : colors.black}
            size={20}
          />
        )}
        <TextInput
          {...rest}
          multiline
          style={[styles.input, inputStyle]}
          placeholderTextColor={isSecondary ? colors.white : colors.lightBlue}
        />
      </View>
    </AppInputWrapper>
  )
}

export default AppTextAreaInput
