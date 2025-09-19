import {debounce} from 'lodash'
import type {GestureResponderEvent} from 'react-native'
import {TouchableOpacity, type TouchableOpacityProps} from 'react-native'

const AppPressable = (props: TouchableOpacityProps) => {
  const {children, onPress} = props

  const onPressHandler: (event: GestureResponderEvent) => void = (event: GestureResponderEvent) => {
    // debounce(() => onPress, 500)
    try {
      if (onPress) {
        debounce(() => onPress(event), 100)()
      }
    } catch (e) {}
  }

  return (
    <TouchableOpacity {...props} onPress={onPressHandler}>
      {children}
    </TouchableOpacity>
  )
}

export default AppPressable
