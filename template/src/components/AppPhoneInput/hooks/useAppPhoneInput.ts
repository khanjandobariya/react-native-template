import {find, includes, isEqualWith} from 'lodash'
import {useEffect, useState} from 'react'
import {type Country, FlagType, getAllCountries} from 'react-native-country-picker-modal'

import type {AppPhoneInputProps, CountrySelectionType} from '../types/AppPhoneInput.types'

const useAppPhoneInput = ({onSelectCountry, countryCode}: AppPhoneInputProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<CountrySelectionType | null>(null)

  const onSelect = (country: Country) => {
    setIsVisible(false)
    const data: CountrySelectionType = {
      name: country.name,
      countryCode: country?.cca2 ?? '',
      callingCode: country?.callingCode?.[0] ?? ''
    }
    setSelectedCountry(data)
    if (onSelectCountry) {
      onSelectCountry(data)
    }
  }

  const onPressCountry = (value: boolean) => {
    setIsVisible(value)
  }

  const onCountryHandler = async () => {
    if (isEqualWith(countryCode, selectedCountry)) {
      return
    }
    const countries = await getAllCountries(FlagType.FLAT)
    const isFoundCountry = find(
      countries,
      (country: Country) =>
        includes(country.callingCode, countryCode?.callingCode) ||
        country.cca2 === countryCode?.countryCode
    )

    if (isFoundCountry) {
      const data: CountrySelectionType = {
        name: isFoundCountry.name,
        countryCode: isFoundCountry?.cca2 ?? '',
        callingCode: isFoundCountry?.callingCode?.[0] ?? ''
      }
      setSelectedCountry(data)
      if (!countryCode?.callingCode && onSelectCountry) {
        onSelectCountry(data)
      }
    }
  }

  useEffect(() => {
    onCountryHandler()
      .then(() => {})
      .catch(() => {})
  }, [countryCode])

  return {
    isVisible,
    onSelect,
    onPressCountry,
    selectedCountry,
    setIsVisible,
    isFocused,
    setIsFocused
  }
}

export default useAppPhoneInput
