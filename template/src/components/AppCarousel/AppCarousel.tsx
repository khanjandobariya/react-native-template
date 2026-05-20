import React, {useRef} from 'react'
import {View} from 'react-native'
import {useSharedValue} from 'react-native-reanimated'
import Carousel, {type ICarouselInstance, Pagination} from 'react-native-reanimated-carousel'

import {useCommonHooks} from '@/hooks'

import {myStyles} from './AppCarousel.styles'
import useAppCarousel from './hooks/useAppCarousel'
import type {AppCarouselProps} from './types/AppCarousel.types'

const AppCarousel = (props: AppCarouselProps) => {
  const {data, renderItem, containerStyle, autoPlay = true} = props
  const {colors, RS} = useCommonHooks()
  const styles = myStyles(colors, RS)
  const {size, onLayout} = useAppCarousel(props)
  const {width, height} = size

  const ref = useRef<ICarouselInstance>(null)
  const progress = useSharedValue<number>(0)

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true
    })
  }

  return (
    <View style={[styles.container, containerStyle]} onLayout={onLayout}>
      <Carousel
        ref={ref}
        width={width}
        height={height}
        autoPlay={autoPlay}
        data={data}
        onProgressChange={progress}
        scrollAnimationDuration={1000}
        renderItem={renderItem}
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50
        }}
      />
      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        containerStyle={styles.paginationContainer}
        onPress={onPressPagination}
      />
    </View>
  )
}

export default AppCarousel
