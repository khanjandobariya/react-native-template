import React from 'react'
import {FlatList, type FlatListProps, type StyleProp, View, type ViewStyle} from 'react-native'

import {useColor, useResponsiveHook} from '@/hooks'
import type {ColorType} from '@/theme/Theme'

import type {anyType, RefType} from '../../types/commonTypes'
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
  innerRef?: RefType
  isDevider?: boolean
} & FlatListProps<anyType>

const AppFlatList = (props: AppFlatListProps) => {
  const {
    keyLabel,
    scrollEnabled,
    separatorHeight = 15,
    separatorStyle,
    showsVerticalScrollIndicator = false,
    contentContainerStyle = {},
    innerRef = () => {},
    isDevider = false
  } = props

  const colors: ColorType = useColor()
  const RS = useResponsiveHook()
  const {vs} = RS
  const styles = myStyles(colors, RS)

  const renderSeparator = () => {
    if (isDevider) {
      return <View style={styles.devider} />
    }
    return <View style={[{height: vs(separatorHeight)}, separatorStyle]} />
  }

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
