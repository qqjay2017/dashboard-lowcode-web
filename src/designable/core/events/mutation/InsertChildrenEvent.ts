import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import type { ICustomEvent } from '@/designable/shared'

export class InsertChildrenEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent {
  type = 'insert:children'
}
