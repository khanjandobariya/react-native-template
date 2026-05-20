import RadioButton from 'react-native-radio-button'

import {useCommonHooks} from '@/hooks'

import type {AppRadioBtnProps} from './types/AppRadioBtn.types'

const AppRadioBtn = (props: AppRadioBtnProps) => {
  const {colors} = useCommonHooks()

  return (
    <RadioButton
      animation={'bounceIn'}
      innerColor={colors.green}
      outerColor={colors.green}
      {...props}
    />
  )
}

export default AppRadioBtn
