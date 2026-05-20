import CountryPicker from 'react-native-country-picker-modal'

import {useCommonHooks} from '@/hooks'

import type {AppCountryPickerModalProps} from './types/AppCountryPickerModal.types'

const AppCountryPickerModal = ({...restProps}: AppCountryPickerModalProps) => {
  const {colors} = useCommonHooks()

  return (
    <CountryPicker
      {...restProps}
      theme={{
        ...restProps.theme,
        backgroundColor: colors.white,
        primaryColor: colors.black,
        primaryColorVariant: colors.borderColor,
        onBackgroundTextColor: colors.black
      }}
    />
  )
}

export default AppCountryPickerModal
