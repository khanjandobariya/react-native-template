// import notifee, { AuthorizationStatus, type NotificationSettings } from '@notifee/react-native'
import {Platform} from 'react-native'
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions'

// const getNotificationPermission = async (): Promise<boolean> => {
//   try {
//     const settings = await notifee.requestPermission()
//     if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
//       return true
//     } else {
//       return false
//     }
//   } catch (error) {
//     return false
//   }
// }

// const onCheckNotificationPermission = async (): Promise<boolean> => {
//   try {
//     const settings: NotificationSettings = await notifee.getNotificationSettings()
//     return settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED
//   } catch (error) {
//     return false
//   }
// }

const getStoragePermission = async () => {
  try {
    if (Platform.OS === 'ios') return true
    if (Platform.OS === 'android' && Number(Platform.Version) >= 31) return true
    const permission = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
    return permission === RESULTS.GRANTED
  } catch {
    return false
  }
}

export {getStoragePermission}
