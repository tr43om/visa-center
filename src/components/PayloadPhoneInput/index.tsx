'use client'
import React from 'react'
import type { TextFieldServerComponent } from 'payload'
import { useField } from '@payloadcms/ui'
import { PhoneInput } from '../ui/phone-input'

export const PayloadPhoneInput: TextFieldServerComponent = ({ clientField: {}, data, path }) => {
  const { value: phone, setValue: setPhone } = useField<string>({ path })
  return <PhoneInput value={phone} onChange={setPhone} />
}
