import Link from 'next/link'
import React, { Suspense } from 'react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <Suspense>
      <div className="container py-28">
        <div className="prose max-w-none">
          <h1 style={{ marginBottom: 0 }}>404</h1>
          <p className="mb-4">This page could not be found.</p>
        </div>
        <Button asChild variant="default">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </Suspense>
  )
}
