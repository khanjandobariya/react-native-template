import {useState} from 'react'

import type {anyType} from '../../../../types/commonTypes'

const useAppTextInput = ({secureTextEntry}: anyType) => {
  const [isHidePassword, setIsHidePassword] = useState(secureTextEntry)

  const onPressSecureText = () => {
    setIsHidePassword(!isHidePassword)
  }

  return {isHidePassword, onPressSecureText}
}

export default useAppTextInput
