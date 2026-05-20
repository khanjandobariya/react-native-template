import type {TextProps} from 'react-native'

import type {TypographyVariant} from '../AppText.styles'

export type AppTextProps = {
  variant?: TypographyVariant
  color?: string
} & TextProps
