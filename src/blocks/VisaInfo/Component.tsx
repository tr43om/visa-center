import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import CallbackForm from '@/entities/submission/ui/callback-form'
import { Category, Visa } from '@/payload-types'
import { getCountryDeclension } from '@/utilities/getCountryDeclension'
import { getClientSideURL, getMediaUrl } from '@/utilities/getURL'
import Image from 'next/image'
import { InlineCallbackForm } from './inline-callback-form'
import { CallbackFormTrigger } from '@/entities/submission/ui/callback-form-trigger'
import { Button } from '@/components/ui/button'

type VisaInfoProps = {
  visa: Visa
}

type AdvantageItem = {
  title: string
  description: string
  imgUrl: string
}

type AdvantageItemProps = {
  advantage: AdvantageItem
}

const AdvantageItem = ({ advantage: { description, imgUrl, title } }: AdvantageItemProps) => {
  return (
    <div className="h-full p-4 md:p-6 bg-white items-center grid relative overflow-hidden">
      <div className="space-y-2 max-w-[260px] md:max-w-[400px]">
        <h3 className="md:text-2xl text-lg font-bold text-zinc-800">{title}</h3>
        <p className="text-zinc-500 text-sm md:text-base">{description}</p>
      </div>
      <Image
        src={imgUrl}
        alt={`Иллюстрация к ${title}`}
        width={300}
        height={250}
        className=" -right-[5px] md:right-0 object-cover object-left -bottom-[15px]  md:-bottom-[30px] absolute w-[100px] h-[130px]  md:w-[170px] md:h-[200px]"
      />
    </div>
  )
}

type PriceCompositionProps = {
  price: Visa['price']
}

const PriceComposition = ({
  price: { consularFee, processingTime, serviceFee, visaFee },
}: PriceCompositionProps) => {
  const formatKZTPrice = (price: number) =>
    new Intl.NumberFormat('kz', {
      currency: 'KZT',
      style: 'currency',
    }).format(price)

  const formatEURPrice = (price: number) =>
    new Intl.NumberFormat('kz', {
      currency: 'EUR',
      style: 'currency',
    }).format(price)

  const prices = [
    {
      price: formatEURPrice(consularFee),
      title: 'Консульский сбор',
    },
    {
      price: `От ${formatKZTPrice(visaFee)}`,
      title: 'Услуги Sun Visa Travel',
    },
    {
      price: formatKZTPrice(serviceFee),
      title: 'Сервисный сбор',
    },
  ]

  return (
    <div className="relative">
      <Image
        src={getMediaUrl('prices-hero.webp')}
        alt="Клиент в шоке от доступности цен"
        height={400}
        width={400}
        className="w-full object-cover h-[300px]"
      />
      <div className="absolute px-4 grid w-full space-y-1 -translate-y-1/2 top-1/2 ">
        {prices.map(({ price, title }, i) => (
          <div
            key={`price-${i}-${title}`}
            className="odd:ml-auto even:mr-auto rounded-sm  px-4 py-3 bg-white/70 border border-white/80 backdrop-blur-lg"
          >
            <p className="font-medium  text-xl text-black/80">{price}</p>
            <p className="text-black/70">{title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export const VisaInfo = async ({ visa }: VisaInfoProps) => {
  const price = visa.price
  const countryVi = getCountryDeclension(visa.label, 'vi')
  const countryRo = getCountryDeclension(visa.label, 'ro')
  const countryDa = getCountryDeclension(visa.label, 'da')
  const advantages: AdvantageItem[] = [
    {
      title: 'Поддержка 24/7',
      description: `До и после получения визы, визовый специалист по ${countryDa} всегда остается на связи`,
      imgUrl: getMediaUrl('advantage-1.webp'),
    },
    {
      title: 'Персональный подход',
      description: `То, что помогает максимизировать шансы 
на получение визы в ${countryVi}`,
      imgUrl: getMediaUrl('advantage-2.webp'),
    },
    {
      title: 'Результат от 1 дня',
      description: `Наши клиенты получают визу в ${countryVi} за максимально короткий срок
`,
      imgUrl: getMediaUrl('advantage-3.webp'),
    },
  ]
  return (
    <Card className="container p-0 max-w-7xl -mt-[30px] z-[15] relative overflow-hidden bg-white">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          Почему для визы в {countryVi} выбирают нас?
        </CardTitle>
        <CardDescription className="text-[20px]">
          Потому что, наша миссия - предвосхищать ваши ожидания. Вот что мы для этого делаем:
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 bg-zinc-100 grid lg:flex gap-2">
        <section className="w-full lg:w-2/5 bg-white">
          <PriceComposition price={price} />
          <div className="p-6 pb-4 space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-zinc-800">Понятные цены</h3>
              <p>Визовый специалист по {countryDa} сообщит Вам точную цену по вашему запросу</p>
            </div>
            <CallbackFormTrigger>
              <Button size="lg" effect="expandIcon" className="w-full">
                Заказать звонок
              </Button>
            </CallbackFormTrigger>
          </div>
        </section>
        <section className="w-full lg:w-3/5 flex flex-col gap-2  ">
          {advantages.map((advantage) => (
            <AdvantageItem key={advantage.title} advantage={advantage} />
          ))}
        </section>
      </CardContent>
    </Card>
  )
}
