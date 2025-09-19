import CheckBox from 'react-native-check-box'

import {useColor} from '@/hooks'
import type {ColorType} from '@/theme/Theme'

import type {anyType} from '../../types/commonTypes'
import {myStyles} from './AppCheckbox.styles'

const AppCheckbox = ({
  isChecked = false,
  leftText,
  onChangeCheckbox,
  style,
  disabled,
  hasError
}: anyType) => {
  const colors: ColorType = useColor()
  const styles = myStyles(colors)
  return (
    <CheckBox
      style={style}
      onClick={() => onChangeCheckbox(!isChecked)}
      isChecked={isChecked}
      leftText={leftText}
      disabled={disabled}
      leftTextStyle={styles.leftText}
      checkBoxColor={isChecked ? colors.accent : hasError ? colors.accent : colors?.blueDarker}
    />
  )
}

export default AppCheckbox
