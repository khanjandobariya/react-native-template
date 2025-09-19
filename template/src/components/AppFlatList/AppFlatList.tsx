import React from 'react'
import {FlatList, type FlatListProps, type StyleProp, View, type ViewStyle} from 'react-native'

import {useColor} from '@/hooks'
import type {ColorType} from '@/theme/Theme'
import {verticalScale} from '@/utils/Responsive'

import type {anyType} from '../../types/commonTypes'
import {myStyles} from './AppFlatList.styles'

type AppFlatListProps = {
  keyLabel: string
  separatorHeight?: number
  separatorStyle?: StyleProp<ViewStyle>
  showsVerticalScrollIndicator?: boolean
  isBottomLoading?: boolean
  ListFooterComponent?: () => React.ReactNode
  isShowLoadMore?: boolean
  isLoading?: boolean
  onPressLoadMore?: () => void
  loadMoreLabel?: string
  innerRef?: (data: anyType) => void
} & FlatListProps<anyType>

const AppFlatList = (props: AppFlatListProps) => {
  const {
    keyLabel,
    scrollEnabled,
    separatorHeight = 15,
    separatorStyle,
    showsVerticalScrollIndicator = false,
    contentContainerStyle = {},
    innerRef = () => {}
  } = props

  const colors: ColorType = useColor()
  const styles = myStyles(colors)

  const renderSeparator = () => (
    <View style={[{height: verticalScale(separatorHeight)}, separatorStyle]} />
  )

  return (
    <FlatList
      {...props}
      ref={innerRef}
      extraData={props}
      scrollEnabled={scrollEnabled}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      contentContainerStyle={[styles.feedsListContainer, contentContainerStyle]}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={renderSeparator}
      keyExtractor={(_: anyType, index: number) => `${keyLabel}-${index}`}
    />
  )
}

export default AppFlatList
