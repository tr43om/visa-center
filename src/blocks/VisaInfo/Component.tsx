import { Card, CardContent } from '@/components/ui/card'
import CallbackForm from '@/entities/submission/ui/callback-form'
import { Category, Visa } from '@/payload-types'
import { getCountryDeclension } from '@/utilities/getCountryDeclension'
import { getClientSideURL } from '@/utilities/getURL'
import Image from 'next/image'
import { InlineCallbackForm } from './inline-callback-form'

type VisaInfoProps = {
  visa: Visa
}

const InfoItem = ({
  description,
  imageUrl,
  title,
}: {
  title: string
  description: string
  imageUrl: string
}) => {
  return (
    <div className="px-6 py-5 relative overflow-hidden flex items-center">
      <div>
        <h3 className="text-zinc-800 font-bold text-2xl">{title}</h3>
        <p className="text-zinc-500">{description}</p>
      </div>
      <Image
        src={imageUrl}
        alt="3d изображение горящего таймера"
        width={140}
        height={140}
        className="absolute -right-12 top-4"
      />
    </div>
  )
}

export const VisaInfo = async ({ visa }: VisaInfoProps) => {
  const category = visa.category as Category
  return (
    <Card className="container p-0 max-w-7xl -mt-[30px] z-[15] relative overflow-hidden">
      <CardContent className="p-0 bg-white grid md:flex">
        <div className="divide-y w-full md:w-3/5 grid">
          <div className=" relative overflow-hidden grid">
            <div className="px-6 py-5">
              <h3 className="text-zinc-800 font-bold text-2xl">~{category.totalPrice} тг.</h3>
              <p className="text-zinc-500">Цена оформления </p>
            </div>
            <div className="w-full px-6 py-4 border-t border-dashed grid sm:flex justify-between items-center">
              <div>
                <p className="text-[18px] text-zinc-600 font-medium">от {category.visaFee} тг.</p>
                <p className="text-zinc-500 text-sm">Наши услуги</p>
              </div>
              <span>+</span>
              <div>
                <p className="text-[18px] text-zinc-600 font-medium">{category.consularFee}€</p>
                <p className="text-zinc-500 text-sm">Консульский сбор</p>
              </div>
              <span>+</span>
              <div>
                <p className="text-[18px] text-zinc-600 font-medium">{category.serviceFee} тг.</p>
                <p className="text-zinc-500 text-sm">Сервисный сбор</p>
              </div>
            </div>
            <Image
              src={`${getClientSideURL()}/api/media/file/3d-plane-with-passports.webp`}
              alt="3d изображение горящего таймера"
              width={140}
              height={140}
              className="absolute -right-12 top-4"
            />
          </div>
          <InfoItem
            description="Срок оформления"
            title={`От ${category.processingTime} дня`}
            imageUrl={`${getClientSideURL()}/api/media/file/3d-fast-time.webp`}
          />
          <InfoItem
            description="Выдали нашим клиентам"
            title={`400+ виз`}
            imageUrl={`${getClientSideURL()}/api/media/file/3d-folder.webp`}
          />
          <InfoItem
            description="Шанс отказа"
            title={`<1%`}
            imageUrl={`${getClientSideURL()}/api/media/file/3d-medal.webp`}
          />
        </div>
        <InlineCallbackForm visa={visa} />
      </CardContent>
    </Card>
  )
}
