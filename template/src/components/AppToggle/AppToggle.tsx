import ToggleSwitch from 'toggle-switch-react-native'

import {useColor} from '@/hooks'
import type {ColorType} from '@/theme/Theme'

import type {anyType} from '../../types/commonTypes'

const AppToggle = ({isToggle, onToggle, size}: anyType) => {
  const colors: ColorType = useColor()
  return (
    <ToggleSwitch
      isOn={isToggle}
      onColor={colors.accent}
      offColor={colors.blueDarker}
      size={size}
      onToggle={onToggle}
    />
  )
}
export default AppToggle
