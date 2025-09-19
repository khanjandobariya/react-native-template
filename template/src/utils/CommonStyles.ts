import {StyleSheet} from 'react-native'

const CommonStyles = StyleSheet.create({
  centerItem: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  flex0: {
    flex: 0
  },
  flex: {
    flex: 1
  },
  row: {
    flexDirection: 'row'
  },
  capitalize: {
    textTransform: 'capitalize'
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  fullWidthHeight: {
    width: '100%',
    height: '100%'
  },
  width100: {
    width: '100%'
  }
})

export default CommonStyles
