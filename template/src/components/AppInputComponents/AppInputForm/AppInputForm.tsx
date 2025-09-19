import {Controller} from 'react-hook-form'
import {View} from 'react-native'

import {AppTextInput} from '@/components'

import type {AppInputFormProps} from './types/AppInputForm.types'

const AppInputForm = (props: AppInputFormProps) => {
  const {control, name, errors, type, textInputProps} = props
  const errorMessage: string | undefined = errors?.[name]?.message

  const renderTextInput = (value: string, onChange: (text: string) => void) => {
    return (
      <AppTextInput
        {...textInputProps}
        value={value}
        onChangeText={onChange}
        errorMessage={errorMessage}
      />
    )
  }

  return (
    <Controller
      control={control}
      rules={{required: true}}
      name={name}
      render={({field: {onChange, value}}) => {
        switch (type) {
          case 'input':
            return renderTextInput(value, onChange)
          case 'dropdown':
            return <View />
          default:
            return renderTextInput(value, onChange)
        }
      }}
    />
  )
}

export default AppInputForm
