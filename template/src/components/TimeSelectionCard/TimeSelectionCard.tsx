import React from 'react'
import {View} from 'react-native'
import DatePicker from 'react-native-date-picker'

import {AppCard, AppIcon, AppPressable, AppText} from '@/components'
import {useCommonHooks} from '@/hooks'
import {AppSelectionModal} from '@/modals'
import {Icons} from '@/utils'

import useTimeSelectionCard from './hooks/useTimeSelectionCard'
import {myStyles} from './TimeSelectionCard.styles'
import type {TimeSelectionCardProps} from './types/TimeSelectionCard.types'

const TimeSelectionCard = (props: TimeSelectionCardProps) => {
  const {data, dataList, label, time, unit, onPress, containerStyle} = props
  const {colors, RS} = useCommonHooks()
  const styles = myStyles(colors, RS)
  const {isShowTime, isShowDropDown, onConfirm, onCancel, onPressSelect, getTimeValue} =
    useTimeSelectionCard(props)

  const renderModal = () => {
    if (isShowDropDown) {
      return (
        <AppSelectionModal
          isVisible={isShowDropDown}
          onClose={onCancel}
          onSelect={onConfirm}
          data={dataList ?? data ?? []}
          title={label}
        />
      )
    }
    if (isShowTime) {
      const timeValue = getTimeValue()
      return (
        <DatePicker
          modal
          mode={'time'}
          open={isShowTime}
          date={timeValue}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      )
    }

    return <View />
  }

  return (
    <AppCard containerStyle={[styles.card, containerStyle]} onPress={onPress}>
      <AppText style={styles.label}>{label}</AppText>
      <AppPressable style={styles.timeBox} onPress={onPressSelect}>
        <View style={styles.timeTextContainer}>
          <AppText style={styles.timeText}>{time}</AppText>
          <AppText style={styles.pmText}>{unit}</AppText>
        </View>
        <AppIcon source={Icons.up_down} size={16} tintColor={colors.card_text} />
      </AppPressable>
      {renderModal()}
    </AppCard>
  )
}

export default TimeSelectionCard
