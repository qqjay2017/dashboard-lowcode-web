import { GlobalRegistry } from 'designablecore'
import icons from './icons'
import panels from './panels'
import global from './global'
import operations from './operations'

GlobalRegistry.setDesignerLanguage('zh-cn')

GlobalRegistry.registerDesignerLocales(icons, panels, global, operations)
