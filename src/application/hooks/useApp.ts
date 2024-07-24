import { useContext } from 'react'
import type { Application } from '../Application'
import { ApplicationContext } from '../context'

export function useApp() {
  return useContext(ApplicationContext) || ({} as Application)
}
