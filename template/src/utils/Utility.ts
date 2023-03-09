import {cloneDeep} from 'lodash'

const clone = (val: any) => {
  return cloneDeep(val)
}

export {clone}
