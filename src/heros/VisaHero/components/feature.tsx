import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { ReactNode } from 'react'

type FeatureProps = {
  image: {
    alt: string
    src: string | StaticImport
    height?: number
    width?: number
  }
  title: ReactNode | string
  text: ReactNode | string
}
export const Feature = ({
  image = { alt: 'feature', height: 160, width: 160, src: '' },
  text,
  title,
}: FeatureProps) => {
  return (
    <section className="p-3 min-w-[200px] pr-4 group rounded-sm grid items-center  bg-white/20 border border-white/25 backdrop-blur-xl relative text-white overflow-hidden select-none">
      <h3>{title}</h3>
      <p className="text-3xl font-extrabold">{text}</p>
      <Image
        {...image}
        alt={image.alt}
        className="absolute -top-2 -z-10 -right-10 group-hover:opacity-70 transition-all opacity-30 "
        height={150}
        width={180}
      />
    </section>
  )
}
