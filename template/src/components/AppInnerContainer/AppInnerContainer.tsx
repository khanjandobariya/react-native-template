import {View} from 'react-native'

import {useColor, useResponsiveHook} from '@/hooks'
import type {RSType} from '@/hooks/useResponsiveHook'
import type {ColorType} from '@/theme/Theme'

import {myStyles} from './AppInnerContainer.styles'
import type {AppInnerContainerProps} from './types/AppInnerContainer.types'

const AppInnerContainer = (props: AppInnerContainerProps) => {
  const colors: ColorType = useColor()
  const RS: RSType = useResponsiveHook()

  const styles = myStyles(colors, RS)

  const {children, style} = props

  return <View style={[styles.innerContainer, style]}>{children}</View>
}

export default AppInnerContainer
