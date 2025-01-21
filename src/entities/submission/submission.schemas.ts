import { z } from 'zod'

export const submissionSchema = z.object({
  name: z.string(),
  phone: z.string(),
  text: z.string().optional(),
  visa: z.string().optional(),
})

export const submissionFormSchema = z.object({
  name: z.string(),
  phone: z.string(),
  text: z.string().optional(),
})
