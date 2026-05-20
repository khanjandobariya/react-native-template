import type {ReactNode} from 'react'
import type {FlatListProps, ModalProps, StyleProp, ViewStyle} from 'react-native'
import type {
  Country,
  CountryCode,
  Region,
  Subregion,
  TranslationLanguageCode
} from 'react-native-country-picker-modal'
import type {CountryFilterProps} from 'react-native-country-picker-modal/lib/CountryFilter'
import type {Theme} from 'react-native-country-picker-modal/lib/CountryTheme'
import type {FlagButtonProps} from 'react-native-country-picker-modal/lib/FlagButton'

type AppCountryPickerModalProps = {
  countryCode: CountryCode
  region?: Region
  subregion?: Subregion
  countryCodes?: CountryCode[]
  excludeCountries?: CountryCode[]
  preferredCountries?: CountryCode[]
  theme?: Theme
  translation?: TranslationLanguageCode
  modalProps?: ModalProps
  filterProps?: CountryFilterProps
  flatListProps?: FlatListProps<Country>
  withAlphaFilter?: boolean
  withCallingCode?: boolean
  withCurrency?: boolean
  withEmoji?: boolean
  withCountryNameButton?: boolean
  withCurrencyButton?: boolean
  withCallingCodeButton?: boolean
  withCloseButton?: boolean
  withFlagButton?: boolean
  withFilter?: boolean
  withFlag?: boolean
  withModal?: boolean
  disableNativeModal?: boolean
  visible?: boolean
  containerButtonStyle?: StyleProp<ViewStyle>
  renderFlagButton?(props: FlagButtonProps): ReactNode
  renderCountryFilter?(props: CountryFilterProps): ReactNode
  onSelect(country: Country): void
  onOpen?(): void
  onClose?(): void
}

export type {AppCountryPickerModalProps}
