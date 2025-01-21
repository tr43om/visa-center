import { cn } from 'src/utilities/cn'
import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { WhyUsBlock } from './why-us/Component'
import { PopularDestinations } from './PopularDestinations/Component'
import { Reviews } from './Reviews/Component'

const blockComponents = {
  archive: ArchiveBlock,
  reviews: Reviews,
  whyUs: WhyUsBlock,
  popularDestinations: PopularDestinations,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block: any = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index} className="py-8">
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
