'use client'
import React from 'react'
import type { TextFieldServerComponent } from 'payload'
import { useField, TextInput, useFormFields, FieldLabel } from '@payloadcms/ui'
import { PhoneInput } from '../ui/phone-input'
import { Contact } from '@/payload-types'

const fields = {
  ['phone']: PhoneInput,
  ['whatsapp']: PhoneInput,
  ['instagram']: TextInput,
  ['address']: TextInput,
  ['email']: TextInput,
}

const labels = {
  ['phone']: 'Введите номер телефона:',
  ['whatsapp']: 'Введите номер телефона:',
  ['instagram']: 'Ссылка на аккаунт:',
  ['address']: 'Ссылка с 2гис:',
  ['email']: 'Почта:',
}

export const PayloadContactsComponent: TextFieldServerComponent = (props) => {
  const { value: phone, setValue: setPhone } = useField<string>({ path: props.path })
  const [type, setType] = useFormFields<[Contact['type'], (value: string) => void]>(
    ([fields, dispatch]) => [
      fields.type?.value as Contact['type'],
      (value: string) => dispatch({ type: 'UPDATE', path: 'type', value: value }),
    ],
  )
  const Component = fields[type]
  const label = labels[type]

  return (
    <>
      <FieldLabel label={label} as="label" htmlFor={type} />
      <Component
        value={phone}
        onChange={setPhone}
        type={type === 'email' ? 'email' : 'url'}
        defaultCountry="KZ"
        required
        {...props}
        id={type}
      />
    </>
  )
}
