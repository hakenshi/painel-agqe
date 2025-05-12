import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import React, { PropsWithChildren } from 'react'

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-[170px_1fr] grid-rows-[auto_1fr] h-screen">
      <Header />
      <Sidebar />
      <main className="col-start-2 row-start-2 p-5 border rounded-tl-xl overflow-y-scroll">
        {children}
      </main>
    </div>
  )
}
