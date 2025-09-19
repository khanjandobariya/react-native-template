import {MMKV} from 'react-native-mmkv'

import type {Any} from '@/types/commonTypes'

export const storage: MMKV = new MMKV()

const setData: (key: string, payload: Any) => void = (key: string, payload: Any) => {
  try {
    storage.set(key, JSON.stringify(payload))
  } catch (e) {
    throw new Error(e)
  }
}

const getData: Any = async (key: string): Promise<Any> => {
  try {
    const value: string | undefined = storage.getString(key)
    if (value !== undefined) {
      return JSON.parse(value)
    }
    return null
  } catch (e) {
    throw new Error(e)
  }
}

const Storage = {
  setData,
  getData
}

export default Storage
