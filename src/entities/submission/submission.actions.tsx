'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { z } from 'zod'
import { submissionSchema } from './submission.schemas'
import { render } from '@react-email/components'
import CallbackEmail from '@/emails/callback-email'
export async function sendEmail(values: z.infer<typeof submissionSchema>) {
  const payload = await getPayload({ config })
  const emailHtml = await render(<CallbackEmail {...values} />)

  await payload.sendEmail({
    to: 'aktaugood@mail.ru',
    subject: 'Новая заявка',
    html: emailHtml,
  })
}

export async function createSubmission(values: z.infer<typeof submissionSchema>) {
  const payload = await getPayload({ config })

  const submission = await payload.create({ collection: 'submissions', data: values })
  return submission
}
