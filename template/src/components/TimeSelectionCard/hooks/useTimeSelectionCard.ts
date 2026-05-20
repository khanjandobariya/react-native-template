import moment from 'moment'
import {useState} from 'react'

import type {anyType} from '@/types/commonTypes'

import type {TimeSelectionCardProps} from '../types/TimeSelectionCard.types'

const useTimeSelectionCard = (props: TimeSelectionCardProps) => {
  const {value, isTimeSelect, onSelect} = props
  const [isShowTime, setIsShowTime] = useState(false)
  const [isShowDropDown, setIsShowDropDown] = useState(false)

  const onConfirm = (item: anyType) => {
    if (isTimeSelect) {
      setIsShowTime(false)
      return
    }
    onSelect?.(item)
    setIsShowDropDown(false)
  }

  const onCancel = () => {
    if (isTimeSelect) {
      setIsShowTime(false)
      return
    }
    setIsShowDropDown(false)
  }

  const onPressSelect = () => {
    if (isTimeSelect) {
      setIsShowTime(true)
      return
    }
    setIsShowDropDown(true)
  }

  const getTimeValue = () => {
    const date = moment(`${moment().format('DD/MM/YYYY')} ${value}`, 'DD/MM/YYYY hh:mm')

    const timeValue = value ? new Date(date.toDate()) : new Date()
    return timeValue
  }

  return {isShowTime, isShowDropDown, onConfirm, onCancel, onPressSelect, getTimeValue}
}

export default useTimeSelectionCard
