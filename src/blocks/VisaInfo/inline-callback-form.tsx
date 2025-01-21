'use client'

import { submissionSchema } from '@/entities/submission/submission.schemas'
import CallbackForm from '@/entities/submission/ui/callback-form'
import { Visa } from '@/payload-types'
import { getCountryDeclension } from '@/utilities/getCountryDeclension'
import { useParams } from 'next/navigation'
import { parseAsBoolean, parseAsJson, useQueryState } from 'nuqs'

export const InlineCallbackForm = ({ visa }: { visa: Visa }) => {
  const [hasSubmitted] = useQueryState('hasSubmitted', parseAsBoolean.withDefault(false))

  const [submission] = useQueryState('submission', parseAsJson(submissionSchema.parse))

  return (
    <section className=" grid  place-items-center w-full md:w-2/5 bg-slate-50">
      <header className="pb-4 px-4 gap-1 pt-8 border-b p">
        <h3 className="font-bold text-2xl">
          {hasSubmitted ? `${submission?.name}, cпасибо за заявку 💖` : 'Все в ваших руках!'}
        </h3>
        <p className="text-sm text-zinc-600">
          {hasSubmitted
            ? `Визовый специалист ${getCountryDeclension(visa.label, 'ro')} перезвонит вам по номеру: ${submission?.phone}`
            : `Визовый специалист ${getCountryDeclension(visa.label, 'ro')} проконсультирует вас по
          гостевой визе и вышлет необходимый перечень документов`}
        </p>
      </header>
      <div className="px-4 pt-4 pb-8 w-full">
        <CallbackForm />
      </div>
    </section>
  )
}
