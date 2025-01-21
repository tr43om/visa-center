import { Media } from '@/components/Media'
import { Review, Visa } from '@/payload-types'
import { getClientSideURL } from '@/utilities/getURL'
import { RiExternalLinkFill, RiStarFill } from '@remixicon/react'
import Image from 'next/image'
import Link from 'next/link'

type VideoReviewProps = {
  visa: Visa
  review: Review
}

export const VideoReview = ({ review, visa }: VideoReviewProps) => {
  return (
    <>
      <header className="absolute  z-20 px-4 top-6 flex items-center justify-end w-full">
        <Image
          src={visa.imgUrl.trimEnd()}
          alt={`Флаг страны: ${visa.label}`}
          width={34}
          height={34}
        />
      </header>
      <Media resource={review.video!} className="relative  h-full w-full" />
      <Link href={review.reviewHref ?? '#'}>
        <footer className="flex items-center gap-2 pt-5 pb-4 right-0 px-4 z-30 group bg-white/15 hover:bg-white/40 transition-all backdrop-blur-2xl absolute bottom-0 w-full">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg"
            alt="instagram logo"
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
            <p className="font-medium text-white">{visa.label}</p>
          </div>
          <RiExternalLinkFill className="ml-auto text-black/30 group-hover:text-black/80 transition-all" />
        </footer>
      </Link>
    </>
  )
}
