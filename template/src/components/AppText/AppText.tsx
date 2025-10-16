import {Platform, Text, type TextProps} from 'react-native'

import {useColor, useResponsiveHook} from '@/hooks'
import type {ColorType} from '@/theme/Theme'

import {myStyles} from './AppText.styles'

export type TextType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'

type AppTextProps = {
  type?: TextType
} & TextProps

export const TEXT: Record<TextType, TextType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5'
}

const AppText = (props: AppTextProps) => {
  const colors: ColorType = useColor()
  const RS = useResponsiveHook()
  const styles = myStyles(colors, RS)
  const {children, style, type = TEXT.h3} = props

  return (
    <Text
      {...props}
      style={[styles[type], style, Platform.OS === 'android' && styles.removeSpaces]}
    >
      {children}
    </Text>
  )
}

export default AppText
