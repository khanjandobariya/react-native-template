import {type TextInputProps} from 'react-native'

import type {anyType, ImageSourceType, RefType} from '../../../../types/commonTypes'

export type AppTextInputProps = {
  label?: string
  errorMessage?: string
  innerRef?: RefType<anyType>
  prefixIcon?: ImageSourceType
} & TextInputProps
