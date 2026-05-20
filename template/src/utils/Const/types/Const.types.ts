import type {anyType} from '../../../types/commonTypes'

type TokenType = {
  AUTH_TOKEN: string
  ACCESS_TOKEN: string
  REFRESH_TOKEN: string
}

type PushType = {
  userId: string
  pushToken: string
}

type ConstType = {
  IS_ONBOARDED: boolean
  IS_NOTIFICATION_REQUESTED: boolean
  REMOTE_CONFIG: anyType
  IS_MAINTENANCE: boolean
  IS_LOGIN: boolean
  EMAIL_REG_EXP: RegExp
  TOKEN: string
  PASSWORD_REG_EXP: RegExp
  USER_DETAILS: anyType
  THEME: anyType
}

type LinksType = {
  TERMS_AND_CONDITIONS_URL: string
  YOUTUBE_URL: string
  YOUTUBE_CHANNEL_URL: string
}

type PageSizeType = {
  SIZE_10: number
  SIZE_20: number
}

type ToastType = {
  INFO: string
  ERROR: string
  SUCCESS: string
}

type EventType = {
  LOGOUT: string
}

type ExamType = {
  ACADEMIC: number
  GENERAL: number
}

export type {
  ConstType,
  EventType,
  ExamType,
  LinksType,
  PageSizeType,
  PushType,
  ToastType,
  TokenType
}
