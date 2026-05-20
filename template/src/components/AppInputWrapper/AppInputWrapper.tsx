import React from 'react'
import {View} from 'react-native'

import {AppText} from '@/components'
import {useCommonHooks} from '@/hooks'

import {myStyles} from './AppInputWrapper.styles'
import type {AppInputWrapperProps} from './types/AppInputWrapper.types'

const AppInputWrapper = (props: AppInputWrapperProps) => {
  const {errorMessage, children} = props
  const {colors, RS} = useCommonHooks()
  const styles = myStyles(colors, RS)

  return (
    <View style={styles.container}>
      {/* Label is not rendered here as requested */}
      {children}
      {errorMessage && (
        <AppText variant="bodyNormal" style={styles.error}>
          {errorMessage}
        </AppText>
      )}
    </View>
  )
}

export default AppInputWrapper
