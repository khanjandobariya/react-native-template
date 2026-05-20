import React from 'react'
import {Image, View} from 'react-native'

import {AppCard, AppText} from '@/components'
import {useCommonHooks} from '@/hooks'
import {Images} from '@/utils'

import {myStyles} from './CompetitionHeader.styles'
import type {CompetitionHeaderProps} from './types/CompetitionHeader.types'

const CompetitionHeader = (props: CompetitionHeaderProps) => {
  const {isCompetitionCard = true, isBanner = true, competionName, competionLogo} = props
  const {colors, RS} = useCommonHooks()
  const styles = myStyles(colors, RS)

  return (
    <View>
      {/* Banner Card */}
      {isBanner && (
        <AppCard containerStyle={styles.bannerCard}>
          <Image source={Images.nzc_logo} style={styles.logo} resizeMode="contain" />
        </AppCard>
      )}

      {/* Selected Competition Card */}
      {isCompetitionCard && (
        <AppCard containerStyle={styles.competitionCard}>
          <View style={styles.compImageContainer}>
            <Image source={competionLogo} style={styles.compImage} resizeMode="contain" />
          </View>
          <AppText style={styles.compTitle}>{competionName}</AppText>
        </AppCard>
      )}
    </View>
  )
}

export default CompetitionHeader
