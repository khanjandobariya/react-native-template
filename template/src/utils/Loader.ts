/* eslint-disable custom-rules/custom-typedef-ignore-styles */
import type {anyType} from '../types/commonTypes'

export default class Loader {
  static loader: anyType

  static setLoader = (loader: anyType) => {
    this.loader = loader
  }

  static isLoading = (check: boolean) => {
    this.loader.showLoader(check)
  }
}
