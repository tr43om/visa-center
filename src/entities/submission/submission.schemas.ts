import { z } from 'zod'

export const submissionSchema = z.object({
  name: z.string(),
  phone: z.string(),
  text: z.string().optional(),
})
