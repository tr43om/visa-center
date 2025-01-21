import { Suspense } from 'react'
import PageTemplate, { generateMetadata } from './[slug]/page'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

const Page = async ({ params: paramsPromise }: Args) => {
  return (
    <Suspense>
      <PageTemplate params={paramsPromise} />
    </Suspense>
  )
}

export default Page

export { generateMetadata }
