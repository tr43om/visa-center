import { Visa } from '@/payload-types'
import { getCountryDeclension } from '@/utilities/getCountryDeclension'
import Image from 'next/image'

type VisaIntroProps = {
  visa: Visa
}

export const VisaIntro = ({ visa }: VisaIntroProps) => {
  return (
    <div className="max-w-[40rem] space-y-2 pt-8 md:pt-0">
      <h1 className="font-extrabold md:text-5xl text-4xl   text-white">
        <span>Оформление визы</span> <br />
        <span className="flex gap-2 items-center">
          <Image
            src={visa.imgUrl.trimEnd()}
            alt={`Флаг страны: ${visa.label}`}
            width={38}
            height={28}
            className="mt-[6px] rounded-[3px]"
          />
          в {getCountryDeclension(visa.label, 'vi')}{' '}
        </span>
      </h1>
      <p className="text-xl text-white/90">
        Оставьте заявку и получите варианты решения вашей задачи от визового специалиста по{' '}
        {getCountryDeclension(visa.label, 'da')}
      </p>
    </div>
  )
}
