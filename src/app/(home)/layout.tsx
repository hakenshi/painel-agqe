import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import { Toaster } from '@/components/ui/sonner'
import React, { PropsWithChildren } from 'react'

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[170px_1fr] grid-rows-[auto_auto_1fr] lg:grid-rows-[auto_1fr] h-screen">
      <Header />
      <Sidebar />
      <main className="col-span-1 lg:col-start-2 row-start-3 lg:row-start-2 p-3 sm:p-5 border lg:rounded-tl-xl overflow-y-scroll">
        {children}
        <Toaster />
      </main>
    </div>
  )
}
