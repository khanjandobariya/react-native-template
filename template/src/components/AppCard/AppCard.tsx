import React from 'react'
import {View} from 'react-native'

import {useCommonHooks} from '@/hooks'

import AppPressable from '../AppPressable/AppPressable'
import {myStyles} from './AppCard.styles'
import type {AppCardProps} from './types/AppCard.types'

const AppCard = (props: AppCardProps) => {
  const {children, containerStyle, onPress} = props
  const {colors, RS} = useCommonHooks()
  const styles = myStyles(colors, RS)

  if (onPress) {
    return (
      <AppPressable onPress={onPress} style={[styles.container, containerStyle]}>
        {children}
      </AppPressable>
    )
  }

  return <View style={[styles.container, containerStyle]}>{children}</View>
}

export default AppCard
