'use client'

import { Button } from "@/components/ui/button"

interface EventUpdateFormProps {
  onUpdate: (updates: Partial<Event>) => void
  event: Event
}

export default function EventUpdateForm({ onUpdate }: EventUpdateFormProps) {
  return (
    <div>
      <p>Event update form placeholder</p>
      <Button onClick={() => onUpdate({ name: "Updated Event" })}>
        Update Event
      </Button>
    </div>
  )
}