import { cookies } from 'next/headers'
import React from 'react'

export default async function NovoEvento() {

    const cookie = await cookies()

    const eventData = cookie.get("event_data")?.value
    console.log(eventData)

    return (
        <div>NovoEvento</div>
    )
}
