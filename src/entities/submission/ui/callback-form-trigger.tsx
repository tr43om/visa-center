'use client'
import { parseAsBoolean, parseAsJson, useQueryState } from 'nuqs'
import { Button } from '../../../components/ui/button'
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '../../../components/ui/credenza'
import CallbackForm from './callback-form'
import { submissionSchema } from '../submission.schemas'
import { RiArrowRightUpLine } from '@remixicon/react'
import { cn } from '@/utilities'
import { BorderTrail } from '@/components/ui/border-trail'

type CallbackFormTriggerProps = {
  className?: string
}

export const CallbackFormTrigger = ({ className }: CallbackFormTriggerProps) => {
  const [hasSubmitted] = useQueryState('hasSubmitted', parseAsBoolean.withDefault(false))

  const [submission] = useQueryState('submission', parseAsJson(submissionSchema.parse))
  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button
          className={cn(
            'flex items-center gap-4 justify-between text-left px-3 py-2 h-auto ml-auto duration-1000',
            className,
          )}
          size="lg"
          effect="shine"
        >
          <div className="grid">
            <span>Бесплатная консультация</span>
            <span className="text-xs font-normal">по телефону или в мессенджерах</span>
          </div>
          <div className="bg-black/15 p-2 rounded-full">
            <RiArrowRightUpLine className="text-white/90" />
          </div>
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>
            {hasSubmitted ? `${submission?.name}, cпасибо за заявку 💖` : 'Ответим на все вопросы'}
          </CredenzaTitle>
          <CredenzaDescription className="grid">
            <span className="font-medium">
              {hasSubmitted ? `По номеру: ${submission?.phone}` : `Перезвоним в ближайшее время!`}
            </span>
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <CallbackForm />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  )
}
