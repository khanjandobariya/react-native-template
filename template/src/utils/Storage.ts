/* eslint-disable @typescript-eslint/no-unsafe-argument */
import AsyncStorage from '@react-native-async-storage/async-storage'

const setData = async (key: string, payload: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(payload))
  } catch (e) {
    throw new Error(e)
  }
}

const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
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
