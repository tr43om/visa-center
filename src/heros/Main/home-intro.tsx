import { Visa } from '@/payload-types'
import { getCountryDeclension } from '@/utilities/getCountryDeclension'
import Image from 'next/image'

type HomeIntroProps = {}

export const HomeIntro = () => {
  return (
    <div className="max-w-[40rem] space-y-2 pt-8 md:pt-0">
      <h1 className="font-extrabold md:text-5xl text-4xl   text-white">
        <span>Ваш надежный</span> <br />
        <span>партнер в мире виз</span>
      </h1>
      <p className="text-xl text-white/90">
        Помощь в визовых вопросах, иммиграция, туризм и решение бизнес-задач за рубежом.
      </p>
    </div>
  )
}
