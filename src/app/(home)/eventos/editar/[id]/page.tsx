import { findEvent } from "@/actions/events"
import Evento from "@/components/evento"
import Galeria from "@/components/galeria"

type Props = { params: Promise<{ id: string }> }

export default async function EditarEventoPage({ params }: Props) {
  const { id } = await params

  const event = await findEvent(parseInt(id))

  if (!event) return null

  const { eventType, startingTime, endingTime, markdown, ...rest } = event

  const normalizedEvent = {
    ...rest,
    markdown: markdown ?? undefined,
    type: eventType,
    starting_time: startingTime,
    ending_time: endingTime,
  }

  return (
    eventType === "event" ? (
      <Evento eventData={normalizedEvent} />
    ) : (
      <Galeria eventData={normalizedEvent} />
    )
  )
}