import type {DrawerContentComponentProps} from '@react-navigation/drawer'
import {Image, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

import {AppFlatList, AppIcon, AppPressable, AppText} from '@/components'
import {useCommonHooks} from '@/hooks'
import {Icons, Images} from '@/utils'

import useSidemenuDrawer from './hooks/useSidemenuDrawer'
import {myStyles} from './SidemenuDrawer.styles'

const SidemenuDrawer = (props: DrawerContentComponentProps) => {
  const {colors, RS, t} = useCommonHooks()
  const styles = myStyles(colors, RS)
  const {onCloseDrawer, menuItems, onPressLogout} = useSidemenuDrawer(props)

  const renderItem = ({item}: {item: {id: string; title: string}}) => (
    <AppPressable style={styles.itemContainer}>
      <AppText variant="bodyNormal" style={styles.itemText}>
        {item.title}
      </AppText>
    </AppPressable>
  )

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={Images.nzc_logo} style={styles.logo} resizeMode="contain" />
        <AppIcon
          source={Icons.close}
          style={styles.closeButton}
          tintColor={colors.green}
          size={40}
          onPress={onCloseDrawer}
          disabled={false}
          iconStyle={styles.crossIconStyle}
        />
      </View>

      {/* List */}
      <View style={styles.listContainer}>
        <AppFlatList data={menuItems} keyLabel={'sidemenu'} renderItem={renderItem} isDevider />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <AppText variant="bodyNormalBold" style={styles.versionText}>
          {t('sidemenu.version')}
        </AppText>

        <AppPressable style={styles.logoutContainer} onPress={onPressLogout}>
          <AppIcon source={Icons.logout} tintColor={colors.green} size={24} />
          <AppText variant="bodyNormalBold" style={styles.logoutText}>
            {t('sidemenu.logout')}
          </AppText>
        </AppPressable>
      </View>
    </SafeAreaView>
  )
}

export default SidemenuDrawer
