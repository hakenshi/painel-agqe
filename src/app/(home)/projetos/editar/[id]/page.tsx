import Projeto from "@/components/projeto"
import { findProject } from "@/actions/projects"

type Props = { params: Promise<{ id: string }> }

export default async function EditarProjetoPage({ params }: Props) {
  const { id } = await params

  const project = await findProject(parseInt(id))
  if (!project) return null

  return (
    <div>
      <Projeto projectData={project} />
    </div>
  )
}