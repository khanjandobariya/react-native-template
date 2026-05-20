import {useCommonHooks} from '@/hooks'
import {onResetStack} from '@/router'
import type {anyType} from '@/types/commonTypes'
import {Screen} from '@/utils'
import {setStorage} from '@/utils/Storage'
import {StorageKey} from '@/utils/StorageKey'

import type {SidemenuDrawerProps} from '../types/SidemenuDrawer.types'

const useSidemenuDrawer = (props: SidemenuDrawerProps) => {
  const {navigation}: anyType = props
  const {t} = useCommonHooks()
  const menuItems = [
    {id: '1', title: t('sidemenu.howItWorks')},
    {id: '2', title: t('sidemenu.ourPeople')},
    {id: '3', title: t('sidemenu.contactUs')},
    {id: '4', title: t('sidemenu.bookAFreeDemo')},
    {id: '5', title: t('sidemenu.visitOurWebsite')}
  ]

  const onCloseDrawer = () => {
    navigation.closeDrawer()
  }

  const onPressLogout = () => {
    setStorage(StorageKey.USER_DETAILS, {isLogin: false})
    onResetStack([{name: Screen.AuthNavigation}])
  }

  return {onCloseDrawer, menuItems, onPressLogout}
}

export default useSidemenuDrawer
