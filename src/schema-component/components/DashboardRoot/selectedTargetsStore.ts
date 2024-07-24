import { observable } from '@formily/reactive'
import type { MoveableTargetGroupsType } from 'react-moveable'

export const selectedTargetsStore = observable.ref<
  MoveableTargetGroupsType
>(
  [],
)
