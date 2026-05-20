import {useState} from 'react'
import type {LayoutChangeEvent} from 'react-native'

import type {AppCarouselProps} from '../types/AppCarousel.types'

const useAppCarousel = (_props: AppCarouselProps) => {
  const [size, setSize] = useState({
    width: 123,
    height: 123
  })

  const onLayout = (event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout
    setSize({width, height})
  }

  return {onLayout, size}
}

export default useAppCarousel
