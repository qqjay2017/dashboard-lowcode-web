import {
  ClassicFrameMenuItem,
  Header1MenuItem,
  HeaderMenuMenuItem,
  ProjectBudgetMenuItem,
} from '../../widgets'

const subMenuItems0 = [ClassicFrameMenuItem]

const subMenuItems2 = []

const subMenuItems3 = [Header1MenuItem, HeaderMenuMenuItem]

const subMenuItems4 = [ProjectBudgetMenuItem]
export type SubMenuItems = (typeof subMenuItems0)[0]

export const allSubMenuItems = {
  0: subMenuItems0,
  2: subMenuItems2,
  3: subMenuItems3,
  4: subMenuItems4,
}
