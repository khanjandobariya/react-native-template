// Font names now match PostScript names for both iOS and Android
// Files have been renamed to match the internal font names
export const FONTS: FontTypes = {
  thin: 'Outfit-Thin', //100
  extraLight: 'Outfit-ExtraLight', //200
  light: 'Outfit-Light', //300
  regular: 'Outfit-Regular', //400
  medium: 'Outfit-Medium', //500
  semiBold: 'Outfit-SemiBold', //600
  bold: 'Outfit-Bold', //700
  extraBold: 'Outfit-ExtraBold', //800
  black: 'Outfit-Black' //900
}

type FontTypes = {
  black: string
  bold: string
  extraBold: string
  extraLight: string
  light: string
  medium: string
  regular: string
  semiBold: string
  thin: string
}
