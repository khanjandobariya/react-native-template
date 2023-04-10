import React, {forwardRef, useImperativeHandle, useState} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'

import useColor from '@/hooks/useColor'
import {ColorType, Opacity} from '@/theme/Theme'
import {scale} from '@/utils/Responsive'

const AppLoader = forwardRef((ref: any, props) => {
  const [isLoading, setLoading] = useState(false)
  const colors = useColor()
  const styles = myStyles(colors)

  useImperativeHandle(
    ref,
    () => ({
      showLoader
    }),
    []
  )

  const showLoader = (isLoading: boolean) => {
    setLoading(isLoading)
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ActivityIndicator color={colors.background} size={'large'} />
        </View>
      </View>
    )
  }
  return null
})

export default AppLoader

const myStyles = (colors: ColorType) => {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: `${colors.modalOverlay}${Opacity[50]}`
    },
    innerContainer: {
      width: scale(100),
      height: scale(100),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 20,
      shadowColor: colors.background,
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7
    }
  })
}
