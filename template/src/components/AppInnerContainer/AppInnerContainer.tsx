import {View} from 'react-native'

import {useCommonHooks} from '@/hooks'

import {myStyles} from './AppInnerContainer.styles'
import type {AppInnerContainerProps} from './types/AppInnerContainer.types'

const AppInnerContainer = (props: AppInnerContainerProps) => {
  const {children, bgColor, style} = props
  const {colors, RS} = useCommonHooks()
  const styles = myStyles(colors, RS)

  return (
    <View style={[styles.container, {backgroundColor: bgColor ?? colors.white}, style]}>
      {children}
    </View>
  )
}

export default AppInnerContainer
