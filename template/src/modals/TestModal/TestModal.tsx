import React from 'react'
import {Text, View} from 'react-native'

import {useCommonHooks} from '@/hooks'

import useTestModal from './hooks/useTestModal'
import {myStyles} from './TestModal.styles'
import type {TestModalProps} from './types/TestModal.types'

const TestModal = (props: TestModalProps) => {
  const {colors, RS} = useCommonHooks()
  const styles = myStyles(colors, RS)
  const {} = useTestModal(props)

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>TestModal</Text>
    </View>
  )
}

export default TestModal
