import type {StyleProp, TextInputProps, TextStyle, ViewStyle} from 'react-native'
import type {CountryCode, TranslationLanguageCodeMap} from 'react-native-country-picker-modal'

import type {anyType} from '@/types/commonTypes'

type CountrySelectionType = {
  name: string | TranslationLanguageCodeMap
  countryCode: CountryCode
  callingCode: string
}

type AppPhoneInputProps = TextInputProps & {
  errorMessage?: string
  innerRef?: (ref: anyType) => void
  onSelectCountry?: (country: CountrySelectionType) => void
  countryCode?: CountrySelectionType
  containerStyle?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
  mode?: 'primary' | 'secondary'
}

export type {AppPhoneInputProps, CountrySelectionType}
