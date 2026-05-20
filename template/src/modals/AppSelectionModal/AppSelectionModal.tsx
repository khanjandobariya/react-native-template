import React from 'react'
import {View} from 'react-native'
import Modal from 'react-native-modal'

import {AppFlatList, AppPressable, AppText} from '@/components'
import {useCommonHooks} from '@/hooks'

import type {anyType} from '../../types/commonTypes'
import {myStyles} from './AppSelectionModal.styles'
import type {AppSelectionModalProps} from './types/AppSelectionModal.types'

const AppSelectionModal = (props: AppSelectionModalProps) => {
  const {isVisible, onClose, title, data, onSelect} = props
  const {colors, RS} = useCommonHooks()
  const styles = myStyles(colors, RS)

  const renderItem = ({item}: {item: anyType}) => {
    return (
      <AppPressable
        style={styles.itemContainer}
        onPress={() => {
          onSelect(item)
        }}
      >
        <AppText variant="bodyLarge" style={styles.itemText}>
          {item.value}
        </AppText>
      </AppPressable>
    )
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      avoidKeyboard
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      style={styles.modal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.notch} />
        <AppText variant={'h3'} color={colors.black}>
          {title}
        </AppText>
        <View>
          <AppFlatList data={data} keyLabel={`${title}_list`} renderItem={renderItem} isDevider />
        </View>
      </View>
    </Modal>
  )
}

export default AppSelectionModal
