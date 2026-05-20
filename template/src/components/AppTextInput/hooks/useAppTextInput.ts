import {useState} from 'react'

import type {AppTextInputProps} from '../types/AppTextInput.types'

const useAppTextInput = (_props: AppTextInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const onTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return {
    isPasswordVisible,
    onTogglePasswordVisibility
  }
}

export default useAppTextInput
