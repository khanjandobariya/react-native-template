import React from 'react'
import {Image, View} from 'react-native'

import {AppText} from '@/components'
import {useCommonHooks} from '@/hooks'
import {Images} from '@/utils'

import {myStyles} from './NoDataFound.styles'
import type {NoDataFoundProps} from './types/NoDataFound.types'

const NoDataFound = (_props: NoDataFoundProps) => {
  const {colors, RS, t} = useCommonHooks()
  const styles = myStyles(colors, RS)

  return (
    <View style={styles.container}>
      <Image source={Images.no_data_image} style={styles.image} resizeMode="contain" />
      <AppText variant="h1" style={styles.title}>
        {t('noDataFound.title')}
      </AppText>
      <AppText variant="bodyNormal" style={styles.description}>
        {t('noDataFound.description')}
      </AppText>
    </View>
  )
}

export default NoDataFound
