import Projeto from "@/components/projeto"
import { findProject } from "@/actions/projects"

type Props = { params: Promise<{ slug: string }> }

export default async function EditarProjetoPage({ params }: Props) {
  const { slug } = await params

  const project = await findProject(slug)

  return (
    <div>
      <Projeto projectData={project} />
    </div>
  )
}