import { Suspense } from 'react'
import HomePage from './HomePage'
import Spinner from '@/components/Spinner'

export default function Page() {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <HomePage />
      </Suspense>
    </div>
  )
}