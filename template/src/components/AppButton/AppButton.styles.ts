import {StyleSheet} from 'react-native'

import type {RSType} from '@/hooks/useResponsiveHook'
import {FONTS} from '@/theme/Fonts'
import type {ColorType} from '@/theme/Theme'

export const myStyles = (colors: ColorType, RS: RSType) => {
  const {hs, vs, ms} = RS
  return StyleSheet.create({
    // ── Primary (green bg, white text) ──────────────────────────────
    primaryContainer: {
      backgroundColor: colors.green,
      paddingHorizontal: hs(24),
      paddingVertical: vs(16),
      borderRadius: ms(50),
      alignItems: 'center',
      justifyContent: 'center'
    },
    primaryText: {
      fontFamily: FONTS.extraBold,
      fontSize: ms(14),
      color: colors.white,
      letterSpacing: 0.5,
      textTransform: 'uppercase'
    },
    // ── Secondary (white bg, black text) ───────────────────────────
    secondaryContainer: {
      backgroundColor: colors.white
    },
    secondaryText: {
      color: colors.black
    },
    // ── Disabled overlay ──────────────────────────────────────────
    disabledContainer: {
      opacity: 0.5
    }
  })
}
