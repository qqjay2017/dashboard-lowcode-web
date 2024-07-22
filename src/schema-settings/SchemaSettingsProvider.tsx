import type { PropsWithChildren } from 'react'

// import { SchemaSettingsContext } from './context'

interface SchemaSettingsProviderProps extends PropsWithChildren {}

export function SchemaSettingsProvider({
  children,
}: SchemaSettingsProviderProps) {
  return (
    <>
      {children}
    </>
    // <SchemaSettingsContext.Provider value={{}}>
    //   {children}
    // </SchemaSettingsContext.Provider>
  )
}
