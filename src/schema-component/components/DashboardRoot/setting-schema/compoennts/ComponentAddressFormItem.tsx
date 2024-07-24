import React from 'react'
import { useToken } from '@/style'

export function ComponentAddressFormItem({ value }: { value?: string }) {
  const { token } = useToken()

  return (
    <div
      style={{
        color: token.colorText,
      }}
    >
      {value}
    </div>
  )
}
