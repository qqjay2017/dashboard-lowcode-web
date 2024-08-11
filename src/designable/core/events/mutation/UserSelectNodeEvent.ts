import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import type { ICustomEvent } from '@/designable/shared'

export class SelectNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent {
  type = 'user:select:node'
}
