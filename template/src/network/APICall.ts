/* eslint-disable custom-rules/custom-typedef-ignore-styles */
import type {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import Axios from 'axios'
import {forEach, keysIn, toLower} from 'lodash'

import Config from '@/config/Config'
import {Emitter, getStorage, Loader, setStorage, StorageKey} from '@/utils'
import {EVENT_TYPE, ToastType} from '@/utils/Const/Const'
import {log, showToast} from '@/utils/Utility'

import type {anyType, TokensType} from '../types/commonTypes'
import EndPoints from './EndPoints'

let isSessionExpired = false

const axiosInstance: AxiosInstance = Axios.create({
  baseURL: Config.BASE_URL,
  timeout: 1000 * 60 * 2
})

const onExpireSessionToast = () => {
  setTimeout(() => {
    showToast('Session is expired', ToastType.ERROR)
  }, 500)
}

const getRefreshToken = (): Promise<anyType> => {
  return new Promise<anyType>(
    (resolve: (value: anyType) => void, reject: (reason?: anyType) => void) => {
      const {refresh}: TokensType = getStorage(StorageKey.TOKENS) ?? {}

      if (!refresh) {
        reject(new Error('No refresh token'))
        return
      }

      fetch(`${Config.BASE_URL}${EndPoints.refreshToken}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({refresh})
      })
        .then((res: anyType) => res.json())
        .then((res: anyType) => {
          if (res?.isError) {
            reject(res)
            return
          }
          setStorage(StorageKey.TOKENS, {
            access: res.access ?? '',
            refresh: res.refresh ?? ''
          })
          resolve(res)
        })
        .catch(reject)
    }
  )
}

const getFormData = (object: anyType): FormData => {
  const formData = new FormData()
  forEach(keysIn(object), (key) => {
    formData.append(key, object[key])
  })
  return formData
}

// Request interceptor - adds auth token to requests
axiosInstance.interceptors.request.use(
  (config: anyType) => {
    const {access}: TokensType = getStorage(StorageKey.TOKENS) ?? {}

    if (access) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${access}`
      }
    }

    log('axios request =>', config)
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - logs responses
axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    log('axios response =>', res)
    isSessionExpired = false
    return res
  },
  (error: AxiosError) => {
    log('axios response error =>', error?.response ?? error)
    return Promise.reject(error)
  }
)

const APICall = async (
  method: string,
  url: string,
  body?: anyType,
  headers?: anyType,
  formData?: boolean
) => {
  method = toLower(method)

  const REQUEST_CONFIG: AxiosRequestConfig = {
    method,
    url
  }

  if (body && method === 'get') {
    REQUEST_CONFIG.params = body
  } else if (body && (method === 'post' || method === 'put') && formData) {
    REQUEST_CONFIG.data = getFormData(body)
    REQUEST_CONFIG.headers = {'Content-Type': 'multipart/form-data'}
  } else {
    REQUEST_CONFIG.data = body
  }

  if (headers) {
    REQUEST_CONFIG.headers = {
      ...REQUEST_CONFIG.headers,
      ...headers
    }
  }

  return new Promise(async (resolve, reject) => {
    try {
      const res: AxiosResponse = await axiosInstance.request(REQUEST_CONFIG)
      resolve(res.data)
    } catch (error: anyType) {
      // Handle 401 errors (token expired) with automatic retry
      if (error?.response?.status === 401 && !(REQUEST_CONFIG as anyType)._retried) {
        try {
          // Mark as retried to prevent infinite loops
          ;(REQUEST_CONFIG as anyType)._retried = true

          // Refresh the token
          const refreshData: anyType = await getRefreshToken()
          if (refreshData?.isError) {
            throw error
          }

          // Get the new access token
          const {access: newAccessToken}: TokensType = getStorage(StorageKey.TOKENS) ?? {}

          // Update request with new token
          REQUEST_CONFIG.headers = {
            ...REQUEST_CONFIG.headers,
            Authorization: `Bearer ${newAccessToken}`
          }

          const retryRes: AxiosResponse = await axiosInstance.request(REQUEST_CONFIG)
          resolve(retryRes.data)
          return
        } catch {
          Loader.isLoading(false)
          if (!isSessionExpired) {
            onExpireSessionToast()
            Emitter.emit(EVENT_TYPE.LOGOUT)
            isSessionExpired = true
          }
          reject(error)
          return
        }
      }

      // Handle other errors
      if (error?.response?.data) {
        const msg = error.response.data?.message
        showToast(msg, ToastType.ERROR)
        reject(error.response.data)
        return
      }

      if (error.code === 'ECONNABORTED') {
        showToast('Request timeout. Please check your internet connection', ToastType.ERROR)
      } else {
        showToast('Something went wrong, Please try again later.', ToastType.ERROR)
      }

      reject(error)
    }
  })
}

export default APICall
