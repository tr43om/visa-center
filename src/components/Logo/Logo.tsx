import clsx from 'clsx'
import React from 'react'
import Image from 'next/image'
import { getServerSideURL } from '@/utilities/getURL'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <Image
      alt="SunVisa logo"
      height={40}
      width={250}
      loading={loading}
      fetchPriority={'high'}
      quality={100}
      decoding="async"
      className={clsx(className)}
      src={`${getServerSideURL()}/api/media/file/logo.svg`}
    />
  )
}
