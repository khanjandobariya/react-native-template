import {Config as AppConfig} from 'react-native-config'

const isStaging = true

const Config = {
  BASE_URL: isStaging ? AppConfig.BASE_URL : AppConfig.PROD_URL,
  isPROD : !isStaging
}

export default Config
