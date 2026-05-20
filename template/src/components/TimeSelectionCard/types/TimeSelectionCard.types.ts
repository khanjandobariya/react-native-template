import type {StyleProp, ViewStyle} from 'react-native'

import type {anyType} from '@/types/commonTypes'

type TimeSelectionCardProps = {
  label: string
  time: string
  unit: string
  onPress?: () => void
  containerStyle?: StyleProp<ViewStyle>
  value?: string
  isTimeSelect?: boolean
  onSelect?: (item: anyType) => void
  /** Options shown in the selection modal when `isTimeSelect` is false */
  dataList?: anyType[]
  data?: anyType[]
}

export type {TimeSelectionCardProps}
