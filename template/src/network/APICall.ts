/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-console */
import Axios, {type AxiosRequestConfig} from 'axios'

import Config from '@/config/Config'

const axiosInstance = Axios.create({
  baseURL: Config.BASE_URL
})

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('axios request =>', config)
    return config
  },
  async (error) => {
    console.log('axios request error =>', error)
    return await Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (config) => {
    console.log('axios response =>', config)
    return config
  },
  async (error) => {
    console.log('axios response error =>', error.response || error)
    return await Promise.reject(error)
  }
)

const getFormData = (object: any) => {
  const formData = new FormData()
  Object.keys(object).forEach((key) => {
    formData.append(key, object[key])
  })
  return formData
}

const APICall = async (
  method: string,
  url: string,
  body?: any,
  headers?: any,
  formData?: boolean
) => {
  method = method.toLowerCase()
  const config: AxiosRequestConfig = {
    method,
    url,
    timeout: 1000 * 60 * 2
  }
  if (url) {
    config.url = url
  }
  if (body && method === 'get') {
    config.params = body
  } else if (body && method.toLowerCase() === 'post' && !formData) {
    config.data = body
  } else if (body && method === 'post' && formData) {
    config.data = getFormData(body)
  } else {
    config.data = body
  }
  if (headers) {
    config.headers = headers
  }

  return await new Promise((resolve, reject) => {
    axiosInstance(config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 502 || error.response.status === 404) {
            reject('Error')
            return
          }
          reject('Error')
          return
        }
        if (error.code === 'ECONNABORTED') {
          reject('Request timeout. Please check your internet connection')
          return
        }
        reject('Something went wrong, Please try again later.')
      })
  })
}

export default APICall
