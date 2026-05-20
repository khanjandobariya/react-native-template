import React from 'react'
import {TextInput, View} from 'react-native'
import type {CountryCode} from 'react-native-country-picker-modal'

import {AppIcon, AppInputWrapper, AppPressable, AppText} from '@/components'
import {useCommonHooks} from '@/hooks'
import {AppCountryPickerModal} from '@/modals'
import {Icons} from '@/utils'

import {myStyles} from './AppPhoneInput.styles'
import useAppPhoneInput from './hooks/useAppPhoneInput'
import type {AppPhoneInputProps} from './types/AppPhoneInput.types'

const AppPhoneInput = (props: AppPhoneInputProps) => {
  const {errorMessage, innerRef, containerStyle, inputStyle, mode = 'primary', ...rest} = props
  const {colors, RS} = useCommonHooks()
  const isSecondary = mode === 'secondary'
  const styles = myStyles(colors, RS, isSecondary)
  const {isVisible, onSelect, onPressCountry, selectedCountry, setIsVisible, setIsFocused} =
    useAppPhoneInput(props)

  const onRenderModal = () => {
    if (isVisible) {
      return (
        <AppCountryPickerModal
          visible={isVisible}
          withModal={true}
          withFlag={false}
          withCallingCode={true}
          withFilter={true}
          countryCode={
            (selectedCountry?.countryCode ?? props.countryCode?.countryCode ?? 'US') as CountryCode
          }
          onSelect={onSelect}
          onClose={() => setIsVisible(false)}
        />
      )
    }
    return null
  }

  const renderCountry = () => {
    return (
      <AppPressable style={styles.countryPickerContainer} onPress={() => onPressCountry(true)}>
        <AppText variant="bodyNormal" style={styles.countryTextStyle}>
          {`+${selectedCountry?.callingCode ?? props.countryCode?.callingCode ?? '1'}`}
        </AppText>
        <AppText
          variant="bodyNormal"
          style={{color: isSecondary ? colors.white : colors.black, fontSize: RS.ms(10)}}
        >
          ▼
        </AppText>
      </AppPressable>
    )
  }

  return (
    <AppInputWrapper errorMessage={errorMessage}>
      <View style={[styles.container, containerStyle]}>
        <AppIcon
          source={Icons.call}
          style={styles.iconLeft}
          tintColor={isSecondary ? colors.white : colors.black}
          size={20}
        />

        {renderCountry()}

        <View style={styles.verticalLine} />

        <TextInput
          {...rest}
          ref={innerRef}
          style={[styles.input, inputStyle]}
          placeholderTextColor={isSecondary ? colors.white : colors.lightBlue}
          keyboardType="phone-pad"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {onRenderModal()}
    </AppInputWrapper>
  )
}

export default AppPhoneInput
