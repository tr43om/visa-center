'use client'
import * as React from 'react'
import { SelectInput, useField, useFormFields } from '@payloadcms/ui'
import countries from '@public/ISO3166_RU.json'
import { Option } from '@payloadcms/ui/elements/ReactSelect'
import { Visa } from '@/payload-types'
import { CustomComponent, FieldClientComponent } from 'payload'

type CustomSelectProps = CustomComponent<FieldClientComponent> & {
  path: string
}

type CustomOption = {
  value: string
  imgUrl: string
  label: string
} & Option

const toKebabCase = (str: string) =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map((x) => x.toLowerCase())
    .join('-')

export const PayloadCountrySelect: React.FC<CustomSelectProps> = ({ path }) => {
  const { value: country, setValue: setCountry } = useField<string>({ path })
  const [href, setHref] = useFormFields<[Visa['href'], (value: string) => void]>(
    ([fields, dispatch]) => [
      fields.href?.value as string,
      (value: string) => dispatch({ type: 'UPDATE', path: 'href', value: value }),
    ],
  )
  const [imgUrl, setImgUrl] = useFormFields<[Visa['imgUrl'], (value: string) => void]>(
    ([fields, dispatch]) => [
      fields.imgUrl?.value as string,
      (value: string) => dispatch({ type: 'UPDATE', path: 'imgUrl', value: value }),
    ],
  )

  const [label, setLabel] = useFormFields<[Visa['label'], (value: string) => void]>(
    ([fields, dispatch]) => [
      fields.label?.value as string,
      (value: string) => dispatch({ type: 'UPDATE', path: 'label', value: value }),
    ],
  )

  const adjustedOptions = countries.map((option) => {
    return {
      label: option.name_ru,
      value: new Intl.DisplayNames('en', { type: 'region' }).of(option.iso_code2)!,
      imgUrl: option.flag_url,
    }
  })

  const handleOnChange = (e: CustomOption) => {
    setCountry(e.value)
    setHref(`/visas/${toKebabCase(e.value)}`)
    setLabel(e.label)
    if (e.imgUrl) {
      setImgUrl(e.imgUrl)
    }
  }

  return (
    <div>
      <label className="field-label">Выберите страну </label>
      <SelectInput
        path={path}
        name={path}
        options={adjustedOptions}
        value={country}
        onChange={handleOnChange}
      />
    </div>
  )
}
