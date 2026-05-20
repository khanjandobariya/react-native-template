import React from 'react'
import {Image, View} from 'react-native'

import {AppIcon, AppPressable} from '@/components'
import {useCommonHooks} from '@/hooks'
import {Icons, Images} from '@/utils'

import {myStyles} from './AppHeader.styles'
import useAppHeader from './hooks/useAppHeader'
import type {AppHeaderProps} from './types/AppHeader.types'

const AppHeader = (props: AppHeaderProps) => {
  const {isBackButton = true, isDrawerButton = false, containerStyle} = props
  const {colors, RS} = useCommonHooks()
  const styles = myStyles(colors, RS)
  const {onBackPress, onDrawerPress} = useAppHeader()

  return (
    <View style={[styles.container, containerStyle]}>
      {isBackButton && !isDrawerButton && (
        <AppPressable style={styles.backButton} onPress={onBackPress}>
          <AppIcon source={Icons.left_arrow} tintColor={colors.green} size={24} />
        </AppPressable>
      )}

      {isDrawerButton && (
        <AppPressable style={styles.backButton} onPress={onDrawerPress}>
          <AppIcon source={Icons.menu} tintColor={colors.green} size={24} />
        </AppPressable>
      )}

      <View style={styles.bannerContainer}>
        <Image source={Images.header_banner} style={styles.banner} resizeMode={'contain'} />
      </View>
    </View>
  )
}

export default AppHeader
