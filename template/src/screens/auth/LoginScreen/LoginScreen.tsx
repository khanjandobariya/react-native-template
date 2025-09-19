import type {JSX} from 'react'
import {useTranslation} from 'react-i18next'
import {View} from 'react-native'

import {
  AppButton,
  AppCheckbox,
  AppContainer,
  AppInnerContainer,
  AppInputForm,
  AppPressable,
  AppScrollView,
  AppSeparator,
  AppText
} from '@/components'
import {TEXT} from '@/components/AppText/AppText'
import {useResponsiveHook} from '@/hooks'
import useColor from '@/hooks/useColor'
import type {ColorType} from '@/theme/Theme'
import {Images} from '@/utils'
import CommonStyles from '@/utils/CommonStyles'

import useLoginScreen from './hooks/useLoginScreen'
import {myStyles} from './LoginScreen.style'

const LoginScreen = () => {
  const colors: ColorType = useColor()
  const RS = useResponsiveHook()
  const styles = myStyles(colors, RS)

  const {t} = useTranslation()
  const {
    control,
    errors,
    onPressLoginHandler,
    isRememberMe,
    setIsRememberMe,
    emailRef,
    passwordRef,
    onPressSignUp,
    onPressForgotPassword
  } = useLoginScreen()

  const renderInputForm: () => JSX.Element = (): JSX.Element => (
    <>
      <AppInputForm
        type="input"
        control={control}
        errors={errors}
        name="email"
        textInputProps={{
          prefixIcon: Images.email,
          label: t('ALFA_1'),
          placeholder: t('ALFA_2'),
          keyboardType: 'email-address',
          returnKeyType: 'next',
          autoCapitalize: 'none',
          innerRef: emailRef,
          onSubmitEditing: () => {
            passwordRef.current?.focus()
          }
        }}
      />

      <AppSeparator size={10} />
      <AppInputForm
        type="input"
        control={control}
        errors={errors}
        name="password"
        textInputProps={{
          prefixIcon: Images.lock,
          label: t('ALFA_3'),
          placeholder: t('ALFA_3'),
          secureTextEntry: true,
          returnKeyType: 'done',
          innerRef: passwordRef
        }}
      />
    </>
  )

  const renderRememberMe: () => JSX.Element = (): JSX.Element => (
    <>
      <AppSeparator size={10} />
      <View style={[CommonStyles.row, styles.rememberContainer]}>
        <AppPressable style={CommonStyles.row} onPress={() => setIsRememberMe(!isRememberMe)}>
          <AppCheckbox
            style={styles.checkbox}
            isChecked={isRememberMe}
            disabled={true}
            onClick={() => setIsRememberMe(!isRememberMe)}
          />
          <AppText style={styles.rememberMeText} type={TEXT.h5}>
            {t('ALFA_11')}
          </AppText>
        </AppPressable>
        <AppPressable onPress={onPressForgotPassword}>
          <AppText style={styles.forgotPasswordText} type={TEXT.h5}>
            {t('ALFA_12')}
          </AppText>
        </AppPressable>
      </View>
    </>
  )

  const renderButton: () => JSX.Element = (): JSX.Element => (
    <>
      <AppSeparator size={20} />
      <AppButton onPress={onPressLoginHandler} label={t('ALFA_5')} />
    </>
  )

  const renderSocialLogins: () => JSX.Element = (): JSX.Element => {
    return (
      <>
        <AppSeparator size={25} />
        <AppText style={styles.loginText} type={TEXT.h5}>
          {t('ALFA_13')}
        </AppText>
        <AppSeparator size={25} />
      </>
    )
  }

  const renderBottom: () => JSX.Element = (): JSX.Element => {
    return (
      <>
        <View style={styles.bottomContainer}>
          <AppText style={styles.bottomText} type={TEXT.h4}>
            {t('ALFA_15') + ' '}
            <AppText style={styles.bottomInnerText} type={TEXT.h3} onPress={onPressSignUp}>
              {t('ALFA_16')}
            </AppText>
          </AppText>
        </View>
        <AppSeparator size={20} />
      </>
    )
  }

  return (
    <AppContainer>
      <AppInnerContainer>
        <AppScrollView showsVerticalScrollIndicator={false}>
          <AppText style={styles.title}>{'LoginScreen'}</AppText>
          {renderInputForm()}
          {renderRememberMe()}
          {renderButton()}
          {renderSocialLogins()}
          {renderBottom()}
        </AppScrollView>
      </AppInnerContainer>
    </AppContainer>
  )
}

export default LoginScreen
