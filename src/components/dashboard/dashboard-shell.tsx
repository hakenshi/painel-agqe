import React, { PropsWithChildren } from 'react'

export default function DashboardShell({ children }: PropsWithChildren) {
    return (
        <section className='gap-3 px-2 sm:px-5 grid max-h-fit overflow-y-scroll'>
            {children}
        </section>
    )
}
