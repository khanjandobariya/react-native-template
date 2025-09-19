import {type ReactNode} from 'react'
import {
  KeyboardAwareScrollView,
  type KeyboardAwareScrollViewProps
} from 'react-native-keyboard-controller'

type AppScrollViewProps = {
  children: ReactNode
} & KeyboardAwareScrollViewProps

const AppScrollView = (props: AppScrollViewProps) => {
  const {children} = props

  return <KeyboardAwareScrollView {...props}>{children}</KeyboardAwareScrollView>
}

export default AppScrollView
