'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { z } from 'zod'
import { submissionSchema } from './submission.schemas'
import { render } from '@react-email/components'
import CallbackEmail from '@/emails/callback-email'
import { getContacts } from '../contacts/contacts.queries'
export async function sendEmail(values: z.infer<typeof submissionSchema>) {
  const payload = await getPayload({ config })
  const emailHtml = await render(<CallbackEmail {...values} />)
  const contacts = await getContacts()
  const emailTo = contacts.docs.find((doc) => doc.type === 'email')?.text || process.env.SMTP_TO

  await payload.sendEmail({
    to: emailTo,
    subject: 'Новая заявка',
    html: emailHtml,
  })
}

export async function createSubmission(values: z.infer<typeof submissionSchema>) {
  const payload = await getPayload({ config })

  const submission = await payload.create({ collection: 'submissions', data: values })
  return submission
}
