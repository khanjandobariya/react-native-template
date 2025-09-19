import React from 'react'
import {View} from 'react-native'

import {useColor, useResponsiveHook} from '@/hooks'
import type {ColorType} from '@/theme/Theme'

import AppSeparator from '../../AppSeparator/AppSeparator'
import AppText, {TEXT} from '../../AppText/AppText'
import {myStyles} from './AppInputWrapper.styles'

type AppInputWrapperProps = {
  label?: string
  errorMessage?: string
  children: React.ReactNode
}

const AppInputWrapper = (props: AppInputWrapperProps) => {
  const colors: ColorType = useColor()
  const RS = useResponsiveHook()
  const styles = myStyles(colors, RS)

  const {label, errorMessage, children} = props
  return (
    <View style={styles.container}>
      {label && (
        <>
          <AppText style={styles.labelText}>{label}</AppText>
          <AppSeparator size={10} />
        </>
      )}
      {children}
      {errorMessage && (
        <>
          <AppSeparator size={5} />
          <AppText style={styles.errorText} type={TEXT.h4}>
            {errorMessage}
          </AppText>
        </>
      )}
    </View>
  )
}

export default AppInputWrapper
