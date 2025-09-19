import {yupResolver} from '@hookform/resolvers/yup'
import {useRef, useState} from 'react'
import type {UseFormReturn} from 'react-hook-form'
import {type SubmitHandler, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import type {TextInput} from 'react-native'
import * as yup from 'yup'

type LoginFormValues = {
  email: string
  password: string
}

const useLoginScreen = () => {
  const {t} = useTranslation()

  const [isRememberMe, setIsRememberMe] = useState(false)

  const onPressSignUp: () => void = () => {}

  const onPressForgotPassword: () => void = () => {}

  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)

  const schema = yup.object({
    email: yup.string().trim().email(t('ALFA_7')).required(t('ALFA_6')),
    password: yup.string().trim().required(t('ALFA_8'))
  })

  const {
    control,
    handleSubmit,
    formState: {errors}
  }: UseFormReturn<LoginFormValues> = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onEmailLogin: SubmitHandler<LoginFormValues> = async () => {}

  const onPressLoginHandler = () => {
    void handleSubmit(onEmailLogin)()
  }
  return {
    control,
    errors,
    onPressLoginHandler,
    isRememberMe,
    setIsRememberMe,
    emailRef,
    passwordRef,
    onPressSignUp,
    onPressForgotPassword
  }
}

export default useLoginScreen
