import type * as ConstTypes from './types/Const.types'

export const TOKEN: ConstTypes.TokenType = {
  AUTH_TOKEN: '',
  ACCESS_TOKEN: '',
  REFRESH_TOKEN: ''
}

export const PUSH_DATA: ConstTypes.PushType = {
  userId: '',
  pushToken: ''
}

export const Const: ConstTypes.ConstType = {
  IS_ONBOARDED: false,
  IS_NOTIFICATION_REQUESTED: false,
  REMOTE_CONFIG: null,
  IS_MAINTENANCE: false,
  IS_LOGIN: false,
  EMAIL_REG_EXP: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
  TOKEN: '',
  PASSWORD_REG_EXP: /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/,
  USER_DETAILS: null,
  THEME: {
    primary_bg: '#0F172A',
    primary_text: '#FFFFFF',
    card_bg: '#FFFFFF',
    card_text: '#000000',
    button_bg: '#1A7332',
    button_text: '#FFFFFF',
    clouser_bg: '#BDD3BF',
    Info_text: '#FFFFFF'
  }
}
export const LINKS: ConstTypes.LinksType = {
  TERMS_AND_CONDITIONS_URL: '',
  YOUTUBE_URL: '',
  YOUTUBE_CHANNEL_URL: ''
}
export const ToastType: ConstTypes.ToastType = {
  INFO: 'info',
  ERROR: 'error',
  SUCCESS: 'success'
}

export const PAGE: ConstTypes.PageSizeType = {
  SIZE_10: 10,
  SIZE_20: 20
}

export const EVENT_TYPE: ConstTypes.EventType = {
  LOGOUT: 'logout'
}

export const EXAM_TYPE: ConstTypes.ExamType = {
  ACADEMIC: 2,
  GENERAL: 1
}
