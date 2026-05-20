import React from 'react'
import {Text} from 'react-native'

import {useCommonHooks} from '@/hooks'

import {myStyles, TYPOGRAPHY, type TypographyVariant} from './AppText.styles'
import type {AppTextProps} from './types/AppText.types'

const AppText = (props: AppTextProps) => {
  const {colors, RS} = useCommonHooks()
  const styles = myStyles(colors, RS) as Record<TypographyVariant, any>
  const {children, style, variant = TYPOGRAPHY.bodyNormal, color, ...restProps} = props

  return (
    <Text {...restProps} style={[styles[variant], color ? {color} : {}, style]}>
      {children}
    </Text>
  )
}

export default AppText
export {TYPOGRAPHY}
