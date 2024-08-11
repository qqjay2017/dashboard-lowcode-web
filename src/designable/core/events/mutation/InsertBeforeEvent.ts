import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import type { ICustomEvent } from '@/designable/shared'

export class InsertBeforeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent {
  type = 'insert:before'
}
