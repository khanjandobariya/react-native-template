import NetInfo, {type NetInfoState} from '@react-native-community/netinfo'
import compareVersions from 'compare-versions'
import {t} from 'i18next'
import {cloneDeep, floor, last, split} from 'lodash'
import {Platform} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import Toast from 'react-native-toast-message'

import type {anyType} from '../types/commonTypes'
import {Loader, Utility} from '.'
import {Const, ToastType} from './Const/Const'

const clone: anyType = (val: anyType) => {
  return cloneDeep(val)
}

const log: (key: string, value: anyType) => void = (key: string, value: anyType) => {
  // eslint-disable-next-line no-console
  console.log(key, value)
}

const isMaintenanceScreen = (): boolean => {
  if (!Const.REMOTE_CONFIG) {
    return false
  }

  const {
    android_update_version_above,
    android_update_version_below,
    android_update_version_exact,
    android_maintenance_mode,
    ios_update_version_above,
    ios_update_version_below,
    ios_update_version_exact,
    ios_maintenance_mode
  } = Const.REMOTE_CONFIG

  const version: string = DeviceInfo.getVersion()

  if (Platform.OS === 'android') {
    if (
      android_update_version_above !== '' &&
      android_update_version_above !== '0' &&
      compareVersions.compare(String(version), String(android_update_version_above), '>')
    ) {
      return true
    }
    if (
      android_update_version_below !== '' &&
      android_update_version_below !== '0' &&
      compareVersions.compare(String(version), String(android_update_version_below), '<')
    ) {
      return true
    }
    if (
      android_update_version_exact !== '' &&
      android_update_version_exact !== '0' &&
      compareVersions.compare(String(version), String(android_update_version_exact), '=')
    ) {
      return true
    }
    if (android_maintenance_mode !== '' && android_maintenance_mode === '1') {
      return true
    }
    return false
  }
  if (Platform.OS === 'ios') {
    if (
      ios_update_version_above !== '' &&
      ios_update_version_above !== '0' &&
      compareVersions.compare(String(version), String(ios_update_version_above), '>')
    ) {
      return true
    }
    if (
      ios_update_version_below !== '' &&
      ios_update_version_below !== '0' &&
      compareVersions.compare(String(version), String(ios_update_version_below), '<')
    ) {
      return true
    }
    if (
      ios_update_version_exact !== '' &&
      ios_update_version_exact !== '0' &&
      compareVersions.compare(String(version), String(ios_update_version_exact), '=')
    ) {
      return true
    }
    if (ios_maintenance_mode !== '' && ios_maintenance_mode === '1') {
      return true
    }
    return false
  }
  return false
}

export const isIOS26OrAbove = (version: string): boolean => {
  return compareVersions.compare(version, '26.0', '>=')
}

const dateToCounter: (seconds: number) => string[] = (seconds: number) => {
  const d: number = floor(seconds / (3600 * 24))
  const h: number = floor((seconds % (3600 * 24)) / 3600)
  const m: number = floor((seconds % 3600) / 60)
  const s: number = floor(seconds % 60)

  const dDisplay: string = d > 0 ? `${d < 10 ? `0${d}` : d}` : ''
  const hDisplay: string = h > 0 ? `${h < 10 ? `0${h}` : h}` : ''
  const mDisplay: string = m > 0 ? `${m < 10 ? `0${m}` : m}` : ''
  const sDisplay: string = s > 0 ? `${s < 10 ? `0${s}` : s}` : ''

  return [dDisplay, hDisplay, mDisplay, sDisplay]
}

const showToast: anyType = (message: string, type: string = ToastType.SUCCESS) => {
  Toast.show({
    type: type,
    text1: message
  })
}

const getFileNameFromUrl = (url: string): string => {
  return last(split(url, '/')) ?? ''
}

const tryCatch = async (fn: () => Promise<anyType>) => {
  try {
    return [await fn(), null]
  } catch (err: anyType) {
    return [null, err]
  }
}

const getNetworkStatus = async () => {
  return await new Promise<boolean>((resolve: (value: boolean) => void) => {
    NetInfo.fetch()
      .then((state: NetInfoState) => {
        const isConnected = state.isInternetReachable ?? state.isConnected ?? false
        if (!isConnected) {
          Utility.showToast(t('common.no_internet_connection'), ToastType.ERROR)
          Loader.isLoading(false)
        }
        resolve(isConnected)
      })
      .catch(() => {
        Utility.showToast(t('common.no_internet_connection'), ToastType.ERROR)
        resolve(false)
        Loader.isLoading(false)
      })
  })
}

// export {clone, dateToCounter, getFileNameFromUrl, isMaintenanceScreen, log, showToast}

export {
  clone,
  dateToCounter,
  getFileNameFromUrl,
  getNetworkStatus,
  isMaintenanceScreen,
  log,
  showToast,
  tryCatch
}
