import clsx from 'clsx'
import React from 'react'
import logo from '@media/logo.svg'
import Image from 'next/image'

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
      alt="Payload Logo"
      height={40}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx(className)}
      src={logo}
    />
  )
}
