import {difference, forEach} from 'lodash'
import {createMMKV, type MMKV} from 'react-native-mmkv'

import type {Any, anyType} from '@/types/commonTypes'

import {StorageKey} from './StorageKey'

export const storage: MMKV = createMMKV()

export const setStorage: (key: string, payload: Any) => void = (
  key: string,
  payload: Any
): void => {
  try {
    storage.set(key, JSON.stringify(payload))
  } catch (e: anyType) {
    throw new Error(e)
  }
}
export const getStorage: (key: string) => anyType = (key: string) => {
  try {
    const value: string | undefined = storage.getString(key)
    if (value !== undefined) {
      return JSON.parse(value)
    }
    return null
  } catch (e: anyType) {
    throw new Error(e)
  }
}

export const onClearStorage: () => void = () => {
  const EXCLUDED_KEYS: string[] = []
  // eslint-disable-next-line custom-rules/prefer-lodash-methods
  const keys = Object.values(StorageKey)
  const keysToClear = difference(keys, EXCLUDED_KEYS)
  forEach(keysToClear, (key: string) => {
    storage.remove(key)
  })
}
