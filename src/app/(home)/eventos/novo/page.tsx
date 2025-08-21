'use client'
import Evento from "@/components/evento"
import Galeria from "@/components/galeria"
import { useEffect, useState } from "react"

export default function NovoEvento() {

    const [eventData, setEventData] = useState<EventData | null>(null)

    useEffect(() => {
        if (!eventData) {
            const eventTemporaryData = sessionStorage.getItem('event_data')
            setEventData(eventTemporaryData ? JSON.parse(eventTemporaryData as string) : null)
        }
    }, [eventData])

    return (
        <section className=" bg-white">
            {eventData?.type === "event" ? <Evento eventData={eventData} /> : <Galeria eventData={eventData} />}
        </section>
    )
}
