import {Config as AppConfig} from 'react-native-config'

const isStaging: boolean = false

const Config = {
  isUAT: isStaging,
  SENTRY_DSN: AppConfig.SENTRY_DSN,
  BASE_URL: AppConfig.BASE_URL
}

export default Config
