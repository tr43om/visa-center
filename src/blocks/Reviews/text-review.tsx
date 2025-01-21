import { Media } from '@/components/Media'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Review, Visa } from '@/payload-types'
import { getClientSideURL } from '@/utilities/getURL'
import { RiExternalLinkFill, RiStarFill } from '@remixicon/react'
import Image from 'next/image'
import Link from 'next/link'

type TextReviewProps = {
  visa: Visa
  review: Review
}

export const TextReview = ({ review, visa }: TextReviewProps) => {
  return (
    <>
      <header className="absolute  z-20 px-4 top-6 right-0 flex items-center justify-end w-full">
        <Image
          src={visa.imgUrl.trimEnd()}
          alt={`Флаг страны: ${visa.label}`}
          width={34}
          height={34}
        />
      </header>
      <ScrollArea className=" z-30 h-[320px]">
        <p className="font-serif leading-relaxed">&ldquo;{review.text!}&rdquo;</p>
      </ScrollArea>
      <Link href={review.reviewHref ?? '#'}>
        <footer className="flex  items-center gap-2 right-0 pt-5 pb-4 px-4 z-30 bg-white/15 hover:bg-white/40 transition-all group backdrop-blur-2xl absolute bottom-0 w-full">
          <Image
            src={`${getClientSideURL()}/api/media/file/2GIS-1.svg`}
            alt="2gis logo"
            width={42}
            height={42}
          />
          <div className="space-y-1">
            <div className="flex items-center gap-1 z-10">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <RiStarFill key={`star-${i}`} className="text-amber-400  size-4" />
                ))}
            </div>
            <p className="font-medium text-slate-700">{visa.label}</p>
          </div>
          <RiExternalLinkFill className="ml-auto text-black/30 group-hover:text-black/80 transition-all" />
        </footer>
      </Link>
    </>
  )
}
