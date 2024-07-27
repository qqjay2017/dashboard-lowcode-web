import { useMemo } from 'react'
import Handlebars from 'handlebars'
import { useSchemaOptionsContext } from '../core'

export function useStrHandlebars(titleStr = '') {
  const { scope } = useSchemaOptionsContext()
  console.log(scope, 'scope')
  const str = useMemo(() => {
    const template = Handlebars.compile(titleStr)
    return template({
      dashboardDt: scope?.dashboardDt,

    })
  }, [titleStr, scope?.dashboardDt])

  return str
}
