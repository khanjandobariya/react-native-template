import type {AppDropDownProps} from '@/components/AppDropDown/types/AppDropDown.types'
import type {anyType} from '@/types/commonTypes'

import type {AppTextInputProps} from '../../AppTextInput/types/AppTextInput.types'

type InputType = 'input' | 'dropdown'

type AppInputFormProps = {
  control: anyType
  name: string
  errors?: anyType
  type: InputType
  textInputProps?: AppTextInputProps
  dropDownProps?: AppDropDownProps
}

export type {AppInputFormProps}
