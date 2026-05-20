import type {StyleProp, ViewStyle} from 'react-native'

import type {anyType} from '@/types/commonTypes'

type AppCarouselProps = {
  data: anyType[]
  renderItem: ({item, index}: {item: anyType; index: number}) => React.ReactElement
  containerStyle?: StyleProp<ViewStyle>
  width?: number
  height?: number
  autoPlay?: boolean
}

export type {AppCarouselProps}
