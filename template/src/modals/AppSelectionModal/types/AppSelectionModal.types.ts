import type {anyType} from '@/types/commonTypes'

type AppSelectionModalProps = {
  isVisible: boolean
  onClose: () => void
  onSelect: (value: anyType) => void
  data: anyType[]
  title?: string
}

export type {AppSelectionModalProps}
