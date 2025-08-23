'use client'

import { Button } from "@/components/ui/button"

interface ProjectUpdateFormProps {
  onUpdate: (updates: Partial<Project>) => void
  project: Project
}

export default function ProjectUpdateForm({ onUpdate }: ProjectUpdateFormProps) {
  return (
    <div>
      <p>Project update form placeholder</p>
      <Button onClick={() => onUpdate({ name: "Updated Project" })}>
        Update Project
      </Button>
    </div>
  )
}