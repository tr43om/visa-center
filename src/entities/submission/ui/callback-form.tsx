'use client'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
import { Textarea } from '@/components/ui/textarea'
import { sendEmail } from '@/entities/submission/submission.actions'
import ru from 'react-phone-number-input/locale/ru'
import { CredenzaFooter } from '@/components/ui/credenza'

import { parseAsBoolean, parseAsJson, useQueryState } from 'nuqs'
import { submissionSchema } from '../submission.schemas'
import { RiInstagramFill, RiWhatsappFill } from '@remixicon/react'

export default function CallbackForm() {
  const form = useForm<z.infer<typeof submissionSchema>>({
    resolver: zodResolver(submissionSchema),
  })

  const [hasSubmitted, setHasSubmitted] = useQueryState(
    'hasSubmitted',
    parseAsBoolean.withDefault(false),
  )

  const [submission, setSubmission] = useQueryState(
    'submission',
    parseAsJson(submissionSchema.parse),
  )

  async function onSubmit(values: z.infer<typeof submissionSchema>) {
    try {
      await sendEmail(values)
      setSubmission(values)
      setHasSubmitted(true)
    } catch (error) {
      console.error('Form submission error', error)
      toast.error('Failed to submit the form. Please try again.')
    }
  }

  if (hasSubmitted)
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          <p className="text-slate-600">А пока, можете получше о нас узнать</p>
          <Button
            effect="shine"
            variant="secondary"
            size="lg"
            className="justify-between w-full px-3"
          >
            В Instagram <RiInstagramFill />
          </Button>
        </div>
        <div className="w-full flex  items-center gap-2">
          <div className="w-full border-t" />
          <p className="text-slate-400 text-sm">или</p>
          <div className="w-full border-t" />
        </div>
        <div className="space-y-1">
          <p className="text-slate-600">Если срочный вопрос</p>
          <Button variant="secondary" size="lg" className="justify-between w-full px-3">
            Пишите в Whatsapp <RiWhatsappFill />
          </Button>
        </div>
      </div>
    )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-3xl mx-auto ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Имя" type="" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormControl className="w-full">
                <PhoneInput
                  {...field}
                  placeholder="Номер телефона"
                  defaultCountry="KZ"
                  required
                  labels={ru}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Ваши вопросы" className="resize-none" {...field} />
              </FormControl>
              <FormDescription className="text-zinc-400">
                Вы можете заранее задать вопросы, а мы позвоним с уже подготовленными ответами!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <CredenzaFooter>
          <Button effect="shine" size="lg" type="submit" className="w-full">
            Заказать звонок
          </Button>
        </CredenzaFooter>
      </form>
    </Form>
  )
}
