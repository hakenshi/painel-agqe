import Header from '@/components/header'
import React, { PropsWithChildren } from 'react'

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <>
    <Header/>
      <main className='container mx-auto'>
        {children}
      </main>
    </>
  )
}
