import { submissionSchema } from '@/entities/submission/submission.schemas'
import {
  Body,
  Column,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
} from '@react-email/components'
import * as React from 'react'
import { z } from 'zod'

export default function CallbackEmail({ name, phone, text }: z.infer<typeof submissionSchema>) {
  return (
    <Html lang="ru">
      <Head>
        <title>Новая заявка </title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Preview>
          {phone},{name},{text ?? '-'}
        </Preview>
      </Head>

      <Body>
        <Tailwind>
          <Heading as="h2" className="text-slate-700">
            Новая заявка{' '}
          </Heading>
          <Section className="bg-slate-50 border">
            <Row className="bg-slate-100">
              <Column className="font-bold p-3 w-32 text-slate-600">Имя:</Column>
              <Column className="p-3 text-slate-600">{name ?? '-'}</Column>
            </Row>
            <Row>
              <Column className="font-bold p-3 w-32 text-slate-600">Телефон:</Column>
              <Column className="p-3 text-slate-600">{phone ?? '-'}</Column>
            </Row>
            <Row className="bg-slate-100">
              <Column className="font-bold p-3 w-32 text-slate-600">Направление:</Column>
              <Column className="p-3 text-left text-slate-600">placeholder</Column>
            </Row>
            <Row>
              <Column className="font-bold p-3 w-32 text-slate-600">Тип визы:</Column>
              <Column className="p-3 text-slate-600">placeholder</Column>
            </Row>
            <Row className="bg-slate-100">
              <Column className="font-bold p-3 w-32 text-slate-600">Запрос:</Column>
              <Column className="p-3 text-slate-600">{text ?? '-'}</Column>
            </Row>
          </Section>
        </Tailwind>
      </Body>
    </Html>
  )
}
