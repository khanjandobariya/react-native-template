import type {anyType} from '@/types/commonTypes'

type ErrorTypes = {
  data?: anyType
  message: string
  status: boolean
  statusCode: number
}

type ApiResType = {
  return_code: string
  status: boolean
  message: string
  data?: anyType
}

export type {ApiResType, ErrorTypes}
