import React, { PropsWithChildren } from 'react'

export default function DashboardShell({ children }: PropsWithChildren) {
    return (
        <section className='space-y-5 px-5 py-3'>
            {children}
        </section>
    )
}
